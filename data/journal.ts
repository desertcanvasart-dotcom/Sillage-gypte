/** Journal (editorial). Drives /journal and /journal/[slug]. Primary SEO/GEO engine. */

import type { GradientVariant } from "./tours";

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
