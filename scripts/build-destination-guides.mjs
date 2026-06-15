/**
 * Builds the seven destination "guide" pages from the supplied HTML designs,
 * preserving their exact words. For each file it:
 *   - extracts <title>, meta description, the :root --img-* gradient vars,
 *     and the hero lede + kicker (for the index card),
 *   - strips the file's own masthead + footer (the site supplies global ones),
 *   - renames .hero -> .dghero (avoids the global teal .hero), and points the
 *     placeholder "Plan" / breadcrumb links at real routes,
 *   - writes content/destinations/<slug>.json for the page to render.
 * Also writes data/destinations.ts (a thin index used by the cards + homepage).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SLUGS = [
  "cairo",
  "luxor",
  "aswan",
  "abu-simbel",
  "sharm-el-sheikh",
  "alexandria",
  "hurghada",
];
// gradient tone for the index-card fallback + image key naming
const GRADIENT = {
  cairo: "ancient",
  luxor: "sunset",
  aswan: "nile",
  "abu-simbel": "desert",
  "sharm-el-sheikh": "night",
  alexandria: "nile",
  hurghada: "oasis",
};

const SRC = path.resolve("Destinations");
const OUT = path.resolve("content/destinations");

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&quot;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&eacute;/g, "é");

const firstMatch = (re, s, d = "") => {
  const m = s.match(re);
  return m ? m[1] : d;
};
const text = (re, s) => decode(firstMatch(re, s, "").replace(/<[^>]*>/g, "")).trim();

async function processOne(slug) {
  const raw = await readFile(path.join(SRC, `destination-${slug}.html`), "utf8");

  const title = text(/<title>([^<]*)<\/title>/, raw).replace(/\s*\|\s*Sillage Égypte\s*$/, "").trim();
  const description = text(/<meta name="description" content="([^"]*)"/, raw);

  // --img-* gradient vars from :root
  const rootBlock = firstMatch(/:root\s*\{([\s\S]*?)\}/, raw);
  const imgVars = {};
  for (const m of rootBlock.matchAll(/(--img-[\w-]+)\s*:\s*([^;]+);/g)) {
    imgVars[m[1]] = m[2].trim();
  }

  // body inner
  let body = firstMatch(/<body>([\s\S]*?)<\/body>/, raw);

  // hero name, lede + kicker (for the index card) before we mangle anything
  const name = text(/<h1[^>]*>([\s\S]*?)<\/h1>/, body);
  const lede = text(/<p class="lede">([\s\S]*?)<\/p>/, body);
  const kicker = text(/class="[^"]*kicker[^"]*"[^>]*>([\s\S]*?)<\/span>/, body);
  const region = kicker.replace(/^Destination guide\s*·\s*/i, "").trim() || name;

  // strip the file's own masthead + footer (site supplies global chrome)
  body = body.replace(/<header class="masthead">[\s\S]*?<\/header>/, "");
  body = body.replace(/<footer>[\s\S]*?<\/footer>/, "");
  // drop any <script> just in case
  body = body.replace(/<script[\s\S]*?<\/script>/g, "");

  // rename hero to avoid colliding with the global teal .hero
  body = body.replace(/class="hero"/g, 'class="dghero"');

  // point placeholder links at real routes
  body = body
    .replace(/href="#plan"/g, 'href="/plan"')
    .replace(/class="btn solid" href="#"/g, 'class="btn solid" href="/plan"')
    .replace(/href="#">Home</g, 'href="/">Home<')
    .replace(/href="#">Destinations</g, 'href="/destinations">Destinations<');

  await writeFile(
    path.join(OUT, `${slug}.json`),
    JSON.stringify({ slug, title, description, name, lede, kicker, imgVars, bodyHtml: body }, null, 2)
  );
  return { slug, name, region, lede, gradient: GRADIENT[slug] };
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const index = [];
  for (const slug of SLUGS) index.push(await processOne(slug));

  const ts =
    `/** Destination index (thin) — drives the /destinations cards + homepage.\n` +
    ` *  Full guide pages render from content/destinations/<slug>.json. Generated\n` +
    ` *  by scripts/build-destination-guides.mjs — exact words come from the HTML. */\n\n` +
    `import type { GradientVariant } from "./tours";\n\n` +
    `export interface Destination {\n` +
    `  slug: string;\n  name: string;\n  tagline: string;\n  description: string;\n` +
    `  gradient: GradientVariant;\n  heroLabel: string;\n}\n\n` +
    `export const destinations: Destination[] = [\n` +
    index
      .map(
        (d) =>
          `  {\n    slug: ${JSON.stringify(d.slug)},\n    name: ${JSON.stringify(d.name)},\n` +
          `    tagline: ${JSON.stringify(d.region)},\n    description: ${JSON.stringify(d.lede)},\n` +
          `    gradient: ${JSON.stringify(d.gradient)},\n    heroLabel: ${JSON.stringify(d.name)},\n  },`
      )
      .join("\n") +
    `\n];\n\nexport const getDestination = (slug: string) =>\n  destinations.find((d) => d.slug === slug);\n`;

  await writeFile(path.resolve("data/destinations.ts"), ts);
  console.log("Built guides:", index.map((d) => d.slug).join(", "));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
