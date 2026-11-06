/** Evaluate on every request, never once at server startup. Legacy posts stay public. */
export function isJournalPublished(post, now = Date.now()) {
  if (post.status === "draft") return false;
  if (!post.publishAt) return true;
  const timestamp = Date.parse(post.publishAt);
  return Number.isFinite(timestamp) && timestamp <= Number(now);
}

export function publishedJournal(posts, now = Date.now()) {
  return posts.filter((post) => isJournalPublished(post, now)).sort((a, b) =>
    Date.parse(b.publishAt || b.date) - Date.parse(a.publishAt || a.date)
  );
}

/** Keep prose readable until the linked article is available, including locale URLs. */
export function hideUnpublishedJournalLinks(html, publishedSlugs) {
  const available = new Set(publishedSlugs);
  return html.replace(/<a\b([^>]*\bhref\s*=\s*(["'])(.*?)\2[^>]*)>([\s\S]*?)<\/a>/gi,
    (anchor, _attributes, _quote, href, label) => {
      let pathname;
      try {
        const url = new URL(href.replace(/&amp;/g, "&"), "https://sillage-egypte.com");
        if (!["sillage-egypte.com", "www.sillage-egypte.com"].includes(url.hostname)) return anchor;
        pathname = url.pathname;
      } catch { return anchor; }
      const match = pathname.match(/^\/(?:es\/|fr\/|nl\/|de\/)?journal\/([^/]+)\/?$/);
      return match && !available.has(decodeURIComponent(match[1])) ? label : anchor;
    });
}
