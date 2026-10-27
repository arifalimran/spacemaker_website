// client/src/components/portfolio/InteriorPage.jsx
// Route: /interiors/:slug  (one interior project). Compact: short opening, brief + materials, a room grid, light closing band.
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { interiorProjects, getInterior, interiorCover, TYPE_LABEL, CONTACT } from '../../data/portfolio';
import Lightbox from './Lightbox';
import { Shot, Eyebrow, Reveal, Facts, ActionRow, StickyBar, LeadLink, linkCls } from './shared';
import { Wash } from './ProjectSections';

const MONO = "font-['JetBrains_Mono']";

// Back end: a project holds at most MAX_ROOMS rooms (photo + title + specs each); fewer is fine.
const MAX_ROOMS = 6;
const ROOM_TREATMENTS = ['notch', 'arch', 'duotone', 'blur'];

function Room({ room, i, onOpen }) {
  const t = ROOM_TREATMENTS[i % ROOM_TREATMENTS.length];
  const flip = i % 2 === 1;
  const ratio = t === 'arch' ? 'aspect-[4/5] max-w-md' : 'aspect-[4/3]';
  const specs = (room.specs || '').split(',').map((x) => x.trim()).filter(Boolean);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 sm:px-8 md:grid-cols-12 md:gap-0">
      <Reveal className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <button
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`Open photo: ${room.title}`}
          className={`block w-full cursor-zoom-in ${flip ? 'md:mr-auto' : 'md:ml-auto'} ${ratio}`}
        >
          <Shot treatment={t} src={room.image} alt={room.title} />
        </button>
      </Reveal>
      <Reveal className={`md:col-span-5 ${flip ? 'md:order-1 md:pr-10' : 'md:pl-10'}`}>
       <div>
        <div className="font-serif text-7xl italic leading-none text-[#C6F00C]">0{i + 1}</div>
        <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-4xl">
          {room.title}
        </h3>
        <ul className="mt-5 grid gap-2">
          {specs.map((x) => (
            <li key={x} className="flex items-start gap-3 text-base leading-relaxed text-[#374151]">
              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#C6F00C]" />
              {x}
            </li>
          ))}
        </ul>
       </div>
      </Reveal>
    </div>
  );
}

function InteriorView({ p }) {
  const [lb, setLb] = useState(-1);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowBar(v > window.innerHeight * 0.7));

  const rooms = (p.rooms || []).slice(0, MAX_ROOMS);
  const photos = rooms.map((r) => ({ src: r.image, caption: r.title, chapter: 'interior' }));
  const idx = interiorProjects.findIndex((x) => x.id === p.id);
  const next = interiorProjects[(idx + 1) % interiorProjects.length];
  const lead = { id: p.id, title: p.title, area: p.location, ref: p.ref };
  return (
    <main className="relative" style={{ background: 'linear-gradient(to bottom, #FAF8F3 0%, #F7F3E8 60%, #F8F5EC 100%)' }}>
      {/* opening */}
      <section className="relative">
        <Wash x="80%" y="40%" size={950} a={0.2} />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-28 sm:px-8 md:grid-cols-12 md:gap-8 md:pt-32">
          <div className="md:col-span-5">
            <Link to="/interiors" className={`${MONO} text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]`}>
              ← All interiors
            </Link>
            <div className="mt-6">
              <Eyebrow>{TYPE_LABEL[p.type]} interior</Eyebrow>
              <h1 className="mt-4 font-['Space_Grotesk'] text-[34px] font-bold leading-[1.15] tracking-[-0.015em] text-[#1A120E] sm:text-[44px] lg:text-[52px]">
                {p.title}
              </h1>
              <p className="mt-4 font-serif text-xl italic leading-snug text-[#1B4332]/85 sm:text-2xl">{p.line}</p>
              <Facts
                className="mt-7"
                items={[
                  { k: 'Client', v: p.client },
                  { k: 'Location', v: p.location },
                  { k: 'Area', v: p.area },
                  { k: 'Rooms', v: String(rooms.length) },
                ]}
              />
              <ActionRow project={lead} explore={false} kind="interior" className="mt-7" />
            </div>
          </div>
          <div className="md:col-span-7">
            <button
              type="button"
              onClick={() => setLb(0)}
              aria-label={`Open photo: ${p.title}`}
              className="block aspect-[4/3] w-full cursor-zoom-in"
            >
              <Shot treatment="clean" src={interiorCover(p)} alt={p.title} />
            </button>
          </div>
        </div>
      </section>

      {/* brief + materials */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Eyebrow>The brief</Eyebrow>
            <p className="mt-5 max-w-xl text-lg leading-[1.8] text-[#374151] sm:text-xl">{p.brief}</p>
          </Reveal>
          <Reveal className="md:col-span-6">
            <Eyebrow>Materials</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-6">
              {p.materials.map((m) => (
                <li key={m.name} className="group flex flex-col items-start gap-3">
                  <span
                    className="h-16 w-16 rounded-full ring-2 ring-white shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:ring-[#C6F00C]"
                    style={{ background: m.hex }}
                  />
                  <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#111827]">
                    {m.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* rooms */}
      <section className="py-6">
        {rooms.map((room, i) => (
          <Room key={room.title} room={room} i={i} onOpen={setLb} />
        ))}
      </section>

      {/* closing: same layout as before, now on a light cream-and-lime ground so it does not clash with the footer */}
      <section className="relative mt-10 overflow-hidden py-16 sm:py-24">
        <Wash x="50%" y="50%" size={1200} a={0.28} />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#1A120E] sm:text-6xl">
            Planning an interior?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-neutral-600">
            Tell us about the space. We reply personally, and we will gladly visit and talk it through.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <LeadLink
              project={lead}
              kind="interior"
              className="text-base font-medium text-[#1A120E] underline decoration-[#9BBF00] decoration-2 underline-offset-[7px]"
            >
              Chat on WhatsApp →
            </LeadLink>
            {CONTACT.hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className="text-sm text-neutral-600 hover:text-[#1B4332]">
                {h.display}
              </a>
            ))}
          </div>
          <div className="mt-14 border-t border-[#2A1F1A]/15 pt-8">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-neutral-500">Next interior</div>
            <Link
              to={`/interiors/${next.slug}`}
              className="mt-2 inline-block font-['Space_Grotesk'] text-2xl font-bold text-[#1B4332] underline decoration-[#9BBF00] decoration-2 underline-offset-8"
            >
              {next.title} →
            </Link>
          </div>
        </Reveal>
      </section>

      <StickyBar project={lead} kind="interior" show={showBar} />

      <AnimatePresence>
        {lb >= 0 && <Lightbox photos={photos} index={lb} onChange={setLb} onClose={() => setLb(-1)} />}
      </AnimatePresence>
    </main>
  );
}

export default function InteriorPage() {
  const { slug } = useParams();
  const p = getInterior(slug);
  if (!p) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-['Space_Grotesk'] text-4xl font-extrabold text-[#111827]">We could not find that interior.</h1>
        <Link to="/interiors" className={`${linkCls} mt-6`}>
          See all interiors →
        </Link>
      </main>
    );
  }
  return <InteriorView key={p.id} p={p} />;
}
