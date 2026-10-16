#!/bin/bash
# Space Maker — Why Choose Us: clean top & bottom edges (no fades) + good padding
# Run from VS Code terminal. Copies a prompt to clipboard for a NEW Claude Code session.

cd "/Users/mac/Space Maker/spacemaker_website" || { echo "Folder not found"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "ui-final-16oct" ]; then
  echo "You are on '$BRANCH'. Switch first:  git checkout ui-final-16oct"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes. Commit or stash them first, then run again."
  exit 1
fi

TAG="backup-before-wcu-edge-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG" && echo "Safety tag created: $TAG"

cat <<'PROMPT' | pbcopy
Task: Why Choose Us section — remove ALL fading at its top and bottom edges and give it a pure clean edge with good padding. Small change only.

Rules:
- Branch ui-final-16oct. Do NOT scan the whole codebase. Find the Why Choose Us component with one narrow search (e.g. grep "Why Choose" or "WhyChoose" in client/src) and open only that file plus, if needed, the two section files directly above and below it on the homepage.
- Change ONLY what is listed here. No redesign, no other sections, no font/colour/layout changes.

Do this:
1. In the Why Choose Us section: remove every gradient/fade at the top and bottom edge (linear-gradient backgrounds, ::before/::after fade overlays, mask-image fades, absolutely positioned fade divs, framer-motion opacity edges). The section background must be one solid espresso #2A1F1A from the very top pixel to the very bottom pixel.
2. In the section directly ABOVE: remove only a bottom-edge fade that runs toward espresso (if one exists). In the section directly BELOW: remove only a top-edge fade that runs from espresso (if one exists). Leave everything else in those files untouched.
3. Padding inside Why Choose Us: equal top and bottom — 96px on mobile, 128px on desktop (Tailwind py-24 md:py-32 or the equivalent in the existing style). Content must not touch the edges.
4. No hairline, no border, no shadow at the edges. Pure straight edge.
5. Keep the arch photo and all content exactly as is. Make sure the arch photo does not overflow past the section edges.

When done: list each file changed and show the exact lines removed/changed. Do not commit, do not push. I will check with npm run dev.
PROMPT

echo "Prompt copied. Open a NEW Claude Code session in the folder, paste (Cmd+V), Enter."
echo "Check with: cd client && npm run dev"
echo "Undo if needed: git checkout . (or git reset --hard $TAG)"
