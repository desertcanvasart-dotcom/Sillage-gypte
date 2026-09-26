import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Photo from "@/components/Photo";
import { destinations } from "@/data/destinations";
import { getLocale, localePath } from "@/lib/i18n";
import { getMetaDict, pageMetadata } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { getPagesDict } from "@/lib/pages-dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).destinations;
  return pageMetadata({
    locale,
    path: "/destinations",
    title: m.title,
    description: m.description,
    image: "home-hero",
  });
}

export default async function DestinationsPage() {
  const locale = await getLocale();
  const t = getPagesDict(locale).destinations;
  const p = (path: string) => localePath(locale, path);
  const isEs = locale === "es";
  const cards = await Promise.all(
    destinations.map(async (d) => {
      const c = await loadContent<{ title?: string; description?: string }>("destinations", d.slug, locale);
      return { ...d, name: c?.title ?? d.name, description: c?.description ?? d.description };
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
        gradient="nile"
        imageLabel="An aerial view of the Nile valley and the desert beyond"
        imageKey="home-hero"
        crumbs={[{ href: isEs ? "/es" : "/", label: getPagesDict(locale).crumbHome }, { label: t.eyebrow }]}
      />

      <section className="section">
        <div className="container">
          <div className="index-intro">
            <p className="lead reveal">
              {t.introLeadPre}
              <em>{t.introLeadEm}</em>
              {t.introBody}
            </p>
          </div>

          <div className="dest-grid">
            {cards.map((d) => (
              <Link key={d.slug} href={p(`/destinations/${d.slug}`)} className="dest-card reveal">
                <div className="dest-card-media">
                  <div className={`media-grad--${d.gradient}`} role="img" aria-label={d.heroLabel} />
                  <Photo k={`dest-${d.slug}`} alt={d.name} />
                </div>
                <div className="dest-card-content">
                  <p className="dest-card-tag">{d.tagline}</p>
                  <h2 className="dest-card-name">{d.name}</h2>
                  <p className="dest-card-desc">{d.description}</p>
                </div>
              </Link>
            ))}

            <Link href={p("/plan")} className="dest-card dest-card--cta reveal">
              <div className="dest-cta-inner">
                <span className="dest-cta-eyebrow">{isEs ? "¿No ves tu Egipto?" : "Don’t see your Egypt?"}</span>
                <span className="dest-cta-title">{isEs ? "Diseña un viaje propio" : "Design a journey of your own"}</span>
                <span className="dest-cta-link">{isEs ? "Planifica tu viaje →" : "Plan your journey →"}</span>
              </div>
            </Link>
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
