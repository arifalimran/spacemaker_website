<!-- SPACEMAKER-BRIEF v5 -->
# Space Maker website — standing brief (applies to every session)

LIVE site for Space Maker (Dhaka real estate developer). Stack: React 19 + Vite 8 + Tailwind 4, framer-motion, lenis, react-router-dom 7. App lives in `client/` (dev: `cd client && npm run dev`). Content data: `client/src/data/portfolio.js`, `siteContent.js`. Scrolling: `client/src/lib/scroll.js` only. Leads: `client/src/lib/leads.js`. Image treatments: `Shot` in `portfolio/shared.jsx`.

## Ground rules
1. Only open the files needed for the current item. Never scan or review the whole codebase.
2. Work on branch `ui-final-16oct`. Never push, deploy or publish — the owner publishes after approval.
3. Make ONLY the change asked. No extra redesigns, no "improvements" the owner did not ask for. If something is unclear, ask first.
4. Before finishing: `cd client && npm run build` must pass; check desktop + 375px mobile; no console errors.
5. After each change: short summary of what changed + which files, then STOP and wait.
6. All content (text, photos, projects, team, jobs, testimonials) will be managed from an admin panel. Everything data-driven from one consistent structure. No hard-coded per-project layouts.
7. Ask before ANY database/back-end (`server/`) change. New data fields are optional so existing data keeps working.
8. Keep all existing URLs/slugs. If one must change, add a redirect.
9. Never invent testimonials, names, team members, RAJUK numbers, REHAB membership or credentials. Use placeholders like "[Client name]", "[Name]".
10. Forms: honeypot spam protection, validation, success message, no double-submit; until the back end is approved fall back to a pre-filled WhatsApp message. CV uploads: PDF/DOC only, max 5 MB, private storage.
11. Never show the number of units available anywhere.
12. Performance: no CSS `filter`/`blur` or blend modes on photos or moving layers; plain rgba tints. Hover/scroll animation = transform + opacity only. Respect reduced motion.
13. Nothing may sit under the sticky menu (scroll-margin-top). Butterflies never overlap text.
14. WhatsApp/hotline: +8801916100416. Brand: espresso #2A1F1A, brand green #1B4332, lime #C6F00C (accent only, never body text on light), cream/alabaster #FAF8F5, pale lime #EEF4DD, olive #5C6E0A.
15. Project status = Active / Completed / Handed Over. "Signature" is a separate yes/no label. Premium luxury feel everywhere.

# FINAL DESIGN DECISIONS (16 Oct 2026) — these override anything older
# Space Maker website — FINAL design decisions (16 Oct 2026)

These replace all earlier decisions where they conflict (angle cuts, wave footer, light-espresso Why Choose Us, Cormorant fonts).

## Base
- This branch starts from the version after Phase 1 (dark espresso Why Choose Us with arch photo).
- No big redesigns. One small change at a time; the owner checks each before the next.

## Section joins
- NO angle cuts, NO waves anywhere.
- Light sections blend into each other softly, like Hero -> Who we are.
- Solid espresso sections (Signature projects, Why Choose Us, Footer) NEVER blend: a clean straight edge against a light section above and below.
- Why Choose Us: cream above, pale lime below (Testimonials). Footer: cream above.

## Homepage sections
- Signature projects: solid espresso. Active / Completed / Interiors: cream. Opening soon: cream, compact.
- Why Choose Us: OLD design (solid dark espresso, arch photo).
- Testimonials ("In their words"): pale lime #EEF4DD, soft blend into Team of experts (cream).
- Partner with us: cream (NOT dark, so it never touches the dark footer). Keep its content, make the heading stronger.
- Footer: solid espresso.
- "New addresses are close" (Opening soon): compact. Card = name, location, status line, Register interest button. Land / facing / floors / sizes only on hover or tap. Photo optional; a designed placeholder when missing. Photos always sharp, never blurred.

## Team of experts
- Photo in a ROUND circle frame. No photo yet = circle placeholder (initials on brand green with a lime ring).
- Expertise text is exactly THREE lines per person (clamped; every card the same height so they align).
- Data per person: name, role, expertise, photo (optional), order. Placeholders only ("[Name]", "[Role]"). Never invent people.

## "In their words" (testimonials)
- Client photo in a ROUND circle frame; circle placeholder when no photo. Same circle style as Team of experts.
- Data per testimonial: name, project, quote, photo (optional), isSample flag. Placeholders only ("[Client name]", "Sample testimonial - replace"). Never invent clients.

## Typography
- Headings everywhere: the bold serif used in "Let's Discuss Your Land Over Coffee" and "Let us show you around." One heading token site-wide (e.g. --font-heading).
- Italic emotional lines: Playfair Display italic. Body: Plus Jakarta Sans. Labels/numbers: JetBrains Mono.

## Floating menu
- No dropdowns. Keep current links (Projects, Interiors, About, Why Us, Landowners, Careers, Contact) + Book a Visit.
- Adaptive to the section behind it: over light sections = soft espresso bar (#4A3A30), cream text, lime button; over solid espresso = latte cream bar (#EFE6D8), espresso text, green button. Smooth colour transition ~0.3s. Same typeface always. No backdrop blur (Safari scroll). A small animated lime indicator follows the active section.

## Logo
- Original SPACE MAKER wordmark + tree icon returns: menu, footer, and soft watermarks in footer, Who we are, Partner with us, Contact. Clean SVGs built from the owner's PSD/PNGs (dark version for light backgrounds, white + lime for espresso). Show the owner before placing.

## Order of small steps
1 Heading font. 2 Section joins + Partner with us cream. 3 Adaptive menu. 4 Logo + watermarks. 5 Opening soon compact. Then testimonials, team, process, contact, hero, projects, interiors, careers under these rules.

## Never
- Never invent testimonials, names, RAJUK numbers, REHAB membership or credentials. Never show unit counts. Never deploy without the owner's approval.
<!-- END-SPACEMAKER-BRIEF -->
