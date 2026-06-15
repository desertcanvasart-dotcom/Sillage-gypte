/**
 * Downloads section-matched, openly-licensed photos from Wikimedia Commons.
 * Each entry searches Commons (File namespace) and saves the top usable hit.
 * Writes:
 *   - public/images/<key>.jpg                (the images)
 *   - data/image-manifest.json               (key -> /images/<key>.jpg, successes only)
 *   - public/images/credits.json             (attribution per image)
 * Missing/failed keys are simply omitted, so the site falls back to gradients.
 *
 * Run: node scripts/fetch-images.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createWriteStream, existsSync } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const OUT = path.resolve("public/images");

// key: [searchQuery, width]
const JOBS = {
  "home-hero": ["Nile river felucca sunset Aswan Egypt", 1800],

  // destination heroes
  "dest-cairo": ["Giza pyramids Cairo skyline", 1600],
  "dest-luxor": ["Karnak temple hypostyle hall columns", 1600],
  "dest-aswan": ["Aswan Nile feluccas Elephantine granite", 1600],
  "dest-abu-simbel": ["Abu Simbel Great Temple Ramesses colossi", 1600],
  "dest-siwa": ["Siwa Oasis Shali fortress", 1600],
  "dest-sharm-el-sheikh": ["Ras Muhammad Red Sea coral reef", 1600],
  "dest-alexandria": ["Qaitbay Citadel Alexandria Egypt", 1600],

  // cairo gallery
  "dest-cairo-1": ["Giza pyramids dawn", 1000],
  "dest-cairo-2": ["Grand Egyptian Museum interior", 1000],
  "dest-cairo-3": ["Sultan Hassan mosque Cairo", 1000],
  "dest-cairo-4": ["Khan el-Khalili Cairo market", 1000],
  "dest-cairo-5": ["Hanging Church Coptic Cairo", 1000],
  "dest-cairo-6": ["Cairo minarets skyline sunset", 1000],

  // luxor gallery
  "dest-luxor-1": ["Karnak hypostyle hall", 1000],
  "dest-luxor-2": ["Valley of the Kings tomb wall painting", 1000],
  "dest-luxor-3": ["Hatshepsut temple Deir el-Bahari", 1000],
  "dest-luxor-4": ["Luxor temple night", 1000],
  "dest-luxor-5": ["Colossi of Memnon", 1000],
  "dest-luxor-6": ["Medinet Habu reliefs colour", 1000],

  // aswan gallery
  "dest-aswan-1": ["Aswan felucca Nile golden hour", 1000],
  "dest-aswan-2": ["Philae temple Aswan", 1000],
  "dest-aswan-3": ["Nubian village colourful houses Aswan", 1000],
  "dest-aswan-4": ["Unfinished obelisk Aswan", 1000],
  "dest-aswan-5": ["Old Cataract hotel Aswan", 1000],
  "dest-aswan-6": ["Aswan Nile sand dunes west bank", 1000],

  // abu simbel gallery
  "dest-abu-simbel-1": ["Abu Simbel great temple facade", 1000],
  "dest-abu-simbel-2": ["Abu Simbel temple interior pillars", 1000],
  "dest-abu-simbel-3": ["Abu Simbel small temple Nefertari Hathor", 1000],
  "dest-abu-simbel-4": ["Abu Simbel relocation", 1000],
  "dest-abu-simbel-5": ["Abu Simbel sunset", 1000],
  "dest-abu-simbel-6": ["Lake Nasser Egypt", 1000],

  // siwa gallery
  "dest-siwa-1": ["Shali fortress Siwa dusk", 1000],
  "dest-siwa-2": ["Siwa salt lake", 1000],
  "dest-siwa-3": ["Siwa oasis palm grove", 1000],
  "dest-siwa-4": ["Siwa oasis spring", 1000],
  "dest-siwa-5": ["Great Sand Sea dunes Egypt", 1000],
  "dest-siwa-6": ["desert night sky stars Sahara", 1000],

  // sharm gallery
  "dest-sharm-el-sheikh-1": ["Red Sea coral reef wall", 1000],
  "dest-sharm-el-sheikh-2": ["Tiran island reef Red Sea", 1000],
  "dest-sharm-el-sheikh-3": ["Saint Catherine monastery Sinai", 1000],
  "dest-sharm-el-sheikh-4": ["Mount Sinai sunrise summit", 1000],
  "dest-sharm-el-sheikh-5": ["Coloured Canyon Sinai", 1000],
  "dest-sharm-el-sheikh-6": ["Red Sea fish reef underwater", 1000],

  // alexandria gallery
  "dest-alexandria-1": ["Bibliotheca Alexandrina library", 1000],
  "dest-alexandria-2": ["Kom el-Shoqafa catacombs Alexandria", 1000],
  "dest-alexandria-3": ["Roman amphitheatre Kom el-Dikka Alexandria", 1000],
  "dest-alexandria-4": ["Qaitbay Citadel Alexandria harbour", 1000],
  "dest-alexandria-5": ["Alexandria Corniche Mediterranean", 1000],
  "dest-alexandria-6": ["Pompey's Pillar Alexandria", 1000],

  // tour heroes
  "tour-private-nile": ["dahabiya Nile", 1600],
  "tour-desert-oasis": ["White Desert Egypt chalk rock formations", 1600],
  "tour-ancient-cairo-luxor": ["Great Sphinx Giza", 1600],
  "tour-nubia-and-the-south": ["Abu Simbel temple sunrise", 1600],
  "tour-red-sea-and-sinai": ["Mount Sinai sunrise", 1600],
  "tour-the-complete-egypt": ["Nile river aerial Egypt", 1600],

  // tour galleries (3 each)
  "tour-private-nile-1": ["felucca sail Nile", 900],
  "tour-private-nile-2": ["Kom Ombo temple", 900],
  "tour-private-nile-3": ["Nile river sandbank", 900],
  "tour-desert-oasis-1": ["White Desert chalk formation", 900],
  "tour-desert-oasis-2": ["desert camp night stars Egypt", 900],
  "tour-desert-oasis-3": ["Siwa lake", 900],
  "tour-ancient-cairo-luxor-1": ["Giza pyramids morning", 900],
  "tour-ancient-cairo-luxor-2": ["Valley of the Kings painted tomb", 900],
  "tour-ancient-cairo-luxor-3": ["Khan el-Khalili lantern", 900],
  "tour-nubia-and-the-south-1": ["Abu Simbel colossi", 900],
  "tour-nubia-and-the-south-2": ["Nubian house blue Aswan", 900],
  "tour-nubia-and-the-south-3": ["Aswan felucca", 900],
  "tour-red-sea-and-sinai-1": ["Mount Sinai summit", 900],
  "tour-red-sea-and-sinai-2": ["Saint Catherine monastery", 900],
  "tour-red-sea-and-sinai-3": ["Red Sea coral reef wall", 900],
  "tour-the-complete-egypt-1": ["felucca Nile temple", 900],
  "tour-the-complete-egypt-2": ["Giza plateau pyramids", 900],
  "tour-the-complete-egypt-3": ["Abu Simbel dawn", 900],

  // experiences
  "exp-dawn-at-the-pyramids": ["Giza pyramids sunrise", 1200],
  "exp-balloon-over-luxor": ["hot air balloon Luxor", 1200],
  "exp-dinner-with-an-archaeologist": ["candle lantern dinner table night", 1200],
  "exp-a-temple-after-dark": ["Karnak temple illuminated night", 1200],
  "exp-felucca-at-sunset": ["felucca Aswan sunset", 1200],
  "exp-a-night-in-the-white-desert": ["White Desert camp night Egypt", 1200],

  // new designed experiences (heroes + 3 glimpses each)
  "exp-the-empty-plateau": ["Giza pyramids Sphinx dawn", 1400],
  "exp-the-empty-plateau-1": ["Giza pyramids sunrise", 900],
  "exp-the-empty-plateau-2": ["Great Pyramid Giza Grand Gallery interior", 900],
  "exp-the-empty-plateau-3": ["Great Sphinx of Giza", 900],
  "exp-the-empty-museum": ["Grand Egyptian Museum", 1400],
  "exp-the-empty-museum-1": ["Grand Egyptian Museum grand staircase", 900],
  "exp-the-empty-museum-2": ["Tutankhamun gold mask", 900],
  "exp-the-empty-museum-3": ["Grand Egyptian Museum Ramesses statue atrium", 900],
  "exp-the-temple-by-river": ["Dendera temple Hathor", 1400],
  "exp-the-temple-by-river-1": ["Dendera temple Hathor columns", 900],
  "exp-the-temple-by-river-2": ["Dendera zodiac ceiling", 900],
  "exp-the-temple-by-river-3": ["felucca Nile Luxor sunset", 900],
  "exp-the-salt-lakes": ["Siwa salt lake", 1400],
  "exp-the-salt-lakes-1": ["Siwa salt lake turquoise", 900],
  "exp-the-salt-lakes-2": ["salt crystal desert flat", 900],
  "exp-the-salt-lakes-3": ["Siwa oasis desert sunset", 900],

  // journal
  "journal-best-time-to-visit-egypt": ["Egyptian temple warm light", 1200],
  "journal-how-many-days-in-egypt": ["Nile river desert aerial Egypt", 1200],
  "journal-luxor-beyond-the-valley-of-the-kings": ["Theban necropolis tomb painting", 1200],
  "journal-the-art-of-the-private-nile": ["dahabiya deck Nile river", 1200],
  "journal-what-to-pack-for-egypt": ["desert travel hat linen", 1200],
};

const stripHtml = (s) => (s ? String(s).replace(/<[^>]*>/g, "").trim() : "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchRetry(url, label, tries = 5) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (r.ok) return r;
    if (r.status === 429 || r.status >= 500) {
      await sleep(1500 * attempt);
      continue;
    }
    throw new Error(`${label} ${r.status}`);
  }
  throw new Error(`${label} 429 (gave up)`);
}

async function fetchOne(key, query, width) {
  const api =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "10",
      prop: "imageinfo",
      iiprop: "url|mime|extmetadata",
      iiurlwidth: String(width),
    });

  const res = await fetchRetry(api, "api");
  const json = await res.json();
  const pages = json?.query?.pages;
  if (!pages) throw new Error("no results");

  const candidates = Object.values(pages)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .filter((p) => p.imageinfo?.[0] && /image\/(jpeg|png)/.test(p.imageinfo[0].mime));

  if (!candidates.length) throw new Error("no usable image");
  const page = candidates[0];
  const ii = page.imageinfo[0];
  const filename = page.title.replace(/^File:/, "");

  // Download via Special:FilePath (commons domain) — the upload.* thumb hosts 403 bots.
  const dl =
    `https://commons.wikimedia.org/wiki/Special:FilePath/` +
    `${encodeURIComponent(filename)}?width=${width}`;
  const buf = await fetchRetry(dl, "img");
  if (!buf.body) throw new Error("img empty");
  const file = path.join(OUT, `${key}.jpg`);
  await pipeline(Readable.fromWeb(buf.body), createWriteStream(file));

  const meta = ii.extmetadata || {};
  return {
    key,
    path: `/images/${key}.jpg`,
    title: stripHtml(meta.ObjectName?.value) || query,
    artist: stripHtml(meta.Artist?.value) || "Unknown",
    license: stripHtml(meta.LicenseShortName?.value) || "",
    source: ii.descriptionurl || "",
  };
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const entries = Object.entries(JOBS);

  // Resume: keep images already downloaded; only fetch the gaps.
  let manifest = {};
  let credits = [];
  try { manifest = JSON.parse(await readFile("data/image-manifest.json", "utf8")); } catch {}
  try { credits = JSON.parse(await readFile(path.join(OUT, "credits.json"), "utf8")); } catch {}

  let ok = 0;
  let fail = 0;
  let skip = 0;

  // Sequential, with a polite delay — Wikimedia throttles bursts (429).
  for (const [key, [q, w]] of entries) {
    if (manifest[key] && existsSync(path.join(OUT, `${key}.jpg`))) {
      skip++;
      continue;
    }
    try {
      const r = await fetchOne(key, q, w);
      manifest[r.key] = r.path;
      credits.push(r);
      ok++;
      console.log(`ok   ${key}`);
    } catch (e) {
      fail++;
      console.log(`MISS ${key} — ${e?.message ?? e}`);
    }
    await sleep(400);
  }

  await writeFile("data/image-manifest.json", JSON.stringify(manifest, null, 2));
  await writeFile(path.join(OUT, "credits.json"), JSON.stringify(credits, null, 2));
  console.log(`\nDone. ${ok} new, ${skip} kept, ${fail} still missing. Manifest: ${Object.keys(manifest).length} keys.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
