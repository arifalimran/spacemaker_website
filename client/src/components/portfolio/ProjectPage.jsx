// client/src/components/portfolio/ProjectPage.jsx
// Route: /projects/:slug  (one full page per project)
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  projects,
  getProject,
  coverOf,
  CHAPTERS,
  CHAPTER_ORDER,
  ARCHITECT,
  CONTACT,
  BRAND,
} from '../../data/portfolio';
import { scrollToEl } from '../../lib/scroll';
import Lightbox from './Lightbox';
import {
  BlendedPhoto,
  Shot,
  Frame,
  HStrip,
  Eyebrow,
  TypeTag,
  Reveal,
  Facts,
  LeadLink,
  ActionRow,
  DarkBand,
  StickyBar,
  linkCls,
  quietCls,
  featherMask,
} from './shared';

/* Each chapter gets its own look, so the page never repeats itself */
const TR = {
  exterior: ['carved', 'duotone', 'blur'],
  interior: ['arch', 'duotone', 'notch', 'blur'],
  balcony: ['notch', 'blur', 'duotone'],
  views: ['blur', 'duotone', 'notch'],
};
const tr = (k, i) => TR[k][i % TR[k].length];

/* ---------------- chapter layouts ---------------- */
function ExteriorChapter({ photos, open }) {
  const [main, ...rest] = photos;
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-4 px-5 sm:px-8 md:grid-cols-12 md:gap-6">
      <div className={rest.length ? 'md:col-span-8' : 'md:col-span-12'}>
        <Frame photo={main} onOpen={open} ratio="aspect-[16/10]" treatment="carved" />
      </div>
      {rest.length > 0 && (
        <div className="grid gap-6 md:col-span-4">
          {rest.slice(0, 2).map((p, i) => (
            <Frame key={p.src + p.caption} photo={p} onOpen={open} ratio="aspect-[4/3]" treatment={tr('exterior', i + 1)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Rooftop: the photo is split and the chapter line sits in the gap */
function RooftopChapter({ photos, open, title }) {
  const p = photos[0];
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <button
        type="button"
        onClick={() => open(p)}
        aria-label="Open rooftop photo"
        className="block aspect-[16/10] w-full cursor-zoom-in text-left md:aspect-[21/9]"
      >
        <Shot treatment="band" src={p.src} alt={p.caption || 'Rooftop'} from={40} to={62}>
          <span className="block w-full px-4 font-serif text-xl italic text-[#1B4332] sm:px-8 sm:text-3xl">
            {p.caption || title}
          </span>
        </Shot>
      </button>
      {photos.slice(1).map((ph) => (
        <div key={ph.src + ph.caption} className="mt-6">
          <Frame photo={ph} onOpen={open} ratio="aspect-[21/9]" treatment="frame" />
        </div>
      ))}
    </div>
  );
}

function StripChapter({ photos, open }) {
  return (
    <HStrip>
      {photos.map((p, i) => (
        <div key={p.src + p.caption} className="w-[72vw] flex-none snap-start sm:w-[380px]">
          <Frame photo={p} onOpen={open} ratio="aspect-[4/5]" treatment={tr('interior', i)} />
        </div>
      ))}
    </HStrip>
  );
}

function PairChapter({ photos, open, k }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
      {photos.map((p, i) => (
        <div key={p.src + p.caption} className={i % 2 ? 'md:mt-14' : ''}>
          <Frame photo={p} onOpen={open} ratio="aspect-[4/3]" treatment={tr(k, i)} />
        </div>
      ))}
    </div>
  );
}

function PlanChapter({ photos, open }) {
  const [i, setI] = useState(0);
  const p = photos[Math.min(i, photos.length - 1)];
  const m = 'radial-gradient(ellipse 96% 94% at 50% 50%, #000 70%, transparent 100%)';
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {photos.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-x-7 gap-y-2">
          {photos.map((ph, idx) => (
            <button
              key={ph.src + ph.caption}
              type="button"
              onClick={() => setI(idx)}
              className={`border-b-2 pb-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] transition ${
                idx === i ? 'border-[#C6F00C] text-[#111827]' : 'border-transparent text-neutral-500 hover:text-[#1B4332]'
              }`}
            >
              {ph.caption || `Plan ${idx + 1}`}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => open(p)}
        className="block aspect-[16/10] w-full cursor-zoom-in bg-[#F6F8F5]"
        style={{ WebkitMaskImage: m, maskImage: m }}
        aria-label="Open floor plan"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={p.src}
            src={p.src}
            alt={p.caption || 'Floor plan'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </AnimatePresence>
      </button>
    </div>
  );
}

function ChapterHead({ n, keyName, note }) {
  const c = CHAPTERS[keyName];
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
      <Eyebrow>
        {String(n).padStart(2, '0')} · {c.label}
      </Eyebrow>
      <h2 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#111827] sm:text-5xl">
        {c.title}
      </h2>
      {note && <p className="mt-4 max-w-xl text-neutral-600">{note}</p>}
    </div>
  );
}

/* floating index of chapters (large screens) */
function ChapterIndex({ chapters, hasUnits }) {
  const ids = [...chapters.map((c) => c.key), ...(hasUnits ? ['units'] : [])];
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('ch-', ''));
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((k) => {
      const el = document.getElementById(`ch-${k}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);

  return (
    <nav aria-label="Project chapters" className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
      {ids.map((k) => (
        <button key={k} type="button" onClick={() => scrollToEl(`#ch-${k}`, -80)} className="group flex items-center gap-3">
          <span
            className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] transition ${
              active === k ? 'text-[#1B4332] opacity-100' : 'text-neutral-500 opacity-0 group-hover:opacity-100'
            }`}
          >
            {k === 'units' ? 'Available' : CHAPTERS[k].label}
          </span>
          <span
            className={`h-2 w-2 rounded-full transition ${
              active === k ? 'bg-[#C6F00C] ring-4 ring-[#C6F00C]/30' : 'bg-[#1B4332]/25 group-hover:bg-[#1B4332]/60'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  const m = featherMask('center');
  return (
    <div className="h-48 w-40 shrink-0" style={{ WebkitMaskImage: m, maskImage: m }}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-[#3A2B23] font-['Space_Grotesk'] text-4xl font-bold text-[#C6F00C]">
          HA
        </div>
      ) : (
        <img src={ARCHITECT.photo} alt={ARCHITECT.name} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      )}
    </div>
  );
}

/* ---------------- the page ---------------- */
function ProjectView({ project }) {
  const [lb, setLb] = useState(-1);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowBar(v > window.innerHeight * 0.7));

  const chapters = CHAPTER_ORDER.map((k) => ({
    key: k,
    photos: project.photos.filter((p) => p.chapter === k),
  })).filter((c) => c.photos.length);
  const all = chapters.flatMap((c) => c.photos);
  const open = (photo) => setLb(Math.max(0, all.indexOf(photo)));

  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];
  const units = project.units || [];
  const hasUnits = units.length > 0;
  const showUnits = hasUnits || project.status === 'active';

  const renderChapter = (c) => {
    switch (c.key) {
      case 'exterior':
        return <ExteriorChapter photos={c.photos} open={open} />;
      case 'rooftop':
        return <RooftopChapter photos={c.photos} open={open} title={CHAPTERS.rooftop.title} />;
      case 'interior':
        return <StripChapter photos={c.photos} open={open} />;
      case 'plan':
        return <PlanChapter photos={c.photos} open={open} />;
      default:
        return <PairChapter photos={c.photos} open={open} k={c.key} />;
    }
  };

  return (
    <main className="relative" style={{ background: 'linear-gradient(to bottom, #FAF8F5 0%, #F3EFE6 22%, #EDF4EC 60%, #F6F8F5 100%)' }}>
      {/* opening frame */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={BRAND.emblem}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-[6%] bottom-[-6%] z-0 w-[460px] select-none opacity-[0.07] md:w-[560px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute right-0 top-[8%] z-[1] h-[82%] w-full opacity-45 md:w-[72%] md:opacity-100">
          <BlendedPhoto src={coverOf(project)} alt={project.title} side="right" drift className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 md:pt-44">
          <Link
            to="/projects"
            className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
          >
            ← All projects
          </Link>
          <div className="mt-8 max-w-2xl">
            <TypeTag type={project.type} status={project.status} />
            <h1 className="mt-5 font-['Space_Grotesk'] text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 font-serif text-2xl italic leading-snug text-[#1B4332]/85 sm:text-3xl">{project.line}</p>
            <Facts
              className="mt-10"
              items={[
                { k: 'Location', v: project.address || project.area },
                { k: 'Floors', v: project.floors },
                { k: 'Construction started', v: project.started },
                { k: 'Architect', v: ARCHITECT.name },
              ]}
            />
            <ActionRow project={project} explore={false} className="mt-10" />
          </div>
        </div>
      </section>

      <ChapterIndex chapters={chapters} hasUnits={showUnits} />

      {/* photo chapters */}
      {chapters.map((c, i) => (
        <section key={c.key} id={`ch-${c.key}`} className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <ChapterHead n={i + 1} keyName={c.key} note={project.notes?.[c.key]} />
          </Reveal>
          {renderChapter(c)}
        </section>
      ))}

      {/* available units */}
      {showUnits && (
        <section id="ch-units" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Eyebrow>Available units</Eyebrow>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
              Find the one that fits you.
            </h2>
            {hasUnits ? (
              <ul className="mt-10 divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
                {units.map((u) => (
                  <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 py-5">
                    <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.16em] text-[#111827] sm:text-sm">
                      {u.id} · {u.label} · {u.size} · {u.floor}
                    </span>
                    <LeadLink project={project} unit={u} className={linkCls}>
                      Ask about this unit →
                    </LeadLink>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mt-8 max-w-xl text-neutral-600">
                  Everything is reserved for now. Tell us what you are looking for and we will keep you first in line.
                </p>
                <div className="mt-6">
                  <LeadLink project={project} className={linkCls}>
                    Join the waiting list →
                  </LeadLink>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* architect, on espresso */}
      <DarkBand className="my-10">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-start gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
          <Portrait />
          <div>
            <Eyebrow dark>{ARCHITECT.role}</Eyebrow>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-[#F3EFE6] sm:text-3xl">
              “{project.architectLine || ARCHITECT.line}”
            </p>
            <div className="mt-4 font-['Space_Grotesk'] text-base font-bold text-[#C6F00C]">{ARCHITECT.name}</div>
          </div>
        </Reveal>
      </DarkBand>

      {/* closing frame */}
      <section className="px-5 pb-28 pt-12 sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-6xl">
            Ask about {project.title}.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-neutral-600">
            Message us on WhatsApp or call. We reply personally, and we will gladly arrange a visit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <LeadLink project={project} className={linkCls}>
              Chat on WhatsApp →
            </LeadLink>
            {CONTACT.hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className={quietCls}>
                {h.display}
              </a>
            ))}
          </div>
          <div className="mt-16 border-t border-[#1B4332]/15 pt-8">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500">Next project</div>
            <Link
              to={`/projects/${next.slug}`}
              className="mt-2 inline-block font-['Space_Grotesk'] text-2xl font-bold text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-8"
            >
              {next.title} →
            </Link>
          </div>
        </Reveal>
      </section>

      <StickyBar project={project} show={showBar} />

      <AnimatePresence>
        {lb >= 0 && <Lightbox photos={all} index={lb} onChange={setLb} onClose={() => setLb(-1)} />}
      </AnimatePresence>
    </main>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-['Space_Grotesk'] text-4xl font-extrabold text-[#111827]">We could not find that project.</h1>
        <Link to="/projects" className={`${linkCls} mt-6`}>
          See all projects →
        </Link>
      </main>
    );
  }
  return <ProjectView key={project.id} project={project} />;
}
