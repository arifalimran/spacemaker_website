import React, { useState } from "react";
import { ArrowUpRight, MessageCircle, ChevronDown } from "lucide-react";

export default function Careers() {
  const [openFaq, setOpenFaq] = useState(null);

  const perks = [
    { title: "Guaranteed On-Time Pay", desc: "No delayed wages. Salaries and festival bonuses are deposited on schedule every single month." },
    { title: "Hands-On Field Training", desc: "Direct mentorship under veteran BUET structural leads and principal architects in rebar testing and piling." },
    { title: "Dignified Site Culture", desc: "A positive work environment with zero workplace abuse, reasonable hours, and full safety gear (PPE) on day one." },
    { title: "Transport & Site Lunch", desc: "Daily lunch allowances and transport logistics support for engineers posted at our Jolshiri Abashon sites." }
  ];

  const jobs = [
    { title: "Senior Structural Project Engineer", loc: "Jolshiri Abashon (Sectors 13 & 16)", exp: "4–7 Years", type: "Full-Time" },
    { title: "Site Supervisor / Civil Foreman", loc: "Dhaka & Jolshiri Projects", exp: "3+ Years", type: "Full-Time" },
    { title: "Junior Architectural Visualizer", loc: "Corporate Studio (Mohakhali DOHS)", exp: "1–3 Years", type: "Full-Time" }
  ];

  const faqs = [
    { q: "Will my salary be delayed like conventional developers in Dhaka?", a: "No. Space Maker follows strict corporate discipline. All employee salaries and site allowances are disbursed promptly on schedule every month without exception." },
    { q: "Do I need decades of experience to join?", a: "We prioritize dedication, character, and proactive problem solving over long resumes. If you are eager to learn and take personal pride in clean civil work, we will invest in your training." },
    { q: "Is transport provided for site postings in Jolshiri Abashon?", a: "Yes. Our site engineers and supervisors receive transit allowances and logistical support for commutes to our Jalshiri operations hub." },
    { q: "How fast will I hear back after applying?", a: "Our engineering and HR desk reviews submissions weekly. Shortlisted candidates are invited for an interview and tea at our Mohakhali DOHS office within 5 to 7 business days." }
  ];

  return (
    <section id="careers" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#EBF3E8] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2D6A4F] mb-2 block">
            Careers & Culture
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
            Build Homes. Shape Your Career.
          </h2>
          <p className="text-sm md:text-base text-neutral-600 mt-3">
            We are looking for dedicated engineers, initiators, and team players who take pride in disciplined construction.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-center text-xs uppercase font-extrabold tracking-wider text-neutral-500 mb-8">What We Provide For Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-300/70 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-[#C6F00C] flex items-center justify-center font-bold text-xs mb-4">
                    0{idx+1}
                  </div>
                  <h4 className="font-extrabold text-neutral-900 text-base mb-2">{perk.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-white p-8 md:p-10 rounded-3xl border border-neutral-300/70 shadow-sm">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-6">Current Open Positions</h3>
          <div className="divide-y divide-neutral-200">
            {jobs.map((job, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-neutral-900">{job.title}</h4>
                  <div className="text-xs text-neutral-500 mt-1 flex flex-wrap gap-3">
                    <span>📍 {job.loc}</span>
                    <span>⏳ Experience: {job.exp}</span>
                    <span>💼 {job.type}</span>
                  </div>
                </div>
                <a 
                  href="mailto:spacemakerbd@gmail.com?subject=Job%20Application"
                  className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6F00C]" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-center text-2xl font-extrabold text-neutral-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-neutral-300/70 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-extrabold text-xs sm:text-sm text-neutral-900"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-[#1B4332] p-8 md:p-10 rounded-3xl text-white shadow-xl">
          <h4 className="text-xl md:text-2xl font-extrabold mb-2">Want to Join Space Maker?</h4>
          <p className="text-xs md:text-sm text-neutral-200 mb-6 max-w-xl mx-auto">
            You do not need a complex form. Send your resume directly to our HR desk via email or WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="mailto:spacemakerbd@gmail.com?subject=Resume%20Submission"
              className="px-6 py-3 bg-white text-neutral-900 rounded-xl text-xs font-bold hover:bg-neutral-100 transition"
            >
              Email: spacemakerbd@gmail.com
            </a>
            <a 
              href="https://wa.me/8801916100416?text=Hello%20Space%20Maker%20HR,%20I%20would%20like%20to%20submit%20my%20CV."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send CV via WhatsApp (01916-100416)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
