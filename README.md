# Portofolio & Presentations Hub

A scalable portofolio system for showcasing expertise and hosting client-specific presentations on GitHub Pages.

## 📁 Structure

```
portefolio/
├── index.html                      # Landing page - links to all portofolios & presentations
│
├── projects/                       # Portofolio showcase projects
│   └── initum-az/
│       ├── index.html             # Portofolio page
│       └── assets/                # Images, documents, etc. (optional)
│
├── presentations/                  # Client-specific presentations
│   ├── client-project-1/
│   │   ├── index.html
│   │   └── assets/
│   └── client-project-2/
│       ├── index.html
│       └── assets/
│
└── README.md                       # This file
```

## 🎯 Two Categories

### 📚 **Portofolio Projects** (`/projects/`)
Personal portofolio pieces showcasing your expertise, skills, and significant work. These are **polished, reusable showcases** that represent your brand and capabilities.

- **Initum-AZ** - Team leadership & GenAI expertise portofolio
- Future portofolios for different expertise areas

### 🎯 **Client Presentations** (`/presentations/`)
**Project-specific, client-tailored** presentations for active engagements. These are **temporary** and customized for specific clients/projects.

- Client Project presentations
- Custom documentation for specific engagements
- Easy to add/remove as projects conclude

---

## 🚀 Quick Start

### Adding a Portofolio Project

```bash
# 1. Create folder structure
mkdir -p projects/my-portofolio
touch projects/my-portofolio/index.html

# 2. Add to root index.html with:
<a href="/projects/my-portofolio/" class="portofolio-card">
    <h3>My Portofolio</h3>
    <div class="role">Your Role</div>
    <p>Description...</p>
    <div class="tags">
        <span class="tag">Tech 1</span>
        <span class="tag">Tech 2</span>
    </div>
    <span class="cta">View Portofolio →</span>
</a>

# 3. In portofolio/index.html add:
<a href="/" class="back-link">← Back to Portofolios</a>

# 4. Commit and push
git add .
git commit -m "Add my-portofolio project"
git push
```

### Adding a Client Presentation

```bash
# 1. Create folder structure
mkdir -p presentations/client-xyz
touch presentations/client-xyz/index.html

# 2. Add to root index.html with:
<a href="/presentations/client-xyz/" class="portofolio-card">
    <h3>Client XYZ</h3>
    <div class="role">Project Title</div>
    <p>Description...</p>
    <span class="cta">View Presentation →</span>
</a>

# 3. In presentation/index.html add:
<a href="/" class="back-link">← Back to Presentations</a>

# 4. Commit and push
git add .
git commit -m "Add Client XYZ presentation"
git push
```

---

## 🌐 GitHub Pages Setup

### Enable GitHub Pages

1. Go to your GitHub repo: `https://github.com/YOUR-USERNAME/portefolio`
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - **Deploy from a branch**
   - Branch: **main** (or **master**)
   - Folder: **/ (root)**
4. Click **Save**
5. Wait 1-3 minutes for deployment

### Preview a feature branch in GitHub (no local server needed)

If you're away from your PC, you can still preview any branch directly from GitHub Pages:

1. Open the repository (or your fork) in GitHub and create/switch to the branch you want to preview.
2. Go to **Settings → Pages**.
3. Under "Source", choose **Deploy from a branch**.
4. Select the branch you want to preview and the **/** (root) folder.
5. Click **Save** and wait 1–3 minutes for the deploy to finish.
6. Open `https://<your-user>.github.io/portofolio/` to see that branch live (use an incognito tab if caching is sticky).

> Tip: If the site has a custom domain configured, temporarily clear the custom domain field in **Settings → Pages** when previewing from a fork so the default `github.io` URL works.

#### Show the deployed branch on the page

- The site will display a thin banner when the deployed branch is **not** `master`.
- Keep `branch-info.json` updated with the current branch name so the banner stays accurate (example GitHub Actions step: `echo '{"branch":"'"'${GITHUB_REF_NAME}'"'"}' > branch-info.json`).
- You can also override for ad-hoc previews via `?branch=<name>` or a `<meta name="deployed-branch" content="branch-name" />` in the `<head>`.

### Live URLs

After enabling GitHub Pages, your sites will be live at:

- **Root Hub**: `https://YOUR-USERNAME.github.io/portefolio/`
- **Initum-AZ Portofolio**: `https://YOUR-USERNAME.github.io/portefolio/projects/initum-az/`
- **Client Presentations**: `https://YOUR-USERNAME.github.io/portefolio/presentations/client-xyz/`

- **Production site (custom domain)**: https://www.codeware.be (this repository includes a `CNAME` file with `www.codeware.be`)

### Custom Domain (Optional)

If you own a domain:

1. Go to **Settings → Pages → Custom domain**
2. Enter your domain (e.g., `portofolio.example.com`)
3. Configure DNS records at your domain provider:
   ```
   A    @     185.199.108.153
   A    @     185.199.109.153
   A    @     185.199.110.153
   A    @     185.199.111.153
   ```
4. Wait for DNS propagation (24 hours)

---

## 💡 Best Practices

### ✅ DO

- Use **root-relative paths** in links: `href="/projects/initum-az/"`
- Use **root-relative paths** for images: `src="/projects/initum-az/assets/image.jpg"`
- Keep each portofolio/presentation **independent**
- Use consistent styling across projects
- Add a back-link on every sub-page
- Keep file sizes small for fast loading

### ❌ DON'T

- Use relative paths like `href="projects/initum-az/"`
- Use local file:// URLs
- Store large files (use GitHub Releases if needed)
- Copy styles into every project (use shared CSS later if needed)

---

## 📊 File Structure Example

After adding several projects/presentations:

```
portefolio/
├── index.html
├── projects/
│   ├── initum-az/
│   │   ├── index.html
│   │   └── assets/
│   ├── azure-solutions/
│   │   └── index.html
│   └── ai-toolkit/
│       └── index.html
├── presentations/
│   ├── acme-corp/
│   │   ├── index.html
│   │   └── assets/
│   ├── fintech-demo/
│   │   └── index.html
│   └── healthcare-poc/
│       └── index.html
└── README.md
```

---

## 🔧 Troubleshooting

### Site not loading
- Check GitHub Pages deployment status in **Settings → Pages**
- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Wait 2-3 minutes after pushing

### 404 on portofolio pages
- Verify each folder has an `index.html`
- Check links use root-relative paths: `/projects/project-name/`
- Check file naming matches links exactly

### Images not showing
- Use root-relative paths: `/projects/project-name/assets/image.jpg`
- Or relative to HTML: `./assets/image.jpg`
- Verify file exists in correct folder

### Links going to wrong place
- All links should start with `/` when linking from root
- Example: `<a href="/projects/initum-az/">` ✅
- Not: `<a href="projects/initum-az/">` ❌

---

## 📝 Summary

This structure gives you:

✅ **One hub** (`index.html`) linking to everything
✅ **Scalable portofolios** for career growth
✅ **Client separation** with presentations folder
✅ **Easy to manage** - just add folders and update index.html
✅ **Professional hosting** on GitHub Pages
✅ **Fast loading** - pure HTML/CSS (no database)

Start with **Initum-AZ** as your flagship portofolio, then add more portofolios as you complete significant work!
