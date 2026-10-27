// client/src/components/layout/SiteNav.jsx
import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GENERAL_MESSAGE, projects, upcoming, interiorProjects, TYPE_LABEL } from '../../data/portfolio';
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

/* Hover menus under Projects and Interiors. Counts come from the data, so they follow the back end. */
const countBy = (list, fn) => list.filter(fn).length;
const SUBMENU = {
  Projects: [
    { label: 'All projects', to: '/projects', n: projects.length + upcoming.length, lead: true },
    { label: 'Active', to: '/projects?status=active', n: countBy(projects, (p) => p.status === 'active') },
    { label: 'Handed over', to: '/projects?status=completed', n: countBy(projects, (p) => p.status === 'completed') },
    { label: 'Opening soon', to: '/projects?status=upcoming', n: upcoming.length },
  ],
  Interiors: [
    { label: 'All interiors', to: '/interiors', n: interiorProjects.length, lead: true },
    ...['residential', 'commercial'].map((t) => ({
      label: t === 'commercial' ? 'Commercial projects' : TYPE_LABEL[t] || t,
      to: `/interiors?type=${t}`,
      n: countBy(interiorProjects, (p) => p.type === t) || 'Soon',
    })),
  ],
};

const DD_CSS = `
.sm-dd-p{position:absolute;left:50%;top:100%;padding-top:20px;opacity:0;visibility:hidden;transform:translate(-50%,8px);transition:opacity .22s ease,transform .3s cubic-bezier(.22,1,.36,1),visibility 0s linear .3s}
.sm-dd:hover .sm-dd-p,.sm-dd:focus-within .sm-dd-p{opacity:1;visibility:visible;transform:translate(-50%,0);transition-delay:0s}
.sm-dd-i{opacity:0;transform:translateY(7px);transition:opacity .28s ease,transform .35s cubic-bezier(.22,1,.36,1),background-color .2s}
.sm-dd:hover .sm-dd-i,.sm-dd:focus-within .sm-dd-i{opacity:1;transform:none;transition-delay:calc(var(--i)*55ms + 50ms),calc(var(--i)*55ms + 50ms),0s}
.sm-dd-i:hover{background:var(--nav-panel-hover)}
.sm-dd-i .sm-u{transition:width .3s cubic-bezier(.22,1,.36,1)}
.sm-dd-i:hover .sm-u{width:100%}
.sm-dd-i .sm-ar{transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0;transform:translateX(-6px)}
.sm-dd-i:hover .sm-ar{opacity:1;transform:none}
.sm-dd .sm-cv{transition:transform .3s}
.sm-dd:hover .sm-cv,.sm-dd:focus-within .sm-cv{transform:rotate(180deg)}
.sm-lg-l{opacity:0;transition:opacity .5s}
.sm-lg-d{transition:opacity .5s}
[data-sm-theme="dark"] .sm-lg-l{opacity:1}
[data-sm-theme="dark"] .sm-lg-d{opacity:0}
@media (prefers-reduced-motion:reduce){.sm-dd-p,.sm-dd-i{transition:none!important}}
`;

// colours come from CSS variables set by SectionWatcher (light/dark), so the bar changes with the section
const linkCls =
  "relative text-[13px] font-medium text-[color:var(--nav-fg)] transition-colors duration-500 hover:text-[color:var(--nav-hover)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C6F00C] after:transition-all hover:after:w-full";

/* The real logo: tree mark + wordmark, with the slogan as live text so it stays sharp and readable.
   Two colour versions are stacked; the top bar's theme decides which one shows. */
const ASSET = '/assets/00_brand';
function Logo() {
  const pair = (name, cls) => (
    <>
      <img src={`${ASSET}/logo-${name}.png`} alt="" className={`sm-lg-d absolute inset-0 h-full w-full object-contain ${cls}`} />
      <img src={`${ASSET}/logo-${name}-light.png`} alt="" aria-hidden className={`sm-lg-l absolute inset-0 h-full w-full object-contain ${cls}`} />
    </>
  );
  return (
    <span className="flex items-center gap-3">
      <span className="relative block h-11 w-[39px] flex-none">{pair('mark', '')}</span>
      <span className="block">
        <span className="relative block h-9 w-[85px]">{pair('word', '')}</span>
        <span className="mt-0.5 block whitespace-nowrap text-[9px] font-semibold leading-none tracking-[0.03em] text-[color:var(--nav-brand)] transition-colors duration-500">
          where space defines luxury
        </span>
      </span>
    </span>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  const { pathname } = useLocation();

  return (
    <header data-sm-themed className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <style>{DD_CSS}</style>
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 shadow-sm transition-[background-color,border-color] duration-500 ease-in-out md:px-6" style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-bd)' }}>
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="Space Maker home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-5 xl:flex 2xl:gap-6">
          {LINKS.map((l) => {
            const active = (l.to === '/careers' && pathname === '/careers') || (l.to === '/interiors' && pathname.startsWith('/interiors')) || (l.label === 'Projects' && pathname.startsWith('/projects'));
            const link = (
              <Link
                key={l.label}
                to={l.to}
                className={`${linkCls} ${l.k ? `sm-l-${l.k}` : ''} ${active ? 'text-[color:var(--nav-hover)] after:w-full' : ''}`}
              >
                {l.label}
              </Link>
            );
            const items = SUBMENU[l.label];
            if (!items) return link;
            return (
              <div key={l.label} className="sm-dd relative flex items-center gap-1">
                {link}
                <svg aria-hidden width="9" height="9" viewBox="0 0 12 12" className="sm-cv text-[color:var(--nav-fg)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4.5 6 8.5 10 4.5" /></svg>
                <div className="sm-dd-p z-10">
                  <div className="w-64 rounded-2xl border p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,.35)]" style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-bd)' }}>
                    {items.map((it, i) => (
                      <Link key={it.label} to={it.to} style={{ '--i': i }} className={`sm-dd-i flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 ${it.lead ? 'bg-[#C6F00C]/25' : ''}`}>
                        <span className="relative">
                          <span className={`text-[13.5px] ${it.lead ? 'font-bold' : 'font-medium'} text-[color:var(--nav-fg)]`}>{it.label}</span>
                          <span className="sm-u absolute -bottom-0.5 left-0 block h-[2px] w-0 bg-[#C6F00C]" />
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="rounded-full bg-[#C6F00C]/60 px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-semibold text-[#1A120E]">{it.n}</span>
                          <span aria-hidden className="sm-ar text-[color:var(--nav-hover)]">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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

      <MobileMenu open={open} onClose={closeMenu} links={LINKS.map((l) => ({ ...l, sub: SUBMENU[l.label] }))} pathname={pathname} />
    </header>
  );
}
