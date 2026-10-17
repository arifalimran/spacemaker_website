// client/src/components/home/TestimonialsTree.jsx
// Decorative tree, bottom-right of Testimonials (v3: light technique).
// The tree DATA is generated once (deterministic seed, absolute coordinates) and drawn as STATIC
// SVGs in 4 stacked layers: wood, back leaves, mid leaves, front leaves. The breeze is CSS
// rotate on each layer's <div> (GPU-composited); 12 "live" leaves in the front layer are their
// own tiny divs with a CSS flutter. No SMIL, no per-path animation. CSS lives in Testimonials.jsx.
import React, { useMemo } from 'react';

export const LEAF = 'M0,0 C4,-4 5,-11 0,-16 C-5,-11 -4,-4 0,0Z';
export const LEAF_COLORS = ['#5C6E0A', '#6E8F2E', '#7FA34A', '#9DB83A', '#4F7726', '#C6F00C', '#6A9A34', '#D9A441', '#C47A2C', '#E2B85C'];

function buildTree(isMobile) {
  let s = 23;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const G = ['#5C6E0A', '#6E8F2E', '#7FA34A', '#9DB83A', '#4F7726', '#C6F00C', '#6A9A34'];
  const Y = ['#D9A441', '#C47A2C', '#E2B85C'];
  const col = () => (r() < 0.7 ? G[Math.floor(r() * G.length)] : Y[Math.floor(r() * Y.length)]);
  const rad = (a) => (a * Math.PI) / 180;
  const wood = [];
  const leaves = [];
  const addLeaf = (x, y, rot, sc) => {
    const k = r();
    leaves.push({ x, y, rot, sc, c: col(), o: 0.75 + r() * 0.25, layer: k < 0.35 ? 0 : k < 0.68 ? 1 : 2 });
  };
  function br(x, y, ang, len, d, w) {
    const ex = x + Math.sin(rad(ang)) * len;
    const ey = y - Math.cos(rad(ang)) * len;
    const bend = (r() - 0.5) * len * 0.25;
    const mx = (x + ex) / 2 + Math.cos(rad(ang)) * bend;
    const my = (y + ey) / 2 + Math.sin(rad(ang)) * bend;
    wood.push({
      d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      w,
      c: d > 3 ? '#5A4334' : '#6B5140',
    });
    if (d <= 2) {
      for (let k = 0; k < 2; k++) {
        const t = 0.35 + r() * 0.5;
        addLeaf(x + (ex - x) * t, y + (ey - y) * t, ang + (r() > 0.5 ? 1 : -1) * (35 + r() * 40), 0.75 + r() * 0.3);
      }
    }
    if (d === 0) {
      for (let k = 0; k < 4; k++) addLeaf(ex + (r() - 0.5) * 8, ey + (r() - 0.5) * 8, ang + (r() - 0.5) * 150, 0.8 + r() * 0.4);
      return;
    }
    const nl = len * (0.7 + r() * 0.1);
    const nw = w * 0.66;
    br(ex, ey, ang - (14 + r() * 12), nl, d - 1, nw);
    br(ex, ey, ang + (10 + r() * 12), nl * (0.85 + r() * 0.15), d - 1, nw);
    if (d >= 3 && r() < 0.4) br(ex, ey, ang + (r() - 0.5) * 10, nl * 0.75, d - 1, nw * 0.85);
    if (d >= 5) {
      [0.45, 0.7].forEach((t, i) =>
        br(x + (ex - x) * t, y + (ey - y) * t, ang + (i % 2 ? 1 : -1) * (40 + r() * 15), 24 + r() * 10, 2, w * 0.35)
      );
    }
  }
  br(292, 440, -12, 110, isMobile ? 5 : 6, 22);
  return { wood, leaves };
}

const leafTransform = (l) => `translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(0)}) scale(${l.sc.toFixed(2)})`;

/* the breeze per layer: amplitude, duration, delay */
const SWAY = [
  { a: '0.5deg', d: '5.6s', dl: '-1s' }, // wood
  { a: '0.6deg', d: '6.4s', dl: '-2s' }, // back leaves
  { a: '0.9deg', d: '5.2s', dl: '-0.5s' }, // mid leaves
  { a: '1.3deg', d: '4.4s', dl: '-3s' }, // front leaves
];

function Layer({ i, children, extra }) {
  const sw = SWAY[i];
  return (
    <div className="sm-sway" style={{ '--a': sw.a, animationDuration: sw.d, animationDelay: sw.dl }}>
      <svg viewBox="0 0 320 440" width="100%" height="100%" overflow="visible" style={{ display: 'block' }}>
        {children}
      </svg>
      {extra}
    </div>
  );
}

export default function TestimonialsTree() {
  const { wood, leaves, live } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const t = buildTree(isMobile);
    const front = t.leaves.filter((l) => l.layer === 2);
    const n = Math.max(1, Math.floor(front.length / 12));
    const liveSet = new Set(front.filter((_, k) => k % n === 0).slice(0, 12));
    // a fixed pseudo-random duration/delay per live leaf (deterministic)
    let s = 41;
    const r = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const liveList = [...liveSet].map((l) => ({ ...l, dur: (1.4 + r() * 1.6).toFixed(2), delay: (-r() * 3).toFixed(2) }));
    return { wood: t.wood, leaves: t.leaves.filter((l) => !liveSet.has(l)), live: liveList };
  }, []);

  const leafPaths = (layer) =>
    leaves
      .filter((l) => l.layer === layer)
      .map((l, k) => <path key={k} d={LEAF} fill={l.c} opacity={l.o} transform={leafTransform(l)} />);

  return (
    <div className="sm-tree" aria-hidden="true">
      <Layer i={0}>
        {wood.map((w, k) => (
          <path key={k} d={w.d} fill="none" stroke={w.c} strokeWidth={w.w} strokeLinecap="round" />
        ))}
      </Layer>
      <Layer i={1}>{leafPaths(0)}</Layer>
      <Layer i={2}>{leafPaths(1)}</Layer>
      <Layer
        i={3}
        extra={live.map((l, k) => (
          // a 16x20-unit box whose point (8,18) is the leaf base; it sits on (x, y) of the tree
          <div
            key={`live-${k}`}
            className="sm-live-leaf"
            style={{
              left: `${(((l.x - 8) / 320) * 100).toFixed(3)}%`,
              top: `${(((l.y - 18) / 440) * 100).toFixed(3)}%`,
              width: `${((16 / 320) * 100).toFixed(3)}%`,
              height: `${((20 / 440) * 100).toFixed(3)}%`,
            }}
          >
            <div className="sm-flutter" style={{ animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }}>
              <svg viewBox="-8 -18 16 20" width="100%" height="100%" overflow="visible" style={{ display: 'block' }}>
                <path d={LEAF} fill={l.c} opacity={l.o} transform={`rotate(${l.rot.toFixed(0)}) scale(${l.sc.toFixed(2)})`} />
              </svg>
            </div>
          </div>
        ))}
      >
        {leafPaths(2)}
      </Layer>
    </div>
  );
}
