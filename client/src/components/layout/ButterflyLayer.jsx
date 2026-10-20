// client/src/components/layout/ButterflyLayer.jsx
// Fixed, click-through layer that holds the two side-corridor butterflies.
// On the home page they stay hidden while the hero is on screen (so they don't crowd the headline) and fade in as you
// scroll past it. Renders nothing at all when the visitor prefers reduced motion.
import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Butterflies from '../common/Butterflies';

export default function ButterflyLayer() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, (y) => {
    if (typeof window === 'undefined' || window.location.pathname !== '/') return 1;
    const h = window.innerHeight;
    return Math.min(1, Math.max(0, (y - h * 0.55) / (h * 0.35)));
  });
  if (reduce) return null;
  return (
    <motion.div aria-hidden style={{ opacity }} className="pointer-events-none fixed inset-0 z-[35] overflow-hidden">
      <Butterflies />
    </motion.div>
  );
}
