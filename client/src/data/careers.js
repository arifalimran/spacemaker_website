// client/src/data/careers.js
// Careers page content. SAMPLE where marked: replace from the CMS later (every field is plain text/number).
// Photos are existing project pictures used as stand-ins until real team/site photos are available.

export const CAREERS_HERO = {
  eyebrow: 'Careers & Culture',
  title: 'Build homes. Shape your career.',
  mission: 'We build homes families can trust, and a workplace where people are proud to grow.',
  // Header photo. SAMPLE: free Unsplash photo (Siyuan), linked directly for now.
  // Replace with your own file, e.g. '/assets/careers/careers-hero.webp'. If it fails to load, the panel stays matte espresso.
  image: 'https://images.unsplash.com/photo-1577354425215-479a15121ed8?auto=format&fit=crop&w=2000&q=70',
  // The big line under the hero, with a link to the all-openings page. "joinHighlight" gets the soft lime marker.
  joinTitle: 'Discover your place at Space Maker',
  joinHighlight: 'your place',
  joinLink: 'See open roles',
};

// Short intro under the "What we offer" heading. SAMPLE wording: replace from the CMS later.
export const OFFER_INTRO =
  'We look after the people who build our homes. Salary arrives on the date, you learn beside senior engineers and architects, and every site is safe, fair and respectful.';

// the three "What we offer" perks, each with a photo (the old "What we provide" perks)
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
    title: 'Respect and care on site',
    line: 'Safe, fair and looked after, every day.',
    text: 'A positive environment with zero workplace abuse, reasonable hours and full safety gear (PPE) from day one, plus daily lunch allowances and transport support for engineers at our Jolshiri Abashon sites.',
    image: '/assets/03_developments/flagships/moon-residence/delivered-facade/delivered.jpg',
  },
];

// SAMPLE figures: replace with the real ones. "Open roles" is counted from JOBS below.
export const CAREER_STATS = [
  { value: 120, suffix: '+', label: 'People on our team' },
  { value: 12, suffix: '+', label: 'Years in Dhaka' },
  { value: 100, suffix: '', label: 'Apartments delivered' },
];

export const JOBS = [
  { slug: 'senior-structural-project-engineer', team: 'Structure', title: 'Senior Structural Project Engineer', loc: 'Jolshiri Abashon (Sectors 13 & 16)', exp: '4–7 Years', type: 'Full-Time' },
  { slug: 'site-supervisor-civil-foreman', team: 'Site', title: 'Site Supervisor / Civil Foreman', loc: 'Dhaka & Jolshiri Projects', exp: '3+ Years', type: 'Full-Time' },
  { slug: 'junior-architectural-visualizer', team: 'Studio', title: 'Junior Architectural Visualizer', loc: 'Corporate Studio (Mohakhali DOHS)', exp: '1–3 Years', type: 'Full-Time' },
];

// Freelance / part-time card (shown after Open positions). SAMPLE wording: replace with the real terms.
// Photo: free Unsplash photo (Vitaly Gariev) as a stand-in. Replace with your own file, e.g. '/assets/careers/careers-flex.webp'.
export const FLEX = {
  eyebrow: 'Flexible work',
  title: 'Prefer to work your own way?',
  text: 'We also work with freelancers, part-time sales agents and part-time site workers who want flexible hours and a clear way to earn.',
  who: ['Sales agents', 'Freelancers', 'Part-time workers'],
  points: [
    'Choose your own hours',
    'Leads and training from our team',
    'Clear payment terms, agreed upfront',
  ],
  note: 'Terms are agreed in writing before you start.',
  cta: 'Apply now',
  emailSubject: 'Freelance / part-time enquiry',
  image: 'https://images.unsplash.com/photo-1758611975583-fddf609226a0?auto=format&fit=crop&w=1400&q=70',
};

export const FAQS = [
  { q: 'Will my salary be delayed like conventional developers in Dhaka?', a: 'No. Space Maker follows strict corporate discipline. All employee salaries and site allowances are disbursed promptly on schedule every month without exception.' },
  { q: 'Do I need decades of experience to join?', a: 'We prioritize dedication, character, and proactive problem solving over long resumes. If you are eager to learn and take personal pride in clean civil work, we will invest in your training.' },
  { q: 'Is transport provided for site postings in Jolshiri Abashon?', a: 'Yes. Our site engineers and supervisors receive transit allowances and logistical support for commutes to our Jalshiri operations hub.' },
  { q: 'How fast will I hear back after applying?', a: 'Our engineering and HR desk reviews submissions weekly. Shortlisted candidates are invited for an interview and tea at our Mohakhali DOHS office within 5 to 7 business days.' },
];

// how hiring works (SAMPLE wording, from the FAQ)
export const STEPS = [
  { title: 'Apply', text: 'Fill in a short form and upload your CV. It takes about two minutes.' },
  { title: 'We review', text: 'Our engineering and HR desk reviews every submission weekly.' },
  { title: 'Interview and tea', text: 'Shortlisted candidates meet us at our Mohakhali DOHS office within 5 to 7 working days.' },
  { title: 'Offer', text: 'A clear offer, and salary on the date from your first month.' },
];

// Apply form (panel). "general" and "flex" appear in the Position dropdown beside the open roles.
export const APPLY = {
  general: 'General application',
  flex: 'Freelance / part-time agent',
  success: "We've received your application. We'll get back to you within 5 to 7 working days.",
};

export const HR ={ email: 'spacemakerbd@gmail.com', phoneDisplay: '01916-100416' };
