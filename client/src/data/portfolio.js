// client/src/data/portfolio.js
// ONE source of truth for the portfolio. Later the admin panel fills this same shape.
// Everything marked PLACEHOLDER / SAMPLE is sample content: replace it with your real details.
// To add a commercial or hospital building, add a project with  type: 'commercial'  (or 'hospital').

const U = (id, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* demo photo ids (swap for your real uploads) */
const EXT1 = '1600585154340-be6161a56a0c';
const EXT2 = '1545324418-cc1a3fa10c00';
const EXT3 = '1512917774080-9991f1c4c750';
const EXT4 = '1600607687939-ce8a6c25118c';
const INT1 = '1618221195710-dd6b41faaea6';
const INT2 = '1616486338812-3dadae4b4ace';
const INT3 = '1616594039964-ae9021a400a0';
const INT4 = '1584622650111-993a426fbf0a';
const PLAN = '1503387762-592deb58ef4e';
const PLAN2 = '1600585154526-990dced4db0d';
const SITE = '1541888946425-d0fbb18615f7';

export const ESPRESSO = '#2A1F1A';

export const BRAND = {
  icon: '/assets/00_brand/logo-icon.png',
  emblem: '/assets/00_brand/emblem-watermark.svg',
};

export const CONTACT = {
  whatsapp: '8801916100416', // main WhatsApp number (digits only)
  hotlines: [
    { label: 'Head office hotline', display: '+880 1916-100416', tel: '+8801916100416' },
    // PLACEHOLDER: add your second hotline here, for example:
    // { label: 'Hotline 2', display: '+880 1XXX-XXXXXX', tel: '+8801XXXXXXXXX' },
  ],
  email: 'spacemakerbd@gmail.com',
  messenger: 'https://m.me/spacemakerbd',
  whatsappDisplay: '+880 1916-100416', // optional: how the WhatsApp number is printed
  tagline: 'where space defines luxury', // optional: short line under the footer logo
  footerLine: 'Homes and buildings in Dhaka, designed for light, air and calm everyday life.', // optional DRAFT copy
  // optional social links. PLACEHOLDER: paste the real page URLs; empty ones show as greyed placeholders.
  social: [
    { key: 'facebook', label: 'Facebook', href: '' },
    { key: 'instagram', label: 'Instagram', href: '' },
    { key: 'linkedin', label: 'LinkedIn', href: '' },
    { key: 'youtube', label: 'YouTube', href: '' },
  ],
  offices: [
    { name: 'Corporate Office', address: 'House 405, Road 29, Mohakhali DOHS, Dhaka' },
    { name: 'Jalshiri Operations', address: 'House 22, Road 505A, Sector 16, Jalshiri Abashon, Dhaka' },
  ],
};

export const GENERAL_MESSAGE =
  'Hello Space Maker, I would like to arrange a private visit to see your projects.';

export const ARCHITECT = {
  name: 'Hasib Uddin Ahmed',
  role: 'Principal Architect',
  // save his photo here: client/public/assets/people/hasib-uddin-ahmed.jpg
  photo: '/assets/people/hasib-uddin-ahmed.jpg',
  // DRAFT line for his approval. Each project can override it with `architectLine`.
  line: 'I start with where the sun falls and where the breeze enters. The building follows.',
};

export const STATUS_LABEL = {
  active: 'Under construction',
  completed: 'Handed over',
  upcoming: 'Opening soon',
};

/* Tags. Change a project's `type` and every label on the site follows. */
export const TYPE_LABEL = {
  residential: 'Residential',
  commercial: 'Commercial',
  hospital: 'Hospital',
};

/* photo chapters shown on a project page, in this order */
export const CHAPTER_ORDER = ['exterior', 'rooftop', 'interior', 'balcony', 'views', 'plan'];
export const CHAPTERS = {
  exterior: { label: 'Exterior', title: 'Where it meets the street and the sky.' },
  rooftop: { label: 'Rooftop', title: 'A place above the city to unwind.' },
  interior: { label: 'Interior', title: 'Rooms that hold light and quiet.' },
  balcony: { label: 'Balcony & terrace', title: 'Morning tea, evening air.' },
  views: { label: 'Views & surroundings', title: 'What you see, and what is close by.' },
  plan: { label: 'Floor plans', title: 'Every square foot, thoughtfully drawn.' },
};

/* ------------------------------------------------------------------ */
/* PROJECTS. flagship: true -> signature scene, shown first             */
/* type: 'residential' | 'commercial' | 'hospital'                      */
/* status: 'active' | 'completed'                                       */
/* photos: [{ chapter, src, caption? }]                                 */
/* units: only AVAILABLE units. Prices stay private.                    */
/*   { id, label ('4 bed' / 'Office floor'), size, floor }              */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    id: 'form-space',
    slug: 'form-and-space',
    ref: 'FS',
    title: 'FORM & SPACE',
    type: 'residential',
    flagship: true,
    status: 'active',
    area: 'Jolshiri Abashon',
    address: 'Plot 13A-501-025, Sector 13, Jolshiri Abashon, Dhaka',
    floors: 'G+M+8',
    started: 'March 2026', // PLACEHOLDER: replace with the real start month and year
    line: 'Morning light across the living room, and a rooftop made for evenings.',
    notes: {
      views: 'Open sky on both sides, with Jolshiri Abashon’s calm streets just below.',
    },
    photos: [
      { chapter: 'exterior', src: U(EXT1), caption: 'Street elevation' },
      { chapter: 'exterior', src: U(EXT3, 1200), caption: 'Entrance' },
      { chapter: 'exterior', src: U(EXT2, 1200), caption: 'Evening facade' },
      { chapter: 'rooftop', src: U(EXT4), caption: 'Rooftop community terrace' },
      { chapter: 'interior', src: U(INT1, 1200), caption: 'Living lounge' },
      { chapter: 'interior', src: U(INT2, 1200), caption: 'Dining and kitchen' },
      { chapter: 'interior', src: U(INT3, 1200), caption: 'Master bedroom' },
      { chapter: 'interior', src: U(INT4, 1200), caption: 'Spa bathroom' },
      { chapter: 'balcony', src: U(EXT2, 1200), caption: 'Living room balcony' },
      { chapter: 'balcony', src: U(INT1, 1200), caption: 'Master terrace' },
      { chapter: 'views', src: U(EXT3, 1200), caption: 'Street side view' },
      { chapter: 'views', src: U(EXT1, 1200), caption: 'Open sky to the east' },
      { chapter: 'plan', src: U(PLAN), caption: 'Type B · 4 bed' },
      { chapter: 'plan', src: U(PLAN2), caption: 'Type C · 3 bed' },
    ],
    // PLACEHOLDER units: replace with your real available units
    units: [
      { id: 'B-4', label: '4 bed', size: '2,150 sq ft', floor: '7th floor' },
      { id: 'C-2', label: '3 bed', size: '1,780 sq ft', floor: '4th floor' },
    ],
  },
  {
    id: 'moon-residence',
    slug: 'moon-residence',
    ref: 'MR',
    title: 'Moon Residence',
    type: 'residential',
    flagship: true,
    status: 'completed',
    area: 'Dinajpur Central',
    address: '8 Katha, Dinajpur Central',
    floors: '10-storied, mixed use',
    started: null,
    line: 'Finished, handed over, and already lived in.',
    photos: [
      { chapter: 'exterior', src: U(EXT3), caption: 'Facade' },
      { chapter: 'exterior', src: U(EXT2, 1200), caption: 'Commercial atrium' },
      { chapter: 'interior', src: U(INT1, 1200), caption: 'Living lounge' },
      { chapter: 'interior', src: U(INT3, 1200), caption: 'Bedroom' },
      { chapter: 'plan', src: U(PLAN), caption: 'Typical floor' },
    ],
    units: [],
  },
  {
    id: 'platinum-kusumbag',
    slug: 'platinum-kusumbag',
    ref: 'PK',
    title: 'Platinum Kusumbag',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Sabujbag',
    address: '10 Katha, Sabujbag, Dhaka',
    floors: '10-storied',
    started: 'January 2026', // PLACEHOLDER
    line: 'Ten floors of calm, tucked into Sabujbag.',
    photos: [
      { chapter: 'exterior', src: U(EXT2), caption: 'Facade' },
      { chapter: 'exterior', src: U(EXT1, 1200), caption: 'Approach' },
      { chapter: 'interior', src: U(INT2, 1200), caption: 'Dining' },
      { chapter: 'interior', src: U(INT3, 1200), caption: 'Bedroom' },
      { chapter: 'plan', src: U(PLAN2), caption: 'Typical floor' },
    ],
    units: [{ id: 'A-3', label: '3 bed', size: '1,650 sq ft', floor: '5th floor' }], // PLACEHOLDER
  },
  {
    id: 'marchent-mahua',
    slug: 'marchent-mahua',
    ref: 'MM',
    title: 'Marchent Mahua',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Jolshiri, Sector 16',
    address: '5 Katha, Sector 16, Jolshiri Abashon, Dhaka',
    floors: '9-storied',
    started: 'May 2026', // PLACEHOLDER
    line: 'A quiet tower in the green of Jolshiri.',
    photos: [
      { chapter: 'exterior', src: U(EXT4), caption: 'Facade' },
      { chapter: 'interior', src: U(INT1, 1200), caption: 'Living lounge' },
      { chapter: 'plan', src: U(PLAN), caption: 'Typical floor' },
    ],
    units: [],
  },
  {
    id: 'rayer-bazar',
    slug: 'rayer-bazar',
    ref: 'RB',
    title: 'Rayer Bazar Residential',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Rayer Bazar',
    address: 'Rayer Bazar, Dhaka',
    floors: 'G+13',
    started: 'July 2026', // PLACEHOLDER
    line: 'A boutique address at the edge of Dhanmondi.',
    photos: [
      { chapter: 'exterior', src: U(EXT1), caption: 'Facade' },
      { chapter: 'interior', src: U(INT4, 1200), caption: 'Bathroom' },
      { chapter: 'plan', src: U(PLAN2), caption: 'Typical floor' },
    ],
    units: [],
  },
  {
    // SAMPLE: shows how a commercial building appears. Edit or delete it.
    id: 'commercial-sample',
    slug: 'commercial-tower',
    ref: 'CT',
    title: 'Commercial Tower (sample)',
    type: 'commercial',
    flagship: false,
    status: 'active',
    area: 'Dhaka',
    address: 'Location to be added',
    floors: 'G+12',
    started: 'August 2026', // SAMPLE
    line: 'A workplace designed around light, flow and a good first impression.',
    photos: [
      { chapter: 'exterior', src: U(EXT2), caption: 'Facade' },
      { chapter: 'interior', src: U(INT2, 1200), caption: 'Reception' },
      { chapter: 'plan', src: U(PLAN), caption: 'Typical office floor' },
    ],
    units: [{ id: 'F-6', label: 'Office floor', size: '3,200 sq ft', floor: '6th floor' }], // SAMPLE
  },
];

/* ------------------------------------------------------------------ */
/* INTERIOR PROJECTS. type: 'residential' | 'commercial'                */
/* Each has rooms (photo + specs) and a materials palette.              */
/* ------------------------------------------------------------------ */
export const interiorProjects = [
  {
    id: 'in-moulvibazar',
    slug: 'moulvibazar-interior',
    ref: 'IN-MV',
    title: 'Interior at Moulvibazar',
    type: 'residential',
    client: 'Laila Group',
    location: 'Moulvibazar, Sylhet',
    area: null, // PLACEHOLDER: e.g. '3,400 sq ft'
    line: 'Warm walnut, brushed brass, and light that moves through the day.',
    brief:
      'A turnkey interior for a family home. Every room was designed, joined and finished by our own team, from the cove lighting to the last brass fitting.',
    materials: [
      { name: 'Figured walnut', hex: '#5B3A29' },
      { name: 'Brushed brass', hex: '#B08D57' },
      { name: 'Chevron oak', hex: '#B88B5A' },
      { name: 'Fluted timber', hex: '#8A6A4B' },
      { name: 'Warm white', hex: '#F1ECE2' },
    ],
    rooms: [
      {
        title: 'Grand Living Lounge',
        specs: 'Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider',
        image: U(INT1, 1400),
      },
      {
        title: 'Dining & Breakfast Bar',
        specs: 'Integrated smart appliances, breakfast counter, custom joinery, laundry concealment',
        image: U(INT2, 1400),
      },
      {
        title: 'Executive Master Bedroom',
        specs: 'High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels',
        image: U(INT3, 1400),
      },
      {
        title: 'Spa Ensuite Bathroom',
        specs: 'Frameless walk-in glass shower, gold and brass fittings, circular backlit LED mirror',
        image: U(INT4, 1400),
      },
    ],
  },
  {
    // SAMPLE: replace with your real hospital interior
    id: 'in-hospital',
    slug: 'hospital-interior',
    ref: 'IN-HS',
    title: 'Hospital Interior (sample)',
    type: 'commercial',
    client: 'To be added',
    location: 'To be added',
    area: null,
    line: 'Calm, clean and easy to find your way, for patients and for the people who care for them.',
    brief:
      'Sample text. A commercial interior for a hospital: reception, patient rooms and corridors planned for calm, hygiene and clear wayfinding.',
    materials: [
      { name: 'Warm white', hex: '#F1ECE2' },
      { name: 'Soft sage', hex: '#B9CDB5' },
      { name: 'Light oak', hex: '#C9A576' },
      { name: 'Brushed steel', hex: '#A9ADB1' },
    ],
    rooms: [
      { title: 'Reception & Lobby', specs: 'Specifications to be added', image: U(INT2, 1400) },
      { title: 'Patient Room', specs: 'Specifications to be added', image: U(INT3, 1400) },
      { title: 'Corridor & Waiting', specs: 'Specifications to be added', image: U(INT1, 1400) },
    ],
  },
  {
    // SAMPLE: replace with your second residential interior
    id: 'in-residential-2',
    slug: 'residential-interior-two',
    ref: 'IN-R2',
    title: 'Residential Interior (sample)',
    type: 'residential',
    client: 'To be added',
    location: 'Dhaka',
    area: null,
    line: 'A home finished the way its family actually lives.',
    brief:
      'Sample text. A second residential interior, finished room by room with the same joinery and detailing standards.',
    materials: [
      { name: 'Walnut veneer', hex: '#5B3A29' },
      { name: 'Natural stone', hex: '#CFC6B8' },
      { name: 'Antique brass', hex: '#9C7A45' },
    ],
    rooms: [
      { title: 'Living & Dining', specs: 'Specifications to be added', image: U(INT1, 1400) },
      { title: 'Master Suite', specs: 'Specifications to be added', image: U(INT3, 1400) },
      { title: 'Kitchen', specs: 'Specifications to be added', image: U(INT2, 1400) },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* UPCOMING. Only the fields you fill in are shown.                     */
/* Share details only after signing and floor plans are done: until     */
/* then leave just `area` and `opening`.                                */
/* ------------------------------------------------------------------ */
export const upcoming = [
  {
    id: 'up-1',
    type: 'residential',
    area: 'Dhanmondi', // PLACEHOLDER area
    opening: 'Opening in November',
    line: 'A south-facing address, drawn for light.',
    image: U(EXT4, 1200),
    land: '17 katha',
    facing: 'South facing',
    floors: 'G+11',
    status: 'Submitted to RAJUK for approval', // or 'Design phase'
    resume: 'To be announced', // expected construction start
    units: ['A · 2,000 sq ft', 'B · 1,600 sq ft', 'C · 1,350 sq ft'],
    facilities: ['Guard room', 'Parking', 'Rooftop gym', 'Rooftop swimming pool'],
  },
  { id: 'up-2', type: 'residential', area: 'Uttara', opening: 'Opening in November', line: 'Details arriving soon.' },
  { id: 'up-3', type: 'residential', area: 'Bashundhara', opening: 'Opening in November', line: 'Details arriving soon.' },
];

/* ------------------------------------------------------------------ */
/* WHY US (for buyers)                                                  */
/* ------------------------------------------------------------------ */
export const WHY_US = {
  eyebrow: 'Why choose us',
  title: 'Three things you can see, feel and count on.',
  scenes: [
    {
      key: 'design',
      title: 'Aesthetic design',
      line: 'Light first, then everything else.',
      text: 'Every apartment gets natural cross-ventilation, broad balconies and direct morning sunlight. We never build dark boxes.',
      image: U(EXT1, 1400),
      treatment: 'arch',
    },
    {
      key: 'materials',
      title: 'Quality materials',
      line: 'What you cannot see matters most.',
      text: 'The structure behind the walls is built from materials we test and trust, with no compromise.',
      points: ['Certified 72.5 grade rebar', 'High-strength stone chips', 'Trusted cement brands'],
      image: U(INT3, 1400),
      treatment: 'frame', // cheap treatment on the espresso section (no CSS filters)
    },
    {
      key: 'ontime',
      title: 'On-time delivery',
      line: 'A promise we track floor by floor.',
      text: 'Milestone tracking from foundation to finishing, with a disciplined timeline that prevents unnecessary delays.',
      milestones: ['Foundation', 'Structure', 'Brickwork', 'Finishing', 'Inspection', 'Handover'],
      image: U(EXT4, 1400),
      treatment: 'blur',
    },
  ],
  assurances: ['Documented approvals', 'Earthquake-engineered structure', 'Our own site engineers'],
};

/* ------------------------------------------------------------------ */
/* LANDOWNERS: "Partner with us" merged with "Why landowners choose"    */
/* ------------------------------------------------------------------ */
export const LANDOWNER = {
  eyebrow: 'Partner with us',
  title: "Let's Discuss Your Land Over Coffee.",
  intro:
    'Whether you own a residential plot in Jolshiri, Dhanmondi, or elsewhere in Bangladesh, we offer free engineering feasibility reviews and transparent joint-venture ratios.',
  whyTitle: 'Why Landowners Choose Space Maker',
  slogan: 'Four promises we keep on every plot.',
  // Put a warm drawing-room / coffee photo here (or your own meeting room):
  photo: '/assets/05_partner_with_us/coffee-lounge.jpg',
  cards: [
    {
      title: 'Engineering First',
      text: 'We analyze soil load and structural physics before drawing plans. Your building is calculated to resist earthquakes and high winds.',
    },
    {
      title: 'Maximum Light & Air',
      text: 'We do not create dark boxes. Every apartment gets natural cross-ventilation, broad balconies, and direct morning sunlight.',
    },
    {
      title: 'Top-Tier Materials',
      text: 'We strictly use certified 72.5 grade rebar, high-strength stone chips, and trusted cement brands without compromise.',
    },
    {
      title: 'On-Time Handover',
      text: 'We honor construction schedules. Our disciplined milestone timeline prevents unnecessary delays.',
    },
  ],
  hotline: { label: 'Direct Landowner Hotline', display: '+880 1916–100416 (Direct Call or WhatsApp)', tel: '+8801916100416' },
  emailLabel: 'Consultation Email',
};

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getInterior = (slug) => interiorProjects.find((p) => p.slug === slug);
export const coverOf = (p) =>
  (p.photos.find((x) => x.chapter === 'exterior') || p.photos[0] || {}).src;
export const interiorCover = (p) => (p.rooms[0] || {}).image;
