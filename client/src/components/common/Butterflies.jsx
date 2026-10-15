// client/src/components/common/Butterflies.jsx
// Two butterflies, side corridors only. Everything is CSS keyframes on transform
// (translate3d for travel and bob, scaleX for the wing flap), so it runs on the GPU
// and never touches layout.
import React from 'react';

const CSS = `
.sm-bf{position:absolute;top:0;left:0;width:var(--s);height:var(--s);pointer-events:none;will-change:transform;backface-visibility:hidden}
.sm-bf-left{animation:sm-fly-left 44s ease-in-out infinite;animation-delay:-6s}
.sm-bf-right{animation:sm-fly-right 38s ease-in-out infinite;animation-delay:-14s}
.sm-bf-bob{width:100%;height:100%;will-change:transform;animation:sm-bob 2.2s ease-in-out infinite}
.sm-bf-body{position:relative;width:100%;height:100%}
.sm-wing{position:absolute;top:0;width:50%;height:100%;will-change:transform;backface-visibility:hidden;animation:sm-flap .28s ease-in-out infinite}
.sm-wing svg{display:block;width:100%;height:100%;overflow:visible}
.sm-wing-l{left:0;transform-origin:100% 50%}
.sm-wing-r{right:0;transform-origin:0 50%}
.sm-torso{position:absolute;left:48.5%;top:40%;width:max(2px,3%);height:26%;border-radius:2px;background:#2A1F1A}

@keyframes sm-flap{
  0%,100%{transform:translate3d(0,0,0) scaleX(1)}
  50%{transform:translate3d(0,0,0) scaleX(.2)}
}
@keyframes sm-bob{
  0%,100%{transform:translate3d(0,0,0)}
  50%{transform:translate3d(0,-7px,0)}
}

/* Side corridors only, so they never cross text. Content is max 80rem wide + 2rem padding,
   so each corridor is (100vw - 80rem)/2 + 2rem. On screens narrower than 1440px the corridor is
   too thin for a butterfly, so they are hidden there (see media query below).
   LEFT: x between 0.5vw and 4vw (+ ~2.8vw body) -> stays inside the corridor. */
@keyframes sm-fly-left{
  0%   {transform:translate3d(1vw,62vh,0)}
  12%  {transform:translate3d(3.5vw,52vh,0)}
  25%  {transform:translate3d(1.5vw,40vh,0)}
  38%  {transform:translate3d(4vw,30vh,0)}
  50%  {transform:translate3d(2vw,22vh,0)}
  62%  {transform:translate3d(3.5vw,34vh,0)}
  75%  {transform:translate3d(0.5vw,46vh,0)}
  88%  {transform:translate3d(3vw,58vh,0)}
  100% {transform:translate3d(1vw,62vh,0)}
}

/* RIGHT: x between 93.5vw and 96.5vw. */
@keyframes sm-fly-right{
  0%   {transform:translate3d(95vw,24vh,0)}
  12%  {transform:translate3d(93.5vw,34vh,0)}
  25%  {transform:translate3d(96vw,46vh,0)}
  38%  {transform:translate3d(94vw,58vh,0)}
  50%  {transform:translate3d(96.5vw,68vh,0)}
  62%  {transform:translate3d(94vw,56vh,0)}
  75%  {transform:translate3d(96vw,42vh,0)}
  88%  {transform:translate3d(93.5vw,30vh,0)}
  100% {transform:translate3d(95vw,24vh,0)}
}

@media (max-width: 1439px){ .sm-bf{display:none} }
@media (prefers-reduced-motion: reduce){ .sm-bf{display:none} }
`;

export function Butterfly({ side = 'left', hue = '#C6F00C', size = 38 }) {
  return (
    <div aria-hidden className={`sm-bf sm-bf-${side}`} style={{ '--s': `${size}px` }}>
      <div className="sm-bf-bob">
        <div className="sm-bf-body">
          <div className="sm-wing sm-wing-l">
            <svg viewBox="0 0 50 100">
              <path d="M50 48 C30 10, 4 14, 8 40 C10 58, 34 62, 50 52 Z" fill={hue} opacity="0.92" />
              <path d="M50 54 C32 58, 14 74, 26 86 C38 94, 48 72, 50 58 Z" fill={hue} opacity="0.72" />
              <circle cx="24" cy="36" r="4" fill="#2A1F1A" opacity="0.55" />
            </svg>
          </div>
          <div className="sm-wing sm-wing-r">
            <svg viewBox="50 0 50 100">
              <path d="M50 48 C70 10, 96 14, 92 40 C90 58, 66 62, 50 52 Z" fill={hue} opacity="0.92" />
              <path d="M50 54 C68 58, 86 74, 74 86 C62 94, 52 72, 50 58 Z" fill={hue} opacity="0.72" />
              <circle cx="76" cy="36" r="4" fill="#2A1F1A" opacity="0.55" />
            </svg>
          </div>
          <span className="sm-torso" />
        </div>
      </div>
    </div>
  );
}

/* Exactly two butterflies. Change the colours here. */
const LEFT_HUE = '#C6F00C'; // lime
const RIGHT_HUE = '#FF7A59'; // coral

export default function Butterflies() {
  return (
    <>
      <style>{CSS}</style>
      <Butterfly side="left" hue={LEFT_HUE} size={40} />
      <Butterfly side="right" hue={RIGHT_HUE} size={34} />
    </>
  );
}
