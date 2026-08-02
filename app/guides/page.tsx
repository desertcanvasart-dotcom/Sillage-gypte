import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { ArrowRight } from "@/components/icons";
import { guides } from "@/data/guides";
import { getLocale, localePath } from "@/lib/i18n";
import { getMetaDict, localeAlternates } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";
import { getGuidesAboutDict } from "@/lib/guides-about-dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).guides;
  return {
    title: m.title,
    description: m.description,
    alternates: localeAlternates(locale, "/guides"),
  };
}

export default async function GuidesPage() {
  const locale = await getLocale();
  const d = getGuidesAboutDict(locale);
  const t = d.guides;
  const p = (path: string) => localePath(locale, path);

  const cards = await Promise.all(
    guides.map(async (g) => {
      const c = await loadContent<{ title?: string; shortBio?: string; specialisms?: string[] }>(
        "guides",
        g.slug,
        locale
      );
      return {
        ...g,
        title: c?.title ?? g.title,
        shortBio: c?.shortBio ?? g.shortBio,
        specialisms: c?.specialisms ?? g.specialisms,
      };
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
            {t.titlePost}
          </>
        }
        subtitle={t.subtitle}
        gradient="oasis"
        imageLabel="A guide reading hieroglyphs on a temple column"
        imageKey="dest-luxor"
        crumbs={[{ href: p("/"), label: d.crumbHome }, { label: t.crumb }]}
      />

      <section className="section">
        <div className="container">
          <div className="index-intro">
            <p className="lead reveal">
              {t.introLeadPre}
              <em>{t.introLeadEm}</em>
              {t.introLeadPost}
            </p>
            <p className="section-body reveal reveal-delay-1">{t.introBody}</p>
          </div>

          <div className="team-grid">
            {cards.map((guide, i) => (
              <Link
                key={guide.slug}
                href={p(`/guides/${guide.slug}`)}
                className={`person-card reveal${i % 3 > 0 ? ` reveal-delay-${i % 3}` : ""}`}
              >
                <div className={`person-avatar media-grad--${guide.gradient}`}>
                  <span>{guide.initials}</span>
                </div>
                <p className="person-name">{guide.name}</p>
                <p className="person-title">{guide.title}</p>
                <p className="person-bio">{guide.shortBio}</p>
                <div className="tag-row">
                  {guide.specialisms.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <span className="feature-card-link" style={{ marginTop: "22px" }}>
                  {t.readProfile}
                  <ArrowRight size={12} />
                </span>
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
            {t.ctaPost}
          </>
        }
        body={t.ctaBody}
      />
    </main>
  );
}
