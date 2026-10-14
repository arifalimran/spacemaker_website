// client/src/components/home/LandownerSection.jsx
// "Partner with us" and "Why landowners choose Space Maker" merged into one coffee-room section.
import React, { useState } from 'react';
import { LANDOWNER as L, CONTACT, ESPRESSO } from '../../data/portfolio';
import { waLink, landMessage, trackLead } from '../../lib/leads';
import { Pic, Eyebrow, Reveal, DarkBand, Flutter } from '../portfolio/shared';

const field =
  'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-neutral-400 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#C6F00C]/50';
const label = "mb-1.5 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-600";

function Contact({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white/10 text-[#C6F00C]">{icon}</span>
      <div>
        <div className="font-['Space_Grotesk'] text-base font-bold text-[#F3EFE6]">{title}</div>
        <div className="mt-0.5 text-sm text-[#F3EFE6]/75">{children}</div>
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
    <DarkBand id="land" bg={ESPRESSO}>
      {/* coffee-room photo, softly blurred and darkened */}
      <div aria-hidden className="absolute inset-0">
        <Pic
          src={L.photo}
          alt=""
          fallback={`radial-gradient(ellipse 70% 60% at 75% 30%, #4A372C 0%, ${ESPRESSO} 70%)`}
          className="h-full w-full scale-105 object-cover"
          style={{ filter: 'blur(3px) saturate(0.85)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(42,31,26,0.9) 0%, rgba(42,31,26,0.78) 40%, rgba(42,31,26,0.9) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        {/* header */}
        <Reveal className="max-w-3xl">
          <Eyebrow dark>{L.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.05] tracking-tight text-[#F3EFE6] sm:text-6xl">
            {L.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.8] text-[#F3EFE6]/80 sm:text-lg">{L.intro}</p>
        </Reveal>

        {/* why landowners choose us */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#F3EFE6] sm:text-3xl">
              {L.whyTitle}
            </h3>
            <p className="mt-2 font-serif text-xl italic text-[#C6F00C]">{L.slogan}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {L.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#C6F00C]/50">
                  <div className="font-['JetBrains_Mono'] text-xs font-semibold text-[#C6F00C]">0{i + 1}</div>
                  <div className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#F3EFE6]">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-[#F3EFE6]/70">{c.text}</p>
                  <Flutter
                    hue="#C6F00C"
                    size={22}
                    className="absolute right-3 top-3 opacity-0 transition duration-500 group-hover:-translate-y-1 group-hover:opacity-100"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* contact + form */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="grid gap-6 lg:col-span-5">
            <Contact
              title={L.hotline.label}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              }
            >
              <a href={`tel:${L.hotline.tel}`} className="hover:text-[#C6F00C]">
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
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[#C6F00C]">
                {CONTACT.email}
              </a>
            </Contact>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl sm:p-9">
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
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#111827]">
                    Request Feasibility Study
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Fill in your plot details; our engineering director will call you back directly.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                      <textarea id="ls-notes" name="notes" rows={4} placeholder="Tell us about your expectations..." className={field} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'busy'}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1B4332] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#14331f] disabled:opacity-60"
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
      </div>
    </DarkBand>
  );
}
