/* =============================================================
   app.js — vitrine: render, filtros, busca, modal, lightbox
   ============================================================= */
(function () {
  "use strict";

  const state = {
    products: ProductStore.catalog(),
    category: "Todos",
    query: "",
  };
  /* Hero slideshow images - customize paths here */
  const HERO_IMAGES = [
    "./assets/hero/HEROGRAVINA.png",
    "./assets/hero/HEROGRAVINA1.png",
    "./assets/hero/HEROGRAVINA2.png",
  ];
  let heroIndex = 0;
  let heroTimer = null;

  const $ = (sel) => document.querySelector(sel);
  const grid = $("#grid");
  const empty = $("#empty");
  const filtersEl = $("#filters");
  const countEl = $("#result-count");
  const modal = $("#modal");
  const modalContent = $("#modal-content");
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");

  let lastFocused = null;

  /* ---------- helpers ---------- */
  const esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  const imgFallback = `onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'"`;

  function matches(product) {
    const q = state.query.trim().toLowerCase();
    const byCat =
      state.category === "Todos" || product.collection === state.category;
    if (!byCat) return false;
    if (!q) return true;
    return [
      product.name,
      product.model,
      product.reference,
      product.collection,
      product.brand,
    ]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q));
  }

  /* ---------- filtros ---------- */
  function renderFilters() {
    filtersEl.innerHTML = CATEGORIES.map(
      (cat) =>
        `<button class="filter${cat === state.category ? " is-active" : ""}" type="button" data-cat="${esc(cat)}" aria-pressed="${cat === state.category}">${esc(cat)}</button>`,
    ).join("");
  }

  /* ---------- grid ---------- */
  function renderGrid() {
    const list = state.products.filter(matches);
    countEl.textContent = `${list.length} ${list.length === 1 ? "modelo" : "modelos"}`;
    empty.hidden = list.length > 0;

    grid.innerHTML = list
      .map(
        (p, i) => `
      <article class="card" style="animation-delay:${Math.min(i, 10) * 35}ms">
        <button type="button" class="card__media" data-open="${p.id}" aria-label="Ver detalhes de ${esc(p.name)}" style="border:0;width:100%">
          <img src="${esc(p.image || PLACEHOLDER_IMAGE)}" alt="${esc(p.brand + " " + p.collection + " " + (p.model || ""))}" loading="lazy" decoding="async" ${imgFallback} />
          ${p.available === false ? '<span class="card__flag">Indisponível</span>' : ""}
        </button>
        <div class="card__body">
          <span class="card__line">${esc(p.brand)} · ${esc(p.collection)}</span>
          <h3 class="card__name">${esc(p.name)}</h3>
          <span class="card__ref">Ref. ${esc(p.reference || p.model || "—")}</span>
          <span class="card__price">${esc(p.price || "Sob consulta")}</span>
          ${
            p.discountText
              ? `
            <span class="discount-tag" aria-hidden="true" title="${esc(p.discountText)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" fill="none"></circle>
                <path d="M8 12h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                <circle cx="9.5" cy="12" r="1.2" fill="currentColor"></circle>
              </svg>
              <span class="discount-tag__text">${esc(p.discountText)}</span>
            </span>
          `
              : ""
          }
          ${
            p.available !== false
              ? `
            <span class="availability" aria-hidden="true" title="Disponível">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" fill="none"></circle>
                <path d="M7 13l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
              </svg>
            </span>
          `
              : ""
          }
          <button type="button" class="card__cta" data-open="${p.id}" style="background:none;border:0;border-top:1px solid var(--line);width:100%;text-align:left">
            <span>Ver detalhes</span><span>→</span>
          </button>
        </div>
      </article>`,
      )
      .join("");
  }

  /* ---------- modal ---------- */
  function specRows(p) {
    const specs = p.specifications || {};
    const pairs = Object.keys(SPEC_LABELS)
      .filter((k) => specs[k] && String(specs[k]).trim() !== "")
      .map((k) => `<dt>${esc(SPEC_LABELS[k])}</dt><dd>${esc(specs[k])}</dd>`);
    if (!pairs.length) {
      return `<p class="specs__empty">Especificações técnicas sob consulta. Fale conosco pelo WhatsApp para os detalhes completos deste modelo.</p>`;
    }
    return `<dl class="specs__list">${pairs.join("")}</dl>`;
  }

  function openModal(id) {
    const p = state.products.find((x) => String(x.id) === String(id));
    if (!p) return;
    const disponivel = p.available !== false;

    modalContent.innerHTML = `
      <div class="modal__media" id="modal-media" role="button" tabindex="0" aria-label="Ampliar imagem">
        <div class="modal__brand-logo">
          <img src="./assets/logo/seiko.svg" alt="Seiko" onerror="this.onerror=null;this.style.display='none'" />
        </div>
        <div class="modal__media-frame" aria-hidden="true">
          <img src="${esc(p.image || PLACEHOLDER_IMAGE)}" alt="${esc(p.name)} — ${esc(p.reference || "")}" ${imgFallback} />
        </div>
        <span class="modal__zoomhint">Clique para ampliar</span>
      </div>
      <div class="modal__info">
        <p class="eyebrow">${esc(p.brand)} · ${esc(p.collection)}</p>
        <h2 class="modal__name" id="modal-name">${esc(p.name)}</h2>
        <p class="modal__ref">Modelo ${esc(p.model || "—")} · Ref. ${esc(p.reference || "—")}</p>
        <p class="modal__price">${esc(p.price || "Sob consulta")}</p>
        ${p.discountText ? `<p class="discount-tag modal-discount" aria-hidden="true" title="${esc(p.discountText)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" fill="none"></circle><path d="M8 12h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /><circle cx="9.5" cy="12" r="1.2" fill="currentColor"></circle></svg><span class="discount-tag__text">${esc(p.discountText)}</span></p>` : ""}
        <p class="status ${disponivel ? "status--on" : "status--off"}">${disponivel ? `Disponível <span class="availability" aria-hidden="true" title="Disponível"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" fill="none"></circle><path d="M7 13l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></svg></span>` : "Indisponível"}</p>

        <div class="specs">
          <h3 class="specs__title">Especificações</h3>
          ${specRows(p)}
        </div>
        
        <div class="modal__actions">
          ${
            disponivel
              ? `<a class="btn btn--whats" href="${whatsappLink(p)}" target="_blank" rel="noopener">Tenho interesse neste modelo</a>`
              : `<div style="display:flex;flex-direction:column;gap:8px"><button class="btn btn--whats" type="button" disabled>Modelo indisponível no momento</button>
                 <a class="btn btn--ghost btn--block" href="${whatsappLink(p)}" target="_blank" rel="noopener">Consultar previsão de chegada</a></div>`
          }
        </div>
        <p style="font-size:12px;color:var(--muted);margin-top:14px">
          Valores e disponibilidade sujeitos a confirmação com a loja.
        </p>
      </div>`;

    // place brand logo in modal panel (absolute, corner outside image)
    (function () {
      const panel = modal.querySelector(".modal__panel");
      if (panel) {
        // remove any previous logo
        const old = panel.querySelector(".modal__brand-logo");
        if (old) old.remove();
        panel.insertAdjacentHTML(
          "afterbegin",
          '<div class="modal__brand-logo"><img src="/assets/logo/seiko.svg" alt="Seiko" onerror="this.style.display=\'none\';this.nextElementSibling&&(this.nextElementSibling.style.display=\'inline-block\')" onload="this.nextElementSibling&&(this.nextElementSibling.style.display=\'none\')" /><span class="modal__brand-wordmark" style="display:none">SEIKO</span></div>',
        );
      }
    })();

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();

    const media = document.getElementById("modal-media");
    const openLb = () => openLightbox(p);
    media.addEventListener("click", openLb);
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLb();
      }
    });
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function openLightbox(p) {
    lightboxImg.src = p.image || PLACEHOLDER_IMAGE;
    lightboxImg.onerror = () => {
      lightboxImg.onerror = null;
      lightboxImg.src = PLACEHOLDER_IMAGE;
    };
    lightboxImg.alt = `${p.name} — imagem ampliada`;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  /* ---------- eventos ---------- */
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    state.category = btn.dataset.cat;
    renderFilters();
    renderGrid();
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) openModal(btn.dataset.open);
  });

  document.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("input", (e) => {
      state.query = e.target.value;
      document.querySelectorAll("[data-search]").forEach((other) => {
        if (other !== e.target) other.value = state.query;
      });
      renderGrid();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeModal();
  });
  lightbox.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lightbox.classList.contains("is-open")) closeLightbox();
    else if (modal.classList.contains("is-open")) closeModal();
  });

  /* menu mobile */
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );

  /* footer */
  document.getElementById("footer-whats").href = whatsappLink(null);
  document.getElementById("year").textContent = new Date().getFullYear();

  /* init */
  renderFilters();
  renderGrid();
  initHero();

  /* ---------- hero slideshow ---------- */
  function setHeroImage(i) {
    const img = document.getElementById("hero-img");
    const indicators = document.getElementById("hero-indicators");
    if (!img) return;
    heroIndex = (i + HERO_IMAGES.length) % HERO_IMAGES.length;
    // fade out, swap src, then fade in
    img.classList.add("fade-out");
    // wait for short fade-out before changing src to reduce flicker
    setTimeout(() => {
      img.src = HERO_IMAGES[heroIndex];
      img.onload = () => {
        img.classList.remove("fade-out");
      };
    }, 250);
    if (indicators) {
      indicators.querySelectorAll(".hero__indicator").forEach((el, idx) => {
        el.classList.toggle("is-active", idx === heroIndex);
      });
    }
  }
  function nextHero() {
    setHeroImage(heroIndex + 1);
  }
  function prevHero() {
    setHeroImage(heroIndex - 1);
  }
  function startHero() {
    stopHero();
    heroTimer = setInterval(nextHero, 4000);
  }
  function stopHero() {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  }
  function initHero() {
    const img = document.getElementById("hero-img");
    const prev = document.getElementById("hero-prev");
    const next = document.getElementById("hero-next");
    const indicators = document.getElementById("hero-indicators");
    if (!img) return;
    // build indicators
    if (indicators) {
      indicators.innerHTML = HERO_IMAGES.map(
        (_, idx) =>
          `<button class="hero__indicator" data-idx="${idx}" aria-label="Ir para imagem ${idx + 1}"></button>`,
      ).join("");
      indicators.querySelectorAll(".hero__indicator").forEach((el) => {
        el.addEventListener("click", (e) => {
          setHeroImage(Number(el.dataset.idx));
          startHero();
        });
      });
    }
    // controls
    if (prev)
      prev.addEventListener("click", () => {
        prevHero();
        startHero();
      });
    if (next)
      next.addEventListener("click", () => {
        nextHero();
        startHero();
      });
    // pause on hover
    const wrapper = img.closest(".hero__visual-media");
    if (wrapper) {
      wrapper.addEventListener("mouseenter", stopHero);
      wrapper.addEventListener("mouseleave", startHero);
    }
    // initial
    setHeroImage(0);
    startHero();
  }
})();
