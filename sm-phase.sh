#!/usr/bin/env bash
# =====================================================================
#  Space Maker website — Phases 2 to 6
#  Usage (VS Code terminal, inside spacemaker_website):
#     bash sm-phase.sh 2      ← then paste into Claude Code desktop
#     bash sm-phase.sh 3      ← only after you approved phase 2
#     ... up to 6
#  Each run: checks branch → backup commit + tag → copies the task.
#  The standing brief (rules, colours, fonts) is already in CLAUDE.md.
# =====================================================================
set -euo pipefail

PHASE="${1:-}"
PROJECT_DIR="/Users/mac/Space Maker/spacemaker_website"
BRANCH="ui-upgrade-by-claude"

case "$PHASE" in 2|3|4|5|6) ;; *) echo "Usage: bash sm-phase.sh <2-6>"; exit 1;; esac

cd "$PROJECT_DIR" || { echo "❌ Project folder not found"; exit 1; }
[ -d .git ] || { echo "❌ No git repo — stopping (no backup possible)."; exit 1; }
grep -q "SPACEMAKER-BRIEF" CLAUDE.md 2>/dev/null || { echo "❌ CLAUDE.md brief missing — run: bash sm-phase1.sh first."; exit 1; }

CURRENT="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT" != "$BRANCH" ]; then
  read -r -p "⚠️  On '$CURRENT'. Switch to $BRANCH? (y/n) " a; [ "$a" = "y" ] || exit 1
  git checkout "$BRANCH"
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
git add -A
git commit -m "Checkpoint before Phase $PHASE ($STAMP)" >/dev/null 2>&1 || true
git tag "backup-phase$PHASE-$STAMP"
echo "✅ Backup tag: backup-phase$PHASE-$STAMP"
echo "   Undo this phase later with:  git reset --hard backup-phase$PHASE-$STAMP"

# ------------------------------------------------------------------ PHASE 2
read -r -d '' P2 <<'EOF' || true
PHASE 2 — Homepage: hero + missing sections. Follow CLAUDE.md (rules, option C colours, current fonts, cheap effects only).
Open only the homepage page file, the hero component (HeroStage), the section components you touch, and `client/src/data/siteContent.js` / `portfolio.js`.

A. Item 3 — Hero (client-oriented)
 - Make project names + key features more visual: project name, location, status badge (Active/Completed/Handed Over), "Signature" label if true, 3–4 feature chips (e.g. lake view, south facing, size range). Never show unit counts.
 - Clear client CTAs: "View projects" and WhatsApp +8801916100416 (use lib/leads.js).
 - All text/features come from data, not hard-coded.

B. Item 16 — Missing sections (positions per CLAUDE.md):
 0 Top bar: hotline/WhatsApp, email (placeholder if unknown), short line; slim, compact on mobile; doesn't cause layout jump.
 2 About us / Our profile: reuse the existing "Who we are" section as About us (anchor #about), add a short profile text + key-facts row from data. Facts I haven't supplied = "[placeholder]". No invented RAJUK/REHAB/credentials.
 Testimonials, Team of experts, Partner with us, Opening soon and Footer were done in Phase 1b — do NOT redesign them.
 7 6-step development process: "building rising" idea — steps from data (title + one line each, editable). Animate cheaply (transform/opacity on enter only, respects reduced motion).
 Contact (block at the top of the footer, see CLAUDE.md): add the form there (name, phone, email optional, interested in [project/interior/land], message) + WhatsApp + call + address/map placeholder.
    Form front-end: validation, honeypot spam field, disabled button while sending, success message, no double submit.
    Back-end: there is a `server/` folder. Do NOT change it yet — first tell me exactly what endpoint/fields you'd add and wait for my yes. Until then, on submit fall back to opening WhatsApp with the message pre-filled.
 - Homepage order must match CLAUDE.md exactly. Career must NOT be on the homepage (footer/nav link only).
 - Nav links to #about and #contact must work with lib/scroll.js (account for top-bar height).

C. Finish: `cd client && npm run build` passes; check 375px. Summary + files changed + questions. STOP. Don't commit/push/deploy.
EOF

# ------------------------------------------------------------------ PHASE 3
read -r -d '' P3 <<'EOF' || true
PHASE 3 — Projects. Follow CLAUDE.md. Open only the projects index page, project detail page, `portfolio/shared.jsx` (Shot), and `client/src/data/portfolio.js`.

A. Data (optional fields only — existing projects must keep working)
 - Make sure every project can carry: status (Active/Completed/Handed Over), signature (yes/no), location, area, district, facing, lakeView (yes/no), floorSizeSqft range, apartmentSizeSqft range, shortDescription, features[], coverImage, focal point (optional, for photo fit). Missing = safely hidden. No unit counts rendered.

B. Item 4 — /projects card grid
 - Cards: photo, name, location (Jalshiri, Dhanmondi, Uttara…), status badge, Signature label, short description, 3 feature chips, "View project". Signature projects first. Responsive: 1 col mobile, 2 tablet, 3 desktop. Lazy-load images.

C. Item 5 — Search & filters
 - Text search (name/location) + filters: location, area, district, facing, lake view, floor size, apartment size, status, signature. Built automatically from the data (no hard-coded option lists).
 - Filters saved in URL query (shareable/back button works). Mobile: filter drawer. "Clear all" + "No projects match" state.

D. Item 7 — One unified project detail template
 - All /projects/:slug pages use ONE template driven by data (no per-project layouts). Espresso + lime styling for depth sections, keep current fonts. Chapters only render if data exists.
 - Photo fit: fixed aspect ratios, object-fit: cover with optional focal point, graceful placeholder (soft tinted block + project name) when a photo is missing or the wrong size.

E. Item 8 — Links
 - Sticky "← All projects" back link on detail pages (doesn't cover content on mobile).
 - Site-wide links to All projects / Signature projects and All interiors / Signature interiors: in nav, footer, and end of each detail page ("More projects").
 - Keep all existing URLs/slugs.

F. Finish: build passes; 375px check. Summary + files + questions. STOP.
EOF

# ------------------------------------------------------------------ PHASE 4
read -r -d '' P4 <<'EOF' || true
PHASE 4 — Interiors page (item 12). Follow CLAUDE.md. Open only the interiors index + detail pages and the interiors data file.

 - Structure for 20–30 interiors from data: optional `tier` field = signature | premium | excellent (default excellent). Order: Signature first, then Premium, then Excellent, each a titled band.
 - Card: photo, title, project/location, style tags; tabs or chips to filter by tier. Lazy-load images; pre-sized, no CSS filters.
 - /interiors/:slug uses the same unified template approach as projects (gallery, short story, related interiors, sticky "← All interiors" back link).
 - Uploading a new interior must only mean adding one data entry (title, tier, images, text). Put a short comment at the top of the data file showing the entry format for the future admin panel.
 - Keep existing URLs/slugs.
 - Finish: build passes; 375px check. Summary + files + questions. STOP.
EOF

# ------------------------------------------------------------------ PHASE 5
read -r -d '' P5 <<'EOF' || true
PHASE 5 — Careers (item 13). Separate page, not on homepage. Follow CLAUDE.md. Open only the careers page, router file, and a careers data file (create `client/src/data/careers.js` if none).

 - /careers redesign: intro, why work with Space Maker, life/benefits points (data-driven), a generic infographic built in SVG/HTML (e.g. hiring steps: Apply → Review → Interview → Offer) — no stock photos needed.
 - Open positions list from data: title, department, location, type, deadline, short summary. Empty state when no jobs ("No openings right now — send your CV").
 - Job detail pages /careers/:slug (new route; keep /careers unchanged): responsibilities, requirements, benefits, deadline, Apply button, optional bdjobs link per job.
 - Apply: form with name, phone, email, position, CV upload (PDF/DOC only, max 5 MB, checked in browser), validation, honeypot, no double submit, success message.
   Back-end: do NOT change `server/` yet — tell me exactly what endpoint, storage (private, not public URLs) and notification (email/WhatsApp) you'd add, then wait for my yes. Until then the Apply button uses the job's bdjobs link or a mailto.
 - FAQ accordion placed elegantly (e.g. side column on desktop, after positions on mobile), data-driven.
 - Finish: build passes; 375px check. Summary + files + questions. STOP.
EOF

# ------------------------------------------------------------------ PHASE 6
read -r -d '' P6 <<'EOF' || true
PHASE 6 — Smoothness + final summary (items 14, 15, 6). Follow CLAUDE.md.

A. Measure first (production, not dev):
 - `cd client && npm run build && npm run preview`. Tell me if scrolling is still jerky there.
 - List: images over 400 KB (path + size), and elements using CSS filter or mix-blend-mode (file + line). Use rg/find — do not read whole files.

B. Item 15 — Smooth scrolling
 - Replace CSS filters/blend modes on animated or scroll-moving layers with pre-tinted rgba overlays (look must stay the same).
 - Keep all scroll logic in lib/scroll.js (Lenis). Check Safari-friendly settings. Respect reduced motion.
 - Images: propose resizing to max 1920px / under 400 KB (WebP). Ask before replacing any original photo; make resized copies, don't delete originals.

C. Item 14 — Contact link jerk
 - Nav/CTA links to #contact scroll smoothly via lib/scroll.js with top-bar offset; no jump, no double scroll; works from other pages (/projects → /#contact).

D. Item 6 — Redesign summary
 - Write `REDESIGN-SUMMARY.md` in the project root: every page and section, what it shows, the data file + fields behind it (for the future admin panel), which content is still placeholder/sample, and known limitations.

E. Finish: build passes; 375px check; no console errors. Summary + files + questions. STOP.
EOF

case "$PHASE" in 2) TASK="$P2";; 3) TASK="$P3";; 4) TASK="$P4";; 5) TASK="$P5";; 6) TASK="$P6";; esac

printf '%s' "$TASK" > ".sm-phase$PHASE-task.md"
printf '%s' "$TASK" | pbcopy
echo ""
echo "📋 Phase $PHASE instructions COPIED to clipboard (also in .sm-phase$PHASE-task.md)."
echo "   → Claude Code desktop: new session in this folder → Cmd+V → send."
echo "   → When it stops: cd client && npm run dev  (check desktop + 375px)."
echo "   → Happy? Run the next phase. Not happy? git reset --hard backup-phase$PHASE-$STAMP"
