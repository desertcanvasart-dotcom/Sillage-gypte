"use client";

/**
 * Footer link the privacy policy promises: clears the stored consent choice
 * and reloads, so the consent banner shows again (and gtag re-reads the
 * cleared choice as denied-by-default).
 */
export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="cookie-settings"
      onClick={() => {
        try {
          localStorage.removeItem("sillage-consent");
        } catch {}
        window.location.reload();
      }}
    >
      {label}
    </button>
  );
}
