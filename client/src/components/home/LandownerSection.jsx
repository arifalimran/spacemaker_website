// client/src/components/home/LandownerSection.jsx
// Partner with us (landowners). SOLID cream, split layout: pitch + the four promises (01-04, from
// data) on the left, the feasibility form on the right. The footer's angle cut follows it.
import React, { useRef, useState } from 'react';
import { LANDOWNER as L } from '../../data/portfolio';
import { waLink, landMessage, trackLead } from '../../lib/leads';
import { Eyebrow, Reveal, SECTION } from '../portfolio/shared';

const field =
  'w-full rounded-xl border border-[#2A1F1A]/12 bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-neutral-400 focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#C6F00C]/50';
const label = "mb-1.5 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5C6E0A]";

export default function LandownerSection() {
  const [state, setState] = useState('idle'); // idle | busy | ok | wa | fallback
  const [lastMsg, setLastMsg] = useState('');
  const sending = useRef(false);
  const promises = (L.cards || []).slice(0, 4);

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
    <section id="land" className="relative py-16 sm:py-24" style={{ background: SECTION.cream }}>
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        {/* pitch */}
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{L.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-tight text-[#111827] sm:text-6xl">
              {L.title}
            </h2>
            <span aria-hidden className="mt-5 block h-[3px] w-16 rounded-full bg-[#C6F00C]" />
            {(L.supportLine || L.slogan) && (
              <p className="mt-5 font-serif text-2xl italic leading-snug text-[#1B4332] sm:text-3xl">{L.supportLine || L.slogan}</p>
            )}
            <p className="mt-5 max-w-xl text-base leading-[1.8] text-[#374151]">{L.intro}</p>
          </Reveal>

          {promises.length > 0 && (
            <div className="mt-10">
              {L.whyTitle && (
                <h3 className="font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6E0A]">
                  {L.whyTitle}
                </h3>
              )}
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {promises.map((c, i) => (
                  <li key={c.title} className="h-full">
                    <Reveal delay={(i % 2) * 0.08} className="h-full">
                      <div className="h-full rounded-2xl border border-[#2A1F1A]/10 bg-[#FAF8F5] p-5">
                        <div className="flex items-baseline gap-3">
                          <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#5C6E0A]">{String(i + 1).padStart(2, '0')}</span>
                          <span className="font-heading text-lg font-bold leading-tight text-[#111827]">{c.title}</span>
                        </div>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#374151]">{c.text}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {L.trust && (
            <p className="mt-8 flex items-center gap-3 border-t border-[#2A1F1A]/10 pt-5 text-sm text-[#5C6E0A]">
              <span className="h-2 w-2 flex-none rounded-full bg-[#C6F00C] ring-4 ring-[#5C6E0A]/20" />
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
                <h3 className="mt-5 font-heading text-2xl font-bold text-[#111827]">Thank you.</h3>
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
                <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
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
