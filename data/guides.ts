/** Guides. Drives /guides and /guides/[slug]. */

import type { GradientVariant } from "./tours";

export interface Guide {
  slug: string;
  initials: string;
  name: string;
  title: string;
  shortBio: string;
  /** Paragraphs separated by a blank line. */
  fullBio: string;
  credentials: string[];
  languages: string[];
  specialisms: string[];
  gradient: GradientVariant;
  featured: boolean;
  /** Portrait key in data/image-manifest.json. */
  photo?: string;
  /** Biography and photo not yet supplied: pages show only name and title. */
  profilePending?: boolean;
}

export const guides: Guide[] = [
  {
    slug: "azmy-salama",
    initials: "AS",
    name: "Dr. Azmy Salama",
    title: "Egyptologist, Archaeologist & Private Guide",
    photo: "guide-azmy-salama",
    shortBio:
      "Egyptian Egyptologist and archaeologist with a particularly deep connection to Saqqara, the Memphite necropolis and the world of the Old Kingdom.",
    fullBio: [
      "Dr. Azmy Salama is an Egyptian Egyptologist and archaeologist whose relationship with ancient Egypt extends far beyond the monuments themselves. His academic work and field experience have given him a particularly deep connection with the archaeology of Saqqara, the Memphite necropolis, and the world of the Old Kingdom.",
      "For Sillage Égypte, what makes Azmy exceptional is not simply the depth of his knowledge, but the way he shares it. A visit with him feels less like a guided tour and more like spending the day with a scholar who knows how to make archaeology human. He moves naturally between history, belief, architecture, daily life and the stories revealed by tombs, reliefs and inscriptions, allowing each site to unfold gradually rather than reducing it to a list of facts.",
      "His familiarity with places such as Saqqara, Memphis, Dahshur and Giza makes him especially suited to travellers who want to look beyond the famous highlights and understand how these landscapes developed, how archaeologists interpret them, and what they reveal about the people who once lived around them.",
      "Thoughtful, engaging and deeply rooted in his subject, Azmy is the kind of guide we choose for travellers who are genuinely curious about Egypt and want their journey to feel personal, intelligent and authentic.",
    ].join("\n\n"),
    // Not yet supplied — left empty rather than guessed; the page hides empty sections.
    credentials: [],
    languages: [],
    specialisms: ["Saqqara", "Memphis", "Dahshur", "Giza", "The Old Kingdom"],
    gradient: "oasis",
    featured: true,
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
    slug: "mohamed-sayed-elhelw",
    initials: "MS",
    name: "Mohamed Sayed Elhelw",
    title: "Spanish-speaking Tour Guide",
    shortBio: "Egyptian tour guide with more than 26 years of experience organising tours and accompanying Spanish-speaking travellers through Egypt.",
    fullBio: "Mohamed has spent more than 26 years organising tours and accompanying Spanish-speaking travellers through Egypt. His knowledge of the country’s history, archaeology and culture brings context to each visit and reveals the connections between ancient Egypt and life today.\n\nWith him, every place becomes an opportunity to understand the country more deeply and see it from a new perspective.",
    credentials: [
      "More than 26 years of guiding experience"
    ],
    specialisms: [
      "Egyptian history",
      "Archaeology",
      "Egyptian culture"
    ],
    languages: [
      "Spanish"
    ],
    gradient: "ancient",
    featured: false,
    photo: "guide-mohamed-sayed-elhelw"
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
