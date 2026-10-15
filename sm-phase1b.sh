#!/usr/bin/env bash
# =====================================================================
#  Space Maker website — PHASE 1b (do this BEFORE Phase 2)
#  Opening soon redesign · Testimonials (pale lime) · Team of experts ·
#  Partner with us redesign · Espresso fade footer · gradient + overlap fixes
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

# ---------- Replace the standing brief in CLAUDE.md with v3 ----------
touch CLAUDE.md
if grep -q "<!-- SPACEMAKER-BRIEF" CLAUDE.md; then
  sed -i '' '/<!-- SPACEMAKER-BRIEF/,/<!-- END-SPACEMAKER-BRIEF -->/d' CLAUDE.md
fi
cat >> CLAUDE.md <<'BRIEF'
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
BRIEF
echo "✅ CLAUDE.md brief updated to v3"

# ---------- Phase 1b task ----------
read -r -d '' TASK <<'EOF' || true
PHASE 1b — Homepage lower half redesign. Follow CLAUDE.md (brief v3 — note the colour rules changed). Open only the homepage file, the components for the sections below, `portfolio/shared.jsx` (Shot) if needed, and `client/src/data/siteContent.js` / `portfolio.js`.

A. Opening soon — new presentation
 - Purpose: we list projects right after signing to measure customer interest, so many will have NO photo yet. The section must look rich and confident with or without photos — never pale, empty or odd.
 - Each project = a proper card: visual on one side; name, location, status line (e.g. "Just signed", "Submitted to RAJUK" — from data), a neat specs grid (land, facing, floors, sizes — only those present in data), feature chips, and a clear "Register interest" button placed right with the details (not floating far right).
 - Photo present → sharp, no blur, object-fit cover. Photo missing → designed placeholder: deep green #1B4332 (or warm cream) panel with a fine lime line-drawing of a building, the project name/location in large type and a small "Render coming soon" label. It must look intentional and premium.
 - Hover (desktop): card lifts slightly, photo zooms ~4%, a lime underline/arrow and a "View sizes & features →" detail line appear. Mobile: details always visible. Transform/opacity only.
 - Layout: balanced alignment, consistent card heights, 1 column mobile, 2 desktop (or featured first card + others) — choose what looks best with 1–6 projects.
 - Register interest: opens WhatsApp with project name pre-filled (lib/leads.js) — no back-end yet. Never show unit counts.

B. Testimonials (after Why choose us)
 - Background pale lime #EEF4DD, olive/espresso text, lime + olive accents (big quote mark, thin lines, name labels).
 - Data-driven: name, project, quote, optional photo, `isSample` flag. Seed 3 entries "[Client name]" / "Sample testimonial — replace", with a small "Sample" tag while isSample is true.
 - Smooth transition (short, no grey) from Why choose us espresso into pale lime, and from pale lime into Team of experts.

C. Team of experts (new, after Testimonials)
 - Light section (pale lime fading to cream). Heading + short intro from data.
 - Cards: photo, name, role, one line about expertise; no photo → elegant monogram/initials circle on green with lime ring. Hover: lift + photo zoom.
 - Data in siteContent `team` (name, role, bio, photo, order). Seed 4 placeholders "[Name]" / "[Role]". No invented people.

D. Partner with us — redesign (it is dull now, heading doesn't attract)
 - Stronger, warmer heading treatment (keep fonts): e.g. large display line + Playfair italic emotional line ("Let's discuss your land over coffee." can stay as the italic line), lime underline accent.
 - Split layout: left = pitch + 3 benefit points with icons (text from data, no invented claims/credentials) + small trust line; right = the existing "Request feasibility study" form in a cleaner card.
 - Background cream with a subtle warm texture/tint; it must lead nicely into the footer fade. Attractive but not louder than the hero.

E. Footer — espresso fade
 - Starts from the cream of Partner with us and fades (warm stops, no grey, ~120–160px) into LIGHT espresso, deepening to #2A1F1A at the bottom — not one flat solid block.
 - Top part of footer = Contact block (hotline/WhatsApp +8801916100416, email placeholder, address placeholder, quick message link). Then logo + tagline, quick links (Projects, Interiors, Careers, About, Contact), social placeholders, copyright.
 - Text cream on dark parts, lime accents; all readable at 375px.

F. Fixes
 - Fix Why Choose Us transitions to the short warm-fade rule (remove the long muddy grey bands above it).
 - Interiors carousel titles and process labels must not slide under the sticky menu.
 - Butterflies must never overlap text (keep them in the side corridors).
 - Update homepage order to match CLAUDE.md.

G. Finish: `cd client && npm run build` passes; check 375px; no console errors. Summary + files changed + questions. STOP. Don't commit/push/deploy.
EOF

printf '%s' "$TASK" > .sm-phase1b-task.md
printf '%s' "$TASK" | pbcopy
echo ""
echo "📋 Phase 1b instructions COPIED to clipboard (also in .sm-phase1b-task.md)."
echo "   → Claude Code desktop: + new session in spacemaker_website → Cmd+V → Enter."
echo "   → Check: cd client && npm run dev"
