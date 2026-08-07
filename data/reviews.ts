/** Traveller reviews. Drive the reviews section AND its Review /
 *  AggregateRating structured data, so the two never drift apart. */

export interface Review {
  author: string;
  location: string;
  rating: number;
  quote: string;
  datePublished: string; // ISO
}

/**
 * Verified totals from the review source, or null while there are none.
 * An invented rating is against Google's structured-data policy and is the
 * figure shown as review stars in results, so this stays null until the
 * numbers are real. The schema omits AggregateRating entirely while it is.
 */
export const aggregateRating: {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
} | null = null;

/**
 * Empty until real, attributable traveller reviews are available. The ones
 * that were here were invented, and they only ever reached Google as Review
 * schema — no page renders them.
 */
export const reviews: Review[] = [];
