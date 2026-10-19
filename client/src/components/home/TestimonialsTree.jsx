// client/src/components/home/TestimonialsTree.jsx
// Decorative tree, bottom-right of Testimonials (v4: natural branch groups).
// The tree data is generated once (deterministic seed) into GROUPS: trunk (static) -> main branches
// -> sub-branches -> small side branches. Each group is a nested <div> holding its own static SVG
// (its wood + its leaves) and its child groups, and sways from its own joint with a CSS rotate,
// so twigs and leaves move WITH their branch and the trunk never moves. 12 leaves on the small
// branches flutter on their own (tiny divs inside their branch). CSS lives in Testimonials.jsx.
// No SMIL, no per-path animation: only transform on <div> wrappers.
import React, { useMemo } from 'react';

export const LEAF = 'M0,0 C3.2,-2.2 6.2,-7.5 4.6,-12.2 C3.6,-14.6 1.6,-16.4 0.3,-18 C-1.3,-16.2 -3.8,-14.6 -4.9,-11.6 C-6.1,-7.4 -3.6,-2.4 0,0Z';
export const VEIN = 'M0,-0.5 Q0.5,-9 0.3,-16.4 M0.1,-4.2 L3.6,-7.4 M0.1,-4.2 L-3.2,-7.2 M0.3,-8.6 L4,-11.6 M0.3,-8.6 L-3.8,-11.4 M0.3,-12.4 L2.4,-14.2 M0.3,-12.4 L-2.6,-14';
export const LEAF_GREENS = ['#5C6E0A', '#6E8F2E', '#7FA34A', '#9DB83A', '#4F7726', '#C6F00C', '#6A9A34'];
export const LEAF_GOLDS = ['#D9A441', '#C47A2C', '#E2B85C'];
export const leafColor = (rnd = Math.random) =>
  rnd() < 0.7 ? LEAF_GREENS[Math.floor(rnd() * LEAF_GREENS.length)] : LEAF_GOLDS[Math.floor(rnd() * LEAF_GOLDS.length)];

function buildTree(isMobile, wide) {
  let s = 23;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const col = () => leafColor(r);
  const rad = (a) => (a * Math.PI) / 180;
  const groups = [];
  const newGroup = (parent, px, py, level) => {
    groups.push({ id: groups.length, parent, px, py, level, wood: [], leaves: [] });
    return groups.length - 1;
  };
  const TOP = isMobile ? 5 : 6;
  const root = newGroup(-1, 292, 440, 0); // trunk group: static
  const addLeaf = (gid, x, y, rot, sc) => groups[gid].leaves.push({ x, y, rot, sc, c: col(), o: 0.8 + r() * 0.2 });
  function br(x, y, ang, len, d, w, gid) {
    if (d === TOP - 1) gid = newGroup(gid, x, y, 1); // main branches
    else if (d === TOP - 2) gid = newGroup(gid, x, y, 2); // sub-branches
    const g = groups[gid];
    const ex = x + Math.sin(rad(ang)) * len;
    const ey = y - Math.cos(rad(ang)) * len;
    const bend = (r() - 0.5) * len * 0.25;
    const mx = (x + ex) / 2 + Math.cos(rad(ang)) * bend;
    const my = (y + ey) / 2 + Math.sin(rad(ang)) * bend;
    g.wood.push({
      d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      w,
      c: d > 3 ? '#5A4334' : '#6B5140',
    });
    if (d <= 2) {
      for (let k = 0; k < 3; k++) {
        const t = 0.3 + r() * 0.6;
        addLeaf(gid, x + (ex - x) * t, y + (ey - y) * t, ang + (r() > 0.5 ? 1 : -1) * (35 + r() * 45), 0.55 + r() * 0.35);
      }
    }
    if (d === 0) {
      for (let k = 0; k < 6; k++) addLeaf(gid, ex + (r() - 0.5) * 9, ey + (r() - 0.5) * 9, ang + (r() - 0.5) * 160, 0.6 + r() * 0.35);
      return;
    }
    const nl = len * (0.7 + r() * 0.1);
    const nw = w * 0.66;
    br(ex, ey, ang - (14 + r() * 12), nl, d - 1, nw, gid);
    br(ex, ey, ang + (10 + r() * 12), nl * (0.85 + r() * 0.15), d - 1, nw, gid);
    if (d >= 3 && r() < 0.4) br(ex, ey, ang + (r() - 0.5) * 10, nl * 0.75, d - 1, nw * 0.85, gid);
    if (d >= TOP - 1) {
      [0.45, 0.7].forEach((t, i) => {
        const sx = x + (ex - x) * t;
        const sy = y + (ey - y) * t;
        const sg = newGroup(gid, sx, sy, 3);
        br(sx, sy, ang + (i % 2 ? 1 : -1) * (40 + r() * 15), 24 + r() * 10, 2, w * 0.35, sg);
      });
    }
  }
  br(292, 440, -12, 110, TOP, 22, root);

  // ---- additions (made AFTER the original tree, so the seeded sequence above is untouched) ----
  // (desktop only: on tablet/mobile the tree sits at the top of the section and keeps its short trunk)
  const base = groups.length;
  if (wide) {
    // desktop: no trunk at all. The crown is one big canopy entering from the right edge (the trunk wood is hidden;
    // the CSS places the joint on the edge, leans the whole canopy to the left and blows it gently).
    groups[0].wood = [];
    // a few more branches in the upper crown: mostly on the right, one or two on the left, to widen the top.
    // (added after the lower tier, so the tier above keeps its exact shape)
    const spawn = (px, py, ang, len, w, d) => {
      let best = null;
      let bd = 1e9;
      groups.forEach((g, gi) => {
        if (gi === 0 || gi >= base) return;
        g.wood.forEach((wd) => {
          const m = wd.d.match(/-?[\d.]+/g).map(Number);
          const dd = Math.hypot(m[4] - px, m[5] - py);
          if (dd < bd) {
            bd = dd;
            best = { gi, x: m[4], y: m[5] };
          }
        });
      });
      const gid = newGroup(best.gi, best.x, best.y, 3);
      br(best.x, best.y, ang, len, d, w, gid);
    };
    // fuller crown: right side first, then the left (all rising like the existing branches)
    spawn(306, 211, 75, 28, 3.0, TOP - 4);
    spawn(284, 260, 60, 34, 3.0, TOP - 4);
    spawn(303, 186, 75, 34, 3.0, TOP - 3);
    spawn(316, 266, 75, 28, 3.0, TOP - 3);
    spawn(302, 244, 30, 34, 3.0, TOP - 4);
    spawn(70, 155, -60, 34, 2.6, TOP - 3);
    spawn(175, 148, -60, 28, 2.6, TOP - 4);
    spawn(125, 198, -60, 40, 2.6, TOP - 3);
    spawn(57, 160, -30, 34, 2.6, TOP - 4);
    spawn(93, 180, -45, 40, 2.6, TOP - 4);
  }
  groups.forEach((g, gi) => {
    if (gi >= base) g.extra = true;
  });
  return groups;
}

/* sway per level: amplitude + duration range */
const LEVEL = {
  1: { a: 1.1, d: [5, 6] },
  2: { a: 1.8, d: [3.6, 4.6] },
  3: { a: 2.4, d: [3, 4] },
};

const pct = (v, total) => `${((v / total) * 100).toFixed(3)}%`;

function Leaf({ l, place = true }) {
  const t = `${place ? `translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) ` : ''}rotate(${l.rot.toFixed(0)}) scale(${l.sc.toFixed(2)})`;
  return (
    <g transform={t}>
      <path d={LEAF} fill={l.c} opacity={l.o} />
      <path d={VEIN} stroke="rgba(255,255,255,.35)" strokeWidth=".45" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Group({ g, kids, live }) {
  const art = (
    <svg viewBox="0 0 320 440" width="100%" height="100%" overflow="visible" aria-hidden="true" style={{ display: 'block', position: 'absolute', inset: 0 }}>
      {g.wood.map((w, k) => (
        <path key={`w${k}`} d={w.d} fill="none" stroke={w.c} strokeWidth={w.w} strokeLinecap="round" />
      ))}
      {g.leaves.map((l, k) => (live.has(l) ? null : <Leaf key={`l${k}`} l={l} />))}
    </svg>
  );
  const flutter = g.leaves
    .filter((l) => live.has(l))
    .map((l, k) => {
      const f = live.get(l);
      return (
        // a 16x20-unit box whose point (8,18) is the leaf base, placed on (x, y) of the tree
        <div
          key={`f${k}`}
          className="sm-live-leaf"
          style={{ left: pct(l.x - 8, 320), top: pct(l.y - 18, 440), width: pct(16, 320), height: pct(20, 440) }}
        >
          <div className="sm-flutter" style={{ animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>
            <svg viewBox="-8 -18 16 20" width="100%" height="100%" overflow="visible" style={{ display: 'block' }}>
              <Leaf l={l} place={false} />
            </svg>
          </div>
        </div>
      );
    });
  const children = (kids.get(g.id) || []).map((c) => <Group key={c.id} g={c} kids={kids} live={live} />);

  if (g.level === 0) {
    return (
      <div className="sm-trunk">
        {art}
        {children}
      </div>
    );
  }
  return (
    <div
      className="sm-branch"
      style={{
        transformOrigin: `${pct(g.px, 320)} ${pct(g.py, 440)}`,
        '--a': `${LEVEL[g.level].a}deg`,
        '--dur': `${g.dur}s`,
        '--dl': `${g.dl}s`,
      }}
    >
      {art}
      {flutter}
      {children}
    </div>
  );
}

export default function TestimonialsTree() {
  const { root, kids, live } = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const wide = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const groups = buildTree(isMobile, wide);
    // seeded timing per group: breeze passes from left to right
    let s = 57;
    const r = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    // the original groups keep their exact timing draws; the added branches get their own generator
    const setTiming = (g, rnd) => {
      const [lo, hi] = LEVEL[g.level].d;
      g.dur = (lo + rnd() * (hi - lo)).toFixed(2);
      g.dl = (-(g.px / 320) * 1.6 - g.level * 0.3).toFixed(2);
    };
    groups.forEach((g) => {
      if (!g.level || g.extra) return;
      setTiming(g, r);
    });
    let s2 = 91;
    const r2 = () => {
      s2 = (s2 * 9301 + 49297) % 233280;
      return s2 / 233280;
    };
    groups.forEach((g) => {
      if (g.extra) setTiming(g, r2);
    });
    const k = new Map();
    groups.forEach((g) => {
      if (g.parent < 0) return;
      if (!k.has(g.parent)) k.set(g.parent, []);
      k.get(g.parent).push(g);
    });
    // 12 flutter leaves from level-2/3 groups, spread out (every Nth)
    const pool = groups.filter((g) => g.level >= 2 && !g.extra).flatMap((g) => g.leaves);
    const n = Math.max(1, Math.floor(pool.length / 12));
    const lv = new Map();
    pool
      .filter((_, i) => i % n === Math.floor(n / 2))
      .slice(0, 12)
      .forEach((l) => lv.set(l, { dur: (1.4 + r() * 1.6).toFixed(2), delay: (-r() * 3).toFixed(2) }));
    return { root: groups[0], kids: k, live: lv };
  }, []);

  return (
    <div className="sm-tree" aria-hidden="true">
      <div className="sm-lean">
        <Group g={root} kids={kids} live={live} />
      </div>
    </div>
  );
}
