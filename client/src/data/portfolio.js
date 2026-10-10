// client/src/data/portfolio.js
// ONE source of truth for the portfolio. Later the admin panel fills this same shape.
// Everything marked PLACEHOLDER is sample content: replace it with your real details.

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
  offices: [
    { name: 'Corporate Office', address: 'House 405, Road 29, Mohakhali DOHS, Dhaka' },
    { name: 'Jalshiri Operations', address: 'House 22, Road 505A, Sector 16, Jalshiri Abashon, Dhaka' },
  ],
};

export const GENERAL_MESSAGE =
  'Hello Space Maker, I would like to arrange a private visit to see your residences.';

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
/* PROJECTS. flagship: true -> big featured scene, shown first          */
/* status: 'active' | 'completed'                                       */
/* photos: [{ chapter, src, caption? }]                                 */
/* flats: only AVAILABLE flats. Prices stay private.                    */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    id: 'form-space',
    slug: 'form-and-space',
    ref: 'FS',
    title: 'FORM & SPACE',
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
    // PLACEHOLDER flats: replace with your real available flats
    flats: [
      { id: 'B-4', beds: 4, size: '2,150 sq ft', floor: '7th floor' },
      { id: 'C-2', beds: 3, size: '1,780 sq ft', floor: '4th floor' },
    ],
  },
  {
    id: 'moon-residence',
    slug: 'moon-residence',
    ref: 'MR',
    title: 'Moon Residence',
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
    flats: [],
  },
  {
    id: 'platinum-kusumbag',
    slug: 'platinum-kusumbag',
    ref: 'PK',
    title: 'Platinum Kusumbag',
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
    flats: [{ id: 'A-3', beds: 3, size: '1,650 sq ft', floor: '5th floor' }], // PLACEHOLDER
  },
  {
    id: 'marchent-mahua',
    slug: 'marchent-mahua',
    ref: 'MM',
    title: 'Marchent Mahua',
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
    flats: [],
  },
  {
    id: 'rayer-bazar',
    slug: 'rayer-bazar',
    ref: 'RB',
    title: 'Rayer Bazar Residential',
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
    flats: [],
  },
];

/* Interiors (turnkey rooms). Real specs from your Moulvibazar profile. */
export const interiors = {
  title: 'Interior at Moulvibazar',
  client: 'Laila Group',
  location: 'Sylhet',
  suites: [
    {
      title: 'Grand Living Lounge',
      specs: 'Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider',
      image: U(INT1, 1000),
    },
    {
      title: 'Dining & Breakfast Bar',
      specs: 'Integrated smart appliances, breakfast counter, custom joinery, laundry concealment',
      image: U(INT2, 1000),
    },
    {
      title: 'Executive Master Bedroom',
      specs: 'High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels',
      image: U(INT3, 1000),
    },
    {
      title: 'Spa Ensuite Bathroom',
      specs: 'Frameless walk-in glass shower, gold and brass fittings, circular backlit LED mirror',
      image: U(INT4, 1000),
    },
  ],
};

/* Upcoming launches. PLACEHOLDER areas and months: replace with your three. */
export const upcoming = [
  { id: 'up-1', area: 'Dhanmondi', opening: 'Opening in November', line: 'Details arriving soon.' },
  { id: 'up-2', area: 'Uttara', opening: 'Opening in November', line: 'Details arriving soon.' },
  { id: 'up-3', area: 'Bashundhara', opening: 'Opening in November', line: 'Details arriving soon.' },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const coverOf = (p) =>
  (p.photos.find((x) => x.chapter === 'exterior') || p.photos[0] || {}).src;
