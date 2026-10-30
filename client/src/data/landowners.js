// client/src/data/landowners.js
// Landowners page (/landowners) content. SAMPLE wording where marked: replace from the CMS later.
// Photos are existing project pictures used as stand-ins until real ones are supplied.
import { LANDOWNER } from './portfolio';

export const LAND_HERO = {
  eyebrow: 'For landowners',
  line1: 'Your land.',
  line2: 'Our',
  words: ['expertise', 'vision', 'promise'], // the word after "Our" changes every few seconds
  sub: 'Free engineering feasibility reviews and transparent terms, so your plot becomes a home families are proud of.',
  image: '/assets/03_developments/flagships/moon-residence/delivered-facade/delivered.jpg',
};

export const LAND_BIG = {
  title: 'Turn your plot into a landmark',
  highlight: 'landmark',
  cta: 'Request a feasibility study',
};

export const WHY_INTRO = LANDOWNER.intro;

// four promises (wording comes from data/portfolio.js LANDOWNER.cards), each with a photo
const WHY_EXTRA = [
  { line: 'Calculated before it is drawn.', image: '/assets/03_developments/ongoing/form-and-space/progress/piling.jpg' },
  { line: 'Bright, airy homes, never dark boxes.', image: '/assets/03_developments/ongoing/sector-13-road-503/hero/render.webp' },
  { line: 'Certified materials, no compromise.', image: '/assets/03_developments/flagships/moon-residence/delivered-facade/delivered.jpg' },
  { line: 'A schedule we keep.', image: LANDOWNER.photo },
];
export const WHY = LANDOWNER.cards.map((c, i) => ({ key: `why-${i}`, ...c, ...(WHY_EXTRA[i] || {}) }));

// SAMPLE: confirm which deals Space Maker offers.
export const DEALS = [
  {
    key: 'jv',
    title: 'Joint development',
    line: 'You keep a share of the new building.',
    text: 'You bring the land, we design, build and sell. The landowner receives an agreed number of flats under a clear ratio, written into the agreement before work begins.',
  },
  {
    key: 'buy',
    title: 'Outright purchase',
    line: 'A fair price, a clean handover.',
    text: 'If you would rather sell, we assess the plot and make a transparent offer after the legal and technical review. No hidden steps.',
  },
];

// SAMPLE: the development process from the landowner point of view
export const LAND_STEPS = [
  { title: 'Free feasibility review', text: 'Our engineering director studies your plot, soil and access, and tells you what can be built.' },
  { title: 'Document check', text: 'We review ownership papers and approvals with you, openly and early.' },
  { title: 'Design and approvals', text: 'Architects prepare the concept. We handle the submissions to the authorities.' },
  { title: 'Written agreement', text: 'Terms, ratio and timeline are agreed in writing before anything starts.' },
  { title: 'Construction', text: 'Milestone-based building with regular site updates to you.' },
  { title: 'Handover', text: 'You receive your share of the building, complete and ready to use.' },
];

// SAMPLE
export const LAND_FAQS = [
  { q: 'Is the feasibility study really free?', a: 'Yes. Our engineering team reviews your plot at no cost and with no obligation to proceed.' },
  { q: 'What size of plot do you work with?', a: 'We consider residential plots across Dhaka and Jolshiri. Tell us the size and location and we will say honestly whether it suits a project.' },
  { q: 'How are joint development ratios decided?', a: 'The ratio depends on the plot, location and what can be built. We explain how we reach it and put it in writing before you sign.' },
  { q: 'How soon will someone call me?', a: 'Our engineering director calls back directly, usually within one or two working days.' },
  { q: 'What if my plot has more than one owner?', a: 'That is common. We can speak with all owners together and explain the process for everyone.' },
];

export const LAND_OWNERSHIP = ['Single owner', 'Multiple owners', 'Not sure yet'];
