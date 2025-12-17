from __future__ import annotations

import argparse
import re
from pathlib import Path


def _extract_image_refs(markdown: str) -> set[str]:
    refs: set[str] = set()

    # Markdown image syntax: ![alt](url "optional title")
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", markdown):
        raw = match.group(1).strip()
        # Remove optional title: split on whitespace, keep first token
        # (works for typical `(path "title")`)
        url = raw.split()[0].strip()
        url = url.strip("<>").strip("\"'")
        if url:
            refs.add(url)

    # HTML img tags: <img src="...">
    for match in re.finditer(r"<img\s+[^>]*src=[\"']([^\"']+)[\"'][^>]*>", markdown, flags=re.IGNORECASE):
        url = match.group(1).strip()
        url = url.strip("<>").strip("\"'")
        if url:
            refs.add(url)

    return refs


def _normalize_ref(ref: str) -> str | None:
    ref = ref.strip()
    if not ref:
        return None

    # Ignore external or site-root references; we only prune a local folder.
    if ref.startswith("http://") or ref.startswith("https://"):
        return None
    if ref.startswith("/"):
        return None

    # Drop URL fragment/query
    ref = ref.split("#", 1)[0]
    ref = ref.split("?", 1)[0]
    ref = ref.strip()
    return ref or None


def main(argv: list[str] | None = None) -> int:
    # This script lives under Blogs/tools/, so repo root is 2 levels up.
    repo_root = Path(__file__).resolve().parents[2]

    parser = argparse.ArgumentParser(
        description=(
            "Delete extracted images that are not referenced by a Markdown post. "
            "Dry-run by default; pass --apply to actually delete."
        )
    )
    parser.add_argument(
        "--post",
        required=True,
        help="Path to the post.md file (absolute or repo-relative).",
    )
    parser.add_argument(
        "--images-dir",
        required=True,
        help="Directory to clean (absolute or repo-relative), e.g. Blogs/<slug>/images/extracted",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually delete files. Without this flag, runs in dry-run mode.",
    )
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
    raw_refs = _extract_image_refs(markdown)

    referenced_files: set[Path] = set()
    for raw_ref in raw_refs:
        ref = _normalize_ref(raw_ref)
        if not ref:
            continue
        referenced_files.add((post_path.parent / ref).resolve())

    deleted = 0
    kept = 0

    for file_path in sorted((p for p in images_dir.rglob("*") if p.is_file()), key=lambda p: str(p).lower()):
        resolved = file_path.resolve()
        if resolved in referenced_files:
            kept += 1
            continue

        if args.apply:
            file_path.unlink()
        deleted += 1

    mode = "APPLIED" if args.apply else "DRY-RUN"
    print(f"{mode}: would delete/delete {deleted} file(s), keep {kept} referenced file(s) in {images_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
