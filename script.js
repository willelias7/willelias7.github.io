// ============================================================
// script.js — Portfolio interactivity
// ============================================================

// ── Project card renderer ──────────────────────────────────
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  // `projects` is defined in projects.js, loaded before this script
  if (!Array.isArray(projects) || projects.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted)">No projects yet — check back soon.</p>';
    return;
  }

  grid.innerHTML = projects
    .map((p, i) => {
      const hasGithub = p.github && p.github.trim() !== "";
      const hasDemo   = p.demo   && p.demo.trim()   !== "";

      const githubBtn = hasGithub
        ? `<a href="${escHtml(p.github)}" target="_blank" rel="noopener" class="btn btn-outlined btn-sm">GitHub</a>`
        : `<span class="btn btn-outlined btn-sm btn-disabled" title="No repository linked">GitHub</span>`;

      const demoBtn = hasDemo
        ? `<a href="${escHtml(p.demo)}" target="_blank" rel="noopener" class="btn btn-filled btn-sm">Live Demo</a>`
        : `<span class="btn btn-filled btn-sm btn-disabled" title="Demo coming soon">Demo</span>`;

      const tags = (p.tags || [])
        .map(t => `<span class="project-tag">${escHtml(t)}</span>`)
        .join("");

      // images: single path string or array of paths
      const imageList = p.images
        ? (Array.isArray(p.images) ? p.images : [p.images])
        : [];

      const imageHtml = imageList.length
        ? `<div class="project-images">
            ${imageList.map((src, idx) => `
              <img
                src="${escHtml(src)}"
                alt="${escHtml(p.title)} — image ${idx + 1}"
                class="project-img"
                loading="lazy"
              />`).join("")}
           </div>`
        : "";

      return `
        <div class="project-card fade-in" style="transition-delay:${i * 0.08}s">
          ${imageHtml}
          <div class="project-card-body">
            ${p.date ? `<p class="project-date">${escHtml(p.date)}</p>` : ""}
            <h3 class="project-title">${escHtml(p.title)}</h3>
            <p class="project-desc">${escHtml(p.description)}</p>
            <div class="project-tags">${tags}</div>
            <div class="project-links">${githubBtn}${demoBtn}</div>
          </div>
        </div>
      `;
    })
    .join("");

  // Re-run observer so newly injected cards animate in
  observeFadeIns();
}

// Simple HTML escape — prevents XSS from project data
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Intersection Observer — fade-in on scroll ──────────────
function observeFadeIns() {
  const elements = document.querySelectorAll(".fade-in:not(.observed)");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => {
    el.classList.add("observed");
    observer.observe(el);
  });
}

// ── Nav scroll shadow ──────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const toggle = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle(); // run once on load
}

// ── Mobile hamburger menu ──────────────────────────────────
function initHamburger() {
  const btn   = document.getElementById("hamburger");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", false);
    });
  });
}

// ── Boot ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();   // inject cards from projects.js
  observeFadeIns();   // watch all .fade-in elements
  initNavScroll();    // nav shadow on scroll
  initHamburger();    // mobile menu
});
