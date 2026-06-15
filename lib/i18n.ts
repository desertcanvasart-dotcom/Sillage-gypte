import { headers } from "next/headers";

export const locales = ["en", "es", "fr", "nl", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
/** Locales that carry a URL prefix (English is unprefixed at the root). */
export const prefixedLocales = ["es", "fr", "nl", "de"] as const;

/** The active request locale, set by middleware via the x-locale header. */
export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const l = h.get("x-locale");
  return l === "es" || l === "fr" || l === "nl" || l === "de" ? l : "en";
}

/** Prefix an internal path for a locale (English = no prefix, else /<locale>). */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
