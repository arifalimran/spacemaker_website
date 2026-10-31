// client/src/components/portfolio/PortfolioSection.jsx
// Home portfolio, kept short: a heading, the signature projects (wide cinematic photos on espresso), one link to all projects, then the interiors strip.
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  Reveal,
  LeadLink,
  CallLink,
} from './shared';

/* ---------------- Signature (flagships): full-screen photo, text on the quiet side ----------------
   Each project fills the screen. The text sits over the calm part of the photo (side = 'left' or 'right'), with a soft
   espresso fade on that side only. PHOTOS: the pictures this needs are wide and sharp (2400px or more, landscape).
   Put the path of each project's wide photo in `wide` below. Until then the page shows the current (small, upright) photo
   on one half of the screen, next to the text on espresso, so nothing looks blurry. */
const SIGNATURE_LOOK = {
  'form-and-space': { wide: null, side: 'right', pos: '50% 55%' }, // e.g. '/assets/03_developments/ongoing/form-and-space/hero/wide.webp'
  'moon-residence': { wide: null, side: 'left', pos: '50% 50%' }, // e.g. '/assets/03_developments/flagships/moon-residence/hero/wide.webp'
};

/* The photo behind "View our other projects". PLACEHOLDER: a free stock photo of a terraced garden house (1600px wide).
   Replace src with your own terrace or rooftop render, 2400px wide or more, landscape. The three lines are sample wording. */
const MORE_PHOTO = {
  src: '/assets/01_hero/hero-1.jpg',
  pos: '50% 60%',
  lines: ['Every home has a place to step outside.', 'Terraces, balconies and gardens, planned from the first sketch.', 'See where else we are building.'],
};

const MONO = "font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]";
const QUIET_LINK = `${MONO} text-[#EFE6D8] underline decoration-[#C6DB3F] decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#EFE6D8]`;

function SignatureText({ project, meta }) {
  return (
    <Reveal>
      {meta && <p className={`${MONO} text-[#C6DB3F]`}>{meta}</p>}
      <h3 className="f-display mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)] font-bold leading-[1.02] text-[#FAF8F5]">{project.title}</h3>
      {project.line && <p className="mt-7 max-w-md text-lg leading-[1.7] text-[#FAF8F5]/90 sm:text-xl">{project.line}</p>}
      <Link
        to={`/projects/${project.slug}`}
        className="mt-10 inline-flex items-center gap-3 border border-[#FAF8F5]/70 px-6 py-3.5 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.16em] text-[#FAF8F5] transition-colors duration-300 hover:bg-[#FAF8F5] hover:text-[#2A1F1A]"
      >
        Explore project
        <span aria-hidden>→</span>
      </Link>
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <LeadLink project={project} kind="project" className={`${QUIET_LINK} inline-flex items-center gap-2`}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C6DB3F]" />
          Ask about this
        </LeadLink>
        <span aria-hidden className="text-[#FAF8F5]/35">·</span>
        <CallLink project={project} className={QUIET_LINK}>
          Call
        </CallLink>
      </div>
    </Reveal>
  );
}

function Signature({ project, index }) {
  const look = { wide: null, side: index % 2 ? 'left' : 'right', pos: '50% 50%', ...(SIGNATURE_LOOK[project.slug] || {}) };
  const meta = [STATUS_LABEL[project.status], project.area].filter(Boolean).join(' · ');
  const textRight = look.side === 'right';

  // full screen, wide photo
  if (look.wide) {
    return (
      <article className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#1A120E]">
        <img
          src={look.wide}
          alt={`${project.title}, ${project.area}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: look.pos }}
        />
        {/* soft fade, only where the words sit */}
        <div aria-hidden className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(26,18,14,.85) 0%, rgba(26,18,14,.55) 40%, rgba(26,18,14,0) 75%)' }} />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{ background: `linear-gradient(to ${textRight ? 'left' : 'right'}, rgba(26,18,14,.78) 0%, rgba(26,18,14,.45) 35%, rgba(26,18,14,0) 70%)` }}
        />
        <Link to={`/projects/${project.slug}`} aria-label={`Open ${project.title}`} className="absolute inset-0" tabIndex={-1} />
        <div className="pointer-events-none absolute inset-0 flex items-end pb-16 lg:items-center lg:pb-0">
          <div className={`pointer-events-none mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 ${textRight ? 'lg:flex lg:justify-end' : ''}`}>
            <div className="pointer-events-auto max-w-xl">
              <SignatureText project={project} meta={meta} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  // until a wide photo is set: the current photo fills one half of the screen, edge to edge, text on espresso beside it
  const cover = coverOf(project);
  return (
    <article className="grid min-h-[100svh] grid-cols-1 bg-[#2A1F1A] lg:grid-cols-2">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className={`relative block h-[70svh] min-h-[420px] overflow-hidden bg-[#3A2D26] lg:h-auto ${textRight ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <img src={cover} alt={`${project.title}, ${project.area}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: look.pos }} />
      </Link>
      <div className={`flex items-center px-6 py-16 sm:px-10 lg:px-16 ${textRight ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="max-w-xl">
          <SignatureText project={project} meta={meta} />
        </div>
      </div>
    </article>
  );
}

const PANEL_CLIP = 'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)';

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
                className="relative isolate flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#BBA992] hover:before:translate-y-0"
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
            <div className="mt-3 font-serif text-5xl italic leading-none text-[#D9CBB4]">All</div>
            <div className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#BBA992]">interiors</div>
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

/* ---------------- the section ---------------- */
export default function PortfolioSection() {
  const flagships = projects.filter((p) => p.flagship);

  return (
    <section id="projects" className="relative" style={{ background: '#F3EFE6' }}>
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-40">
        <Eyebrow>Our projects</Eyebrow>
        <h2 className="f-display mt-6 text-4xl font-bold leading-[1.08] text-[#2A1F1A] sm:text-5xl lg:text-6xl">
          Places we are building, and places already lived in.
        </h2>
      </div>

      {flagships.length > 0 && (
        <div id="signature" style={{ background: '#2A1F1A' }}>
          <p className={`${MONO} py-12 text-center text-[#C6DB3F]`}>Signature projects</p>
          {flagships.map((p, i) => (
            <Signature key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      {/* one full-screen photo with three short lines and a link to every project */}
      <div className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#1A120E]">
        <img
          src={MORE_PHOTO.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: MORE_PHOTO.pos }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,14,.82) 0%, rgba(26,18,14,.5) 38%, rgba(26,18,14,0) 70%)' }} />
        <div className="absolute inset-0 flex items-end pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
            <Reveal>
              <p className="f-display max-w-2xl text-[clamp(1.9rem,3.6vw,3.4rem)] font-bold leading-[1.1] text-[#FAF8F5]">{MORE_PHOTO.lines[0]}</p>
              <p className="mt-5 max-w-md text-base leading-[1.7] text-[#FAF8F5]/90 sm:text-lg">
                {MORE_PHOTO.lines[1]}
                <br />
                {MORE_PHOTO.lines[2]}
              </p>
              <Link
                to="/projects"
                className="mt-9 inline-flex items-center gap-3 border border-[#FAF8F5]/70 px-6 py-3.5 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.16em] text-[#FAF8F5] transition-colors duration-300 hover:bg-[#FAF8F5] hover:text-[#2A1F1A]"
              >
                View our other projects
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>

      <Interiors />

      <div className="pb-10 sm:pb-14" />
    </section>
  );
}
