// client/src/components/home/WhyChooseUs.jsx
// Why choose us, for BUYERS, on flat cream.
// 1) opening statement + proof numbers as one flowing block, 2) the heading "Three things you can see, feel and count on",
// 3) ONE rounded light box: the three promises as a numbered list on the left (design, materials, on-time delivery),
//    one big photo on the right that fades to the chosen promise. Click a promise, or use the arrow keys.
// Handover facts are placeholders (HANDOVER below): nothing is shown until real values are filled in.
// Light on old laptops: opacity fades only, no filters, no looping animation.
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WHY_US, projects } from '../../data/portfolio';
import { Eyebrow, Reveal } from '../portfolio/shared';

// brand colours on cream: ESP = headings and figures, BODY = reading text, OLIVE = labels and italic lines, SOFT = the soft-lime accent
const ESP = '#2A1F1A';
const BODY = '#4B3F37';
const OLIVE = '#5C6E0A';
const SOFT = '#C6DB3F';
const SAND = '#D9CBB4';
const CREAM = '#F3EFE6';
const MUTED = '#BBA992'; // small labels on espresso
// the box colour: lighter than the page cream, thin border. Change this one line to try latte (#F3ECDD) or pale olive (#E4EDD6)
const BOX = '#FAF8F5';
const INTRO = 'Every Space Maker home is built on these three promises.';
const STATEMENT = 'Every great development begins with trust, transparency and disciplined execution.';
// on-time delivery photo: replace the file in public/assets/04_why/ (same name) with a real Moon Residence handover photo when ready
const HANDOVER_PHOTO = '/assets/04_why/ontime-handover.webp';
// fill these in with real facts; a line only shows when its value is not empty
const HANDOVER = { project: 'Moon Residence', date: '', note: '' };
const underConstruction = projects.filter((p) => p.status === 'active').length;

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

function Dot() {
  return <span className="h-1.5 w-1.5 flex-none rounded-full ring-1 ring-[#5C6E0A]/50" style={{ background: SOFT }} />;
}

// what opens under the chosen promise
function Detail({ s }) {
  const facts = [HANDOVER.project && `Project · ${HANDOVER.project}`, HANDOVER.date && `Handed over · ${HANDOVER.date}`, HANDOVER.note].filter(Boolean);
  const steps = (s.milestones || []).filter((m) => m !== 'Design');
  return (
    <div className="pb-8 pt-1">
      <p className="font-serif text-lg italic sm:text-xl" style={{ color: OLIVE }}>{s.line}</p>
      <p className="mt-3 max-w-md text-[15px] leading-[1.8] sm:text-base" style={{ color: BODY }}>{s.text}</p>
      {s.points && (
        <ul className="mt-5 grid gap-2.5">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em]" style={{ color: BODY }}>
              <Dot />
              {p}
            </li>
          ))}
        </ul>
      )}
      {steps.length > 0 && (
        <ol className="mt-5 flex flex-wrap gap-2">
          {steps.map((m, i) => (
            <li
              key={m}
              className="rounded-full border px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em]"
              style={{ borderColor: 'rgba(42,31,26,.25)', color: BODY, background: i === steps.length - 1 ? SOFT : 'transparent' }}
            >
              {String(i + 1).padStart(2, '0')} {m}
            </li>
          ))}
        </ol>
      )}
      {facts.length > 0 && (
        <ul className="mt-5 grid gap-1.5">
          {facts.map((f) => (
            <li key={f} className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em]" style={{ color: ESP }}>{f}</li>
          ))}
        </ul>
      )}
      {s.milestones && (
        <Link
          to="/projects?status=completed"
          className="mt-7 inline-block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] underline decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5C6E0A]"
          style={{ color: ESP, textDecorationColor: SOFT }}
        >
          See our completed projects →
        </Link>
      )}
    </div>
  );
}

function PromiseBox({ scenes }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const n = scenes.length;
  const pad = (k) => String(k + 1).padStart(2, '0');
  const photoOf = (s) => (s.milestones ? HANDOVER_PHOTO : s.image);
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setI((i + 1) % n); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setI((i - 1 + n) % n); }
  };
  const open = reduce ? { initial: false } : { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div
      className="mt-20 overflow-hidden rounded-[28px] border border-[#2A1F1A]/12 sm:mt-24"
      style={{ background: BOX }}
    >
      <div className="grid lg:grid-cols-2">
        {/* the list of promises */}
        <div role="tablist" aria-orientation="vertical" onKeyDown={onKey} className="order-2 flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:order-1 lg:px-16">
          {scenes.map((s, k) => {
            const on = k === i;
            return (
              <div key={s.key} className={k > 0 ? 'border-t border-[#2A1F1A]/15' : ''}>
                <button
                  type="button"
                  role="tab"
                  id={`why-tab-${s.key}`}
                  aria-selected={on}
                  aria-controls={`why-panel-${s.key}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setI(k)}
                  className="group flex w-full items-baseline gap-5 py-6 text-left"
                >
                  <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.2em]" style={{ color: on ? OLIVE : '#6B5446' }}>{pad(k)}</span>
                  <span
                    className="f-display text-3xl font-bold leading-tight transition-opacity duration-300 sm:text-4xl"
                    style={{ color: ESP, opacity: on ? 1 : 0.45 }}
                  >
                    {s.title}
                  </span>
                  <span aria-hidden className="ml-auto font-['JetBrains_Mono'] text-lg transition-transform duration-300" style={{ color: OLIVE, transform: on ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="d" role="tabpanel" id={`why-panel-${s.key}`} aria-labelledby={`why-tab-${s.key}`} {...open} className="overflow-hidden pl-[2.6rem] sm:pl-[3.2rem]">
                      <Detail s={s} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* one big photo; the chosen one fades in (opacity only) */}
        <div className="relative order-1 aspect-[4/3] w-full bg-[#D9CBB4] lg:order-2 lg:aspect-auto lg:min-h-[44rem]">
          {scenes.map((s, k) => (
            <img
              key={s.key}
              src={photoOf(s)}
              alt={s.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: k === i ? 1 : 0 }}
              aria-hidden={k !== i}
            />
          ))}
          {/* soft warm veil on the handover photo so its cool tones sit with the brand colours (plain rgba) */}
          <div aria-hidden className="absolute inset-0 transition-opacity duration-500" style={{ background: 'rgba(217,203,180,.2)', opacity: scenes[i].milestones ? 1 : 0 }} />
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const title = WHY_US.title || '';
  const cut = title.lastIndexOf(' ', title.lastIndexOf(' ') - 1) + 1;
  // two lines: break after the first comma ("Three things you can see," / "feel and count on.")
  const comma = title.indexOf(', ');
  const brk = comma > 0 && comma + 2 < cut ? comma + 2 : 0;
  const band = [...(WHY_US.proof || []), { value: underConstruction, label: 'Under construction', to: '/projects?status=active' }];
  // design, materials, then on-time delivery last
  const scenes = [...WHY_US.scenes.filter((s) => !s.milestones), ...WHY_US.scenes.filter((s) => s.milestones)];
  return (
    <>
      {/* statement + numbers: their own solid espresso band, centred, with generous padding */}
      <div className="relative py-24 sm:py-32 lg:py-40" style={{ background: ESP }}>
        <div className="mx-auto max-w-[2200px] px-3 sm:px-4">
        <div className="mx-auto max-w-[68rem] px-3 text-center sm:px-5">
          <Reveal>
            <span aria-hidden className="mx-auto mb-8 block h-3.5 w-3.5 rounded-full bg-[#C6F00C] ring-[5px] ring-[#C6F00C]/25 shadow-[0_0_0_10px_rgba(198,240,12,0.12)]" />
            <p className="f-display text-balance text-[clamp(1.75rem,3.2vw,3.1rem)] font-bold leading-[1.12]" style={{ color: CREAM }}>{STATEMENT}</p>
          </Reveal>

          <Reveal className="mt-14 sm:mt-16" delay={0.05}>
            <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
              {band.map((x, k) => {
                const inner = (
                  <>
                    <span className="f-display block text-3xl font-bold leading-none sm:text-4xl lg:text-5xl" style={{ color: SAND }}>
                      <CountUp to={x.value} suffix={x.suffix} />
                    </span>
                    <span className="mt-3 block font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.18em]" style={{ color: MUTED }}>{x.label}</span>
                  </>
                );
                return (
                  <li key={x.label} className={`px-3 ${k > 0 ? 'lg:border-l lg:border-[#F3EFE6]/15' : ''}`}>
                    {x.to ? <Link to={x.to} className="block transition-opacity hover:opacity-80">{inner}</Link> : inner}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        </div>
      </div>

      <section className="relative overflow-hidden pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28" style={{ background: '#F3EFE6' }}>
        <div className="relative mx-auto max-w-[2200px] px-3 sm:px-4">
        {/* the heading and the three promises */}
        <Reveal className="max-w-6xl px-6 sm:px-12 lg:px-16">
          <Eyebrow>{WHY_US.eyebrow}</Eyebrow>
          <h2 className="f-display mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl" style={{ color: ESP }}>
            {title.slice(0, brk)}
            {brk > 0 && <br />}
            <span className="whitespace-nowrap">
              {title.slice(brk, cut)}
              <span style={{ background: 'linear-gradient(transparent 62%, rgba(198,219,63,.5) 62%)' }}>{title.slice(cut)}</span>
            </span>
          </h2>
          <p className="mt-5 font-serif text-lg italic text-[#6B5446]">{WHY_US.intro || INTRO}</p>
        </Reveal>

        <PromiseBox scenes={scenes} />

        </div>
      </section>
    </>
  );
}
