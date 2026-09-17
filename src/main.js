const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-toggle");
const logins = [...document.querySelectorAll(".login")];
const tabs = [...document.querySelectorAll(".tab")];
const form = document.querySelector("#demo-form");
const thanks = document.querySelector("#demo-thanks");
const copyBtn = document.querySelector("[data-copy-mail]");

const MAIL = "olimpus@olimpus.com.tr";

function onScroll() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const finish = (el) => {
    el.addEventListener(
      "animationend",
      (event) => {
        if (event.animationName !== "rise") return;
        el.classList.remove("reveal", "is-in");
        el.style.removeProperty("--reveal-delay");
      },
      { once: true },
    );
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.classList.add("is-in");
        finish(el);
        io.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  const mark = (nodes, step = 70) => {
    const vh = window.innerHeight;
    [...nodes].forEach((el, i) => {
      if (i) el.style.setProperty("--reveal-delay", `${Math.min(i * step, 280)}ms`);
      const rect = el.getBoundingClientRect();
      const inView = rect.top < vh * 0.92 && rect.bottom > 48;
      if (inView) {
        el.classList.add("reveal", "is-in");
        finish(el);
        return;
      }
      el.classList.add("reveal");
      io.observe(el);
    });
  };

  mark(document.querySelectorAll(".hero-proof"));
  mark(document.querySelectorAll(".scenes .section-head, .scenes .scene"));
  mark(document.querySelectorAll(".how .section-head, .how .step"));
  mark(document.querySelectorAll(".path-band .wrap > *"));
  mark(document.querySelectorAll(".features .section-head"));
  mark(document.querySelectorAll(".bento .cell"), 50);
  mark(document.querySelectorAll(".sectors .section-head, .sectors .sector-panel"));
  mark(document.querySelectorAll(".mobile .section-head, .mobile .mobile-stage"));
  mark(document.querySelectorAll(".integrate-band"));
  mark(document.querySelectorAll(".trust .section-head"));
  mark(document.querySelectorAll(".demo-copy, .demo-side"));
}

setupReveal();

menuBtn?.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll('.nav-links a, .nav-actions .btn-primary').forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

function setLogin(login, open) {
  const btn = login?.querySelector(".login__btn");
  const menu = login?.querySelector(".login__menu");
  if (!btn || !menu) return;
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
}

function closeAllLogins(except) {
  logins.forEach((login) => {
    if (login !== except) setLogin(login, false);
  });
}

logins.forEach((login) => {
  const btn = login.querySelector(".login__btn");
  const menu = login.querySelector(".login__menu");
  btn?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = Boolean(menu?.hidden);
    closeAllLogins(login);
    setLogin(login, willOpen);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".login")) closeAllLogins();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllLogins();
    header?.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }
});

function activateTab(id, { focusTab = false } = {}) {
  tabs.forEach((tab) => {
    const on = tab.dataset.tab === id;
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
    if (on && focusTab) tab.focus();
  });

  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== id;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % tabs.length
            : (index - 1 + tabs.length) % tabs.length;
    activateTab(tabs[next].dataset.tab, { focusTab: true });
  });
});

if (tabs[0]) activateTab(tabs[0].dataset.tab);

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    `Ad soyad: ${data.get("ad")}`,
    `Firma: ${data.get("firma")}`,
    `Telefon: ${data.get("telefon")}`,
    `E-posta: ${data.get("eposta")}`,
    `Sektör: ${data.get("sektor")}`,
    `Kullandığınız ticari yazılım: ${data.get("ticari")}`,
    "",
    data.get("mesaj") || "",
  ];
  const subject = `Demo talebi — ${data.get("firma")}`;
  const href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = href;
  form.hidden = true;
  if (thanks) thanks.hidden = false;
});

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(MAIL);
    copyBtn.textContent = "Kopyalandı";
    window.setTimeout(() => {
      copyBtn.textContent = MAIL;
    }, 1800);
  } catch {
    window.prompt("E-postayı kopyalayın", MAIL);
  }
});
