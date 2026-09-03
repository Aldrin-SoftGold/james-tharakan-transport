export type Service = {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "heavy-truck",
    number: "01",
    slug: "heavy-truck-cargo",
    title: "Heavy Truck Cargo Transport",
    shortTitle: "Heavy Truck Cargo",
    summary:
      "Road movement of heavy cargo with equipment suited to demanding loads and long corridor work.",
    description:
      "We move heavy cargo by road across the UAE, Oman, Saudi Arabia and the GCC. The work is practical: matching the vehicle to the load, securing it properly, and delivering it without drama. This is not a desk service. It is road transport, handled by people who have done the driving.",
    image: "/images/services/heavy-cargo.jpg",
    imageAlt: "Heavy truck on an open highway, representative of road cargo transport",
  },
  {
    id: "materials",
    number: "02",
    slug: "raw-building-materials",
    title: "Raw & Building Materials Transport",
    shortTitle: "Building Materials",
    summary:
      "Cement, aggregates, steel, blocks, tiles, sanitary ware and prefab units — moved with care for site timing.",
    description:
      "Building materials are the core of the work. Cement, aggregates, steel, blocks, tiles, sanitary ware and prefab units each need different handling. Deadlines, load security and site access matter more than a headline rate. We plan the movement around the job, not the other way around.",
    image: "/images/services/materials.jpg",
    imageAlt: "Concrete and site materials being worked on a construction job",
  },
  {
    id: "gcc",
    number: "03",
    slug: "cross-border-gcc",
    title: "Cross-Border GCC Transport",
    shortTitle: "Cross-Border GCC",
    summary:
      "Cross-border road deliveries across the UAE, Oman, Saudi Arabia and the GCC.",
    description:
      "Cross-border deliveries run across the UAE, Oman, Saudi Arabia and the GCC. Border formalities, papers and driver realities are part of the job — understood from the road, not from a brochure.",
    image: "/images/services/cross-border.jpg",
    imageAlt: "A driver on the road at dusk — the corridor work of cross-border transport",
  },
  {
    id: "project",
    number: "04",
    slug: "project-site-deliveries",
    title: "Project & Site Deliveries",
    shortTitle: "Project & Site Delivery",
    summary:
      "Timed deliveries into live construction sites and project locations, coordinated around access and sequence.",
    description:
      "Project work is about arriving when the site can take the load — not dumping cargo at the gate. We handle site deliveries for construction and contracting jobs where access, sequence and timing decide whether the day holds or slips.",
    image: "/images/services/site-delivery.jpg",
    imageAlt: "Active construction site receiving a materials delivery",
  },
];
