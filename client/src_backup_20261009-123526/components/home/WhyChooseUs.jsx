import React from "react";
import { Compass, ShieldCheck, Sun, Hammer, Clock, HeartHandshake } from "lucide-react";

const promises = [
  { icon: Compass, title: "Engineering First", desc: "We analyze soil load and structural physics before drawing plans. Your building is calculated to resist earthquakes and high winds." },
  { icon: ShieldCheck, title: "100% Transparent JV", desc: "Clear agreements with zero hidden costs. Landowners receive verified updates and blueprints at every step." },
  { icon: Sun, title: "Maximum Light & Air", desc: "We do not create dark boxes. Every apartment gets natural cross-ventilation, broad balconies, and direct morning sunlight." },
  { icon: Hammer, title: "Top-Tier Materials", desc: "We strictly use certified 72.5 grade rebar, high-strength stone chips, and trusted cement brands without compromise." },
  { icon: Clock, title: "On-Time Handover", desc: "We honor construction schedules. Our disciplined milestone timeline prevents unnecessary delays." },
  { icon: HeartHandshake, title: "Lifetime Stewardship", desc: "Our relationship does not end at handover. We assist landowner families with long-term building maintenance." }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#F8F7F3] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2D6A4F] mb-2 block">Proven Value</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">Why Landowners Choose Space Maker</h2>
          <p className="text-sm md:text-base text-neutral-600 mt-2">Disciplined civil engineering • Legal transparency • Enduring value</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((p, idx) => (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-neutral-300/60 shadow-sm hover:border-[#2D6A4F] transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1F5EE] flex items-center justify-center text-[#1B4332] mb-5">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-neutral-900 mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
