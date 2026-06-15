"use client";

import { useEffect, useState } from "react";

/**
 * Floating design-token reference panel (from the original mockup).
 * NOTE: this is a design-reference artifact, not production chrome —
 * delete this component (and its use in app/page.tsx) before going live.
 */
export default function SpecPanel() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth < 600) setHidden(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`spec-panel${hidden ? " hidden" : ""}`}
      id="specPanel"
      role="complementary"
      aria-label="Design specification reference"
    >
      <div>
        <p className="spec-label">Design tokens — Sillage Égypte v1.0</p>
      </div>
      <div className="spec-chips" aria-label="Colour tokens">
        <span className="spec-chip spec-chip-teal">Primary #1A6B5A</span>
        <span className="spec-chip spec-chip-sand">Accent #C8A96E</span>
        <span className="spec-chip spec-chip-font">Cormorant Garamond + DM Sans</span>
        <span className="spec-chip spec-chip-teal">Off-White #F7F4EF</span>
        <span className="spec-chip spec-chip-teal">Night #0D1F1B</span>
      </div>
      <button
        className="spec-dismiss"
        aria-label="Dismiss specification panel"
        onClick={() => setHidden(true)}
      >
        Dismiss
      </button>
    </div>
  );
}
