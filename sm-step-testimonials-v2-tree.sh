#!/bin/bash
# Space Maker — Testimonials v2: tree + breeze + falling leaves + lawn + golden glow
# Builds ONLY the Testimonials section. Does NOT touch Team, Partner, Footer or any other section.
# Run:  ! bash "/Users/mac/Space Maker/sm-step-testimonials-v2-tree.sh"
# Then paste the copied prompt into a NEW Claude Code session in the folder.

cd "/Users/mac/Space Maker/spacemaker_website" || { echo "Folder not found"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "ui-final-16oct" ]; then
  echo "You are on '$BRANCH'. Switch first:  git checkout ui-final-16oct"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes (probably Testimonials v1)."
  echo "Save them first as a safe point:  git add -A && git commit -m \"Testimonials v1\""
  echo "Then run this script again."
  exit 1
fi

TAG="backup-before-testimonials-v2-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG" && echo "Safety tag created: $TAG"

cat <<'PROMPT' | pbcopy
Task: Rebuild the homepage Testimonials section (v2) — tree in the bottom-right corner swaying in a breeze, leaves drifting in from Why Choose Us when the visitor stands still, a realistic lawn along the bottom, golden glow + highlight on hover. Build ONLY this section.

STRICT RULES
- Branch ui-final-16oct. Do NOT scan or review the whole codebase. Open only: the existing Testimonials component (same folder as the Why Choose Us component — find it with one narrow grep for "Testimonials"), client/src/data/siteContent.js, and the "Who we are" section file ONLY to read its background colour and dot-grid style.
- Do NOT touch Why Choose Us, Team, Partner with us, Footer, nav, fonts or any other section. Do NOT change the homepage order. Do NOT build anything below Testimonials — the owner will do Team and the footer later.
- No angle cuts, no waves, no CSS blur/backdrop-filter/blend modes. The only CSS filter allowed is grayscale on the small client photos.
- Demo site: sample content is fine; every sample entry keeps isSample: true.

1) DATA — client/src/data/siteContent.js
- Add (or update) `testimonialsSection = { label: "IN THEIR WORDS", heading: "What our clients say.", intro: "Every home we build becomes someone's story. Here is what families living in Space Maker apartments say about their homes." }`.
- Keep the existing `testimonials` array (3 entries, same fields). Lengthen each sample quote to about 45–55 words so it shows 4–5 lines on desktop. Keep isSample: true. Keep existing sample photos.

2) LAYOUT (Testimonials.jsx, replace the v1 markup/styles)
- Section background: the SAME warm off-white and the SAME faint dot grid used in the "Who we are" section (copy its values).
- Top edge: clean straight edge against the espresso Why Choose Us. No fade at the top.
- Bottom: the last ~120px blends softly from the section background into pale lime #EEF4DD, so the section ENDS in pale lime (ready for the Team section later). Do not touch the section below.
- Use the same container / left padding as other sections so the heading lines up with them.
- Heading block, LEFT aligned, max-width ~50% on desktop (full width on mobile): JetBrains Mono label with the short lime line (same style as "WHO WE ARE"), heading with the site's bold serif heading token, intro paragraph in the body font.
- Testimonials row under the heading:
  - Desktop (lg+): 3 columns side by side, the row limited to the LEFT ~68% of the container so it NEVER overlaps the tree trunk.
  - Tablet (md): 2 columns; mobile: 1 column stacked, full width.
- Each testimonial (NOT a card — no box, no shadow, no background):
  - Lime left bar: border-left 2px #C6F00C, padding-left ~18px.
  - Circle photo: 104px desktop, 84px tablet, 72px mobile, object-cover, grayscale(1) at rest.
    Thin ring: box-shadow: 0 0 0 3px <section bg>, 0 0 0 4.5px #C6F00C.
    No photo -> green #1B4332 circle with cream initials, same ring.
  - Quote: Playfair Display ITALIC, 18px desktop / 16px mobile, line-height 1.6, espresso #2A1F1A.
  - Name: heading token, ~17px. Project: JetBrains Mono small label in olive #5C6E0A; link to /projects/<slug> when projectSlug exists.
- Highlight (hover, keyboard focus, or tap on touch): active item -> border-left 4px, photo grayscale(0), ring 0 0 0 3px <bg>, 0 0 0 5.5px #C6F00C; the other two -> opacity 0.5. Transitions 0.3–0.4s. Tap again / tap outside clears. Each item tabIndex 0.
- Golden glow: an absolutely positioned overlay inside the section (pointer-events none, below the text) with
  background: radial-gradient(260px circle at var(--gx) var(--gy), rgba(232,184,96,.30), transparent 70%);
  opacity 0 -> 1 while an item is active. Update --gx/--gy from mousemove on the section (rAF-throttled). On touch, place it at the tapped item's centre.

3) TREE (new file TestimonialsTree.jsx, decorative, aria-hidden)
- Absolutely positioned: right: 0; bottom: 26px; height ~92% of the section; width ~40% (desktop). preserveAspectRatio="xMaxYMax meet", overflow visible, z-index BELOW the text.
- Below lg: smaller (max-height ~240px), opacity 0.45, still bottom-right, behind the content.
- Build it ONCE in a useEffect into an <svg viewBox="0 0 320 440"> ref with the deterministic algorithm below (clear the svg first so React StrictMode doesn't double it). Use this code as the reference — keep the numbers, the seed and the call order so the tree looks exactly like the approved preview:

  const C=['#C6F00C','#9DB83A','#5C6E0A','#7FA34A','#D9A441','#C47A2C','#E2B85C','#6E8F2E'];
  const L='M0,0 C4,-4 5,-11 0,-16 C-5,-11 -4,-4 0,0Z', NS='http://www.w3.org/2000/svg';
  let s=23; const r=()=>{s=(s*9301+49297)%233280; return s/233280};
  const el=(t,a)=>{const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); return e};
  function leaf(par,x,y,rot,sc,flut){ const h=el('g',{transform:`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${sc.toFixed(2)})`});
    const p=el('path',{d:L,fill:C[Math.floor(r()*C.length)],opacity:(.75+r()*.25).toFixed(2)});
    if(flut){p.setAttribute('class','sm-leaf-flutter'); p.style.setProperty('--d',(1.4+r()*1.6).toFixed(2)+'s'); p.style.setProperty('--dl',(-r()*2).toFixed(2)+'s'); p.style.setProperty('--a',(12+r()*16).toFixed(0)+'deg');}
    h.appendChild(p); par.appendChild(h); }
  const mids=[];
  function br(par,len,ang,d,w){ const o=el('g',{transform:`rotate(${ang.toFixed(1)})`}); par.appendChild(o); const sw=el('g'); o.appendChild(sw);
    if(d<=4){ const a=(5-d)*.9+.6; sw.appendChild(el('animateTransform',{attributeName:'transform',type:'rotate',values:`${-a} 0 0;${a} 0 0;${-a} 0 0`,dur:(3+r()*2.5).toFixed(2)+'s',begin:(-r()*4).toFixed(2)+'s',repeatCount:'indefinite',calcMode:'spline',keySplines:'.45 0 .55 1;.45 0 .55 1'})); }
    const bend=(r()-.5)*len*.25;
    sw.appendChild(el('path',{d:`M0 0 Q${bend.toFixed(1)} ${(-len/2).toFixed(1)} 0 ${(-len).toFixed(1)}`,stroke:d>3?'#5A4334':'#6B5140','stroke-width':w.toFixed(1),fill:'none','stroke-linecap':'round'}));
    if(d>=5) mids.push({sw,len,bend,d,w});
    if(d<=2){ for(let k=0;k<3;k++){ const t=.35+r()*.5; leaf(sw,(r()-.5)*4,-len*t,(r()>.5?1:-1)*(35+r()*40),.75+r()*.35,r()<.35); } }
    const n=el('g',{transform:`translate(0 ${(-len).toFixed(1)})`}); sw.appendChild(n);
    if(d===0){ for(let k=0;k<6;k++) leaf(n,(r()-.5)*8,(r()-.5)*8,(r()-.5)*150,.8+r()*.45,r()<.45); return; }
    const nl=len*(.7+r()*.1), nw=w*.66;
    br(n,nl,-(20+r()*18),d-1,nw); br(n,nl*(.85+r()*.15),(12+r()*16),d-1,nw);
    if(d>=3&&r()<.45) br(n,nl*.75,(r()-.5)*14,d-1,nw*.85); }
  // root group: <g transform="translate(292 440)">
  br(root,110,-16,6,24);
  s=101; // extra middle branches so the middle/bottom of the tree is fuller
  mids.forEach(m=>{ const ts=m.d===6?[.42,.6,.78]:[.45,.75]; ts.forEach((t,i)=>{ const x=2*t*(1-t)*m.bend, y=-m.len*t;
    const side=(i%2?1:-1)*(m.d===6?1:-1); const g=el('g',{transform:`translate(${x.toFixed(1)} ${y.toFixed(1)})`}); m.sw.appendChild(g);
    br(g,(m.d===6?34:26)+r()*14,side*(48+r()*18),m.d===6?3:2,m.w*.4); }); });

- CSS for fluttering leaves (in the component's style / CSS module):
  .sm-leaf-flutter{transform-box:fill-box;transform-origin:50% 100%;animation:smFlutter var(--d) ease-in-out var(--dl) infinite alternate}
  @keyframes smFlutter{from{transform:rotate(calc(var(--a)*-1))}to{transform:rotate(var(--a))}}

4) LAWN (new file TestimonialsLawn.jsx, decorative, aria-hidden)
- <svg> absolutely positioned left 0, bottom 0, width 100%, height 80px desktop / 56px mobile, z-index ABOVE the tree, below the text. Built in a useEffect from the section width; rebuild on resize (debounced 200ms). Reference code (W = section width, H = svg height):

  const LAYERS=[{c:['#2F4A18','#36531C','#3E5C20'],h:.75,step:1.1,sk:5,op:.95},{c:['#466B22','#4F7726','#58822B','#4A6E25'],h:.9,step:1.0,sk:7,op:1},{c:['#5E8C2E','#6A9A34','#76A83C','#83B444','#9CC75A'],h:1,step:1.4,sk:9,op:1}];
  let gs=7; const gr=()=>{gs=(gs*9301+49297)%233280; return gs/233280};
  const SEG=22, dur=3.4;
  svg.appendChild(el('rect',{x:0,y:H-6,width:W,height:6,fill:'#2F4A18',opacity:.35}));
  LAYERS.forEach((Ly,li)=>{ for(let x0=0;x0<W;x0+=SEG){ const f=(x0+SEG/2)/W, fade=Math.min(1,Math.pow(f,1.5)*1.5); if(fade<.04) continue;
    const outer=el('g',{transform:`translate(${x0} ${H})`,opacity:(Ly.op*(.15+fade*.85)).toFixed(2)}); const inner=el('g',{}); outer.appendChild(inner);
    const a=Ly.sk*(.6+fade*.5);
    inner.appendChild(el('animateTransform',{attributeName:'transform',type:'skewX',values:`${(-a*.25).toFixed(1)};${a.toFixed(1)};${(-a*.25).toFixed(1)}`,dur:dur+'s',begin:(-(1-f)*dur*1.8-li*.15).toFixed(2)+'s',repeatCount:'indefinite',calcMode:'spline',keySplines:'.45 0 .55 1;.45 0 .55 1'}));
    for(let x=0;x<SEG;x+=Ly.step*(.6+gr()*.8)){ if(gr()>.35+fade*.65) continue;
      const base=(14+gr()*22)*Ly.h, h=base*(.45+fade*.75)+(f>.78?gr()*16:0), lean=(gr()-.4)*h*.35, w=.55+gr()*.6, c=Ly.c[Math.floor(gr()*Ly.c.length)];
      inner.appendChild(el('path',{d:`M${(x-w).toFixed(1)} 0 Q${(x+lean*.25).toFixed(1)} ${(-h*.55).toFixed(1)} ${(x+lean).toFixed(1)} ${(-h).toFixed(1)} Q${(x+lean*.25+w*.4).toFixed(1)} ${(-h*.5).toFixed(1)} ${(x+w).toFixed(1)} 0Z`,fill:c})); }
    svg.appendChild(outer); } });

- Mobile (< 768px): use only the 2 front layers and SEG 30 to keep it light.
- The lawn sits on top of the pale-lime bottom blend, so it reads as grass on the ground line. Lawn is thickest under the tree (right) and fades out to the left.

5) FALLING LEAVES (new file TestimonialsFallingLeaves.jsx, decorative, aria-hidden)
- Two absolutely positioned layers inside the section, pointer-events none: BACK layer (z below the text) and FRONT layer (z above the text).
- The layers start 120px ABOVE the section (top: -120px; bottom: 0) so leaves appear over the bottom of Why Choose Us and drift down into Testimonials. Give the Testimonials section position: relative; z-index: 1; and overflow-x: clip (NOT overflow: hidden) so leaves can show above it while nothing scrolls sideways.
- Behaviour:
  - Only active while the section is in view (IntersectionObserver, threshold ~0.25).
  - Track the last window scroll time (passive scroll listener). Every 1500ms: if the section is in view AND no scroll for > 1000ms, drop 1 leaf. When scrolling starts again, no NEW leaves start; leaves already falling finish their path.
  - Max 14 leaves on screen at once (6 on mobile).
  - Each leaf: small SVG leaf (path L above, random colour from C), 40% chance "near" (FRONT layer, scale 1.3–1.8, opacity 1, duration 6.5–9s) else "far" (BACK layer, scale 0.55–0.9, opacity 0.55, duration 8.5–11s).
  - Start x = 10–95% of section width, start y = 0–40px inside the 120px band above the section. Animate with element.animate() using these keyframes (dx = ±80px drift, dy = 65–95% of the section height, rt = ±300deg):
    0: opacity 0 · 0.10: y+12%dy · 0.30: y+32%dy x+30 · 0.42: y+27%dy (lifts up) · 0.62: y+55%dy x−30 · 0.74: y+50%dy (lifts up) · 0.92: y+90%dy · 1: y+dy opacity 0; rotate grows with progress; easing ease-in-out. Remove the element on finish.

6) PERFORMANCE & ACCESSIBILITY
- When the section is out of view: call svg.pauseAnimations() on the tree and lawn SVGs and pause the flutter CSS (animation-play-state: paused); resume when back in view.
- prefers-reduced-motion: tree and lawn render static (pauseAnimations at start, no flutter), no falling leaves, no glow movement (highlight still works).
- No images, no new libraries. Decorative SVGs aria-hidden="true". Client photos keep alt text with the client name.

WHEN DONE
- List every file created/changed with a short note of what each does.
- Do not commit, do not push. The owner will check with: cd client && npm run dev
PROMPT

echo "Prompt copied. Open a NEW Claude Code session in the folder, paste (Cmd+V), Enter."
echo "Check with: cd client && npm run dev"
echo "Undo if needed: git reset --hard $TAG"
