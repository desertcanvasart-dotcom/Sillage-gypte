"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades `.reveal` elements in on scroll. Content is server-rendered and
 * visible-by-default in CSS (see `.reveal` fallback); this only adds the
 * entrance animation on the client.
 *
 * IMPORTANT: keyed to `pathname` so the observer re-attaches on every
 * client-side navigation. Without this, navigating via a <Link> would leave
 * the new page's `.reveal` elements unobserved (and therefore hidden) until a
 * full reload — the "white page until I reload" bug.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.visible)")
    );
    if (reveals.length === 0) return;

    // Respect reduced-motion, and fail safe if IntersectionObserver is missing.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      reveals.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));

    // Fail-safe: reveal anything already within the viewport on this tick, in
    // case the observer's first async callback is delayed. Below-the-fold
    // elements are left to animate in on scroll as normal.
    const revealInView = () => {
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });
    };
    const raf = window.requestAnimationFrame(revealInView);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
