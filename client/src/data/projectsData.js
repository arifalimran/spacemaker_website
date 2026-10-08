// client/src/data/projectsData.js

export const ongoingRealEstate = [
  {
    id: "form-space",
    segment: "ongoing",
    title: "FORM & SPACE",
    scale: "Proposed G+M+8 (Nine) Storied Residential Building",
    clients: "MAJ AKHTARUZZAMAN / MAJ ABDUS SALAM",
    location: "Plot ID: 13A - 501 - 025, Sector 13, Jolshiri Abashon, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 65,
    activePhase: "6th Floor Slab Casting & Superstructure",
    heroImage: "/assets/03_developments/ongoing/form-and-space/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/form-and-space/blueprint/layout.jpg",
    spaces: [
      { name: "Rooftop Community Terrace", image: "/assets/03_developments/ongoing/form-and-space/architectural/rooftop.jpg" },
      { name: "Executive Lift Lobby", image: "/assets/03_developments/ongoing/form-and-space/architectural/lobby.jpg" }
    ],
    progressLogs: [
      { date: "October 2026", stage: "6th Floor Slab Casting", image: "/assets/03_developments/ongoing/form-and-space/progress/slab-casting.jpg" },
      { date: "August 2026", stage: "Cast-in-situ Deep Piling Verification", image: "/assets/03_developments/ongoing/form-and-space/progress/piling.jpg" }
    ]
  },
  {
    id: "platinum-kusumbag",
    segment: "ongoing",
    title: "Platinum Kusumbag",
    scale: "10-Storied Premium Residential Apartment Complex",
    clients: "Landowner Consortium",
    location: "10 Katha, Sabujbag, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 40,
    activePhase: "Superstructure Phase",
    heroImage: "/assets/03_developments/ongoing/platinum-kusumbag/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/platinum-kusumbag/blueprint/layout.jpg",
    spaces: [],
    progressLogs: []
  },
  {
    id: "marchent-mahua",
    segment: "ongoing",
    title: "Marchent Mahua",
    scale: "09-Storied Residential Tower",
    clients: "Landowner Consortium",
    location: "5 Katha, Sector 16, Jolshiri Abashon, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 30,
    activePhase: "Basement & Substructure",
    heroImage: "/assets/03_developments/ongoing/marchent-mahua/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/marchent-mahua/blueprint/layout.jpg",
    spaces: [],
    progressLogs: []
  },
  {
    id: "rayer-bazar",
    segment: "ongoing",
    title: "Rayer Bazar Residential",
    scale: "G+13 Storied Residential Development",
    clients: "Private Landowner",
    location: "Dhanmondi Edge / Rayer Bazar, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Under Construction",
    progressPercentage: 20,
    activePhase: "Piling & Deep Foundation",
    heroImage: "/assets/03_developments/ongoing/rayer-bazar/hero/render.jpg",
    blueprintImage: "/assets/03_developments/ongoing/rayer-bazar/blueprint/layout.jpg",
    spaces: [],
    progressLogs: []
  }
];

export const flagshipProjects = [
  {
    id: "moon-residence",
    segment: "flagship",
    title: "Moon Residence",
    scale: "10-Storied Mixed-Use Commercial & Living Landmark",
    clients: "Moon Jewelers",
    location: "8 Katha, Dinajpur Central",
    architect: "Hasib Uddin Ahmed",
    status: "Handed Over & Completed",
    progressPercentage: 100,
    heroImage: "/assets/03_developments/flagships/moon-residence/hero/facade.jpg",
    blueprintImage: "/assets/03_developments/flagships/moon-residence/blueprint/layout.jpg",
    spaces: [
      { name: "Commercial Atrium", image: "/assets/03_developments/flagships/moon-residence/commercial-atrium/atrium.jpg" }
    ],
    progressLogs: []
  }
];

export const architecturalProjects = [
  {
    id: "dg-niport-bhaban",
    segment: "architectural",
    title: "DG NIPORT Bhaban",
    scale: "10-Storied Commercial & Institutional Building",
    clients: "NIPORT / Ministry of Health",
    location: "2.05 Bigha, Azimpur, Dhaka",
    architect: "Hasib Uddin Ahmed",
    status: "Institutional Consultancy",
    heroImage: "/assets/03_developments/architectural/dg-niport-bhaban/hero/facade.jpg",
    blueprintImage: "/assets/03_developments/architectural/dg-niport-bhaban/blueprint/siteplan.jpg"
  },
  {
    id: "hotel-chittagong",
    segment: "architectural",
    title: "Proposed Hotel at Chittagong",
    scale: "06-Storied Modern Coastal Hotel",
    clients: "Bangladesh Parjatan Corporation",
    location: "Chittagong Coastal Area",
    architect: "Hasib Uddin Ahmed",
    status: "Design Proposal",
    heroImage: "/assets/03_developments/architectural/hotel-chittagong/hero/exterior.jpg",
    blueprintImage: "/assets/03_developments/architectural/hotel-chittagong/blueprint/layout.jpg"
  }
];

export const interiorProjects = [
  {
    id: "moulvibazar-villa",
    segment: "interior",
    title: "Interior at Moulvibazar",
    client: "Laila Group",
    location: "Sylhet",
    architect: "Hasib Uddin Ahmed",
    suites: [
      { 
        title: "Grand Living Lounge", 
        specs: "Wooden chevron flooring, circular tray cove lighting, luxury sectional sofa, fluted divider", 
        image: "/assets/04_interiors/moulvibazar-villa/grand-living-lounge/lounge.jpg" 
      },
      { 
        title: "Dining & Breakfast Bar Suite", 
        specs: "Integrated smart appliances, breakfast counter, custom joinery, laundry concealment", 
        image: "/assets/04_interiors/moulvibazar-villa/dining-breakfast-bar/counter.jpg" 
      },
      { 
        title: "Executive Master Bedroom", 
        specs: "High-gloss figured walnut full-height wardrobe, upholstered headboard, acoustic panels", 
        image: "/assets/04_interiors/moulvibazar-villa/executive-master/bedroom.jpg" 
      },
      { 
        title: "Spa Ensuite Bathroom", 
        specs: "Frameless walk-in glass shower, gold/brass fittings, circular backlit LED mirror", 
        image: "/assets/04_interiors/moulvibazar-villa/spa-ensuite/shower.jpg" 
      }
    ]
  },
  {
    id: "cielo-rooftop",
    segment: "interior",
    title: "Cielo Rooftop Bistro",
    client: "Cielo Hospitality",
    location: "Banani / Poribag, Dhaka",
    architect: "Hasib Uddin Ahmed",
    suites: []
  },
  {
    id: "rangs-corporate",
    segment: "interior",
    title: "Rangs Executive Lounge",
    client: "Rangs Group",
    location: "Gulshan 01, Dhaka",
    architect: "Hasib Uddin Ahmed",
    suites: []
  }
];