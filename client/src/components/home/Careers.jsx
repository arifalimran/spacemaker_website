// client/src/components/home/Careers.jsx
// Careers page (/careers): big line with link to all openings, what we offer, open positions, how hiring works, FAQ, closing card.
// Content lives in data/careers.js (replace from the CMS later).
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREERS_HERO as H, OFFER_INTRO, OPEN_INTRO, CHAPTERS as PERKS, JOBS, DEPARTMENTS, FLEX, STEPS, FAQS, HR, APPLY } from '../../data/careers';
import { Eyebrow, Reveal } from '../portfolio/shared';
import { ApplyProvider, useApply } from './ApplyForm';

const ESPRESSO = '#2A1F1A';
const h2 = "mt-4 font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-3xl lg:text-4xl";

const mailto = (subject) => `mailto:${HR.email}?subject=${encodeURIComponent(subject)}`;

const pill =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] px-5 py-2.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#F5F0E6] hover:before:translate-y-0";

function Arrow() {
  return <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

/* ---------- header ---------- */
const pillSand =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-[#D9CBB4] px-6 py-3 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9CBB4] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#D9CBB4] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0";

/* ---------- discover (big line + link to all openings) ---------- */
function Discover() {
  const [before, after] = H.joinTitle.split(H.joinHighlight);
  return (
    <section className="px-5 pb-24 pt-40 sm:px-8 sm:pb-32 sm:pt-48 lg:pb-40">
      <Reveal className="mx-auto max-w-5xl text-center">
        <h2 className="font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.04] tracking-tight text-[#2A1F1A] sm:text-7xl lg:text-8xl">
          {before}
          <span className="lime-mark">{H.joinHighlight}</span>
          {after}
        </h2>
        <div className="mt-10 flex justify-center sm:mt-12">
          <Link to="/careers/openings" className={pill}>
            {H.joinLink} <Arrow />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- what we offer ---------- */
// One perk = one row: a tall photo frame and a text frame of exactly the same size, side by side on desktop.
// The photo side alternates down the page (left, right, left, right). On mobile the photo is on top.
// Title sits at the top of the text frame, the description at the bottom.
function OfferRow({ perk, index }) {
  const [failed, setFailed] = useState(false);
  const photoLeft = index % 2 === 0;
  return (
    <Reveal>
      <div className="grid gap-2 sm:gap-3 lg:grid-cols-2">
        <div
          className={`group relative h-[300px] overflow-hidden rounded-[14px] bg-[#3A2D26] sm:h-[380px] sm:rounded-[18px] lg:h-auto lg:min-h-[520px] ${
            photoLeft ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {perk.image && !failed && (
            <img
              src={perk.image}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
        </div>
        <div
          className={`flex min-h-[300px] flex-col justify-between gap-8 rounded-[14px] bg-[#D9CBB4] p-6 sm:min-h-[380px] sm:rounded-[18px] sm:p-10 lg:min-h-[520px] lg:p-12 ${
            photoLeft ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            <span aria-hidden className="block h-[2px] w-10 bg-[#C6DB3F]" />
            <h3 className="mt-5 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#2A1F1A] sm:text-4xl lg:text-5xl">
              {perk.title}
            </h3>
          </div>
          <div>
            <p className="font-serif text-lg italic text-[#5C6E0A] sm:text-xl">{perk.line}</p>
            <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-[#4B3F37]">{perk.text}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Offer() {
  return (
    <section className="px-3 pb-20 pt-4 sm:px-6 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="px-2 sm:px-0">
          <Eyebrow>What we offer</Eyebrow>
          <h2 className={h2}>A workplace you can be proud of.</h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.75] text-[#4B3F37] sm:text-lg">{OFFER_INTRO}</p>
        </Reveal>
        <div className="mt-12 space-y-2 rounded-[24px] bg-[#2A1F1A] p-2 sm:space-y-3 sm:rounded-[30px] sm:p-3">
          {PERKS.map((p, i) => (
            <OfferRow key={p.key} perk={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- open positions (department tiles) ---------- */
// One tile per department, inside the same dark case as "What we offer". A tile opens the all-openings page filtered to that team.
function DeptTile({ dept, count, index }) {
  const [failed, setFailed] = useState(false);
  const empty = count === 0;
  return (
    <Reveal delay={(index % 3) * 0.06}>
      <Link
        to={`/careers/openings?team=${encodeURIComponent(dept.team)}`}
        className="group relative block h-[200px] overflow-hidden rounded-[14px] bg-[#3A2D26] sm:h-[260px] sm:rounded-[18px] lg:h-[300px]"
      >
        {dept.image && !failed && (
          <img
            src={dept.image}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${empty ? 'opacity-70' : ''}`}
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(42,31,26,.72) 0%, rgba(42,31,26,.12) 48%, rgba(42,31,26,.72) 100%)' }}
        />
        <div className="absolute left-5 right-5 top-5 sm:left-6 sm:top-6">
          <span aria-hidden className="block h-[2px] w-10 bg-[#D3E35A]" />
          <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#D9CBB4] sm:text-4xl">{dept.team}</h3>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#D9CBB4]">
            {empty ? 'No openings right now' : `${count} open ${count === 1 ? 'role' : 'roles'}`}
          </span>
          <span
            aria-hidden
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#D9CBB4] text-lg text-[#2A1F1A] transition-[background-color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-[#C6DB3F] motion-reduce:group-hover:translate-x-0"
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Roles() {
  const { open } = useApply();
  const known = DEPARTMENTS.map((d) => d.team);
  const extra = Array.from(new Set(JOBS.map((j) => j.team).filter((t) => t && !known.includes(t)))).map((team) => ({ team }));
  const depts = [...DEPARTMENTS, ...extra];
  const countOf = (team) => JOBS.filter((j) => j.team === team).length;
  return (
    <section id="roles" className="px-3 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 px-2 sm:px-0">
          <div>
            <Eyebrow>Open positions</Eyebrow>
            <h2 className={h2}>Find your team.</h2>
          </div>
          <span className="rounded-full border border-[#2A1F1A]/30 px-3.5 py-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#2A1F1A]">
            {JOBS.length} open
          </span>
        </Reveal>

        <Reveal className="px-2 sm:px-0">
          <p className="mt-5 max-w-2xl text-base leading-[1.75] text-[#4B3F37] sm:text-lg">{OPEN_INTRO}</p>
        </Reveal>

        <div className="mt-10 grid gap-2 rounded-[24px] bg-[#2A1F1A] p-2 sm:grid-cols-2 sm:gap-3 sm:rounded-[30px] sm:p-3 lg:grid-cols-3">
          {depts.map((d, i) => (
            <DeptTile key={d.team} dept={d} count={countOf(d.team)} index={i} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 px-2 sm:px-0">
          <p className="font-serif text-lg italic text-[#4B3F37]">
            Don't see your role?{' '}
            <button
              type="button"
              onClick={() => open(APPLY.general)}
              className="not-italic font-semibold text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px]"
            >
              Send your CV anyway →
            </button>
          </p>
          <Link to="/careers/openings" className={pill}>
            View all openings ({JOBS.length}) <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- freelance / part-time ---------- */
export function Flex() {
  const { open } = useApply();
  const [failed, setFailed] = useState(false);
  const showImg = FLEX.image && !failed;
  return (
    <section className="px-3 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid overflow-hidden rounded-[24px] bg-[#2A1F1A] sm:rounded-[32px] lg:grid-cols-2">
            <div className="relative h-60 bg-[#3A2D26] sm:h-80 lg:order-2 lg:h-auto lg:min-h-[540px]">
              {showImg && (
                <img
                  src={FLEX.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#D9CBB4]">
                <span className="h-[2px] w-8 bg-[#C6DB3F]" />
                {FLEX.eyebrow}
              </span>
              <h2 className="mt-5 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#D9CBB4] sm:text-4xl lg:text-5xl">
                {FLEX.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-[1.7] text-[#BBA992]">{FLEX.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FLEX.who.map((w) => (
                  <span key={w} className="rounded-full border border-[#BBA992]/40 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#BBA992]">
                    {w}
                  </span>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {FLEX.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] leading-snug text-[#D9CBB4]">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#C6DB3F]" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <button type="button" onClick={() => open(APPLY.flex)} className={pillSand}>
                  {FLEX.cta} <Arrow />
                </button>
                <a
                  href={mailto(FLEX.emailSubject)}
                  className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#D9CBB4] underline decoration-[#D9CBB4]/40 underline-offset-[6px] transition-colors hover:decoration-[#C6DB3F]"
                >
                  Or email us
                </a>
              </div>
              <p className="mt-6 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#A39380]">{FLEX.note}</p>
            </div>
          </div>
        </Reveal>
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
  const { open } = useApply();
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
                Fill in a short form and upload your CV. Our HR desk will get back to you within 5 to 7 working days.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <button
                type="button"
                onClick={() => open(APPLY.general)}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2A1F1A] px-7 py-3.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F0E6] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="h-2 w-2 rounded-full bg-[#C6DB3F]" />
                Apply now <Arrow />
              </button>
              <a href={mailto('Resume submission')} className={pill}>
                Email {HR.email}
              </a>
              <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#6B5446]">Questions? Call {HR.phoneDisplay}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Careers() {
  return (
    <ApplyProvider>
      <Discover />
      <Offer />
      <Roles />
      <Flex />
      <Steps />
      <Faq />
      <Closing />
    </ApplyProvider>
  );
}
