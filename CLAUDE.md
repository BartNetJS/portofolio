# Claude Instructions (Codeware static site)

This repository is a static website (GitHub Pages + custom domain). There is no build system: edits are plain HTML/CSS/JS.

## Key conventions
- Every browsable folder must contain an `index.html`.
- Every HTML page must include the bottom nav:
  - `<script src="/shared/bottom-nav.js" data-nav-active="home"></script>`
  - `data-nav-active` = `home|services|portfolio|blogs|about|contact`
- Use root-relative links for internal assets and pages (`/Blogs/...`, `/portfolio/...`, `/shared/...`).

## Blogs (preferred pattern)
- One folder per post: `Blogs/<slug>/`
  - `Blogs/<slug>/index.html` renders Markdown.
  - `Blogs/<slug>/post.md` is the Markdown source.
  - Optional: `Blogs/<slug>/full.html` for posts that need custom HTML beyond Markdown/Mermaid.
- Markdown + Mermaid rendering is client-side via `/portfolio/shared/markdown-mermaid.js`.
  - Do not reference `/shared/markdown-mermaid.js` (it does not exist).

### Mermaid gotchas
- Prefer `flowchart TD` for reliability.
- Avoid tabs in Mermaid blocks; use spaces.
- Avoid unicode arrows/special characters in Mermaid labels.
- If the page shows “Unable to load … Parse error …”, the Mermaid block is usually the cause.
