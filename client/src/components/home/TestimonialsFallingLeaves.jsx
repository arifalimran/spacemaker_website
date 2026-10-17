// client/src/components/home/TestimonialsFallingLeaves.jsx
// Leaves drift down from over the bottom of Why Choose Us into Testimonials, only while the
// visitor stands still: every 1.5s, if the section is in view and nothing moved (scroll / wheel /
// touchmove) for over 1s, one leaf starts. New leaves stop while moving; falling ones finish.
// Two layers: BACK (behind the text, small/faint/slow) and FRONT (above the text, large).
// The layers start 120px above the section. Each leaf is a small div animated with
// element.animate() using transform (translate3d + rotate + scale) and opacity only.
import React, { useEffect, useRef } from 'react';
import { LEAF, LEAF_COLORS } from './TestimonialsTree';

const BAND = 120; // px above the section where leaves appear
const rand = (a, b) => a + Math.random() * (b - a);

function makeLeaf() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:absolute;top:0;left:0;width:16px;height:20px;will-change:transform,opacity;opacity:0';
  wrap.innerHTML = `<svg viewBox="-8 -18 16 20" width="16" height="20" style="display:block;overflow:visible"><path d="${LEAF}" fill="${
    LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
  }"/></svg>`;
  return wrap;
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
    const id = setInterval(() => {
      const section = sectionRef.current;
      const back = backRef.current;
      const front = frontRef.current;
      if (!section || !back || !front) return;
      if (Date.now() - lastMove.current <= 1000) return;
      const max = window.innerWidth < 768 ? 6 : 14;
      if (back.childElementCount + front.childElementCount >= max) return;

      const W = section.clientWidth;
      const Hs = section.clientHeight;
      const near = Math.random() < 0.4;
      const sc = near ? rand(1.3, 1.8) : rand(0.55, 0.9);
      const op = near ? 1 : 0.55;
      const dur = (near ? rand(6.5, 9) : rand(8.5, 11)) * 1000;
      const x = rand(0.1, 0.95) * W;
      const y = rand(0, 40);
      const dx = rand(-80, 80);
      const dy = rand(0.65, 0.95) * Hs;
      const rt = rand(-300, 300);
      const leaf = makeLeaf();
      (near ? front : back).appendChild(leaf);

      const at = (o, yf, xo, opacity) => ({
        offset: o,
        opacity,
        easing: 'ease-in-out',
        transform: `translate3d(${(x + dx * o + xo).toFixed(1)}px, ${(y + dy * yf).toFixed(1)}px, 0) rotate(${(rt * o).toFixed(0)}deg) scale(${sc.toFixed(2)})`,
      });
      const anim = leaf.animate(
        [
          at(0, 0, 0, 0),
          at(0.1, 0.12, 0, op),
          at(0.3, 0.32, 30, op),
          at(0.42, 0.27, 30, op), // lifts up on the breeze
          at(0.62, 0.55, -30, op),
          at(0.74, 0.5, -30, op), // lifts again
          at(0.92, 0.9, 0, op),
          at(1, 1, 0, 0),
        ],
        { duration: dur, fill: 'forwards' }
      );
      anim.onfinish = () => leaf.remove();
    }, 1500);
    return () => clearInterval(id);
  }, [enabled, sectionRef]);

  const layer = { position: 'absolute', left: 0, right: 0, bottom: 0, top: -BAND, pointerEvents: 'none' };
  return (
    <>
      <div ref={backRef} aria-hidden="true" style={{ ...layer, zIndex: 4 }} />
      <div ref={frontRef} aria-hidden="true" style={{ ...layer, zIndex: 6 }} />
    </>
  );
}
