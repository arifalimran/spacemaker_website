import React, { useState } from "react";
import { Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function LandownerParlor() {
  const [formStatus, setFormStatus] = useState({ loading: false, success: false });

  const handlePartnerInquiry = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false });
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      plotSize: formData.get("plotSize"),
      message: formData.get("message"),
      source: "landowner_parlor",
      timestamp: new Date().toISOString()
    };

    try {
      const webhook = import.meta.env.VITE_N8N_WEBHOOK_URL || "/api/inquiries";
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => null);
      setFormStatus({ loading: false, success: true });
      e.target.reset();
    } catch {
      setFormStatus({ loading: false, success: true });
    }
  };

  return (
    <section id="partner-land" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#F0F4ED] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2D6A4F] mb-3 block">
            Partner With Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-4">
            Let's Discuss Your Land Over Coffee.
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6">
            Whether you own a residential plot in Jolshiri, Dhanmondi, or elsewhere in Bangladesh, we offer free engineering feasibility reviews and transparent joint-venture ratios.
          </p>

          <div className="space-y-4 text-xs font-bold text-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1B4332] shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div>Direct Landowner Hotline</div>
                <div className="text-neutral-500 font-normal">+880 1916-100416 (Direct Call or WhatsApp)</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1B4332] shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div>Consultation Email</div>
                <div className="text-neutral-500 font-normal">spacemakerbd@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-neutral-300/70 shadow-lg">
          <h3 className="text-xl font-extrabold mb-1">Request Feasibility Study</h3>
          <p className="text-xs text-neutral-500 mb-6">Fill in your plot details; our engineering director will call you back directly.</p>

          <form onSubmit={handlePartnerInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-700 block mb-1">Your Name</label>
                <input name="name" required placeholder="e.g. Major Akhtaruzzaman" className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-neutral-700 block mb-1">Phone / WhatsApp</label>
                <input name="phone" required placeholder="+880 1..." className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-700 block mb-1">Plot Location</label>
                <input name="location" required placeholder="e.g. Sector 13, Jolshiri" className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-neutral-700 block mb-1">Plot Size</label>
                <input name="plotSize" placeholder="e.g. 5 Katha / 10 Katha" className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#1B4332]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-neutral-700 block mb-1">Notes / Requirements</label>
              <textarea name="message" rows={3} placeholder="Tell us about your expectations..." className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#1B4332]" />
            </div>

            <button 
              type="submit" 
              disabled={formStatus.loading}
              className="w-full py-4 bg-[#1B4332] hover:bg-[#143225] text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>{formStatus.loading ? "Connecting to Direct Desk..." : "Submit Land Details"}</span>
              <Send className="w-4 h-4 text-[#C6F00C]" />
            </button>

            {formStatus.success && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you. Our engineering team will contact you via phone/WhatsApp within 24 hours.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
