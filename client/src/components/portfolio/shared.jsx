// client/src/components/portfolio/shared.jsx
// Building blocks shared by the home portfolio and the project pages.
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { waLink, projectMessage, trackLead } from '../../lib/leads';
import { CONTACT } from '../../data/portfolio';

export const CANVAS = '#FAF8F5';

/* the same feathered mask the hero uses */
export const featherMask = (side = 'right') => {
  const x = side === 'left' ? 38 : side === 'center' ? 50 : 62;
  return `radial-gradient(ellipse 78% 72% at ${x}% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)`;
};

/* link styles */
export const linkCls =
  "text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[6px] hover:decoration-[#1B4332] transition";
export const quietCls =
  'text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-[#1B4332] hover:decoration-[#1B4332] transition';

export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1B4332] ${className}`}
    >
      <span className="h-[2px] w-8 bg-[#C6F00C]" />
      {children}
    </span>
  );
}

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

/* A photo that dissolves into the page: feathered edges, brand tint, slow drift, scroll parallax. */
export function BlendedPhoto({ src, alt = '', side = 'right', className = '', fade = true, drift = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);
  const m = featherMask(side);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ WebkitMaskImage: m, maskImage: m }}>
      <motion.div style={{ y, position: 'absolute', left: 0, right: 0, top: '-6%', bottom: '-6%' }}>
        <motion.div
          className="h-full w-full"
          animate={drift && !reduce ? { scale: [1, 1.06, 1] } : undefined}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: 'linear-gradient(120deg, #EDF4EC 0%, #F3EFE6 100%)', opacity: 0.55 }}
      />
      {fade && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to ${side === 'left' ? 'left' : 'right'}, ${CANVAS} 0%, ${CANVAS}CC 22%, transparent 55%)`,
          }}
        />
      )}
    </div>
  );
}

/* A clickable blended photo with an optional caption (opens the lightbox). */
export function Frame({ photo, onOpen, ratio = 'aspect-[4/3]', caption = true }) {
  return (
    <figure>
      <button
        type="button"
        onClick={() => onOpen(photo)}
        aria-label={`Open photo: ${photo.caption || 'project photo'}`}
        className={`block w-full cursor-zoom-in ${ratio}`}
      >
        <BlendedPhoto src={photo.src} alt={photo.caption || ''} side="center" fade={false} className="h-full w-full" />
      </button>
      {caption && photo.caption && (
        <figcaption className="mt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-500">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* A horizontal strip with arrow buttons (scrolls natively, also by swipe). */
export function HStrip({ children }) {
  const ref = useRef(null);
  const by = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.min(520, el.clientWidth * 0.8), behavior: 'smooth' });
  };
  return (
    <div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-3 flex justify-end gap-3 px-5 sm:px-8">
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => by(d)}
            aria-label={d < 0 ? 'Previous' : 'Next'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1B4332]/25 text-[#1B4332] transition hover:border-[#C6F00C] hover:bg-[#C6F00C]/30"
          >
            {d < 0 ? '←' : '→'}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Facts({ items, className = '' }) {
  const list = items.filter((i) => i.v);
  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {list.map((i) => (
        <div key={i.k}>
          <dt className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-500">{i.k}</dt>
          <dd className="mt-1 font-['Space_Grotesk'] text-sm font-semibold text-[#111827]">{i.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* WhatsApp link that carries the project / flat reference and logs the tap */
export function LeadLink({ project, flat, kind = 'project', className = linkCls, children }) {
  return (
    <a
      href={waLink(projectMessage(project, flat, kind))}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackLead({ channel: 'whatsapp', kind, projectId: project?.id, flatId: flat?.id })
      }
      className={className}
    >
      {children}
    </a>
  );
}

export function CallLink({ project, className = quietCls, children }) {
  const h = CONTACT.hotlines[0];
  return (
    <a
      href={`tel:${h.tel}`}
      onClick={() => trackLead({ channel: 'call', projectId: project?.id })}
      className={className}
    >
      {children}
    </a>
  );
}
