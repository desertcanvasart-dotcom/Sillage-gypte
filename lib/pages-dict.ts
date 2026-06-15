import type { Locale } from "./i18n";

/** Framing copy for the section index + simple pages (heroes, intros, CTAs). */
export interface PagesDict {
  crumbHome: string;
  tours: { eyebrow: string; titlePre: string; titleEm: string; subtitle: string; introLead: string; introLeadEm: string; introBody: string; ctaPre: string; ctaEm: string; ctaBody: string };
  destinations: { eyebrow: string; titlePre: string; titleEm: string; subtitle: string; introLeadPre: string; introLeadEm: string; introBody: string; ctaPre: string; ctaEm: string; ctaBody: string };
  experiences: { eyebrow: string; titlePre: string; titleEm: string; subtitle: string; introLeadPre: string; introLeadEm: string; introBody: string; ctaPre: string; ctaEm: string; ctaBody: string };
  journal: { eyebrow: string; titlePre: string; titleEm: string; subtitle: string; ctaPre: string; ctaEm: string; ctaBody: string };
}

const en: PagesDict = {
  crumbHome: "Home",
  tours: {
    eyebrow: "Our journeys", titlePre: "Journeys we ", titleEm: "design.",
    subtitle: "A starting point, never a fixed menu. Each of these is a private journey we shape around you — your pace, your interests, your time.",
    introLead: "We do not run scheduled departures. Every journey below is a framework — a way in — that we ", introLeadEm: "tailor", introBody: " entirely to the people travelling.",
    ctaPre: "Not sure which is ", ctaEm: "yours?", ctaBody: "That is exactly what we are here for. Tell us what draws you to Egypt and we will point you to the right starting point — or design something new.",
  },
  destinations: {
    eyebrow: "Destinations", titlePre: "The places we ", titleEm: "travel.",
    subtitle: "From the pyramids to the salt lakes of Siwa — the regions that make up a journey through Egypt, and what each one holds.",
    introLeadPre: "Egypt is not one destination but many — and the ", introLeadEm: "art is in how you connect them.", introBody: " These are the regions we know best.",
    ctaPre: "Connect them into ", ctaEm: "one journey.", ctaBody: "Tell us which places call to you and we'll design the route — at the right pace, with the right guide.",
  },
  experiences: {
    eyebrow: "Experiences", titlePre: "The moments you ", titleEm: "remember.",
    subtitle: "Beyond the itinerary, a handful of singular experiences we can build into any journey — the kind travellers describe for years afterward.",
    introLeadPre: "A journey is made of more than the places you go. It is made of the ", introLeadEm: "moments you did not expect", introBody: " — and these are ours to give.",
    ctaPre: "Build a journey around a ", ctaEm: "moment.", ctaBody: "Tell us which of these speaks to you, and we'll design a private journey that leads to it.",
  },
  journal: {
    eyebrow: "The journal", titlePre: "Notes on travelling Egypt ", titleEm: "well.",
    subtitle: "Practical guidance and quiet enthusiasm from the people who guide here — what to see, when to go, and how to go deeper.",
    ctaPre: "Reading leads to ", ctaEm: "travelling.", ctaBody: "When you're ready to turn the idea into a journey, tell us what draws you to Egypt and we'll design the rest.",
  },
};

const es: PagesDict = {
  crumbHome: "Inicio",
  tours: {
    eyebrow: "Nuestros viajes", titlePre: "Viajes que ", titleEm: "diseñamos.",
    subtitle: "Un punto de partida, nunca un menú cerrado. Cada uno es un viaje privado que damos forma a tu medida — tu ritmo, tus intereses, tu tiempo.",
    introLead: "No operamos salidas programadas. Cada viaje de abajo es un marco — una vía de entrada — que ", introLeadEm: "adaptamos", introBody: " por completo a quienes viajan.",
    ctaPre: "¿No sabes cuál es ", ctaEm: "el tuyo?", ctaBody: "Para eso estamos. Cuéntanos qué te atrae de Egipto y te señalaremos el punto de partida adecuado — o diseñaremos algo nuevo.",
  },
  destinations: {
    eyebrow: "Destinos", titlePre: "Los lugares que ", titleEm: "recorremos.",
    subtitle: "De las pirámides a los lagos salados de Siwa — las regiones que componen un viaje por Egipto, y lo que guarda cada una.",
    introLeadPre: "Egipto no es un destino, sino muchos — y el ", introLeadEm: "arte está en cómo los enlazas.", introBody: " Estas son las regiones que mejor conocemos.",
    ctaPre: "Enlázalos en ", ctaEm: "un solo viaje.", ctaBody: "Cuéntanos qué lugares te llaman y diseñaremos la ruta — al ritmo adecuado, con el guía adecuado.",
  },
  experiences: {
    eyebrow: "Experiencias", titlePre: "Los momentos que ", titleEm: "recuerdas.",
    subtitle: "Más allá del itinerario, un puñado de experiencias singulares que podemos integrar en cualquier viaje — de las que se cuentan durante años.",
    introLeadPre: "Un viaje es mucho más que los lugares a los que vas. Lo hacen los ", introLeadEm: "momentos que no esperabas", introBody: " — y esos son nuestros para regalar.",
    ctaPre: "Diseña un viaje en torno a un ", ctaEm: "momento.", ctaBody: "Cuéntanos cuál de ellos te habla y diseñaremos un viaje privado que te lleve hasta él.",
  },
  journal: {
    eyebrow: "El diario", titlePre: "Notas para viajar bien por ", titleEm: "Egipto.",
    subtitle: "Consejo práctico y entusiasmo sereno de quienes guían aquí — qué ver, cuándo ir y cómo profundizar.",
    ctaPre: "Leer lleva a ", ctaEm: "viajar.", ctaBody: "Cuando quieras convertir la idea en un viaje, cuéntanos qué te atrae de Egipto y diseñaremos el resto.",
  },
};

const fr: PagesDict = {
  crumbHome: "Accueil",
  tours: {
    eyebrow: "Nos voyages", titlePre: "Des voyages que nous ", titleEm: "concevons.",
    subtitle: "Un point de départ, jamais un menu figé. Chacun est un voyage privé que nous façonnons autour de vous — votre rythme, vos centres d'intérêt, votre temps.",
    introLead: "Nous n'organisons pas de départs programmés. Chaque voyage ci-dessous est un cadre — une porte d'entrée — que nous ", introLeadEm: "adaptons", introBody: " entièrement à ceux qui voyagent.",
    ctaPre: "Vous ne savez pas lequel est ", ctaEm: "le vôtre ?", ctaBody: "C'est précisément notre raison d'être. Dites-nous ce qui vous attire en Égypte et nous vous orienterons vers le bon point de départ — ou en concevrons un nouveau.",
  },
  destinations: {
    eyebrow: "Destinations", titlePre: "Les lieux que nous ", titleEm: "parcourons.",
    subtitle: "Des pyramides aux lacs salés de Siwa — les régions qui composent un voyage à travers l'Égypte, et ce que chacune recèle.",
    introLeadPre: "L'Égypte n'est pas une destination mais plusieurs — et tout ", introLeadEm: "l'art réside dans la façon de les relier.", introBody: " Voici les régions que nous connaissons le mieux.",
    ctaPre: "Reliez-les en ", ctaEm: "un seul voyage.", ctaBody: "Dites-nous quels lieux vous appellent et nous concevrons l'itinéraire — au bon rythme, avec le bon guide.",
  },
  experiences: {
    eyebrow: "Expériences", titlePre: "Les instants dont on se ", titleEm: "souvient.",
    subtitle: "Au-delà de l'itinéraire, une poignée d'expériences singulières que nous intégrons à tout voyage — de celles que l'on raconte des années durant.",
    introLeadPre: "Un voyage, c'est bien plus que les lieux où l'on se rend. Il est fait des ", introLeadEm: "instants que l'on n'attendait pas", introBody: " — et ceux-là, c'est à nous de les offrir.",
    ctaPre: "Composez un voyage autour d'un ", ctaEm: "instant.", ctaBody: "Dites-nous lequel vous parle, et nous concevrons un voyage privé qui vous y mènera.",
  },
  journal: {
    eyebrow: "Le journal", titlePre: "Notes pour bien voyager en ", titleEm: "Égypte.",
    subtitle: "Conseils pratiques et enthousiasme tranquille de ceux qui guident ici — quoi voir, quand partir, et comment aller plus loin.",
    ctaPre: "Lire mène à ", ctaEm: "voyager.", ctaBody: "Quand vous serez prêt à transformer l'idée en voyage, dites-nous ce qui vous attire en Égypte et nous concevrons le reste.",
  },
};

const nl: PagesDict = {
  crumbHome: "Home",
  tours: {
    eyebrow: "Onze reizen", titlePre: "Reizen die wij ", titleEm: "ontwerpen.",
    subtitle: "Een vertrekpunt, nooit een vast menu. Elk van deze is een privéreis die wij rond u vormgeven — uw tempo, uw interesses, uw tijd.",
    introLead: "Wij organiseren geen vaste vertrekdata. Elke reis hieronder is een kader — een ingang — die wij ", introLeadEm: "volledig op maat maken", introBody: " van de mensen die reizen.",
    ctaPre: "Weet u niet welke ", ctaEm: "de uwe is?", ctaBody: "Daar zijn wij juist voor. Vertel ons wat u naar Egypte trekt en wij wijzen u het juiste vertrekpunt — of ontwerpen iets nieuws.",
  },
  destinations: {
    eyebrow: "Bestemmingen", titlePre: "De plekken die wij ", titleEm: "bereizen.",
    subtitle: "Van de piramides tot de zoutmeren van Siwa — de streken die samen een reis door Egypte vormen, en wat elk ervan herbergt.",
    introLeadPre: "Egypte is niet één bestemming maar vele — en de ", introLeadEm: "kunst zit in hoe u ze met elkaar verbindt.", introBody: " Dit zijn de streken die wij het best kennen.",
    ctaPre: "Verbind ze tot ", ctaEm: "één reis.", ctaBody: "Vertel ons welke plekken u roepen en wij ontwerpen de route — op het juiste tempo, met de juiste gids.",
  },
  experiences: {
    eyebrow: "Ervaringen", titlePre: "De momenten die u zich ", titleEm: "herinnert.",
    subtitle: "Voorbij de route, een handvol unieke ervaringen die wij in elke reis kunnen verweven — van het soort dat reizigers er nog jaren over vertellen.",
    introLeadPre: "Een reis bestaat uit meer dan de plekken waar u heen gaat. Ze bestaat uit de ", introLeadEm: "momenten die u niet had verwacht", introBody: " — en die zijn van ons om te geven.",
    ctaPre: "Bouw een reis rond een ", ctaEm: "moment.", ctaBody: "Vertel ons welk ervan u aanspreekt, en wij ontwerpen een privéreis die u erheen voert.",
  },
  journal: {
    eyebrow: "Het journaal", titlePre: "Aantekeningen over goed reizen door ", titleEm: "Egypte.",
    subtitle: "Praktisch advies en kalm enthousiasme van de mensen die hier begeleiden — wat te zien, wanneer te gaan, en hoe dieper te gaan.",
    ctaPre: "Lezen leidt tot ", ctaEm: "reizen.", ctaBody: "Wanneer u klaar bent om het idee in een reis om te zetten, vertel ons wat u naar Egypte trekt en wij ontwerpen de rest.",
  },
};

const de: PagesDict = {
  crumbHome: "Start",
  tours: {
    eyebrow: "Unsere Reisen", titlePre: "Reisen, die wir ", titleEm: "gestalten.",
    subtitle: "Ein Ausgangspunkt, niemals ein festes Menü. Jede dieser Reisen ist eine private Reise, die wir um Sie herum formen — Ihr Tempo, Ihre Interessen, Ihre Zeit.",
    introLead: "Wir veranstalten keine festen Abreisetermine. Jede Reise unten ist ein Rahmen — ein Zugang —, den wir ", introLeadEm: "vollständig auf Maß zuschneiden", introBody: " für die Menschen, die reisen.",
    ctaPre: "Sie wissen nicht, welche ", ctaEm: "die Ihre ist?", ctaBody: "Genau dafür sind wir da. Sagen Sie uns, was Sie an Ägypten reizt, und wir weisen Ihnen den richtigen Ausgangspunkt — oder gestalten etwas Neues.",
  },
  destinations: {
    eyebrow: "Reiseziele", titlePre: "Die Orte, die wir ", titleEm: "bereisen.",
    subtitle: "Von den Pyramiden bis zu den Salzseen von Siwa — die Regionen, die eine Reise durch Ägypten ausmachen, und was jede von ihnen birgt.",
    introLeadPre: "Ägypten ist nicht ein Reiseziel, sondern viele — und die ", introLeadEm: "Kunst liegt darin, wie Sie sie verbinden.", introBody: " Dies sind die Regionen, die wir am besten kennen.",
    ctaPre: "Verbinden Sie sie zu ", ctaEm: "einer Reise.", ctaBody: "Sagen Sie uns, welche Orte Sie rufen, und wir gestalten die Route — im richtigen Tempo, mit dem richtigen Reiseführer.",
  },
  experiences: {
    eyebrow: "Erlebnisse", titlePre: "Die Augenblicke, an die Sie sich ", titleEm: "erinnern.",
    subtitle: "Jenseits der Route eine Handvoll einzigartiger Erlebnisse, die wir in jede Reise einweben können — von der Art, von der Reisende noch Jahre später erzählen.",
    introLeadPre: "Eine Reise besteht aus mehr als den Orten, an die Sie gehen. Sie besteht aus den ", introLeadEm: "Augenblicken, die Sie nicht erwartet haben", introBody: " — und die zu schenken liegt bei uns.",
    ctaPre: "Bauen Sie eine Reise um einen ", ctaEm: "Augenblick.", ctaBody: "Sagen Sie uns, welches dieser Erlebnisse Sie anspricht, und wir gestalten eine private Reise, die Sie dorthin führt.",
  },
  journal: {
    eyebrow: "Das Journal", titlePre: "Notizen über das gute Reisen durch ", titleEm: "Ägypten.",
    subtitle: "Praktischer Rat und stille Begeisterung von den Menschen, die hier führen — was es zu sehen gibt, wann man reisen sollte und wie man tiefer eintaucht.",
    ctaPre: "Lesen führt zum ", ctaEm: "Reisen.", ctaBody: "Wenn Sie bereit sind, die Idee in eine Reise zu verwandeln, sagen Sie uns, was Sie an Ägypten reizt, und wir gestalten den Rest.",
  },
};

const DICTS: Record<Locale, PagesDict> = { en, es, fr, nl, de };
export function getPagesDict(locale: Locale): PagesDict {
  return DICTS[locale];
}
