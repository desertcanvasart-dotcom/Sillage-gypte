/**
 * Builds the six journey (tour) pages from the supplied designs in
 * experiences/final/, preserving their exact words. For each file it:
 *   - strips the file's own masthead + footer (the site supplies global chrome),
 *   - wires a real licensed photo into EVERY --img-* slot (hero, day list,
 *     cta, and each hotel card) so nothing is a bare gradient,
 *   - points the placeholder links (breadcrumb, "Plan this journey") at real
 *     routes, and writes content/tours/<slug>.json for the page to inject.
 * Also regenerates data/tours.ts as a thin index (cards + homepage + plan).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#39;|&rsquo;/g, "’")
   .replace(/&lsquo;/g, "‘").replace(/&quot;/g, '"').replace(/&ndash;/g, "–")
   .replace(/&mdash;/g, "—").replace(/&eacute;/g, "é");
const firstMatch = (re, s, d = "") => { const m = s.match(re); return m ? m[1] : d; };
const text = (re, s) => decode(firstMatch(re, s, "").replace(/<[^>]*>/g, "")).trim();

const I = (f) => `url("/images/${f}")`;

const POSTS = [
  {
    slug: "cairo-two-views", file: "cairo-two-views-journey.html",
    regions: ["cairo"], guideSlug: "azmy-salama", gradient: "ancient", featured: true, price: 2190,
    img: { hero: "dest-cairo.jpg", days: "exp-felucca-at-sunset.jpg", cta: "exp-dawn-at-the-pyramids.jpg", h1: "dest-cairo-1.jpg", h2: "dest-cairo-2.jpg" },
  },
  {
    slug: "egypt-in-brief", file: "egypt-in-brief-journey.html",
    regions: ["cairo", "luxor"], guideSlug: "sara-hassan", gradient: "sunset", featured: true, price: 4675,
    img: { hero: "tour-ancient-cairo-luxor.jpg", days: "exp-balloon-over-luxor.jpg", cta: "dest-luxor.jpg", h1: "dest-cairo.jpg", h2: "dest-luxor-1.jpg" },
  },
  {
    slug: "grand-tour", file: "grand-tour-journey.html",
    regions: ["cairo", "luxor", "aswan", "abu-simbel"], guideSlug: "azmy-salama", gradient: "nile", featured: true, price: 5850,
    img: { hero: "tour-the-complete-egypt-2.jpg", days: "exp-felucca-at-sunset.jpg", cta: "dest-abu-simbel.jpg", h1: "dest-cairo-1.jpg", h2: "dest-luxor-1.jpg", h3: "dest-aswan-2.jpg", h4: "dest-abu-simbel-1.jpg" },
  },
  {
    slug: "complete-egypt", file: "complete-egypt-journey.html",
    regions: ["cairo", "luxor", "aswan", "abu-simbel", "the-nile"], guideSlug: "azmy-salama", gradient: "nile", featured: false, price: 7500,
    img: { hero: "tour-the-complete-egypt.jpg", days: "tour-private-nile.jpg", cta: "tour-the-complete-egypt-1.jpg", h1: "dest-cairo.jpg", h2: "dest-luxor.jpg", h3: "dest-aswan-2.jpg", h4: "dest-abu-simbel.jpg" },
  },
  {
    slug: "nile-red-sea", file: "nile-red-sea-journey-.html",
    regions: ["luxor", "aswan", "the-nile", "red-sea"], guideSlug: "sara-hassan", gradient: "nile", featured: false, price: 7999,
    img: { hero: "tour-red-sea-and-sinai.jpg", days: "tour-private-nile.jpg", cta: "dest-sharm-el-sheikh.jpg", h1: "dest-luxor.jpg", h2: "dest-aswan-4.jpg", h3: "dest-sharm-el-sheikh-2.jpg", h4: "tour-red-sea-and-sinai-1.jpg" },
  },
  {
    slug: "beyond-the-nile", file: "beyond-the-nile-journey.html",
    regions: ["cairo", "luxor", "aswan", "abu-simbel", "the-nile"], guideSlug: "azmy-salama", gradient: "desert", featured: false, price: 11650,
    img: { hero: "tour-nubia-and-the-south.jpg", days: "tour-private-nile-1.jpg", cta: "dest-abu-simbel.jpg", h1: "dest-cairo.jpg", h2: "dest-luxor.jpg", h3: "dest-aswan-2.jpg", h4: "dest-abu-simbel-1.jpg" },
  },
];

const SRC = path.resolve("experiences/final");
const OUT = path.resolve("content/tours");

async function processOne(p) {
  const raw = await readFile(path.join(SRC, p.file), "utf8");

  const seoTitle = text(/<title>([^<]*)<\/title>/, raw).replace(/\s*\|\s*Sillage Égypte\s*$/, "").trim();
  const description = text(/<meta name="description" content="([^"]*)"/, raw);

  let body = firstMatch(/<body>([\s\S]*?)<\/body>/, raw);

  const title = text(/<h1[^>]*>([\s\S]*?)<\/h1>/, body);
  const tagline = text(/<p class="lede">([\s\S]*?)<\/p>/, body);
  const kicker = text(/class="eyebrow kicker">([\s\S]*?)<\/span>/, body);
  const type = (kicker.split("·")[0] || "Private journey").trim();

  // ledger key/value pairs (Duration / Where / Style …)
  const ledger = {};
  for (const m of body.matchAll(/<div class="k">([\s\S]*?)<\/div>\s*<div class="v">([\s\S]*?)<\/div>/g)) {
    ledger[decode(m[1].replace(/<[^>]*>/g, "")).trim().toLowerCase()] = decode(m[2].replace(/<[^>]*>/g, "")).trim();
  }
  const duration = ledger["duration"] || "";
  const groupType = ledger["style"] || "Private throughout";
  const where = ledger["where"] || ledger["route"] || "";

  // strip chrome
  body = body.replace(/<header class="masthead">[\s\S]*?<\/header>/, "");
  body = body.replace(/<footer>[\s\S]*?<\/footer>/, "");
  body = body.replace(/<script[\s\S]*?<\/script>/g, "");

  // links
  body = body
    .replace(/<a href="#">Home<\/a>/g, '<a href="/">Home</a>')
    .replace(/<a href="#">Journeys<\/a>/g, '<a href="/tours">Journeys</a>')
    .replace(/<a class="btn solid" href="#">/g, `<a class="btn solid" href="/plan?journey=${p.slug}">`);

  // image vars for every slot the design uses
  const imgVars = {};
  for (const [k, file] of Object.entries(p.img)) imgVars[`--img-${k}`] = I(file);

  await writeFile(
    path.join(OUT, `${p.slug}.json`),
    JSON.stringify({ slug: p.slug, seoTitle, description, title, tagline, imgVars, bodyHtml: body }, null, 2)
  );
  return { ...p, seoTitle, description, title, tagline, type, duration, groupType, where };
}

function tsEntry(d) {
  const j = JSON.stringify;
  return `  {
    slug: ${j(d.slug)},
    type: ${j(d.type)},
    title: ${j(d.title)},
    tagline: ${j(d.tagline)},
    description: ${j(d.description)},
    intro: ${j(d.tagline)},
    durationDays: ${parseInt(d.duration) || 0},
    duration: ${j(d.duration)},
    groupType: ${j(d.groupType)},
    gradient: ${j(d.gradient)},
    heroLabel: ${j(d.title)},
    featured: ${d.featured},
    regions: ${j(d.regions)},
    highlights: [],
    itinerary: [],
    included: [],
    guideSlug: ${j(d.guideSlug)},
    galleryLabels: [],
    route: ${j(d.where)},
    bespoke: true,${d.price ? `\n    fromPrice: ${d.price},` : ""}
    seo: { title: ${j(d.seoTitle)}, description: ${j(d.description)} },
  },`;
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const idx = [];
  for (const p of POSTS) idx.push(await processOne(p));

  const ts =
`/** Journeys (tours). Drives /tours and /tours/[slug].
 *  The six journeys are bespoke designs rendered verbatim from
 *  content/tours/<slug>.json. This file is a thin index for the cards,
 *  homepage and plan dropdown — generated by scripts/build-journeys.mjs. */

export type GradientVariant =
  | "nile" | "desert" | "ancient" | "oasis" | "sunset" | "night";

export interface ItineraryDay { day: number; title: string; description: string; }

export interface Tour {
  slug: string;
  type: string;
  title: string;
  tagline: string;
  description: string;
  intro: string;
  durationDays: number;
  duration: string;
  groupType: string;
  gradient: GradientVariant;
  heroLabel: string;
  featured: boolean;
  regions: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  guideSlug: string;
  galleryLabels: string[];
  seo: { title: string; description: string };
  route?: string;
  pace?: string;
  journeyHeadline?: string;
  differentiators?: { title: string; description: string }[];
  caveat?: { title: string; body: string[] };
  notIncluded?: string[];
  /** Bespoke journeys render verbatim from content/tours/<slug>.json. */
  bespoke?: boolean;
}

export const DEFAULT_NOT_INCLUDED = [
  "International and domestic flights (we arrange them; billed at cost)",
  "Egypt entry visa",
  "Gratuities for crew and guide, at your discretion",
  "Travel insurance — required, and we'll point you to it",
];

export const tours: Tour[] = [
${idx.map(tsEntry).join("\n")}
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
export const featuredTours = tours.filter((t) => t.featured);
`;
  await writeFile(path.resolve("data/tours.ts"), ts);
  console.log("Built journeys:", idx.map((d) => d.slug).join(", "));
}

run().catch((e) => { console.error(e); process.exit(1); });
