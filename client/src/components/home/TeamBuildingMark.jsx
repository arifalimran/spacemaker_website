// client/src/components/home/TeamBuildingMark.jsx
// Line drawing: a high-rise under construction. A rooftop tower crane picks a load of beams off the ground pile,
// lifts it, carries it right-to-left over the building and sets it down on the open top floor. Loops every 9s.
// Building draws itself on scroll (framer pathLength); crane is CSS transform/opacity only.
// Reduced motion: drawn, still, load hanging mid-air.
import React from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';

const INK = '#2A1F1A';
const LIME = '#C6F00C';

const CSS = `
.sm-cr-t{animation:smCrT 9s ease-in-out 3s infinite}
.sm-cr-c{transform-box:fill-box;transform-origin:50% 0;animation:smCrC 9s ease-in-out 3s infinite}
.sm-cr-l{animation:smCrL 9s ease-in-out 3s infinite}
.sm-cr-d{opacity:0;animation:smCrD 9s ease-in-out 3s infinite}
.sm-cr-w{opacity:.1;animation:smCrW 5s ease-in-out 3s infinite}
@keyframes smCrT{0%,12%{transform:translateX(0)}72%,92%{transform:translateX(-135px)}100%{transform:translateX(0)}}
@keyframes smCrC{0%,12%{transform:scaleY(1.16)}34%,72%{transform:scaleY(.1)}84%,92%{transform:scaleY(.3)}98%,100%{transform:scaleY(.1)}}
@keyframes smCrL{0%,12%{transform:translateY(116px)}34%,72%{transform:translateY(10px)}84%,92%{transform:translateY(30px)}98%,100%{transform:translateY(10px)}}
@keyframes smCrD{0%,86%{opacity:0}90%,97%{opacity:1}100%{opacity:0}}
@keyframes smCrW{0%,100%{opacity:.1}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){
 .sm-cr-t,.sm-cr-c,.sm-cr-l,.sm-cr-d,.sm-cr-w{animation:none}
 .sm-cr-t{transform:translateX(-135px)} .sm-cr-c{transform:scaleY(.1)} .sm-cr-l{transform:translateY(10px)} .sm-cr-w{opacity:.8}
}`;

const BAYS = [60, 95, 130, 165];
const FLOORS = [70, 86, 102, 118, 134]; // tops of the 5 closed floors
const LITW = [[0, 1, 0], [3, 3, 1.6]]; // [floor, bay, delay]

export default function TeamBuildingMark({ className = '' }) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const draw = (delay, dur = 0.9) =>
    reduce ? {} : { initial: { pathLength: 0, opacity: 0 }, animate: seen ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }, transition: { duration: dur, ease: 'easeInOut', delay } };
  const fade = (delay) =>
    reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: seen ? 1 : 0 }, transition: { duration: 0.5, delay } };

  return (
    <svg ref={ref} viewBox="0 0 300 156" width="100%" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-auto ${className}`}>
      <style>{CSS}</style>

      {/* ground */}
      <motion.path d="M4 150 H296" opacity=".7" {...draw(0, 1.1)} />

      {/* closed lower floors */}
      <motion.path d="M60 150 V70 H200 V150" {...draw(0.3, 1.4)} />
      {FLOORS.slice(1).map((y, i) => (
        <motion.path key={y} d={`M60 ${y} H200`} strokeWidth="1.1" opacity=".65" {...draw(0.6 + i * 0.2, 0.6)} />
      ))}
      {/* open top two floors: columns and slabs only */}
      <motion.path d="M60 70 V38 M95 70 V38 M130 70 V38 M165 70 V38 M200 70 V38 M56 54 H204 M56 38 H204" {...draw(1.6, 1.1)} />
      {/* windows */}
      {FLOORS.map((y, f) =>
        BAYS.map((x, b) => (
          <motion.rect key={`${f}${b}`} x={x + 8} y={y + 5} width="19" height="7" rx="1" strokeWidth="1" opacity=".5" {...fade(1.2 + f * 0.2)} />
        ))
      )}
      {LITW.map(([f, b, d], i) => (
        <rect key={i} className="sm-cr-w" x={BAYS[b] + 8} y={FLOORS[f] + 5} width="19" height="7" rx="1" fill={LIME} stroke={INK} strokeWidth="1" style={{ animationDelay: `${3 + d}s` }} />
      ))}

      {/* material pile on the ground (right) */}
      <motion.path d="M240 150 V143 H272 V150 M244 143 V137 H268 V143 M232 150 H280" strokeWidth="1.2" {...draw(2.2, 0.7)} />

      {/* tower crane: mast runs down through the open floors to a solid base on the roof slab, braced to the frame */}
      <motion.path d="M196 54 V8 M204 54 V8 M196 46 L204 38 M196 38 L204 30 M196 30 L204 22 M196 22 L204 14 M196 14 L204 8" strokeWidth="1.2" {...draw(2.0, 1)} />
      <motion.path d="M188 38 H212 V32 H188 Z M191 35 H193 M207 35 H209" strokeWidth="1.3" {...draw(1.8, 0.6)} />
      <motion.path d="M196 26 L172 38 M204 26 L228 38 M165 54 L196 46" strokeWidth="1" opacity=".6" {...draw(2.2, 0.6)} />
      <motion.path d="M212 38 H228" strokeWidth="1.3" {...draw(2.2, 0.3)} />
      <motion.path d="M200 8 V0 M92 10 H294 M200 0 L96 10 M200 0 L290 10" strokeWidth="1.3" {...draw(2.5, 0.9)} />
      <motion.path d="M92 10 V18 H104 V10" strokeWidth="1.2" {...draw(3, 0.4)} />

      {/* moving trolley + cable + load */}
      <g className="sm-cr-t" style={{ transform: reduce ? undefined : 'translateX(0)' }}>
        <g transform="translate(255 0)">
          <rect x="-4" y="10" width="8" height="4" fill={INK} stroke="none" />
          <line className="sm-cr-c" x1="0" y1="14" x2="0" y2="114" strokeWidth="1" />
          <g className="sm-cr-l">
            <path d="M0 14 L-8 22 M0 14 L8 22" strokeWidth="1" />
            <rect x="-9" y="22" width="18" height="6" rx="1" fill={INK} stroke="none" />
          </g>
        </g>
      </g>
      {/* delivered on the top floor */}
      <rect className="sm-cr-d" x="112" y="48" width="16" height="6" rx="1" fill={LIME} stroke={INK} strokeWidth="1" />
    </svg>
  );
}
