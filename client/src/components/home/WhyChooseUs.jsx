// client/src/components/home/WhyChooseUs.jsx
// Why choose us, written for BUYERS. (The landowner content now lives in LandownerSection.jsx.)
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_US, BRAND } from '../../data/portfolio';
import { Shot, Eyebrow, Reveal } from '../portfolio/shared';

function Timeline({ items }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '-20%' });
  return (
    <div ref={ref} className="relative w-full px-6 sm:px-10">
      <div className="relative">
        <div aria-hidden className="absolute left-0 right-0 top-[7px] h-[2px] bg-[#1B4332]/20" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-[7px] h-[2px] origin-left bg-[#C6F00C]"
          initial={{ width: 0 }}
          animate={{ width: seen ? '100%' : 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <ol className="relative flex justify-between">
          {items.map((m, i) => (
            <li key={m} className="flex flex-col items-center gap-3">
              <motion.span
                className="h-4 w-4 rounded-full border-2 border-[#1B4332] bg-[#FAF8F5]"
                animate={seen ? { backgroundColor: '#C6F00C' } : undefined}
                transition={{ delay: 0.3 + i * 0.35 }}
              />
              <span className="hidden font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#111827] sm:block">
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
        <div className="font-serif text-7xl italic leading-none text-[#C6F00C]">0{i + 1}</div>
        <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-5xl">
          {s.title}
        </h3>
        <p className="mt-4 font-serif text-xl italic text-[#1B4332]/85 sm:text-2xl">{s.line}</p>
        <p className="mt-5 max-w-lg text-base leading-[1.8] text-[#374151] sm:text-lg">{s.text}</p>
        {s.points && (
          <ul className="mt-6 grid gap-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.14em] text-[#111827]">
                <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/25" />
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
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: 'linear-gradient(to bottom, #F3EFE6 0%, #EDF4EC 50%, #F6F8F5 100%)' }}
    >
      <img
        src={BRAND.emblem}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 w-[420px] select-none opacity-[0.06]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{WHY_US.eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-['Space_Grotesk'] text-4xl font-extrabold leading-[1.06] tracking-tight text-[#111827] sm:text-6xl">
          {WHY_US.title}
        </h2>
      </div>

      <div className="relative mt-6">
        {WHY_US.scenes.map((s, i) => (
          <Scene key={s.key} s={s} i={i} />
        ))}
      </div>

      <Reveal className="relative mx-auto mt-6 max-w-7xl px-5 sm:px-8">
        <ul className="grid gap-4 border-y border-[#1B4332]/15 py-7 sm:grid-cols-3">
          {WHY_US.assurances.map((a) => (
            <li key={a} className="flex items-center gap-3 font-['Space_Grotesk'] text-base font-semibold text-[#1B4332]">
              <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/30" />
              {a}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
