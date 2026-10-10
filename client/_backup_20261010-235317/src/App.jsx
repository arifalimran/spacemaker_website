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
