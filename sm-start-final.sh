#!/usr/bin/env bash
# =====================================================================
#  Space Maker website — SAVE OLD WORK + START FINAL BRANCH (16 Oct)
#
#  1. Commits and tags ALL current work on ui-upgrade-by-claude (nothing lost)
#  2. Creates a NEW branch ui-final-16oct from the safe point taken just
#     BEFORE sm-phase1b (the version after Phase 1: dark espresso Why
#     Choose Us with arch photo)
#  3. Writes the 16 Oct design decisions into that branch
#     (DESIGN-DECISIONS-16-OCT.md + CLAUDE.md brief v5) and commits them
#
#  Run in the VS Code terminal:   bash sm-start-final.sh
#  Uses no Claude tokens. Nothing is pushed anywhere.
# =====================================================================
set -euo pipefail

PROJECT_DIR="/Users/mac/Space Maker/spacemaker_website"
OLD_BRANCH="ui-upgrade-by-claude"
NEW_BRANCH="ui-final-16oct"

cd "$PROJECT_DIR" || { echo "❌ Project folder not found: $PROJECT_DIR"; exit 1; }
[ -d .git ] || { echo "❌ No git repo here — stopping."; exit 1; }

if git show-ref --verify --quiet "refs/heads/$NEW_BRANCH"; then
  echo "❌ Branch $NEW_BRANCH already exists. Nothing changed."
  echo "   Switch to it with:  git checkout $NEW_BRANCH"
  exit 1
fi

CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$OLD_BRANCH" ]; then
  echo "⚠️  You are on '$CURRENT', expected '$OLD_BRANCH'."
  read -r -p "   Save the work on '$CURRENT' anyway? (y/n) " a
  [ "$a" = "y" ] || { echo "Stopped. Nothing changed."; exit 1; }
fi

# Safety: never commit node_modules by accident
if ! git check-ignore -q client/node_modules 2>/dev/null; then
  echo "❌ client/node_modules is not ignored by git — stopping so nothing huge gets committed."
  echo "   Fix:  echo 'node_modules' >> .gitignore   then run this script again."
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"

# ---------- 1) Save ALL previous work ----------
echo "💾 Saving previous work on '$CURRENT'..."
git add -A
if git diff --cached --quiet; then
  echo "   (nothing new to commit — already saved)"
else
  git commit -m "Save all work before design reset (16 Oct)" >/dev/null
  echo "   ✅ Committed."
fi
OLD_TAG="old-work-16oct-$STAMP"
git tag "$OLD_TAG"
echo "   🏷  Tagged: $OLD_TAG   (come back any time: git checkout $OLD_TAG)"

# ---------- 2) Find the base: safe point just before Phase 1b ----------
BASE_TAG="$(git tag -l 'backup-phase1b-*' | sort | head -1)"
if [ -z "$BASE_TAG" ]; then
  echo ""
  echo "❌ No backup-phase1b-* tag found, so I can't tell which version to start from."
  echo "   Your work IS saved (tag $OLD_TAG). Tags available:"
  git tag -l 'backup-*'
  echo "   Tell Claude which tag to use."
  exit 1
fi
echo ""
echo "📍 Base for the new branch: $BASE_TAG"
git log -1 --format='   %h  %ci  %s' "$BASE_TAG"

# ---------- 3) New branch ----------
git checkout -b "$NEW_BRANCH" "$BASE_TAG" >/dev/null 2>&1
echo "🌿 Created and switched to: $NEW_BRANCH"

# ---------- 4) Design decisions ----------
cat > DESIGN-DECISIONS-16-OCT.md <<'DECISIONS'
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
DECISIONS
echo "📝 Wrote DESIGN-DECISIONS-16-OCT.md"

# CLAUDE.md: remove any older brief, write brief v5 (rules + decisions)
touch CLAUDE.md
if grep -q "<!-- SPACEMAKER-BRIEF" CLAUDE.md; then
  sed -i '' '/<!-- SPACEMAKER-BRIEF/,/<!-- END-SPACEMAKER-BRIEF -->/d' CLAUDE.md
fi
{
  echo '<!-- SPACEMAKER-BRIEF v5 -->'
  cat <<'RULES'
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
RULES
  cat DESIGN-DECISIONS-16-OCT.md
  echo '<!-- END-SPACEMAKER-BRIEF -->'
} >> CLAUDE.md
echo "📝 CLAUDE.md updated (brief v5)"

# ---------- 5) Commit the decisions on the new branch ----------
git add DESIGN-DECISIONS-16-OCT.md CLAUDE.md
git commit -m "Start ui-final-16oct: design decisions 16 Oct + CLAUDE.md brief v5" >/dev/null
echo "✅ Committed on $NEW_BRANCH"

echo ""
echo "================ DONE ================"
echo "Old work (kept safe)  : branch $OLD_BRANCH  +  tag $OLD_TAG"
echo "New branch (now on it): $NEW_BRANCH   (started from $BASE_TAG)"
echo ""
echo "Switch back to old work any time:  git checkout $OLD_BRANCH"
echo "Switch to the new branch:          git checkout $NEW_BRANCH"
echo ""
if git remote | grep -q .; then
  echo "ℹ️  Nothing was pushed. To back up online later:  git push -u origin $NEW_BRANCH && git push origin $OLD_BRANCH"
else
  echo "ℹ️  No online remote is set, so everything is saved on this Mac only."
fi
echo ""
echo "Next: restart the dev server (cd client && npm run dev) and check the site."
echo "      Claude Code desktop: start a NEW session in this folder (the bar should show $NEW_BRANCH)."
