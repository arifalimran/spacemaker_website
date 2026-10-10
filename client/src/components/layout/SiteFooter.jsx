// client/src/components/layout/SiteFooter.jsx
// First version of the light-green footer; also the "Contact" target in the nav.
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, CONTACT, projects, GENERAL_MESSAGE } from '../../data/portfolio';
import { waLink, trackLead } from '../../lib/leads';

const head = "font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1B4332]";
const lk = 'text-sm text-[#1B4332]/80 transition hover:text-[#111827]';

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #E6EFE4 22%, #DCE9DA 100%)' }}
    >
      <img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 w-[420px] select-none opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl">
              Let us show you around.
            </h2>
            <p className="mt-5 max-w-md text-[#1B4332]/80">
              Visit a site, see the drawings, ask anything. We answer personally.
            </p>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead({ channel: 'whatsapp', kind: 'footer-visit' })}
              className="mt-7 inline-block text-base font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[7px] hover:decoration-[#1B4332]"
            >
              Book a visit on WhatsApp →
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <div className={head}>Explore</div>
              <ul className="mt-4 grid gap-2.5">
                <li><Link to={{ pathname: '/', hash: '#residences' }} className={lk}>Residences</Link></li>
                <li><Link to={{ pathname: '/', hash: '#about' }} className={lk}>Our Story</Link></li>
                <li><Link to={{ pathname: '/', hash: '#why-us' }} className={lk}>Why Us</Link></li>
                <li><Link to={{ pathname: '/', hash: '#land' }} className={lk}>For Landowners</Link></li>
                <li><Link to="/careers" className={lk}>Careers</Link></li>
              </ul>
              <div className={`${head} mt-8`}>Projects</div>
              <ul className="mt-4 grid gap-2.5">
                {projects.map((p) => (
                  <li key={p.id}><Link to={`/projects/${p.slug}`} className={lk}>{p.title}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <div className={head}>Offices</div>
              <ul className="mt-4 grid gap-5">
                {CONTACT.offices.map((o) => (
                  <li key={o.name}>
                    <div className="text-sm font-semibold text-[#111827]">{o.name}</div>
                    <div className="mt-1 text-sm leading-relaxed text-[#1B4332]/80">{o.address}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className={head}>Talk to us</div>
              <ul className="mt-4 grid gap-3">
                {CONTACT.hotlines.map((h) => (
                  <li key={h.tel}>
                    <div className="text-[11px] uppercase tracking-wider text-[#1B4332]/60">{h.label}</div>
                    <a href={`tel:${h.tel}`} className="text-sm font-semibold text-[#111827]">{h.display}</a>
                  </li>
                ))}
                <li>
                  <div className="text-[11px] uppercase tracking-wider text-[#1B4332]/60">Email</div>
                  <a href={`mailto:${CONTACT.email}`} className="text-sm font-semibold text-[#111827]">{CONTACT.email}</a>
                </li>
                <li>
                  <a href={CONTACT.messenger} target="_blank" rel="noreferrer" className={lk}>Message on Facebook →</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#1B4332]/15 pt-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/30" />
            <span className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide text-[#1B4332]">
              Space Maker Limited
            </span>
          </div>
          <span className="text-xs text-[#1B4332]/70">
            where space defines luxury · © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
