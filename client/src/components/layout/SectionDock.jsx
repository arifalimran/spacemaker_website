// client/src/components/layout/SectionDock.jsx
// Floating chat + call buttons with a small pill above them that shows the section you are in.
// Colours follow the page theme (espresso tiles over light sections, ivory over dark). Solid colours, no blur.
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CONTACT } from '../../data/portfolio';

export default function SectionDock() {
  const [label, setLabel] = useState(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const on = (e) => setLabel(e.detail.label);
    window.addEventListener('sm-section', on);
    return () => window.removeEventListener('sm-section', on);
  }, []);

  const tile =
    'relative flex h-11 w-11 items-center justify-center rounded-xl border transition-[background-color,color,border-color,transform] duration-500 hover:-translate-y-0.5';
  const sty = { background: 'var(--dk-bg)', color: 'var(--dk-fg)', borderColor: 'var(--dk-bd)' };

  return (
    <div data-sm-themed className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2 sm:right-6">
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
      <div className="flex items-center gap-2">
        <a href={CONTACT.messenger} target="_blank" rel="noreferrer" title="Message on Facebook" aria-label="Message on Facebook" className={tile} style={sty}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5A8.5 8.5 0 1 1 21 11.5Z" /></svg>
        </a>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hello Space Maker, I would like to know more about your projects.')}`}
          target="_blank"
          rel="noreferrer"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
          className={tile}
          style={sty}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#C6F00C] ring-2" style={{ '--tw-ring-color': 'var(--dk-bg)' }} />
        </a>
      </div>
    </div>
  );
}
