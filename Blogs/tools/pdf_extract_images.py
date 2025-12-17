from __future__ import annotations

import argparse
from pathlib import Path


def guess_image_extension(data: bytes) -> str | None:
    if data.startswith(b"\xFF\xD8\xFF"):
        return "jpg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data.startswith(b"GIF87a") or data.startswith(b"GIF89a"):
        return "gif"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "webp"
    if data.startswith(b"BM"):
        return "bmp"
    if data.startswith(b"II*\x00") or data.startswith(b"MM\x00*"):
        return "tiff"
    # JPEG2000 (occasionally used inside PDFs)
    if data.startswith(b"\x00\x00\x00\x0cjP  \r\n\x87\n") or data.startswith(b"\xffO\xffQ"):
        return "jp2"
    return None


def main(argv: list[str] | None = None) -> int:
    # pypdf is the maintained successor of PyPDF2
    from pypdf import PdfReader

    # This script lives under Blogs/tools/, so repo root is 2 levels up.
    repo_root = Path(__file__).resolve().parents[2]

    parser = argparse.ArgumentParser(description="Extract embedded images from a PDF.")
    parser.add_argument("--in", dest="input_pdf", required=True, help="Path to the input PDF (absolute or repo-relative).")
    parser.add_argument(
        "--out-dir",
        dest="out_dir",
        required=True,
        help="Output directory for extracted images (absolute or repo-relative).",
    )
    args = parser.parse_args(argv)

    pdf_path = Path(args.input_pdf)
    out_dir = Path(args.out_dir)
    if not pdf_path.is_absolute():
        pdf_path = repo_root / pdf_path
    if not out_dir.is_absolute():
        out_dir = repo_root / out_dir

    if not pdf_path.exists():
        raise FileNotFoundError(pdf_path)

    out_dir.mkdir(parents=True, exist_ok=True)

    reader = PdfReader(str(pdf_path))
    written = 0

    for page_index, page in enumerate(reader.pages, start=1):
        images = getattr(page, "images", None)
        if not images:
            continue

        for image_index, image in enumerate(images, start=1):
            data: bytes = image.data

            ext = getattr(image, "extension", None)
            if not ext:
                image_name = getattr(image, "name", None)
                if image_name and "." in image_name:
                    ext = image_name.rsplit(".", 1)[-1].lower()

            if not ext:
                ext = guess_image_extension(data) or "bin"

            file_name = f"page-{page_index:02d}-img-{image_index:02d}.{ext}"
            out_path = out_dir / file_name
            out_path.write_bytes(data)
            written += 1

    print(f"WROTE {written} image(s) to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
