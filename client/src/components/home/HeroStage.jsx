// client/src/components/home/HeroStage.jsx
// Hero: a crisp, full-colour, edge-to-edge photo (nothing over it, no fade) and ONE frosted-glass panel behind the text
// (headline, paragraph, buttons, chips, assurances). A solid white project tag sits on the tower. Only the tag moves on
// scroll, so the glass never has to re-blur while scrolling. transform/opacity only.
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { introWillPlay } from '../../lib/intro';

const ESPRESSO = '#2A1F1A';
const LIME = '#C6F00C';
const OLIVE = '#5C6E0A';
const CREAM = '#FAF8F5';

const MAIN = '/assets/01_hero/hero-main';
const LQIP = 'data:image/webp;base64,UklGRu4AAABXRUJQVlA4IOIAAACwBQCdASoYABgAPu1ur1KppiQiqAgBMB2JZgCdMoM3nBQu4uykTACwT41UWOTE7xnjSVOgUIAA8BviaDcGSMqrdx9RkU9XJqtVuGVyMzaAbtsCVBTQcxtJZ45rm45PyRu+vEpMZNl3Fto3GOwn62LwM1+h7A0DgZZBvvbs4ZSGHU5bs9oCiZve55fYKzjqEKHc+0B9naaCcVOiIPFk1fCUQurGgyWeO5qlB1aILBT/Ofcn2fSgSDyYquIl45n2grEKFngKeNfnPAOm5dRGI860+wYjsacvhMWI1/pdnEZiHgAA';

const WHATSAPP =
  'https://wa.me/8801916100416?text=Hello%20Space%20Maker,%20I%20would%20like%20to%20arrange%20a%20private%20visit.';

const AREAS = ['Jolshiri Abashon', 'Sabujbag', 'Dhanmondi'];
const LINES = [['Find', 'Your', 'Sanctuary'], ['in', 'Dhaka.']];

export default function HeroStage() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const base = reduce ? 0 : introWillPlay ? 1.35 : 0.15;
  const t = (d) => (reduce ? { duration: 0 } : { duration: 0.9, delay: base + d, ease: [0.22, 1, 0.36, 1] });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const tagY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);

  let w = 0;

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: CREAM, color: ESPRESSO }}>
      {/* photo: full colour, edge to edge, nothing on top of it */}
      <div
        className="absolute inset-x-0 top-0 z-0 h-[62svh] overflow-hidden lg:inset-y-0 lg:h-auto"
        style={{ backgroundImage: `url(${LQIP})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <motion.img
          src={`${MAIN}-1000.webp`}
          srcSet={`${MAIN}-1000.webp 1000w, ${MAIN}-2000.webp 2000w`}
          sizes="(min-width: 1024px) 100vw, 100vw"
          width="2000"
          height="2000"
          alt="Artist's impression of a Space Maker residential tower with balcony gardens at dusk, Sector 13"
          fetchPriority="high"
          decoding="async"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 2.4, delay: base - 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="sm-hero-img h-full w-full object-cover object-[50%_20%] lg:absolute lg:left-[20%] lg:w-full lg:max-w-none lg:object-[50%_32%]"
        />
      </div>

      {/* solid project tag on the tower (desktop) */}
      <motion.div
        style={{ y: tagY }}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1 }}
        transition={t(1)}
        className="absolute right-6 top-[40%] z-[5] hidden lg:block xl:right-10"
      >
        <div className="flex items-center gap-3.5 rounded-2xl bg-white py-3 pl-3 pr-5 shadow-[0_12px_30px_rgba(42,31,26,.2)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: ESPRESSO, color: LIME }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold">Sector 13, Jolshiri Abashon</span>
            <span className="mt-1 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(42,31,26,.7)' }}>G+M+8 &middot; Under construction</span>
          </span>
        </div>
      </motion.div>

      {/* the one frosted panel, behind all the text */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-4 pb-10 pt-[34svh] sm:px-8 lg:items-center lg:pb-10 lg:pt-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(-0.05)}
          className="sm-glass w-full max-w-[31rem] rounded-[24px] border border-white/15 p-5 sm:p-7 lg:p-8"
          style={{ color: '#F5F0E6' }}
        >
          <h1 className="font-['Space_Grotesk'] text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[3.3rem]">
            {LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((word) => {
                  const i = w++;
                  const last = li === 1 && word === 'Dhaka.';
                  return (
                    <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.16em] align-top">
                      <motion.span
                        className={`relative inline-block ${li === 1 ? 'font-serif font-normal italic' : ''}`}
                        style={li === 1 ? { color: LIME } : undefined}
                        initial={reduce ? false : { y: '110%' }}
                        animate={{ y: 0 }}
                        transition={t(0.1 + i * 0.09)}
                      >
                        {last && (
                          <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.02em] h-[0.2em] w-full overflow-visible">
                            <motion.path
                              d="M2 12 C 50 6, 140 16, 198 9"
                              fill="none"
                              stroke={LIME}
                              strokeWidth="7"
                              strokeLinecap="round"
                              initial={reduce ? false : { pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={reduce ? { duration: 0 } : { duration: 0.9, delay: base + 0.9, ease: 'easeInOut' }}
                            />
                          </svg>
                        )}
                        <span className="relative">{word}</span>
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.55)}
            className="mt-3 max-w-sm text-[15px] leading-[1.6] sm:text-base"
            style={{ color: 'rgba(245,240,230,.86)' }}
          >
            Homes shaped around sunlight, cross-breeze and calm, engineered to stand for generations.
          </motion.p>

          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={t(0.7)} className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 rounded-full py-1 pl-5 pr-1 text-sm font-bold transition-transform duration-300 active:scale-[0.97]"
              style={{ background: LIME, color: ESPRESSO }}
            >
              Explore residences
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full" style={{ background: ESPRESSO, color: LIME }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="absolute transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-7"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="absolute -translate-x-7 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full border-[1.5px] px-5 py-3 text-sm font-semibold transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#F5F0E6] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0"
              style={{ borderColor: '#F5F0E6' }}
            >
              Book a private visit
            </a>
          </motion.div>

          <motion.ul initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.85)} className="mt-3.5 flex flex-wrap gap-1.5">
            {AREAS.map((a) => (
              <li key={a}>
                <a
                  href="#projects"
                  className="inline-block rounded-full border px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 hover:border-[#C6F00C] hover:text-[#C6F00C]"
                  style={{ borderColor: 'rgba(245,240,230,.35)' }}
                >
                  {a}
                </a>
              </li>
            ))}
          </motion.ul>

        </motion.div>
      </div>

      <p className="absolute right-4 top-[calc(62svh-2rem)] z-10 rounded-full bg-white/90 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] sm:right-8 lg:right-6 lg:top-auto lg:bottom-5 xl:right-10" style={{ color: 'rgba(42,31,26,.8)' }}>
        Artist&rsquo;s impression &middot; Sector 13
      </p>

      <style>{`.sm-glass{background:rgba(42,31,26,.9);box-shadow:0 20px 50px rgba(20,12,8,.35)}@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.sm-glass{background:rgba(42,31,26,.6);-webkit-backdrop-filter:blur(14px) saturate(1.2);backdrop-filter:blur(14px) saturate(1.2)}}@media (min-width:1024px){.sm-hero-img{-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 14%);mask-image:linear-gradient(to right,transparent 0%,#000 14%)}}`}</style>
    </section>
  );
}
