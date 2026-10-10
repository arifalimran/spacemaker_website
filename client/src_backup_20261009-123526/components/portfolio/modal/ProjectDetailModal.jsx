import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ProjectDetailModal({ project, onClose, onWhatsApp }) {
  const [activeTab, setActiveTab] = useState("renders");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[94vh]">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D6A4F] font-bold block mb-1">
              Dual-Lens Deep Dive Dossier
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">{project.title}</h3>
            <span className="text-xs text-neutral-500">{project.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onWhatsApp("Hello Space Maker, I am reviewing " + project.title + " and want more information.")}
              className="px-4 py-2.5 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </button>
            <button onClick={onClose} className="p-2.5 rounded-full hover:bg-neutral-200 text-neutral-600 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-neutral-200 bg-neutral-100 p-2 gap-2">
          <button
            onClick={() => setActiveTab("renders")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${
              activeTab === "renders" ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Lens 1: Architectural Design & Blueprints
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${
              activeTab === "progress" ? "bg-[#1B4332] text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Lens 2: Verified Civil Construction Status ({project.progressPercentage || 100}%)
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {activeTab === "renders" ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-500 mb-2">3D Exterior Elevation Render</h4>
                  <img src={project.heroImage} alt="Render" className="w-full h-80 object-cover rounded-2xl border border-neutral-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"; }} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-500 mb-2">Approved Architectural Layout Plan</h4>
                  <img src={project.blueprintImage} alt="Blueprint" className="w-full h-80 object-cover rounded-2xl border border-neutral-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"; }} />
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-neutral-200">
                <h4 className="font-extrabold text-sm text-neutral-900 mb-2">Architectural Highlights</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Engineered with cross-ventilation, double-height entrance reception, high-speed elevator shafts, and deep piling foundation designed for seismic stability.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#F1F5EE] p-6 rounded-2xl border border-[#2D6A4F]/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#1B4332]">Civil Progress Tracking</span>
                  <span className="text-sm font-mono font-extrabold text-neutral-900">{project.progressPercentage || 100}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
                  <div className="bg-[#1B4332] h-3 rounded-full" style={{ width: `${project.progressPercentage || 100}%` }} />
                </div>
                <span className="text-xs text-neutral-600 font-mono">Current Activity: {project.activePhase || "Superstructure Casting"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-500 mb-2">On-Site Slab & Beam Casting</h4>
                  <img src="/assets/03_developments/ongoing/form-and-space/progress/slab-casting.jpg" alt="Site Progress" className="w-full h-64 object-cover rounded-2xl border border-neutral-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541888946425-d0fbb18615f7?auto=format&fit=crop&w=800&q=80"; }} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-500 mb-2">Deep Piling & Rebar Verification</h4>
                  <img src="/assets/03_developments/ongoing/form-and-space/progress/piling.jpg" alt="Foundation" className="w-full h-64 object-cover rounded-2xl border border-neutral-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"; }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
