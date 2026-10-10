// client/src/components/home/HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/* ---------- Logo paths (your uploaded files) ----------
   Tip: rename to logo-text.png / logo-icon.png and folder 00_brand to avoid
   spaces in URLs. Until then the encoded versions below work. */
const LOGO_ICON = '/assets/00brand/logo%20icon.png';

const CANVAS = '#FAF8F5';

/* ---------- Demo slides: swap for /assets/01_hero/hero-1.jpg etc. ---------- */
const slides = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
    title: 'FORM & SPACE',
    place: 'Jolshiri Abashon',
  },
  {
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80',
    title: 'Platinum Kusumbag',
    place: 'Sabujbag',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80',
    title: 'Moon Residence',
    place: 'Dinajpur Central',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80',
    title: 'Marchent Mahua',
    place: 'Jolshiri, Sector 16',
  },
];

const AUTOPLAY_MS = 5500;

/* ---------- Quiet information row (replaces the two big CTA buttons) ---------- */
const residences = [
  { area: 'Jolshiri Abashon', note: '3 & 4 bed residences' },
  { area: 'Sabujbag', note: 'Luxury suites' },
  { area: 'Dhanmondi Edge', note: 'Boutique address' },
];
const WHATSAPP =
  'https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20arrange%20a%20private%20visit.';

/* ---------- Butterfly ---------- */
function Butterfly({ size = 46, hue = '#C6F00C', delay = 0, duration = 34, reverse = false, topStart = 55 }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const xs = reverse
    ? ['110vw', '78vw', '50vw', '22vw', '-12vw']
    : ['-12vw', '22vw', '50vw', '78vw', '110vw'];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-30"
      style={{ top: `${topStart}%`, left: 0, width: size, height: size }}
      initial={{ x: xs[0], y: 0, rotate: 0 }}
      animate={{
        x: xs,
        y: [0, -90, 30, -70, -20],
        rotate: reverse ? [-18, 12, -10, 16, -8] : [18, -12, 10, -16, 8],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {/* gentle bob */}
      <motion.div
        animate={{ y: [0, -8, 0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: reverse ? 'scaleX(-1)' : undefined }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
          {/* left wing */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
            animate={{ scaleX: [1, 0.2, 1] }}
            transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50 48 C30 10, 4 14, 8 40 C10 58, 34 62, 50 52 Z" fill={hue} opacity="0.9" />
            <path d="M50 54 C32 58, 14 74, 26 86 C38 94, 48 72, 50 58 Z" fill={hue} opacity="0.7" />
            <circle cx="24" cy="36" r="4" fill="#1B4332" opacity="0.55" />
          </motion.g>
          {/* right wing */}
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            animate={{ scaleX: [1, 0.2, 1] }}
            transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M50 48 C70 10, 96 14, 92 40 C90 58, 66 62, 50 52 Z" fill={hue} opacity="0.9" />
            <path d="M50 54 C68 58, 86 74, 74 86 C62 94, 52 72, 50 58 Z" fill={hue} opacity="0.7" />
            <circle cx="76" cy="36" r="4" fill="#1B4332" opacity="0.55" />
          </motion.g>
          {/* body + antennae */}
          <rect x="48.5" y="40" width="3" height="26" rx="1.5" fill="#111827" />
          <path d="M50 40 C46 30, 42 28, 40 26 M50 40 C54 30, 58 28, 60 26" stroke="#111827" strokeWidth="1.2" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function HeroStage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);

  /* auto transition — stops while the mouse is over the image */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused]);

  /* parallax: watermark drifts slower than the page */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const wmY1 = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const wmY2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const slide = slides[index];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100vh]"
      style={{
        background: `linear-gradient(to bottom, ${CANVAS} 0%, #F6F2EA 70%, #F3EFE6 100%)`,
      }}
    >
      {/* ---------- Parallax logo watermarks, sitting in the empty spaces ---------- */}
      <motion.img
        src={LOGO_ICON}
        alt=""
        aria-hidden
        style={{ y: wmY1 }}
        className="pointer-events-none select-none absolute z-0 left-[-6%] bottom-[-4%] w-[420px] md:w-[560px] opacity-[0.07]"
      />
      <motion.img
        src={LOGO_ICON}
        alt=""
        aria-hidden
        style={{ y: wmY2 }}
        className="pointer-events-none select-none absolute z-0 right-[4%] top-[10%] w-[200px] md:w-[260px] opacity-[0.05] rotate-6"
      />
      {/* faint blueprint dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ---------- Blended image stage ---------- */}
      <motion.div
        style={{
          y: imgY,
          /* feathered edges: image dissolves into the background on every side */
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 72% at 62% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 78% 72% at 62% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)',
        }}
        className="absolute z-[1] right-0 top-[8%] h-[82%] w-full md:w-[72%] opacity-40 md:opacity-100"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* colour wash so every photo shares the brand's warm-green tone */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: 'linear-gradient(120deg, #EDF4EC 0%, #F3EFE6 100%)', opacity: 0.55 }}
        />
        {/* left fade so the headline can sit over the photo's edge */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${CANVAS} 0%, ${CANVAS}CC 22%, transparent 55%)` }}
        />
      </motion.div>

      {/* ---------- Butterflies flow over the whole hero ---------- */}
      <Butterfly size={52} hue="#C6F00C" duration={36} topStart={58} />
      <Butterfly size={34} hue="#9CCB7A" duration={44} delay={6} reverse topStart={30} />

      {/* ---------- Text ---------- */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-40 md:pt-48 pb-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur border border-neutral-200/80 text-[11px] font-semibold text-neutral-700 uppercase tracking-[0.2em] mb-7">
          <span className="w-2 h-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/20 animate-pulse" />
          Residences &middot; Dhaka
        </div>

        <h1 className="font-['Space_Grotesk'] font-extrabold tracking-tight leading-[1.04] text-[#111827] text-5xl sm:text-6xl md:text-7xl max-w-3xl">
          Find Your Sanctuary
          <br />
          <span className="font-serif italic font-normal text-[#1B4332]/80">in Dhaka.</span>
        </h1>

        {/* immediately after the heading: a quiet, editorial index instead of buttons */}
        <div className="mt-10 max-w-xl">
          <p className="text-neutral-600 text-base md:text-lg leading-[1.75]">
            Homes shaped around sunlight, cross-breeze and calm &mdash; engineered
            to stand for generations.
          </p>

          <ul className="mt-8 divide-y divide-neutral-300/60 border-y border-neutral-300/60">
            {residences.map((r) => (
              <li key={r.area}>
                <a
                  href="#projects"
                  className="group flex items-baseline justify-between gap-4 py-3 transition"
                >
                  <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-neutral-500 group-hover:text-[#1B4332] transition">
                    {r.area}
                  </span>
                  <span className="text-sm text-neutral-700 flex items-center gap-2">
                    {r.note}
                    <span className="inline-block translate-x-0 opacity-40 group-hover:translate-x-1 group-hover:opacity-100 transition">
                      &rarr;
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-xs text-neutral-500 hover:text-[#1B4332] underline underline-offset-4 decoration-neutral-300 hover:decoration-[#1B4332] transition"
          >
            Prefer to see it in person? Arrange a private visit
          </a>
        </div>
      </div>

      {/* ---------- Slide caption + progress, tucked bottom-right ---------- */}
      <div className="absolute z-20 bottom-8 right-6 md:right-12 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {slide.place}
            </div>
            <div className="font-['Space_Grotesk'] font-bold text-lg text-[#111827]">{slide.title}</div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-3 flex justify-end gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              aria-label={`Show ${s.title}`}
              onClick={() => setIndex(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === index ? 'w-10 bg-[#111827]' : 'w-5 bg-neutral-400/50 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* bottom dissolve into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[15]"
        style={{ background: 'linear-gradient(to bottom, transparent, #F3EFE6)' }}
      />
    </section>
  );
}