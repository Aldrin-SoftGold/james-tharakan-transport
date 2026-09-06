import type { Metadata } from "next";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a road transport quote across the GCC. Any cargo, specialised in building raw materials.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Quote"
        title="Tell us what"
        titleLine2="needs moving."
      />
      <div className="bg-offwhite pb-16 md:pb-24">
        <div className="site-grid">
          <QuoteForm compact />
        </div>
      </div>
    </>
  );
}
