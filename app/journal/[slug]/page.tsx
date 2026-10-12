export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { journal, getPost, sortedJournal } from "@/data/journal";
import { getLocale, localePath } from "@/lib/i18n";
import { pageMetadata, heroImage, localizedUrl } from "@/lib/meta-dict";
import { getPagesDict } from "@/lib/pages-dict";
import { loadContent } from "@/lib/content";
import { SITE_URL, orgRef, buildBreadcrumb } from "@/lib/structured-data";
import { FOUNDER } from "@/data/site";

interface Bespoke {
  seoTitle?: string;
  description?: string;
  img: string;
  bodyHtml: string;
  /** Question/answer pairs shown in the article; emitted as FAQPage JSON-LD. */
  faq?: { question: string; answer: string }[];
}

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
  return pageMetadata({
    locale,
    path: `/journal/${post.slug}`,
    title: doc?.seoTitle ?? post.seo.title,
    description: doc?.description ?? post.seo.description,
    image: doc?.img ?? `journal-${post.slug}`,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
  });
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
  const doc = await loadContent<Bespoke & { title?: string }>("journal", slug, locale);

  // Schema must describe this locale's page: its own headline, summary, URL and hero image.
  const image = heroImage(doc?.img ?? `journal-${post.slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc?.title ?? post.title,
    description: doc?.description ?? post.seo.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    image: image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.jpg`,
    // Brand-written posts are authored by the organisation, not a person of that name.
    author:
      post.author === FOUNDER.name
        ? { "@type": "Person", name: FOUNDER.name, jobTitle: FOUNDER.jobTitle, worksFor: orgRef }
        : orgRef,
    publisher: orgRef,
    isPartOf: orgRef,
    mainEntityOfPage: localizedUrl(locale, `/journal/${post.slug}`),
  };

  if (post.bespoke) {
    if (doc) {
      const faqSchema = doc.faq?.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: locale,
            mainEntity: doc.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }
        : null;
      const breadcrumb = buildBreadcrumb([
        { label: getPagesDict(locale).crumbHome, href: localePath(locale, "/") },
        { label: getPagesDict(locale).journal.eyebrow, href: localePath(locale, "/journal") },
        { label: doc.title ?? post.title },
      ]);
      return (
        <main>
          <JsonLd data={articleSchema} />
          <JsonLd data={breadcrumb} />
          {faqSchema && <JsonLd data={faqSchema} />}
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
