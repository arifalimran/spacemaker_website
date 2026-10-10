import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import BanyanMark from '../layout/BanyanMark';

/**
 * Fixed, non-interactive background:
 *  - blueprint dot grid drifting at ~0.15x scroll rate
 *  - oversized banyan watermark drifting slower, at 5% opacity
 * Sits behind all sections (z-0). Sections must be `relative z-10`.
 */
export default function BackgroundLayers() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Pixel-based drift so it feels the same on every page length
  const gridY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.15));
  const markY = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.08));
  const markRotate = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : 4]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Blueprint dot grid (extra height so drift never exposes an edge) */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        className="absolute -top-[40%] inset-x-0 h-[180%] opacity-[0.045]"
      />

      {/* Banyan watermark */}
      <motion.div
        style={{ y: markY, rotate: markRotate }}
        className="absolute -right-[12%] top-[8%] w-[70vmin] h-[70vmin] text-[#1B4332] opacity-[0.05]"
      >
        <BanyanMark className="w-full h-full" title="" />
      </motion.div>
    </div>
  );
}
