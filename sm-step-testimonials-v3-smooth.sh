#!/bin/bash
# Space Maker — Testimonials v3: slimmer tree, right sizing, SMOOTH animation (GPU layers, no SMIL)
# Changes ONLY the Testimonials section files + testimonial sample quotes in siteContent.js.
# Run:  ! bash "/Users/mac/Space Maker/sm-step-testimonials-v3-smooth.sh"
# Then paste the copied prompt into a NEW Claude Code session in the folder.

cd "/Users/mac/Space Maker/spacemaker_website" || { echo "Folder not found"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "ui-final-16oct" ]; then
  echo "You are on '$BRANCH'. Switch first:  git checkout ui-final-16oct"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes (Testimonials v2)."
  echo "Save them first as a safe point:  git add -A && git commit -m \"Testimonials v2\""
  echo "Then run this script again."
  exit 1
fi

TAG="backup-before-testimonials-v3-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG" && echo "Safety tag created: $TAG"

cat <<'PROMPT' | pbcopy
Task: Testimonials v3 — fix size and performance. The current version (v2) has a tree that is far too big, scroll jank in Safari, and the breeze / grass / falling-leaf animations do not run. Rebuild the decorative parts with a lighter technique. Change ONLY the Testimonials section.

STRICT RULES
- Branch ui-final-16oct. Do NOT scan the whole codebase. Open only: Testimonials.jsx and its helper files created in v2 (TestimonialsTree.jsx, TestimonialsLawn.jsx, TestimonialsFallingLeaves.jsx — same folder as Why Choose Us), and client/src/data/siteContent.js.
- Do NOT touch Why Choose Us, Partner with us, Footer, nav, fonts, other sections or the homepage order.
- NO SMIL (<animateTransform>/<animate>) anywhere and NO svg.pauseAnimations(). Remove all of it from v2.
- Animate ONLY CSS transform and opacity on HTML <div> wrappers (GPU-composited), never on individual SVG paths, except the small flutter leaves described below (each is its own tiny div).
- No CSS blur/backdrop-filter/blend modes. grayscale stays only on the small client photos.
- Keep everything that already works: heading block, labels, colours, lime left bar, photo ring, highlight logic, links, sample flags.

1) CONTENT — siteContent.js
- Shorten each of the 3 sample testimonial quotes to 45–55 words (about 5–6 lines on desktop). Keep names, projects, photos and isSample: true.

2) LAYOUT FIXES (Testimonials.jsx)
- Quote font: Playfair Display italic 17px desktop / 16px mobile, line-height 1.6.
- Desktop (lg+): testimonials row width 70% of the container (3 columns). The tree lives in the right 30% and must never overlap the third testimonial.
- Section padding-bottom ~140px desktop / 100px mobile so text never sits on the grass.
- Keep the clean top edge against Why Choose Us and the soft bottom blend (last ~120px) into pale lime #EEF4DD.
- Remove the dark base strip/line under the grass completely.

3) TREE — rewrite TestimonialsTree.jsx (static SVG in layers + CSS sway)
- Build the tree DATA once with useMemo using this deterministic generator (absolute coordinates, no nested transforms). viewBox "0 0 320 440". isMobile = window.innerWidth < 768 (read once on mount).

  function buildTree(isMobile){
    let s=23; const r=()=>{s=(s*9301+49297)%233280; return s/233280};
    const G=['#5C6E0A','#6E8F2E','#7FA34A','#9DB83A','#4F7726','#C6F00C','#6A9A34'], Y=['#D9A441','#C47A2C','#E2B85C'];
    const col=()=> r()<.7 ? G[Math.floor(r()*G.length)] : Y[Math.floor(r()*Y.length)];
    const rad=a=>a*Math.PI/180, wood=[], leaves=[];
    const addLeaf=(x,y,rot,sc)=>{ const k=r(); leaves.push({x,y,rot,sc,c:col(),o:.75+r()*.25,layer:k<.35?0:(k<.68?1:2)}); };
    function br(x,y,ang,len,d,w){
      const ex=x+Math.sin(rad(ang))*len, ey=y-Math.cos(rad(ang))*len;
      const bend=(r()-.5)*len*.25, mx=(x+ex)/2+Math.cos(rad(ang))*bend, my=(y+ey)/2+Math.sin(rad(ang))*bend;
      wood.push({d:`M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,w,c:d>3?'#5A4334':'#6B5140'});
      if(d<=2){ for(let k=0;k<2;k++){ const t=.35+r()*.5; addLeaf(x+(ex-x)*t,y+(ey-y)*t,ang+(r()>.5?1:-1)*(35+r()*40),.75+r()*.3); } }
      if(d===0){ for(let k=0;k<4;k++) addLeaf(ex+(r()-.5)*8,ey+(r()-.5)*8,ang+(r()-.5)*150,.8+r()*.4); return; }
      const nl=len*(.7+r()*.1), nw=w*.66;
      br(ex,ey,ang-(14+r()*12),nl,d-1,nw);
      br(ex,ey,ang+(10+r()*12),nl*(.85+r()*.15),d-1,nw);
      if(d>=3&&r()<.4) br(ex,ey,ang+(r()-.5)*10,nl*.75,d-1,nw*.85);
      if(d>=5){ [.45,.7].forEach((t,i)=>br(x+(ex-x)*t,y+(ey-y)*t,ang+(i%2?1:-1)*(40+r()*15),24+r()*10,2,w*.35)); }
    }
    br(292,440,-12,110,isMobile?5:6,22);
    return {wood,leaves};
  }
  Leaf shape (points up, base at 0,0): const LEAF='M0,0 C4,-4 5,-11 0,-16 C-5,-11 -4,-4 0,0Z';
  Each leaf: <path d={LEAF} fill={c} opacity={o} transform={`translate(x y) rotate(rot) scale(sc)`}/>
  Each wood: <path d fill="none" stroke={c} strokeWidth={w} strokeLinecap="round"/>

- Render as a wrapper <div class="sm-tree"> (aria-hidden) containing 4 absolutely stacked layers (position:absolute; inset:0), each layer = a <div> holding its own <svg viewBox="0 0 320 440" width="100%" height="100%" overflow="visible">:
  layer A: wood (all branches)  · layer B: leaves layer 0 (back) · layer C: leaves layer 1 (mid) · layer D: leaves layer 2 (front)
- Wrapper size/position: position:absolute; right:0; bottom:18px (trunk base sits in the grass); width:clamp(260px,26vw,360px); aspect-ratio:320/440; max-height:520px; z-index below the text.
  Tablet (768–1023px): width 220px, opacity .45. Mobile (<768px): width 160px, opacity .35.
- Breeze (CSS on the layer DIVs, transform-origin: 91% 100% = the trunk base; will-change: transform):
  @keyframes smSway{0%{transform:rotate(calc(var(--a)*-1))}50%{transform:rotate(var(--a))}100%{transform:rotate(calc(var(--a)*-1))}}
  wood: --a .5deg, 5.6s, delay -1s · back: --a .6deg, 6.4s, delay -2s · mid: --a .9deg, 5.2s, delay -.5s · front: --a 1.3deg, 4.4s, delay -3s. ease-in-out, infinite.
- Flutter leaves (the "live" leaves): pick 12 leaves from the front layer (every Nth so they are spread out). Do NOT draw them in the SVG; instead render each as its own small absolutely positioned <div> inside the FRONT layer div at left:{x/320*100}%, top:{y/440*100}%, containing a tiny <svg> leaf with the same colour/rotation/scale. The inner element animates:
  @keyframes smFlutter{0%{transform:rotate(-14deg)}100%{transform:rotate(14deg)}} 1.4–3s random duration, random negative delay, alternate, infinite, transform-origin bottom centre.

4) LAWN — rewrite TestimonialsLawn.jsx (static blade chunks + CSS skew wave)
- Height: 56px desktop / 40px mobile. Absolutely positioned left 0, bottom 0, width 100%, aria-hidden, z-index above the tree, below the text. Rebuild data from the section width on mount and on resize (debounced 200ms).
- Split the width into CHUNKS = 10 (mobile 5). For each grass layer and each chunk, render one <div> (position absolute, left = chunk start, width = chunk width, height = H, transform-origin: bottom center, will-change: transform) holding an <svg> with that chunk's blades (overflow visible).
- Blade data (deterministic):
  const LAYERS=[{c:['#2F4A18','#36531C','#3E5C20'],h:.75,step:1.1,sk:-3},{c:['#466B22','#4F7726','#58822B','#4A6E25'],h:.9,step:1.0,sk:-4.5},{c:['#5E8C2E','#6A9A34','#76A83C','#83B444','#9CC75A'],h:1,step:1.4,sk:-6}];  (mobile: only the last 2)
  let s=7; const r=()=>{s=(s*9301+49297)%233280; return s/233280};
  for each layer Ly, chunk ci, local x from 0 to chunkWidth step Ly.step*(.6+r()*.8):
    f = (chunkStart+x)/W; fade = Math.min(1, Math.pow(f,1.5)*1.5); skip if fade<.04 or r() > .35+fade*.65;
    h = ((14+r()*22)*Ly.h)*(.45+fade*.75)*(H/80) + (f>.78 ? r()*12*(H/80) : 0); lean=(r()-.4)*h*.35; w=.55+r()*.6;
    path (base at y=H): M(x-w) H Q(x+lean*.25) (H-h*.55) (x+lean) (H-h) Q(x+lean*.25+w*.4) (H-h*.5) (x+w) H Z
    fill = random from Ly.c, fill-opacity = .15+fade*.85
- Wave left -> right: @keyframes smGrass{0%,100%{transform:skewX(1deg)}50%{transform:skewX(var(--sk))}} duration 3.4s ease-in-out infinite; --sk from the layer; animation-delay = -((CHUNKS-ci)*0.28 + li*0.15)s so the wave travels from left to right.

5) FALLING LEAVES — fix TestimonialsFallingLeaves.jsx so it actually runs
- Keep the v2 behaviour (start 120px above the section over Why Choose Us, near/far layers, up-and-down float keyframes, max 14 on screen / 6 mobile, remove on finish), but make it reliable:
  - In-view: IntersectionObserver with threshold 0 (any part visible = in view).
  - "Standing still": record Date.now() on window 'scroll', 'wheel' and 'touchmove' (all passive). A setInterval every 1500ms drops 1 leaf when in view AND Date.now()-lastMove > 1000. Clear the interval on unmount.
  - Each falling leaf is a small <div> animated with element.animate() using transform (translate3d + rotate + scale) and opacity only.
  - Section keeps position:relative; z-index:1; overflow-x:clip (not overflow:hidden) so leaves can show above it.

6) GOLDEN GLOW — make it composited
- Replace the full-section radial-gradient-with-CSS-variables by ONE div 520x520px, border-radius 50%, background radial-gradient(circle, rgba(232,184,96,.30), transparent 70%), position absolute top:0 left:0, pointer-events none, below the text, will-change: transform, opacity.
- On mousemove over the section (rAF-throttled) set transform: translate3d(x-260px, y-260px, 0). Opacity 0 -> 1 while a testimonial is active (transition .4s). On touch, centre it on the tapped testimonial.

7) PAUSE + REDUCED MOTION
- When the section is out of view, add a class (e.g. .sm-paused) that sets animation-play-state: paused on the sway layers, flutter leaves and grass chunks; remove it when back in view. No falling leaves are created while out of view.
- Only if window.matchMedia('(prefers-reduced-motion: reduce)').matches: no sway/flutter/grass/falling leaves (static), highlight still works. Otherwise everything runs from the first frame.

CHECK BEFORE FINISHING
- grep the Testimonials files: there must be NO "animateTransform", "<animate", "pauseAnimations" left.
- Confirm the third testimonial does not overlap the tree at 1280px and 1440px widths.
- List every file changed with a one-line note. Do not commit, do not push. Owner checks with: cd client && npm run dev (Safari).
PROMPT

echo "Prompt copied. Open a NEW Claude Code session in the folder, paste (Cmd+V), Enter."
echo "Check with: cd client && npm run dev"
echo "Undo if needed: git reset --hard $TAG"
