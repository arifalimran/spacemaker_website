import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BanyanMark from './BanyanMark';
import { brand, navLinks, navCta, waLink } from '../../data/siteContent';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 pt-3">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#FAF8F5]/90 backdrop-blur-md shadow-[0_6px_30px_-12px_rgba(27,67,50,0.35)] border border-[#1B4332]/10'
            : 'py-4 bg-transparent'
        }`}
        aria-label="Primary"
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3" aria-label="Space Maker home">
          <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#1B4332] text-[#C6F00C] shrink-0">
            <BanyanMark className="w-9 h-9" />
          </span>
          <span className="leading-none">
            <span className="f-display block text-xl font-bold text-[#1B4332] tracking-wide">
              SPACE MAKER
            </span>
            <span className="block text-[11px] text-[#1B4332]/70 mt-1">{brand.tagline}</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#374151]">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-[#1B4332] transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waLink(navCta.message)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !py-2.5 !px-4 hidden sm:inline-flex"
          >
            <span className="dot" />
            {navCta.label}
          </a>
          <button
            className="lg:hidden p-2 rounded-lg text-[#1B4332] hover:bg-[#1B4332]/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 rounded-2xl bg-[#FAF8F5] border border-[#1B4332]/10 shadow-xl p-5">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-[#111827] border-b border-[#1B4332]/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={waLink(navCta.message)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary w-full justify-center mt-4"
          >
            <span className="dot" />
            {navCta.label}
          </a>
        </div>
      )}
    </header>
  );
}
