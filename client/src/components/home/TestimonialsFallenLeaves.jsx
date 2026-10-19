// client/src/components/home/TestimonialsFallenLeaves.jsx
// A few leaves lying where they landed, bottom-right of Testimonials (desktop only).
// Static SVG, fixed seed, same leaf shape and colours as the tree. CSS (.sm-fallen) is in Testimonials.jsx.
import React, { useMemo } from 'react';
import { LEAF, VEIN, leafColor } from './TestimonialsTree';

function build() {
  let s = 77;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out = [];
  for (let i = 0; i < 20; i++) {
    const t = r();
    out.push({
      x: 20 + Math.pow(t, 0.8) * 200 + (r() - 0.5) * 16,
      y: 40 + r() * 100,
      rot: r() * 360,
      sc: 1.2 + r() * 0.8,
      sy: 0.6 + r() * 0.35,
      c: leafColor(r),
    });
  }
  return out;
}

export default function TestimonialsFallenLeaves() {
  const leaves = useMemo(build, []);
  return (
    <div className="sm-fallen" aria-hidden="true">
      <svg viewBox="0 0 230 160" width="100%" height="100%" overflow="visible" style={{ display: 'block' }}>
        {leaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(0)}) scale(${l.sc.toFixed(2)} ${(l.sc * l.sy).toFixed(2)})`}>
            <path d={LEAF} fill={l.c} />
            <path d={VEIN} stroke="rgba(255,255,255,.3)" strokeWidth=".45" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    </div>
  );
}
