/* =========================================================
   Typing effect
   ========================================================= */
const TYPED_STRINGS = [
  "AI Engineer | Embedded Systems Developer",
  "Builder of AI-Powered Hardware Solutions",
  "Smart Glasses | Medical AI | Edge Computing",
  "Computer Vision & NLP Specialist",
  "Raspberry Pi & IoT Enthusiast",
];

(function initTyping() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  let si = 0, ci = 0, deleting = false;
  const TYPE_SPEED = 55, DELETE_SPEED = 30, PAUSE = 1800;

  function tick() {
    const str = TYPED_STRINGS[si];
    if (!deleting) {
      el.textContent = str.slice(0, ++ci);
      if (ci === str.length) { deleting = true; setTimeout(tick, PAUSE); return; }
    } else {
      el.textContent = str.slice(0, --ci);
      if (ci === 0) { deleting = false; si = (si + 1) % TYPED_STRINGS.length; }
    }
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }
  tick();
})();

/* =========================================================
   Navbar – scroll & mobile toggle
   ========================================================= */
(function initNavbar() {
  const navbar   = document.getElementById("navbar");
  const links    = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    highlightNav();
    document.getElementById("scroll-top")
      .classList.toggle("visible", window.scrollY > 400);
  });

  hamburger?.addEventListener("click", () => {
    links.classList.toggle("open");
    const open = links.classList.contains("open");
    hamburger.setAttribute("aria-expanded", open);
    hamburger.querySelectorAll("span").forEach((s, i) => {
      if (!open) {
        s.style.transform = "";
        s.style.opacity = "1";
        return;
      }
      if (i === 0) {
        s.style.transform = "rotate(45deg) translate(5px,5px)";
      } else if (i === 1) {
        s.style.opacity = "0";
      } else if (i === 2) {
        s.style.transform = "rotate(-45deg) translate(5px,-5px)";
      }
    });
  });

  // Close mobile menu on link click
  links?.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );

  function highlightNav() {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
})();

/* =========================================================
   Scroll-to-top
   ========================================================= */
document.getElementById("scroll-top")?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* =========================================================
   Intersection Observer – fade-in animation
   ========================================================= */
(function initFadeIn() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-in").forEach((el, i) => {
    if (el.classList.contains("reveal-stagger")) {
      el.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
    }
    obs.observe(el);
  });
})();

/* =========================================================
   Counter animation for stat numbers
   ========================================================= */
(function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1400;
      const step = Math.ceil(end / (dur / 16));
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = cur + (el.dataset.suffix || "");
        if (cur >= end) clearInterval(timer);
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-num[data-count]").forEach(el => obs.observe(el));
})();

/* =========================================================
   Hero parallax effect
   ========================================================= */
(function initHeroParallax() {
  const hero = document.getElementById("hero");
  const bg = document.querySelector(".hero-bg");
  const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!hero || !bg || noMotion || !finePointer) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    bg.style.transform = `translate(${x * 16}px, ${y * 12}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    bg.style.transform = "translate(0, 0)";
  });
})();

/* =========================================================
   Tilt cards
   ========================================================= */
(function initTiltCards() {
  const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (noMotion || !finePointer) return;
  const targets = document.querySelectorAll(".project-card, .service-card, .stat-card, .contact-card");

  targets.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

/* =========================================================
   Magnetic buttons
   ========================================================= */
(function initMagneticButtons() {
  const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (noMotion || !finePointer) return;
  const buttons = document.querySelectorAll(".magnetic");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      btn.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
})();

/* =========================================================
   Smooth anchor scroll (offset for fixed navbar)
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
