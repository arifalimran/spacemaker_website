import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { Eyebrow, Reveal } from '../portfolio/shared';
import { BRAND } from '../../data/portfolio';

const ESPRESSO = '#2A1F1A';
const COUNT = 4;

/* Drawn architectural elevation: the last-resort picture, so the slices are never blank. */
function elevationSvg() {
  const floors = 8;
  const top = 150;
  const fh = 90;
  const left = 170;
  const w = 460;
  const ground = top + floors * fh;
  let g = '';
  for (let f = 0; f < floors; f += 1) {
    const y = top + f * fh;
    g += `<line x1='${left}' y1='${y}' x2='${left + w}' y2='${y}' stroke='#2A1F1A' stroke-width='1.2'/>`;
    for (let k = 0; k < 4; k += 1) {
      const x = left + 28 + k * 108;
      g += `<rect x='${x}' y='${y + 18}' width='74' height='52' fill='#2A1F1A' fill-opacity='.10' stroke='#2A1F1A' stroke-width='1.4'/>`;
      g += `<line x1='${x + 37}' y1='${y + 18}' x2='${x + 37}' y2='${y + 70}' stroke='#2A1F1A' stroke-width='.8'/>`;
      g += `<line x1='${x - 6}' y1='${y + 76}' x2='${x + 80}' y2='${y + 76}' stroke='#2A1F1A' stroke-width='2'/>`;
    }
  }
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'>` +
    `<rect width='800' height='1000' fill='#EFE9DC'/>` +
    `<rect x='${left}' y='${top}' width='${w}' height='${floors * fh}' fill='#FAF8F5' stroke='#2A1F1A' stroke-width='2.5'/>` +
    `<rect x='${left - 14}' y='${top - 26}' width='${w + 28}' height='26' fill='#FAF8F5' stroke='#2A1F1A' stroke-width='2.5'/>` +
    `<rect x='${left + 150}' y='${top - 70}' width='160' height='44' fill='#FAF8F5' stroke='#2A1F1A' stroke-width='2'/>` +
    g +
    `<rect x='${left + 190}' y='${ground - 70}' width='80' height='70' fill='#2A1F1A' fill-opacity='.22' stroke='#2A1F1A' stroke-width='2'/>` +
    `<line x1='60' y1='${ground}' x2='740' y2='${ground}' stroke='#2A1F1A' stroke-width='3'/>` +
    `<line x1='110' y1='${top}' x2='110' y2='${ground}' stroke='#2A1F1A' stroke-width='1'/>` +
    `<line x1='102' y1='${top}' x2='118' y2='${top}' stroke='#2A1F1A' stroke-width='1.5'/>` +
    `<line x1='102' y1='${ground}' x2='118' y2='${ground}' stroke='#2A1F1A' stroke-width='1.5'/>` +
    `<text x='84' y='${(top + ground) / 2}' font-family='monospace' font-size='15' fill='#2A1F1A' transform='rotate(-90 84 ${(top + ground) / 2})' text-anchor='middle'>G+M+8 ELEVATION</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* Tries your real project renders first, in order, then the drawn elevation.
   Override: add  sliceImage: '/assets/...'  to aboutContent in siteContent.js */
const CANDIDATES = [
  '/assets/03_developments/ongoing/form-and-space/hero/render.jpg',
  '/assets/03_developments/flagships/moon-residence/hero/facade.jpg',
  '/assets/03_developments/ongoing/platinum-kusumbag/hero/render.jpg',
];

function useFirstWorking(list) {
  const [src, setSrc] = useState(null);
  const key = list.join('|');
  useEffect(() => {
    let dead = false;
    (async () => {
      for (const url of list) {
        // a missing file under Vite returns index.html with status 200: Image() still fails, so this is safe
        const ok = await new Promise((res) => {
          const im = new Image();
          im.onload = () => res(true);
          im.onerror = () => res(false);
          im.src = url;
        });
        if (dead) return;
        if (ok) {
          setSrc(url);
          return;
        }
      }
      if (!dead) setSrc(elevationSvg());
    })();
    return () => {
      dead = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return src;
}

/* Scroll-linked offsets: slice i drifts and fades while you scroll down, realigns when you scroll up */
const SHIFT_Y = [-64, 44, -34, 76];
const SHIFT_X = [-20, -7, 7, 20];

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function Slice({ i, src, progress, enter, still }) {
  const k = still ? 0 : 1;
  // arrives from a small offset and settles into one picture as the ribbons above vanish, then drifts away on the way out
  const y = useTransform([progress, enter], ([p, e]) => k * (SHIFT_Y[i] * clamp01((p - 0.1) / 0.9) - SHIFT_Y[i] * 0.7 * (1 - e)));
  const x = useTransform([progress, enter], ([p, e]) => k * (SHIFT_X[i] * clamp01((p - 0.1) / 0.9) - SHIFT_X[i] * 0.7 * (1 - e)));
  const opacity = useTransform([progress, enter], ([p, e]) => {
    const a = 0.18 + i * 0.05;
    const b = 0.82 + i * 0.05;
    const out = 1 - clamp01((p - a) / (b - a));
    return out * (still ? 1 : 0.25 + 0.75 * clamp01(e));
  });

  return (
    <motion.div
      style={{ x, y, opacity, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
      className="relative h-full flex-1 overflow-hidden"
    >
      {/* the same photo on every slice, shifted so the four pieces join into one picture */}
      <div
        className="absolute top-0 h-full"
        style={{
          width: `${COUNT * 100}%`,
          left: `-${i * 100}%`,
          backgroundColor: '#DCE9DA',
          backgroundImage: src ? `url("${src}")` : 'linear-gradient(135deg,#DCE9DA,#EDF4EC)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* espresso tint: a plain overlay (no blend mode), cheap to paint while the slices move */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${ESPRESSO}8C, ${ESPRESSO}47 55%, ${ESPRESSO}33)` }}
      />
    </motion.div>
  );
}

function SlicedPhoto({ src, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // 0 while the photo is in the reading zone (one whole picture), up to 1 as it leaves the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.15', 'end 0.05'] });
  // 0 as the photo rises into view, 1 once it is in the reading zone
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.45'] });
  const slices = useMemo(() => Array.from({ length: COUNT }, (_, i) => i), []);
  return (
    <div ref={ref} className={`relative flex ${className}`}>
      {slices.map((i) => (
        <Slice key={i} i={i} src={src} progress={scrollYProgress} enter={enter} still={reduce} />
      ))}
    </div>
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

/* The quiet second beat: the story on the left, one elevation cut into four slices on the right. */
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
  const list = useMemo(() => (c.sliceImage ? [c.sliceImage, ...CANDIDATES] : CANDIDATES), []);
  const src = useFirstWorking(list);

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

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-36 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-6">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="f-display mt-5 text-3xl font-bold leading-[1.08] text-[#111827] sm:text-5xl">{c.title}</h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[#374151] sm:text-lg">
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-10 max-w-xl border-l-4 border-[#C6F00C] pl-6">
            <p className="f-serif text-xl italic leading-snug text-[#1B4332] sm:text-2xl">“{c.quote}”</p>
          </blockquote>
        </Reveal>

        <div className="md:col-span-6">
          <SlicedPhoto src={src} className="h-[420px] sm:h-[560px]" />
        </div>
      </div>

      <ul className="relative z-10 mx-auto grid max-w-7xl gap-x-8 gap-y-8 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="border-t border-[#1B4332]/20 pt-5"
          >
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#111827]">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="f-display mt-3 text-xl font-semibold text-[#1B4332]">{p.title}</h3>
            <p className="mt-1.5 leading-relaxed text-[#374151]">{p.text}</p>
          </motion.li>
        ))}
      </ul>
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 block h-[clamp(36px,5vw,80px)] w-full">
        <path d="M0 52 L1440 4 V80 H0 Z" fill="rgba(42,31,26,.07)" />
        <path d="M0 68 L1440 28 V80 H0 Z" fill="rgba(42,31,26,.12)" />
      </svg>
    </section>
    </>
  );
}
