// client/src/components/home/PageIntro.jsx
// Short opening: an espresso screen, SPACE MAKER rises letter by letter, a lime line draws, then the screen lifts like a
// curtain (a lime edge trails it). About 1.7 seconds in total and it sits ON TOP of the page, which is already loading
// underneath, so it never delays anything. First visit per session only (see lib/intro.js).
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { introWillPlay, markIntroSeen } from '../../lib/intro';

const LIME = '#C6F00C';
const ESPRESSO = '#2A1F1A';
const WORD = 'SPACE MAKER'.split('');
const EASE = [0.76, 0, 0.24, 1];

export default function PageIntro() {
  const [show, setShow] = useState(introWillPlay);

  useEffect(() => {
    if (!introWillPlay) return undefined;
    markIntroSeen();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    const t1 = setTimeout(() => setShow(false), 1250); // start the lift
    const t2 = setTimeout(() => {
      root.style.overflow = prev;
    }, 1250 + 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      root.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[90]" aria-hidden>
          {/* trailing lime edge */}
          <motion.div
            className="absolute inset-0"
            style={{ background: LIME }}
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: ESPRESSO }}
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex overflow-hidden px-4 pb-2">
              {WORD.map((c, i) => (
                <motion.span
                  key={i}
                  className="font-['Space_Grotesk'] text-[2.4rem] font-extrabold uppercase tracking-tight text-[#F5F0E6] sm:text-6xl"
                  style={{ display: 'inline-block', width: c === ' ' ? '0.35em' : undefined }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c === ' ' ? '\u00A0' : c}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="mt-4 h-[3px] rounded-full"
              style={{ background: LIME }}
              initial={{ width: 0 }}
              animate={{ width: 150 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeInOut' }}
            />
            <motion.p
              className="mt-4 font-serif text-base italic text-[#F5F0E6]/70"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              where space defines luxury
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
