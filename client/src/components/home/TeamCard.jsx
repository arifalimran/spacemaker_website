// client/src/components/home/TeamCard.jsx
// One expert card, shared by the home row (TeamExperts) and the full list (TeamPage).
// Frame: 4:5 portrait, slightly rounded, thin espresso border, a second outline behind it, small corner
// marks like an architect's drawing sheet. No photo yet = a drawn SAMPLE portrait (faceless, espresso tones).
// Hover / keyboard focus / tap: the photo zooms very slowly, an espresso panel slides up with the expertise
// text (exactly three lines), the outline behind moves out, a line draws under the name and the other
// cards dim slightly. Transform + opacity only (no filters). `showText` = list mode: text under the card.
import React, { useState } from 'react';

export const ESPRESSO = '#2A1F1A';
export const IVORY = '#FAF6EE';

export const TEAM_CSS = `
.sm-team-grid{background-image:
  linear-gradient(rgba(42,31,26,.035) 1px,transparent 1px),
  linear-gradient(90deg,rgba(42,31,26,.035) 1px,transparent 1px),
  linear-gradient(rgba(42,31,26,.055) 1px,transparent 1px),
  linear-gradient(90deg,rgba(42,31,26,.055) 1px,transparent 1px);
  background-size:32px 32px,32px 32px,160px 160px,160px 160px}
.sm-tc{outline:none;transition:opacity .4s ease}
.sm-tc .sm-tc-frame,.sm-tc .sm-tc-ghost{transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.sm-tc .sm-tc-img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}
.sm-tc .sm-tc-panel{transform:translateY(102%);transition:transform .55s cubic-bezier(.2,.7,.2,1)}
.sm-tc .sm-tc-line{transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.sm-tc .sm-tc-arrow{transform:translateX(-4px);opacity:.6;transition:transform .5s ease,opacity .5s ease}
.sm-tc:focus-visible .sm-tc-frame{box-shadow:0 0 0 3px rgba(42,31,26,.35)}
.sm-tc:focus-within .sm-tc-frame{transform:translateY(-5px)}
.sm-tc:focus-within .sm-tc-ghost{transform:translate(4px,4px)}
.sm-tc:focus-within .sm-tc-img{transform:scale(1.06)}
.sm-tc:focus-within .sm-tc-panel{transform:translateY(0)}
.sm-tc:focus-within .sm-tc-line{transform:scaleX(1)}
.sm-tc:focus-within .sm-tc-arrow{transform:translateX(0);opacity:1}
@media (hover:hover){
  .sm-tc:hover .sm-tc-frame{transform:translateY(-5px)}
  .sm-tc:hover .sm-tc-ghost{transform:translate(4px,4px)}
  .sm-tc:hover .sm-tc-img{transform:scale(1.06)}
  .sm-tc:hover .sm-tc-panel{transform:translateY(0)}
  .sm-tc:hover .sm-tc-line{transform:scaleX(1)}
  .sm-tc:hover .sm-tc-arrow{transform:translateX(0);opacity:1}
  .sm-tc-list:hover .sm-tc:not(:hover){opacity:.75}
}
.sm-tc-list.sm-tc-flat .sm-tc .sm-tc-panel{display:none}
@media (prefers-reduced-motion:reduce){
  .sm-tc,.sm-tc *{transition:none !important}
}
`;

/* faceless sample portraits, 6 variants, espresso + warm tones */
const SKIN = ['#C9AE92', '#B8977A', '#D4BBA0', '#A98568', '#C2A184', '#B38E70'];
const SHIRT = ['#5C4637', '#7A5F4B', '#4A392E', '#6B5446', '#8A6F5C', '#54402F'];
const HAIR = {
  0: 'M62 92 C60 52 88 38 110 38 C134 38 152 54 148 92 C140 74 126 66 105 66 C86 66 70 76 62 92Z',
  1: 'M58 120 C50 66 80 36 106 36 C136 36 158 62 150 124 C150 100 144 80 128 70 C110 62 78 66 66 96 C62 106 60 114 58 120Z',
  2: 'M64 90 C62 56 86 40 108 40 C132 40 150 56 146 92 C138 72 124 62 106 62 C88 62 72 72 64 90Z M92 34 C92 20 124 20 124 34 C118 28 98 28 92 34Z',
  3: 'M70 84 C72 60 90 50 108 50 C128 50 144 62 146 84 C138 70 124 64 108 64 C92 64 78 70 70 84Z',
  4: 'M60 96 C52 62 76 34 108 34 C140 34 162 62 152 98 C152 76 138 60 108 60 C80 60 62 78 60 96Z',
  5: 'M62 118 C54 70 82 38 108 38 C134 38 156 66 148 118 C146 96 138 74 108 70 C80 72 66 94 62 118Z',
};

export function SamplePortrait({ n = 0 }) {
  const k = n % 6;
  const beard = k === 3;
  return (
    <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`tp-bg-${k}`} cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#5A4334" />
          <stop offset="1" stopColor="#2F231C" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill={`url(#tp-bg-${k})`} />
      {/* shoulders */}
      <path d={`M10 250 C14 196 52 176 100 176 C148 176 186 196 190 250Z`} fill={SHIRT[k]} />
      <path d="M84 176 L100 206 L116 176Z" fill="rgba(250,246,238,.16)" />
      {/* neck */}
      <path d="M86 150 L86 182 C94 192 106 192 114 182 L114 150Z" fill={SKIN[k]} opacity=".9" />
      {/* head */}
      <ellipse cx="105" cy="112" rx="38" ry="46" fill={SKIN[k]} />
      {beard && <path d="M68 118 C70 154 140 154 142 118 C132 138 78 138 68 118Z" fill="#1E1511" opacity=".9" />}
      {k !== 3 && <path d={HAIR[k]} fill="#1E1511" />}
      {k === 3 && <path d={HAIR[3]} fill="#1E1511" opacity=".55" />}
      {(k === 1 || k === 5) && <path d="M60 110 C58 150 66 168 78 176 L82 130Z M150 110 C152 150 144 168 132 176 L128 130Z" fill="#1E1511" />}
    </svg>
  );
}

export default function TeamCard({ m, n, showText = false }) {
  const [broken, setBroken] = useState(false);
  const has = m.photo && !broken;
  return (
    <article className="sm-tc group flex h-full flex-col" tabIndex={0} aria-label={m.name && m.role ? `${m.name}, ${m.role}` : 'Team member'}>
      <div className="relative">
        {/* second outline behind the photo */}
        <div
          aria-hidden
          className="sm-tc-ghost absolute inset-0 rounded-[8px] border"
          style={{ borderColor: 'rgba(42,31,26,.32)', transform: 'translate(7px, 7px)' }}
        />
        <div
          className="sm-tc-frame relative aspect-[5/6] overflow-hidden rounded-[8px] border-[1.5px]"
          style={{ borderColor: ESPRESSO, background: '#2F231C' }}
        >
          <div className="sm-tc-img absolute inset-0">
            {has ? (
              <img
                src={m.photo}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setBroken(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <SamplePortrait n={n} />
            )}
          </div>

          {/* corner marks + number */}
          <span aria-hidden className="pointer-events-none absolute left-2.5 top-2.5 h-3 w-3 border-l border-t" style={{ borderColor: 'rgba(245,240,230,.55)' }} />
          <span aria-hidden className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r" style={{ borderColor: 'rgba(245,240,230,.55)' }} />
          <span aria-hidden className="pointer-events-none absolute right-3 top-2.5 flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-[#8F7F6C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C]" />
            {String(n + 1).padStart(2, '0')}
          </span>
          {!has && m.isSample && (
            <span aria-hidden className="pointer-events-none absolute bottom-2.5 left-3 font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#8F7F6C]">
              Sample
            </span>
          )}

          {/* expertise panel (home row): slides up on hover / focus / tap */}
          {!showText && m.expertise && (
            <div
              className="sm-tc-panel absolute inset-x-0 bottom-0 px-4 pb-4 pt-8"
              style={{ background: 'linear-gradient(to top, rgba(42,31,26,.97) 62%, rgba(42,31,26,0))' }}
            >
              <p
                className="text-[12.5px] leading-[1.55] text-[#BBA992]"
                style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {m.expertise}
              </p>
              <span aria-hidden className="sm-tc-arrow mt-2 inline-block font-['JetBrains_Mono'] text-xs text-[#BBA992]">
                →
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        {m.name && (
          <h3 className="relative inline-block self-start font-['Space_Grotesk'] text-[17px] font-bold leading-tight" style={{ color: ESPRESSO }}>
            {m.name}
            <span aria-hidden className="sm-tc-line absolute -bottom-1.5 left-0 block h-[2px] w-full" style={{ background: '#C6F00C' }} />
          </h3>
        )}
        {m.role && (
          <div className="mt-2 font-['JetBrains_Mono'] text-[10.5px] uppercase tracking-[0.18em] text-[#6B5446]">{m.role}</div>
        )}
        {showText && m.expertise && (
          <p
            className="mt-3 text-sm leading-[1.6] text-[#4B3F37]"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 'calc(3 * 1.6em)' }}
          >
            {m.expertise}
          </p>
        )}
      </div>
    </article>
  );
}
