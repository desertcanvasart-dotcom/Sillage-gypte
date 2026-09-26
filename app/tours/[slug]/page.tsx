export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { tours, getTour } from "@/data/tours";
import { getLocale } from "@/lib/i18n";
import { pageMetadata, localizedUrl } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { orgRef } from "@/lib/structured-data";

interface Journey { seoTitle?: string; description?: string; imgVars: Record<string, string>; bodyHtml: string }

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return { title: "Journey not found" };
  const locale = await getLocale();
  const doc = await loadContent<Journey>("tours", slug, locale);
  return pageMetadata({
    locale,
    path: `/tours/${tour.slug}`,
    title: doc?.seoTitle ?? tour.seo.title,
    description: doc?.description ?? tour.seo.description,
    image: doc?.imgVars?.["--img-hero"],
  });
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const locale = await getLocale();
  const doc = await loadContent<Journey>("tours", slug, locale);
  if (!doc) notFound();

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: doc.seoTitle ?? tour.title,
    description: doc.description ?? tour.seo.description,
    url: localizedUrl(locale, `/tours/${tour.slug}`),
    inLanguage: locale,
    touristType: "Private travellers",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: localizedUrl(locale, `/plan?journey=${tour.slug}`),
      description:
        "Each journey is priced individually to its design. Contact us to plan; no online booking.",
    },
    provider: orgRef,
    isPartOf: orgRef,
  };

  return (
    <>
      <JsonLd data={tripSchema} />
      <div
        className={`jny jny-${slug}`}
        style={doc.imgVars as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: doc.bodyHtml }}
      />
    </>
  );
}
