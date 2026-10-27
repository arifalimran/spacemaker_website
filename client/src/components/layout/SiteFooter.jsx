// client/src/components/layout/SiteFooter.jsx
// Compact sand footer. One slim "Find your home" strip (project filters + interiors, with live counts) sits on top and is hidden
// on /projects and /interiors, where the page is already the finder. Then brand, links, offices, contact, and a wordmark that
// bleeds off the bottom edge. Counts and links come from the data, so they follow the back end. Also the "Contact" target in the nav.
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACT, GENERAL_MESSAGE, projects, upcoming, interiorProjects } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

const head = "font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5F6B1F]";
const lk = 'sm-fl relative inline-block text-sm font-medium text-[#2A1F1A]/85 transition-colors duration-300 hover:text-[#2A1F1A]';
const sub = "font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#2A1F1A]/60";

const count = (list, fn) => list.filter(fn).length;

// the heart of the footer: the project filters and the interiors, with counts
const BROWSE = [
  { label: 'Active', to: '/projects?status=active', n: count(projects, (p) => p.status === 'active') },
  { label: 'Handed over', to: '/projects?status=completed', n: count(projects, (p) => p.status === 'completed') },
  { label: 'Opening soon', to: '/projects?status=upcoming', n: upcoming.length },
  { label: 'All projects', to: '/projects', n: projects.length + upcoming.length },
];
const BROWSE_INTERIORS = [{ label: 'Interiors', to: '/interiors', n: interiorProjects.length }];

const QUICK_LINKS = [
  { label: 'About', to: { pathname: '/', hash: '#about' } },
  { label: 'Why Us', to: { pathname: '/', hash: '#why-us' } },
  { label: 'Testimonials', to: { pathname: '/', hash: '#testimonials' } },
  { label: 'Landowners', to: { pathname: '/', hash: '#land' } },
  { label: 'Careers', to: '/careers' },
  { label: 'Team', to: { pathname: '/', hash: '#team' } },
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
  const box = 'flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300';
  return (
    <ul className="sm-soc mt-5 flex flex-wrap gap-3">
      <style>{`.sm-soc:hover .sm-soc-i:not(:hover){opacity:.55}.sm-soc-i{transition:opacity .3s,transform .3s,box-shadow .3s}.sm-soc-i:hover{filter:brightness(1.12) saturate(1.1);box-shadow:var(--g),0 0 0 2px rgba(255,255,255,.55);transform:translateY(-4px) scale(1.1)}`}</style>
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
                style={{ background: BRAND_BG[s.key] || '#555', '--bgc': BRAND_BG[s.key] || '#555', '--g': BRAND_GLOW[s.key] }}
                className={`${box} sm-soc-i`}
              >
                {icon}
              </a>
            ) : (
              // placeholder until the real page URL is added in the admin / data file
              <span title={`[${s.label} link]`} aria-hidden className={`${box} sm-soc-i`} style={{ background: BRAND_BG[s.key] || '#555', '--bgc': BRAND_BG[s.key] || '#555', '--g': BRAND_GLOW[s.key] }}>
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
.sm-bp{transition:background-color .3s,color .3s,border-color .3s,transform .3s}
.sm-bp .sm-bn{transition:background-color .3s,color .3s}
.sm-bp:hover,.sm-bp:focus-visible{background:#2A1F1A;color:#F5F0E6;border-color:#2A1F1A;transform:translateY(-2px)}
.sm-bp:hover .sm-bn,.sm-bp:focus-visible .sm-bn{background:#A9B957;color:#2A1F1A}
@media (prefers-reduced-motion:reduce){.sm-bp,.sm-bp .sm-bn,.sm-soc-i{transition:none!important}}
`;

function BrowseStrip() {
  const pill = 'sm-bp inline-flex items-center gap-2.5 rounded-full border border-[#2A1F1A]/25 bg-[#F3ECDF] py-1.5 pl-4 pr-1.5 text-sm font-semibold text-[#2A1F1A]';
  const num = "sm-bn inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-[#2A1F1A] px-2 font-['JetBrains_Mono'] text-xs font-semibold text-[#F5F0E6]";
  const Pill = ({ r }) => (
    <Link to={r.to} className={pill}>
      {r.label}
      <span className={num}>{String(r.n).padStart(2, '0')}</span>
    </Link>
  );
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#2A1F1A]/12 bg-[#EEE6D8] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3 font-['Space_Grotesk'] text-xl font-extrabold tracking-tight text-[#2A1F1A] sm:text-2xl">
        <span className="h-[2px] w-8 flex-none rounded-full bg-[#A9B957]" aria-hidden />
        Find your home
      </div>
      <nav aria-label="Browse projects" className="flex flex-wrap items-center gap-2.5">
        {BROWSE.map((r) => (
          <Pill key={r.label} r={r} />
        ))}
        <span className="mx-1 hidden h-6 w-px bg-[#2A1F1A]/20 sm:block" aria-hidden />
        {BROWSE_INTERIORS.map((r) => (
          <Pill key={r.label} r={r} />
        ))}
      </nav>
    </div>
  );
}

export default function SiteFooter() {
  const waDisplay = CONTACT.whatsappDisplay || `+${CONTACT.whatsapp}`;
  const { pathname } = useLocation();
  // the two list pages are already the finder, so the strip would be redundant there
  const showBrowse = !(pathname === '/projects' || pathname === '/interiors');
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[#2A1F1A]/10 text-[#2A1F1A]" style={{ background: '#E5DBCD' }}>
      <style>{FOOTER_CSS}</style>

      <div className="relative mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-12">
        {showBrowse && <BrowseStrip />}

        <div className={`grid gap-9 sm:grid-cols-2 lg:grid-cols-12 ${showBrowse ? 'pt-10' : 'pt-2'}`}>
          {/* brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Space Maker home">
              <img src="/assets/00_brand/logo-mark.png" alt="" className="h-[68px] w-auto" loading="lazy" />
              <span className="flex flex-col">
                <img src="/assets/00_brand/logo-word.png" alt="Space Maker" className="h-[54px] w-auto" loading="lazy" />
                <span className="mt-1 text-[11px] font-semibold tracking-[0.03em] text-[#2A1F1A]">where space defines luxury</span>
              </span>
            </Link>
            {CONTACT.footerLine && <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#2A1F1A]/75">{CONTACT.footerLine}</p>}
            <SocialRow items={CONTACT.social} />
          </div>

          {/* quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <div className={head}>Explore</div>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
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
            <ul className="mt-4 grid gap-4">
              {CONTACT.offices.map((o) => (
                <li key={o.name}>
                  <div className="text-sm font-semibold text-[#2A1F1A]">{o.name}</div>
                  <div className="mt-0.5 text-sm leading-relaxed text-[#2A1F1A]/75">{o.address}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <div className={head}>Talk to us</div>
            <ul className="mt-4 grid gap-3">
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
            </ul>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-visit' })}
              className="relative isolate mt-5 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border-[1.5px] border-[#2A1F1A] bg-[#2A1F1A] px-5 py-3 text-sm font-semibold text-[#F5F0E6] transition-[color] duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#A9B957] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#A9B957]" />
              Book a visit
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-9 flex flex-col gap-2 border-t border-[#2A1F1A]/15 pt-5 text-xs text-[#2A1F1A]/70 sm:flex-row sm:items-center sm:justify-between sm:pr-36">
          <span>© {new Date().getFullYear()} Space Maker Limited. All rights reserved.</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="sm-fl self-start font-semibold text-[#2A1F1A] sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* the wordmark bleeds off the bottom edge: one tone a little deeper than the sand, top of the letters only */}
      <div aria-hidden className="pointer-events-none mt-6 h-[clamp(84px,13vw,160px)] select-none overflow-hidden">
        <img src="/assets/00_brand/logo-word-sand.png" alt="" className="mx-auto w-full max-w-4xl px-5" loading="lazy" />
      </div>
    </footer>
  );
}
