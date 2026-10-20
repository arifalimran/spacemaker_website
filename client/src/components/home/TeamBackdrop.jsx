// client/src/components/home/TeamBackdrop.jsx
// Very faint tower-and-crane drawing behind the Team section. It drifts slower than the page (parallax):
// one composited div, transform only, desktop only, still when reduced motion is on. Decorative.
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function TeamBackdrop() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -90]);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <motion.div className="absolute right-[6%] top-[-10%] h-[120%] w-[300px] will-change-transform" style={{ y }}>
        <svg viewBox="0 0 300 700" className="h-full w-full" fill="none" stroke="#2A1F1A" strokeWidth="1.2" opacity="0.07">
          <rect x="70" y="140" width="130" height="560" />
          {Array.from({ length: 19 }).map((_, i) => (
            <path key={i} d={`M70 ${168 + i * 29} H200`} />
          ))}
          <path d="M100 140 V700 M135 140 V700 M170 140 V700" opacity=".5" />
          <path d="M135 140 V40 M120 40 H260 M135 40 L120 60 M260 40 V80 M255 80 H265 V92 H255 Z" />
          <rect x="215" y="360" width="70" height="340" />
          {Array.from({ length: 11 }).map((_, i) => (
            <path key={i} d={`M215 ${388 + i * 29} H285`} />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
