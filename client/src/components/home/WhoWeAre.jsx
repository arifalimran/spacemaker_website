// client/src/components/home/WhoWeAre.jsx
// Who we are: plain scrolling, one frame after another (no pinned stage), lots of empty space.
// Style: flat cream page; big rounded photo near the screen edge, short centred text on the other side, sides alternate.
// Fonts and colours follow BRAND.md: bold serif heading (f-display), body font from the page, JetBrains Mono labels.
// The five-ribbon join with the hero stays. No filters, no endless animation.
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { Reveal } from '../portfolio/shared';

const LIGHT = '/assets/01_hero/who-light';
const STRUCT = '/assets/01_hero/who-structure';
const LIME = '#C6DB3F';

/* Section copy. Plain text in the page, so search engines read all of it.
   SAMPLE: the short paragraphs under "How we design" and "How we build" are placeholders; replace with your own wording. */
const COPY = {
  eyebrow: 'Real estate developer in Dhaka, Bangladesh',
  heading: 'Twelve years of building homes the way we would build our own.',
  body: 'Space Maker is a real estate developer in Dhaka, Bangladesh. Our architects and engineers handle architectural design, structural design and construction under one roof, so every apartment is planned for safety, light and air.',
  places: 'Dhaka · Jolshiri · Narayanganj · Dinajpur · Chittagong',
  design: {
    num: '01',
    label: 'Architectural design',
    heading: 'How we design',
    text: 'Every plan starts with light and fresh air. We plan cross-ventilation into every flat, study daylight floor by floor, and draw balconies and greenery into the facade, so a home feels good before anyone moves in.',
    alt: 'Architectural design: a bright living room with tall windows and natural cross-ventilation, Space Maker apartment, Dhaka',
    img: `${LIGHT}-1232.webp`,
    srcSet: `${LIGHT}-800.webp 800w, ${LIGHT}-1232.webp 1232w`,
  },
  build: {
    num: '02',
    label: 'Structural design and safety',
    heading: 'How we build',
    text: 'Our own engineers design the structure. We use deep piling, lab-tested concrete and rebar, and inspect every stage, so every home is built safe for Bangladesh.',
    alt: 'Structural design and safety: reinforced concrete frame under construction, real estate project in Dhaka, Bangladesh',
    img: `${STRUCT}-2000.webp`,
    srcSet: `${STRUCT}-1000.webp 1000w, ${STRUCT}-2000.webp 2000w`,
  },
};

/* go to the Projects section (found by its data-key, so it works wherever the section sits) */
const goProjects = () => {
  const el = document.querySelector('[data-key="projects"]');
  if (!el) return;
  if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

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




const LINE_BG = 'linear-gradient(90deg, #2A1F1A, #5C6E0A 55%, #C6F00C)';
const CREAM = '#F3EFE6';

/* The photo behind the opening statement. 1600px wide, so it is shown only a little larger than the screen.
   Replace src with a wide, sharp render (2400px or more) with calm space on the left for the words. */
const INTRO_PHOTO = { src: '/assets/01_hero/hero-rayerbazar-1600.webp' };

/* Frame 1: full-screen photo, the statement over it (left side), with a soft espresso fade behind the words only */
function Intro() {
  return (
    <div className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#1A120E]">
      {/* the picture is a little wider than the screen and anchored left, so the building sits right of centre */}
      <img
        src={INTRO_PHOTO.src}
        alt="Space Maker residential tower with planted balconies, a real estate project in Dhaka, Bangladesh"
        decoding="async"
        className="absolute left-0 top-0 h-full w-full max-w-none object-cover lg:w-[118%]"
        style={{ objectPosition: '50% 35%' }}
      />
      <div aria-hidden className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(26,18,14,.88) 0%, rgba(26,18,14,.7) 55%, rgba(26,18,14,.45) 100%)' }} />
      <div aria-hidden className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(26,18,14,.88) 0%, rgba(26,18,14,.7) 32%, rgba(26,18,14,.25) 58%, rgba(26,18,14,0) 78%)' }} />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 sm:px-10 sm:pb-24 sm:pt-44 lg:px-14">
        <Reveal>
          <div className="max-w-xl lg:max-w-[34rem]">
            <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#C6DB3F]">
              <span aria-hidden className="h-[2px] w-9" style={{ background: LIME }} />
              {COPY.eyebrow}
            </span>
            <h2 className="f-display mt-7 text-[clamp(2.3rem,4.4vw,4.4rem)] font-bold leading-[1.05] text-[#FAF8F5]">{COPY.heading}</h2>
            <p className="mt-8 text-base leading-[1.8] text-[#FAF8F5]/90 sm:text-[17px]">{COPY.body}</p>
            <div className="mt-12 flex flex-col items-start gap-4">
              <div className="flex items-baseline gap-3">
                <span className="f-display text-7xl font-bold leading-none text-[#FAF8F5] sm:text-8xl">12</span>
                <span className="font-['JetBrains_Mono'] text-xs uppercase leading-snug tracking-[0.2em] text-[#FAF8F5]/75">
                  years in<br />real estate
                </span>
              </div>
              <p className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#FAF8F5]/70">{COPY.places}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* a frame: a big rounded photo near the screen edge and centred text on the other side. photoLeft flips the sides. */
function Frame({ d, photoLeft }) {
  return (
    <div className="px-3 pb-10 sm:px-4 sm:pb-12 lg:pb-14">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-12">
          <div className={`h-[420px] overflow-hidden rounded-[18px] bg-[#E4D8C7] sm:h-[560px] lg:h-[clamp(560px,82vh,780px)] lg:col-span-7 ${photoLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <img
              src={d.img}
              srcSet={d.srcSet}
              sizes="(min-width: 1024px) 58vw, 96vw"
              alt={d.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className={`px-4 py-16 text-center sm:px-10 lg:col-span-5 lg:px-14 lg:py-0 ${photoLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="mx-auto max-w-md">
              <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#5C6E0A]">
                {d.num} · {d.label}
              </span>
              <h3 className="f-display mt-6 text-4xl font-bold leading-[1.08] text-[#2A1F1A] sm:text-[2.6rem]">{d.heading}</h3>
              <p className="mt-8 text-[15px] leading-[1.85] text-[#4B3F37] sm:text-base">{d.text}</p>
              <button
                type="button"
                onClick={goProjects}
                className="mt-10 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5C6E0A]"
              >
                See our projects
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* Who we are: a flat cream page with big photo frames and lots of empty space. */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // progress of the join: 0 when this section's top enters the bottom of the screen, 1 when it reaches the top
  const { scrollYProgress: join } = useScroll({ target: ref, offset: ['start end', 'start 0'] });
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
      style={{ background: CREAM }}
    >
      <Intro />
      <div className="pt-10 sm:pt-12 lg:pt-14" />
      <Frame d={COPY.design} photoLeft />
      <Frame d={COPY.build} photoLeft={false} />
      <div className="pb-24 sm:pb-32 lg:pb-40" />
    </section>
    </>
  );
}
