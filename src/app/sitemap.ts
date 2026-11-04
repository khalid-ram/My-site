import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/case-studies", "/about", "/contact"].map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const cases = getCaseStudies()
    .filter((c) => c.meta.status === "published")
    .map((c) => ({ url: `${siteUrl}/case-studies/${c.meta.slug}`, priority: 0.7 }));
  return [...pages, ...cases];
}
