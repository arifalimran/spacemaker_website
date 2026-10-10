import React from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { ongoingRealEstate, flagshipProjects, interiorProjects } from "../../data/projectsData";

export default function PortfolioGrid({ onSelectProject, onWhatsAppInquire }) {
  return (
    <section id="portfolio" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#F2F6F1] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2D6A4F] mb-2 block">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">Featured Developments</h2>
          <p className="text-sm md:text-base text-neutral-600 mt-2">Explore ongoing builds, delivered landmarks, and turnkey luxury interiors.</p>
        </div>

        {/* 1. Ongoing Real Estate */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest bg-[#1B4332] text-white px-3 py-1 rounded-md">Act I</span>
            <h3 className="text-xl font-bold text-neutral-900">Ongoing Real Estate Projects</h3>
          </div>

          <div className="space-y-12">
            {ongoingRealEstate.map((project) => (
              <div key={project.id} className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-300/70 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => onSelectProject(project)}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-neutral-100 border border-neutral-200">
                    <img 
                      src={project.heroImage} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"; }}
                    />
                    <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#C6F00C]">
                      {project.status} • {project.progressPercentage}% Completed
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">{project.location}</span>
                    <h4 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-2">{project.title}</h4>
                    <p className="text-xs md:text-sm text-neutral-600 mb-4 leading-relaxed">{project.scale}</p>

                    <div className="space-y-2 text-xs text-neutral-700 border-t border-neutral-100 pt-3">
                      <div><strong className="text-neutral-900">Current Phase:</strong> {project.activePhase || "Superstructure Casting"}</div>
                      <div><strong className="text-neutral-900">Architect:</strong> {project.architect}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                    <button 
                      onClick={() => onSelectProject(project)}
                      className="flex-1 py-3 px-4 bg-[#1B4332] hover:bg-[#143225] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>Open Full Dossier</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C6F00C]" />
                    </button>
                    <button 
                      onClick={() => onWhatsAppInquire("Hello Space Maker, I am inquiring about " + project.title + " (" + project.location + ").")}
                      className="py-3 px-4 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Completed Landmarks */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest bg-[#2D6A4F] text-white px-3 py-1 rounded-md">Act II</span>
            <h3 className="text-xl font-bold text-neutral-900">Handed Over & Completed Landmarks</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flagshipProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-300/70 shadow-sm hover:shadow-xl transition cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 rounded-b-2xl">
                  <img 
                    src={project.heroImage} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"; }}
                  />
                  <div className="absolute top-4 left-4 bg-[#1B4332] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Completed & Handed Over
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-mono text-neutral-400 block mb-1">{project.location}</span>
                  <h4 className="text-2xl font-extrabold text-neutral-900">{project.title}</h4>
                  <p className="text-xs text-neutral-600 mt-1">{project.scale}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Interior Outfits */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest bg-neutral-800 text-white px-3 py-1 rounded-md">Act III</span>
            <h3 className="text-xl font-bold text-neutral-900">Turnkey Luxury Interiors</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {interiorProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl border border-neutral-300/70 p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-mono text-neutral-400 block mb-1">{project.location}</span>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{project.title}</h4>
                  <p className="text-xs text-neutral-600 mb-4">{project.client || "Private Client"}</p>
                </div>
                <button 
                  onClick={() => onWhatsAppInquire("Hello Space Maker, I am inquiring about interior design services inspired by " + project.title + ".")}
                  className="w-full py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-900 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Inquire for Interior</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
