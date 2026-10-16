# Space Maker website — HANDOFF (16 Oct 2026, morning, Dhaka)

Read this first in any new chat/Claude Code session. Then read `DESIGN-DECISIONS-16-OCT.md` (final design rules). Where they conflict with anything older, the 16 Oct decisions win.

## Who / what
- LIVE website for Space Maker, a real estate developer in Dhaka. Owner works alone, in a Mac, VS Code terminal (bash) + Claude Code desktop app (Pro plan, token usage matters).
- Stack: React 19 + Vite 8 + Tailwind 4, framer-motion, lenis, react-router-dom 7. Folder: `/Users/mac/Space Maker/spacemaker_website` (path has a space: always quote). App in `client/`, back end in `server/`. Dev: `cd client && npm run dev` (localhost:5173).
- Content data: `client/src/data/portfolio.js`, `siteContent.js`. Scrolling: `client/src/lib/scroll.js` (Lenis). Leads/WhatsApp: `client/src/lib/leads.js`. Photo treatments: `Shot` in `portfolio/shared.jsx`.
- All content will later be managed from an admin panel the owner will build -> everything data-driven, new fields optional.
- Contact: WhatsApp/hotline +8801916100416, spacemakerbd@gmail.com. Offices: Corporate Office, House 405 Road 29 Mohakhali DOHS Dhaka; Jalshiri Operations, House 22 Road 505A Sector 16 Jalshiri Abashon Dhaka.

## How the owner wants to work (important)
- Owner is tired of big surprise redesigns: every large change in the last days distorted the harmony of the site. ONE small change at a time, owner checks, then next.
- If anything is unclear: ASK first. When owner says "no coding" -> discuss only.
- Never scan/review the whole codebase (burns tokens). Open only files needed. Chat sessions cannot see the repo; Claude Code sessions run in the folder can.
- Never push/deploy. Never invent testimonials, names, RAJUK numbers, REHAB membership, credentials. Never show unit counts. Ask before ANY `server/`/database change.
- Premium luxury feel must be present all over the site.

## Git state
- Branch `ui-upgrade-by-claude`: all old work (Phase 1 and whatever Phase 1b added). Saved with tag `old-work-16oct-<time>`.
- Safety tags: `backup-phase1-*`, `backup-phase1b-20261015-235040` (commit 8d20b8e = version after Phase 1, BEFORE 1b), `backup-phase2-*`.
- Branch `ui-final-16oct` (CURRENT, work here): started from 8d20b8e + one commit adding `DESIGN-DECISIONS-16-OCT.md` and CLAUDE.md brief v5.
- Features built in Phase 1b (Testimonials, Team of experts, new footer, Opening soon, Partner redesign) exist ONLY on `ui-upgrade-by-claude` (if Claude Code built them). Owner wants to PORT selected ones into `ui-final-16oct`, restyled under the new rules (not copy the rejected angle cuts/gradients). Method: Claude Code reads the old branch with `git diff --stat`, `git show ui-upgrade-by-claude:<path>` and copies only needed files.
- Owner may compare both versions side by side with `git worktree add "../spacemaker_old" ui-upgrade-by-claude` and two dev servers on ports 5173 / 5174.

## What is done (from status of 15 Oct)
- Routes: `/`, `/projects`, `/projects/:slug`, `/interiors`, `/interiors/:slug`, `/careers`.
- Home: hero, Who we are (animated photo slices), project portfolio, Signature (solid espresso), upcoming launches ("New addresses are close"), Why Choose Us (dark espresso, arch photo), landowner "Partner with us", footer, nav.
- Project detail pages with photo chapters, WhatsApp/call lead links. Two side butterflies. Central scroll file (Lenis); scrolling still jerky in Safari/dev (plan: final performance pass: remove CSS filters/blend modes, resize images, test with build+preview).
- Phase 1 ran: colour tokens, unit counts hidden, Why Choose Us espresso, partner/footer tweak.

## Rejected (do NOT bring back)
Cormorant Garamond fonts; angle cuts; wave footer; light-espresso "latte" Why Choose Us; gradients between sections; photo blur "teaser"; dropdown menus.

## FINAL decisions in one screen (full text: DESIGN-DECISIONS-16-OCT.md)
- Joins: no cuts/waves. Light sections blend softly (like Hero -> Who we are). Solid espresso (Signature, Why Choose Us, Footer) never blends: clean edge. Cream above Why Choose Us, pale lime #EEF4DD below; cream above footer.
- Partner with us = cream (not dark). Testimonials ("In their words") pale lime -> soft blend -> Team of experts cream.
- Team of experts: ROUND circle photo (placeholder circle with initials + lime ring), expertise exactly THREE lines, equal card heights. Testimonials: round client photo, same circle placeholder.
- "New addresses are close": compact (name, location, status, Register interest; details on hover/tap; designed placeholder if no photo; no blur).
- Headings: the bold serif used in "Let's Discuss Your Land Over Coffee" / "Let us show you around." everywhere via one token. Playfair italic for emotional lines, Plus Jakarta Sans body, JetBrains Mono labels.
- Floating menu: adaptive. Over light = soft espresso bar #4A3A30 + cream text + lime button; over solid espresso = latte cream #EFE6D8 + espresso text + green button. ~0.3s colour transition, same typeface, no backdrop blur, lime indicator follows active section. No dropdowns.
- Logo: original tree icon + SPACE MAKER wordmark back in menu/footer; soft watermarks (footer, Who we are, Partner, Contact). Owner has `space_maker_5.psd` + 4 PNGs (full lockup dark, wordmark+tagline dark, white+lime versions). No SVG exists: extract from PSD or trace PNGs; show owner before placing.
- Brand: espresso #2A1F1A, green #1B4332, lime #C6F00C (accent only), cream #F5F0E6 / alabaster #FAF8F5, pale lime #EEF4DD, olive #5C6E0A.

## Scripts (owner's folder) and workflow
Each script: checks branch -> backup tag -> copies a prompt to clipboard (pbcopy). Owner pastes into a NEW Claude Code session in the folder (+ -> Cmd+V -> Enter), checks with `npm run dev`, then asks for the next step.
- Done/ran: `sm-phase1.sh`, `sm-start-final.sh`. Outdated, do NOT run: `sm-phase1b.sh`, `sm-phase.sh` (phases 2-6 text was written under old rules and must be rewritten first).
- `sm-step1-font.sh` (heading font) delivered; owner may or may not have run it yet.

## Next steps (in order, small scripts, owner approves each)
0. Compare branches; owner lists which 1b features to port (Testimonials, Team, footer content, Opening soon, Partner).
1. Heading font. 2. Section joins + Partner cream. 3. Adaptive menu. 4. Logo + watermarks. 5. Opening soon compact.
Then: Testimonials + Team (circle photos), 6-step process, Contact block (footer top), hero (client-oriented, project names/features visual), /projects card grid + search/filters (facing, lake view, floor/apartment size, location, area, district), unified project detail template + photo fit + sticky back link + links to all/signature projects & interiors, interiors tiers (signature/premium/excellent), careers page (FAQ, infographic, job detail pages, apply with CV PDF/DOC max 5 MB private; bdjobs link), contact-link jerk + final smooth-scroll pass, REDESIGN-SUMMARY.md.
Forms: honeypot, validation, success message, no double-submit; until back end approved use pre-filled WhatsApp.

## Open questions for owner
- Thin lime ring around circle photos? (suggested yes)
- Which Phase 1b features to port?
- Did the owner run sm-step1-font.sh?
- Menu look not yet explicitly approved (shown as mockup); Partner = cream assumed approved.
