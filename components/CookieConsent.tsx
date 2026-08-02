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

/** Same queue-pushing stub gtag.js reads — safe before the library loads. */
function gtag(...args: unknown[]) {
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer = w.dataLayer ?? []).push(args as unknown as IArguments);
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
