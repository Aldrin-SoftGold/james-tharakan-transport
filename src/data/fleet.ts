import { company } from "./company";

export type FleetItem = {
  id: string;
  type: string;
  trailer: string;
  capacity: string;
  use: string;
  image: string;
  imageAlt: string;
  photoStatus: "placeholder" | "company";
};

export const fleetIntro = {
  heading: "Equipment for the load",
  body: "Buyers choose transporters by whether the equipment matches the cargo. Vehicle photographs and confirmed specifications will sit here once supplied.",
  note: company.placeholders.truckPhotos,
} as const;

export const fleet: FleetItem[] = [
  {
    id: "heavy-truck",
    type: "Heavy truck",
    trailer: company.placeholders.trailerSpecs,
    capacity: "Fleet specifications to be confirmed",
    use: "Heavy cargo and long-corridor road transport",
    image: "/images/fleet/placeholder-01.jpg",
    imageAlt:
      "Representative heavy truck photograph — company fleet photography to be supplied",
    photoStatus: "placeholder",
  },
  {
    id: "materials-unit",
    type: "Materials transport unit",
    trailer: company.placeholders.trailerSpecs,
    capacity: "Fleet specifications to be confirmed",
    use: "Raw and building materials, project and site deliveries",
    image: "/images/fleet/placeholder-02.jpg",
    imageAlt:
      "Representative freight photograph — company fleet photography to be supplied",
    photoStatus: "placeholder",
  },
];
