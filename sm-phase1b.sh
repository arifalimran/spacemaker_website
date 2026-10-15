#!/usr/bin/env bash
# =====================================================================
#  Space Maker website — PHASE 1b (do this BEFORE Phase 2)
#  Heading font site-wide · solid espresso (Signature, Why Choose Us,
#  Footer) · angle cuts everywhere, no gradients · Opening soon ·
#  Testimonials · Team of experts · Partner with us · overlap fixes
#
#  Run in the terminal inside spacemaker_website:   bash sm-phase1b.sh
#  Then: Claude Code desktop → new session (+) → Cmd+V → Enter
# =====================================================================
set -euo pipefail

PROJECT_DIR="/Users/mac/Space Maker/spacemaker_website"
BRANCH="ui-upgrade-by-claude"

cd "$PROJECT_DIR" || { echo "❌ Project folder not found"; exit 1; }
[ -d .git ] || { echo "❌ No git repo — stopping (no backup possible)."; exit 1; }

CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$BRANCH" ]; then
  read -r -p "⚠️  On '$CURRENT'. Switch to $BRANCH? (y/n) " a; [ "$a" = "y" ] || exit 1
  git checkout "$BRANCH"
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
git add -A
git commit -m "Checkpoint before Phase 1b ($STAMP)" >/dev/null 2>&1 || true
git tag "backup-phase1b-$STAMP"
echo "✅ Backup tag: backup-phase1b-$STAMP"
echo "   Undo this phase later with:  git reset --hard backup-phase1b-$STAMP"

# ---------- Replace the standing brief in CLAUDE.md with v4 ----------
touch CLAUDE.md
if grep -q "<!-- SPACEMAKER-BRIEF" CLAUDE.md; then
  sed -i '' '/<!-- SPACEMAKER-BRIEF/,/<!-- END-SPACEMAKER-BRIEF -->/d' CLAUDE.md
fi
cat >> CLAUDE.md <<'BRIEF'
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
BRIEF
echo "✅ CLAUDE.md brief updated to v4"

# ---------- Phase 1b task ----------
read -r -d '' TASK <<'EOF' || true
PHASE 1b — Homepage lower half + site-wide font and angle cuts. Follow CLAUDE.md (brief v4 — typography, colour and section-join rules changed). Open only the files each step needs.

0. Heading font everywhere
 - Find the font-family/token used by the "Let's Discuss Your Land Over Coffee" heading (Landowner/Partner section) and "Let us show you around." (footer). Tell me its name.
 - Make it the single heading token (--font-heading) and apply it to ALL headings on all pages (home, projects, project detail, interiors, careers). Any other heading font Phase 1 introduced → switch to this token. Body/italic/mono stay as in CLAUDE.md.

1. Remove gradients between sections
 - Search `client/src` (rg "linear-gradient|radial-gradient") and list every section-to-section gradient. Remove them (keep gradients that are only photo overlays for text legibility).

2. Angle cuts
 - Build ONE shared AngleCut component/utility per CLAUDE.md (same angle everywhere, alternating direction, exact neighbour colour, optional lime hairline on espresso edges, smaller on mobile).
 - Apply it on the homepage wherever the background colour changes, and on the other existing pages (projects, project detail, interiors, careers) the same way. Make sure no seam or white gap appears at any zoom/width.

3. Solid espresso sections: Signature projects (keep), Why Choose Us, Footer — all solid #2A1F1A, matching the Signature section's look (cream text, lime labels/italic, #352822 cards).
 - Why Choose Us: replace the arch photo frame with the clipped-corner frame (CLAUDE.md "Photo frames"); keep content data-driven.

4. Opening soon — new presentation
 - We list projects right after signing to gauge interest, so many have NO photo. Must look rich with or without photos — never pale or odd.
 - Card per project: visual on one side; name, location, status line from data ("Just signed", "Submitted to RAJUK"), neat specs grid (only fields present), feature chips, "Register interest" button placed with the details (not floating far right).
 - Photo present → sharp, object-fit cover, clipped-corner frame. Photo missing → designed placeholder: deep green #1B4332 panel, fine lime line-drawing of a building, project name/location large, small "Render coming soon" label.
 - Hover (desktop): card lifts, photo zooms ~4%, lime arrow + "View sizes & features →" appears. Mobile: details always visible. Transform/opacity only.
 - 1 column mobile, 2 desktop (or featured first + others) — best for 1–6 projects. Register interest → WhatsApp pre-filled (lib/leads.js). Never unit counts.

5. Testimonials (after Why Choose Us) — solid pale lime #EEF4DD, joined to Why Choose Us by an angle cut with lime hairline.
 - Data-driven: name, project, quote, optional photo, `isSample`. Seed 3 "[Client name]" / "Sample testimonial — replace" with a small "Sample" tag.
 - Big quote mark, olive labels, heading in --font-heading.

6. Team of experts (new, after Testimonials) — solid cream, angle cut from pale lime.
 - Cards: photo (clipped-corner frame), name, role, one-line expertise; no photo → initials circle on green with lime ring. Hover lift + zoom.
 - Data `team` in siteContent (name, role, bio, photo, order). Seed 4 "[Name]" / "[Role]". No invented people.

7. Partner with us — redesign, solid CREAM (currently dark: change it; footer is the dark one).
 - Strong heading in --font-heading ("Let's Discuss Your Land Over Coffee."), Playfair italic support line, lime underline accent.
 - Split: left = pitch + the four promises as compact numbered cards (01–04, from data) + trust line; right = "Request feasibility study" form in a clean card. No invented claims beyond existing copy.
 - Ends in an angle cut into the espresso footer.

8. Footer — solid espresso #2A1F1A (no gradient, no wave)
 - Top: Contact block ("Let us show you around.", WhatsApp/hotline +8801916100416, email, both office addresses already in the current footer, Facebook link). Then quick links (Projects, Interiors, About, Why Us, Landowners, Careers), Recent projects, social, copyright.
 - Cream text, lime links/labels, the line-drawing building motif in rgba(245,240,230,.06). Readable at 375px.

9. Fixes
 - Nothing slides under the sticky menu (form fields, interiors titles, process labels).
 - Butterflies stay in side corridors, never on text.
 - Homepage order matches CLAUDE.md.

10. Finish: `cd client && npm run build` passes; check 375px; no console errors. Summary (incl. heading font name, list of gradients removed, where cuts were added) + files changed + questions. STOP. Don't commit/push/deploy.
EOF

printf '%s' "$TASK" > .sm-phase1b-task.md
printf '%s' "$TASK" | pbcopy
echo ""
echo "📋 Phase 1b instructions COPIED to clipboard (also in .sm-phase1b-task.md)."
echo "   → Claude Code desktop: + new session in spacemaker_website → Cmd+V → Enter."
echo "   → Check: cd client && npm run dev"
