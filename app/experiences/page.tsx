import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, PinIcon } from "@/components/icons";
import { experiences } from "@/data/experiences";
import { getLocale, localePath } from "@/lib/i18n";
import { getMetaDict, pageMetadata } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { getPagesDict } from "@/lib/pages-dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).experiences;
  return pageMetadata({
    locale,
    path: "/experiences",
    title: m.title,
    description: m.description,
    image: "exp-balloon-over-luxor",
  });
}

export default async function ExperiencesPage() {
  const locale = await getLocale();
  const t = getPagesDict(locale).experiences;
  const p = (path: string) => localePath(locale, path);
  const discover = locale === "es" ? "Descubrir" : locale === "fr" ? "Découvrir" : "Discover";
  const cards = await Promise.all(
    experiences.map(async (exp) => {
      const c = await loadContent<{ title?: string; location?: string; description?: string; timing?: string }>("experiences", exp.slug, locale);
      return { ...exp, title: c?.title ?? exp.title, location: c?.location ?? exp.location, description: c?.description ?? exp.description, timing: c?.timing ?? exp.timing };
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
        imageLabel="A hot-air balloon rising over the temples of Luxor at dawn"
        imageKey="exp-balloon-over-luxor"
        crumbs={[{ href: locale === "es" ? "/es" : "/", label: getPagesDict(locale).crumbHome }, { label: t.eyebrow }]}
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

          <div className="feature-grid">
            {cards.map((exp, i) => (
              <Link
                key={exp.slug}
                href={p(`/experiences/${exp.slug}`)}
                className={`feature-card reveal${i % 2 > 0 ? " reveal-delay-1" : ""}`}
              >
                <div className="feature-card-media">
                  <div className={`media-grad--${exp.gradient}`} role="img" aria-label={exp.heroLabel} />
                  <Photo k={`exp-${exp.slug}`} alt={exp.title} />
                </div>
                <div className="feature-card-body">
                  <p className="feature-card-eyebrow">{exp.location}</p>
                  <h2 className="feature-card-title">{exp.title}</h2>
                  <p className="feature-card-desc">{exp.description}</p>
                  <div className="feature-card-meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <PinIcon />
                      {exp.timing}
                    </span>
                    <span className="feature-card-link" style={{ marginLeft: "auto" }}>
                      {discover}
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
