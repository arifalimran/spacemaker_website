# Space Maker Codebase Ingestion Snapshot
> Consolidated single-file codebase snapshot for AI analysis.

## File: project_tree.txt
```text
.
├── client
│   ├── README.md
│   ├── apply-phase1.sh
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   └── assets
│   │       ├── 00_brand
│   │       ├── 01_hero
│   │       ├── 02_why_choose_us
│   │       ├── 03_developments
│   │       │   ├── architectural
│   │       │   │   ├── dg-niport-bhaban
│   │       │   │   │   ├── blueprint
│   │       │   │   │   ├── facade
│   │       │   │   │   ├── hero
│   │       │   │   │   └── siteplan
│   │       │   │   └── hotel-chittagong
│   │       │   │       ├── blueprint
│   │       │   │       ├── exterior
│   │       │   │       └── hero
│   │       │   ├── flagships
│   │       │   │   ├── form-and-space-flagship
│   │       │   │   │   ├── gallery
│   │       │   │   │   ├── hero
│   │       │   │   │   └── masterplan
│   │       │   │   └── moon-residence
│   │       │   │       ├── blueprint
│   │       │   │       ├── commercial-atrium
│   │       │   │       ├── delivered-facade
│   │       │   │       └── hero
│   │       │   └── ongoing
│   │       │       ├── form-and-space
│   │       │       │   ├── architectural
│   │       │       │   ├── blueprint
│   │       │       │   ├── hero
│   │       │       │   └── progress
│   │       │       ├── marchent-mahua
│   │       │       │   ├── architectural
│   │       │       │   ├── blueprint
│   │       │       │   ├── hero
│   │       │       │   └── progress
│   │       │       ├── platinum-kusumbag
│   │       │       │   ├── architectural
│   │       │       │   ├── blueprint
│   │       │       │   ├── hero
│   │       │       │   └── progress
│   │       │       └── rayer-bazar
│   │       │           ├── architectural
│   │       │           ├── blueprint
│   │       │           ├── hero
│   │       │           └── progress
│   │       ├── 04_interiors
│   │       │   ├── bosilla-residence
│   │       │   ├── cielo-rooftop
│   │       │   │   ├── lounge
│   │       │   │   └── spiral-stairs
│   │       │   ├── mirpur-residence
│   │       │   ├── moulvibazar-villa
│   │       │   │   ├── dining-breakfast-bar
│   │       │   │   ├── executive-master
│   │       │   │   ├── grand-living-lounge
│   │       │   │   ├── media-reception
│   │       │   │   ├── modern-kitchen
│   │       │   │   └── spa-ensuite
│   │       │   ├── rangs-corporate
│   │       │   │   ├── boardroom
│   │       │   │   └── executive-lounge
│   │       │   ├── rupayan-uttara
│   │       │   └── sirajgonj-residence
│   │       ├── 05_partner_with_us
│   │       └── people
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── common
│   │   │   │   ├── BackgroundLayers.jsx
│   │   │   │   └── Butterflies.jsx
│   │   │   ├── home
│   │   │   │   ├── Careers.jsx
│   │   │   │   ├── HeroStage.jsx
│   │   │   │   ├── LandownerSection.jsx
│   │   │   │   ├── WhoWeAre.jsx
│   │   │   │   └── WhyChooseUs.jsx
│   │   │   ├── layout
│   │   │   │   ├── BanyanMark.jsx
│   │   │   │   ├── ButterflyLayer.jsx
│   │   │   │   ├── FloatingDock.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── SiteFooter.jsx
│   │   │   │   └── SiteNav.jsx
│   │   │   └── portfolio
│   │   │       ├── AllProjects.jsx
│   │   │       ├── InteriorPage.jsx
│   │   │       ├── InteriorsIndex.jsx
│   │   │       ├── Lightbox.jsx
│   │   │       ├── PortfolioSection.jsx
│   │   │       ├── ProjectPage.jsx
│   │   │       └── shared.jsx
│   │   ├── data
│   │   │   ├── portfolio.js
│   │   │   ├── projectsData.js
│   │   │   └── siteContent.js
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── leads.js
│   │   │   └── scroll.js
│   │   ├── main.jsx
│   │   └── styles
│   │       ├── index.css
│   │       └── sm-effects.css
│   ├── src_backup_20261009-123526
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── common
│   │   │   │   └── Butterflies.jsx
│   │   │   ├── home
│   │   │   │   ├── Careers.jsx
│   │   │   │   ├── HeroStage.jsx
│   │   │   │   ├── LandownerParlor.jsx
│   │   │   │   ├── WhoWeAre.jsx
│   │   │   │   └── WhyChooseUs.jsx
│   │   │   ├── layout
│   │   │   │   ├── FloatingDock.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   └── portfolio
│   │   │       ├── PortfolioGrid.jsx
│   │   │       ├── modal
│   │   │       │   └── ProjectDetailModal.jsx
│   │   │       ├── segments
│   │   │       │   ├── architectural
│   │   │       │   ├── flagships
│   │   │       │   ├── interiors
│   │   │       │   └── ongoing
│   │   │       └── shared
│   │   ├── data
│   │   │   ├── projectsData.js
│   │   │   └── siteContent.js
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
├── project_tree.txt
└── server
    ├── package.json
    └── src
        ├── config
        ├── controllers
        ├── index.js
        └── routes

97 directories, 57 files
```

---

## File: `client/.oxlintrc.json`
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

---

## File: `client/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Space Maker Limited | Real Estate Developer Dhaka</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400;1,600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              banyanGreen: "#1B4332",
              banyanLight: "#2D6A4F",
              banyanGold: "#C5A880",
              limeAccent: "#C6F00C",
              slateDark: "#111827",
              canvasSand: "#FAF8F5"
            },
            fontFamily: {
              sans: ["\"Plus Jakarta Sans\"", "sans-serif"],
              serif: ["\"Playfair Display\"", "serif"],
              mono: ["\"JetBrains Mono\"", "monospace"]
            }
          }
        }
      }
    </script>
    <style>
      html { scroll-behavior: smooth; }
      @keyframes flutterWings {
        0%, 100% { transform: scaleX(1) rotate(0deg); }
        50% { transform: scaleX(0.25) rotate(6deg); }
      }
      @keyframes floatPathOne {
        0% { transform: translate3d(-10vw, 15vh, 0); opacity: 0; }
        15% { opacity: 0.95; }
        50% { transform: translate3d(45vw, 5vh, 0); }
        85% { opacity: 0.95; }
        100% { transform: translate3d(105vw, 25vh, 0); opacity: 0; }
      }
      @keyframes floatPathTwo {
        0% { transform: translate3d(105vw, 65vh, 0); opacity: 0; }
        15% { opacity: 0.9; }
        50% { transform: translate3d(55vw, 75vh, 0); }
        85% { opacity: 0.9; }
        100% { transform: translate3d(-10vw, 60vh, 0); opacity: 0; }
      }
      .butterfly-gpu-1 {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 35;
        animation: floatPathOne 28s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        will-change: transform, opacity;
      }
      .butterfly-gpu-2 {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 35;
        animation: floatPathTwo 34s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        animation-delay: 14s;
        will-change: transform, opacity;
      }
      .wings-flutter {
        animation: flutterWings 0.32s ease-in-out infinite;
        transform-origin: center;
        will-change: transform;
      }
    </style>
  </head>
  <body class="bg-[#FAF8F5] text-[#111827] antialiased selection:bg-[#C6F00C] selection:text-black">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## File: `client/package.json`
```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.20.0",
    "framer-motion": "^14.1.0",
    "lenis": "^1.3.26",
    "lucide-react": "^1.54.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.4"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "^10.6.1",
    "oxlint": "^1.81.0",
    "postcss": "^8.5.29",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.0"
  }
}
```

---

## File: `client/vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## File: `client/src/App.css`
```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

---

## File: `client/src/App.jsx`
```javascript
// client/src/App.jsx
// Routes: /  (home), /projects, /projects/:slug, /interiors, /interiors/:slug, /careers
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import './styles/sm-effects.css';

import SiteNav from './components/layout/SiteNav';
import SiteFooter from './components/layout/SiteFooter';
import ButterflyLayer from './components/layout/ButterflyLayer';
import HeroStage from './components/home/HeroStage';
import WhoWeAre from './components/home/WhoWeAre';
import WhyChooseUs from './components/home/WhyChooseUs';
import LandownerSection from './components/home/LandownerSection';
import Careers from './components/home/Careers';
import PortfolioSection from './components/portfolio/PortfolioSection';
import ProjectPage from './components/portfolio/ProjectPage';
import AllProjects from './components/portfolio/AllProjects';
import InteriorsIndex from './components/portfolio/InteriorsIndex';
import InteriorPage from './components/portfolio/InteriorPage';
import { CONTACT } from './data/portfolio';
import { scrollToEl, scrollTop } from './lib/scroll';

/* smooth inertia scroll, shared through window.__lenis */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    document.documentElement.style.scrollBehavior = 'auto';
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

/* scroll to #section after a route change, or to the top on a new page */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const t = setTimeout(() => {
      if (hash && scrollToEl(hash, -90)) return;
      scrollTop();
    }, 80);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function Dock() {
  const base = 'flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition';
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-2xl border border-neutral-200/90 bg-white/90 p-2 shadow-xl backdrop-blur-md">
      <a href={CONTACT.messenger} target="_blank" rel="noreferrer" title="Message on Facebook" className={`${base} bg-blue-600 hover:bg-blue-700`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5A8.5 8.5 0 1 1 21 11.5Z" /></svg>
      </a>
      <a
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hello Space Maker, I would like to know more about your projects.')}`}
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        className={`${base} bg-[#25D366] hover:bg-emerald-600`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
      </a>
    </div>
  );
}

function Home() {
  return (
    <main>
      <HeroStage />
      <WhoWeAre />
      <PortfolioSection />
      <div id="why-us">
        <WhyChooseUs />
      </div>
      <LandownerSection />
    </main>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-['Space_Grotesk'] text-4xl font-extrabold text-[#111827]">Page not found.</h1>
      <Link to="/" className="mt-6 text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-8">
        Back to home →
      </Link>
    </main>
  );
}

function Shell() {
  useSmoothScroll();
  const { pathname } = useLocation();
  const detail = pathname.startsWith('/projects/') || pathname.startsWith('/interiors/');
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAF8F5] font-sans text-[#111827] selection:bg-[#C6F00C] selection:text-black">
      <ScrollManager />
      <SiteNav />
      <ButterflyLayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/interiors" element={<InteriorsIndex />} />
        <Route path="/interiors/:slug" element={<InteriorPage />} />
        <Route path="/careers" element={<main className="pt-24"><Careers /></main>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
      {!detail && <Dock />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
```

---

## File: `client/src/index.css`
```css
@layer base {
  html {
    scroll-behavior: smooth;
    background-color: #F7F8F5;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #F7F8F5;
    color: #121316;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
}
/* Paste at the bottom of client/src/index.css
   Brand lime (#C6F00C) as a thread through the whole site. */

/* 1. Text selection + keyboard focus */
::selection { background: #C6F00C; color: #111827; }
:focus-visible { outline: 2px solid #C6F00C; outline-offset: 3px; border-radius: 6px; }

/* 2. Thin lime scrollbar */
html { scrollbar-color: #C6F00C #EDF4EC; scrollbar-width: thin; }

/* 3. Reusable helpers. Use these class names in any section */

/* small lime dash before a section label:  <span class="lime-eyebrow">Portfolio</span> */
.lime-eyebrow {
  display: inline-flex; align-items: center; gap: .6rem;
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  letter-spacing: .22em; text-transform: uppercase; color: #1B4332;
}
.lime-eyebrow::before { content: ''; width: 2rem; height: 2px; background: #C6F00C; }

/* marker highlight under a key word:  <span class="lime-mark">own.</span> */
.lime-mark {
  background: linear-gradient(transparent 62%, rgba(198, 240, 12, .7) 62%);
}

/* lime underline that grows on hover (links, nav items) */
.lime-link { position: relative; }
.lime-link::after {
  content: ''; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0;
  background: #C6F00C; transition: width .35s ease;
}
.lime-link:hover::after { width: 100%; }

/* lime hairline divider between blocks:  <div class="lime-rule"></div> */
.lime-rule {
  height: 1px; border: 0;
  background: linear-gradient(to right, #C6F00C, rgba(198, 240, 12, 0) 70%);
}

/* soft lime glow for cards on hover */
.lime-card { transition: box-shadow .35s ease, border-color .35s ease, transform .35s ease; }
.lime-card:hover {
  border-color: rgba(198, 240, 12, .8);
  box-shadow: 0 18px 40px -22px rgba(27, 67, 50, .5), 0 0 0 1px rgba(198, 240, 12, .55);
  transform: translateY(-3px);
}
```

---

## File: `client/src/main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## File: `client/src/styles/index.css`
```css
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
```

---

## File: `client/src/styles/sm-effects.css`
```css
/* client/src/styles/sm-effects.css
   Image treatments and the expanding project panels. Imported once in App.jsx. */

/* Blurred reveal: soft and out of focus until you hover */
.sm-blur img {
  filter: blur(14px) saturate(0.7);
  transition: filter 0.9s ease;
}
.sm-blur:hover img,
.sm-blur:focus-within img,
.sm-blur.is-on img,
.group:hover .sm-blur img {
  filter: blur(0) saturate(1);
}

/* Duotone: filtered in the dark tone, colour returns on hover */
.sm-duo {
  isolation: isolate;
}
.sm-duo img {
  filter: grayscale(1) contrast(1.05) brightness(0.92);
  transition: filter 0.9s ease;
}
.sm-duo::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: var(--duo, #2a1f1a);
  mix-blend-mode: color;
  opacity: 0.6;
  transition: opacity 0.9s ease;
}
.sm-duo:hover img,
.sm-duo.is-on img,
.group:hover .sm-duo img {
  filter: none;
}
.sm-duo:hover::after,
.sm-duo.is-on::after,
.group:hover .sm-duo::after {
  opacity: 0;
}

/* Touch screens have no hover: show the photos clearly */
@media (hover: none) {
  .sm-blur img {
    filter: none;
  }
  .sm-duo img {
    filter: none;
  }
  .sm-duo::after {
    opacity: 0;
  }
}

/* Expanding project panels (desktop only) */
@media (min-width: 768px) {
  .sm-acc {
    flex: var(--f, 1 1 0%);
    min-width: 0;
    transition: flex 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
}
```

---

## File: `client/src/components/home/Careers.jsx`
```javascript
import React, { useState } from "react";
import { ArrowUpRight, MessageCircle, ChevronDown } from "lucide-react";

export default function Careers() {
  const [openFaq, setOpenFaq] = useState(null);

  const perks = [
    { title: "Guaranteed On-Time Pay", desc: "No delayed wages. Salaries and festival bonuses are deposited on schedule every single month." },
    { title: "Hands-On Field Training", desc: "Direct mentorship under veteran BUET structural leads and principal architects in rebar testing and piling." },
    { title: "Dignified Site Culture", desc: "A positive work environment with zero workplace abuse, reasonable hours, and full safety gear (PPE) on day one." },
    { title: "Transport & Site Lunch", desc: "Daily lunch allowances and transport logistics support for engineers posted at our Jolshiri Abashon sites." }
  ];

  const jobs = [
    { title: "Senior Structural Project Engineer", loc: "Jolshiri Abashon (Sectors 13 & 16)", exp: "4–7 Years", type: "Full-Time" },
    { title: "Site Supervisor / Civil Foreman", loc: "Dhaka & Jolshiri Projects", exp: "3+ Years", type: "Full-Time" },
    { title: "Junior Architectural Visualizer", loc: "Corporate Studio (Mohakhali DOHS)", exp: "1–3 Years", type: "Full-Time" }
  ];

  const faqs = [
    { q: "Will my salary be delayed like conventional developers in Dhaka?", a: "No. Space Maker follows strict corporate discipline. All employee salaries and site allowances are disbursed promptly on schedule every month without exception." },
    { q: "Do I need decades of experience to join?", a: "We prioritize dedication, character, and proactive problem solving over long resumes. If you are eager to learn and take personal pride in clean civil work, we will invest in your training." },
    { q: "Is transport provided for site postings in Jolshiri Abashon?", a: "Yes. Our site engineers and supervisors receive transit allowances and logistical support for commutes to our Jalshiri operations hub." },
    { q: "How fast will I hear back after applying?", a: "Our engineering and HR desk reviews submissions weekly. Shortlisted candidates are invited for an interview and tea at our Mohakhali DOHS office within 5 to 7 business days." }
  ];

  return (
    <section id="careers" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#EBF3E8] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2D6A4F] mb-2 block">
            Careers & Culture
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
            Build Homes. Shape Your Career.
          </h2>
          <p className="text-sm md:text-base text-neutral-600 mt-3">
            We are looking for dedicated engineers, initiators, and team players who take pride in disciplined construction.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-center text-xs uppercase font-extrabold tracking-wider text-neutral-500 mb-8">What We Provide For Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-300/70 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#C6F00C] flex items-center justify-center font-bold text-xs mb-4">
                    0{idx+1}
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-base mb-2">{perk.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-white p-8 md:p-10 rounded-3xl border border-neutral-300/70 shadow-sm">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-6">Current Open Positions</h3>
          <div className="divide-y divide-neutral-200">
            {jobs.map((job, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-neutral-900">{job.title}</h4>
                  <div className="text-xs text-neutral-500 mt-1 flex flex-wrap gap-3">
                    <span>📍 {job.loc}</span>
                    <span>⏳ Experience: {job.exp}</span>
                    <span>💼 {job.type}</span>
                  </div>
                </div>
                <a 
                  href="mailto:spacemakerbd@gmail.com?subject=Job%20Application"
                  className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6F00C]" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-center text-2xl font-extrabold text-neutral-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-neutral-300/70 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-extrabold text-xs sm:text-sm text-neutral-900"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-[#1B4332] p-8 md:p-10 rounded-3xl text-white shadow-xl">
          <h4 className="text-xl md:text-2xl font-extrabold mb-2">Want to Join Space Maker?</h4>
          <p className="text-xs md:text-sm text-neutral-200 mb-6 max-w-xl mx-auto">
            You do not need a complex form. Send your resume directly to our HR desk via email or WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="mailto:spacemakerbd@gmail.com?subject=Resume%20Submission"
              className="px-6 py-3 bg-white text-neutral-900 rounded-xl text-xs font-bold hover:bg-neutral-100 transition"
            >
              Email: spacemakerbd@gmail.com
            </a>
            <a 
              href="https://wa.me/8801916100416?text=Hello%20Space%20Maker%20HR,%20I%20would%20like%20to%20submit%20my%20CV."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send CV via WhatsApp (01916-100416)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## File: `client/src/components/home/HeroStage.jsx`
```javascript
// client/src/components/home/HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/* ---------- Logo paths (your uploaded files) ----------
   Tip: rename to logo-text.png / logo-icon.png and folder 00_brand to avoid
   spaces in URLs. Until then the encoded versions below work. */
const LOGO_ICON = '/assets/00_brand/emblem-watermark.svg';

const CANVAS = '#FAF8F5';

/* ---------- Demo slides: swap for /assets/01_hero/hero-1.jpg etc. ---------- */
const slides = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
    title: 'FORM & SPACE',
    place: 'Jolshiri Abashon',
  },
  {
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80',
    title: 'Platinum Kusumbag',
    place: 'Sabujbag',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80',
    title: 'Moon Residence',
    place: 'Dinajpur Central',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80',
    title: 'Marchent Mahua',
    place: 'Jolshiri, Sector 16',
  },
];

const AUTOPLAY_MS = 5500;

/* ---------- Quiet information row (replaces the two big CTA buttons) ---------- */
const residences = [
  { area: 'Jolshiri Abashon', note: '3 & 4 bed residences' },
  { area: 'Sabujbag', note: 'Luxury suites' },
  { area: 'Dhanmondi Edge', note: 'Boutique address' },
];
const WHATSAPP =
  'https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20arrange%20a%20private%20visit.';

/* ---------- Butterfly ---------- */
function Butterfly({ size = 46, hue = '#C6F00C', delay = 0, duration = 34, reverse = false, topStart = 55 }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const xs = reverse
    ? ['110vw', '78vw', '50vw', '22vw', '-12vw']
    : ['-12vw', '22vw', '50vw', '78vw', '110vw'];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-30"
      style={{ top: `${topStart}%`, left: 0, width: size, height: size }}
      initial={{ x: xs[0], y: 0, rotate: 0 }}
      animate={{
        x: xs,
        y: [0, -90, 30, -70, -20],
        rotate: reverse ? [-18, 12, -10, 16, -8] : [18, -12, 10, -16, 8],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {/* gentle bob */}
      <motion.div
        animate={{ y: [0, -8, 0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: reverse ? 'scaleX(-1)' : undefined }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
          {/* left wing */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
            animate={{ scaleX: [1, 0.2, 1] }}
            transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50 48 C30 10, 4 14, 8 40 C10 58, 34 62, 50 52 Z" fill={hue} opacity="0.9" />
            <path d="M50 54 C32 58, 14 74, 26 86 C38 94, 48 72, 50 58 Z" fill={hue} opacity="0.7" />
            <circle cx="24" cy="36" r="4" fill="#1B4332" opacity="0.55" />
          </motion.g>
          {/* right wing */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            animate={{ scaleX: [1, 0.2, 1] }}
            transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50 48 C70 10, 96 14, 92 40 C90 58, 66 62, 50 52 Z" fill={hue} opacity="0.9" />
            <path d="M50 54 C68 58, 86 74, 74 86 C62 94, 52 72, 50 58 Z" fill={hue} opacity="0.7" />
            <circle cx="76" cy="36" r="4" fill="#1B4332" opacity="0.55" />
          </motion.g>
          {/* body + antennae */}
          <rect x="48.5" y="40" width="3" height="26" rx="1.5" fill="#111827" />
          <path d="M50 40 C46 30, 42 28, 40 26 M50 40 C54 30, 58 28, 60 26" stroke="#111827" strokeWidth="1.2" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function HeroStage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);

  /* auto transition — stops while the mouse is over the image */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused]);

  /* parallax: watermark drifts slower than the page */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const wmY1 = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const wmY2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const slide = slides[index];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100vh]"
      style={{
        background: `linear-gradient(to bottom, ${CANVAS} 0%, #F6F2EA 70%, #F3EFE6 100%)`,
      }}
    >
      {/* ---------- Parallax logo watermarks, sitting in the empty spaces ---------- */}
      <motion.img
        src={LOGO_ICON}
        alt=""
        aria-hidden
        style={{ y: wmY1 }}
        className="pointer-events-none select-none absolute z-0 left-[-6%] bottom-[-4%] w-[420px] md:w-[560px] opacity-[0.07]"
      />
      <motion.img
        src={LOGO_ICON}
        alt=""
        aria-hidden
        style={{ y: wmY2 }}
        className="pointer-events-none select-none absolute z-0 right-[4%] top-[10%] w-[200px] md:w-[260px] opacity-[0.05] rotate-6"
      />
      {/* faint blueprint dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ---------- Blended image stage ---------- */}
      <motion.div
        style={{
          y: imgY,
          /* feathered edges: image dissolves into the background on every side */
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 72% at 62% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 78% 72% at 62% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)',
        }}
        className="absolute z-[1] right-0 top-[8%] h-[82%] w-full md:w-[72%] opacity-40 md:opacity-100"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* colour wash so every photo shares the brand's warm-green tone */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: 'linear-gradient(120deg, #EDF4EC 0%, #F3EFE6 100%)', opacity: 0.55 }}
        />
        {/* left fade so the headline can sit over the photo's edge */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${CANVAS} 0%, ${CANVAS}CC 22%, transparent 55%)` }}
        />
      </motion.div>

      {/* ---------- Butterflies flow over the whole hero ---------- */}
      <Butterfly size={52} hue="#C6F00C" duration={36} topStart={58} />
      <Butterfly size={34} hue="#9CCB7A" duration={44} delay={6} reverse topStart={30} />

      {/* ---------- Text ---------- */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-40 md:pt-48 pb-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur border border-neutral-200/80 text-[11px] font-semibold text-neutral-700 uppercase tracking-[0.2em] mb-7">
          <span className="w-2 h-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/20 animate-pulse" />
          Residences &middot; Dhaka
        </div>

        <h1 className="font-['Space_Grotesk'] font-extrabold tracking-tight leading-[1.04] text-[#111827] text-5xl sm:text-6xl md:text-7xl max-w-3xl">
          Find Your Sanctuary
          <br />
          <span className="font-serif italic font-normal text-[#1B4332]/80">in Dhaka.</span>
        </h1>

        {/* immediately after the heading: a quiet, editorial index instead of buttons */}
        <div className="mt-10 max-w-xl">
          <p className="text-neutral-600 text-base md:text-lg leading-[1.75]">
            Homes shaped around sunlight, cross-breeze and calm &mdash; engineered
            to stand for generations.
          </p>

          <ul className="mt-8 divide-y divide-neutral-300/60 border-y border-neutral-300/60">
            {residences.map((r) => (
              <li key={r.area}>
                <a
                  href="#projects"
                  className="group flex items-baseline justify-between gap-4 py-3 transition"
                >
                  <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-neutral-500 group-hover:text-[#1B4332] transition">
                    {r.area}
                  </span>
                  <span className="text-sm text-neutral-700 flex items-center gap-2">
                    {r.note}
                    <span className="inline-block translate-x-0 opacity-40 group-hover:translate-x-1 group-hover:opacity-100 transition">
                      &rarr;
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-xs text-neutral-500 hover:text-[#1B4332] underline underline-offset-4 decoration-neutral-300 hover:decoration-[#1B4332] transition"
          >
            Prefer to see it in person? Arrange a private visit
          </a>
        </div>
      </div>

      {/* ---------- Slide caption + progress, tucked bottom-right ---------- */}
      <div className="absolute z-20 bottom-8 right-6 md:right-12 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {slide.place}
            </div>
            <div className="font-['Space_Grotesk'] font-bold text-lg text-[#111827]">{slide.title}</div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-3 flex justify-end gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              aria-label={`Show ${s.title}`}
              onClick={() => setIndex(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === index ? 'w-10 bg-[#111827]' : 'w-5 bg-neutral-400/50 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* bottom dissolve into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[15]"
        style={{ background: 'linear-gradient(to bottom, transparent, #F3EFE6)' }}
      />
    </section>
  );
}
```

---

## File: `client/src/components/home/LandownerSection.jsx`
```javascript
// client/src/components/home/LandownerSection.jsx
// "Partner with us" and "Why landowners choose Space Maker" merged into one coffee-room section.
import React, { useState } from 'react';
import { LANDOWNER as L, CONTACT, ESPRESSO } from '../../data/portfolio';
import { waLink, landMessage, trackLead } from '../../lib/leads';
import { Pic, Eyebrow, Reveal, DarkBand, Flutter } from '../portfolio/shared';

const field =
  'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-neutral-400 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#C6F00C]/50';
const label = "mb-1.5 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-600";

function Contact({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white/10 text-[#C6F00C]">{icon}</span>
      <div>
        <div className="font-['Space_Grotesk'] text-base font-bold text-[#F3EFE6]">{title}</div>
        <div className="mt-0.5 text-sm text-[#F3EFE6]/75">{children}</div>
      </div>
    </div>
  );
}

export default function LandownerSection() {
  const [state, setState] = useState('idle'); // idle | busy | ok | fallback
  const [lastMsg, setLastMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const msg = landMessage(f);
    setLastMsg(msg);
    trackLead({ channel: 'land-form', kind: 'landowner' });

    const url = import.meta.env.VITE_LAND_URL;
    if (!url) {
      // No endpoint set yet: send the details through WhatsApp so the lead is never lost.
      window.open(waLink(msg), '_blank', 'noopener');
      setState('ok');
      return;
    }
    setState('busy');
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, at: new Date().toISOString() }),
      });
      setState(r.ok ? 'ok' : 'fallback');
    } catch {
      setState('fallback');
    }
  }

  return (
    <DarkBand id="land" bg={ESPRESSO}>
      {/* coffee-room photo, softly blurred and darkened */}
      <div aria-hidden className="absolute inset-0">
        <Pic
          src={L.photo}
          alt=""
          fallback={`radial-gradient(ellipse 70% 60% at 75% 30%, #4A372C 0%, ${ESPRESSO} 70%)`}
          className="h-full w-full scale-105 object-cover"
          style={{ filter: 'blur(3px) saturate(0.85)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(42,31,26,0.9) 0%, rgba(42,31,26,0.78) 40%, rgba(42,31,26,0.9) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        {/* header */}
        <Reveal className="max-w-3xl">
          <Eyebrow dark>{L.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#F3EFE6] sm:text-6xl">
            {L.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.8] text-[#F3EFE6]/80 sm:text-lg">{L.intro}</p>
        </Reveal>

        {/* why landowners choose us */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#F3EFE6] sm:text-3xl">
              {L.whyTitle}
            </h3>
            <p className="mt-2 font-serif text-xl italic text-[#C6F00C]">{L.slogan}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {L.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#C6F00C]/50">
                  <div className="font-['JetBrains_Mono'] text-xs font-semibold text-[#C6F00C]">0{i + 1}</div>
                  <div className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#F3EFE6]">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-[#F3EFE6]/70">{c.text}</p>
                  <Flutter
                    hue="#C6F00C"
                    size={22}
                    className="absolute right-3 top-3 opacity-0 transition duration-500 group-hover:-translate-y-1 group-hover:opacity-100"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* contact + form */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="grid gap-6 lg:col-span-5">
            <Contact
              title={L.hotline.label}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              }
            >
              <a href={`tel:${L.hotline.tel}`} className="hover:text-[#C6F00C]">
                {L.hotline.display}
              </a>
            </Contact>
            <Contact
              title={L.emailLabel}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            >
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[#C6F00C]">
                {CONTACT.email}
              </a>
            </Contact>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl sm:p-9">
              {state === 'ok' || state === 'fallback' ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#C6F00C] text-[#111827]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-[#111827]">Thank you.</h3>
                  <p className="mx-auto mt-2 max-w-sm text-neutral-600">
                    {state === 'ok'
                      ? 'Our engineering director will call you back directly.'
                      : 'We could not send this automatically. Please tap below to send it on WhatsApp.'}
                  </p>
                  {state === 'fallback' && (
                    <a
                      href={waLink(lastMsg)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[6px]"
                    >
                      Send on WhatsApp →
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#111827]">
                    Request Feasibility Study
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Fill in your plot details; our engineering director will call you back directly.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="ls-name">Your name</label>
                      <input id="ls-name" name="name" required placeholder="e.g. Major Akhtaruzzaman" className={field} />
                    </div>
                    <div>
                      <label className={label} htmlFor="ls-phone">Phone / WhatsApp</label>
                      <input id="ls-phone" name="phone" required placeholder="+880 1..." className={field} />
                    </div>
                    <div>
                      <label className={label} htmlFor="ls-loc">Plot location</label>
                      <input id="ls-loc" name="location" placeholder="e.g. Sector 13, Jolshiri" className={field} />
                    </div>
                    <div>
                      <label className={label} htmlFor="ls-size">Plot size</label>
                      <input id="ls-size" name="size" placeholder="e.g. 5 Katha / 10 Katha" className={field} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label} htmlFor="ls-notes">Notes / requirements</label>
                      <textarea id="ls-notes" name="notes" rows={4} placeholder="Tell us about your expectations..." className={field} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'busy'}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1B4332] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#14331f] disabled:opacity-60"
                  >
                    {state === 'busy' ? 'Sending...' : 'Submit Land Details'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6F00C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </DarkBand>
  );
}
```

---

## File: `client/src/components/home/WhoWeAre.jsx`
```javascript
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { Slices, Eyebrow, Reveal } from '../portfolio/shared';
import { BRAND } from '../../data/portfolio';

/* Demo photo. Add `sliceImage: '/assets/...'` to aboutContent in siteContent.js to use your own.
   (The old `image` field is ignored on purpose: it pointed to a file that does not exist.) */
const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1541888946425-d0fbb18615f7?auto=format&fit=crop&w=1600&q=80';

/* The quiet second beat: the story on the left, one photo cut into rising pillars on the right. */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '14%']);
  const pillars = c.pillars || [];

  return (
    <section ref={ref} id="about" className="sec-about relative z-10 overflow-hidden">
      <motion.img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        style={{ y: markY }}
        className="pointer-events-none absolute -left-[6%] bottom-[8%] z-0 w-[440px] select-none opacity-[0.07] md:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-6">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="f-display mt-5 text-3xl font-bold leading-[1.08] text-[#111827] sm:text-5xl">{c.title}</h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[#374151] sm:text-lg">
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-10 max-w-xl border-l-4 border-[#C6F00C] pl-6">
            <p className="f-serif text-xl italic leading-snug text-[#1B4332] sm:text-2xl">“{c.quote}”</p>
          </blockquote>
        </Reveal>

        <div className="md:col-span-6">
          <Slices src={c.sliceImage || DEMO_IMAGE} count={4} className="h-[420px] sm:h-[560px]" />
        </div>
      </div>

      <ul className="relative z-10 mx-auto grid max-w-7xl gap-x-8 gap-y-8 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="border-t border-[#1B4332]/20 pt-5"
          >
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#111827]">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="f-display mt-3 text-xl font-semibold text-[#1B4332]">{p.title}</h3>
            <p className="mt-1.5 leading-relaxed text-[#374151]">{p.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
```

---

## File: `client/src/components/home/WhyChooseUs.jsx`
```javascript
// client/src/components/home/WhyChooseUs.jsx
// Why choose us, written for BUYERS. (The landowner content now lives in LandownerSection.jsx.)
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_US, BRAND } from '../../data/portfolio';
import { Shot, Eyebrow, Reveal } from '../portfolio/shared';

function Timeline({ items }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '-20%' });
  return (
    <div ref={ref} className="relative w-full px-6 sm:px-10">
      <div className="relative">
        <div aria-hidden className="absolute left-0 right-0 top-[7px] h-[2px] bg-[#1B4332]/20" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-[7px] h-[2px] origin-left bg-[#C6F00C]"
          initial={{ width: 0 }}
          animate={{ width: seen ? '100%' : 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <ol className="relative flex justify-between">
          {items.map((m, i) => (
            <li key={m} className="flex flex-col items-center gap-3">
              <motion.span
                className="h-4 w-4 rounded-full border-2 border-[#1B4332] bg-[#FAF8F5]"
                animate={seen ? { backgroundColor: '#C6F00C' } : undefined}
                transition={{ delay: 0.3 + i * 0.35 }}
              />
              <span className="hidden font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#111827] sm:block">
                {m}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Scene({ s, i }) {
  const flip = i % 2 === 1;
  const kind = s.treatment;
  const ratio = kind === 'arch' ? 'aspect-[4/5] max-w-md' : kind === 'band' || s.milestones ? 'aspect-[16/11]' : 'aspect-[16/11]';
  const treatment = s.milestones ? 'band' : kind;

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-12 md:gap-14">
      <div className={`md:col-span-6 ${flip ? 'md:order-2' : ''}`}>
        <Reveal>
          <div className={`mx-auto w-full ${ratio}`}>
            <Shot treatment={treatment} src={s.image} alt={s.title} from={36} to={66}>
              {s.milestones && <Timeline items={s.milestones} />}
            </Shot>
          </div>
        </Reveal>
      </div>

      <Reveal className={`md:col-span-6 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-7xl italic leading-none text-[#C6F00C]">0{i + 1}</div>
        <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl">
          {s.title}
        </h3>
        <p className="mt-4 font-serif text-xl italic text-[#1B4332]/85 sm:text-2xl">{s.line}</p>
        <p className="mt-5 max-w-lg text-base leading-[1.8] text-[#374151] sm:text-lg">{s.text}</p>
        {s.points && (
          <ul className="mt-6 grid gap-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.14em] text-[#111827]">
                <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #EDF4EC 50%, #F6F8F5 100%)' }}
    >
      <img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 w-[420px] select-none opacity-[0.06]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{WHY_US.eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-6xl">
          {WHY_US.title}
        </h2>
      </div>

      <div className="relative mt-6">
        {WHY_US.scenes.map((s, i) => (
          <Scene key={s.key} s={s} i={i} />
        ))}
      </div>

      <Reveal className="relative mx-auto mt-6 max-w-7xl px-5 sm:px-8">
        <ul className="grid gap-4 border-y border-[#1B4332]/15 py-7 sm:grid-cols-3">
          {WHY_US.assurances.map((a) => (
            <li key={a} className="flex items-center gap-3 font-['Space_Grotesk'] text-base font-semibold text-[#1B4332]">
              <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/30" />
              {a}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
```

---

## File: `client/src/components/layout/BanyanMark.jsx`
```javascript
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
```

---

## File: `client/src/components/layout/ButterflyLayer.jsx`
```javascript
// client/src/components/layout/ButterflyLayer.jsx
// A light layer of multi-colour butterflies drifting across the whole site.
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flutter } from '../portfolio/shared';

const FLY = [
  { hue: '#C6F00C', size: 44, dur: 58, delay: 2, top: '16vh', x: ['-8vw', '28vw', '60vw', '92vw', '110vw'], y: [0, -60, 40, -30, 20], rot: [14, -10, 8, -14, 6] },
  { hue: '#FF7A59', size: 34, dur: 74, delay: 12, top: '58vh', x: ['110vw', '78vw', '46vw', '18vw', '-10vw'], y: [0, 50, -40, 30, -20], rot: [-14, 10, -8, 14, -6], mirror: true },
  { hue: '#5BC0EB', size: 38, dur: 66, delay: 24, top: '36vh', x: ['-10vw', '20vw', '52vw', '84vw', '110vw'], y: [0, 70, -20, 50, 0], rot: [10, -12, 12, -8, 8], extra: true },
  { hue: '#F5B841', size: 30, dur: 80, delay: 36, top: '74vh', x: ['110vw', '84vw', '50vw', '22vw', '-10vw'], y: [0, -50, 20, -40, 10], rot: [-10, 12, -10, 10, -6], mirror: true, extra: true },
  { hue: '#9B7EDE', size: 32, dur: 70, delay: 48, top: '24vh', x: ['-10vw', '30vw', '64vw', '90vw', '110vw'], y: [0, 40, -50, 20, -10], rot: [12, -8, 10, -12, 6], extra: true },
];

export default function ButterflyLayer() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] overflow-hidden">
      {FLY.map((b, i) => (
        <motion.div
          key={i}
          className={b.extra ? 'hidden sm:block' : ''}
          style={{ position: 'absolute', top: b.top, left: 0, width: b.size, height: b.size }}
          initial={{ x: b.x[0] }}
          animate={{ x: b.x, y: b.y, rotate: b.rot }}
          transition={{ duration: b.dur, delay: b.delay, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0, 6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: b.mirror ? 'scaleX(-1)' : undefined }}
          >
            <Flutter hue={b.hue} size={b.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## File: `client/src/components/layout/FloatingDock.jsx`
```javascript
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
```

---

## File: `client/src/components/layout/Footer.jsx`
```javascript
import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 pt-20 pb-12 px-6 bg-[#111827] text-neutral-400 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-neutral-800">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] p-1.5 flex items-center justify-center">
              <img src="/assets/00_brand/banyan-logo.svg" alt="Banyan Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-wider">
              SPACE <span className="text-[#C6F00C]">MAKER</span>
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6">
            Where space defines luxury. Dedicated to transforming valuable land into architectural sanctuaries with disciplined engineering and complete legal integrity.
          </p>
          <div className="text-xs font-mono text-neutral-400 space-y-1">
            <div>Phone: +880 1916-100416</div>
            <div>Email: spacemakerbd@gmail.com</div>
          </div>
        </div>

        <div className="md:col-span-3 text-xs space-y-3">
          <div className="font-bold text-white uppercase tracking-wider mb-2">Our Studios</div>
          <div>
            <span className="text-white block font-bold">Corporate Office:</span>
            <span>House 405, Road 29, Mohakhali DOHS, Dhaka</span>
          </div>
          <div>
            <span className="text-white block font-bold">Jalshiri Operations:</span>
            <span>House 22, Road 505A, Sector 16, Jalshiri Abashon, Dhaka</span>
          </div>
        </div>

        <div className="md:col-span-4 text-xs space-y-3">
          <div className="font-bold text-white uppercase tracking-wider mb-2">Direct Links</div>
          <div className="grid grid-cols-2 gap-2">
            <a href="#who-we-are" className="hover:text-white transition">Who We Are</a>
            <a href="#why-choose-us" className="hover:text-white transition">Why Choose Us</a>
            <a href="#portfolio" className="hover:text-white transition">Developments</a>
            <a href="#partner-land" className="hover:text-white transition">Discuss Land</a>
            <a href="#careers" className="hover:text-white transition">Careers at Space Maker</a>
            <a href="https://wa.me/8801916100416" target="_blank" rel="noreferrer" className="text-[#C6F00C] hover:underline">Instant WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <div>© {new Date().getFullYear()} Space Maker Limited. All rights reserved.</div>
        <div>Honest Civil Engineering • Robust Banyan Trust • Generational Value</div>
      </div>
    </footer>
  );
}
```

---

## File: `client/src/components/layout/Navbar.jsx`
```javascript
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
```

---

## File: `client/src/components/layout/SiteFooter.jsx`
```javascript
// client/src/components/layout/SiteFooter.jsx
// First version of the light-green footer; also the "Contact" target in the nav.
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, CONTACT, projects, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

const head = "font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1B4332]";
const lk = 'text-sm text-[#1B4332]/80 transition hover:text-[#111827]';

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #E6EFE4 22%, #DCE9DA 100%)' }}
    >
      <img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 w-[420px] select-none opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl">
              Let us show you around.
            </h2>
            <p className="mt-5 max-w-md text-[#1B4332]/80">
              Visit a site, see the drawings, ask anything. We answer personally.
            </p>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-visit' })}
              className="mt-7 inline-block text-base font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[7px] hover:decoration-[#1B4332]"
            >
              Book a visit on WhatsApp →
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <div className={head}>Explore</div>
              <ul className="mt-4 grid gap-2.5">
                <li><Link to={{ pathname: '/', hash: '#projects' }} className={lk}>Projects</Link></li>
                <li><Link to="/interiors" className={lk}>Interiors</Link></li>
                <li><Link to={{ pathname: '/', hash: '#about' }} className={lk}>About</Link></li>
                <li><Link to={{ pathname: '/', hash: '#why-us' }} className={lk}>Why Us</Link></li>
                <li><Link to={{ pathname: '/', hash: '#land' }} className={lk}>Landowners</Link></li>
                <li><Link to="/careers" className={lk}>Careers</Link></li>
              </ul>
              <div className={`${head} mt-8`}>Recent projects</div>
              <ul className="mt-4 grid gap-2.5">
                {projects.slice(0, 5).map((p) => (
                  <li key={p.id}><Link to={`/projects/${p.slug}`} className={lk}>{p.title}</Link></li>
                ))}
                <li><Link to="/projects" className="text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-4">All projects →</Link></li>
              </ul>
            </div>

            <div>
              <div className={head}>Offices</div>
              <ul className="mt-4 grid gap-5">
                {CONTACT.offices.map((o) => (
                  <li key={o.name}>
                    <div className="text-sm font-semibold text-[#111827]">{o.name}</div>
                    <div className="mt-1 text-sm leading-relaxed text-[#1B4332]/80">{o.address}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className={head}>Talk to us</div>
              <ul className="mt-4 grid gap-3">
                {CONTACT.hotlines.map((h) => (
                  <li key={h.tel}>
                    <div className="text-[11px] uppercase tracking-wider text-[#1B4332]/60">{h.label}</div>
                    <a href={`tel:${h.tel}`} className="text-sm font-semibold text-[#111827]">{h.display}</a>
                  </li>
                ))}
                <li>
                  <div className="text-[11px] uppercase tracking-wider text-[#1B4332]/60">Email</div>
                  <a href={`mailto:${CONTACT.email}`} className="text-sm font-semibold text-[#111827]">{CONTACT.email}</a>
                </li>
                <li>
                  <a href={CONTACT.messenger} target="_blank" rel="noreferrer" className={lk}>Message on Facebook →</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#1B4332]/15 pt-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/30" />
            <span className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide text-[#1B4332]">
              Space Maker Limited
            </span>
          </div>
          <span className="text-xs text-[#1B4332]/70">
            where space defines luxury · © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
```

---

## File: `client/src/components/layout/SiteNav.jsx`
```javascript
// client/src/components/layout/SiteNav.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

/* Simple, plain names. Hash links go to the home page sections. */
const LINKS = [
  { label: 'Projects', to: { pathname: '/', hash: '#projects' } },
  { label: 'Interiors', to: '/interiors' },
  { label: 'About', to: { pathname: '/', hash: '#about' } },
  { label: 'Why Us', to: { pathname: '/', hash: '#why-us' } },
  { label: 'Landowners', to: { pathname: '/', hash: '#land' } },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

const linkCls =
  "relative text-[13px] font-medium text-neutral-700 transition hover:text-[#1B4332] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C6F00C] after:transition-all hover:after:w-full";

function Logo() {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B4332] text-[#C6F00C]">▲</span>
  ) : (
    <img
      src={BRAND.icon}
      alt="Space Maker"
      onError={() => setFailed(true)}
      className="h-11 w-11 rounded-xl object-cover"
    />
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5]/90 px-4 py-3 shadow-sm backdrop-blur-md md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span>
            <span className="block text-base font-bold uppercase leading-none tracking-wide text-[#1B4332]">
              Space Maker
            </span>
            <span className="mt-1 block text-[11px] text-neutral-500">where space defines luxury</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`${linkCls} ${l.to === '/careers' && pathname === '/careers' ? 'text-[#1B4332] after:w-full' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead({ channel: 'whatsapp', kind: 'nav-visit' })}
            className="hidden items-center gap-2 rounded-xl bg-[#1B4332] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#14331f] sm:inline-flex"
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
            Book a Visit
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-neutral-200 lg:hidden"
          >
            <span className={`h-[2px] w-5 bg-[#1B4332] transition ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-5 bg-[#1B4332] transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-5 bg-[#1B4332] transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-neutral-200/70 bg-[#FAF8F5]/95 p-5 shadow-lg backdrop-blur-md lg:hidden">
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-neutral-800 hover:bg-[#EDF4EC]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-4 py-3 text-sm font-semibold text-white"
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
            Book a Visit
          </a>
        </div>
      )}
    </header>
  );
}
```

---

## File: `client/src/components/common/BackgroundLayers.jsx`
```javascript
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
```

---

## File: `client/src/components/common/Butterflies.jsx`
```javascript
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
```

---

## File: `client/src/components/portfolio/AllProjects.jsx`
```javascript
// client/src/components/portfolio/AllProjects.jsx
// Route: /projects  (every project, with filters and a photo that follows the cursor)
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects, upcoming, coverOf, STATUS_LABEL, TYPE_LABEL } from '../../data/portfolio';
import { Eyebrow, LeadLink, Pic } from './shared';

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Under construction' },
  { key: 'completed', label: 'Handed over' },
  { key: 'upcoming', label: 'Opening soon' },
];

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 pb-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] transition ${
        on ? 'border-[#C6F00C] text-[#111827]' : 'border-transparent text-neutral-500 hover:text-[#1B4332]'
      }`}
    >
      {children}
    </button>
  );
}

function RowInner({ item, n }) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-3 py-6 sm:py-8">
      <span className="col-span-2 font-['JetBrains_Mono'] text-xs text-neutral-400 sm:col-span-1">
        {String(n).padStart(2, '0')}
      </span>
      <div className="col-span-10 sm:col-span-7">
        <div className="font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#111827] transition duration-300 group-hover:translate-x-2 group-hover:text-[#1B4332] sm:text-5xl">
          {item.title}
          {item.flagship && (
            <span className="ml-3 align-middle font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B4332]">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
              Signature
            </span>
          )}
        </div>
      </div>
      <div className="col-span-10 col-start-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-neutral-500 sm:col-span-4 sm:col-start-auto sm:text-right">
        {item.area}
        <span className="mx-2 text-[#C6F00C]">●</span>
        {TYPE_LABEL[item.type] || 'Project'}
        <div className="mt-1 text-[#1B4332]">{STATUS_LABEL[item.status]}</div>
      </div>
    </div>
  );
}

export default function AllProjects() {
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [hover, setHover] = useState(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 30 });
  const sy = useSpring(my, { stiffness: 260, damping: 30 });

  const items = useMemo(
    () => [
      ...projects.map((p) => ({
        kind: 'project',
        id: p.id,
        title: p.title,
        area: p.area,
        type: p.type,
        status: p.status,
        flagship: p.flagship,
        img: coverOf(p),
        p,
      })),
      ...upcoming.map((u) => ({
        kind: 'upcoming',
        id: u.id,
        title: u.area,
        area: u.area,
        type: u.type || 'residential',
        status: 'upcoming',
        img: u.image,
        u,
      })),
    ],
    []
  );

  const types = [...new Set(items.map((i) => i.type))];
  const list = items.filter((i) => (status === 'all' || i.status === status) && (type === 'all' || i.type === type));

  return (
    <main
      className="relative min-h-screen pb-28"
      style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 30%, #EDF4EC 100%)' }}
      onMouseMove={(e) => {
        mx.set(e.clientX + 200);
        my.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-36 sm:px-8 md:pt-44">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
        >
          ← Back
        </Link>
        <div className="mt-8">
          <Eyebrow>All projects</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
            Everything we are building, and have built.
          </h1>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {STATUS_TABS.map((t) => (
              <Chip key={t.key} on={status === t.key} onClick={() => setStatus(t.key)}>
                {t.label}
              </Chip>
            ))}
          </div>
          {types.length > 1 && (
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              <Chip on={type === 'all'} onClick={() => setType('all')}>
                All types
              </Chip>
              {types.map((t) => (
                <Chip key={t} on={type === t} onClick={() => setType(t)}>
                  {TYPE_LABEL[t] || t}
                </Chip>
              ))}
            </div>
          )}
        </div>

        <ul className="mt-8 divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
          {list.map((item, i) => (
            <li key={item.id} onMouseEnter={() => setHover(item)} onMouseLeave={() => setHover(null)}>
              {item.kind === 'project' ? (
                <Link to={`/projects/${item.p.slug}`} className="group block">
                  <RowInner item={item} n={i + 1} />
                </Link>
              ) : (
                <LeadLink project={item.u} kind="upcoming" className="group block">
                  <RowInner item={item} n={i + 1} />
                </LeadLink>
              )}
            </li>
          ))}
          {list.length === 0 && (
            <li className="py-12 text-neutral-500">Nothing here yet. Try another filter.</li>
          )}
        </ul>
        <p className="mt-4 text-xs text-neutral-500">
          Projects open their own page. Upcoming projects open WhatsApp so you can register your interest.
        </p>
      </div>

      {/* photo that follows the cursor (desktop only) */}
      <AnimatePresence>
        {hover && hover.img && (
          <motion.div
            key={hover.id}
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-56 w-72 md:block"
          >
            <div
              className="h-full w-full overflow-hidden"
              style={{ clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))' }}
            >
              <Pic src={hover.img} alt="" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
```

---

## File: `client/src/components/portfolio/InteriorPage.jsx`
```javascript
// client/src/components/portfolio/InteriorPage.jsx
// Route: /interiors/:slug  (prototype of an interior project page)
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { interiorProjects, getInterior, interiorCover, TYPE_LABEL, CONTACT } from '../../data/portfolio';
import Lightbox from './Lightbox';
import {
  Shot,
  Eyebrow,
  Reveal,
  Facts,
  ActionRow,
  DarkBand,
  StickyBar,
  LeadLink,
  linkCls,
  quietCls,
} from './shared';

const ROOM_TREATMENTS = ['notch', 'arch', 'duotone', 'blur'];

function Room({ room, i, onOpen }) {
  const t = ROOM_TREATMENTS[i % ROOM_TREATMENTS.length];
  const flip = i % 2 === 1;
  const ratio = t === 'arch' ? 'aspect-[4/5] max-w-md' : 'aspect-[4/3]';
  const specs = (room.specs || '').split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-14">
      <Reveal className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <button
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`Open photo: ${room.title}`}
          className={`mx-auto block w-full cursor-zoom-in ${ratio}`}
        >
          <Shot treatment={t} src={room.image} alt={room.title} />
        </button>
      </Reveal>
      <Reveal className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-7xl italic leading-none text-[#C6F00C]">0{i + 1}</div>
        <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-4xl">
          {room.title}
        </h3>
        <ul className="mt-5 grid gap-2">
          {specs.map((s) => (
            <li key={s} className="flex items-start gap-3 text-base leading-relaxed text-[#374151]">
              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#C6F00C]" />
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function InteriorView({ p }) {
  const [lb, setLb] = useState(-1);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowBar(v > window.innerHeight * 0.7));

  const photos = p.rooms.map((r) => ({ src: r.image, caption: r.title, chapter: 'interior' }));
  const idx = interiorProjects.findIndex((x) => x.id === p.id);
  const next = interiorProjects[(idx + 1) % interiorProjects.length];
  const lead = { id: p.id, title: p.title, area: p.location, ref: p.ref };

  return (
    <main style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 22%, #EDF4EC 60%, #F6F8F5 100%)' }}>
      {/* opening */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-36 sm:px-8 md:grid-cols-12 md:pt-44">
          <div className="md:col-span-6">
            <Link
              to="/interiors"
              className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
            >
              ← All interiors
            </Link>
            <div className="mt-8">
              <Eyebrow>{TYPE_LABEL[p.type]} interior</Eyebrow>
              <h1 className="mt-5 font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
                {p.title}
              </h1>
              <p className="mt-6 font-serif text-2xl italic leading-snug text-[#1B4332]/85 sm:text-3xl">{p.line}</p>
              <Facts
                className="mt-10"
                items={[
                  { k: 'Client', v: p.client },
                  { k: 'Location', v: p.location },
                  { k: 'Area', v: p.area },
                  { k: 'Rooms', v: String(p.rooms.length) },
                ]}
              />
              <ActionRow project={lead} explore={false} kind="interior" className="mt-10" />
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="mx-auto aspect-[4/5] max-w-md">
              <Shot treatment="arch" src={interiorCover(p)} alt={p.title} drift />
            </div>
          </div>
        </div>
      </section>

      {/* brief + materials */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Eyebrow>The brief</Eyebrow>
            <p className="mt-5 max-w-xl text-lg leading-[1.8] text-[#374151] sm:text-xl">{p.brief}</p>
          </Reveal>
          <Reveal className="md:col-span-6">
            <Eyebrow>Materials</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-6">
              {p.materials.map((m) => (
                <li key={m.name} className="group flex flex-col items-start gap-3">
                  <span
                    className="h-16 w-16 rounded-full ring-2 ring-white shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:ring-[#C6F00C]"
                    style={{ background: m.hex }}
                  />
                  <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#111827]">
                    {m.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* rooms */}
      <section className="py-6">
        {p.rooms.map((room, i) => (
          <Room key={room.title} room={room} i={i} onOpen={setLb} />
        ))}
      </section>

      {/* closing, on espresso */}
      <DarkBand className="mt-10">
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#F3EFE6] sm:text-6xl">
            Planning an interior?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[#F3EFE6]/75">
            Tell us about the space. We reply personally, and we will gladly visit and talk it through.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <LeadLink
              project={lead}
              kind="interior"
              className="text-base font-medium text-[#F3EFE6] underline decoration-[#C6F00C] decoration-2 underline-offset-[7px]"
            >
              Chat on WhatsApp →
            </LeadLink>
            {CONTACT.hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className="text-sm text-[#F3EFE6]/75 hover:text-[#C6F00C]">
                {h.display}
              </a>
            ))}
          </div>
          <div className="mt-14 border-t border-white/15 pt-8">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-white/50">Next interior</div>
            <Link
              to={`/interiors/${next.slug}`}
              className="mt-2 inline-block font-['Space_Grotesk'] text-2xl font-bold text-[#F3EFE6] underline decoration-[#C6F00C] decoration-2 underline-offset-8"
            >
              {next.title} →
            </Link>
          </div>
        </Reveal>
      </DarkBand>

      <StickyBar project={lead} kind="interior" show={showBar} />

      <AnimatePresence>
        {lb >= 0 && <Lightbox photos={photos} index={lb} onChange={setLb} onClose={() => setLb(-1)} />}
      </AnimatePresence>
    </main>
  );
}

export default function InteriorPage() {
  const { slug } = useParams();
  const p = getInterior(slug);
  if (!p) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-['Space_Grotesk'] text-4xl font-extrabold text-[#111827]">We could not find that interior.</h1>
        <Link to="/interiors" className={`${linkCls} mt-6`}>
          See all interiors →
        </Link>
      </main>
    );
  }
  return <InteriorView key={p.id} p={p} />;
}
```

---

## File: `client/src/components/portfolio/InteriorsIndex.jsx`
```javascript
// client/src/components/portfolio/InteriorsIndex.jsx
// Route: /interiors  (all interior projects)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { interiorProjects, interiorCover, TYPE_LABEL } from '../../data/portfolio';
import { Shot, Eyebrow, Reveal, linkCls } from './shared';

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 pb-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] transition ${
        on ? 'border-[#C6F00C] text-[#111827]' : 'border-transparent text-neutral-500 hover:text-[#1B4332]'
      }`}
    >
      {children}
    </button>
  );
}

export default function InteriorsIndex() {
  const [type, setType] = useState('all');
  const types = [...new Set(interiorProjects.map((p) => p.type))];
  const list = interiorProjects.filter((p) => type === 'all' || p.type === type);

  return (
    <main
      className="min-h-screen pb-28"
      style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 30%, #EDF4EC 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-36 sm:px-8 md:pt-44">
        <Link
          to="/"
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
        >
          ← Back
        </Link>
        <div className="mt-8">
          <Eyebrow>Interiors</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
            Rooms finished down to the joinery.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.8] text-neutral-600 sm:text-lg">
            Residential and commercial interiors, designed and built by the same team that builds our buildings.
          </p>
        </div>

        {types.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
            <Chip on={type === 'all'} onClick={() => setType('all')}>
              All
            </Chip>
            {types.map((t) => (
              <Chip key={t} on={type === t} onClick={() => setType(t)}>
                {TYPE_LABEL[t]}
              </Chip>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-16">
          {list.map((p, i) => (
            <Reveal key={p.id}>
              <Link to={`/interiors/${p.slug}`} className="group block">
                <div className="aspect-[4/3] md:aspect-[16/8]">
                  <Shot
                    treatment="carved"
                    corner={i % 2 ? 'br' : 'bl'}
                    w={42}
                    h={38}
                    src={interiorCover(p)}
                    alt={p.title}
                  >
                    <div className="hidden pr-6 md:block">
                      <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#1B4332]">
                        {TYPE_LABEL[p.type]} interior
                      </div>
                      <div className="mt-1 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#111827] lg:text-4xl">
                        {p.title}
                      </div>
                    </div>
                  </Shot>
                </div>
                <div className="mt-5 max-w-2xl">
                  <div className="md:hidden">
                    <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#1B4332]">
                      {TYPE_LABEL[p.type]} interior
                    </div>
                    <div className="mt-1 font-['Space_Grotesk'] text-3xl font-extrabold tracking-tight text-[#111827]">
                      {p.title}
                    </div>
                  </div>
                  <p className="mt-2 font-serif text-xl italic text-[#1B4332]/85">{p.line}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600">
                    <span>{p.location}</span>
                    <span className={linkCls}>View this interior →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
```

---

## File: `client/src/components/portfolio/Lightbox.jsx`
```javascript
// client/src/components/portfolio/Lightbox.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CHAPTERS } from '../../data/portfolio';

export default function Lightbox({ photos, index, onClose, onChange }) {
  const photo = photos[index];
  const n = photos.length;
  const go = (d) => onChange((index + d + n) % n);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    window.__lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.__lenis?.start();
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b1511]/95 backdrop-blur"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white/80" onClick={(e) => e.stopPropagation()}>
        <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button type="button" onClick={onClose} aria-label="Close" className="text-2xl leading-none hover:text-[#C6F00C]">
          ×
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#C6F00C] hover:text-[#C6F00C] sm:flex"
        >
          ←
        </button>
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.caption || ''}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1);
            else if (info.offset.x > 80) go(-1);
          }}
          className="max-h-[78vh] max-w-full select-none object-contain"
        />
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#C6F00C] hover:text-[#C6F00C] sm:flex"
        >
          →
        </button>
      </div>

      <div className="px-5 py-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
        <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]">
          {CHAPTERS[photo.chapter]?.label}
        </div>
        {photo.caption && <div className="mt-1 font-['Space_Grotesk'] text-base font-semibold">{photo.caption}</div>}
      </div>
    </motion.div>
  );
}
```

---

## File: `client/src/components/portfolio/PortfolioSection.jsx`
```javascript
// client/src/components/portfolio/PortfolioSection.jsx
// Home portfolio. Each part has its own look so a long list never feels repetitive:
//   signature flagships (dark, carved photo) -> expanding panels -> interiors strip -> upcoming rows
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  projects,
  interiorProjects,
  interiorCover,
  upcoming,
  STATUS_LABEL,
  TYPE_LABEL,
  coverOf,
} from '../../data/portfolio';
import {
  Shot,
  Eyebrow,
  TypeTag,
  Reveal,
  Facts,
  HStrip,
  LeadLink,
  ActionRow,
  DarkBand,
  Flutter,
  linkCls,
} from './shared';

/* ---------------- Signature (flagships) ---------------- */
function Signature({ project, index }) {
  const flip = index % 2 === 1;
  const second =
    project.photos.find((p) => p.chapter === 'interior') || project.photos.find((p) => p.chapter !== 'exterior');
  const corner = flip ? 'br' : 'bl';

  return (
    <article className="group relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-8">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className={`relative md:col-span-7 ${flip ? 'md:order-2' : ''}`}
      >
        <div className="relative aspect-[4/3]">
          <Shot treatment="carved" corner={corner} w={46} h={36} src={coverOf(project)} alt={project.title} drift>
            {/* the title sits inside the carved corner, on the dark background */}
            <div className="hidden pr-6 md:block">
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C6F00C]">
                {STATUS_LABEL[project.status]}
              </div>
              <div className="relative mt-2 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.02] tracking-tight text-[#F3EFE6] lg:text-5xl">
                {project.title}
                <Flutter
                  hue="#C6F00C"
                  size={30}
                  className="absolute -top-7 right-0 -translate-y-0 opacity-0 transition duration-500 group-hover:-translate-y-2 group-hover:opacity-100"
                />
              </div>
            </div>
          </Shot>
          {second && (
            <div
              className={`absolute -bottom-6 hidden h-40 w-40 sm:block lg:h-52 lg:w-52 ${
                flip ? '-left-6' : '-right-6'
              } transition duration-700 group-hover:scale-105`}
            >
              <Shot treatment="circle" src={second.src} alt="" />
            </div>
          )}
        </div>
      </Link>

      <Reveal className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-8xl italic leading-none text-[#C6F00C]/25">0{index + 1}</div>
        <div className="md:hidden">
          <TypeTag type={project.type} status={project.status} dark />
          <h3 className="mt-3 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.04] tracking-tight text-[#F3EFE6]">
            {project.title}
          </h3>
        </div>
        <div className="hidden md:block">
          <TypeTag type={project.type} dark />
        </div>
        <p className="mt-5 font-serif text-xl italic leading-snug text-[#F3EFE6]/85 sm:text-2xl">{project.line}</p>
        <Facts
          dark
          className="mt-7"
          items={[
            { k: 'Location', v: project.area },
            { k: 'Floors', v: project.floors },
            { k: 'Started', v: project.started },
          ]}
        />
        <ActionRow project={project} dark className="mt-8" />
      </Reveal>
    </article>
  );
}

/* ---------------- Expanding panels (other projects) ---------------- */
const PANEL_CLIP = 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)';

function Panels({ items, extra }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col gap-4 md:h-[68vh] md:min-h-[480px] md:flex-row md:gap-3">
        {items.map((p, i) => {
          const open = i === active;
          return (
            <div
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="sm-acc group relative h-80 overflow-hidden md:h-auto"
              style={{ '--f': open ? '3.4 1 0%' : '1 1 0%', clipPath: PANEL_CLIP }}
            >
              <div className="absolute inset-0">
                <Shot treatment="duotone" src={coverOf(p)} alt={p.title} className={open ? 'is-on' : ''} />
              </div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,18,14,0.9), rgba(26,18,14,0.2) 55%, rgba(26,18,14,0.05))' }}
              />
              <Link
                to={`/projects/${p.slug}`}
                aria-label={`Open ${p.title}`}
                onClick={(e) => {
                  if (!open) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className="absolute inset-0 z-[1]"
              />

              {/* collapsed: vertical title */}
              <div
                className={`pointer-events-none absolute bottom-6 left-5 z-10 hidden transition duration-500 md:block ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div
                  className="font-['Space_Grotesk'] text-xl font-bold text-[#F3EFE6]"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {p.title}
                </div>
              </div>

              {/* expanded: details */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 transition duration-500 md:p-8 ${
                  open ? 'md:translate-y-0 md:opacity-100' : 'md:translate-y-3 md:opacity-0'
                }`}
              >
                <TypeTag type={p.type} status={p.status} dark />
                <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#F3EFE6] sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md font-serif text-lg italic text-[#F3EFE6]/85">{p.line}</p>
                <div className="mt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-white/60">
                  {p.area} · {p.floors}
                </div>
                <div className="pointer-events-auto mt-5">
                  <ActionRow project={p} dark />
                </div>
              </div>
            </div>
          );
        })}

        {/* the last panel opens the full list */}
        <Link
          to="/projects"
          className="sm-acc group relative flex h-48 items-end overflow-hidden bg-[#2A1F1A] p-6 md:h-auto"
          style={{ '--f': '1.1 1 0%', clipPath: PANEL_CLIP }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          />
          <div className="relative">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]">
              Visit our other projects
            </div>
            <div className="mt-3 font-serif text-5xl italic leading-none text-[#F3EFE6]">
              {extra > 0 ? `+${extra}` : 'All'}
            </div>
            <div className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#F3EFE6]">
              {extra > 0 ? 'more projects' : 'projects'}
            </div>
            <div className="mt-4 text-[#C6F00C] transition duration-300 group-hover:translate-x-2">→</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ---------------- Interiors strip ---------------- */
function Interiors() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 pb-2 pt-16 sm:px-8">
        <Eyebrow>Interiors</Eyebrow>
        <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl">
          Rooms finished down to the joinery.
        </h3>
        <p className="mt-4 max-w-xl text-neutral-600">
          Residential and commercial interiors, designed and built by the same team that builds our buildings.
        </p>
      </div>
      <div className="mt-8">
        <HStrip>
          {interiorProjects.map((p) => (
            <Link
              key={p.id}
              to={`/interiors/${p.slug}`}
              className="group block w-[72vw] flex-none snap-start sm:w-[380px]"
            >
              <div className="aspect-[4/5]">
                <Shot treatment="duotone" src={interiorCover(p)} alt={p.title} />
              </div>
              <div className="mt-3">
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#1B4332]">
                  {TYPE_LABEL[p.type]} interior
                </div>
                <div className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#111827]">{p.title}</div>
                <div className="mt-1 text-sm text-neutral-600">{p.location}</div>
              </div>
            </Link>
          ))}
          <Link
            to="/interiors"
            className="group relative flex aspect-[4/5] w-[72vw] flex-none snap-start items-end overflow-hidden bg-[#2A1F1A] p-6 sm:w-[380px]"
            style={{ clipPath: PANEL_CLIP }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '22px 22px' }}
            />
            <div className="relative">
              <div className="font-serif text-4xl italic text-[#F3EFE6]">All interior projects</div>
              <div className="mt-3 text-[#C6F00C] transition duration-300 group-hover:translate-x-2">→</div>
            </div>
          </Link>
        </HStrip>
      </div>
    </div>
  );
}

/* ---------------- Upcoming rows ---------------- */
function Blueprint() {
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full text-[#1B4332]/25" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="40" y="14" width="80" height="96" />
      <path d="M40 38h80M40 62h80M40 86h80M80 14v96M20 110h120" />
    </svg>
  );
}

function UpcomingRow({ u }) {
  const facts = [
    { k: 'Land', v: u.land },
    { k: 'Facing', v: u.facing },
    { k: 'Floors', v: u.floors },
    { k: 'Construction', v: u.resume },
  ];
  const hasDetail =
    u.status || facts.some((f) => f.v) || (u.units && u.units.length) || (u.facilities && u.facilities.length);

  return (
    <Reveal className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <div className="aspect-[4/3] bg-[#EDF4EC]">
          {u.image ? <Shot treatment="blur" src={u.image} alt={`Upcoming project in ${u.area}`} /> : <Blueprint />}
        </div>
      </div>

      <div className="md:col-span-6">
        <div className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          {TYPE_LABEL[u.type] || 'Project'} · {u.opening}
        </div>
        <div className="mt-1 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
          {u.area}
        </div>
        <div className="mt-1 font-serif text-lg italic text-[#1B4332]/80">{u.line}</div>

        {u.status && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#1B4332]/20 bg-white/60 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#1B4332]">
            <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
            {u.status}
          </div>
        )}

        {hasDetail ? (
          <>
            <Facts className="mt-5" items={facts} />
            {u.units && u.units.length > 0 && (
              <div className="mt-5 font-['JetBrains_Mono'] text-xs uppercase leading-relaxed tracking-[0.14em] text-[#111827]">
                {u.units.join('   ·   ')}
              </div>
            )}
            {u.facilities && u.facilities.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-600">
                {u.facilities.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C]" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="mt-4 max-w-md text-sm italic text-neutral-500">
            Full details are shared once the design is approved. Register your interest and we will call you first.
          </p>
        )}
      </div>

      <div className="md:col-span-3 md:text-right">
        <LeadLink project={u} kind="upcoming" className={linkCls}>
          Register your interest →
        </LeadLink>
      </div>
    </Reveal>
  );
}

function Upcoming() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <ul className="divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
        {upcoming.map((u) => (
          <li key={u.id}>
            <UpcomingRow u={u} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- the section ---------------- */
export default function PortfolioSection() {
  const flagships = projects.filter((p) => p.flagship);
  const others = projects.filter((p) => !p.flagship);
  const shown = others.slice(0, 4);
  const extra = projects.length - flagships.length - shown.length;

  return (
    <section
      id="projects"
      className="relative"
      style={{ background: 'linear-gradient(to bottom, #F6F8F5 0%, #EDF4EC 40%, #F3EFE6 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
        <Eyebrow>Our projects</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-6xl">
          Places we are building, and places already lived in.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-[1.8] text-neutral-600 sm:text-lg">
          Each one drawn, engineered and built by our own team. Walk through them, then ask us about the one that feels
          like yours.
        </p>
      </div>

      {flagships.length > 0 && (
        <DarkBand id="signature" className="mt-6">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Eyebrow dark>Signature projects</Eyebrow>
            <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#F3EFE6] sm:text-5xl">
              The work we are proudest of.
            </h3>
          </div>
          <div className="mt-8 grid gap-10">
            {flagships.map((p, i) => (
              <Signature key={p.id} project={p} index={i} />
            ))}
          </div>
        </DarkBand>
      )}

      {shown.length > 0 && (
        <div className="pb-6 pt-16">
          <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
            <Eyebrow>More of our work</Eyebrow>
            <p className="mt-3 max-w-xl text-neutral-600">Move over a project to open it.</p>
          </div>
          <Panels items={shown} extra={extra} />
        </div>
      )}

      <Interiors />

      <div className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 pb-2 pt-20 sm:px-8">
          <Eyebrow>Opening soon</Eyebrow>
          <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl">
            New addresses are close.
          </h3>
          <p className="mt-4 max-w-xl text-neutral-600">
            Tell us you are interested and we will reach you first.
          </p>
        </div>
        <div className="mt-6">
          <Upcoming />
        </div>
      </div>
    </section>
  );
}
```

---

## File: `client/src/components/portfolio/ProjectPage.jsx`
```javascript
// client/src/components/portfolio/ProjectPage.jsx
// Route: /projects/:slug  (one full page per project)
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  projects,
  getProject,
  coverOf,
  CHAPTERS,
  CHAPTER_ORDER,
  ARCHITECT,
  CONTACT,
  BRAND,
} from '../../data/portfolio';
import { scrollToEl } from '../../lib/scroll';
import Lightbox from './Lightbox';
import {
  BlendedPhoto,
  Shot,
  Frame,
  HStrip,
  Eyebrow,
  TypeTag,
  Reveal,
  Facts,
  LeadLink,
  ActionRow,
  DarkBand,
  StickyBar,
  linkCls,
  quietCls,
  featherMask,
} from './shared';

/* Each chapter gets its own look, so the page never repeats itself */
const TR = {
  exterior: ['carved', 'duotone', 'blur'],
  interior: ['arch', 'duotone', 'notch', 'blur'],
  balcony: ['notch', 'blur', 'duotone'],
  views: ['blur', 'duotone', 'notch'],
};
const tr = (k, i) => TR[k][i % TR[k].length];

/* ---------------- chapter layouts ---------------- */
function ExteriorChapter({ photos, open }) {
  const [main, ...rest] = photos;
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-4 px-5 sm:px-8 md:grid-cols-12 md:gap-6">
      <div className={rest.length ? 'md:col-span-8' : 'md:col-span-12'}>
        <Frame photo={main} onOpen={open} ratio="aspect-[16/10]" treatment="carved" />
      </div>
      {rest.length > 0 && (
        <div className="grid gap-6 md:col-span-4">
          {rest.slice(0, 2).map((p, i) => (
            <Frame key={p.src + p.caption} photo={p} onOpen={open} ratio="aspect-[4/3]" treatment={tr('exterior', i + 1)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Rooftop: the photo is split and the chapter line sits in the gap */
function RooftopChapter({ photos, open, title }) {
  const p = photos[0];
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <button
        type="button"
        onClick={() => open(p)}
        aria-label="Open rooftop photo"
        className="block aspect-[16/10] w-full cursor-zoom-in text-left md:aspect-[21/9]"
      >
        <Shot treatment="band" src={p.src} alt={p.caption || 'Rooftop'} from={40} to={62}>
          <span className="block w-full px-4 font-serif text-xl italic text-[#1B4332] sm:px-8 sm:text-3xl">
            {p.caption || title}
          </span>
        </Shot>
      </button>
      {photos.slice(1).map((ph) => (
        <div key={ph.src + ph.caption} className="mt-6">
          <Frame photo={ph} onOpen={open} ratio="aspect-[21/9]" treatment="frame" />
        </div>
      ))}
    </div>
  );
}

function StripChapter({ photos, open }) {
  return (
    <HStrip>
      {photos.map((p, i) => (
        <div key={p.src + p.caption} className="w-[72vw] flex-none snap-start sm:w-[380px]">
          <Frame photo={p} onOpen={open} ratio="aspect-[4/5]" treatment={tr('interior', i)} />
        </div>
      ))}
    </HStrip>
  );
}

function PairChapter({ photos, open, k }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
      {photos.map((p, i) => (
        <div key={p.src + p.caption} className={i % 2 ? 'md:mt-14' : ''}>
          <Frame photo={p} onOpen={open} ratio="aspect-[4/3]" treatment={tr(k, i)} />
        </div>
      ))}
    </div>
  );
}

function PlanChapter({ photos, open }) {
  const [i, setI] = useState(0);
  const p = photos[Math.min(i, photos.length - 1)];
  const m = 'radial-gradient(ellipse 96% 94% at 50% 50%, #000 70%, transparent 100%)';
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {photos.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-x-7 gap-y-2">
          {photos.map((ph, idx) => (
            <button
              key={ph.src + ph.caption}
              type="button"
              onClick={() => setI(idx)}
              className={`border-b-2 pb-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] transition ${
                idx === i ? 'border-[#C6F00C] text-[#111827]' : 'border-transparent text-neutral-500 hover:text-[#1B4332]'
              }`}
            >
              {ph.caption || `Plan ${idx + 1}`}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => open(p)}
        className="block aspect-[16/10] w-full cursor-zoom-in bg-[#F6F8F5]"
        style={{ WebkitMaskImage: m, maskImage: m }}
        aria-label="Open floor plan"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={p.src}
            src={p.src}
            alt={p.caption || 'Floor plan'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </AnimatePresence>
      </button>
    </div>
  );
}

function ChapterHead({ n, keyName, note }) {
  const c = CHAPTERS[keyName];
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
      <Eyebrow>
        {String(n).padStart(2, '0')} · {c.label}
      </Eyebrow>
      <h2 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#111827] sm:text-5xl">
        {c.title}
      </h2>
      {note && <p className="mt-4 max-w-xl text-neutral-600">{note}</p>}
    </div>
  );
}

/* floating index of chapters (large screens) */
function ChapterIndex({ chapters, hasUnits }) {
  const ids = [...chapters.map((c) => c.key), ...(hasUnits ? ['units'] : [])];
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('ch-', ''));
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((k) => {
      const el = document.getElementById(`ch-${k}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);

  return (
    <nav aria-label="Project chapters" className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
      {ids.map((k) => (
        <button key={k} type="button" onClick={() => scrollToEl(`#ch-${k}`, -80)} className="group flex items-center gap-3">
          <span
            className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] transition ${
              active === k ? 'text-[#1B4332] opacity-100' : 'text-neutral-500 opacity-0 group-hover:opacity-100'
            }`}
          >
            {k === 'units' ? 'Available' : CHAPTERS[k].label}
          </span>
          <span
            className={`h-2 w-2 rounded-full transition ${
              active === k ? 'bg-[#C6F00C] ring-4 ring-[#C6F00C]/30' : 'bg-[#1B4332]/25 group-hover:bg-[#1B4332]/60'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  const m = featherMask('center');
  return (
    <div className="h-48 w-40 shrink-0" style={{ WebkitMaskImage: m, maskImage: m }}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-[#3A2B23] font-['Space_Grotesk'] text-4xl font-bold text-[#C6F00C]">
          HA
        </div>
      ) : (
        <img src={ARCHITECT.photo} alt={ARCHITECT.name} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      )}
    </div>
  );
}

/* ---------------- the page ---------------- */
function ProjectView({ project }) {
  const [lb, setLb] = useState(-1);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowBar(v > window.innerHeight * 0.7));

  const chapters = CHAPTER_ORDER.map((k) => ({
    key: k,
    photos: project.photos.filter((p) => p.chapter === k),
  })).filter((c) => c.photos.length);
  const all = chapters.flatMap((c) => c.photos);
  const open = (photo) => setLb(Math.max(0, all.indexOf(photo)));

  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];
  const units = project.units || [];
  const hasUnits = units.length > 0;
  const showUnits = hasUnits || project.status === 'active';

  const renderChapter = (c) => {
    switch (c.key) {
      case 'exterior':
        return <ExteriorChapter photos={c.photos} open={open} />;
      case 'rooftop':
        return <RooftopChapter photos={c.photos} open={open} title={CHAPTERS.rooftop.title} />;
      case 'interior':
        return <StripChapter photos={c.photos} open={open} />;
      case 'plan':
        return <PlanChapter photos={c.photos} open={open} />;
      default:
        return <PairChapter photos={c.photos} open={open} k={c.key} />;
    }
  };

  return (
    <main className="relative" style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 22%, #EDF4EC 60%, #F6F8F5 100%)' }}>
      {/* opening frame */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={BRAND.emblem}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-[6%] bottom-[-6%] z-0 w-[460px] select-none opacity-[0.07] md:w-[560px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute right-0 top-[8%] z-[1] h-[82%] w-full opacity-45 md:w-[72%] md:opacity-100">
          <BlendedPhoto src={coverOf(project)} alt={project.title} side="right" drift className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 md:pt-44">
          <Link
            to="/projects"
            className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
          >
            ← All projects
          </Link>
          <div className="mt-8 max-w-2xl">
            <TypeTag type={project.type} status={project.status} />
            <h1 className="mt-5 font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 font-serif text-2xl italic leading-snug text-[#1B4332]/85 sm:text-3xl">{project.line}</p>
            <Facts
              className="mt-10"
              items={[
                { k: 'Location', v: project.address || project.area },
                { k: 'Floors', v: project.floors },
                { k: 'Construction started', v: project.started },
                { k: 'Architect', v: ARCHITECT.name },
              ]}
            />
            <ActionRow project={project} explore={false} className="mt-10" />
          </div>
        </div>
      </section>

      <ChapterIndex chapters={chapters} hasUnits={showUnits} />

      {/* photo chapters */}
      {chapters.map((c, i) => (
        <section key={c.key} id={`ch-${c.key}`} className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <ChapterHead n={i + 1} keyName={c.key} note={project.notes?.[c.key]} />
          </Reveal>
          {renderChapter(c)}
        </section>
      ))}

      {/* available units */}
      {showUnits && (
        <section id="ch-units" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Eyebrow>Available units</Eyebrow>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
              Find the one that fits you.
            </h2>
            {hasUnits ? (
              <ul className="mt-10 divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
                {units.map((u) => (
                  <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 py-5">
                    <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.16em] text-[#111827] sm:text-sm">
                      {u.id} · {u.label} · {u.size} · {u.floor}
                    </span>
                    <LeadLink project={project} unit={u} className={linkCls}>
                      Ask about this unit →
                    </LeadLink>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mt-8 max-w-xl text-neutral-600">
                  Everything is reserved for now. Tell us what you are looking for and we will keep you first in line.
                </p>
                <div className="mt-6">
                  <LeadLink project={project} className={linkCls}>
                    Join the waiting list →
                  </LeadLink>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* architect, on espresso */}
      <DarkBand className="my-10">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-start gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
          <Portrait />
          <div>
            <Eyebrow dark>{ARCHITECT.role}</Eyebrow>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-[#F3EFE6] sm:text-3xl">
              “{project.architectLine || ARCHITECT.line}”
            </p>
            <div className="mt-4 font-['Space_Grotesk'] text-base font-bold text-[#C6F00C]">{ARCHITECT.name}</div>
          </div>
        </Reveal>
      </DarkBand>

      {/* closing frame */}
      <section className="px-5 pb-28 pt-12 sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-6xl">
            Ask about {project.title}.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-neutral-600">
            Message us on WhatsApp or call. We reply personally, and we will gladly arrange a visit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <LeadLink project={project} className={linkCls}>
              Chat on WhatsApp →
            </LeadLink>
            {CONTACT.hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className={quietCls}>
                {h.display}
              </a>
            ))}
          </div>
          <div className="mt-16 border-t border-[#1B4332]/15 pt-8">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500">Next project</div>
            <Link
              to={`/projects/${next.slug}`}
              className="mt-2 inline-block font-['Space_Grotesk'] text-2xl font-bold text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-8"
            >
              {next.title} →
            </Link>
          </div>
        </Reveal>
      </section>

      <StickyBar project={project} show={showBar} />

      <AnimatePresence>
        {lb >= 0 && <Lightbox photos={all} index={lb} onChange={setLb} onClose={() => setLb(-1)} />}
      </AnimatePresence>
    </main>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-['Space_Grotesk'] text-4xl font-extrabold text-[#111827]">We could not find that project.</h1>
        <Link to="/projects" className={`${linkCls} mt-6`}>
          See all projects →
        </Link>
      </main>
    );
  }
  return <ProjectView key={project.id} project={project} />;
}
```

---

## File: `client/src/components/portfolio/shared.jsx`
```javascript
// client/src/components/portfolio/shared.jsx
// Shared building blocks: image treatments, buttons, small pieces used across the site.
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { waLink, projectMessage, trackLead } from '../../lib/leads';
import { CONTACT, ESPRESSO, TYPE_LABEL, STATUS_LABEL } from '../../data/portfolio';

export const CANVAS = '#FAF8F5';
export { ESPRESSO };

/* ------------------------------------------------------------------ */
/* Buttons and links (soft tone, one filled button per scene)          */
/* ------------------------------------------------------------------ */
const base = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300';
export const btnPrimary = `${base} bg-[#1B4332] text-white shadow-[0_10px_24px_-12px_rgba(27,67,50,0.8)] hover:-translate-y-0.5 hover:bg-[#14331f]`;
export const btnOutline = `${base} border border-[#1B4332]/30 text-[#1B4332] hover:border-[#C6F00C] hover:bg-[#C6F00C]/25`;
export const btnRound =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1B4332]/25 text-[#1B4332] transition duration-300 hover:-translate-y-0.5 hover:border-[#C6F00C] hover:bg-[#C6F00C]';
export const btnPrimaryDark = `${base} bg-[#F3EFE6] text-[#2A1F1A] hover:-translate-y-0.5 hover:bg-white`;
export const btnOutlineDark = `${base} border border-[#C6F00C]/60 text-[#F3EFE6] hover:bg-[#C6F00C]/15`;
export const btnRoundDark =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[#F3EFE6] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C6F00C] hover:text-[#2A1F1A]';

export const linkCls =
  'text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[6px] hover:decoration-[#1B4332] transition';
export const quietCls =
  'text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-[#1B4332] hover:decoration-[#1B4332] transition';

export function CallIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

/* WhatsApp link that carries the project / unit reference and logs the tap */
export function LeadLink({ project, unit, kind = 'project', className = linkCls, children, ...rest }) {
  return (
    <a
      href={waLink(projectMessage(project, unit, kind))}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackLead({ channel: 'whatsapp', kind, projectId: project?.id, unitId: unit?.id })}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

export function CallLink({ project, className = quietCls, children, ...rest }) {
  const h = CONTACT.hotlines[0];
  return (
    <a
      href={`tel:${h.tel}`}
      onClick={() => trackLead({ channel: 'call', projectId: project?.id })}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Explore (outline) · Ask (main) · Call (round) */
export function ActionRow({ project, dark = false, explore = true, kind = 'project', className = '' }) {
  const p = dark ? btnPrimaryDark : btnPrimary;
  const o = dark ? btnOutlineDark : btnOutline;
  const r = dark ? btnRoundDark : btnRound;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {explore && (
        <Link to={`/projects/${project.slug}`} className={o}>
          Explore this project →
        </Link>
      )}
      <LeadLink project={project} kind={kind} className={p}>
        <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
        Ask about this {kind === 'interior' ? 'interior' : 'project'}
      </LeadLink>
      <CallLink project={project} className={r} aria-label="Call us">
        <CallIcon />
      </CallLink>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small text pieces                                                   */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children, className = '', dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] ${
        dark ? 'text-[#C6F00C]' : 'text-[#1B4332]'
      } ${className}`}
    >
      <span className="h-[2px] w-8 bg-[#C6F00C]" />
      {children}
    </span>
  );
}

export function TypeTag({ type, status, dark = false }) {
  const parts = [type && TYPE_LABEL[type], status && STATUS_LABEL[status]].filter(Boolean);
  return <Eyebrow dark={dark}>{parts.join(' · ')}</Eyebrow>;
}

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export function Facts({ items, className = '', dark = false }) {
  const list = items.filter((i) => i.v);
  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {list.map((i) => (
        <div key={i.k}>
          <dt
            className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] ${
              dark ? 'text-white/50' : 'text-neutral-500'
            }`}
          >
            {i.k}
          </dt>
          <dd className={`mt-1 font-['Space_Grotesk'] text-sm font-semibold ${dark ? 'text-[#F3EFE6]' : 'text-[#111827]'}`}>
            {i.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Espresso band with slanted top and bottom edges                      */
/* ------------------------------------------------------------------ */
export function DarkBand({ children, className = '', id, bg }) {
  return (
    <div
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: bg || `radial-gradient(ellipse 80% 60% at 20% 0%, #3A2B23 0%, ${ESPRESSO} 60%, #1E1612 100%)`,
        clipPath: 'polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)',
        paddingTop: '8vw',
        paddingBottom: '8vw',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Butterfly                                                           */
/* ------------------------------------------------------------------ */
export function Flutter({ hue = '#C6F00C', size = 34, className = '' }) {
  const reduce = useReducedMotion();
  const flap = reduce ? undefined : { scaleX: [1, 0.2, 1] };
  const t = { duration: 0.42, repeat: Infinity, ease: 'easeInOut' };
  return (
    <svg aria-hidden viewBox="0 0 100 100" width={size} height={size} className={className} style={{ overflow: 'visible' }}>
      <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'right center' }} animate={flap} transition={t}>
        <path d="M50 48 C30 10, 4 14, 8 40 C10 58, 34 62, 50 52 Z" fill={hue} opacity="0.9" />
        <path d="M50 54 C32 58, 14 74, 26 86 C38 94, 48 72, 50 58 Z" fill={hue} opacity="0.7" />
        <circle cx="24" cy="36" r="4" fill="#1B4332" opacity="0.5" />
      </motion.g>
      <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} animate={flap} transition={t}>
        <path d="M50 48 C70 10, 96 14, 92 40 C90 58, 66 62, 50 52 Z" fill={hue} opacity="0.9" />
        <path d="M50 54 C68 58, 86 74, 74 86 C62 94, 52 72, 50 58 Z" fill={hue} opacity="0.7" />
        <circle cx="76" cy="36" r="4" fill="#1B4332" opacity="0.5" />
      </motion.g>
      <rect x="48.5" y="40" width="3" height="26" rx="1.5" fill="#111827" />
      <path d="M50 40 C46 30, 42 28, 40 26 M50 40 C54 30, 58 28, 60 26" stroke="#111827" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */
export const featherMask = (side = 'right') => {
  const x = side === 'left' ? 38 : side === 'center' ? 50 : 62;
  return `radial-gradient(ellipse 78% 72% at ${x}% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)`;
};

/* An image that never shows the broken-image icon: falls back to a soft tint */
export function Pic({ src, alt = '', className = '', fallback, ...rest }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) {
    return (
      <div
        aria-hidden
        className={className}
        style={{ background: fallback || 'linear-gradient(135deg,#DCE9DA 0%,#EDF4EC 100%)' }}
      />
    );
  }
  return <motion.img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} {...rest} />;
}

const Tint = ({ op = 0.55 }) => (
  <div
    aria-hidden
    className="absolute inset-0 mix-blend-soft-light"
    style={{ background: 'linear-gradient(120deg, #EDF4EC 0%, #F3EFE6 100%)', opacity: op }}
  />
);

/* the image itself: fills its parent, drifts with scroll, optional slow zoom */
function Parallax({ src, alt, drift = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, position: 'absolute', left: 0, right: 0, top: '-6%', bottom: '-6%' }}>
        <motion.div
          className="h-full w-full"
          animate={drift && !reduce ? { scale: [1, 1.06, 1] } : undefined}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Pic
            src={src}
            alt={alt}
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* 1. Feather: dissolves into the page (the hero's signature) */
export function BlendedPhoto({ src, alt = '', side = 'right', className = '', fade = true, drift = false }) {
  const m = featherMask(side);
  return (
    <div className={`relative ${className}`} style={{ WebkitMaskImage: m, maskImage: m }}>
      <Parallax src={src} alt={alt} drift={drift} />
      <Tint />
      {fade && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to ${side === 'left' ? 'left' : 'right'}, ${CANVAS} 0%, ${CANVAS}CC 22%, transparent 55%)`,
          }}
        />
      )}
    </div>
  );
}

/* 2. Arch: crisp architectural arch with an offset lime outline */
function Arch({ src, alt, className = '', drift }) {
  const r = '9999px 9999px 0 0';
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-[#C6F00C]" style={{ borderRadius: r }} />
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: r }}>
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
    </div>
  );
}

/* 3. Notch: all four corners cut at an angle */
function Notch({ src, alt, className = '', drift }) {
  return (
    <div className={`relative h-full w-full ${className}`} style={{ filter: 'drop-shadow(0 24px 28px rgba(27,67,50,0.28))' }}>
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ clipPath: 'polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 56px 100%, 0 calc(100% - 56px))' }}
      >
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
    </div>
  );
}

/* 4. Carved: a rectangular bite is cut from one corner. Put text in the bite (children). */
const BITES = {
  bl: { poly: (w, h) => `polygon(0 0,100% 0,100% 100%,${w}% 100%,${w}% ${100 - h}%,0 ${100 - h}%)`, pos: { left: 0, bottom: 0 } },
  br: { poly: (w, h) => `polygon(0 0,100% 0,100% ${100 - h}%,${100 - w}% ${100 - h}%,${100 - w}% 100%,0 100%)`, pos: { right: 0, bottom: 0 } },
  tl: { poly: (w, h) => `polygon(${w}% 0,100% 0,100% 100%,0 100%,0 ${h}%,${w}% ${h}%)`, pos: { left: 0, top: 0 } },
  tr: { poly: (w, h) => `polygon(0 0,${100 - w}% 0,${100 - w}% ${h}%,100% ${h}%,100% 100%,0 100%)`, pos: { right: 0, top: 0 } },
};
function Carved({ src, alt, corner = 'bl', w = 44, h = 34, children, className = '', drift }) {
  const b = BITES[corner] || BITES.bl;
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0" style={{ filter: 'drop-shadow(0 22px 26px rgba(27,67,50,0.26))' }}>
        <div className="relative h-full w-full overflow-hidden" style={{ clipPath: b.poly(w, h) }}>
          <Parallax src={src} alt={alt} drift={drift} />
          <Tint />
        </div>
      </div>
      {children && (
        <div className="absolute flex flex-col justify-end" style={{ ...b.pos, width: `${w}%`, height: `${h}%` }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* 5. Band: the photo is split by a gap through the middle. Put text in the gap (children). */
function Band({ src, alt, from = 38, to = 64, children, className = '', drift }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 ${100 - from}% 0 round 18px)` }}>
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(${to}% 0 0 0 round 18px)` }}>
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
      <div className="absolute inset-x-0 flex items-center" style={{ top: `${from}%`, height: `${to - from}%` }}>
        {children}
      </div>
    </div>
  );
}

/* 6. Film frame: crop marks around a wide still */
function FilmFrame({ src, alt, className = '', drift }) {
  const mark = 'absolute h-5 w-5 border-[#C6F00C]';
  return (
    <div className={`relative h-full w-full p-3 ${className}`}>
      <span aria-hidden className={`${mark} left-0 top-0 border-l-2 border-t-2`} />
      <span aria-hidden className={`${mark} right-0 top-0 border-r-2 border-t-2`} />
      <span aria-hidden className={`${mark} bottom-0 left-0 border-b-2 border-l-2`} />
      <span aria-hidden className={`${mark} bottom-0 right-0 border-b-2 border-r-2`} />
      <div className="relative h-full w-full overflow-hidden">
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint op={0.4} />
      </div>
    </div>
  );
}

/* 7. Blur: soft and out of focus until you hover */
function BlurShot({ src, alt, className = '', drift }) {
  return (
    <div className={`sm-blur relative h-full w-full overflow-hidden rounded-2xl ${className}`}>
      <Parallax src={src} alt={alt} drift={drift} />
      <Tint op={0.4} />
    </div>
  );
}

/* 8. Duotone: filtered in the espresso tone, colour returns on hover */
function Duotone({ src, alt, className = '', drift }) {
  return (
    <div className={`sm-duo relative h-full w-full overflow-hidden rounded-2xl ${className}`}>
      <Parallax src={src} alt={alt} drift={drift} />
    </div>
  );
}

/* 9. Circle: a round lens */
function Circle({ src, alt, className = '', drift }) {
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-full ring-2 ring-[#C6F00C] ${className}`}>
      <Parallax src={src} alt={alt} drift={drift} />
      <Tint op={0.4} />
    </div>
  );
}

const FeatherShot = ({ src, alt, side = 'center', fade = false, className = '', drift }) => (
  <BlendedPhoto src={src} alt={alt} side={side} fade={fade} drift={drift} className={`h-full w-full ${className}`} />
);

const SHOTS = {
  feather: FeatherShot,
  arch: Arch,
  notch: Notch,
  carved: Carved,
  band: Band,
  frame: FilmFrame,
  blur: BlurShot,
  duotone: Duotone,
  circle: Circle,
};

/* One entry point:  <Shot treatment="arch" src=... />  ; `children` is the text for carved / band */
export function Shot({ treatment = 'feather', ...props }) {
  const T = SHOTS[treatment] || FeatherShot;
  return <T {...props} />;
}

/* Rising slices: one photo cut into vertical strips that rise into place */
function Slice({ i, count, top, lift, progress, src }) {
  const y = useTransform(progress, [0, 1], [lift, 0]);
  return (
    <motion.div
      style={{ y, clipPath: `inset(${top}% 0 0 0)`, background: 'linear-gradient(180deg,#DCE9DA,#C9DCC6)' }}
      className="relative h-full flex-1 overflow-hidden"
    >
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="absolute top-0 h-full max-w-none object-cover"
        style={{ width: `${count * 100}%`, left: `-${i * 100}%` }}
      />
      <Tint op={0.45} />
    </motion.div>
  );
}

export function Slices({ src, count = 4, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const tops = [20, 0, 30, 10];
  const lifts = [110, 50, 140, 80];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  return (
    <div ref={ref} className={`relative flex gap-2 sm:gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Slice
          key={i}
          i={i}
          count={count}
          top={tops[i % tops.length]}
          lift={reduce ? 0 : lifts[i % lifts.length]}
          progress={scrollYProgress}
          src={src}
        />
      ))}
    </div>
  );
}

/* A clickable photo with a caption (opens the lightbox) */
export function Frame({ photo, onOpen, ratio = 'aspect-[4/3]', caption = true, treatment = 'feather' }) {
  const bite = treatment === 'carved';
  return (
    <figure>
      <button
        type="button"
        onClick={() => onOpen(photo)}
        aria-label={`Open photo: ${photo.caption || 'project photo'}`}
        className={`block w-full cursor-zoom-in text-left ${ratio}`}
      >
        <Shot src={photo.src} alt={photo.caption || ''} treatment={treatment} corner="br" w={40} h={22}>
          {bite && photo.caption && (
            <span className="block pl-4 pt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-600">
              {photo.caption}
              <span className="mt-1 block text-[#1B4332]">View larger +</span>
            </span>
          )}
        </Shot>
      </button>
      {caption && !bite && photo.caption && (
        <figcaption className="mt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-500">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* A horizontal strip with arrow buttons (scrolls natively, also by swipe) */
export function HStrip({ children }) {
  const ref = useRef(null);
  const by = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.min(520, el.clientWidth * 0.8), behavior: 'smooth' });
  };
  return (
    <div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-3 flex justify-end gap-3 px-5 sm:px-8">
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => by(d)}
            aria-label={d < 0 ? 'Previous' : 'Next'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1B4332]/25 text-[#1B4332] transition hover:border-[#C6F00C] hover:bg-[#C6F00C]/30"
          >
            {d < 0 ? '←' : '→'}
          </button>
        ))}
      </div>
    </div>
  );
}

/* The quiet floating bar on project pages */
export function StickyBar({ project, kind = 'project', show }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-auto flex items-center gap-5 rounded-full border border-[#1B4332]/15 bg-white/85 px-5 py-2.5 shadow-lg backdrop-blur"
          >
            <span className="font-['Space_Grotesk'] text-sm font-bold text-[#111827]">{project.title}</span>
            <LeadLink project={project} kind={kind} className="flex items-center gap-2 text-sm font-medium text-[#1B4332]">
              <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/30" />
              WhatsApp
            </LeadLink>
            <CallLink project={project} className="text-sm text-neutral-600 hover:text-[#1B4332]">
              Call
            </CallLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## File: `client/src/lib/leads.js`
```js
// client/src/lib/leads.js
// WhatsApp / call links that carry a project (and unit) reference, plus click logging.
import { CONTACT } from '../data/portfolio';

export const waLink = (message, number = CONTACT.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export function projectMessage(project, unit, kind = 'project') {
  if (kind === 'upcoming') {
    return `Hello Space Maker, I would like to register my interest in your upcoming project in ${project.area}. Ref: UP-${project.id}`;
  }
  if (kind === 'interior') {
    return `Hello Space Maker, I would like to know more about your interior work: ${project.title}. Ref: ${project.ref}`;
  }
  if (unit) {
    return `Hello Space Maker, I am interested in unit ${unit.id} (${unit.label}, ${unit.size}) at ${project.title}, ${project.area}. Ref: ${project.ref}-${unit.id}`;
  }
  return `Hello Space Maker, I would like to know more about ${project.title}, ${project.area}. Ref: ${project.ref}`;
}

export function landMessage(f) {
  return [
    'Hello Space Maker, I would like a feasibility study for my land.',
    f.name && `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    f.location && `Plot location: ${f.location}`,
    f.size && `Plot size: ${f.size}`,
    f.notes && `Notes: ${f.notes}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/* Logs every WhatsApp / call tap.
   Set VITE_LEADS_URL in client/.env and each tap is POSTed there (n8n webhook or your API).
   Without it, taps are only printed in the browser console during development. */
export function trackLead(payload) {
  try {
    const body = JSON.stringify({
      ...payload,
      at: new Date().toISOString(),
      page: window.location.pathname,
    });
    const url = import.meta.env.VITE_LEADS_URL;
    if (url && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } else if (import.meta.env.DEV) {
      console.debug('[lead]', body);
    }
  } catch {
    /* never block the visitor */
  }
}
```

---

## File: `client/src/lib/scroll.js`
```js
// client/src/lib/scroll.js
// Works with Lenis when it is running, and falls back to normal smooth scrolling.
export function scrollToEl(target, offset = -90) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return false;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  return true;
}

export function scrollTop() {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
```

---

## File: `client/src/data/portfolio.js`
```js
// client/src/data/portfolio.js
// ONE source of truth for the portfolio. Later the admin panel fills this same shape.
// Everything marked PLACEHOLDER / SAMPLE is sample content: replace it with your real details.
// To add a commercial or hospital building, add a project with  type: 'commercial'  (or 'hospital').

const U = (id, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* demo photo ids (swap for your real uploads) */
const EXT1 = '1600585154340-be6161a56a0c';
const EXT2 = '1545324418-cc1a3fa10c00';
const EXT3 = '1512917774080-9991f1c4c750';
const EXT4 = '1600607687939-ce8a6c25118c';
const INT1 = '1618221195710-dd6b41faaea6';
const INT2 = '1616486338812-3dadae4b4ace';
const INT3 = '1616594039964-ae9021a400a0';
const INT4 = '1584622650111-993a426fbf0a';
const PLAN = '1503387762-592deb58ef4e';
const PLAN2 = '1600585154526-990dced4db0d';
const SITE = '1541888946425-d0fbb18615f7';

export const ESPRESSO = '#2A1F1A';

export const BRAND = {
  icon: '/assets/00_brand/logo-icon.png',
  emblem: '/assets/00_brand/emblem-watermark.svg',
};

export const CONTACT = {
  whatsapp: '8801916100416', // main WhatsApp number (digits only)
  hotlines: [
    { label: 'Head office hotline', display: '+880 1916-100416', tel: '+8801916100416' },
    // PLACEHOLDER: add your second hotline here, for example:
    // { label: 'Hotline 2', display: '+880 1XXX-XXXXXX', tel: '+8801XXXXXXXXX' },
  ],
  email: 'spacemakerbd@gmail.com',
  messenger: 'https://m.me/spacemakerbd',
  offices: [
    { name: 'Corporate Office', address: 'House 405, Road 29, Mohakhali DOHS, Dhaka' },
    { name: 'Jalshiri Operations', address: 'House 22, Road 505A, Sector 16, Jalshiri Abashon, Dhaka' },
  ],
};

export const GENERAL_MESSAGE =
  'Hello Space Maker, I would like to arrange a private visit to see your projects.';

export const ARCHITECT = {
  name: 'Hasib Uddin Ahmed',
  role: 'Principal Architect',
  // save his photo here: client/public/assets/people/hasib-uddin-ahmed.jpg
  photo: '/assets/people/hasib-uddin-ahmed.jpg',
  // DRAFT line for his approval. Each project can override it with `architectLine`.
  line: 'I start with where the sun falls and where the breeze enters. The building follows.',
};

export const STATUS_LABEL = {
  active: 'Under construction',
  completed: 'Handed over',
  upcoming: 'Opening soon',
};

/* Tags. Change a project's `type` and every label on the site follows. */
export const TYPE_LABEL = {
  residential: 'Residential',
  commercial: 'Commercial',
  hospital: 'Hospital',
};

/* photo chapters shown on a project page, in this order */
export const CHAPTER_ORDER = ['exterior', 'rooftop', 'interior', 'balcony', 'views', 'plan'];
export const CHAPTERS = {
  exterior: { label: 'Exterior', title: 'Where it meets the street and the sky.' },
  rooftop: { label: 'Rooftop', title: 'A place above the city to unwind.' },
  interior: { label: 'Interior', title: 'Rooms that hold light and quiet.' },
  balcony: { label: 'Balcony & terrace', title: 'Morning tea, evening air.' },
  views: { label: 'Views & surroundings', title: 'What you see, and what is close by.' },
  plan: { label: 'Floor plans', title: 'Every square foot, thoughtfully drawn.' },
};

/* ------------------------------------------------------------------ */
/* PROJECTS. flagship: true -> signature scene, shown first             */
/* type: 'residential' | 'commercial' | 'hospital'                      */
/* status: 'active' | 'completed'                                       */
/* photos: [{ chapter, src, caption? }]                                 */
/* units: only AVAILABLE units. Prices stay private.                    */
/*   { id, label ('4 bed' / 'Office floor'), size, floor }              */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    id: 'form-space',
    slug: 'form-and-space',
    ref: 'FS',
    title: 'FORM & SPACE',
    type: 'residential',
    flagship: true,
    status: 'active',
    area: 'Jolshiri Abashon',
    address: 'Plot 13A-501-025, Sector 13, Jolshiri Abashon, Dhaka',
    floors: 'G+M+8',
    started: 'March 2026', // PLACEHOLDER: replace with the real start month and year
    line: 'Morning light across the living room, and a rooftop made for evenings.',
    notes: {
      views: 'Open sky on both sides, with Jolshiri Abashon’s calm streets just below.',
    },
    photos: [
      { chapter: 'exterior', src: U(EXT1), caption: 'Street elevation' },
      { chapter: 'exterior', src: U(EXT3, 1200), caption: 'Entrance' },
      { chapter: 'exterior', src: U(EXT2, 1200), caption: 'Evening facade' },
      { chapter: 'rooftop', src: U(EXT4), caption: 'Rooftop community terrace' },
      { chapter: 'interior', src: U(INT1, 1200), caption: 'Living lounge' },
      { chapter: 'interior', src: U(INT2, 1200), caption: 'Dining and kitchen' },
      { chapter: 'interior', src: U(INT3, 1200), caption: 'Master bedroom' },
      { chapter: 'interior', src: U(INT4, 1200), caption: 'Spa bathroom' },
      { chapter: 'balcony', src: U(EXT2, 1200), caption: 'Living room balcony' },
      { chapter: 'balcony', src: U(INT1, 1200), caption: 'Master terrace' },
      { chapter: 'views', src: U(EXT3, 1200), caption: 'Street side view' },
      { chapter: 'views', src: U(EXT1, 1200), caption: 'Open sky to the east' },
      { chapter: 'plan', src: U(PLAN), caption: 'Type B · 4 bed' },
      { chapter: 'plan', src: U(PLAN2), caption: 'Type C · 3 bed' },
    ],
    // PLACEHOLDER units: replace with your real available units
    units: [
      { id: 'B-4', label: '4 bed', size: '2,150 sq ft', floor: '7th floor' },
      { id: 'C-2', label: '3 bed', size: '1,780 sq ft', floor: '4th floor' },
    ],
  },
  {
    id: 'moon-residence',
    slug: 'moon-residence',
    ref: 'MR',
    title: 'Moon Residence',
    type: 'residential',
    flagship: true,
    status: 'completed',
    area: 'Dinajpur Central',
    address: '8 Katha, Dinajpur Central',
    floors: '10-storied, mixed use',
    started: null,
    line: 'Finished, handed over, and already lived in.',
    photos: [
      { chapter: 'exterior', src: U(EXT3), caption: 'Facade' },
      { chapter: 'exterior', src: U(EXT2, 1200), caption: 'Commercial atrium' },
      { chapter: 'interior', src: U(INT1, 1200), caption: 'Living lounge' },
      { chapter: 'interior', src: U(INT3, 1200), caption: 'Bedroom' },
      { chapter: 'plan', src: U(PLAN), caption: 'Typical floor' },
    ],
    units: [],
  },
  {
    id: 'platinum-kusumbag',
    slug: 'platinum-kusumbag',
    ref: 'PK',
    title: 'Platinum Kusumbag',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Sabujbag',
    address: '10 Katha, Sabujbag, Dhaka',
    floors: '10-storied',
    started: 'January 2026', // PLACEHOLDER
    line: 'Ten floors of calm, tucked into Sabujbag.',
    photos: [
      { chapter: 'exterior', src: U(EXT2), caption: 'Facade' },
      { chapter: 'exterior', src: U(EXT1, 1200), caption: 'Approach' },
      { chapter: 'interior', src: U(INT2, 1200), caption: 'Dining' },
      { chapter: 'interior', src: U(INT3, 1200), caption: 'Bedroom' },
      { chapter: 'plan', src: U(PLAN2), caption: 'Typical floor' },
    ],
    units: [{ id: 'A-3', label: '3 bed', size: '1,650 sq ft', floor: '5th floor' }], // PLACEHOLDER
  },
  {
    id: 'marchent-mahua',
    slug: 'marchent-mahua',
    ref: 'MM',
    title: 'Marchent Mahua',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Jolshiri, Sector 16',
    address: '5 Katha, Sector 16, Jolshiri Abashon, Dhaka',
    floors: '9-storied',
    started: 'May 2026', // PLACEHOLDER
    line: 'A quiet tower in the green of Jolshiri.',
    photos: [
      { chapter: 'exterior', src: U(EXT4), caption: 'Facade' },
      { chapter: 'interior', src: U(INT1, 1200), caption: 'Living lounge' },
      { chapter: 'plan', src: U(PLAN), caption: 'Typical floor' },
    ],
    units: [],
  },
  {
    id: 'rayer-bazar',
    slug: 'rayer-bazar',
    ref: 'RB',
    title: 'Rayer Bazar Residential',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Rayer Bazar',
    address: 'Rayer Bazar, Dhaka',
    floors: 'G+13',
    started: 'July 2026', // PLACEHOLDER
    line: 'A boutique address at the edge of Dhanmondi.',
    photos: [
      { chapter: 'exterior', src: U(EXT1), caption: 'Facade' },
      { chapter: 'interior', src: U(INT4, 1200), caption: 'Bathroom' },
      { chapter: 'plan', src: U(PLAN2), caption: 'Typical floor' },
    ],
    units: [],
  },
  {
    // SAMPLE: shows how a commercial building appears. Edit or delete it.
    id: 'commercial-sample',
    slug: 'commercial-tower',
    ref: 'CT',
    title: 'Commercial Tower (sample)',
    type: 'commercial',
    flagship: false,
    status: 'active',
    area: 'Dhaka',
    address: 'Location to be added',
    floors: 'G+12',
    started: 'August 2026', // SAMPLE
    line: 'A workplace designed around light, flow and a good first impression.',
    photos: [
      { chapter: 'exterior', src: U(EXT2), caption: 'Facade' },
      { chapter: 'interior', src: U(INT2, 1200), caption: 'Reception' },
      { chapter: 'plan', src: U(PLAN), caption: 'Typical office floor' },
    ],
    units: [{ id: 'F-6', label: 'Office floor', size: '3,200 sq ft', floor: '6th floor' }], // SAMPLE
  },
];

/* ------------------------------------------------------------------ */
/* INTERIOR PROJECTS. type: 'residential' | 'commercial'                */
/* Each has rooms (photo + specs) and a materials palette.              */
/* ------------------------------------------------------------------ */
export const interiorProjects = [
  {
    id: 'in-moulvibazar',
    slug: 'moulvibazar-interior',
    ref: 'IN-MV',
    title: 'Interior at Moulvibazar',
    type: 'residential',
    client: 'Laila Group',
    location: 'Moulvibazar, Sylhet',
    area: null, // PLACEHOLDER: e.g. '3,400 sq ft'
    line: 'Warm walnut, brushed brass, and light that moves through the day.',
    brief:
      'A turnkey interior for a family home. Every room was designed, joined and finished by our own team, from the cove lighting to the last brass fitting.',
    materials: [
      { name: 'Figured walnut', hex: '#5B3A29' },
      { name: 'Brushed brass', hex: '#B08D57' },
      { name: 'Chevron oak', hex: '#B88B5A' },
      { name: 'Fluted timber', hex: '#8A6A4B' },
      { name: 'Warm white', hex: '#F1ECE2' },
    ],
    rooms: [
      {
        title: 'Grand Living Lounge',
        specs: 'Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider',
        image: U(INT1, 1400),
      },
      {
        title: 'Dining & Breakfast Bar',
        specs: 'Integrated smart appliances, breakfast counter, custom joinery, laundry concealment',
        image: U(INT2, 1400),
      },
      {
        title: 'Executive Master Bedroom',
        specs: 'High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels',
        image: U(INT3, 1400),
      },
      {
        title: 'Spa Ensuite Bathroom',
        specs: 'Frameless walk-in glass shower, gold and brass fittings, circular backlit LED mirror',
        image: U(INT4, 1400),
      },
    ],
  },
  {
    // SAMPLE: replace with your real hospital interior
    id: 'in-hospital',
    slug: 'hospital-interior',
    ref: 'IN-HS',
    title: 'Hospital Interior (sample)',
    type: 'commercial',
    client: 'To be added',
    location: 'To be added',
    area: null,
    line: 'Calm, clean and easy to find your way, for patients and for the people who care for them.',
    brief:
      'Sample text. A commercial interior for a hospital: reception, patient rooms and corridors planned for calm, hygiene and clear wayfinding.',
    materials: [
      { name: 'Warm white', hex: '#F1ECE2' },
      { name: 'Soft sage', hex: '#B9CDB5' },
      { name: 'Light oak', hex: '#C9A576' },
      { name: 'Brushed steel', hex: '#A9ADB1' },
    ],
    rooms: [
      { title: 'Reception & Lobby', specs: 'Specifications to be added', image: U(INT2, 1400) },
      { title: 'Patient Room', specs: 'Specifications to be added', image: U(INT3, 1400) },
      { title: 'Corridor & Waiting', specs: 'Specifications to be added', image: U(INT1, 1400) },
    ],
  },
  {
    // SAMPLE: replace with your second residential interior
    id: 'in-residential-2',
    slug: 'residential-interior-two',
    ref: 'IN-R2',
    title: 'Residential Interior (sample)',
    type: 'residential',
    client: 'To be added',
    location: 'Dhaka',
    area: null,
    line: 'A home finished the way its family actually lives.',
    brief:
      'Sample text. A second residential interior, finished room by room with the same joinery and detailing standards.',
    materials: [
      { name: 'Walnut veneer', hex: '#5B3A29' },
      { name: 'Natural stone', hex: '#CFC6B8' },
      { name: 'Antique brass', hex: '#9C7A45' },
    ],
    rooms: [
      { title: 'Living & Dining', specs: 'Specifications to be added', image: U(INT1, 1400) },
      { title: 'Master Suite', specs: 'Specifications to be added', image: U(INT3, 1400) },
      { title: 'Kitchen', specs: 'Specifications to be added', image: U(INT2, 1400) },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* UPCOMING. Only the fields you fill in are shown.                     */
/* Share details only after signing and floor plans are done: until     */
/* then leave just `area` and `opening`.                                */
/* ------------------------------------------------------------------ */
export const upcoming = [
  {
    id: 'up-1',
    type: 'residential',
    area: 'Dhanmondi', // PLACEHOLDER area
    opening: 'Opening in November',
    line: 'A south-facing address, drawn for light.',
    image: U(EXT4, 1200),
    land: '17 katha',
    facing: 'South facing',
    floors: 'G+11',
    status: 'Submitted to RAJUK for approval', // or 'Design phase'
    resume: 'To be announced', // expected construction start
    units: ['A · 2,000 sq ft', 'B · 1,600 sq ft', 'C · 1,350 sq ft'],
    facilities: ['Guard room', 'Parking', 'Rooftop gym', 'Rooftop swimming pool'],
  },
  { id: 'up-2', type: 'residential', area: 'Uttara', opening: 'Opening in November', line: 'Details arriving soon.' },
  { id: 'up-3', type: 'residential', area: 'Bashundhara', opening: 'Opening in November', line: 'Details arriving soon.' },
];

/* ------------------------------------------------------------------ */
/* WHY US (for buyers)                                                  */
/* ------------------------------------------------------------------ */
export const WHY_US = {
  eyebrow: 'Why choose us',
  title: 'Three things you can see, feel and count on.',
  scenes: [
    {
      key: 'design',
      title: 'Aesthetic design',
      line: 'Light first, then everything else.',
      text: 'Every apartment gets natural cross-ventilation, broad balconies and direct morning sunlight. We never build dark boxes.',
      image: U(EXT1, 1400),
      treatment: 'arch',
    },
    {
      key: 'materials',
      title: 'Quality materials',
      line: 'What you cannot see matters most.',
      text: 'The structure behind the walls is built from materials we test and trust, with no compromise.',
      points: ['Certified 72.5 grade rebar', 'High-strength stone chips', 'Trusted cement brands'],
      image: U(INT3, 1400),
      treatment: 'duotone',
    },
    {
      key: 'ontime',
      title: 'On-time delivery',
      line: 'A promise we track floor by floor.',
      text: 'Milestone tracking from foundation to finishing, with a disciplined timeline that prevents unnecessary delays.',
      milestones: ['Foundation', 'Structure', 'Brickwork', 'Finishing', 'Inspection', 'Handover'],
      image: U(EXT4, 1400),
      treatment: 'blur',
    },
  ],
  assurances: ['Documented approvals', 'Earthquake-engineered structure', 'Our own site engineers'],
};

/* ------------------------------------------------------------------ */
/* LANDOWNERS: "Partner with us" merged with "Why landowners choose"    */
/* ------------------------------------------------------------------ */
export const LANDOWNER = {
  eyebrow: 'Partner with us',
  title: "Let's Discuss Your Land Over Coffee.",
  intro:
    'Whether you own a residential plot in Jolshiri, Dhanmondi, or elsewhere in Bangladesh, we offer free engineering feasibility reviews and transparent joint-venture ratios.',
  whyTitle: 'Why Landowners Choose Space Maker',
  slogan: 'Four promises we keep on every plot.',
  // Put a warm drawing-room / coffee photo here (or your own meeting room):
  photo: '/assets/05_partner_with_us/coffee-lounge.jpg',
  cards: [
    {
      title: 'Engineering First',
      text: 'We analyze soil load and structural physics before drawing plans. Your building is calculated to resist earthquakes and high winds.',
    },
    {
      title: 'Maximum Light & Air',
      text: 'We do not create dark boxes. Every apartment gets natural cross-ventilation, broad balconies, and direct morning sunlight.',
    },
    {
      title: 'Top-Tier Materials',
      text: 'We strictly use certified 72.5 grade rebar, high-strength stone chips, and trusted cement brands without compromise.',
    },
    {
      title: 'On-Time Handover',
      text: 'We honor construction schedules. Our disciplined milestone timeline prevents unnecessary delays.',
    },
  ],
  hotline: { label: 'Direct Landowner Hotline', display: '+880 1916–100416 (Direct Call or WhatsApp)', tel: '+8801916100416' },
  emailLabel: 'Consultation Email',
};

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getInterior = (slug) => interiorProjects.find((p) => p.slug === slug);
export const coverOf = (p) =>
  (p.photos.find((x) => x.chapter === 'exterior') || p.photos[0] || {}).src;
export const interiorCover = (p) => (p.rooms[0] || {}).image;
```

---

## File: `client/src/data/projectsData.js`
```js
// client/src/data/projectsData.js

export const ongoingRealEstate = [
  {
    id: "form-space",
    segment: "ongoing",
    title: "FORM & SPACE",
    scale: "Proposed G+M+8 (Nine) Storied Residential Building",
    clients: "MAJ AKHTARUZZAMAN / MAJ ABDUS SALAM",
    location: "Plot ID: 13A - 501 - 025, Sector 13, Jolshiri Abashon, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 65,
    activePhase: "6th Floor Slab Casting & Superstructure",
    heroImage: "/assets/03_developments/ongoing/form-and-space/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/form-and-space/blueprint/layout.jpg",
    spaces: [
      { name: "Rooftop Community Terrace", image: "/assets/03_developments/ongoing/form-and-space/architectural/rooftop.jpg" },
      { name: "Executive Lift Lobby", image: "/assets/03_developments/ongoing/form-and-space/architectural/lobby.jpg" }
    ],
    progressLogs: [
      { date: "October 2026", stage: "6th Floor Slab Casting", image: "/assets/03_developments/ongoing/form-and-space/progress/slab-casting.jpg" },
      { date: "August 2026", stage: "Cast-in-situ Deep Piling Verification", image: "/assets/03_developments/ongoing/form-and-space/progress/piling.jpg" }
    ]
  },
  {
    id: "platinum-kusumbag",
    segment: "ongoing",
    title: "Platinum Kusumbag",
    scale: "10-Storied Premium Residential Apartment Complex",
    clients: "Landowner Consortium",
    location: "10 Katha, Sabujbag, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 40,
    activePhase: "Superstructure Phase",
    heroImage: "/assets/03_developments/ongoing/platinum-kusumbag/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/platinum-kusumbag/blueprint/layout.jpg",
    spaces: [],
    progressLogs: []
  },
  {
    id: "marchent-mahua",
    segment: "ongoing",
    title: "Marchent Mahua",
    scale: "09-Storied Residential Tower",
    clients: "Landowner Consortium",
    location: "5 Katha, Sector 16, Jolshiri Abashon, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 30,
    activePhase: "Basement & Substructure",
    heroImage: "/assets/03_developments/ongoing/marchent-mahua/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/marchent-mahua/blueprint/layout.jpg",
    spaces: [],
    progressLogs: []
  },
  {
    id: "rayer-bazar",
    segment: "ongoing",
    title: "Rayer Bazar Residential",
    scale: "G+13 Storied Residential Development",
    clients: "Private Landowner",
    location: "Dhanmondi Edge / Rayer Bazar, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 20,
    activePhase: "Piling & Deep Foundation",
    heroImage: "/assets/03_developments/ongoing/rayer-bazar/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/rayer-bazar/blueprint/layout.jpg",
    spaces: [],
    progressLogs: []
  }
];

export const flagshipProjects = [
  {
    id: "moon-residence",
    segment: "flagship",
    title: "Moon Residence",
    scale: "10-Storied Mixed-Use Commercial & Living Landmark",
    clients: "Moon Jewelers",
    location: "8 Katha, Dinajpur Central",
    architect: "Hasib Uddin Ahmed",
    status: "Handed Over & Completed",
    progressPercentage: 100,
    heroImage: "/assets/03_developments/flagships/moon-residence/hero/facade.jpg",
    blueprintImage: "/assets/03_developments/flagships/moon-residence/blueprint/layout.jpg",
    spaces: [
      { name: "Commercial Atrium", image: "/assets/03_developments/flagships/moon-residence/commercial-atrium/atrium.jpg" }
    ],
    progressLogs: []
  }
];

export const architecturalProjects = [
  {
    id: "dg-niport-bhaban",
    segment: "architectural",
    title: "DG NIPORT Bhaban",
    scale: "10-Storied Commercial & Institutional Building",
    clients: "NIPORT / Ministry of Health",
    location: "2.05 Bigha, Azimpur, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Institutional Consultancy",
    heroImage: "/assets/03_developments/architectural/dg-niport-bhaban/hero/facade.jpg",
    blueprintImage: "/assets/03_developments/architectural/dg-niport-bhaban/blueprint/siteplan.jpg"
  },
  {
    id: "hotel-chittagong",
    segment: "architectural",
    title: "Proposed Hotel at Chittagong",
    scale: "06-Storied Modern Coastal Hotel",
    clients: "Bangladesh Parjatan Corporation",
    location: "Chittagong Coastal Area",
    architect: "Hasib Uddin Ahmed",
    status: "Design Proposal",
    heroImage: "/assets/03_developments/architectural/hotel-chittagong/hero/exterior.jpg",
    blueprintImage: "/assets/03_developments/architectural/hotel-chittagong/blueprint/layout.jpg"
  }
];

export const interiorProjects = [
  {
    id: "moulvibazar-villa",
    segment: "interior",
    title: "Interior at Moulvibazar",
    client: "Laila Group",
    location: "Sylhet",
    architect: "Hasib Uddin Ahmed",
    suites: [
      { 
        title: "Grand Living Lounge", 
        specs: "Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider", 
        image: "/assets/04_interiors/moulvibazar-villa/grand-living-lounge/lounge.jpg" 
      },
      { 
        title: "Dining & Breakfast Bar Suite", 
        specs: "Integrated smart appliances, breakfast counter, custom joinery, laundry concealment", 
        image: "/assets/04_interiors/moulvibazar-villa/dining-breakfast-bar/counter.jpg" 
      },
      { 
        title: "Executive Master Bedroom", 
        specs: "High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels", 
        image: "/assets/04_interiors/moulvibazar-villa/executive-master/bedroom.jpg" 
      },
      { 
        title: "Spa Ensuite Bathroom", 
        specs: "Frameless walk-in glass shower, gold/brass fittings, circular backlit LED mirror", 
        image: "/assets/04_interiors/moulvibazar-villa/spa-ensuite/shower.jpg" 
      }
    ]
  },
  {
    id: "cielo-rooftop",
    segment: "interior",
    title: "Cielo Rooftop Bistro",
    client: "Cielo Hospitality",
    location: "Banani / Poribag, Dhaka",
    architect: "Hasib Uddin Ahmed",
    suites: []
  },
  {
    id: "rangs-corporate",
    segment: "interior",
    title: "Rangs Executive Lounge",
    client: "Rangs Group",
    location: "Gulshan 01, Dhaka",
    architect: "Hasib Uddin Ahmed",
    suites: []
  }
];
```

---

## File: `client/src/data/siteContent.js`
```js
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
```

---

## File: `server/package.json`
```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.6",
    "dotenv": "^18.0.6",
    "express": "^5.2.1",
    "helmet": "^8.3.0",
    "jsonwebtoken": "^9.0.3",
    "pg": "^8.23.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

---

## File: `server/src/index.js`
```js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'Space Maker API online' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

