# Copilot Instructions — Repository Context

Purpose: make AI coding agents immediately productive in this repository (static portfolio + project pages).

Quick summary
- This is a static HTML/CSS portfolio site served from the repository root and intended for GitHub Pages. Key runtime is a plain HTTP server (no build step).
- Primary folders: `portfolio/` (hub, projects, presentations). Each project or presentation is an independent folder with its own `index.html` and optional `assets/`.

Big-picture architecture (what matters)
- Static content only: no backend code lives here. Expect plain HTML, CSS (Tailwind via CDN), and assets (images, PDFs).
- Each sub-folder is a standalone site entry point. Example: `portfolio/projects/ai-knowledge-app/index.html` and `portfolio/index.html`.
- The repository exposes lightweight AI metadata for assistants: top-level `index.html` includes `meta` tags like `ai-summary`, `ai-keywords` and links to `llms.txt` / `llms-full.txt` via `rel="ai-info"` and `alternate`.

Developer workflows (explicit commands)
- Local preview (preferred): run an HTTP server from the repository root. Recommended commands:
  - Windows (batch): double-click `start-server.bat` in the repo root.
  - Python: `python -m http.server 8000` then open `http://localhost:8000`.
  - VS Code: use Live Server extension and open `index.html`.
- GitHub Pages: deploy from the repo root (Settings → Pages) with the branch set to `main` (or your branch) and folder `/`.
- Keep `branch-info.json` updated when previewing non-default branches — the site reads it to display a branch banner.

Project-specific conventions and patterns
- Root-relative paths: links and image `src` should start with `/` when referencing top-level paths (examples in `index.html`). This repository intentionally uses root-relative links for GitHub Pages compatibility.
- Every folder intended as a site page must include an `index.html` (404s happen otherwise).
- Shared CSS is loaded from CDN (Tailwind) directly in pages; do not expect a local CSS build step.
- Backlinks use relative sibling navigation like `../../` from a project page to the portofolio root — preserve this pattern when adding pages.

Integration points and external dependencies
- Google Analytics / gtag is referenced in `index.html` (remove or replace if privacy rules require it).
- Fonts and Tailwind are loaded from Google Fonts and the Tailwind CDN respectively.
- Some project pages describe integrations (e.g., `AI Knowledge App` documents MCP, .NET workers, vector DBs) but those implementations are external — code for those systems is not in this repo; links point to other GitHub repos.

- Custom domain: the repo contains a `CNAME` file with `www.codeware.be`. GitHub Pages will configure that domain when deployed; update or remove the `CNAME` when previewing forks if you need the default `github.io` URL.

What to change and how to test changes
- Adding a new project: create `portfolio/projects/<name>/index.html` and optional `assets/`. Update the hub (`portfolio/index.html`) with a new card link using the same markup pattern.
- When editing links, test with `python -m http.server 8000` and open `http://localhost:8000` to validate navigation and back buttons.
- For quick previews of branches, use GitHub Pages deploy-from-branch; keep `branch-info.json` in-sync when automating deployments.

Files to inspect when working on features
- Hub and root: `index.html`, `portfolio/index.html`
- Local testing guidance: `LOCAL_TESTING.md`, `start-server.bat`, `start-server.sh`
- AI/assistant hints: `llms.txt`, `llms-full.txt`, and top-level `index.html` meta tags
- Per-project examples: `portfolio/projects/ai-knowledge-app/index.html` and `portfolio/presentations/TEMPLATE.md` (presentation template)

Agent behaviour expectations
- Keep changes minimal and isolated: this repository intentionally has many small, independent pages. Avoid global refactors unless instructed.
- Preserve root-relative link style and per-folder `index.html` conventions.
- Do not add build tooling unless requested; prefer simple, copy-paste HTML edits and asset additions.
- When updating content that mentions external systems (MCP, .NET workers), add references or links only — don't attempt to implement external services in this repo.

Example tasks the agent can do safely
- Add a new project page and a matching card in the hub (`portfolio/index.html`).
- Fix broken image paths by converting relative references to root-relative when appropriate.
- Add or update `ai-summary` metadata and `llms.txt` links to improve assistant context.

When to ask for human help
- Adding backend code, CI/CD pipelines, or deploying external services (MCP servers, vector DBs) — these are out-of-scope for this static repo.
- If a change requires modifying a large number of files across folders or altering navigation patterns, ask before proceeding.

Feedback
If any instructions are unclear or you want the agent to follow stricter conventions (naming, metadata, or accessibility rules), describe the desired policy and the agent will adapt.
