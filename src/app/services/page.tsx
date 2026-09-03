import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MaterialsSection } from "@/components/sections/MaterialsSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Heavy truck cargo transport, raw and building materials movement, and project site deliveries from Dubai across the UAE, Oman, Saudi Arabia and the GCC.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Road transport"
        titleLine2="for the load."
        lede="Four lines of work: heavy cargo, building materials, cross-border movement across the UAE, Oman, Saudi Arabia and the GCC, and project site deliveries."
      />
      <ServicesSection showHeading={false} />
      <MaterialsSection />
    </>
  );
}
