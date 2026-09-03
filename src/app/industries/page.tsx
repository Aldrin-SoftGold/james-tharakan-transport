import type { Metadata } from "next";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Road transport for construction and contracting, building-material suppliers, manufacturing, trading companies and project logistics.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Industries"
        title="Built for"
        titleLine2="the people who ship."
        lede="Procurement teams, materials suppliers, manufacturers, traders and project teams moving cargo by road."
      />
      <IndustriesSection />
    </>
  );
}
