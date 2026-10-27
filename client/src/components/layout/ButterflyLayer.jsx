// client/src/components/layout/ButterflyLayer.jsx
// Fixed, click-through layer that holds the two side-corridor butterflies. Visible on the whole home page, hero included.
// No scroll listener at all: the butterflies are pure CSS transform animations, so they cost nothing while scrolling.
// A plain CSS fade-in (opacity only) lets them arrive after the page intro. Renders nothing for reduced motion.
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import Butterflies from '../common/Butterflies';

export default function ButterflyLayer() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] overflow-hidden" style={{ animation: 'sm-bf-in 1.6s ease 1.2s both' }}>
      <style>{'@keyframes sm-bf-in{from{opacity:0}to{opacity:1}}'}</style>
      <Butterflies />
    </div>
  );
}
