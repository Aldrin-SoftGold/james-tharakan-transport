import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { Scrollbar } from "@/components/layout/Scrollbar";
import { company, primaryPhone } from "@/data/company";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const title = "James Tharakan Transport L.L.C | Heavy Cargo Transport UAE, Oman, Saudi Arabia & GCC";
const description =
  "Dubai-based road transport company for heavy truck cargo and raw materials. Deliveries across the UAE, Oman, Saudi Arabia and the GCC.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jamestharakanttransport.com"),
  title: {
    default: title,
    template: "%s | James Tharakan Transport L.L.C",
  },
  description,
  keywords: [
    "heavy truck transport UAE",
    "building material transport Dubai",
    "UAE Oman Saudi Arabia cargo transport",
    "GCC road transport",
    "Saudi Arabia road transport",
    "raw materials transport UAE",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_AE",
    siteName: company.legalName,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/favicon-16.png?v=4", type: "image/png", sizes: "16x16" },
      { url: "/brand/favicon-32.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/brand/favicon-48.png?v=4", type: "image/png", sizes: "48x48" },
      { url: "/favicon.ico?v=4", sizes: "48x48" },
    ],
    shortcut: "/brand/favicon-32.png?v=4",
    apple: [{ url: "/brand/apple-touch-icon.png?v=4", sizes: "180x180" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: company.legalName,
      legalName: company.legalName,
      email: company.email,
      telephone: primaryPhone.href.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: `${company.address.line1}, ${company.address.line2}`,
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      identifier: company.licenceDisplay,
    },
    {
      "@type": "LocalBusiness",
      name: company.legalName,
      image: "/brand/logo-mark.png",
      telephone: primaryPhone.href.replace("tel:", ""),
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${company.address.line1}, ${company.address.line2}`,
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: ["AE", "OM", "SA"],
      priceRange: "$$",
    },
    {
      "@type": "Service",
      name: "Heavy truck cargo and raw materials transport",
      provider: { "@type": "Organization", name: company.legalName },
      areaServed: ["United Arab Emirates", "Oman", "Saudi Arabia", "GCC"],
      serviceType: company.activities,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-body antialiased pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <AppProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileCta />
          <Scrollbar />
        </AppProviders>
      </body>
    </html>
  );
}
