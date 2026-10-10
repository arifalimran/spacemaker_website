// client/src/components/portfolio/Lightbox.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CHAPTERS } from '../../data/portfolio';

export default function Lightbox({ photos, index, onClose, onChange }) {
  const photo = photos[index];
  const n = photos.length;
  const go = (d) => onChange((index + d + n) % n);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    window.__lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.__lenis?.start();
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b1511]/95 backdrop-blur"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white/80" onClick={(e) => e.stopPropagation()}>
        <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button type="button" onClick={onClose} aria-label="Close" className="text-2xl leading-none hover:text-[#C6F00C]">
          ×
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#C6F00C] hover:text-[#C6F00C] sm:flex"
        >
          ←
        </button>
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.caption || ''}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1);
            else if (info.offset.x > 80) go(-1);
          }}
          className="max-h-[78vh] max-w-full select-none object-contain"
        />
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#C6F00C] hover:text-[#C6F00C] sm:flex"
        >
          →
        </button>
      </div>

      <div className="px-5 py-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
        <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C6F00C]">
          {CHAPTERS[photo.chapter]?.label}
        </div>
        {photo.caption && <div className="mt-1 font-['Space_Grotesk'] text-base font-semibold">{photo.caption}</div>}
      </div>
    </motion.div>
  );
}
