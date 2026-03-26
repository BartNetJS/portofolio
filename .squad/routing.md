# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Landing pages, portfolio pages, shared UI | Livingston | `index.html`, portfolio pages, navigation, responsive HTML/CSS/JS work |
| Blog structure, metadata, copy, SEO | Linus | Blog posts, titles, descriptions, metadata, internal linking, AI summaries |
| Deploy pipeline and repo automation | Basher | GitHub Actions, Pages publishing, workflow fixes, release hygiene |
| Cross-page QA and regression checks | Yen | Navigation checks, link validation, mobile/desktop smoke tests |
| Shared architecture and cross-cutting changes | Rusty | Shared assets, project structure, review, prioritization |
| Code review | Rusty | Review PRs, check quality, suggest improvements |
| Testing | Yen | Write tests, find edge cases, verify fixes |
| Scope & priorities | Rusty | What to build next, trade-offs, decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Rusty |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
