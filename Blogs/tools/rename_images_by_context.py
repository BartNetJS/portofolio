from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ImageRef:
    start: int
    end: int
    url: str


_heading_re = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
_md_image_re = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
_html_img_re = re.compile(r"<img\s+[^>]*src=[\"']([^\"']+)[\"'][^>]*>", re.IGNORECASE)


def _slugify(value: str, max_len: int = 60) -> str:
    value = value.strip().lower()
    # Remove anything that is not alnum/space/hyphen
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"\s+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    if not value:
        return ""
    return value[:max_len].rstrip("-")


def _extract_headings(markdown: str) -> list[tuple[int, str]]:
    headings: list[tuple[int, str]] = []
    for m in _heading_re.finditer(markdown):
        headings.append((m.start(), m.group(2).strip()))
    return headings


def _extract_image_refs(markdown: str) -> list[ImageRef]:
    refs: list[ImageRef] = []

    for m in _md_image_re.finditer(markdown):
        raw = m.group(1).strip()
        # remove optional title by taking first token
        url = raw.split()[0].strip().strip("<>").strip("\"'")
        refs.append(ImageRef(start=m.start(1), end=m.end(1), url=url))

    for m in _html_img_re.finditer(markdown):
        url = m.group(1).strip().strip("<>").strip("\"'")
        refs.append(ImageRef(start=m.start(1), end=m.end(1), url=url))

    refs.sort(key=lambda r: r.start)
    return refs


def _is_local_relative(url: str) -> bool:
    if not url:
        return False
    if url.startswith("http://") or url.startswith("https://"):
        return False
    if url.startswith("/"):
        return False
    return True


def _strip_url_suffix(url: str) -> str:
    url = url.split("#", 1)[0]
    url = url.split("?", 1)[0]
    return url


def _nearest_heading_title(headings: list[tuple[int, str]], pos: int) -> str | None:
    title: str | None = None
    for hpos, htitle in headings:
        if hpos > pos:
            break
        title = htitle
    return title


def _unique_name(candidate: str, used: set[str], existing_paths: set[Path]) -> str:
    if candidate not in used and Path(candidate) not in existing_paths:
        used.add(candidate)
        return candidate

    stem, dot, suffix = candidate.rpartition(".")
    if not dot:
        stem, suffix = candidate, ""

    i = 2
    while True:
        alt = f"{stem}-{i}" + (f".{suffix}" if suffix else "")
        if alt not in used and Path(alt) not in existing_paths:
            used.add(alt)
            return alt
        i += 1


def main(argv: list[str] | None = None) -> int:
    # This script lives under Blogs/tools/, so repo root is 2 levels up.
    repo_root = Path(__file__).resolve().parents[2]

    parser = argparse.ArgumentParser(
        description=(
            "Rename referenced images based on where they appear in post.md (intro + section headings). "
            "Updates post.md links accordingly. Dry-run by default; pass --apply to rename + write changes."
        )
    )
    parser.add_argument("--post", required=True, help="Path to post.md (absolute or repo-relative).")
    parser.add_argument(
        "--images-dir",
        required=True,
        help="Images folder to manage (absolute or repo-relative), e.g. Blogs/<slug>/images/extracted",
    )
    parser.add_argument(
        "--intro-name",
        default="intro-image",
        help="Base filename (without extension) for the first image referenced from --images-dir.",
    )
    parser.add_argument("--apply", action="store_true", help="Actually rename files and write the updated post.md.")
    args = parser.parse_args(argv)

    post_path = Path(args.post)
    images_dir = Path(args.images_dir)
    if not post_path.is_absolute():
        post_path = repo_root / post_path
    if not images_dir.is_absolute():
        images_dir = repo_root / images_dir

    if not post_path.exists():
        raise FileNotFoundError(post_path)
    if not images_dir.exists():
        raise FileNotFoundError(images_dir)

    markdown = post_path.read_text(encoding="utf-8")
    headings = _extract_headings(markdown)
    refs = _extract_image_refs(markdown)

    # Only consider image refs that point into images_dir
    managed_refs: list[ImageRef] = []
    for r in refs:
        if not _is_local_relative(r.url):
            continue
        url = _strip_url_suffix(r.url)
        abs_path = (post_path.parent / url).resolve()
        try:
            abs_path.relative_to(images_dir.resolve())
        except ValueError:
            continue
        managed_refs.append(r)

    if not managed_refs:
        print("No image references found under the provided --images-dir. Nothing to rename.")
        return 0

    used_names: set[str] = set()
    existing_rel_names: set[Path] = set(
        Path(p.name) for p in images_dir.iterdir() if p.is_file()
    )

    # Plan renames
    rename_map: dict[Path, Path] = {}  # src_abs -> dst_abs
    replace_spans: list[tuple[int, int, str]] = []  # start,end,newUrl

    for idx, r in enumerate(managed_refs):
        url = _strip_url_suffix(r.url)
        src_abs = (post_path.parent / url).resolve()
        if not src_abs.exists():
            print(f"WARN: referenced image not found on disk: {src_abs}")
            continue

        ext = src_abs.suffix.lower().lstrip(".")
        if idx == 0:
            base = _slugify(args.intro_name) or "intro-image"
        else:
            heading_title = _nearest_heading_title(headings, r.start) or ""
            base = _slugify(heading_title)
            if not base:
                base = f"image-{idx+1:02d}"

        candidate = f"{base}.{ext}" if ext else base
        final_name = _unique_name(candidate, used_names, existing_rel_names)
        dst_abs = (images_dir / final_name).resolve()

        # If it already has the final name, just update used tracking.
        if src_abs == dst_abs:
            replace_spans.append((r.start, r.end, str(Path(url).as_posix())))
            continue

        rename_map[src_abs] = dst_abs

        # Rewrite URL to point to the new filename, keeping the same relative dir
        rel_dir = Path(url).parent
        new_url = (rel_dir / dst_abs.name).as_posix()
        replace_spans.append((r.start, r.end, new_url))

    if not rename_map:
        print("No renames required (files already match desired names).")
        return 0

    print("Planned renames:")
    for src, dst in rename_map.items():
        print(f"- {src.name} -> {dst.name}")

    if not args.apply:
        print("DRY-RUN: pass --apply to perform renames and update post.md")
        return 0

    # Execute renames. Do it in a stable order to reduce conflicts.
    for src, dst in sorted(rename_map.items(), key=lambda kv: str(kv[0]).lower()):
        if dst.exists():
            raise FileExistsError(f"Refusing to overwrite existing file: {dst}")
        src.rename(dst)

    # Apply markdown replacements from back to front
    updated = markdown
    for start, end, new_url in sorted(replace_spans, key=lambda x: x[0], reverse=True):
        updated = updated[:start] + new_url + updated[end:]

    post_path.write_text(updated, encoding="utf-8")
    print(f"APPLIED: renamed {len(rename_map)} file(s) and updated {post_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
