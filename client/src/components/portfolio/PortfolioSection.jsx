// client/src/components/portfolio/PortfolioSection.jsx
// Home portfolio. Each part has its own look so a long list never feels repetitive:
//   signature flagships (dark, carved photo) -> expanding panels -> interiors strip -> upcoming rows
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  projects,
  interiorProjects,
  interiorCover,
  upcoming,
  STATUS_LABEL,
  TYPE_LABEL,
  coverOf,
} from '../../data/portfolio';
import {
  Shot,
  Eyebrow,
  TypeTag,
  Reveal,
  Facts,
  HStrip,
  LeadLink,
  ActionRow,
  DarkBand,
  Flutter,
  linkCls,
} from './shared';

/* ---------------- Signature (flagships) ---------------- */
function Signature({ project, index }) {
  const flip = index % 2 === 1;
  const cover = coverOf(project);
  // a second, different exterior view (never a floor plan) for the small inset
  const second = project.photos.find((p) => p.chapter === 'exterior' && p.src !== cover);

  return (
    <article className="group relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-8">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className={`relative md:col-span-7 ${flip ? 'md:order-2' : ''}`}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/11]">
          <Shot treatment="clean" src={cover} alt={`${project.title}, ${project.area}`} />
          <span className="absolute left-4 top-4 rounded-full bg-[#1A120E]/70 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]">
            {STATUS_LABEL[project.status]}
          </span>
          {second && (
            <div
              className={`absolute -bottom-6 hidden w-[38%] aspect-[4/3] lg:block ${
                flip ? '-left-6' : '-right-6'
              } rounded-[18px] border-[5px] border-[#1A120E] transition duration-500 group-hover:-translate-y-1`}
            >
              <Shot treatment="clean" src={second.src} alt="" rounded="rounded-[13px]" />
            </div>
          )}
        </div>
      </Link>

      <Reveal className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-8xl italic leading-none text-[#C6F00C]/25">0{index + 1}</div>
        <TypeTag type={project.type} dark />
        <h3 className="relative mt-3 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.04] tracking-tight text-[#F3EFE6] lg:text-5xl">
          {project.title}
          <Flutter
            hue="#C6F00C"
            size={26}
            className="absolute -top-6 right-0 opacity-0 transition duration-500 group-hover:-translate-y-1 group-hover:opacity-100"
          />
        </h3>
        <p className="mt-5 font-serif text-xl italic leading-snug text-[#F3EFE6]/85 sm:text-2xl">{project.line}</p>
        <Facts
          dark
          className="mt-7"
          items={[
            { k: 'Location', v: project.area },
            { k: 'Floors', v: project.floors },
            { k: 'Started', v: project.started },
          ]}
        />
        <ActionRow project={project} dark className="mt-8" />
      </Reveal>
    </article>
  );
}

/* ---------------- Expanding panels (other projects) ---------------- */
const PANEL_CLIP = 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)';

function Panels({ items, extra }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col gap-4 md:h-[68vh] md:min-h-[480px] md:flex-row md:gap-3">
        {items.map((p, i) => {
          const open = i === active;
          return (
            <div
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="sm-acc group relative h-80 overflow-hidden md:h-auto"
              style={{ '--f': open ? '3.4 1 0%' : '1 1 0%', clipPath: PANEL_CLIP }}
            >
              <div className="absolute inset-0">
                <Shot treatment="duotone" src={coverOf(p)} alt={p.title} className={open ? 'is-on' : ''} />
              </div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,18,14,0.9), rgba(26,18,14,0.2) 55%, rgba(26,18,14,0.05))' }}
              />
              <Link
                to={`/projects/${p.slug}`}
                aria-label={`Open ${p.title}`}
                onClick={(e) => {
                  if (!open) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className="absolute inset-0 z-[1]"
              />

              {/* collapsed: vertical title */}
              <div
                className={`pointer-events-none absolute bottom-6 left-5 z-10 hidden transition duration-500 md:block ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div
                  className="font-['Space_Grotesk'] text-xl font-bold text-[#F3EFE6]"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {p.title}
                </div>
              </div>

              {/* expanded: details */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 transition duration-500 md:p-8 ${
                  open ? 'md:translate-y-0 md:opacity-100' : 'md:translate-y-3 md:opacity-0'
                }`}
              >
                <TypeTag type={p.type} status={p.status} dark />
                <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.05] tracking-tight text-[#F3EFE6] sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md font-serif text-lg italic text-[#F3EFE6]/85">{p.line}</p>
                <div className="mt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-white/60">
                  {p.area} · {p.floors}
                </div>
                <div className="pointer-events-auto mt-5">
                  <ActionRow project={p} dark />
                </div>
              </div>
            </div>
          );
        })}

        {/* the last panel opens the full list */}
        <Link
          to="/projects"
          className="sm-acc group relative flex h-48 items-end overflow-hidden bg-[#2A1F1A] p-6 md:h-auto"
          style={{ '--f': '1.1 1 0%', clipPath: PANEL_CLIP }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          />
          <div className="relative">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]">
              Visit our other projects
            </div>
            <div className="mt-3 font-serif text-5xl italic leading-none text-[#F3EFE6]">
              {extra > 0 ? `+${extra}` : 'All'}
            </div>
            <div className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#F3EFE6]">
              {extra > 0 ? 'more projects' : 'projects'}
            </div>
            <div className="mt-4 text-[#C6F00C] transition duration-300 group-hover:translate-x-2">→</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ---------------- Interiors slider ---------------- */
// The strip starts exactly on the page's left edge (same as the heading), bleeds off to the right,
// cards slide in one after another, and a lime progress line + arrows follow the scroll.
function Interiors() {
  const reduce = useReducedMotion();
  const wrap = useRef(null); // the max-w-7xl heading container (measures the left edge)
  const strip = useRef(null);
  const [pad, setPad] = useState(20);
  const [prog, setProg] = useState(0);
  const total = interiorProjects.length;

  const measure = useCallback(() => {
    if (wrap.current) {
      const cs = getComputedStyle(wrap.current);
      setPad(wrap.current.getBoundingClientRect().left + parseFloat(cs.paddingLeft));
    }
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
  };
  const by = (dir) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.8), behavior: 'smooth' });
  };
  const card = 'group block w-[72vw] flex-none snap-start sm:w-[340px]';

  return (
    <div>
      <div ref={wrap} className="mx-auto max-w-7xl px-5 pb-2 pt-14 sm:px-8 sm:pt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Interiors</Eyebrow>
            <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-4xl">
              Rooms finished down to the joinery.
            </h3>
            <p className="mt-3 max-w-xl font-serif text-lg italic text-[#6B5446]">
              Residential and commercial interiors, built by the team that builds our buildings.
            </p>
          </div>
          <div className="hidden flex-none gap-3 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => by(d)}
                aria-label={d < 0 ? 'Previous' : 'Next'}
                className="relative isolate flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#F5F0E6] hover:before:translate-y-0"
              >
                {d < 0 ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={strip}
        onScroll={onScroll}
        className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: pad, paddingRight: pad, scrollPaddingLeft: pad, scrollPaddingRight: pad }}
      >
        {interiorProjects.map((p, i) => (
          <motion.div
            key={p.id}
            className="flex-none"
            initial={reduce ? false : { opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/interiors/${p.slug}`} className={card}>
              <div className="aspect-[4/5] overflow-hidden rounded-[10px] border-[1.5px] border-[#2A1F1A]">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <Shot treatment="duotone" src={interiorCover(p)} alt={p.title} />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#6B5446]">
                  {TYPE_LABEL[p.type]} interior
                </div>
                <div className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#2A1F1A]">{p.title}</div>
                <div className="mt-1 text-sm text-[#2A1F1A]/65">{p.location}</div>
              </div>
            </Link>
          </motion.div>
        ))}
        <Link
          to="/interiors"
          className="group relative flex aspect-[4/5] w-[72vw] flex-none snap-start items-end overflow-hidden bg-[#2A1F1A] p-6 sm:w-[340px]"
          style={{ clipPath: PANEL_CLIP }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          />
          <div className="relative">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]">
              Visit our other interiors
            </div>
            <div className="mt-3 font-serif text-5xl italic leading-none text-[#F3EFE6]">All</div>
            <div className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#F3EFE6]">interiors</div>
            <div className="mt-4 text-[#C6F00C] transition duration-300 group-hover:translate-x-2">→</div>
          </div>
        </Link>
      </div>

      {/* progress */}
      <div className="mx-auto mt-2 max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="relative h-[2px] flex-1 bg-[#2A1F1A]/15">
            <div className="absolute inset-y-0 left-0 bg-[#2A1F1A]" style={{ width: `${Math.max(12, prog * 100)}%`, transition: 'width .15s linear' }} />
            <div className="absolute -top-[2px] h-[6px] w-[6px] rounded-full bg-[#C6F00C] ring-1 ring-[#2A1F1A]" style={{ left: `calc(${Math.max(12, prog * 100)}% - 3px)`, transition: 'left .15s linear' }} />
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.16em] text-[#6B5446]">
            {String(Math.min(total, Math.round(prog * (total - 1)) + 1)).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Upcoming: compact cards ---------------- */
const pill =
  "relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] px-4 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#F5F0E6] hover:before:translate-y-0";

function UpcomingCard({ u }) {
  const facts = [u.land, u.facing, u.floors && `${u.floors} floors`].filter(Boolean).join(' · ');
  return (
    <article className="flex h-full flex-col rounded-[14px] border-[1.5px] border-[#2A1F1A] bg-white/55 p-5">
      <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#6B5446]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C] ring-1 ring-[#2A1F1A]/40" />
        {TYPE_LABEL[u.type] || 'Project'} · {u.opening}
      </div>
      <div className="mt-2 font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#2A1F1A]">{u.area}</div>
      {u.line && <div className="mt-1 font-serif text-base italic text-[#6B5446]">{u.line}</div>}
      {u.status && <div className="mt-3 text-xs uppercase tracking-[0.14em] text-[#2A1F1A]/70">{u.status}</div>}
      {facts && <div className="mt-2 text-sm text-[#2A1F1A]/70">{facts}</div>}
      {u.units && u.units.length > 0 && (
        <div className="mt-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#2A1F1A]">{u.units.join(' · ')}</div>
      )}
      <div className="mt-auto pt-5">
        <LeadLink project={u} kind="upcoming" className={pill}>
          Register interest →
        </LeadLink>
      </div>
    </article>
  );
}

function Upcoming() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {upcoming.map((u, i) => (
          <li key={u.id}>
            <Reveal delay={i * 0.08} className="h-full">
              <UpcomingCard u={u} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- the section ---------------- */
export default function PortfolioSection() {
  const flagships = projects.filter((p) => p.flagship);
  const others = projects.filter((p) => !p.flagship);
  const shown = others.slice(0, 4);
  const extra = projects.length - flagships.length - shown.length;

  return (
    <section
      id="projects"
      className="relative"
      style={{ background: 'linear-gradient(to bottom, #F6F8F5 0%, #EDF4EC 40%, #F3EFE6 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
        <Eyebrow>Our projects</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-6xl">
          Places we are building, and places already lived in.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-[1.8] text-neutral-600 sm:text-lg">
          Each one drawn, engineered and built by our own team. Walk through them, then ask us about the one that feels
          like yours.
        </p>
      </div>

      {flagships.length > 0 && (
        <DarkBand id="signature" className="mt-6">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Eyebrow dark>Signature projects</Eyebrow>
            <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#F3EFE6] sm:text-5xl">
              The work we are proudest of.
            </h3>
          </div>
          <div className="mt-8 grid gap-10">
            {flagships.map((p, i) => (
              <Signature key={p.id} project={p} index={i} />
            ))}
          </div>
        </DarkBand>
      )}

      {shown.length > 0 && (
        <div className="pb-6 pt-16">
          <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
            <Eyebrow>More of our work</Eyebrow>
            <p className="mt-3 max-w-xl text-neutral-600">Move over a project to open it.</p>
          </div>
          <Panels items={shown} extra={extra} />
        </div>
      )}

      <Interiors />

      <div className="pb-14 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16">
          <Eyebrow>Opening soon</Eyebrow>
          <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-4xl">
            New addresses are close.
          </h3>
          <p className="mt-3 font-serif text-lg italic text-[#6B5446]">Tell us you are interested and we will reach you first.</p>
        </div>
        <div className="mt-7">
          <Upcoming />
        </div>
      </div>
    </section>
  );
}
