// client/src/components/home/TeamExperts.jsx
// "Team of experts" on the home page, Allbirds style: one leader at a time. A tall pill-shaped photo on one side,
// the name and role (mono capitals) and a short line of text centred on the other. No scroll pinning:
// the visitor changes leader with the dots, the arrows, the arrow keys, or a swipe. Link to the full list at the bottom.
// Data: teamSection + team in data/siteContent.js (sample content for now). Full list lives at /team (TeamCard).
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { team, teamSection as S } from '../../data/siteContent';
import { waLink, trackLead } from '../../lib/leads';
import { Reveal } from '../portfolio/shared';
import { ESPRESSO, SamplePortrait } from './TeamCard';

const LIME = '#C6DB3F';
const CREAM = '#FAF8F5';

/* keep the text short: the first sentence, cut at a word if it is still long */
const shorten = (t = '', max = 150) => {
  const text = String(t).trim();
  if (!text) return '';
  const first = text.match(/^.*?[.!?](\s|$)/)?.[0].trim() || text;
  if (first.length <= max) return first;
  const cut = first.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

function Photo({ m, n }) {
  const [broken, setBroken] = useState(false);
  return m.photo && !broken ? (
    <img
      src={m.photo}
      alt={m.name ? `${m.name}${m.role ? `, ${m.role}` : ''}` : ''}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className="h-full w-full object-cover"
    />
  ) : (
    <SamplePortrait n={n} />
  );
}

export default function TeamExperts() {
  const reduce = useReducedMotion();
  const sorted = [...team].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const row = (sorted.some((m) => m.featured) ? sorted.filter((m) => m.featured) : sorted).slice(0, 4);
  const [i, setI] = useState(0);
  const count = row.length;

  const go = useCallback((n) => setI(((n % count) + count) % count), [count]);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(i + 1);
    if (e.key === 'ArrowLeft') go(i - 1);
  };

  if (!sorted.length) return null;
  const m = row[i];
  const pad = (n) => String(n + 1).padStart(2, '0');
  const fade = reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="team" aria-labelledby="team-heading" className="relative overflow-clip pb-24 pt-24 sm:pb-32 sm:pt-32" style={{ background: CREAM }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#5C6E0A]">{S.label}</span>
          <h2 id="team-heading" className="f-display mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl" style={{ color: ESPRESSO }}>
            {S.heading}
          </h2>
        </Reveal>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Our experts"
          tabIndex={0}
          onKeyDown={onKey}
          className="relative mt-16 outline-none sm:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* text, centred in the free space */}
            <motion.div key={`t${i}`} {...fade} className="order-2 px-2 text-center lg:order-1 lg:px-16" aria-live="polite">
              <div className="mx-auto max-w-md">
                <p className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.2em] sm:text-[13px]" style={{ color: ESPRESSO }}>
                  {m.name}
                  {m.role ? `, ${m.role}` : ''}
                </p>
                {m.expertise && <p className="mt-6 text-base leading-[1.8] text-[#4B3F37] sm:text-[17px]">{shorten(m.expertise)}</p>}
                <a
                  href={waLink(`Hello Space Maker, I would like to talk to ${m.name || 'your team'}${m.role ? ` (${m.role})` : ''}.`)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackLead({ channel: 'whatsapp', kind: 'team-leader' })}
                  className="mt-8 inline-block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] underline decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5C6E0A]"
                  style={{ color: ESPRESSO, textDecorationColor: LIME }}
                >
                  Talk to our team
                </a>
              </div>

              {/* arrows and counter */}
              {count > 1 && (
                <div className="mt-12 flex items-center justify-center gap-6 font-['JetBrains_Mono'] text-[11px] tracking-[0.2em]" style={{ color: ESPRESSO }}>
                  <button type="button" onClick={() => go(i - 1)} aria-label="Previous expert" className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[#2A1F1A] hover:text-[#FAF8F5]" style={{ borderColor: 'rgba(42,31,26,.35)' }}>
                    ←
                  </button>
                  <span aria-hidden>
                    {pad(i)} / {pad(count - 1)}
                  </span>
                  <button type="button" onClick={() => go(i + 1)} aria-label="Next expert" className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[#2A1F1A] hover:text-[#FAF8F5]" style={{ borderColor: 'rgba(42,31,26,.35)' }}>
                    →
                  </button>
                </div>
              )}
            </motion.div>

            {/* tall pill-shaped photo; swipe sideways to change */}
            <motion.div
              key={`p${i}`}
              {...fade}
              drag={reduce || count < 2 ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(i + 1);
                else if (info.offset.x > 60) go(i - 1);
              }}
              className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-2 lg:max-w-[420px]"
            >
              <div className="aspect-[5/7] w-full overflow-hidden rounded-full bg-[#2F231C]">
                <Photo m={m} n={sorted.indexOf(m)} />
              </div>
            </motion.div>
          </div>

          {/* dots: down the right edge on large screens, under the arrows on phones */}
          {count > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col" role="group" aria-label="Choose an expert">
              {row.map((r, k) => (
                <button key={r.id || k} type="button" onClick={() => go(k)} aria-label={`Show expert ${pad(k)}`} aria-current={i === k} className="flex h-6 w-6 items-center justify-center">
                  <span
                    className="block h-2 w-2 rounded-full border transition-colors duration-300"
                    style={{ borderColor: ESPRESSO, background: i === k ? ESPRESSO : 'transparent' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-20 flex justify-center sm:mt-24">
          <Link
            to="/team"
            className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] underline decoration-2 underline-offset-[8px] transition-colors hover:decoration-[#5C6E0A]"
            style={{ color: ESPRESSO, textDecorationColor: LIME }}
          >
            {S.linkLabel || 'Meet all our experts'} ({sorted.length}) →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
