import Link from "next/link";
import { ArrowRight } from "./icons";

export default function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="cta-heading">
      <div className="container">
        <p className="section-eyebrow reveal">Begin the conversation</p>
        <h2 className="section-title reveal reveal-delay-1" id="cta-heading">
          Every journey begins
          <br />
          with a <em>conversation.</em>
        </h2>
        <p className="section-body section-body-wide reveal reveal-delay-2">
          Tell us what you&rsquo;re looking for. What draws you to Egypt. What you
          want to understand more deeply. We&rsquo;ll design the rest.
        </p>
        <div className="reveal reveal-delay-3">
          <Link href="/plan" className="final-cta-btn">
            Plan Your Journey
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
