// client/src/components/home/WhyChooseUs.jsx
// Why choose us, for BUYERS. Compact: three equal cards (design, materials, on-time delivery) on solid espresso.
// On-time delivery is a vertical milestone track: the lime line fills top to bottom and each milestone lights up in turn.
// Plain gradients/rgba only (no CSS filters). Reduced motion: track shown complete.
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { WHY_US } from '../../data/portfolio';
import { Eyebrow, Reveal } from '../portfolio/shared';

const LIME = '#C6F00C';

// On-time delivery track. Loops by itself while on screen (9s cycle): a glowing lime pulse runs from Design down to
// Handover, each milestone lights up and sends out a ring as it passes, Handover glows, then the track fades and restarts.
// transform/opacity/colour only. Reduced motion: finished track, no pulse.
const CYCLE = 9;
const SWEEP = 0.72; // fraction of the cycle the pulse takes to reach the last milestone

function Track({ items: raw }) {
  const items = raw[0] === 'Design' ? raw : ['Design', ...raw];
  const n = items.length;
  const ref = useRef(null);
  const olRef = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' });
  const [h, setH] = React.useState(160);
  React.useLayoutEffect(() => {
    if (olRef.current) setH(Math.max(40, olRef.current.offsetHeight - 18));
  }, [n]);
  const on = inView && !reduce;
  const loop = { duration: CYCLE, repeat: Infinity, ease: 'linear' };
  const DARK = '#2A1F1A';

  return (
    <div ref={ref} className="relative mt-5 pl-8">
      {/* rail */}
      <div aria-hidden className="absolute bottom-[9px] left-[7px] top-[9px] w-[2px] bg-[#FAF8F5]/15" />
      {/* lime fill that follows the pulse */}
      <motion.div
        aria-hidden
        className="absolute bottom-[9px] left-[7px] top-[9px] w-[2px] origin-top"
        style={{ background: LIME, scaleY: reduce ? 1 : 0 }}
        animate={on ? { scaleY: [0, 1, 1, 0, 0], opacity: [1, 1, 1, 0, 1] } : undefined}
        transition={{ ...loop, times: [0, SWEEP, 0.9, 0.94, 1] }}
      />
      {/* glowing head */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute left-[3px] top-[5px] h-[10px] w-[10px] rounded-full"
          style={{ background: LIME, boxShadow: '0 0 14px 4px rgba(198,240,12,.65)', opacity: 0 }}
          animate={on ? { y: [0, h, h, h], opacity: [1, 1, 0, 0] } : undefined}
          transition={{ ...loop, times: [0, SWEEP, SWEEP + 0.08, 1] }}
        />
      )}
      <ol ref={olRef} className="grid gap-4">
        {items.map((m, i) => {
          const last = i === n - 1;
          const t = Math.max(0.001, (SWEEP * i) / (n - 1));
          const lit = { times: [0, t, t + 0.02, 0.88, 0.94, 1] };
          return (
            <li key={m} className="relative flex items-center gap-3">
              {/* dot */}
              <motion.span
                aria-hidden
                className="absolute -left-8 h-4 w-4 rounded-full border-2"
                style={{ borderColor: LIME, backgroundColor: reduce ? LIME : DARK }}
                animate={on ? { backgroundColor: [DARK, DARK, LIME, LIME, DARK, DARK] } : undefined}
                transition={{ ...loop, ...lit }}
              />
              {/* ring burst */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute -left-8 h-4 w-4 rounded-full border"
                  style={{ borderColor: LIME, opacity: 0 }}
                  animate={on ? { scale: [1, 1, 2.8, 2.8], opacity: [0, 0.9, 0, 0] } : undefined}
                  transition={{ ...loop, times: [0, t, Math.min(0.99, t + 0.06), 1] }}
                />
              )}
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] text-[#FAF8F5]/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.span
                className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] ${last ? 'font-semibold' : ''}`}
                style={{ color: last ? LIME : '#FAF8F5', opacity: reduce ? 1 : 0.4 }}
                animate={on ? { opacity: [0.4, 0.4, 1, 1, 0.4, 0.4] } : undefined}
                transition={{ ...loop, ...lit }}
              >
                {m}
              </motion.span>
              {last && (
                <motion.svg
                  aria-hidden
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={LIME}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: reduce ? 1 : 0, filter: 'none' }}
                  animate={on ? { opacity: [0, 0, 1, 1, 0, 0], scale: [0.7, 0.7, 1.15, 1, 0.7, 0.7] } : undefined}
                  transition={{ ...loop, ...lit }}
                >
                  <path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" />
                </motion.svg>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Card({ s, i }) {
  return (
    <Reveal delay={i * 0.08} className="h-full">
      <article className="flex h-full flex-col rounded-[14px] border border-[#FAF8F5]/15 bg-[#33261F] p-5 sm:p-6">
        {s.image && !s.milestones && (
          <div className="relative mb-5 hidden aspect-[16/9] overflow-hidden rounded-lg sm:block">
            <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[#2A1F1A]/25" />
          </div>
        )}
        <div className="flex items-baseline gap-3">
          <span className="font-['JetBrains_Mono'] text-xs font-semibold tracking-[0.2em]" style={{ color: LIME }}>
            0{i + 1}
          </span>
          <h3 className="font-['Space_Grotesk'] text-2xl font-extrabold leading-tight tracking-tight text-[#FAF8F5]">{s.title}</h3>
        </div>
        <p className="mt-2 font-serif text-lg italic text-[#F3EFE6]/80">{s.line}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#F3EFE6]/70">{s.text}</p>
        {s.points && (
          <ul className="mt-4 grid gap-1.5">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#FAF8F5]/90">
                <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: LIME }} />
                {p}
              </li>
            ))}
          </ul>
        )}
        {s.milestones && <Track items={s.milestones} />}
      </article>
    </Reveal>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16" style={{ background: '#2A1F1A' }}>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow dark>{WHY_US.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#FAF8F5] sm:text-4xl">
            {WHY_US.title}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 md:gap-5">
          {WHY_US.scenes.map((s, i) => (
            <Card key={s.key} s={s} i={i} />
          ))}
        </div>

        {WHY_US.assurances?.length > 0 && (
          <Reveal className="mt-6">
            <ul className="flex flex-wrap gap-x-7 gap-y-2.5 border-t border-[#FAF8F5]/15 pt-5">
              {WHY_US.assurances.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-['Space_Grotesk'] text-sm font-semibold text-[#FAF8F5]">
                  <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: LIME }} />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
