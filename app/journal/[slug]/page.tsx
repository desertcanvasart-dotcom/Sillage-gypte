export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";
import { journal, getPost, sortedJournal } from "@/data/journal";
import { getLocale, localePath } from "@/lib/i18n";
import { loadContent } from "@/lib/content";
import { SITE_URL, orgRef } from "@/lib/structured-data";

interface Bespoke { seoTitle?: string; description?: string; img: string; bodyHtml: string }

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  const locale = await getLocale();
  const doc = await loadContent<Bespoke>("journal", slug, locale);
  return {
    title: doc?.seoTitle ?? post.seo.title,
    description: doc?.description ?? post.seo.description,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: doc?.seoTitle ?? post.seo.title,
      description: doc?.description ?? post.seo.description,
      url: `${SITE_URL}/journal/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const locale = await getLocale();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    image: `${SITE_URL}/og-image.jpg`,
    author: { "@type": "Person", name: post.author },
    publisher: orgRef,
    isPartOf: orgRef,
    mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
  };

  if (post.bespoke) {
    const doc = await loadContent<Bespoke>("journal", slug, locale);
    if (doc) {
      return (
        <main>
          <JsonLd data={articleSchema} />
          <div
            className="jp"
            style={{ ["--img-hero" as string]: `url("${doc.img}")` }}
            dangerouslySetInnerHTML={{ __html: doc.bodyHtml }}
          />
        </main>
      );
    }
  }

  const more = sortedJournal.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <main>
      <JsonLd data={articleSchema} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        gradient={post.gradient}
        imageLabel={post.heroLabel}
        imageKey={`journal-${post.slug}`}
        crumbs={[
          { href: localePath(locale, "/"), label: "Home" },
          { href: localePath(locale, "/journal"), label: "Journal" },
          { label: post.title },
        ]}
        short
      />
      <article className="section">
        <div className="container">
          <div className="prose reveal">
            {post.content.map((block, i) =>
              block.type === "heading" ? <h2 key={i}>{block.text}</h2> : <p key={i}>{block.text}</p>
            )}
          </div>
        </div>
      </article>
      <section className="section tours-section" aria-label="More reading">
        <div className="container">
          <div className="feature-grid">
            {more.map((p, i) => (
              <Link key={p.slug} href={localePath(locale, `/journal/${p.slug}`)} className={`feature-card reveal${i % 2 > 0 ? " reveal-delay-1" : ""}`}>
                <div className="feature-card-media">
                  <div className={`media-grad--${p.gradient}`} role="img" aria-label={p.heroLabel} />
                  <Photo k={`journal-${p.slug}`} alt={p.title} />
                </div>
                <div className="feature-card-body">
                  <p className="feature-card-eyebrow">{p.category}</p>
                  <h3 className="feature-card-title">{p.title}</h3>
                  <p className="feature-card-desc">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={<>Ready to <em>go?</em></>} body="When the idea becomes a plan, tell us what draws you to Egypt and we'll design a private journey around it." />
    </main>
  );
}
