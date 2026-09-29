import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import { site, operator } from "@/data/site";
import { BRAND_NAME, OPERATOR_NAME, MOT_LICENCE_NUMBER } from "@/data/site";
import { getDict } from "@/lib/dictionaries";
import { getLocale, localePath } from "@/lib/i18n";
import { getMetaDict, pageMetadata } from "@/lib/meta-dict";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = getMetaDict(locale).contact;
  return pageMetadata({
    locale,
    path: "/contact",
    title: m.title,
    description: m.description,
    image: "dest-aswan",
  });
}

const COPY = {
  en: {
    eyebrow: "Contact",
    titleLead: "We’d love to ",
    titleEm: "hear from you.",
    subtitle:
      "By email, by phone, or by WhatsApp — however you prefer to begin. A real person will always reply.",
    imageLabel: "A calm courtyard with afternoon light",
    crumbHome: "Home",
    crumbContact: "Contact",
    labelEmail: "Email",
    labelTelephone: "Telephone",
    labelWhatsapp: "WhatsApp",
    messageUs: "Message us",
    sendEyebrow: "Send an enquiry",
    sendTitleLead: "Or tell us about your ",
    sendTitleEm: "trip.",
    responsePromise: "A journey designer replies within 24 hours.",
    operatorLabel: "The operator",
    operatorBody:
      `${BRAND_NAME} is operated by ${OPERATOR_NAME}, officially licensed by the Egyptian Ministry of Tourism (licence no. ${MOT_LICENCE_NUMBER}) and a member of the Egyptian Travel Agents Association (ETAA).`,
    operatorAddressLabel: "Address",
    operatorCountry: "Egypt",
  },
  es: {
    eyebrow: "Contacto",
    titleLead: "Nos encantaría ",
    titleEm: "saber de usted.",
    subtitle:
      "Por correo, por teléfono o por WhatsApp — como prefiera comenzar. Siempre le responderá una persona real.",
    imageLabel: "Un patio sereno con luz de la tarde",
    crumbHome: "Inicio",
    crumbContact: "Contacto",
    labelEmail: "Correo",
    labelTelephone: "Teléfono",
    labelWhatsapp: "WhatsApp",
    messageUs: "Escríbanos",
    sendEyebrow: "Envíe una consulta",
    sendTitleLead: "O cuéntenos sobre su ",
    sendTitleEm: "viaje.",
    responsePromise: "Un diseñador de viajes le responderá en menos de 24 horas.",
    operatorLabel: "El operador",
    operatorBody:
      `${BRAND_NAME} está operada por ${OPERATOR_NAME}, con licencia oficial del Ministerio de Turismo de Egipto (licencia n.º ${MOT_LICENCE_NUMBER}) y miembro de la Asociación Egipcia de Agentes de Viajes (ETAA).`,
    operatorAddressLabel: "Dirección",
    operatorCountry: "Egipto",
  },
  fr: {
    eyebrow: "Contact",
    titleLead: "Nous serions ravis de ",
    titleEm: "vous lire.",
    subtitle:
      "Par e-mail, par téléphone ou par WhatsApp — comme il vous plaira de commencer. Une personne réelle vous répondra toujours.",
    imageLabel: "Une cour paisible baignée de lumière d’après-midi",
    crumbHome: "Accueil",
    crumbContact: "Contact",
    labelEmail: "E-mail",
    labelTelephone: "Téléphone",
    labelWhatsapp: "WhatsApp",
    messageUs: "Écrivez-nous",
    sendEyebrow: "Envoyer une demande",
    sendTitleLead: "Ou parlez-nous de votre ",
    sendTitleEm: "voyage.",
    responsePromise: "Un concepteur de voyages vous répond sous 24 heures.",
    operatorLabel: "L’opérateur",
    operatorBody:
      `${BRAND_NAME} est exploitée par ${OPERATOR_NAME}, officiellement agréée par le ministère égyptien du Tourisme (licence n° ${MOT_LICENCE_NUMBER}) et membre de l’Association égyptienne des agents de voyages (ETAA).`,
    operatorAddressLabel: "Adresse",
    operatorCountry: "Égypte",
  },
  nl: {
    eyebrow: "Contact",
    titleLead: "Wij horen graag ",
    titleEm: "van u.",
    subtitle:
      "Per e-mail, per telefoon of via WhatsApp — hoe u ook het liefst begint. Er antwoordt u altijd een echt persoon.",
    imageLabel: "Een rustige binnenplaats in het middaglicht",
    crumbHome: "Home",
    crumbContact: "Contact",
    labelEmail: "E-mail",
    labelTelephone: "Telefoon",
    labelWhatsapp: "WhatsApp",
    messageUs: "Schrijf ons",
    sendEyebrow: "Stuur een aanvraag",
    sendTitleLead: "Of vertel ons over uw ",
    sendTitleEm: "reis.",
    responsePromise: "Een reisontwerper antwoordt binnen 24 uur.",
    operatorLabel: "De exploitant",
    operatorBody:
      `${BRAND_NAME} wordt beheerd door ${OPERATOR_NAME}, officieel erkend door het Egyptische ministerie van Toerisme (vergunning nr. ${MOT_LICENCE_NUMBER}) en lid van de Egyptische Vereniging van Reisagenten (ETAA).`,
    operatorAddressLabel: "Adres",
    operatorCountry: "Egypte",
  },
  de: {
    eyebrow: "Kontakt",
    titleLead: "Wir würden gern ",
    titleEm: "von Ihnen hören.",
    subtitle:
      "Per E-Mail, per Telefon oder über WhatsApp — wie Sie auch immer am liebsten beginnen. Es antwortet Ihnen stets ein echter Mensch.",
    imageLabel: "Ein stiller Innenhof im Nachmittagslicht",
    crumbHome: "Start",
    crumbContact: "Kontakt",
    labelEmail: "E-Mail",
    labelTelephone: "Telefon",
    labelWhatsapp: "WhatsApp",
    messageUs: "Schreiben Sie uns",
    sendEyebrow: "Senden Sie eine Anfrage",
    sendTitleLead: "Oder erzählen Sie uns von Ihrer ",
    sendTitleEm: "Reise.",
    responsePromise: "Ein Reisegestalter antwortet innerhalb von 24 Stunden.",
    operatorLabel: "Der Betreiber",
    operatorBody:
      `${BRAND_NAME} wird von ${OPERATOR_NAME} betrieben, offiziell lizenziert vom ägyptischen Tourismusministerium (Lizenz Nr. ${MOT_LICENCE_NUMBER}) und Mitglied des Ägyptischen Reisebüroverbands (ETAA).`,
    operatorAddressLabel: "Adresse",
    operatorCountry: "Ägypten",
  },
} as const;

export default async function ContactPage() {
  const locale = await getLocale();
  const t = COPY[locale];
  const f = getDict(locale).footer;

  return (
    <main>
      <PageHero
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleLead}
            <em>{t.titleEm}</em>
          </>
        }
        subtitle={t.subtitle}
        gradient="oasis"
        imageLabel={t.imageLabel}
        imageKey="dest-aswan"
        crumbs={[{ href: localePath(locale, "/"), label: t.crumbHome }, { label: t.crumbContact }]}
        short
      />

      <section className="section-sm" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="contact-grid">
            <a className="contact-method reveal" href={`mailto:${site.email}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" strokeLinecap="round" />
              </svg>
              <span className="contact-method-label">{t.labelEmail}</span>
              <span className="contact-method-value">{site.email}</span>
            </a>
            <a className="contact-method reveal reveal-delay-1" href={`tel:${site.phoneHref}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />
              </svg>
              <span className="contact-method-label">{t.labelTelephone}</span>
              <span className="contact-method-value">{site.phoneDisplay}</span>
            </a>
            <a
              className="contact-method reveal reveal-delay-2"
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.6-1.2A9 9 0 1012 3z" strokeLinejoin="round" />
                <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l-1-2-2 .5-2-2 .5-2-2-1z" strokeLinejoin="round" />
              </svg>
              <span className="contact-method-label">{t.labelWhatsapp}</span>
              <span className="contact-method-value">{t.messageUs}</span>
            </a>
          </div>
          <div className="contact-operator reveal" data-operator-block>
            <span className="contact-method-label">{t.operatorLabel}</span>
            <p className="contact-operator-body">{t.operatorBody}</p>
            <p className="contact-operator-address">
              <span className="contact-method-label">{t.operatorAddressLabel}</span>
              {operator.name}
              <br />
              {operator.address}, {t.operatorCountry}
              {operator.motLicence && (
                <>
                  <br />
                  {f.motLicence} {operator.motLicence}
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="center-col reveal" style={{ marginBottom: "48px" }}>
            <p className="section-eyebrow">{t.sendEyebrow}</p>
            <h2 className="section-title">
              {t.sendTitleLead}<em>{t.sendTitleEm}</em>
            </h2>
            <p className="section-body" style={{ margin: "0 auto" }}>
              {t.responsePromise}
            </p>
          </div>
          <div className="measure reveal reveal-delay-1" style={{ maxWidth: "820px", margin: "0 auto" }}>
            <EnquiryForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
