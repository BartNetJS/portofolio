(() => {
  const ensureMaterialIcons = () => {
    const exists = document.querySelector('link[href*="icon?family=Material+Icons"]');
    if (exists) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined";
    document.head.appendChild(link);
  };

  const getDatasetActive = () =>
    (document.currentScript && document.currentScript.dataset.navActive) ||
    document.body.dataset.navActive ||
    document.documentElement.dataset.navActive ||
    null;

  const resolveActiveFromLocation = () => {
    const path = window.location.pathname || "/";
    const hash = (window.location.hash || "").replace("#", "");

    if (path.startsWith("/portfolio")) return "portfolio";
    if (path.startsWith("/Blogs")) return "blogs";

    switch (hash) {
      case "services":
        return "services";
      case "portfolio":
        return "portfolio";
      case "blogs":
        return "blogs";
      case "about":
        return "about";
      case "contact":
        return "contact";
      case "home":
        return "home";
      default:
        return null;
    }
  };

  const renderNav = () => {
    if (document.getElementById("cw-bottom-nav")) return;

    const initialActive = resolveActiveFromLocation() || getDatasetActive() || "home";

    ensureMaterialIcons();

    if (!document.getElementById("cw-bottom-nav-styles")) {
      const style = document.createElement("style");
      style.id = "cw-bottom-nav-styles";
      style.textContent = `
        :root {
          --cw-nav-bg-light: rgba(255, 255, 255, 0.9);
          --cw-nav-bg-dark: rgba(31, 41, 55, 0.9);
          --cw-nav-border-light: #e5e7eb;
          --cw-nav-border-dark: #374151;
          --cw-nav-text-light: #6b7280;
          --cw-nav-text-dark: #d1d5db;
          --cw-nav-active: #2563eb;
        }

        #cw-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--cw-nav-bg-light);
          border-top: 1px solid var(--cw-nav-border-light);
          backdrop-filter: blur(10px);
          z-index: 50;
          color: var(--cw-nav-text-light);
          font-family: "Roboto", "Segoe UI", Arial, sans-serif;
        }

        body.dark #cw-bottom-nav,
        .dark #cw-bottom-nav {
          background: var(--cw-nav-bg-dark);
          border-top: 1px solid var(--cw-nav-border-dark);
          color: var(--cw-nav-text-dark);
        }

        .cw-bottom-nav__container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1rem;
        }

        @media (min-width: 768px) {
          .cw-bottom-nav__container {
            padding-right: 20rem;
          }
        }

        .cw-bottom-nav__list {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 80px;
        }

        .cw-bottom-nav__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 80px;
          text-decoration: none;
          color: inherit;
          font-size: 12px;
          font-weight: 500;
          position: relative;
          transition: color 0.2s ease, opacity 0.2s ease;
        }

        .cw-bottom-nav__item:hover {
          color: #374151;
        }

        body.dark .cw-bottom-nav__item:hover,
        .dark .cw-bottom-nav__item:hover {
          color: #f3f4f6;
        }

        .cw-bottom-nav__icon {
          font-family: "Material Icons Outlined";
          font-size: 24px;
          line-height: 1;
        }

        .cw-bottom-nav__indicator {
          display: block;
          width: 32px;
          height: 4px;
          border-radius: 999px;
          background: var(--cw-nav-active);
          box-shadow: 0 6px 14px rgba(37, 99, 235, 0.35);
          margin-top: 4px;
        }

        .cw-bottom-nav__item.is-active {
          color: var(--cw-nav-active);
          font-weight: 700;
        }

          /* Floating theme toggle (top-right) */
          #cw-theme-float {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 60;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.5rem 0.75rem;
            border-radius: 10px;
            background: rgba(255,255,255,0.9);
            color: #0f1724;
            box-shadow: 0 6px 18px rgba(2,6,23,0.35);
            border: 1px solid rgba(15,23,36,0.08);
            font-weight: 600;
            cursor: pointer;
          }

          body.dark #cw-theme-float,
          .dark #cw-theme-float {
            background: rgba(17,24,39,0.7);
            color: #e6eef8;
            border: 1px solid rgba(255,255,255,0.06);
          }

          #cw-theme-float .material-icons-outlined {
            font-size: 20px;
          }

          /* More popup styles */
          #cw-more-menu {
            position: fixed;
            bottom: 88px; /* above bottom nav */
            right: 1rem;
            z-index: 70;
            min-width: 160px;
            background: rgba(255,255,255,0.98);
            border-radius: 10px;
            box-shadow: 0 8px 24px rgba(2,6,23,0.35);
            border: 1px solid rgba(15,23,36,0.08);
            transform-origin: bottom right;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.18s ease, transform 0.18s ease;
            padding: 0.5rem;
          }

          #cw-more-menu.is-open {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(-6px);
          }

          #cw-more-menu .cw-more-menu__inner {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .cw-more-menu__item {
            display: flex;
            flex-direction: row; /* icon left, label right */
            align-items: center;
            gap: 0.75rem;
            padding: 0.6rem 0.9rem;
            border-radius: 8px;
            color: inherit;
            text-decoration: none;
            min-width: 180px;
            justify-content: flex-start;
          }

          .cw-more-menu__item:hover {
            background: rgba(0,0,0,0.04);
          }

          body.dark #cw-more-menu {
            background: rgba(17,24,39,0.85);
            border: 1px solid rgba(255,255,255,0.06);
          }

          /* Responsive: hide collapsed items and show More button on small screens */
          @media (max-width: 540px) {
            .cw-bottom-nav__item[data-key="about"],
            .cw-bottom-nav__item[data-key="contact"] {
              display: none;
            }
            #cw-more-button {
              display: inline-flex;
            }
          }

          @media (min-width: 541px) {
            #cw-more-button {
              display: none;
            }
            #cw-more-menu {
              display: none;
            }
          }

        body.dark .cw-bottom-nav__item.is-active,
        .dark .cw-bottom-nav__item.is-active {
          color: var(--cw-nav-active);
        }
      `;
      document.head.appendChild(style);
    }

    const navItems = [
      {
        key: "home",
        label: "Home",
        href: "/#home",
        icon: "home",
      },
      {
        key: "services",
        label: "Services",
        href: "/#services",
        icon: "list_alt",
      },
      {
        key: "portfolio",
        label: "Portfolio",
        href: "/portfolio/index.html",
        icon: "work_outline",
      },
      {
        key: "blogs",
        label: "Blogs",
        href: "/Blogs/index.html",
        icon: "article",
      },
      {
        key: "about",
        label: "About",
        href: "/#about",
        icon: "info",
        collapseOnMobile: true,
      },
      {
        key: "contact",
        label: "Contact",
        href: "/#contact",
        icon: "mail_outline",
        collapseOnMobile: true,
      },
    ];

    // Theme toggle item (not a navigation link)
      // Create a floating theme toggle (top-right)
      const themeFloat = document.createElement("button");
      themeFloat.id = "cw-theme-float";
      themeFloat.type = "button";
      themeFloat.setAttribute("aria-label", "Toggle dark mode");
      themeFloat.setAttribute("title", "Toggle dark mode");
      themeFloat.innerHTML = `<span class="material-icons-outlined" aria-hidden="true">dark_mode</span><span class="cw-theme-label">Dark</span>`;

    const nav = document.createElement("nav");
    nav.id = "cw-bottom-nav";
    nav.className = "cw-bottom-nav";
    nav.setAttribute("aria-label", "Bottom navigation");

    const container = document.createElement("div");
    container.className = "cw-bottom-nav__container";

    const list = document.createElement("div");
    list.className = "cw-bottom-nav__list";

    navItems.forEach((item) => {
      const link = document.createElement("a");
      link.className = "cw-bottom-nav__item";
      link.href = item.href;
      link.setAttribute("data-key", item.key);
      link.innerHTML = `
        <span class="cw-bottom-nav__icon material-icons-outlined" aria-hidden="true">${item.icon}</span>
        <span class="cw-bottom-nav__label">${item.label}</span>
      `;
      list.appendChild(link);
    });

    // Create a 'More' button and popup menu that will appear on small screens
    const moreButton = document.createElement('button');
    moreButton.id = 'cw-more-button';
    moreButton.type = 'button';
    moreButton.className = 'cw-bottom-nav__item';
    moreButton.setAttribute('aria-haspopup', 'true');
    moreButton.setAttribute('aria-expanded', 'false');
    moreButton.innerHTML = `
      <span class="cw-bottom-nav__icon material-icons-outlined" aria-hidden="true">more_horiz</span>
      <span class="cw-bottom-nav__label">More</span>
    `;

    const moreMenu = document.createElement('div');
    moreMenu.id = 'cw-more-menu';
    moreMenu.setAttribute('role', 'menu');
    moreMenu.setAttribute('aria-hidden', 'true');
    moreMenu.innerHTML = '<div class="cw-more-menu__inner"></div>';

    // Add collapsed items into the popup menu
    const inner = moreMenu.querySelector('.cw-more-menu__inner');
    navItems.filter(i => i.collapseOnMobile).forEach((item) => {
      const a = document.createElement('a');
      a.className = 'cw-bottom-nav__item cw-more-menu__item';
      a.href = item.href;
      a.setAttribute('role', 'menuitem');
      a.innerHTML = `
        <span class="cw-bottom-nav__icon material-icons-outlined" aria-hidden="true">${item.icon}</span>
        <span class="cw-bottom-nav__label">${item.label}</span>
      `;
      inner.appendChild(a);
    });

    // Append the more button into the visible list; the menu is appended to body
    list.appendChild(moreButton);
    document.body.appendChild(moreMenu);

    // Append theme float to the document (outside the bottom nav)
    document.body.appendChild(themeFloat);

    container.appendChild(list);
    nav.appendChild(container);
    document.body.appendChild(nav);

    const applyActive = (key) => {
      const items = nav.querySelectorAll(".cw-bottom-nav__item");
      items.forEach((el) => {
        el.classList.remove("is-active");
        el.removeAttribute("aria-current");
        const indicator = el.querySelector(".cw-bottom-nav__indicator");
        if (indicator) indicator.remove();
        if (el.getAttribute("data-key") === key) {
          el.classList.add("is-active");
          el.setAttribute("aria-current", "page");
          el.insertAdjacentHTML("beforeend", '<span class="cw-bottom-nav__indicator" aria-hidden="true"></span>');
        }
      });
    };

    applyActive(initialActive);

    const syncActive = () => {
      const resolved = resolveActiveFromLocation();
      const datasetActive = getDatasetActive();
      applyActive(resolved || datasetActive || "home");
    };

    window.addEventListener("hashchange", syncActive);
    window.addEventListener("popstate", syncActive);

    // Close popup when navigation happens
    window.addEventListener('hashchange', () => {
      moreButton.setAttribute('aria-expanded', 'false');
      moreMenu.setAttribute('aria-hidden', 'true');
      moreMenu.classList.remove('is-open');
    });

    // --- Theme toggle behavior ---
      // --- Theme toggle behavior (floating) ---
      const root = document.documentElement;
      const bodyEl = document.body;
      const labelEl = themeFloat.querySelector('.cw-theme-label');
      const iconEl = themeFloat.querySelector('.material-icons-outlined');

      const setTheme = (theme) => {
        if (theme === "dark") {
          root.setAttribute("data-theme", "dark");
          bodyEl.classList.add("dark");
          iconEl.textContent = "light_mode";
          labelEl.textContent = "Light"; // show action: switch to Light
        } else if (theme === "light") {
          root.setAttribute("data-theme", "light");
          bodyEl.classList.remove("dark");
          iconEl.textContent = "dark_mode";
          labelEl.textContent = "Dark"; // show action: switch to Dark
        } else {
          root.removeAttribute("data-theme");
          bodyEl.classList.remove("dark");
          iconEl.textContent = "auto_awesome";
          labelEl.textContent = "Auto";
        }
      };

      (function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
          setTheme(saved);
        } else {
          const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
          setTheme(prefersDark ? "dark" : "light");
        }
      })();

      themeFloat.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
      });

      // --- More button behavior ---
      const toggleMore = (ev) => {
        ev.stopPropagation();
        const expanded = moreButton.getAttribute('aria-expanded') === 'true';
        moreButton.setAttribute('aria-expanded', String(!expanded));
        moreMenu.setAttribute('aria-hidden', String(expanded));
        moreMenu.classList.toggle('is-open');
      };

      moreButton.addEventListener('click', toggleMore);

      // Close menu on outside click or scroll
      document.addEventListener('click', (e) => {
        if (!moreMenu.contains(e.target) && e.target !== moreButton) {
          moreButton.setAttribute('aria-expanded', 'false');
          moreMenu.setAttribute('aria-hidden', 'true');
          moreMenu.classList.remove('is-open');
        }
      });

      document.addEventListener('scroll', () => {
        moreButton.setAttribute('aria-expanded', 'false');
        moreMenu.setAttribute('aria-hidden', 'true');
        moreMenu.classList.remove('is-open');
      }, { passive: true });

      // Handle clicks on menu items to close menu after navigation
      moreMenu.addEventListener('click', (ev) => {
        const a = ev.target.closest('a');
        if (a) {
          moreButton.setAttribute('aria-expanded', 'false');
          moreMenu.setAttribute('aria-hidden', 'true');
          moreMenu.classList.remove('is-open');
        }
      });
    
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNav);
  } else {
    renderNav();
  }
})();
