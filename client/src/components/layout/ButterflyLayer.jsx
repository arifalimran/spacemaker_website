// client/src/components/layout/ButterflyLayer.jsx
// Fixed, click-through layer that holds the two side-corridor butterflies.
// Renders nothing at all when the visitor prefers reduced motion.
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import Butterflies from '../common/Butterflies';

export default function ButterflyLayer() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] overflow-hidden">
      <Butterflies />
    </div>
  );
}
