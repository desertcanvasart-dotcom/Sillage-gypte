import Link from "next/link";
import { ArrowRight } from "./icons";

/**
 * The teal closing call-to-action band (same treatment as the homepage
 * final CTA), reusable across pages with configurable copy.
 */
export default function CtaBand({
  eyebrow = "Begin the conversation",
  title,
  body,
  ctaLabel = "Plan Your Journey",
  ctaHref = "/plan",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="final-cta" aria-labelledby="cta-band-heading">
      <div className="container">
        <p className="section-eyebrow reveal">{eyebrow}</p>
        <h2 className="section-title reveal reveal-delay-1" id="cta-band-heading">
          {title}
        </h2>
        <p className="section-body section-body-wide reveal reveal-delay-2">{body}</p>
        <div className="reveal reveal-delay-3">
          <Link href={ctaHref} className="final-cta-btn">
            {ctaLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
