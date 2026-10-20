// client/src/components/home/TeamExperts.jsx
// "Team of experts" on the home page: compact. One row of four featured people (2 per row on phones),
// a short italic line, and a link to the full list at /team. Cards live in TeamCard.jsx.
// Data: teamSection + team in data/siteContent.js (sample content for now).
import React from 'react';
import { Link } from 'react-router-dom';
import { team, teamSection as S } from '../../data/siteContent';
import { Eyebrow, Reveal } from '../portfolio/shared';
import TeamCard, { TEAM_CSS, ESPRESSO, IVORY } from './TeamCard';
import TeamBuildingMark from './TeamBuildingMark';
import TeamBackdrop from './TeamBackdrop';

export default function TeamExperts() {
  const sorted = [...team].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  if (!sorted.length) return null;
  const row = (sorted.some((m) => m.featured) ? sorted.filter((m) => m.featured) : sorted).slice(0, 4);

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative overflow-hidden border-t border-[#2A1F1A]/15 py-14 sm:py-16"
      style={{ background: 'linear-gradient(180deg, #F5F9EE 0%, #EEF4E3 100%)' }}
    >
      <style>{TEAM_CSS}</style>
      <TeamBackdrop />
      <div
        aria-hidden
        className="sm-team-grid pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 25%, #000 75%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, #000 25%, #000 75%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{ background: 'linear-gradient(to bottom, #EAF1DF, rgba(245,249,238,0))' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-14">
          <Reveal className="max-w-2xl">
            <Eyebrow>{S.label}</Eyebrow>
            <h2
              id="team-heading"
              className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
              style={{ color: ESPRESSO }}
            >
              {S.heading.slice(0, S.heading.lastIndexOf(' ') + 1)}
              <span className="lime-mark">{S.heading.slice(S.heading.lastIndexOf(' ') + 1)}</span>
            </h2>
            {S.intro && <p className="mt-3 font-serif text-lg italic text-[#6B5446]">{S.intro}</p>}
          </Reveal>
          <div className="w-[170px] flex-none md:w-[230px]">
            <TeamBuildingMark />
          </div>
        </div>

        <ul className="sm-tc-list mt-10 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {row.map((m, i) => (
            <li key={m.id || i}>
              <Reveal delay={i * 0.08} className="h-full">
                <TeamCard m={m} n={sorted.indexOf(m)} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-start">
          <Link
            to="/team"
            className="group inline-flex items-center gap-3 rounded-full border-[1.5px] border-[#2A1F1A] bg-transparent px-6 py-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#2A1F1A] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:before:translate-y-0 relative isolate overflow-hidden transition-colors duration-300 hover:text-[#F5F0E6]"
          >
            {S.linkLabel || 'Meet all our experts'}
            <span className="rounded-full border border-current px-2 py-0.5 text-[10px]">{sorted.length}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
