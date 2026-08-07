/**
 * Site-wide content: brand, contact, navigation, social.
 * Single source of truth — the future dashboard will edit this.
 */

export const site = {
  name: "Sillage Égypte",
  tagline: "Private journeys across Egypt",
  description:
    "Private journeys designed around you, guided by experts who know every layer of this country.",
  url: "https://sillage-egypte.com",
  email: "hello@sillage-egypte.com",
  phoneDisplay: "+20 109 847 1928",
  phoneHref: "+201098471928",
  whatsappDisplay: "WhatsApp enquiries welcome",
  whatsappHref: "https://wa.me/201098471928",
  responsePromise: "A journey designer replies within 24 hours.",
  social: {
    instagram: "https://instagram.com/sillage-egypte",
    facebook: "https://facebook.com/sillage-egypte",
    youtube: "https://youtube.com/@sillage-egypte",
  },
};

/**
 * Verified brand facts used to build schema.org structured data. These must
 * match reality: schema that contradicts the truth can be penalised, so add a
 * value here only once it is confirmed. Anything still unknown is left out
 * rather than guessed — the schema omits absent fields.
 */
export const brand = {
  alternateName: "Sillage Égypte — Private Journeys",
  /** The operating company; Sillage Égypte is its trading name. */
  legalName: "Capital Travel Services",
  foundingDate: "2010",
  founders: [{ name: "Islam Hussein", jobTitle: "Founder" }],
  address: {
    streetAddress: "1 Farouk Mahmoud St",
    addressLocality: "Giza",
    addressRegion: "Cairo",
    /** Unknown — supply the real postcode to publish it. */
    postalCode: undefined as string | undefined,
    addressCountry: "EG",
  },
  priceRange: "$$$$",
  knowsAbout: [
    "Private Egypt tours",
    "Nile river journeys",
    "Egyptology",
    "Luxury travel",
    "White Desert expeditions",
    "Ancient Egyptian history",
    "Bespoke itinerary design",
  ],
  areaServed: ["Egypt", "Cairo", "Luxor", "Aswan", "Sinai", "Western Desert"],
  memberships: [
    "Egyptian Travel Agents Association (ETAA) — 2179",
    "IATA accredited",
  ],
};

// Navigation lives in the components that render it — WarmMasthead and
// WarmFooter — where it is locale-aware. Keep it there; a duplicate list here
// silently drifts out of sync with what users can actually reach.
