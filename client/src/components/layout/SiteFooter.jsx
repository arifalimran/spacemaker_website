// client/src/components/layout/SiteFooter.jsx
// Compact espresso footer. A "Find your home" block (one featured Signature project + two buttons) sits on top and is hidden
// on /projects and /interiors, where the page is already the finder. Then brand, links, offices, contact, and a wordmark that
// bleeds off the bottom edge. Counts and links come from the data, so they follow the back end. Also the "Contact" target in the nav.
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACT, GENERAL_MESSAGE, projects, coverOf } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

// column titles + "Back to top": lime neon (static text-shadow glow, no filters)
const head = "sm-neon font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em]";
const lk = 'sm-fl relative inline-block text-base font-medium text-[#BBA992] transition-colors duration-300 hover:text-[#C7D17F]';
// highlighted labels (WhatsApp, hotline, Email) and office names: bright cream with a small lime dot
const sub = "sm-hl font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.16em]";

// the featured project: `footerFeatured: true` in the data wins, otherwise the first Signature project
const FEATURED = projects.find((p) => p.footerFeatured) || projects.find((p) => p.flagship) || projects[0];

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
  const box = 'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300';
  return (
    <ul className="sm-soc mt-8 flex flex-wrap gap-3.5">
      <style>{`.sm-soc:hover .sm-soc-i:not(:hover){opacity:.55}.sm-soc-i{transition:opacity .3s,transform .3s,box-shadow .3s}.sm-soc-i:hover{filter:brightness(1.12) saturate(1.1);box-shadow:var(--g),0 0 0 2px rgba(255,255,255,.55);transform:translateY(-4px) scale(1.1)}`}</style>
      {items.map((s) => {
        const icon = (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
.sm-neon{color:#C6F00C;text-shadow:0 0 4px rgba(198,240,12,.55),0 0 12px rgba(198,240,12,.35),0 0 22px rgba(198,240,12,.18)}
button.sm-neon{transition:text-shadow .3s}
button.sm-neon:hover,button.sm-neon:focus-visible{text-shadow:0 0 5px rgba(198,240,12,.75),0 0 16px rgba(198,240,12,.5),0 0 30px rgba(198,240,12,.3)}
.sm-hl{display:inline-flex;align-items:center;gap:.5rem;color:#F5F0E6}
.sm-hl::before{content:"";width:6px;height:6px;border-radius:999px;background:#C6F00C;flex:none}
.sm-feat img{transition:transform .7s cubic-bezier(.22,1,.36,1)}
.sm-feat:hover img{transform:scale(1.04)}
@media (prefers-reduced-motion:reduce){.sm-soc-i,.sm-feat img,button.sm-neon{transition:none!important}}
`;

// option 8: one featured project photo + "See this home" / "All projects"
function FeaturedStrip() {
  const p = FEATURED;
  if (!p) return null;
  const photo = coverOf(p);
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Link
        to={`/projects/${p.slug}`}
        className="sm-feat group relative block aspect-[16/10] overflow-hidden rounded-3xl bg-[#3A2C24] lg:col-span-7"
        aria-label={`See ${p.title}`}
      >
        {photo && <img src={photo} alt={`${p.title}, ${p.area}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
        {/* legibility shade for the caption (photo overlay only) */}
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,14,.82) 0%, rgba(26,18,14,.25) 45%, rgba(26,18,14,0) 70%)' }} />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <div className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em] text-[#C6F00C]">{p.flagship ? 'Signature' : 'Featured'}</div>
          <div className="mt-2 font-['Space_Grotesk'] text-2xl font-extrabold leading-tight text-[#FAF8F5] sm:text-4xl">{p.title}</div>
          {p.area && <div className="mt-1 text-base text-[#F5F0E6]/85">{p.area}</div>}
        </div>
      </Link>

      <div className="lg:col-span-5">
        <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#F5F0E6] sm:text-5xl">Find your home</h2>
        <p className="mt-4 font-serif text-xl italic text-[#C6F00C]">Start with our latest, or browse them all.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/projects/${p.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C6F00C] px-6 py-3.5 text-base font-semibold text-[#1F1713] transition-transform duration-300 hover:-translate-y-0.5"
          >
            See this home <span aria-hidden>→</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#F5F0E6]/40 px-6 py-3.5 text-base font-semibold text-[#F5F0E6] transition-colors duration-300 hover:border-[#C6F00C] hover:text-[#C6F00C]"
          >
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SiteFooter() {
  const waDisplay = CONTACT.whatsappDisplay || `+${CONTACT.whatsapp}`;
  const { pathname } = useLocation();
  // the two list pages are already the finder, so the strip would be redundant there
  const showBrowse = !(pathname === '/projects' || pathname === '/interiors');
  return (
    <footer id="contact" className="relative overflow-hidden text-[#BBA992]" style={{ background: '#2A1F1A' }}>
      <style>{FOOTER_CSS}</style>

      <div className="relative mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-40">
        {showBrowse && <FeaturedStrip />}

        <div className={`grid gap-12 sm:grid-cols-2 lg:grid-cols-12 ${showBrowse ? 'pt-20' : 'pt-4'}`}>
          {/* brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block" aria-label="Space Maker home">
              <img src="/assets/00_brand/logo-lockup-taupe.png" alt="Space Maker, where space defines luxury" className="h-28 w-auto sm:h-36" loading="lazy" />
            </Link>
            {CONTACT.footerLine && <p className="mt-6 max-w-sm text-base leading-relaxed text-[#BBA992]">{CONTACT.footerLine}</p>}
            <SocialRow items={CONTACT.social} />
          </div>

          {/* quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <div className={head}>Explore</div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-1">
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
            <ul className="mt-6 grid gap-6">
              {CONTACT.offices.map((o) => (
                <li key={o.name}>
                  <div className={`${sub} text-sm`}>{o.name}</div>
                  <div className="mt-2 text-base leading-relaxed text-[#BBA992]">{o.address}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <div className={head}>Talk to us</div>
            <ul className="mt-6 grid gap-4">
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
              className="relative isolate mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border-[1.5px] border-[#BBA992] bg-[#BBA992] px-7 py-4 text-base font-semibold text-[#2A1F1A] transition-[color] duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#A9B957] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#2A1F1A]" />
              Book a visit
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-20 flex flex-col gap-2 border-t border-[#F5F0E6]/10 pt-6 text-sm text-[#A39380] sm:flex-row sm:items-center sm:justify-between sm:pr-36">
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
        <div aria-hidden className="pointer-events-none mt-14 select-none pb-8 sm:mt-20 sm:pb-12">
          <img
            src="/assets/00_brand/logo-oneline-dissolve.png"
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
