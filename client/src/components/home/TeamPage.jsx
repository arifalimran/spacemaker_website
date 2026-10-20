// client/src/components/home/TeamPage.jsx
// /team: the full list of experts (10-15), with filter chips by discipline. Same cards as the home row,
// with the expertise text shown under each card. Data: team + teamSection in data/siteContent.js.
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { team, teamSection as S } from '../../data/siteContent';
import { Eyebrow, Reveal } from '../portfolio/shared';
import TeamCard, { TEAM_CSS, ESPRESSO, IVORY } from './TeamCard';

export default function TeamPage() {
  const all = useMemo(() => [...team].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)), []);
  const groups = useMemo(() => ['All', ...Array.from(new Set(all.map((m) => m.group).filter(Boolean)))], [all]);
  const [group, setGroup] = useState('All');
  const shown = group === 'All' ? all : all.filter((m) => m.group === group);

  return (
    <main className="relative min-h-screen overflow-hidden pb-20 pt-32 sm:pt-36" style={{ background: IVORY }}>
      <style>{TEAM_CSS}</style>
      <div
        aria-hidden
        className="sm-team-grid pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Link to="/" className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#6B5446] transition-colors hover:text-[#2A1F1A]">
          ← Back to home
        </Link>
        <Reveal className="mt-8 max-w-2xl">
          <Eyebrow>{S.label}</Eyebrow>
          <h1 className="mt-4 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl" style={{ color: ESPRESSO }}>
            {S.pageHeading || 'Meet all our experts.'}
          </h1>
          {S.pageIntro && <p className="mt-4 text-base leading-[1.8] text-[#4B3F37] sm:text-lg">{S.pageIntro}</p>}
        </Reveal>

        <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
          {groups.map((g) => {
            const on = g === group;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={on}
                onClick={() => setGroup(g)}
                className="rounded-full border px-4 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] transition-colors duration-300"
                style={{
                  borderColor: ESPRESSO,
                  background: on ? ESPRESSO : 'transparent',
                  color: on ? '#F5F0E6' : ESPRESSO,
                }}
              >
                {g}
              </button>
            );
          })}
        </div>

        <ul className="sm-tc-list sm-tc-flat mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {shown.map((m) => (
            <li key={m.id}>
              <TeamCard m={m} n={all.indexOf(m)} showText />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
