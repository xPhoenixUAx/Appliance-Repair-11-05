(function () {
  const config = window.SITE_CONFIG || {};

  const nav = [
    ["Home", "index.html"],
    ["Services", "services.html"],
    ["About", "about.html"],
    ["Contact", "contact.html"]
  ];

  const serviceLinks = [
    ["Refrigeration", "service-refrigeration.html", "snowflake"],
    ["Cooking", "service-cooking.html", "flame"],
    ["Laundry", "service-laundry.html", "shirt"],
    ["Dishwashing", "service-dishwashing.html", "droplets"]
  ];

  const icon = (name, size = 20) => `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;

  function hydrateConfig() {
    const setText = (selector, value) => document.querySelectorAll(selector).forEach((el) => { el.textContent = value || ""; });
    setText("[data-company-name]", config.companyName);
    setText("[data-company-id]", config.companyId);
    setText("[data-company-address]", [config.addressLine1, config.addressLine2].filter(Boolean).join(", "));
    setText("[data-footer-text-primary]", config.footerTextPrimary);
    setText("[data-footer-text-secondary]", config.footerTextSecondary);
    setText("[data-disclaimer-short]", config.disclaimerShort);
    setText("[data-disclaimer-full]", config.disclaimerFull);
    setText("[data-current-year]", new Date().getFullYear());
    setText("[data-phone-text]", config.phoneDisplay);
    setText("[data-email-text]", config.email);

    document.querySelectorAll("[data-phone-link]").forEach((el) => el.setAttribute("href", `tel:${config.phone}`));
    document.querySelectorAll("[data-email-link]").forEach((el) => el.setAttribute("href", `mailto:${config.email}`));
    document.querySelectorAll("[data-cta-primary]").forEach((el) => { el.textContent = config.ctaPrimary; });
    document.querySelectorAll("[data-cta-secondary]").forEach((el) => { el.textContent = config.ctaSecondary; });
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const current = location.pathname.split("/").pop() || "index.html";
    const isServicesActive = current === "services.html" || current === "service-detail.html" || serviceLinks.some(([, href]) => href === current);
    const navMarkup = nav.map(([label, href]) => {
      if (label !== "Services") {
        return `<a class="${current === href ? "is-active" : ""}" href="${href}">${label}</a>`;
      }

      return `
        <div class="nav-dropdown ${isServicesActive ? "is-active" : ""}">
          <a class="nav-dropdown__trigger" href="${href}" aria-haspopup="true">
            <span>${label}</span>${icon("chevron-down", 16)}
          </a>
          <div class="nav-dropdown__menu" aria-label="Service categories">
            <a href="services.html">${icon("layout-list", 18)}All appliance services</a>
            ${serviceLinks.map(([serviceLabel, serviceHref, iconName]) => `<a href="${serviceHref}">${icon(iconName, 18)}${serviceLabel} repair</a>`).join("")}
          </div>
        </div>
      `;
    }).join("");
    header.innerHTML = `
      <div class="nav-shell">
        <a class="brand" href="index.html" aria-label="${config.companyName} home">
          <span class="brand-mark">${icon("plug-zap", 22)}</span>
          <span class="brand-lockup"><span class="brand-name" data-company-name>${config.companyName}</span><span class="brand-descriptor">Appliance Repair Network</span></span>
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          ${navMarkup}
        </nav>
        <a class="nav-phone" data-phone-link href="tel:${config.phone}">${icon("phone-call", 18)}<span data-phone-text>${config.phoneDisplay}</span></a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu", 24)}</button>
      </div>
      <div class="mobile-panel" aria-hidden="true">
        <div class="mobile-panel__inner">
          <button class="mobile-close" type="button" aria-label="Close menu">${icon("x", 26)}</button>
          <div class="mobile-kicker">Appliance repair network</div>
          <div class="mobile-links">
            <a href="index.html">Home</a>
            <details class="mobile-service-dropdown" ${isServicesActive ? "open" : ""}>
              <summary>Services ${icon("chevron-down", 22)}</summary>
              <div class="mobile-services">
                <a href="services.html">${icon("layout-list", 20)}All services</a>
                ${serviceLinks.map(([label, href, iconName]) => `<a href="${href}">${icon(iconName, 20)}${label}</a>`).join("")}
              </div>
            </details>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
          <a class="btn btn-primary" data-phone-link href="tel:${config.phone}">${icon("phone-call", 18)}${config.phoneButtonLabel}</a>
          <p>${config.businessHours} · ${config.serviceArea}</p>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    footer.innerHTML = `
      <div class="footer-grid">
        <div>
          <a class="brand brand-footer" href="index.html"><span class="brand-mark">${icon("plug-zap", 22)}</span><span class="brand-lockup"><span class="brand-name" data-company-name>${config.companyName}</span><span class="brand-descriptor">Appliance Repair Network</span></span></a>
          <p data-footer-text-primary>${config.footerTextPrimary}</p>
          <p class="fine" data-disclaimer-short>${config.disclaimerShort}</p>
        </div>
        <div>
          <h3>Service Groups</h3>
          ${serviceLinks.map(([label, href]) => `<a href="${href}">${label} appliance repair</a>`).join("")}
        </div>
        <div>
          <h3>Company</h3>
          ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
        </div>
        <div>
          <h3>Legal</h3>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms</a>
          <a href="cookie.html">Cookie Policy</a>
        </div>
        <div>
          <h3>Contact</h3>
          <a data-phone-link href="tel:${config.phone}">${icon("phone", 16)}<span data-phone-text>${config.phoneDisplay}</span></a>
          <a data-email-link href="mailto:${config.email}">${icon("mail", 16)}<span data-email-text>${config.email}</span></a>
          <p>${config.businessHours}</p>
          <p data-company-address>${config.addressLine1}, ${config.addressLine2}</p>
        </div>
      </div>
      <div class="footer-disclaimer">
        <p>${config.footerDisclaimer || config.disclaimerFull || ""}</p>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span data-current-year></span> ${config.copyrightLine}</span>
        <span data-company-id>${config.companyId}</span>
      </div>
    `;
  }

  function renderFloatingCta() {
    if (document.querySelector(".floating-cta")) return;
    const cta = document.createElement("div");
    cta.className = "floating-cta";
    cta.setAttribute("aria-hidden", "true");
    cta.innerHTML = `
      <a class="floating-cta__call" data-phone-link href="tel:${config.phone}">${icon("phone-call", 18)}<span>Call</span></a>
      <a class="floating-cta__quote" href="contact.html">${icon("clipboard-list", 18)}<span>Quote</span></a>
    `;
    document.body.appendChild(cta);
  }

  function bindInteractions() {
    const header = document.querySelector(".site-header");
    const floatingCta = document.querySelector(".floating-cta");
    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".mobile-panel");
    const close = document.querySelector(".mobile-close");
    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle?.setAttribute("aria-expanded", String(open));
      panel?.setAttribute("aria-hidden", String(!open));
    };

    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      const showFloatingCta = window.scrollY > 180;
      floatingCta?.classList.toggle("is-visible", showFloatingCta);
      floatingCta?.setAttribute("aria-hidden", String(!showFloatingCta));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    toggle?.addEventListener("click", () => setMenu(true));
    close?.addEventListener("click", () => setMenu(false));
    panel?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    document.querySelectorAll("[data-reveal]").forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(el);
    });
    bindAccordions();
    if (window.lucide) window.lucide.createIcons();
  }

  function bindAccordions() {
    document.querySelectorAll(".faq details").forEach((detail) => {
      if (detail.dataset.accordionReady === "true") return;
      const summary = detail.querySelector("summary");
      if (!summary) return;

      const content = document.createElement("div");
      content.className = "faq-content";
      while (summary.nextSibling) content.appendChild(summary.nextSibling);
      detail.appendChild(content);
      detail.dataset.accordionReady = "true";

      if (detail.open) {
        content.style.height = "auto";
        content.style.opacity = "1";
      }

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (detail.classList.contains("is-animating")) return;

        if (detail.open) {
          closeAccordion(detail, content);
          return;
        }

        detail.closest(".faq")?.querySelectorAll("details[open]").forEach((item) => {
          if (item === detail) return;
          const itemContent = item.querySelector(".faq-content");
          if (itemContent) closeAccordion(item, itemContent);
        });
        openAccordion(detail, content);
      });
    });
  }

  function openAccordion(detail, content) {
    detail.classList.add("is-animating");
    detail.open = true;
    content.style.height = "0px";
    content.style.opacity = "0";
    requestAnimationFrame(() => {
      content.style.height = `${content.scrollHeight}px`;
      content.style.opacity = "1";
    });
    content.addEventListener("transitionend", function onEnd(event) {
      if (event.propertyName !== "height") return;
      content.style.height = "auto";
      detail.classList.remove("is-animating");
      content.removeEventListener("transitionend", onEnd);
    });
  }

  function closeAccordion(detail, content) {
    detail.classList.add("is-animating");
    content.style.height = `${content.scrollHeight}px`;
    content.style.opacity = "1";
    requestAnimationFrame(() => {
      content.style.height = "0px";
      content.style.opacity = "0";
    });
    content.addEventListener("transitionend", function onEnd(event) {
      if (event.propertyName !== "height") return;
      detail.open = false;
      detail.classList.remove("is-animating");
      content.removeEventListener("transitionend", onEnd);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  renderHeader();
  renderFooter();
  renderFloatingCta();
  hydrateConfig();
  document.body.classList.add("is-ready");
  bindInteractions();
}());
