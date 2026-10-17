// client/src/components/home/TestimonialsFallingLeaves.jsx
// Leaves drift down from over the bottom of Why Choose Us into Testimonials, but only while the
// visitor stands still: every 1.5s, if the section is in view and there has been no scroll for
// over 1s, one leaf starts. Scrolling stops NEW leaves; falling ones finish their path.
// Two layers: BACK (behind the text, small/faint/slow) and FRONT (above the text, large).
// The layers start 120px above the section. Web Animations API (transform + opacity only).
import React, { useEffect, useRef } from 'react';
import { LEAF_COLORS, LEAF_PATH } from './TestimonialsTree';

const BAND = 120; // px above the section where leaves appear
const rand = (a, b) => a + Math.random() * (b - a);

function makeLeaf(scale) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:absolute;top:0;left:0;width:16px;height:20px;will-change:transform,opacity;opacity:0';
  wrap.innerHTML = `<svg viewBox="-8 -18 16 20" width="16" height="20" style="display:block;overflow:visible"><path d="${LEAF_PATH}" fill="${
    LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
  }"/></svg>`;
  wrap.dataset.scale = scale;
  return wrap;
}

export default function TestimonialsFallingLeaves({ sectionRef, enabled }) {
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const lastScroll = useRef(0);

  // remember the last scroll time (always, so "standing still" is known when leaves turn on)
  useEffect(() => {
    lastScroll.current = performance.now();
    const onScroll = () => {
      lastScroll.current = performance.now();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = setInterval(() => {
      const section = sectionRef.current;
      const back = backRef.current;
      const front = frontRef.current;
      if (!section || !back || !front) return;
      if (performance.now() - lastScroll.current <= 1000) return;
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
      const leaf = makeLeaf(sc);
      (near ? front : back).appendChild(leaf);

      const at = (o, yf, xo, opacity) => ({
        offset: o,
        opacity,
        easing: 'ease-in-out',
        transform: `translate(${(x + dx * o + xo).toFixed(1)}px, ${(y + dy * yf).toFixed(1)}px) rotate(${(rt * o).toFixed(0)}deg) scale(${sc.toFixed(2)})`,
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

  const layer = 'pointer-events-none absolute inset-x-0 bottom-0 overflow-visible';
  return (
    <>
      <div ref={backRef} aria-hidden="true" className={`${layer} z-[4]`} style={{ top: -BAND }} />
      <div ref={frontRef} aria-hidden="true" className={`${layer} z-[6]`} style={{ top: -BAND }} />
    </>
  );
}
