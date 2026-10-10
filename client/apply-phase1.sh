#!/usr/bin/env bash
# Space Maker - Phase 1 installer
# Run from inside your `client` folder:   bash apply-phase1.sh
# What it does: (1) backs up src/, (2) installs 3 libraries, (3) writes 10 files, (4) fixes the CSS import in main.jsx.
# It does NOT delete anything and does NOT touch public/assets, projectsData.js, api/ or server/.
set -e

if [ ! -f package.json ] || [ ! -d src ]; then
  echo "ERROR: run this from inside your client folder (the one that has package.json and src)."
  exit 1
fi

STAMP=$(date +%Y%m%d-%H%M%S)
cp -R src "src_backup_$STAMP"
echo "Backup saved: src_backup_$STAMP"

echo "Installing framer-motion, lenis, lucide-react..."
npm install framer-motion lenis lucide-react

for d in styles data components/common components/layout components/home; do mkdir -p "src/$d"; done

# Keep any Tailwind directives from the old CSS file so styling does not break
TW_LINES=""
for f in src/index.css src/styles/index.css; do
  if [ -f "$f" ]; then
    TW_LINES="$TW_LINES$(grep -E '^@tailwind|^@import +.tailwindcss|^@import +"tailwindcss' "$f" || true)"$'\n'
  fi
done

echo "Writing src/styles/index.css"
{ printf '%s
' "$TW_LINES" | awk 'NF && !seen[$0]++'; cat <<'EOF_styles_index_css'
/* client/src/index.css  — REPLACE your current file with this (keep your @tailwind lines at top if you use the Vite Tailwind build) */

:root {
  --banyan: #1B4332;
  --forest: #2D6A4F;
  --volt: #C6F00C;
  --alabaster: #FAF8F5;
  --morning: #F3EFE6;
  --sage: #EDF4EC;
  --slate: #111827;
  --ink-soft: #374151;
}

html {
  background: var(--alabaster);
}
/* Lenis handles smoothing — do NOT use CSS scroll-behavior: smooth with it */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

body {
  margin: 0;
  background: var(--alabaster);
  color: var(--slate);
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ---------- Typography roles ---------- */
.f-display { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.03em; }
.f-serif   { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 400; }
.f-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }

/* ---------- Section gradient dissolves (no hard borders) ---------- */
.sec-hero  { background: linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 100%); }
.sec-about { background: linear-gradient(to bottom, #F3EFE6 0%, #EDF4EC 100%); }
.sec-portfolio { background: linear-gradient(to bottom, #EDF4EC 0%, #F6F8F5 100%); }
.sec-why   { background: linear-gradient(to bottom, #F6F8F5 0%, #EBF2EA 100%); }
.sec-testimonials { background: linear-gradient(to bottom, #EBF2EA 0%, #FAF8F5 100%); }

/* ---------- Focus + selection ---------- */
::selection { background: var(--volt); color: #000; }
:focus-visible { outline: 2px solid var(--banyan); outline-offset: 3px; border-radius: 6px; }

/* ---------- Buttons ---------- */
.btn-primary {
  display: inline-flex; align-items: center; gap: .5rem;
  background: var(--banyan); color: #fff;
  padding: .85rem 1.4rem; border-radius: .9rem;
  font-weight: 600; font-size: .875rem;
  transition: background .2s ease, transform .2s ease;
}
.btn-primary:hover { background: #14342A; }
.btn-primary .dot { width: .5rem; height: .5rem; border-radius: 999px; background: var(--volt); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: .5rem;
  border: 1.5px solid rgba(27,67,50,.35); color: var(--banyan);
  padding: .85rem 1.4rem; border-radius: .9rem;
  font-weight: 600; font-size: .875rem;
  transition: background .2s ease, border-color .2s ease;
}
.btn-ghost:hover { background: rgba(27,67,50,.06); border-color: var(--banyan); }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

/* ---------- Butterflies (transform/opacity only = GPU friendly) ---------- */
@keyframes bf-path-a {
  0%   { transform: translate3d(-10vw, 70vh, 0) rotate(8deg); }
  25%  { transform: translate3d(20vw, 45vh, 0) rotate(-6deg); }
  50%  { transform: translate3d(55vw, 62vh, 0) rotate(10deg); }
  75%  { transform: translate3d(85vw, 30vh, 0) rotate(-8deg); }
  100% { transform: translate3d(110vw, 50vh, 0) rotate(6deg); }
}
@keyframes bf-path-b {
  0%   { transform: translate3d(110vw, 25vh, 0) rotate(-8deg); }
  30%  { transform: translate3d(75vw, 55vh, 0) rotate(8deg); }
  60%  { transform: translate3d(40vw, 35vh, 0) rotate(-10deg); }
  100% { transform: translate3d(-10vw, 65vh, 0) rotate(6deg); }
}
@keyframes bf-flap {
  0%, 100% { transform: scaleX(1); }
  50%      { transform: scaleX(0.25); }
}
.bf { position: absolute; top: 0; left: 0; will-change: transform; }
.bf-wings { transform-origin: center; animation: bf-flap .45s ease-in-out infinite; will-change: transform; }
@media (prefers-reduced-motion: reduce) { .bf-layer { display: none; } }
EOF_styles_index_css
} > src/styles/index.css

echo "Writing src/data/siteContent.js"
cat > src/data/siteContent.js <<'EOF_data_siteContent_js'
// client/src/data/siteContent.js
// All words live here. Components only render them.

export const brand = {
  name: "SPACE MAKER",
  tagline: "where space defines luxury",
  phone: "+880 1916-100416",
  whatsappNumber: "8801916100416",
  email: "spacemakerbd@gmail.com",
  messengerUrl: "https://m.me/spacemakerbd",
};

// Builds a WhatsApp deep link with a prefilled message
export const waLink = (text) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { label: "Available Flats", href: "#projects" },
  { label: "Completed Homes", href: "#completed" },
  { label: "Why Buy With Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const navCta = {
  label: "Book Flat Tour",
  message: "Hello Space Maker, I would like to book a flat tour.",
};

export const heroContent = {
  headline: "Find your sanctuary",
  headlineAccent: "in Dhaka.",
  subheading:
    "Cross-ventilated, earthquake-resistant flats built for sunlight, fresh air and peace of mind, in Jolshiri, Sabujbag and the Dhanmondi edge.",
  primaryCta: { label: "Explore Available Flats", href: "#projects" },
  secondaryCta: {
    label: "Schedule a Site Visit",
    message: "Hello Space Maker, I would like to schedule a site visit.",
  },
  filtersLabel: "Browse by area",
  filters: [
    { label: "Jolshiri Abashon", note: "3 & 4 bed", message: "Hello Space Maker, I am looking for a 3 or 4 bed flat in Jolshiri Abashon." },
    { label: "Sabujbag", note: "Luxury suites", message: "Hello Space Maker, I am interested in luxury suites at Sabujbag." },
    { label: "Dhanmondi edge", note: "Rayer Bazar", message: "Hello Space Maker, I am interested in a flat near Dhanmondi / Rayer Bazar." },
  ],
  featured: {
    image: "/assets/01_hero/hero-1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    title: "FORM & SPACE",
    place: "Sector 13, Jolshiri Abashon",
    spec: "G+M+8 residential building · Architect Hasib Uddin Ahmed",
    message: "Hello Space Maker, I would like details and availability for FORM & SPACE, Jolshiri.",
  },
};

export const aboutContent = {
  title: "Engineers and architects who build homes the way they would build their own.",
  paragraphs: [
    "Space Maker Limited is a Dhaka real estate developer. Our team of civil engineers, architects and project managers takes each building from concept to key handover.",
    "We design for daylight and cross-ventilation first, then back it with tested materials, deep piling and structure that is engineered for earthquakes.",
  ],
  quote: "Every great development begins with trust, transparency and disciplined execution.",
  pillars: [
    { title: "Structural safety", text: "Earthquake-resistant piling and lab-tested concrete and rebar." },
    { title: "Light and air", text: "Layouts planned around sunlight and natural cross-ventilation." },
    { title: "Clear legal footing", text: "Documented approvals and transparent agreements before you commit." },
    { title: "On-time handover", text: "Milestone tracking from foundation to finishing." },
  ],
};
EOF_data_siteContent_js

echo "Writing src/components/layout/BanyanMark.jsx"
cat > src/components/layout/BanyanMark.jsx <<'EOF_components_layout_BanyanMark_jsx'
import React from 'react';

/**
 * Inline Banyan Tree emblem. Pure SVG — always renders, no asset path needed.
 * Uses currentColor so it can be tinted by the parent (navbar mark or giant watermark).
 */
export default function BanyanMark({ className = '', title = 'Space Maker banyan tree' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Canopy */}
      <path
        d="M14 54c-4-14 6-26 19-24 4-12 20-18 32-10 10-6 26 0 28 14 12 2 18 16 11 26-4 6-12 8-18 6-6 6-16 6-22 2-6 4-16 4-22-1-8 4-22 0-28-13z"
        fill="currentColor"
        fillOpacity="0.14"
        strokeWidth="2.5"
      />
      {/* Trunk */}
      <path d="M54 62c1 14-2 26-8 40M66 62c-1 14 2 26 8 40M54 62c3 10 9 10 12 0" strokeWidth="3" />
      {/* Aerial roots */}
      <path d="M32 58v26M42 62v30M78 62v30M88 58v26" strokeWidth="2" />
      {/* Ground roots */}
      <path d="M46 102c-8 4-18 4-28 4M74 102c8 4 18 4 28 4M60 104v8" strokeWidth="2.5" />
    </svg>
  );
}
EOF_components_layout_BanyanMark_jsx

echo "Writing src/components/layout/Navbar.jsx"
cat > src/components/layout/Navbar.jsx <<'EOF_components_layout_Navbar_jsx'
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BanyanMark from './BanyanMark';
import { brand, navLinks, navCta, waLink } from '../../data/siteContent';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 pt-3">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#FAF8F5]/90 backdrop-blur-md shadow-[0_6px_30px_-12px_rgba(27,67,50,0.35)] border border-[#1B4332]/10'
            : 'py-4 bg-transparent'
        }`}
        aria-label="Primary"
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3" aria-label="Space Maker home">
          <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#1B4332] text-[#C6F00C] shrink-0">
            <BanyanMark className="w-9 h-9" />
          </span>
          <span className="leading-none">
            <span className="f-display block text-xl font-bold text-[#1B4332] tracking-wide">
              SPACE MAKER
            </span>
            <span className="block text-[11px] text-[#1B4332]/70 mt-1">{brand.tagline}</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#374151]">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-[#1B4332] transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waLink(navCta.message)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !py-2.5 !px-4 hidden sm:inline-flex"
          >
            <span className="dot" />
            {navCta.label}
          </a>
          <button
            className="lg:hidden p-2 rounded-lg text-[#1B4332] hover:bg-[#1B4332]/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 rounded-2xl bg-[#FAF8F5] border border-[#1B4332]/10 shadow-xl p-5">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-[#111827] border-b border-[#1B4332]/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={waLink(navCta.message)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary w-full justify-center mt-4"
          >
            <span className="dot" />
            {navCta.label}
          </a>
        </div>
      )}
    </header>
  );
}
EOF_components_layout_Navbar_jsx

echo "Writing src/components/layout/FloatingDock.jsx"
cat > src/components/layout/FloatingDock.jsx <<'EOF_components_layout_FloatingDock_jsx'
import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { brand, waLink } from '../../data/siteContent';

export default function FloatingDock() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#1B4332]/10 p-2 shadow-xl">
      <a
        href={brand.messengerUrl}
        target="_blank"
        rel="noreferrer"
        title="Message on Facebook"
        aria-label="Message on Facebook Messenger"
        className="w-11 h-11 rounded-xl bg-[#0866FF] hover:bg-[#0654d6] text-white grid place-items-center transition"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href={waLink('Hello Space Maker, I would like to discuss a flat purchase.')}
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#1fb857] text-white grid place-items-center transition"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
EOF_components_layout_FloatingDock_jsx

echo "Writing src/components/common/BackgroundLayers.jsx"
cat > src/components/common/BackgroundLayers.jsx <<'EOF_components_common_BackgroundLayers_jsx'
import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import BanyanMark from '../layout/BanyanMark';

/**
 * Fixed, non-interactive background:
 *  - blueprint dot grid drifting at ~0.15x scroll rate
 *  - oversized banyan watermark drifting slower, at 5% opacity
 * Sits behind all sections (z-0). Sections must be `relative z-10`.
 */
export default function BackgroundLayers() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Pixel-based drift so it feels the same on every page length
  const gridY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.15));
  const markY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.08));
  const markRotate = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : 4]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Blueprint dot grid (extra height so drift never exposes an edge) */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        className="absolute -top-[40%] inset-x-0 h-[180%] opacity-[0.045]"
      />

      {/* Banyan watermark */}
      <motion.div
        style={{ y: markY, rotate: markRotate }}
        className="absolute -right-[12%] top-[8%] w-[70vmin] h-[70vmin] text-[#1B4332] opacity-[0.05]"
      >
        <BanyanMark className="w-full h-full" title="" />
      </motion.div>
    </div>
  );
}
EOF_components_common_BackgroundLayers_jsx

echo "Writing src/components/common/Butterflies.jsx"
cat > src/components/common/Butterflies.jsx <<'EOF_components_common_Butterflies_jsx'
import React from 'react';

/**
 * Three small butterflies drifting across the viewport.
 * - Only `transform` is animated (CSS keyframes in styles/index.css), so it runs on the GPU
 *   and never triggers layout or React re-renders.
 * - Fixed + pointer-events-none: never blocks scrolling or clicks.
 * - Hidden for prefers-reduced-motion users.
 */
const FLIES = [
  { id: 'a', path: 'bf-path-a', duration: 38, delay: 2,  size: 30, wing: '#C6F00C', body: '#1B4332' },
  { id: 'b', path: 'bf-path-b', duration: 46, delay: 10, size: 24, wing: '#F59E0B', body: '#1B4332' },
  { id: 'c', path: 'bf-path-a', duration: 54, delay: 24, size: 20, wing: '#60A5FA', body: '#111827' },
];

function Butterfly({ size, wing, body }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <g className="bf-wings">
        <path d="M20 19C14 6 3 6 4 15c1 6 8 8 16 4z" fill={wing} fillOpacity="0.9" />
        <path d="M20 21c-8-3-14 0-12 7 2 6 10 4 12-7z" fill={wing} fillOpacity="0.7" />
        <path d="M20 19C26 6 37 6 36 15c-1 6-8 8-16 4z" fill={wing} fillOpacity="0.9" />
        <path d="M20 21c8-3 14 0 12 7-2 6-10 4-12-7z" fill={wing} fillOpacity="0.7" />
      </g>
      <rect x="19" y="12" width="2" height="18" rx="1" fill={body} />
    </svg>
  );
}

export default function Butterflies() {
  return (
    <div aria-hidden="true" className="bf-layer fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {FLIES.map((f) => (
        <div
          key={f.id + f.delay}
          className="bf"
          style={{
            animation: `${f.path} ${f.duration}s linear ${f.delay}s infinite`,
            opacity: 0.85,
          }}
        >
          <Butterfly size={f.size} wing={f.wing} body={f.body} />
        </div>
      ))}
    </div>
  );
}
EOF_components_common_Butterflies_jsx

echo "Writing src/components/home/HeroStage.jsx"
cat > src/components/home/HeroStage.jsx <<'EOF_components_home_HeroStage_jsx'
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { heroContent as c, waLink } from '../../data/siteContent';

export default function HeroStage() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Foreground drifts faster than text; image scales slowly inside its frame
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);

  return (
    <section
      id="top"
      ref={ref}
      className="sec-hero relative z-10 min-h-[100svh] pt-32 sm:pt-36 pb-20 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Copy */}
        <motion.div style={{ y: textY }} className="lg:col-span-6">
          <h1 className="f-display text-[2.6rem] sm:text-6xl xl:text-7xl font-bold leading-[1.02] text-[#111827]">
            {c.headline}
            <br />
            <span className="f-serif font-normal text-[#1B4332]">{c.headlineAccent}</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#374151] max-w-xl">{c.subheading}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={c.primaryCta.href} className="btn-primary">
              <span className="dot" />
              {c.primaryCta.label}
            </a>
            <a
              href={waLink(c.secondaryCta.message)}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <MessageCircle className="w-4 h-4" />
              {c.secondaryCta.label}
            </a>
          </div>

          {/* Quick area filters */}
          <div className="mt-10">
            <p className="text-sm text-[#374151]/80 mb-3">{c.filtersLabel}</p>
            <div className="flex flex-wrap gap-2.5">
              {c.filters.map((f) => (
                <a
                  key={f.label}
                  href={waLink(f.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-full border border-[#1B4332]/25 bg-white/60 backdrop-blur px-4 py-2 text-sm text-[#111827] hover:border-[#1B4332] hover:bg-white transition"
                >
                  <span className="font-semibold">{f.label}</span>
                  <span className="text-[#374151]/70"> · {f.note}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured render */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(27,67,50,0.55)] bg-[#E2ECE0]">
            <motion.img
              src={c.featured.image}
              alt={`${c.featured.title} residential building render`}
              style={{ scale: imgScale, y: imgY }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = c.featured.fallback;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F17]/85 via-[#0B1F17]/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
              <p className="text-sm text-[#C6F00C] font-semibold">Now under construction</p>
              <h2 className="f-display text-3xl sm:text-4xl font-bold mt-1">{c.featured.title}</h2>
              <p className="f-mono text-xs text-white/80 mt-2">{c.featured.place}</p>
              <p className="text-sm text-white/75 mt-1">{c.featured.spec}</p>
              <a
                href={waLink(c.featured.message)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1fb857] text-white text-sm font-semibold px-4 py-2.5 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Ask about availability
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 text-sm text-[#1B4332]/70 hover:text-[#1B4332]"
      >
        <ArrowDown className="w-4 h-4" /> Our story
      </a>
    </section>
  );
}
EOF_components_home_HeroStage_jsx

echo "Writing src/components/home/WhoWeAre.jsx"
cat > src/components/home/WhoWeAre.jsx <<'EOF_components_home_WhoWeAre_jsx'
import React from 'react';
import { aboutContent as c } from '../../data/siteContent';

export default function WhoWeAre() {
  return (
    <section id="about" className="sec-about relative z-10 py-24 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Story */}
        <div className="lg:col-span-6">
          <h2 className="f-display text-3xl sm:text-5xl font-bold leading-[1.08] text-[#111827]">
            {c.title}
          </h2>
          <div className="mt-8 space-y-5 max-w-xl text-[#374151] text-base sm:text-lg leading-relaxed">
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-12 pl-6 border-l-4 border-[#C6F00C]">
            <p className="f-serif text-2xl sm:text-3xl leading-snug text-[#1B4332]">
              “{c.quote}”
            </p>
          </blockquote>
        </div>

        {/* Pillars: a plain ruled list, not a card grid */}
        <ul className="lg:col-span-6 lg:pt-4 divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15 self-start">
          {c.pillars.map((p) => (
            <li key={p.title} className="py-6 grid sm:grid-cols-5 gap-2 sm:gap-6">
              <h3 className="f-display sm:col-span-2 text-xl font-semibold text-[#1B4332]">
                {p.title}
              </h3>
              <p className="sm:col-span-3 text-[#374151] leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
EOF_components_home_WhoWeAre_jsx

echo "Writing src/App.jsx"
cat > src/App.jsx <<'EOF_App_jsx'
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import FloatingDock from './components/layout/FloatingDock';
import BackgroundLayers from './components/common/BackgroundLayers';
import Butterflies from './components/common/Butterflies';
import HeroStage from './components/home/HeroStage';
import WhoWeAre from './components/home/WhoWeAre';

export default function App() {
  // Inertia scroll (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#111827]">
      <BackgroundLayers />
      <Butterflies />
      <Navbar />

      <main>
        <HeroStage />
        <WhoWeAre />

        {/* Phase 2: PortfolioGrid (#projects, #completed), WhyChooseUs (#why), Testimonials */}
        {/* Phase 3: DevelopmentProcess, LandownerParlor, Contact (#contact), Footer */}
        <section id="projects" className="relative z-10 py-24 px-6 text-center text-[#374151]">
          Portfolio arrives in Phase 2.
        </section>
        <section id="why" className="relative z-10 py-24 px-6 text-center text-[#374151]">
          Why Choose Us arrives in Phase 2.
        </section>
        <section id="contact" className="relative z-10 pb-24 px-6 text-center text-[#374151]">
          Contact arrives in Phase 3.
        </section>
      </main>

      <FloatingDock />
    </div>
  );
}
EOF_App_jsx

# Point main.jsx at the new CSS location if it still uses the old one
if [ -f src/main.jsx ] && grep -q "'./index.css'" src/main.jsx; then
  sed -i '' "s#'./index.css'#'./styles/index.css'#" src/main.jsx
  echo "Updated src/main.jsx to import ./styles/index.css"
fi

if [ -f src/App.tsx ]; then
  echo "NOTE: you also have src/App.tsx. Delete or rename it so only App.jsx is used."
fi

echo ""
echo "Done. Start the site with:  npm run dev"
echo "If anything looks wrong, restore with:  rm -rf src && mv src_backup_$STAMP src"