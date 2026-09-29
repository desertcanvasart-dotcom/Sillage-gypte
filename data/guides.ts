/** Guides. Drives /guides and /guides/[slug]. */

import type { GradientVariant } from "./tours";

export interface Guide {
  slug: string;
  initials: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  credentials: string[];
  languages: string[];
  specialisms: string[];
  gradient: GradientVariant;
  featured: boolean;
  /** Biography and photo not yet supplied: pages show only name and title. */
  profilePending?: boolean;
}

export const guides: Guide[] = [
  {
    slug: "azmi-salama",
    initials: "AS",
    name: "Dr. Azmi Salama",
    title: "Egyptologist",
    // Biography, credentials, languages and photo to follow — left empty rather than guessed.
    shortBio: "",
    fullBio: "",
    credentials: [],
    languages: [],
    specialisms: [],
    gradient: "oasis",
    featured: true,
    profilePending: true,
  },
  {
    slug: "sara-hassan",
    initials: "SH",
    name: "Sara Hassan",
    title: "Cultural Historian & Desert Guide",
    shortBio:
      "MA in Islamic Art & Architecture. Expert in Fatimid Cairo, Coptic heritage, and desert oasis culture. Fluent in English, Arabic, French, and Japanese. Guide of choice for discerning Japanese travellers.",
    fullBio:
      "Sara's expertise runs from the mosques and madrasas of Fatimid Cairo to the salt lakes of Siwa. She trained as an art historian and brings that eye to everything — the geometry of a carved screen, the colour of a Coptic icon, the weave of a Siwan shawl. Her four languages and quiet warmth have made her the requested guide of travellers from Tokyo to Paris.",
    credentials: [
      "MA in Islamic Art & Architecture",
      "Specialist in Fatimid and Coptic Cairo",
      "Fifteen years guiding private travellers",
    ],
    languages: ["English", "Arabic", "French", "Japanese"],
    specialisms: ["Islamic Cairo", "Coptic heritage", "Oasis culture"],
    gradient: "sunset",
    featured: true,
  },
  {
    slug: "mostafa-ramzy",
    initials: "MR",
    name: "Dr. Mostafa Ramzy",
    title: "Egyptologist — Aswan & the South",
    shortBio:
      "Aswan-born Egyptologist specialising in Nubian history and the temples of the far south. Twenty years guiding Lake Nasser and Abu Simbel.",
    fullBio:
      "Mostafa was born within sight of the Nile at Aswan and has spent his career studying the south — the Nubian monuments, the rescue of the Lake Nasser temples, and the culture of the people displaced by the High Dam. He guides with the particular authority of someone explaining his own homeland, and leads our Nubia and southern journeys.",
    credentials: [
      "PhD in Egyptology, focus on Nubian studies",
      "Twenty years guiding Aswan and Abu Simbel",
      "Native of the Aswan region",
    ],
    languages: ["English", "Arabic", "Italian"],
    specialisms: ["Nubian history", "Abu Simbel", "Lake Nasser temples"],
    gradient: "ancient",
    featured: true,
  },
  {
    slug: "hany-abdel-latif",
    initials: "HA",
    name: "Hany Abdel-Latif",
    title: "Desert Expedition Guide",
    shortBio:
      "Bedouin guide and naturalist who has crossed the Western Desert and Sinai for over twenty-five years. Reads the dunes the way others read a map.",
    fullBio:
      "Hany grew up in the desert and has guided expeditions across the White Desert, Siwa, and the mountains of Sinai for more than twenty-five years. He knows where the water is, where the silence is deepest, and how to set a camp that feels like the most comfortable place on earth. He leads our desert and Sinai expeditions, and our travellers rarely stop talking about him.",
    credentials: [
      "Twenty-five years of desert and Sinai expeditions",
      "Trained in desert safety and navigation",
      "Specialist in Bedouin culture and ecology",
    ],
    languages: ["English", "Arabic"],
    specialisms: ["The White Desert", "Siwa", "Sinai"],
    gradient: "night",
    featured: false,
  },
  {
    slug: "farida-naguib",
    initials: "FN",
    name: "Farida Naguib",
    title: "Cultural Historian — Cairo",
    shortBio:
      "Historian of modern and medieval Cairo. Brings the living city — its markets, music, and architecture — into focus alongside the ancient.",
    fullBio:
      "Farida's Cairo is not only the museum and the pyramids; it is the coffee houses of Downtown, the workshops of the old city, and the layered history of a metropolis that has been many cities at once. She holds a degree in urban history and guides our travellers through Cairo as a place that is still being written, not only excavated.",
    credentials: [
      "MA in Urban History",
      "Specialist in medieval and modern Cairo",
      "Ten years guiding cultural journeys",
    ],
    languages: ["English", "Arabic", "French"],
    specialisms: ["Modern Cairo", "Architecture", "Markets & craft"],
    gradient: "nile",
    featured: false,
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const featuredGuides = guides.filter((g) => g.featured);
