/**
 * Site-wide content: brand, contact, navigation, social.
 * Single source of truth — the future dashboard will edit this.
 *
 * The fixed business facts below are each defined ONCE. Everything else —
 * components, schema, and the HTML in content/*.json (via {{TOKENS}}, see
 * `contentTokens` and lib/content.ts) — references them, so a change here
 * reaches every page.
 */

export const BRAND_NAME = "Sillage Égypte";
export const OPERATOR_NAME = "Capital Travel Service";
export const ETAA_NUMBER = "2179";
export const MOT_LICENCE_NUMBER = "2197";
export const FOUNDED_YEAR = "2003";
export const FOUNDER = { name: "Islam Hussein", jobTitle: "Executive Director" };
export const EMAIL = "hello@sillage-egypte.com";
/** One number for phone and WhatsApp. */
export const PHONE_DISPLAY = "+20 101 360 0484";
/** E.164, for tel: links and schema. */
export const PHONE_E164 = "+201013600484";
export const WHATSAPP_URL = "https://wa.me/201013600484";
export const ADDRESS = {
  street: "1 Farouk Mahmoud St",
  locality: "Giza",
  region: "Cairo",
  country: "Egypt",
  countryCode: "EG",
};
/** "1 Farouk Mahmoud St, Giza, Cairo" — the country is added per locale. */
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region}`;
/** "1 Farouk Mahmoud St, Giza, Cairo, Egypt" */
export const ADDRESS_FULL = `${ADDRESS_LINE}, ${ADDRESS.country}`;
/** Shown in the shared footer on every page. `prefix` is localised there. */
export const operatorLine = (prefix = "Operated by") =>
  `${prefix} ${OPERATOR_NAME} · ETAA ${ETAA_NUMBER} · ${ADDRESS.locality}`;

/**
 * Placeholders the content JSON may use; lib/content.ts replaces them on load
 * so the fixed values above are never copied into content files.
 */
export const contentTokens: Record<string, string> = {
  BRAND_NAME,
  OPERATOR_NAME,
  ETAA_NUMBER,
  MOT_LICENCE_NUMBER,
  FOUNDED_YEAR,
  FOUNDER_NAME: FOUNDER.name,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_URL,
  WHATSAPP_NUMBER: WHATSAPP_URL.replace("https://wa.me/", ""),
  ADDRESS_LINE,
};

export const site = {
  name: BRAND_NAME,
  tagline: "Private journeys across Egypt",
  description:
    "Private journeys designed around you, guided by experts who know every layer of this country.",
  url: "https://sillage-egypte.com",
  email: EMAIL,
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: PHONE_E164,
  whatsappDisplay: "WhatsApp enquiries welcome",
  whatsappHref: WHATSAPP_URL,
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
  legalName: OPERATOR_NAME,
  foundingDate: FOUNDED_YEAR,
  address: {
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    /** Unknown — supply the real postcode to publish it. */
    postalCode: undefined as string | undefined,
    addressCountry: ADDRESS.countryCode,
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
    {
      name: "Egyptian Travel Agents Association (ETAA)",
      identifier: ETAA_NUMBER as string | undefined,
    },
    { name: "IATA accredited", identifier: undefined as string | undefined },
  ],
};

/** The licensed operator behind Sillage Égypte (footer, contact page, schema). */
export const operator = {
  name: OPERATOR_NAME,
  etaa: ETAA_NUMBER,
  address: ADDRESS_LINE,
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: PHONE_E164,
  motLicence: MOT_LICENCE_NUMBER as string | undefined,
};

// Navigation lives in the components that render it — WarmMasthead and
// WarmFooter — where it is locale-aware. Keep it there; a duplicate list here
// silently drifts out of sync with what users can actually reach.
