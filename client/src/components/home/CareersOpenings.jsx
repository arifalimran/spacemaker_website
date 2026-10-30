// client/src/components/home/CareersOpenings.jsx
// All open roles (/careers/openings). Every role comes from JOBS in data/careers.js (replace from the CMS later).
// Quiet list on cream with thin lines (small team line, bold title, location on the right), then the flexible-work card.
import React, { useCallback, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { JOBS, DEPARTMENTS, HR, APPLY } from '../../data/careers';
import { Eyebrow, Reveal } from '../portfolio/shared';
import { Flex } from './Careers';
import { ApplyProvider, useApply } from './ApplyForm';
import JobDetail from './JobDetail';

const mailto = (subject) => `mailto:${HR.email}?subject=${encodeURIComponent(subject)}`;

export default function CareersOpenings() {
  return (
    <ApplyProvider>
      <OpeningsPage />
    </ApplyProvider>
  );
}

function OpeningsPage() {
  const { open } = useApply();
  const [params, setParams] = useSearchParams();
  const selected = JOBS.find((j) => j.slug && j.slug === params.get('job')) || null;
  // the team filter lives in the address (?team=Site) so the Careers page tiles can link straight to it
  const team = params.get('team') || 'All';
  const openJob = (slug) => {
    const next = new URLSearchParams(params);
    next.set('job', slug);
    setParams(next);
  };
  const closeJob = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete('job');
    setParams(next);
  }, [params, setParams]);
  const setTeam = (t) => {
    const next = new URLSearchParams(params);
    next.delete('job');
    if (t === 'All') next.delete('team');
    else next.set('team', t);
    setParams(next);
  };
  const teams = useMemo(() => {
    const names = [...DEPARTMENTS.map((d) => d.team), ...JOBS.map((j) => j.team)].filter(Boolean);
    return ['All', ...Array.from(new Set(names))];
  }, []);
  const list = team === 'All' ? JOBS : JOBS.filter((j) => j.team === team);

  // arriving from a department tile: bring the list into view
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).get('team')) return undefined;
    const t = setTimeout(() => {
      const el = document.getElementById('openings-list');
      if (!el) return;
      if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -110 });
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className="px-5 pb-6 pt-36 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              to="/careers"
              className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#2A1F1A] underline decoration-[#2A1F1A]/30 underline-offset-[6px] transition-colors hover:decoration-[#5C6E0A]"
            >
              ← Careers
            </Link>
            <div className="mt-8">
              <Eyebrow>All openings</Eyebrow>
            </div>
            <h1 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-5xl">All open roles</h1>
            <p className="mt-3 text-base text-[#6B5446]">
              {JOBS.length} open {JOBS.length === 1 ? 'role' : 'roles'} · Dhaka and Jolshiri
            </p>

            {teams.length > 2 && (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter roles by team">
                {teams.map((t) => {
                  const on = team === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTeam(t)}
                      className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] underline decoration-2 underline-offset-[8px] transition-colors duration-300 ${
                        on ? 'text-[#2A1F1A] decoration-[#C6DB3F]' : 'text-[#6B5446] decoration-transparent hover:text-[#2A1F1A]'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section id="openings-list" className="px-5 pb-10 pt-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[15px] text-[#2A1F1A] sm:text-base">
            Showing {list.length} of {JOBS.length} open {JOBS.length === 1 ? 'job' : 'jobs'}
          </p>
          <ul className="mt-6 divide-y divide-[#2A1F1A]/20 border-y border-[#2A1F1A]/20">
            {list.length === 0 && (
              <li className="py-8 font-serif text-lg italic text-[#4B3F37]">
                No open roles in this team right now.{' '}
                <button
                  type="button"
                  onClick={() => open(APPLY.general)}
                  className="not-italic font-semibold text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px]"
                >
                  Send a general application →
                </button>
              </li>
            )}
            {list.map((j) => (
              <li key={j.slug || j.title} className="grid gap-3 py-6 transition-colors duration-300 hover:bg-[#2A1F1A]/[0.03] md:grid-cols-12 md:items-center md:px-3 md:py-7">
                <div className="md:col-span-8">
                  <p className="text-[13px] text-[#6B5446]">{[j.team, j.type, j.exp].filter(Boolean).join(' · ')}</p>
                  <h2 className="mt-1.5 font-['Space_Grotesk'] text-xl font-bold leading-snug text-[#2A1F1A] sm:text-2xl">
                    <button type="button" onClick={() => openJob(j.slug)} className="text-left underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#C6DB3F]">
                      {j.title}
                    </button>
                  </h2>
                </div>
                <div className="flex flex-col gap-2 md:col-span-4 md:items-end md:text-right">
                  <span className="text-[15px] text-[#6B5446] sm:text-base">{j.loc}</span>
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] md:justify-end">
                    <button
                      type="button"
                      onClick={() => openJob(j.slug)}
                      className="uppercase tracking-[0.16em] text-[#2A1F1A] underline decoration-[#2A1F1A]/30 underline-offset-[6px] transition-colors hover:decoration-[#5C6E0A]"
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      onClick={() => open(j.title)}
                      className="uppercase tracking-[0.16em] text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#5C6E0A]"
                    >
                      Apply now
                    </button>
                    <a
                      href={mailto(`Application: ${j.title}`)}
                      className="text-[#6B5446] underline decoration-[#2A1F1A]/20 underline-offset-[6px] transition-colors hover:text-[#2A1F1A] hover:decoration-[#5C6E0A]"
                    >
                      Email
                    </a>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-serif text-lg italic text-[#4B3F37]">
            Don't see your role?{' '}
            <button
              type="button"
              onClick={() => open(APPLY.general)}
              className="not-italic font-semibold text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px]"
            >
              Send your CV anyway →
            </button>
          </p>
        </div>
      </section>

      <Flex />
      <div className="pb-12 sm:pb-16" />
      <AnimatePresence>{selected && <JobDetail key="job-card" job={selected} jobs={JOBS} onNavigate={(slug) => {
        const next = new URLSearchParams(params);
        next.set('job', slug);
        setParams(next, { replace: true });
      }} onClose={closeJob} />}</AnimatePresence>
    </>
  );
}
