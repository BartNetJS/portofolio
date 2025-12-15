const CDN = {
  marked: "https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js",
  dompurify: "https://cdn.jsdelivr.net/npm/dompurify@3.0.8/+esm",
  mermaid: "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.esm.min.mjs",
};

const state = {
  libsPromise: null,
};

function getTheme() {
  const root = document.documentElement;
  const body = document.body;
  const prefersDark = root.classList.contains("dark") || body.classList.contains("dark");
  return prefersDark ? "dark" : "default";
}

async function loadLibs() {
  if (!state.libsPromise) {
    state.libsPromise = (async () => {
      const [{ marked }, { default: DOMPurify }, mermaidModule] = await Promise.all([
        import(CDN.marked),
        import(CDN.dompurify),
        import(CDN.mermaid),
      ]);

      const mermaid = mermaidModule.default ?? mermaidModule;
      marked.setOptions({
        gfm: true,
        breaks: true,
        mangle: false,
        headerIds: false,
      });

      return { marked, DOMPurify, mermaid };
    })();
  }

  return state.libsPromise;
}

async function fetchMarkdown(src) {
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while loading ${src}`);
  }

  return response.text();
}

function replaceMermaidCode(root) {
  const codeBlocks = root.querySelectorAll("code.language-mermaid");

  codeBlocks.forEach((code) => {
    const parent = code.parentElement;
    const graphDefinition = code.textContent.trim();
    const block = document.createElement("div");
    block.className = "mermaid md-mermaid";
    block.textContent = graphDefinition;

    if (parent && parent.tagName === "PRE") {
      parent.replaceWith(block);
    } else {
      code.replaceWith(block);
    }
  });
}

async function renderMarkdownBlocks(selector = "[data-md-include]") {
  const targets = Array.from(document.querySelectorAll(selector));
  if (!targets.length) {
    return;
  }

  const { marked, DOMPurify, mermaid } = await loadLibs();
  mermaid.initialize({
    startOnLoad: false,
    theme: getTheme(),
    securityLevel: "strict",
  });

  for (const target of targets) {
    const src = target.getAttribute("data-md-include");
    if (!src) {
      continue;
    }

    target.classList.add("md-article");

    try {
      const markdown = await fetchMarkdown(src);
      const html = marked.parse(markdown);
      target.innerHTML = DOMPurify.sanitize(html);

      replaceMermaidCode(target);
      const mermaidNodes = target.querySelectorAll(".md-mermaid");
      if (mermaidNodes.length) {
        await mermaid.run({ nodes: mermaidNodes });
      }
    } catch (error) {
      target.innerHTML = `<div class="md-error">Unable to load ${src}. ${error.message}</div>`;
      console.error("Markdown render failed", { src, error });
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => renderMarkdownBlocks());
} else {
  renderMarkdownBlocks();
}

export { renderMarkdownBlocks };
