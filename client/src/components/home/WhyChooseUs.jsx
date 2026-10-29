// client/src/components/home/WhyChooseUs.jsx
// Why choose us, for BUYERS. Three equal cards (design, materials, on-time delivery) on solid espresso, with room to breathe
// and a proof row (counts come from the portfolio data, so they follow the back end).
// On-time delivery is a vertical milestone track: the lime line fills top to bottom and each milestone lights up in turn.
// Plain gradients/rgba only (no CSS filters). Reduced motion: track shown complete.
import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WHY_US, projects } from '../../data/portfolio';
import { Eyebrow, Reveal } from '../portfolio/shared';

const LIME = '#C6F00C';
// three text tiers on espresso: SAND = headings and figures, BODY = reading text, SUB = small labels (all matte, never white); SOFT = the one soft-lime accent
const SAND = '#D9CBB4';
const SUB = '#A39380';
const SOFT = '#C6DB3F';
const INTRO = 'Every Space Maker home is built on these three promises.';
const underConstruction = projects.filter((p) => p.status === 'active').length;

// hover on the photo cards: camera viewfinder. Four thin corner brackets fade in and ease inward, the photo zooms slowly
// as if focusing, the photo lifts 4px. Transform + opacity only. Touch screens (no hover) show the brackets faintly.
const WC_CSS = `
.sm-wc-photo{transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .4s ease}
.sm-wc-img{transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.sm-wc-br{position:absolute;width:22px;height:22px;opacity:0;pointer-events:none;border:0 solid rgba(245,240,230,.85);transition:opacity .4s ease,transform .5s cubic-bezier(.2,.7,.2,1)}
.sm-wc-br.tl{top:10px;left:10px;border-top-width:1.5px;border-left-width:1.5px;--dx:8px;--dy:8px}
.sm-wc-br.tr{top:10px;right:10px;border-top-width:1.5px;border-right-width:1.5px;--dx:-8px;--dy:8px}
.sm-wc-br.bl{bottom:10px;left:10px;border-bottom-width:1.5px;border-left-width:1.5px;--dx:8px;--dy:-8px}
.sm-wc-br.brr{bottom:10px;right:10px;border-bottom-width:1.5px;border-right-width:1.5px;--dx:-8px;--dy:-8px}
@media (hover:hover){
  .sm-wc:hover .sm-wc-photo{transform:translateY(-4px)}
  .sm-wc:hover .sm-wc-img{transform:scale(1.06)}
  .sm-wc:hover .sm-wc-br{opacity:1;transform:translate(var(--dx),var(--dy))}
  .sm-wc:hover .sm-wc-flat{box-shadow:0 0 0 1px rgba(198,219,63,.55)}
}
@media (hover:none){.sm-wc-br{opacity:.5}}
@media (prefers-reduced-motion:reduce){.sm-wc-photo,.sm-wc-img,.sm-wc-br{transition:none !important}}
`;
function Corners() {
  return (
    <>
      <span aria-hidden className="sm-wc-br tl" />
      <span aria-hidden className="sm-wc-br tr" />
      <span aria-hidden className="sm-wc-br bl" />
      <span aria-hidden className="sm-wc-br brr" />
    </>
  );
}

// numbers count up once when they scroll into view (reduced motion: shown as they are)
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return undefined;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

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
    s += `@keyframes smLab${i}{0%{opacity:.55}${pc(t)}{opacity:.55}${pc(t2)}{opacity:1}88%{opacity:1}94%{opacity:.55}100%{opacity:.55}}`;
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
    <div ref={ref} className="relative pl-8">
      {run && <style>{css}</style>}
      {/* rail */}
      <div aria-hidden className="absolute bottom-[9px] left-[7px] top-[9px] w-[2px] bg-[#FAF8F5]/20" />
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
      <ol ref={olRef} className="grid gap-5">
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
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] text-[#A39380]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] ${last ? 'font-semibold' : ''}`}
                style={{ color: last ? LIME : '#BBA992', opacity: run ? 0.55 : 1, ...an(`smLab${i}`) }}
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
    <Reveal delay={i * 0.1} className="h-full">
      <article className="sm-wc flex h-full flex-col">
        {s.milestones ? (
          <div className="sm-wc-photo sm-wc-flat relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#33261F] sm:aspect-[4/5]">
            <div className="w-full max-w-[15rem] pt-8">
              <Track items={s.milestones} />
            </div>
          </div>
        ) : (
          <div className="sm-wc-photo relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[4/5]">
            {s.image && <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="sm-wc-img h-full w-full object-cover" />}
            <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(42,31,26,.55) 0%, rgba(42,31,26,0) 45%)' }} />
            <Corners />
          </div>
        )}

        <div className="mt-8 flex flex-1 flex-col">
          <span aria-hidden className="mb-4 block h-[2px] w-10" style={{ background: SOFT }} />
          <h3 className="font-['Space_Grotesk'] text-2xl font-extrabold leading-tight tracking-tight text-[#D9CBB4] sm:text-3xl">{s.title}</h3>
          <p className="mt-3 font-serif text-xl italic text-[#C6DB3F]/90">{s.line}</p>
          <p className="mt-4 text-base leading-relaxed text-[#BBA992]">{s.text}</p>
          {s.specs ? (
            <dl className="mt-6 divide-y divide-[#FAF8F5]/10 border-y border-[#FAF8F5]/10">
              {s.specs.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#A39380]">{k}</dt>
                  <dd className="text-right font-['Space_Grotesk'] text-sm font-semibold text-[#BBA992]">
                    <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: SOFT }} />
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            s.points && (
              <ul className="mt-6 grid gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#BBA992]">
                    <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: LIME }} />
                    {p}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function WhyChooseUs() {
  const title = WHY_US.title || '';
  const cut = title.lastIndexOf(' ', title.lastIndexOf(' ') - 1) + 1;
  const band = [...(WHY_US.proof || []), { value: underConstruction, label: 'Under construction', to: '/projects?status=active' }];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: '#2A1F1A' }}>
      <style>{WC_CSS}</style>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-6xl">
          <Eyebrow dark>{WHY_US.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#D9CBB4] sm:text-4xl lg:text-5xl">
            {title.slice(0, cut)}
            <span style={{ background: 'linear-gradient(transparent 62%, rgba(198,240,12,.32) 62%)' }}>{title.slice(cut)}</span>
          </h2>
          <p className="mt-4 font-serif text-lg italic text-[#BBA992]">{WHY_US.intro || INTRO}</p>
        </Reveal>

        {/* proof band */}
        <Reveal className="mt-10 sm:mt-14" delay={0.05}>
          <ul className="grid grid-cols-2 gap-y-8 border-y border-[#4A3B32] py-7 sm:py-8 lg:grid-cols-4 lg:gap-y-0">
            {band.map((x, k) => {
              const inner = (
                <>
                  <span className="block font-['Space_Grotesk'] text-3xl font-extrabold leading-none tracking-tight text-[#D9CBB4] sm:text-4xl lg:text-5xl">
                    <CountUp to={x.value} suffix={x.suffix} />
                  </span>
                  <span className="mt-2.5 block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#A39380]">{x.label}</span>
                </>
              );
              return (
                <li key={x.label} className={`px-0 lg:px-8 ${k > 0 ? 'lg:border-l lg:border-[#4A3B32]' : 'lg:pl-0'}`}>
                  {x.to ? (
                    <Link to={x.to} className="block transition-opacity hover:opacity-80">{inner}</Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-14 sm:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {WHY_US.scenes.map((s, i) => (
            <Card key={s.key} s={s} i={i} />
          ))}
        </div>

        <Reveal className="mt-14 flex justify-start sm:mt-16">
          <Link
            to="/projects?status=active"
            className="group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full border-[1.5px] border-[#BBA992]/60 px-6 py-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#BBA992] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#BBA992] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: SOFT }} />
            See our active projects
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        {WHY_US.assurances?.length > 0 && (
          <Reveal className="mt-14">
            <ul className="flex flex-wrap gap-x-10 gap-y-3 border-t border-[#FAF8F5]/15 pt-8">
              {WHY_US.assurances.map((a) => (
                <li key={a} className="flex items-center gap-3 font-['Space_Grotesk'] text-base font-semibold text-[#D9CBB4]">
                  <span className="h-2 w-2 flex-none rounded-full" style={{ background: LIME }} />
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
