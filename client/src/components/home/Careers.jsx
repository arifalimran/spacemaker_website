// client/src/components/home/Careers.jsx
// Careers page (/careers): simple and clean. Header, what we offer, open positions, how hiring works, FAQ, closing card.
// No photos, no hero. Content lives in data/careers.js (replace from the CMS later).
import React, { useState } from 'react';
import { CAREERS_HERO as H, CHAPTERS as PERKS, JOBS, STEPS, FAQS, HR } from '../../data/careers';
import { waLink, trackLead } from '../../lib/leads';
import { Eyebrow, Reveal } from '../portfolio/shared';

const ESPRESSO = '#2A1F1A';
const h2 = "mt-4 font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-3xl lg:text-4xl";

function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -100 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const mailto = (subject) => `mailto:${HR.email}?subject=${encodeURIComponent(subject)}`;

const pill =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] px-5 py-2.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#F5F0E6] hover:before:translate-y-0";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

/* ---------- header ---------- */
function Header() {
  return (
    <section className="relative pb-16 pt-40 sm:pb-20 sm:pt-44" style={{ background: 'linear-gradient(to bottom, #E4EDD6 0%, #FAF8F5 100%)' }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <Eyebrow>{H.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-4xl lg:text-5xl">
            Build homes. <span className="lime-mark">Shape your career.</span>
          </h1>
          <p className="mt-5 max-w-xl font-serif text-lg italic text-[#6B5446] sm:text-xl">{H.mission}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => goTo('roles')} className={pill}>
              See open roles <span aria-hidden>↓</span>
            </button>
            <span className="flex items-center gap-2.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#6B5446]">
              <span className="h-2 w-2 rounded-full bg-[#C6DB3F] ring-1 ring-[#2A1F1A]/30" />
              {JOBS.length} open roles · Dhaka and Jolshiri
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- what we offer ---------- */
function Offer() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>What we offer</Eyebrow>
          <h2 className={h2}>A workplace you can be proud of.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <li key={p.key}>
              <Reveal delay={i * 0.08}>
                <span aria-hidden className="block h-[2px] w-10 bg-[#C6DB3F]" />
                <h3 className="mt-5 font-['Space_Grotesk'] text-xl font-extrabold leading-tight text-[#2A1F1A]">{p.title}</h3>
                <p className="mt-2 font-serif text-base italic text-[#5C6E0A]">{p.line}</p>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#4B3F37]">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- open positions ---------- */
function Roles() {
  return (
    <section id="roles" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Open positions</Eyebrow>
            <h2 className={h2}>Join us on site and in the studio.</h2>
          </div>
          <span className="rounded-full border border-[#2A1F1A]/30 px-3.5 py-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#2A1F1A]">
            {JOBS.length} open
          </span>
        </Reveal>

        <ul className="mt-10 divide-y divide-[#2A1F1A]/15 border-y border-[#2A1F1A]/15">
          {JOBS.map((j) => (
            <li key={j.title} className="group flex flex-col gap-5 py-7 transition-colors duration-300 hover:bg-[#2A1F1A]/[0.03] md:flex-row md:items-center md:justify-between md:px-4">
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl font-extrabold leading-tight text-[#2A1F1A] sm:text-2xl">{j.title}</h3>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#6B5446]">
                  <span>{j.loc}</span>
                  <span>{j.exp}</span>
                  <span>{j.type}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:flex-none">
                <a
                  href={waLink(`Hello Space Maker HR, I would like to apply for ${j.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackLead({ channel: 'whatsapp', kind: 'careers-apply' })}
                  className={pill}
                >
                  <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-1 ring-[#2A1F1A]/30" />
                  Apply on WhatsApp <Arrow />
                </a>
                <a
                  href={mailto(`Application: ${j.title}`)}
                  className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#2A1F1A] underline decoration-[#2A1F1A]/30 underline-offset-[6px] transition-colors hover:decoration-[#5C6E0A]"
                >
                  Email
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-serif text-lg italic text-[#4B3F37]">
          Don't see your role?{' '}
          <a
            href={waLink(H.cvMessage)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead({ channel: 'whatsapp', kind: 'careers-cv' })}
            className="not-italic font-semibold text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px]"
          >
            Send your CV anyway →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------- how hiring works ---------- */
function Steps() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>How hiring works</Eyebrow>
          <h2 className={h2}>Four steps, no surprises.</h2>
        </Reveal>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          <span aria-hidden className="absolute left-[15px] top-4 hidden h-px w-[calc(100%-2rem)] bg-[#2A1F1A]/20 md:block" />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.08}>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-[#2A1F1A] bg-[#FAF8F5] font-['JetBrains_Mono'] text-[11px] font-semibold text-[#2A1F1A]">
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
          <h2 className={h2}>Good to know before you apply.</h2>
          <p className="mt-4 font-serif text-lg italic text-[#6B5446]">Straight answers, no fine print.</p>
        </Reveal>
        <ul className="divide-y divide-[#2A1F1A]/15 border-y border-[#2A1F1A]/15 lg:col-span-8">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-['Space_Grotesk'] text-lg font-bold leading-snug text-[#2A1F1A] sm:text-xl">{f.q}</span>
                  <span
                    aria-hidden
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-[#2A1F1A] font-['JetBrains_Mono'] text-base text-[#2A1F1A] transition-colors duration-300"
                    style={{ background: on ? '#C6DB3F' : 'transparent' }}
                  >
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

/* ---------- closing card ---------- */
function Closing() {
  return (
    <section className="pb-28 pt-16 sm:pb-32 sm:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative">
          <div aria-hidden className="absolute inset-0 rounded-[20px] border" style={{ borderColor: 'rgba(42,31,26,.22)', transform: 'translate(9px, 9px)' }} />
          <div className="relative grid gap-8 rounded-[20px] border-[1.5px] bg-[#FAF8F5] px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:items-center" style={{ borderColor: ESPRESSO }}>
            <div className="lg:col-span-7">
              <Eyebrow>Join us</Eyebrow>
              <h2 className={h2}>
                Ready to build <span className="lime-mark">with us?</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-[1.7] text-[#4B3F37]">
                You do not need a complex form. Send your CV to our HR desk by WhatsApp or email and we will get back to you within 5 to 7 working days.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <a
                href={waLink(H.cvMessage)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLead({ channel: 'whatsapp', kind: 'careers-cv' })}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2A1F1A] px-7 py-3.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F0E6] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
                Send CV on WhatsApp <Arrow />
              </a>
              <a href={mailto('Resume submission')} className={pill}>
                Email {HR.email}
              </a>
              <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#6B5446]">WhatsApp {HR.phoneDisplay}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Careers() {
  return (
    <>
      <Header />
      <Offer />
      <Roles />
      <Steps />
      <Faq />
      <Closing />
    </>
  );
}
