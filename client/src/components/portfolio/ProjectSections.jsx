// client/src/components/portfolio/ProjectSections.jsx
// The four data-driven blocks of a project page: Gallery, PlanExplorer, ArchitectBlock, EnquiryBlock.
// Every block is built only from project data and hides itself when its data is missing, so the back end can
// add or remove content without any code change.
//   project.photos   [{ chapter, src, caption?, focus? }]   focus = CSS object-position, e.g. '50% 30%'
//   project.plans    [{ id, label, size?, beds?, baths?, floors?, image }]  (falls back to photos with chapter 'plan')
//   project.architect === false hides the architect block; project.architectLine / architectPoints override defaults
//   project.enquiry === false hides the enquiry form
// Clean frames only: no tint, no blur, no frosted glass.
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';
import { ARCHITECT, CONTACT } from '../../data/portfolio';
import { waLink, enquiryMessage, trackLead } from '../../lib/leads';
import { Reveal, LeadLink, linkCls } from './shared';

export const MAX_PHOTOS = 5;
const MONO = "font-['JetBrains_Mono']";

/* ------------------------------------------------------------------ */
/* Gallery: 1 to 5 photos, the layout follows the count                */
/* ------------------------------------------------------------------ */
function Tile({ photo, open }) {
  return (
    <figure className="h-full">
      <button
        type="button"
        onClick={() => open(photo)}
        aria-label={`Open photo: ${photo.caption || 'project photo'}`}
        className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#E9E4D8] shadow-[0_14px_34px_-18px_rgba(42,31,26,0.45)] ring-1 ring-black/5"
      >
        <img
          src={photo.src}
          alt={photo.caption || ''}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.focus || '50% 50%' }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {photo.caption && (
          <span
            className={`${MONO} pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10 text-left text-[10px] uppercase tracking-[0.18em] text-white opacity-0 transition duration-500 group-hover:opacity-100`}
          >
            {photo.caption}
          </span>
        )}
      </button>
    </figure>
  );
}

export function Gallery({ photos, open }) {
  const list = photos.slice(0, MAX_PHOTOS);
  const n = list.length;
  if (!n) return null;

  const cell = (p, i, cls) => (
    <Reveal key={p.src + i} delay={i * 0.07} className={cls}>
      <Tile photo={p} open={open} />
    </Reveal>
  );
  const A43 = 'aspect-[4/3]';
  const FILL = 'aspect-[4/3] md:aspect-auto'; // fills its grid cell on large screens

  if (n === 1) {
    return (
      <div className="mx-auto max-w-5xl px-5 sm:px-8">{cell(list[0], 0, 'aspect-[4/3] sm:aspect-[16/10]')}</div>
    );
  }
  if (n === 2) {
    return (
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-2 md:gap-5">
        {list.map((p, i) => cell(p, i, A43))}
      </div>
    );
  }
  if (n === 3) {
    return (
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:h-[34rem] md:grid-cols-3 md:grid-rows-2 md:gap-5">
        {list.map((p, i) => cell(p, i, i === 0 ? `${FILL} md:col-span-2 md:row-span-2` : FILL))}
      </div>
    );
  }
  if (n === 4) {
    return (
      <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 sm:px-8 md:gap-5">
        {list.map((p, i) => cell(p, i, A43))}
      </div>
    );
  }
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 sm:px-8 md:h-[36rem] md:grid-cols-4 md:grid-rows-2 md:gap-5">
      {list.map((p, i) => cell(p, i, i === 0 ? 'col-span-2 aspect-[16/10] md:aspect-auto md:row-span-2' : FILL))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Floor plans: pick a layout, see it large                            */
/* ------------------------------------------------------------------ */
export function normalizePlans(project) {
  if (project.plans?.length) return project.plans.map((p, i) => ({ id: p.id || `plan-${i}`, ...p, image: p.image || p.src }));
  return (project.photos || [])
    .filter((p) => p.chapter === 'plan')
    .map((p, i) => ({ id: `plan-${i}`, label: p.caption || `Plan ${i + 1}`, image: p.src }));
}

const planMeta = (p) =>
  [p.size, p.beds && `${p.beds} bed`, p.baths && `${p.baths} bath`, p.floors && `Floors ${p.floors}`].filter(Boolean).join(' · ');

export function PlanExplorer({ plans, open, onAsk }) {
  const [i, setI] = useState(0);
  const [bed, setBed] = useState('all');
  const beds = useMemo(() => [...new Set(plans.map((p) => p.beds).filter(Boolean))].sort(), [plans]);
  const filtered = plans.length > 4 && beds.length > 1 && bed !== 'all' ? plans.filter((p) => String(p.beds) === bed) : plans;
  const p = filtered[Math.min(i, filtered.length - 1)];
  if (!p) return null;
  const meta = planMeta(p);

  const viewer = (
    <div>
      <button
        type="button"
        onClick={() => open({ src: p.image, caption: p.label })}
        aria-label={`Open floor plan: ${p.label}`}
        className="block aspect-[16/11] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[#1B4332]/12 bg-white p-3 shadow-[0_14px_34px_-20px_rgba(42,31,26,0.35)] sm:p-5"
      >
        <motion.img
          key={p.image}
          src={p.image}
          alt={p.label}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-contain"
        />
      </button>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-['Space_Grotesk'] text-lg font-bold text-[#111827]">{p.label}</div>
          {meta && <div className={`${MONO} mt-1 text-[11px] uppercase tracking-[0.16em] text-neutral-500`}>{meta}</div>}
        </div>
        {onAsk && (
          <button type="button" onClick={() => onAsk(p.label)} className={linkCls}>
            Ask about this layout →
          </button>
        )}
      </div>
    </div>
  );

  if (plans.length === 1) return <div className="mx-auto max-w-5xl px-5 sm:px-8">{viewer}</div>;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-12">
      <div className="md:col-span-4">
        {plans.length > 4 && beds.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {['all', ...beds.map(String)].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => {
                  setBed(b);
                  setI(0);
                }}
                className={`${MONO} rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] transition ${
                  bed === b ? 'border-[#2A1F1A] bg-[#2A1F1A] text-[#F3EFE6]' : 'border-[#1B4332]/20 text-neutral-600 hover:border-[#1B4332]'
                }`}
              >
                {b === 'all' ? 'All' : `${b} bed`}
              </button>
            ))}
          </div>
        )}
        <ul className="grid gap-2">
          {filtered.map((x, idx) => {
            const on = x === p;
            return (
              <li key={x.id}>
                <button
                  type="button"
                  onClick={() => setI(idx)}
                  className={`block w-full rounded-xl border-l-[3px] px-4 py-3 text-left transition ${
                    on ? 'border-[#C6F00C] bg-white shadow-sm' : 'border-transparent hover:bg-white/60'
                  }`}
                >
                  <span className="block font-['Space_Grotesk'] text-base font-bold text-[#111827]">{x.label}</span>
                  {planMeta(x) && (
                    <span className={`${MONO} mt-1 block text-[10px] uppercase tracking-[0.14em] text-neutral-500`}>{planMeta(x)}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="md:col-span-8">{viewer}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wash: a soft cream-and-lime glow behind a section. Plain radial     */
/* gradient (no blur filter) that drifts a little as you scroll.        */
/* ------------------------------------------------------------------ */
export function Wash({ x = '20%', y = '40%', size = 900, a = 0.18, drift = 50 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yv = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [drift, -drift]);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <motion.div
        className="absolute will-change-transform"
        style={{
          y: yv,
          left: x,
          top: y,
          width: size,
          height: size * 0.8,
          marginLeft: -size / 2,
          marginTop: -size * 0.4,
          background: `radial-gradient(closest-side, rgba(198,240,12,${a}) 0%, rgba(198,240,12,${(a * 0.45).toFixed(3)}) 48%, rgba(198,240,12,0) 100%)`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Architect: a free photo that dissolves into the page, no frame      */
/* ------------------------------------------------------------------ */
const FEATHER =
  'radial-gradient(ellipse 72% 78% at 50% 46%, #000 52%, rgba(0,0,0,0.6) 70%, transparent 100%)';

export function ArchitectBlock({ project }) {
  const [failed, setFailed] = useState(false);
  const line = project.architectLine || ARCHITECT.line;
  const points = project.architectPoints || ARCHITECT.points || [];
  const initials = ARCHITECT.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 md:grid-cols-12 md:gap-0">
      {/* photo, feathered into the background. Wide or tall photos both work. */}
      <Reveal className="md:col-span-5">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] md:max-h-[500px] md:max-w-none">
          {failed ? (
            <div aria-hidden className="flex h-full w-full items-center justify-center" style={{ WebkitMaskImage: FEATHER, maskImage: FEATHER }}>
              <span className="font-['Space_Grotesk'] text-[11rem] font-bold leading-none text-[#2A1F1A]/[0.1]">{initials}</span>
            </div>
          ) : (
            <img
              src={ARCHITECT.photo}
              alt={ARCHITECT.name}
              loading="eager"
              decoding="async"
              onError={() => setFailed(true)}
              style={{ WebkitMaskImage: FEATHER, maskImage: FEATHER, objectPosition: ARCHITECT.focus || '50% 30%' }}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </Reveal>

      {/* text overlaps the photo's faded edge */}
      <div className="relative md:col-span-7 md:-ml-14">
        <Reveal delay={0.1}>
          <div className="relative pl-6 sm:pl-8">
            <span
              aria-hidden
              className="absolute bottom-1 left-0 top-1 w-[3px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, #C6F00C, #5C6E0A)' }}
            />
            <blockquote className="font-serif text-[26px] italic leading-[1.4] text-[#2A1F1A] sm:text-[32px] lg:text-[36px]">
              “{line}”
            </blockquote>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#1A120E]">{ARCHITECT.name}</span>
              <span className={`${MONO} text-[10px] uppercase tracking-[0.2em] text-neutral-500`}>{ARCHITECT.role}</span>
            </div>
          </div>
        </Reveal>

        {points.length > 0 && (
          <div className="mt-12 grid gap-7 pl-6 sm:grid-cols-3 sm:pl-8">
            {points.map((pt, i) => (
              <Reveal key={pt.k} delay={0.2 + i * 0.1}>
                <div>
                  <div className={`${MONO} flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#4D5F08]`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9BBF00]" />
                    {pt.k}
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.7] text-neutral-600">{pt.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Enquiry: a glowing "write to us" card. The message comes first.      */
/* Neon outline + soft breathing glow (opacity only), mouse tilt on     */
/* desktop, self-typing prompts, starter chips, contact fields appear   */
/* once the visitor has started writing. No blur filters.               */
/* ------------------------------------------------------------------ */
const VISITS = ['Any time', 'Weekdays', 'Weekends'];
const PROMPTS = [
  'I’m looking for a 3-bedroom with morning light…',
  'Can I visit this weekend?',
  'What is the payment plan?',
  'Which floor has the best view?',
];
const STARTERS = [
  { k: 'Book a visit', t: (p) => `I would like to book a visit to see ${p.title}. ` },
  { k: 'Price and payment', t: (p) => `Could you share the price and payment plan for ${p.title}? ` },
  { k: 'Layout and size', t: (p) => `I would like to know more about the layouts and sizes at ${p.title}. ` },
];
const MIN_WORDS_CHARS = 8;

export const SWEEP_CSS = `
.sm-sweep{position:relative;overflow:hidden;isolation:isolate;transition:color .35s ease,border-color .35s ease}
.sm-sweep::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--sw,#C6F00C);transform:translateY(101%);transition:transform .45s cubic-bezier(.22,1,.36,1)}
.sm-sweep:hover::before,.sm-sweep:focus-visible::before{transform:translateY(0)}
.sm-sweep:hover,.sm-sweep:focus-visible{color:var(--swc,#1A120E)}
`;

const ENQ_CSS = `
@keyframes smGlow{0%{opacity:.45}100%{opacity:1}}
.sm-enq-glow{animation:smGlow 3.6s ease-in-out infinite alternate}
.sm-enq:focus-within .sm-enq-glow{animation:none;opacity:1}
.sm-enq-line{transform:scaleX(0);transform-origin:left;transition:transform .5s ease}
.sm-enq:focus-within .sm-enq-line{transform:scaleX(1)}
.sm-enq textarea,.sm-enq input{caret-color:#C6F00C}
@keyframes smFlicker{0%,100%{opacity:1}91%{opacity:1}92%{opacity:.55}93%{opacity:1}95%{opacity:.7}96%{opacity:1}}
.sm-neon{color:#C6F00C;text-shadow:0 0 3px rgba(198,240,12,.95),0 0 10px rgba(198,240,12,.7),0 0 24px rgba(198,240,12,.45);animation:smFlicker 7s linear infinite}
.sm-box{border:1px solid rgba(76,128,92,.55);background:rgba(243,239,230,.03);transition:border-color .4s ease}
.sm-box:focus-within{border-color:rgba(198,240,12,.55)}
.sm-sweep{position:relative;overflow:hidden;isolation:isolate;transition:color .35s ease,border-color .35s ease,box-shadow .35s ease}
.sm-sweep::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--sw,#C6F00C);transform:translateY(101%);transition:transform .45s cubic-bezier(.22,1,.36,1)}
.sm-sweep:hover::before,.sm-sweep:focus-visible::before{transform:translateY(0)}
.sm-sweep:hover,.sm-sweep:focus-visible{color:var(--swc,#1A120E)}
@media (prefers-reduced-motion:reduce){.sm-enq-glow{animation:none;opacity:.8}.sm-neon{animation:none}}
`;

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ok =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ok) return undefined;
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${((0.5 - y) * 5).toFixed(2)}deg) rotateY(${((x - 0.5) * 7).toFixed(2)}deg)`;
        el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [ref]);
}

/* types example questions into the placeholder, straight on the DOM node (no re-renders) */
function useTypewriter(ref, enabled) {
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return undefined;
    if (!enabled) {
      ta.placeholder = PROMPTS[0];
      return undefined;
    }
    let i = 0;
    let c = 0;
    let dir = 1;
    let timer;
    const tick = () => {
      const p = PROMPTS[i];
      if (dir === 1) {
        c += 1;
        ta.placeholder = p.slice(0, c);
        if (c >= p.length) {
          dir = -1;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 48);
      } else {
        c -= 2;
        ta.placeholder = p.slice(0, Math.max(c, 0)) || ' ';
        if (c <= 0) {
          dir = 1;
          i = (i + 1) % PROMPTS.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [ref, enabled]);
}

function DChips({ options, value, onChange }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(on ? '' : o)}
            aria-pressed={on}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium leading-snug transition ${
              on
                ? 'border-[#C6F00C] bg-[#C6F00C] text-[#1A120E]'
                : 'border-[#F3EFE6]/25 text-[#F3EFE6]/85 hover:border-[#C6F00C]/70'
            }`}
          >
            {o}
          </button>
        );
      })}
    </span>
  );
}

const dField =
  'mt-2 w-full border-0 border-b border-[#F3EFE6]/25 bg-transparent px-0 py-2.5 text-[16px] text-[#F3EFE6] outline-none transition placeholder:text-[#F3EFE6]/35 focus:border-[#C6F00C]';
const dLabel = `${MONO} text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]/80`;

export function EnquiryBlock({ project, options, layout, setLayout }) {
  const [state, setState] = useState('idle'); // idle | busy | ok | fallback
  const [lastMsg, setLastMsg] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [visit, setVisit] = useState('Any time');
  const reduce = useReducedMotion();
  const card = useRef(null);
  const ta = useRef(null);
  const inView = useInView(card, { margin: '-10% 0px' });

  useTilt(card);
  useTypewriter(ta, inView && !reduce && msg.length === 0);

  const started = msg.trim().length >= MIN_WORDS_CHARS;
  const grow = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 216), 520)}px`;
  };
  const addStarter = (fn) => {
    setMsg((m) => (m.trim() ? `${m.trimEnd()} ` : '') + fn(project));
    setTimeout(() => {
      ta.current?.focus();
      grow(ta.current);
    }, 0);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!started) {
      ta.current?.focus(); // nothing written yet: take the visitor to the box
      return;
    }
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (f.website) return; // honeypot: bots fill this hidden field
    f.notes = msg.trim();
    f.layout = layout;
    f.visit = visit;
    const text = enquiryMessage(project, f);
    setLastMsg(text);
    setName(f.name || '');
    trackLead({ channel: 'enquiry-form', kind: 'project', projectId: project.id });

    const url = import.meta.env.VITE_ENQUIRY_URL || import.meta.env.VITE_LAND_URL;
    if (!url) {
      // No endpoint yet: hand the details to WhatsApp so the lead is never lost.
      window.open(waLink(text), '_blank', 'noopener');
      setState('ok');
      return;
    }
    setState('busy');
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'project-enquiry',
          projectId: project.id,
          projectTitle: project.title,
          ref: project.ref || project.id,
          ...f,
          at: new Date().toISOString(),
        }),
      });
      setState(r.ok ? 'ok' : 'fallback');
    } catch {
      setState('fallback');
    }
  }

  const done = state === 'ok' || state === 'fallback';

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <style>{ENQ_CSS}</style>
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <LeadLink
            project={project}
            className="sm-sweep inline-flex items-center gap-2 rounded-full border border-[#2A1F1A]/25 px-5 py-2 text-[13px] font-medium text-[#2A1F1A] hover:border-[#2A1F1A]" style={{ '--sw': '#2A1F1A', '--swc': '#F3EFE6' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#9BBF00]" />
            WhatsApp
          </LeadLink>
          {CONTACT.hotlines.map((h) => (
            <a
              key={h.tel}
              href={`tel:${h.tel}`}
              className="sm-sweep inline-flex items-center rounded-full border border-[#2A1F1A]/25 px-5 py-2 text-[13px] font-medium text-[#2A1F1A] hover:border-[#2A1F1A]" style={{ '--sw': '#2A1F1A', '--swc': '#F3EFE6' }}
            >
              Call {h.display}
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div ref={card} className="sm-enq relative" style={{ transition: 'transform .18s ease-out', willChange: 'transform' }}>
          {/* breathing neon glow behind the card */}
          <div
            aria-hidden
            className="sm-enq-glow pointer-events-none absolute -inset-1 rounded-[32px]"
            style={{ boxShadow: '0 0 70px 6px rgba(198,240,12,0.32), 0 0 18px 1px rgba(198,240,12,0.45)' }}
          />
          {/* neon outline */}
          <div className="relative rounded-[30px] p-[1.5px]" style={{ background: 'linear-gradient(135deg, #C6F00C 0%, rgba(198,240,12,0.25) 45%, #8FB300 100%)' }}>
            <div
              className="relative overflow-hidden rounded-[29px] px-6 py-8 sm:px-10 sm:py-10"
              style={{ background: 'radial-gradient(ellipse 90% 70% at 20% 0%, #3A2B23 0%, #2A1F1A 55%, #1E1612 100%)' }}
            >
              {/* light that follows the pointer */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 0%), rgba(198,240,12,0.14), transparent 60%)' }}
              />

              {done ? (
                <div className="relative py-10 text-center">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#C6F00C] text-xl text-[#1A120E]">✓</div>
                  <h3 className="font-serif text-4xl italic leading-tight text-[#F3EFE6] sm:text-5xl">
                    Thank you{name ? `, ${name.split(' ')[0]}` : ''}.
                  </h3>
                  <p className="mt-4 text-[#F3EFE6]/70">
                    {state === 'ok' ? 'We will call you shortly.' : 'We could not send it automatically. Please send it to us on WhatsApp.'}
                  </p>
                  {state === 'fallback' && (
                    <a href={waLink(lastMsg)} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-medium text-[#C6F00C] underline underline-offset-4">
                      Send on WhatsApp →
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#C6F00C] shadow-[0_0_10px_2px_rgba(198,240,12,0.7)]" />
                    <span className={`${MONO} sm-neon text-[11px] uppercase tracking-[0.22em]`}>Write to us</span>
                  </div>

                  <label className="sm-box relative mt-5 block rounded-2xl px-5 py-4 sm:px-6 sm:py-5">
                    <span className="sr-only">Your message</span>
                    <textarea
                      ref={ta}
                      name="message"
                      rows={6}
                      value={msg}
                      onChange={(e) => {
                        setMsg(e.target.value);
                        grow(e.target);
                      }}
                      className="block min-h-[12rem] w-full resize-none border-0 bg-transparent p-0 font-serif text-[22px] leading-[1.5] text-[#F3EFE6] outline-none placeholder:text-[#F3EFE6]/40 sm:min-h-[13.5rem] sm:text-[28px]"
                    />
                    <span aria-hidden className="sm-enq-line absolute inset-x-4 bottom-0 block h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #C6F00C, rgba(198,240,12,0.1))' }} />
                  </label>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className={`${MONO} sm-neon mr-2 text-[11px] uppercase tracking-[0.22em]`}>Start with</span>
                    {STARTERS.map((st) => (
                      <button
                        key={st.k}
                        type="button"
                        onClick={() => addStarter(st.t)}
                        className="rounded-full border border-[#F3EFE6]/25 px-4 py-1.5 text-[13px] text-[#F3EFE6]/85 transition hover:border-[#C6F00C] hover:text-[#C6F00C]"
                      >
                        + {st.k}
                      </button>
                    ))}
                  </div>

                  {started && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-9 border-t border-[#F3EFE6]/12 pt-8">
                        <div className="font-serif text-2xl italic text-[#F3EFE6]">Where should we reach you?</div>
                        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                          <label className="block">
                            <span className={dLabel}>Your name</span>
                            <input name="name" required autoComplete="name" className={dField} placeholder="Full name" />
                          </label>
                          <label className="block">
                            <span className={dLabel}>Phone</span>
                            <input name="phone" type="tel" required minLength={7} autoComplete="tel" className={dField} placeholder="+880" />
                          </label>
                        </div>
                        {options.length > 0 && (
                          <div className="mt-6">
                            <span className={dLabel}>About which layout</span>
                            <div className="mt-3">
                              <DChips options={options} value={layout} onChange={setLayout} />
                            </div>
                          </div>
                        )}
                        <div className="mt-6">
                          <span className={dLabel}>Best time to visit</span>
                          <div className="mt-3">
                            <DChips options={VISITS} value={visit} onChange={(v) => setVisit(v || 'Any time')} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={state === 'busy'}
                      className="sm-sweep group inline-flex items-center gap-4 rounded-full bg-[#B9D90F] py-2 pl-8 pr-2 font-['Space_Grotesk'] text-base font-bold text-[#1A120E] disabled:opacity-60"
                      style={{ '--sw': '#F3EFE6', '--swc': '#1A120E' }}>
                      {state === 'busy' ? 'Sending…' : 'Send enquiry'}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A120E] text-[#C6F00C] transition duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                    <span className={`${MONO} sm-neon text-[11px] uppercase tracking-[0.2em]`}>
                      {started ? 'We reply personally' : 'Write a few words to begin'}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
