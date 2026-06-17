/**
 * Applies real photographs from raw-20260614T201358Z-3-001/raw across the
 * whole site so no card, hero or detail page is left on a gradient. It:
 *   - copies the chosen photos into public/images/lib/<location>/,
 *   - sets the manifest keys used by cards + PageHero heroes, and
 *   - rewrites every --img-* slot in content/{destinations,tours,experiences}
 *     and the journal hero image.
 * Picks are (location, topic, index) into the raw library; index wraps.
 */
import fs from "node:fs";
import path from "node:path";

const RAW = path.resolve("raw-20260614T201358Z-3-001/raw");
const PUBLIB = path.resolve("public/images/lib");

const cache = new Map();
/** Resolve a (location, topic, index) pick to a web path, copying the file. */
function pick(loc, topic, idx = 0) {
  const dir = path.join(RAW, loc, topic);
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  if (!files.length) throw new Error(`no images in ${loc}/${topic}`);
  const file = files[idx % files.length];
  const web = `/images/lib/${loc}/${file}`;
  if (!cache.has(web)) {
    const outDir = path.join(PUBLIB, loc);
    fs.mkdirSync(outDir, { recursive: true });
    fs.copyFileSync(path.join(dir, file), path.join(outDir, file));
    cache.set(web, true);
  }
  return web;
}
const url = (web) => `url("${web}")`;

/* ── manifest keys (cards + PageHero heroes) ─────────────────────────── */
const MANIFEST = {
  "home-hero": pick("cairo", "giza-pyramids-and-sphinx", 16), // iconic Sphinx + Khafre
  "hero-plan": pick("luxor", "luxor-temple", 6), // Luxor Temple illuminated at night (distinct /plan hero)
  "dest-cairo": pick("cairo", "giza-pyramids-and-sphinx", 7), // Giza panorama, Sphinx + 3 pyramids
  "dest-luxor": pick("luxor", "karnak-temple", 4), // Karnak hypostyle hall columns
  "dest-aswan": pick("aswan", "aswan-nile-river", 5), // feluccas on the Nile by the dunes
  "dest-abu-simbel": pick("abu-simbel", "abu-simbel-temples", 3), // colossi (clean)
  "dest-sharm-el-sheikh": pick("red-sea", "underwater-and-coral-reef", 5), // coral reef + fish
  "dest-alexandria": pick("alexandria", "stanley-bridge", 0), // Stanley Bridge
  "dest-hurghada": pick("red-sea", "red-sea-beach-and-resort", 4), // turquoise lagoon (moved from Nile & Red Sea card)
  "tour-cairo-two-views": pick("cairo", "giza-pyramids-and-sphinx", 6), // Sphinx + Khafre
  "tour-egypt-in-brief": pick("luxor", "luxor-temple", 7), // Luxor temple at sunset
  "tour-grand-tour": pick("abu-simbel", "abu-simbel-temples", 3), // Abu Simbel colossi
  "tour-complete-egypt": pick("aswan", "aswan-nile-river", 3), // dahabiya under full sail
  "tour-nile-red-sea": pick("red-sea", "underwater-and-coral-reef", 7), // sea turtle over the reef
  "tour-beyond-the-nile": pick("aswan", "philae-temple", 5), // Philae, Kiosk of Trajan reflected
  "exp-the-empty-plateau": pick("cairo", "giza-pyramids-and-sphinx", 3),
  "exp-the-empty-museum": pick("cairo", "grand-egyptian-museum", 0),
  "exp-the-temple-by-river": pick("dendera", "dendera-temple", 0),
  "exp-the-salt-lakes": pick("western-desert", "desert-lakes", 0),
  "exp-tea-on-the-terrace": pick("aswan", "aswan-nile-river", 0),
  "exp-lunch-under-sail": pick("nile-river", "felucca", 0),
  "exp-balloon-over-luxor": pick("luxor", "hot-air-balloon", 0),
  "journal-when-to-go-to-egypt": pick("luxor", "luxor-temple", 1),
  "journal-a-morning-on-the-west-bank": pick("luxor", "hatshepsut-temple", 0),
  "journal-why-we-will-sometimes-talk-you-out-of-a-trip": pick("nile-river", "nile-cruise", 1),
};

/* ── destination detail slots ────────────────────────────────────────── */
const DEST = {
  cairo: { "--img-hero": pick("cairo", "giza-pyramids-and-sphinx", 4), "--img-l1": pick("cairo", "giza-pyramids-and-sphinx", 5), "--img-l2": pick("cairo", "egyptian-museum", 0), "--img-l3": pick("cairo", "islamic-cairo", 0), "--img-l4": pick("cairo", "khan-el-khalili", 0) },
  luxor: { "--img-hero": pick("luxor", "karnak-temple", 1), "--img-east": pick("luxor", "luxor-temple", 1), "--img-west": pick("luxor", "valley-of-the-kings", 0) },
  aswan: { "--img-hero": pick("aswan", "philae-temple", 1), "--img-l1": pick("aswan", "philae-temple", 2), "--img-l2": pick("aswan", "aswan-nile-river", 0), "--img-l3": pick("aswan", "nubian-village", 0), "--img-l4": pick("aswan", "unfinished-obelisk", 0) },
  "abu-simbel": { "--img-hero": pick("abu-simbel", "abu-simbel-temples", 2), "--img-t1": pick("abu-simbel", "abu-simbel-temples", 3), "--img-t2": pick("abu-simbel", "abu-simbel-temples", 4) },
  "sharm-el-sheikh": { "--img-hero": pick("red-sea", "red-sea-beach-and-resort", 2), "--img-l1": pick("red-sea", "underwater-and-coral-reef", 0), "--img-l2": pick("sharm-el-sheikh", "old-market-and-mosque", 0), "--img-l3": pick("sinai", "sinai-desert", 0), "--img-l4": pick("red-sea", "red-sea-beach-and-resort", 3) },
  hurghada: { "--img-hero": pick("hurghada", "orange-bay-giftun-island", 1), "--img-l1": pick("red-sea", "underwater-and-coral-reef", 1), "--img-l2": pick("hurghada", "hurghada-marina", 0), "--img-l3": pick("red-sea", "red-sea-beach-and-resort", 4), "--img-l4": pick("red-sea", "underwater-and-coral-reef", 2) },
  alexandria: { "--img-hero": pick("alexandria", "library-of-alexandria", 1), "--img-l1": pick("alexandria", "library-of-alexandria", 2), "--img-l2": pick("alexandria", "catacombs-of-kom-el-shoqafa", 0), "--img-l3": pick("alexandria", "alexandria-corniche", 0), "--img-l4": pick("alexandria", "pompeys-pillar", 0) },
};

/* ── tour detail slots ───────────────────────────────────────────────── */
const TOUR = {
  "cairo-two-views": { "--img-hero": pick("cairo", "giza-pyramids-and-sphinx", 6), "--img-days": pick("nile-river", "felucca", 0), "--img-cta": pick("cairo", "giza-pyramids-and-sphinx", 7), "--img-h1": pick("cairo", "cairo-city", 0), "--img-h2": pick("cairo", "giza-pyramids-and-sphinx", 8) },
  "egypt-in-brief": { "--img-hero": pick("luxor", "karnak-temple", 2), "--img-days": pick("luxor", "hot-air-balloon", 0), "--img-cta": pick("luxor", "luxor-temple", 2), "--img-h1": pick("cairo", "cairo-city", 1), "--img-h2": pick("luxor", "luxor-temple", 3) },
  "grand-tour": { "--img-hero": pick("abu-simbel", "abu-simbel-temples", 5), "--img-days": pick("nile-river", "nile-river-scenes", 0), "--img-cta": pick("abu-simbel", "abu-simbel-temples", 6), "--img-h1": pick("cairo", "cairo-city", 2), "--img-h2": pick("luxor", "luxor-temple", 4), "--img-h3": pick("aswan", "aswan-nile-river", 1), "--img-h4": pick("abu-simbel", "abu-simbel-temples", 7) },
  "complete-egypt": { "--img-hero": pick("nile-river", "nile-cruise", 0), "--img-days": pick("nile-river", "nile-river-scenes", 1), "--img-cta": pick("cairo", "giza-pyramids-and-sphinx", 9), "--img-h1": pick("cairo", "cairo-city", 3), "--img-h2": pick("luxor", "karnak-temple", 3), "--img-h3": pick("aswan", "philae-temple", 3), "--img-h4": pick("abu-simbel", "abu-simbel-temples", 8) },
  "nile-red-sea": { "--img-hero": pick("red-sea", "red-sea-beach-and-resort", 2), "--img-days": pick("nile-river", "nile-river-scenes", 2), "--img-cta": pick("red-sea", "underwater-and-coral-reef", 3), "--img-h1": pick("luxor", "luxor-temple", 5), "--img-h2": pick("aswan", "aswan-nile-river", 2), "--img-h3": pick("red-sea", "red-sea-beach-and-resort", 0), "--img-h4": pick("hurghada", "orange-bay-giftun-island", 0) },
  "beyond-the-nile": { "--img-hero": pick("aswan", "nubian-village", 1), "--img-days": pick("nile-river", "nile-river-scenes", 3), "--img-cta": pick("abu-simbel", "abu-simbel-temples", 9), "--img-h1": pick("cairo", "giza-pyramids-and-sphinx", 10), "--img-h2": pick("luxor", "valley-of-the-kings", 1), "--img-h3": pick("aswan", "philae-temple", 4), "--img-h4": pick("abu-simbel", "abu-simbel-temples", 10) },
};

/* ── experience hero photos (design used a gradient) ─────────────────── */
const EXP = {
  "the-empty-plateau": pick("cairo", "giza-pyramids-and-sphinx", 11),
  "the-empty-museum": pick("cairo", "grand-egyptian-museum", 1),
  "the-temple-by-river": pick("dendera", "dendera-temple", 1),
  "the-salt-lakes": pick("western-desert", "desert-lakes", 1),
  "tea-on-the-terrace": pick("aswan", "aswan-nile-river", 3),
  "lunch-under-sail": pick("nile-river", "nile-river-scenes", 4),
};

/* ── journal hero photos ─────────────────────────────────────────────── */
const JOURNAL = {
  "when-to-go-to-egypt": pick("luxor", "luxor-temple", 6),
  "a-morning-on-the-west-bank": pick("luxor", "hatshepsut-temple", 1),
  "why-we-will-sometimes-talk-you-out-of-a-trip": pick("nile-river", "nile-cruise", 1),
};

function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function writeJson(p, o) { fs.writeFileSync(p, JSON.stringify(o, null, 2)); }

function run() {
  // manifest
  const mp = path.resolve("data/image-manifest.json");
  const m = readJson(mp);
  Object.assign(m, MANIFEST);
  writeJson(mp, m);

  // destinations
  for (const [slug, slots] of Object.entries(DEST)) {
    const p = path.resolve("content/destinations", `${slug}.json`);
    const j = readJson(p);
    for (const [k, web] of Object.entries(slots)) if (k in j.imgVars) j.imgVars[k] = url(web);
    writeJson(p, j);
  }
  // tours
  for (const [slug, slots] of Object.entries(TOUR)) {
    const p = path.resolve("content/tours", `${slug}.json`);
    const j = readJson(p);
    for (const [k, web] of Object.entries(slots)) if (k in j.imgVars) j.imgVars[k] = url(web);
    writeJson(p, j);
  }
  // experiences (add imgVars.--img-hero)
  for (const [slug, web] of Object.entries(EXP)) {
    const p = path.resolve("content/experiences", `${slug}.json`);
    const j = readJson(p);
    j.imgVars = { "--img-hero": url(web) };
    writeJson(p, j);
  }
  // journal
  for (const [slug, web] of Object.entries(JOURNAL)) {
    const p = path.resolve("content/journal", `${slug}.json`);
    const j = readJson(p);
    j.img = web;
    writeJson(p, j);
  }

  console.log(`Applied images. Copied ${cache.size} photos into public/images/lib.`);
}

run();
