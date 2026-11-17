# Promo ERP — 3D Product Site

An interactive 3D marketing site for **Promo ERP**, built with **Three.js** and **Vite**.
A faceted metallic core with orbiting module nodes and live connection lines visualises
the platform's promise: every operation synchronised in one place.

Content is sourced from:

- <https://promoerp.it/>
- <https://promoautomations.vercel.app/>

## Stack

- [Three.js](https://threejs.org/) — WebGL scene, particles, bloom post-processing
- [Vite](https://vite.dev/) — dev server and build
- Vanilla JS + CSS — no framework

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```
promo-erp-3d/
├─ index.html          Page skeleton, nav, hero, section shells
├─ src/
│  ├─ main.js          Boots the UI + scene, scroll mapping, render loop
│  ├─ scene.js         Three.js world: core, rings, nodes, particles, bloom
│  ├─ ui.js            Renders data-driven sections + interactions
│  ├─ data.js          All copy and catalog data (edit here)
│  └─ style.css        Theme, layout and responsive rules
├─ public/favicon.svg
└─ vite.config.js
```

## Editing content

Almost everything is data-driven in **`src/data.js`**:

- `brand` — name, emails, phone, socials, demo URL
- `stats` — the animated numbers strip
- `features` / `industries` — platform cards
- `tools` — the 21-tool catalog (filterable by category)
- `aiCapabilities` / `agenticTier` — AI section
- `maturity` — the 8-level framework
- `methodology` — the 4-step deployment method
- `pricing` — packages
- `integrations` — partner groups + marquee

Add or remove tools and the filter chips/grid update automatically.

## Notes

- The contact form validates locally and opens the visitor's email client via a
  `mailto:` link — there is no backend.
- "Request credentials" buttons open WhatsApp with a pre-filled message.
- The scene respects `prefers-reduced-motion` and lowers particle count / disables
  bloom on small screens.
- If WebGL is unavailable, the page falls back to a CSS gradient background and all
  content remains readable.

## Disclaimer

This is a design demo. Open-source product names and trademarks (ERPNext, Odoo,
Manager.io, OrangeHRM, Plane, ProjeQtOr, Taiga, Vikunja, and others) belong to
their respective owners.
