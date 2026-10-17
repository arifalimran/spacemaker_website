// client/src/components/home/Testimonials.jsx
// "In their words" (v2), directly after Why Choose Us.
// Background = the same warm off-white + faint dot grid as "Who we are". Top = clean straight edge
// against the espresso above; the last ~120px blend into pale lime #EEF4DD (ready for Team).
// Decor (aria-hidden, behind the text unless noted): golden glow, swaying tree (bottom-right),
// lawn along the bottom, falling leaves (back layer behind / front layer above the text).
// Testimonials are open items (no cards): lime left bar, grayscale photo, Playfair italic quote.
// Hover / keyboard focus / tap highlights one item and dims the others; tap again or outside clears.
// Data: testimonialsSection + testimonials in data/siteContent.js (every field optional-safe).
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials, testimonialsSection as S } from '../../data/siteContent';
import { Eyebrow } from '../portfolio/shared';
import TestimonialsTree, { FLUTTER_CSS } from './TestimonialsTree';
import TestimonialsLawn from './TestimonialsLawn';
import TestimonialsFallingLeaves from './TestimonialsFallingLeaves';

const BG = '#F3EFE6'; // "Who we are" warm off-white
const PALE_LIME = '#EEF4DD';
const LIME = '#C6F00C';
const ring = (w) => `0 0 0 3px ${BG}, 0 0 0 ${w}px ${LIME}`;

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
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const pointer = useRef('mouse');

  // in view? (decor animations + falling leaves run only then)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    // ~25% of the section visible, or (tall section on a short screen) it fills 25% of the viewport
    const io = new IntersectionObserver(
      ([e]) => {
        const vh = e.rootBounds?.height || window.innerHeight;
        setInView(e.isIntersecting && (e.intersectionRatio >= 0.25 || e.intersectionRect.height >= vh * 0.25));
      },
      { threshold: [0, 0.1, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        el.style.setProperty('--gx', `${(pt.clientX - r.left).toFixed(0)}px`);
        el.style.setProperty('--gy', `${(pt.clientY - r.top).toFixed(0)}px`);
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
    el.style.setProperty('--gx', `${(n.left + n.width / 2 - r.left).toFixed(0)}px`);
    el.style.setProperty('--gy', `${(n.top + n.height / 2 - r.top).toFixed(0)}px`);
  };

  if (!list.length) return null;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative pb-36 pt-24 md:pb-44 md:pt-32"
      style={{ background: BG, zIndex: 1, overflowX: 'clip', '--gx': '50%', '--gy': '50%' }}
    >
      <style>{FLUTTER_CSS}</style>

      {/* "Who we are" dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      {/* last ~120px blend into pale lime */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[120px]"
        style={{ background: `linear-gradient(to bottom, rgba(243,239,230,0), ${PALE_LIME})` }}
      />
      {/* golden glow while an item is active */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-[400ms]"
        style={{
          opacity: active !== null ? 1 : 0,
          background: 'radial-gradient(260px circle at var(--gx) var(--gy), rgba(232,184,96,.30), transparent 70%)',
        }}
      />

      <TestimonialsTree running={inView} reduce={reduce} />
      <TestimonialsLawn sectionRef={sectionRef} running={inView} reduce={reduce} />
      <TestimonialsFallingLeaves sectionRef={sectionRef} enabled={inView && !reduce} />

      <div className="relative z-[5] mx-auto max-w-7xl px-5 sm:px-8">
        <FadeUp className="lg:max-w-[50%]">
          <Eyebrow>{S.label}</Eyebrow>
          <h2 className="mt-5 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#2A1F1A] sm:text-5xl">
            {S.heading}
          </h2>
          {S.intro && <p className="mt-5 text-base leading-[1.8] text-[#374151] sm:text-lg">{S.intro}</p>}
        </FadeUp>

        <ul ref={listRef} className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-8 lg:mt-14 lg:w-[68%] lg:grid-cols-3">
          {list.map((t, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li key={t.id || i}>
                <FadeUp delay={i * 0.1} className="h-full">
                  <figure
                    tabIndex={0}
                    aria-label={t.name ? `Testimonial from ${t.name}` : 'Client testimonial'}
                    className="flex h-full cursor-default flex-col items-start border-l-[#C6F00C] outline-none transition-[opacity,border-width,padding] duration-[350ms] focus-visible:ring-2 focus-visible:ring-[#1B4332]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F3EFE6]"
                    style={{
                      opacity: dim ? 0.5 : 1,
                      borderLeftStyle: 'solid',
                      borderLeftWidth: on ? 4 : 2,
                      paddingLeft: on ? 16 : 18, // text stays put while the bar thickens
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
                    <blockquote className="mt-6 flex-1 font-serif text-base italic leading-[1.6] text-[#2A1F1A] lg:text-lg">
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
