/**
 * Re-encodes the photo library for delivery. The originals are stock-sized
 * (most are 3000px wide) and were being served to browsers untouched, because
 * components/Photo.tsx renders a plain <img> — nothing resizes them at runtime.
 *
 * For every JPEG under public/images:
 *   - downscales to MAX_WIDTH (aspect preserved, never upscaled)
 *   - re-encodes progressive mozjpeg and strips EXIF
 *   - writes a .webp sibling that <picture> in Photo.tsx prefers
 *
 * A file is only replaced when the result is meaningfully smaller (see GAIN),
 * which also keeps repeat runs from re-compressing already-optimised images.
 * Originals are recoverable from git history.
 *
 * Run: node scripts/optimize-images.mjs [--dry]
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const MAX_WIDTH = 1920;
const JPEG = { quality: 80, mozjpeg: true, progressive: true };
const WEBP = { quality: 78 };
/** Replace only on at least this much saving — avoids generational re-encoding. */
const GAIN = 0.95;
const CONCURRENCY = 6;

const dry = process.argv.includes("--dry");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.jpe?g$/i.test(entry.name)) yield full;
  }
}

const mb = (n) => (n / 1048576).toFixed(1);

async function optimize(file) {
  const before = (await stat(file)).size;
  const input = await readFile(file);
  const { width } = await sharp(input).metadata();

  const resize = width > MAX_WIDTH ? { width: MAX_WIDTH } : null;
  const pipe = () => (resize ? sharp(input).resize(resize) : sharp(input));

  const jpeg = await pipe().jpeg(JPEG).toBuffer();
  const webp = await pipe().webp(WEBP).toBuffer();

  const replaced = jpeg.length < before * GAIN;
  if (!dry) {
    if (replaced) await writeFile(file, jpeg);
    await writeFile(file.replace(/\.jpe?g$/i, ".webp"), webp);
  }

  return { before, after: replaced ? jpeg.length : before, webp: webp.length, resized: !!resize };
}

const files = [];
for await (const f of walk(ROOT)) files.push(f);
files.sort();

let before = 0;
let after = 0;
let webpTotal = 0;
let resized = 0;
let done = 0;

const queue = [...files];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let file = queue.shift(); file; file = queue.shift()) {
      const r = await optimize(file);
      before += r.before;
      after += r.after;
      webpTotal += r.webp;
      if (r.resized) resized++;
      if (++done % 25 === 0) process.stdout.write(`  ${done}/${files.length}\n`);
    }
  }),
);

console.log(`
files        ${files.length} (${resized} downscaled to ${MAX_WIDTH}px)
jpeg         ${mb(before)} MB -> ${mb(after)} MB
webp         ${mb(webpTotal)} MB
delivered    ${mb(before)} MB -> ${mb(webpTotal)} MB (browsers that take webp)
${dry ? "\n(dry run — nothing written)" : ""}`);
