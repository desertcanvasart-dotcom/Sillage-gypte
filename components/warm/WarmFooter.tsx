import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { site, operator } from "@/data/site";
import { getLocale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dictionaries";

/** Warm-design footer (papyrus/gold) — global site footer, locale-aware. */
export default async function WarmFooter() {
  const locale = await getLocale();
  const t = getDict(locale);
  const p = (path: string) => localePath(locale, path);

  const explore = [
    { href: p("/tours"), label: t.nav.journeys },
    { href: p("/destinations"), label: t.nav.destinations },
    { href: p("/experiences"), label: t.nav.experiences },
    { href: p("/journal"), label: t.nav.journal },
    { href: p("/about"), label: t.footer.about },
    { href: p("/guides"), label: t.footer.guides },
    { href: p("/contact"), label: t.footer.contact },
    { href: p("/plan"), label: t.nav.plan },
  ];

  return (
    <footer className="wfooter">
      <div className="wrap">
        <div>
          <Link className="logo" href={p("/")}>
            Sillage<small>Égypte</small>
          </Link>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="col">
          <h5>{t.footer.explore}</h5>
          {explore.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="col">
          <h5>{t.footer.contact}</h5>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
            {site.whatsappDisplay}
          </a>
          <p className="operator" data-operator-line>
            {`${t.footer.operatedBy} ${operator.name} · ETAA ${operator.etaa} · ${operator.address}` +
              (operator.motLicence ? ` · ${t.footer.motLicence} ${operator.motLicence}` : "")}
          </p>
        </div>
        {/* Not "legal": that class belongs to the legal pages' stylesheet, which
            restyled this row dark-on-dark once it loaded. */}
        <div className="wfooter-legal">
          <span>© 2026 {site.name}. {t.footer.rights}</span>
          <nav aria-label={t.footer.legalNav}>
            <Link href={p("/privacy")}>{t.footer.privacy}</Link>
            <Link href={p("/terms")}>{t.footer.terms}</Link>
            <Link href={`${p("/privacy")}#cookies`}>{t.footer.cookiePolicy}</Link>
            <CookieSettingsLink label={t.footer.cookies} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
