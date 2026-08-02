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
    instagram: "https://instagram.com/luxuriousegypt",
    facebook: "https://facebook.com/luxuriousegypt",
    youtube: "https://youtube.com/@luxuriousegypt",
  },
};

/**
 * PLACEHOLDER brand facts used to build schema.org structured data.
 * REPLACE every value here with verified details before launch — see the
 * "Brand information to gather" section of README.md. These must match
 * reality: schema that contradicts the truth can be penalised.
 */
export const brand = {
  alternateName: "Sillage Égypte — Private Journeys",
  foundingDate: "2014", // PLACEHOLDER
  founders: [
    { name: "Karim Mansour", jobTitle: "Founder & Managing Director" }, // PLACEHOLDER
  ],
  address: {
    // PLACEHOLDER — replace with the real registered office
    streetAddress: "12 Road 9, Maadi",
    addressLocality: "Cairo",
    addressRegion: "Cairo Governorate",
    postalCode: "11431",
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
    "Egyptian Travel Agents Association (ETAA)", // PLACEHOLDER
    "IATA accredited", // PLACEHOLDER
  ],
};

// Navigation lives in the components that render it — WarmMasthead and
// WarmFooter — where it is locale-aware. Keep it there; a duplicate list here
// silently drifts out of sync with what users can actually reach.
