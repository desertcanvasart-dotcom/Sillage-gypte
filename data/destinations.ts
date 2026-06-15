/** Destination index (thin) — drives the /destinations cards + homepage.
 *  Full guide pages render from content/destinations/<slug>.json. Generated
 *  by scripts/build-destination-guides.mjs — exact words come from the HTML. */

import type { GradientVariant } from "./tours";

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  gradient: GradientVariant;
  heroLabel: string;
}

export const destinations: Destination[] = [
  {
    slug: "cairo",
    name: "Cairo",
    tagline: "Lower Egypt",
    description: "Not a sight but a city — vast, loud, four thousand years deep — with the Pyramids standing at the edge of it, not out in empty desert.",
    gradient: "ancient",
    heroLabel: "Cairo",
  },
  {
    slug: "luxor",
    name: "Luxor",
    tagline: "Upper Egypt",
    description: "Ancient Thebes — the densest gathering of temples and tombs on earth, split by the Nile into the city of the living and the kingdom of the dead.",
    gradient: "sunset",
    heroLabel: "Luxor",
  },
  {
    slug: "aswan",
    name: "Aswan",
    tagline: "Upper Egypt & Nubia",
    description: "Egypt's gentlest city, where the country turns Nubian — the Nile at its most beautiful, broken by granite and green islands, and the gateway to the deep south.",
    gradient: "nile",
    heroLabel: "Aswan",
  },
  {
    slug: "abu-simbel",
    name: "Abu Simbel",
    tagline: "The deep south",
    description: "Two temples cut into a cliff near the Sudanese border — and one of the boldest rescues in history, when they were lifted whole from the rising water.",
    gradient: "desert",
    heroLabel: "Abu Simbel",
  },
  {
    slug: "sharm-el-sheikh",
    name: "Sharm el-Sheikh",
    tagline: "The Sinai coast",
    description: "The tip of Sinai, where desert mountains fall to a turquoise sea — Egypt's finest reefs below the water, and the mountain of Moses behind.",
    gradient: "night",
    heroLabel: "Sharm el-Sheikh",
  },
  {
    slug: "alexandria",
    name: "Alexandria",
    tagline: "The Mediterranean coast",
    description: "Egypt turned toward the sea — Alexander's capital and Cleopatra's, where the greatest wonders are long lost to the water, and the Mediterranean itself is the reason to come.",
    gradient: "nile",
    heroLabel: "Alexandria",
  },
  {
    slug: "hurghada",
    name: "Hurghada",
    tagline: "The Red Sea coast",
    description: "Egypt's mainland Red Sea coast — warm sea the year round, coral reefs a fin-kick from shore, and the closest beach to the temples of the Nile.",
    gradient: "oasis",
    heroLabel: "Hurghada",
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);
