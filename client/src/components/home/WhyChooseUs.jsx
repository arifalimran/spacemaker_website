// client/src/components/home/WhyChooseUs.jsx
// Why choose us, for BUYERS. Compact: three equal cards (design, materials, on-time delivery) on solid espresso.
// On-time delivery is a vertical milestone track: the lime line fills top to bottom and each milestone lights up in turn.
// Plain gradients/rgba only (no CSS filters). Reduced motion: track shown complete.
import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { WHY_US } from '../../data/portfolio';
import { Eyebrow, Reveal } from '../portfolio/shared';

const LIME = '#C6F00C';

// On-time delivery track. Loops by itself while on screen (9s cycle): a lime pulse runs from Design down to Handover,
// each milestone lights up and sends out a ring as it passes, Handover glows, then the track fades and restarts.
// Pure CSS keyframes on transform + opacity only, so the browser runs it off the main thread and scrolling stays smooth
// (no JS animation frames, no colour/shadow repaints). Paused while off screen. Reduced motion: finished track, no pulse.
const CYCLE = 9;
const SWEEP = 0.72; // fraction of the cycle the pulse takes to reach the last milestone
const pc = (x) => `${+(x * 100).toFixed(2)}%`;

function trackCss(n) {
  let s = `
@keyframes smFill{0%{transform:scaleY(0);opacity:1}${pc(SWEEP)}{transform:scaleY(1);opacity:1}90%{transform:scaleY(1);opacity:1}94%{transform:scaleY(0);opacity:0}100%{transform:scaleY(0);opacity:1}}
@keyframes smHead{0%{transform:translate3d(0,0,0);opacity:1}${pc(SWEEP)}{transform:translate3d(0,var(--h),0);opacity:1}${pc(SWEEP + 0.08)}{transform:translate3d(0,var(--h),0);opacity:0}100%{transform:translate3d(0,var(--h),0);opacity:0}}
.sm-trk-fill{transform-origin:top;will-change:transform,opacity}
.sm-trk-head{will-change:transform,opacity}
`;
  for (let i = 0; i < n; i++) {
    const t = Math.max(0.001, (SWEEP * i) / (n - 1));
    const t2 = t + 0.02;
    s += `@keyframes smOn${i}{0%{opacity:0}${pc(t)}{opacity:0}${pc(t2)}{opacity:1}88%{opacity:1}94%{opacity:0}100%{opacity:0}}`;
    s += `@keyframes smLab${i}{0%{opacity:.4}${pc(t)}{opacity:.4}${pc(t2)}{opacity:1}88%{opacity:1}94%{opacity:.4}100%{opacity:.4}}`;
    s += `@keyframes smRing${i}{0%{opacity:0;transform:scale(1)}${pc(t)}{opacity:.9;transform:scale(1)}${pc(Math.min(0.99, t + 0.06))}{opacity:0;transform:scale(2.8)}100%{opacity:0;transform:scale(2.8)}}`;
  }
  return s;
}

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
  const css = React.useMemo(() => trackCss(n), [n]);
  const run = !reduce;
  const play = inView ? 'running' : 'paused';
  const an = (name) => (run ? { animation: `${name} ${CYCLE}s linear infinite`, animationPlayState: play } : undefined);

  return (
    <div ref={ref} className="relative mt-5 pl-8">
      {run && <style>{css}</style>}
      {/* rail */}
      <div aria-hidden className="absolute bottom-[9px] left-[7px] top-[9px] w-[2px] bg-[#FAF8F5]/15" />
      {/* lime fill that follows the pulse */}
      <div
        aria-hidden
        className="sm-trk-fill absolute bottom-[9px] left-[7px] top-[9px] w-[2px]"
        style={{ background: LIME, transform: run ? 'scaleY(0)' : 'scaleY(1)', ...an('smFill') }}
      />
      {/* glowing head (static glow, only moves and fades) */}
      {run && (
        <span
          aria-hidden
          className="sm-trk-head absolute left-[3px] top-[5px] h-[10px] w-[10px] rounded-full"
          style={{ background: LIME, boxShadow: '0 0 14px 4px rgba(198,240,12,.65)', '--h': `${h}px`, ...an('smHead') }}
        />
      )}
      <ol ref={olRef} className="grid gap-4">
        {items.map((m, i) => {
          const last = i === n - 1;
          return (
            <li key={m} className="relative flex items-center gap-3">
              {/* dot: dark ring, lime centre fades in as the pulse passes */}
              <span aria-hidden className="absolute -left-8 h-4 w-4 rounded-full border-2 bg-[#2A1F1A]" style={{ borderColor: LIME }}>
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: LIME, opacity: run ? 0 : 1, ...an(`smOn${i}`) }}
                />
              </span>
              {/* ring burst */}
              {run && (
                <span
                  aria-hidden
                  className="absolute -left-8 h-4 w-4 rounded-full border"
                  style={{ borderColor: LIME, opacity: 0, ...an(`smRing${i}`) }}
                />
              )}
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] text-[#FAF8F5]/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] ${last ? 'font-semibold' : ''}`}
                style={{ color: last ? LIME : '#FAF8F5', opacity: run ? 0.4 : 1, ...an(`smLab${i}`) }}
              >
                {m}
              </span>
              {last && (
                <svg
                  aria-hidden
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={LIME}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: run ? 0 : 1, ...an(`smOn${i}`) }}
                >
                  <path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" />
                </svg>
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
