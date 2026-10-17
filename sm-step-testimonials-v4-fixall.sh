#!/bin/bash
# Space Maker — Testimonials v4: fix ALL remaining issues in one go
#  1) restore the site-wide bold serif heading font  2) shorter quotes  3) top spacing
#  4) natural branch-by-branch tree sway + realistic leaves  5) falling leaves exactly like the preview
# Run:  ! bash "/Users/mac/Space Maker/sm-step-testimonials-v4-fixall.sh"
# Then paste the copied prompt into a NEW Claude Code session in the folder.

cd "/Users/mac/Space Maker/spacemaker_website" || { echo "Folder not found"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "ui-final-16oct" ]; then
  echo "You are on '$BRANCH'. Switch first:  git checkout ui-final-16oct"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes (Testimonials v3)."
  echo "Save them first:  git add -A && git commit -m \"Testimonials v3\""
  echo "Then run this script again."
  exit 1
fi

TAG="backup-before-testimonials-v4-$(date +%Y%m%d-%H%M%S)"
git tag "$TAG" && echo "Safety tag created: $TAG"

cat <<'PROMPT' | pbcopy
Task: Testimonials v4 — fix all remaining issues. Work fast and precisely. Do NOT scan the whole codebase; use only the git/grep commands given and open only the files named.

STRICT RULES
- Branch ui-final-16oct. Do NOT change Why Choose Us, Partner with us, Footer, nav, homepage order or any other section's design.
- No SMIL (<animateTransform>, <animate>), no svg.pauseAnimations(). Animate ONLY transform/opacity on HTML <div> wrappers.
- No CSS blur/backdrop-filter/blend modes (grayscale only on the small client photos).
- Keep everything else in Testimonials that works: heading block, labels, colours, lime left bar, photo ring, highlight, golden glow div, links, lawn, sample flags, bottom pale-lime blend.

=== FIX 1 — Restore the site-wide heading font (bold serif) ===
The bold serif heading font (used e.g. for "Let's Discuss Your Land Over Coffee." and "What our clients say.") turned into a sans font during the v3 change. v3 was only allowed to touch Testimonials files.
- Find the v2 commit:  V2=$(git log --grep="Testimonials v2" -1 --format=%H)
- List what v3 changed:  git diff --stat $V2 HEAD
- Any changed file that is NOT a Testimonials*.jsx file and NOT the data file(s) holding testimonials (siteContent.js or similar) must be restored: git checkout $V2 -- <file>. This includes index.html (font links), tailwind config, global CSS, font/theme token files.
- If v3 changed the heading class inside Testimonials.jsx, set it back to the site's heading token (the same class the Partner heading uses).
- Verify: Partner heading and Testimonials heading + client names use the bold serif again. Report which file(s) you restored.

=== FIX 2 — Shorter quotes ===
- Find where the quotes really live: grep -rln "We were handed our keys" client/src
- In THAT file shorten the 3 sample quotes to 40–50 words each (5–6 lines on desktop). Keep names, projects, photos, isSample: true. If siteContent.js also has a copy that the component does not use, leave it alone and tell me.
- Quote style: Playfair Display italic, 17px desktop / 16px mobile, line-height 1.6.

=== FIX 3 — Top spacing ===
- Set the Testimonials section's top padding to the SAME value as the Partner with us section (read it from the Partner section file only). Keep the clean edge against Why Choose Us.

=== FIX 4 — Natural tree: branch groups that carry their own leaves (rewrite TestimonialsTree.jsx) ===
Problem now: whole leaf sheets rotate from the trunk base, so the top slides as one block and leaves float over the branches. New approach: hierarchical branch groups — each main branch div carries its own twigs AND leaves, and rotates from its own joint. The trunk never moves.
- Keep wrapper size/position from v3 (right:0; bottom:18px; width:clamp(260px,26vw,360px); aspect-ratio:320/440; max-height:520px; tablet 220px/opacity .45; mobile 160px/opacity .35; below the text).
- Build data once with useMemo:

  function buildTree(isMobile){
    let s=23; const r=()=>{s=(s*9301+49297)%233280; return s/233280};
    const G=['#5C6E0A','#6E8F2E','#7FA34A','#9DB83A','#4F7726','#C6F00C','#6A9A34'], Y=['#D9A441','#C47A2C','#E2B85C'];
    const col=()=> r()<.7 ? G[Math.floor(r()*G.length)] : Y[Math.floor(r()*Y.length)];
    const rad=a=>a*Math.PI/180, groups=[];
    const newGroup=(parent,px,py,level)=>{ groups.push({id:groups.length,parent,px,py,level,wood:[],leaves:[]}); return groups.length-1; };
    const TOP=isMobile?5:6;
    const root=newGroup(-1,292,440,0);                 // trunk group: static
    const addLeaf=(gid,x,y,rot,sc)=>groups[gid].leaves.push({x,y,rot,sc,c:col(),o:.8+r()*.2});
    function br(x,y,ang,len,d,w,gid){
      if(d===TOP-1) gid=newGroup(gid,x,y,1);           // main branches
      else if(d===TOP-2) gid=newGroup(gid,x,y,2);      // sub-branches
      const g=groups[gid];
      const ex=x+Math.sin(rad(ang))*len, ey=y-Math.cos(rad(ang))*len;
      const bend=(r()-.5)*len*.25, mx=(x+ex)/2+Math.cos(rad(ang))*bend, my=(y+ey)/2+Math.sin(rad(ang))*bend;
      g.wood.push({d:`M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,w,c:d>3?'#5A4334':'#6B5140'});
      if(d<=2){ for(let k=0;k<3;k++){ const t=.3+r()*.6; addLeaf(gid,x+(ex-x)*t,y+(ey-y)*t,ang+(r()>.5?1:-1)*(35+r()*45),.55+r()*.35); } }
      if(d===0){ for(let k=0;k<6;k++) addLeaf(gid,ex+(r()-.5)*9,ey+(r()-.5)*9,ang+(r()-.5)*160,.6+r()*.35); return; }
      const nl=len*(.7+r()*.1), nw=w*.66;
      br(ex,ey,ang-(14+r()*12),nl,d-1,nw,gid);
      br(ex,ey,ang+(10+r()*12),nl*(.85+r()*.15),d-1,nw,gid);
      if(d>=3&&r()<.4) br(ex,ey,ang+(r()-.5)*10,nl*.75,d-1,nw*.85,gid);
      if(d>=TOP-1){ [.45,.7].forEach((t,i)=>{ const sx=x+(ex-x)*t, sy=y+(ey-y)*t; const sg=newGroup(gid,sx,sy,3);
        br(sx,sy,ang+(i%2?1:-1)*(40+r()*15),24+r()*10,2,w*.35,sg); }); }
    }
    br(292,440,-12,110,TOP,22,root);
    return groups;
  }

- Realistic leaf: two shapes per leaf inside <g transform="translate(x y) rotate(rot) scale(sc)">:
  <path d="M0,0 C4,-4 5,-11 0,-16 C-5,-11 -4,-4 0,0Z" fill={c} opacity={o}/>
  <path d="M0,-1 L0,-14" stroke="rgba(255,255,255,.35)" strokeWidth=".5" fill="none"/>   (midrib vein)
- Render recursively as NESTED divs (each position:absolute; inset:0; holding its own <svg viewBox="0 0 320 440" width="100%" height="100%" overflow="visible" aria-hidden> with that group's wood + leaves), children rendered INSIDE the parent's div so they inherit the parent's sway:
  <Group g={root}/> -> div (NOT animated) -> svg(trunk) + children groups
  Each non-root group div: class "sm-branch", transform-origin: {px/320*100}% {py/440*100}%, will-change: transform,
  animation: smSway var(--dur) ease-in-out var(--dl) infinite, with
    level 1 (main branches): --a 1.1deg, --dur 5–6s
    level 2 (sub-branches):  --a 1.8deg, --dur 3.6–4.6s
    level 3 (small side branches): --a 2.4deg, --dur 3–4s
  (random within range from a seeded rng), and --dl = -(px/320)*1.6s - level*0.3s so the breeze passes through the tree from left to right.
  @keyframes smSway{0%,100%{transform:rotate(calc(var(--a)*-1))}50%{transform:rotate(var(--a))}}
- Flutter leaves: pick 12 leaves from level-2/level-3 groups (spread out). Remove them from that group's SVG and render each as a small absolutely positioned <div> INSIDE that same group's div at left:{x/320*100}%, top:{y/440*100}% (so it stays attached to its branch), with the same leaf SVG (incl. vein), rotation and scale; inner element:
  @keyframes smFlutter{0%{transform:rotate(-14deg)}100%{transform:rotate(14deg)}} 1.4–3s, random negative delay, alternate, infinite, transform-origin bottom centre.
- Delete the v3 back/mid/front sheet layers completely.

=== FIX 5 — Falling leaves exactly like the approved preview (TestimonialsFallingLeaves.jsx) ===
- Two layers inside the section: BACK (below the text) and FRONT (above the text), both position:absolute; top:-120px; left:0; right:0; bottom:0; pointer-events:none. Section: position:relative; z-index:1; overflow-x:clip.
- In view = IntersectionObserver threshold 0. lastMove = Date.now() on window scroll/wheel/touchmove (passive). setInterval 1500ms: if in view && Date.now()-lastMove > 1000 -> drop(). Max 14 live leaves (6 on mobile). Clear on unmount.
- drop(): use exactly this logic (W = section width, H = section height):
  const near=Math.random()<.4, layer=near?FRONT:BACK, sc=near?1.3+Math.random()*.5:.55+Math.random()*.35, op=near?1:.55;
  create a div with the leaf SVG (same shape + vein, random colour from G/Y 70/30), append to layer;
  const x=W*(.1+Math.random()*.85), y=Math.random()*40, dx=(Math.random()-.5)*160, dy=(H+120)*(.65+Math.random()*.3), rt=(Math.random()-.5)*600, t=(near?6500:8500)+Math.random()*2500;
  const f=(o,yy,xx,rr,o2)=>({transform:`translate3d(${x+xx}px,${y+yy}px,0) rotate(${rr}deg) scale(${sc})`,opacity:o2,offset:o});
  el.animate([f(0,0,0,0,0),f(.1,dy*.12,dx*.1,rt*.1,op),f(.3,dy*.32,dx*.3+30,rt*.3,op),f(.42,dy*.27,dx*.42+10,rt*.42,op),f(.62,dy*.55,dx*.6-30,rt*.6,op),f(.74,dy*.5,dx*.72-15,rt*.72,op),f(.92,dy*.9,dx*.92,rt*.92,op),f(1,dy,dx,rt,0)],{duration:t,easing:'ease-in-out'}).onfinish=()=>el.remove();
  (The steps at .42 and .74 make the leaf lift up a little — keep them.)

=== KEEP ===
- Pause class when the section is out of view (animation-play-state: paused on .sm-branch, flutter leaves, grass chunks). prefers-reduced-motion: everything static, no falling leaves.

CHECK BEFORE FINISHING
- grep Testimonials files: no "animateTransform", "<animate", "pauseAnimations".
- Partner heading and Testimonials heading are bold serif again.
- No overlap between the third testimonial and the tree at 1280px and 1440px.
- List every file changed/restored with a one-line note. Do not commit, do not push. Owner checks with: cd client && npm run dev (Safari + Chrome).
PROMPT

echo "Prompt copied. Open a NEW Claude Code session in the folder, paste (Cmd+V), Enter."
echo "Check with: cd client && npm run dev"
echo "Undo if needed: git reset --hard $TAG"
