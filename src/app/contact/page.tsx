import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact James Tharakan Transport L.L.C in Dubai Investment Park. Call +971 56 916 1225 or request a quote.",
};

export default function ContactPage() {
  return <ContactSection />;
}
