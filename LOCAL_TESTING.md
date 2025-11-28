# Local Testing Guide

## Quick Start - Test Now! (3 Easy Options)

### Option 1: Double-click the batch file (Windows - Easiest!)

1. Go to: `c:\Users\BartVanderAuweraert\Sources\portefolio\`
2. Double-click: `start-server.bat`
3. Browser opens automatically to `http://localhost:8000`

### Option 2: Command line

```bash
cd c:\Users\BartVanderAuweraert\Sources\portefolio
python -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically

---

## ✅ All Links Work Perfectly With HTTP Server!

- Portofolio hub displays at `http://localhost:8000`
- Initum-AZ portofolio at `http://localhost:8000/projects/initum-az/`
- Invoicing App at `http://localhost:8000/projects/invoicing-app/`
- Back buttons return to hub correctly

---

## How to Test Locally

### Option 1: Using Python HTTP Server (Recommended)

```bash
cd c:\Users\BartVanderAuweraert\Sources\portefolio

# Python 3.x
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option 2: Using Node.js http-server

```bash
npm install -g http-server
cd c:\Users\BartVanderAuweraert\Sources\portefolio
http-server

# Then open: http://localhost:8080
```

### Option 3: VS Code Live Server

1. Install "Live Server" extension by Ritwick Dey
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically at `http://localhost:5500`

---

## Why File URLs Don't Work

When you open HTML directly with `file:///C:/Users/.../index.html`:
- ❌ Relative links like `projects/initum-az/` break
- ❌ Back buttons that go `../../` won't work correctly
- ❌ It's the browser's security model, not a code issue

---

## How It Works

All links use **relative paths** that work everywhere:

- Root index.html links to: `projects/initum-az/` ✅
- Portofolio pages link back: `../../` ✅
- Works with HTTP server ✅
- Works on GitHub Pages ✅

When you test locally with `python -m http.server 8000`:
- **Root**: `http://localhost:8000` → Portofolio hub
- **Initum-AZ**: `http://localhost:8000/projects/initum-az/` → Portofolio page
- **Invoicing App**: `http://localhost:8000/projects/invoicing-app/` → Portofolio page

All navigation works perfectly!

---

## GitHub Pages Deployment

After pushing to GitHub and enabling Pages, you'll have:

- **Root**: `https://username.github.io/portefolio/`
- **Portofolios**: `https://username.github.io/portefolio/projects/initum-az/`
- **Back buttons**: Work correctly in all pages

Same code, same links, works everywhere! 🎉
