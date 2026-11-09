// client/src/components/home/Testimonials.jsx
// "In their words": a calm solid espresso band between the cream Why choose us and the cream Team sections.
// Layout: heading on top, then each testimonial as one wide row: small round photo, name and project on the left,
// the quote in large italic on the right. Rows are divided by thin lines. Nothing to click, no decor, no looping animation
// (light on old laptops). Reduced motion: no fade-in.
// Data: testimonialsSection + testimonials in data/siteContent.js (every field optional-safe). Quotes are the client's own words.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials, testimonialsSection as S } from '../../data/siteContent';

const ESP = '#2A1F1A';
const CREAM = '#F3EFE6';
const SAND = '#BBA992';
const LIME = '#C6F00C'; // small marks only (label, photo ring, tag dot): never on text you have to read
const SOFT = '#D9CBB4'; // sand: project names and tags
// which promise each client's words prove, and the key phrase to emphasise. Optional fields t.promise / t.highlight win over these.
const PROMISE = { 'Kamrul Hasan': 'On-time delivery', 'Moumita Saha': 'Aesthetic design', 'Tanvir Ahmed': 'Quality materials' };
const KEY = { 'Kamrul Hasan': 'keys on the date written in our agreement', 'Moumita Saha': 'full of morning sun', 'Tanvir Ahmed': 'shared every one without hesitation' };

// the quote with its key phrase at full cream and the rest slightly softer (no extra colour)
function Quote({ t }) {
  const q = String(t.quote || '');
  const key = t.highlight || KEY[t.name] || '';
  const at = key ? q.toLowerCase().indexOf(key.toLowerCase()) : -1;
  if (at < 0) return <>“{q}”</>;
  return (
    <>
      <span style={{ opacity: 0.72 }}>“{q.slice(0, at)}</span>
      <span>{q.slice(at, at + key.length)}</span>
      <span style={{ opacity: 0.72 }}>{q.slice(at + key.length)}”</span>
    </>
  );
}

const initials = (name = '') =>
  name
    .replace(/[^\p{L}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '·';

function FadeUp({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

function Avatar({ t }) {
  const [bad, setBad] = useState(false);
  return (
    <div className="aspect-[5/7] w-[110px] flex-none overflow-hidden rounded-full bg-[#3A2C24] lg:w-[170px]">
      {t.photo && !bad ? (
        <img
          src={t.photo}
          alt={t.name ? `Photo of ${t.name}` : 'Client photo'}
          loading="lazy"
          decoding="async"
          onError={() => setBad(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          role="img"
          aria-label={t.name ? `${t.name} (initials)` : 'Client'}
          className="flex h-full w-full items-center justify-center font-['Space_Grotesk'] text-xl font-bold lg:text-2xl"
          style={{ color: CREAM }}
        >
          {initials(t.name)}
        </span>
      )}
    </div>
  );
}

export default function Testimonials({ items = testimonials }) {
  const list = [...(items || [])].filter((t) => t && t.quote).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (!list.length) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative py-20 sm:py-24 lg:py-28" style={{ background: ESP }}>
      <div className="mx-auto max-w-[1320px] px-6 sm:px-14 lg:px-24">
        <FadeUp className="max-w-3xl">
          {S.label && (
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em]" style={{ color: LIME }}>
              {S.label}
            </span>
          )}
          <h2 id="testimonials-heading" className="f-display mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl" style={{ color: CREAM }}>
            {S.heading}
          </h2>
          {S.intro && <p className="mt-5 text-base leading-[1.8] sm:text-lg" style={{ color: SAND }}>{S.intro}</p>}
        </FadeUp>

        <ul className="mt-12 sm:mt-16">
          {list.map((t, i) => (
            <li key={t.id || i} className="border-t border-[#F3EFE6]/15 last:border-b">
              <FadeUp className="grid items-center gap-10 py-6 sm:py-8 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-14 lg:py-10">
                <figure className="contents">
                  <figcaption className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
                    <Avatar t={t} />
                    <div>
                      {t.name && <div className="font-['JetBrains_Mono'] text-[12px] uppercase leading-[1.6] tracking-[0.2em]" style={{ color: CREAM }}>{t.name}</div>}
                      {t.project &&
                        (t.projectSlug ? (
                          <Link
                            to={`/projects/${t.projectSlug}`}
                            className="mt-1.5 inline-block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] underline decoration-[#D9CBB4]/40 underline-offset-4 transition-colors hover:decoration-[#D9CBB4]"
                            style={{ color: SOFT }}
                          >
                            {t.project}
                          </Link>
                        ) : (
                          <div className="mt-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em]" style={{ color: SOFT }}>{t.project}</div>
                        ))}
                      {(t.promise || PROMISE[t.name]) && (
                        <span className="mt-4 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em]" style={{ borderColor: 'rgba(217,203,180,.4)', color: SOFT }}>
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
                          {t.promise || PROMISE[t.name]}
                        </span>
                      )}
                    </div>
                  </figcaption>
                  <blockquote className="font-serif text-[clamp(1.05rem,1.45vw,1.5rem)] italic leading-[1.35] " style={{ color: CREAM }}>
                    <Quote t={t} />
                  </blockquote>
                </figure>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
