import Link from "next/link";
import type { Tour } from "@/data/tours";
import Photo from "./Photo";
import { ArrowRight, ClockIcon, PrivateIcon } from "./icons";
import { getLocale, localePath } from "@/lib/i18n";
import { loadContent } from "@/lib/content";

const DISCOVER: Record<string, string> = { en: "Discover this journey", es: "Descubre este viaje", fr: "Découvrir ce voyage" };

/**
 * The signature journey card. Used on the homepage and the /tours index so
 * both stay identical. Gradient is driven by the tour's `gradient` field.
 */
export default async function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const locale = await getLocale();
  const c = await loadContent<{ title?: string; tagline?: string }>("tours", tour.slug, locale);
  const title = c?.title ?? tour.title;
  const description = c?.tagline ?? tour.description;
  const delay = index % 3; // 0,1,2 → reveal-delay cascade
  const revealClass = delay === 0 ? "reveal" : `reveal reveal-delay-${delay}`;
  const discover = DISCOVER[locale] ?? DISCOVER.en;

  return (
    <article className={`tour-card ${revealClass}`}>
      <div className="tour-card-image">
        <div
          className={`tour-card-image-inner media-grad--${tour.gradient}`}
          role="img"
          aria-label={tour.heroLabel}
        ></div>
        <Photo k={`tour-${tour.slug}`} alt={tour.title} />
      </div>
      <div className="tour-card-content">
        <p className="tour-card-type">{tour.type}</p>
        <h3 className="tour-card-title">{title}</h3>
        <p className="tour-card-desc">{description}</p>
        <div className="tour-card-meta">
          <span className="tour-meta-item">
            <ClockIcon />
            {tour.duration}
          </span>
          <span className="tour-meta-item">
            <PrivateIcon />
            {tour.groupType}
          </span>
        </div>
        <Link href={localePath(locale, `/tours/${tour.slug}`)} className="tour-card-link">
          {discover}
          <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}
