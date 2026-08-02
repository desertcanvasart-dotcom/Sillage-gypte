export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import { getLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";

interface Guide {
  slug: string;
  title: string;
  description: string;
  imgVars: Record<string, string>;
  bodyHtml: string;
}

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const g = await loadContent<Guide>("destinations", slug, locale);
  if (!g) return { title: "Destination not found" };
  return {
    title: g.title,
    description: g.description,
    alternates: localeAlternates(locale, `/destinations/${slug}`),
    openGraph: { title: g.title, description: g.description, url: `/destinations/${slug}` },
  };
}

export default async function DestinationGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const g = await loadContent<Guide>("destinations", slug, locale);
  if (!g) notFound();

  return (
    <div className={`dg dg-${slug}`} style={g.imgVars as React.CSSProperties}>
      <div dangerouslySetInnerHTML={{ __html: g.bodyHtml }} />
    </div>
  );
}
