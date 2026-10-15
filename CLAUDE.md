<!-- SPACEMAKER-BRIEF v4 -->
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

## Typography (decided 15 Oct — use on EVERY page)
- Headings (h1–h3, section titles, card titles): the bold high-contrast SERIF currently used in "Let's Discuss Your Land Over Coffee", "Why Landowners Choose Space Maker" and "Let us show you around.". Keep this font; use it for all headings site-wide through one token (e.g. --font-heading).
- Emotional/italic lines: Playfair Display italic (as in "Four promises we keep on every plot.").
- Body: Plus Jakarta Sans. Labels, numbers, small caps lines: JetBrains Mono. Logo lockup unchanged.

## Colour (decided 15 Oct)
- Base look: cream/alabaster + brand green #1B4332, lime #C6F00C for accents only.
- SOLID espresso #2A1F1A (cards on it #352822, borders rgba(245,240,230,.12)) for exactly three premium sections: Signature projects, Why Choose Us, Footer. Solid colour — no gradients inside or between them. Cream text, Playfair italic lines in lime, mono labels in lime.
- Testimonials: pale lime #EEF4DD (solid). Team of experts: cream/alabaster (solid). Partner with us: cream (solid) — it is NOT dark, so it never sits dark-next-to-dark with the footer.
- Olive #5C6E0A for links/labels on light backgrounds. Lime never as text on light backgrounds, never as a full section background.
- Two dark sections must never touch each other.

## Section joins: ANGLE CUTS only (no gradients, no waves, no curves)
- Remove every gradient blend between sections. Sections join with a straight diagonal angle cut wherever the background colour changes; same-colour neighbours join flat.
- ONE shared implementation (component or utility class, e.g. `<AngleCut from to direction />`) used everywhere — never one-off per section.
- Congruent: the SAME angle on every cut (height clamp(28px, 4.5vw, 72px) across the full width); direction alternates down the page (left-high, then right-high) so consecutive cuts run parallel like architectural lines.
- The triangle is filled with the neighbouring section's exact colour: no seam, no white hairline gaps, no overlap shadow.
- Espresso sections may carry a fine 1.5px lime line along their cut edge (subtle premium detail); light-to-light cuts have no line.
- Keep content padding so text, cards and buttons never touch the slope; menu/butterflies never cover it. Smaller cut on mobile.
- Use cuts on ALL pages (projects, interiors, careers, detail pages) with the same rules.

## Photo frames
- Arch frames are retired for Why Choose Us. Use the clipped-corner frame: rectangle with one diagonal corner cut matching the angle-cut slope (from `Shot`, e.g. notch/carved, or add a `clip` variant), optionally a thin lime offset frame line. Keep frames consistent within a section.
- Photos always sharp — no blur teaser.

## Other
- WhatsApp/hotline: +8801916100416.
- Project status = Active / Completed / Handed Over. "Signature" is a separate yes/no label. Opening-soon projects may have no photo yet.

## Homepage order
Top bar · Hero · About us · Projects portfolio (Signature = espresso) · Active / Completed & Handed-over / Interiors · Opening soon · 6-step development process · Why choose us (espresso) · Testimonials (pale lime) · Team of experts (cream) · Partner with us (cream) · Footer (espresso, Contact block at its top).
Career is a SEPARATE page (`/careers`), only linked from nav/footer.
<!-- END-SPACEMAKER-BRIEF -->
