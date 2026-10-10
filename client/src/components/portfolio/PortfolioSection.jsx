// client/src/components/portfolio/PortfolioSection.jsx
// The main film of the site: flagships first, then other projects, interiors, upcoming.
import React from 'react';
import { Link } from 'react-router-dom';
import { projects, interiors, upcoming, STATUS_LABEL, coverOf } from '../../data/portfolio';
import {
  BlendedPhoto,
  Eyebrow,
  Reveal,
  Facts,
  HStrip,
  LeadLink,
  CallLink,
  linkCls,
  quietCls,
} from './shared';

function ProjectScene({ project, flagship, side }) {
  return (
    <article
      className={`relative overflow-hidden ${flagship ? 'min-h-[88vh] py-20' : 'min-h-[68vh] py-14'}`}
    >
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className={`absolute bottom-[6%] top-[6%] z-[1] w-full opacity-45 md:w-[70%] md:opacity-100 ${
          side === 'right' ? 'right-0' : 'left-0'
        }`}
      >
        <BlendedPhoto src={coverOf(project)} alt={project.title} side={side} drift className="h-full w-full" />
      </Link>

      <div
        className={`relative z-10 mx-auto flex max-w-7xl items-center px-5 sm:px-8 ${
          flagship ? 'min-h-[70vh]' : 'min-h-[50vh]'
        } ${side === 'left' ? 'md:justify-end' : ''}`}
      >
        <Reveal className="max-w-xl">
          <Eyebrow>
            {flagship ? 'Featured · ' : ''}
            {STATUS_LABEL[project.status]}
          </Eyebrow>
          <h3
            className={`mt-5 font-['Space_Grotesk'] font-extrabold leading-[1.04] tracking-tight text-[#111827] ${
              flagship ? 'text-5xl sm:text-7xl' : 'text-4xl sm:text-5xl'
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-5 font-serif text-xl italic leading-snug text-[#1B4332]/85 sm:text-2xl">{project.line}</p>

          <Facts
            className="mt-8"
            items={[
              { k: 'Location', v: project.area },
              { k: 'Floors', v: project.floors },
              { k: 'Started', v: project.started },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link to={`/projects/${project.slug}`} className={linkCls}>
              Explore this residence →
            </Link>
            <LeadLink project={project} className={quietCls}>
              Ask about this residence
            </LeadLink>
            <CallLink project={project}>Call</CallLink>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function ChapterLabel({ children, sub }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-2 pt-16 sm:px-8">
      <Eyebrow>{children}</Eyebrow>
      {sub && <p className="mt-3 max-w-xl text-neutral-600">{sub}</p>}
    </div>
  );
}

function Blueprint() {
  return (
    <svg viewBox="0 0 120 160" className="h-24 w-16 shrink-0 text-[#1B4332]/25" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="20" y="20" width="80" height="130" />
      <path d="M20 50h80M20 80h80M20 110h80M50 20v130M80 20v130M10 150h100" />
    </svg>
  );
}

function Upcoming() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <ul className="divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
        {upcoming.map((u) => (
          <li key={u.id}>
            <Reveal className="grid items-center gap-4 py-8 sm:grid-cols-12 sm:gap-8">
              <div className="flex items-center gap-5 sm:col-span-7">
                <Blueprint />
                <div>
                  <div className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {u.opening}
                  </div>
                  <div className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-[#111827] sm:text-3xl">
                    {u.area}
                  </div>
                  <div className="mt-1 font-serif text-lg italic text-[#1B4332]/80">{u.line}</div>
                </div>
              </div>
              <div className="sm:col-span-5 sm:text-right">
                <LeadLink project={u} kind="upcoming" className={linkCls}>
                  Register your interest →
                </LeadLink>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PortfolioSection() {
  const flagships = projects.filter((p) => p.flagship);
  const activeOthers = projects.filter((p) => !p.flagship && p.status === 'active');
  const completedOthers = projects.filter((p) => !p.flagship && p.status === 'completed');

  const groups = [
    { key: 'flag', label: 'Featured residences', tint: '#EDF4EC', items: flagships, big: true },
    { key: 'active', label: 'Also under construction', tint: '#F6F8F5', items: activeOthers, big: false },
    { key: 'done', label: 'Delivered and lived in', tint: '#EBF2EA', items: completedOthers, big: false },
  ].filter((g) => g.items.length);

  return (
    <section
      id="residences"
      className="relative"
      style={{ background: 'linear-gradient(to bottom, #F6F8F5 0%, #EDF4EC 40%, #F3EFE6 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-24 sm:px-8 sm:pt-32">
        <Eyebrow>Residences</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-6xl">
          Homes we are building, and homes already lived in.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-[1.8] text-neutral-600 sm:text-lg">
          Each one drawn, engineered and built by our own team. Walk through them, then ask us about the one that
          feels like yours.
        </p>
      </div>

      {groups.map((g) => (
        <div
          key={g.key}
          style={{ background: `linear-gradient(to bottom, transparent, ${g.tint} 18%, ${g.tint} 82%, transparent)` }}
        >
          <ChapterLabel>{g.label}</ChapterLabel>
          {g.items.map((p, i) => (
            <ProjectScene key={p.id} project={p} flagship={g.big} side={i % 2 === 0 ? 'right' : 'left'} />
          ))}
        </div>
      ))}

      {/* interiors: a strip of rooms */}
      <div style={{ background: 'linear-gradient(to bottom, transparent, #F3EFE6 18%, #F3EFE6 90%, transparent)' }}>
        <ChapterLabel
          sub={`${interiors.title} · ${interiors.client}, ${interiors.location}. Rooms finished down to the joinery.`}
        >
          Interiors
        </ChapterLabel>
        <div className="mt-6">
          <HStrip>
            {interiors.suites.map((s) => (
              <figure key={s.title} className="w-[72vw] flex-none snap-start sm:w-[380px]">
                <div className="aspect-[4/5]">
                  <BlendedPhoto src={s.image} alt={s.title} side="center" fade={false} className="h-full w-full" />
                </div>
                <figcaption className="mt-3">
                  <div className="font-['Space_Grotesk'] text-lg font-bold text-[#111827]">{s.title}</div>
                  <div className="mt-1 font-['JetBrains_Mono'] text-[10px] uppercase leading-relaxed tracking-[0.14em] text-neutral-500">
                    {s.specs}
                  </div>
                </figcaption>
              </figure>
            ))}
          </HStrip>
        </div>
      </div>

      {/* upcoming */}
      <div className="pb-24 sm:pb-32">
        <ChapterLabel sub="Three new addresses are close. Tell us you are interested and we will reach you first.">
          Opening soon
        </ChapterLabel>
        <div className="mt-6">
          <Upcoming />
        </div>
      </div>
    </section>
  );
}
