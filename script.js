const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const page = document.body.dataset.page || "home";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function staggerPills(container) {
  if (!container) return;
  container.querySelectorAll(".pill").forEach((pill, i) => {
    pill.style.transitionDelay = `${0.05 + i * 0.04}s`;
  });
}

function renderActionButtons(container = document.getElementById("action-buttons")) {
  if (!container) return;
  container.innerHTML = `
    <a class="glass-btn" href="${escapeHtml(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">
      ${icons.linkedin}
      LinkedIn
    </a>
    <a class="glass-btn" href="${escapeHtml(site.links.github)}" target="_blank" rel="noopener noreferrer">
      ${icons.github}
      GitHub
    </a>
    <a class="glass-btn" href="${escapeHtml(site.links.resume)}" target="_blank" rel="noopener noreferrer">
      ${icons.resume}
      Resume
    </a>
  `;
}

function renderHomeAbout() {
  const nameEl = document.getElementById("hero-name");
  const titleEl = document.getElementById("hero-title");
  const bioEl = document.getElementById("hero-bio");
  const previewEl = document.getElementById("about-preview");
  const avatarEl = document.getElementById("hero-avatar");

  if (nameEl) nameEl.textContent = site.name;
  if (titleEl) titleEl.textContent = site.title;
  if (bioEl) bioEl.textContent = site.bio;
  if (previewEl) previewEl.textContent = site.aboutPreview;
  if (avatarEl && site.avatar) {
    avatarEl.src = site.avatar;
    avatarEl.alt = `${site.name} profile photo`;
  }
  renderActionButtons();
}

function renderAboutPage() {
  const headline = document.getElementById("about-headline");
  const role = document.getElementById("about-role");
  const story = document.getElementById("about-story");
  const highlights = document.getElementById("about-highlights");

  if (headline) headline.textContent = site.aboutFull.headline;
  if (role) role.textContent = `${site.name} · ${site.title}`;
  renderActionButtons();

  if (story) {
    story.innerHTML = site.aboutFull.paragraphs
      .map(
        (paragraph, index) => `
        <article class="glass-panel about-block reveal" style="--i: ${index}">
          <p>${escapeHtml(paragraph)}</p>
        </article>
      `,
      )
      .join("");
  }

  if (highlights) {
    highlights.innerHTML = site.aboutFull.highlights
      .map(
        (item, index) => `
        <article class="glass-panel highlight-card" data-reveal style="--i: ${index}">
          <p class="highlight-label">${escapeHtml(item.label)}</p>
          <p class="highlight-text">${escapeHtml(item.text)}</p>
        </article>
      `,
      )
      .join("");
  }
}

function projectCardHtml(project, index, { compact = false } = {}) {
  const image = project.image
    ? `
      <button
        type="button"
        class="project-media"
        data-lightbox-src="${escapeHtml(project.image)}"
        data-lightbox-title="${escapeHtml(project.title)}"
        aria-label="View preview of ${escapeHtml(project.title)}"
      >
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" loading="lazy" />
        <span class="project-media__hint">View image</span>
      </button>
    `
    : "";

  return `
    <article class="glass-panel project-card${compact ? " project-card--carousel" : ""}" data-reveal style="--i: ${index}">
      ${image}
      <div class="project-card__body">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.longDescription || "")}</p>
        <div class="pill-row">
          ${project.tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="project-actions">
          ${
            project.github
              ? `<a class="glass-btn primary project-action" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">
                  ${icons.github}
                  GitHub
                </a>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
}

function renderProjects({ limit = null, carousel = false } = {}) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  let list = [...site.projects];
  if (limit != null) {
    const featured = list.filter((p) => p.featured);
    list = (featured.length ? featured : list).slice(0, limit);
  }

  if (carousel) {
    const cards = list
      .map((project, index) => projectCardHtml(project, index, { compact: true }))
      .join("");

    grid.className = "projects-carousel reveal";
    grid.setAttribute("aria-label", "Featured projects carousel");
    grid.innerHTML = `
      <div class="projects-carousel__track">
        ${cards}
        ${cards}
      </div>
    `;

    grid.querySelectorAll(".project-card").forEach((card) => {
      card.classList.add("is-visible");
      card.removeAttribute("data-reveal");
      staggerPills(card);
    });
    return;
  }

  grid.classList.remove("projects-carousel");
  if (!grid.classList.contains("projects-grid--full")) {
    grid.className = "projects-grid";
  }

  grid.innerHTML = list
    .map((project, index) => projectCardHtml(project, index))
    .join("");

  grid.querySelectorAll(".project-card").forEach(staggerPills);
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = site.skills
    .map(
      (group, index) => `
      <article class="glass-panel skill-card" data-reveal style="--i: ${index}">
        <h3>${escapeHtml(group.title)}</h3>
        <p>${escapeHtml(group.intro)}</p>
        <div class="pill-row">
          ${group.items.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
        </div>
      </article>
    `,
    )
    .join("");

  grid.querySelectorAll(".skill-card").forEach(staggerPills);
}

function renderExperience() {
  const list = document.getElementById("experience-list");
  if (!list || !site.experience?.length) return;

  list.innerHTML = site.experience
    .map((job, index) => {
      const logoMark = job.logo
        ? `<img src="${escapeHtml(job.logo)}" alt="" width="56" height="56" />`
        : escapeHtml(job.logoText || job.company.slice(0, 2).toUpperCase());

      return `
      <article class="glass-panel exp-card" data-reveal style="--i: ${index}">
        <div class="exp-logo" aria-hidden="true">${logoMark}</div>
        <div class="exp-card__body">
          <div class="exp-card__top">
            <h3>${escapeHtml(job.role)}</h3>
            <p class="exp-card__dates">${escapeHtml(job.years)}</p>
          </div>
          <p class="exp-card__company">${escapeHtml(job.company)}</p>
          ${
            job.location
              ? `<p class="exp-card__location">${escapeHtml(job.location)}</p>`
              : ""
          }
        </div>
      </article>
    `;
    })
    .join("");
}

function renderEducation() {
  const list = document.getElementById("education-list");
  if (!list) return;

  list.innerHTML = site.education
    .map((school, index) => {
      const isImage =
        typeof school.logo === "string" &&
        /\.(png|jpe?g|svg|webp|gif)$/i.test(school.logo);
      const logoMark = isImage
        ? `<img src="${escapeHtml(school.logo)}" alt="" width="56" height="56" />`
        : escapeHtml(school.logo || school.school.slice(0, 2).toUpperCase());

      return `
      <article class="glass-panel edu-card" data-reveal style="--i: ${index}">
        <div class="edu-logo" aria-hidden="true">${logoMark}</div>
        <div>
          <h3>${escapeHtml(school.school)}</h3>
          <p>${escapeHtml(school.degree)} · ${escapeHtml(school.years)}</p>
        </div>
      </article>
    `;
    })
    .join("");

  renderExtracurriculars();

  const courses = document.getElementById("courses-list");
  if (courses) {
    courses.innerHTML = site.courses
      .map((course) => `<span class="pill">${escapeHtml(course)}</span>`)
      .join("");
    staggerPills(document.querySelector(".skills-education"));
  }
}

function renderExtracurriculars() {
  const list = document.getElementById("extracurriculars-list");
  if (!list) return;

  const items = site.extracurriculars || [];
  list.innerHTML = items
    .map((item, index) => {
      const isImage =
        typeof item.logo === "string" &&
        /\.(png|jpe?g|svg|webp|gif)$/i.test(item.logo);
      const logoMark = isImage
        ? `<img src="${escapeHtml(item.logo)}" alt="" width="28" height="28" />`
        : escapeHtml(item.logoText || item.name.slice(0, 2).toUpperCase());

      return `
      <article class="glass-panel extra-card" data-reveal style="--i: ${index}">
        <div class="extra-logo" aria-hidden="true">${logoMark}</div>
        <h3>${escapeHtml(item.name)}</h3>
      </article>
    `;
    })
    .join("");
}

function renderContact() {
  const heading = document.getElementById("contact-heading");
  const intro = document.getElementById("contact-intro");
  const emailLink = document.getElementById("contact-email-link");
  const emailAddress = document.getElementById("contact-email-address");
  const icon = document.querySelector(".contact-email-icon");
  const label = document.querySelector(".contact-email-label");

  if (!emailLink || !site.links.email) return;

  if (heading) heading.textContent = site.contact?.heading || "Contact me";
  if (intro) {
    intro.textContent =
      site.contact?.intro ||
      "Have a question, opportunity, or project idea? Reach out — I’d love to hear from you.";
  }
  if (label) label.textContent = site.contact?.emailLabel || "Email me";
  if (emailAddress) emailAddress.textContent = site.links.email;
  if (icon) icon.innerHTML = icons.mail;

  const subject = encodeURIComponent(
    site.contact?.subject || "Hello from your portfolio",
  );
  emailLink.href = `mailto:${site.links.email}?subject=${subject}`;
}

function renderFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const year = new Date().getFullYear();
  const name = site.name.replace(/\.$/, "");

  footer.innerHTML = `
    <div class="footer-main">
      <p class="footer-copy">© ${year} ${escapeHtml(name)}. All rights reserved.</p>
      <div class="footer-social">
        <a href="${escapeHtml(site.links.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${escapeHtml(site.links.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  `;
}

function createSmoothScroll() {
  if (prefersReducedMotion) {
    return {
      scrollTo(y) {
        window.scrollTo(0, y);
      },
      destroy() {},
    };
  }

  let current = window.scrollY;
  let target = window.scrollY;
  let rafId = 0;
  const ease = 0.09;

  function clampTarget(value) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(max, value));
  }

  function tick() {
    current += (target - current) * ease;

    if (Math.abs(target - current) < 0.2) {
      current = target;
      window.scrollTo(0, current);
      rafId = 0;
      return;
    }

    window.scrollTo(0, current);
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function onWheel(event) {
    if (event.ctrlKey) return;
    event.preventDefault();
    target = clampTarget(target + event.deltaY);
    start();
  }

  function onScroll() {
    if (rafId) return;
    current = window.scrollY;
    target = window.scrollY;
  }

  function onKeyDown(event) {
    const keys = {
      ArrowDown: 80,
      ArrowUp: -80,
      PageDown: window.innerHeight * 0.9,
      PageUp: -window.innerHeight * 0.9,
      Home: null,
      End: null,
      " ": event.shiftKey ? -window.innerHeight * 0.85 : window.innerHeight * 0.85,
    };

    if (!(event.key in keys)) return;
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    event.preventDefault();

    if (event.key === "Home") {
      target = 0;
    } else if (event.key === "End") {
      target = document.documentElement.scrollHeight;
    } else {
      target = clampTarget(target + keys[event.key]);
    }

    start();
  }

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeyDown);

  return {
    scrollTo(y, { immediate = false } = {}) {
      target = clampTarget(y);
      if (immediate) {
        current = target;
        window.scrollTo(0, current);
        return;
      }
      start();
    },
    destroy() {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(rafId);
    },
  };
}

function setupSmoothAnchors(smoothScroll) {
  document.querySelectorAll("[data-smooth-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex) || "index.html";
      const hash = href.slice(hashIndex);
      const current = window.location.pathname.split("/").pop() || "index.html";
      const targetPath = path === "" || path === "#" ? current : path.split("/").pop();

      if (targetPath !== current && targetPath !== "" && !href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const header = document.querySelector(".site-header");
      const offset = (header?.offsetHeight ?? 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      smoothScroll.scrollTo(top);
      history.pushState(null, "", hash);
    });
  });
}

function mixChannel(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function mixHex(from, to, t) {
  const parse = (hex) => {
    const value = hex.replace("#", "");
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = parse(from);
  const [r2, g2, b2] = parse(to);
  const r = mixChannel(r1, r2, t).toString(16).padStart(2, "0");
  const g = mixChannel(g1, g2, t).toString(16).padStart(2, "0");
  const b = mixChannel(b1, b2, t).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

function mixStops(stops, t) {
  if (t <= 0) return { ...stops[0] };
  if (t >= 1) return { ...stops[stops.length - 1] };

  const scaled = t * (stops.length - 1);
  const index = Math.floor(scaled);
  const local = scaled - index;
  const a = stops[index];
  const b = stops[index + 1];

  return {
    deep: mixHex(a.deep, b.deep, local),
    mid: mixHex(a.mid, b.mid, local),
    glow: mixHex(a.glow, b.glow, local),
    end: mixHex(a.end, b.end, local),
    orb1: mixHex(a.orb1, b.orb1, local),
    orb2: mixHex(a.orb2, b.orb2, local),
    orb3: mixHex(a.orb3, b.orb3, local),
  };
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function setupScrollEffects() {
  const progressBar = document.querySelector(".scroll-progress__bar");
  const header = document.querySelector(".site-header");
  const root = document.documentElement;
  const orbs = [...document.querySelectorAll(".orb")];
  const depths = [0.03, 0.055, 0.04];

  // Palette journey: steel blue → teal → forest (ends warm green, no return to blue)
  const paletteStops = [
    {
      deep: "#0b1220",
      mid: "#132038",
      glow: "#1a3158",
      end: "#0a1628",
      orb1: "#2a6f97",
      orb2: "#2a7a88",
      orb3: "#3a5a8f",
    },
    {
      deep: "#0a1620",
      mid: "#143448",
      glow: "#1f5a68",
      end: "#0b1c26",
      orb1: "#2f8098",
      orb2: "#2a9488",
      orb3: "#3a6888",
    },
    {
      deep: "#0a1a1c",
      mid: "#134038",
      glow: "#1f7a66",
      end: "#0a1e1c",
      orb1: "#2f8f8a",
      orb2: "#2aa888",
      orb3: "#3a7a78",
    },
    {
      deep: "#0c1a16",
      mid: "#15382c",
      glow: "#2a7a55",
      end: "#0a1c16",
      orb1: "#2f8f78",
      orb2: "#3aab70",
      orb3: "#2a7a68",
    },
  ];

  function update() {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const t = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
    const progress = t * 100;
    const shrink = Math.min(1, scrollTop / 140);

    if (progressBar) progressBar.style.width = `${progress}%`;
    header?.classList.toggle("is-scrolled", scrollTop > 24);

    root.style.setProperty("--bg-deep", "#ffffff");
    root.style.setProperty("--bg-mid", "#ffffff");
    root.style.setProperty("--bg-glow", "#ffffff");
    root.style.setProperty("--bg-end", "#ffffff");
    root.style.setProperty("--header-tint", "#ffffff");

    if (header) {
      const basePadX = window.innerWidth >= 980 ? 2 : 1.25;
      const padY = 1 - shrink * 0.42;
      const padX = basePadX - shrink * 0.2;
      const blur = 18 + shrink * 14;
      const sat = 120 + shrink * 30;
      const alpha = 0.72 + shrink * 0.2;

      header.style.setProperty("--header-pad-y", `${padY}rem`);
      header.style.setProperty("--header-pad-x", `${padX}rem`);
      header.style.setProperty("--header-blur", `${blur}px`);
      header.style.setProperty("--header-sat", `${sat}%`);
      header.style.setProperty("--header-logo-size", `${1.25 - shrink * 0.12}rem`);
      header.style.setProperty("--header-link-size", `${0.95 - shrink * 0.06}rem`);
      header.style.setProperty("--header-link-pad-y", `${0.55 - shrink * 0.12}rem`);
      header.style.setProperty("--header-link-pad-x", `${0.9 - shrink * 0.12}rem`);
      header.style.setProperty("--header-nav-pad", `${0.4 - shrink * 0.1}rem`);
      header.style.setProperty(
        "--header-bg",
        `rgba(255, 255, 255, ${alpha})`,
      );
      header.style.setProperty(
        "--header-border",
        `rgba(15, 23, 42, ${0.08 + shrink * 0.08})`,
      );
      header.style.setProperty(
        "--header-shadow",
        shrink > 0.08
          ? `0 10px 30px rgba(15, 23, 42, ${0.06 + shrink * 0.06})`
          : "none",
      );
    }

    orbs.forEach((orb, i) => {
      const drift = Math.sin(t * Math.PI * (1.5 + i * 0.4)) * 18;
      orb.style.setProperty("--parallax-y", `${scrollTop * depths[i] + drift}px`);
    });
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupMagneticLinks(links) {
  if (prefersReducedMotion) return;

  const strength = 0.28;
  const radius = 56;

  links.forEach((link) => {
    link.addEventListener("pointermove", (event) => {
      const rect = link.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        link.style.setProperty("--mx", "0px");
        link.style.setProperty("--my", "0px");
        return;
      }

      const falloff = 1 - dist / radius;
      link.style.setProperty("--mx", `${dx * strength * falloff}px`);
      link.style.setProperty("--my", `${dy * strength * falloff}px`);
    });

    link.addEventListener("pointerleave", () => {
      link.style.setProperty("--mx", "0px");
      link.style.setProperty("--my", "0px");
    });
  });
}

function setupGlassSpotlight() {
  // Cursor spotlight removed in favor of reveal shimmer + hover lift
}

function setupReveals() {
  const items = [
    ...document.querySelectorAll(".reveal"),
    ...document.querySelectorAll("[data-reveal]"),
    ...document.querySelectorAll(".courses-panel"),
  ];

  // Prefer leaf stagger items: skip a container .reveal if it only wraps other revealables
  const unique = [...new Set(items)].filter((el) => {
    if (!el.classList.contains("reveal")) return true;
    const nested = el.querySelector(".reveal, [data-reveal], .courses-panel");
    return !nested;
  });

  // Keep container panels that wrap nested cards — they'll lead the stagger
  const containers = [...new Set(items)].filter((el) => {
    if (!el.classList.contains("reveal")) return false;
    return Boolean(el.querySelector(".reveal, [data-reveal], .courses-panel"));
  });

  const revealables = [...containers, ...unique];

  if (prefersReducedMotion) {
    revealables.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const bySection = new Map();
  revealables.forEach((el) => {
    const section =
      el.closest(".section") || el.closest("main") || document.body;
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section).push(el);
  });

  bySection.forEach((els) => {
    els.sort((a, b) => {
      if (a === b) return 0;
      const pos = a.compareDocumentPosition(b);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
  });

  function hideSection(section) {
    const els = bySection.get(section) || [];
    els.forEach((el) => {
      el.style.transitionDelay = "0s";
      el.classList.remove("is-visible");
    });
  }

  function revealSection(section) {
    const els = bySection.get(section) || [];

    // Reset so the entrance can replay
    els.forEach((el) => {
      el.style.transitionDelay = "0s";
      el.classList.remove("is-visible");
    });

    // Force reflow so removing is-visible sticks before re-adding
    void section.offsetWidth;

    els.forEach((el, index) => {
      el.style.transitionDelay = `${0.05 + index * 0.1}s`;
    });

    requestAnimationFrame(() => {
      els.forEach((el) => el.classList.add("is-visible"));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSection(entry.target);
        } else {
          hideSection(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  bySection.forEach((_, section) => observer.observe(section));
}

function moveNavPill(nav, pill, link) {
  if (!pill || !link) return;

  // offset* ignores CSS transforms (animations / magnetic), so the pill
  // hugs the real link box more reliably than getBoundingClientRect.
  pill.style.width = `${link.offsetWidth}px`;
  pill.style.height = `${link.offsetHeight}px`;
  pill.style.left = `${link.offsetLeft}px`;
  pill.style.top = `${link.offsetTop}px`;
  nav.classList.add("is-ready");
}

function setupNavPill(nav, links) {
  const pill = nav.querySelector(".nav-pill");
  if (!pill) return;

  let activeLink = links.find((link) => link.classList.contains("active")) || links[0];

  function snapTo(link) {
    if (!link) return;
    moveNavPill(nav, pill, link);
  }

  snapTo(activeLink);
  requestAnimationFrame(() => snapTo(activeLink));

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => snapTo(link));
    link.addEventListener("focus", () => snapTo(link));
  });

  nav.addEventListener("mouseleave", () => {
    activeLink = links.find((l) => l.classList.contains("active")) || links[0];
    snapTo(activeLink);
  });

  window.addEventListener("resize", () => {
    activeLink = links.find((l) => l.classList.contains("active")) || links[0];
    snapTo(activeLink);
  });

  return {
    refresh() {
      activeLink = links.find((l) => l.classList.contains("active")) || links[0];
      snapTo(activeLink);
    },
  };
}

function setupLightbox() {
  if (document.getElementById("lightbox")) return;

  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div class="lightbox__dialog glass-panel" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
      <button type="button" class="glass-btn lightbox__close" data-lightbox-close aria-label="Close preview">×</button>
      <h2 id="lightbox-title" class="lightbox__title"></h2>
      <img class="lightbox__image" alt="" />
    </div>
  `;
  document.body.appendChild(lightbox);

  const titleEl = lightbox.querySelector(".lightbox__title");
  const imageEl = lightbox.querySelector(".lightbox__image");

  function open(src, title) {
    titleEl.textContent = title;
    imageEl.src = src;
    imageEl.alt = `${title} preview`;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".lightbox__close")?.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    imageEl.removeAttribute("src");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (trigger) {
      open(trigger.dataset.lightboxSrc, trigger.dataset.lightboxTitle || "Preview");
      return;
    }
    if (event.target.closest("[data-lightbox-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
}

function setupInteractiveButtons() {
  const clickables = document.querySelectorAll(
    ".glass-btn, .project-action, .logo, .site-nav a",
  );

  clickables.forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    });

    el.addEventListener("click", () => {
      if (prefersReducedMotion) return;
      el.classList.remove("is-pressed");
      void el.offsetWidth;
      el.classList.add("is-pressed");
      window.setTimeout(() => el.classList.remove("is-pressed"), 450);
    });
  });
}

function setupNav(smoothScroll) {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!nav || !toggle) return;

  const links = [...nav.querySelectorAll("a")];
  links.forEach((link, index) => {
    link.style.setProperty("--i", String(index));
  });

  const navPill = setupNavPill(nav, links);
  setupMagneticLinks(links);

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.setAttribute("aria-hidden", String(!open));

    if (open) {
      requestAnimationFrame(() => {
        navPill?.refresh();
        window.setTimeout(() => navPill?.refresh(), 80);
        window.setTimeout(() => navPill?.refresh(), 320);
      });
    }
  }

  let pillFrame = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (!nav.classList.contains("open")) return;
      if (pillFrame) return;
      pillFrame = requestAnimationFrame(() => {
        pillFrame = 0;
        navPill?.refresh();
      });
    },
    { passive: true },
  );

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!nav.classList.contains("open"));
  });

  if (page === "home") {
    const sections = ["about", "experience", "skills-education", "projects"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    function setActiveSection(sectionId) {
      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
        link.classList.toggle("active", hash === `#${sectionId}`);
      });
      if (nav.classList.contains("open")) navPill?.refresh();
    }

    function updateActiveFromScroll() {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.32, 220);
      let current = sections[0]?.id || "about";
      for (const section of sections) {
        if (section.offsetTop - 24 <= marker) current = section.id;
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    updateActiveFromScroll();
  }

  setupSmoothAnchors(smoothScroll);
  setOpen(false);
}

function setupPageLaunch() {
  const body = document.body;
  if (!body.classList.contains("is-booting")) return;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    body.classList.remove("is-booting");
    body.classList.add("is-launched");
  };

  if (prefersReducedMotion) {
    finish();
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(finish);
  });

  window.setTimeout(finish, 1600);
}

function setupJumpFab(smoothScroll) {
  if (document.querySelector(".jump-fab")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "jump-fab glass-btn";
  button.dataset.mode = "bottom";
  button.setAttribute("aria-label", "Skip to bottom");
  button.innerHTML = `
    <span class="jump-fab__icons" aria-hidden="true">
      <svg class="jump-fab__down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
      </svg>
      <svg class="jump-fab__up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>
      </svg>
    </span>
  `;

  document.body.append(button);

  function maxScroll() {
    return Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
  }

  function updateMode() {
    const max = maxScroll();
    if (max < 80) {
      button.hidden = true;
      return;
    }
    button.hidden = false;

    const progress = window.scrollY / max;
    const mode = progress > 0.45 ? "top" : "bottom";
    button.dataset.mode = mode;
    button.setAttribute(
      "aria-label",
      mode === "top" ? "Skip to top" : "Skip to bottom",
    );
  }

  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    if (mode === "top") {
      smoothScroll.scrollTo(0);
    } else {
      smoothScroll.scrollTo(maxScroll());
    }
  });

  window.addEventListener("scroll", updateMode, { passive: true });
  window.addEventListener("resize", updateMode);
  updateMode();
}

function initPage() {
  renderFooter();

  if (page === "home") {
    renderHomeAbout();
    renderExperience();
    renderSkills();
    renderProjects({ carousel: true });
    renderEducation();
    renderContact();
  } else if (page === "about") {
    renderAboutPage();
  } else if (page === "projects") {
    renderProjects();
  }

  const smoothScroll = createSmoothScroll();
  setupNav(smoothScroll);
  setupScrollEffects();
  setupReveals();
  setupGlassSpotlight();
  setupInteractiveButtons();
  setupLightbox();
  setupJumpFab(smoothScroll);
  setupPageLaunch();

  if (window.location.hash && page === "home") {
    const target = document.querySelector(window.location.hash);
    if (target) {
      requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        const offset = (header?.offsetHeight ?? 0) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        smoothScroll.scrollTo(top, { immediate: true });
      });
    }
  }
}

initPage();
