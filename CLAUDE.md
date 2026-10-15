<!-- SPACEMAKER-BRIEF v3 -->
# Space Maker website — standing brief (applies to every phase)

LIVE site for Space Maker (Dhaka real estate developer). Stack: React 19 + Vite 8 + Tailwind 4, framer-motion, lenis, react-router-dom 7. App lives in `client/` (dev: `cd client && npm run dev`). Content data: `client/src/data/portfolio.js`, `siteContent.js`. Scrolling: `client/src/lib/scroll.js` only. Leads: `client/src/lib/leads.js`. Image treatments: `Shot` in `portfolio/shared.jsx`.

## Ground rules
1. Only open the files needed for the current item. Never scan or review the whole codebase.
2. Work on branch `ui-upgrade-by-claude`. Never push, deploy or publish — the owner publishes after approval.
3. Before finishing a phase: `cd client && npm run build` must pass; check desktop + mobile (375px) layouts; no console errors.
4. After each phase: short summary of what changed + which files, then STOP and wait.
5. All content (text, photos, projects, team, jobs, testimonials) will be managed from an admin panel. Every section is data-driven from one consistent structure. No hard-coded per-project layouts.
6. Ask before ANY database/back-end (`server/`) change. New data fields are optional so existing data keeps working.
7. Keep all existing URLs/slugs. If one must change, add a redirect.
8. Never invent testimonials, names, team members, RAJUK numbers, REHAB membership or credentials. Use placeholders like "[Client name]", "[Name]".
9. Forms: spam protection (honeypot), validation, success message, no double-submit; save to admin + notify by email/WhatsApp (back end only after approval; until then fall back to WhatsApp pre-filled message). CV uploads: PDF/DOC only, max 5 MB, private storage.
10. Never show the number of units available anywhere.
11. Performance: no CSS `filter`/`blur` or blend modes on photos or moving layers; use plain rgba tints. Hover/scroll animation = transform + opacity only. Respect reduced motion.
12. Content must never sit under the sticky menu: use scroll-margin-top / top padding equal to menu height. Butterflies must never overlap text.

## Brand (decided — option C blend, revised 15 Oct)
- KEEP current fonts: Space Grotesk (display), Playfair Display italic (emotional lines), Plus Jakarta Sans (body), JetBrains Mono (labels/numbers).
- Main look stays green + cream: brand green #1B4332, cream/sage backgrounds, lime #C6F00C for accents.
- DARK espresso (#3A2C24 → #2A1F1A): ONLY the footer. No other full section is dark.
- Why Choose Us = LIGHT ESPRESSO ("latte"), chosen option 6: background gradient #DCCFBF → #E2D8C9 (40%) → #E8E6D1 (70%) → #EEF4DD (100%), flowing straight into the pale-lime Testimonials so the change is almost invisible. Headings/body espresso #2A1F1A, labels olive #5C6E0A, a short lime bar (48×3px) under the heading, lime only for small accents.
- Footer = "curved lip", chosen option B: the cream Partner-with-us section ends in a soft SVG wave edge (no fade) with a 1.5px lime #C6F00C line along the curve; below it the footer goes #3A2C24 → #2A1F1A. Cream text, lime links.
- Pale lime #EEF4DD: Testimonials background (flowing into Team of experts, which fades to cream).
- Olive #5C6E0A for links/labels on pale lime, latte or cream. Lime #C6F00C never as text on light backgrounds, never as a full section background.
- NO long dark-to-light gradients anywhere (they look harsh). Between sections use: a clean edge, a soft curve, or a fade between two LIGHT colours only. Light-espresso (latte) tints are fine for depth on other pages; never a full dark section.
- Photos are always sharp — no blur "teaser" effect.
- WhatsApp/hotline: +8801916100416.
- Project status = Active / Completed / Handed Over. "Signature" is a separate yes/no label. Opening-soon projects may have no photo yet.

## Homepage order
Top bar · Hero · About us · Projects portfolio · Active / Completed & Handed-over / Interiors · Opening soon · 6-step development process · Why choose us (light espresso) · Testimonials (pale lime) · Team of experts · Partner with us (landowners, cream) · Footer (curved lip, dark espresso, with Contact block at its top).
Career is a SEPARATE page (`/careers`), only linked from nav/footer.
<!-- END-SPACEMAKER-BRIEF -->
