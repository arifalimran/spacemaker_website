// client/src/components/layout/ButterflyLayer.jsx
// A light layer of multi-colour butterflies drifting across the whole site.
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flutter } from '../portfolio/shared';

const FLY = [
  { hue: '#C6F00C', size: 44, dur: 58, delay: 2, top: '16vh', x: ['-8vw', '28vw', '60vw', '92vw', '110vw'], y: [0, -60, 40, -30, 20], rot: [14, -10, 8, -14, 6] },
  { hue: '#FF7A59', size: 34, dur: 74, delay: 12, top: '58vh', x: ['110vw', '78vw', '46vw', '18vw', '-10vw'], y: [0, 50, -40, 30, -20], rot: [-14, 10, -8, 14, -6], mirror: true },
  { hue: '#5BC0EB', size: 38, dur: 66, delay: 24, top: '36vh', x: ['-10vw', '20vw', '52vw', '84vw', '110vw'], y: [0, 70, -20, 50, 0], rot: [10, -12, 12, -8, 8], extra: true },
  { hue: '#F5B841', size: 30, dur: 80, delay: 36, top: '74vh', x: ['110vw', '84vw', '50vw', '22vw', '-10vw'], y: [0, -50, 20, -40, 10], rot: [-10, 12, -10, 10, -6], mirror: true, extra: true },
  { hue: '#9B7EDE', size: 32, dur: 70, delay: 48, top: '24vh', x: ['-10vw', '30vw', '64vw', '90vw', '110vw'], y: [0, 40, -50, 20, -10], rot: [12, -8, 10, -12, 6], extra: true },
];

export default function ButterflyLayer() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] overflow-hidden">
      {FLY.map((b, i) => (
        <motion.div
          key={i}
          className={b.extra ? 'hidden sm:block' : ''}
          style={{ position: 'absolute', top: b.top, left: 0, width: b.size, height: b.size }}
          initial={{ x: b.x[0] }}
          animate={{ x: b.x, y: b.y, rotate: b.rot }}
          transition={{ duration: b.dur, delay: b.delay, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0, 6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: b.mirror ? 'scaleX(-1)' : undefined }}
          >
            <Flutter hue={b.hue} size={b.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
