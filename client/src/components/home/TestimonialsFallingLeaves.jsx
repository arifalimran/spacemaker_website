// client/src/components/home/TestimonialsFallingLeaves.jsx
// Leaves drift down from over the bottom of Why Choose Us into Testimonials, only while the
// visitor stands still: every 1.5s, if the section is in view and nothing moved (scroll / wheel /
// touchmove) for over 1s, one leaf starts. New leaves stop while moving; falling ones finish.
// Two layers: BACK (behind the text, small/faint/slow) and FRONT (above the text, large), both
// starting 120px above the section. Each leaf is a small div animated with element.animate()
// using transform (translate3d + rotate + scale) and opacity only; it lifts a little twice.
import React, { useEffect, useRef } from 'react';
import { LEAF, VEIN, leafColor } from './TestimonialsTree';

function leafEl() {
  const el = document.createElement('div');
  el.style.cssText = 'position:absolute;top:0;left:0;width:16px;height:20px;will-change:transform,opacity;opacity:0';
  el.innerHTML = `<svg viewBox="-8 -18 16 20" width="16" height="20" style="display:block;overflow:visible"><path d="${LEAF}" fill="${leafColor()}"/><path d="${VEIN}" stroke="rgba(255,255,255,.35)" stroke-width=".5" fill="none"/></svg>`;
  return el;
}

export default function TestimonialsFallingLeaves({ sectionRef, enabled }) {
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const lastMove = useRef(Date.now());

  // "standing still" = no scroll / wheel / touchmove for a moment
  useEffect(() => {
    const moved = () => {
      lastMove.current = Date.now();
    };
    const opts = { passive: true };
    window.addEventListener('scroll', moved, opts);
    window.addEventListener('wheel', moved, opts);
    window.addEventListener('touchmove', moved, opts);
    return () => {
      window.removeEventListener('scroll', moved, opts);
      window.removeEventListener('wheel', moved, opts);
      window.removeEventListener('touchmove', moved, opts);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const drop = () => {
      const section = sectionRef.current;
      const BACK = backRef.current;
      const FRONT = frontRef.current;
      if (!section || !BACK || !FRONT) return;
      const max = window.innerWidth < 768 ? 6 : 14;
      if (BACK.childElementCount + FRONT.childElementCount >= max) return;
      const W = section.clientWidth;
      const H = section.clientHeight;

      const near = Math.random() < 0.4;
      const layer = near ? FRONT : BACK;
      const sc = near ? 1.3 + Math.random() * 0.5 : 0.55 + Math.random() * 0.35;
      const op = near ? 1 : 0.55;
      const el = leafEl();
      layer.appendChild(el);
      const x = W * (0.1 + Math.random() * 0.85);
      const y = Math.random() * 40;
      const dx = (Math.random() - 0.5) * 160;
      const dy = (H + 120) * (0.65 + Math.random() * 0.3);
      const rt = (Math.random() - 0.5) * 600;
      const t = (near ? 6500 : 8500) + Math.random() * 2500;
      const f = (o, yy, xx, rr, o2) => ({
        transform: `translate3d(${x + xx}px,${y + yy}px,0) rotate(${rr}deg) scale(${sc})`,
        opacity: o2,
        offset: o,
      });
      el.animate(
        [
          f(0, 0, 0, 0, 0),
          f(0.1, dy * 0.12, dx * 0.1, rt * 0.1, op),
          f(0.3, dy * 0.32, dx * 0.3 + 30, rt * 0.3, op),
          f(0.42, dy * 0.27, dx * 0.42 + 10, rt * 0.42, op), // lifts up a little
          f(0.62, dy * 0.55, dx * 0.6 - 30, rt * 0.6, op),
          f(0.74, dy * 0.5, dx * 0.72 - 15, rt * 0.72, op), // lifts again
          f(0.92, dy * 0.9, dx * 0.92, rt * 0.92, op),
          f(1, dy, dx, rt, 0),
        ],
        { duration: t, easing: 'ease-in-out' }
      ).onfinish = () => el.remove();
    };
    const id = setInterval(() => {
      if (Date.now() - lastMove.current > 1000) drop();
    }, 1500);
    return () => clearInterval(id);
  }, [enabled, sectionRef]);

  const layer = { position: 'absolute', top: -120, left: 0, right: 0, bottom: 0, pointerEvents: 'none' };
  return (
    <>
      <div ref={backRef} aria-hidden="true" style={{ ...layer, zIndex: 4 }} />
      <div ref={frontRef} aria-hidden="true" style={{ ...layer, zIndex: 6 }} />
    </>
  );
}
