// client/src/components/portfolio/PortfolioSection.jsx
// Home portfolio. Each part has its own look so a long list never feels repetitive:
//   signature flagships (dark, carved photo) -> expanding panels -> interiors strip -> upcoming rows
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  projects,
  interiorProjects,
  interiorCover,
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
  ActionRow,
  DarkBand,
  Flutter,
} from './shared';

/* ---------------- Signature (flagships) ---------------- */
function Signature({ project, index }) {
  const flip = index % 2 === 1;
  const second =
    project.photos.find((p) => p.chapter === 'interior') || project.photos.find((p) => p.chapter !== 'exterior');
  const corner = flip ? 'br' : 'bl';

  return (
    <article className="group relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-8">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className={`relative md:col-span-7 ${flip ? 'md:order-2' : ''}`}
      >
        <div className="relative aspect-[4/3]">
          <Shot treatment="carved" corner={corner} w={46} h={36} src={coverOf(project)} alt={project.title} drift>
            {/* the title sits inside the carved corner, on the dark background */}
            <div className="hidden pr-6 md:block">
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C6F00C]">
                {STATUS_LABEL[project.status]}
              </div>
              <div className="relative mt-2 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.02] tracking-tight text-[#F3EFE6] lg:text-5xl">
                {project.title}
                <Flutter
                  hue="#C6F00C"
                  size={30}
                  className="absolute -top-7 right-0 -translate-y-0 opacity-0 transition duration-500 group-hover:-translate-y-2 group-hover:opacity-100"
                />
              </div>
            </div>
          </Shot>
          {second && (
            <div
              className={`absolute -bottom-6 hidden h-40 w-40 sm:block lg:h-52 lg:w-52 ${
                flip ? '-left-6' : '-right-6'
              } transition duration-700 group-hover:scale-105`}
            >
              <Shot treatment="circle" src={second.src} alt="" />
            </div>
          )}
        </div>
      </Link>

      <Reveal className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-8xl italic leading-none text-[#C6F00C]/25">0{index + 1}</div>
        <div className="md:hidden">
          <TypeTag type={project.type} status={project.status} dark />
          <h3 className="mt-3 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.04] tracking-tight text-[#F3EFE6]">
            {project.title}
          </h3>
        </div>
        <div className="hidden md:block">
          <TypeTag type={project.type} dark />
        </div>
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

/* ---------------- Interiors strip ---------------- */
function Interiors() {
  return (
    <div id="interiors-strip">
      <div className="mx-auto max-w-7xl px-5 pb-2 pt-16 sm:px-8">
        <Eyebrow>Interiors</Eyebrow>
        <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl">
          Rooms finished down to the joinery.
        </h3>
        <p className="mt-4 max-w-xl text-neutral-600">
          Residential and commercial interiors, designed and built by the same team that builds our buildings.
        </p>
      </div>
      <div className="mt-8">
        <HStrip>
          {interiorProjects.map((p) => (
            <Link
              key={p.id}
              to={`/interiors/${p.slug}`}
              className="group block w-[72vw] flex-none snap-start sm:w-[380px]"
            >
              <div className="aspect-[4/5]">
                <Shot treatment="duotone" src={interiorCover(p)} alt={p.title} />
              </div>
              <div className="mt-3">
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#1B4332]">
                  {TYPE_LABEL[p.type]} interior
                </div>
                <div className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#111827]">{p.title}</div>
                <div className="mt-1 text-sm text-neutral-600">{p.location}</div>
              </div>
            </Link>
          ))}
          <Link
            to="/interiors"
            className="group relative flex aspect-[4/5] w-[72vw] flex-none snap-start items-end overflow-hidden bg-[#2A1F1A] p-6 sm:w-[380px]"
            style={{ clipPath: PANEL_CLIP }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '22px 22px' }}
            />
            <div className="relative">
              <div className="font-serif text-4xl italic text-[#F3EFE6]">All interior projects</div>
              <div className="mt-3 text-[#C6F00C] transition duration-300 group-hover:translate-x-2">→</div>
            </div>
          </Link>
        </HStrip>
      </div>
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
      <div className="pb-8" />

    </section>
  );
}
