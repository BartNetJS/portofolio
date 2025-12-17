from __future__ import annotations

import runpy
from pathlib import Path


def main() -> int:
    """Backwards-compatible wrapper.

    The maintained scripts live under `Blogs/tools/`.
    """

    repo_root = Path(__file__).resolve().parents[1]
    target = repo_root / "Blogs" / "tools" / "pdf_extract_images.py"
    runpy.run_path(str(target), run_name="__main__")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
