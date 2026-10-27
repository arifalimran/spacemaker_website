import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { Reveal } from '../portfolio/shared';
import { BRAND } from '../../data/portfolio';

const ESPRESSO = '#2A1F1A';

const DETAIL = '/assets/01_hero/hero-detail';
const LIGHT = '/assets/01_hero/who-light';
const STRUCT = '/assets/01_hero/who-structure';

/* Section copy. Plain text in the page, so search engines read all of it. */
const COPY = {
  eyebrow: 'Real estate developer in Dhaka, Bangladesh',
  heading: 'Twelve years of building homes the way we would build our own.',
  body: 'Space Maker is a real estate developer in Dhaka, Bangladesh. Our architects and engineers handle architectural design, structural design and construction under one roof, so every apartment is planned for safety, light and air.',
  places: 'Dhaka · Jolshiri · Narayanganj · Dinajpur · Chittagong',
  design: {
    num: '01',
    label: 'Architectural design',
    heading: 'How we design',
    text: c.paragraphs[1],
    alt: 'Architectural design: a bright living room with tall windows and natural cross-ventilation, Space Maker apartment, Dhaka',
  },
  build: {
    num: '02',
    label: 'Structural design and safety',
    heading: 'How we build',
    text: 'Structural design by our own engineers, deep piling, lab-tested concrete and rebar, and inspection at every stage, so every home is built safe for Bangladesh.',
    alt: 'Structural design and safety: reinforced concrete frame under construction, real estate project in Dhaka, Bangladesh',
  },
};

/* a very small tiled film-grain, drawn by the browser (no image request) */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")`;

/* pinned, scroll-driven story on large screens; a calm stacked layout on phones and for reduced motion */
function useStageMode() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)');
    const f = () => setWide(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return wide && !reduce;
}

/* A photo tile: the picture drifts slowly inside its frame as you scroll (parallax) and eases out of a slight zoom. */
function PhotoTile({ src, srcSet, alt, caption, className = '', pos = '50% 50%' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  const scale = useTransform(p, [0, 0.5, 1], reduce ? [1.08, 1.08, 1.08] : [1.2, 1.1, 1.02]);
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-[28px] bg-[#2A1F1A] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-26px_rgba(42,31,26,0.6)] ${className}`}
    >
      <div className="absolute inset-0 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]">
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
      </div>
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ESPRESSO}55, transparent 55%)` }} />
      {/* a soft band of light sweeps across the photo on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-4 left-0 w-1/3 -translate-x-[160%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-[420%]"
      />
      {caption && (
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#2A1F1A]/75 transition-transform duration-500 group-hover:-translate-y-1">
          <span className="h-2 w-2 rounded-full bg-[#2A1F1A] ring-[3px] ring-[#C6F00C]" />
          {caption}
        </span>
      )}
    </div>
  );
}

/* Slow drifting pools of light behind the cards, so the section is never completely still. */
function AmbientLight() {
  const reduce = useReducedMotion();
  const drift = (x, y, d) => (reduce ? {} : { animate: { x, y, scale: [1, 1.12, 1] }, transition: { duration: d, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -right-24 top-24 h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(198,240,12,0.20), transparent 68%)' }}
        {...drift([-60, 40], [30, -30], 14)}
      />
      <motion.div
        className="absolute -left-20 top-[48%] h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(166,124,90,0.20), transparent 68%)' }}
        {...drift([50, -30], [-30, 40], 18)}
      />
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
  [100, 12, 'rgba(126,90,64,.40)'],
  [112, 18, 'rgba(88,62,44,.68)'],
  [130, 28, '#2A1F1A'],
  [158, 8, 'rgba(120,86,60,.36)'],
  [166, 5, 'rgba(160,120,88,.24)'],
];
const STACK_BOTTOM_LEFT = 171;
const CREAM_FILL = '#F3EFE6';


/* warm espresso tint, side fade and fine grain laid over a photo, so photos feel part of the hero's world */
function PhotoVeil({ side = 'right', tint = 0.2 }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 mix-blend-multiply" style={{ background: `rgba(58,42,32,${tint})` }} />
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to ${side}, rgba(42,31,26,0) 38%, rgba(42,31,26,.5) 100%)` }} />
      <div aria-hidden className="absolute inset-0 opacity-[0.11] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
    </>
  );
}

/* the frosted light-espresso card, same family as the hero card */
function SceneCard({ data, className = '' }) {
  return (
    <div className={`sm-glass-lite rounded-[24px] border border-white/20 p-6 text-[#F5F0E6] sm:p-8 ${className}`}>
      <span className="flex items-center gap-2.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#C6F00C]">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6F00C] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C6F00C]" />
        </span>
        {data.num} · {data.label}
      </span>
      <span aria-hidden className="mt-3 block h-[2px] w-10 rounded-full bg-[#C6F00C]" />
      <h3 className="f-display mt-6 text-3xl font-bold leading-tight text-[#F7F3E8] sm:text-4xl">{data.heading}</h3>
      <p className="mt-3 text-base leading-relaxed text-[#F5F0E6]/90 sm:text-lg">{data.text}</p>
    </div>
  );
}

/* one word of the heading: it thins out, blurs and drifts up as you scroll */
function Word({ word, p, a, b }) {
  const o = useTransform(p, [a, b], [1, 0]);
  const y = useTransform(p, [a, b], [0, -34]);
  const bl = useTransform(p, [a, b], [0, 9]);
  const filter = useTransform(bl, (v) => (v < 0.4 ? 'none' : `blur(${v}px)`));
  return (
    <motion.span style={{ opacity: o, y, filter }} className="inline-block will-change-transform">
      {word}
    </motion.span>
  );
}
function VanishHeading({ text, p, from, to, className }) {
  const words = text.split(' ');
  const span = to - from;
  const each = span * 0.45;
  return (
    <h2 className={className}>
      {words.map((w, i) => {
        const a = from + (span - each) * (i / (words.length - 1));
        return (
          <React.Fragment key={i}>
            <Word word={w} p={p} a={a} b={a + each} />
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </h2>
  );
}

/* On cream, lime alone nearly vanishes: lime pieces start dark (espresso, olive) and end in lime. */
const LINE_BG = 'linear-gradient(90deg, #2A1F1A, #5C6E0A 55%, #C6F00C)';
function CreamEyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1B4332]">
      <span aria-hidden className="h-[3px] w-9 rounded-full" style={{ background: LINE_BG }} />
      {children}
    </span>
  );
}

const H2 = 'f-display mt-6 text-4xl font-bold leading-[1.05] text-[#111827] sm:text-5xl lg:text-[clamp(3rem,5.2vw,5.4rem)]';

/* scene 1: the statement, the 12 years figure and the facade photo */
function Intro({ heading }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="lg:col-span-7">
        <CreamEyebrow>{COPY.eyebrow}</CreamEyebrow>
        {heading}
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#374151] sm:text-lg">{COPY.body}</p>
        <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-4">
          <div className="flex items-baseline gap-3">
            <span className="f-display text-7xl font-bold leading-none text-[#2A1F1A] sm:text-8xl">12</span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase leading-snug tracking-[0.2em] text-[#2A1F1A]/70">
              years in<br />real estate
            </span>
          </div>
          <span aria-hidden className="mb-3 hidden h-[4px] w-14 rounded-full sm:block" style={{ background: LINE_BG }} />
          <p className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#374151]/80">{COPY.places}</p>
        </div>
      </div>
      <div className="lg:col-span-5">
        <PhotoTile
          src={`${DETAIL}-700.webp`}
          srcSet={`${DETAIL}-700.webp 700w, ${DETAIL}-1400.webp 1400w`}
          alt="Architectural design detail: facade with planted balconies, residential building in Dhaka, Bangladesh"
          caption="Facade detail · Sector 13"
          className="h-[340px] sm:h-[420px] lg:h-[460px]"
          pos="50% 40%"
        />
      </div>
    </div>
  );
}

const QUOTE_WORDS = c.quote.split(' ');
const QUOTE_CLASS = 'f-display text-[clamp(2.1rem,4.9vw,4.9rem)] font-bold leading-[1.08] text-[#111827]';
const JEWEL = 'mx-auto mb-8 block h-3.5 w-3.5 rounded-full bg-[#2A1F1A] ring-[5px] ring-[#C6F00C] shadow-[0_0_0_10px_rgba(198,240,12,0.22)]';

function QWord({ w, p, a, b }) {
  const o = useTransform(p, [a, b], [0, 1]);
  const y = useTransform(p, [a, b], [38, 0]);
  return (
    <motion.span style={{ opacity: o, y }} className="inline-block will-change-transform">
      {w}
    </motion.span>
  );
}
/* big screens: the quote's words rise in one by one as the stage reaches its end, then it holds */
function PinnedQuote({ p }) {
  const n = QUOTE_WORDS.length;
  const jewelO = useTransform(p, [0.86, 0.9], [0, 1]);
  const lineS = useTransform(p, [0.94, 0.98], [0, 1]);
  return (
    <div className="mx-auto max-w-6xl px-8 text-center">
      <motion.span aria-hidden style={{ opacity: jewelO }} className={JEWEL} />
      <p className={QUOTE_CLASS}>
        {QUOTE_WORDS.map((w, i) => {
          const a = 0.88 + 0.05 * (i / (n - 1));
          return (
            <React.Fragment key={i}>
              <QWord w={w} p={p} a={a} b={a + 0.03} />
              {i < n - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
      </p>
      <motion.span aria-hidden style={{ scaleX: lineS, background: LINE_BG }} className="mx-auto mt-10 block h-[5px] w-28 origin-left rounded-full" />
    </div>
  );
}
function StaticQuote() {
  return (
    <div className="mx-auto max-w-6xl text-center">
      <span aria-hidden className={JEWEL} />
      <p className={QUOTE_CLASS}>{c.quote}</p>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 block h-[5px] w-28 origin-left rounded-full"
        style={{ background: LINE_BG }}
      />
    </div>
  );
}

/* LARGE SCREENS: a pinned stage. Scroll drives everything: heading vanishes, a photo window opens, the camera pushes in,
   a frosted card arrives after each photo, then the quote, and the stage lets go. */
function PinnedStory() {
  const ref = useRef(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // a light spring so quick wheel flicks still glide
  const p = useSpring(raw, { stiffness: 90, damping: 28, mass: 0.4 });
  const T = (inR, outR) => useTransform(p, inR, outR);
  /* timeline (share of the stage's scroll): pause, heading vanishes, window opens, photo 1 + card, hold,
     slow crossfade, photo 2 + card, hold, window closes, quote, hold */
  const introO = T([0.2, 0.32], [1, 0]);
  const introY = T([0.2, 0.32], [0, -40]);
  const winO = T([0.22, 0.34, 0.86, 0.91], [0, 1, 1, 0]);
  const winS = T([0.22, 0.34], [0.92, 1]);
  const ph1O = T([0.3, 0.4, 0.7, 0.71], [0, 1, 1, 0]);
  const ph1S = T([0.3, 0.46, 0.58, 0.72], [1.02, 1.07, 1.08, 1.14]);
  const ph1X = T([0.3, 0.46, 0.58, 0.72], ['-1.5%', '0%', '0.3%', '1.5%']);
  const b1 = T([0.3, 0.4], [10, 0]);
  const f1 = useTransform(b1, (v) => (v < 0.4 ? 'none' : `blur(${v}px)`));
  const ph2O = T([0.58, 0.7], [0, 1]);
  const ph2S = T([0.58, 0.74, 0.86, 0.91], [1.02, 1.07, 1.08, 1.12]);
  const ph2Y = T([0.58, 0.74, 0.86, 0.91], ['1.5%', '0.3%', '0%', '-1.2%']);
  const c1O = T([0.42, 0.5, 0.6, 0.66], [0, 1, 1, 0]);
  const c1Y = T([0.42, 0.5, 0.6, 0.66], [40, 0, 0, -30]);
  const c2O = T([0.72, 0.79, 0.82, 0.86], [0, 1, 1, 0]);
  const c2Y = T([0.72, 0.79, 0.82, 0.86], [40, 0, 0, -30]);
  const qO = T([0.86, 0.9], [0, 1]);
  const glowS = T([0, 0.3], [1, 1.4]);
  const glowO = T([0.06, 0.26], [1, 0]);

  return (
    <div ref={ref} className="relative h-[480vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* scene 1 */}
        <motion.div style={{ opacity: introO, y: introY }} className="absolute inset-0 flex items-center">
          <motion.div
            aria-hidden
            style={{ scale: glowS, opacity: glowO }}
            className="pointer-events-none absolute left-[2%] top-[26%] h-[420px] w-[620px] rounded-full blur-3xl"
          >
            <div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(198,240,12,0.20), rgba(190,150,110,0.10) 50%, transparent 72%)' }} />
          </motion.div>
          <div className="relative mx-auto w-full max-w-7xl px-8 pt-24">
            <Intro heading={<VanishHeading text={COPY.heading} p={p} from={0.08} to={0.22} className={H2} />} />
          </div>
        </motion.div>

        {/* scenes 2 and 3: a window of photography opens in the cream page */}
        <motion.div
          style={{ opacity: winO, scale: winS }}
          className="absolute inset-x-[3.5vw] bottom-[5vh] top-[11vh] overflow-hidden rounded-[32px] bg-[#2A1F1A] shadow-[0_40px_90px_-40px_rgba(42,31,26,0.6)]"
        >
          <motion.div style={{ opacity: ph1O }} className="absolute inset-0">
            <motion.img
              src={`${LIGHT}-1232.webp`}
              srcSet={`${LIGHT}-800.webp 800w, ${LIGHT}-1232.webp 1232w`}
              sizes="94vw"
              alt={COPY.design.alt}
              loading="lazy"
              decoding="async"
              style={{ scale: ph1S, x: ph1X, filter: f1, willChange: 'transform' }}
              className="h-full w-full object-cover"
            />
            <PhotoVeil side="left" tint={0.12} />
          </motion.div>
          <motion.div style={{ opacity: ph2O }} className="absolute inset-0">
            <motion.img
              src={`${STRUCT}-2000.webp`}
              srcSet={`${STRUCT}-1000.webp 1000w, ${STRUCT}-2000.webp 2000w`}
              sizes="94vw"
              alt={COPY.build.alt}
              loading="lazy"
              decoding="async"
              style={{ scale: ph2S, y: ph2Y, willChange: 'transform' }}
              className="h-full w-full object-cover"
            />
            <PhotoVeil side="right" tint={0.24} />
          </motion.div>
          <motion.div style={{ opacity: c1O, y: c1Y }} className="absolute bottom-[9%] right-[5%] w-[min(460px,38vw)]">
            <SceneCard data={COPY.design} />
          </motion.div>
          <motion.div style={{ opacity: c2O, y: c2Y }} className="absolute bottom-[9%] left-[5%] w-[min(460px,38vw)]">
            <SceneCard data={COPY.build} />
          </motion.div>
        </motion.div>

        {/* scene 4 */}
        <motion.div style={{ opacity: qO }} className="absolute inset-0 flex items-center justify-center">
          <PinnedQuote p={p} />
        </motion.div>
      </div>
    </div>
  );
}

/* PHONES / REDUCED MOTION: the same story, stacked and calm, with generous space */
function StaticScene({ img, srcSet, data, side, i }) {
  return (
    <Tile i={i}>
      <div className="relative h-[600px] overflow-hidden rounded-[28px] bg-[#2A1F1A] sm:h-[560px]">
        <img src={img} srcSet={srcSet} sizes="(min-width: 1024px) 90vw, 100vw" alt={data.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <PhotoVeil side={side === 'right' ? 'right' : 'left'} tint={side === 'right' ? 0.12 : 0.24} />
        <div className={`absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 lg:inset-x-auto lg:bottom-8 lg:w-[440px] ${side === 'right' ? 'lg:right-8' : 'lg:left-8'}`}>
          <SceneCard data={data} />
        </div>
      </div>
    </Tile>
  );
}
function StaticStory() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-36">
      <Reveal>
        <Intro heading={<h2 className={H2}>{COPY.heading}</h2>} />
      </Reveal>
      <div className="mt-24 space-y-14 sm:space-y-20">
        <StaticScene img={`${LIGHT}-1232.webp`} srcSet={`${LIGHT}-800.webp 800w, ${LIGHT}-1232.webp 1232w`} data={COPY.design} side="right" i={0} />
        <StaticScene img={`${STRUCT}-2000.webp`} srcSet={`${STRUCT}-1000.webp 1000w, ${STRUCT}-2000.webp 2000w`} data={COPY.build} side="left" i={0} />
      </div>
      <div className="mt-24">
        <StaticQuote />
      </div>
    </div>
  );
}

/* Who we are: one scroll story on a warm cream page that deepens to a light espresso. */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const pinned = useStageMode();
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
    <section
      ref={ref}
      id="about"
      className="sec-about relative z-10 overflow-clip"
      style={{ background: 'linear-gradient(180deg, #F3EFE6 0%, #F1EADD 40%, #EADFD0 78%, #E4D8C7 100%)' }}
    >
      <AmbientLight />
      <motion.img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        style={{ y: markY }}
        className="pointer-events-none absolute -left-[6%] bottom-[8%] z-0 w-[440px] select-none opacity-[0.07] md:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(#2A1F1A 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="relative z-10">{pinned ? <PinnedStory /> : <StaticStory />}</div>
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 block h-[clamp(36px,5vw,80px)] w-full">
        <path d="M0 52 L1440 4 V80 H0 Z" fill="rgba(110,78,56,.12)" />
        <path d="M0 68 L1440 28 V80 H0 Z" fill="rgba(84,58,42,.20)" />
      </svg>
    </section>
    <style>{`.sm-glass-lite{background:rgba(42,31,26,.82);box-shadow:0 20px 50px rgba(20,12,8,.3)}@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.sm-glass-lite{background:rgba(48,35,28,.5);-webkit-backdrop-filter:blur(16px) saturate(1.15);backdrop-filter:blur(16px) saturate(1.15)}}@media (max-width:1023px){.sm-glass-lite{background:rgba(42,31,26,.72);-webkit-backdrop-filter:none;backdrop-filter:none}}`}</style>
    </>
  );
}
