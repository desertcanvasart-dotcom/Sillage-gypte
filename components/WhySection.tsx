import Link from "next/link";
import { ArrowRight } from "./icons";

export default function WhySection() {
  return (
    <section className="section why-section" aria-labelledby="why-heading">
      <div className="container">
        <div className="visually-hidden" id="why-heading">
          Why Sillage Égypte
        </div>

        {/* Block 1 */}
        <div className="why-grid" style={{ marginBottom: "120px" }}>
          <div className="why-image reveal">
            <div className="why-image-inner">
              <div
                className="why-image-bg why-image-bg-1"
                role="img"
                aria-label="Expert guide at an ancient Egyptian site"
              ></div>
            </div>
            <div className="why-image-accent"></div>
          </div>
          <div className="why-text reveal reveal-delay-2">
            <p className="why-number" aria-hidden="true">
              01
            </p>
            <p className="section-eyebrow">Local expertise</p>
            <h3 className="why-title">
              The knowledge
              <br />
              that <em>changes</em> what you see
            </h3>
            <p className="why-body">
              Our guides are not tour leaders with a script. They are
              Egyptologists, historians, and archaeologists who have spent
              careers here. The difference between a guided visit and an unlocked
              experience is the person standing beside you.
            </p>
            <Link href="/guides" className="btn-outline">
              Meet our guides
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Block 2 */}
        <div className="why-grid reversed" style={{ marginBottom: "120px" }}>
          <div className="why-image reveal reveal-delay-2">
            <div className="why-image-inner">
              <div
                className="why-image-bg why-image-bg-2"
                role="img"
                aria-label="Private desert camp at sunset"
              ></div>
            </div>
            <div className="why-image-accent"></div>
          </div>
          <div className="why-text reveal">
            <p className="why-number" aria-hidden="true">
              02
            </p>
            <p className="section-eyebrow">Total privacy</p>
            <h3 className="why-title">
              No groups.
              <br />
              No <em>compromise.</em>
            </h3>
            <p className="why-body">
              Every Sillage Égypte journey is private by design. Your guide, your
              pace, your interests. We do not offer shared departures. The
              experience you have is yours alone — not assembled from a fixed
              menu.
            </p>
            <Link href="/tours" className="btn-outline">
              View journeys
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Block 3 */}
        <div className="why-grid">
          <div className="why-image reveal">
            <div className="why-image-inner">
              <div
                className="why-image-bg why-image-bg-3"
                role="img"
                aria-label="Ancient temple interior at night with atmospheric lighting"
              ></div>
            </div>
            <div className="why-image-accent"></div>
          </div>
          <div className="why-text reveal reveal-delay-2">
            <p className="why-number" aria-hidden="true">
              03
            </p>
            <p className="section-eyebrow">Designed for you</p>
            <h3 className="why-title">
              Built around
              <br />
              <em>your</em> interests
            </h3>
            <p className="why-body">
              Every journey begins with a conversation. What are you curious
              about? What have you already seen? What do you want to understand
              more deeply? Your answers shape every detail of what we design for
              you. Not off-the-shelf. Never off-the-shelf.
            </p>
            <Link href="/plan" className="btn-primary">
              Plan your journey
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
