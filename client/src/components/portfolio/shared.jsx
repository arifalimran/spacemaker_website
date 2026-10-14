// client/src/components/portfolio/shared.jsx
// Shared building blocks: image treatments, buttons, small pieces used across the site.
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { waLink, projectMessage, trackLead } from '../../lib/leads';
import { CONTACT, ESPRESSO, TYPE_LABEL, STATUS_LABEL } from '../../data/portfolio';

export const CANVAS = '#FAF8F5';
export { ESPRESSO };

/* ------------------------------------------------------------------ */
/* Buttons and links (soft tone, one filled button per scene)          */
/* ------------------------------------------------------------------ */
const base = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300';
export const btnPrimary = `${base} bg-[#1B4332] text-white shadow-[0_10px_24px_-12px_rgba(27,67,50,0.8)] hover:-translate-y-0.5 hover:bg-[#14331f]`;
export const btnOutline = `${base} border border-[#1B4332]/30 text-[#1B4332] hover:border-[#C6F00C] hover:bg-[#C6F00C]/25`;
export const btnRound =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1B4332]/25 text-[#1B4332] transition duration-300 hover:-translate-y-0.5 hover:border-[#C6F00C] hover:bg-[#C6F00C]';
export const btnPrimaryDark = `${base} bg-[#F3EFE6] text-[#2A1F1A] hover:-translate-y-0.5 hover:bg-white`;
export const btnOutlineDark = `${base} border border-[#C6F00C]/60 text-[#F3EFE6] hover:bg-[#C6F00C]/15`;
export const btnRoundDark =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[#F3EFE6] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C6F00C] hover:text-[#2A1F1A]';

export const linkCls =
  'text-sm font-medium text-[#1B4332] underline decoration-[#C6F00C] decoration-2 underline-offset-[6px] hover:decoration-[#1B4332] transition';
export const quietCls =
  'text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-[#1B4332] hover:decoration-[#1B4332] transition';

export function CallIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

/* WhatsApp link that carries the project / unit reference and logs the tap */
export function LeadLink({ project, unit, kind = 'project', className = linkCls, children, ...rest }) {
  return (
    <a
      href={waLink(projectMessage(project, unit, kind))}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackLead({ channel: 'whatsapp', kind, projectId: project?.id, unitId: unit?.id })}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

export function CallLink({ project, className = quietCls, children, ...rest }) {
  const h = CONTACT.hotlines[0];
  return (
    <a
      href={`tel:${h.tel}`}
      onClick={() => trackLead({ channel: 'call', projectId: project?.id })}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Explore (outline) · Ask (main) · Call (round) */
export function ActionRow({ project, dark = false, explore = true, kind = 'project', className = '' }) {
  const p = dark ? btnPrimaryDark : btnPrimary;
  const o = dark ? btnOutlineDark : btnOutline;
  const r = dark ? btnRoundDark : btnRound;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {explore && (
        <Link to={`/projects/${project.slug}`} className={o}>
          Explore this project →
        </Link>
      )}
      <LeadLink project={project} kind={kind} className={p}>
        <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
        Ask about this {kind === 'interior' ? 'interior' : 'project'}
      </LeadLink>
      <CallLink project={project} className={r} aria-label="Call us">
        <CallIcon />
      </CallLink>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small text pieces                                                   */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children, className = '', dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] ${
        dark ? 'text-[#C6F00C]' : 'text-[#1B4332]'
      } ${className}`}
    >
      <span className="h-[2px] w-8 bg-[#C6F00C]" />
      {children}
    </span>
  );
}

export function TypeTag({ type, status, dark = false }) {
  const parts = [type && TYPE_LABEL[type], status && STATUS_LABEL[status]].filter(Boolean);
  return <Eyebrow dark={dark}>{parts.join(' · ')}</Eyebrow>;
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

export function Facts({ items, className = '', dark = false }) {
  const list = items.filter((i) => i.v);
  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {list.map((i) => (
        <div key={i.k}>
          <dt
            className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] ${
              dark ? 'text-white/50' : 'text-neutral-500'
            }`}
          >
            {i.k}
          </dt>
          <dd className={`mt-1 font-['Space_Grotesk'] text-sm font-semibold ${dark ? 'text-[#F3EFE6]' : 'text-[#111827]'}`}>
            {i.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Espresso band with slanted top and bottom edges                      */
/* ------------------------------------------------------------------ */
export function DarkBand({ children, className = '', id, bg }) {
  return (
    <div
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: bg || `radial-gradient(ellipse 80% 60% at 20% 0%, #3A2B23 0%, ${ESPRESSO} 60%, #1E1612 100%)`,
        clipPath: 'polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)',
        paddingTop: '8vw',
        paddingBottom: '8vw',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(#C6F00C 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Butterfly                                                           */
/* ------------------------------------------------------------------ */
export function Flutter({ hue = '#C6F00C', size = 34, className = '' }) {
  const reduce = useReducedMotion();
  const flap = reduce ? undefined : { scaleX: [1, 0.2, 1] };
  const t = { duration: 0.42, repeat: Infinity, ease: 'easeInOut' };
  return (
    <svg aria-hidden viewBox="0 0 100 100" width={size} height={size} className={className} style={{ overflow: 'visible' }}>
      <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'right center' }} animate={flap} transition={t}>
        <path d="M50 48 C30 10, 4 14, 8 40 C10 58, 34 62, 50 52 Z" fill={hue} opacity="0.9" />
        <path d="M50 54 C32 58, 14 74, 26 86 C38 94, 48 72, 50 58 Z" fill={hue} opacity="0.7" />
        <circle cx="24" cy="36" r="4" fill="#1B4332" opacity="0.5" />
      </motion.g>
      <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} animate={flap} transition={t}>
        <path d="M50 48 C70 10, 96 14, 92 40 C90 58, 66 62, 50 52 Z" fill={hue} opacity="0.9" />
        <path d="M50 54 C68 58, 86 74, 74 86 C62 94, 52 72, 50 58 Z" fill={hue} opacity="0.7" />
        <circle cx="76" cy="36" r="4" fill="#1B4332" opacity="0.5" />
      </motion.g>
      <rect x="48.5" y="40" width="3" height="26" rx="1.5" fill="#111827" />
      <path d="M50 40 C46 30, 42 28, 40 26 M50 40 C54 30, 58 28, 60 26" stroke="#111827" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */
export const featherMask = (side = 'right') => {
  const x = side === 'left' ? 38 : side === 'center' ? 50 : 62;
  return `radial-gradient(ellipse 78% 72% at ${x}% 48%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)`;
};

/* An image that never shows the broken-image icon: falls back to a soft tint */
export function Pic({ src, alt = '', className = '', fallback, ...rest }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) {
    return (
      <div
        aria-hidden
        className={className}
        style={{ background: fallback || 'linear-gradient(135deg,#DCE9DA 0%,#EDF4EC 100%)' }}
      />
    );
  }
  return <motion.img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} {...rest} />;
}

const Tint = ({ op = 0.55 }) => (
  <div
    aria-hidden
    className="absolute inset-0 mix-blend-soft-light"
    style={{ background: 'linear-gradient(120deg, #EDF4EC 0%, #F3EFE6 100%)', opacity: op }}
  />
);

/* the image itself: fills its parent, drifts with scroll, optional slow zoom */
function Parallax({ src, alt, drift = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, position: 'absolute', left: 0, right: 0, top: '-6%', bottom: '-6%' }}>
        <motion.div
          className="h-full w-full"
          animate={drift && !reduce ? { scale: [1, 1.06, 1] } : undefined}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Pic
            src={src}
            alt={alt}
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* 1. Feather: dissolves into the page (the hero's signature) */
export function BlendedPhoto({ src, alt = '', side = 'right', className = '', fade = true, drift = false }) {
  const m = featherMask(side);
  return (
    <div className={`relative ${className}`} style={{ WebkitMaskImage: m, maskImage: m }}>
      <Parallax src={src} alt={alt} drift={drift} />
      <Tint />
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

/* 2. Arch: crisp architectural arch with an offset lime outline */
function Arch({ src, alt, className = '', drift }) {
  const r = '9999px 9999px 0 0';
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-[#C6F00C]" style={{ borderRadius: r }} />
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: r }}>
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
    </div>
  );
}

/* 3. Notch: all four corners cut at an angle */
function Notch({ src, alt, className = '', drift }) {
  return (
    <div className={`relative h-full w-full ${className}`} style={{ filter: 'drop-shadow(0 24px 28px rgba(27,67,50,0.28))' }}>
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ clipPath: 'polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 56px 100%, 0 calc(100% - 56px))' }}
      >
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
    </div>
  );
}

/* 4. Carved: a rectangular bite is cut from one corner. Put text in the bite (children). */
const BITES = {
  bl: { poly: (w, h) => `polygon(0 0,100% 0,100% 100%,${w}% 100%,${w}% ${100 - h}%,0 ${100 - h}%)`, pos: { left: 0, bottom: 0 } },
  br: { poly: (w, h) => `polygon(0 0,100% 0,100% ${100 - h}%,${100 - w}% ${100 - h}%,${100 - w}% 100%,0 100%)`, pos: { right: 0, bottom: 0 } },
  tl: { poly: (w, h) => `polygon(${w}% 0,100% 0,100% 100%,0 100%,0 ${h}%,${w}% ${h}%)`, pos: { left: 0, top: 0 } },
  tr: { poly: (w, h) => `polygon(0 0,${100 - w}% 0,${100 - w}% ${h}%,100% ${h}%,100% 100%,0 100%)`, pos: { right: 0, top: 0 } },
};
function Carved({ src, alt, corner = 'bl', w = 44, h = 34, children, className = '', drift }) {
  const b = BITES[corner] || BITES.bl;
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0" style={{ filter: 'drop-shadow(0 22px 26px rgba(27,67,50,0.26))' }}>
        <div className="relative h-full w-full overflow-hidden" style={{ clipPath: b.poly(w, h) }}>
          <Parallax src={src} alt={alt} drift={drift} />
          <Tint />
        </div>
      </div>
      {children && (
        <div className="absolute flex flex-col justify-end" style={{ ...b.pos, width: `${w}%`, height: `${h}%` }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* 5. Band: the photo is split by a gap through the middle. Put text in the gap (children). */
function Band({ src, alt, from = 38, to = 64, children, className = '', drift }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 ${100 - from}% 0 round 18px)` }}>
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(${to}% 0 0 0 round 18px)` }}>
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint />
      </div>
      <div className="absolute inset-x-0 flex items-center" style={{ top: `${from}%`, height: `${to - from}%` }}>
        {children}
      </div>
    </div>
  );
}

/* 6. Film frame: crop marks around a wide still */
function FilmFrame({ src, alt, className = '', drift }) {
  const mark = 'absolute h-5 w-5 border-[#C6F00C]';
  return (
    <div className={`relative h-full w-full p-3 ${className}`}>
      <span aria-hidden className={`${mark} left-0 top-0 border-l-2 border-t-2`} />
      <span aria-hidden className={`${mark} right-0 top-0 border-r-2 border-t-2`} />
      <span aria-hidden className={`${mark} bottom-0 left-0 border-b-2 border-l-2`} />
      <span aria-hidden className={`${mark} bottom-0 right-0 border-b-2 border-r-2`} />
      <div className="relative h-full w-full overflow-hidden">
        <Parallax src={src} alt={alt} drift={drift} />
        <Tint op={0.4} />
      </div>
    </div>
  );
}

/* 7. Blur: soft and out of focus until you hover */
function BlurShot({ src, alt, className = '', drift }) {
  return (
    <div className={`sm-blur relative h-full w-full overflow-hidden rounded-2xl ${className}`}>
      <Parallax src={src} alt={alt} drift={drift} />
      <Tint op={0.4} />
    </div>
  );
}

/* 8. Duotone: filtered in the espresso tone, colour returns on hover */
function Duotone({ src, alt, className = '', drift }) {
  return (
    <div className={`sm-duo relative h-full w-full overflow-hidden rounded-2xl ${className}`}>
      <Parallax src={src} alt={alt} drift={drift} />
    </div>
  );
}

/* 9. Circle: a round lens */
function Circle({ src, alt, className = '', drift }) {
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-full ring-2 ring-[#C6F00C] ${className}`}>
      <Parallax src={src} alt={alt} drift={drift} />
      <Tint op={0.4} />
    </div>
  );
}

const FeatherShot = ({ src, alt, side = 'center', fade = false, className = '', drift }) => (
  <BlendedPhoto src={src} alt={alt} side={side} fade={fade} drift={drift} className={`h-full w-full ${className}`} />
);

const SHOTS = {
  feather: FeatherShot,
  arch: Arch,
  notch: Notch,
  carved: Carved,
  band: Band,
  frame: FilmFrame,
  blur: BlurShot,
  duotone: Duotone,
  circle: Circle,
};

/* One entry point:  <Shot treatment="arch" src=... />  ; `children` is the text for carved / band */
export function Shot({ treatment = 'feather', ...props }) {
  const T = SHOTS[treatment] || FeatherShot;
  return <T {...props} />;
}

/* Rising slices: one photo cut into vertical strips that rise into place */
function Slice({ i, count, top, lift, progress, src }) {
  const y = useTransform(progress, [0, 1], [lift, 0]);
  return (
    <motion.div
      style={{ y, clipPath: `inset(${top}% 0 0 0)`, background: 'linear-gradient(180deg,#DCE9DA,#C9DCC6)' }}
      className="relative h-full flex-1 overflow-hidden"
    >
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="absolute top-0 h-full max-w-none object-cover"
        style={{ width: `${count * 100}%`, left: `-${i * 100}%` }}
      />
      <Tint op={0.45} />
    </motion.div>
  );
}

export function Slices({ src, count = 4, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const tops = [20, 0, 30, 10];
  const lifts = [110, 50, 140, 80];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  return (
    <div ref={ref} className={`relative flex gap-2 sm:gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Slice
          key={i}
          i={i}
          count={count}
          top={tops[i % tops.length]}
          lift={reduce ? 0 : lifts[i % lifts.length]}
          progress={scrollYProgress}
          src={src}
        />
      ))}
    </div>
  );
}

/* A clickable photo with a caption (opens the lightbox) */
export function Frame({ photo, onOpen, ratio = 'aspect-[4/3]', caption = true, treatment = 'feather' }) {
  const bite = treatment === 'carved';
  return (
    <figure>
      <button
        type="button"
        onClick={() => onOpen(photo)}
        aria-label={`Open photo: ${photo.caption || 'project photo'}`}
        className={`block w-full cursor-zoom-in text-left ${ratio}`}
      >
        <Shot src={photo.src} alt={photo.caption || ''} treatment={treatment} corner="br" w={40} h={22}>
          {bite && photo.caption && (
            <span className="block pl-4 pt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-600">
              {photo.caption}
              <span className="mt-1 block text-[#1B4332]">View larger +</span>
            </span>
          )}
        </Shot>
      </button>
      {caption && !bite && photo.caption && (
        <figcaption className="mt-2 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-neutral-500">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* A horizontal strip with arrow buttons (scrolls natively, also by swipe) */
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

/* The quiet floating bar on project pages */
export function StickyBar({ project, kind = 'project', show }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-auto flex items-center gap-5 rounded-full border border-[#1B4332]/15 bg-white/85 px-5 py-2.5 shadow-lg backdrop-blur"
          >
            <span className="font-['Space_Grotesk'] text-sm font-bold text-[#111827]">{project.title}</span>
            <LeadLink project={project} kind={kind} className="flex items-center gap-2 text-sm font-medium text-[#1B4332]">
              <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/30" />
              WhatsApp
            </LeadLink>
            <CallLink project={project} className="text-sm text-neutral-600 hover:text-[#1B4332]">
              Call
            </CallLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
