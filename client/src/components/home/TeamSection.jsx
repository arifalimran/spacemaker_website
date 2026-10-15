// client/src/components/home/TeamSection.jsx
// Team of experts: pale lime fading to cream, after Testimonials. Data: team in siteContent.js.
// No photo -> initials on green with a lime ring. Hover = lift + photo zoom (transform only).
import React from 'react';
import { team, teamSection as S } from '../../data/siteContent';
import { Eyebrow, Reveal } from '../portfolio/shared';
import { initials } from './Testimonials';

function Member({ m }) {
  return (
    <article className="group h-full transition-transform duration-500 ease-out md:hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#1B4332]">
        {m.photo ? (
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(250,248,245,0.10) 0%, rgba(250,248,245,0) 70%)' }}
            />
            <span
              aria-hidden
              className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#C6F00C]/30 font-['Space_Grotesk'] text-2xl font-bold tracking-wide text-[#FAF8F5] ring-2 ring-[#C6F00C] ring-offset-4 ring-offset-[#1B4332] transition-transform duration-700 ease-out sm:h-24 sm:w-24 sm:text-3xl md:group-hover:scale-[1.05]"
            >
              {initials(m.name)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="font-['Space_Grotesk'] text-base font-bold text-[#111827] sm:text-lg">{m.name}</div>
        <div className="mt-0.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#5C6E0A]">{m.role}</div>
        {m.bio && <p className="mt-2 text-sm leading-relaxed text-[#374151]">{m.bio}</p>}
      </div>
    </article>
  );
}

export default function TeamSection({ items = team }) {
  if (!items.length) return null;
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    <section
      id="team"
      className="relative pb-20 pt-10 sm:pb-24 sm:pt-14"
      style={{ background: 'linear-gradient(to bottom, #EEF4DD 0%, #F3F2E2 45%, #F5F0E6 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{S.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl">
          {S.title}
        </h2>
        {S.intro && <p className="mt-4 max-w-xl text-[#374151]">{S.intro}</p>}

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {sorted.map((m, i) => (
            <Reveal key={m.id} delay={(i % 4) * 0.06} className="h-full">
              <Member m={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
