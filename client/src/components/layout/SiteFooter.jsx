// client/src/components/layout/SiteFooter.jsx
// Solid espresso footer (#2A1F1A), ivory text, lime hover accents.
// Also the "Contact" target in the nav. Everything comes from CONTACT / BRAND in data/portfolio.js.
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, CONTACT, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

const head = "font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F0E6]/70";
const lk = 'inline-block text-sm text-[#F5F0E6]/90 transition-[color,text-shadow,transform] duration-300 hover:translate-x-0.5 hover:text-[#C6F00C] hover:[text-shadow:0_0_14px_rgba(198,240,12,.6)]';
const sub = 'text-[11px] uppercase tracking-wider text-[#F5F0E6]/80';

const QUICK_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Interiors', to: '/interiors' },
  { label: 'About', to: { pathname: '/', hash: '#about' } },
  { label: 'Why Us', to: { pathname: '/', hash: '#why-us' } },
  { label: 'Landowners', to: { pathname: '/', hash: '#land' } },
  { label: 'Careers', to: '/careers' },
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
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8Z" />,
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
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
};

function SocialRow({ items = [] }) {
  if (!items.length) return null;
  const box = 'flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300';
  return (
    <ul className="sm-soc mt-6 flex flex-wrap gap-3">
      <style>{`.sm-soc:hover .sm-soc-i:not(:hover){opacity:.55}.sm-soc-i{transition:opacity .3s,transform .3s,box-shadow .3s}.sm-soc-i:hover{box-shadow:var(--g);transform:translateY(-4px) scale(1.1)}`}</style>
      {items.map((s) => {
        const icon = (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {SOCIAL_ICONS[s.key] || <circle cx="12" cy="12" r="8" />}
          </svg>
        );
        return (
          <li key={s.key || s.label}>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                style={{ background: BRAND_BG[s.key] || '#555', '--g': BRAND_GLOW[s.key] }}
                className={`${box} sm-soc-i`}
              >
                {icon}
              </a>
            ) : (
              // placeholder until the real page URL is added in the admin / data file
              <span title={`[${s.label} link]`} aria-hidden className={`${box} sm-soc-i`} style={{ background: BRAND_BG[s.key] || '#555', '--g': BRAND_GLOW[s.key] }}>
                {icon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function SiteFooter() {
  const waDisplay = CONTACT.whatsappDisplay || `+${CONTACT.whatsapp}`;
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#2A1F1A] text-[#F5F0E6]">

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        {/* visit CTA */}
        <div className="flex flex-col gap-6 border-b border-[#F5F0E6]/12 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#F5F0E6] sm:text-4xl">
              Let us show you around.
            </h2>
            <p className="mt-3 max-w-md text-[#F5F0E6]/85">Visit a site, see the drawings, ask anything. We answer personally.</p>
          </div>
          <a
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-visit' })}
            className="relative isolate inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border-[1.5px] border-[#F5F0E6] px-5 py-3.5 text-sm font-semibold text-[#F5F0E6] transition-[color,box-shadow] duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#F5F0E6] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:shadow-[0_0_24px_rgba(198,240,12,.45)] hover:before:translate-y-0 sm:w-auto"
          >
            <span className="h-2 w-2 rounded-full bg-[#C6F00C]" />
            Book a visit on WhatsApp
          </a>
        </div>

        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Space Maker home">
              <span className="rounded-lg bg-[#F5F0E6] p-1.5"><img src={BRAND.icon} alt="" className="h-9 w-auto" loading="lazy" /></span>
              <span className="font-['Space_Grotesk'] text-xl font-extrabold tracking-tight text-[#F5F0E6]">Space Maker</span>
            </Link>
            {CONTACT.tagline && <p className="mt-4 font-serif text-lg italic text-[#F5F0E6]/90">{CONTACT.tagline}</p>}
            {CONTACT.footerLine && (
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#F5F0E6]/80">{CONTACT.footerLine}</p>
            )}
            <SocialRow items={CONTACT.social} />
          </div>

          {/* quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <div className={head}>Explore</div>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={lk}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* offices */}
          <div className="lg:col-span-3">
            <div className={head}>Offices</div>
            <ul className="mt-4 grid gap-5">
              {CONTACT.offices.map((o) => (
                <li key={o.name}>
                  <div className="text-sm font-semibold text-[#F5F0E6]">{o.name}</div>
                  <div className="mt-1 text-sm leading-relaxed text-[#F5F0E6]/80">{o.address}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <div className={head}>Talk to us</div>
            <ul className="mt-4 grid gap-3.5">
              <li>
                <div className={sub}>WhatsApp</div>
                <a
                  href={waLink(GENERAL_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-contact' })}
                  className={`${lk} font-semibold`}
                >
                  {waDisplay}
                </a>
              </li>
              {CONTACT.hotlines.map((h) => (
                <li key={h.tel}>
                  <div className={sub}>{h.label}</div>
                  <a href={`tel:${h.tel}`} className={`${lk} font-semibold`}>{h.display}</a>
                </li>
              ))}
              <li>
                <div className={sub}>Email</div>
                <a href={`mailto:${CONTACT.email}`} className={`${lk} break-all font-semibold`}>{CONTACT.email}</a>
              </li>
              {CONTACT.messenger && (
                <li>
                  <a href={CONTACT.messenger} target="_blank" rel="noreferrer" className={lk}>Message on Facebook →</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[#F5F0E6]/12 pt-6 text-xs text-[#F5F0E6]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Space Maker Limited. All rights reserved.</span>
          <Link to="/projects" className="text-[#C6F00C] transition-opacity hover:opacity-75">All projects →</Link>
        </div>
      </div>
    </footer>
  );
}
