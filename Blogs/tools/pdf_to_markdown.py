from __future__ import annotations

import argparse
import re
from pathlib import Path


def _cleanup_text(text: str) -> str:
    text = text.replace("\r", "\n")
    # Fix common hyphenation artifacts across line breaks.
    text = re.sub(r"(\w)-\n(\w)", r"\1\2", text)
    # Join wrapped lines inside paragraphs.
    text = re.sub(r"(?<!\n)\n(?!\n)", " ", text)
    # Collapse excessive whitespace.
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def pdf_to_markdown(pdf_path: Path) -> str:
    # pypdf is the maintained successor of PyPDF2
    from pypdf import PdfReader

    reader = PdfReader(str(pdf_path))
    chunks: list[str] = []
    for i, page in enumerate(reader.pages, start=1):
        raw = page.extract_text() or ""
        raw = raw.strip()
        if not raw:
            continue
        cleaned = _cleanup_text(raw)
        chunks.append(f"\n\n---\n\n## Page {i}\n\n{cleaned}\n")

    if not chunks:
        return (
            "# Extraction Result\n\n"
            "No extractable text found in the PDF.\n\n"
            "This typically means the PDF is image-based (scanned/printed). "
            "If so, we’ll need OCR to recover the text.\n"
        )

    return "" + "".join(chunks).strip() + "\n"


def main(argv: list[str] | None = None) -> int:
    # This script lives under Blogs/tools/, so repo root is 2 levels up.
    repo_root = Path(__file__).resolve().parents[2]

    parser = argparse.ArgumentParser(description="Extract text from a PDF into a Markdown draft.")
    parser.add_argument("--in", dest="input_pdf", required=True, help="Path to the input PDF (absolute or repo-relative).")
    parser.add_argument(
        "--out",
        dest="output_md",
        required=True,
        help="Path to the output Markdown file (absolute or repo-relative).",
    )
    args = parser.parse_args(argv)

    pdf_path = Path(args.input_pdf)
    out_path = Path(args.output_md)
    if not pdf_path.is_absolute():
        pdf_path = repo_root / pdf_path
    if not out_path.is_absolute():
        out_path = repo_root / out_path

    if not pdf_path.exists():
        raise FileNotFoundError(pdf_path)

    md = pdf_to_markdown(pdf_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(md, encoding="utf-8")
    print(f"WROTE {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
