"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The teal site nav + footer wrap every page EXCEPT the "warm"-design detail
 * pages (a single journey or a single destination), which ship their own
 * masthead and footer. `usePathname` resolves during SSR, so the correct
 * chrome is in the very first HTML — no flash, no clash.
 */
function isWarmRoute(path: string): boolean {
  return /^\/tours\/[^/]+\/?$/.test(path) || /^\/destinations\/[^/]+\/?$/.test(path);
}

export default function SiteChrome({
  nav,
  footer,
  children,
}: {
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const path = usePathname() || "/";
  const warm = isWarmRoute(path);
  return (
    <>
      {!warm && nav}
      {children}
      {!warm && footer}
    </>
  );
}
