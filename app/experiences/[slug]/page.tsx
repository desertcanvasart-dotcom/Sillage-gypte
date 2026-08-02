export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { experiences, getExperience } from "@/data/experiences";
import { getLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { SITE_URL, orgRef } from "@/lib/structured-data";

interface Doc { seoTitle?: string; description?: string; title?: string; bodyHtml: string; imgVars?: Record<string, string> }

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return { title: "Experience not found" };
  const locale = await getLocale();
  const doc = await loadContent<Doc>("experiences", slug, locale);
  return {
    title: doc?.seoTitle ?? exp.seo.title,
    description: doc?.description ?? exp.seo.description,
    alternates: localeAlternates(locale, `/experiences/${exp.slug}`),
    openGraph: {
      title: doc?.seoTitle ?? exp.seo.title,
      description: doc?.description ?? exp.seo.description,
      url: `${SITE_URL}/experiences/${exp.slug}`,
    },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();
  const locale = await getLocale();
  const doc = await loadContent<Doc>("experiences", slug, locale);
  if (!doc) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: exp.title,
    description: doc.description ?? exp.seo.description,
    url: `${SITE_URL}/experiences/${exp.slug}`,
    isPartOf: orgRef,
    provider: orgRef,
  };

  return (
    <>
      <JsonLd data={schema} />
      <div
        className={`xp xp-${slug}`}
        style={doc.imgVars as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: doc.bodyHtml }}
      />
    </>
  );
}
