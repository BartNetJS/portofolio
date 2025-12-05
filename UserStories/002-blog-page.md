# US-002: Blog Page for Portfolio Website

Add a blog section to the Codeware portfolio website to share technical insights, AI developments, and industry expertise. Since the site runs as GitHub Pages, the blog solution must be compatible with static site hosting.

---

## Goal

Create a blog section that:

- Integrates seamlessly with the existing Codeware site design
- Is easy to maintain and add new posts
- Supports SEO and social sharing
- Works within GitHub Pages constraints (static hosting, no server-side processing)

---

## Blog Hosting Options Analysis

### Option 1: Jekyll (Native GitHub Pages)

**Description**: Jekyll is GitHub's native static site generator, built into GitHub Pages.

**Pros**:

- ✅ **Zero configuration** - GitHub Pages builds Jekyll sites automatically
- ✅ **Free hosting and builds** - No external CI/CD needed
- ✅ **Markdown support** - Write posts in Markdown
- ✅ **Themes available** - Many blog themes, easy to customize
- ✅ **Liquid templating** - Powerful templating for layouts
- ✅ **Categories/tags** - Built-in support for organizing posts
- ✅ **Draft support** - Keep unpublished posts separate

**Cons**:

- ❌ **Ruby dependency** - Requires Ruby for local development
- ❌ **Build constraints** - Limited to GitHub-allowed plugins
- ❌ **Mixed with existing HTML** - Would need to restructure existing static files
- ❌ **Learning curve** - Jekyll-specific conventions

**Integration Strategy**:

```
portefolio/
├── _config.yml           # Jekyll configuration
├── _posts/               # Blog posts
│   └── 2025-01-15-first-post.md
├── _layouts/             # Templates
│   └── post.html
├── blog/
│   └── index.html        # Blog listing
├── index.html            # Keep existing static design
└── portfolio/            # Keep existing structure
```

**Recommended for**: Best integration option if willing to adopt Jekyll conventions.

---

### Option 2: Hugo (Static Generator with GitHub Actions)

**Description**: Hugo is an extremely fast static site generator written in Go.

**Pros**:

- ✅ **Blazing fast builds** - Builds in milliseconds
- ✅ **Single binary** - No dependencies, easy local setup
- ✅ **Rich ecosystem** - Many themes and shortcodes
- ✅ **Markdown with extras** - Supports more formatting options
- ✅ **Multilingual support** - Built-in i18n

**Cons**:

- ❌ **Requires GitHub Actions** - Need custom CI/CD workflow
- ❌ **Separate workflow** - Build step before deployment
- ❌ **Go templating** - Different from Liquid/HTML templating
- ❌ **Potential complexity** - More setup than Jekyll

**Integration Strategy**:

```yaml
# .github/workflows/hugo.yml
name: Hugo Build
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-hugo@v2
      - run: hugo --minify
      - uses: peaceiris/actions-gh-pages@v3
```

**Recommended for**: If you want maximum speed and flexibility.

---

### Option 3: Pure HTML/CSS Blog (No Generator)

**Description**: Manually create blog posts as static HTML files matching existing design.

**Pros**:

- ✅ **Zero dependencies** - No build tools required
- ✅ **Full control** - Complete design flexibility
- ✅ **Consistent with existing site** - Same tech stack
- ✅ **No learning curve** - Just HTML/CSS
- ✅ **Instant deployment** - Push and done

**Cons**:

- ❌ **Manual work** - No Markdown, templates, or automation
- ❌ **No index generation** - Must manually update blog listing
- ❌ **Repetitive** - Copy/paste layouts for each post
- ❌ **No RSS/sitemap auto-generation**

**Integration Strategy**:

```
portefolio/
├── blog/
│   ├── index.html        # Blog listing (manual update)
│   └── posts/
│       ├── 2025-01-first-post/
│       │   └── index.html
│       └── 2025-02-second-post/
│           └── index.html
├── index.html            # Main site (add blog link)
└── portfolio/            # Existing structure
```

**Recommended for**: Minimal blogging needs (few posts per year).

---

### Option 4: 11ty (Eleventy)

**Description**: A simpler, JavaScript-based static site generator.

**Pros**:

- ✅ **JavaScript ecosystem** - Familiar for web developers
- ✅ **Zero-config start** - Works with existing HTML
- ✅ **Multiple template engines** - Nunjucks, Liquid, Markdown, etc.
- ✅ **Fast builds** - Very performant
- ✅ **Data-driven** - Easy JSON/YAML data integration

**Cons**:

- ❌ **Node.js dependency** - Requires npm for local dev
- ❌ **GitHub Actions required** - No native Pages support
- ❌ **Less ecosystem** - Fewer themes than Jekyll/Hugo

**Integration Strategy**:

```
portefolio/
├── .eleventy.js          # Config file
├── src/
│   ├── blog/
│   │   └── posts/        # Markdown posts
│   └── _includes/        # Layouts
└── package.json
```

**Recommended for**: JavaScript developers who want flexibility.

---

### Option 5: External Blog Platforms (Headless CMS)

**Description**: Use external platforms like DEV.to, Hashnode, or Medium with embeds/links.

**Pros**:

- ✅ **Built-in audience** - Platforms have discovery features
- ✅ **No maintenance** - Platform handles infrastructure
- ✅ **Cross-posting** - Reach multiple audiences
- ✅ **Comments built-in** - Community features included

**Cons**:

- ❌ **External branding** - Posts live on another domain
- ❌ **Platform dependency** - Content locked to platform
- ❌ **Less SEO benefit** - Backlinks instead of direct hosting
- ❌ **Style inconsistency** - Different look from main site

**Integration Strategy**:

- Create simple blog/ page that shows blog previews/links
- Use APIs to pull latest posts (if available)
- Cross-post important content

**Recommended for**: Content marketing with broad reach priority.

---

## Recommendation

### 🏆 Best Choice: **Jekyll (Option 1)**

For the Codeware portfolio running on GitHub Pages, **Jekyll** is the recommended solution:

| Factor                 | Reason                                                    |
| ---------------------- | --------------------------------------------------------- |
| **Native Integration** | GitHub Pages builds Jekyll automatically - no CI/CD setup |
| **Markdown Writing**   | Easy to write and maintain posts                          |
| **SEO**                | Built-in sitemap, RSS feed generation                     |
| **Existing Design**    | Can incorporate current CSS/design into layouts           |
| **Low Friction**       | Just add `_posts/` folder and config                      |

### Alternative: Pure HTML (Option 3)

If blogging frequency is low (< 6 posts/year), **pure HTML** avoids any tooling complexity while staying consistent with the current stack.

---

## Implementation Plan

### Phase 1: Setup Jekyll Blog

1. Add `_config.yml` with site settings
2. Create `_layouts/` with `post.html` template
3. Create `blog/index.html` listing page
4. Add first blog post in `_posts/`

### Phase 2: Integrate with Existing Design

1. Match existing dark theme colors and typography
2. Add blog link to navbar
3. Ensure responsive design

### Phase 3: SEO & Social

1. Configure Jekyll SEO plugin (allowed in GitHub Pages)
2. Add Open Graph meta tags
3. Generate RSS feed
4. Update sitemap.xml

---

## File Structure (Jekyll Implementation)

```
portefolio/
├── _config.yml                 # [NEW] Jekyll configuration
├── _layouts/
│   ├── default.html           # [NEW] Base layout
│   └── post.html              # [NEW] Blog post layout
├── _includes/
│   ├── navbar.html            # [NEW] Shared navigation
│   └── footer.html            # [NEW] Shared footer
├── _posts/
│   └── 2025-12-05-welcome.md  # [NEW] First blog post
├── blog/
│   └── index.html             # [NEW] Blog listing page
├── assets/
│   └── css/
│       └── blog.css           # [NEW] Blog-specific styles
├── index.html                  # [MODIFY] Add blog link to nav
└── portfolio/                  # [UNCHANGED]
```

---

## Success Criteria

- [ ] Jekyll is configured and builds successfully on GitHub Pages
- [ ] Blog listing page shows all posts with excerpts
- [ ] Individual post pages render with consistent design
- [ ] Navbar includes Blog link on all pages
- [ ] Posts support Markdown with code highlighting
- [ ] RSS feed is generated
- [ ] Mobile responsive design matches main site
- [ ] First blog post is published

---

## Example First Post

```markdown
---
layout: post
title: "Welcome to the Codeware Blog"
date: 2025-12-05
author: Bart Van der Auweraert
categories: [ai, enterprise]
tags: [announcement, ai-agents]
excerpt: "Sharing insights from 40+ years of software engineering, now focused on enterprise AI solutions."
---

# Welcome to the Codeware Blog

We're excited to launch this blog to share our technical insights on AI engineering,
Azure cloud architecture, and enterprise software development...
```

---

## Decision Required

> [!IMPORTANT]
> Before implementation, please confirm:
>
> 1. **Jekyll** is acceptable, or would you prefer pure HTML for simplicity?
> 2. Should the blog be at `/blog/` or a different path?
> 3. Any specific topics planned for initial blog posts?
