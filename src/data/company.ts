export const company = {
  legalName: "James Tharakan Transport L.L.C",
  shortName: "James Tharakan Transport",
  founderName: "James Tharakan",
  arabicName: "جيمس تاراكان للنقليات ذ.م.م",
  tradeLicence: "1308458",
  registerNo: "2220046",
  licenceDisplay: "1308458 / 2220046",
  legalForm: "L.L.C",
  city: "Dubai",
  country: "UAE",
  address: {
    line1: "Office F1-037",
    line2: "Dubai Investment Park",
    city: "Dubai",
    country: "UAE",
    display: "Office F1-037, Dubai Investment Park, Dubai, UAE",
    mapsQuery: "Office F1-037, Dubai Investment Park, Dubai, UAE",
    mapsEmbed:
      "https://maps.google.com/maps?q=Dubai%20Investment%20Park%2C%20Dubai%2C%20UAE&z=13&output=embed",
  },
  phones: [
    {
      label: "Primary",
      display: "+971 56 916 1225",
      href: "tel:+971569161225",
      whatsapp: "https://wa.me/971569161225",
      primary: true,
    },
    {
      label: "Secondary",
      display: "+971 56 452 9934",
      href: "tel:+971564529934",
      whatsapp: "https://wa.me/971564529934",
      primary: false,
    },
  ],
  email: "jamesjose.gems@gmail.com",
  activities: [
    "Cargo Transport by Heavy Trucks",
    "Raw Materials Transport by Road",
  ],
  corridors: ["UAE", "Oman", "Saudi Arabia", "GCC"],
  deliveryLine: "UAE. Oman. Saudi Arabia and GCC",
  copyrightYear: 2026,
  placeholders: {
    yearsInOperation: "[CONFIRM YEARS IN OPERATION]",
    fleetSize: "[CONFIRM FLEET SIZE]",
    paidUpCapital: "[CONFIRM PAID-UP CAPITAL]",
    dcciMembership: "[ADD ASSOCIATION MEMBERSHIPS]",
    anchorClients: "[ADD ANCHOR CLIENTS IF PERMITTED]",
    founderPhoto: "[ADD FOUNDER PHOTO]",
    truckPhotos: "[ADD TRUCK PHOTOS]",
    trailerSpecs: "[ADD TRAILER SPECIFICATIONS]",
  },
} as const;

export const primaryPhone = company.phones[0];
