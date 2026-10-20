// client/src/components/layout/SiteNav.jsx
import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';
import MobileMenu, { MenuButton } from './MobileMenu';

/* Simple, plain names, in page order. Hash links go to the home page sections. */
const LINKS = [
  { label: 'About', k: 'about', to: { pathname: '/', hash: '#about' } },
  { label: 'Projects', k: 'projects', to: { pathname: '/', hash: '#projects' } },
  { label: 'Interiors', to: '/interiors' },
  { label: 'Why Us', k: 'why', to: { pathname: '/', hash: '#why-us' } },
  { label: 'Testimonials', k: 'testimonials', to: { pathname: '/', hash: '#testimonials' } },
  { label: 'Team', k: 'team', to: { pathname: '/', hash: '#team' } },
  { label: 'Landowners', k: 'land', to: { pathname: '/', hash: '#land' } },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', k: 'contact', to: { pathname: '/', hash: '#contact' } },
];

// colours come from CSS variables set by SectionWatcher (light/dark), so the bar changes with the section
const linkCls =
  "relative text-[13px] font-medium text-[color:var(--nav-fg)] transition-colors duration-500 hover:text-[color:var(--nav-hover)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C6F00C] after:transition-all hover:after:w-full";

function Logo() {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF8F5] text-[#1B4332]">▲</span>
  ) : (
    <img
      src={BRAND.icon}
      alt="Space Maker"
      onError={() => setFailed(true)}
      className="h-11 w-11 rounded-xl bg-[#FAF8F5] object-cover"
    />
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  const { pathname } = useLocation();

  return (
    <header data-sm-themed className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 shadow-sm transition-[background-color,border-color] duration-500 ease-in-out md:px-6" style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-bd)' }}>
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span>
            <span className="block text-base font-bold uppercase leading-none tracking-wide text-[color:var(--nav-brand)] transition-colors duration-500">
              Space Maker
            </span>
            <span className="mt-1 block text-[11px] text-[color:var(--nav-sub)] transition-colors duration-500">where space defines luxury</span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 xl:flex 2xl:gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`${linkCls} ${l.k ? `sm-l-${l.k}` : ''} ${(l.to === '/careers' && pathname === '/careers') || (l.to === '/interiors' && pathname.startsWith('/interiors')) ? 'text-[color:var(--nav-hover)] after:w-full' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead({ channel: 'whatsapp', kind: 'nav-visit' })}
            className="sm-book group relative hidden rounded-full p-[1.5px] transition-[transform,box-shadow] duration-500 hover:shadow-[0_0_30px_rgba(198,240,12,.5)] active:scale-[0.97] sm:inline-flex"
          >
            <style>{`
              @keyframes smSpin{to{transform:rotate(360deg)}}
              @keyframes smShine{0%{transform:translateX(-140%) skewX(-20deg)}100%{transform:translateX(260%) skewX(-20deg)}}
              .sm-book:hover .sm-shine{animation:smShine .9s ease-out}
              @media (prefers-reduced-motion:reduce){.sm-ring{animation:none!important}}
            `}</style>
            {/* a lime light that runs around the edge */}
            <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
              <span
                className="sm-ring absolute left-1/2 top-1/2 aspect-square w-[420%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ background: 'conic-gradient(from 0deg, transparent 0 62%, rgba(198,240,12,.15) 74%, #C6F00C 90%, transparent 100%)', animation: 'smSpin 3.2s linear infinite' }}
              />
            </span>
            <span
              className="relative flex items-center gap-3 overflow-hidden rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold"
              style={{ background: 'var(--nav-btn-bg)', color: 'var(--nav-btn-fg)' }}
            >
              {/* light sweep on hover */}
              <span aria-hidden className="sm-shine pointer-events-none absolute inset-y-0 left-0 w-1/3" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)', transform: 'translateX(-140%) skewX(-20deg)' }} />
              <span aria-hidden className="relative h-2 w-2 flex-none">
                <span className="absolute inset-0 rounded-full motion-safe:animate-ping" style={{ background: '#C6F00C', opacity: 0.6 }} />
                <span className="absolute inset-0 rounded-full" style={{ background: '#C6F00C' }} />
              </span>
              <span className="relative block h-[1.3em] overflow-hidden">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1/2">
                  <span className="block h-[1.3em] leading-[1.3em]">Book a Visit</span>
                  <span className="block h-[1.3em] leading-[1.3em]" style={{ color: '#C6F00C' }}>Message us</span>
                </span>
              </span>
              <span className="relative flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-110" style={{ background: '#C6F00C', color: '#2A1F1A' }}>
                {/* the arrow leaves right, a new one arrives from the left */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="absolute transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-7">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="absolute -translate-x-7 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </a>
          <MenuButton open={open} onClick={() => setOpen((o) => !o)} />
        </div>
      </nav>

      <MobileMenu open={open} onClose={closeMenu} links={LINKS} pathname={pathname} />
    </header>
  );
}
