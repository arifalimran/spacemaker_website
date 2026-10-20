// client/src/data/siteContent.js
// All words live here. Components only render them.

export const brand = {
  name: "SPACE MAKER",
  tagline: "where space defines luxury",
  phone: "+880 1916-100416",
  whatsappNumber: "8801916100416",
  email: "spacemakerbd@gmail.com",
  messengerUrl: "https://m.me/spacemakerbd",
};

// Builds a WhatsApp deep link with a prefilled message
export const waLink = (text) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { label: "Available Flats", href: "#projects" },
  { label: "Completed Homes", href: "#completed" },
  { label: "Why Buy With Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const navCta = {
  label: "Book Flat Tour",
  message: "Hello Space Maker, I would like to book a flat tour.",
};

export const heroContent = {
  headline: "Find your sanctuary",
  headlineAccent: "in Dhaka.",
  subheading:
    "Cross-ventilated, earthquake-resistant flats built for sunlight, fresh air and peace of mind, in Jolshiri, Sabujbag and the Dhanmondi edge.",
  primaryCta: { label: "Explore Available Flats", href: "#projects" },
  secondaryCta: {
    label: "Schedule a Site Visit",
    message: "Hello Space Maker, I would like to schedule a site visit.",
  },
  filtersLabel: "Browse by area",
  filters: [
    { label: "Jolshiri Abashon", note: "3 & 4 bed", message: "Hello Space Maker, I am looking for a 3 or 4 bed flat in Jolshiri Abashon." },
    { label: "Sabujbag", note: "Luxury suites", message: "Hello Space Maker, I am interested in luxury suites at Sabujbag." },
    { label: "Dhanmondi edge", note: "Rayer Bazar", message: "Hello Space Maker, I am interested in a flat near Dhanmondi / Rayer Bazar." },
  ],
  featured: {
    image: "/assets/01_hero/hero-1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    title: "FORM & SPACE",
    place: "Sector 13, Jolshiri Abashon",
    spec: "G+M+8 residential building · Architect Hasib Uddin Ahmed",
    message: "Hello Space Maker, I would like details and availability for FORM & SPACE, Jolshiri.",
  },
};

export const aboutContent = {
  title: "Engineers and architects who build homes the way they would build their own.",
  paragraphs: [
    "Space Maker Limited is a Dhaka real estate developer. Our team of civil engineers, architects and project managers takes each building from concept to key handover.",
    "We design for daylight and cross-ventilation first, then back it with tested materials, deep piling and structure that is engineered for earthquakes.",
  ],
  quote: "Every great development begins with trust, transparency and disciplined execution.",
  pillars: [
    { title: "Structural safety", text: "Earthquake-resistant piling and lab-tested concrete and rebar." },
    { title: "Light and air", text: "Layouts planned around sunlight and natural cross-ventilation." },
    { title: "Clear legal footing", text: "Documented approvals and transparent agreements before you commit." },
    { title: "On-time handover", text: "Milestone tracking from foundation to finishing." },
  ],
};

/* ------------------------------------------------------------------ */
/* TESTIMONIALS (admin-managed). Fields (all optional except quote):    */
/* id, name, project, projectSlug (links to /projects/<slug>), quote,   */
/* photo, order, isSample.                                              */
/* SAMPLE CONTENT for the demo: names, quotes and stock photos are NOT  */
/* real clients (isSample: true). Replace with approved client quotes.  */
/* ------------------------------------------------------------------ */
export const testimonialsSection = {
  label: "IN THEIR WORDS",
  heading: "What our clients say.",
  intro:
    "Every home we build becomes someone's story. Here is what families living in Space Maker apartments say about their homes.",
};

export const testimonials = [
  {
    id: "t-1",
    name: "Kamrul Hasan",
    project: "Moon Residence",
    projectSlug: "moon-residence",
    quote:
      "We got our keys on the date written in our agreement, not a day later. Two monsoons on, there are no cracks in the walls and no leaks in the bathrooms. When something small needed fixing, their engineer came that same week.",
    photo: "/images/samples/testimonials/testimonial-1.jpg",
    order: 1,
    isSample: true,
  },
  {
    id: "t-2",
    name: "Moumita Saha",
    project: "FORM & SPACE",
    projectSlug: "form-and-space",
    quote:
      "What sold us was the light. On our last site visit the living room was full of morning sun, with a breeze through both balconies. Every month the engineer sends photos of our floor, so we always know how our home is coming along.",
    photo: "/images/samples/testimonials/testimonial-2.jpg",
    order: 2,
    isSample: true,
  },
  {
    id: "t-3",
    name: "Tanvir Ahmed",
    project: "Platinum Kusumbag",
    projectSlug: "platinum-kusumbag",
    quote:
      "As an engineer, I asked to see the rebar certificates and concrete test reports before signing. They shared every one without hesitation. The layout is just as sensible: no wasted corridors, proper storage, and bedrooms that actually fit a wardrobe.",
    photo: "/images/samples/testimonials/testimonial-3.jpg",
    order: 3,
    isSample: true,
  },
];

/* ---------- Team of experts (SAMPLE content: replace names, roles, text and photos) ----------
   photo: optional, e.g. "/images/samples/team/team-1.jpg". With no photo a drawn sample portrait is shown.
   featured: true = shown in the row on the home page (first four). group: filter chip on /team.
   Every field is optional-safe; the section hides itself if the list is empty. */
export const teamSection = {
  label: "TEAM OF EXPERTS",
  heading: "The people behind every address.",
  intro: "From first sketch to final handover.",
  linkLabel: "Meet all our experts",
  pageHeading: "Meet all our experts.",
  pageIntro:
    "Architects, engineers and project managers working as one team. Every discipline under one roof, so your home is designed, built and handed over by people who talk to each other.",
};

export const team = [
  {
    id: "m-1",
    name: "[Name]",
    role: "Principal Architect",
    group: "Architecture",
    expertise:
      "Sample text. Replace with this person's expertise: residential design, space planning and the detailing that makes a home feel calm and bright.",
    photo: "",
    order: 1,
    featured: true,
    isSample: true,
  },
  {
    id: "m-2",
    name: "[Name]",
    role: "Design Architect",
    group: "Architecture",
    expertise:
      "Sample text. Replace with this person's expertise: facade design, natural light and ventilation studies, and the finishing details buyers notice first.",
    photo: "",
    order: 2,
    featured: false,
    isSample: true,
  },
  {
    id: "m-3",
    name: "[Name]",
    role: "Structural Engineer",
    group: "Structural",
    expertise:
      "Sample text. Replace with this person's expertise: foundation and frame design, material testing and safe, code-compliant construction.",
    photo: "",
    order: 3,
    featured: true,
    isSample: true,
  },
  {
    id: "m-4",
    name: "[Name]",
    role: "Structural Engineer",
    group: "Structural",
    expertise:
      "Sample text. Replace with this person's expertise: soil investigation, earthquake-resistant design and independent checks at every pour.",
    photo: "",
    order: 4,
    featured: false,
    isSample: true,
  },
  {
    id: "m-5",
    name: "[Name]",
    role: "MEP Engineer",
    group: "MEP",
    expertise:
      "Sample text. Replace with this person's expertise: plumbing, ventilation and fire safety planned in from day one, not added later.",
    photo: "",
    order: 5,
    featured: true,
    isSample: true,
  },
  {
    id: "m-6",
    name: "[Name]",
    role: "MEP Engineer",
    group: "MEP",
    expertise:
      "Sample text. Replace with this person's expertise: water supply, drainage and lift systems designed so they stay quiet and trouble-free.",
    photo: "",
    order: 6,
    featured: false,
    isSample: true,
  },
  {
    id: "m-7",
    name: "[Name]",
    role: "Electrical Engineer",
    group: "Electrical",
    expertise:
      "Sample text. Replace with this person's expertise: safe wiring, lighting layouts and power backup designed for everyday family life.",
    photo: "",
    order: 7,
    featured: false,
    isSample: true,
  },
  {
    id: "m-8",
    name: "[Name]",
    role: "Electrical Engineer",
    group: "Electrical",
    expertise:
      "Sample text. Replace with this person's expertise: load planning, earthing and smart-ready conduits so your home is ready for what comes next.",
    photo: "",
    order: 8,
    featured: false,
    isSample: true,
  },
  {
    id: "m-9",
    name: "[Name]",
    role: "Project Manager",
    group: "Management",
    expertise:
      "Sample text. Replace with this person's expertise: site schedules, quality checks and the discipline that keeps every handover on time.",
    photo: "",
    order: 9,
    featured: true,
    isSample: true,
  },
  {
    id: "m-10",
    name: "[Name]",
    role: "Site Manager",
    group: "Management",
    expertise:
      "Sample text. Replace with this person's expertise: daily site supervision, safety on site and clear weekly progress updates for buyers.",
    photo: "",
    order: 10,
    featured: false,
    isSample: true,
  },
  {
    id: "m-11",
    name: "[Name]",
    role: "Sales & Client Relations",
    group: "Sales",
    expertise:
      "Sample text. Replace with this person's expertise: honest guidance on choosing a flat, clear paperwork and support long after you move in.",
    photo: "",
    order: 11,
    featured: false,
    isSample: true,
  },
  {
    id: "m-12",
    name: "[Name]",
    role: "After-sales Support",
    group: "Sales",
    expertise:
      "Sample text. Replace with this person's expertise: handover, registration help and quick fixes in the first year after you move in.",
    photo: "",
    order: 12,
    featured: false,
    isSample: true,
  },
];
