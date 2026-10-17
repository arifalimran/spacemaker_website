// client/src/components/home/Testimonials.jsx
// "In their words": solid pale lime (#EEF4DD) section directly after Why Choose Us.
// Top = clean straight edge against the espresso above. Bottom = soft blend into cream #F5F0E6
// (same technique as the hero's bottom dissolve: a tall absolutely positioned fade layer).
// One open layout, no cards: 3 columns with thin dividers on lg+, stacked with thin rules below.
// Hover / keyboard focus / tap highlights one testimonial (thicker lime ring) and dims the others.
// Data: `testimonials` in data/siteContent.js (every field optional-safe).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials, testimonialsSection as S } from '../../data/siteContent';

const LIME = '#C6F00C';
const OUTLINE = 'rgba(27,67,50,0.25)';
const ring = (w) => `0 0 0 ${w}px ${LIME}, 0 0 0 ${w + 1}px ${OUTLINE}`;

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

function Avatar({ t, active }) {
  const [bad, setBad] = useState(false);
  return (
    <div
      className="relative h-[88px] w-[88px] flex-none overflow-hidden rounded-full bg-[#1B4332] transition-[box-shadow] duration-300"
      style={{ boxShadow: ring(active ? 5 : 3) }}
    >
      {t.photo && !bad ? (
        <img
          src={t.photo}
          alt={t.name ? `Photo of ${t.name}` : 'Client photo'}
          loading="lazy"
          onError={() => setBad(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          role="img"
          aria-label={t.name ? `${t.name} (initials)` : 'Client'}
          className="flex h-full w-full items-center justify-center font-['Space_Grotesk'] text-2xl font-bold text-[#F5F0E6]"
        >
          {initials(t.name)}
        </span>
      )}
    </div>
  );
}

export default function Testimonials({ items = testimonials }) {
  const list = [...(items || [])].filter((t) => t && t.quote).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const [active, setActive] = useState(null);
  const pointer = useRef('mouse');
  const listRef = useRef(null);

  // tap outside clears the highlight
  useEffect(() => {
    if (active === null) return undefined;
    const off = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) setActive(null);
    };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [active]);

  if (!list.length) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#EEF4DD] py-24 md:py-32">
      {/* bottom blend into cream (same approach as the hero -> "Who we are" dissolve) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56"
        style={{ background: 'linear-gradient(to bottom, rgba(245,240,230,0), #F5F0E6)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <FadeUp className="text-center">
          <span className="font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6E0A]">
            {S.eyebrow}
          </span>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#2A1F1A] sm:text-5xl">
            {S.title}
          </h2>
        </FadeUp>

        <ul
          ref={listRef}
          className="mt-14 grid divide-y divide-[#1B4332]/15 lg:mt-16 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          {list.map((t, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li key={t.id || i} className="py-10 first:pt-0 last:pb-0 lg:px-10 lg:py-0 lg:first:pl-0 lg:last:pr-0">
                <FadeUp delay={i * 0.1} className="h-full">
                  <figure
                    tabIndex={0}
                    aria-label={t.name ? `Testimonial from ${t.name}` : 'Client testimonial'}
                    className="mx-auto flex h-full max-w-md cursor-default flex-col items-center rounded-2xl text-center outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-[#1B4332]/40 focus-visible:ring-offset-8 focus-visible:ring-offset-[#EEF4DD]"
                    style={{ opacity: dim ? 0.55 : 1 }}
                    onPointerDown={(e) => {
                      pointer.current = e.pointerType;
                    }}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setActive((a) => (a === i ? null : a))}
                    onFocus={(e) => e.currentTarget.matches(':focus-visible') && setActive(i)}
                    onBlur={() => setActive((a) => (a === i ? null : a))}
                    onClick={() => {
                      if (pointer.current !== 'mouse') setActive((a) => (a === i ? null : i));
                    }}
                  >
                    <Avatar t={t} active={on} />
                    <blockquote className="mt-8 flex-1 font-serif text-xl italic leading-[1.65] text-[#2A1F1A] lg:text-[22px]">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-7">
                      {t.name && (
                        <div className="font-['Space_Grotesk'] text-lg font-bold text-[#2A1F1A]">{t.name}</div>
                      )}
                      {t.project &&
                        (t.projectSlug ? (
                          <Link
                            to={`/projects/${t.projectSlug}`}
                            className="mt-1.5 inline-block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5C6E0A] underline decoration-[#5C6E0A]/30 underline-offset-4 transition-colors hover:decoration-[#5C6E0A]"
                          >
                            {t.project}
                          </Link>
                        ) : (
                          <div className="mt-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5C6E0A]">
                            {t.project}
                          </div>
                        ))}
                    </figcaption>
                  </figure>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
