import {
  Building2,
  HardHat,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Zap,
  Droplets,
  Layers,
  Brush,
  Hammer,
} from "lucide-react";

export const contact = {
  address: "238, Westwood Avenue, Singapore 648363",
  phone: "+65 81174399",
  phoneHref: "tel:+6581174399",
  email: "contact@chamsconstruction.com",
  emailHref: "mailto:contact@chamsconstruction.com",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/our-work" },
  { label: "Careers", href: "/join-our-team" },
  { label: "Contact", href: "/contact-us" },
];

export type SubService = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  icon: typeof Building2;
  description: string;
  image: string;
  sub: SubService[];
};

export type ServiceCategory = {
  key: string;
  label: string;
  title: string;
  intro: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    key: "commercial",
    label: "01 — Commercial",
    title: "Commercial Services",
    intro:
      "Heavy-duty execution for industrial sites, factories, warehouses, and large-scale commercial environments.",
    services: [
      {
        title: "Blasting & Painting",
        icon: Brush,
        image: "/Services/CommercialServices/blasting-painting.png",
        description:
          "Surface preparation and protective coating systems for steel, concrete, and industrial structures. Built to withstand harsh environments and extend asset life.",
        sub: [
          {
            title: "Composite Decking",
            description:
              "Slip-resistant, weather-stable decking for walkways, mezzanines, and outdoor commercial flooring.",
          },
          {
            title: "Epoxy Flooring",
            description:
              "Seamless industrial-grade epoxy systems for warehouses, workshops, and chemical-resistant zones.",
          },
          {
            title: "Painting Services",
            description:
              "Industrial and commercial painting with anti-corrosive primers and durable topcoat finishes.",
          },
          {
            title: "Waterproofing",
            description:
              "Roof, basement, and wet-area waterproofing systems with multi-layer membrane application.",
          },
          {
            title: "Blasting",
            description:
              "Abrasive surface blasting to remove rust, scale, and coatings prior to protective recoating.",
          },
        ],
      },
      {
        title: "Electrical Services",
        icon: Zap,
        image: "/Services/CommercialServices/Electrical-Services.png",
        description:
          "Commercial electrical installation, distribution, and maintenance carried out by licensed technicians.",
        sub: [
          {
            title: "Power Distribution",
            description:
              "Switchboards, sub-distribution panels, and load balancing for commercial sites.",
          },
          {
            title: "Lighting Systems",
            description:
              "Industrial LED, high-bay, and commercial lighting design and installation.",
          },
          {
            title: "Cable Management",
            description:
              "Cable trays, conduit runs, and structured wiring for clean, code-compliant layouts.",
          },
          {
            title: "Preventive Maintenance",
            description:
              "Periodic inspections, fault diagnostics, and scheduled electrical servicing.",
          },
        ],
      },
      {
        title: "Plumbing & Sanitary",
        icon: Droplets,
        image: "/Services/CommercialServices/plumbing-sanitary.png",
        description:
          "End-to-end commercial plumbing — water supply, drainage, and sanitary fixture installation and repair.",
        sub: [
          {
            title: "Water Supply Systems",
            description:
              "Pressurised cold and hot water supply lines, booster pumps, and tank installations.",
          },
          {
            title: "Drainage & Sewerage",
            description:
              "Floor traps, soil stacks, and grease line systems for commercial kitchens and facilities.",
          },
          {
            title: "Sanitary Fittings",
            description:
              "Toilet, basin, urinal, and fixture installation for commercial washrooms.",
          },
          {
            title: "Repairs & Servicing",
            description:
              "Leak detection, blockage clearance, and emergency plumbing response.",
          },
        ],
      },
      {
        title: "Manpower Supply",
        icon: Users,
        image: "/Services/CommercialServices/man-power.png",
        description:
          "Reliable site-ready workforce — skilled tradesmen, supervisors, and general labour deployed on demand.",
        sub: [
          {
            title: "Skilled Tradesmen",
            description:
              "Certified electricians, plumbers, welders, and painters for project deployment.",
          },
          {
            title: "General Workers",
            description:
              "Site labour, helpers, and support crew for construction and industrial operations.",
          },
          {
            title: "Site Supervisors",
            description:
              "Experienced supervisors to coordinate teams, schedules, and on-site safety.",
          },
          {
            title: "Temporary Staffing",
            description:
              "Short-term workforce solutions for project peaks, shutdowns, and turnaround works.",
          },
        ],
      },
    ],
  },
  {
    key: "interior",
    label: "02 — Interior & Renovation",
    title: "Interior & Renovation Works",
    intro:
      "Detailed finishing, fit-out, and renovation work for homes, offices, retail, and HDB properties.",
    services: [
      {
        title: "Interior Works",
        icon: Layers,
        image: "/Services/Interior-Renovation/Interior-Works.png",
        description:
          "Full interior fit-out and finishing — partitions, ceilings, flooring, and bespoke joinery.",
        sub: [
          {
            title: "Wall Partitions",
            description:
              "Drywall, glass, and gypsum partition systems for offices and residential layouts.",
          },
          {
            title: "False Ceilings",
            description:
              "Suspended ceiling systems with integrated lighting, vents, and acoustic panels.",
          },
          {
            title: "Flooring",
            description:
              "Tile, vinyl, laminate, and timber flooring installation with subfloor preparation.",
          },
          {
            title: "Joinery & Carpentry",
            description:
              "Built-in wardrobes, kitchen carpentry, and custom millwork finished on-site.",
          },
        ],
      },
      {
        title: "Cement Plastering",
        icon: Hammer,
        image: "/Services/Interior-Renovation/Cement-Plastering.png",
        description:
          "Smooth, level plaster finishes for walls and ceilings — prepared for paint, tile, or decorative finishes.",
        sub: [
          {
            title: "Wall Plastering",
            description:
              "Hand-applied cement render for internal and external walls with level finishing.",
          },
          {
            title: "Ceiling Plastering",
            description:
              "Skim-coat ceiling work for paint-ready finishes and crack repair.",
          },
          {
            title: "Skim Coating",
            description:
              "Fine plaster top layer for ultra-smooth paint or wallpaper-ready surfaces.",
          },
          {
            title: "Repair & Patching",
            description:
              "Crack, spall, and damage repair with matched-texture re-plastering.",
          },
        ],
      },
      {
        title: "Plumbing Services",
        icon: Droplets,
        image: "/Services/Interior-Renovation/Plumbing-Services.png",
        description:
          "Residential and renovation plumbing — pipework, fittings, fixtures, and bathroom or kitchen upgrades.",
        sub: [
          {
            title: "Pipe Installation",
            description:
              "Concealed and exposed water and drainage pipework with code-compliant routing.",
          },
          {
            title: "Bathroom Fit-Out",
            description:
              "Complete bathroom plumbing — basin, WC, shower mixer, and floor trap installation.",
          },
          {
            title: "Kitchen Plumbing",
            description:
              "Sink, dishwasher, water heater, and water filter line connections.",
          },
          {
            title: "Leak Repairs",
            description:
              "Diagnostic leak detection and targeted repair for concealed and visible plumbing.",
          },
        ],
      },
      {
        title: "Painting",
        icon: Paintbrush,
        image: "/Services/Interior-Renovation/painting.png",
        description:
          "Interior and exterior painting — surface preparation, primer, and finish coats for clean, lasting results.",
        sub: [
          {
            title: "Interior Painting",
            description:
              "Room-by-room repainting with low-VOC paint and crisp cut-in detailing.",
          },
          {
            title: "Exterior Painting",
            description:
              "Weather-resistant exterior coatings for facades, balconies, and external walls.",
          },
          {
            title: "Decorative Finishes",
            description:
              "Textured, matte, and feature-wall finishes for accent zones and styling.",
          },
          {
            title: "Surface Preparation",
            description:
              "Sanding, filling, and priming for a defect-free finished surface.",
          },
        ],
      },
      {
        title: "Electrical Services",
        icon: Zap,
        image: "/Services/Interior-Renovation/Electrical-Services.png",
        description:
          "Residential electrical works — rewiring, lighting, fixture installation, and maintenance by licensed electricians.",
        sub: [
          {
            title: "Wiring & Rewiring",
            description:
              "Full or partial rewiring for renovation projects with concealed conduit routing.",
          },
          {
            title: "Lighting Installation",
            description:
              "Downlights, pendant fixtures, cove lighting, and smart lighting setups.",
          },
          {
            title: "Power Points",
            description:
              "Additional socket outlets, USB ports, and dedicated appliance circuits.",
          },
          {
            title: "Fault Finding",
            description:
              "Tripping, short circuit, and earthing fault diagnostics with safe rectification.",
          },
        ],
      },
    ],
  },
];

export const featuredServices = [
  "Composite Decking",
  "Epoxy Flooring",
  "Waterproofing",
  "Blasting",
  "Painting",
  "Plumbing",
  "Electrical",
  "Interior Works",
  "Cement Plastering",
  "Manpower Supply",
];

// Featured client projects (real Singapore statutory boards + Micron)
// Used by /our-work page for the immersive scroll showcase.
export const featuredProjects: {
  index: string;
  client: string;
  fullName: string;
  tagline: string;
  title: string;
  italic: string;
  location: string;
  year: string;
  sector: string;
  scope: string[];
  summary: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    index: "01",
    client: "JTC",
    fullName: "JTC (Jurong Town Corporation)",
    tagline: "Building tomorrow's industries",
    title: "Jurong Island",
    italic: "industrial infrastructure.",
    location: "Jurong Island, Singapore",
    year: "Ongoing",
    sector: "Industrial / Civil",
    scope: [
      "Flyover connectivity & structural access works",
      "Integrated infrastructure across key JTC zones",
      "Reinforcement & foundation works at active plants",
      "On-site engineering support for industrial expansion",
    ],
    summary:
      "Continuous support for JTC's industrial estates — reinforcement, structural access and integrated civil works delivered alongside live petrochemical and semiconductor neighbours.",
    image: "/our-work/jtcWorks.png",
    imageAlt: "CHAMS crew laying reinforcement at a JTC Jurong Island industrial site at sunset",
  },
  {
    index: "02",
    client: "LTA",
    fullName: "LTA (Land Transport Authority)",
    tagline: "Building Singapore's transport future",
    title: "Roads, bridges &",
    italic: "MRT infrastructure.",
    location: "Island-wide, Singapore",
    year: "Ongoing",
    sector: "Civil / Transport",
    scope: [
      "Roadworks and carriageway upgrading",
      "Bridge and viaduct structural works",
      "Supporting MRT line infrastructure builds",
      "Island-wide maintenance and rectification",
    ],
    summary:
      "Civil execution for Land Transport Authority programmes — viaduct reinforcement, road upgrading and MRT support works under live-traffic conditions, finished to LTA's safety and tolerance standards.",
    image: "/our-work/LTAworks.png",
    imageAlt: "CHAMS site supervisor overseeing LTA viaduct reinforcement at sunset",
  },
  {
    index: "03",
    client: "HDB",
    fullName: "HDB (Housing & Development Board)",
    tagline: "Building better homes, together",
    title: "Estate upgrading &",
    italic: "drainage works.",
    location: "Yishun Ave 9 & Singapore estates",
    year: "Ongoing",
    sector: "Public Housing / Civil",
    scope: [
      "Drainage and trench reinforcement",
      "Footpath and access carriageway works",
      "Estate-side service ducts and pits",
      "Resident-friendly site control and hoarding",
    ],
    summary:
      "Estate-side civil works for HDB precincts — drainage upgrading, trench reinforcement and service-duct installation delivered with resident-first site control on live housing roads.",
    image: "/our-work/HDBworks.png",
    imageAlt: "CHAMS crew reinforcing a roadside drainage trench beside an HDB estate at Yishun Ave 9",
  },
  {
    index: "04",
    client: "PUB",
    fullName: "PUB (Public Utilities Board)",
    tagline: "Singapore's national water agency",
    title: "Water & drainage",
    italic: "infrastructure.",
    location: "Marina Bay & Singapore-wide",
    year: "Ongoing",
    sector: "Water / Utilities",
    scope: [
      "Water pipeline installation & network upgrading",
      "Sewerage system & pumping station works",
      "Drainage improvement and flood mitigation",
      "Reservoir, tank & water treatment infrastructure",
    ],
    summary:
      "Heavy-civil water works for PUB — pipeline, sewerage, drainage and flood mitigation projects executed across waterfront and inland sites, including marquee Marina Bay infrastructure.",
    image: "/our-work/PUBworks.png",
    imageAlt: "CHAMS excavator and crew on a PUB water-infrastructure site facing Marina Bay Sands",
  },
  {
    index: "05",
    client: "Micron",
    fullName: "Micron Semiconductors",
    tagline: "Reliable commercial maintenance",
    title: "Semiconductor fab",
    italic: "maintenance works.",
    location: "Micron Singapore fab",
    year: "Ongoing",
    sector: "Commercial / M&E",
    scope: [
      "Mechanical & electrical maintenance works",
      "Air-conditioning servicing & rectification",
      "Lighting system inspection & maintenance",
      "General building maintenance & rectification",
    ],
    summary:
      "Ongoing commercial M&E maintenance at Micron's Singapore semiconductor fab — mechanical, electrical, HVAC and lighting works delivered on tightly controlled mission-critical schedules.",
    image: "/our-work/micronWorks.png",
    imageAlt: "CHAMS maintenance team approaching the Micron Semiconductors fab in Singapore",
  },
];

export const workItems = [
  {
    title: "Industrial Epoxy Flooring",
    category: "Commercial",
    text: "Seamless epoxy systems for warehouses and workshops — chemical-resistant, dust-free, and built for heavy traffic.",
  },
  {
    title: "Steel Structure Blasting",
    category: "Commercial",
    text: "Abrasive blasting and protective recoating for steel structures, tanks, and external industrial assets.",
  },
  {
    title: "Office Interior Fit-Out",
    category: "Interior",
    text: "Partitions, false ceilings, flooring, and bespoke joinery for commercial office renovations.",
  },
  {
    title: "Residential Renovation",
    category: "Interior",
    text: "HDB and landed property upgrades — plastering, painting, electrical, and bathroom remodelling.",
  },
  {
    title: "Facility Waterproofing",
    category: "Commercial",
    text: "Roof, basement, and wet-area membrane systems for long-term water ingress protection.",
  },
  {
    title: "Skilled Manpower Deployment",
    category: "Manpower",
    text: "Tradesmen, supervisors, and general workforce supplied across construction and industrial sites.",
  },
];

export const stats: [string, string][] = [
  ["100+", "Projects delivered across Singapore"],
  ["15+", "Years of on-site construction expertise"],
  ["50+", "Trusted commercial and residential partners"],
  ["98%", "Client satisfaction across recent works"],
];

export const heroStats: [string, string][] = [
  ["Commercial", "industrial, factory, and warehouse works"],
  ["Interior", "renovation, fit-out, and finishing"],
  ["Manpower", "skilled trades and general workforce"],
  ["HDB", "renovation, repair, and maintenance"],
];

export const roleOptions = [
  "General Worker",
  "Construction Labour",
  "Skilled Technician",
  "Electrician",
  "Plumber",
  "Painter",
  "Site Supervisor",
  "Warehouse Assistant",
  "Maintenance Staff",
  "Cleaning Crew",
];

export const sectorCards = [
  {
    icon: HardHat,
    title: "Commercial",
    text: "Industrial blasting, painting, electrical, plumbing, and manpower for factories, warehouses, and large sites.",
  },
  {
    icon: Paintbrush,
    title: "Interior",
    text: "Fit-out, plastering, flooring, partitions, painting, and electrical for offices, retail, and residences.",
  },
  {
    icon: ShieldCheck,
    title: "Manpower",
    text: "Reliable skilled trades, supervisors, and general workforce deployed across active project sites.",
  },
];

export const chamsPhilosophy = [
  {
    letter: "C",
    word: "Champion",
    text: "We lead every project with dedication, responsibility, and a winning mindset.",
  },
  {
    letter: "H",
    word: "High-Quality",
    text: "Consistent workmanship, attention to detail, and durability across every handover.",
  },
  {
    letter: "A",
    word: "Advanced",
    text: "Modern methods, tools, and technical knowledge applied to improve efficiency and results.",
  },
  {
    letter: "M",
    word: "Modern",
    text: "Contemporary construction practices and design solutions aligned to today's standards.",
  },
  {
    letter: "S",
    word: "Solutions",
    text: "Complete, practical, cost-effective answers tailored to each client's requirements.",
  },
];

export const aboutWhatWeDo = [
  "Interior & Renovation Works — Residential & Commercial",
  "Civil & Structural Construction Works",
  "Blasting & Protective Painting Works",
  "Electrical Installation & Maintenance",
  "Plumbing & Sanitary Systems",
  "Carpentry & Glass Works",
  "Manpower Supply for Construction Projects",
];

export const aboutCommitment = [
  "Strong workmanship",
  "On-time completion",
  "Safety-first execution",
  "Transparent communication",
  "Long-term client satisfaction",
  "Disciplined on-site supervision",
];

export const aboutBullets = [
  "Singapore-based construction and engineering services company",
  "Comprehensive solutions in redecoration, waterproofing, electrical, and structural works",
  "Committed to excellence in safety, quality, and compliance",
  "Long-term partnerships built on trust, transparency, and performance",
];

export const visionMissionValues = [
  {
    key: "vision",
    label: "Vision",
    text: "To be a trusted leader in Singapore's construction industry, recognised for safety, quality, and sustainable engineering solutions.",
  },
  {
    key: "mission",
    label: "Mission",
    text: "To deliver innovative and reliable construction services with a strong focus on workplace safety, compliance, and client satisfaction.",
  },
  {
    key: "values",
    label: "Core Values",
    text: "Safety first in every project, uncompromising quality and reliability, sustainable and energy-efficient practices, and long-term partnerships built on trust and performance.",
  },
];

export const principles = [
  {
    number: "01",
    title: "Site-led",
    text: "Every project is led from the ground — supervisors on-site, decisions made in real time, no remote guesswork.",
  },
  {
    number: "02",
    title: "Built right",
    text: "Specifications, materials, and finishing are matched to use case — durability first, no shortcuts on substrate or prep.",
  },
  {
    number: "03",
    title: "On schedule",
    text: "Clear milestones, daily progress reporting, and a workforce sized to meet the timeline you've committed to.",
  },
  {
    number: "04",
    title: "Aftercare",
    text: "Handover is the start, not the end. Snag lists, defect rectification, and ongoing maintenance support.",
  },
];
