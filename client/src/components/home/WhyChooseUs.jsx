// client/src/components/home/WhyChooseUs.jsx
// Why choose us, written for BUYERS. (The landowner content now lives in LandownerSection.jsx.)
// SOLID espresso #2A1F1A, same look as the Signature band: cream text, lime labels and italic lines,
// #352822 cards. Photos use the clipped-corner frame (same slope as the angle cuts).
// The angle cuts above/below are placed by the page (App.jsx).
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_US } from '../../data/portfolio';
import { Shot, Eyebrow, Reveal, SECTION } from '../portfolio/shared';

const CARD = SECTION.espressoCard;
const BORDER = 'rgba(245,240,230,0.12)';

/* the milestone line (process labels), shown under the photo of a scene that has `milestones` */
function Timeline({ items }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '-20%' });
  return (
    <div ref={ref} className="relative mt-8 w-full">
      <div aria-hidden className="absolute left-2 right-2 top-[7px] h-[2px] bg-[#F5F0E6]/15" />
      <motion.div
        aria-hidden
        className="absolute left-2 top-[7px] h-[2px] origin-left bg-[#C6F00C]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: seen ? 1 : 0 }}
        style={{ right: '0.5rem' }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />
      <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((m, i) => (
          <li key={m} className="flex flex-col items-center gap-3 text-center">
            <motion.span
              className="h-4 w-4 rounded-full border-2 border-[#C6F00C]"
              style={{ backgroundColor: SECTION.espresso }}
              animate={seen ? { backgroundColor: '#C6F00C' } : undefined}
              transition={{ delay: 0.3 + i * 0.35 }}
            />
            <span className="font-['JetBrains_Mono'] text-[8px] uppercase leading-tight tracking-[0.08em] text-[#F5F0E6]/85 sm:text-[10px] sm:tracking-[0.14em]">
              {m}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Scene({ s, i }) {
  const flip = i % 2 === 1;
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-14">
      <div className={`md:col-span-6 ${flip ? 'md:order-2' : ''}`}>
        <Reveal>
          <div className="aspect-[16/11] w-full">
            <Shot treatment="clip" corner={flip ? 'tl' : 'tr'} line src={s.image} alt={s.title} />
          </div>
          {s.milestones && <Timeline items={s.milestones} />}
        </Reveal>
      </div>

      <Reveal className={`md:col-span-6 ${flip ? 'md:order-1' : ''}`}>
        <div className="font-['JetBrains_Mono'] text-xs font-semibold tracking-[0.22em] text-[#C6F00C]">0{i + 1}</div>
        <h3 className="mt-3 font-heading text-3xl font-bold leading-[1.06] tracking-tight text-[#F5F0E6] sm:text-5xl">
          {s.title}
        </h3>
        <p className="mt-4 font-serif text-xl italic text-[#C6F00C] sm:text-2xl">{s.line}</p>
        <p className="mt-5 max-w-lg text-base leading-[1.8] text-[#F5F0E6]/75 sm:text-lg">{s.text}</p>
        {s.points && (
          <ul className="mt-6 grid gap-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.14em] text-[#F5F0E6]/90">
                <span className="h-2 w-2 rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/20" />
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
    <section className="relative py-16 sm:py-20" style={{ background: SECTION.espresso }}>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow dark>{WHY_US.eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.06] tracking-tight text-[#F5F0E6] sm:text-6xl">
          {WHY_US.title}
        </h2>
        {WHY_US.intro && (
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-[#F5F0E6]/75 sm:text-lg">{WHY_US.intro}</p>
        )}
      </div>

      <div className="relative mt-4">
        {WHY_US.scenes.map((s, i) => (
          <Scene key={s.key} s={s} i={i} />
        ))}
      </div>

      {WHY_US.assurances?.length > 0 && (
        <Reveal className="relative mx-auto mt-6 max-w-7xl px-5 sm:px-8">
          <ul className="grid gap-3 sm:grid-cols-3">
            {WHY_US.assurances.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 rounded-2xl border px-5 py-4 font-heading text-lg font-bold text-[#F5F0E6]"
                style={{ background: CARD, borderColor: BORDER }}
              >
                <span className="h-2 w-2 flex-none rounded-full bg-[#C6F00C] ring-4 ring-[#C6F00C]/20" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
