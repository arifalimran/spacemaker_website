#!/bin/bash
# Space Maker — Testimonials ("In their words") section, rebuilt under 16 Oct rules
# Run from VS Code terminal or Claude Code with:  ! bash "/Users/mac/Space Maker/sm-step-testimonials.sh"
# Then paste the copied prompt into a NEW Claude Code session in the folder.

cd "/Users/mac/Space Maker/spacemaker_website" || { echo "Folder not found"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "ui-final-16oct" ]; then
  echo "You are on '$BRANCH'. Switch first:  git checkout ui-final-16oct"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes. Commit them first (e.g. git add -A && git commit -m \"WCU clean edge\"), then run again."
  exit 1
fi

TAG="backup-before-testimonials-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG" && echo "Safety tag created: $TAG"

cat <<'PROMPT' | pbcopy
Task: Build the homepage Testimonials section ("In their words"), rebuilt fresh under the 16 Oct design rules. Small, focused change.

RULES
- Work on branch ui-final-16oct. Do NOT scan or review the whole codebase. Open only the files named or needed below.
- Change ONLY what is listed. Do not touch other sections, fonts, colours, nav, or Why Choose Us.
- This is a demo site: realistic SAMPLE content is wanted. Every sample entry must have isSample: true so the owner can replace it later from the admin panel.
- No cards, no boxes, no shadows, no angle cuts, no waves, no CSS blur/filters/blend modes.

STEP 1 — Ideas from the old version (read only, do not copy styles)
- Run: git diff --stat 8d20b8e ui-upgrade-by-claude | grep -i testimon
- If a file shows up, read it with: git show ui-upgrade-by-claude:<path>
- Take ideas only (data shape, wording). Do NOT copy its gradients, angle cuts or card styling.

STEP 2 — Data (admin-panel ready)
- In client/src/data/siteContent.js add an exported array `testimonials` with exactly 3 entries. Fields:
  id, name, project, projectSlug (optional), quote, photo (optional), order, isSample
- Project names: read ONLY the project names/slugs from client/src/data/portfolio.js and use 3 real ones (set projectSlug so the label can link).
- Names: realistic Bangladeshi client names. Quotes: 2–3 natural sentences each about the apartment, build quality, design and on-time handover. All isSample: true.
- Every field is optional-safe: component must not break if photo, project or projectSlug is missing.

STEP 3 — Sample photos
- Download 3 professional portrait photos (free licence, e.g. Unsplash), resize to about 400x400, save as JPG (under 80 KB each) in client/public/images/samples/testimonials/ (testimonial-1.jpg, -2, -3). Point the `photo` fields to them.
- If a download fails, leave photo empty — the initials placeholder will show.

STEP 4 — Component
- Find the Why Choose Us component with one narrow search and create Testimonials.jsx in the SAME folder.
- Add it to the homepage directly AFTER Why Choose Us. Do not reorder anything else.

DESIGN
- Background: solid pale lime #EEF4DD.
- Top edge: clean straight edge against the espresso Why Choose Us. No fade at the top.
- Bottom edge: soft blend into cream #F5F0E6 — reuse the SAME technique already used between Hero and "Who we are" (find it and copy that approach; tall blend, no visible start/end line).
- Padding: 96px mobile, 128px desktop (py-24 md:py-32 or equivalent).
- Header (centred): small JetBrains Mono label "IN THEIR WORDS" in olive #5C6E0A; heading "What our clients say" using the site's heading token (the bold serif used in "Let's Discuss Your Land Over Coffee").
- Layout: one big open section, NOT cards. Desktop (lg+): 3 testimonials side by side in 3 columns, separated by thin vertical lines (1px #1B4332 at ~15% opacity). Mobile/tablet: stacked one under another, separated by thin horizontal lines.
- Each testimonial, centred:
  - Circle photo ~88px, object-cover, ring: 3px lime #C6F00C with a 1px outline of #1B4332 at ~25% opacity outside it (so the ring stays visible on pale lime).
  - No photo = circle in green #1B4332 with the client's initials in cream, same ring.
  - Quote in Playfair Display ITALIC, ~20px mobile / 22px desktop, comfortable line height, espresso #2A1F1A text.
  - Client name in the heading token.
  - Project name as a small JetBrains Mono label in olive; if projectSlug exists, link it to /projects/<slug>.
- Highlight: when one testimonial is hovered, focused (keyboard) or tapped (mobile), that one gets a thicker lime ring (5px) and stays full opacity; the other two fade to ~0.55 opacity. Transition ~0.3s. When nothing is selected, all three are full opacity. Tapping again or tapping outside clears it. Use opacity + ring width only (no filters, no scale jumps).
- Entrance: gentle fade-up of the content on scroll using the project's existing framer-motion pattern. The background itself never fades. Respect prefers-reduced-motion.
- Accessibility: each testimonial focusable (tabIndex 0), photos have alt text with the client name.

WHEN DONE
- List every file created/changed and the lines added in the homepage file.
- Do not commit, do not push. The owner will check with: cd client && npm run dev
PROMPT

echo "Prompt copied. Open a NEW Claude Code session in the folder, paste (Cmd+V), Enter."
echo "Check with: cd client && npm run dev"
echo "Undo if needed: git reset --hard $TAG  (and delete client/public/images/samples/testimonials if created)"
