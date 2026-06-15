import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main>
      <section className="notfound">
        <div className="page-hero-bg media-grad--ancient" aria-hidden="true" />
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="notfound-inner">
          <h1>404</h1>
          <p>This path leads nowhere — much of Egypt is like that. Let&rsquo;s get you back.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="hero-cta">
              Return home
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/tours"
              className="btn-outline"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.25)" }}
            >
              See our journeys
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
