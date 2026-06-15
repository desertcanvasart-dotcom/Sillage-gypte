import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "./i18n";

/**
 * Load a content JSON for a locale: tries content/<type>/<slug>.<locale>.json
 * first, falling back to the base English file. Returns null if neither exists.
 */
export async function loadContent<T = unknown>(
  type: string,
  slug: string,
  locale: Locale
): Promise<T | null> {
  const dir = path.join(process.cwd(), "content", type);
  const names = locale === "en" ? [`${slug}.json`] : [`${slug}.${locale}.json`, `${slug}.json`];
  for (const name of names) {
    try {
      return JSON.parse(await readFile(path.join(dir, name), "utf8")) as T;
    } catch {
      /* try next */
    }
  }
  return null;
}
