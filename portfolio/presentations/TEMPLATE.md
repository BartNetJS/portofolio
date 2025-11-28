# Client Presentation Template

Use this template to quickly create new client presentations.

## Steps to Create a New Presentation

### 1. Create folder
```bash
mkdir presentations/client-name
```

### 2. Copy this template
Copy the HTML below and save as `presentations/client-name/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Name - Project Presentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            min-height: 100vh;
            padding: 40px 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #60a5fa;
            text-decoration: none;
            font-size: 0.95rem;
            margin-bottom: 30px;
            transition: color 0.3s ease;
        }

        .back-link:hover {
            color: #e94560;
        }

        header {
            text-align: center;
            margin-bottom: 50px;
            padding-bottom: 30px;
            border-bottom: 2px solid #0f3460;
        }

        h1 {
            font-size: 2.5rem;
            color: #e94560;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 1.2rem;
            color: #94a3b8;
        }

        .section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            border-left: 4px solid #e94560;
        }

        .section h2 {
            color: #e94560;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .section p, .section li {
            color: #cbd5e1;
            font-size: 0.95rem;
            line-height: 1.8;
            margin-bottom: 15px;
        }

        .section ul {
            margin-left: 20px;
        }

        footer {
            text-align: center;
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #0f3460;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to Presentations</a>

        <header>
            <h1>Client Name</h1>
            <p class="subtitle">Project Title / Engagement</p>
        </header>

        <div class="section">
            <h2>Project Overview</h2>
            <p>
                Brief description of the project, goals, and business context.
            </p>
        </div>

        <div class="section">
            <h2>Challenges</h2>
            <ul>
                <li>Challenge 1</li>
                <li>Challenge 2</li>
                <li>Challenge 3</li>
            </ul>
        </div>

        <div class="section">
            <h2>Solution</h2>
            <p>
                Description of the approach and solution implemented.
            </p>
            <ul>
                <li>Solution component 1</li>
                <li>Solution component 2</li>
            </ul>
        </div>

        <div class="section">
            <h2>Technology Stack</h2>
            <ul>
                <li>Technology 1</li>
                <li>Technology 2</li>
                <li>Technology 3</li>
            </ul>
        </div>

        <div class="section">
            <h2>Results & Impact</h2>
            <ul>
                <li>Result 1</li>
                <li>Result 2</li>
                <li>Result 3</li>
            </ul>
        </div>

        <footer>
            <p>© 2024 Bart Van der Auweraert</p>
            <p style="margin-top: 15px; color: #94a3b8;">Confidential - For Client Use Only</p>
        </footer>
    </div>
</body>
</html>
```

### 3. Update root index.html

Add to the "Client Presentations" section in `/index.html`:

```html
<a href="/presentations/client-name/" class="portofolio-card">
    <h3>Client Name</h3>
    <div class="role">Project Title</div>
    <p>Brief description of the engagement and deliverables.</p>
    <div class="tags">
        <span class="tag">Technology 1</span>
        <span class="tag">Technology 2</span>
    </div>
    <span class="cta">View Presentation →</span>
</a>
```

### 4. Customize and commit

- Edit the HTML file with your client-specific content
- Add assets to `presentations/client-name/assets/` if needed
- Commit: `git add . && git commit -m "Add client-name presentation"`
- Push: `git push`

---

## Tips

- Keep presentations **professional and concise**
- Use the consistent styling across all presentations
- Include only **relevant information** for the client
- Add **assets/** folder if you need images/documents
- The same styling as main index works great

## Example: Presentation for "Acme Corp"

```
presentations/
└── acme-corp/
    ├── index.html
    └── assets/
        ├── architecture.png
        └── dashboard.png
```

Then in HTML:
```html
<img src="./assets/architecture.png" alt="System Architecture">
```

Done! Now your presentation is live on GitHub Pages.
