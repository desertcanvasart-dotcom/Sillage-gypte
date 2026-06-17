import type { Metadata } from "next";
import Link from "next/link";
import WarmEnquiryForm from "@/components/warm/WarmEnquiryForm";
import { getTour } from "@/data/tours";
import { getDestination } from "@/data/destinations";
import { getImage } from "@/lib/images";
import { site } from "@/data/site";
import { getLocale, localePath } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Plan Your Journey",
  description:
    "Every Sillage Égypte journey is designed from scratch, around you. Tell us a little, and a journey designer will shape a private proposal — with no obligation.",
  alternates: { canonical: "/plan" },
};

const COPY = {
  en: {
    crumbHome: "Home",
    crumbPlan: "Plan your journey",
    h1: "Plan your journey",
    lede: (
      <>
        Every Sillage journey is designed from scratch, around you. Tell us a little, and
        a journey designer will shape a private proposal — no template, and no obligation.
      </>
    ),
    howEyebrow: "How it works",
    howTitle: "Four steps, one conversation",
    enquiryEyebrow: "The enquiry",
    enquiryTitle: "Tell us about the journey you have in mind",
    enquiryBody:
      "There are no required fields beyond a way to reach you. The more you share, the better the proposal — but a sentence is a fine place to start.",
    talkTitle: "Some journeys are easier begun by voice",
    talkBody:
      "If you would rather talk it through than write it down, we are glad to. Call, message, or write — whichever suits you, and at whatever hour works where you are.",
    kEmail: "Email",
    kTelephone: "Telephone",
    kWhatsapp: "WhatsApp",
    whatsappValue: "Message us directly",
    quote: (
      <>
        You are not booking a tour. You are handing a country to someone who has spent a
        life learning to <em>read</em> it — and asking them to design the days.
      </>
    ),
    interestedJourney: (title: string) => `I'm interested in ${title}. `,
    interestedDest: (name: string) => `I'm interested in a journey to ${name}. `,
    steps: [
      { n: "I", t: "You tell us", d: "A few details and a sentence about what matters most. That alone is enough to begin." },
      { n: "II", t: "We design", d: "A named journey designer shapes a private itinerary — yours alone, never a package off a shelf." },
      { n: "III", t: "We refine, together", d: "We adjust until it is right. Most journeys take a conversation or two to settle properly." },
      { n: "IV", t: "You travel", d: "Everything handled, door to door. You arrive, and Egypt is read to you." },
    ],
  },
  es: {
    crumbHome: "Inicio",
    crumbPlan: "Planifique su viaje",
    h1: "Planifique su viaje",
    lede: (
      <>
        Cada viaje Sillage se diseña desde cero, en torno a usted. Cuéntenos un poco y un
        diseñador de viajes dará forma a una propuesta privada — sin plantillas y sin compromiso.
      </>
    ),
    howEyebrow: "Cómo funciona",
    howTitle: "Cuatro pasos, una conversación",
    enquiryEyebrow: "La consulta",
    enquiryTitle: "Cuéntenos el viaje que tiene en mente",
    enquiryBody:
      "No hay campos obligatorios más allá de una forma de localizarle. Cuanto más comparta, mejor será la propuesta — pero una frase es un buen punto de partida.",
    talkTitle: "Algunos viajes es más fácil comenzarlos con la voz",
    talkBody:
      "Si prefiere hablarlo en lugar de escribirlo, será un placer. Llame, escriba o envíe un mensaje — como le convenga, y a la hora que mejor le venga allí donde esté.",
    kEmail: "Correo",
    kTelephone: "Teléfono",
    kWhatsapp: "WhatsApp",
    whatsappValue: "Escríbanos directamente",
    quote: (
      <>
        Usted no está reservando un tour. Está confiando un país a alguien que ha dedicado
        una vida a aprender a <em>leerlo</em> — y le pide que diseñe los días.
      </>
    ),
    interestedJourney: (title: string) => `Me interesa ${title}. `,
    interestedDest: (name: string) => `Me interesa un viaje a ${name}. `,
    steps: [
      { n: "I", t: "Usted nos cuenta", d: "Unos pocos detalles y una frase sobre lo que más le importa. Eso basta para comenzar." },
      { n: "II", t: "Nosotros diseñamos", d: "Un diseñador de viajes con nombre y apellidos da forma a un itinerario privado — solo suyo, nunca un paquete de catálogo." },
      { n: "III", t: "Refinamos, juntos", d: "Ajustamos hasta que esté bien. La mayoría de los viajes requieren una conversación o dos para perfilarse como es debido." },
      { n: "IV", t: "Usted viaja", d: "Todo resuelto, de puerta a puerta. Usted llega, y Egipto se le revela." },
    ],
  },
  fr: {
    crumbHome: "Accueil",
    crumbPlan: "Composez votre voyage",
    h1: "Composez votre voyage",
    lede: (
      <>
        Chaque voyage Sillage est conçu sur mesure, autour de vous. Dites-nous quelques mots,
        et un concepteur de voyages élaborera une proposition privée — sans modèle, et sans engagement.
      </>
    ),
    howEyebrow: "Comment cela se passe",
    howTitle: "Quatre étapes, une conversation",
    enquiryEyebrow: "La demande",
    enquiryTitle: "Parlez-nous du voyage que vous imaginez",
    enquiryBody:
      "Aucun champ n’est obligatoire, hormis un moyen de vous joindre. Plus vous partagez, meilleure sera la proposition — mais une phrase est un excellent point de départ.",
    talkTitle: "Certains voyages se commencent mieux de vive voix",
    talkBody:
      "Si vous préférez en parler plutôt que l’écrire, ce sera avec plaisir. Appelez, écrivez ou envoyez un message — comme il vous conviendra, et à l’heure qui vous arrange là où vous êtes.",
    kEmail: "E-mail",
    kTelephone: "Téléphone",
    kWhatsapp: "WhatsApp",
    whatsappValue: "Écrivez-nous directement",
    quote: (
      <>
        Vous ne réservez pas un circuit. Vous confiez un pays à quelqu’un qui a passé une
        vie à apprendre à le <em>lire</em> — en lui demandant d’en composer les journées.
      </>
    ),
    interestedJourney: (title: string) => `Je m’intéresse à ${title}. `,
    interestedDest: (name: string) => `Je m’intéresse à un voyage vers ${name}. `,
    steps: [
      { n: "I", t: "Vous nous racontez", d: "Quelques détails et une phrase sur ce qui compte le plus. Cela suffit pour commencer." },
      { n: "II", t: "Nous concevons", d: "Un concepteur de voyages attitré élabore un itinéraire privé — le vôtre seul, jamais un forfait sur étagère." },
      { n: "III", t: "Nous affinons, ensemble", d: "Nous ajustons jusqu’à ce que ce soit juste. La plupart des voyages demandent une conversation ou deux pour bien se préciser." },
      { n: "IV", t: "Vous voyagez", d: "Tout est pris en charge, de porte à porte. Vous arrivez, et l’Égypte vous est révélée." },
    ],
  },
  nl: {
    crumbHome: "Home",
    crumbPlan: "Stel uw reis samen",
    h1: "Stel uw reis samen",
    lede: (
      <>
        Elke Sillage-reis wordt van de grond af opgebouwd, rond u. Vertel ons enkele woorden,
        en een reisontwerper geeft vorm aan een persoonlijk voorstel — zonder sjabloon, en geheel vrijblijvend.
      </>
    ),
    howEyebrow: "Hoe het werkt",
    howTitle: "Vier stappen, één gesprek",
    enquiryEyebrow: "De aanvraag",
    enquiryTitle: "Vertel ons over de reis die u voor ogen hebt",
    enquiryBody:
      "Er zijn geen verplichte velden behalve een manier om u te bereiken. Hoe meer u deelt, hoe beter het voorstel — maar één zin is al een uitstekend begin.",
    talkTitle: "Sommige reizen beginnen makkelijker met de stem",
    talkBody:
      "Als u er liever over praat dan het opschrijft, doen wij dat graag. Bel, schrijf of stuur een bericht — wat u het beste uitkomt, en op het uur dat u daar het beste past.",
    kEmail: "E-mail",
    kTelephone: "Telefoon",
    kWhatsapp: "WhatsApp",
    whatsappValue: "Schrijf ons rechtstreeks",
    quote: (
      <>
        U boekt geen rondreis. U vertrouwt een land toe aan iemand die een leven lang heeft
        geleerd het te <em>lezen</em> — en vraagt hem de dagen te ontwerpen.
      </>
    ),
    interestedJourney: (title: string) => `Ik heb belangstelling voor ${title}. `,
    interestedDest: (name: string) => `Ik heb belangstelling voor een reis naar ${name}. `,
    steps: [
      { n: "I", t: "U vertelt het ons", d: "Een paar gegevens en een zin over wat het belangrijkst is. Dat alleen al is genoeg om te beginnen." },
      { n: "II", t: "Wij ontwerpen", d: "Een toegewezen reisontwerper geeft vorm aan een persoonlijke route — van u alleen, nooit een pakket uit de schappen." },
      { n: "III", t: "Wij verfijnen, samen", d: "Wij stellen bij tot het juist is. De meeste reizen vragen een gesprek of twee om goed uit te kristalliseren." },
      { n: "IV", t: "U reist", d: "Alles geregeld, van deur tot deur. U komt aan, en Egypte wordt u voorgelezen." },
    ],
  },
  de: {
    crumbHome: "Start",
    crumbPlan: "Stellen Sie Ihre Reise zusammen",
    h1: "Stellen Sie Ihre Reise zusammen",
    lede: (
      <>
        Jede Sillage-Reise wird von Grund auf gestaltet, ganz um Sie herum. Sagen Sie uns ein paar Worte,
        und ein Reisegestalter formt einen privaten Vorschlag — ohne Vorlage und völlig unverbindlich.
      </>
    ),
    howEyebrow: "So funktioniert es",
    howTitle: "Vier Schritte, ein Gespräch",
    enquiryEyebrow: "Die Anfrage",
    enquiryTitle: "Erzählen Sie uns von der Reise, die Sie sich vorstellen",
    enquiryBody:
      "Es gibt keine Pflichtfelder außer einer Möglichkeit, Sie zu erreichen. Je mehr Sie mitteilen, desto besser der Vorschlag — aber ein Satz ist ein guter Anfang.",
    talkTitle: "Manche Reisen beginnen leichter mit der Stimme",
    talkBody:
      "Wenn Sie lieber darüber sprechen, als es aufzuschreiben, tun wir das gern. Rufen Sie an, schreiben Sie oder senden Sie eine Nachricht — wie es Ihnen am besten passt und zu der Stunde, die für Sie dort am besten passt.",
    kEmail: "E-Mail",
    kTelephone: "Telefon",
    kWhatsapp: "WhatsApp",
    whatsappValue: "Schreiben Sie uns direkt",
    quote: (
      <>
        Sie buchen keine Rundreise. Sie vertrauen ein Land jemandem an, der ein Leben lang gelernt
        hat, es zu <em>lesen</em> — und bitten ihn, die Tage zu gestalten.
      </>
    ),
    interestedJourney: (title: string) => `Ich interessiere mich für ${title}. `,
    interestedDest: (name: string) => `Ich interessiere mich für eine Reise nach ${name}. `,
    steps: [
      { n: "I", t: "Sie erzählen es uns", d: "Ein paar Angaben und ein Satz darüber, was am wichtigsten ist. Das allein genügt, um zu beginnen." },
      { n: "II", t: "Wir gestalten", d: "Ein namentlich benannter Reisegestalter formt eine private Route — Ihre allein, niemals ein Paket von der Stange." },
      { n: "III", t: "Wir verfeinern, gemeinsam", d: "Wir passen an, bis es stimmt. Die meisten Reisen brauchen ein Gespräch oder zwei, um sich richtig herauszubilden." },
      { n: "IV", t: "Sie reisen", d: "Alles geregelt, von Tür zu Tür. Sie kommen an, und Ägypten wird Ihnen vorgelesen." },
    ],
  },
} as const;

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ journey?: string; destination?: string }>;
}) {
  const { journey, destination } = await searchParams;
  const locale = await getLocale();
  const t = COPY[locale];
  const p = (path: string) => localePath(locale, path);
  const journeyTitle = journey ? getTour(journey)?.title : undefined;
  const destName = destination ? getDestination(destination)?.name : undefined;
  const defaultNotes = journeyTitle
    ? t.interestedJourney(journeyTitle)
    : destName
      ? t.interestedDest(destName)
      : "";

  const planHero = getImage("hero-plan");

  return (
    <main className="warm">
      {/* HERO */}
      <div
        className="phero"
        style={
          planHero
            ? {
                backgroundImage: `linear-gradient(170deg, rgba(11,21,18,.62), rgba(16,29,24,.82) 70%, #0c1714), url(${planHero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="wrap">
          <p className="crumb">
            <Link href={p("/")}>{t.crumbHome}</Link> &nbsp;/&nbsp; {t.crumbPlan}
          </p>
          <h1 className="display">{t.h1}</h1>
          <p className="lede">{t.lede}</p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">{t.howEyebrow}</span>
            <h2 className="display">{t.howTitle}</h2>
          </div>
          <div className="steps">
            {t.steps.map((s) => (
              <div className="step" key={s.n}>
                <span className="num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ENQUIRY */}
      <section className="enquiry" id="form">
        <div className="wrap">
          <div className="intro">
            <span className="eyebrow">{t.enquiryEyebrow}</span>
            <h2 className="display">{t.enquiryTitle}</h2>
            <p>{t.enquiryBody}</p>
          </div>
          <div className="panel">
            <WarmEnquiryForm defaultNotes={defaultNotes} locale={locale} />
          </div>
        </div>
      </section>

      {/* PREFER TO TALK */}
      <section className="talk">
        <div className="wrap">
          <div>
            <h2 className="display">{t.talkTitle}</h2>
            <p>{t.talkBody}</p>
          </div>
          <div className="lines">
            <a href={`mailto:${site.email}`}>
              <span className="k">{t.kEmail}</span> {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`}>
              <span className="k">{t.kTelephone}</span> {site.phoneDisplay}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="k">{t.kWhatsapp}</span> {t.whatsappValue}
            </a>
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="reassure">
        <div className="wrap">
          <blockquote>{t.quote}</blockquote>
        </div>
      </section>
    </main>
  );
}
