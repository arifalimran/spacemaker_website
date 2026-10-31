// client/src/components/home/WhyChooseUs.jsx
// Why choose us, for BUYERS, on flat cream.
// 1) opening statement + proof numbers as one flowing block, 2) the heading "Three things you can see, feel and count on",
// 3) two big cards (design, materials), 4) the third promise, on-time delivery, as its own section with a handover photo.
// Handover facts are placeholders (HANDOVER below): nothing is shown until real values are filled in.
import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WHY_US, projects } from '../../data/portfolio';
import { Eyebrow, Reveal } from '../portfolio/shared';

const LIME = '#C6F00C';
// brand colours on cream: ESP = headings and figures, BODY = reading text, OLIVE = labels and italic lines, SAND = the delivery card; SOFT = the soft-lime accent
const ESP = '#2A1F1A';
const BODY = '#4B3F37';
const OLIVE = '#5C6E0A';
const SAND = '#D9CBB4';
const SOFT = '#C6DB3F';
const INTRO = 'Every Space Maker home is built on these three promises.';
const STATEMENT = 'Every great development begins with trust, transparency and disciplined execution.';
// on-time delivery photo: replace the file in public/assets/04_why/ (same name) with a real Moon Residence handover photo when ready
const HANDOVER_PHOTO = '/assets/04_why/ontime-handover.webp';
// fill these in with real facts; a line only shows when its value is not empty
const HANDOVER = { project: 'Moon Residence', date: '', note: '' };
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

function Card({ s, i }) {
  return (
    <Reveal delay={i * 0.1} className="h-full">
      <article className="sm-wc flex h-full flex-col">
        <div className="sm-wc-photo relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#D9CBB4] sm:max-h-[72vh]">
          {s.image && <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="sm-wc-img h-full w-full object-cover" />}
          <Corners />
        </div>

        <div className="mt-12 flex flex-1 flex-col px-3 sm:px-5">
          <span aria-hidden className="mb-4 block h-[2px] w-10" style={{ background: SOFT }} />
          <h3 className="f-display text-3xl font-bold leading-tight text-[#2A1F1A] sm:text-4xl">{s.title}</h3>
          <p className="mt-3 font-serif text-xl italic text-[#5C6E0A]">{s.line}</p>
          <p className="mt-4 text-base leading-relaxed text-[#4B3F37]">{s.text}</p>
          {s.specs ? (
            <dl className="mt-6 divide-y divide-[#2A1F1A]/15 border-y border-[#2A1F1A]/15">
              {s.specs.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#5C6E0A]">{k}</dt>
                  <dd className="text-right font-['Space_Grotesk'] text-sm font-semibold text-[#2A1F1A]">
                    <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ring-1 ring-[#5C6E0A]/50" style={{ background: SOFT }} />
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            s.points && (
              <ul className="mt-6 grid gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#4B3F37]">
                    <span className="h-1.5 w-1.5 flex-none rounded-full ring-1 ring-[#5C6E0A]/50" style={{ background: SOFT }} />
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

function OnTime({ s }) {
  const steps = (s.milestones || []).filter((m) => m !== 'Design');
  const facts = [HANDOVER.project && `Project · ${HANDOVER.project}`, HANDOVER.date && `Handed over · ${HANDOVER.date}`, HANDOVER.note].filter(Boolean);
  // the text on the photo: on phones it sits under the photo, from sm up it sits over the top right
  const details = (
    <>
      <p className="font-serif text-xl italic sm:text-2xl" style={{ color: OLIVE }}>{s.line}</p>
      <p className="mt-4 text-base leading-[1.8] sm:text-[17px]" style={{ color: ESP }}>{s.text}</p>
      {facts.length > 0 && (
        <ul className="mt-5 grid gap-2">
          {facts.map((f) => (
            <li key={f} className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em]" style={{ color: ESP }}>{f}</li>
          ))}
        </ul>
      )}
      <Link
        to="/projects?status=completed"
        className="mt-7 inline-block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] underline decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5C6E0A]"
        style={{ color: ESP, textDecorationColor: SOFT }}
      >
        See our completed projects →
      </Link>
    </>
  );
  return (
    <div className="mt-32 sm:mt-44 lg:mt-56">
      <Reveal className="px-3 sm:px-5">
        <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em]" style={{ color: OLIVE }}>
          Promise 03 · Delivered on time
        </span>
        <h3 className="f-display mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl" style={{ color: ESP }}>
          {s.title}
        </h3>
      </Reveal>

      <Reveal className="mt-10 sm:mt-12">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-[#D9CBB4] sm:aspect-[3/2]">
          <img src={HANDOVER_PHOTO} alt="A home being handed over" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          {/* soft warm veil so the cool photo sits with the brand colours (plain rgba, no filters) */}
          <div aria-hidden className="absolute inset-0" style={{ background: 'rgba(217,203,180,.2)' }} />
          {/* cream fade behind the text, top right only */}
          <div
            aria-hidden
            className="absolute inset-0 hidden sm:block"
            style={{ background: 'linear-gradient(to bottom left, rgba(243,239,230,.9) 0%, rgba(243,239,230,.65) 24%, rgba(243,239,230,0) 52%)' }}
          />
          <div className="absolute right-0 top-0 hidden max-w-[26rem] p-8 sm:block lg:max-w-[30rem] lg:p-12">{details}</div>
        </div>
        <div className="px-3 pt-10 sm:hidden">{details}</div>
      </Reveal>

      {/* milestones: foundation to handover, still (no animation) */}
      <Reveal className="mt-14 px-3 sm:mt-20 sm:px-5" delay={0.1}>
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-6">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-[#2A1F1A]/20 sm:block" />
          {steps.map((m, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={m} className="relative">
                <span
                  aria-hidden
                  className="relative block h-[15px] w-[15px] rounded-full border-2"
                  style={{ borderColor: OLIVE, background: last ? SOFT : '#F3EFE6' }}
                />
                <span className="mt-4 block font-['JetBrains_Mono'] text-[10px] tracking-[0.18em]" style={{ color: '#6B5446' }}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`mt-1 block font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.16em] ${last ? 'font-semibold' : ''}`} style={{ color: last ? OLIVE : BODY }}>{m}</span>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </div>
  );
}

export default function WhyChooseUs() {
  const title = WHY_US.title || '';
  const cut = title.lastIndexOf(' ', title.lastIndexOf(' ') - 1) + 1;
  const band = [...(WHY_US.proof || []), { value: underConstruction, label: 'Under construction', to: '/projects?status=active' }];
  const cards = WHY_US.scenes.filter((s) => !s.milestones);
  const ontime = WHY_US.scenes.find((s) => s.milestones);
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40" style={{ background: '#F3EFE6' }}>
      <style>{WC_CSS}</style>
      <div className="relative mx-auto max-w-[2200px] px-3 sm:px-4">
        {/* statement + numbers, one flowing block */}
        <Reveal className="mx-auto max-w-5xl px-3 text-center sm:px-5">
          <span aria-hidden className="mx-auto mb-10 block h-3.5 w-3.5 rounded-full bg-[#2A1F1A] ring-[5px] ring-[#C6F00C] shadow-[0_0_0_10px_rgba(198,240,12,0.22)]" />
          <p className="f-display text-[clamp(2rem,4.4vw,4.4rem)] font-bold leading-[1.1]" style={{ color: ESP }}>{STATEMENT}</p>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 block h-[5px] w-28 origin-left rounded-full"
            style={{ background: SOFT }}
          />
        </Reveal>

        <Reveal className="mt-20 px-3 sm:mt-24 sm:px-5" delay={0.05}>
          <ul className="grid grid-cols-2 gap-y-8 border-y border-[#2A1F1A]/15 py-8 sm:py-10 lg:grid-cols-4 lg:gap-y-0">
            {band.map((x, k) => {
              const inner = (
                <>
                  <span className="f-display block text-3xl font-bold leading-none sm:text-4xl lg:text-5xl" style={{ color: ESP }}>
                    <CountUp to={x.value} suffix={x.suffix} />
                  </span>
                  <span className="mt-2.5 block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]" style={{ color: OLIVE }}>{x.label}</span>
                </>
              );
              return (
                <li key={x.label} className={`px-0 lg:px-8 ${k > 0 ? 'lg:border-l lg:border-[#2A1F1A]/15' : 'lg:pl-0'}`}>
                  {x.to ? <Link to={x.to} className="block transition-opacity hover:opacity-80">{inner}</Link> : inner}
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* the heading and the three promises */}
        <Reveal className="mt-32 max-w-6xl px-3 sm:mt-44 sm:px-5">
          <Eyebrow>{WHY_US.eyebrow}</Eyebrow>
          <h2 className="f-display mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl" style={{ color: ESP }}>
            {title.slice(0, cut)}
            <span style={{ background: 'linear-gradient(transparent 62%, rgba(198,219,63,.5) 62%)' }}>{title.slice(cut)}</span>
          </h2>
          <p className="mt-5 font-serif text-lg italic text-[#6B5446]">{WHY_US.intro || INTRO}</p>
        </Reveal>

        <div className="mt-20 grid gap-20 sm:mt-24 md:grid-cols-2 md:gap-3">
          {cards.map((s, i) => (
            <Card key={s.key} s={s} i={i} />
          ))}
        </div>

        {ontime && <OnTime s={ontime} />}

        {WHY_US.assurances?.length > 0 && (
          <Reveal className="mt-28 px-3 sm:px-5">
            <ul className="flex flex-wrap gap-x-10 gap-y-3 border-t border-[#2A1F1A]/15 pt-8">
              {WHY_US.assurances.map((a) => (
                <li key={a} className="flex items-center gap-3 font-['Space_Grotesk'] text-base font-semibold" style={{ color: ESP }}>
                  <span className="h-2 w-2 flex-none rounded-full ring-1 ring-[#5C6E0A]/50" style={{ background: SOFT }} />
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
