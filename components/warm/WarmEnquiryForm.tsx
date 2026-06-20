"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "error";
type Locale = "en" | "es" | "fr" | "nl" | "de";

const DICT = {
  en: {
    confirmTitle: "Thank you — it’s with us",
    confirmBody:
      "Your enquiry has reached a journey designer, who will read it properly and reply within 24 hours. Not a form letter — a real response, from a real person who knows this country.",
    errorBanner:
      "Something went wrong sending your enquiry. Please try again, or email us at hello@luxuriousegypt.com.",
    aboutYou: "About you",
    yourName: "Your name",
    yourNamePh: "First and last",
    email: "Email",
    emailPh: "you@example.com",
    phone: "Phone or WhatsApp",
    optional: "— optional",
    phonePh: "With country code",
    based: "Where you’re based",
    basedPh: "Country",
    yourJourney: "Your journey",
    when: "Planned date",
    select: "Select…",
    whenOpts: ["October – April (the classic season)", "May – September", "I have specific dates", "Flexible / not decided yet"],
    length: "How long",
    lengthOpts: ["Around a week", "Ten days to two weeks", "Longer than two weeks", "Not sure — advise me"],
    party: "Travelling",
    partyOpts: ["Just the two of us", "A family", "Solo", "A small private group", "A special occasion"],
    draws: "What kind of journey draws you",
    chooseAny: "— choose any",
    matters: "What matters most",
    ownWords: "In your own words",
    notesPh:
      "The trip you're imagining, what you care about, anything you'd want us to know — pace, interests, who you're travelling with, a dream you've held. A sentence is enough; more is welcome.",
    notesHelp: "This is the most useful thing you can give us. It’s what a designer reads first.",
    budget: "Budget guidance",
    budgetOpt: "— optional, per person",
    budgetPrefer: "Prefer to discuss",
    budgetOpts: ["Up to £4,000 per person", "£4,000 – £8,000 per person", "£8,000 – £15,000 per person", "Above £15,000 per person"],
    budgetHelp: "Not to set a ceiling — to make sure the first proposal is the right shape, not a guess.",
    honest:
      "If your dates or budget don’t suit the journey you have in mind, we will say so, and suggest what would. Honest counsel is the point; a proposal you don’t need is no use to either of us.",
    sending: "Sending…",
    send: "Send your enquiry",
    reply: (
      <>
        Replied to within <b>24 hours</b>, by a real person
      </>
    ),
    interests: [
      "The Nile under sail",
      "Ancient sites & temples",
      "Cairo & the pyramids",
      "The deep south & Abu Simbel",
      "Desert & the oases",
      "The Red Sea & coast",
      "A honeymoon or celebration",
      "Not sure — guide me",
    ],
    errName: "Please tell us your name.",
    errEmailMissing: "We need a way to reach you.",
    errEmailInvalid: "That email doesn't look right.",
  },
  es: {
    confirmTitle: "Gracias — ya está con nosotros",
    confirmBody:
      "Su consulta ha llegado a un diseñador de viajes, que la leerá con atención y responderá en menos de 24 horas. No una carta tipo — una respuesta real, de una persona real que conoce este país.",
    errorBanner:
      "Algo salió mal al enviar su consulta. Inténtelo de nuevo o escríbanos a hello@luxuriousegypt.com.",
    aboutYou: "Sobre usted",
    yourName: "Su nombre",
    yourNamePh: "Nombre y apellido",
    email: "Correo",
    emailPh: "usted@ejemplo.com",
    phone: "Teléfono o WhatsApp",
    optional: "— opcional",
    phonePh: "Con prefijo del país",
    based: "Dónde reside",
    basedPh: "País",
    yourJourney: "Su viaje",
    when: "Fecha prevista",
    select: "Seleccione…",
    whenOpts: ["Octubre – abril (la temporada clásica)", "Mayo – septiembre", "Tengo fechas concretas", "Flexible / aún sin decidir"],
    length: "¿Cuánto tiempo?",
    lengthOpts: ["Alrededor de una semana", "De diez días a dos semanas", "Más de dos semanas", "No estoy seguro — aconséjeme"],
    party: "Viaja",
    partyOpts: ["Solo nosotros dos", "Una familia", "Solo/a", "Un pequeño grupo privado", "Una ocasión especial"],
    draws: "¿Qué tipo de viaje le atrae?",
    chooseAny: "— elija las que desee",
    matters: "Lo que más importa",
    ownWords: "Con sus propias palabras",
    notesPh:
      "El viaje que imagina, lo que le importa, cualquier cosa que quiera que sepamos — ritmo, intereses, con quién viaja, un sueño que ha guardado. Una frase basta; más es bienvenido.",
    notesHelp: "Es lo más útil que puede darnos. Es lo primero que lee un diseñador.",
    budget: "Orientación de presupuesto",
    budgetOpt: "— opcional, por persona",
    budgetPrefer: "Prefiero hablarlo",
    budgetOpts: ["Hasta £4.000 por persona", "£4.000 – £8.000 por persona", "£8.000 – £15.000 por persona", "Más de £15.000 por persona"],
    budgetHelp: "No para poner un límite — para asegurar que la primera propuesta tenga la forma adecuada, no una conjetura.",
    honest:
      "Si sus fechas o su presupuesto no encajan con el viaje que tiene en mente, se lo diremos y le sugeriremos lo que sí encaja. El consejo honesto es lo esencial; una propuesta que no necesita no nos sirve a ninguno.",
    sending: "Enviando…",
    send: "Envíe su consulta",
    reply: (
      <>
        Respondemos en menos de <b>24 horas</b>, por una persona real
      </>
    ),
    interests: [
      "El Nilo a vela",
      "Sitios antiguos y templos",
      "El Cairo y las pirámides",
      "El profundo sur y Abu Simbel",
      "El desierto y los oasis",
      "El Mar Rojo y la costa",
      "Una luna de miel o celebración",
      "No estoy seguro — guíeme",
    ],
    errName: "Díganos su nombre, por favor.",
    errEmailMissing: "Necesitamos una forma de localizarle.",
    errEmailInvalid: "Ese correo no parece correcto.",
  },
  fr: {
    confirmTitle: "Merci — c’est entre nos mains",
    confirmBody:
      "Votre demande est parvenue à un concepteur de voyages, qui la lira attentivement et répondra sous 24 heures. Pas une lettre type — une vraie réponse, d’une personne réelle qui connaît ce pays.",
    errorBanner:
      "Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer ou nous écrire à hello@luxuriousegypt.com.",
    aboutYou: "À propos de vous",
    yourName: "Votre nom",
    yourNamePh: "Prénom et nom",
    email: "E-mail",
    emailPh: "vous@exemple.com",
    phone: "Téléphone ou WhatsApp",
    optional: "— facultatif",
    phonePh: "Avec l’indicatif du pays",
    based: "Où vous résidez",
    basedPh: "Pays",
    yourJourney: "Votre voyage",
    when: "Date prévue",
    select: "Sélectionner…",
    whenOpts: ["Octobre – avril (la saison classique)", "Mai – septembre", "J’ai des dates précises", "Flexible / pas encore décidé"],
    length: "Pour combien de temps",
    lengthOpts: ["Environ une semaine", "De dix jours à deux semaines", "Plus de deux semaines", "Je ne sais pas — conseillez-moi"],
    party: "Vous voyagez",
    partyOpts: ["Rien que nous deux", "Une famille", "En solo", "Un petit groupe privé", "Une occasion particulière"],
    draws: "Quel genre de voyage vous attire",
    chooseAny: "— choisissez librement",
    matters: "Ce qui compte le plus",
    ownWords: "Dans vos propres mots",
    notesPh:
      "Le voyage que vous imaginez, ce qui vous tient à cœur, tout ce que vous aimeriez nous faire savoir — rythme, centres d’intérêt, avec qui vous voyagez, un rêve que vous portez. Une phrase suffit ; davantage est bienvenu.",
    notesHelp: "C’est ce que vous pouvez nous donner de plus utile. C’est ce qu’un concepteur lit en premier.",
    budget: "Indication de budget",
    budgetOpt: "— facultatif, par personne",
    budgetPrefer: "Je préfère en discuter",
    budgetOpts: ["Jusqu’à 4 000 £ par personne", "4 000 £ – 8 000 £ par personne", "8 000 £ – 15 000 £ par personne", "Plus de 15 000 £ par personne"],
    budgetHelp: "Non pour fixer un plafond — mais pour que la première proposition ait la bonne forme, et non une supposition.",
    honest:
      "Si vos dates ou votre budget ne conviennent pas au voyage que vous imaginez, nous vous le dirons et vous proposerons ce qui conviendrait. Le conseil honnête est l’essentiel ; une proposition dont vous n’avez pas besoin n’est utile à personne.",
    sending: "Envoi…",
    send: "Envoyer votre demande",
    reply: (
      <>
        Réponse sous <b>24 heures</b>, par une personne réelle
      </>
    ),
    interests: [
      "Le Nil à la voile",
      "Sites antiques et temples",
      "Le Caire et les pyramides",
      "Le grand sud et Abou Simbel",
      "Le désert et les oasis",
      "La mer Rouge et la côte",
      "Une lune de miel ou une célébration",
      "Je ne sais pas — guidez-moi",
    ],
    errName: "Veuillez nous indiquer votre nom.",
    errEmailMissing: "Il nous faut un moyen de vous joindre.",
    errEmailInvalid: "Cet e-mail ne semble pas correct.",
  },
  nl: {
    confirmTitle: "Dank u — het is bij ons",
    confirmBody:
      "Uw aanvraag heeft een reisontwerper bereikt, die haar zorgvuldig zal lezen en binnen 24 uur antwoordt. Geen standaardbrief — een echt antwoord, van een echt persoon die dit land kent.",
    errorBanner:
      "Er ging iets mis bij het versturen van uw aanvraag. Probeer het opnieuw, of schrijf ons op hello@luxuriousegypt.com.",
    aboutYou: "Over u",
    yourName: "Uw naam",
    yourNamePh: "Voor- en achternaam",
    email: "E-mail",
    emailPh: "u@voorbeeld.com",
    phone: "Telefoon of WhatsApp",
    optional: "— optioneel",
    phonePh: "Met landnummer",
    based: "Waar u woont",
    basedPh: "Land",
    yourJourney: "Uw reis",
    when: "Geplande datum",
    select: "Selecteer…",
    whenOpts: ["Oktober – april (het klassieke seizoen)", "Mei – september", "Ik heb specifieke data", "Flexibel / nog niet besloten"],
    length: "Hoe lang",
    lengthOpts: ["Ongeveer een week", "Tien dagen tot twee weken", "Langer dan twee weken", "Niet zeker — adviseer mij"],
    party: "U reist",
    partyOpts: ["Alleen wij tweeën", "Een gezin", "Solo", "Een kleine privégroep", "Een bijzondere gelegenheid"],
    draws: "Welk soort reis trekt u",
    chooseAny: "— kies vrij",
    matters: "Wat het belangrijkst is",
    ownWords: "In uw eigen woorden",
    notesPh:
      "De reis die u zich voorstelt, wat u belangrijk vindt, alles wat u ons wilt laten weten — tempo, interesses, met wie u reist, een droom die u koestert. Eén zin volstaat; meer is welkom.",
    notesHelp: "Dit is het nuttigste dat u ons kunt geven. Het is wat een ontwerper het eerst leest.",
    budget: "Indicatie van budget",
    budgetOpt: "— optioneel, per persoon",
    budgetPrefer: "Bespreek ik liever",
    budgetOpts: ["Tot £4.000 per persoon", "£4.000 – £8.000 per persoon", "£8.000 – £15.000 per persoon", "Meer dan £15.000 per persoon"],
    budgetHelp: "Niet om een plafond te stellen — maar om te zorgen dat het eerste voorstel de juiste vorm heeft, geen gok.",
    honest:
      "Als uw data of budget niet passen bij de reis die u voor ogen hebt, zeggen wij dat, en stellen wij voor wat wél past. Eerlijk advies is waar het om draait; een voorstel dat u niet nodig hebt, helpt geen van ons beiden.",
    sending: "Versturen…",
    send: "Verstuur uw aanvraag",
    reply: (
      <>
        Binnen <b>24 uur</b> beantwoord, door een echt persoon
      </>
    ),
    interests: [
      "De Nijl onder zeil",
      "Oude sites en tempels",
      "Caïro en de piramides",
      "Het diepe zuiden en Abu Simbel",
      "Woestijn en de oasen",
      "De Rode Zee en de kust",
      "Een huwelijksreis of viering",
      "Niet zeker — gids mij",
    ],
    errName: "Vertel ons alstublieft uw naam.",
    errEmailMissing: "Wij hebben een manier nodig om u te bereiken.",
    errEmailInvalid: "Dat e-mailadres lijkt niet te kloppen.",
  },
  de: {
    confirmTitle: "Vielen Dank — es ist bei uns",
    confirmBody:
      "Ihre Anfrage hat einen Reisegestalter erreicht, der sie aufmerksam lesen und innerhalb von 24 Stunden antworten wird. Kein Standardschreiben — eine echte Antwort, von einem echten Menschen, der dieses Land kennt.",
    errorBanner:
      "Beim Senden Ihrer Anfrage ist etwas schiefgegangen. Bitte versuchen Sie es erneut oder schreiben Sie uns an hello@luxuriousegypt.com.",
    aboutYou: "Über Sie",
    yourName: "Ihr Name",
    yourNamePh: "Vor- und Nachname",
    email: "E-Mail",
    emailPh: "sie@beispiel.com",
    phone: "Telefon oder WhatsApp",
    optional: "— optional",
    phonePh: "Mit Landesvorwahl",
    based: "Wo Sie ansässig sind",
    basedPh: "Land",
    yourJourney: "Ihre Reise",
    when: "Geplantes Datum",
    select: "Auswählen…",
    whenOpts: ["Oktober – April (die klassische Saison)", "Mai – September", "Ich habe konkrete Daten", "Flexibel / noch nicht entschieden"],
    length: "Wie lange",
    lengthOpts: ["Etwa eine Woche", "Zehn Tage bis zwei Wochen", "Länger als zwei Wochen", "Nicht sicher — beraten Sie mich"],
    party: "Sie reisen",
    partyOpts: ["Nur wir zwei", "Eine Familie", "Allein", "Eine kleine private Gruppe", "Ein besonderer Anlass"],
    draws: "Welche Art von Reise reizt Sie",
    chooseAny: "— wählen Sie frei",
    matters: "Was am wichtigsten ist",
    ownWords: "In Ihren eigenen Worten",
    notesPh:
      "Die Reise, die Sie sich vorstellen, was Ihnen wichtig ist, alles, was wir wissen sollten — Tempo, Interessen, mit wem Sie reisen, ein Traum, den Sie hegen. Ein Satz genügt; mehr ist willkommen.",
    notesHelp: "Das ist das Nützlichste, das Sie uns geben können. Es ist das, was ein Gestalter zuerst liest.",
    budget: "Budgethinweis",
    budgetOpt: "— optional, pro Person",
    budgetPrefer: "Bespreche ich lieber",
    budgetOpts: ["Bis 4.000 £ pro Person", "4.000 £ – 8.000 £ pro Person", "8.000 £ – 15.000 £ pro Person", "Über 15.000 £ pro Person"],
    budgetHelp: "Nicht um eine Obergrenze zu setzen — sondern damit der erste Vorschlag die richtige Form hat und keine Vermutung ist.",
    honest:
      "Wenn Ihre Daten oder Ihr Budget nicht zu der Reise passen, die Sie im Sinn haben, sagen wir das und schlagen vor, was passen würde. Ehrlicher Rat ist der Sinn der Sache; ein Vorschlag, den Sie nicht brauchen, nützt keinem von uns beiden.",
    sending: "Senden…",
    send: "Senden Sie Ihre Anfrage",
    reply: (
      <>
        Beantwortet innerhalb von <b>24 Stunden</b>, von einem echten Menschen
      </>
    ),
    interests: [
      "Der Nil unter Segeln",
      "Antike Stätten und Tempel",
      "Kairo und die Pyramiden",
      "Der tiefe Süden und Abu Simbel",
      "Wüste und die Oasen",
      "Das Rote Meer und die Küste",
      "Eine Hochzeitsreise oder Feier",
      "Nicht sicher — führen Sie mich",
    ],
    errName: "Bitte nennen Sie uns Ihren Namen.",
    errEmailMissing: "Wir brauchen eine Möglichkeit, Sie zu erreichen.",
    errEmailInvalid: "Diese E-Mail scheint nicht korrekt zu sein.",
  },
} as const;

export default function WarmEnquiryForm({
  defaultNotes = "",
  locale = "en",
}: {
  defaultNotes?: string;
  locale?: Locale;
}) {
  const T = DICT[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next: { name?: string; email?: string } = {};
    if (!name) next.name = T.errName;
    if (!email) next.email = T.errEmailMissing;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = T.errEmailInvalid;
    setErrors(next);
    if (Object.keys(next).length) return;

    const interests = data.getAll("interest").map(String);
    const notes = String(data.get("notes") ?? "").trim();
    const when = String(data.get("when") ?? "");
    const length = String(data.get("length") ?? "");
    const party = String(data.get("party") ?? "");
    const budget = String(data.get("budget") ?? "");

    // The API requires a non-empty message; compose one if notes were left blank.
    const message =
      notes ||
      [
        interests.length ? `Interested in: ${interests.join(", ")}.` : "",
        when ? `When: ${when}.` : "",
        length ? `Length: ${length}.` : "",
        party ? `Travelling: ${party}.` : "",
      ]
        .filter(Boolean)
        .join(" ") ||
      "A private Egypt journey — details to discuss.";

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: data.get("phone"),
          country: data.get("country"),
          when,
          length,
          party,
          interests,
          budget,
          message,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <div className="confirm" role="status" aria-live="polite">
        <div className="seal" aria-hidden="true">
          ✦
        </div>
        <h3>{T.confirmTitle}</h3>
        <p>{T.confirmBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status === "error" && (
        <div className="form-banner" role="alert">
          {T.errorBanner}
        </div>
      )}

      <fieldset>
        <legend>{T.aboutYou}</legend>
        <div className="row">
          <div className={`field${errors.name ? " field--error" : ""}`}>
            <label htmlFor="name">{T.yourName}</label>
            <input id="name" name="name" type="text" placeholder={T.yourNamePh} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className={`field${errors.email ? " field--error" : ""}`}>
            <label htmlFor="email">{T.email}</label>
            <input id="email" name="email" type="email" placeholder={T.emailPh} autoComplete="email" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="phone">
              {T.phone} <span className="opt">{T.optional}</span>
            </label>
            <input id="phone" name="phone" type="tel" placeholder={T.phonePh} autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="country">
              {T.based} <span className="opt">{T.optional}</span>
            </label>
            <input id="country" name="country" type="text" placeholder={T.basedPh} autoComplete="country-name" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>{T.yourJourney}</legend>
        <div className="row thirds">
          <div className="field">
            <label htmlFor="when">{T.when}</label>
            <select id="when" name="when" defaultValue="">
              <option value="">{T.select}</option>
              {T.whenOpts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="length">{T.length}</label>
            <select id="length" name="length" defaultValue="">
              <option value="">{T.select}</option>
              {T.lengthOpts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="party">{T.party}</label>
            <select id="party" name="party" defaultValue="">
              <option value="">{T.select}</option>
              {T.partyOpts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field full" style={{ marginTop: "0.6rem" }}>
          <label>
            {T.draws} <span className="opt">{T.chooseAny}</span>
          </label>
          <div className="chips">
            {T.interests.map((label) => (
              <label className="chip" key={label}>
                <input type="checkbox" name="interest" value={label} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>{T.matters}</legend>
        <div className="field full">
          <label htmlFor="notes">{T.ownWords}</label>
          <textarea
            id="notes"
            name="notes"
            defaultValue={defaultNotes}
            placeholder={T.notesPh}
          />
          <p className="help">{T.notesHelp}</p>
        </div>
        <div className="field full">
          <label htmlFor="budget">
            {T.budget} <span className="opt">{T.budgetOpt}</span>
          </label>
          <select id="budget" name="budget" defaultValue="">
            <option value="">{T.budgetPrefer}</option>
            {T.budgetOpts.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <p className="help">{T.budgetHelp}</p>
        </div>
      </fieldset>

      <div className="honest">
        <span className="mark" aria-hidden="true">
          —
        </span>
        <p>{T.honest}</p>
      </div>

      <div className="submit-row">
        <button className="wbtn solid" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? T.sending : T.send}
        </button>
        <span className="reply">{T.reply}</span>
      </div>
    </form>
  );
}
