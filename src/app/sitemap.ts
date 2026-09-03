import type { MetadataRoute } from "next";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jamestharakanttransport.com";
  const now = new Date();
  const pages = [
    "",
    "/about",
    "/services",
    "/routes",
    "/fleet",
    "/industries",
    "/quote",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
  ];
  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
