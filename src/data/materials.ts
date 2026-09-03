export type Material = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
};

export const materials: Material[] = [
  {
    id: "cement",
    name: "Cement",
    image: "/images/materials/cement.jpg",
    imageAlt: "Fresh concrete being finished on a construction site",
  },
  {
    id: "aggregates",
    name: "Aggregates",
    image: "/images/materials/aggregates.jpg",
    imageAlt: "Crushed stone and gravel aggregates",
  },
  {
    id: "steel",
    name: "Steel",
    image: "/images/materials/steel.jpg",
    imageAlt: "Steel and reinforcement materials on a construction site",
  },
  {
    id: "blocks",
    name: "Blocks",
    image: "/images/materials/blocks.jpg",
    imageAlt: "Masonry and blockwork materials",
  },
  {
    id: "tiles",
    name: "Tiles",
    image: "/images/materials/tiles.jpg",
    imageAlt: "Ceramic wall tiles ready for a building site",
  },
  {
    id: "sanitary",
    name: "Sanitary Ware",
    image: "/images/materials/sanitary.jpg",
    imageAlt: "Sanitary ware in a finished interior",
  },
  {
    id: "prefab",
    name: "Prefab Units",
    image: "/images/materials/prefab.jpg",
    imageAlt: "Prefabricated construction elements on site",
  },
];
