// client/src/App.jsx
// Routes: /  (home), /projects/:slug (project page), /careers (separate page)
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import SiteNav from './components/layout/SiteNav';
import SiteFooter from './components/layout/SiteFooter';
import HeroStage from './components/home/HeroStage';
import WhoWeAre from './components/home/WhoWeAre';
import WhyChooseUs from './components/home/WhyChooseUs';
import LandownerParlor from './components/home/LandownerParlor';
import Careers from './components/home/Careers';
import PortfolioSection from './components/portfolio/PortfolioSection';
import ProjectPage from './components/portfolio/ProjectPage';
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
  const base =
    'flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition';
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-2xl border border-neutral-200/90 bg-white/90 p-2 shadow-xl backdrop-blur-md">
      <a href={CONTACT.messenger} target="_blank" rel="noreferrer" title="Message on Facebook" className={`${base} bg-blue-600 hover:bg-blue-700`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5A8.5 8.5 0 1 1 21 11.5Z" /></svg>
      </a>
      <a
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hello Space Maker, I would like to know more about your residences.')}`}
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
      <div id="why-us"><WhyChooseUs /></div>
      <div id="land"><LandownerParlor /></div>
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
  const onProject = pathname.startsWith('/projects/');
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAF8F5] font-sans text-[#111827] selection:bg-[#C6F00C] selection:text-black">
      <ScrollManager />
      <SiteNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/careers" element={<main className="pt-24"><Careers /></main>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
      {!onProject && <Dock />}
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
