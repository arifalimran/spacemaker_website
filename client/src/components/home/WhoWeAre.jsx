import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#F1F5EE] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2D6A4F] mb-3 block">Company Profile</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-5">
            Like the Banyan Tree, <br />
            <span className="text-[#2D6A4F] font-serif italic font-normal">Our Roots Run Deep.</span>
          </h2>
          <div className="w-16 h-1 bg-[#2D6A4F] rounded-full mb-6" />

          <p className="text-base text-neutral-700 leading-relaxed mb-6">
            Space Maker Limited is an engineering-driven real estate company in Dhaka. We believe every building must stand on rock-solid foundations, honest materials, and complete legal safety for landowners.
          </p>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Full RAJUK & Military Land Compliance</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Engineers on Site Every Working Day</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>Open Accounts & 100% Legal Joint Ventures</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-neutral-300/60 shadow-md">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 mb-4">Our Guiding Principle</h3>
          <blockquote className="text-xl md:text-2xl font-serif italic text-neutral-900 mb-6 leading-snug">
            “Every great development begins not with excavation, but with genuine human trust and disciplined execution.”
          </blockquote>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-neutral-800 pt-4 border-t border-neutral-200">
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
              <div className="text-[#2D6A4F] text-base font-extrabold mb-1">01. Direct Access</div>
              <p className="text-neutral-600 font-normal">Landowners speak directly with principal architects and structural directors anytime.</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-neutral-200">
              <div className="text-[#2D6A4F] text-base font-extrabold mb-1">02. Tested Materials</div>
              <p className="text-neutral-600 font-normal">Independent BUET lab tests for every batch of 72.5 grade steel and high-early cement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
