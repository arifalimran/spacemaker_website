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
- Espresso #2A1F1A / Deep #1F1713: ONLY for (a) Why Choose Us and (b) the footer. Nowhere else as a full section background. Light espresso tints (rgba) are allowed for small accents/overlays.
- Pale lime #EEF4DD: background for Testimonials (flowing smoothly into Team of experts).
- Olive #5C6E0A for links/labels on pale lime or cream. Lime #C6F00C never as body text on light backgrounds, never as a full section background.
- Transitions between sections: clean edge OR a short fade (80–160px). Gradients must use warm stops (no grey/muddy midpoint), e.g. cream #F5F0E6 → #E8DCCD → #A89480 → #2A1F1A.
- Photos are always sharp — no blur "teaser" effect.
- WhatsApp/hotline: +8801916100416.
- Project status = Active / Completed / Handed Over. "Signature" is a separate yes/no label. Opening-soon projects may have no photo yet.

## Homepage order
Top bar · Hero · About us · Projects portfolio · Active / Completed & Handed-over / Interiors · Opening soon · 6-step development process · Why choose us (espresso) · Testimonials (pale lime) · Team of experts · Partner with us (landowners) · Footer (espresso fade, with Contact block at its top).
Career is a SEPARATE page (`/careers`), only linked from nav/footer.
<!-- END-SPACEMAKER-BRIEF -->
