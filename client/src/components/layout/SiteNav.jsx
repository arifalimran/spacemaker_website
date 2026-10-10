// client/src/components/layout/SiteNav.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

/* Simple, plain names. Hash links go to the home page sections. */
const LINKS = [
  { label: 'Residences', to: { pathname: '/', hash: '#residences' } },
  { label: 'Our Story', to: { pathname: '/', hash: '#about' } },
  { label: 'Why Us', to: { pathname: '/', hash: '#why-us' } },
  { label: 'For Landowners', to: { pathname: '/', hash: '#land' } },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

const linkCls =
  "relative text-[13px] font-medium text-neutral-700 transition hover:text-[#1B4332] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C6F00C] after:transition-all hover:after:w-full";

function Logo() {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B4332] text-[#C6F00C]">▲</span>
  ) : (
    <img
      src={BRAND.icon}
      alt="Space Maker"
      onError={() => setFailed(true)}
      className="h-11 w-11 rounded-xl object-cover"
    />
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF8F5]/90 px-4 py-3 shadow-sm backdrop-blur-md md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span>
            <span className="block text-base font-bold uppercase leading-none tracking-wide text-[#1B4332]">
              Space Maker
            </span>
            <span className="mt-1 block text-[11px] text-neutral-500">where space defines luxury</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`${linkCls} ${l.to === '/careers' && pathname === '/careers' ? 'text-[#1B4332] after:w-full' : ''}`}
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
            className="hidden items-center gap-2 rounded-xl bg-[#1B4332] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#14331f] sm:inline-flex"
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
            Book a Visit
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-neutral-200 lg:hidden"
          >
            <span className={`h-[2px] w-5 bg-[#1B4332] transition ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-5 bg-[#1B4332] transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-5 bg-[#1B4332] transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-neutral-200/70 bg-[#FAF8F5]/95 p-5 shadow-lg backdrop-blur-md lg:hidden">
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-neutral-800 hover:bg-[#EDF4EC]"
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
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-4 py-3 text-sm font-semibold text-white"
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
            Book a Visit
          </a>
        </div>
      )}
    </header>
  );
}
