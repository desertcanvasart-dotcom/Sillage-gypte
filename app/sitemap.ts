import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";
import { tours } from "@/data/tours";
import { guides } from "@/data/guides";
import { experiences } from "@/data/experiences";
import { destinations } from "@/data/destinations";
import { journal } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-08");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, priority: 1, changeFrequency: "monthly" },
    { url: `${SITE_URL}/tours`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE_URL}/destinations`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/experiences`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/guides`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/journal`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${SITE_URL}/about`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${SITE_URL}/plan`, priority: 0.9, changeFrequency: "yearly" },
    { url: `${SITE_URL}/contact`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${SITE_URL}/privacy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${SITE_URL}/terms`, priority: 0.2, changeFrequency: "yearly" },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...tours.map((t) => ({ url: `${SITE_URL}/tours/${t.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...destinations.map((d) => ({ url: `${SITE_URL}/destinations/${d.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...experiences.map((e) => ({ url: `${SITE_URL}/experiences/${e.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    ...guides.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, priority: 0.5, changeFrequency: "yearly" as const })),
    ...journal.map((p) => ({ url: `${SITE_URL}/journal/${p.slug}`, priority: 0.6, changeFrequency: "yearly" as const })),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((r) => ({ ...r, lastModified }));
}
