import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { ArrowRight } from "@/components/icons";
import { sortedJournal } from "@/data/journal";
import { getLocale, localePath } from "@/lib/i18n";
import { getMetaDict, localeAlternates } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { getPagesDict } from "@/lib/pages-dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).journal;
  return {
    title: m.title,
    description: m.description,
    alternates: localeAlternates(locale, "/journal"),
  };
}

export default async function JournalPage() {
  const locale = await getLocale();
  const t = getPagesDict(locale).journal;
  const p = (path: string) => localePath(locale, path);
  const read = locale === "es" ? "Leer" : locale === "fr" ? "Lire" : "Read";
  const cards = await Promise.all(
    sortedJournal.map(async (post) => {
      const c = await loadContent<{ title?: string; excerpt?: string; category?: string; dateLabel?: string; readTime?: string }>("journal", post.slug, locale);
      return { ...post, title: c?.title ?? post.title, excerpt: c?.excerpt ?? post.excerpt, category: c?.category ?? post.category, dateLabel: c?.dateLabel ?? post.dateLabel, readTime: c?.readTime ?? post.readTime };
    })
  );

  return (
    <main>
      <PageHero
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titlePre}
            <em>{t.titleEm}</em>
          </>
        }
        subtitle={t.subtitle}
        gradient="sunset"
        imageLabel="Warm afternoon light across an Egyptian landscape"
        imageKey="journal-when-to-go-to-egypt"
        crumbs={[{ href: locale === "es" ? "/es" : "/", label: getPagesDict(locale).crumbHome }, { label: t.eyebrow }]}
      />

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {cards.map((post, i) => (
              <Link
                key={post.slug}
                href={p(`/journal/${post.slug}`)}
                className={`feature-card reveal${i % 2 > 0 ? " reveal-delay-1" : ""}`}
              >
                <div className="feature-card-media">
                  <div className={`media-grad--${post.gradient}`} role="img" aria-label={post.heroLabel} />
                  <Photo k={`journal-${post.slug}`} alt={post.title} />
                </div>
                <div className="feature-card-body">
                  <p className="feature-card-eyebrow">{post.category}</p>
                  <h2 className="feature-card-title">{post.title}</h2>
                  <p className="feature-card-desc">{post.excerpt}</p>
                  <div className="feature-card-meta">
                    <time dateTime={post.date}>{post.dateLabel}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                    <span className="feature-card-link" style={{ marginLeft: "auto" }}>
                      {read}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            {t.ctaPre}
            <em>{t.ctaEm}</em>
          </>
        }
        body={t.ctaBody}
      />
    </main>
  );
}
