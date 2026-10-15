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
