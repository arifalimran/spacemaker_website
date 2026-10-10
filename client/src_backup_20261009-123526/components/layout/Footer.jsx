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
