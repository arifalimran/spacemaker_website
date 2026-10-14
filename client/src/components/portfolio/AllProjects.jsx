// client/src/components/portfolio/AllProjects.jsx
// Route: /projects  (every project, with filters and a photo that follows the cursor)
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects, upcoming, coverOf, STATUS_LABEL, TYPE_LABEL } from '../../data/portfolio';
import { Eyebrow, LeadLink, Pic } from './shared';

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Under construction' },
  { key: 'completed', label: 'Handed over' },
  { key: 'upcoming', label: 'Opening soon' },
];

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

function RowInner({ item, n }) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-3 py-6 sm:py-8">
      <span className="col-span-2 font-['JetBrains_Mono'] text-xs text-neutral-400 sm:col-span-1">
        {String(n).padStart(2, '0')}
      </span>
      <div className="col-span-10 sm:col-span-7">
        <div className="font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#111827] transition duration-300 group-hover:translate-x-2 group-hover:text-[#1B4332] sm:text-5xl">
          {item.title}
          {item.flagship && (
            <span className="ml-3 align-middle font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B4332]">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
              Signature
            </span>
          )}
        </div>
      </div>
      <div className="col-span-10 col-start-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-neutral-500 sm:col-span-4 sm:col-start-auto sm:text-right">
        {item.area}
        <span className="mx-2 text-[#C6F00C]">●</span>
        {TYPE_LABEL[item.type] || 'Project'}
        <div className="mt-1 text-[#1B4332]">{STATUS_LABEL[item.status]}</div>
      </div>
    </div>
  );
}

export default function AllProjects() {
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [hover, setHover] = useState(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 30 });
  const sy = useSpring(my, { stiffness: 260, damping: 30 });

  const items = useMemo(
    () => [
      ...projects.map((p) => ({
        kind: 'project',
        id: p.id,
        title: p.title,
        area: p.area,
        type: p.type,
        status: p.status,
        flagship: p.flagship,
        img: coverOf(p),
        p,
      })),
      ...upcoming.map((u) => ({
        kind: 'upcoming',
        id: u.id,
        title: u.area,
        area: u.area,
        type: u.type || 'residential',
        status: 'upcoming',
        img: u.image,
        u,
      })),
    ],
    []
  );

  const types = [...new Set(items.map((i) => i.type))];
  const list = items.filter((i) => (status === 'all' || i.status === status) && (type === 'all' || i.type === type));

  return (
    <main
      className="relative min-h-screen pb-28"
      style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 30%, #EDF4EC 100%)' }}
      onMouseMove={(e) => {
        mx.set(e.clientX + 200);
        my.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-36 sm:px-8 md:pt-44">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
        >
          ← Back
        </Link>
        <div className="mt-8">
          <Eyebrow>All projects</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
            Everything we are building, and have built.
          </h1>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {STATUS_TABS.map((t) => (
              <Chip key={t.key} on={status === t.key} onClick={() => setStatus(t.key)}>
                {t.label}
              </Chip>
            ))}
          </div>
          {types.length > 1 && (
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              <Chip on={type === 'all'} onClick={() => setType('all')}>
                All types
              </Chip>
              {types.map((t) => (
                <Chip key={t} on={type === t} onClick={() => setType(t)}>
                  {TYPE_LABEL[t] || t}
                </Chip>
              ))}
            </div>
          )}
        </div>

        <ul className="mt-8 divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
          {list.map((item, i) => (
            <li key={item.id} onMouseEnter={() => setHover(item)} onMouseLeave={() => setHover(null)}>
              {item.kind === 'project' ? (
                <Link to={`/projects/${item.p.slug}`} className="group block">
                  <RowInner item={item} n={i + 1} />
                </Link>
              ) : (
                <LeadLink project={item.u} kind="upcoming" className="group block">
                  <RowInner item={item} n={i + 1} />
                </LeadLink>
              )}
            </li>
          ))}
          {list.length === 0 && (
            <li className="py-12 text-neutral-500">Nothing here yet. Try another filter.</li>
          )}
        </ul>
        <p className="mt-4 text-xs text-neutral-500">
          Projects open their own page. Upcoming projects open WhatsApp so you can register your interest.
        </p>
      </div>

      {/* photo that follows the cursor (desktop only) */}
      <AnimatePresence>
        {hover && hover.img && (
          <motion.div
            key={hover.id}
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-56 w-72 md:block"
          >
            <div
              className="h-full w-full overflow-hidden"
              style={{ clipPath: 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))' }}
            >
              <Pic src={hover.img} alt="" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
