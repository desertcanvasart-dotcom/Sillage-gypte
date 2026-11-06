import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { isJournalPublished, publishedJournal, hideUnpublishedJournalLinks } from "../lib/journal-publication.mjs";

const posts = JSON.parse(readFileSync(new URL("../data/journal-scheduled.json", import.meta.url)));

test("all 22 articles release individually at their exact timestamp", () => {
  assert.equal(posts.length, 22);
  assert.equal(new Set(posts.map(p => p.slug)).size, 22);
  posts.forEach((post, i) => {
    const release = Date.parse(post.publishAt);
    assert.equal(isJournalPublished(post, release - 1), false, post.slug);
    assert.equal(isJournalPublished(post, release), true, post.slug);
    assert.equal(publishedJournal(posts, release).length, i + 1, post.slug);
    assert.equal(publishedJournal(posts, release)[0].slug, post.slug);
    if (i > 0) {
      assert.match(post.publishAt, /T09:00:00\+02:00$/);
      assert.equal(new Intl.DateTimeFormat("en-GB", {timeZone:"Africa/Cairo",hour:"2-digit",minute:"2-digit"}).format(release), "09:00");
    }
  });
});

test("the publication clock is evaluated again without a restart", () => {
  const post = posts[1];
  const release = Date.parse(post.publishAt);
  assert.equal(publishedJournal([post], release - 1).length, 0);
  assert.equal(publishedJournal([post], release).length, 1);
});

test("legacy articles remain public; drafts and invalid timestamps fail closed", () => {
  assert.equal(isJournalPublished({date:"2026-06-08"}), true);
  assert.equal(isJournalPublished({...posts[0],status:"draft"}, Infinity), false);
  assert.equal(isJournalPublished({publishAt:"invalid"}), false);
});

test("future journal links become plain text, including locale and absolute links", () => {
  const content = '<a href="/journal/future">future</a> <a href="/fr/journal/future#faq"><em>French</em></a> <a href="https://sillage-egypte.com/journal/future">absolute</a> <a href="/journal/live">live</a> <a href="https://example.org/journal/future">external</a>';
  const filtered = hideUnpublishedJournalLinks(content,["live"]);
  assert.ok(filtered.startsWith('future <em>French</em> absolute'));
  assert.match(filtered,/href="\/journal\/live"/);
  assert.match(filtered,/href="https:\/\/example.org/);
  assert.equal(hideUnpublishedJournalLinks(content,["live","future"]),content);
});

test("every article has real images, SEO fields, complete body and matching visible FAQs", () => {
  const manifest = JSON.parse(readFileSync(new URL("../data/image-manifest.json",import.meta.url)));
  for(const post of posts) {
    const doc = JSON.parse(readFileSync(new URL(`../content/journal/${post.slug}.json`,import.meta.url)));
    assert.ok(doc.seoTitle && doc.description && doc.imageAlt,post.slug);
    assert.equal((doc.bodyHtml.match(/<h1\b/g)||[]).length,1,post.slug);
    assert.ok(doc.bodyHtml.length > 7000,post.slug);
    assert.ok(doc.faq.length >= 4,post.slug);
    assert.ok(existsSync(new URL(`../public${doc.img}`,import.meta.url)),post.slug);
    assert.ok(existsSync(new URL(`../public${doc.img.replace(/\.jpg$/,'.webp')}`,import.meta.url)),post.slug);
    assert.equal(manifest[`journal-${post.slug}`],doc.img);
    assert.doesNotMatch(doc.bodyHtml,/\[(?:VERIFY|OWNER|TODO|CHECK)\b|\uFFFD/);
    for(const faq of doc.faq) {
      assert.ok(faq.question && faq.answer);
      assert.ok(doc.bodyHtml.includes(faq.question.replaceAll('&','&amp;')),faq.question);
    }
  }
});
