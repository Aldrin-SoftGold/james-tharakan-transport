import type { Metadata } from "next";
import { FleetSection } from "@/components/sections/FleetSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Fleet",
  description:
    "Fleet photography and confirmed vehicle specifications for James Tharakan Transport will be published here once supplied. No tonnage is invented.",
};

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="Equipment"
        titleLine2="for the load"
        lede="Specifications and company vehicle photographs will replace the current placeholders when they are confirmed."
      />
      <FleetSection />
    </>
  );
}
