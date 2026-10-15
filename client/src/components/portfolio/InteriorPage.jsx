// client/src/components/portfolio/InteriorPage.jsx
// Route: /interiors/:slug  (prototype of an interior project page)
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { interiorProjects, getInterior, interiorCover, TYPE_LABEL, CONTACT } from '../../data/portfolio';
import Lightbox from './Lightbox';
import {
  Shot,
  Eyebrow,
  Reveal,
  Facts,
  ActionRow,
  DarkBand,
  StickyBar,
  LeadLink,
  linkCls,
  quietCls,
} from './shared';

const ROOM_TREATMENTS = ['notch', 'arch', 'duotone', 'blur'];

function Room({ room, i, onOpen }) {
  const t = ROOM_TREATMENTS[i % ROOM_TREATMENTS.length];
  const flip = i % 2 === 1;
  const ratio = t === 'arch' ? 'aspect-[4/5] max-w-md' : 'aspect-[4/3]';
  const specs = (room.specs || '').split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-14">
      <Reveal className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <button
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`Open photo: ${room.title}`}
          className={`mx-auto block w-full cursor-zoom-in ${ratio}`}
        >
          <Shot treatment={t} src={room.image} alt={room.title} />
        </button>
      </Reveal>
      <Reveal className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-7xl italic leading-none text-[#C6F00C]">0{i + 1}</div>
        <h3 className="mt-3 font-heading text-3xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-4xl">
          {room.title}
        </h3>
        <ul className="mt-5 grid gap-2">
          {specs.map((s) => (
            <li key={s} className="flex items-start gap-3 text-base leading-relaxed text-[#374151]">
              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#C6F00C]" />
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function InteriorView({ p }) {
  const [lb, setLb] = useState(-1);
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowBar(v > window.innerHeight * 0.7));

  const photos = p.rooms.map((r) => ({ src: r.image, caption: r.title, chapter: 'interior' }));
  const idx = interiorProjects.findIndex((x) => x.id === p.id);
  const next = interiorProjects[(idx + 1) % interiorProjects.length];
  const lead = { id: p.id, title: p.title, area: p.location, ref: p.ref };

  return (
    <main style={{ background: '#FAF8F5' }}>
      {/* opening */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-36 sm:px-8 md:grid-cols-12 md:pt-44">
          <div className="md:col-span-6">
            <Link
              to="/interiors"
              className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-[#1B4332]"
            >
              ← All interiors
            </Link>
            <div className="mt-8">
              <Eyebrow>{TYPE_LABEL[p.type]} interior</Eyebrow>
              <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[1.03] tracking-tight text-[#111827] sm:text-7xl">
                {p.title}
              </h1>
              <p className="mt-6 font-serif text-2xl italic leading-snug text-[#1B4332]/85 sm:text-3xl">{p.line}</p>
              <Facts
                className="mt-10"
                items={[
                  { k: 'Client', v: p.client },
                  { k: 'Location', v: p.location },
                  { k: 'Area', v: p.area },
                  { k: 'Rooms', v: String(p.rooms.length) },
                ]}
              />
              <ActionRow project={lead} explore={false} kind="interior" className="mt-10" />
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="mx-auto aspect-[4/5] max-w-md">
              <Shot treatment="arch" src={interiorCover(p)} alt={p.title} drift />
            </div>
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
        {p.rooms.map((room, i) => (
          <Room key={room.title} room={room} i={i} onOpen={setLb} />
        ))}
      </section>

      {/* closing, on espresso */}
      <DarkBand className="mb-16 mt-10 sm:mb-24">
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-[#F3EFE6] sm:text-6xl">
            Planning an interior?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[#F3EFE6]/75">
            Tell us about the space. We reply personally, and we will gladly visit and talk it through.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <LeadLink
              project={lead}
              kind="interior"
              className="text-base font-medium text-[#F3EFE6] underline decoration-[#C6F00C] decoration-2 underline-offset-[7px]"
            >
              Chat on WhatsApp →
            </LeadLink>
            {CONTACT.hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className="text-sm text-[#F3EFE6]/75 hover:text-[#C6F00C]">
                {h.display}
              </a>
            ))}
          </div>
          <div className="mt-14 border-t border-white/15 pt-8">
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-white/50">Next interior</div>
            <Link
              to={`/interiors/${next.slug}`}
              className="mt-2 inline-block font-heading text-2xl font-bold text-[#F3EFE6] underline decoration-[#C6F00C] decoration-2 underline-offset-8"
            >
              {next.title} →
            </Link>
          </div>
        </Reveal>
      </DarkBand>

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
        <h1 className="font-heading text-4xl font-extrabold text-[#111827]">We could not find that interior.</h1>
        <Link to="/interiors" className={`${linkCls} mt-6`}>
          See all interiors →
        </Link>
      </main>
    );
  }
  return <InteriorView key={p.id} p={p} />;
}
