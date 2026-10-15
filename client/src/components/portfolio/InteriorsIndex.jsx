// client/src/components/portfolio/InteriorsIndex.jsx
// Route: /interiors  (all interior projects)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { interiorProjects, interiorCover, TYPE_LABEL } from '../../data/portfolio';
import { Shot, Eyebrow, Reveal, linkCls } from './shared';

function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 pb-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] transition ${
        on ? 'border-[#C6F00C] text-[#111827]' : 'border-transparent text-neutral-500 hover:text-[#1B4332]'
      }`}
    >
      {children}
    </button>
  );
}

export default function InteriorsIndex() {
  const [type, setType] = useState('all');
  const types = [...new Set(interiorProjects.map((p) => p.type))];
  const list = interiorProjects.filter((p) => type === 'all' || p.type === type);

  return (
    <main
      className="min-h-screen pb-28"
      style={{ background: '#FAF8F5' }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-36 sm:px-8 md:pt-44">
        <Link
          to="/"
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
        >
          ← Back
        </Link>
        <div className="mt-8">
          <Eyebrow>Interiors</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
            Rooms finished down to the joinery.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.8] text-neutral-600 sm:text-lg">
            Residential and commercial interiors, designed and built by the same team that builds our buildings.
          </p>
        </div>

        {types.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
            <Chip on={type === 'all'} onClick={() => setType('all')}>
              All
            </Chip>
            {types.map((t) => (
              <Chip key={t} on={type === t} onClick={() => setType(t)}>
                {TYPE_LABEL[t]}
              </Chip>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-16">
          {list.map((p, i) => (
            <Reveal key={p.id}>
              <Link to={`/interiors/${p.slug}`} className="group block">
                <div className="aspect-[4/3] md:aspect-[16/8]">
                  <Shot
                    treatment="carved"
                    corner={i % 2 ? 'br' : 'bl'}
                    w={42}
                    h={38}
                    src={interiorCover(p)}
                    alt={p.title}
                  >
                    <div className="hidden pr-6 md:block">
                      <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#1B4332]">
                        {TYPE_LABEL[p.type]} interior
                      </div>
                      <div className="mt-1 font-heading text-3xl font-extrabold leading-[1.05] tracking-tight text-[#111827] lg:text-4xl">
                        {p.title}
                      </div>
                    </div>
                  </Shot>
                </div>
                <div className="mt-5 max-w-2xl">
                  <div className="md:hidden">
                    <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#1B4332]">
                      {TYPE_LABEL[p.type]} interior
                    </div>
                    <div className="mt-1 font-heading text-3xl font-extrabold tracking-tight text-[#111827]">
                      {p.title}
                    </div>
                  </div>
                  <p className="mt-2 font-serif text-xl italic text-[#1B4332]/85">{p.line}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600">
                    <span>{p.location}</span>
                    <span className={linkCls}>View this interior →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
