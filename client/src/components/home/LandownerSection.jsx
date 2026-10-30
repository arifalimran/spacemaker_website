// client/src/components/home/LandownerSection.jsx
// "Partner with us" (landowners), now a slim horizontal stripe in the same dark espresso language as the
// Flexible work card. The full story and the contact form live on /landowners.
// Keeps id="land" so the top bar and section dock links still work.
import React from 'react';
import { Link } from 'react-router-dom';
import { LANDOWNER as L } from '../../data/portfolio';
import { Reveal } from '../portfolio/shared';

const SHORT = 'Share your plot. Our engineering director will call you back.';

const pillSand =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-[#D9CBB4] px-6 py-3 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9CBB4] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#D9CBB4] before:transition-transform before:duration-300 hover:text-[#2A1F1A] hover:before:translate-y-0";

export default function LandownerSection() {
  return (
    <section id="land" className="relative px-3 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20" style={{ background: 'linear-gradient(180deg, #F2F5E9 0%, #EBF0DF 55%, #E4EDD6 100%)' }}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-[24px] bg-[#2A1F1A] px-6 py-8 sm:rounded-[32px] sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#D9CBB4]">
                <span className="h-[2px] w-8 bg-[#C6DB3F]" />
                {L.eyebrow}
              </span>
              <h2 className="mt-4 font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-tight text-[#D9CBB4] sm:text-3xl lg:text-4xl">{L.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#BBA992]">{SHORT}</p>
            </div>
            <div className="flex-none">
              <Link to="/landowners" className={pillSand}>
                View landowner page <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
