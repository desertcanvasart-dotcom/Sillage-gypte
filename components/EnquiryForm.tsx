"use client";

import { useState } from "react";
import { ArrowRight, CheckIcon } from "./icons";
import { tours } from "@/data/tours";

type Status = "idle" | "submitting" | "error";
type Locale = "en" | "es" | "fr" | "nl" | "de";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const DICT = {
  en: {
    groupSizes: ["Just the two of us", "3–4 travellers", "5–6 travellers", "7 or more", "Solo"],
    errName: "Please tell us your name.",
    errEmailMissing: "Please add an email so we can reply.",
    errEmailInvalid: "That email address doesn't look right.",
    errMessage: "A line or two about your trip helps us begin.",
    errorBanner:
      "Something went wrong sending your enquiry. Please try again, or email us directly at hello@luxuriousegypt.com.",
    successTitle: "Thank you — your enquiry is with us.",
    successBody:
      "A journey designer will reply personally within 24 hours to begin shaping your trip. We look forward to it.",
    yourName: "Your name",
    yourNamePh: "First and last name",
    email: "Email",
    emailPh: "you@example.com",
    travellingFrom: "Where are you travelling from?",
    countryPh: "Country",
    dates: "Approximate dates",
    datesPh: "e.g. March 2027, flexible",
    partySize: "Party size",
    select: "Select…",
    journeyInterest: "Journey of interest",
    notSureYet: "Not sure yet",
    draws: "What draws you to Egypt?",
    messagePh:
      "Tell us what you're hoping for, what you've seen before, and what you'd like to understand more deeply.",
    messageHint: "The more you share, the better we can design for you.",
    sending: "Sending…",
    send: "Send enquiry",
    note: "A journey designer replies within 24 hours.",
  },
  es: {
    groupSizes: ["Solo nosotros dos", "3–4 viajeros", "5–6 viajeros", "7 o más", "Solo/a"],
    errName: "Díganos su nombre, por favor.",
    errEmailMissing: "Añada un correo para que podamos responderle.",
    errEmailInvalid: "Ese correo no parece correcto.",
    errMessage: "Una o dos líneas sobre su viaje nos ayudan a empezar.",
    errorBanner:
      "Algo salió mal al enviar su consulta. Inténtelo de nuevo o escríbanos directamente a hello@luxuriousegypt.com.",
    successTitle: "Gracias — su consulta está con nosotros.",
    successBody:
      "Un diseñador de viajes le responderá personalmente en menos de 24 horas para empezar a dar forma a su viaje. Lo esperamos con ilusión.",
    yourName: "Su nombre",
    yourNamePh: "Nombre y apellido",
    email: "Correo",
    emailPh: "usted@ejemplo.com",
    travellingFrom: "¿Desde dónde viaja?",
    countryPh: "País",
    dates: "Fechas aproximadas",
    datesPh: "p. ej. marzo de 2027, flexible",
    partySize: "Número de viajeros",
    select: "Seleccione…",
    journeyInterest: "Viaje de interés",
    notSureYet: "Aún no estoy seguro",
    draws: "¿Qué le atrae de Egipto?",
    messagePh:
      "Cuéntenos qué espera, qué ha visto antes y qué le gustaría comprender más a fondo.",
    messageHint: "Cuanto más comparta, mejor podremos diseñar para usted.",
    sending: "Enviando…",
    send: "Enviar consulta",
    note: "Un diseñador de viajes le responde en menos de 24 horas.",
  },
  fr: {
    groupSizes: ["Rien que nous deux", "3–4 voyageurs", "5–6 voyageurs", "7 ou plus", "En solo"],
    errName: "Veuillez nous indiquer votre nom.",
    errEmailMissing: "Veuillez ajouter un e-mail pour que nous puissions répondre.",
    errEmailInvalid: "Cette adresse e-mail ne semble pas correcte.",
    errMessage: "Une ligne ou deux sur votre voyage nous aident à commencer.",
    errorBanner:
      "Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer ou nous écrire directement à hello@luxuriousegypt.com.",
    successTitle: "Merci — votre demande est entre nos mains.",
    successBody:
      "Un concepteur de voyages vous répondra personnellement sous 24 heures pour commencer à façonner votre voyage. Nous nous en réjouissons.",
    yourName: "Votre nom",
    yourNamePh: "Prénom et nom",
    email: "E-mail",
    emailPh: "vous@exemple.com",
    travellingFrom: "D’où voyagez-vous ?",
    countryPh: "Pays",
    dates: "Dates approximatives",
    datesPh: "p. ex. mars 2027, flexible",
    partySize: "Nombre de voyageurs",
    select: "Sélectionner…",
    journeyInterest: "Voyage qui vous intéresse",
    notSureYet: "Pas encore décidé",
    draws: "Qu’est-ce qui vous attire en Égypte ?",
    messagePh:
      "Dites-nous ce que vous espérez, ce que vous avez déjà vu et ce que vous aimeriez comprendre plus en profondeur.",
    messageHint: "Plus vous partagez, mieux nous pourrons concevoir pour vous.",
    sending: "Envoi…",
    send: "Envoyer la demande",
    note: "Un concepteur de voyages répond sous 24 heures.",
  },
  nl: {
    groupSizes: ["Alleen wij tweeën", "3–4 reizigers", "5–6 reizigers", "7 of meer", "Solo"],
    errName: "Vertel ons alstublieft uw naam.",
    errEmailMissing: "Voeg een e-mailadres toe zodat wij kunnen antwoorden.",
    errEmailInvalid: "Dat e-mailadres lijkt niet te kloppen.",
    errMessage: "Een regel of twee over uw reis helpt ons te beginnen.",
    errorBanner:
      "Er ging iets mis bij het versturen van uw aanvraag. Probeer het opnieuw, of schrijf ons rechtstreeks op hello@luxuriousegypt.com.",
    successTitle: "Dank u — uw aanvraag is bij ons.",
    successBody:
      "Een reisontwerper antwoordt persoonlijk binnen 24 uur om uw reis vorm te geven. Wij kijken ernaar uit.",
    yourName: "Uw naam",
    yourNamePh: "Voor- en achternaam",
    email: "E-mail",
    emailPh: "u@voorbeeld.com",
    travellingFrom: "Vanwaar reist u?",
    countryPh: "Land",
    dates: "Bij benadering welke data",
    datesPh: "bv. maart 2027, flexibel",
    partySize: "Aantal reizigers",
    select: "Selecteer…",
    journeyInterest: "Reis waarin u geïnteresseerd bent",
    notSureYet: "Nog niet zeker",
    draws: "Wat trekt u naar Egypte?",
    messagePh:
      "Vertel ons wat u hoopt te beleven, wat u eerder hebt gezien, en wat u dieper zou willen begrijpen.",
    messageHint: "Hoe meer u deelt, hoe beter wij voor u kunnen ontwerpen.",
    sending: "Versturen…",
    send: "Aanvraag versturen",
    note: "Een reisontwerper antwoordt binnen 24 uur.",
  },
  de: {
    groupSizes: ["Nur wir zwei", "3–4 Reisende", "5–6 Reisende", "7 oder mehr", "Allein"],
    errName: "Bitte nennen Sie uns Ihren Namen.",
    errEmailMissing: "Bitte geben Sie eine E-Mail an, damit wir antworten können.",
    errEmailInvalid: "Diese E-Mail-Adresse scheint nicht korrekt zu sein.",
    errMessage: "Ein, zwei Zeilen über Ihre Reise helfen uns anzufangen.",
    errorBanner:
      "Beim Senden Ihrer Anfrage ist etwas schiefgegangen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an hello@luxuriousegypt.com.",
    successTitle: "Vielen Dank — Ihre Anfrage ist bei uns.",
    successBody:
      "Ein Reisegestalter antwortet Ihnen persönlich innerhalb von 24 Stunden, um Ihre Reise zu gestalten. Wir freuen uns darauf.",
    yourName: "Ihr Name",
    yourNamePh: "Vor- und Nachname",
    email: "E-Mail",
    emailPh: "sie@beispiel.com",
    travellingFrom: "Von wo aus reisen Sie an?",
    countryPh: "Land",
    dates: "Ungefähre Daten",
    datesPh: "z. B. März 2027, flexibel",
    partySize: "Anzahl der Reisenden",
    select: "Auswählen…",
    journeyInterest: "Reise von Interesse",
    notSureYet: "Noch nicht sicher",
    draws: "Was reizt Sie an Ägypten?",
    messagePh:
      "Sagen Sie uns, was Sie sich erhoffen, was Sie zuvor gesehen haben und was Sie tiefer verstehen möchten.",
    messageHint: "Je mehr Sie mitteilen, desto besser können wir für Sie gestalten.",
    sending: "Senden…",
    send: "Anfrage senden",
    note: "Ein Reisegestalter antwortet innerhalb von 24 Stunden.",
  },
} as const;

export default function EnquiryForm({
  defaultJourney = "",
  locale = "en",
}: {
  defaultJourney?: string;
  locale?: Locale;
}) {
  const T = DICT[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(data: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = T.errName;
    if (!email) next.email = T.errEmailMissing;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = T.errEmailInvalid;
    if (!message) next.message = T.errMessage;
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <div className="form-card">
        <div className="form-success" role="status">
          <div className="form-success-mark" aria-hidden="true">
            <CheckIcon />
          </div>
          <h3>{T.successTitle}</h3>
          <p>{T.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {status === "error" && (
        <div className="form-banner" role="alert">
          {T.errorBanner}
        </div>
      )}

      <div className="form-grid">
        <div className={`field${errors.name ? " field--error" : ""}`}>
          <label htmlFor="name">{T.yourName}</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder={T.yourNamePh} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className={`field${errors.email ? " field--error" : ""}`}>
          <label htmlFor="email">{T.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder={T.emailPh} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="country">{T.travellingFrom}</label>
          <input id="country" name="country" type="text" autoComplete="country-name" placeholder={T.countryPh} />
        </div>

        <div className="field">
          <label htmlFor="dates">{T.dates}</label>
          <input id="dates" name="dates" type="text" placeholder={T.datesPh} />
        </div>

        <div className="field">
          <label htmlFor="groupSize">{T.partySize}</label>
          <select id="groupSize" name="groupSize" defaultValue="">
            <option value="" disabled>
              {T.select}
            </option>
            {T.groupSizes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="journey">{T.journeyInterest}</label>
          <select id="journey" name="journey" defaultValue={defaultJourney}>
            <option value="">{T.notSureYet}</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className={`field field--full${errors.message ? " field--error" : ""}`}>
          <label htmlFor="message">{T.draws}</label>
          <textarea
            id="message"
            name="message"
            placeholder={T.messagePh}
          />
          {errors.message ? (
            <span className="field-error">{errors.message}</span>
          ) : (
            <span className="field-hint">{T.messageHint}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? T.sending : T.send}
          {status !== "submitting" && <ArrowRight size={14} />}
        </button>
        <span className="form-note">{T.note}</span>
      </div>
    </form>
  );
}
