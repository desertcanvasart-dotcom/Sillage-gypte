export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { experiences, getExperience } from "@/data/experiences";
import { getLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { SITE_URL, orgRef } from "@/lib/structured-data";

interface Doc { seoTitle?: string; description?: string; title?: string; bodyHtml: string; imgVars?: Record<string, string> }

/**
 * Neutral access caveat shown on every experience page. None of the six has
 * had its delivery conditions (permit, extra cost, notice period,
 * availability) confirmed by the operator yet. When one is confirmed, replace
 * this with a "How this works" note built from those conditions. Unpublish an
 * experience that turns out not to be deliverable.
 */
const ACCESS_NOTE: Record<Locale, string> = {
  en: "Subject to special permission and availability; we confirm the conditions and cost before you book.",
  es: "Sujeto a permiso especial y a disponibilidad; confirmamos las condiciones y el coste antes de que reserve.",
  fr: "Sous réserve d’une autorisation spéciale et de disponibilité ; nous confirmons les conditions et le coût avant votre réservation.",
  nl: "Onder voorbehoud van speciale toestemming en beschikbaarheid; wij bevestigen de voorwaarden en de kosten voordat u boekt.",
  de: "Vorbehaltlich einer Sondergenehmigung und der Verfügbarkeit; wir bestätigen die Bedingungen und die Kosten, bevor Sie buchen.",
};

/** Place the caveat directly under the at-a-glance ledger, where access is stated. */
function withAccessNote(html: string, note: string): string {
  const block = `<div class="access-note"><div class="wrap"><p>${note}</p></div></div>\n\n`;
  const anchor = "<!-- OVERVIEW -->";
  return html.includes(anchor) ? html.replace(anchor, block + anchor) : block + html;
}

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
  return pageMetadata({
    locale,
    path: `/experiences/${exp.slug}`,
    title: doc?.seoTitle ?? exp.seo.title,
    description: doc?.description ?? exp.seo.description,
    image: doc?.imgVars?.["--img-hero"],
  });
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
        dangerouslySetInnerHTML={{ __html: withAccessNote(doc.bodyHtml, ACCESS_NOTE[locale]) }}
      />
    </>
  );
}
