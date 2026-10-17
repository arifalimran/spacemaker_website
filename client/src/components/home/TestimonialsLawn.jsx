// client/src/components/home/TestimonialsLawn.jsx
// Decorative lawn along the bottom of Testimonials: thickest under the tree (right), fading out
// to the left. Built from the section width; rebuilt on resize (debounced 200ms).
// Breeze = SMIL skewX per segment; paused with svg.pauseAnimations() when `running` is false.
import React, { useEffect, useRef } from 'react';
import { svgEl as el } from './TestimonialsTree';

const LAYERS = [
  { c: ['#2F4A18', '#36531C', '#3E5C20'], h: 0.75, step: 1.1, sk: 5, op: 0.95 },
  { c: ['#466B22', '#4F7726', '#58822B', '#4A6E25'], h: 0.9, step: 1.0, sk: 7, op: 1 },
  { c: ['#5E8C2E', '#6A9A34', '#76A83C', '#83B444', '#9CC75A'], h: 1, step: 1.4, sk: 9, op: 1 },
];

function buildLawn(svg, W, H, mobile) {
  svg.replaceChildren();
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  let gs = 7;
  const gr = () => {
    gs = (gs * 9301 + 49297) % 233280;
    return gs / 233280;
  };
  const SEG = mobile ? 30 : 22;
  const dur = 3.4;
  const layers = mobile ? LAYERS.slice(1) : LAYERS; // mobile: only the 2 front layers
  svg.appendChild(el('rect', { x: 0, y: H - 6, width: W, height: 6, fill: '#2F4A18', opacity: 0.35 }));
  layers.forEach((Ly, li) => {
    for (let x0 = 0; x0 < W; x0 += SEG) {
      const f = (x0 + SEG / 2) / W;
      const fade = Math.min(1, Math.pow(f, 1.5) * 1.5);
      if (fade < 0.04) continue;
      const outer = el('g', { transform: `translate(${x0} ${H})`, opacity: (Ly.op * (0.15 + fade * 0.85)).toFixed(2) });
      const inner = el('g', {});
      outer.appendChild(inner);
      const a = Ly.sk * (0.6 + fade * 0.5);
      inner.appendChild(
        el('animateTransform', {
          attributeName: 'transform',
          type: 'skewX',
          values: `${(-a * 0.25).toFixed(1)};${a.toFixed(1)};${(-a * 0.25).toFixed(1)}`,
          dur: dur + 's',
          begin: (-(1 - f) * dur * 1.8 - li * 0.15).toFixed(2) + 's',
          repeatCount: 'indefinite',
          calcMode: 'spline',
          keySplines: '.45 0 .55 1;.45 0 .55 1',
        })
      );
      for (let x = 0; x < SEG; x += Ly.step * (0.6 + gr() * 0.8)) {
        if (gr() > 0.35 + fade * 0.65) continue;
        const base = (14 + gr() * 22) * Ly.h;
        const h = base * (0.45 + fade * 0.75) + (f > 0.78 ? gr() * 16 : 0);
        const lean = (gr() - 0.4) * h * 0.35;
        const w = 0.55 + gr() * 0.6;
        const c = Ly.c[Math.floor(gr() * Ly.c.length)];
        inner.appendChild(
          el('path', {
            d: `M${(x - w).toFixed(1)} 0 Q${(x + lean * 0.25).toFixed(1)} ${(-h * 0.55).toFixed(1)} ${(x + lean).toFixed(1)} ${(-h).toFixed(1)} Q${(x + lean * 0.25 + w * 0.4).toFixed(1)} ${(-h * 0.5).toFixed(1)} ${(x + w).toFixed(1)} 0Z`,
            fill: c,
          })
        );
      }
      svg.appendChild(outer);
    }
  });
}

export default function TestimonialsLawn({ sectionRef, running, reduce }) {
  const ref = useRef(null);
  const live = useRef(running && !reduce);
  live.current = running && !reduce;

  useEffect(() => {
    const svg = ref.current;
    const section = sectionRef.current;
    if (!svg || !section) return undefined;
    const build = () => {
      const mobile = window.innerWidth < 768;
      const W = Math.max(1, Math.round(section.clientWidth));
      buildLawn(svg, W, mobile ? 56 : 80, mobile);
      if (!live.current) svg.pauseAnimations?.();
    };
    build();
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [sectionRef]);

  useEffect(() => {
    const svg = ref.current;
    if (!svg?.pauseAnimations) return;
    if (running && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [running, reduce]);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 z-[3] h-[56px] w-full md:h-[80px]"
    />
  );
}
