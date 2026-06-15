/** Traveller reviews. Drives the homepage reviews section AND its Review /
 *  AggregateRating structured data, so the two never drift apart. */

export interface Review {
  author: string;
  location: string;
  rating: number;
  quote: string;
  datePublished: string; // ISO
}

// PLACEHOLDER aggregate — replace with verified totals from your review source.
export const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: 127,
  bestRating: 5,
};

export const reviews: Review[] = [
  {
    author: "James & Caroline M.",
    location: "United Kingdom",
    rating: 5,
    datePublished: "2026-03-18",
    quote:
      "The depth of knowledge our guide brought to each site completely changed how we understood Egypt. Not a tour — a masterclass.",
  },
  {
    author: "Hiroshi T.",
    location: "Japan",
    rating: 5,
    datePublished: "2026-02-02",
    quote:
      "We've done many private tours around the world. This was different. Every detail, from the first email to the last morning, felt considered.",
  },
  {
    author: "Maria & Thomas K.",
    location: "Germany",
    rating: 5,
    datePublished: "2026-01-15",
    quote:
      "We asked for something nobody else would show us. They found it. The White Desert at 3am, under a full moon, completely alone.",
  },
];
