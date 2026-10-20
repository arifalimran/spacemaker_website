// client/src/components/layout/SiteNav.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

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
            className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-[background-color,color] duration-500 sm:inline-flex"
            style={{ background: 'var(--nav-btn-bg)', color: 'var(--nav-btn-fg)' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-1 ring-[#2A1F1A]/40" />
            Book a Visit
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border xl:hidden"
            style={{ borderColor: 'var(--nav-bd)' }}
          >
            <span className={`h-[2px] w-5 bg-[color:var(--nav-brand)] transition ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-5 bg-[color:var(--nav-brand)] transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-5 bg-[color:var(--nav-brand)] transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border p-5 shadow-lg xl:hidden" style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-bd)' }}>
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-[color:var(--nav-fg)] hover:bg-[color:var(--nav-panel-hover)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
            style={{ background: 'var(--nav-btn-bg)', color: 'var(--nav-btn-fg)' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
            Book a Visit
          </a>
        </div>
      )}
    </header>
  );
}
