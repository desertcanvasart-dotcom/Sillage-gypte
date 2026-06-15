/**
 * Builds three bespoke Journal articles from the supplied HTML designs
 * (blogs/*.html), preserving their exact words. For each file it:
 *   - strips the file's own masthead + footer (the site supplies global chrome),
 *   - sets the hero --img-hero to a real licensed photo from public/images,
 *   - rewrites the placeholder links (breadcrumb, "Plan your journey",
 *     "More from the Journal" cards) to real site routes, and
 *   - adds a handful of contextual internal links inside the prose, wrapping
 *     existing words only (no content words added, removed or changed),
 *   - writes content/journal/<slug>.json for the page to render verbatim.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

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

/** Replace the FIRST occurrence of `find` with `repl`; warn if not found. */
function once(body, slug, find, repl) {
  const i = body.indexOf(find);
  if (i === -1) {
    console.warn(`  [${slug}] link anchor not found: ${find.slice(0, 48)}…`);
    return body;
  }
  return body.slice(0, i) + repl + body.slice(i + find.length);
}

// Map "More from the Journal" card titles -> the best real route on the site.
const CARD_LINKS = {
  "When to go to Egypt": "/journal/when-to-go-to-egypt",
  "A morning on the west bank": "/journal/a-morning-on-the-west-bank",
  "Why we'll sometimes talk you out of a trip":
    "/journal/why-we-will-sometimes-talk-you-out-of-a-trip",
  // articles that don't exist on the site -> nearest real page
  "Dahabiya, felucca or cruiser?": "/tours/nile-red-sea",
  "How to read a temple": "/destinations/luxor",
};

const POSTS = [
  {
    slug: "when-to-go-to-egypt",
    file: "journal-when-to-go-to-egypt.html",
    img: "/images/dest-luxor.jpg",
    links: (b, s) => {
      b = once(
        b, s,
        "Luxor, Aswan, Abu Simbel —",
        '<a href="/destinations/luxor">Luxor</a>, <a href="/destinations/aswan">Aswan</a>, <a href="/destinations/abu-simbel">Abu Simbel</a> —'
      );
      b = once(b, s, "<b>Cairo</b> follows", '<b><a href="/destinations/cairo">Cairo</a></b> follows');
      b = once(b, s, "— Alexandria —", '— <a href="/destinations/alexandria">Alexandria</a> —');
      b = once(
        b, s,
        "Hurghada and Sharm —",
        '<a href="/destinations/hurghada">Hurghada</a> and <a href="/destinations/sharm-el-sheikh">Sharm</a> —'
      );
      return b;
    },
  },
  {
    slug: "a-morning-on-the-west-bank",
    file: "journal-morning-west-bank.html",
    img: "/images/exp-balloon-over-luxor.jpg",
    links: (b, s) => {
      b = once(b, s, "a single felucca", 'a single <a href="/tours/nile-red-sea">felucca</a>');
      b = once(
        b, s,
        "you reach the Valley of the Kings the gates",
        'you reach the <a href="/destinations/luxor">Valley of the Kings</a> the gates'
      );
      return b;
    },
  },
  {
    slug: "why-we-will-sometimes-talk-you-out-of-a-trip",
    file: "journal-talk-you-out-of-a-trip.html",
    img: "/images/tour-private-nile.jpg",
    links: (b, s) => {
      b = once(b, s, "a dahabiya instead", 'a <a href="/tours/nile-red-sea">dahabiya</a> instead');
      b = once(b, s, "The Pyramids stand", 'The <a href="/destinations/cairo">Pyramids</a> stand');
      b = once(b, s, "Alexandria has lost", '<a href="/destinations/alexandria">Alexandria</a> has lost');
      b = once(b, s, "July in Aswan", 'July in <a href="/destinations/aswan">Aswan</a>');
      b = once(b, s, "Two days in Luxor", 'Two days in <a href="/destinations/luxor">Luxor</a>');
      return b;
    },
  },
];

const SRC = path.resolve("blogs");
const OUT = path.resolve("content/journal");

async function processOne(p) {
  const raw = await readFile(path.join(SRC, p.file), "utf8");

  const seoTitle = text(/<title>([^<]*)<\/title>/, raw)
    .replace(/\s*\|\s*Sillage Égypte\s*$/, "")
    .trim();
  const description = text(/<meta name="description" content="([^"]*)"/, raw);

  let body = firstMatch(/<body>([\s\S]*?)<\/body>/, raw);

  // header fields (before mangling)
  const title = text(/<h1[^>]*>([\s\S]*?)<\/h1>/, body);
  const excerpt = text(/<p class="dek">([\s\S]*?)<\/p>/, body);
  const kicker = text(/class="eyebrow kicker">([\s\S]*?)<\/span>/, body);
  const category = kicker.replace(/^The Journal\s*·\s*/i, "").trim();
  const metaSpans = firstMatch(/<p class="meta">([\s\S]*?)<\/p>/, body);
  const spanVals = [...metaSpans.matchAll(/<span>([^<]*)<\/span>/g)].map((m) => decode(m[1]).trim());
  const dateLabel = spanVals[0] || "June 2026";
  const readTime = spanVals[1] || "";

  // strip the file's own chrome
  body = body.replace(/<header class="masthead">[\s\S]*?<\/header>/, "");
  body = body.replace(/<footer>[\s\S]*?<\/footer>/, "");
  body = body.replace(/<script[\s\S]*?<\/script>/g, "");

  // breadcrumb + CTA links -> real routes
  body = body
    .replace(/<a href="#">Home<\/a>/g, '<a href="/">Home</a>')
    .replace(/<a href="#">The Journal<\/a>/g, '<a href="/journal">The Journal</a>')
    .replace(/<a class="btn solid" href="#">/g, '<a class="btn solid" href="/plan">');

  // "More from the Journal" cards -> mapped routes (match each card's <h3>)
  body = body.replace(
    /<a class="mcard" href="#"><span class="eyebrow">([^<]*)<\/span><h3>([^<]*)<\/h3>/g,
    (m, eyebrow, h3) => {
      const href = CARD_LINKS[decode(h3).trim()] || "/journal";
      return `<a class="mcard" href="${href}"><span class="eyebrow">${eyebrow}</span><h3>${h3}</h3>`;
    }
  );

  // contextual in-body internal links (existing words only)
  body = p.links(body, p.slug);

  body = body.trim();

  await writeFile(
    path.join(OUT, `${p.slug}.json`),
    JSON.stringify(
      { slug: p.slug, seoTitle, description, title, excerpt, category, dateLabel, readTime, img: p.img, bodyHtml: body },
      null, 2
    )
  );
  return p.slug;
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const built = [];
  for (const p of POSTS) built.push(await processOne(p));
  console.log("Built journal posts:", built.join(", "));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
