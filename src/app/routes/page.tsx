import type { Metadata } from "next";
import { RouteMap } from "@/components/sections/RouteMap";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Routes & Coverage",
  description:
    "Road deliveries across the UAE, Oman, Saudi Arabia and the GCC.",
};

export default function RoutesPage() {
  return (
    <>
      <PageHero
        eyebrow="Routes"
        title="UAE. Oman."
        titleLine2="Saudi Arabia and GCC."
        lede="Delivery locations the company operates today: UAE, Oman, Saudi Arabia and the GCC."
      />
      <RouteMap />
    </>
  );
}
