import Link from "next/link";
import { getLocale, localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dictionaries";
import LangSwitcher from "@/components/LangSwitcher";
import MobileNav from "@/components/warm/MobileNav";

/** Warm-design masthead (papyrus/gold) — global site header, locale-aware. */
export default async function WarmMasthead() {
  const locale = await getLocale();
  const t = getDict(locale);
  const p = (path: string) => localePath(locale, path);

  return (
    <header className="masthead">
      <div className="wrap">
        <Link className="logo" href={p("/")}>
          Sillage<small>Égypte</small>
        </Link>
        <nav className="main" aria-label="Primary">
          <Link href={p("/tours")}>{t.nav.journeys}</Link>
          <Link href={p("/destinations")}>{t.nav.destinations}</Link>
          <Link href={p("/experiences")}>{t.nav.experiences}</Link>
          <Link href={p("/guides")}>{t.footer.guides}</Link>
          <Link href={p("/journal")}>{t.nav.journal}</Link>
          <LangSwitcher />
          <Link className="wbtn" style={{ padding: ".7rem 1.6rem", fontSize: ".62rem" }} href={p("/plan")}>
            {t.nav.plan}
          </Link>
        </nav>
        <MobileNav
          links={[
            { href: p("/tours"), label: t.nav.journeys },
            { href: p("/destinations"), label: t.nav.destinations },
            { href: p("/experiences"), label: t.nav.experiences },
            { href: p("/guides"), label: t.footer.guides },
            { href: p("/journal"), label: t.nav.journal },
            { href: p("/about"), label: t.footer.about },
            { href: p("/contact"), label: t.footer.contact },
          ]}
          plan={{ href: p("/plan"), label: t.nav.plan }}
          menuLabel={t.nav.menu}
          closeLabel={t.nav.close}
        />
      </div>
    </header>
  );
}
