// client/src/components/layout/MobileMenu.jsx
// Full-screen mobile / tablet menu. A lime sheet wipes down, then the espresso menu follows it; the links rise
// out of masks one after another. Shows which section you are in (lime), quick contact actions, socials, address.
// transform / opacity only. Locks the page scroll (Lenis) while open. Esc, the close button or any link closes it.
// Reduced motion: appears and disappears with a plain fade.
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BRAND, CONTACT, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

const LIME = '#C6F00C';
const INK = '#2A1F1A';
const IVORY = '#F5F0E6';
const EASE = [0.76, 0, 0.24, 1];

const DESC = {
  About: 'Who we are',
  Projects: 'Places we build',
  Interiors: 'Rooms, finished',
  'Why Us': 'What you can count on',
  Testimonials: 'Words from our clients',
  Team: 'The people behind it',
  Landowners: 'Partner with us',
  Careers: 'Join the team',
  Contact: 'Visit or call us',
};

const SOCIAL = {
  facebook: { bg: '#1877F2', d: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8Z" /> },
  instagram: {
    bg: 'linear-gradient(45deg,#F9A13B 0%,#E1306C 50%,#833AB4 100%)',
    d: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>),
  },
  linkedin: { bg: '#0A66C2', d: (<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>) },
  youtube: { bg: '#FF0000', d: (<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>) },
};

/* the animated button that lives in the top bar */
export function MenuButton({ open, onClick }) {
  const bar = 'absolute left-[11px] h-[2px] w-[18px] rounded-full bg-[color:var(--nav-brand)] transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]';
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-haspopup="dialog"
      onClick={onClick}
      className="group relative flex h-11 items-center gap-2.5 rounded-full border pl-4 pr-1 xl:hidden"
      style={{ borderColor: 'var(--nav-bd)' }}
    >
      <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-[color:var(--nav-brand)]">Menu</span>
      <span className="relative h-9 w-9 rounded-full" style={{ background: LIME }}>
        <span className={`${bar} top-[13px]`} style={{ background: INK, transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} />
        <span className={`${bar} top-[21px]`} style={{ background: INK, transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
      </span>
    </button>
  );
}

export default function MobileMenu({ open, onClose, links, pathname }) {
  const reduce = useReducedMotion();
  const [activeKey, setActiveKey] = useState(null);
  const closeRef = useRef(null);
  const [hoverKey, setHoverKey] = useState(null);

  // page scroll lock + Esc + remember where the visitor is
  useEffect(() => {
    if (!open) return undefined;
    window.__lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const hdr = document.querySelector('header[data-sm-themed]');
    setActiveKey(hdr?.dataset.smSec || null);
    setHoverKey(null);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 450);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
      window.__lenis?.start();
    };
  }, [open, onClose]);

  const go = () => {
    window.__lenis?.start(); // so the hash scroll after the click is not swallowed
    onClose();
  };

  const wipe = (delay, dur) => (reduce ? { duration: 0.2 } : { duration: dur, delay, ease: EASE });
  const rise = (i) => (reduce ? { duration: 0 } : { duration: 0.7, delay: 0.38 + i * 0.055, ease: [0.22, 1, 0.36, 1] });
  const hotline = CONTACT.hotlines?.[0];
  const office = CONTACT.offices?.[0];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          {/* 1) lime sheet wipes down first */}
          <motion.div
            className="absolute inset-0"
            style={{ background: LIME }}
            initial={reduce ? { opacity: 0 } : { y: '-100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '-100%' }}
            transition={wipe(0, 0.55)}
          />
          {/* 2) espresso menu follows */}
          <motion.div
            className="absolute inset-0 flex flex-col overflow-y-auto"
            style={{ background: INK, color: IVORY }}
            initial={reduce ? { opacity: 0 } : { y: '-100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '-100%' }}
            transition={wipe(0.1, 0.6)}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(${LIME} 1px, transparent 1px)`, backgroundSize: '26px 26px' }} />

            {/* top row */}
            <div className="relative flex items-center justify-between px-5 pt-5">
              <Link to="/" onClick={go} className="flex items-center gap-3" aria-label="Space Maker home">
                <span className="rounded-xl bg-[#FAF8F5] p-1"><img src={BRAND.icon} alt="" className="h-9 w-9 rounded-lg object-cover" /></span>
                <span className="font-['Space_Grotesk'] text-base font-extrabold uppercase tracking-wide">Space Maker</span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 items-center gap-2.5 rounded-full border pl-4 pr-1"
                style={{ borderColor: 'rgba(245,240,230,.25)' }}
              >
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]">Close</span>
                <span className="relative h-9 w-9 rounded-full" style={{ background: LIME }}>
                  <span className="absolute left-[11px] top-[17px] h-[2px] w-[18px] rotate-45 rounded-full" style={{ background: INK }} />
                  <span className="absolute left-[11px] top-[17px] h-[2px] w-[18px] -rotate-45 rounded-full" style={{ background: INK }} />
                </span>
              </button>
            </div>

            {/* links */}
            <nav aria-label="Main" className="relative mt-6 flex-1 px-5">
              <ul onPointerLeave={(e) => e.pointerType === 'mouse' && setHoverKey(null)}>
                {(() => {
                  const hereLabel = links.find((l) => (l.k && l.k === activeKey && pathname === '/') || (l.to === '/careers' && pathname === '/careers') || (l.to === '/interiors' && pathname.startsWith('/interiors')))?.label;
                  const hl = hoverKey ?? hereLabel;
                  return links.map((l, i) => {
                    const here = l.label === hereLabel;
                    const hot = l.label === hl;
                    return (
                      <li
                        key={l.label}
                        className="relative border-b"
                        style={{ borderColor: 'rgba(245,240,230,.12)' }}
                        onPointerEnter={() => setHoverKey(l.label)}
                        onFocus={() => setHoverKey(l.label)}
                      >
                        {/* one highlight that glides from row to row */}
                        {hot && (
                          <motion.span
                            layoutId="menu-highlight"
                            aria-hidden
                            className="absolute inset-y-0 -inset-x-5 z-0"
                            style={{ background: 'linear-gradient(90deg, rgba(198,240,12,.20) 0%, rgba(198,240,12,.06) 55%, rgba(198,240,12,0) 100%)', boxShadow: `inset 3px 0 0 ${LIME}` }}
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 }}
                          />
                        )}
                        <Link to={l.to} onClick={go} className="group relative z-10 flex items-center gap-4 overflow-hidden py-3.5 active:opacity-80">
                          <motion.span
                            className="flex w-full items-center gap-4"
                            initial={reduce ? { opacity: 0 } : { y: '110%' }}
                            animate={reduce ? { opacity: 1 } : { y: 0 }}
                            transition={rise(i)}
                          >
                            <span className="w-6 font-['JetBrains_Mono'] text-[11px] tracking-[0.16em] transition-colors duration-300" style={{ color: hot ? LIME : 'rgba(245,240,230,.45)' }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className="block font-['Space_Grotesk'] text-[1.9rem] font-extrabold leading-[1.1] tracking-tight transition-[transform,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                                style={{ color: hot || here ? LIME : IVORY, transform: hot ? 'translateX(10px)' : 'none' }}
                              >
                                {l.label}
                              </span>
                              <span className="mt-0.5 block font-serif text-sm italic transition-[transform,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ color: hot ? 'rgba(245,240,230,.8)' : 'rgba(245,240,230,.55)', transform: hot ? 'translateX(10px)' : 'none' }}>{DESC[l.label]}</span>
                            </span>
                            {here ? (
                              <span className="flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em]" style={{ color: LIME }}>
                                <span className="h-2 w-2 rounded-full" style={{ background: LIME, boxShadow: '0 0 10px 2px rgba(198,240,12,.6)' }} />
                                You are here
                              </span>
                            ) : (
                              <span aria-hidden className="text-lg transition-[transform,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ color: hot ? LIME : 'rgba(245,240,230,.4)', transform: hot ? 'translateX(-4px)' : 'none' }}>→</span>
                            )}
                          </motion.span>
                        </Link>
                      </li>
                    );
                  });
                })()}
              </ul>
            </nav>

            {/* actions */}
            <motion.div
              className="relative px-5 pb-7 pt-6"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.38 + links.length * 0.055 + 0.05 }}
            >
              <a
                href={waLink(GENERAL_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLead({ channel: 'whatsapp', kind: 'menu-visit' })}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-base font-bold"
                style={{ background: LIME, color: INK }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: INK }} />
                Book a visit on WhatsApp
              </a>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {hotline && (
                  <a href={`tel:${hotline.tel}`} className="rounded-2xl border px-4 py-3" style={{ borderColor: 'rgba(245,240,230,.25)' }}>
                    <span className="block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(245,240,230,.65)' }}>Call</span>
                    <span className="mt-0.5 block text-sm font-semibold">{hotline.display}</span>
                  </a>
                )}
                <a href={`mailto:${CONTACT.email}`} className="rounded-2xl border px-4 py-3" style={{ borderColor: 'rgba(245,240,230,.25)' }}>
                  <span className="block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(245,240,230,.65)' }}>Email</span>
                  <span className="mt-0.5 block truncate text-sm font-semibold">{CONTACT.email}</span>
                </a>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <ul className="flex gap-2.5">
                  {(CONTACT.social || []).map((s) => {
                    const b = SOCIAL[s.key];
                    if (!b) return null;
                    const icon = (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{b.d}</svg>
                    );
                    return (
                      <li key={s.key}>
                        {s.href ? (
                          <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: b.bg }}>{icon}</a>
                        ) : (
                          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: b.bg }}>{icon}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {office && <p className="max-w-[11rem] text-right text-xs leading-snug" style={{ color: 'rgba(245,240,230,.65)' }}>{office.name}, {office.address.split(',').slice(-1)[0].trim()}</p>}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
