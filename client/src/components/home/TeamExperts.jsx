// client/src/components/home/TeamExperts.jsx
// "Team of experts" on the home page. Desktop: one large portrait stays pinned on the left while the four leaders'
// text blocks scroll past on the right, one after another; the portrait cross-fades to whoever is in the middle of the
// screen and a thin lime line draws under their name. Phones: each leader is photo on top, text below, stacked.
// No scroll hijacking: plain sticky + one IntersectionObserver. Opacity/transform only; static under reduced motion.
// Data: teamSection + team in data/siteContent.js (sample content for now). Full list lives at /team (TeamCard).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { team, teamSection as S } from '../../data/siteContent';
import { Eyebrow, Reveal } from '../portfolio/shared';
import { TEAM_CSS, ESPRESSO, SamplePortrait } from './TeamCard';
import TeamBuildingMark from './TeamBuildingMark';
import TeamBackdrop from './TeamBackdrop';

const CSS = `
.sm-tx-blk{transition:opacity .5s ease}
.sm-tx-line{transform:scaleX(0);transform-origin:left;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.sm-tx-on .sm-tx-line{transform:scaleX(1)}
.sm-tx-layer{transition:opacity .7s ease}
@media (prefers-reduced-motion:reduce){.sm-tx-blk,.sm-tx-line,.sm-tx-layer{transition:none !important}}
`;

function Photo({ m, n, grey }) {
  const [broken, setBroken] = useState(false);
  return m.photo && !broken ? (
    <img
      src={m.photo}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className="h-full w-full object-cover transition-[filter] duration-700"
      style={{ filter: grey ? 'grayscale(1)' : 'grayscale(0)' }}
    />
  ) : (
    <SamplePortrait n={n} />
  );
}

/* the framed portrait: espresso border, offset outline, drawing-sheet corner marks */
function Frame({ children, label }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute inset-0 rounded-[8px] border" style={{ borderColor: 'rgba(42,31,26,.32)', transform: 'translate(9px, 9px)' }} />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border-[1.5px]" style={{ borderColor: ESPRESSO, background: '#2F231C' }}>
        {children}
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t" style={{ borderColor: 'rgba(245,240,230,.55)' }} />
        <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r" style={{ borderColor: 'rgba(245,240,230,.55)' }} />
        {label && (
          <span aria-hidden className="pointer-events-none absolute right-4 top-3 flex items-center gap-1.5 font-['JetBrains_Mono'] text-[11px] tracking-[0.2em] text-[#BBA992]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C]" />
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TeamExperts() {
  const sorted = [...team].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const row = (sorted.some((m) => m.featured) ? sorted.filter((m) => m.featured) : sorted).slice(0, 4);
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  // whoever's block crosses the middle of the screen becomes the active leader
  useEffect(() => {
    if (!row.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [row.length]);

  if (!sorted.length) return null;
  const pad = (n) => String(n + 1).padStart(2, '0');
  const heading = S.heading || '';
  const cut = heading.lastIndexOf(' ') + 1;

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative overflow-clip border-t border-[#2A1F1A]/15 py-20 sm:py-28"
      style={{ background: 'linear-gradient(180deg, #F5F9EE 0%, #EEF4E3 100%)' }}
    >
      <style>{TEAM_CSS + CSS}</style>
      <TeamBackdrop />
      <div
        aria-hidden
        className="sm-team-grid pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 25%, #000 75%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, #000 25%, #000 75%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{ background: 'linear-gradient(to bottom, #FAF8F5, rgba(245,249,238,0))' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* heading */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-14">
          <Reveal className="max-w-4xl">
            <Eyebrow>{S.label}</Eyebrow>
            <h2
              id="team-heading"
              className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: ESPRESSO }}
            >
              {heading.slice(0, cut)}
              <span className="lime-mark">{heading.slice(cut)}</span>
            </h2>
            {S.intro && <p className="mt-4 font-serif text-lg italic text-[#6B5446]">{S.intro}</p>}
          </Reveal>
          <div className="w-[170px] flex-none md:w-[230px]">
            <TeamBuildingMark />
          </div>
        </div>

        {/* pinned portrait (desktop) + scrolling leaders */}
        <div className="mt-12 grid items-start gap-y-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-14">
          <div className="hidden lg:col-span-5 lg:block lg:sticky lg:top-28">
            <div className="max-w-[340px]">
              <Frame label={`${pad(active)} / ${pad(row.length - 1)}`}>
                {row.map((m, i) => (
                  <div key={m.id || i} className="sm-tx-layer absolute inset-0" style={{ opacity: active === i ? 1 : 0 }} aria-hidden>
                    <Photo m={m} n={sorted.indexOf(m)} grey={active !== i} />
                  </div>
                ))}
              </Frame>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {row.map((m, i) => {
              const on = active === i;
              return (
                <li
                  key={m.id || i}
                  ref={(el) => (refs.current[i] = el)}
                  data-i={i}
                  className={`sm-tx-blk flex flex-col justify-center lg:min-h-[52vh] ${on ? 'sm-tx-on' : 'lg:opacity-[0.38]'} ${i ? 'mt-12 lg:mt-0' : ''}`}
                >
                  {/* phones: this leader's own photo */}
                  <div className="mb-6 max-w-[300px] lg:hidden">
                    <Frame label={pad(i)}>
                      <Photo m={m} n={sorted.indexOf(m)} grey={false} />
                    </Frame>
                  </div>

                  <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#5C6E0A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C]" />
                    {pad(i)}
                    {m.role && <span className="text-[#6B5446]">· {m.role}</span>}
                  </div>
                  <h3 className="relative mt-4 inline-block self-start font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-tight sm:text-3xl lg:text-4xl" style={{ color: ESPRESSO }}>
                    {m.name}
                    <span aria-hidden className="sm-tx-line absolute -bottom-2 left-0 block h-[2px] w-full" style={{ background: '#C6F00C' }} />
                  </h3>
                  {m.expertise && <p className="mt-6 max-w-lg font-serif text-base italic leading-[1.75] text-[#4B3F37] sm:text-lg">{m.expertise}</p>}
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-12 flex justify-start lg:mt-14">
          <Link
            to="/team"
            className="group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] bg-transparent px-6 py-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#2A1F1A] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#2A1F1A] before:transition-transform before:duration-300 hover:text-[#F5F0E6] hover:before:translate-y-0"
          >
            {S.linkLabel || 'Meet all our experts'}
            <span className="rounded-full border border-current px-2 py-0.5 text-[10px]">{sorted.length}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
