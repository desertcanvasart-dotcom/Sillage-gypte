import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

/**
 * Explicit decisions for search + AI crawlers. We allow all major AI systems
 * (the more that can read the site, the more discoverable the brand is to
 * high-intent travellers asking AI for recommendations), block known scrapers,
 * and keep operational routes out of every index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search + AI crawlers we explicitly welcome.
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "Anthropic-AI",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/", "/studio/"],
      },
      // Block bulk SEO scrapers.
      { userAgent: ["AhrefsBot", "SemrushBot", "DotBot"], disallow: "/" },
      // Everyone else: allow the public site, keep operational routes private.
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/studio/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
