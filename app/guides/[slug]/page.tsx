export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import TourCard from "@/components/TourCard";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { guides, getGuide } from "@/data/guides";
import { tours } from "@/data/tours";
import { SITE_URL, orgRef } from "@/lib/structured-data";
import { getImage } from "@/lib/images";
import { getLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { getGuidesAboutDict } from "@/lib/guides-about-dict";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  const locale = await getLocale();
  const c = await loadContent<{ title?: string; shortBio?: string }>("guides", guide.slug, locale);
  return pageMetadata({
    locale,
    path: `/guides/${guide.slug}`,
    title: `${guide.name} — ${c?.title ?? guide.title}`,
    description: (c?.shortBio ?? guide.shortBio) || `${guide.name}, ${c?.title ?? guide.title}.`,
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const locale = await getLocale();
  const d = getGuidesAboutDict(locale);
  const t = d.detail;
  const p = (path: string) => localePath(locale, path);

  const c = await loadContent<{
    title?: string;
    fullBio?: string;
    shortBio?: string;
    credentials?: string[];
    specialisms?: string[];
  }>("guides", guide.slug, locale);

  const title = c?.title ?? guide.title;
  const fullBio = c?.fullBio ?? guide.fullBio;
  const shortBio = c?.shortBio ?? guide.shortBio;
  const credentials = c?.credentials ?? guide.credentials;
  const specialisms = c?.specialisms ?? guide.specialisms;

  const led = tours.filter((tr) => tr.guideSlug === guide.slug).slice(0, 3);
  const firstName = guide.name.replace(/^Dr\.?\s/, "").split(" ")[0];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: guide.name,
    jobTitle: title,
    // Omit what the profile does not yet state.
    ...(shortBio ? { description: shortBio } : {}),
    ...(guide.photo && getImage(guide.photo) ? { image: `${SITE_URL}${getImage(guide.photo)}` } : {}),
    ...(guide.languages.length ? { knowsLanguage: guide.languages } : {}),
    ...(specialisms.length ? { knowsAbout: specialisms } : {}),
    worksFor: orgRef,
    url: `${SITE_URL}/guides/${guide.slug}`,
  };

  return (
    <main>
      <JsonLd data={personSchema} />
      <PageHero
        eyebrow={t.eyebrow}
        title={guide.name}
        subtitle={title}
        gradient={guide.gradient}
        imageLabel={`A portrait setting for ${guide.name}`}
        crumbs={[
          { href: p("/"), label: d.crumbHome },
          { href: p("/guides"), label: t.crumb },
          { label: guide.name },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="detail-layout">
            <div>
              {/* Biography, credentials and specialisms stay hidden until supplied. */}
              {!guide.profilePending && (
              <>
              <div className="detail-block reveal">
                <h2 className="detail-h">{t.about(firstName)}</h2>
                {fullBio.split(/\n\s*\n/).map((para, i) => (
                  <p className="detail-p" key={i}>
                    {para}
                  </p>
                ))}
              </div>

              {credentials.length > 0 && (
              <div className="detail-block reveal">
                <h2 className="detail-h">{t.credentials}</h2>
                <ul className="tick-list">
                  {credentials.map((cr) => (
                    <li className="tick-item" key={cr}>
                      <CheckIcon />
                      <span>{cr}</span>
                    </li>
                  ))}
                </ul>
              </div>
              )}

              {specialisms.length > 0 && (
              <div className="detail-block reveal">
                <h2 className="detail-h">{t.specialisms}</h2>
                <div className="tag-row" style={{ marginTop: 0 }}>
                  {specialisms.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              )}
              </>
              )}
            </div>

            <aside>
              {guide.photo && (
                <div className="guide-portrait reveal">
                  <Photo k={guide.photo} alt={`${guide.name}, ${title}`} />
                </div>
              )}
              <div className="book-card reveal">
                <p className="book-card-label">{t.travelWith(firstName)}</p>
                <div className="book-row">
                  <span>{t.role}</span>
                  <span>{title.split(/[\s,—]/)[0]}</span>
                </div>
                {guide.languages.length > 0 && (
                  <div className="book-row">
                    <span>{t.languages}</span>
                    <span>{guide.languages.join(", ")}</span>
                  </div>
                )}
                <p className="book-note">{t.bookNote(firstName)}</p>
                <Link href={p("/plan")} className="btn-primary">
                  {t.request(firstName)}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {led.length > 0 && (
        <section className="section tours-section" aria-label="Journeys led by this guide">
          <div className="container">
            <div className="related-head reveal">
              <h2 className="section-title">
                {t.journeysPre}
                {firstName} <em>{t.journeysEm}</em>
              </h2>
              <Link href={p("/tours")} className="tours-view-all">
                {t.allJourneys}
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="tours-grid">
              {led.map((tr, i) => (
                <TourCard key={tr.slug} tour={tr} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={
          <>
            {t.ctaPre(firstName)}
            <em>{t.ctaEm}</em>
            {t.ctaPost}
          </>
        }
        body={t.ctaBody}
      />
    </main>
  );
}
