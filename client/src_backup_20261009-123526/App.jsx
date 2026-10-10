import React, { useState } from "react";

import Navbar from "./components/layout/Navbar";
import HeroStage from "./components/home/HeroStage";
import WhoWeAre from "./components/home/WhoWeAre";
import WhyChooseUs from "./components/home/WhyChooseUs";
import PortfolioGrid from "./components/portfolio/PortfolioGrid";
import LandownerParlor from "./components/home/LandownerParlor";
import Careers from "./components/home/Careers";
import Footer from "./components/layout/Footer";
import FloatingDock from "./components/layout/FloatingDock";
import Butterflies from "./components/common/Butterflies";
import ProjectDetailModal from "./components/portfolio/modal/ProjectDetailModal";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openWhatsApp = (note = "") => {
    const phone = "8801916100416";
    const text = encodeURIComponent(note || "Hello Space Maker, I would like to schedule a consultation.");
    window.open("https://wa.me/" + phone + "?text=" + text, "_blank");
  };

  const scrollToLandowner = () => {
    document.getElementById("partner-land")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#111827] font-sans overflow-x-hidden selection:bg-[#C6F00C] selection:text-black">
      <Butterflies />
      <Navbar onDiscussLand={scrollToLandowner} />

      <main>
        <HeroStage 
          onInquire={(title, location) => openWhatsApp("Hello Space Maker! I would like to inquire about " + title + " at " + location + ".")} 
          onDiscussLand={scrollToLandowner}
        />
        <WhoWeAre />
        <WhyChooseUs />
        <PortfolioGrid 
          onSelectProject={(proj) => setSelectedProject(proj)} 
          onWhatsAppInquire={openWhatsApp}
        />
        <LandownerParlor />
        <Careers />
      </main>

      <Footer />
      <FloatingDock />

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onWhatsApp={openWhatsApp}
        />
      )}
    </div>
  );
}
