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
  - Most pages use Tailwind via CDN (`https://cdn.tailwindcss.com`) + inline `tailwind.config`.
  - Portfolio pages should also load `portfolio/shared/portfolio.css` and reuse its classes/variables.
- Links:
  - Use root-relative URLs for ALL internal links and shared assets: `/portfolio/...`, `/Blogs/...`, `/shared/...`.
  - When touching pages that still use folder-relative links (e.g., `projects/<name>/`, `../../`), prefer converting them to root-relative equivalents.

## Where to look for examples
- Landing page patterns + AI metadata: `index.html`
- Portfolio hub + card patterns: `portfolio/index.html`
- Portfolio project page structure: `portfolio/projects/ai-knowledge-app/index.html`
- Blog layout: `Blogs/index.html`

## Guidance for agent tools
- Prefer small, localized edits: this repo intentionally has many independent pages.
- Do not introduce build tooling/dependencies unless explicitly requested.
- If a request mentions external systems (.NET, MCP servers, vector DBs), treat it as content/documentation only—those implementations are not in this repo.
