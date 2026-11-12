// client/src/components/layout/SiteFooter.jsx
// Compact espresso footer: brand, links, offices, contact, and a wordmark that
// bleeds off the bottom edge. Counts and links come from the data, so they follow the back end. Also the "Contact" target in the nav.
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

// column titles + "Back to top": lime neon (static text-shadow glow, no filters)
const head = "sm-neon font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em]";
const lk = 'sm-fl relative inline-block text-base font-medium text-[#BBA992] transition-colors duration-300 hover:text-[#C7D17F]';
// highlighted labels (WhatsApp, hotline, Email) and office names: bright cream with a small lime dot
const sub = "sm-hl font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.16em]";

const QUICK_LINKS = [
  { label: 'About', to: { pathname: '/', hash: '#about' } },
  { label: 'Why Us', to: { pathname: '/', hash: '#why-us' } },
  { label: 'Testimonials', to: { pathname: '/', hash: '#testimonials' } },
  { label: 'Team', to: { pathname: '/', hash: '#team' } },
  { label: 'Landowners', to: { pathname: '/', hash: '#land' } },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];
const PROJECT_LINKS = [
  { label: 'Active projects', to: '/projects?status=active' },
  { label: 'Completed projects', to: '/projects?status=completed' },
  { label: 'Interiors', to: '/interiors' },
];
const CAREER_LINKS = [
  { label: 'Careers', to: '/careers' },
  { label: 'Open positions', to: '/careers/openings' },
  { label: 'Flexible work', to: { pathname: '/', hash: '#careers' } },
];

// official brand colours (Instagram uses its gradient)
const BRAND_GLOW = {
  facebook: '0 0 18px 3px rgba(24,119,242,.75)',
  instagram: '0 0 18px 3px rgba(225,48,108,.75)',
  linkedin: '0 0 18px 3px rgba(10,102,194,.8)',
  youtube: '0 0 18px 3px rgba(255,0,0,.75)',
};
const BRAND_BG = {
  facebook: '#1877F2',
  instagram: 'linear-gradient(45deg,#F9A13B 0%,#E1306C 50%,#833AB4 100%)',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
};

const SOCIAL_ICONS = {
  facebook: (
    <g transform="translate(12 12) scale(.9) translate(-13 -12)">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </g>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  youtube: (
    <g transform="translate(12 12) scale(.94) translate(-12 -12)">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </g>
  ),
};

function SocialRow({ items = [] }) {
  if (!items.length) return null;
  const box = 'flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300';
  return (
    <ul className="sm-soc mt-7 flex flex-nowrap gap-3">
      {items.map((s) => {
        const icon = (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {SOCIAL_ICONS[s.key] || <circle cx="12" cy="12" r="8" />}
          </svg>
        );
        const style = { background: BRAND_BG[s.key] || '#555', '--g': BRAND_GLOW[s.key] };
        return (
          <li key={s.key || s.label}>
            {s.href ? (
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={style} className={`${box} sm-soc-i`}>
                {icon}
              </a>
            ) : (
              // placeholder until the real page URL is added in the data file
              <span title={`[${s.label} link]`} aria-hidden className={`${box} sm-soc-i`} style={style}>
                {icon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const FOOTER_CSS = `
.sm-fl::after{content:"";position:absolute;left:0;bottom:-3px;height:2px;width:0;background:#A9B957;transition:width .3s cubic-bezier(.22,1,.36,1)}
.sm-fl:hover::after{width:100%}
.sm-neon{color:#C6F00C;text-shadow:0 0 4px rgba(198,240,12,.55),0 0 12px rgba(198,240,12,.35),0 0 22px rgba(198,240,12,.18)}
button.sm-neon{transition:text-shadow .3s}
button.sm-neon:hover,button.sm-neon:focus-visible{text-shadow:0 0 5px rgba(198,240,12,.75),0 0 16px rgba(198,240,12,.5),0 0 30px rgba(198,240,12,.3)}
.sm-hl{display:flex;align-items:center;gap:.5rem;color:#F5F0E6}
.sm-hl::before{content:"";width:6px;height:6px;border-radius:999px;background:#C6F00C;flex:none}
.sm-soc:hover .sm-soc-i:not(:hover){opacity:.55}
.sm-soc-i{transition:opacity .3s,transform .3s,box-shadow .3s}
.sm-soc-i:hover{filter:brightness(1.12) saturate(1.1);box-shadow:var(--g),0 0 0 2px rgba(255,255,255,.55);transform:translateY(-4px) scale(1.1)}
@media (prefers-reduced-motion:reduce){.sm-soc-i,button.sm-neon{transition:none!important}}
`;

export default function SiteFooter() {
  const waDisplay = CONTACT.whatsappDisplay || `+${CONTACT.whatsapp}`;
  const digits = (v = '') => String(v).replace(/\D/g, '');
  // one number used for both WhatsApp and the hotline: show it once
  const hotlines = CONTACT.hotlines.filter((h) => digits(h.tel) !== digits(CONTACT.whatsapp));
  const sameNumber = hotlines.length < CONTACT.hotlines.length;
  return (
    <footer id="contact" className="relative overflow-hidden text-[#BBA992]" style={{ background: '#2A1F1A' }}>
      <style>{FOOTER_CSS}</style>

      <div className="relative mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16">
        <div className={`grid gap-10 sm:grid-cols-2 lg:flex lg:justify-between lg:gap-10`}>
          {/* brand */}
          <div>
            <Link to="/" className="inline-block" aria-label="Space Maker home">
              <img src="/assets/00_brand/logo-lockup-taupe.png" alt="Space Maker, where space defines luxury" className="h-14 w-auto sm:h-[4.25rem]" loading="lazy" />
            </Link>
            {CONTACT.footerLine && <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-[#BBA992]">{CONTACT.footerLine}</p>}
            <SocialRow items={CONTACT.social} />
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <div className={head}>Explore</div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={lk}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* projects + careers */}
          <nav aria-label="Projects and careers">
            <div className={head}>Projects</div>
            <ul className="mt-6 grid gap-4">
              {PROJECT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={lk}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className={`${head} mt-9`}>Careers</div>
            <ul className="mt-6 grid gap-4">
              {CAREER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={lk}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* offices */}
          <div className="lg:w-[17rem]">
            <div className={head}>Offices</div>
            <ul className="mt-6 grid gap-6">
              {CONTACT.offices.map((o) => (
                <li key={o.name}>
                  <div className={`${sub} text-xs`}>{o.name}</div>
                  <div className="mt-2 text-base leading-relaxed text-[#BBA992]">{o.address}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <div className={head}>Talk to us</div>
            <ul className="mt-6 grid gap-5">
              <li>
                <div className={sub}>{sameNumber ? 'WhatsApp & hotline' : 'WhatsApp'}</div>
                <a
                  href={waLink(GENERAL_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-contact' })}
                  className={`${lk} mt-1.5 block font-semibold`}
                >
                  {waDisplay}
                </a>
              </li>
              {hotlines.map((h) => (
                <li key={h.tel}>
                  <div className={sub}>{h.label}</div>
                  <a href={`tel:${h.tel}`} className={`${lk} mt-1.5 block font-semibold`}>{h.display}</a>
                </li>
              ))}
              <li>
                <div className={sub}>Email</div>
                <a href={`mailto:${CONTACT.email}`} className={`${lk} mt-1.5 block break-all font-semibold`}>{CONTACT.email}</a>
              </li>
            </ul>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-visit' })}
              className="relative isolate mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border-[1.5px] border-[#BBA992] bg-[#BBA992] px-7 py-4 text-base font-semibold text-[#2A1F1A] transition-[color] duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#A9B957] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#2A1F1A]" />
              Book a visit
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-2 border-t border-[#F5F0E6]/10 pt-6 text-sm text-[#A39380] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Space Maker Limited. All rights reserved.</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="sm-neon self-start font-semibold sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>

        {/* "SPACE MAKER" on one line, inside the page margins, dissolving downward into the espresso */}
        <div aria-hidden className="pointer-events-none mt-10 select-none pb-8 sm:mt-12 sm:pb-10">
          <img
            src="/assets/00_brand/logo-oneline-dissolve-p2.png"
            alt=""
            className="block h-auto w-full"
            style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.6) 45%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.6) 45%, transparent 100%)' }}
            loading="lazy"
          />
        </div>
      </div>

    </footer>
  );
}
