import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';

/* ---------- Brand assets (match your 00_brand folder) ---------- */
const LOGO_TEXT = '/assets/00_brand/logo-text.png';
const WATERMARK = '/assets/00_brand/emblem-watermark.svg';

const CANVAS = '#FAF8F5';

/* Same feathered mask the hero uses, so both sections feel like one film */
const MASK =
  'radial-gradient(ellipse 78% 72% at 62% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)';

/* One frame per pillar, in order. Swap for your own renders, e.g.
   '/assets/03_developments/ongoing/form-and-space/progress/piling.jpg'.
   Optional: add `scenes: [{src, place}, ...]` to aboutContent to override. */
const DEMO_SCENES = [
  {
    src: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f7?auto=format&fit=crop&w=1800&q=80',
    place: 'On site, Jolshiri',
  },
  {
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80',
    place: 'Daylight study',
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80',
    place: 'Approved drawings',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80',
    place: 'Moon Residence, handed over',
  },
];

/* ---------- One butterfly drifting through the scene (echoes the hero) ---------- */
function Butterfly({ size = 40 }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-30"
      style={{ top: '62%', left: 0, width: size, height: size }}
      initial={{ x: '-12vw' }}
      animate={{
        x: ['-12vw', '25vw', '55vw', '80vw', '110vw'],
        y: [0, -70, 20, -60, -10],
        rotate: [16, -10, 8, -14, 6],
      }}
      transition={{ duration: 38, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M50 48 C30 10, 4 14, 8 40 C10 58, 34 62, 50 52 Z" fill="#C6F00C" opacity="0.9" />
          <path d="M50 54 C32 58, 14 74, 26 86 C38 94, 48 72, 50 58 Z" fill="#C6F00C" opacity="0.7" />
        </motion.g>
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.42, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M50 48 C70 10, 96 14, 92 40 C90 58, 66 62, 50 52 Z" fill="#C6F00C" opacity="0.9" />
          <path d="M50 54 C68 58, 86 74, 74 86 C62 94, 52 72, 50 58 Z" fill="#C6F00C" opacity="0.7" />
        </motion.g>
        <rect x="48.5" y="40" width="3" height="26" rx="1.5" fill="#111827" />
      </svg>
    </motion.div>
  );
}

/* ---------- Film progress: one segment per chapter ---------- */
function Tick({ progress, i, n, current, label }) {
  const fill = useTransform(progress, [i / n, (i + 1) / n], [0, 1]);
  return (
    <div className="flex-1">
      <div className="h-[4px] overflow-hidden rounded-full bg-[#1B4332]/15">
        <motion.div style={{ scaleX: fill, transformOrigin: 'left' }} className="h-full bg-[#C6F00C]" />
      </div>
      <span
        className={`mt-2 hidden font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] transition-colors duration-500 sm:block ${
          current ? 'text-[#1B4332]' : 'text-neutral-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const sceneRef = useRef(null);
  const [active, setActive] = useState(0);

  const chapters = c.pillars;
  const n = chapters.length;
  const scenes = c.scenes && c.scenes.length >= n ? c.scenes : DEMO_SCENES;

  /* scrolling through the tall wrapper plays the film */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const markY = useTransform(scrollYProgress, [0, 1], ['-6%', '14%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-3%', '5%']);

  const scene = scenes[active];

  return (
    <section
      id="about"
      className="sec-about relative z-10"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #EDF4EC 55%, #F6F8F5 100%)' }}
    >
      {/* ---------- Prologue ---------- */}
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
        <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1B4332]">
          <span className="h-[2px] w-8 bg-[#C6F00C]" />
          Who we are
        </span>
        <h2 className="f-display mt-5 max-w-4xl text-3xl font-bold leading-[1.08] text-[#111827] sm:text-5xl">
          {c.title}
        </h2>
        <div className="mt-8 grid max-w-4xl gap-5 text-base leading-relaxed text-[#374151] sm:text-lg md:grid-cols-2 md:gap-10">
          {c.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* ---------- The film: tall wrapper, sticky stage ---------- */}
      <div ref={sceneRef} style={{ height: `${n * 85 + 15}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* logo watermark drifting in the negative space */}
          <motion.img
            src={WATERMARK}
            alt=""
            aria-hidden
            style={{ y: markY }}
            className="pointer-events-none absolute -left-[6%] bottom-[-6%] z-0 w-[460px] select-none opacity-[0.08] md:w-[580px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* image stage: identical feathering to the hero */}
          <motion.div
            style={{ y: imgY, WebkitMaskImage: MASK, maskImage: MASK }}
            className="absolute right-0 top-[6%] z-[1] h-[84%] w-full opacity-40 md:w-[72%] md:opacity-100"
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={scene.src}
                src={scene.src}
                alt={scene.place}
                initial={{ opacity: 0, scale: reduce ? 1 : 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ background: 'linear-gradient(120deg, #EDF4EC 0%, #F3EFE6 100%)', opacity: 0.55 }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, ${CANVAS} 0%, ${CANVAS}CC 22%, transparent 55%)` }}
            />
          </motion.div>

          <Butterfly />

          {/* chapter text, changes in sync with the frame */}
          <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reduce ? 0 : 22, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: reduce ? 0 : -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1B4332]">
                    <span className="h-[2px] w-8 bg-[#C6F00C]" />
                    Chapter {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                  </span>
                  <h3 className="f-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-6xl">
                    {chapters[active].title}
                  </h3>
                  <p className="mt-6 text-base leading-[1.8] text-[#374151] sm:text-lg">
                    {chapters[active].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* frame caption, bottom right, same spot as the hero's */}
          <div className="absolute bottom-24 right-6 z-20 text-right md:right-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.place}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
                className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500"
              >
                {scene.place}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* film progress rail */}
          <div className="absolute inset-x-0 bottom-8 z-20 mx-auto flex max-w-7xl gap-3 px-5 sm:px-8">
            {chapters.map((ch, i) => (
              <Tick
                key={ch.title}
                progress={scrollYProgress}
                i={i}
                n={n}
                current={i === active}
                label={ch.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- End title: the logo gets its moment ---------- */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative grid items-center gap-10 overflow-hidden rounded-3xl bg-[#111827] px-8 py-14 md:grid-cols-12 md:px-14"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <blockquote className="relative border-l-4 border-[#C6F00C] pl-6 md:col-span-7">
            <p className="f-serif text-2xl leading-snug text-[#F3EFE6] sm:text-4xl">“{c.quote}”</p>
          </blockquote>
          <div className="relative flex justify-center md:col-span-5 md:justify-end">
            <img src={LOGO_TEXT} alt="Space Maker, where space defines luxury" className="w-full max-w-[340px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}