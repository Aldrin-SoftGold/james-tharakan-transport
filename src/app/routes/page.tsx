import type { Metadata } from "next";
import { RouteMap } from "@/components/sections/RouteMap";

export const metadata: Metadata = {
  title: "Routes & Coverage",
  description:
    "The company operates across the GCC: UAE, Oman, Saudi Arabia, Qatar, Kuwait and Bahrain.",
};

export default function RoutesPage() {
  return (
    <div className="pt-16 md:pt-20">
      <RouteMap />
    </div>
  );
}
