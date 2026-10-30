// client/src/components/home/JobDetail.jsx
// The job card that opens over the all-openings list (/careers/openings?job=slug).
// Desktop: two columns. Left scrolls (title, sticky section pills, sections). Right stays put (salary, facts, Apply, Email, share, previous/next).
// Mobile: one column with a sticky bottom bar (Apply now + Email).
// Apply now opens the existing Apply form panel (useApply) with the role pre-filled.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HR, STEPS, CHAPTERS } from '../../data/careers';
import { useApply } from './ApplyForm';

const mailto = (subject) => `mailto:${HR.email}?subject=${encodeURIComponent(subject)}`;

const JUMPS = [
  ['role', 'About'],
  ['do', 'Duties'],
  ['need', 'Needs'],
  ['get', 'Benefits'],
  ['how', 'Hiring'],
];

const mono = "font-['JetBrains_Mono']";
const btnDark =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-[#2A1F1A] px-6 py-3 font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#F5F0E6] transition-colors duration-300 hover:bg-[#3A2D26]";
const btnText =
  "font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#2A1F1A] underline decoration-[#2A1F1A]/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-[#C6DB3F]";

function Sec({ id, n, before, hl, children }) {
  return (
    <section id={`jd-${id}`}>
      <div className="flex items-center gap-3">
        <span className={`${mono} text-[11px] tracking-[0.2em] text-[#6B5446]`}>{n}</span>
        <span aria-hidden className="h-px w-10 bg-[#2A1F1A]/30" />
      </div>
      <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold leading-[1.2] tracking-tight text-[#2A1F1A] sm:text-[1.4rem]">
        {before} {hl}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[14px] leading-[1.65] text-[#3B2F28]">
          <span aria-hidden className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full bg-[#C6DB3F] ring-1 ring-[#2A1F1A]/40" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Salary({ value, tinted }) {
  if (!value) return null;
  return (
    <div
      className={tinted ? 'rounded-2xl px-4 py-4' : 'border-b border-[#2A1F1A]/15 pb-5'}
      style={tinted ? { background: 'linear-gradient(180deg, #F5F4EA 0%, #EAEADB 100%)' } : undefined}
    >
      <p className={`${mono} text-[10px] uppercase tracking-[0.18em] text-[#6B5446]`}>Salary</p>
      <p className="mt-2 font-['Space_Grotesk'] text-xl font-semibold leading-snug text-[#2A1F1A]">{value}</p>
      <p className="mt-1.5 text-[13px] leading-snug text-[#6B5446]">The final amount depends on your experience and interview.</p>
    </div>
  );
}

// "How we hire": the line draws across, then the steps fade in one after another (plays once, transform + opacity only)
function Hire({ root, reduce }) {
  const start = reduce ? 'show' : 'hidden';
  return (
    <motion.ol
      className="relative grid gap-6 sm:grid-cols-4 sm:gap-4"
      initial={start}
      whileInView="show"
      viewport={{ root, once: true, amount: 0.35 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } } }}
    >
      <motion.span
        aria-hidden
        className="absolute left-3.5 right-3.5 top-3.5 hidden h-px origin-left bg-[#2A1F1A]/30 sm:block"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: 'easeOut' } } }}
      />
      <motion.span
        aria-hidden
        className="absolute bottom-3.5 left-3.5 top-3.5 w-px origin-top bg-[#2A1F1A]/30 sm:hidden"
        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, ease: 'easeOut' } } }}
      />
      {STEPS.map((s, i) => (
        <motion.li
          key={s.title}
          className="relative flex gap-4 sm:block"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
        >
          <span className={`relative z-10 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#2A1F1A] bg-[#FAF8F5] ${mono} text-[10px] font-semibold text-[#2A1F1A]`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="sm:mt-3">
            <p className="font-['Space_Grotesk'] text-[14px] font-bold text-[#2A1F1A]">{s.title}</p>
            <p className="mt-1 text-[13px] leading-snug text-[#6B5446]">{s.text}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}

function Pager({ index, total, onPrev, onNext }) {
  if (total < 2) return null;
  const arrow =
    "flex h-8 w-8 items-center justify-center rounded-full border border-[#2A1F1A]/40 text-[13px] text-[#2A1F1A] transition-colors duration-200 hover:border-[#2A1F1A] hover:bg-[#2A1F1A]/[0.04]";
  return (
    <div className="flex items-center justify-between gap-3">
      <button type="button" onClick={onPrev} aria-label="Previous job" className={arrow}>←</button>
      <span className={`${mono} text-[11px] uppercase tracking-[0.16em] text-[#5C4A3E]`}>
        Job {index + 1} of {total}
      </span>
      <button type="button" onClick={onNext} aria-label="Next job" className={arrow}>→</button>
    </div>
  );
}

export default function JobDetail({ job, jobs = [], onNavigate, onClose }) {
  const reduce = useReducedMotion();
  const { open } = useApply();
  const closeRef = useRef(null);
  const scroller = useRef(null);
  const [active, setActive] = useState('role');
  const [copied, setCopied] = useState(false);

  const index = Math.max(0, jobs.findIndex((j) => j.slug === job.slug));
  const go = useCallback(
    (step) => {
      if (!jobs.length || !onNavigate) return;
      onNavigate(jobs[(index + step + jobs.length) % jobs.length].slug);
    },
    [index, jobs, onNavigate]
  );

  // open: lock the page behind, listen for Esc
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      // if the Apply form is open on top, Esc belongs to the form
      if (e.key === 'Escape' && !document.getElementById('apply-title')) onClose();
    };
    window.addEventListener('keydown', onKey);
    window.__lenis?.stop?.();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.__lenis?.start?.();
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // a different job: back to the top
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
    setActive('role');
    setCopied(false);
  }, [job.slug]);

  // highlight the section being read
  useEffect(() => {
    const el = scroller.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let cur = JUMPS[0][0];
        JUMPS.forEach(([id]) => {
          const s = document.getElementById(`jd-${id}`);
          if (s && s.offsetTop - 90 <= el.scrollTop) cur = id;
        });
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) cur = JUMPS[JUMPS.length - 1][0];
        setActive(cur);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [job.slug]);

  // scroll only the card, never the page behind it
  const jump = (id) => {
    const el = document.getElementById(`jd-${id}`);
    if (!el || !scroller.current) return;
    scroller.current.scrollTo({ top: el.offsetTop - 70, behavior: reduce ? 'auto' : 'smooth' });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  const facts = [
    ['Location', job.loc],
    ['Type', job.type],
    ['Experience', job.exp],
  ].filter(([, v]) => v);

  return (
    <div className="fixed inset-0 z-[900]" role="dialog" aria-modal="true" aria-labelledby="jd-title">
      <motion.div
        className="absolute inset-0 bg-[#2A1F1A]/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
        onClick={onClose}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-center md:p-6">
        <motion.div
          className="pointer-events-auto relative flex h-[92svh] w-full max-w-5xl flex-col md:h-[min(86svh,820px)] md:flex-row md:gap-3"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* left card: everything that scrolls */}
          <div
            className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-t-[24px] bg-[#FAF8F5] shadow-2xl md:rounded-[28px]"
            style={{ background: 'linear-gradient(180deg, #FAF8F5 0%, #FAF8F5 55%, #F3ECDD 100%)' }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#2A1F1A]/40 bg-[#FAF8F5] text-base text-[#2A1F1A] transition-colors duration-200 hover:border-[#2A1F1A] sm:right-5 sm:top-5"
            >
              ×
            </button>

            <div className="relative flex min-h-0 flex-1 flex-col">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[#F3ECDD] to-transparent" />
            <div ref={scroller} data-lenis-prevent className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="px-6 pb-5 pt-6 sm:px-9 sm:pt-8">
                <span className={`inline-flex items-center gap-2.5 ${mono} text-[11px] uppercase tracking-[0.2em] text-[#2A1F1A]`}>
                  <span className="h-2 w-2 rounded-full bg-[#C6DB3F] ring-1 ring-[#2A1F1A]/30" />
                  {job.team}
                </span>
                <h2 id="jd-title" className="mt-4 pr-12 font-['Space_Grotesk'] text-[1.7rem] font-bold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-[2.1rem]">
                  {job.title}
                </h2>
                {/* phones: facts and salary live here (on desktop they sit in the right panel) */}
                <div className="mt-4 space-y-3 md:hidden">
                  <div className="flex flex-wrap gap-2">
                    {facts.map(([, v]) => (
                      <span key={v} className={`rounded-full border border-[#2A1F1A]/30 px-3 py-1 ${mono} text-[10px] uppercase tracking-[0.14em] text-[#2A1F1A]`}>
                        {v}
                      </span>
                    ))}
                  </div>
                  <Salary value={job.salary} tinted />
                </div>
              </div>

              {/* section pills: stay at the top while you read */}
              <div className="sticky top-0 z-20 border-y border-[#2A1F1A]/15 bg-[#FAF8F5]/95 px-6 pt-3 sm:px-9">
                <div className="-mx-1 flex gap-6 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Jump to a section">
                  {JUMPS.map(([id, text]) => {
                    const on = active === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => jump(id)}
                        aria-current={on ? 'true' : undefined}
                        className={`flex-none border-b-2 pb-2.5 ${mono} text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                          on ? 'border-[#C6DB3F] text-[#2A1F1A]' : 'border-transparent text-[#6B5446] hover:text-[#2A1F1A]'
                        }`}
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-12 px-6 py-8 sm:px-9">
                <Sec id="role" n="01" icon="role" before="About this" hl="job">
                  <p className="max-w-xl text-[15px] leading-[1.7] text-[#4B3F37]">{job.summary}</p>
                </Sec>

                {job.responsibilities?.length > 0 && (
                  <Sec id="do" n="02" icon="do" before="What you will" hl="do">
                    <Bullets items={job.responsibilities} />
                  </Sec>
                )}

                {(job.needs?.length > 0 || job.bonus?.length > 0) && (
                  <Sec id="need" n="03" icon="need" before="What we" hl="need">
                    {job.needs?.length > 0 && (
                      <>
                        <p className={`mb-3 ${mono} text-[11px] uppercase tracking-[0.18em] text-[#5C4A3E]`}>You must have</p>
                        <Bullets items={job.needs} />
                      </>
                    )}
                    {job.bonus?.length > 0 && (
                      <>
                        <p className={`mb-3 mt-6 ${mono} text-[11px] uppercase tracking-[0.18em] text-[#5C4A3E]`}>Good to have</p>
                        <Bullets items={job.bonus} />
                      </>
                    )}
                  </Sec>
                )}

                <Sec id="get" n="04" icon="get" before="What you" hl="get">
                  <ul className="divide-y divide-[#2A1F1A]/15 border-y border-[#2A1F1A]/15">
                    {CHAPTERS.map((p) => (
                      <li key={p.key} className="flex items-start gap-3 py-3">
                        <span aria-hidden className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full bg-[#C6DB3F] ring-1 ring-[#2A1F1A]/40" />
                        <p className="text-[14px] leading-[1.6] text-[#4B3F37]">
                          <span className="font-semibold text-[#2A1F1A]">{p.title}.</span> {p.line}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Sec>

                <Sec id="how" n="05" icon="how" before="How we" hl="hire">
                  <Hire key={job.slug} root={scroller} reduce={reduce} />
                </Sec>

                <div className="md:hidden">
                  <Pager index={index} total={jobs.length} onPrev={() => go(-1)} onNext={() => go(1)} />
                </div>
              </div>
            </div>
            </div>

            {/* phones: bottom bar */}
            <div className="flex items-center gap-5 border-t border-[#2A1F1A]/15 bg-[#F3ECDD] px-6 py-3.5 md:hidden">
              <button type="button" onClick={() => open(job.title)} className={`${btnDark} flex-1`}>
                Apply now <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <a href={mailto(`Application: ${job.title}`)} className={btnText}>
                Email
              </a>
            </div>
          </div>

          {/* desktop: right panel that stays in view */}
          <aside
            className="hidden w-[320px] flex-none flex-col justify-between gap-6 rounded-[28px] p-7 shadow-2xl md:flex"
            style={{
              background:
                'radial-gradient(120% 55% at 100% 0%, rgba(198,219,63,.06), transparent 60%), linear-gradient(180deg, #F5F4EA 0%, #EFF0E1 55%, #EAEADB 100%)',
            }}
          >
            <Salary value={job.salary} />
            <dl className="space-y-5">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className={`${mono} text-[10px] uppercase tracking-[0.18em] text-[#5C6E0A]`}>{k}</dt>
                  <dd className="mt-0.5 text-[15px] leading-snug text-[#2A1F1A]">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col items-start gap-4 border-t border-[#2A1F1A]/15 pt-5">
              <button type="button" onClick={() => open(job.title)} className={`${btnDark} w-full`}>
                Apply now <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <div className="flex items-center gap-6">
                <a href={mailto(`Application: ${job.title}`)} className={btnText}>
                  Email
                </a>
                <button type="button" onClick={copyLink} className={btnText}>
                  {copied ? 'Link copied ✓' : 'Copy link'}
                </button>
              </div>
              <div className="mt-2 w-full">
                <Pager index={index} total={jobs.length} onPrev={() => go(-1)} onNext={() => go(1)} />
              </div>
            </div>
          </aside>
        </motion.div>
      </div>
    </div>
  );
}
