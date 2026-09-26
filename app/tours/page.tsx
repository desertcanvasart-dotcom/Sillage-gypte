import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import CtaBand from "@/components/CtaBand";
import { tours } from "@/data/tours";
import { getLocale } from "@/lib/i18n";
import { getMetaDict, pageMetadata } from "@/lib/meta-dict";
import { getPagesDict } from "@/lib/pages-dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).tours;
  return pageMetadata({
    locale,
    path: "/tours",
    title: m.title,
    description: m.description,
    image: "tour-complete-egypt",
  });
}

export default async function ToursPage() {
  const locale = await getLocale();
  const t = getPagesDict(locale).tours;
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
        gradient="nile"
        imageLabel="A felucca on the Nile at golden hour"
        imageKey="tour-complete-egypt"
        crumbs={[{ href: locale === "es" ? "/es" : "/", label: getPagesDict(locale).crumbHome }, { label: t.eyebrow }]}
      />

      <section className="section tours-section" aria-label="All journeys">
        <div className="container">
          <div className="index-intro">
            <p className="lead reveal">
              {t.introLead}
              <em>{t.introLeadEm}</em>
              {t.introBody}
            </p>
          </div>

          <div className="tours-grid">
            {tours.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} index={i} />
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
