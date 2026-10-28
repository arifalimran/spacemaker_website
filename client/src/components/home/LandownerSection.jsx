// client/src/components/home/LandownerSection.jsx
// "Partner with us" (landowners): compact, on a solid espresso card with a soft lime glow (same family as the project enquiry card). Heading + one line + Call / WhatsApp / Email pills on the left,
// a slim espresso-bordered form on the right (notes hidden behind "+ Add a note"). A fine plot drawing
// draws itself once next to the pills (tablet and up) and a small coffee cup steams next to the heading.
// Submit logic unchanged: VITE_LAND_URL endpoint, else WhatsApp fallback so a lead is never lost.
// The old "why landowners choose us" cards stay in data/portfolio.js but are no longer shown here.
import SkylineParallax from './SkylineParallax';
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LANDOWNER as L, CONTACT } from '../../data/portfolio';
import { waLink, landMessage, trackLead } from '../../lib/leads';
import { Eyebrow, Reveal } from '../portfolio/shared';

const ESPRESSO = '#2A1F1A';
const CREAM = '#BBA992';
const SHORT = 'Share your plot. Our engineering director will call you back.';

const field =
  'w-full rounded-lg border border-[#F5F0E6]/20 bg-[#241A15] px-3.5 py-2.5 text-base text-[#BBA992] placeholder:text-[#8F7F6C] focus:border-[#C6F00C]/70 focus:outline-none focus:ring-2 focus:ring-[#C6F00C]/20';
const label = "mb-1 block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#C6F00C]/85";

const CSS = `
@keyframes smSteam{0%{transform:translateY(2px);opacity:0}30%{opacity:.7}100%{transform:translateY(-9px);opacity:0}}
.sm-steam{animation:smSteam 2.8s ease-in-out infinite}
.sm-steam:nth-child(2){animation-delay:.9s}
.sm-steam:nth-child(3){animation-delay:1.8s}
@media (prefers-reduced-motion:reduce){.sm-steam{animation:none;opacity:.5}}
`;

function Cup() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={CREAM} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
      <path d="M7 16h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-6Z" />
      <path d="M23 18h2.5a2.5 2.5 0 0 1 0 5H23" />
      <path d="M5 30h20" />
      <path className="sm-steam" d="M12 12c-1.4-1.4 1.4-2.6 0-4" opacity=".6" />
      <path className="sm-steam" d="M16 12c-1.4-1.4 1.4-2.6 0-4" opacity=".6" />
      <path className="sm-steam" d="M20 12c-1.4-1.4 1.4-2.6 0-4" opacity=".6" />
    </svg>
  );
}

function PlotDrawing() {
  const reduce = useReducedMotion();
  const draw = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 1.6, ease: 'easeInOut', delay },
        };
  return (
    <svg viewBox="0 0 260 112" width="100%" aria-hidden="true" className="h-auto max-w-[260px]" fill="none" stroke={CREAM} strokeLinecap="round" strokeLinejoin="round">
      {/* the plot */}
      <motion.path d="M30 84 L52 26 L196 18 L226 78 Z" strokeWidth="1.5" opacity=".75" {...draw(0)} />
      {/* dimension line + ticks */}
      <motion.path d="M30 100 L226 94" strokeWidth="1" opacity=".5" {...draw(0.5)} />
      <path d="M30 95 V105 M226 89 V99" strokeWidth="1" opacity=".5" />
      {/* building footprint */}
      <motion.path d="M82 70 L90 44 L160 40 L172 66 Z" strokeWidth="1" strokeDasharray="3 3" opacity=".45" {...draw(0.9)} />
      <text x="128" y="110" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.6" fill={CREAM} stroke="none" opacity=".6">
        YOUR PLOT
      </text>
      {/* north mark */}
      <path d="M244 40 V18 M244 18 l-4 6 M244 18 l4 6" strokeWidth="1" opacity=".5" />
      <text x="244" y="52" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill={CREAM} stroke="none" opacity=".55">
        N
      </text>
    </svg>
  );
}

function Pill({ href, children, external, icon, live }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#F5F0E6]/30 px-4 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#BBA992] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#BBA992] before:transition-transform before:duration-300 hover:before:translate-y-0 relative isolate overflow-hidden transition-colors duration-300 hover:text-[#2A1F1A]"
    >
      {icon}
      {children}
      {live && (
        <span aria-hidden className="relative ml-0.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#C6F00C] opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C6F00C] ring-1 ring-[#F5F0E6]/30" />
        </span>
      )}
    </a>
  );
}

const ic = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export default function LandownerSection() {
  const [state, setState] = useState('idle'); // idle | busy | ok | fallback
  const [lastMsg, setLastMsg] = useState('');
  const [note, setNote] = useState(false);

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
    <section id="land" className="relative overflow-hidden pb-14 pt-20 sm:pb-16 sm:pt-28 lg:pb-[150px]" style={{ background: 'linear-gradient(180deg, #EEF4E3 0%, #F4F7EA 45%, #FAF6EE 100%)' }}>
      <SkylineParallax />
      <style>{CSS}</style>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div
        className="relative grid gap-7 rounded-[20px] border-[1.5px] px-5 py-8 sm:px-10 sm:py-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5"
        style={{
          background: 'radial-gradient(120% 90% at 0% 0%, rgba(150,140,50,.16), rgba(42,31,26,0) 55%), #2A1F1A',
          borderColor: 'rgba(245,240,230,.16)',
          boxShadow: '0 0 0 1px rgba(198,240,12,.18), 0 0 56px 4px rgba(198,240,12,.13), 0 30px 60px -30px rgba(42,31,26,.55)',
        }}
      >
        {/* heading + one line */}
        <Reveal className="lg:col-span-5">
          <Eyebrow dark>{L.eyebrow}</Eyebrow>
          <div className="mt-3 flex items-start gap-3">
            <h2 className="font-['Space_Grotesk'] text-[1.7rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl" style={{ color: CREAM }}>
              {L.title.slice(0, L.title.lastIndexOf(' ', L.title.length - 3) + 1)}
              <span style={{ background: 'linear-gradient(transparent 62%, rgba(198,240,12,.35) 62%)' }}>{L.title.slice(L.title.lastIndexOf(' ', L.title.length - 3) + 1)}</span>
            </h2>
            <span className="mt-1 hidden sm:block">
              <Cup />
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#8F7F6C]">{SHORT}</p>
        </Reveal>

        {/* form */}
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <div className="relative">
            <div aria-hidden className="absolute inset-0 rounded-[10px] border" style={{ borderColor: 'rgba(245,240,230,.16)', transform: 'translate(6px, 6px)' }} />
            <div className="relative rounded-[10px] border-[1.5px] p-5 sm:p-6" style={{ borderColor: 'rgba(245,240,230,.2)', background: '#33261F' }}>
              {state === 'ok' || state === 'fallback' ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#C6F00C]" style={{ color: ESPRESSO }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-['Space_Grotesk'] text-xl font-bold" style={{ color: CREAM }}>Thank you.</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] text-[#8F7F6C]">
                    {state === 'ok'
                      ? 'Our engineering director will call you back directly.'
                      : 'We could not send this automatically. Please tap below to send it on WhatsApp.'}
                  </p>
                  {state === 'fallback' && (
                    <a
                      href={waLink(lastMsg)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-medium underline decoration-[#C6F00C] decoration-2 underline-offset-[6px]"
                      style={{ color: CREAM }}
                    >
                      Send on WhatsApp →
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold tracking-tight sm:text-xl" style={{ color: CREAM }}>
                    Request a feasibility study
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="ls-name">Your name</label>
                      <input id="ls-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
                    </div>
                    <div>
                      <label className={label} htmlFor="ls-phone">Phone / WhatsApp</label>
                      <input id="ls-phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+880 1..." className={field} />
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className={label} htmlFor="ls-loc">Plot location</label>
                      <input id="ls-loc" name="location" placeholder="e.g. Jolshiri" className={field} />
                    </div>
                    <div>
                      <label className={label} htmlFor="ls-size">Plot size</label>
                      <input id="ls-size" name="size" placeholder="e.g. 5 Katha" className={field} />
                    </div>
                  </div>

                  {note ? (
                    <div className="mt-3">
                      <label className={label} htmlFor="ls-notes">Note</label>
                      <textarea id="ls-notes" name="notes" rows={2} autoFocus placeholder="Anything we should know about the plot..." className={field} />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setNote(true)}
                      aria-expanded="false"
                      className="mt-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#C6F00C]/80 underline decoration-[#F5F0E6]/30 underline-offset-4 transition-colors hover:text-[#C6F00C] hover:decoration-[#C6F00C]"
                    >
                      + Add a note
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'busy'}
                    className="mt-4 flex w-full items-center justify-between rounded-full bg-[#C6DB3F] py-2 pl-6 pr-2 text-sm font-semibold text-[#2A1F1A] transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_0_24px_2px_rgba(198,240,12,.25)] disabled:opacity-60"
                  >
                    <span className="mx-auto pl-8">{state === 'busy' ? 'Sending...' : 'Submit land details'}</span>
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#2A1F1A] text-[#C6DB3F]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>

        {/* contact pills + plot drawing */}
        <Reveal className="lg:col-span-5">
          <div className="flex flex-wrap gap-2">
            <Pill
              live
              href={`tel:${L.hotline.tel}`}
              icon={
                <svg {...ic}>
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              }
            >
              Call
            </Pill>
            <Pill
              external
              href={waLink('Hello Space Maker, I own a plot and would like to discuss it with you.')}
              icon={
                <svg {...ic}>
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5A8.5 8.5 0 1 1 21 11.5Z" />
                </svg>
              }
            >
              WhatsApp
            </Pill>
            <Pill
              href={`mailto:${CONTACT.email}`}
              icon={
                <svg {...ic}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            >
              Email
            </Pill>
          </div>
          <div className="mt-7 hidden md:block">
            <PlotDrawing />
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
