# Copilot Instructions (Codeware website + portfolio)

This repo is a static site (GitHub Pages/custom domain). There is no build system: edits are plain HTML/CSS/JS.

## Big picture (where things live)
- Marketing site entrypoint: `index.html` (Codeware landing page).
- Portfolio hub and content: `portfolio/`
  - Hub: `portfolio/index.html`
  - Projects: `portfolio/projects/<project>/index.html`
  - Presentations: `portfolio/presentations/<client-or-topic>/index.html`
- Blogs: `Blogs/` (mostly standalone HTML with inline CSS).
- Shared runtime JS: `shared/bottom-nav.js` (injects the bottom nav across pages).
- Shared cross-site CSS: `shared/site.css` (small set of styles reused across pages; avoid duplicating these inline).
- Shared portfolio styling: `portfolio/shared/portfolio.css` (CSS variables + reusable classes used by portfolio pages).

## Local dev / preview
- Recommended: run a simple HTTP server from the repo root (file:// URLs break navigation).
  - Windows: run `start-server.bat` (starts `python -m http.server 8000 --directory "%CD%"`).
  - macOS/Linux: `./start-server.sh` (runs `python3 -m http.server 8000`).
  - Then open `http://localhost:8000/` (marketing) and `http://localhost:8000/portfolio/` (portfolio).

## Conventions to follow in edits
- Page structure: each page is a self-contained `index.html` (folders without `index.html` 404 on Pages).
- Styling:
  - Many pages load Tailwind via CDN (`https://cdn.tailwindcss.com`) and configure shared colors (`primary`, `background-light`, `background-dark`) inline.
  - Put truly cross-page custom CSS in `shared/site.css` (e.g., the `100dvh` fallback and shared icon fills) instead of repeating `<style>` blocks.
  - Portfolio pages additionally load `portfolio/shared/portfolio.css`; prefer its CSS variables (`--pc-*`) and existing classes (`.portfolio-content`, `.portofolio-card`, `.back-link`) instead of inventing new styling.
- Navigation:
  - Required on every HTML page: include `shared/bottom-nav.js` so the global bottom navigation is consistent site-wide.
    - Root pages: `<script src="/shared/bottom-nav.js" data-nav-active="home"></script>`
    - Under `portfolio/` and `Blogs/`: `<script src="/shared/bottom-nav.js" data-nav-active="portfolio"></script>` or `data-nav-active="blogs"`.
  - Set the active item via `data-nav-active` on the script tag.
  - The script also infers active section from URL paths (`/portfolio`, `/Blogs`) and hash anchors (`/#services`, etc.).
- Links:
  - Use root-relative URLs for ALL internal navigation and shared assets (always start with `/`).
    - Examples: `/portfolio/projects/investment-agent/`, `/portfolio/`, `/Blogs/index.html`, `/shared/bottom-nav.js`.
  - When editing existing pages that use folder-relative links (e.g. `projects/<name>/` or `../../`), prefer converting them to the equivalent root-relative paths.

## External dependencies / integrations
- Google Analytics (gtag) is embedded in multiple pages; keep IDs consistent if touched.
- Google Fonts + Material Icons are loaded from `fonts.googleapis.com`.
- AI metadata: `index.html` exposes `meta name="ai-summary"`/`ai-keywords` and links to `llms.txt` + `llms-full.txt`; preserve these patterns when editing the landing page.

## Be careful about
- Docs/templates may lag the current structure (e.g., some instructions mention `projects/` or `presentations/` at repo root). Prefer the existing on-disk structure under `portfolio/` when adding new pages.
