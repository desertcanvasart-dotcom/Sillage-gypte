"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "nl", label: "Nederlands" },
  { code: "de", label: "Deutsch" },
] as const;
const PREFIXED = ["es", "fr", "nl", "de"];

/**
 * Language dropdown. Uses real <a> navigation (not next/link) so switching
 * locale always re-runs middleware and renders the new language on one click —
 * client-side navigation would serve the router-cached same-route version.
 */
export default function LangSwitcher() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  let current = "en";
  let bare = pathname;
  for (const l of PREFIXED) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      current = l;
      bare = pathname.slice(l.length + 1) || "/";
      break;
    }
  }
  const hrefFor = (code: string) =>
    code === "en" ? bare || "/" : bare === "/" ? `/${code}` : `/${code}${bare}`;

  return (
    <div className={`langswitch${open ? " open" : ""}`} ref={ref}>
      <button
        type="button"
        className="langswitch-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose language"
        onClick={() => setOpen((o) => !o)}
      >
        {current.toUpperCase()}
        <span className="langswitch-chev" aria-hidden="true">▾</span>
      </button>
      <ul className="langswitch-menu" role="listbox">
        {LANGS.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === current}>
            {/* plain <a> = full navigation so the new locale renders immediately */}
            <a href={hrefFor(l.code)} className={l.code === current ? "on" : ""}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
