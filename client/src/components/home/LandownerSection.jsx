// client/src/components/home/LandownerSection.jsx
// Partner with us (landowners). Warm cream, split layout: pitch + 3 benefits on the left,
// the feasibility form on the right. Ends in a solid #F3EADC that the footer's wave edge cuts into
// (extra bottom padding = room for the wave, which overlaps this section's last ~40-72px).
import React, { useRef, useState } from 'react';
import { LANDOWNER as L } from '../../data/portfolio';
import { waLink, landMessage, trackLead } from '../../lib/leads';
import { Eyebrow, Reveal } from '../portfolio/shared';

const field =
  'w-full rounded-xl border border-[#2A1F1A]/12 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-neutral-400 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#C6F00C]/50';
const label = "mb-1.5 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5C6E0A]";

const ICONS = {
  review: (
    <>
      <path d="M9 3h6l1 2h3v16H5V5h3l1-2Z" />
      <path d="m9 13 2 2 4-4" />
    </>
  ),
  ratio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9l6.4 6.4" />
    </>
  ),
  engineering: (
    <>
      <path d="M3 21h18M6 21V9l6-5 6 5v12" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
  handover: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9M17 6l2 2M15 8l2 2" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#1B4332] text-[#C6F00C]">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {ICONS[name] || ICONS.engineering}
      </svg>
    </span>
  );
}

export default function LandownerSection() {
  const [state, setState] = useState('idle'); // idle | busy | ok | wa | fallback
  const [lastMsg, setLastMsg] = useState('');
  const sending = useRef(false);
  const benefits = (L.benefits && L.benefits.length ? L.benefits : L.cards || []).slice(0, 3);

  async function onSubmit(e) {
    e.preventDefault();
    if (sending.current) return; // no double-submit
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (f.website) {
      // honeypot filled: almost certainly a bot. Pretend success, send nothing.
      setState('ok');
      return;
    }
    delete f.website;
    sending.current = true;
    const msg = landMessage(f);
    setLastMsg(msg);
    trackLead({ channel: 'land-form', kind: 'landowner' });

    const url = import.meta.env.VITE_LAND_URL;
    if (!url) {
      // No endpoint set yet: send the details through WhatsApp so the lead is never lost.
      window.open(waLink(msg), '_blank', 'noopener');
      setState('wa');
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

  const done = state === 'ok' || state === 'wa' || state === 'fallback';

  return (
    <section
      id="land"
      className="relative overflow-hidden pb-28 pt-20 sm:pb-40 sm:pt-24"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 85% 10%, rgba(198,240,12,0.07) 0%, rgba(198,240,12,0) 70%), radial-gradient(ellipse 55% 45% at 0% 45%, rgba(168,148,128,0.12) 0%, rgba(168,148,128,0) 70%), linear-gradient(to bottom, #F5F0E6 0%, #F3EADC 100%)',
      }}
    >
      {/* subtle warm paper texture: tiny dots, plain rgba, static */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: 'radial-gradient(rgba(42,31,26,0.06) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* pitch */}
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{L.eyebrow}</Eyebrow>
            {L.headline && (
              <h2 className="mt-5 font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.02] tracking-tight text-[#111827] sm:text-6xl">
                {L.headline}
              </h2>
            )}
            <p className={`${L.headline ? 'mt-4 text-2xl sm:text-3xl' : 'mt-5 text-3xl sm:text-5xl'} font-serif italic leading-snug text-[#1B4332]`}>
              <span style={{ background: 'linear-gradient(transparent 70%, rgba(198,240,12,0.55) 70%, rgba(198,240,12,0.55) 92%, transparent 92%)' }}>
                {L.title}
              </span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-[#374151]">{L.intro}</p>
          </Reveal>

          <ul className="mt-10 grid gap-6">
            {benefits.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={i * 0.08} className="flex items-start gap-4">
                  <Icon name={b.icon} />
                  <div>
                    <div className="font-['Space_Grotesk'] text-lg font-bold text-[#111827]">{b.title}</div>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-[#374151]">{b.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {L.trust && (
            <p className="mt-8 flex items-center gap-3 border-t border-[#2A1F1A]/10 pt-5 text-sm text-[#5C6E0A]">
              <span className="h-2 w-2 flex-none rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
              {L.trust}
            </p>
          )}
        </div>

        {/* form = the CTA */}
        <Reveal className="lg:col-span-6">
          <div className="rounded-3xl border border-[#2A1F1A]/10 bg-[#FAF8F5] p-6 shadow-[0_30px_60px_-36px_rgba(42,31,26,0.45)] sm:p-9">
            {done ? (
              <div className="py-8 text-center" role="status">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1B4332] text-[#C6F00C]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-[#111827]">Thank you.</h3>
                <p className="mx-auto mt-2 max-w-sm text-[#374151]">
                  {state === 'ok' && 'Our engineering director will call you back directly.'}
                  {state === 'wa' && 'WhatsApp has opened with your plot details. Press send there and our engineering director will call you back.'}
                  {state === 'fallback' && 'We could not send this automatically. Please tap below to send it on WhatsApp.'}
                </p>
                {(state === 'wa' || state === 'fallback') && (
                  <a
                    href={waLink(lastMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[6px]"
                  >
                    {state === 'wa' ? 'WhatsApp did not open? Tap here →' : 'Send on WhatsApp →'}
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#5C6E0A]">Free of charge</div>
                <h3 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                  Request Feasibility Study
                </h3>
                <p className="mt-1 text-sm text-[#374151]">
                  Fill in your plot details; our engineering director will call you back directly.
                </p>
                {/* honeypot: hidden from people, bots fill it */}
                <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="ls-website">Website</label>
                  <input id="ls-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="ls-name">Your name</label>
                    <input id="ls-name" name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your full name" className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="ls-phone">Phone / WhatsApp</label>
                    <input
                      id="ls-phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="[+0-9 ()\-]{7,20}"
                      title="Please enter a valid phone number"
                      placeholder="+880 1..."
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="ls-loc">Plot location</label>
                    <input id="ls-loc" name="location" maxLength={120} placeholder="e.g. Sector 13, Jolshiri" className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="ls-size">Plot size</label>
                    <input id="ls-size" name="size" maxLength={60} placeholder="e.g. 5 Katha / 10 Katha" className={field} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={label} htmlFor="ls-notes">Notes / requirements</label>
                    <textarea id="ls-notes" name="notes" rows={3} maxLength={1000} placeholder="Tell us about your expectations..." className={field} />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state === 'busy'}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#14342A] disabled:opacity-60"
                >
                  {state === 'busy' ? 'Sending...' : 'Submit Land Details'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6F00C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
                {L.hotline && (
                  <p className="mt-4 text-center text-xs text-[#374151]">
                    Prefer to talk?{' '}
                    <a href={`tel:${L.hotline.tel}`} className="font-semibold text-[#5C6E0A] hover:text-[#1B4332]">
                      {L.hotline.display}
                    </a>
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
