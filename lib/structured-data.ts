/**
 * JSON-LD structured data for SEO + GEO (Generative Engine Optimization).
 * Everything is built from the data layer (data/site, data/faq)
 * so the schema always matches the visible content. Entities are linked by
 * `@id` into a single knowledge graph rather than isolated islands.
 */

import { site, brand, PHONE_E164, EMAIL, FOUNDER } from "@/data/site";
import { faqs } from "@/data/faq";

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
    `${site.name} is a private tour operator offering bespoke Nile journeys, desert expeditions, and cultural experiences across Egypt for international travellers.`,
  legalName: brand.legalName,
  // Omit rather than emit an empty value for anything not yet verified.
  ...(brand.foundingDate ? { foundingDate: brand.foundingDate } : {}),
  founder: { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.jobTitle },
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address.streetAddress,
    addressLocality: brand.address.addressLocality,
    addressRegion: brand.address.addressRegion,
    ...(brand.address.postalCode ? { postalCode: brand.address.postalCode } : {}),
    addressCountry: brand.address.addressCountry,
  },
  telephone: PHONE_E164,
  email: EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer service",
    email: EMAIL,
    telephone: PHONE_E164,
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
  // No aggregateRating or review: the site publishes no verified reviews.
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
