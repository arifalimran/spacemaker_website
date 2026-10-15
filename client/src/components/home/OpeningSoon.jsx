// client/src/components/home/OpeningSoon.jsx
// Opening soon: projects listed right after signing to measure interest.
// Every card looks complete with or without a photo (designed placeholder when missing).
// Hover = transform + opacity only. Never shows unit counts.
import React from 'react';
import { upcoming, TYPE_LABEL } from '../../data/portfolio';
import { LeadLink, Eyebrow, Reveal } from '../portfolio/shared';

/* fine lime line drawing of a building, used when there is no photo yet */
function BuildingLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 240"
      className="absolute bottom-0 right-[6%] h-[78%] w-auto text-[#C6F00C] opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
    >
      <path d="M10 236h180" />
      <rect x="52" y="34" width="96" height="202" />
      <path d="M52 34l14-16h68l14 16" />
      <path d="M100 18V6" />
      {[58, 82, 106, 130, 154, 178, 202].map((y) => (
        <g key={y}>
          <path d={`M52 ${y}h96`} opacity="0.55" />
          <rect x="62" y={y + 6} width="20" height="12" />
          <rect x="90" y={y + 6} width="20" height="12" />
          <rect x="118" y={y + 6} width="20" height="12" />
        </g>
      ))}
      <rect x="86" y="212" width="28" height="24" />
      <path d="M24 236v-60h28M176 236v-84h-28" opacity="0.6" />
    </svg>
  );
}

function Visual({ u, title, featured }) {
  // featured: fills the left half (h-full); others: a 16:10 panel on top of the card
  const box = featured ? 'aspect-[16/10] md:aspect-auto md:h-full md:min-h-[360px]' : 'aspect-[16/10]';
  if (u.image) {
    return (
      <div className={`relative overflow-hidden bg-[#1B4332] ${box}`}>
        <img
          src={u.image}
          alt={`${title}, ${u.area}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-[#1B4332] ${box}`}>
      {/* fine grid + soft light, plain rgba */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,240,12,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(198,240,12,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 15%, rgba(250,248,245,0.10) 0%, rgba(250,248,245,0) 70%)' }}
      />
      <div className="absolute inset-0 origin-bottom transition-transform duration-700 ease-out md:group-hover:scale-[1.04]">
        <BuildingLines />
      </div>
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <span className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-[#C6F00C]/40 px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#C6F00C]">
          Render coming soon
        </span>
        <div className="max-w-[65%] break-words">
          <div className={`font-['Space_Grotesk'] font-extrabold leading-[1.02] tracking-tight text-[#FAF8F5] ${featured ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
            {title}
          </div>
          {u.name && <div className="mt-2 font-serif text-lg italic text-[#F3EFE6]/80">{u.area}</div>}
        </div>
      </div>
    </div>
  );
}

function Card({ u, featured }) {
  const title = u.name || u.area;
  const sizes = u.sizes || u.units;
  const specs = [
    { k: 'Land', v: u.land },
    { k: 'Facing', v: u.facing },
    { k: 'Floors', v: u.floors },
    { k: 'Sizes', v: Array.isArray(sizes) && sizes.length ? sizes.join(' · ') : null },
    { k: 'Construction', v: u.resume },
  ].filter((s) => s.v);
  const features = u.facilities || [];

  return (
    <article className="group relative h-full transition-transform duration-500 ease-out md:hover:-translate-y-1.5">
      {/* hover shadow: opacity only */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl opacity-0 shadow-[0_30px_60px_-30px_rgba(27,67,50,0.45)] transition-opacity duration-500 md:group-hover:opacity-100"
      />
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#1B4332]/10 bg-[#FAF8F5] ${
          featured ? 'md:grid md:grid-cols-2' : ''
        }`}
      >
        <Visual u={u} title={title} featured={featured} />

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#5C6E0A]">
            {[TYPE_LABEL[u.type] || 'Project', u.opening].filter(Boolean).join(' · ')}
          </div>
          <h4 className={`mt-2 font-['Space_Grotesk'] font-extrabold leading-[1.05] tracking-tight text-[#111827] ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
            {title}
          </h4>
          <div className="mt-1 text-sm text-[#374151]">{u.name ? u.area : u.line}</div>
          {u.name && u.line && <div className="mt-1 font-serif text-base italic text-[#1B4332]/80">{u.line}</div>}

          {u.status && (
            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#1B4332] px-3 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#FAF8F5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C]" />
              {u.status}
            </div>
          )}

          {specs.length > 0 ? (
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#1B4332]/12 pt-5">
              {specs.map((s) => (
                <div key={s.k} className={s.k === 'Sizes' ? 'col-span-2' : ''}>
                  <dt className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5C6E0A]">{s.k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#111827]">{s.v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 border-t border-[#1B4332]/12 pt-5 text-sm leading-relaxed text-[#374151]">
              Full details are shared once the design is approved. Register your interest and we will call you first.
            </p>
          )}

          {features.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-[#1B4332]/15 bg-white px-3 py-1 text-xs font-medium text-[#1B4332]"
                >
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
            <LeadLink
              project={u}
              kind="upcoming"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B4332] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#14342A]"
            >
              <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
              Register interest
            </LeadLink>
            {/* detail line: always on mobile, appears on hover / focus on desktop */}
            <LeadLink
              project={u}
              kind="upcoming"
              className="relative text-sm font-medium text-[#1B4332] transition duration-500 md:translate-x-[-6px] md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-within:translate-x-0 md:group-focus-within:opacity-100"
            >
              View sizes &amp; features →
              <span aria-hidden className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#C6F00C]" />
            </LeadLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OpeningSoon({ items = upcoming }) {
  if (!items.length) return null;
  // odd count -> the first card is featured across the full width so the grid stays balanced
  const featureFirst = items.length % 2 === 1;

  return (
    <section
      id="opening-soon"
      className="relative pb-24 pt-20 sm:pb-28"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #F5F0E6 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>Opening soon</Eyebrow>
        <h3 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl">
          New addresses are close.
        </h3>
        <p className="mt-4 max-w-xl text-[#374151]">Tell us you are interested and we will reach you first.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((u, i) => {
            const featured = featureFirst && i === 0;
            return (
              <Reveal key={u.id} delay={(i % 2) * 0.08} className={`h-full ${featured ? 'lg:col-span-2' : ''}`}>
                <Card u={u} featured={featured} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
