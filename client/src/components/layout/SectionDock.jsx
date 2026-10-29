// client/src/components/layout/SectionDock.jsx
// Floating WhatsApp (green) + Call (blue) buttons with a small pill above them that shows the section you are in.
// The pill follows the page theme (espresso over light sections, sand over dark); the two buttons keep their own colours.
// Gentle pulse ring + hover label; both are switched off for reduced motion.
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CONTACT } from '../../data/portfolio';
import { trackLead } from '../../lib/leads';

const DOCK_CSS = `
.sm-dk{position:relative;display:flex;align-items:center;justify-content:center;height:44px;width:44px;border-radius:12px;color:#F5F0E6;
  border:1px solid rgba(245,240,230,.38);box-shadow:0 4px 12px rgba(42,31,26,.22);
  transition:transform .3s cubic-bezier(.22,1,.36,1),background-color .3s}
.sm-dk:hover,.sm-dk:focus-visible{transform:translateY(-2px)}
.sm-dk-wa{background:#3F8A5E}.sm-dk-wa:hover{background:#4A9A6B}
.sm-dk-call{background:#4468A8}.sm-dk-call:hover{background:#4F75BA}
.sm-dk::after{content:"";position:absolute;inset:-1px;border-radius:12px;border:1.5px solid;opacity:0;pointer-events:none;animation:sm-dk-ring 7s ease-out infinite}
.sm-dk-wa::after{border-color:#3F8A5E}
.sm-dk-call::after{border-color:#4468A8;animation-delay:1.6s}
@keyframes sm-dk-ring{0%,72%{transform:scale(1);opacity:0}78%{opacity:.4}100%{transform:scale(1.4);opacity:0}}
.sm-dk-tip{position:absolute;right:calc(100% + 10px);top:50%;transform:translate(6px,-50%);white-space:nowrap;opacity:0;pointer-events:none;
  background:#2A1F1A;color:#F5F0E6;border-radius:999px;padding:6px 12px;font:600 10px/1 'JetBrains Mono',monospace;letter-spacing:.16em;text-transform:uppercase;
  transition:opacity .25s,transform .25s}
.sm-dk:hover .sm-dk-tip,.sm-dk:focus-visible .sm-dk-tip{opacity:1;transform:translate(0,-50%)}
@media (prefers-reduced-motion:reduce){.sm-dk::after{animation:none!important}.sm-dk,.sm-dk-tip{transition:none!important}}
`;

export default function SectionDock() {
  const [label, setLabel] = useState(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const on = (e) => setLabel(e.detail.label);
    window.addEventListener('sm-section', on);
    return () => window.removeEventListener('sm-section', on);
  }, []);

  const sty = { background: 'var(--dk-bg)', color: 'var(--dk-fg)', borderColor: 'var(--dk-bd)' };
  const tel = CONTACT.hotlines?.[0]?.tel || `+${CONTACT.whatsapp}`;

  return (
    <div data-sm-themed className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
      <style>{DOCK_CSS}</style>
      <div className="h-8">
        <AnimatePresence mode="wait" initial={false}>
          {label && (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] transition-[background-color,color,border-color] duration-500"
              style={sty}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6F00C] ring-1 ring-[#2A1F1A]/40" />
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hello Space Maker, I would like to know more about your projects.')}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onClick={() => trackLead({ channel: 'whatsapp', kind: 'dock' })}
          className="sm-dk sm-dk-wa"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M9.2 8.2c-.3 0-.6.2-.8.5-.4.6-.4 1.4 0 2.3.9 1.9 2.4 3.4 4.3 4.3 1 .4 1.8.3 2.3-.3.2-.3.3-.6.1-.8l-1.4-1c-.2-.1-.4-.1-.6.1l-.5.5c-1-.4-1.8-1.2-2.2-2.2l.5-.5c.2-.2.2-.4.1-.6l-1-1.4c-.1-.1-.2-.2-.3-.2Z" fill="currentColor" />
          </svg>
          <span className="sm-dk-tip">WhatsApp us</span>
        </a>
        <a href={`tel:${tel}`} aria-label="Call us" onClick={() => trackLead({ channel: 'call', kind: 'dock' })} className="sm-dk sm-dk-call">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1L6.6 10.8Z" />
          </svg>
          <span className="sm-dk-tip">Call us</span>
        </a>
      </div>
    </div>
  );
}
