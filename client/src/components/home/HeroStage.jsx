// client/src/components/home/HeroStage.jsx
// Hero: dark espresso stage. The Sector 13 tower stands on the right with a floating facade close-up in front;
// outlined "SPACE MAKER" lettering drifts behind. Layers move at different speeds on scroll (desktop), the headline
// rises word by word, "Dhaka." gets a hand-drawn lime underline. One preloaded photo (WebP, two sizes) + a tiny
// blurred placeholder so the first paint is instant. transform/opacity only; no blur, no filters.
// Phones: one photo, no parallax. Reduced motion: everything is simply there.
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { introWillPlay } from '../../lib/intro';

const ESPRESSO = '#2A1F1A';
const STAGE = '#3B2B22'; // warmer and lighter than the buttons' espresso, so it sits well with the dusk photo
const LIME = '#C6F00C';
const IVORY = '#F5F0E6';

const MAIN = '/assets/01_hero/hero-main';
const DETAIL = '/assets/01_hero/hero-detail';
const LQIP = 'data:image/webp;base64,UklGRu4AAABXRUJQVlA4IOIAAACwBQCdASoYABgAPu1ur1KppiQiqAgBMB2JZgCdMoM3nBQu4uykTACwT41UWOTE7xnjSVOgUIAA8BviaDcGSMqrdx9RkU9XJqtVuGVyMzaAbtsCVBTQcxtJZ45rm45PyRu+vEpMZNl3Fto3GOwn62LwM1+h7A0DgZZBvvbs4ZSGHU5bs9oCiZve55fYKzjqEKHc+0B9naaCcVOiIPFk1fCUQurGgyWeO5qlB1aILBT/Ofcn2fSgSDyYquIl45n2grEKFngKeNfnPAOm5dRGI860+wYjsacvhMWI1/pdnEZiHgAA';

const WHATSAPP =
  'https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20arrange%20a%20private%20visit.';

const AREAS = ['Jolshiri Abashon', 'Sabujbag', 'Dhanmondi'];
// from your existing assurances; swap in real counters (projects delivered, families at home) whenever you have them
const PROOF = ['Documented approvals', 'Earthquake-engineered structure', 'Our own site engineers'];

const LINES = [['Find', 'Your', 'Sanctuary'], ['in', 'Dhaka.']];

export default function HeroStage() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const base = reduce ? 0 : introWillPlay ? 1.35 : 0.15; // wait for the curtain on the first visit
  const t = (d) => (reduce ? { duration: 0 } : { duration: 0.9, delay: base + d, ease: [0.22, 1, 0.36, 1] });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const detailY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -90]);
  const wordX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 60]);

  let w = 0;

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden" style={{ background: STAGE, color: IVORY }}>
      {/* soft light from the top-left + faint dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 55% 70% at 78% 38%, rgba(226,158,96,.38) 0%, rgba(226,158,96,0) 70%), radial-gradient(ellipse 70% 60% at 12% 8%, #5A4234 0%, rgba(59,43,34,0) 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(${LIME} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      {/* outlined lettering drifting sideways (desktop) */}
      <motion.div
        aria-hidden
        style={{ x: wordX, WebkitTextStroke: '1.5px rgba(245,240,230,.10)', color: 'transparent' }}
        className="pointer-events-none absolute bottom-[6%] left-[2%] z-0 hidden select-none whitespace-nowrap font-['Space_Grotesk'] text-[17vw] font-extrabold uppercase leading-none tracking-tight lg:block"
      >
        Space Maker
      </motion.div>

      {/* main photo: right half on desktop, full background on phones */}
      <motion.div
        className="sm-photo absolute inset-0 z-[1] overflow-hidden lg:left-auto lg:w-[60%]"
        style={{ y: photoY, backgroundImage: `url(${LQIP})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <motion.img
          src={`${MAIN}-1000.webp`}
          srcSet={`${MAIN}-1000.webp 1000w, ${MAIN}-2000.webp 2000w`}
          sizes="(min-width: 1024px) 60vw, 100vw"
          width="2000"
          height="2000"
          alt="Artist's impression of a Space Maker residential tower with balcony gardens at dusk, Sector 13"
          fetchPriority="high"
          decoding="async"
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 2.6, delay: base - 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover object-[50%_18%] lg:object-[50%_30%]"
        />
      </motion.div>

      {/* floating facade close-up in front (desktop) */}
      <motion.figure
        style={{ y: detailY }}
        initial={reduce ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={t(0.9)}
        className="absolute bottom-[12%] right-[5%] z-[5] hidden w-[17vw] max-w-[260px] lg:block"
      >
        <div className="overflow-hidden rounded-[14px] border-[1.5px]" style={{ borderColor: IVORY, boxShadow: '10px 10px 0 rgba(198,240,12,.9)' }}>
          <img src={`${DETAIL}-700.webp`} srcSet={`${DETAIL}-700.webp 700w, ${DETAIL}-1400.webp 1400w`} sizes="260px" width="700" height="960" alt="Close-up of a Space Maker facade with planted balconies" loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover" />
        </div>
        <figcaption className="mt-5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,230,.7)' }}>
          Balcony gardens
        </figcaption>
      </motion.figure>

      {/* text */}
      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto max-w-7xl px-5 pb-28 pt-[44svh] sm:px-8 lg:pb-32 lg:pt-44">
        <div className="max-w-[44rem]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0)}
            className="inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]"
            style={{ borderColor: 'rgba(245,240,230,.28)' }}
          >
            <span className="relative h-2 w-2">
              <span className="absolute inset-0 rounded-full motion-safe:animate-ping" style={{ background: LIME, opacity: 0.6 }} />
              <span className="absolute inset-0 rounded-full" style={{ background: LIME }} />
            </span>
            Residences &middot; Dhaka
          </motion.div>

          <h1 style={{ textShadow: '0 2px 28px rgba(30,20,15,.35)' }} className="mt-6 font-['Space_Grotesk'] text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem] xl:text-[5.5rem]">
            {LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((word) => {
                  const i = w++;
                  const last = li === 1 && word === 'Dhaka.';
                  return (
                    <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-top">
                      <motion.span
                        className={`relative inline-block ${li === 1 ? "font-serif font-normal italic" : ''}`}
                        style={li === 1 ? { color: LIME } : undefined}
                        initial={reduce ? false : { y: '110%' }}
                        animate={{ y: 0 }}
                        transition={t(0.1 + i * 0.09)}
                      >
                        {word}
                        {last && (
                          <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full overflow-visible">
                            <motion.path
                              d="M2 9 C 40 2, 120 13, 198 4"
                              fill="none"
                              stroke={LIME}
                              strokeWidth="3"
                              strokeLinecap="round"
                              initial={reduce ? false : { pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={reduce ? { duration: 0 } : { duration: 0.9, delay: base + 0.9, ease: 'easeInOut' }}
                            />
                          </svg>
                        )}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.55)}
            className="mt-6 max-w-lg text-base leading-[1.75] sm:text-lg"
            style={{ color: 'rgba(245,240,230,.78)' }}
          >
            Homes shaped around sunlight, cross-breeze and calm, engineered to stand for generations.
          </motion.p>

          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={t(0.7)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-bold transition-transform duration-300 active:scale-[0.97]"
              style={{ background: LIME, color: ESPRESSO }}
            >
              Explore residences
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full" style={{ background: ESPRESSO, color: LIME }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="absolute transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-7"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="absolute -translate-x-7 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full border-[1.5px] px-6 py-3.5 text-sm font-semibold transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#F5F0E6] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0"
              style={{ borderColor: IVORY }}
            >
              Book a private visit
            </a>
          </motion.div>

          <motion.ul initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.85)} className="mt-6 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <li key={a}>
                <a
                  href="#projects"
                  className="inline-block rounded-full border px-3.5 py-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 hover:border-[#C6F00C] hover:text-[#C6F00C]"
                  style={{ borderColor: 'rgba(245,240,230,.28)', color: 'rgba(245,240,230,.85)' }}
                >
                  {a}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.ul initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t(1)} className="mt-9 grid max-w-xl gap-2.5 border-t pt-5 sm:grid-cols-3" style={{ borderColor: 'rgba(245,240,230,.16)' }}>
            {PROOF.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[13px] leading-snug" style={{ color: 'rgba(245,240,230,.85)' }}>
                <span className="mt-[5px] h-1.5 w-1.5 flex-none rounded-full" style={{ background: LIME }} />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* scroll cue + image note */}
      <div className="absolute bottom-6 left-5 z-10 flex items-center gap-3 sm:left-8">
        <span className="relative h-10 w-[2px] overflow-hidden rounded-full" style={{ background: 'rgba(245,240,230,.2)' }}>
          <span className="sm-cue absolute left-0 top-0 h-3 w-full rounded-full" style={{ background: LIME }} />
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(245,240,230,.7)' }}>Scroll</span>
      </div>
      <div className="absolute bottom-6 right-5 z-10 text-right font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] sm:right-8" style={{ color: 'rgba(245,240,230,.6)' }}>
        Artist&rsquo;s impression &middot; Sector 13
      </div>
      <style>{`.sm-photo{-webkit-mask-image:linear-gradient(to bottom,#000 38%,transparent 82%);mask-image:linear-gradient(to bottom,#000 38%,transparent 82%)}@media (min-width:1024px){.sm-photo{-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 32%),linear-gradient(to top,transparent 0%,#000 12%);mask-image:linear-gradient(to right,transparent 0%,#000 32%),linear-gradient(to top,transparent 0%,#000 12%);-webkit-mask-composite:source-in;mask-composite:intersect}}.sm-cue{animation:smCue 2.2s cubic-bezier(.65,0,.35,1) infinite}@keyframes smCue{0%{transform:translateY(-100%)}70%,100%{transform:translateY(340%)}}@media (prefers-reduced-motion:reduce){.sm-cue{animation:none;transform:translateY(60%)}}`}</style>

      {/* the page rises over the hero's lower edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[12] h-6 rounded-t-[28px]" style={{ background: '#F3EFE6' }} />
    </section>
  );
}
