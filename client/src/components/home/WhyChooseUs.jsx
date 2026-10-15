// client/src/components/home/WhyChooseUs.jsx
// Why choose us, written for BUYERS. (The landowner content now lives in LandownerSection.jsx.)
// LIGHT espresso ("latte", option 6): #DCCFBF -> #E2D8C9 -> #E8E6D1 -> #EEF4DD, flowing straight
// into the pale-lime Testimonials. Espresso text, olive labels, lime only for small accents.
// Plain gradients + rgba only (no filters / blend modes on this layer).
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_US } from '../../data/portfolio';
import { Shot, Reveal } from '../portfolio/shared';

function Timeline({ items }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '-20%' });
  return (
    <div ref={ref} className="relative w-full px-6 sm:px-10">
      <div className="relative">
        <div aria-hidden className="absolute left-0 right-0 top-[7px] h-[2px] bg-[#2A1F1A]/20" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-[7px] h-[2px] origin-left bg-[#5C6E0A]"
          initial={{ width: 0 }}
          animate={{ width: seen ? '100%' : 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <ol className="relative flex justify-between">
          {items.map((m, i) => (
            <li key={m} className="flex flex-col items-center gap-3">
              <motion.span
                className="h-4 w-4 rounded-full border-2 border-[#5C6E0A] bg-[#E8E6D1]"
                animate={seen ? { backgroundColor: '#C6F00C' } : undefined}
                transition={{ delay: 0.3 + i * 0.35 }}
              />
              <span className="hidden font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#2A1F1A] sm:block">
                {m}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Scene({ s, i }) {
  const flip = i % 2 === 1;
  const kind = s.treatment;
  const ratio = kind === 'arch' ? 'aspect-[4/5] max-w-md' : kind === 'band' || s.milestones ? 'aspect-[16/11]' : 'aspect-[16/11]';
  const treatment = s.milestones ? 'band' : kind;

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-12 md:gap-14">
      <div className={`md:col-span-6 ${flip ? 'md:order-2' : ''}`}>
        <Reveal>
          <div className={`mx-auto w-full ${ratio}`}>
            <Shot treatment={treatment} src={s.image} alt={s.title} from={36} to={66}>
              {s.milestones && <Timeline items={s.milestones} />}
            </Shot>
          </div>
        </Reveal>
      </div>

      <Reveal className={`md:col-span-6 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-serif text-6xl italic leading-none text-[#5C6E0A]">0{i + 1}</div>
        <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.06] tracking-tight text-[#2A1F1A] sm:text-5xl">
          {s.title}
        </h3>
        <p className="mt-4 font-serif text-xl italic text-[#2A1F1A]/80 sm:text-2xl">{s.line}</p>
        <p className="mt-5 max-w-lg text-base leading-[1.8] text-[#2A1F1A]/75 sm:text-lg">{s.text}</p>
        {s.points && (
          <ul className="mt-6 grid gap-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.14em] text-[#2A1F1A]">
                <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#5C6E0A]/20" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32"
      style={{
        // short light-to-light fade from the cream above, then the latte gradient ending in pale lime
        background:
          'linear-gradient(to bottom, #F5F0E6 0px, #DCCFBF 120px, #E2D8C9 40%, #E8E6D1 70%, #EEF4DD 100%)',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span className="inline-flex items-center font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6E0A]">
          {WHY_US.eyebrow}
        </span>
        <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.06] tracking-tight text-[#2A1F1A] sm:text-6xl">
          {WHY_US.title}
        </h2>
        <span aria-hidden className="mt-6 block h-[3px] w-12 rounded-full bg-[#C6F00C]" />
        {WHY_US.intro && (
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-[#2A1F1A]/75 sm:text-lg">{WHY_US.intro}</p>
        )}
      </div>

      <div className="relative mt-6">
        {WHY_US.scenes.map((s, i) => (
          <Scene key={s.key} s={s} i={i} />
        ))}
      </div>

      {WHY_US.assurances?.length > 0 && (
        <Reveal className="relative mx-auto mt-6 max-w-7xl px-5 sm:px-8">
          <ul className="grid gap-4 border-y border-[#2A1F1A]/12 py-7 sm:grid-cols-3">
            {WHY_US.assurances.map((a) => (
              <li key={a} className="flex items-center gap-3 font-['Space_Grotesk'] text-base font-semibold text-[#2A1F1A]">
                <span className="h-2 w-2 flex-none rounded-full bg-[#C6F00C] ring-4 ring-[#5C6E0A]/20" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
