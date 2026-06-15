import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { ArrowRight } from "@/components/icons";
import { getLocale, localePath } from "@/lib/i18n";
import { getGuidesAboutDict } from "@/lib/guides-about-dict";

export const metadata: Metadata = {
  title: "About Sillage Égypte",
  description:
    "We are a small team of Egyptologists and journey designers who build private journeys across Egypt — one traveller, one conversation, one country at a time.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const d = getGuidesAboutDict(locale);
  const t = d.about;
  const p = (path: string) => localePath(locale, path);

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
        gradient="ancient"
        imageLabel="An Egyptologist studying carvings on a temple wall"
        imageKey="dest-cairo"
        crumbs={[{ href: p("/"), label: d.crumbHome }, { label: t.crumb }]}
      />

      <section className="section why-section">
        <div className="container">
          <p className="lead reveal" style={{ marginBottom: "96px" }}>
            {t.leadPre}
            <em>{t.leadEm}</em>
            {t.leadPost}
          </p>

          {/* Block 1 — story */}
          <div className="why-grid" style={{ marginBottom: "120px" }}>
            <div className="why-image reveal">
              <div className="why-image-inner">
                <div className="why-image-bg media-grad--oasis" role="img" aria-label="A guide and traveller at a quiet ancient site" />
              </div>
              <div className="why-image-accent" />
            </div>
            <div className="why-text reveal reveal-delay-2">
              <p className="section-eyebrow">{t.block1Eyebrow}</p>
              <h2 className="why-title">
                {t.block1TitlePre}
                <em>{t.block1TitleEm}</em>
                {t.block1TitlePost}
              </h2>
              <p className="why-body">{t.block1Body}</p>
              <Link href={p("/guides")} className="btn-outline">
                {t.block1Btn}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Block 2 — approach */}
          <div className="why-grid reversed">
            <div className="why-image reveal reveal-delay-2">
              <div className="why-image-inner">
                <div className="why-image-bg media-grad--desert" role="img" aria-label="A private desert camp at dusk" />
              </div>
              <div className="why-image-accent" />
            </div>
            <div className="why-text reveal">
              <p className="section-eyebrow">{t.block2Eyebrow}</p>
              <h2 className="why-title">
                {t.block2TitlePre}
                <em>{t.block2TitleEm}</em>
                {t.block2TitlePost}
              </h2>
              <p className="why-body">{t.block2Body}</p>
              <Link href={p("/tours")} className="btn-outline">
                {t.block2Btn}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promise band (dark) */}
      <section className="guides-section" aria-label={t.promiseEyebrow}>
        <div className="container">
          <div className="center-col reveal">
            <p className="section-eyebrow" style={{ color: "var(--sand)" }}>
              {t.promiseEyebrow}
            </p>
            <h2 className="section-title" style={{ color: "white" }}>
              {t.promiseTitlePre}
              <em>{t.promiseTitleEm}</em>
              {t.promiseTitlePost}
            </h2>
            <p
              className="section-body"
              style={{ color: "rgba(255,255,255,0.7)", margin: "0 auto" }}
            >
              {t.promiseBody}
            </p>
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
