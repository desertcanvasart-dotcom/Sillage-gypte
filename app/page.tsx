import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import TourCard from "@/components/TourCard";
import { getDestination } from "@/data/destinations";
import { getTour } from "@/data/tours";
import { getLocale, localePath } from "@/lib/i18n";
import { loadContent } from "@/lib/content";
import { getDict } from "@/lib/dictionaries";
import { getMetaDict, pageMetadata } from "@/lib/meta-dict";

const HOME_DESTINATIONS = ["luxor", "aswan", "cairo", "abu-simbel"];
// The three longest journeys, shown with image + price (TourCard handles locale).
const HOME_JOURNEYS = ["beyond-the-nile", "complete-egypt", "nile-red-sea"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).root;
  return pageMetadata({
    locale,
    path: "/",
    title: m.title,
    description: m.description,
    image: "home-hero",
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDict(locale);
  const p = (path: string) => localePath(locale, path);
  const destinations = await Promise.all(
    HOME_DESTINATIONS.map(async (slug) => {
      const d = getDestination(slug)!;
      const c = await loadContent<{ title?: string }>("destinations", slug, locale);
      return { slug, data: d, name: c?.title ?? d.name };
    })
  );
  const journeys = HOME_JOURNEYS.map((s) => getTour(s)!);

  return (
    <main className="warm">
      {/* HERO */}
      <div className="hhero">
        <Photo k="home-hero" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="wrap">
          <span className="eyebrow kicker">{t.home.kicker}</span>
          <h1 className="display" style={{ whiteSpace: "pre-line" }}>
            {t.home.h1a}
            <em>{t.home.h1em}</em>
            {t.home.h1b}
          </h1>
          <p className="lede">{t.home.lede}</p>
          <div className="acts">
            <Link className="wbtn solid" href={p("/tours")}>
              {t.home.viewJourneys}
            </Link>
            <Link className="wbtn light" href={p("/plan")}>
              {t.home.planOwn}
            </Link>
          </div>
        </div>
        <span className="scrollcue">{t.home.scroll}</span>
      </div>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <span className="eyebrow">{t.home.manifestoEyebrow}</span>
          <p>
            {t.home.manifestoA}
            <em>{t.home.manifestoEm}</em>
            {t.home.manifestoB}
          </p>
        </div>
      </section>

      {/* THE CONTRAST */}
      <section className="contrast">
        <div className="head">
          <span className="eyebrow">{t.home.contrastEyebrow}</span>
          <h2 className="display" style={{ marginTop: "1rem" }}>
            {t.home.contrastH2}
          </h2>
          <p>{t.home.contrastP}</p>
        </div>
        <div className="split">
          <div className="side them">
            <div className="label">{t.home.themLabel}</div>
            <h3>{t.home.themH3}</h3>
            <ul>
              {t.home.themItems.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
          <div className="side us">
            <div className="label">{t.home.usLabel}</div>
            <h3>{t.home.usH3}</h3>
            <ul>
              {t.home.usItems.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="dest" id="destinations">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">{t.home.whereEyebrow}</span>
              <h2 className="display">{t.home.destH2}</h2>
            </div>
            <Link className="all" href={p("/destinations")}>
              {t.home.allDest}
            </Link>
          </div>
          <div className="dgrid">
            {destinations.map((d) => (
              <Link className="dcard" href={p(`/destinations/${d.slug}`)} key={d.slug}>
                <div className="ph" role="img" aria-label={d.data.heroLabel} />
                <Photo k={`dest-${d.slug}`} alt={d.name} />
                <div className="cap">
                  <span className="eyebrow">{t.home.destEyebrows[d.slug]}</span>
                  <h3>{d.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEYS */}
      <section className="jour" id="journeys">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">{t.home.howEyebrow}</span>
              <h2 className="display">{t.home.jourH2}</h2>
            </div>
            <Link className="all" href={p("/tours")}>
              {t.home.allJour}
            </Link>
          </div>
          <div className="tours-grid">
            {journeys.map((j, i) => (
              <TourCard key={j.slug} tour={j} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pillars">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t.home.pillarsEyebrow}</span>
            <h2 className="display">{t.home.pillarsH2}</h2>
          </div>
          <div className="pgrid">
            {t.home.pillars.map((pillar, i) => (
              <div className="pillar" key={i}>
                <span className="n">{["I", "II", "III", "IV"][i]}</span>
                <h3>{pillar.h}</h3>
                <p>{pillar.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote">
        <div className="wrap">
          <blockquote>{t.home.quote}</blockquote>
          <cite>{t.home.quoteCite}</cite>
        </div>
      </section>

      {/* THE NAME */}
      <section className="namesec">
        <div className="wrap">
          <div className="word">{t.home.nameWord}</div>
          <div className="pron">{t.home.namePron}</div>
          <p>{t.home.nameBody}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="plan">
        <div className="wrap">
          <span className="eyebrow">{t.home.ctaEyebrow}</span>
          <h2 className="display" style={{ marginTop: "1.2rem" }}>
            {t.home.ctaH2a}
            <em>{t.home.ctaH2em}</em>.
          </h2>
          <p>{t.home.ctaP}</p>
          <Link className="wbtn solid" href={p("/plan")}>
            {t.home.ctaBtn}
          </Link>
          <p className="note">{t.home.ctaNote}</p>
        </div>
      </section>
    </main>
  );
}
