// client/src/components/home/TeamTreeMark.jsx
// Small line-drawing tree (echoes the Space Maker logo) for the Team heading, like the coffee cup in
// "Partner with us": the lines draw themselves once, the leaves sway gently, and one lime leaf drifts down
// and fades, again and again. SVG + CSS transform/opacity only. Respects reduced motion.
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const INK = '#2A1F1A';
const CSS = `
@keyframes smLeafSway{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
.sm-tm-leaf{transform-box:fill-box;transform-origin:50% 100%;animation:smLeafSway 3.6s ease-in-out infinite}
.sm-tm-leaf:nth-of-type(2){animation-delay:-1.2s}
.sm-tm-leaf:nth-of-type(3){animation-delay:-2.4s}
@keyframes smLeafDrift{0%{transform:translate(0,0) rotate(0);opacity:0}15%{opacity:1}100%{transform:translate(9px,30px) rotate(160deg);opacity:0}}
.sm-tm-drift{transform-box:fill-box;transform-origin:50% 50%;animation:smLeafDrift 5.5s ease-in infinite}
@media (prefers-reduced-motion:reduce){.sm-tm-leaf,.sm-tm-drift{animation:none}.sm-tm-drift{opacity:0}}
`;
const LEAF = 'M0,0 C3,-2 5,-6 3.4,-9.4 C2.6,-11 1,-12.2 0,-13 C-1,-12 -3,-11 -3.8,-9 C-4.8,-6 -2.8,-2 0,0Z';

export default function TeamTreeMark({ size = 46 }) {
  const reduce = useReducedMotion();
  const draw = (delay) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 1.1, ease: 'easeInOut', delay },
        };
  return (
    <svg width={size} height={size} viewBox="0 0 48 52" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none overflow-visible">
      <style>{CSS}</style>
      <motion.path d="M24 44 V26" {...draw(0)} />
      <motion.path d="M24 33 Q18 28 13 21" {...draw(0.35)} />
      <motion.path d="M24 29 Q30 24 35 17" {...draw(0.5)} />
      <motion.path d="M24 26 Q24 19 24 12" {...draw(0.65)} />
      <motion.path d="M13 21 L8 16 M35 17 L40 12" strokeWidth="1.2" {...draw(0.9)} />
      <motion.path d="M10 46 H38 M15 49 H33" strokeWidth="1.2" opacity=".6" {...draw(0.2)} />
      {/* leaves at the branch tips: sway */}
      <g fill={INK} stroke="none" opacity=".75">
        <path className="sm-tm-leaf" transform="translate(24 12)" d={LEAF} />
        <path className="sm-tm-leaf" transform="translate(8 16) rotate(-40)" d={LEAF} />
        <path className="sm-tm-leaf" transform="translate(40 12) rotate(40)" d={LEAF} />
      </g>
      {/* one lime leaf drifting down */}
      <path className="sm-tm-drift" transform="translate(30 20)" d={LEAF} fill="#C6F00C" stroke={INK} strokeWidth=".6" />
    </svg>
  );
}
