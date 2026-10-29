// client/src/data/careers.js
// Careers page content. SAMPLE where marked: replace from the CMS later (every field is plain text/number).
// Photos are existing project pictures used as stand-ins until real team/site photos are available.

export const CAREERS_HERO = {
  eyebrow: 'Careers & Culture',
  title: 'Build homes. Shape your career.',
  mission: 'We build homes families can trust, and a workplace where people are proud to grow.',
  image: '/assets/01_hero/hero-main-2000.webp',
  cvMessage: 'Hello Space Maker HR, I would like to submit my CV.',
};

// the four pinned-photo chapters (the old "What we provide" perks)
export const CHAPTERS = [
  {
    key: 'pay',
    label: 'On-time pay',
    title: 'Guaranteed on-time pay',
    line: 'Salary on the date, every single month.',
    text: 'No delayed wages. Salaries and festival bonuses are deposited on schedule, every month, without exception.',
    image: '/assets/03_developments/ongoing/sector-13-road-503/hero/render.webp',
  },
  {
    key: 'training',
    label: 'Field training',
    title: 'Hands-on field training',
    line: 'Learn beside the people who know.',
    text: 'Direct mentorship under veteran BUET structural leads and principal architects, from rebar testing to piling.',
    image: '/assets/03_developments/ongoing/form-and-space/progress/piling.jpg',
  },
  {
    key: 'culture',
    label: 'Site culture',
    title: 'A dignified site culture',
    line: 'Respect, on every site.',
    text: 'A positive environment with zero workplace abuse, reasonable hours, and full safety gear (PPE) from day one.',
    image: '/assets/03_developments/flagships/moon-residence/delivered-facade/delivered.jpg',
  },
  {
    key: 'transport',
    label: 'Transport and lunch',
    title: 'Transport and site lunch',
    line: 'We look after the journey too.',
    text: 'Daily lunch allowances and transport support for engineers posted at our Jolshiri Abashon sites.',
    image: '/assets/01_hero/hero-rayerbazar-1600.webp',
  },
];

// SAMPLE figures: replace with the real ones. "Open roles" is counted from JOBS below.
export const CAREER_STATS = [
  { value: 120, suffix: '+', label: 'People on our team' },
  { value: 12, suffix: '+', label: 'Years in Dhaka' },
  { value: 100, suffix: '', label: 'Apartments delivered' },
];

export const JOBS = [
  { title: 'Senior Structural Project Engineer', loc: 'Jolshiri Abashon (Sectors 13 & 16)', exp: '4–7 Years', type: 'Full-Time' },
  { title: 'Site Supervisor / Civil Foreman', loc: 'Dhaka & Jolshiri Projects', exp: '3+ Years', type: 'Full-Time' },
  { title: 'Junior Architectural Visualizer', loc: 'Corporate Studio (Mohakhali DOHS)', exp: '1–3 Years', type: 'Full-Time' },
];

export const FAQS = [
  { q: 'Will my salary be delayed like conventional developers in Dhaka?', a: 'No. Space Maker follows strict corporate discipline. All employee salaries and site allowances are disbursed promptly on schedule every month without exception.' },
  { q: 'Do I need decades of experience to join?', a: 'We prioritize dedication, character, and proactive problem solving over long resumes. If you are eager to learn and take personal pride in clean civil work, we will invest in your training.' },
  { q: 'Is transport provided for site postings in Jolshiri Abashon?', a: 'Yes. Our site engineers and supervisors receive transit allowances and logistical support for commutes to our Jalshiri operations hub.' },
  { q: 'How fast will I hear back after applying?', a: 'Our engineering and HR desk reviews submissions weekly. Shortlisted candidates are invited for an interview and tea at our Mohakhali DOHS office within 5 to 7 business days.' },
];

// how hiring works (SAMPLE wording, from the FAQ)
export const STEPS = [
  { title: 'Apply', text: 'Send your CV on WhatsApp or by email. No form to fill.' },
  { title: 'We review', text: 'Our engineering and HR desk reviews every submission weekly.' },
  { title: 'Interview and tea', text: 'Shortlisted candidates meet us at our Mohakhali DOHS office within 5 to 7 working days.' },
  { title: 'Offer', text: 'A clear offer, and salary on the date from your first month.' },
];

export const HR = { email: 'spacemakerbd@gmail.com', phoneDisplay: '01916-100416' };
