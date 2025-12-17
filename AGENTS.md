# Agent Notes (Codex / Claude Code / Copilot)

This repository is a static website (GitHub Pages + custom domain). There is no build system: changes are plain HTML/CSS/JS.

## Repository map
- Marketing landing page: `index.html`
- Portfolio section: `portfolio/`
  - Hub: `portfolio/index.html`
  - Projects: `portfolio/projects/<project>/index.html`
  - Presentations: `portfolio/presentations/<name>/index.html`
- Blogs: `Blogs/`
- Shared navigation script (required): `shared/bottom-nav.js`
- Shared cross-site CSS: `shared/site.css`
- Shared portfolio styling: `portfolio/shared/portfolio.css`
- AI context files for assistants: `llms.txt`, `llms-full.txt` (referenced from `index.html`)

## How to run locally
Run an HTTP server from the repo root (do not use `file://` URLs; navigation breaks).
- Windows: run `start-server.bat`
- macOS/Linux: run `./start-server.sh`
- Manual: `python -m http.server 8000`

Open:
- `http://localhost:8000/` (marketing)
- `http://localhost:8000/portfolio/` (portfolio)

## Project conventions (follow existing patterns)
- Every browsable folder must contain an `index.html`.
- Navigation: every HTML page must include the bottom nav script:
  - `<script src="/shared/bottom-nav.js" data-nav-active="home"></script>`
  - Use `data-nav-active` = `home|services|portfolio|blogs|about|contact`.
- Styling:
  - Tailwind is prebuilt into `/shared/tailwind.css` (theme + forms + typography). Include that file instead of the CDN.
- If you add new Tailwind utility classes, rebuild `/shared/tailwind.css` with `npx tailwindcss@3.4.10 -c tailwind.config.js -i ./shared/tailwind-input.css -o ./shared/tailwind.css --minify` (install plugins first: `npm install --no-save @tailwindcss/forms @tailwindcss/typography`).
  - Portfolio pages should also load `portfolio/shared/portfolio.css` and reuse its classes/variables.
- Links:
  - Use root-relative URLs for ALL internal links and shared assets: `/portfolio/...`, `/Blogs/...`, `/shared/...`.
  - When touching pages that still use folder-relative links (e.g., `projects/<name>/`, `../../`), prefer converting them to root-relative equivalents.

## Where to look for examples
- Landing page patterns + AI metadata: `index.html`
- Portfolio hub + card patterns: `portfolio/index.html`
- Portfolio project page structure: `portfolio/projects/ai-knowledge-app/index.html`
- Blog layout: `Blogs/index.html`

## Blogs: Markdown + Mermaid (new pattern)
- Full workflow + template reference: `Blogs/README.md`
- Preferred structure: one folder per post: `Blogs/<slug>/`
  - `Blogs/<slug>/index.html` renders Markdown (see `data-md-include`) and includes bottom nav.
  - `Blogs/<slug>/post.md` is the Markdown source.
  - Optional: `Blogs/<slug>/full.html` for posts that require custom HTML beyond Markdown/Mermaid.
- Markdown rendering is done client-side using `portfolio/shared/markdown-mermaid.js`.
  - Note: there is no `shared/markdown-mermaid.js` at repo root; use `/portfolio/shared/markdown-mermaid.js`.

### Mermaid gotchas (important)
- Prefer simple Mermaid diagrams (`flowchart TD`) for reliability.
- Avoid tabs in Mermaid blocks; use spaces.
- Avoid special arrow variants and unicode symbols in Mermaid text (keep ASCII).
- If a post shows “Unable to load … Parse error …”, the Mermaid code block is usually the culprit.

## Guidance for agent tools
- Prefer small, localized edits: this repo intentionally has many independent pages.
- Do not introduce build tooling/dependencies unless explicitly requested.
- If a request mentions external systems (.NET, MCP servers, vector DBs), treat it as content/documentation only—those implementations are not in this repo.
