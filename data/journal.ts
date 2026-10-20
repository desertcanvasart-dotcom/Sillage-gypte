/** Journal (editorial). Drives /journal and /journal/[slug]. Primary SEO/GEO engine. */

import type { GradientVariant } from "./tours";
import { FOUNDER } from "./site";

export interface ContentBlock {
  type: "heading" | "paragraph";
  text: string;
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  dateLabel: string;
  readTime: string;
  author: string;
  gradient: GradientVariant;
  heroLabel: string;
  content: ContentBlock[];
  seo: { title: string; description: string };
  /** Bespoke posts render verbatim from content/journal/<slug>.json (full HTML
   *  design) instead of the ContentBlock template. The index card still uses the
   *  fields above. */
  bespoke?: boolean;
}

export const journal: JournalPost[] = [
  {
    slug: "six-journeys-compared",
    title: "Which Egypt itinerary is right for you? Our six private journeys, compared",
    excerpt:
      "Six private luxury journeys from four to sixteen days, from €2,190 to €11,650 per person. Which one fits your days, your season and your kind of Egypt — including which is the wrong answer for whom.",
    category: "Planning",
    date: "2026-10-20",
    dateLabel: "October 2026",
    readTime: "11 minute read",
    author: FOUNDER.name,
    gradient: "nile",
    heroLabel: "A dahabiya under sail on the Nile",
    content: [],
    bespoke: true,
    seo: {
      title: "Which Egypt Itinerary Is Right for You? Six Private Journeys Compared",
      description:
        "Six private luxury Egypt journeys from 4 to 16 days, from €2,190 to €11,650 per person. Which one fits your days, your season and your kind of Egypt, including which is the wrong answer for whom.",
    },
  },
  {
    slug: "2027-total-solar-eclipse-luxor-dahabiya",
    title: "The 2027 total solar eclipse from a private dahabiya",
    excerpt:
      "The moon has fixed the date, the hour and the six minutes. This is how to be standing on a private dahabiya on the Nile at Luxor when they arrive.",
    category: "Planning",
    date: "2026-10-20",
    dateLabel: "October 2026",
    readTime: "13 minute read",
    author: FOUNDER.name,
    gradient: "night",
    heroLabel: "The sun's corona during totality",
    content: [],
    bespoke: true,
    seo: {
      title: "2027 Total Solar Eclipse in Egypt: From a Private Dahabiya in Luxor",
      description:
        "On 2 August 2027 a total solar eclipse crosses Luxor for about six minutes and twenty-two seconds. How to watch it from a private dahabiya, with the real times, the heat, and the booking window.",
    },
  },
  {
    slug: "christmas-and-new-year-in-egypt",
    title: "A luxury Christmas and New Year in Egypt",
    excerpt:
      "Securing the best boats and suites — what the festive weeks are really like, where to spend 25 and 31 December, and what sells out first.",
    category: "Planning",
    date: "2026-09-29",
    dateLabel: "September 2026",
    readTime: "16 minute read",
    author: FOUNDER.name,
    gradient: "nile",
    heroLabel: "Camels resting before the Pyramids of Giza",
    content: [],
    bespoke: true,
    seo: {
      title: "Luxury Christmas & New Year in Egypt: Boats & Suites",
      description:
        "Christmas and New Year in Egypt: weather, crowds, where to spend 25 and 31 December, Coptic Christmas, and how to secure the best dahabiyas and suites.",
    },
  },
  {
    slug: "when-to-go-to-egypt",
    title: "When to go to Egypt",
    excerpt:
      "The short answer is winter. The longer answer is the useful one — because the right month depends on where you're going, and what you'll forgive.",
    category: "Planning",
    date: "2026-06-12",
    dateLabel: "June 2026",
    readTime: "5 minute read",
    author: "Sillage Égypte",
    gradient: "nile",
    heroLabel: "The Nile in winter light",
    content: [],
    bespoke: true,
    seo: {
      title: "When to go to Egypt — The Journal",
      description:
        "The short answer is winter. The longer, more useful answer depends on where you're going and what you'll forgive — Egypt season by season, honestly.",
    },
  },
  {
    slug: "a-morning-on-the-west-bank",
    title: "A morning on the west bank",
    excerpt:
      "The best hours at Thebes are the ones before the heat, and before everyone else — a dawn among the royal tombs, while the river is still grey.",
    category: "First light",
    date: "2026-06-10",
    dateLabel: "June 2026",
    readTime: "4 minute read",
    author: "Sillage Égypte",
    gradient: "sunset",
    heroLabel: "The Theban hills at first light",
    content: [],
    bespoke: true,
    seo: {
      title: "A morning on the west bank — The Journal",
      description:
        "The best hours at Thebes are the ones before the heat, and before everyone else — a dawn among the royal tombs, while the river is still grey.",
    },
  },
  {
    slug: "why-we-will-sometimes-talk-you-out-of-a-trip",
    title: "Why we'll sometimes talk you out of a trip",
    excerpt:
      "Honest advice is the most valuable thing a travel company can give you — even, and especially, when it costs us the booking.",
    category: "On how we work",
    date: "2026-06-08",
    dateLabel: "June 2026",
    readTime: "4 minute read",
    author: "Sillage Égypte",
    gradient: "ancient",
    heroLabel: "A quiet conversation about a journey",
    content: [],
    bespoke: true,
    seo: {
      title: "Why we'll sometimes talk you out of a trip — The Journal",
      description:
        "Honest advice is the most valuable thing a travel company can give you — even, and especially, when it costs us the booking.",
    },
  },
];

export const getPost = (slug: string) => journal.find((p) => p.slug === slug);
// Newest first, by date string (ISO sorts lexically).
export const sortedJournal = [...journal].sort((a, b) =>
  a.date < b.date ? 1 : -1
);
