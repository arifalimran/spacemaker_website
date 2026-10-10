import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { BlendedPhoto, Eyebrow, Reveal } from '../portfolio/shared';
import { BRAND } from '../../data/portfolio';

/* Demo still. Swap for your own, or add `image: '/assets/...'` to aboutContent in siteContent.js */
const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1541888946425-d0fbb18615f7?auto=format&fit=crop&w=1800&q=80';

/* The quiet second beat: one still image, blended like the hero, with the text sitting on it. */
export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '14%']);
  const pillars = c.pillars || [];

  return (
    <section ref={ref} id="about" className="sec-about relative z-10 overflow-hidden">
      <motion.img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        style={{ y: markY }}
        className="pointer-events-none absolute -left-[6%] bottom-[8%] z-0 w-[440px] select-none opacity-[0.07] md:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* the still */}
      <div className="relative">
        <div className="absolute right-0 top-[4%] z-[1] h-[80%] w-full opacity-45 md:w-[72%] md:opacity-100">
          <BlendedPhoto src={c.image || DEMO_IMAGE} alt="Space Maker at work" side="right" drift className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
          <Reveal className="max-w-xl">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="f-display mt-5 text-3xl font-bold leading-[1.08] text-[#111827] sm:text-5xl">{c.title}</h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-[#374151] sm:text-lg">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-10 border-l-4 border-[#C6F00C] pl-6">
              <p className="f-serif text-xl italic leading-snug text-[#1B4332] sm:text-2xl">“{c.quote}”</p>
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* pillars: one quiet ruled row */}
      <ul className="relative z-10 mx-auto grid max-w-7xl gap-x-8 gap-y-8 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="border-t border-[#1B4332]/20 pt-5"
          >
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#111827]">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="f-display mt-3 text-xl font-semibold text-[#1B4332]">{p.title}</h3>
            <p className="mt-1.5 leading-relaxed text-[#374151]">{p.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
