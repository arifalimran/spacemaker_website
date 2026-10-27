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
  BRAND,
} from '../../data/portfolio';
import { scrollToEl } from '../../lib/scroll';
import Lightbox from './Lightbox';
import { Gallery, PlanExplorer, ArchitectBlock, EnquiryBlock, Wash, normalizePlans } from './ProjectSections';
import {
  BlendedPhoto,
  Eyebrow,
  TypeTag,
  Reveal,
  Facts,
  LeadLink,
  ActionRow,
  StickyBar,
  linkCls,
} from './shared';

function ChapterHead({ n, keyName, note, title }) {
  const c = CHAPTERS[keyName];
  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8 sm:pb-10">
      <Eyebrow>
        {String(n).padStart(2, '0')} · {c.label}
      </Eyebrow>
      <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-[36px] font-bold leading-[1.14] tracking-[-0.015em] text-[#1A120E] sm:text-[46px] lg:text-[58px]">
        {title || c.title}
      </h2>
      <span aria-hidden className="mt-6 block h-[4px] w-20 rounded-full" style={{ background: 'linear-gradient(90deg, #5C6E0A, #C6F00C)' }} />
      {note && <p className="mt-5 max-w-xl text-neutral-600">{note}</p>}
    </div>
  );
}

const INDEX_LABEL = { units: 'Homes', plan: 'Floor plans', architect: 'Architect', enquire: 'Enquire' };
function ChapterIndex({ ids }) {
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
            {INDEX_LABEL[k] || CHAPTERS[k].label}
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

/* ---------------- the page ---------------- */
function ProjectView({ project }) {
  const [lb, setLb] = useState(-1);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowBar(v > window.innerHeight * 0.7));

  const plans = normalizePlans(project);
  const chapters = CHAPTER_ORDER.filter((k) => k !== 'plan')
    .map((k) => ({ key: k, photos: project.photos.filter((p) => p.chapter === k) }))
    .filter((c) => c.photos.length);
  const planPhotos = plans.map((p) => ({ src: p.image, caption: p.label }));
  const all = [...chapters.flatMap((c) => c.photos.slice(0, 5)), ...planPhotos];
  const open = (photo) => setLb(Math.max(0, all.findIndex((p) => p.src === photo.src)));
  const [layout, setLayout] = useState('');
  const [inEnq, setInEnq] = useState(false);
  useEffect(() => {
    const el = document.getElementById('ch-enquire');
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInEnq(e.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];
  const units = project.units || [];
  const hasUnits = units.length > 0;
  // Never reveal how many units are available: show each layout type once, never one row per unit.
  const layouts = units.filter(
    (u, i) => units.findIndex((v) => v.label === u.label && v.size === u.size) === i
  );
  const showUnits = hasUnits || project.status === 'active';
  const showArch = project.architect !== false;
  const showEnq = project.enquiry !== false;
  const layoutOptions = plans.length ? plans.map((p) => p.label) : layouts.map((u) => [u.label, u.size].filter(Boolean).join(' · '));
  const askAbout = (l) => {
    setLayout(l);
    scrollToEl('#ch-enquire', -80);
  };
  const indexIds = [
    ...chapters.map((c) => c.key),
    ...(plans.length ? ['plan'] : []),
    ...(showUnits ? ['units'] : []),
    ...(showArch ? ['architect'] : []),
    ...(showEnq ? ['enquire'] : []),
  ];

  return (
    <main className="relative" style={{ background: 'linear-gradient(to bottom, #FAF8F3 0%, #F7F3E8 60%, #F8F5EC 100%)' }}>
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

      <ChapterIndex ids={indexIds} />

      {/* photo chapters */}
      {chapters.map((c, i) => (
        <section key={c.key} id={`ch-${c.key}`} className="relative scroll-mt-32 py-10 sm:py-14">
          <Wash x={i % 2 ? '82%' : '14%'} y="38%" size={950} a={0.17} />
          <div className="relative z-10">
            <Reveal>
              <ChapterHead n={i + 1} keyName={c.key} note={project.notes?.[c.key]} />
            </Reveal>
            <Gallery photos={c.photos} open={open} />
          </div>
        </section>
      ))}

      {/* floor plans, by layout */}
      {plans.length > 0 && (
        <section id="ch-plan" className="relative scroll-mt-32 py-10 sm:py-14">
          <Wash x="88%" y="30%" size={800} a={0.09} />
          <div className="relative z-10">
            <Reveal>
              <ChapterHead n={chapters.length + 1} keyName="plan" note={project.notes?.plan} />
            </Reveal>
            <PlanExplorer plans={plans} open={open} onAsk={showEnq ? askAbout : undefined} />
          </div>
        </section>
      )}

      {/* available units */}
      {showUnits && (
        <section id="ch-units" className="relative scroll-mt-32 py-10 sm:py-14">
          <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
            <Eyebrow>Homes on offer</Eyebrow>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
              Find the one that fits you.
            </h2>
            {hasUnits ? (
              <ul className="mt-10 divide-y divide-[#1B4332]/15 border-y border-[#1B4332]/15">
                {layouts.map((u) => (
                  <li key={`${u.label}|${u.size}`} className="flex flex-wrap items-center justify-between gap-3 py-5">
                    <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.16em] text-[#111827] sm:text-sm">
                      {[u.label, u.size].filter(Boolean).join(' · ')}
                    </span>
                    <LeadLink project={project} unit={u} className={linkCls}>
                      Ask about availability →
                    </LeadLink>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mt-8 max-w-xl text-neutral-600">
                  Tell us what you are looking for and we will share current availability with you personally.
                </p>
                <div className="mt-6">
                  <LeadLink project={project} className={linkCls}>
                    Ask about availability →
                  </LeadLink>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* architect */}
      {showArch && (
        <section id="ch-architect" className="relative scroll-mt-32 py-10 sm:py-14">
          <Wash x="24%" y="52%" size={1150} a={0.34} drift={70} />
          <Wash x="92%" y="12%" size={700} a={0.12} />
          <div className="relative z-10">
            <Reveal>
              <ChapterHead n={indexIds.indexOf('architect') + 1} keyName="architect" />
            </Reveal>
            <ArchitectBlock project={project} />
          </div>
        </section>
      )}

      {/* enquiry */}
      {showEnq && (
        <section id="ch-enquire" className="relative scroll-mt-32 py-10 sm:py-14">
          <Wash x="78%" y="48%" size={900} a={0.24} drift={60} />
          <div className="relative z-10">
            <Reveal>
              <ChapterHead n={indexIds.indexOf('enquire') + 1} keyName="enquire" title={`Ask about ${project.title}.`} />
            </Reveal>
            <EnquiryBlock project={project} options={layoutOptions} layout={layout} setLayout={setLayout} />
          </div>
        </section>
      )}

      {/* next project */}
      <section className="px-5 pb-16 pt-2 sm:px-8">
        <div className="mx-auto max-w-6xl border-t border-[#1B4332]/15 pt-8">
          <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500">Next project</div>
          <Link
            to={`/projects/${next.slug}`}
            className="mt-2 inline-block font-['Space_Grotesk'] text-2xl font-bold text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-8"
          >
            {next.title} →
          </Link>
        </div>
      </section>

      <StickyBar project={project} show={showBar && !inEnq} />

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
