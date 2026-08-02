import { locales, localePath, type Locale } from "./i18n";

/**
 * Localized <title> / meta description for the root layout and the static
 * index pages. Detail pages ([slug] routes) localize via their content files.
 */
export interface PageMeta {
  title: string;
  description: string;
}

export interface MetaDict {
  root: PageMeta;
  /** Short description used for OpenGraph/Twitter cards. */
  ogDescription: string;
  tours: PageMeta;
  destinations: PageMeta;
  experiences: PageMeta;
  guides: PageMeta;
  journal: PageMeta;
  about: PageMeta;
  contact: PageMeta;
  plan: PageMeta;
}

/**
 * Canonical + hreflang alternates for a page, from the locale-neutral path.
 * Each locale's page is canonical at its own URL; hreflang links the set.
 */
export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": path,
    },
  };
}

const en: MetaDict = {
  root: {
    title: "Sillage Égypte — Private Journeys Across Egypt",
    description:
      "Sillage Égypte designs private journeys for discerning international travellers who want to experience Egypt on their own terms — guided by experts, built around their interests.",
  },
  ogDescription:
    "Private journeys designed around you, guided by experts who know every layer of this country.",
  tours: {
    title: "Private Journeys Across Egypt",
    description:
      "Our signature private journeys — the Nile under sail, the Western Desert, the Valley of the Kings, and the far south. Every one designed exclusively for you.",
  },
  destinations: {
    title: "Destinations in Egypt",
    description:
      "Where we travel — Cairo, Luxor, Aswan, the Nile, the Red Sea, and Alexandria. The places that make up a Sillage Égypte journey.",
  },
  experiences: {
    title: "Signature Experiences in Egypt",
    description:
      "Single, designed moments to shape or punctuate any journey — the Giza plateau to yourselves, the Grand Egyptian Museum out of hours, Dendera by river, and the salt lakes of Siwa.",
  },
  guides: {
    title: "Our Guides — Egyptologists & Specialists",
    description:
      "Meet the Egyptologists, historians, and desert specialists who lead Sillage Égypte's private journeys — the people who change what you see.",
  },
  journal: {
    title: "The Journal — Travel Notes on Egypt",
    description:
      "Considered writing on travelling Egypt well — when to go, how long to stay, and the places worth going deeper. Notes from the people who guide here.",
  },
  about: {
    title: "About Sillage Égypte",
    description:
      "We are a small team of Egyptologists and journey designers who build private journeys across Egypt — one traveller, one conversation, one country at a time.",
  },
  contact: {
    title: "Contact Sillage Égypte",
    description:
      "Reach Sillage Égypte by email, phone, or WhatsApp — or send an enquiry and a journey designer will reply within 24 hours.",
  },
  plan: {
    title: "Plan Your Journey",
    description:
      "Every Sillage Égypte journey is designed from scratch, around you. Tell us a little, and a journey designer will shape a private proposal — with no obligation.",
  },
};

const es: MetaDict = {
  root: {
    title: "Sillage Égypte — Viajes privados por Egipto",
    description:
      "Sillage Égypte diseña viajes privados para viajeros internacionales exigentes que quieren vivir Egipto a su manera — guiados por expertos y construidos en torno a sus intereses.",
  },
  ogDescription:
    "Viajes privados diseñados a tu medida, guiados por expertos que conocen cada capa de este país.",
  tours: {
    title: "Viajes privados por Egipto",
    description:
      "Nuestros viajes privados de autor — el Nilo a vela, el Desierto Occidental, el Valle de los Reyes y el extremo sur. Cada uno diseñado exclusivamente para ti.",
  },
  destinations: {
    title: "Destinos en Egipto",
    description:
      "Por dónde viajamos — El Cairo, Luxor, Asuán, el Nilo, el mar Rojo y Alejandría. Los lugares que componen un viaje de Sillage Égypte.",
  },
  experiences: {
    title: "Experiencias exclusivas en Egipto",
    description:
      "Momentos únicos y diseñados que dan forma a cualquier viaje — la meseta de Guiza en exclusiva, el Gran Museo Egipcio fuera de horario, Dendera por el río y los lagos salados de Siwa.",
  },
  guides: {
    title: "Nuestros guías — egiptólogos y especialistas",
    description:
      "Conoce a los egiptólogos, historiadores y especialistas del desierto que dirigen los viajes privados de Sillage Égypte — las personas que cambian lo que ves.",
  },
  journal: {
    title: "El diario — notas de viaje sobre Egipto",
    description:
      "Escritura reflexiva sobre viajar bien por Egipto — cuándo ir, cuánto quedarse y los lugares que merecen más tiempo. Notas de quienes guían aquí.",
  },
  about: {
    title: "Quiénes somos — Sillage Égypte",
    description:
      "Somos un pequeño equipo de egiptólogos y diseñadores de viajes que crea viajes privados por Egipto — un viajero, una conversación, un país cada vez.",
  },
  contact: {
    title: "Contacto — Sillage Égypte",
    description:
      "Contacta con Sillage Égypte por correo, teléfono o WhatsApp — o envía una consulta y un diseñador de viajes te responderá en 24 horas.",
  },
  plan: {
    title: "Planifica tu viaje",
    description:
      "Cada viaje de Sillage Égypte se diseña desde cero, a tu medida. Cuéntanos un poco y un diseñador de viajes preparará una propuesta privada — sin compromiso.",
  },
};

const fr: MetaDict = {
  root: {
    title: "Sillage Égypte — Voyages privés à travers l'Égypte",
    description:
      "Sillage Égypte conçoit des voyages privés pour des voyageurs internationaux exigeants qui veulent vivre l'Égypte selon leurs propres termes — guidés par des experts, construits autour de leurs envies.",
  },
  ogDescription:
    "Des voyages privés conçus autour de vous, guidés par des experts qui connaissent chaque strate de ce pays.",
  tours: {
    title: "Voyages privés à travers l'Égypte",
    description:
      "Nos voyages privés signature — le Nil à la voile, le Désert occidental, la Vallée des Rois et le grand sud. Chacun conçu exclusivement pour vous.",
  },
  destinations: {
    title: "Destinations en Égypte",
    description:
      "Là où nous voyageons — Le Caire, Louxor, Assouan, le Nil, la mer Rouge et Alexandrie. Les lieux qui composent un voyage Sillage Égypte.",
  },
  experiences: {
    title: "Expériences signature en Égypte",
    description:
      "Des moments uniques et conçus pour façonner tout voyage — le plateau de Gizeh pour vous seuls, le Grand Musée égyptien hors horaires, Dendérah par le fleuve et les lacs salés de Siwa.",
  },
  guides: {
    title: "Nos guides — égyptologues et spécialistes",
    description:
      "Rencontrez les égyptologues, historiens et spécialistes du désert qui mènent les voyages privés de Sillage Égypte — celles et ceux qui changent ce que vous voyez.",
  },
  journal: {
    title: "Le journal — notes de voyage sur l'Égypte",
    description:
      "Des textes réfléchis sur l'art de bien voyager en Égypte — quand partir, combien de temps rester, et les lieux qui méritent qu'on s'y attarde. Notes de ceux qui guident ici.",
  },
  about: {
    title: "À propos de Sillage Égypte",
    description:
      "Nous sommes une petite équipe d'égyptologues et de concepteurs de voyages qui bâtit des voyages privés à travers l'Égypte — un voyageur, une conversation, un pays à la fois.",
  },
  contact: {
    title: "Contact — Sillage Égypte",
    description:
      "Contactez Sillage Égypte par e-mail, téléphone ou WhatsApp — ou envoyez une demande et un concepteur de voyages vous répondra sous 24 heures.",
  },
  plan: {
    title: "Composez votre voyage",
    description:
      "Chaque voyage Sillage Égypte est conçu sur mesure, autour de vous. Dites-nous en un peu, et un concepteur de voyages façonnera une proposition privée — sans engagement.",
  },
};

const nl: MetaDict = {
  root: {
    title: "Sillage Égypte — Privéreizen door Egypte",
    description:
      "Sillage Égypte ontwerpt privéreizen voor veeleisende internationale reizigers die Egypte op hun eigen voorwaarden willen ervaren — begeleid door experts, gebouwd rond hun interesses.",
  },
  ogDescription:
    "Privéreizen, ontworpen rond u, begeleid door experts die elke laag van dit land kennen.",
  tours: {
    title: "Privéreizen door Egypte",
    description:
      "Onze kenmerkende privéreizen — de Nijl onder zeil, de Westelijke Woestijn, het Dal der Koningen en het diepe zuiden. Elke reis exclusief voor u ontworpen.",
  },
  destinations: {
    title: "Bestemmingen in Egypte",
    description:
      "Waar we reizen — Caïro, Luxor, Aswan, de Nijl, de Rode Zee en Alexandrië. De plekken waaruit een Sillage Égypte-reis is opgebouwd.",
  },
  experiences: {
    title: "Bijzondere ervaringen in Egypte",
    description:
      "Unieke, ontworpen momenten die elke reis vormgeven — het Gizeh-plateau voor uzelf, het Grote Egyptische Museum buiten openingstijden, Dendera per rivier en de zoutmeren van Siwa.",
  },
  guides: {
    title: "Onze gidsen — egyptologen en specialisten",
    description:
      "Maak kennis met de egyptologen, historici en woestijnspecialisten die de privéreizen van Sillage Égypte leiden — de mensen die veranderen wat u ziet.",
  },
  journal: {
    title: "Het journaal — reisnotities over Egypte",
    description:
      "Doordachte teksten over goed reizen door Egypte — wanneer te gaan, hoe lang te blijven en de plekken die meer tijd verdienen. Notities van wie hier gidst.",
  },
  about: {
    title: "Over Sillage Égypte",
    description:
      "Wij zijn een klein team van egyptologen en reisontwerpers dat privéreizen door Egypte bouwt — één reiziger, één gesprek, één land tegelijk.",
  },
  contact: {
    title: "Contact — Sillage Égypte",
    description:
      "Bereik Sillage Égypte per e-mail, telefoon of WhatsApp — of stuur een aanvraag en een reisontwerper antwoordt binnen 24 uur.",
  },
  plan: {
    title: "Stel uw reis samen",
    description:
      "Elke reis van Sillage Égypte wordt vanaf nul ontworpen, rond u. Vertel ons iets, en een reisontwerper maakt een privévoorstel — geheel vrijblijvend.",
  },
};

const de: MetaDict = {
  root: {
    title: "Sillage Égypte — Private Reisen durch Ägypten",
    description:
      "Sillage Égypte entwirft private Reisen für anspruchsvolle internationale Reisende, die Ägypten zu ihren eigenen Bedingungen erleben möchten — geführt von Experten, gebaut um ihre Interessen.",
  },
  ogDescription:
    "Private Reisen, ganz um Sie herum gestaltet, geführt von Experten, die jede Schicht dieses Landes kennen.",
  tours: {
    title: "Private Reisen durch Ägypten",
    description:
      "Unsere charakteristischen Privatreisen — der Nil unter Segeln, die Westliche Wüste, das Tal der Könige und der tiefe Süden. Jede exklusiv für Sie entworfen.",
  },
  destinations: {
    title: "Reiseziele in Ägypten",
    description:
      "Wohin wir reisen — Kairo, Luxor, Assuan, der Nil, das Rote Meer und Alexandria. Die Orte, aus denen eine Sillage-Égypte-Reise besteht.",
  },
  experiences: {
    title: "Besondere Erlebnisse in Ägypten",
    description:
      "Einzigartige, gestaltete Momente, die jede Reise prägen — das Gizeh-Plateau ganz für Sie, das Große Ägyptische Museum außerhalb der Öffnungszeiten, Dendera über den Fluss und die Salzseen von Siwa.",
  },
  guides: {
    title: "Unsere Guides — Ägyptologen und Spezialisten",
    description:
      "Lernen Sie die Ägyptologen, Historiker und Wüstenspezialisten kennen, die die Privatreisen von Sillage Égypte führen — die Menschen, die verändern, was Sie sehen.",
  },
  journal: {
    title: "Das Journal — Reisenotizen über Ägypten",
    description:
      "Durchdachte Texte über das gute Reisen in Ägypten — wann man fährt, wie lange man bleibt und welche Orte mehr Zeit verdienen. Notizen von denen, die hier führen.",
  },
  about: {
    title: "Über Sillage Égypte",
    description:
      "Wir sind ein kleines Team aus Ägyptologen und Reisedesignern, das private Reisen durch Ägypten baut — ein Reisender, ein Gespräch, ein Land nach dem anderen.",
  },
  contact: {
    title: "Kontakt — Sillage Égypte",
    description:
      "Erreichen Sie Sillage Égypte per E-Mail, Telefon oder WhatsApp — oder senden Sie eine Anfrage, und ein Reisedesigner antwortet innerhalb von 24 Stunden.",
  },
  plan: {
    title: "Stellen Sie Ihre Reise zusammen",
    description:
      "Jede Reise von Sillage Égypte wird von Grund auf um Sie herum entworfen. Erzählen Sie uns ein wenig, und ein Reisedesigner gestaltet einen privaten Vorschlag — unverbindlich.",
  },
};

const dicts: Record<Locale, MetaDict> = { en, es, fr, nl, de };

export function getMetaDict(locale: Locale): MetaDict {
  return dicts[locale] ?? en;
}
