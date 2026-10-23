"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LangSwitcher from "@/components/LangSwitcher";

type NavLink = { href: string; label: string };

/**
 * Phone/tablet navigation (≤860px, where nav.main is hidden). A toggle in the
 * masthead opens a full-screen panel with the same links, the language
 * switcher and the plan CTA. Closes on route change and on Escape, and locks
 * page scroll while open.
 */
export default function MobileNav({
  links,
  plan,
  menuLabel,
  closeLabel,
}: {
  links: NavLink[];
  plan: NavLink;
  menuLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onEsc);
    document.documentElement.classList.add("mnav-lock");
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.documentElement.classList.remove("mnav-lock");
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`mnav-toggle${open ? " open" : ""}`}
        aria-expanded={open}
        aria-controls="mnav-panel"
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div id="mnav-panel" className={`mnav${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mnav-foot">
          <Link className="wbtn solid" href={plan.href} onClick={() => setOpen(false)}>
            {plan.label}
          </Link>
          <LangSwitcher />
        </div>
      </div>
    </>
  );
}
