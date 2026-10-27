// client/src/data/portfolio.js
// ONE source of truth for the portfolio. Later the admin panel fills this same shape.
// Everything marked PLACEHOLDER / SAMPLE is sample content: replace it with your real details.
// To add a commercial or hospital building, add a project with  type: 'commercial'  (or 'hospital').

const DEV = (p) => `/assets/03_developments/${p}.webp`;
const INT = (p) => `/assets/04_interiors/${p}.webp`;
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
  // DRAFT. Three short points shown under the quote. A project can override with `architectPoints`.
  points: [
    { k: 'Light and air', v: 'Every living room is planned around the sun and the cross-breeze.' },
    { k: 'Structure and safety', v: 'Designed by our own engineers for the soil and seismic conditions of Bangladesh.' },
    { k: 'Materials', v: 'Lab-tested concrete and rebar, inspected at every stage.' },
  ],
};

export const STATUS_LABEL = {
  active: 'Under construction',
  completed: 'Handed over',
  upcoming: 'Opening soon',
  proposed: 'Proposed',
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
  architect: { label: 'Architect', title: 'Designed by the people who build it.' },
  enquire: { label: 'Enquire', title: 'Ask about this home.' },
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
    address: 'Plot 13A-501-025, Sector 13, Jolshiri Abashon, Rupgonj, Narayanganj',
    client: 'Maj Akhtaruzzaman & Maj Abdus Salam',
    architect: 'Hasib Uddin Ahmed',
    floors: 'G+M+8',
    started: 'March 2026', // PLACEHOLDER: replace with the real start month and year
    line: 'Nine storeys of light, designed for calm everyday living.',
    notes: {
      views: 'Open sky on both sides, with Jolshiri Abashon’s calm streets just below.',
    },
    photos: [
      { chapter: 'exterior', src: DEV('ongoing/form-and-space/hero/render'), caption: 'Street elevation' },
      { chapter: 'exterior', src: DEV('ongoing/form-and-space/exterior/render-2'), caption: 'Aerial view' },
      { chapter: 'exterior', src: DEV('ongoing/form-and-space/exterior/render-3'), caption: 'Facade' },
      { chapter: 'plan', src: DEV('ongoing/form-and-space/blueprint/layout'), caption: 'Typical floor plan' },
    ],
    units: [],
  },
  {
    id: 'moon-residence',
    slug: 'moon-residence',
    ref: 'MR',
    title: 'Moon Residence',
    type: 'residential',
    flagship: true,
    status: 'completed',
    area: 'Dinajpur',
    address: '8 Katha, Dinajpur',
    client: 'Moon Jwelers',
    architect: 'Hasib Uddin Ahmed',
    floors: '10-storied, mixed use',
    started: null,
    line: 'Finished, handed over, and already lived in.',
    photos: [
      { chapter: 'exterior', src: DEV('flagships/moon-residence/hero/facade'), caption: 'Facade' },
      { chapter: 'exterior', src: DEV('flagships/moon-residence/exterior/render-2'), caption: 'Corner view' },
      { chapter: 'exterior', src: DEV('flagships/moon-residence/exterior/render-3'), caption: 'Commercial floors at dusk' },
      { chapter: 'exterior', src: DEV('flagships/moon-residence/exterior/render-4'), caption: 'Street front' },
      { chapter: 'exterior', src: DEV('flagships/moon-residence/exterior/render-5'), caption: 'Terrace and entrance' },
      { chapter: 'plan', src: DEV('flagships/moon-residence/blueprint/layout'), caption: 'Typical floor plan' },
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
    area: 'Kusumbag, Sabujbag',
    address: '10 Katha, Kusumbag, Sabujbag, Dhaka',
    architect: 'Hasib Uddin Ahmed',
    floors: '10-storied',
    started: 'January 2026', // PLACEHOLDER
    line: 'Ten floors of calm, tucked into Sabujbag.',
    photos: [
      { chapter: 'exterior', src: DEV('ongoing/platinum-kusumbag/hero/render'), caption: 'Facade' },
      { chapter: 'plan', src: DEV('ongoing/platinum-kusumbag/blueprint/layout'), caption: 'Site plan' },
    ],
    units: [],
  },
  {
    id: 'marchent-mahua',
    slug: 'marchent-mahua',
    ref: 'MM',
    title: 'Marchent Mahua',
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Jolshiri Abashon',
    address: '5 Katha, Jolshiri Abashon, Dhaka',
    architect: 'Hasib Uddin Ahmed',
    floors: '9-storied',
    started: 'May 2026', // PLACEHOLDER
    line: 'A quiet tower in the green of Jolshiri.',
    photos: [
      { chapter: 'exterior', src: DEV('ongoing/marchent-mahua/hero/render'), caption: 'Facade' },
      { chapter: 'exterior', src: DEV('ongoing/marchent-mahua/exterior/render-2'), caption: 'Garden facade' },
      { chapter: 'exterior', src: DEV('ongoing/marchent-mahua/exterior/render-3'), caption: 'Day view' },
      { chapter: 'plan', src: DEV('ongoing/marchent-mahua/blueprint/layout'), caption: '3 bed floor plan' },
    ],
    units: [],
  },
  {
    id: 'sector-13-residence',
    slug: 'sector-13-residence',
    ref: 'S13',
    title: 'Sector 13 Residence', // PLACEHOLDER name: the profile lists this project without a title
    type: 'residential',
    flagship: false,
    status: 'active',
    area: 'Jolshiri Abashon',
    address: 'Sector 13, Road 503, Plot 012, Jolshiri Abashon, Rupgonj, Narayanganj',
    architect: 'Hasib Uddin Ahmed',
    floors: 'G+M+8',
    started: null,
    line: 'Planted balconies and open sky, nine storeys up.',
    photos: [
      { chapter: 'exterior', src: DEV('ongoing/sector-13-road-503/hero/render'), caption: 'Aerial view' },
      { chapter: 'exterior', src: DEV('ongoing/sector-13-road-503/exterior/render-2'), caption: 'Street elevation' },
      { chapter: 'exterior', src: DEV('ongoing/sector-13-road-503/exterior/render-3'), caption: 'Dusk view' },
      { chapter: 'exterior', src: DEV('ongoing/sector-13-road-503/exterior/render-4'), caption: 'Facade detail' },
      { chapter: 'plan', src: DEV('ongoing/sector-13-road-503/blueprint/layout'), caption: 'Typical floor plan' },
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
    address: 'Rayer Bazar, Dhanmondi, Dhaka',
    architect: 'Hasib Uddin Ahmed',
    floors: 'G+13',
    started: 'July 2026', // PLACEHOLDER
    line: 'A boutique address at the edge of Dhanmondi.',
    photos: [
      { chapter: 'exterior', src: DEV('ongoing/rayer-bazar/hero/render'), caption: 'Facade' },
      { chapter: 'exterior', src: DEV('ongoing/rayer-bazar/exterior/render-2'), caption: 'Tower in context' },
    ],
    units: [],
  },
  {
    id: 'dg-niport-bhaban',
    slug: 'dg-niport-bhaban',
    ref: 'NP',
    title: 'DG NIPORT Bhaban',
    type: 'commercial',
    flagship: false,
    status: 'active',
    area: 'Azimpur',
    address: '2.05 Bigha, Azimpur, Dhaka',
    client: 'National Institute of Population Research and Training',
    architect: 'Hasib Uddin Ahmed (associate architect)',
    floors: '10-storied, commercial',
    started: null,
    line: 'A ten-storey institutional building with a planted, glazed facade.',
    photos: [
      { chapter: 'exterior', src: DEV('architectural/dg-niport-bhaban/hero/facade'), caption: 'Entrance facade' },
      { chapter: 'exterior', src: DEV('architectural/dg-niport-bhaban/exterior/render-2'), caption: 'Facade detail' },
      { chapter: 'exterior', src: DEV('architectural/dg-niport-bhaban/exterior/render-3'), caption: 'Glazed elevation' },
      { chapter: 'plan', src: DEV('architectural/dg-niport-bhaban/blueprint/siteplan'), caption: 'Site plan' },
    ],
    units: [],
  },
  {
    id: 'hotel-chittagong',
    slug: 'hotel-chittagong',
    ref: 'HC',
    title: 'Proposed Hotel at Chittagong',
    type: 'commercial',
    flagship: false,
    status: 'proposed',
    area: 'Chittagong',
    address: 'Chittagong',
    client: 'Bangladesh Porjoton',
    architect: 'Hasib Uddin Ahmed',
    floors: '6-storied hotel',
    started: null,
    line: 'A six-storey hotel with a landscaped pool deck and open terraces.',
    photos: [
      { chapter: 'exterior', src: DEV('architectural/hotel-chittagong/hero/exterior'), caption: 'Dusk view' },
      { chapter: 'exterior', src: DEV('architectural/hotel-chittagong/exterior/render-2'), caption: 'Entrance plaza' },
      { chapter: 'exterior', src: DEV('architectural/hotel-chittagong/exterior/render-3'), caption: 'Facade' },
      { chapter: 'plan', src: DEV('architectural/hotel-chittagong/blueprint/layout'), caption: 'Site plan' },
    ],
    units: [],
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
    architect: 'Hasib Uddin Ahmed',
    area: null,
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
      { title: 'Grand Living Lounge', specs: 'Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider', image: INT('moulvibazar-villa/room-1') },
      { title: 'Bedroom', specs: 'Soft cove lighting, built-in wardrobe, work desk and balcony light', image: INT('moulvibazar-villa/room-2') },
      { title: 'Executive Master Bedroom', specs: 'High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels', image: INT('moulvibazar-villa/room-3') },
      { title: 'Kitchen', specs: 'Custom joinery in warm white, tiled backsplash, integrated appliances', image: INT('moulvibazar-villa/room-4') },
      { title: 'Living & Dining', specs: 'Fluted timber divider, ring pendant lighting, open plan flow', image: INT('moulvibazar-villa/room-5') },
      { title: 'Ensuite Bathroom', specs: 'Frameless walk-in glass shower, brass fittings, circular backlit LED mirror', image: INT('moulvibazar-villa/room-6') },
      { title: 'Spa Bathroom', specs: 'Patterned feature tiles, floating vanity, backlit niche shelving', image: INT('moulvibazar-villa/room-7') },
    ],
  },
  {
    id: 'in-rupayan',
    slug: 'rupayan-housing-interior',
    ref: 'IN-RU',
    title: 'Interior at Rupayan Housing',
    type: 'residential',
    client: 'Robi’s CEO',
    location: 'Uttara, Dhaka',
    architect: 'Hasib Uddin Ahmed',
    area: null,
    line: 'A home finished in warm, calm tones, room by room.',
    brief: 'A full residential interior at Rupayan Housing, Uttara, designed and finished by our team.',
    materials: [
      { name: 'Warm white', hex: '#F1ECE2' },
      { name: 'Figured walnut', hex: '#5B3A29' },
      { name: 'Brushed brass', hex: '#B08D57' },
    ],
    rooms: [
      { title: 'Master Bedroom', specs: 'Tufted headboard, warm cove lighting, built-in shelving', image: INT('rupayan-uttara/room-1') },
      { title: 'Dining & Kitchen', specs: 'Feature pendant lighting, tall cabinetry, open dining', image: INT('rupayan-uttara/room-2') },
      { title: 'Living Lounge', specs: 'Feature wall, layered lighting, panoramic outlook', image: INT('rupayan-uttara/room-3') },
      { title: 'Sitting Room', specs: 'Compact lounge with display joinery', image: INT('rupayan-uttara/room-4') },
    ],
  },
  {
    id: 'in-sirajgonj',
    slug: 'sirajgonj-interior',
    ref: 'IN-SJ',
    title: 'Interior at Sirajgonj',
    type: 'residential',
    client: 'Mr. Naim',
    location: 'Sirajgonj',
    architect: 'Hasib Uddin Ahmed',
    area: null,
    line: 'Timber, stone and soft light, built around a family.',
    brief: 'A residence in Sirajgonj with joinery, lighting and finishes designed together.',
    materials: [
      { name: 'Walnut veneer', hex: '#5B3A29' },
      { name: 'Natural stone', hex: '#CFC6B8' },
      { name: 'Warm white', hex: '#F1ECE2' },
    ],
    rooms: [
      { title: 'Living Room', specs: 'Timber TV wall, tray ceiling with cove lighting', image: INT('sirajgonj-residence/room-1') },
      { title: 'Living & Dining', specs: 'Open plan with feature art wall', image: INT('sirajgonj-residence/room-2') },
      { title: 'Master Bedroom', specs: 'Upholstered feature wall, wardrobe wall, ceiling fan and cove lighting', image: INT('sirajgonj-residence/room-3') },
      { title: 'Bedroom', specs: 'Panelled headboard wall, balcony view', image: INT('sirajgonj-residence/room-4') },
      { title: 'Kitchen', specs: 'Walnut cabinetry, dark stone counter, glass-front uppers', image: INT('sirajgonj-residence/room-5') },
    ],
  },
  {
    id: 'in-bosilla',
    slug: 'bosilla-interior',
    ref: 'IN-BS',
    title: 'Interior at Bosilla',
    type: 'residential',
    client: 'Mr. Kashem',
    location: 'Bosilla',
    architect: 'Hasib Uddin Ahmed',
    area: null,
    line: 'Bright rooms with warm timber and well-planned storage.',
    brief: 'A home in Bosilla, finished with built-in joinery and layered lighting.',
    materials: [
      { name: 'Warm white', hex: '#F1ECE2' },
      { name: 'Walnut veneer', hex: '#5B3A29' },
      { name: 'Soft grey', hex: '#B9B4AA' },
    ],
    rooms: [
      { title: 'Master Bedroom', specs: 'Panoramic feature wall and upholstered bed', image: INT('bosilla-residence/room-1') },
      { title: 'Study Bedroom', specs: 'Built-in desk, shelving and garden view', image: INT('bosilla-residence/room-2') },
      { title: 'Kitchen & Utility', specs: 'Concealed laundry, custom joinery, dining nook', image: INT('bosilla-residence/room-3') },
      { title: 'Living Lounge', specs: 'Timber media wall, statement lighting', image: INT('bosilla-residence/room-4') },
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
  // proof band under the heading. Edit the numbers here; the count-up and layout follow. (A fourth, live count of projects under construction is added by the page.)
  proof: [
    { value: 100, label: 'Apartments delivered' },
    { value: 150000, label: 'Sq ft built' },
    { value: 12, suffix: '+', label: 'Years in Dhaka' },
  ],
  scenes: [
    {
      key: 'design',
      title: 'Aesthetic design',
      line: 'Light first, then everything else.',
      text: 'Every apartment gets natural cross-ventilation, broad balconies and direct morning sunlight. We never build dark boxes.',
      points: ['Cross-ventilation in every apartment', 'Direct morning sunlight', 'Broad balconies'],
      image: U(EXT1, 1400),
      treatment: 'arch',
    },
    {
      key: 'materials',
      title: 'Quality materials',
      line: 'What you cannot see matters most.',
      text: 'The structure behind the walls is built from materials we test and trust, with no compromise.',
      points: ['Certified 72.5 grade rebar', 'High-strength stone chips', 'Trusted cement brands'],
      specs: [['Rebar', 'Certified 72.5 grade'], ['Stone chips', 'High-strength'], ['Cement', 'Trusted brands']],
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
