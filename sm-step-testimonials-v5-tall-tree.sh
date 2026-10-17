#!/bin/bash
# Space Maker — Testimonials v5: tall umbrella tree, fluttering leaf clusters,
# leaves falling FROM the tree (70%) + from the top (30%), scroll jank fix.
# Changes ONLY the Testimonials decorative files. Text, photos, highlight, glow, grass, fonts, spacing stay.
# Run:  ! bash "/Users/mac/Space Maker/sm-step-testimonials-v5-tall-tree.sh"
# Then paste the copied prompt into a NEW Claude Code session in the folder.

cd "/Users/mac/Space Maker/spacemaker_website" || { echo "Folder not found"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "ui-final-16oct" ]; then
  echo "You are on '$BRANCH'. Switch first:  git checkout ui-final-16oct"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes (Testimonials v4)."
  echo "Save them first:  git add -A && git commit -m \"Testimonials v4\""
  echo "Then run this script again."
  exit 1
fi

TAG="backup-before-testimonials-v5-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG" && echo "Safety tag created: $TAG"

cat <<'PROMPT' | pbcopy
Task: Testimonials v5 — taller "umbrella" tree, leaves that flutter, leaves falling from the tree toward the testimonials, and remove scroll jank. Work precisely; do NOT scan the codebase. Open only TestimonialsTree.jsx, TestimonialsFallingLeaves.jsx, TestimonialsLawn.jsx and Testimonials.jsx (same folder as Why Choose Us).

DO NOT CHANGE: heading/intro/quotes text, fonts, photos, ring, lime bar, highlight, golden glow, colours, spacing, the bottom pale-lime blend, any other section or global file. No SMIL, no svg.pauseAnimations(), no CSS blur/backdrop-filter/blend modes, no filter/drop-shadow/mask on the tree, leaves, lawn or falling leaves.

=== 1) TREE GEOMETRY (rewrite buildTree in TestimonialsTree.jsx) ===
Shape: trunk from the bottom-right corner, tall, leaning slightly left; slim lower part; wide canopy at the top spreading LEFT into the empty space beside the intro text (never over text). Deterministic generator (useMemo):

  function buildTree(isMobile){
    let s=31; const r=()=>{s=(s*9301+49297)%233280; return s/233280};
    const G=['#5C6E0A','#6E8F2E','#7FA34A','#9DB83A','#4F7726','#C6F00C','#6A9A34'], Y=['#D9A441','#C47A2C','#E2B85C'];
    const col=()=> r()<.7 ? G[Math.floor(r()*G.length)] : Y[Math.floor(r()*Y.length)];
    const rad=a=>a*Math.PI/180, groups=[];
    const ng=(parent,px,py,kind)=>{ groups.push({id:groups.length,parent,px,py,kind,wood:[],leaves:[]}); return groups.length-1; };
    const seg=(gid,x,y,ang,len,w,c)=>{ const ex=x+Math.sin(rad(ang))*len, ey=y-Math.cos(rad(ang))*len;
      const b=(r()-.5)*len*.22, mx=(x+ex)/2+Math.cos(rad(ang))*b, my=(y+ey)/2+Math.sin(rad(ang))*b;
      groups[gid].wood.push({d:`M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,w,c}); return [ex,ey]; };
    const leaf=(gid,x,y,rot,sc)=>groups[gid].leaves.push({x,y,rot,sc,c:col(),o:.8+r()*.2});
    const MAX=isMobile?3:4;
    function br(x,y,ang,len,d,w,gid){
      if(d===MAX) gid=ng(gid,x,y,'branch'); else if(d===MAX-1) gid=ng(gid,x,y,'sub'); else if(d===1) gid=ng(gid,x,y,'cluster');
      const [ex,ey]=seg(gid,x,y,ang,len,w,d>2?'#5A4334':'#6B5140');
      if(d<=1){ for(let k=0;k<3;k++){ const t=.3+r()*.6; leaf(gid,x+(ex-x)*t,y+(ey-y)*t,ang+(r()>.5?1:-1)*(35+r()*45),.6+r()*.35); } }
      if(d===0){ for(let k=0;k<6;k++) leaf(gid,ex+(r()-.5)*10,ey+(r()-.5)*10,ang+(r()-.5)*160,.65+r()*.35); return; }
      const nl=len*(.68+r()*.1), nw=w*.65;
      br(ex,ey,ang-(16+r()*14),nl,d-1,nw,gid);
      br(ex,ey,ang+(12+r()*14),nl*(.85+r()*.15),d-1,nw,gid);
      if(d>=2&&r()<.45) br(ex,ey,ang+(r()-.5)*12,nl*.8,d-1,nw*.85,gid);
    }
    const at=(a,b,t)=>[a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
    const T=ng(-1,560,800,'trunk'); const P0=[560,800];
    const P1=seg(T,560,800,-8,260,30,'#5A4334');
    const P2=seg(T,P1[0],P1[1],-18,180,22,'#5A4334');
    let p=at(P0,P1,.55); br(p[0],p[1],28,60,MAX-1,9,T);          // short middle branches (keep lower part slim)
    p=at(P0,P1,.78);      br(p[0],p[1],-38,75,MAX-1,9,T);
    p=at(P1,P2,.5);       br(p[0],p[1],-60,150,MAX,14,T);
    br(P2[0],P2[1],-72,230,MAX,16,T);                               // wide top canopy, spreading left
    br(P2[0],P2[1],-42,200,MAX,16,T);
    br(P2[0],P2[1],-12,170,MAX,15,T);
    br(P2[0],P2[1],22,120,MAX,13,T);
    return groups;
  }

- After building, compute the bounding box (bx,by,bw,bh) of ALL wood end/control points and leaves (+12 padding). Also keep a flat list of all leaf points (for falling leaves) and all geometry points (for the overlap check).
- Leaf drawing (unchanged look): <g transform="translate(x y) rotate(rot) scale(sc)"><path d="M0,0 C4,-4 5,-11 0,-16 C-5,-11 -4,-4 0,0Z" fill={c} opacity={o}/><path d="M0,-1 L0,-14" stroke="rgba(255,255,255,.35)" strokeWidth=".5" fill="none"/></g>

=== 2) TREE SIZE & POSITION (desktop lg+) — measured, not fixed ===
- Measure with refs + ResizeObserver on the section (recompute on resize, debounced 150ms):
  introTop = top of the intro paragraph relative to the section; introRight = right edge of the intro paragraph; testiTop/testiRight = top and right edge of the THIRD testimonial; secW/secH = section size.
- Scale: s = min( (secH - 18 - introTop) / bh , (secW - introRight - 24) / bw ).
  Place the tree box so its right edge = section right (0px) and its bottom = section bottom - 18px (trunk base sits in the grass). Box size = bw*s x bh*s, viewBox = "bx by bw bh".
- Overlap guard: any geometry point whose section-y is below testiTop - 16 must have section-x >= testiRight + 24. While this fails, multiply s by 0.95 and re-place (max 15 steps).
- Tablet (768–1023): fixed height 340px, opacity .45, bottom-right, behind content. Mobile (<768): fixed height 240px, opacity .35. Skip the measuring logic there.

=== 3) LAYERS — hierarchical, SMALL painted layers (performance) ===
- Render groups recursively. Each non-trunk group = a CONTAINER div (position:absolute; inset:0 of the tree box; NO background, NO content of its own except the two items below; transform-origin = its pivot (px,py) converted to % of the tree box) containing:
  (a) one small "paint" div positioned at that group's OWN bounding box (in % of the tree box) holding an <svg> whose viewBox is that bbox, with only that group's wood + leaves;
  (b) its child group containers.
  So painted bitmaps are small; empty containers cost almost nothing.
- Trunk group: not animated.
- Sway (CSS on containers): @keyframes smSway{0%,100%{transform:rotate(calc(var(--a)*-1))}50%{transform:rotate(var(--a))}}
  branch: --a 1deg, 5–6.5s · sub: --a 1.6deg, 3.8–4.8s. Delay = -(px/600)*1.6s - level*0.3s (breeze passes left -> right).
- Leaf clusters ('cluster' groups) = the leaves blowing: the cluster's paint div itself animates (no container needed):
  @keyframes smFlutter{0%{transform:rotate(-7deg) translateY(0)}100%{transform:rotate(7deg) translateY(-1px)}}
  duration 1.2–2.2s (seeded random), random negative delay, alternate, infinite, transform-origin = the twig's base point in % of the cluster box. This makes the whole canopy shimmer.
- Remove the old "12 flutter leaves" logic (clusters replace it).
- will-change: transform ONLY on animated containers/clusters. Max ~70 animated elements desktop, ~25 mobile (mobile uses MAX=3).
- Tree wrapper: contain: layout style (NOT paint, so nothing is clipped).

=== 4) FALLING LEAVES (TestimonialsFallingLeaves.jsx) ===
- Keep: two layers BACK (below text) / FRONT (above text), top:-120px, in-view IntersectionObserver threshold 0, lastMove on window scroll/wheel/touchmove (passive), setInterval 1500ms -> drop() when in view and still > 1000ms, max 14 live (6 mobile), near/far scale+opacity, leaf with vein, remove on finish, WAAPI with translate3d/rotate/scale/opacity only.
- NEW: 70% of drops start FROM THE TREE, 30% from the top (existing top path).
  Tree start: pick a random leaf point from the tree's flat leaf list and convert to section coordinates (box left + (vx-bx)*s, box top + (vy-by)*s, +120 for the layer offset). Desktop only; on tablet/mobile all leaves use the top path.
  Tree path (slow drift left and down toward the testimonials / bottom-left edge):
    dx = -(0.35 + Math.random()*0.35) * startX   (moves left)
    dy = (secH + 120 - startY) * (0.75 + Math.random()*0.2)   (moves down toward the bottom)
    rt = (Math.random()-.5)*500, t = (near ? 9000 : 11000) + Math.random()*3000
    keyframes (same lift pattern as the top path):
    f(0,0,0,0,0) f(.08,dy*.06,dx*.08,rt*.08,op) f(.3,dy*.28,dx*.3,rt*.3,op) f(.42,dy*.24,dx*.42,rt*.42,op) f(.62,dy*.55,dx*.62,rt*.62,op) f(.74,dy*.5,dx*.74,rt*.74,op) f(.9,dy*.88,dx*.9,rt*.9,op) f(1,dy,dx,rt,0)
  Top path: unchanged from v4.

=== 5) SCROLL JANK FIX ===
- While the page is actively scrolling (any scroll event, until 200ms after the last one), add class .sm-scrolling on the section that sets animation-play-state: paused on tree containers, clusters and grass chunks; remove it after 200ms of no scrolling. (Falling leaves already in flight keep going.) Use one passive scroll listener + one timeout; no state updates per scroll event (toggle the class directly on the DOM node via ref, not React state).
- Out-of-view pause class stays as in v4.
- Lawn: reduce CHUNKS to 8 desktop / 4 mobile; will-change only on the chunk divs.
- Golden glow: keep translate3d; make sure mousemove is rAF-throttled and does not trigger React re-renders (write style directly via ref).
- Highlight: hover/active state may use React state, but nothing in the section may re-render on scroll or mousemove.
- Remove any leftover v3/v4 code paths (sheet layers, full-size painted layers, 12 flutter leaves).

CHECK BEFORE FINISHING
- grep Testimonials files: no "animateTransform", "<animate", "pauseAnimations", no "filter:" except the client photo grayscale.
- At 1280px and 1440px: tree top is level with the intro paragraph, canopy spreads left beside the intro text, nothing overlaps any text, third testimonial clear of the tree.
- List every file changed with a one-line note. Do not commit, do not push. Owner checks with: cd client && npm run dev (Safari + Chrome).
PROMPT

echo "Prompt copied. Open a NEW Claude Code session in the folder, paste (Cmd+V), Enter."
echo "Check with: cd client && npm run dev"
echo "Undo if needed: git reset --hard $TAG"
