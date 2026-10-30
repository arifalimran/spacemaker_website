// client/src/components/home/Landowners.jsx
// Landowners page (/landowners): animated hero, big line, why us (dark case), deal types, six steps, FAQ, contact form.
// Content lives in data/landowners.js. The form keeps the old rule: VITE_LAND_URL endpoint, else WhatsApp so a lead is never lost.
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CONTACT, LANDOWNER as L } from '../../data/portfolio';
import { LAND_HERO as H, LAND_BIG as B, WHY_INTRO, WHY, DEALS, LAND_STEPS, LAND_FAQS, LAND_OWNERSHIP } from '../../data/landowners';
import { waLink, trackLead } from '../../lib/leads';
import { Eyebrow, Reveal } from '../portfolio/shared';

const h2 = "mt-4 font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-3xl lg:text-4xl";
const pill =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] px-5 py-2.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#F5F0E6] hover:before:translate-y-0";
const field =
  'mt-2 w-full rounded-xl border border-[#2A1F1A]/25 bg-[#FAF8F5] px-4 py-3 text-[15px] text-[#2A1F1A] outline-none transition-colors placeholder:text-[#8A7B6E] focus:border-[#2A1F1A] focus:ring-2 focus:ring-[#C6DB3F]/60';
const label = "block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#5C4A3E]";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

function goToForm() {
  const el = document.getElementById('land-form');
  if (!el) return;
  if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -90 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- hero with animated text ---------- */
function RiseWords({ text, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Header() {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % H.words.length), 2800);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <section className="px-3 pt-24 sm:px-6 sm:pt-28">
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-end overflow-hidden rounded-[24px] bg-[#3A2D26] sm:min-h-[680px] sm:rounded-[32px] lg:min-h-[max(740px,80svh)]">
        {H.image && !failed && (
          <motion.img
            src={H.image}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        )}
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,31,26,.92) 0%, rgba(42,31,26,.55) 45%, rgba(42,31,26,.15) 100%)' }} />
        <div className="relative z-10 p-6 sm:p-10 lg:p-14">
          <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#D9CBB4]">
            <span className="h-[2px] w-8 bg-[#D3E35A]" />
            {H.eyebrow}
          </span>
          <h1 className="mt-5 font-['Space_Grotesk'] text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-[#D9CBB4] sm:text-6xl lg:text-7xl">
            <span className="block">
              <RiseWords text={H.line1} />
            </span>
            <span className="block">
              <RiseWords text={H.line2} delay={0.25} />
              <span className="relative inline-block align-bottom text-[#D3E35A]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={H.words[i]}
                    className="inline-block"
                    initial={reduce ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    {H.words[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>
          <motion.p
            className="mt-5 max-w-xl font-serif text-lg italic text-[#BBA992] sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {H.sub}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- big line ---------- */
function Big() {
  const [before, after] = B.title.split(B.highlight);
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <Reveal className="mx-auto max-w-5xl text-center">
        <h2 className="font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.04] tracking-tight text-[#2A1F1A] sm:text-7xl lg:text-8xl">
          {before}
          <span className="lime-mark">{B.highlight}</span>
          {after}
        </h2>
        <div className="mt-10 flex justify-center sm:mt-12">
          <button type="button" onClick={goToForm} className={pill}>
            {B.cta} <Arrow />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- why landowners choose us ---------- */
function WhyRow({ item, index }) {
  const [failed, setFailed] = useState(false);
  const photoLeft = index % 2 === 0;
  return (
    <Reveal>
      <div className="grid gap-2 sm:gap-3 lg:grid-cols-2">
        <div className={`group relative h-[300px] overflow-hidden rounded-[14px] bg-[#3A2D26] sm:h-[380px] sm:rounded-[18px] lg:h-auto lg:min-h-[520px] ${photoLeft ? 'lg:order-1' : 'lg:order-2'}`}>
          {item.image && !failed && (
            <img
              src={item.image}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
        </div>
        <div className={`flex min-h-[300px] flex-col justify-between gap-8 rounded-[14px] bg-[#D9CBB4] p-6 sm:min-h-[380px] sm:rounded-[18px] sm:p-10 lg:min-h-[520px] lg:p-12 ${photoLeft ? 'lg:order-2' : 'lg:order-1'}`}>
          <div>
            <span aria-hidden className="block h-[2px] w-10 bg-[#C6DB3F]" />
            <h3 className="mt-5 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2A1F1A] sm:text-4xl lg:text-5xl">{item.title}</h3>
          </div>
          <div>
            {item.line && <p className="font-serif text-lg italic text-[#5C6E0A] sm:text-xl">{item.line}</p>}
            <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-[#4B3F37]">{item.text}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Why() {
  return (
    <section className="px-3 pb-20 pt-4 sm:px-6 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="px-2 sm:px-0">
          <Eyebrow>{L.whyTitle}</Eyebrow>
          <h2 className={h2}>{L.slogan}</h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.75] text-[#4B3F37] sm:text-lg">{WHY_INTRO}</p>
        </Reveal>
        <div className="mt-12 space-y-2 rounded-[24px] bg-[#2A1F1A] p-2 sm:space-y-3 sm:rounded-[30px] sm:p-3">
          {WHY.map((w, i) => (
            <WhyRow key={w.key} item={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ways to work together ---------- */
function Deals() {
  return (
    <section className="px-3 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="px-2 sm:px-0">
          <Eyebrow>Ways to work together</Eyebrow>
          <h2 className={h2}>Two simple ways to move forward.</h2>
        </Reveal>
        <div className="mt-10 grid gap-2 rounded-[24px] bg-[#2A1F1A] p-2 sm:gap-3 sm:rounded-[30px] sm:p-3 md:grid-cols-2">
          {DEALS.map((d) => (
            <Reveal key={d.key}>
              <div className="flex h-full min-h-[320px] flex-col justify-between gap-8 rounded-[14px] bg-[#D9CBB4] p-6 sm:rounded-[18px] sm:p-10">
                <div>
                  <span aria-hidden className="block h-[2px] w-10 bg-[#C6DB3F]" />
                  <h3 className="mt-5 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2A1F1A] sm:text-4xl">{d.title}</h3>
                </div>
                <div>
                  <p className="font-serif text-lg italic text-[#5C6E0A] sm:text-xl">{d.line}</p>
                  <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-[#4B3F37]">{d.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- six steps ---------- */
function Steps() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className={h2}>Six steps, from plot to handover.</h2>
        </Reveal>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {LAND_STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 3) * 0.08}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-[#2A1F1A] bg-[#FAF8F5] font-['JetBrains_Mono'] text-[11px] font-semibold text-[#2A1F1A]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-['Space_Grotesk'] text-lg font-extrabold text-[#2A1F1A]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#4B3F37]">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 className={h2}>Good to know before you call.</h2>
          <p className="mt-4 font-serif text-lg italic text-[#6B5446]">Straight answers, no fine print.</p>
        </Reveal>
        <ul className="divide-y divide-[#2A1F1A]/15 border-y border-[#2A1F1A]/15 lg:col-span-8">
          {LAND_FAQS.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q}>
                <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-['Space_Grotesk'] text-lg font-bold leading-snug text-[#2A1F1A] sm:text-xl">{f.q}</span>
                  <span aria-hidden className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-[#2A1F1A] font-['JetBrains_Mono'] text-base text-[#2A1F1A] transition-colors duration-300" style={{ background: on ? '#C6DB3F' : 'transparent' }}>
                    {on ? '−' : '+'}
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-base leading-[1.75] text-[#4B3F37]">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- contact form ---------- */
function landText(f) {
  return [
    'Hello Space Maker, I would like a feasibility study for my land.',
    f.name && `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    f.location && `Plot location: ${f.location}`,
    f.size && `Plot size: ${f.size}`,
    f.road && `Road width: ${f.road}`,
    f.ownership && `Ownership: ${f.ownership}`,
    f.notes && `Notes: ${f.notes}`,
  ]
    .filter(Boolean)
    .join('\n');
}

function ContactForm() {
  const [state, setState] = useState('idle'); // idle | busy | ok | fallback
  const [lastMsg, setLastMsg] = useState('');
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (f.trap) return; // spam trap
    const er = {};
    if (!f.name?.trim()) er.name = 'Please enter your name.';
    const digits = (f.phone || '').replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) er.phone = 'Please enter a valid phone number.';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = 'Please check this email address.';
    if (!f.location?.trim()) er.location = 'Please tell us where the plot is.';
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`ld-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    const msg = landText(f);
    setLastMsg(msg);
    trackLead({ channel: 'land-form', kind: 'landowner' });
    const url = import.meta.env.VITE_LAND_URL;
    if (!url) {
      window.open(waLink(msg), '_blank', 'noopener');
      setState('ok');
      return;
    }
    setState('busy');
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, at: new Date().toISOString() }) });
      setState(r.ok ? 'ok' : 'fallback');
    } catch {
      setState('fallback');
    }
  }

  const err = (k) => errors[k] && <p role="alert" className="mt-1.5 text-[13px] text-[#8A3B2A]">{errors[k]}</p>;

  return (
    <section id="land-form" className="px-3 pb-24 pt-8 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[24px] bg-[#E4EDD6] px-6 py-10 sm:rounded-[32px] sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-14 lg:px-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Contact us</Eyebrow>
            <h2 className={h2}>
              Let's talk about <span className="lime-mark">your plot.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-[1.7] text-[#4B3F37]">Share a few details. Our engineering director will call you back directly.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${L.hotline.tel}`} className={pill}>Call</a>
              <a href={waLink('Hello Space Maker, I own a plot and would like to discuss it with you.')} target="_blank" rel="noreferrer" onClick={() => trackLead({ channel: 'whatsapp', kind: 'landowner' })} className={pill}>WhatsApp</a>
              <a href={`mailto:${CONTACT.email}`} className={pill}>Email</a>
            </div>
            <p className="mt-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#5C4A3E]">{L.hotline.display}</p>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="rounded-[18px] bg-[#F2F5E9] p-5 sm:p-8">
              {state === 'ok' || state === 'fallback' ? (
                <div className="py-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#C6DB3F] text-xl text-[#2A1F1A]">✓</span>
                  <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-extrabold text-[#2A1F1A]">Thank you.</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] text-[#4B3F37]">
                    {state === 'ok' ? 'Our engineering director will call you back directly.' : 'We could not send this automatically. Please tap below to send it on WhatsApp.'}
                  </p>
                  {state === 'fallback' && (
                    <a href={waLink(lastMsg)} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px]">
                      Send on WhatsApp →
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <h3 className="font-['Space_Grotesk'] text-xl font-extrabold tracking-tight text-[#2A1F1A] sm:text-2xl">Request a feasibility study</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="ld-name">Your name <span className="text-[#5C6E0A]">*</span></label>
                      <input id="ld-name" name="name" autoComplete="name" className={field} />
                      {err('name')}
                    </div>
                    <div>
                      <label className={label} htmlFor="ld-phone">Phone / WhatsApp <span className="text-[#5C6E0A]">*</span></label>
                      <input id="ld-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXX-XXXXXX" className={field} />
                      {err('phone')}
                    </div>
                  </div>
                  <div>
                    <label className={label} htmlFor="ld-email">Email (optional)</label>
                    <input id="ld-email" name="email" type="email" autoComplete="email" className={field} />
                    {err('email')}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="ld-location">Plot location <span className="text-[#5C6E0A]">*</span></label>
                      <input id="ld-location" name="location" placeholder="e.g. Jolshiri" className={field} />
                      {err('location')}
                    </div>
                    <div>
                      <label className={label} htmlFor="ld-size">Plot size</label>
                      <input id="ld-size" name="size" placeholder="e.g. 5 Katha" className={field} />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="ld-road">Road width</label>
                      <input id="ld-road" name="road" placeholder="e.g. 30 ft" className={field} />
                    </div>
                    <div>
                      <label className={label} htmlFor="ld-ownership">Ownership</label>
                      <select id="ld-ownership" name="ownership" defaultValue="" className={field}>
                        <option value="">Choose</option>
                        {LAND_OWNERSHIP.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={label} htmlFor="ld-notes">A short note (optional)</label>
                    <textarea id="ld-notes" name="notes" rows={3} maxLength={600} placeholder="Anything we should know about the plot..." className={`${field} resize-none`} />
                  </div>
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="ld-trap">Leave this empty</label>
                    <input id="ld-trap" name="trap" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'busy'}
                    className="inline-flex w-full items-center justify-center rounded-full border-[1.5px] border-[#2A1F1A] bg-[#2A1F1A] px-7 py-3.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F0E6] transition-colors duration-300 hover:bg-[#C6DB3F] hover:text-[#2A1F1A] disabled:cursor-wait disabled:opacity-70"
                  >
                    {state === 'busy' ? 'Sending…' : 'Submit land details'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Landowners() {
  return (
    <>
      <Header />
      <Big />
      <Why />
      <Deals />
      <Steps />
      <Faq />
      <ContactForm />
    </>
  );
}
