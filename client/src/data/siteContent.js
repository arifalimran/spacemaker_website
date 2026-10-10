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
