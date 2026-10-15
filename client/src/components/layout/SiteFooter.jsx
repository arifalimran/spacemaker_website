// client/src/components/layout/SiteFooter.jsx
// Footer with the Contact block on top. "Curved lip" (option B): a soft SVG wave rises into the
// section above (no fade) with a 1.5px lime line along the curve; below it the footer goes
// #3A2C24 -> #2A1F1A.
// Also the "Contact" target in the nav. Everything comes from CONTACT / BRAND in data/portfolio.js.
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, CONTACT, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

const head = "font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C6F00C]";
const lk = 'text-sm text-[#F5F0E6]/80 transition-colors hover:text-[#C6F00C]';

const QUICK_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Interiors', to: '/interiors' },
  { label: 'Careers', to: '/careers' },
  { label: 'About', to: { pathname: '/', hash: '#about' } },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

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

const ICON = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  chat: <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5A8.5 8.5 0 1 1 21 11.5Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

/* The curved lip: sits just above the footer and overlaps the bottom of the section above.
   Above the curve is transparent (that section shows through); below it is footer colour.
   Scales with the width (preserveAspectRatio="none"); the lime line keeps 1.5px (non-scaling stroke). */
const WAVE = 'M0 46 C 220 78, 470 82, 720 52 C 960 24, 1200 10, 1440 30';
function WaveLip() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] block h-10 w-full sm:h-[72px]"
    >
      <path d={`${WAVE} L1440 80 L0 80 Z`} fill="#3A2C24" />
      <path d={WAVE} fill="none" stroke="#C6F00C" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#F5F0E6]/10 text-[#C6F00C]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {ICON[icon]}
        </svg>
      </span>
      <div className="min-w-0">
        <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#F5F0E6]/60">{title}</div>
        <div className="mt-1 break-words text-sm text-[#F5F0E6]">{children}</div>
      </div>
    </div>
  );
}

function SocialRow({ items = [] }) {
  if (!items.length) return null;
  const box = 'flex h-9 w-9 items-center justify-center rounded-full border transition-colors';
  return (
    <ul className="mt-6 flex flex-wrap gap-2.5">
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
                className={`${box} border-[#F5F0E6]/25 text-[#F5F0E6] hover:border-[#C6F00C] hover:text-[#C6F00C]`}
              >
                {icon}
              </a>
            ) : (
              // placeholder until the real page URL is added in the admin / data file
              <span title={`[${s.label} link]`} aria-hidden className={`${box} border-[#F5F0E6]/12 text-[#F5F0E6]/30`}>
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
  const hotline = CONTACT.hotlines?.[0];
  const office = CONTACT.offices?.[0];
  return (
    <footer
      id="contact"
      className="relative text-[#F5F0E6]"
      style={{ background: 'linear-gradient(to bottom, #3A2C24 0%, #2A1F1A 100%)' }}
    >
      <WaveLip />
      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-14">
        {/* Contact block */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <div className={head}>Contact us</div>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#FAF8F5] sm:text-5xl">
              Let us show you around.
            </h2>
            <p className="mt-3 max-w-md font-serif text-lg italic text-[#F5F0E6]/80">
              Visit a site, see the drawings, ask anything. We answer personally.
            </p>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-visit' })}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C6F00C] px-5 py-3.5 text-sm font-semibold text-[#1F1713] transition-colors hover:bg-[#D6FA3A] sm:w-auto"
            >
              Send us a quick message
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="grid gap-6 rounded-3xl border border-[#F5F0E6]/12 bg-[#F5F0E6]/[0.06] p-6 sm:grid-cols-2 sm:p-8 lg:col-span-8">
            <ContactItem icon="chat" title="WhatsApp">
              <a
                href={waLink(GENERAL_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-contact' })}
                className="font-semibold hover:text-[#C6F00C]"
              >
                {waDisplay}
              </a>
            </ContactItem>
            {hotline && (
              <ContactItem icon="phone" title={hotline.label || 'Hotline'}>
                <a href={`tel:${hotline.tel}`} className="font-semibold hover:text-[#C6F00C]">{hotline.display}</a>
              </ContactItem>
            )}
            <ContactItem icon="mail" title="Email">
              {CONTACT.email ? (
                <a href={`mailto:${CONTACT.email}`} className="font-semibold hover:text-[#C6F00C]">{CONTACT.email}</a>
              ) : (
                '[Email address]'
              )}
            </ContactItem>
            <ContactItem icon="pin" title={office?.name || 'Office'}>
              {office?.address || '[Office address]'}
            </ContactItem>
          </div>
        </div>

        {/* brand, links, offices */}
        <div className="mt-16 grid gap-10 border-t border-[#F5F0E6]/12 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Space Maker home">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF8F5]">
                <img src={BRAND.icon} alt="" className="h-9 w-auto" loading="lazy" />
              </span>
              <span className="font-['Space_Grotesk'] text-xl font-extrabold tracking-tight text-[#FAF8F5]">Space Maker</span>
            </Link>
            {CONTACT.tagline && <p className="mt-4 font-serif text-lg italic text-[#F5F0E6]/85">{CONTACT.tagline}</p>}
            {CONTACT.footerLine && <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#F5F0E6]/65">{CONTACT.footerLine}</p>}
            <SocialRow items={CONTACT.social} />
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <div className={head}>Quick links</div>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={lk}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <div className={head}>Offices</div>
            <ul className="mt-4 grid gap-5">
              {(CONTACT.offices || []).map((o) => (
                <li key={o.name}>
                  <div className="text-sm font-semibold text-[#FAF8F5]">{o.name}</div>
                  <div className="mt-1 text-sm leading-relaxed text-[#F5F0E6]/70">{o.address}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[#F5F0E6]/12 pt-6 text-xs text-[#F5F0E6]/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Space Maker Limited. All rights reserved.</span>
          {CONTACT.messenger && (
            <a href={CONTACT.messenger} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#C6F00C]">
              Message us on Facebook →
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
