export default function TrustStrip() {
  return (
    <div className="trust-strip" role="complementary" aria-label="Trust signals">
      <div className="container">
        <div className="trust-strip-inner">
          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 1l2.39 4.845L18 6.9l-4 3.9.944 5.5L10 13.845 5.056 16.3 6 10.8 2 6.9l5.61-1.055L10 1z"
                fill="currentColor"
              />
            </svg>
            <span>
              <span className="trust-stars">★★★★★</span> Rated 4.9 on Google
            </span>
          </div>
          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 2a6 6 0 100 12A6 6 0 0010 2zM2 10a8 8 0 1116 0A8 8 0 012 10z"
                fill="currentColor"
                opacity=".3"
              />
              <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Private tours only — no shared groups</span>
          </div>
          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a2 2 0 110 4 2 2 0 010-4zm0 10.5a5.99 5.99 0 01-5-2.69C5.02 11.16 8 10.25 10 10.25s4.98.91 5 2.56a5.99 5.99 0 01-5 2.69z"
                fill="currentColor"
              />
            </svg>
            <span>Expert-led by certified Egyptologists</span>
          </div>
        </div>
      </div>
    </div>
  );
}
