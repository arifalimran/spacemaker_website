// client/src/components/portfolio/InteriorsIndex.jsx
// Route: /interiors  (all interior projects). Compact: a card grid that stays tidy with dozens of interiors.
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { interiorProjects, interiorCover, TYPE_LABEL } from '../../data/portfolio';
import { Eyebrow, Reveal } from './shared';
import { Wash } from './ProjectSections';

const PAGE = 12; // cards shown before "Show more"
const MONO = "font-['JetBrains_Mono']";

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${MONO} rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${
        on ? 'border-[#2A1F1A] bg-[#2A1F1A] text-[#F3EFE6]' : 'border-[#2A1F1A]/20 text-neutral-600 hover:border-[#2A1F1A]/60'
      }`}
    >
      {children}
    </button>
  );
}

function Card({ p, i }) {
  return (
    <Reveal delay={Math.min(i % 6, 5) * 0.05}>
      <Link to={`/interiors/${p.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E9E4D8] shadow-[0_14px_30px_-18px_rgba(42,31,26,0.45)] ring-1 ring-black/5">
          <img
            src={interiorCover(p)}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span className={`${MONO} absolute left-3 top-3 rounded-full bg-[#1A120E]/75 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#C6F00C]`}>
            {TYPE_LABEL[p.type]}
          </span>
        </div>
        <div className="mt-3.5">
          <h3 className="font-['Space_Grotesk'] text-xl font-bold leading-tight text-[#1A120E] transition group-hover:text-[#1B4332]">
            {p.title}
          </h3>
          <div className="mt-1 text-[13px] text-neutral-500">
            {p.location} · {p.rooms.length} {p.rooms.length === 1 ? 'room' : 'rooms'}
          </div>
          <p className="mt-2 line-clamp-2 font-serif text-[15px] italic leading-snug text-[#1B4332]/80">{p.line}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function InteriorsIndex() {
  const [type, setType] = useState('all');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(PAGE);
  const types = [...new Set(interiorProjects.map((p) => p.type))];
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return interiorProjects.filter(
      (p) =>
        (type === 'all' || p.type === type) &&
        (!needle || `${p.title} ${p.location}`.toLowerCase().includes(needle))
    );
  }, [type, q]);

  return (
    <main className="relative min-h-screen pb-20" style={{ background: 'linear-gradient(to bottom, #FAF8F3 0%, #F7F3E8 60%, #F8F5EC 100%)' }}>
      <Wash x="85%" y="12%" size={900} a={0.16} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 sm:px-8 md:pt-32">
        <Link
          to="/"
          className={`${MONO} text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]`}
        >
          ← Back
        </Link>
        <div className="mt-6">
          <Eyebrow>Interiors</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-['Space_Grotesk'] text-[34px] font-bold leading-[1.15] tracking-[-0.015em] text-[#1A120E] sm:text-[44px] lg:text-[52px]">
            Rooms finished down to the joinery.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-neutral-600">
            Residential and commercial interiors, designed and built by the same team that builds our buildings.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {types.length > 1 && (
              <>
                <Chip on={type === 'all'} onClick={() => { setType('all'); setShown(PAGE); }}>
                  All
                </Chip>
                {types.map((t) => (
                  <Chip key={t} on={type === t} onClick={() => { setType(t); setShown(PAGE); }}>
                    {TYPE_LABEL[t]}
                  </Chip>
                ))}
              </>
            )}
            <span className={`${MONO} ml-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500`}>
              {list.length} {list.length === 1 ? 'interior' : 'interiors'}
            </span>
          </div>
          {interiorProjects.length > 8 && (
            <label className="block">
              <span className="sr-only">Search interiors</span>
              <input
                type="search"
                value={q}
                onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
                placeholder="Search by name or place"
                className="w-full min-w-[220px] rounded-full border border-[#2A1F1A]/20 bg-transparent px-4 py-2 text-sm text-[#1A120E] outline-none transition placeholder:text-neutral-400 focus:border-[#2A1F1A]"
              />
            </label>
          )}
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, shown).map((p, i) => (
            <Card key={p.id} p={p} i={i} />
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-neutral-600">No interiors match that search.</p>}
        {list.length > shown && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className={`${MONO} rounded-full border border-[#2A1F1A]/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#2A1F1A] transition hover:border-[#2A1F1A]`}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
