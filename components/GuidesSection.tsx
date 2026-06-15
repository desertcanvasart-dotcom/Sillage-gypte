import Link from "next/link";
import { ArrowRight } from "./icons";
import { guides } from "@/data/guides";

const HOME_GUIDES = guides.slice(0, 2);

export default function GuidesSection() {
  return (
    <section className="guides-section" aria-labelledby="guides-heading">
      <div className="container">
        <div className="guides-header reveal">
          <p className="section-eyebrow">The team</p>
          <h2 className="section-title" id="guides-heading">
            Guided by people
            <br />
            who <em>love</em> Egypt.
          </h2>
        </div>
        <div className="guides-grid">
          {HOME_GUIDES.map((guide, i) => (
            <div
              key={guide.slug}
              className={`guide-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}
            >
              <div className="guide-avatar" aria-hidden="true">
                {guide.initials}
              </div>
              <p className="guide-name">{guide.name}</p>
              <p className="guide-title">{guide.title}</p>
              <p className="guide-bio">{guide.shortBio}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }} className="reveal reveal-delay-2">
          <Link
            href="/guides"
            className="btn-outline"
            style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}
          >
            Meet all guides
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
