#!/usr/bin/env node
/**
 * Verify the trust and metadata fixes against a running build.
 *
 *   npm run build && npx next start -p 3100
 *   node scripts/verify-trust-fixes.mjs http://localhost:3100 > docs/trust-fixes/verify.txt
 *
 * The route list comes from the site's own sitemap.xml, so every locale URL
 * the sitemap declares is checked. The sitemap itself is checked for
 * completeness against the pages found in the data files.
 *
 * Environment:
 *   PHONE_DECISION=REPLACE     also fail on any appearance of a retired phone number
 *                              (+20 109 847 1928 or +20 115 801 1600; always pass this now)
 *   REMOVED_URLS="/a,/b"       locale-neutral paths that must now 301 (all locales)
 */

const BASE = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const SITE = "https://sillage-egypte.com";
const LOCALES = ["en", "es", "fr", "nl", "de"];
const HREFLANGS = [...LOCALES, "x-default"];
const OPERATOR_LINE = /Capital Travel Service · ETAA 2179 · Giza/;
// Both retired numbers; the site's number is +20 101 360 0484 (data/site.ts).
const OLD_PHONE = /\+?20 ?109 ?847 ?1928|201098471928|\+?20 ?115 ?801 ?1600|201158011600/;
const OLD_ADDRESS = /Panorama Pyramids|El-Ahramat/;
const REPLACE_PHONE = (process.env.PHONE_DECISION || "").toUpperCase() === "REPLACE";
const REMOVED = (process.env.REMOVED_URLS || "").split(",").map((s) => s.trim()).filter(Boolean);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : undefined;
}

function metaContent(head, key, keyAttr = "name") {
  const re = new RegExp(`<meta[^>]*${keyAttr}="${key}"[^>]*>`, "i");
  const tag = head.match(re)?.[0];
  return tag ? attr(tag, "content") : undefined;
}

const toLocal = (url) => url.replace(SITE, BASE);

async function main() {
  const lines = [];
  const log = (s = "") => lines.push(s);
  let failures = 0;
  const fail = (url, msg) => {
    failures++;
    log(`  FAIL ${url}: ${msg}`);
  };

  log(`verify-trust-fixes · ${new Date().toISOString()}`);
  log(`base: ${BASE}`);
  log(`old-phone check: ${REPLACE_PHONE ? "ON (PHONE_DECISION=REPLACE)" : "off (PHONE_DECISION not REPLACE)"}`);
  log();

  // ── Sitemap ──────────────────────────────────────────────────────────
  const smRes = await fetch(`${BASE}/sitemap.xml`);
  const sm = await smRes.text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const smAlternates = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  log(`sitemap.xml: HTTP ${smRes.status}, ${urls.length} URLs`);
  const neutral = new Set(
    urls.map((u) => u.replace(SITE, "").replace(/^\/(es|fr|nl|de)(?=\/|$)/, "") || "/"),
  );
  for (const p of neutral) {
    for (const l of LOCALES) {
      const u = `${SITE}${l === "en" ? (p === "/" ? "" : p) : `/${l}${p === "/" ? "" : p}`}`;
      if (!urls.includes(u)) fail("sitemap", `missing ${u}`);
    }
  }
  const smMissingAlt = smAlternates.filter(
    (b) => !HREFLANGS.every((h) => b.includes(`hreflang="${h}"`)),
  ).length;
  if (smMissingAlt) fail("sitemap", `${smMissingAlt} entries lack a full hreflang set`);
  for (const r of REMOVED) {
    if (neutral.has(r)) fail("sitemap", `removed path still listed: ${r}`);
  }
  log(`sitemap: ${neutral.size} pages × ${LOCALES.length} locales, hreflang alternates ${smMissingAlt ? "INCOMPLETE" : "complete"}`);
  log();

  // ── Every route ──────────────────────────────────────────────────────
  log("routes:");
  const titles = new Map();
  for (const url of urls) {
    const res = await fetch(toLocal(url), { redirect: "manual" });
    const html = await res.text();
    const problems = [];
    if (res.status !== 200) problems.push(`status ${res.status}`);

    const headEnd = html.indexOf("</head>");
    const head = headEnd > 0 ? html.slice(0, headEnd) : "";

    const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const desc = metaContent(head, "description");
    const canonTag = head.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0];
    const canonical = canonTag && attr(canonTag, "href");
    const ogUrl = metaContent(head, "og:url", "property");
    const ogTitle = metaContent(head, "og:title", "property");
    const ogDesc = metaContent(head, "og:description", "property");
    const twTitle = metaContent(head, "twitter:title");
    const ogLocale = metaContent(head, "og:locale", "property");
    const ogAlt = [...head.matchAll(/property="og:locale:alternate"/g)].length;
    const langs = [...head.matchAll(/<link[^>]*rel="alternate"[^>]*hrefLang="([^"]+)"/gi)].map((m) => m[1]);

    if (!title) problems.push("no <title> in <head>");
    if (!desc) problems.push("no meta description in <head>");
    if (!canonical) problems.push("no canonical in <head>");
    else if (canonical !== url) problems.push(`canonical ${canonical} ≠ ${url}`);
    if (ogUrl !== canonical) problems.push(`og:url ${ogUrl} ≠ canonical`);
    if (ogTitle !== title) problems.push(`og:title ≠ <title>`);
    if (ogDesc !== desc) problems.push(`og:description ≠ meta description`);
    if (twTitle !== ogTitle) problems.push(`twitter:title ≠ og:title`);
    if (!ogLocale) problems.push("no og:locale");
    if (ogAlt !== LOCALES.length - 1) problems.push(`og:locale:alternate ×${ogAlt}`);
    const missing = HREFLANGS.filter((h) => !langs.includes(h));
    if (missing.length) problems.push(`hreflang missing: ${missing.join(", ")}`);
    if (/name="keywords"/.test(head)) problems.push("meta keywords present");
    if (!OPERATOR_LINE.test(html.replace(/<!-- -->/g, ""))) problems.push("footer operator line missing");
    if (/luxuriousegypt/i.test(html)) problems.push("luxuriousegypt present");
    if (REPLACE_PHONE && OLD_PHONE.test(html)) problems.push("old phone present");
    if (OLD_ADDRESS.test(html)) problems.push("old registered-office address present");
    if ((title.match(/Sillage Égypte/g) || []).length > 1) problems.push(`brand repeated in title: "${title}"`);

    if (title) titles.set(title, [...(titles.get(title) || []), url]);
    if (problems.length) fail(url, problems.join("; "));
    else log(`  ok   ${url}  —  ${title}`);
  }
  log();

  // ── Duplicate titles (informational) ─────────────────────────────────
  const dups = [...titles.entries()].filter(([, u]) => u.length > 1);
  log(`duplicate <title> values: ${dups.length}`);
  for (const [t, u] of dups) log(`  note "${t}" on ${u.join(", ")}`);
  log();

  // ── Removed URLs must 301 ────────────────────────────────────────────
  log(`removed URLs (must 301): ${REMOVED.length ? "" : "none — no guide or experience was unpublished"}`);
  for (const r of REMOVED) {
    for (const l of LOCALES) {
      const path = l === "en" ? r : `/${l}${r}`;
      const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
      if (res.status !== 301 && res.status !== 308) fail(path, `expected 301, got ${res.status}`);
      else log(`  ok   ${path} → ${res.headers.get("location")} (${res.status})`);
    }
  }
  log();

  log(failures ? `RESULT: ${failures} failure(s)` : `RESULT: all ${urls.length} routes pass`);
  console.log(lines.join("\n"));
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
