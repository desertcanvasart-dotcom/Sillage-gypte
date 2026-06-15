"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav } from "@/data/site";

const LINKS = primaryNav;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav${scrolled ? " scrolled" : ""}`}
      id="mainNav"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="nav-inner">
          <div className="nav-side nav-side--left">
            <Link href="/" className="nav-logo" aria-label="Sillage Égypte — home">
              Sillage Égypte
            </Link>
          </div>

          <ul className="nav-links" role="list">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-side nav-side--right">
            <Link
              href="/plan"
              className="nav-cta"
              aria-label="Plan your journey with Sillage Égypte"
            >
              Plan Your Journey
            </Link>
            <button
              className="nav-mobile-toggle"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
