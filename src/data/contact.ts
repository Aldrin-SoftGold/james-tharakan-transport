import { company, primaryPhone } from "./company";

export const contact = {
  headline: "Ready to move?",
  subheading: "Let's talk about your next load.",
  phone: primaryPhone,
  phones: company.phones,
  email: company.email,
  address: company.address,
  mapsEmbed: company.address.mapsEmbed,
} as const;

export const nav = {
  desktop: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Routes", href: "/routes" },
    { label: "Fleet", href: "/fleet" },
  ],
  mobile: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Routes", href: "/routes" },
    { label: "Fleet", href: "/fleet" },
    { label: "Industries", href: "/industries" },
    { label: "Why Us", href: "/#why-us" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Routes", href: "/routes" },
    { label: "Fleet", href: "/fleet" },
    { label: "Industries", href: "/industries" },
    { label: "Contact", href: "/contact" },
  ],
  quote: { label: "Request a Quote", href: "/quote" },
} as const;
