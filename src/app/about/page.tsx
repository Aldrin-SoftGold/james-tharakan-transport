import type { Metadata } from "next";
import { FounderStory } from "@/components/sections/FounderStory";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { PageHero } from "@/components/sections/PageHero";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "James Tharakan Transport L.L.C was built from the road. The owner began as a driver and grew the venture into a licensed Dubai LLC for heavy cargo and raw materials transport.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A transport company"
        titleLine2="built from driving."
        lede={`${company.legalName} is a Dubai-licensed road transport company. The work is heavy cargo and raw materials — understood from the road, not from a desk.`}
      />
      <FounderStory />
      <WhyUsSection />
    </>
  );
}
