import Link from "next/link";
import { ArrowRight } from "./icons";

const PARTICLES = [
  { left: "15%", top: "30%", dur: "9s", delay: "0s", dx: "12px" },
  { left: "30%", top: "60%", dur: "11s", delay: "2s", dx: "-8px" },
  { left: "55%", top: "20%", dur: "8s", delay: "1s", dx: "15px" },
  { left: "70%", top: "50%", dur: "13s", delay: "3s", dx: "-12px" },
  { left: "82%", top: "35%", dur: "10s", delay: "0.5s", dx: "6px" },
  { left: "45%", top: "75%", dur: "12s", delay: "4s", dx: "-10px" },
  { left: "8%", top: "65%", dur: "7s", delay: "2.5s", dx: "18px" },
  { left: "92%", top: "55%", dur: "14s", delay: "1.5s", dx: "-7px" },
];

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-video-wrap">
        <div
          className="hero-video-placeholder"
          role="img"
          aria-label="Nile at sunrise — aerial view"
        >
          {/* Production: replace with looping video element */}
          <div className="hero-particles" aria-hidden="true">
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="particle"
                style={
                  {
                    left: p.left,
                    top: p.top,
                    "--dur": p.dur,
                    "--delay": p.delay,
                    "--dx": p.dx,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-content">
        <span className="hero-eyebrow">Private journeys across Egypt</span>
        <h1 className="hero-title">
          Egypt, on
          <br />
          <em>your own terms.</em>
        </h1>
        <p className="hero-subtitle">
          Private journeys designed around you, guided by experts who know every
          layer of this country.
        </p>
        <Link href="/plan" className="hero-cta">
          Plan Your Journey
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line"></div>
        <span>Discover</span>
      </div>
    </section>
  );
}
