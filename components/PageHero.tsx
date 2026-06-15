import type { GradientVariant } from "@/data/tours";
import { Fragment, type ReactNode } from "react";
import JsonLd from "./JsonLd";
import Photo from "./Photo";
import { buildBreadcrumb } from "@/lib/structured-data";

export interface Crumb {
  href?: string;
  label: string;
}

/**
 * Dark gradient hero for every interior page. The fixed navigation is
 * transparent-over-dark at the top of these pages, exactly like the home hero.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  gradient = "nile",
  imageLabel,
  imageKey,
  crumbs,
  short = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  gradient?: GradientVariant;
  imageLabel?: string;
  imageKey?: string;
  crumbs?: Crumb[];
  short?: boolean;
}) {
  return (
    <section className={`page-hero${short ? " page-hero--short" : ""}`} aria-label="Page header">
      {crumbs && crumbs.length > 0 && <JsonLd data={buildBreadcrumb(crumbs)} />}
      <div
        className={`page-hero-bg media-grad--${gradient}`}
        role="img"
        aria-label={imageLabel ?? undefined}
      />
      {imageKey && <Photo k={imageKey} />}
      <div className="page-hero-overlay" aria-hidden="true" />
      <div className="container">
        <div className="page-hero-inner">
          {crumbs && crumbs.length > 0 && (
            <nav className="breadcrumb" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="breadcrumb-sep" aria-hidden="true">/</span>}
                  {c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
                </Fragment>
              ))}
            </nav>
          )}
          {eyebrow && <p className="page-hero-eyebrow">{eyebrow}</p>}
          <h1 className="page-hero-title">{title}</h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
