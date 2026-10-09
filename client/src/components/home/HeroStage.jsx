import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function HeroStage({ onInquire, onDiscussLand }) {
  return (
    <section className="relative z-10 pt-36 pb-24 px-6 max-w-6xl mx-auto">
      <div className="absolute top-16 right-4 md:right-20 w-80 h-80 md:w-[480px] md:h-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/50 via-green-50/20 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-800 tracking-wider uppercase mb-6 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] ring-4 ring-[#C6F00C]/40 animate-pulse"></span>
          Premier Real Estate Developer in Dhaka
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 leading-[1.12] mb-6 tracking-tight">
          We Build Trust on Your Land. <br />
          <span className="text-[#2D6A4F] font-serif italic font-normal">Modern Homes, Complete Safety.</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-8">
          Your family property represents years of hard work. We partner with landowners in Jolshiri, Dhanmondi, and Dhaka to construct premium residential buildings with 100% legal clarity, top-grade civil engineering, and on-time handover.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={onDiscussLand}
            className="px-6 py-3.5 bg-[#1B4332] hover:bg-[#143225] text-white rounded-xl text-sm font-bold transition flex items-center gap-2 shadow-md"
          >
            <span>Discuss Joint Venture Feasibility</span>
            <ArrowRight className="w-4 h-4 text-[#C6F00C]" />
          </button>

          <a 
            href="https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20discuss%20a%20land%20development%20project."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-xl text-sm font-bold transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp: 01916-100416</span>
          </a>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-neutral-300/60 bg-neutral-100 shadow-xl aspect-[16/9] md:aspect-[21/9]">
        <img 
          src="/assets/01_hero/hero-1.jpg" 
          alt="FORM & SPACE Jolshiri"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="bg-[#C6F00C] text-black text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md inline-block mb-2">
                Ongoing Landmark • Jolshiri Abashon
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold">FORM & SPACE — Sector 13</h3>
              <p className="text-xs md:text-sm text-neutral-200 mt-1 max-w-xl">
                G+M+8 Storied Haven • 65% Casting Completed • Designed by Principal Architect Hasib Uddin Ahmed.
              </p>
            </div>

            <button 
              onClick={() => onInquire("FORM & SPACE", "Sector 13, Jolshiri")}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-lg shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              Inquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
