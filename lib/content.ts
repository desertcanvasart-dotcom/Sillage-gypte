import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "./i18n";
import { contentTokens } from "@/data/site";

/**
 * Replace {{TOKEN}} placeholders in every string of a parsed content file with
 * the fixed values from data/site.ts, so contact details and company facts are
 * written once there and never copied into content JSON. An unknown token is
 * left as-is so it shows up in review rather than rendering blank.
 */
function fillTokens(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key: string) => contentTokens[key] ?? m);
  }
  if (Array.isArray(value)) return value.map(fillTokens);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillTokens(v)]));
  }
  return value;
}

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
      return fillTokens(JSON.parse(await readFile(path.join(dir, name), "utf8"))) as T;
    } catch {
      /* try next */
    }
  }
  return null;
}
