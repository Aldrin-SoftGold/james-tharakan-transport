import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MaterialsSection } from "@/components/sections/MaterialsSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Road transport across the GCC. Any cargo, specialised in building raw materials. UAE, Oman, Saudi Arabia, Qatar, Kuwait and Bahrain.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Road transport"
        titleLine2="for the load."
        lede="Any cargo, specialised in building raw materials. The company operates across the GCC: UAE, Oman, Saudi Arabia, Qatar, Kuwait and Bahrain."
      />
      <ServicesSection showHeading={false} />
      <MaterialsSection />
    </>
  );
}
