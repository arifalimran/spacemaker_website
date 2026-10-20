// client/src/components/home/SkylineParallax.jsx
// Faint line-drawing skyline that stands on the footer edge under the Partner panel. Two layers move at different
// speeds as you scroll (parallax), so the city seems to rise out of the footer. Desktop only (lg+).
// Each layer is its own composited <div> (transform on a div, not on SVG <g>), still when reduced motion is on. Decorative.
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const INK = '#2A1F1A';

// [x, width, height] buildings per layer, drawn on a 1440 x 220 canvas standing on y=220
const BACK = [[60,70,110],[150,60,150],[225,80,95],[330,55,170],[420,90,120],[540,60,140],[620,85,100],[740,55,160],[820,80,115],[930,65,145],[1020,90,105],[1130,60,155],[1210,80,120],[1310,70,135]];
const FRONT = [[20,90,80],[130,70,120],[230,100,70],[360,75,135],[470,95,90],[600,70,110],[700,100,75],[830,80,130],[940,95,85],[1070,75,115],[1180,100,70],[1310,85,105]];

function Layer({ items, opacity, windows }) {
  return (
    <g stroke={INK} strokeWidth="1.2" fill="none" strokeOpacity={opacity}>
      {items.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={220 - h} width={w} height={h} fill="#FAF6EE" />
          {windows &&
            Array.from({ length: Math.floor(h / 22) }).map((_, r) => (
              <path key={r} d={`M${x + 8} ${220 - h + 12 + r * 22} h${w - 16}`} strokeDasharray="6 6" />
            ))}
        </g>
      ))}
    </g>
  );
}

export default function SkylineParallax() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const back = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, 0]);
  const front = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [35, 0]);
  const svgCls = 'absolute bottom-0 h-full w-full';
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[150px] overflow-hidden lg:block">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: back }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className={svgCls}>
          <Layer items={BACK} opacity={0.1} windows />
        </svg>
      </motion.div>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: front }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className={svgCls}>
          <Layer items={FRONT} opacity={0.16} windows={false} />
        </svg>
      </motion.div>
    </div>
  );
}
