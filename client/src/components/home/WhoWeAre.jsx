import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { Eyebrow, Reveal } from '../portfolio/shared';
import { BRAND } from '../../data/portfolio';

const ESPRESSO = '#2A1F1A';

const DETAIL = '/assets/01_hero/hero-detail';
const RAYER = '/assets/01_hero/hero-rayerbazar';

/* A photo tile: the picture drifts slowly inside its frame as you scroll (parallax) and eases out of a slight zoom. */
function PhotoTile({ src, srcSet, alt, caption, className = '', pos = '50% 50%' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  const scale = useTransform(p, [0, 0.5, 1], reduce ? [1.08, 1.08, 1.08] : [1.2, 1.1, 1.02]);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[28px] bg-[#2A1F1A] ${className}`}>
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes="(min-width: 1024px) 40vw, 92vw"
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y, scale, objectPosition: pos, willChange: 'transform' }}
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ESPRESSO}55, transparent 55%)` }} />
      {caption && (
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#2A1F1A]/75">
          {caption}
        </span>
      )}
    </div>
  );
}

/* Every tile rises into place one after another as the ribbons above clear. */
function Tile({ i = 0, className = '', children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: Math.min(i, 5) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* One stack of five touching ribbons straddling the hero / Who we are boundary (drawn in a 1440 x 200 box, boundary at y = 130).
   Each is a slanted band (left lower, same direction as the Projects edge); p 0..1 sands it away from its low left end,
   thinning it while its lower edge stays put. */
const DROP = 50;
const bandPath = (yTopLeft, thick, p = 0) => {
  const k = -DROP / 1440;
  const x0 = Math.min(1640, -200 + 1900 * p);
  const x1 = 1640;
  const bot = (x) => yTopLeft + thick + k * x;
  const thin = thick * (1 - 0.55 * p);
  return `M${x0} ${bot(x0) - thin} L${x1} ${bot(x1) - thin} L${x1} ${bot(x1)} L${x0} ${bot(x0)} Z`;
};
// ribbons, top to bottom: [top edge at the left, thickness, fill]
const BANDS = [
  [100, 12, 'rgba(42,31,26,.34)'],
  [112, 18, 'rgba(42,31,26,.64)'],
  [130, 28, '#2A1F1A'],
  [158, 8, 'rgba(42,31,26,.30)'],
  [166, 5, 'rgba(42,31,26,.16)'],
];
const STACK_BOTTOM_LEFT = 171;
const CREAM_FILL = '#F3EFE6';

/* Who we are as a bento grid: the story, two photos, the quote and four pillars, rising in as the ribbons clear. */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '14%']);
  // progress of the join: 0 when this section's top enters the bottom of the screen, 1 when it reaches the top
  const { scrollYProgress: join } = useScroll({ target: ref, offset: ['start end', 'start 0'] });
  const mv = (a, b) => (reduce ? [0, 0] : [a, b]);
  const w0 = (from, to) => useTransform(join, [from, to], reduce ? [0, 0] : [0, 1]);
  const p0 = w0(0.2, 0.55);
  const p1 = w0(0.3, 0.65);
  const p2 = w0(0.4, 0.8);
  const p3 = w0(0.5, 0.9);
  const p4 = w0(0.6, 1);
  const d0 = useTransform(p0, (p) => bandPath(BANDS[0][0], BANDS[0][1], p));
  const d1 = useTransform(p1, (p) => bandPath(BANDS[1][0], BANDS[1][1], p));
  const d2 = useTransform(p2, (p) => bandPath(BANDS[2][0], BANDS[2][1], p));
  const d3 = useTransform(p3, (p) => bandPath(BANDS[3][0], BANDS[3][1], p));
  const d4 = useTransform(p4, (p) => bandPath(BANDS[4][0], BANDS[4][1], p));
  // the whole stack drifts down together, so no gap ever opens between ribbons
  const stackY = useTransform(join, [0, 1], reduce ? [0, 0] : [0, 36]);
  const stackX = useTransform(join, [0, 1], reduce ? [0, 0] : [0, -40]);
  const pillars = c.pillars || [];

  const fillD = `M-200 ${STACK_BOTTOM_LEFT + (200 * DROP) / 1440} L1640 ${STACK_BOTTOM_LEFT - (1640 * DROP) / 1440} V200 H-200 Z`;

  return (
    <>
    {/* the five-ribbon stack: a zero-height strip at the section's top edge; the drawing rises into the hero and falls into this section */}
    <div aria-hidden className="pointer-events-none relative z-20 h-0" style={{ '--stack-h': 'clamp(120px, 13vw, 190px)' }}>
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 block w-full" style={{ height: 'var(--stack-h)', top: 'calc(var(--stack-h) * -0.65)' }}>
        <path d={fillD} fill={CREAM_FILL} />
        <motion.g style={{ x: stackX, y: stackY }}>
          <motion.path d={d0} fill={BANDS[0][2]} />
          <motion.path d={d1} fill={BANDS[1][2]} />
          <motion.path d={d2} fill={BANDS[2][2]} />
          <motion.path d={d3} fill={BANDS[3][2]} />
          <motion.path d={d4} fill={BANDS[4][2]} />
        </motion.g>
      </svg>
    </div>
    <section ref={ref} id="about" className="sec-about relative z-10 overflow-hidden">
      <motion.img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        style={{ y: markY }}
        className="pointer-events-none absolute -left-[6%] bottom-[8%] z-0 w-[440px] select-none opacity-[0.07] md:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-36">
        <Reveal>
          <Eyebrow>Who we are</Eyebrow>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
          <Tile i={0} className="sm:col-span-2 lg:col-span-7">
            <div className="flex h-full min-h-[340px] flex-col justify-between gap-10 rounded-[28px] bg-[#FAF8F5] p-7 sm:p-10 lg:min-h-[440px]">
              <h2 className="f-display text-3xl font-bold leading-[1.08] text-[#111827] sm:text-5xl">{c.title}</h2>
              <p className="max-w-xl text-base leading-relaxed text-[#374151] sm:text-lg">{c.paragraphs[0]}</p>
            </div>
          </Tile>

          <Tile i={1} className="sm:col-span-2 lg:col-span-5">
            <PhotoTile
              src={`${DETAIL}-700.webp`}
              srcSet={`${DETAIL}-700.webp 700w, ${DETAIL}-1400.webp 1400w`}
              alt="Close-up of a Space Maker facade with planted balconies"
              caption="Facade detail · Sector 13"
              className="h-[360px] lg:h-full lg:min-h-[440px]"
              pos="50% 40%"
            />
          </Tile>

          <Tile i={2} className="lg:col-span-4">
            <div className="flex h-full min-h-[260px] flex-col justify-between gap-8 rounded-[28px] bg-[#C6F00C] p-7 text-[#2A1F1A] lg:min-h-[320px]">
              <span aria-hidden className="f-serif text-7xl leading-[0.6]">“</span>
              <p className="f-serif text-xl italic leading-snug sm:text-2xl">{c.quote}</p>
            </div>
          </Tile>

          <Tile i={3} className="lg:col-span-4">
            <PhotoTile
              src={`${RAYER}-800.webp`}
              srcSet={`${RAYER}-800.webp 800w, ${RAYER}-1600.webp 1600w`}
              alt="Space Maker residential project at Rayerbazar"
              className="h-[300px] lg:h-full lg:min-h-[320px]"
            />
          </Tile>

          <Tile i={4} className="sm:col-span-2 lg:col-span-4">
            <div className="flex h-full min-h-[260px] flex-col justify-between gap-8 rounded-[28px] bg-[#2A1F1A] p-7 text-[#F5F0E6] lg:min-h-[320px]">
              <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#C6F00C]">How we design</span>
              <p className="text-base leading-relaxed text-[#F5F0E6]/90 sm:text-lg">{c.paragraphs[1]}</p>
            </div>
          </Tile>

          {pillars.map((p, i) => (
            <Tile key={p.title} i={i + 1} className="lg:col-span-3">
              <div
                className="h-full min-h-[210px] rounded-[28px] p-6 transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:p-7"
                style={{ background: i % 2 === 0 ? '#EEF4DD' : '#FAF8F5' }}
              >
                <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#111827]">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="f-display mt-4 text-xl font-semibold text-[#1B4332]">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-[#374151]">{p.text}</p>
              </div>
            </Tile>
          ))}
        </div>
      </div>
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 block h-[clamp(36px,5vw,80px)] w-full">
        <path d="M0 52 L1440 4 V80 H0 Z" fill="rgba(42,31,26,.07)" />
        <path d="M0 68 L1440 28 V80 H0 Z" fill="rgba(42,31,26,.12)" />
      </svg>
    </section>
    </>
  );
}
