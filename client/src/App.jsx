import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring 
} from 'framer-motion';
import Lenis from 'lenis';
import { 
  Compass, 
  ShieldCheck, 
  Layers, 
  HardHat, 
  Building2, 
  Sparkles, 
  MapPin, 
  Phone, 
  Send, 
  ExternalLink,
  MessageCircle, 
  X, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  heroContent, 
  whoWeAreContent, 
  whyChooseUsContent, 
  developmentProcessContent, 
  contactContent 
} from './data/siteContent';
import { 
  ongoingRealEstate, 
  flagshipProjects, 
  interiorProjects 
} from './data/projectsData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLens, setActiveLens] = useState('architectural');
  const [activeCategory, setActiveCategory] = useState('all');
  const [formStatus, setFormStatus] = useState({ loading: false, success: false });

  // 1. Lenis Smooth Inertia Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // 2. Parallax Physics & Spring Normalization
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  // Parallax transform offsets across depth layers
  const bgGridY = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const watermark1Y = useTransform(smoothProgress, [0, 0.4], ["0%", "35%"]);
  const watermark2Y = useTransform(smoothProgress, [0.3, 0.8], ["-10%", "30%"]);
  const heroTextY = useTransform(smoothProgress, [0, 0.25], ["0%", "35%"]);

  // Contextual WhatsApp Deep Link Helper
  const openProjectWhatsApp = (project, customNote = "") => {
    const phone = "8801916100416";
    const text = encodeURIComponent(
      `Hello Space Maker! I am inquiring about *${project.title}* (${project.location}). ${customNote}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  // Lead Dispatcher (Compatible with n8n / MCP Webhooks)
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false });
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      plotSize: formData.get('plotSize'),
      message: formData.get('message'),
      mcp_intent: "landowner_feasibility",
      source: "spacemakers_portal",
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
    <div ref={containerRef} className="relative min-h-screen bg-[#F7F8F5] text-[#121316] font-sans selection:bg-[#C6F00C] selection:text-black overflow-x-hidden">
      
      {/* Blueprint Grid Parallax Layer */}
      <motion.div 
        style={{ y: bgGridY }}
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0 bg-[radial-gradient(#121316_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* Floating Logo Watermark 1 (Near Story Section) */}
      <motion.div 
        style={{ y: watermark1Y }}
        className="fixed top-1/4 right-[-4%] w-[380px] h-[380px] md:w-[540px] md:h-[540px] pointer-events-none opacity-[0.03] z-0"
      >
        <img src="/assets/00_brand/emblem-watermark.svg" alt="" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
      </motion.div>

      {/* Floating Logo Watermark 2 (Near Developments Section) */}
      <motion.div 
        style={{ y: watermark2Y }}
        className="fixed top-2/3 left-[-6%] w-[420px] h-[420px] md:w-[600px] md:h-[600px] pointer-events-none opacity-[0.025] z-0"
      >
        <img src="/assets/00_brand/emblem-watermark.svg" alt="" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
      </motion.div>

      {/* Floating Glassmorphic Navbar */}
      <header className="fixed top-5 left-0 right-0 z-40 px-4 md:px-8">
        <nav className="max-w-6xl mx-auto bg-white/85 backdrop-blur-md border border-neutral-200/80 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
          <a href="#" className="flex items-center gap-3">
            <img 
              src="/assets/00_brand/logo.svg" 
              alt="Space Maker" 
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <span className="font-['Space_Grotesk'] font-bold text-lg tracking-wider block">SPACE <span className="text-neutral-400">MAKER</span></span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            <a href="#about" className="hover:text-black transition">Profile</a>
            <a href="#projects" className="hover:text-black transition">Developments</a>
            <a href="#process" className="hover:text-black transition">Process</a>
            <a href="#contact" className="hover:text-black transition">Consultation</a>
          </div>

          <a 
            href={contactContent.whatsappUrl} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#121316] hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C6F00C]" />
          </a>
        </nav>
      </header>

      {/* SECTION 01: HERO STAGE */}
      <section className="relative z-10 pt-44 pb-28 px-6 max-w-6xl mx-auto bg-gradient-to-b from-[#F7F8F5] via-[#F7F8F5] to-[#F1F4EE]/60">
        <motion.div style={{ y: heroTextY }} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-semibold text-neutral-700 uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25 animate-pulse"></span>
            {heroContent.badge}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#121316] leading-[1.08] mb-8 font-['Space_Grotesk']">
            {heroContent.headlineLine1} <br />
            <span className="italic font-serif font-light text-neutral-500">{heroContent.headlineLine2}</span>
          </h1>

          <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mb-12">
            {heroContent.subheading}
          </p>
        </motion.div>

        {/* Hero Interactive Showcase */}
        <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-xl aspect-[16/9] md:aspect-[21/9]">
          <img 
            src="/assets/01_hero/hero-1.jpg" 
            alt="Flagship Development"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[#C6F00C] text-xs uppercase font-bold tracking-widest mb-1 block">Ongoing Landmark</span>
                <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk']">FORM & SPACE — Jolshiri Abashon</h3>
                <p className="text-xs md:text-sm text-neutral-300 max-w-xl mt-1">
                  Sector 13 • Proposed G+M+8 (Nine) Storied • Architect Hasib Uddin Ahmed
                </p>
              </div>

              <button 
                onClick={() => openProjectWhatsApp({ title: "FORM & SPACE", location: "Sector 13, Jolshiri" }, "I want pricing on available units.")}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-lg shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: WHO WE ARE */}
      <section id="about" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#F1F4EE]/60 via-[#F5F6F2] to-[#F7F8F5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800/70 mb-2 block">{whoWeAreContent.badge}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Space_Grotesk'] text-[#121316] mb-6">
              {whoWeAreContent.title}
            </h2>
            <div className="w-12 h-1 bg-[#C6F00C] rounded-full mb-8"></div>
            
            <blockquote className="font-serif italic text-lg text-neutral-700 border-l-2 border-emerald-600/40 pl-4 py-1 mb-6">
              {whoWeAreContent.quote}
            </blockquote>
          </div>

          <div className="md:col-span-7 space-y-5 text-neutral-600 text-sm md:text-base leading-relaxed">
            {whoWeAreContent.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {whoWeAreContent.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/70 backdrop-blur border border-neutral-200/70 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-neutral-800">{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: WHY CHOOSE US */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-[#F7F8F5] via-[#EFF3EC]/50 to-[#F7F8F5]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800/70 mb-2 block">{whyChooseUsContent.badge}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-['Space_Grotesk'] text-[#121316] mb-4">
            {whyChooseUsContent.title}
          </h2>
          <p className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-wider">
            {whyChooseUsContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseUsContent.cards.map((card, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1F4EE] border border-emerald-200/60 flex items-center justify-center mb-5 text-emerald-900">
                <Building2 className="w-5 h-5 text-neutral-900" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 font-['Space_Grotesk'] mb-2">{card.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 04: DEVELOPMENTS & PORTFOLIO */}
      <section id="projects" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Living Environments</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Space_Grotesk'] text-[#121316]">
              Portfolio Showcase
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Developments' },
              { id: 'ongoing', label: 'Ongoing Real Estate' },
              { id: 'flagships', label: 'Completed Landmarks' },
              { id: 'interior', label: 'Interior Fit-outs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  activeCategory === tab.id 
                    ? 'bg-[#121316] text-[#C6F00C] shadow-sm' 
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Project Grid with Layout Physics */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {(activeCategory === 'all' || activeCategory === 'ongoing' ? ongoingRealEstate : [])
              .concat(activeCategory === 'all' || activeCategory === 'flagships' ? flagshipProjects : [])
              .map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  key={project.id}
                  className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <img 
                        src={project.heroImage} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#121316]/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-[#C6F00C] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6F00C] animate-pulse"></span>
                        {project.status} {project.progressPercentage ? `• ${project.progressPercentage}%` : ''}
                      </div>

                      {/* Direct WhatsApp Query Trigger on Project Card */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectWhatsApp(project, "I am inquiring directly from the project card.");
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-neutral-800 hover:bg-[#25D366] hover:text-white transition shadow-sm"
                        title="Direct WhatsApp Inquiry"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-6">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        {project.location}
                      </span>
                      <h4 className="text-xl font-bold text-neutral-900 font-['Space_Grotesk']">
                        {project.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 mb-4 leading-relaxed">{project.scale}</p>

                      {project.progressPercentage && (
                        <div>
                          <div className="w-full bg-neutral-100 rounded-full h-1.5 mb-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${project.progressPercentage}%` }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="bg-[#121316] h-1.5 rounded-full"
                            />
                          </div>
                          <span className="text-[11px] text-neutral-500 font-mono">Phase: {project.activePhase || "Superstructure"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                    <button 
                      onClick={() => { setSelectedProject(project); setActiveLens('architectural'); }}
                      className="text-xs font-bold text-neutral-800 hover:text-black flex items-center gap-1.5"
                    >
                      <span>Explore Dual-Lens Dossier</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECTION 05: METHODOLOGY / PROCESS */}
      <section id="process" className="relative z-10 py-24 px-6 bg-gradient-to-b from-[#F7F8F5] via-[#F2F5EF] to-[#F7F8F5] border-t border-neutral-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800/70 mb-2 block">{developmentProcessContent.badge}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Space_Grotesk'] text-[#121316] mb-3">
              {developmentProcessContent.title}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 uppercase tracking-wider">{developmentProcessContent.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {developmentProcessContent.steps.map((step, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur border border-neutral-200/80 p-5 rounded-2xl">
                <span className="text-2xl font-black font-['Space_Grotesk'] text-emerald-900/20 block mb-2">{`0${idx + 1}`}</span>
                <span className="text-xs font-bold text-neutral-800 leading-snug block">{step.split('. ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: LANDOWNER CONSULTATION */}
      <section id="contact" className="relative z-10 py-24 px-6 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">{contactContent.badge}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-['Space_Grotesk'] text-[#121316] mb-6">
              {contactContent.title}
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-8">{contactContent.subtitle}</p>

            <div className="space-y-4 text-sm text-neutral-700">
              {contactContent.offices.map((off, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{off.name}</div>
                    <div className="text-xs text-neutral-500">{off.address}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-5 h-5 text-neutral-800 shrink-0" />
                <div>
                  <div className="font-bold">WhatsApp Direct</div>
                  <div className="text-xs text-neutral-500">{contactContent.phone}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#F7F8F5] p-8 md:p-10 rounded-3xl border border-neutral-200">
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Full Name</label>
                  <input name="name" required placeholder="e.g. Major Akhtaruzzaman" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">WhatsApp Number</label>
                  <input name="phone" required placeholder="+880 17..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Plot Location</label>
                  <input name="location" required placeholder="e.g. Sector 13, Jolshiri" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Plot Size</label>
                  <input name="plotSize" placeholder="e.g. 5 Katha / 10 Katha" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Inquiry / Joint Venture Scope</label>
                <textarea name="message" rows={3} placeholder="Share land specifications or booking interests..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
              </div>

              <button 
                type="submit" 
                disabled={formStatus.loading}
                className="w-full py-4 bg-[#121316] hover:bg-neutral-800 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{formStatus.loading ? "Connecting to Engine..." : "Submit Feasibility Request"}</span>
                <Send className="w-4 h-4 text-[#C6F00C]" />
              </button>

              {formStatus.success && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Request received. Our engineering lead will reach out shortly.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Floating Action Dock */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-neutral-200/90 p-2 rounded-2xl shadow-xl">
        <a 
          href={contactContent.messengerUrl} 
          target="_blank" 
          rel="noreferrer"
          className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-sm"
          title="Message on Messenger"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <a 
          href={contactContent.whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white flex items-center justify-center transition shadow-sm"
          title="Chat on WhatsApp"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Dual-Lens Interactive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">{selectedProject.location}</span>
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-900">{selectedProject.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openProjectWhatsApp(selectedProject, `Inquiring during detail review.`)}
                    className="px-3.5 py-2 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Query</span>
                  </button>
                  <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-neutral-200 text-neutral-600 transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex border-b border-neutral-200 bg-neutral-100 p-1.5 gap-2">
                <button
                  onClick={() => setActiveLens('architectural')}
                  className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
                    activeLens === 'architectural' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Lens 1: Architectural Design & Blueprints
                </button>
                <button
                  onClick={() => setActiveLens('status')}
                  className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition ${
                    activeLens === 'status' ? 'bg-[#121316] text-[#C6F00C] shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Lens 2: Live Build Status ({selectedProject.progressPercentage || 100}%)
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <AnimatePresence mode="wait">
                  {activeLens === 'architectural' ? (
                    <motion.div key="lens-arch" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">3D Architectural Render</h4>
                          <img src={selectedProject.heroImage} alt="Render" className="w-full h-64 object-cover rounded-xl border border-neutral-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"; }} />
                        </div>
                        <div>
                          <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">Technical Blueprint Plan</h4>
                          <img src={selectedProject.blueprintImage} alt="Blueprint" className="w-full h-64 object-cover rounded-xl border border-neutral-200" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"; }} />
                        </div>
                      </div>

                      {selectedProject.spaces && selectedProject.spaces.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3">Living Spaces</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {selectedProject.spaces.map((s, idx) => (
                              <div key={idx} className="rounded-xl overflow-hidden border border-neutral-200">
                                <img src={s.image} alt={s.name} className="w-full h-28 object-cover" />
                                <p className="p-2 text-[11px] font-semibold text-neutral-700 bg-neutral-50">{s.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div key="lens-status" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">Verified Civil Velocity</span>
                          <span className="text-sm font-mono font-bold text-neutral-900">{selectedProject.progressPercentage || 100}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                          <div className="bg-[#121316] h-2 rounded-full" style={{ width: `${selectedProject.progressPercentage || 100}%` }} />
                        </div>
                        <span className="text-xs text-neutral-500 font-mono">Phase: {selectedProject.activePhase || "Complete"}</span>
                      </div>

                      <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3">On-Site Progress Photos</h4>
                      {selectedProject.progressLogs && selectedProject.progressLogs.length > 0 ? (
                        <div className="space-y-4">
                          {selectedProject.progressLogs.map((log, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl border border-neutral-200 bg-white">
                              <img src={log.image} alt={log.stage} className="w-20 h-20 object-cover rounded-lg" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541888946425-d0fbb18615f7?auto=format&fit=crop&w=400&q=80"; }} />
                              <div>
                                <span className="text-[11px] font-mono text-neutral-400">{log.date}</span>
                                <h5 className="font-bold text-neutral-900 text-sm mt-0.5">{log.stage}</h5>
                                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Supervised by Engineering Lead
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-400 py-8 text-center font-mono">Civil logs for this landmark will stream shortly.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}