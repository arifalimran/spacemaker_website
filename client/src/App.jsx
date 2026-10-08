import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Compass, 
  HardHat, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  ChevronRight, 
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('architecture');
  const [selectedProject, setSelectedProject] = useState(null);

  // Core Value Propositions from presentation profile
  const valueProps = [
    { title: "Engineering Expertise", desc: "Every project begins with engineering—not assumptions.", icon: Compass },
    { title: "Transparent Partnership", desc: "Clear agreements. Open communication. No hidden decisions.", icon: ShieldCheck },
    { title: "Optimized Planning", desc: "Maximum utilization of land while maintaining quality.", icon: Layers },
    { title: "Professional Execution", desc: "Experienced engineers supervise every single stage.", icon: HardHat },
    { title: "Quality Construction", desc: "Attention to every structural and architectural detail.", icon: Building2 },
    { title: "Long-Term Relationship", desc: "We build enduring partnerships—not quick transactions.", icon: Sparkles }
  ];

  // Architectural Developments
  const architecturalProjects = [
    {
      id: "form-space",
      title: "FORM & SPACE",
      scale: "Proposed G+M+8 (Nine) Storied Residential Building",
      clients: "MAJ AKHTARUZZAMAN / MAJ ABDUS SALAM",
      location: "Plot ID: 13A - 501 - 025, Sector 13, Jolshiri Abashon, Dhaka",
      architect: "Hasib Uddin Ahmed",
      status: "Concept & Approvals",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      blueprint: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "platinum-kusumbag",
      title: "Platinum Kusumbag",
      scale: "10-Storied Premium Residential",
      clients: "Landowner Consortium",
      location: "10 Katha, Sabujbag, Dhaka",
      architect: "Hasib Uddin Ahmed",
      status: "Superstructure Phase",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      blueprint: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "moon-residence",
      title: "Moon Residence",
      scale: "10-Storied Mixed-Use Commercial & Living",
      clients: "Moon Jewelers",
      location: "8 Katha, Dinajpur Central",
      architect: "Hasib Uddin Ahmed",
      status: "Planning & Foundation",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      blueprint: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Interior Suites from Mouluvibazar Profile
  const interiorSuites = [
    {
      title: "Grand Living Lounge",
      specs: "Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Dining & Breakfast Bar Suite",
      specs: "Integrated smart appliances, breakfast counter, custom joinery, laundry concealment",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Executive Master Bedroom",
      specs: "High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Spa Ensuite Bathroom",
      specs: "Frameless walk-in glass shower, gold/brass fittings, circular backlit LED mirror",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#121316] font-sans selection:bg-[#C6F00C] selection:text-black">
      
      {/* Blueprint Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: 'radial-gradient(#121316 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Floating Header */}
      <header className="fixed top-6 left-0 right-0 z-40 px-4 md:px-8">
        <nav className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800">
              <span className="text-[#C6F00C] font-black text-lg">▲</span>
            </div>
            <div>
              <span className="font-bold tracking-widest text-base uppercase block leading-none">
                SPACE <span className="text-neutral-500 font-normal">MAKER</span>
              </span>
              <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium">
                where space defines luxury
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            <a href="#about" className="hover:text-black transition">Who We Are</a>
            <a href="#why-us" className="hover:text-black transition">Why Choose Us</a>
            <a href="#projects" className="hover:text-black transition">Developments</a>
            <a href="#interiors" className="hover:text-black transition">Interiors</a>
            <a href="#contact" className="hover:text-black transition">Contact</a>
          </div>

          <a 
            href="https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20discuss%20a%20land%20development%20project." 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#121316] hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C6F00C]" />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[11px] font-semibold text-neutral-700 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/20"></span>
          Engineering & Architecture
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#121316] leading-[1.08] max-w-4xl mb-8">
          Where Space <br />
          <span className="italic font-serif font-light text-neutral-500">Defines Luxury.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-neutral-200 pt-8">
          <p className="md:col-span-7 text-neutral-600 text-base md:text-lg leading-relaxed">
            Your land is more than a property. It represents years of hard work, sacrifice, and achievement. 
            At Space Maker Limited, we recognize that responsibility—protecting your interests while maximizing the 
            value of your land through engineering excellence, transparent communication, and disciplined execution.
          </p>
          <div className="md:col-span-5 flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="bg-[#121316] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-neutral-800 transition inline-flex items-center gap-2"
            >
              Direct Landowner Consultation
              <ChevronRight className="w-4 h-4 text-[#C6F00C]" />
            </a>
            <a 
              href="#projects" 
              className="bg-white border border-neutral-200 text-neutral-800 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-neutral-50 transition"
            >
              View Flagship Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Flagship Hero Render Showcase */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto mb-28">
        <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-xl group aspect-[16/9] md:aspect-[21/9]">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
            alt="Flagship Development" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-[#C6F00C] text-xs uppercase font-bold tracking-widest mb-1">Featured Development</span>
            <h3 className="text-2xl md:text-3xl font-bold">FORM & SPACE — Jolshiri Abashon</h3>
            <p className="text-xs md:text-sm text-neutral-300 max-w-xl mt-1">
              G+M+8 Storied Residential Landmark at Sector 13. Designed by Architect Hasib Uddin Ahmed.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="relative z-10 py-20 px-6 bg-white border-y border-neutral-200/80">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6F00C] bg-[#121316] px-3 py-1 rounded-md inline-block mb-4">
              Corporate Profile
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
              Who We Are
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm md:text-base mb-4">
              Space Maker Limited is a premium real estate development company dedicated to transforming valuable land into exceptional residential developments.
            </p>
            <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
              Behind every project is an experienced team of development professionals, architects, structural engineers, and project managers working together to ensure successful project delivery from concept to handover.
            </p>
          </div>

          <div className="md:col-span-7 bg-[#FAFAF9] rounded-2xl border border-neutral-200 p-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">Our Guiding Philosophy</h4>
            <blockquote className="text-xl md:text-2xl font-serif italic text-neutral-800 mb-6">
              “Every Great Development Begins with Trust, Transparency, and Disciplined Execution.”
            </blockquote>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-neutral-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#121316]"></span>
                Zero Compromise Structural Safety
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#121316]"></span>
                Clear Legal JV Frameworks
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#121316]"></span>
                Architectural Identity in Every Detail
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#121316]"></span>
                Guaranteed Milestone Timelines
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Space Maker Grid */}
      <section id="why-us" className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Value Proposition</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Why Choose Space Maker</h2>
          <p className="text-neutral-500 text-sm md:text-base">Engineering excellence • Transparent process • Lasting value</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl border border-neutral-200/80 hover:border-black/30 transition shadow-sm group"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 mb-6 group-hover:bg-[#121316] group-hover:text-[#C6F00C] transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">{prop.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{prop.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Architectural Developments Showcase */}
      <section id="projects" className="relative z-10 py-20 px-6 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Architectural Developments</h2>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200">
                Dhaka • Dinajpur • Jolshiri
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {architecturalProjects.map((project) => (
              <div 
                key={project.id}
                className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-neutral-800">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{project.title}</h3>
                    <p className="text-xs font-medium text-neutral-500 mb-4">{project.scale}</p>
                    
                    <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                      <div><strong className="text-neutral-800">Location:</strong> {project.location}</div>
                      <div><strong className="text-neutral-800">Client:</strong> {project.clients}</div>
                      <div><strong className="text-neutral-800">Architect:</strong> {project.architect}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-800 hover:bg-neutral-900 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <span>View Blueprint Specs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Environments Showcase */}
      <section id="interiors" className="relative z-10 py-24 px-6 bg-[#FAFAF9] border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#121316] bg-[#C6F00C] px-3 py-1 rounded-md inline-block mb-3">
              Interior Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Interior at Mouluvibazar</h2>
            <p className="text-neutral-500 text-sm">Client: Laila Group • Location: Sylhet • Architect: Hasib Uddin Ahmed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interiorSuites.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Consultation Form */}
      <section id="contact" className="relative z-10 py-24 px-6 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Direct Contact</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Let's Discuss Your Land</h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-8">
              Whether you hold residential land in Jolshiri, Dhanmondi, or regional hubs, our engineering and development team provides feasibility and joint-venture modeling.
            </p>

            <div className="space-y-4 text-sm text-neutral-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Corporate Office</div>
                  <div className="text-xs text-neutral-500">House 405, Road 29, Mohakhali DOHS, Dhaka</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Jalshiri Operations</div>
                  <div className="text-xs text-neutral-500">House 22, Road 505A, Sector 16, Jalshiri Abashon, Dhaka</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neutral-800 shrink-0" />
                <div>
                  <div className="font-bold">Direct Phone / WhatsApp</div>
                  <div className="text-xs text-neutral-500">+880 1916-100416</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-neutral-800 shrink-0" />
                <div>
                  <div className="font-bold">Official Email</div>
                  <div className="text-xs text-neutral-500">spacemakerbd@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#FAFAF9] p-8 rounded-3xl border border-neutral-200">
            <form onSubmit={(e) => { e.preventDefault(); alert('Consultation submitted. We will contact you directly.'); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Your Name</label>
                  <input required placeholder="e.g. Major Akhtaruzzaman" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Phone Number</label>
                  <input required placeholder="+880 17..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Land Location</label>
                  <input required placeholder="e.g. Jolshiri Sector 13" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Plot Size (Katha/Bigha)</label>
                  <input placeholder="e.g. 5 Katha" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">Inquiry / Details</label>
                <textarea rows={3} placeholder="Please share requirements or joint-venture goals..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black" />
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#121316] hover:bg-neutral-800 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2">
                <span>Submit Land Details</span>
                <Send className="w-4 h-4 text-[#C6F00C]" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Blueprint Spec Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-black font-bold text-sm bg-neutral-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C6F00C] bg-[#121316] px-2.5 py-1 rounded-md inline-block mb-3">
              Architectural Dossier
            </span>
            <h3 className="text-2xl font-extrabold text-neutral-900 mb-1">{selectedProject.title}</h3>
            <p className="text-xs text-neutral-500 mb-6">{selectedProject.scale}</p>

            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-200">
              <img src={selectedProject.blueprint} alt="Blueprint" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-neutral-700 border-t border-neutral-100 pt-4">
              <div><strong className="text-neutral-900">Plot / Geo:</strong> {selectedProject.location}</div>
              <div><strong className="text-neutral-900">Principal Architect:</strong> {selectedProject.architect}</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Dock (WhatsApp & Facebook Messenger) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-neutral-200 p-2 rounded-2xl shadow-xl">
        <a 
          href="https://m.me/spacemakerbd" 
          target="_blank" 
          rel="noreferrer"
          className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-sm"
          title="Message on Facebook"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a 
          href="https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20discuss%20a%20land%20development%20project." 
          target="_blank" 
          rel="noreferrer"
          className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white flex items-center justify-center transition shadow-sm"
          title="Chat on WhatsApp"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
