// client/src/components/home/TestimonialsTree.jsx
// Decorative tree in the bottom-right corner of Testimonials, swaying in a breeze.
// Built ONCE (deterministic seed, so it always looks like the approved preview) into an SVG.
// Sway = SMIL animateTransform on branch groups; leaf flutter = CSS (transform only).
// `running` false -> svg.pauseAnimations() + flutter paused (out of view / reduced motion).
import React, { useEffect, useRef } from 'react';

export const LEAF_COLORS = ['#C6F00C', '#9DB83A', '#5C6E0A', '#7FA34A', '#D9A441', '#C47A2C', '#E2B85C', '#6E8F2E'];
export const LEAF_PATH = 'M0,0 C4,-4 5,-11 0,-16 C-5,-11 -4,-4 0,0Z';
export const NS = 'http://www.w3.org/2000/svg';
export const svgEl = (t, a) => {
  const e = document.createElementNS(NS, t);
  for (const k in a) e.setAttribute(k, a[k]);
  return e;
};

/* flutter CSS shared by the tree (and paused with the section) */
export const FLUTTER_CSS = `
.sm-leaf-flutter{transform-box:fill-box;transform-origin:50% 100%;animation:smFlutter var(--d) ease-in-out var(--dl) infinite alternate}
@keyframes smFlutter{from{transform:rotate(calc(var(--a)*-1))}to{transform:rotate(var(--a))}}
.sm-deco-paused .sm-leaf-flutter{animation-play-state:paused}
.sm-deco-static .sm-leaf-flutter{animation:none}
`;

function buildTree(svg) {
  const C = LEAF_COLORS;
  const L = LEAF_PATH;
  const el = svgEl;
  let s = 23;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  function leaf(par, x, y, rot, sc, flut) {
    const h = el('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${sc.toFixed(2)})` });
    const p = el('path', { d: L, fill: C[Math.floor(r() * C.length)], opacity: (0.75 + r() * 0.25).toFixed(2) });
    if (flut) {
      p.setAttribute('class', 'sm-leaf-flutter');
      p.style.setProperty('--d', (1.4 + r() * 1.6).toFixed(2) + 's');
      p.style.setProperty('--dl', (-r() * 2).toFixed(2) + 's');
      p.style.setProperty('--a', (12 + r() * 16).toFixed(0) + 'deg');
    }
    h.appendChild(p);
    par.appendChild(h);
  }
  const mids = [];
  function br(par, len, ang, d, w) {
    const o = el('g', { transform: `rotate(${ang.toFixed(1)})` });
    par.appendChild(o);
    const sw = el('g');
    o.appendChild(sw);
    if (d <= 4) {
      const a = (5 - d) * 0.9 + 0.6;
      sw.appendChild(
        el('animateTransform', {
          attributeName: 'transform',
          type: 'rotate',
          values: `${-a} 0 0;${a} 0 0;${-a} 0 0`,
          dur: (3 + r() * 2.5).toFixed(2) + 's',
          begin: (-r() * 4).toFixed(2) + 's',
          repeatCount: 'indefinite',
          calcMode: 'spline',
          keySplines: '.45 0 .55 1;.45 0 .55 1',
        })
      );
    }
    const bend = (r() - 0.5) * len * 0.25;
    sw.appendChild(
      el('path', {
        d: `M0 0 Q${bend.toFixed(1)} ${(-len / 2).toFixed(1)} 0 ${(-len).toFixed(1)}`,
        stroke: d > 3 ? '#5A4334' : '#6B5140',
        'stroke-width': w.toFixed(1),
        fill: 'none',
        'stroke-linecap': 'round',
      })
    );
    if (d >= 5) mids.push({ sw, len, bend, d, w });
    if (d <= 2) {
      for (let k = 0; k < 3; k++) {
        const t = 0.35 + r() * 0.5;
        leaf(sw, (r() - 0.5) * 4, -len * t, (r() > 0.5 ? 1 : -1) * (35 + r() * 40), 0.75 + r() * 0.35, r() < 0.35);
      }
    }
    const n = el('g', { transform: `translate(0 ${(-len).toFixed(1)})` });
    sw.appendChild(n);
    if (d === 0) {
      for (let k = 0; k < 6; k++) leaf(n, (r() - 0.5) * 8, (r() - 0.5) * 8, (r() - 0.5) * 150, 0.8 + r() * 0.45, r() < 0.45);
      return;
    }
    const nl = len * (0.7 + r() * 0.1);
    const nw = w * 0.66;
    br(n, nl, -(20 + r() * 18), d - 1, nw);
    br(n, nl * (0.85 + r() * 0.15), 12 + r() * 16, d - 1, nw);
    if (d >= 3 && r() < 0.45) br(n, nl * 0.75, (r() - 0.5) * 14, d - 1, nw * 0.85);
  }

  const root = el('g', { transform: 'translate(292 440)' });
  svg.appendChild(root);
  br(root, 110, -16, 6, 24);
  s = 101; // extra middle branches so the middle/bottom of the tree is fuller
  mids.forEach((m) => {
    const ts = m.d === 6 ? [0.42, 0.6, 0.78] : [0.45, 0.75];
    ts.forEach((t, i) => {
      const x = 2 * t * (1 - t) * m.bend;
      const y = -m.len * t;
      const side = (i % 2 ? 1 : -1) * (m.d === 6 ? 1 : -1);
      const g = el('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` });
      m.sw.appendChild(g);
      br(g, (m.d === 6 ? 34 : 26) + r() * 14, side * (48 + r() * 18), m.d === 6 ? 3 : 2, m.w * 0.4);
    });
  });
}

export default function TestimonialsTree({ running, reduce }) {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    svg.replaceChildren(); // StrictMode runs effects twice: never draw the tree twice
    buildTree(svg);
  }, []);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !svg.pauseAnimations) return;
    if (running && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [running, reduce]);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 320 440"
      preserveAspectRatio="xMaxYMax meet"
      overflow="visible"
      className={`pointer-events-none absolute bottom-[26px] right-0 z-[2] h-[240px] w-[55%] opacity-[0.45] lg:h-[92%] lg:w-[40%] lg:opacity-100 ${
        reduce ? 'sm-deco-static' : running ? '' : 'sm-deco-paused'
      }`}
    />
  );
}
