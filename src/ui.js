import {
  brand,
  stats,
  features,
  industries,
  toolCategories,
  tools,
  aiCapabilities,
  agenticTier,
  maturity,
  methodology,
  pricing,
  integrations,
  integrationMarquee,
} from './data.js';

/* ---------------- helpers ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const iconPaths = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  factory:
    '<path d="M2 20h20"/><path d="M4 20V9l5 3V9l5 3V9l5 3v8"/><path d="M4 20V4h4v6"/>',
  network:
    '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4"/><path d="M6.6 17.3 10 13"/><path d="M17.4 17.3 14 13"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v3"/><path d="M11 10v8"/><path d="M15 13v5"/><path d="M19 6v12"/>',
  shield:
    '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  devices:
    '<rect x="2" y="4" width="14" height="10" rx="1.5"/><rect x="16" y="9" width="6" height="11" rx="1.5"/><path d="M6 18h6"/>',
  sparkles:
    '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6 6 2.5 2.5"/><path d="m15.5 15.5 2.5 2.5"/><path d="m18 6-2.5 2.5"/><path d="m8.5 15.5-2.5 2.5"/>',
  cpu:
    '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4"/><path d="M15 2v4"/><path d="M9 18v4"/><path d="M15 18v4"/><path d="M2 9h4"/><path d="M2 15h4"/><path d="M18 9h4"/><path d="M18 15h4"/>',
  bell:
    '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  trend: '<path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/>',
  workflow:
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h5a3 3 0 0 1 3 3V14"/>',
  decision:
    '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
};

function icon(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || ''}</svg>`;
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------------- renderers ---------------- */
function renderStats() {
  const root = $('#stats');
  if (!root) return;
  root.innerHTML = stats
    .map(
      (s) => `
      <div class="stat" data-reveal>
        <b><span data-count="${s.value}">0</span><em>${esc(s.suffix)}</em></b>
        <span>${esc(s.label)}</span>
      </div>`
    )
    .join('');
}

function renderFeatures() {
  const root = $('#featuresGrid');
  if (!root) return;
  root.innerHTML = features
    .map(
      (f, i) => `
      <article class="card feature" data-reveal style="--d:${(i % 3) * 0.06}s">
        <div class="icon-box">${icon(f.icon)}</div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.body)}</p>
      </article>`
    )
    .join('');
}

function renderIndustries() {
  const root = $('#industriesGrid');
  if (!root) return;
  root.innerHTML = industries
    .map(
      (it, i) => `
      <article class="industry" data-reveal style="--d:${(i % 2) * 0.07}s">
        <span class="industry__stat">${esc(it.stat)}</span>
        <div>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.body)}</p>
        </div>
      </article>`
    )
    .join('');
}

function toolCard(t) {
  const isHosted = t.status === 'Hosted';
  const waText = encodeURIComponent(
    `Hello Promo ERP Team, please provide demo sandbox login credentials for ${t.name}.`
  );
  return `
    <article class="card tool" data-category="${esc(t.category)}" data-reveal>
      <div class="tool__top">
        <span class="tool__cat">${esc(t.category)}</span>
        <span class="badge ${isHosted ? 'badge--hosted' : 'badge--soon'}">${
          isHosted ? 'Hosted' : 'Coming soon'
        }</span>
      </div>
      <h3>${esc(t.name)}</h3>
      <p class="tool__tagline">${esc(t.tagline)}</p>
      <p class="tool__body">${esc(t.body)}</p>
      <p class="tool__problem"><b>Problem solved:</b> ${esc(t.problem)}</p>
      <div class="tool__foot">
        <span class="tool__deploy">${esc(t.deploy)}</span>
        <a class="tool__link" href="https://wa.me/923004439445?text=${waText}" target="_blank" rel="noopener">
          Request credentials ${icon('arrow')}
        </a>
      </div>
    </article>`;
}

function renderTools() {
  const grid = $('#toolsGrid');
  const filters = $('#toolFilters');
  if (!grid || !filters) return;

  filters.innerHTML = toolCategories
    .map(
      (c, i) =>
        `<button class="chip${i === 0 ? ' active' : ''}" type="button" data-filter="${esc(
          c
        )}" aria-pressed="${i === 0}">${esc(c)}</button>`
    )
    .join('');

  grid.innerHTML = tools.map(toolCard).join('');

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    const filter = btn.dataset.filter;
    $$('.chip', filters).forEach((c) => {
      const on = c === btn;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    $$('.tool', grid).forEach((card) => {
      card.hidden = filter !== 'All' && card.dataset.category !== filter;
    });
  });
}

function renderAI() {
  const root = $('#aiGrid');
  if (!root) return;
  root.innerHTML = aiCapabilities
    .map(
      (a, i) => `
      <article class="card feature" data-reveal style="--d:${(i % 3) * 0.06}s">
        <div class="icon-box">${icon(a.icon)}</div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.body)}</p>
      </article>`
    )
    .join('');

  const agenticRoot = $('#agenticGrid');
  if (agenticRoot) {
    agenticRoot.innerHTML = agenticTier
      .map(
        (a) => `
        <div class="agentic__item">
          <h4>${esc(a.title)}</h4>
          <p>${esc(a.body)}</p>
        </div>`
      )
      .join('');
  }
}

function renderMaturity() {
  const root = $('#maturityGrid');
  if (!root) return;
  root.innerHTML = maturity
    .map(
      (m, i) => `
      <article class="level ${i === maturity.length - 1 ? 'level--top' : ''}" data-reveal style="--d:${(i % 4) * 0.05}s">
        <span class="level__num">LEVEL ${m.level}</span>
        <h4>${esc(m.title)}</h4>
        <p>${esc(m.body)}</p>
      </article>`
    )
    .join('');
}

function renderMethodology() {
  const root = $('#methodGrid');
  if (!root) return;
  root.innerHTML = methodology
    .map(
      (m, i) => `
      <article class="method__item" data-reveal style="--d:${i * 0.06}s">
        <span class="method__step">${esc(m.step)}</span>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.body)}</p>
        <ul class="method__list">
          ${m.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');
}

function renderPricing() {
  const root = $('#pricingGrid');
  if (!root) return;
  root.innerHTML = pricing
    .map(
      (p, i) => `
      <article class="price ${p.popular ? 'price--popular' : ''}" data-reveal style="--d:${i * 0.07}s">
        ${p.popular ? '<span class="price__badge">Most popular</span>' : ''}
        <h3 class="price__name">${esc(p.name)}</h3>
        <p class="price__tagline">${esc(p.tagline)}</p>
        <div class="price__amount">Contact for pricing<small>Scoped to your operations</small></div>
        <ul class="price__features">
          ${p.features.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}
        </ul>
        <a class="btn ${p.popular ? 'btn--solid' : 'btn--ghost'} btn--full" href="#contact">Get started</a>
      </article>`
    )
    .join('');
}

function renderIntegrations() {
  const track = $('#marqueeTrack');
  if (track) {
    const items = integrationMarquee
      .map((name) => `<span class="marquee__item">${esc(name)}</span>`)
      .join('');
    track.innerHTML = items + items;
  }

  const root = $('#integrationGroups');
  if (root) {
    root.innerHTML = integrations
      .map(
        (g, i) => `
        <article class="card integration" data-reveal style="--d:${(i % 3) * 0.06}s">
          <h3>${esc(g.group)}</h3>
          <div class="integration__items">
            ${g.items.map((it) => `<span>${esc(it)}</span>`).join('')}
          </div>
        </article>`
      )
      .join('');
  }
}

function renderContact() {
  const root = $('#contactInfo');
  if (!root) return;

  const rows = [
    { label: 'Primary', value: brand.emails.primary, href: `mailto:${brand.emails.primary}` },
    { label: 'Corporate', value: brand.emails.corporate, href: `mailto:${brand.emails.corporate}` },
    { label: 'Phone', value: brand.phone, href: `tel:${brand.phoneRaw}` },
    { label: 'WhatsApp', value: brand.phone, href: 'https://wa.me/923218833616' },
    { label: 'LinkedIn', value: 'linkedin.com/in/promo-erp', href: 'https://www.linkedin.com/in/promo-erp' },
    { label: 'YouTube', value: 'youtube.com/@PromoERP', href: 'https://www.youtube.com/@PromoERP' },
  ];

  root.innerHTML = rows
    .map(
      (r) => `
      <div class="contact__row">
        <span>${esc(r.label)}</span>
        <a href="${esc(r.href)}"${r.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(
        r.value
      )}</a>
      </div>`
    )
    .join('');
}

function renderFooter() {
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const social = $('#footerSocial');
  if (social) {
    const short = { LinkedIn: 'in', Facebook: 'fb', YouTube: 'yt' };
    social.innerHTML = brand.socials
      .map(
        (s) =>
          `<a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${esc(
            s.label
          )}">${esc(short[s.label] || s.label.slice(0, 2))}</a>`
      )
      .join('');
  }
}

/* ---------------- interactions ---------------- */
function initNav() {
  const nav = $('#nav');
  const links = $('#navLinks');
  const burger = $('#burger');

  const onScroll = () => {
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const close = () => {
    if (!links || !burger) return;
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('click', (e) => {
      if (!links.classList.contains('open')) return;
      if (!links.contains(e.target) && !burger.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // Active section highlighting
  const map = {};
  $$('#navLinks a').forEach((a) => {
    const id = a.getAttribute('href')?.slice(1);
    if (id) map[id] = a;
  });
  const sections = Object.keys(map)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length) {
    let ticking = false;
    const updateActive = () => {
      ticking = false;
      const probe = window.innerHeight * 0.4;
      let current = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= probe) current = s;
      }
      $$('#navLinks a').forEach((a) => a.classList.remove('active'));
      if (current) map[current.id]?.classList.add('active');
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActive();
  }
}

function animateCounters() {
  const els = $$('[data-count]');
  const start = performance.now();
  const duration = 1500;

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    els.forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      el.textContent = String(Math.round(target * eased));
    });
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initReveals() {
  let pending = $$('[data-reveal]');
  if (!pending.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pending.forEach((e) => e.classList.add('in'));
    return;
  }

  let ticking = false;

  const check = () => {
    ticking = false;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const still = [];

    for (const el of pending) {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        el.classList.add('in');
      } else {
        still.push(el);
      }
    }
    pending = still;

    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // First paint + late layout/font passes (no reliance on IntersectionObserver).
  check();
  requestAnimationFrame(check);
  window.setTimeout(check, 350);
  window.setTimeout(check, 1200);
}

function initCounters() {
  const band = $('.stats-band');
  if (!band) {
    animateCounters();
    return;
  }

  let done = false;
  const maybe = () => {
    if (done) return;
    const rect = band.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.9 && rect.bottom > 0) {
      done = true;
      animateCounters();
      window.removeEventListener('scroll', maybe);
      window.removeEventListener('resize', maybe);
    }
  };

  window.addEventListener('scroll', maybe, { passive: true });
  window.addEventListener('resize', maybe);
  maybe();
  window.setTimeout(maybe, 600);
}

function initHeroParallax() {
  const hero = $('#heroContent');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    const h = window.innerHeight;
    const p = Math.min(y / h, 1);
    hero.style.transform = `translate3d(0, ${p * 70}px, 0)`;
    hero.style.opacity = String(1 - p * 0.9);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

function initForm() {
  const form = $('#contactForm');
  const note = $('#formNote');
  if (!form || !note) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = ['name', 'email', 'subject', 'message'];
    let ok = true;

    required.forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      const valid = field.value.trim().length > 0 && (name !== 'email' || /\S+@\S+\.\S+/.test(field.value));
      field.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });

    if (!ok) {
      note.textContent = 'Please complete the required fields with a valid email.';
      note.classList.add('error');
      return;
    }

    note.classList.remove('error');
    const subject = encodeURIComponent(form.elements.subject.value.trim());
    const body = encodeURIComponent(
      `Name: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nPhone: ${
        form.elements.phone?.value.trim() || '—'
      }\n\n${form.elements.message.value.trim()}`
    );
    note.textContent = 'Opening your email app to send this to Promo ERP…';
    window.location.href = `mailto:promoerp786@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });

  form.addEventListener('input', (e) => {
    if (e.target.classList.contains('invalid')) e.target.classList.remove('invalid');
  });
}

export function initUI() {
  renderStats();
  renderFeatures();
  renderIndustries();
  renderTools();
  renderAI();
  renderMaturity();
  renderMethodology();
  renderPricing();
  renderIntegrations();
  renderContact();
  renderFooter();

  initNav();
  initReveals();
  initCounters();
  initHeroParallax();
  initForm();
}
