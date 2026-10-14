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

function Slice({ i, src, progress, still }) {
  const k = still ? 0 : 1;
  const y = useTransform(progress, [0.1, 1], [0, SHIFT_Y[i] * k]);
  const x = useTransform(progress, [0.1, 1], [0, SHIFT_X[i] * k]);
  const opacity = useTransform(progress, [0.18 + i * 0.05, 0.82 + i * 0.05], [1, 0]);

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
  const slices = useMemo(() => Array.from({ length: COUNT }, (_, i) => i), []);
  return (
    <div ref={ref} className={`relative flex ${className}`}>
      {slices.map((i) => (
        <Slice key={i} i={i} src={src} progress={scrollYProgress} still={reduce} />
      ))}
    </div>
  );
}

/* The quiet second beat: the story on the left, one elevation cut into four slices on the right. */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '14%']);
  const pillars = c.pillars || [];
  const list = useMemo(() => (c.sliceImage ? [c.sliceImage, ...CANDIDATES] : CANDIDATES), []);
  const src = useFirstWorking(list);

  return (
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

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32 md:grid-cols-12 md:gap-10">
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
    </section>
  );
}
