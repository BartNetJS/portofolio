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
      },
      {
        key: "contact",
        label: "Contact",
        href: "/#contact",
        icon: "mail_outline",
      },
    ];

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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNav);
  } else {
    renderNav();
  }
})();
