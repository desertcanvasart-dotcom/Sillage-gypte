"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Cookie consent banner (Google Consent Mode v2).
 *
 * gtag starts with analytics_storage denied (see app/layout.tsx); this
 * banner records the visitor's choice and lifts the default only after an
 * explicit accept. The choice is remembered in localStorage, so the banner
 * shows once. Declining keeps consent denied — GA then sends only
 * cookieless pings.
 */

const STORAGE_KEY = "sillage-consent";

/**
 * Same queue-pushing stub gtag.js reads — safe before the library loads.
 *
 * The command must reach dataLayer as an `arguments` object, exactly as the
 * canonical snippet in app/layout.tsx pushes it. gtag.js ignores a plain
 * array, so pushing `args` silently dropped every command made from here.
 */
function gtag(...args: unknown[]) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  // Prefer the real gtag once the library has defined it.
  if (typeof w.gtag === "function") {
    w.gtag(...args);
    return;
  }
  // eslint-disable-next-line prefer-rest-params
  (w.dataLayer = w.dataLayer ?? []).push(arguments);
}

export default function CookieConsent({
  message,
  accept,
  decline,
  privacyLabel,
  privacyHref,
}: {
  message: string;
  accept: string;
  decline: string;
  privacyLabel: string;
  privacyHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Returning visitors' stored choice is applied by the gtag init script
    // in app/layout.tsx (as the consent default, before gtag('js')), so the
    // banner only needs to show when no choice has been made yet.
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "granted" && stored !== "denied") {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    if (granted) {
      gtag("consent", "update", { analytics_storage: "granted" });
      // The page_view for this page already went out under the denied default,
      // as a cookieless ping that never reaches Realtime or the standard
      // reports, and updating consent does not resend it — so a visitor who
      // accepts and then leaves without navigating goes unrecorded entirely.
      //
      // Reloading is the reliable way to recover that view: the init script in
      // app/layout.tsx re-reads the stored choice, sets the consent default to
      // granted before gtag('config'), and the page is counted normally. A
      // gtag('event','page_view') here is accepted into dataLayer but gtag
      // never turns it into a request, so the view stays lost.
      window.location.reload();
      return;
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="wconsent" role="region" aria-label={privacyLabel}>
      <p>
        {message} <Link href={privacyHref}>{privacyLabel}</Link>
      </p>
      <div className="acts">
        <button type="button" className="ghost" onClick={() => choose(false)}>
          {decline}
        </button>
        <button type="button" className="solid" onClick={() => choose(true)}>
          {accept}
        </button>
      </div>
    </div>
  );
}
