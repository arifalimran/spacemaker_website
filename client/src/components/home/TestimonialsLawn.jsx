// client/src/components/home/TestimonialsLawn.jsx
// Decorative lawn along the bottom of Testimonials (v3: light technique).
// Static blades, grouped into a few CHUNK divs per grass layer; the breeze is a CSS skewX on each
// chunk div (GPU-composited), delayed per chunk so the wave travels left -> right.
// Thickest under the tree (right), fading out to the left. Rebuilt on resize (debounced 200ms).
import React, { useEffect, useState } from 'react';

const LAYERS = [
  { c: ['#2F4A18', '#36531C', '#3E5C20'], h: 0.75, step: 1.1, sk: -3 },
  { c: ['#466B22', '#4F7726', '#58822B', '#4A6E25'], h: 0.9, step: 1.0, sk: -4.5 },
  { c: ['#5E8C2E', '#6A9A34', '#76A83C', '#83B444', '#9CC75A'], h: 1, step: 1.4, sk: -6 },
];

function buildLawn(W, mobile) {
  const H = mobile ? 40 : 56;
  const CHUNKS = mobile ? 5 : 10;
  const layers = mobile ? LAYERS.slice(1) : LAYERS;
  const cw = W / CHUNKS;
  let s = 7;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out = [];
  layers.forEach((Ly, li) => {
    for (let ci = 0; ci < CHUNKS; ci++) {
      const x0 = ci * cw;
      const blades = [];
      for (let x = 0; x < cw; x += Ly.step * (0.6 + r() * 0.8)) {
        const f = (x0 + x) / W;
        const fade = Math.min(1, Math.pow(f, 1.5) * 1.5);
        if (fade < 0.04 || r() > 0.35 + fade * 0.65) continue;
        const h = (14 + r() * 22) * Ly.h * (0.45 + fade * 0.75) * (H / 80) + (f > 0.78 ? r() * 12 * (H / 80) : 0);
        const lean = (r() - 0.4) * h * 0.35;
        const w = 0.55 + r() * 0.6;
        blades.push({
          d: `M${(x - w).toFixed(1)} ${H} Q${(x + lean * 0.25).toFixed(1)} ${(H - h * 0.55).toFixed(1)} ${(x + lean).toFixed(1)} ${(H - h).toFixed(1)} Q${(x + lean * 0.25 + w * 0.4).toFixed(1)} ${(H - h * 0.5).toFixed(1)} ${(x + w).toFixed(1)} ${H}Z`,
          fill: Ly.c[Math.floor(r() * Ly.c.length)],
          op: (0.15 + fade * 0.85).toFixed(2),
        });
      }
      if (!blades.length) continue;
      out.push({
        key: `${li}-${ci}`,
        left: x0,
        width: cw,
        sk: `${Ly.sk}deg`,
        delay: `${-((CHUNKS - ci) * 0.28 + li * 0.15).toFixed(2)}s`,
        blades,
      });
    }
  });
  return { H, chunks: out };
}

export default function TestimonialsLawn({ sectionRef }) {
  const [lawn, setLawn] = useState({ H: 56, chunks: [] });

  useEffect(() => {
    const build = () => {
      const section = sectionRef.current;
      if (!section) return;
      const W = Math.max(1, Math.round(section.clientWidth || window.innerWidth));
      setLawn(buildLawn(W, window.innerWidth < 768));
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

  return (
    <div className="sm-lawn" aria-hidden="true" style={{ height: lawn.H }}>
      {lawn.chunks.map((c) => (
        <div
          key={c.key}
          className="sm-grass"
          style={{ left: c.left, width: c.width, height: lawn.H, '--sk': c.sk, animationDelay: c.delay }}
        >
          <svg width={c.width} height={lawn.H} viewBox={`0 0 ${c.width} ${lawn.H}`} overflow="visible" style={{ display: 'block' }}>
            {c.blades.map((b, k) => (
              <path key={k} d={b.d} fill={b.fill} fillOpacity={b.op} />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
