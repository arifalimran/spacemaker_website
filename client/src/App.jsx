// client/src/App.jsx
// Routes: /  (home), /projects, /projects/:slug, /interiors, /interiors/:slug, /careers, /careers/openings, /landowners
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import './styles/sm-effects.css';

import SiteNav from './components/layout/SiteNav';
import SiteFooter from './components/layout/SiteFooter';
import ButterflyLayer from './components/layout/ButterflyLayer';
import SectionWatcher from './components/layout/SectionWatcher';
import SectionDock from './components/layout/SectionDock';
import HeroStage from './components/home/HeroStage';
import PageIntro from './components/home/PageIntro';
import WhoWeAre from './components/home/WhoWeAre';
import WhyChooseUs from './components/home/WhyChooseUs';
import Testimonials from './components/home/Testimonials';
import TeamExperts from './components/home/TeamExperts';
import TeamPage from './components/home/TeamPage';
import LandownerSection from './components/home/LandownerSection';
import Careers, { Flex } from './components/home/Careers';
import { ApplyProvider } from './components/home/ApplyForm';
import CareersOpenings from './components/home/CareersOpenings';
import Landowners from './components/home/Landowners';
import PortfolioSection from './components/portfolio/PortfolioSection';
import ProjectPage from './components/portfolio/ProjectPage';
import AllProjects from './components/portfolio/AllProjects';
import InteriorsIndex from './components/portfolio/InteriorsIndex';
import InteriorPage from './components/portfolio/InteriorPage';
import { useSmoothScroll, useHashScroll } from './lib/scroll';

/* smooth inertia scroll, shared through window.__lenis */
/* scroll to #section after a route change, or to the top on a new page */
function Home() {
  // data-sec / data-key / data-theme tell SectionWatcher which section is under the top bar
  return (
    <main>
      <div data-sec="Welcome" data-key="welcome" data-theme="light">
        <HeroStage />
      </div>
      <div data-sec="Who we are" data-key="about" data-theme="light">
        <WhoWeAre />
      </div>
      <div data-sec="Projects" data-key="projects" data-theme="light">
        <PortfolioSection />
      </div>
      <div id="why-us" data-sec="Why choose us" data-key="why" data-theme="light">
        <WhyChooseUs />
      </div>
      <div data-sec="Testimonials" data-key="testimonials" data-theme="light">
        <Testimonials />
      </div>
      <div data-sec="Team" data-key="team" data-theme="light">
        <TeamExperts />
      </div>
      <div data-sec="Partner with us" data-key="land" data-theme="light">
        <LandownerSection />
      </div>
      <div>
        <ApplyProvider>
          <Flex />
        </ApplyProvider>
      </div>
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
  useHashScroll();
  const { pathname } = useLocation();
  const detail = pathname.startsWith('/projects/') || pathname.startsWith('/interiors/');
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAF8F5] font-sans text-[#111827] selection:bg-[#C6F00C] selection:text-black">
      <PageIntro />
      <SectionWatcher />
      <SiteNav />
      <ButterflyLayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/interiors" element={<InteriorsIndex />} />
        <Route path="/interiors/:slug" element={<InteriorPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/careers" element={<main><Careers /></main>} />
        <Route path="/careers/openings" element={<main><CareersOpenings /></main>} />
        <Route path="/landowners" element={<main><Landowners /></main>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
      {!detail && <SectionDock />}
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
