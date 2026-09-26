/**
 * JSON-LD structured data for SEO + GEO (Generative Engine Optimization).
 * Everything is built from the data layer (data/site, data/faq, data/reviews)
 * so the schema always matches the visible content. Entities are linked by
 * `@id` into a single knowledge graph rather than isolated islands.
 */

import { site, brand } from "@/data/site";
import { faqs } from "@/data/faq";
import { reviews, aggregateRating } from "@/data/reviews";

export const SITE_URL = site.url;

/** Stable @id anchors for the core entities. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** A lightweight reference any page-level schema can use as provider/publisher. */
export const orgRef = { "@id": ORG_ID };

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": ORG_ID,
  name: site.name,
  alternateName: brand.alternateName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Sillage Égypte is a private tour operator offering bespoke Nile journeys, desert expeditions, and cultural experiences across Egypt for international travellers.",
  legalName: brand.legalName,
  // Omit rather than emit an empty value for anything not yet verified.
  ...(brand.foundingDate ? { foundingDate: brand.foundingDate } : {}),
  founder: brand.founders.map((f) => ({
    "@type": "Person",
    name: f.name,
    jobTitle: f.jobTitle,
  })),
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address.streetAddress,
    addressLocality: brand.address.addressLocality,
    addressRegion: brand.address.addressRegion,
    ...(brand.address.postalCode ? { postalCode: brand.address.postalCode } : {}),
    addressCountry: brand.address.addressCountry,
  },
  telephone: site.phoneDisplay,
  email: site.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer service",
    email: site.email,
    telephone: site.phoneDisplay,
    availableLanguage: ["English", "Arabic", "French", "Japanese"],
  },
  sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  knowsAbout: brand.knowsAbout,
  knowsLanguage: ["en", "ar", "fr", "ja"],
  areaServed: brand.areaServed.map((name) => ({ "@type": "Place", name })),
  memberOf: brand.memberships.map((m) => ({
    "@type": "Organization",
    name: m.name,
    ...(m.identifier ? { identifier: m.identifier } : {}),
  })),
  priceRange: brand.priceRange,
  // Ratings and reviews are claimed only when real ones exist. Asserting them
  // otherwise is against Google's structured-data policy, and review stars are
  // exactly what it shows in results — see data/reviews.ts.
  ...(aggregateRating
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
          bestRating: aggregateRating.bestRating,
        },
      }
    : {}),
  ...(reviews.length
    ? {
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          datePublished: r.datePublished,
          reviewBody: r.quote,
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
          },
        })),
      }
    : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: site.name,
  url: SITE_URL,
  inLanguage: "en",
  publisher: orgRef,
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export interface Crumb {
  label: string;
  href?: string;
}

/** Build a BreadcrumbList from a page's breadcrumb trail. */
export function buildBreadcrumb(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };
}
