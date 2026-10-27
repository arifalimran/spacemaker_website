// client/src/components/home/Testimonials.jsx
// "In their words" (v3), directly after Why Choose Us.
// Background = the same warm off-white + faint dot grid as "Who we are". Top = clean straight edge
// against the espresso above; it ends in plain cream and the Team section below blends in softly.
// Decor (aria-hidden, behind the text unless noted): golden glow (eased follow), swaying tree (trunk enters from the right
// edge two-thirds of the way down on desktop, top-right on tablet/mobile; no lawn), wind-blown leaves (back layer behind / front layer above the text).
// v4 tree: nested branch groups (each sways from its own joint, carrying its twigs + leaves).
// Performance: every animation is CSS transform/opacity on <div> wrappers (no SMIL, no per-path
// animation); out of view the decor gets .sm-paused, reduced motion gets .sm-static.
// Testimonials are open items (no cards): lime left bar, grayscale photo, Playfair italic quote.
// Hover / keyboard focus / tap highlights one item and dims the others; tap again or outside clears.
// Data: testimonialsSection + testimonials in data/siteContent.js (every field optional-safe).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials, testimonialsSection as S } from '../../data/siteContent';
import { Eyebrow } from '../portfolio/shared';
import TestimonialsTree from './TestimonialsTree';
import TestimonialsFallenLeaves from './TestimonialsFallenLeaves';
import TestimonialsFallingLeaves from './TestimonialsFallingLeaves';

const BG = '#EAF1DF'; // soft sage (solid: the photo rings use it as their gap colour)
const ESPRESSO = '#2A1F1A';
const ring = (w) => `0 0 0 3px ${BG}, 0 0 0 ${w}px ${ESPRESSO}`;
const GLOW = 520;

/* decor CSS: tree size/sway, live-leaf flutter, grass wave, pause + static states */
const DECOR_CSS = `
.sm-tree{position:absolute;right:0;top:8px;height:auto;width:220px;opacity:.45;transform:translateX(5%);z-index:2;pointer-events:none;aspect-ratio:320/440}
.sm-lean{position:absolute;inset:0}
.sm-fallen{display:none}
@media (min-width:1024px){.sm-fallen{display:block;position:absolute;right:2%;bottom:10px;width:230px;height:160px;z-index:3;pointer-events:none}}
@media (min-width:1024px){
.sm-tree{--w:min(31.25vw,480px);width:var(--w);height:auto;opacity:1;top:calc(var(--jy,36%) - var(--w)*1.375*.755);bottom:auto;transform:translateX(16%)}
.sm-lean{transform-origin:84% 75.5%;transform:rotate(var(--lean,-40deg));animation:smWind 8s ease-in-out infinite alternate;will-change:transform}
}
@keyframes smWind{0%{transform:rotate(calc(var(--lean,-40deg) - 2.4deg))}100%{transform:rotate(calc(var(--lean,-40deg) + 1.6deg))}}
.sm-paused .sm-lean{animation-play-state:paused}
.sm-static .sm-lean{animation:none}
@media (max-width:1023px){.sm-tree{top:8px;bottom:auto;height:auto;width:220px;opacity:.45;transform:translateX(5%)}}
@media (max-width:767px){.sm-tree{width:160px;opacity:.35}}
.sm-trunk{position:absolute;inset:0}
.sm-branch{position:absolute;inset:0;will-change:transform;animation:smSway var(--dur) ease-in-out var(--dl) infinite}
@keyframes smSway{0%,100%{transform:rotate(calc(var(--a)*-1))}50%{transform:rotate(var(--a))}}
.sm-live-leaf{position:absolute}
.sm-flutter{width:100%;height:100%;transform-origin:50% 90%;will-change:transform;animation:smFlutter 2s ease-in-out infinite alternate}
@keyframes smFlutter{0%{transform:rotate(-14deg)}100%{transform:rotate(14deg)}}
.sm-glow{position:absolute;top:0;left:0;width:${GLOW}px;height:${GLOW}px;border-radius:50%;pointer-events:none;z-index:1;
  background:radial-gradient(circle,rgba(232,184,96,.30),transparent 70%);will-change:transform,opacity;transition:opacity .4s ease}
.sm-paused .sm-branch,.sm-paused .sm-flutter{animation-play-state:paused}
.sm-static .sm-branch,.sm-static .sm-flutter{animation:none}
`;

const initials = (name = '') =>
  name
    .replace(/[^\p{L}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '·';

function FadeUp({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

function Avatar({ t, active }) {
  const [bad, setBad] = useState(false);
  return (
    <div
      className="h-[72px] w-[72px] flex-none overflow-hidden rounded-full bg-[#1B4332] transition-[box-shadow] duration-[350ms] md:h-[84px] md:w-[84px] lg:h-[104px] lg:w-[104px]"
      style={{ boxShadow: ring(active ? 5.5 : 4.5) }}
    >
      {t.photo && !bad ? (
        <img
          src={t.photo}
          alt={t.name ? `Photo of ${t.name}` : 'Client photo'}
          loading="lazy"
          onError={() => setBad(true)}
          className="h-full w-full object-cover transition-[filter] duration-[400ms]"
          style={{ filter: active ? 'grayscale(0)' : 'grayscale(1)' }}
        />
      ) : (
        <span
          role="img"
          aria-label={t.name ? `${t.name} (initials)` : 'Client'}
          className="flex h-full w-full items-center justify-center font-['Space_Grotesk'] text-xl font-bold text-[#F5F0E6] lg:text-2xl"
        >
          {initials(t.name)}
        </span>
      )}
    </div>
  );
}

export default function Testimonials({ items = testimonials }) {
  const list = [...(items || [])].filter((t) => t && t.quote).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  // reduced motion: decor renders static, no falling leaves (highlight still works)
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [active, setActive] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const glowRef = useRef(null);
  const pointer = useRef('mouse');

  // in view? (decor animations + falling leaves run only then)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    // any part visible = in view
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the glow glides after its target (easing) instead of jumping to every pointer position
  const glow = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, init: false });
  const stepGlow = () => {
    const g = glow.current;
    g.raf = 0;
    g.x += (g.tx - g.x) * 0.12;
    g.y += (g.ty - g.y) * 0.12;
    if (glowRef.current) glowRef.current.style.transform = `translate3d(${(g.x - GLOW / 2).toFixed(1)}px, ${(g.y - GLOW / 2).toFixed(1)}px, 0)`;
    if (Math.abs(g.tx - g.x) > 0.4 || Math.abs(g.ty - g.y) > 0.4) g.raf = requestAnimationFrame(stepGlow);
  };
  const moveGlow = (x, y) => {
    const g = glow.current;
    g.tx = x;
    g.ty = y;
    if (!g.init || reduce) {
      // first placement (or reduced motion): no travelling across the section
      g.init = true;
      g.x = x;
      g.y = y;
    }
    if (!g.raf) g.raf = requestAnimationFrame(stepGlow);
  };
  useEffect(() => () => cancelAnimationFrame(glow.current.raf), []);

  // golden glow follows the mouse (rAF-throttled); static under reduced motion
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduce) return undefined;
    let raf = 0;
    let pt = null;
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      pt = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        moveGlow(pt.clientX - r.left, pt.clientY - r.top);
      });
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  // tap outside clears the highlight
  useEffect(() => {
    if (active === null) return undefined;
    const off = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) setActive(null);
    };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [active]);

  // touch / keyboard / reduced motion: put the glow on the item's centre
  const glowAt = (node) => {
    const el = sectionRef.current;
    if (!el || !node) return;
    const r = el.getBoundingClientRect();
    const n = node.getBoundingClientRect();
    moveGlow(n.left + n.width / 2 - r.left, n.top + n.height / 2 - r.top);
  };

  if (!list.length) return null;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative pb-[64px] pt-20 sm:pt-32 lg:pb-[80px] ${reduce ? 'sm-static' : inView ? '' : 'sm-paused'}`}
      style={{ background: BG, position: 'relative', zIndex: 1, overflow: 'clip' }}
    >
      <style>{DECOR_CSS}</style>

      {/* "Who we are" dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      {/* golden glow while an item is active (one composited div, moved with translate3d) */}
      <div ref={glowRef} aria-hidden className="sm-glow" style={{ opacity: active !== null ? 1 : 0 }} />

      <TestimonialsTree />
      <TestimonialsFallenLeaves />
      <TestimonialsFallingLeaves sectionRef={sectionRef} enabled={inView && !reduce} />

      <div className="relative z-[5] mx-auto max-w-7xl px-5 sm:px-8">
        <FadeUp className="lg:max-w-[50%]">
          <Eyebrow>{S.label}</Eyebrow>
          <h2 className="mt-5 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#2A1F1A] sm:text-5xl">
            {S.heading}
          </h2>
          {S.intro && <p className="mt-5 text-base leading-[1.8] text-[#374151] sm:text-lg">{S.intro}</p>}
        </FadeUp>

        <ul ref={listRef} className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-8 lg:mt-14 lg:w-[70%] xl:w-[80%] lg:grid-cols-3">
          {list.map((t, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li key={t.id || i}>
                <FadeUp delay={i * 0.1} className="h-full">
                  <figure
                    tabIndex={0}
                    aria-label={t.name ? `Testimonial from ${t.name}` : 'Client testimonial'}
                    className="flex h-full cursor-default flex-col items-start border-l-[#2A1F1A] outline-none transition-[opacity,box-shadow] duration-[350ms] focus-visible:ring-2 focus-visible:ring-[#1B4332]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#EAF1DF]"
                    style={{
                      opacity: dim ? 0.75 : 1,
                      borderLeftStyle: 'solid',
                      borderLeftWidth: 2,
                      paddingLeft: 18,
                      boxShadow: on ? 'inset 2px 0 0 #2A1F1A' : 'inset 0 0 0 transparent', // bar thickens, text stays put
                    }}
                    onPointerDown={(e) => {
                      pointer.current = e.pointerType;
                    }}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== 'mouse') return;
                      if (reduce) glowAt(e.currentTarget);
                      setActive(i);
                    }}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setActive((a) => (a === i ? null : a))}
                    onFocus={(e) => {
                      if (!e.currentTarget.matches(':focus-visible')) return;
                      glowAt(e.currentTarget);
                      setActive(i);
                    }}
                    onBlur={() => setActive((a) => (a === i ? null : a))}
                    onClick={(e) => {
                      if (pointer.current === 'mouse') return;
                      glowAt(e.currentTarget);
                      setActive((a) => (a === i ? null : i));
                    }}
                  >
                    <Avatar t={t} active={on} />
                    <blockquote className="mt-6 flex-1 font-serif text-base italic leading-[1.6] text-[#2A1F1A] lg:text-[17px]">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-5">
                      {t.name && <div className="font-['Space_Grotesk'] text-[17px] font-bold text-[#2A1F1A]">{t.name}</div>}
                      {t.project &&
                        (t.projectSlug ? (
                          <Link
                            to={`/projects/${t.projectSlug}`}
                            className="mt-1 inline-block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5C6E0A] underline decoration-[#5C6E0A]/30 underline-offset-4 transition-colors hover:decoration-[#5C6E0A]"
                          >
                            {t.project}
                          </Link>
                        ) : (
                          <div className="mt-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5C6E0A]">
                            {t.project}
                          </div>
                        ))}
                    </figcaption>
                  </figure>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
