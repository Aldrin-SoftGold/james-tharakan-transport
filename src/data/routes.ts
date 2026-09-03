export type RouteNode = {
  id: string;
  label: string;
  sublabel?: string;
};

export const routeNarrative = {
  heading: "UAE. Oman.",
  headingLine2: "Saudi Arabia and GCC.",
  intro:
    "Deliveries run across the UAE, Oman, Saudi Arabia and the GCC.",
} as const;

export const routeNodes: RouteNode[] = [
  { id: "dubai", label: "Dubai", sublabel: "UAE" },
  { id: "uae", label: "UAE", sublabel: "Road network" },
  { id: "oman", label: "Oman", sublabel: "Cross-border" },
  { id: "ksa", label: "Saudi Arabia", sublabel: "Deliveries" },
  { id: "gcc", label: "GCC", sublabel: "Road transport" },
];

export const operatedRoutes = [
  {
    id: "uae",
    title: "UAE",
    detail: "Road deliveries across the United Arab Emirates, working from Dubai.",
  },
  {
    id: "oman",
    title: "Oman",
    detail: "Cross-border road deliveries into Oman.",
  },
  {
    id: "ksa",
    title: "Saudi Arabia",
    detail: "Road deliveries into Saudi Arabia.",
  },
  {
    id: "gcc",
    title: "GCC",
    detail: "Wider GCC road movement for heavy cargo and raw materials.",
  },
] as const;
