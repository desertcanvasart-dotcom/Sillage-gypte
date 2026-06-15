/**
 * Builds the Privacy & Cookie Policy and Terms & Conditions pages from the
 * supplied HTML designs, preserving their EXACT words. For each file it:
 *   - extracts <title> and the meta description (for page metadata),
 *   - strips the file's own masthead + footer (the site supplies global ones)
 *     and the <script>/<style>/<head> (CSS is ported separately, scoped),
 *   - points the in-document "Privacy & Cookie Policy" cross-link at /privacy,
 *   - writes content/legal/<slug>.json for the page to render verbatim.
 * No content words are added, removed or changed.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const FILES = [
  { slug: "privacy", file: "privacy-cookie-policy (1).html" },
  { slug: "terms", file: "terms-and-conditions.html" },
];

const SRC = path.resolve("Destinations");
const OUT = path.resolve("content/legal");

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

async function processOne({ slug, file }) {
  const raw = await readFile(path.join(SRC, file), "utf8");

  const title = text(/<title>([^<]*)<\/title>/, raw)
    .replace(/\s*\|\s*Sillage Égypte\s*$/, "")
    .trim();
  const description = text(/<meta name="description" content="([^"]*)"/, raw);

  // body inner
  let body = firstMatch(/<body>([\s\S]*?)<\/body>/, raw);

  // strip the file's own masthead + footer (site supplies global chrome)
  body = body.replace(/<header class="masthead">[\s\S]*?<\/header>/, "");
  body = body.replace(/<footer>[\s\S]*?<\/footer>/, "");
  // drop any <script> just in case
  body = body.replace(/<script[\s\S]*?<\/script>/g, "");

  // the only in-body placeholder link is Terms' cross-reference to the policy
  body = body.replace(
    /<a href="#">Privacy &amp; Cookie Policy<\/a>/g,
    '<a href="/privacy">Privacy &amp; Cookie Policy</a>'
  );

  body = body.trim();

  await writeFile(
    path.join(OUT, `${slug}.json`),
    JSON.stringify({ slug, title, description, bodyHtml: body }, null, 2)
  );
  return slug;
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const built = [];
  for (const f of FILES) built.push(await processOne(f));
  console.log("Built legal pages:", built.join(", "));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
