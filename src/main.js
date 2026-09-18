const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-toggle");
const loginMenu = document.getElementById("login-menu");
const loginBtns = [...document.querySelectorAll(".login__btn")];
let openLoginBtn = null;
const tabs = [...document.querySelectorAll(".tab")];
const form = document.querySelector("#demo-form");
const thanks = document.querySelector("#demo-thanks");
const thanksMailOpen = document.querySelector("#demo-mail-open");
const thanksMailCopy = document.querySelector("#demo-mail-copy");
const copyBtn = document.querySelector("[data-copy-mail]");

const MAIL = "olimpus@olimpus.com.tr";
let lastDemoMail = null;

function buildDemoMail(data) {
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
  const body = lines.join("\n");
  return {
    subject,
    body,
    href: `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    plain: `Alıcı: ${MAIL}\nKonu: ${subject}\n\n${body}`,
  };
}

function openMailto(href) {
  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function copyText(text, button, doneLabel = "Kopyalandı") {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = doneLabel;
    window.setTimeout(() => {
      button.textContent = original;
    }, 1800);
  } catch {
    window.prompt("Metni kopyalayın", text);
  }
}

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

function setMenuOpen(open) {
  header?.classList.toggle("is-open", open);
  menuBtn?.setAttribute("aria-expanded", String(open));
  menuBtn?.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
}

menuBtn?.addEventListener("click", () => {
  setMenuOpen(!header.classList.contains("is-open"));
});

document.querySelectorAll('.nav-links a, .nav-actions .btn-primary').forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

function positionLoginMenu(btn) {
  if (!loginMenu || !btn) return;
  const rect = btn.getBoundingClientRect();
  loginMenu.style.top = `${rect.bottom + 10}px`;
  loginMenu.style.right = `${window.innerWidth - rect.right}px`;
}

function setLoginOpen(btn, open) {
  if (!loginMenu || !btn) return;
  if (open) {
    openLoginBtn = btn;
    positionLoginMenu(btn);
    loginMenu.hidden = false;
    loginBtns.forEach((other) => {
      other.setAttribute("aria-expanded", String(other === btn));
    });
    return;
  }

  btn.setAttribute("aria-expanded", "false");
  if (openLoginBtn === btn) {
    loginMenu.hidden = true;
    openLoginBtn = null;
  }
}

function closeLoginMenu() {
  loginBtns.forEach((btn) => setLoginOpen(btn, false));
  openLoginBtn = null;
}

loginBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = !loginMenu.hidden && openLoginBtn === btn;
    closeLoginMenu();
    if (!isOpen) setLoginOpen(btn, true);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".login__btn") && !event.target.closest("#login-menu")) {
    closeLoginMenu();
  }
});

window.addEventListener(
  "scroll",
  () => {
    if (openLoginBtn && !loginMenu.hidden) positionLoginMenu(openLoginBtn);
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  if (openLoginBtn && !loginMenu.hidden) positionLoginMenu(openLoginBtn);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLoginMenu();
    setMenuOpen(false);
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
  lastDemoMail = buildDemoMail(data);

  openMailto(lastDemoMail.href);

  if (thanksMailOpen) thanksMailOpen.href = lastDemoMail.href;
  form.hidden = true;
  if (thanks) thanks.hidden = false;
});

thanksMailCopy?.addEventListener("click", () => {
  if (!lastDemoMail || !thanksMailCopy) return;
  copyText(lastDemoMail.plain, thanksMailCopy);
});

copyBtn?.addEventListener("click", () => {
  copyText(MAIL, copyBtn, "Kopyalandı");
});
