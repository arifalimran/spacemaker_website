// client/src/components/home/WhoWeAre.jsx
// "Who we are": same language as the hero (cream page, big rounded photo frames, espresso + lime).
// The story on the left rises word by word; on the right two real photos are revealed like a curtain lifting,
// then drift at different speeds as you scroll (parallax inside the frames). transform/opacity/clip-path only.
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { aboutContent as c } from '../../data/siteContent';
import { Eyebrow } from '../portfolio/shared';

const ESPRESSO = '#2A1F1A';
const LIME = '#C6F00C';
const CREAM = '#FAF8F5';
const EASE = [0.22, 1, 0.36, 1];

const DETAIL = '/assets/01_hero/hero-detail';
const SECOND = '/assets/01_hero/hero-rayerbazar';

export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const seen = useInView(stageRef, { once: true, margin: '0px 0px -15% 0px' });
  const textSeen = useInView(textRef, { once: true, margin: '0px 0px -12% 0px' });

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'end start'] });
  const mainImgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  const secondY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const secondImgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['6%', '-6%']);

  const pillars = c.pillars || [];
  const words = String(c.title || '').split(' ');

  const wipe = (delay) =>
    reduce
      ? { initial: false }
      : {
          initial: { clipPath: 'inset(0 0 100% 0 round 32px)' },
          animate: seen ? { clipPath: 'inset(0 0 0% 0 round 32px)' } : undefined,
          transition: { duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] },
        };
  const zoom = (delay) =>
    reduce
      ? { initial: false }
      : {
          initial: { scale: 1.3 },
          animate: seen ? { scale: 1 } : undefined,
          transition: { duration: 2, delay, ease: EASE },
        };

  return (
    <section ref={sectionRef} id="about" className="sec-about relative z-10 overflow-hidden" style={{ background: CREAM }}>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:grid-cols-12 lg:gap-10">
        {/* story */}
        <div ref={textRef} className="lg:col-span-6">
          <Eyebrow>Who we are</Eyebrow>

          <h2 className="f-display mt-5 text-3xl font-bold leading-[1.08] text-[#111827] sm:text-5xl">
            {words.map((wd, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={textSeen ? { y: 0 } : undefined}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
                >
                  {wd}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={textSeen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[#374151] sm:text-lg"
          >
            {(c.paragraphs || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.blockquote
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={textSeen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="relative mt-10 max-w-xl pl-6"
          >
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 h-full w-1 origin-top rounded-full"
              style={{ background: LIME }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={textSeen ? { scaleY: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
            />
            <p className="f-serif text-xl italic leading-snug text-[#1B4332] sm:text-2xl">&ldquo;{c.quote}&rdquo;</p>
          </motion.blockquote>
        </div>

        {/* two frames, revealed like a curtain, drifting at different speeds */}
        <div ref={stageRef} className="relative h-[520px] sm:h-[660px] lg:col-span-6 lg:h-[700px]">
          <motion.div
            {...wipe(0)}
            className="absolute right-0 top-0 h-[86%] w-[74%] overflow-hidden rounded-[32px] shadow-[0_30px_70px_rgba(42,31,26,.22)]"
            style={{ background: '#C9D8E6' }}
          >
            <motion.div style={{ y: mainImgY }} className="absolute inset-x-0 -inset-y-[9%]">
              <motion.img
                {...zoom(0)}
                src={`${DETAIL}-700.webp`}
                srcSet={`${DETAIL}-700.webp 700w, ${DETAIL}-1400.webp 1400w`}
                sizes="(min-width: 1024px) 36vw, 74vw"
                width="700"
                height="960"
                alt="Close-up of a Space Maker facade with planted balconies"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: secondY }} className="absolute bottom-0 left-0 z-10 w-[58%]">
            <motion.div
              {...wipe(0.35)}
              className="aspect-[5/4] overflow-hidden rounded-[28px] border-[6px] shadow-[0_24px_60px_rgba(42,31,26,.25)]"
              style={{ borderColor: CREAM, background: '#2B6CB0' }}
            >
              <motion.div style={{ y: secondImgY }} className="h-[112%] w-full">
                <motion.img
                  {...zoom(0.35)}
                  src={`${SECOND}-800.webp`}
                  srcSet={`${SECOND}-800.webp 800w, ${SECOND}-1600.webp 1600w`}
                  sizes="(min-width: 1024px) 28vw, 58vw"
                  width="800"
                  height="640"
                  alt="Artist's impression of a Space Maker apartment tower with planted terraces"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* small lime mark on the frame corner, ties the section to the hero */}
          <motion.span
            aria-hidden
            className="absolute right-[-6px] top-[10%] z-10 h-3.5 w-3.5 rounded-full ring-8"
            style={{ background: LIME, '--tw-ring-color': 'rgba(198,240,12,.35)' }}
            initial={reduce ? false : { scale: 0 }}
            animate={seen ? { scale: 1 } : undefined}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
          />
        </div>
      </div>

      <ul className="relative z-10 mx-auto grid max-w-7xl gap-x-8 gap-y-8 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.li
            key={p.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="relative pt-5"
          >
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 h-px w-full origin-left"
              style={{ background: 'rgba(27,67,50,.25)' }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
            />
            <span className="font-['JetBrains_Mono'] text-xs font-semibold" style={{ color: ESPRESSO }}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full ring-4" style={{ background: LIME, '--tw-ring-color': 'rgba(198,240,12,.25)' }} />
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
