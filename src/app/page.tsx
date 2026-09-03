import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FounderStory } from "@/components/sections/FounderStory";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MaterialsSection } from "@/components/sections/MaterialsSection";
import { RouteMap } from "@/components/sections/RouteMap";
import { FleetSection } from "@/components/sections/FleetSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FounderStory />
      <ServicesSection />
      <MaterialsSection />
      <RouteMap />
      <FleetSection />
      <WhyUsSection />
      <IndustriesSection />
      <QuoteForm />
      <ContactSection />
    </>
  );
}
