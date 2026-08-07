import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";
import { locales, localePath, defaultLocale } from "@/lib/i18n";
import { tours } from "@/data/tours";
import { guides } from "@/data/guides";
import { experiences } from "@/data/experiences";
import { destinations } from "@/data/destinations";
import { journal } from "@/data/journal";

type Route = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

/**
 * Absolute URL for a path in a locale. The root is emitted without a trailing
 * slash so these match the canonical/hreflang tags the pages themselves render
 * (via `localeAlternates`) — a sitemap URL that disagrees with the page's own
 * canonical is a self-inflicted duplicate-content signal.
 */
function abs(locale: (typeof locales)[number], path: string): string {
  const p = localePath(locale, path);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-08");

  const staticRoutes: Route[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/tours", priority: 0.9, changeFrequency: "monthly" },
    { path: "/destinations", priority: 0.8, changeFrequency: "monthly" },
    { path: "/experiences", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
    { path: "/journal", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/plan", priority: 0.9, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  const dynamicRoutes: Route[] = [
    ...tours.map((t) => ({ path: `/tours/${t.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...destinations.map((d) => ({ path: `/destinations/${d.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...experiences.map((e) => ({ path: `/experiences/${e.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.5, changeFrequency: "yearly" as const })),
    ...journal.map((p) => ({ path: `/journal/${p.slug}`, priority: 0.6, changeFrequency: "yearly" as const })),
  ];

  // Every page is served in all five locales (see middleware.ts), so each gets
  // its own <url> entry carrying the complete set of hreflang alternates —
  // including a self-reference — which is what Google requires.
  return [...staticRoutes, ...dynamicRoutes].flatMap((r) =>
    locales.map((locale) => ({
      url: abs(locale, r.path),
      lastModified,
      priority: r.priority,
      changeFrequency: r.changeFrequency,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, abs(l, r.path)])),
          "x-default": abs(defaultLocale, r.path),
        },
      },
    })),
  );
}
