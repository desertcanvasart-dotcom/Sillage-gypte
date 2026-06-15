import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  return (
    <section className="section reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reveal">
          <p className="section-eyebrow">Traveller reviews</p>
          <h2 className="section-title" id="reviews-heading">
            What our travellers <em>say.</em>
          </h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <figure
              key={review.author}
              className={`review-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}
            >
              <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}
              </div>
              <blockquote className="review-quote">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="review-author">
                {review.author} — {review.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
