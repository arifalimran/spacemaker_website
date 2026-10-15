// client/src/components/home/Testimonials.jsx
// SOLID pale lime (#EEF4DD) section after Why Choose Us (joined by an angle cut placed in App.jsx). Data: testimonials in siteContent.js.
// Entries with isSample: true show a small "Sample" tag until real quotes replace them.
import React from 'react';
import { testimonials, testimonialsSection as S } from '../../data/siteContent';
import { Reveal } from '../portfolio/shared';

export const initials = (name = '') =>
  name
    .replace(/[^\p{L}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '·';

function Person({ t }) {
  return (
    <div className="flex items-center gap-3">
      {t.photo ? (
        <img src={t.photo} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-[#C6F00C]" />
      ) : (
        <span
          aria-hidden
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B4332] font-heading text-sm font-bold text-[#EEF4DD] ring-2 ring-[#C6F00C]"
        >
          {initials(t.name)}
        </span>
      )}
      <div className="min-w-0">
        <div className="truncate font-heading text-sm font-bold text-[#2A1F1A]">{t.name}</div>
        {t.project && (
          <div className="truncate font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#5C6E0A]">{t.project}</div>
        )}
      </div>
    </div>
  );
}

export default function Testimonials({ items = testimonials }) {
  if (!items.length) return null;
  return (
    <section id="testimonials" className="relative bg-[#EEF4DD] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#5C6E0A]">
          <span className="h-[2px] w-8 bg-[#5C6E0A]" />
          {S.eyebrow}
        </span>
        <h2 className="mt-4 max-w-3xl font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-[#2A1F1A] sm:text-5xl">
          {S.title}
        </h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <li key={t.id} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <div className="relative flex h-full flex-col rounded-3xl border border-[#5C6E0A]/15 bg-[#FAF8F5]/70 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span aria-hidden className="font-serif text-8xl leading-[0.7] text-[#5C6E0A]/40">“</span>
                    {t.isSample && (
                      <span className="rounded-full border border-[#5C6E0A]/40 px-2.5 py-0.5 font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#5C6E0A]">
                        Sample
                      </span>
                    )}
                  </div>
                  <blockquote className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-[#2A1F1A] sm:text-xl">
                    {t.quote}
                  </blockquote>
                  <div aria-hidden className="relative mt-6 h-px w-full bg-[#5C6E0A]/20">
                    <span className="absolute left-0 top-[-1px] h-[3px] w-12 rounded-full bg-[#C6F00C]" />
                  </div>
                  <div className="mt-5">
                    <Person t={t} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
