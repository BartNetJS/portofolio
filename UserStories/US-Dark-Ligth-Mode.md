[Unverified]
Below is a **clean, minimal, visitor-controlled dark/light mode implementation** for a **plain HTML site**, without frameworks.
Everything here is based on widely used browser features and observed behavior; exact Edge internals cannot be fully verified.

---

## Design goals (what this solves)

* ✅ Visitor can **choose** light or dark
* ✅ Choice is **remembered**
* ✅ Respects **system preference** by default
* ✅ Works on **simple static HTML**
* ⚠️ Cannot fully override **Edge Android “force dark”** (browser-side)

---

## 1. HTML (toggle button)

```html
<button id="theme-toggle" aria-label="Toggle dark mode">
  🌙
</button>
```

Place it anywhere (header/footer).

---

## 2. CSS (light + dark themes)

Use **CSS variables** so everything stays simple.

```css
:root {
  --bg: #ffffff;
  --text: #111111;
}

[data-theme="dark"] {
  --bg: #0f1216;
  --text: #e6e6e6;
}

html {
  background-color: var(--bg);
  color: var(--text);
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
```

---

## 3. Respect system preference (default only)

This applies **only if the user has not chosen yet**.

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #0f1216;
    --text: #e6e6e6;
  }
}
```

---

## 4. JavaScript (toggle + persistence)

```html
<script>
  const toggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  toggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
</script>
```

---

## 5. Optional: better UX (icon swap)

```js
toggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
```

---

## 6. Important reality check (Edge Android)

You **cannot fully prevent** this behavior:

* Edge Android may **ignore your choice**
* It may still apply **forced dark mode**
* This happens **after rendering**, outside your control

What you *can* do:

* Use **explicit background & text colors**
* Avoid relying on transparent backgrounds
* Test with Edge “Force dark” ON/OFF

---

## 7. Resulting behavior matrix

| Scenario       | Result                             |
| -------------- | ---------------------------------- |
| First visit    | Uses system preference             |
| User toggles   | User choice wins                   |
| Refresh        | Choice remembered                  |
| Chrome Android | Works exactly                      |
| Edge Android   | Works unless force-dark is enabled |

---

## 8. Recommendation (best practice)

This pattern is considered **best practice** for simple sites:

* No framework
* No build step
* Fully accessible
* Future-proof

---

If you want, I can:

* Refine colors for readability under Edge force-dark
* Add a **3-state toggle** (light / dark / system)
* Convert this into a **single drop-in `<script>` file**

Just tell me.

---

## Quick test instructions

1. Start the local server from the repo root:

```powershell
./start-server.sh # or start-server.bat on Windows
```

2. Open `http://localhost:8000/` and verify the bottom navigation appears.

3. Click the Theme button in the bottom navigation and observe colors toggle.

4. Reload the page — the chosen theme should persist.

5. To test system preference behavior, clear `localStorage.theme` in DevTools and refresh; the site should follow your OS dark mode setting.

6. Note: Edge Android may apply a forced dark mode after rendering; test with force-dark ON/OFF when possible.
