import type { Metadata } from "next";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a road transport quote for heavy cargo or building materials across the UAE, Oman, Saudi Arabia and the GCC.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Quote"
        title="Tell us what"
        titleLine2="needs moving."
      />
      <div className="bg-offwhite pb-24">
        <div className="site-grid">
          <QuoteForm compact />
        </div>
      </div>
    </>
  );
}
