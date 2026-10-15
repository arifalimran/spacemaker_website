#!/usr/bin/env bash
# =====================================================================
#  Space Maker website — PHASE 1: Colours (option C blend) + quick fixes
#  Items: brand colour tokens · 9 Remove unit counts · 10 Why Choose Us
#         styling · 11 Partner-with-us vs footer balance
#
#  Run in the VS Code terminal:
#     bash sm-phase1.sh
#  (uses the project folder below; change PROJECT_DIR if it moves)
# =====================================================================
set -euo pipefail

PROJECT_DIR="/Users/mac/Space Maker/spacemaker_website"
BRANCH="ui-upgrade-by-claude"

cd "$PROJECT_DIR" || { echo "❌ Project folder not found: $PROJECT_DIR"; exit 1; }
[ -d .git ] || { echo "❌ No git repo here — stopping so nothing is changed without a backup."; exit 1; }

# ---------- 1) Right branch + backup ----------
CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$BRANCH" ]; then
  echo "⚠️  You are on '$CURRENT', expected '$BRANCH'."
  read -r -p "   Switch to $BRANCH now? (y/n) " ans
  [ "$ans" = "y" ] || { echo "Stopped."; exit 1; }
  git checkout "$BRANCH"
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
git add -A
git commit -m "Backup before Phase 1 ($STAMP)" >/dev/null 2>&1 || true
git tag "backup-phase1-$STAMP"
echo "✅ Backup tag: backup-phase1-$STAMP"
echo "   Undo everything from this phase with:  git reset --hard backup-phase1-$STAMP"

# ---------- 2) Shared brief (auto-loaded by Claude Code in every phase) ----------
# CLAUDE.md is read automatically each session, so later phases don't repeat it (saves tokens).
MARK="<!-- SPACEMAKER-BRIEF v2 -->"
if ! grep -qF "$MARK" CLAUDE.md 2>/dev/null; then
  # remove an older version of the brief if present
  if grep -q "<!-- SPACEMAKER-BRIEF" CLAUDE.md 2>/dev/null; then
    sed -i '' '/<!-- SPACEMAKER-BRIEF/,/<!-- END-SPACEMAKER-BRIEF -->/d' CLAUDE.md
  fi
  cat >> CLAUDE.md <<'BRIEF'
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
BRIEF
  echo "✅ Standing brief written to CLAUDE.md"
fi

# ---------- 3) Phase 1 task ----------
read -r -d '' TASK <<'TASK' || true
PHASE 1 — Colours (option C blend) + quick fixes. Follow CLAUDE.md. Do NOT touch fonts.

A. Colour tokens
 - Open only `client/src/index.css` (Tailwind 4 theme). Add tokens: deep #1F1713, alabaster #FAF8F5, footer-green #EEF4DD, olive #5C6E0A (keep every existing token/name unchanged).

B. Item 9 — remove unit counts
 - Search only `client/src/data/` and `client/src/components/` (rg for: unit, units, flats left, available, sold out, remaining). Remove any number of units available from what is displayed. Leave the data fields in place (admin may still store them) — just never render them. List every place you changed.

C. Item 10 — Why Choose Us
 - Restyle the Why Choose Us section with espresso depth (#2A1F1A → #1F1713 soft gradient), cream/alabaster text, lime only for small accents/icons/numbers. Client-buyer focus: aesthetic design, quality materials, on-time delivery, plus other relevant points already in the content data. Keep content data-driven. Cheap effects only (no filters/blend modes).

D. Item 11 — Partner-with-us vs footer
 - Make the Landowner/"partner with us" section less dominant (smaller height and type scale, calmer background) but keep its CTA.
 - Footer: background #EEF4DD, links #5C6E0A (hover → #1B4332), text espresso. Make it more attractive and organised (logo, short line, quick links incl. Projects/Interiors/Careers, contact incl. WhatsApp +8801916100416, social placeholders). Must stay readable on mobile 375px.

E. Finish
 - Run `cd client && npm run build`; fix any errors you caused.
 - Then give me: a short summary, files changed, and anything you were unsure about. STOP and wait. Do not commit, push or deploy.
TASK

# ---------- 4) Hand the task to Claude Code desktop ----------
printf '%s' "$TASK" > .sm-phase1-task.md
printf '%s' "$TASK" | pbcopy
echo ""
echo "📋 Phase 1 instructions are COPIED to your clipboard (also saved in .sm-phase1-task.md)."
echo ""
echo "Next:"
echo "  1. Open Claude Code desktop → start a new session in this folder:"
echo "     $PROJECT_DIR"
echo "  2. Paste (Cmd+V) and send."
echo "  3. Approve its edits; when it stops, review with:  cd client && npm run dev"
