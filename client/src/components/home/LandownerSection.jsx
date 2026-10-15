// client/src/components/home/LandownerSection.jsx
// "Partner with us" and "Why landowners choose Space Maker" merged into one calm, compact section.
// Kept quieter than the footer: light background, smaller type, the form is the CTA.
import React, { useState } from 'react';
import { LANDOWNER as L, CONTACT } from '../../data/portfolio';
import { waLink, landMessage, trackLead } from '../../lib/leads';
import { Eyebrow, Reveal } from '../portfolio/shared';

const field =
  'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-neutral-400 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#C6F00C]/50';
const label = "mb-1.5 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-600";

function Contact({ icon, title, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#1B4332]/[0.07] text-[#1B4332]">{icon}</span>
      <div className="min-w-0">
        <div className="font-['Space_Grotesk'] text-sm font-bold text-[#111827]">{title}</div>
        <div className="mt-0.5 break-words text-sm text-[#374151]">{children}</div>
      </div>
    </div>
  );
}

export default function LandownerSection() {
  const [state, setState] = useState('idle'); // idle | busy | ok | fallback
  const [lastMsg, setLastMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const msg = landMessage(f);
    setLastMsg(msg);
    trackLead({ channel: 'land-form', kind: 'landowner' });

    const url = import.meta.env.VITE_LAND_URL;
    if (!url) {
      // No endpoint set yet: send the details through WhatsApp so the lead is never lost.
      window.open(waLink(msg), '_blank', 'noopener');
      setState('ok');
      return;
    }
    setState('busy');
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, at: new Date().toISOString() }),
      });
      setState(r.ok ? 'ok' : 'fallback');
    } catch {
      setState('fallback');
    }
  }

  return (
    <section
      id="land"
      className="relative py-16 sm:py-20"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #FAF8F5 100%)' }}
    >
      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        {/* header + promises + contacts */}
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{L.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] tracking-tight text-[#111827] sm:text-4xl">
              {L.title}
            </h2>
            <p className="mt-4 text-base leading-[1.75] text-[#374151]">{L.intro}</p>
          </Reveal>

          <Reveal className="mt-8">
            <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#1B4332]">{L.whyTitle}</h3>
            {L.slogan && <p className="mt-1 font-serif text-base italic text-[#1B4332]/75">{L.slogan}</p>}
            <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {L.cards.map((c, i) => (
                <li key={c.title} className="border-t border-[#1B4332]/15 pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#1B4332]/60">0{i + 1}</span>
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#111827]">{c.title}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#374151]">{c.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-8 grid gap-4">
            <Contact
              title={L.hotline.label}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              }
            >
              <a href={`tel:${L.hotline.tel}`} className="hover:text-[#1B4332] hover:underline">
                {L.hotline.display}
              </a>
            </Contact>
            <Contact
              title={L.emailLabel}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            >
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[#1B4332] hover:underline">
                {CONTACT.email}
              </a>
            </Contact>
          </Reveal>
        </div>

        {/* form = the CTA */}
        <Reveal className="lg:col-span-7">
          <div className="rounded-2xl border border-[#1B4332]/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(27,67,50,0.45)] sm:p-8">
            {state === 'ok' || state === 'fallback' ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#C6F00C] text-[#111827]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-[#111827]">Thank you.</h3>
                <p className="mx-auto mt-2 max-w-sm text-neutral-600">
                  {state === 'ok'
                    ? 'Our engineering director will call you back directly.'
                    : 'We could not send this automatically. Please tap below to send it on WhatsApp.'}
                </p>
                {state === 'fallback' && (
                  <a
                    href={waLink(lastMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[6px]"
                  >
                    Send on WhatsApp →
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
                  Request Feasibility Study
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Fill in your plot details; our engineering director will call you back directly.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="ls-name">Your name</label>
                    <input id="ls-name" name="name" required placeholder="e.g. Major Akhtaruzzaman" className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="ls-phone">Phone / WhatsApp</label>
                    <input id="ls-phone" name="phone" required placeholder="+880 1..." className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="ls-loc">Plot location</label>
                    <input id="ls-loc" name="location" placeholder="e.g. Sector 13, Jolshiri" className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="ls-size">Plot size</label>
                    <input id="ls-size" name="size" placeholder="e.g. 5 Katha / 10 Katha" className={field} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={label} htmlFor="ls-notes">Notes / requirements</label>
                    <textarea id="ls-notes" name="notes" rows={3} placeholder="Tell us about your expectations..." className={field} />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state === 'busy'}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#14331f] disabled:opacity-60"
                >
                  {state === 'busy' ? 'Sending...' : 'Submit Land Details'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6F00C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
