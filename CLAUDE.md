<!-- SPACEMAKER-BRIEF v2 -->
# Space Maker website — standing brief (applies to every phase)

LIVE site for Space Maker (Dhaka real estate developer). Stack: React 19 + Vite 8 + Tailwind 4, framer-motion, lenis, react-router-dom 7. App lives in `client/` (dev: `cd client && npm run dev`). Content data: `client/src/data/portfolio.js`, `siteContent.js`. Scrolling: `client/src/lib/scroll.js` only. Leads: `client/src/lib/leads.js`. Image treatments: `Shot` in `portfolio/shared.jsx`.

## Ground rules
1. Only open the files needed for the current item. Never scan or review the whole codebase.
2. Work on branch `ui-upgrade-by-claude`. Never push, deploy or publish — the owner publishes after approval.
3. Before finishing a phase: `cd client && npm run build` must pass with no errors; check desktop + mobile (375px) layouts in code; no console errors.
4. After each phase: short summary of what changed + which files, then STOP and wait.
5. All content (text, photos, projects, jobs, testimonials) will be managed from an admin panel. Every section must be data-driven from one consistent structure. No hard-coded per-project layouts.
6. Ask before ANY database/back-end change. New data fields are optional so existing data keeps working.
7. Keep all existing URLs/slugs. If one must change, add a redirect.
8. Never invent testimonials, client names, RAJUK numbers, REHAB membership or credentials. Use placeholders like "[Client name]".
9. Forms: spam protection, validation, success message, no double-submit; save to admin + notify by email/WhatsApp. CV uploads: PDF/DOC only, max 5 MB, private storage.
10. Never show the number of units available anywhere.
11. Performance: no CSS `filter` or blend modes on moving/animated layers; use pre-tinted overlays (plain rgba) instead. Scrolling is still jerky in Safari, so don't add heavy effects.

## Brand (option C "blend" — decided)
- KEEP current fonts: Space Grotesk (display), Playfair Display italic (emotional lines), Plus Jakarta Sans (body), JetBrains Mono (labels/numbers).
- KEEP current palette: brand green #1B4332, cream/sage backgrounds, lime #C6F00C, espresso #2A1F1A.
- ADD: Deep #1F1713 (darker espresso), Alabaster #FAF8F5 (light surface), Footer light green #EEF4DD with olive links #5C6E0A.
- Lime is for accents only — never body text on light backgrounds.
- Espresso is used where depth is needed: Why Choose Us, project detail pages, selected photo overlays. Don't overuse it. Soft "vanishing light" gradients (light → deep).
- WhatsApp/hotline: +8801916100416.
- Project status = Active / Completed / Handed Over. "Signature" is a separate yes/no label.

## Homepage order
0 Top bar · 1 Hero (client-oriented) · 2 About us · 3 Projects portfolio · 4 Active / Completed & Handed-over / Interior projects · 5 Why choose us · 6 Testimonials · 7 6-step development process · 8 Your lands (landowners) · 10 Contact us · 11 Footer. Career is a SEPARATE page (`/careers`).
<!-- END-SPACEMAKER-BRIEF -->
