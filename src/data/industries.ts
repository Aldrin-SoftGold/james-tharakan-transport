export type Industry = {
  id: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

export const industries: Industry[] = [
  {
    id: "construction",
    title: "Construction & Contracting",
    summary:
      "Site-timed movement of materials and heavy loads for contracting companies.",
    image: "/images/industries/construction.jpg",
    imageAlt: "Construction site representing contracting cargo demand",
  },
  {
    id: "suppliers",
    title: "Building Materials Suppliers",
    summary:
      "Regular and project movement for cement, steel, blocks, tiles and related stock.",
    image: "/images/industries/suppliers.jpg",
    imageAlt: "Warehouse and goods handling for building-material suppliers",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    summary: "Heavy and raw-material road transport for production schedules.",
    image: "/images/industries/manufacturing.jpg",
    imageAlt: "Manufacturing facility requiring inbound material transport",
  },
  {
    id: "trading",
    title: "Trading Companies",
    summary: "Road movement across the UAE, Oman, Saudi Arabia and the GCC for traders moving goods by truck.",
    image: "/images/industries/trading.jpg",
    imageAlt: "Road freight movement associated with regional trading",
  },
  {
    id: "project",
    title: "Project Logistics",
    summary: "Coordinated deliveries into live projects where sequence matters.",
    image: "/images/industries/project.jpg",
    imageAlt: "Project-scale construction requiring sequenced deliveries",
  },
];
