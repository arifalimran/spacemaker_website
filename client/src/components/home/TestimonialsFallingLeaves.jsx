// client/src/components/home/TestimonialsFallingLeaves.jsx
// Wind-blown leaves (v2): leaves lift off the tree on the right and blow across the section to the left
// edge, bobbing and tumbling as they fall a little. They run whenever the section is in view and the
// tab is visible (no more waiting for the visitor to stand still).
// Two layers: BACK (behind the text, small/faint/slow) and FRONT (above the text, larger). Each leaf is a
// small div animated with element.animate() using transform + opacity only. The parent decides whether
// this runs at all (it is off under prefers-reduced-motion).
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

  useEffect(() => {
    if (!enabled) return undefined;
    const blow = () => {
      if (document.hidden) return;
      const section = sectionRef.current;
      const BACK = backRef.current;
      const FRONT = frontRef.current;
      if (!section || !BACK || !FRONT) return;
      const mobile = window.innerWidth < 768;
      const max = mobile ? 5 : 11;
      if (BACK.childElementCount + FRONT.childElementCount >= max) return;
      const W = section.clientWidth;
      const H = section.clientHeight;

      const near = Math.random() < 0.4;
      const layer = near ? FRONT : BACK;
      const sc = near ? 1.2 + Math.random() * 0.5 : 0.55 + Math.random() * 0.35;
      const op = near ? 1 : 0.6;
      const el = leafEl();
      layer.appendChild(el);

      // start over the tree (right side, upper-middle of the section), end past the left edge
      const x0 = W * (0.78 + Math.random() * 0.2);
      const y0 = 120 + H * (0.06 + Math.random() * 0.4); // layer starts 120px above the section
      const dx = -(x0 + 60 + Math.random() * 40);
      const dy = H * (0.12 + Math.random() * 0.3);
      const speed = (near ? 130 : 95) + Math.random() * 40; // px per second, faster for the near layer
      const dur = Math.min(26000, Math.max(7000, (Math.abs(dx) / speed) * 1000));
      const bob = 16 + Math.random() * 22;
      const bobs = 2 + Math.random() * 2.5;
      const spin = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 540);
      const N = 14;
      const frames = [];
      for (let i = 0; i <= N; i++) {
        const p = i / N;
        // gusts: progress runs a little uneven, so the leaf speeds up and eases
        const q = Math.min(1, Math.max(0, p + 0.035 * Math.sin(p * Math.PI * 4)));
        const yy = dy * q + bob * Math.sin(p * Math.PI * 2 * bobs);
        const rr = spin * q + 18 * Math.sin(p * Math.PI * 6);
        const o = i === 0 ? 0 : i === 1 ? op : i === N ? 0 : op;
        frames.push({
          transform: `translate3d(${x0 + dx * q}px,${y0 + yy}px,0) rotate(${rr}deg) scale(${sc})`,
          opacity: o,
          offset: p,
        });
      }
      el.animate(frames, { duration: dur, easing: 'linear' }).onfinish = () => el.remove();
    };
    const id = setInterval(blow, 1400);
    blow();
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
