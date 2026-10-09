import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Navbar({ onDiscussLand }) {
  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-10">
      <nav className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#1B4332] p-1.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <img src="/assets/00_brand/banyan-logo.svg" alt="Banyan Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-base md:text-lg tracking-wider text-neutral-900 block leading-tight">
              SPACE <span className="text-[#2D6A4F]">MAKER</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-500 block">
              Where Space Defines Luxury
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-neutral-600">
          <a href="#who-we-are" className="hover:text-[#1B4332] transition">Who We Are</a>
          <a href="#why-choose-us" className="hover:text-[#1B4332] transition">Why Choose Us</a>
          <a href="#portfolio" className="hover:text-[#1B4332] transition">Our Projects</a>
          <a href="#partner-land" className="hover:text-[#1B4332] transition">Your Land</a>
          <a href="#careers" className="hover:text-[#1B4332] transition text-[#2D6A4F]">Careers</a>
        </div>

        <button 
          onClick={onDiscussLand}
          className="inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          <span>Discuss Your Land</span>
          <ArrowUpRight className="w-4 h-4 text-[#C6F00C]" />
        </button>
      </nav>
    </header>
  );
}
