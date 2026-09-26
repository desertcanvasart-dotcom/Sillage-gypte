import type { Locale } from "./i18n";

/**
 * UI/marketing copy dictionary. Long-form editorial content lives in
 * content/**; this covers the global chrome and the page-level copy.
 * Add a locale by adding a key block below.
 */
export interface Dict {
  nav: { journeys: string; destinations: string; experiences: string; journal: string; plan: string };
  footer: {
    tagline: string; explore: string; contact: string;
    about: string; guides: string; rights: string; privacy: string; terms: string; cookies: string;
    /** Legal-identity line under the contact block: "Operated by …". */
    operatedBy: string; motLicence: string;
  };
  consent: { message: string; accept: string; decline: string; privacy: string };
  langName: string;
  home: {
    kicker: string; h1a: string; h1em: string; h1b: string; lede: string;
    viewJourneys: string; planOwn: string; scroll: string;
    manifestoEyebrow: string; manifestoA: string; manifestoEm: string; manifestoB: string;
    contrastEyebrow: string; contrastH2: string; contrastP: string;
    themLabel: string; themH3: string; themItems: string[];
    usLabel: string; usH3: string; usItems: string[];
    whereEyebrow: string; destH2: string; allDest: string; destEyebrows: Record<string, string>;
    howEyebrow: string; jourH2: string; allJour: string;
    pillarsEyebrow: string; pillarsH2: string; pillars: { h: string; p: string }[];
    quote: string; quoteCite: string;
    nameWord: string; namePron: string; nameBody: string;
    ctaEyebrow: string; ctaH2a: string; ctaH2em: string; ctaP: string; ctaBtn: string; ctaNote: string;
  };
}

const en: Dict = {
  nav: { journeys: "Journeys", destinations: "Destinations", experiences: "Experiences", journal: "Journal", plan: "Plan your journey" },
  footer: { tagline: "Private journeys designed around you, guided by experts who know every layer of this country.", explore: "Explore", contact: "Contact", about: "About", guides: "Guides", rights: "All rights reserved.", privacy: "Privacy", terms: "Terms", cookies: "Cookie settings", operatedBy: "Operated by", motLicence: "Ministry of Tourism licence" },
  consent: { message: "We use a single analytics cookie to understand how the site is used — no advertising, no profiling. Is that all right?", accept: "Accept", decline: "Decline", privacy: "Privacy policy" },
  langName: "English",
  home: {
    kicker: "Private journeys through Egypt",
    h1a: "Egypt, ", h1em: "read", h1b: " —\nnot merely seen.",
    lede: "Private journeys with Egyptologists who can actually read the walls — at the pace of the river, with access the convoys never reach.",
    viewJourneys: "View the journeys", planOwn: "Plan your own", scroll: "Scroll",
    manifestoEyebrow: "Our way of travelling",
    manifestoA: "Most of Egypt is seen from a coach window, at the same hour as everyone else. We think a country this old deserves to be ",
    manifestoEm: "read", manifestoB: " — slowly, privately, by someone who has spent a lifetime learning to.",
    contrastEyebrow: "Two ways to see Egypt", contrastH2: "The same temples. A different country.",
    contrastP: "Egypt can be endured in a convoy, or understood in private. The sites are identical. Almost nothing else is.",
    themLabel: "The convoy", themH3: "How most of Egypt is sold",
    themItems: ["A cabin on a ship of a hundred and fifty", "The same temple at the same crowded hour as a dozen other groups", "A guide who meets you at the gate and leaves at the next", "A fixed schedule that answers to the timetable, not the light", "The standard ticket, the standard route, the standard photograph"],
    usLabel: "Sillage", usH3: "How we travel instead",
    usItems: ["Your own boat, your own car, your own itinerary", "The Valley of the Kings at opening; Kom Ombo at dusk, emptied", "One Egyptologist, with you from the first day to the last", "Everything timed to the hour the light is best and the crowds are gone", "Access beyond the standard route — Nefertari, Seti I, a mooring with no name"],
    whereEyebrow: "Where we go", destH2: "Destinations", allDest: "All destinations →",
    destEyebrows: { luxor: "West & East Bank", aswan: "The frontier", cairo: "Four thousand years", "abu-simbel": "The deep south" },
    howEyebrow: "How to travel", jourH2: "Signature journeys", allJour: "All journeys →",
    pillarsEyebrow: "Why Sillage", pillarsH2: "Four things we will not compromise",
    pillars: [
      { h: "Private, always", p: "Never a group, never a convoy. Your journey is yours alone — the boat, the car, the guide, the hours." },
      { h: "Read by an expert", p: "Certified Egyptologists who can read the walls, not guides who recite a script. The difference is the whole journey." },
      { h: "Access beyond the route", p: "Tombs past the standard ticket, sites at the hour they open, moorings away from the usual stops. Where special permission is needed, we confirm it before you book." },
      { h: "Honest counsel", p: "We will tell you what isn't worth your time, and which journey isn't right for you. Advice, not a sales pitch." },
    ],
    quote: "Most people are shown the Valley of the Kings in an hour and moved on. Give it a morning, with someone who can actually read the walls, and a tomb stops being a corridor of pictures — it becomes the most ambitious thing a civilisation ever attempted.",
    quoteCite: "Dr. Khaled Amin — Senior Egyptologist",
    nameWord: "Sillage", namePron: "see-YAZH · French",
    nameBody: "The trail a boat leaves on still water — and the trace of something fine that lingers after it has passed. The name we travel under, and the impression we hope a journey leaves.",
    ctaEyebrow: "Begin the conversation", ctaH2a: "See Egypt, ", ctaH2em: "properly", ctaP: "Tell us your dates and what matters most to you. A journey designer will shape a private proposal, built around you — with no obligation.",
    ctaBtn: "Plan your journey", ctaNote: "We reply within 24 hours",
  },
};

const es: Dict = {
  nav: { journeys: "Viajes", destinations: "Destinos", experiences: "Experiencias", journal: "Diario", plan: "Planifica tu viaje" },
  footer: { tagline: "Viajes privados diseñados a tu medida, guiados por expertos que conocen cada capa de este país.", explore: "Explorar", contact: "Contacto", about: "Quiénes somos", guides: "Guías", rights: "Todos los derechos reservados.", privacy: "Privacidad", terms: "Términos", cookies: "Configuración de cookies", operatedBy: "Operado por", motLicence: "Licencia del Ministerio de Turismo" },
  consent: { message: "Utilizamos una única cookie analítica para entender cómo se usa el sitio: sin publicidad ni perfiles. ¿Le parece bien?", accept: "Aceptar", decline: "Rechazar", privacy: "Política de privacidad" },
  langName: "Español",
  home: {
    kicker: "Viajes privados por Egipto",
    h1a: "Egipto, ", h1em: "leído", h1b: " —\nno solo visto.",
    lede: "Viajes privados con egiptólogos capaces de leer de verdad los muros — al ritmo del río y con un acceso que las caravanas nunca alcanzan.",
    viewJourneys: "Ver los viajes", planOwn: "Diseña el tuyo", scroll: "Desliza",
    manifestoEyebrow: "Nuestra forma de viajar",
    manifestoA: "Casi todo Egipto se ve desde la ventanilla de un autocar, a la misma hora que todos los demás. Creemos que un país tan antiguo merece ser ",
    manifestoEm: "leído", manifestoB: " — despacio, en privado, por alguien que ha dedicado la vida a aprender a hacerlo.",
    contrastEyebrow: "Dos formas de ver Egipto", contrastH2: "Los mismos templos. Otro país.",
    contrastP: "Egipto puede soportarse en caravana o comprenderse en privado. Los lugares son idénticos. Casi nada más lo es.",
    themLabel: "La caravana", themH3: "Cómo se vende casi todo Egipto",
    themItems: ["Un camarote en un barco de ciento cincuenta personas", "El mismo templo, a la misma hora abarrotada, junto a otra docena de grupos", "Un guía que te recibe en la entrada y se va en la siguiente", "Un horario fijo que obedece al reloj, no a la luz", "La entrada estándar, la ruta estándar, la fotografía estándar"],
    usLabel: "Sillage", usH3: "Cómo viajamos nosotros",
    usItems: ["Tu propio barco, tu propio coche, tu propio itinerario", "El Valle de los Reyes al abrir; Kom Ombo al atardecer, vacío", "Un solo egiptólogo, contigo del primer día al último", "Todo medido a la hora en que la luz es mejor y las multitudes ya se han ido", "Acceso más allá de la ruta estándar — Nefertari, Seti I, un amarre sin nombre"],
    whereEyebrow: "Dónde vamos", destH2: "Destinos", allDest: "Todos los destinos →",
    destEyebrows: { luxor: "Orilla oeste y este", aswan: "La frontera", cairo: "Cuatro mil años", "abu-simbel": "El profundo sur" },
    howEyebrow: "Cómo viajar", jourH2: "Viajes emblemáticos", allJour: "Todos los viajes →",
    pillarsEyebrow: "Por qué Sillage", pillarsH2: "Cuatro cosas que no negociamos",
    pillars: [
      { h: "Privado, siempre", p: "Nunca un grupo, nunca una caravana. Tu viaje es solo tuyo — el barco, el coche, el guía, las horas." },
      { h: "Leído por un experto", p: "Egiptólogos titulados capaces de leer los muros, no guías que recitan un guion. La diferencia es el viaje entero." },
      { h: "Acceso más allá de la ruta", p: "Tumbas más allá de la entrada estándar, lugares a la hora en que abren, amarres lejos de las paradas habituales. Cuando hace falta un permiso especial, lo confirmamos antes de que reserve." },
      { h: "Consejo honesto", p: "Te diremos qué no merece tu tiempo y qué viaje no es para ti. Consejo, no una venta." },
    ],
    quote: "A casi todos les enseñan el Valle de los Reyes en una hora y siguen adelante. Dedícale una mañana, con alguien que sepa leer de verdad los muros, y una tumba deja de ser un pasillo de imágenes — se convierte en lo más ambicioso que una civilización intentó jamás.",
    quoteCite: "Dr. Khaled Amin — Egiptólogo sénior",
    nameWord: "Sillage", namePron: "si-YASH · francés",
    nameBody: "La estela que deja un barco sobre el agua quieta — y el rastro de algo bello que perdura cuando ya ha pasado. El nombre con el que viajamos, y la impresión que esperamos que deje un viaje.",
    ctaEyebrow: "Comencemos la conversación", ctaH2a: "Conoce Egipto, ", ctaH2em: "como es debido", ctaP: "Cuéntanos tus fechas y lo que más te importa. Un diseñador de viajes dará forma a una propuesta privada, hecha a tu medida — sin compromiso.",
    ctaBtn: "Planifica tu viaje", ctaNote: "Respondemos en menos de 24 horas",
  },
};

const fr: Dict = {
  nav: { journeys: "Voyages", destinations: "Destinations", experiences: "Expériences", journal: "Journal", plan: "Composez votre voyage" },
  footer: { tagline: "Des voyages privés conçus autour de vous, guidés par des experts qui connaissent chaque strate de ce pays.", explore: "Explorer", contact: "Contact", about: "À propos", guides: "Guides", rights: "Tous droits réservés.", privacy: "Confidentialité", terms: "Conditions", cookies: "Réglages des cookies", operatedBy: "Exploité par", motLicence: "Licence du ministère du Tourisme" },
  consent: { message: "Nous utilisons un seul cookie d\u2019analyse pour comprendre l\u2019usage du site — ni publicité, ni profilage. Êtes-vous d\u2019accord ?", accept: "Accepter", decline: "Refuser", privacy: "Politique de confidentialité" },
  langName: "Français",
  home: {
    kicker: "Voyages privés à travers l'Égypte",
    h1a: "L'Égypte, ", h1em: "lue", h1b: " —\npas seulement vue.",
    lede: "Des voyages privés avec des égyptologues capables de lire vraiment les murs — au rythme du fleuve, avec un accès que les convois n'atteignent jamais.",
    viewJourneys: "Voir les voyages", planOwn: "Composez le vôtre", scroll: "Défiler",
    manifestoEyebrow: "Notre façon de voyager",
    manifestoA: "On voit l'essentiel de l'Égypte par la vitre d'un autocar, à la même heure que tout le monde. Nous pensons qu'un pays aussi ancien mérite d'être ",
    manifestoEm: "lu", manifestoB: " — lentement, en privé, par quelqu'un qui a passé sa vie à apprendre à le faire.",
    contrastEyebrow: "Deux façons de voir l'Égypte", contrastH2: "Les mêmes temples. Un autre pays.",
    contrastP: "L'Égypte peut s'endurer en convoi ou se comprendre en privé. Les sites sont identiques. Presque rien d'autre ne l'est.",
    themLabel: "Le convoi", themH3: "Comment on vend presque toute l'Égypte",
    themItems: ["Une cabine sur un navire de cent cinquante personnes", "Le même temple, à la même heure bondée, avec une douzaine d'autres groupes", "Un guide qui vous accueille à l'entrée et vous quitte à la suivante", "Un programme fixe qui obéit à l'horaire, pas à la lumière", "Le billet standard, l'itinéraire standard, la photographie standard"],
    usLabel: "Sillage", usH3: "Comment nous voyageons",
    usItems: ["Votre propre bateau, votre propre voiture, votre propre itinéraire", "La Vallée des Rois à l'ouverture ; Kom Ombo au crépuscule, déserté", "Un seul égyptologue, avec vous du premier jour au dernier", "Tout réglé sur l'heure où la lumière est la plus belle et les foules parties", "Un accès au-delà de l'itinéraire standard — Néfertari, Séthi Ier, un mouillage sans nom"],
    whereEyebrow: "Où nous allons", destH2: "Destinations", allDest: "Toutes les destinations →",
    destEyebrows: { luxor: "Rive ouest et est", aswan: "La frontière", cairo: "Quatre mille ans", "abu-simbel": "Le grand sud" },
    howEyebrow: "Comment voyager", jourH2: "Voyages emblématiques", allJour: "Tous les voyages →",
    pillarsEyebrow: "Pourquoi Sillage", pillarsH2: "Quatre choses sur lesquelles nous ne transigeons pas",
    pillars: [
      { h: "Privé, toujours", p: "Jamais un groupe, jamais un convoi. Votre voyage n'appartient qu'à vous — le bateau, la voiture, le guide, les heures." },
      { h: "Lu par un expert", p: "Des égyptologues diplômés capables de lire les murs, non des guides qui récitent un script. La différence, c'est tout le voyage." },
      { h: "Un accès au-delà de l'itinéraire", p: "Des tombes au-delà du billet standard, des sites dès leur ouverture, des mouillages à l'écart des escales habituelles. Lorsqu'une autorisation spéciale est nécessaire, nous la confirmons avant votre réservation." },
      { h: "Un conseil honnête", p: "Nous vous dirons ce qui ne vaut pas votre temps, et quel voyage n'est pas pour vous. Un conseil, pas un argumentaire." },
    ],
    quote: "On montre à la plupart des gens la Vallée des Rois en une heure, puis on passe à autre chose. Accordez-lui une matinée, avec quelqu'un qui sait vraiment lire les murs, et une tombe cesse d'être un couloir d'images — elle devient la chose la plus ambitieuse qu'une civilisation ait jamais tentée.",
    quoteCite: "Dr Khaled Amin — Égyptologue principal",
    nameWord: "Sillage", namePron: "si-yaj · français",
    nameBody: "Le sillage qu'un bateau laisse sur l'eau calme — et la trace de quelque chose de beau qui demeure après son passage. Le nom sous lequel nous voyageons, et l'impression qu'un voyage, nous l'espérons, laisse derrière lui.",
    ctaEyebrow: "Commençons la conversation", ctaH2a: "Voyez l'Égypte, ", ctaH2em: "comme il se doit", ctaP: "Indiquez-nous vos dates et ce qui compte le plus pour vous. Un concepteur de voyages façonnera une proposition privée, bâtie autour de vous — sans engagement.",
    ctaBtn: "Composez votre voyage", ctaNote: "Nous répondons sous 24 heures",
  },
};

const nl: Dict = {
  nav: { journeys: "Reizen", destinations: "Bestemmingen", experiences: "Ervaringen", journal: "Journaal", plan: "Stel uw reis samen" },
  footer: { tagline: "Privéreizen, ontworpen rond u, begeleid door experts die elke laag van dit land kennen.", explore: "Ontdek", contact: "Contact", about: "Over ons", guides: "Gidsen", rights: "Alle rechten voorbehouden.", privacy: "Privacy", terms: "Voorwaarden", cookies: "Cookie-instellingen", operatedBy: "Beheerd door", motLicence: "Vergunning van het Ministerie van Toerisme" },
  consent: { message: "We gebruiken één analytische cookie om te zien hoe de site wordt gebruikt — geen advertenties, geen profilering. Vindt u dat goed?", accept: "Accepteren", decline: "Weigeren", privacy: "Privacybeleid" },
  langName: "Nederlands",
  home: {
    kicker: "Privéreizen door Egypte",
    h1a: "Egypte, ", h1em: "gelezen", h1b: " —\nniet enkel gezien.",
    lede: "Privéreizen met egyptologen die de muren werkelijk kunnen lezen — op het ritme van de rivier, met toegang die de konvooien nooit bereiken.",
    viewJourneys: "Bekijk de reizen", planOwn: "Stel uw eigen reis samen", scroll: "Scroll",
    manifestoEyebrow: "Onze manier van reizen",
    manifestoA: "Het grootste deel van Egypte wordt gezien door het raam van een touringcar, op hetzelfde uur als alle anderen. Wij vinden dat een zo oud land verdient om ",
    manifestoEm: "gelezen", manifestoB: " te worden — langzaam, in alle beslotenheid, door iemand die een leven lang heeft geleerd dat te doen.",
    contrastEyebrow: "Twee manieren om Egypte te zien", contrastH2: "Dezelfde tempels. Een ander land.",
    contrastP: "Egypte kun je doorstaan in een konvooi, of begrijpen in alle beslotenheid. De plekken zijn identiek. Vrijwel niets anders is dat.",
    themLabel: "Het konvooi", themH3: "Hoe het grootste deel van Egypte wordt verkocht",
    themItems: ["Een hut op een schip met honderdvijftig passagiers", "Dezelfde tempel op hetzelfde drukke uur als een dozijn andere groepen", "Een gids die u bij de poort ontvangt en bij de volgende weer verlaat", "Een vast schema dat de dienstregeling volgt, niet het licht", "Het standaardticket, de standaardroute, de standaardfoto"],
    usLabel: "Sillage", usH3: "Hoe wij in plaats daarvan reizen",
    usItems: ["Uw eigen boot, uw eigen auto, uw eigen route", "Het Dal der Koningen bij opening; Kom Ombo bij schemering, verlaten", "Eén egyptoloog, bij u van de eerste tot de laatste dag", "Alles afgestemd op het uur waarop het licht het mooist is en de drukte verdwenen", "Toegang voorbij de standaardroute — Nefertari, Seti I, een aanlegplaats zonder naam"],
    whereEyebrow: "Waar we naartoe gaan", destH2: "Bestemmingen", allDest: "Alle bestemmingen →",
    destEyebrows: { luxor: "West- en oostoever", aswan: "De grens", cairo: "Vierduizend jaar", "abu-simbel": "Het diepe zuiden" },
    howEyebrow: "Hoe te reizen", jourH2: "Kenmerkende reizen", allJour: "Alle reizen →",
    pillarsEyebrow: "Waarom Sillage", pillarsH2: "Vier dingen waarop wij geen concessies doen",
    pillars: [
      { h: "Privé, altijd", p: "Nooit een groep, nooit een konvooi. Uw reis is van u alleen — de boot, de auto, de gids, de uren." },
      { h: "Gelezen door een expert", p: "Gediplomeerde egyptologen die de muren kunnen lezen, geen gidsen die een script opzeggen. Het verschil is de hele reis." },
      { h: "Toegang voorbij de route", p: "Graven voorbij het standaardticket, plekken op het uur dat ze opengaan, aanlegplaatsen buiten de gebruikelijke stops. Waar speciale toestemming nodig is, bevestigen wij die voordat u boekt." },
      { h: "Eerlijk advies", p: "Wij zeggen u wat uw tijd niet waard is, en welke reis niet bij u past. Advies, geen verkooppraatje." },
    ],
    quote: "De meeste mensen krijgen het Dal der Koningen in een uur te zien en reizen weer verder. Gun het een ochtend, met iemand die de muren werkelijk kan lezen, en een graf houdt op een gang vol afbeeldingen te zijn — het wordt het meest ambitieuze dat een beschaving ooit heeft ondernomen.",
    quoteCite: "Dr. Khaled Amin — Senior-egyptoloog",
    nameWord: "Sillage", namePron: "sie-JAZJ · Frans",
    nameBody: "Het spoor dat een boot achterlaat op stil water — en het zweem van iets verfijnds dat blijft hangen nadat het voorbij is. De naam waaronder wij reizen, en de indruk die een reis naar wij hopen nalaat.",
    ctaEyebrow: "Begin het gesprek", ctaH2a: "Zie Egypte, ", ctaH2em: "zoals het hoort", ctaP: "Vertel ons uw data en wat voor u het belangrijkst is. Een reisontwerper geeft vorm aan een persoonlijk voorstel, gebouwd rond u — geheel vrijblijvend.",
    ctaBtn: "Stel uw reis samen", ctaNote: "Wij antwoorden binnen 24 uur",
  },
};

const de: Dict = {
  nav: { journeys: "Reisen", destinations: "Reiseziele", experiences: "Erlebnisse", journal: "Journal", plan: "Stellen Sie Ihre Reise zusammen" },
  footer: { tagline: "Private Reisen, ganz um Sie herum gestaltet, geführt von Experten, die jede Schicht dieses Landes kennen.", explore: "Entdecken", contact: "Kontakt", about: "Über uns", guides: "Reiseführer", rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz", terms: "Bedingungen", cookies: "Cookie-Einstellungen", operatedBy: "Betrieben von", motLicence: "Lizenz des Tourismusministeriums" },
  consent: { message: "Wir verwenden ein einziges Analyse-Cookie, um zu verstehen, wie die Website genutzt wird — keine Werbung, kein Profiling. Sind Sie einverstanden?", accept: "Akzeptieren", decline: "Ablehnen", privacy: "Datenschutzerklärung" },
  langName: "Deutsch",
  home: {
    kicker: "Private Reisen durch Ägypten",
    h1a: "Ägypten, ", h1em: "gelesen", h1b: " —\nnicht bloß gesehen.",
    lede: "Private Reisen mit Ägyptologen, welche die Wände wirklich lesen können — im Rhythmus des Flusses, mit Zugang, den die Konvois nie erreichen.",
    viewJourneys: "Die Reisen ansehen", planOwn: "Gestalten Sie Ihre eigene", scroll: "Scrollen",
    manifestoEyebrow: "Unsere Art zu reisen",
    manifestoA: "Der größte Teil Ägyptens wird durch das Fenster eines Reisebusses gesehen, zur selben Stunde wie alle anderen. Wir sind der Ansicht, dass ein so altes Land es verdient, ",
    manifestoEm: "gelesen", manifestoB: " zu werden — langsam, in aller Abgeschiedenheit, von jemandem, der ein Leben lang gelernt hat, es zu tun.",
    contrastEyebrow: "Zwei Arten, Ägypten zu sehen", contrastH2: "Dieselben Tempel. Ein anderes Land.",
    contrastP: "Ägypten lässt sich im Konvoi ertragen oder in aller Abgeschiedenheit begreifen. Die Stätten sind identisch. Fast nichts sonst ist es.",
    themLabel: "Der Konvoi", themH3: "Wie der größte Teil Ägyptens verkauft wird",
    themItems: ["Eine Kabine auf einem Schiff mit hundertfünfzig Reisenden", "Derselbe Tempel zur selben überfüllten Stunde wie ein Dutzend andere Gruppen", "Ein Führer, der Sie am Tor empfängt und beim nächsten wieder verlässt", "Ein fester Zeitplan, der dem Fahrplan gehorcht, nicht dem Licht", "Das Standardticket, die Standardroute, das Standardfoto"],
    usLabel: "Sillage", usH3: "Wie wir stattdessen reisen",
    usItems: ["Ihr eigenes Boot, Ihr eigener Wagen, Ihre eigene Route", "Das Tal der Könige bei Öffnung; Kom Ombo in der Dämmerung, menschenleer", "Ein Ägyptologe, an Ihrer Seite vom ersten bis zum letzten Tag", "Alles abgestimmt auf die Stunde, in der das Licht am schönsten und die Menge verschwunden ist", "Zugang jenseits der Standardroute — Nefertari, Sethos I., ein Liegeplatz ohne Namen"],
    whereEyebrow: "Wohin wir reisen", destH2: "Reiseziele", allDest: "Alle Reiseziele →",
    destEyebrows: { luxor: "West- und Ostufer", aswan: "Die Grenze", cairo: "Viertausend Jahre", "abu-simbel": "Der tiefe Süden" },
    howEyebrow: "Wie man reist", jourH2: "Charakteristische Reisen", allJour: "Alle Reisen →",
    pillarsEyebrow: "Warum Sillage", pillarsH2: "Vier Dinge, bei denen wir keine Kompromisse machen",
    pillars: [
      { h: "Privat, immer", p: "Niemals eine Gruppe, niemals ein Konvoi. Ihre Reise gehört Ihnen allein — das Boot, der Wagen, der Führer, die Stunden." },
      { h: "Gelesen von einem Experten", p: "Diplomierte Ägyptologen, welche die Wände lesen können, keine Führer, die ein Skript aufsagen. Der Unterschied ist die ganze Reise." },
      { h: "Zugang jenseits der Route", p: "Gräber jenseits des Standardtickets, Stätten zur Stunde ihrer Öffnung, Liegeplätze abseits der üblichen Halte. Wo eine Sondergenehmigung nötig ist, bestätigen wir sie, bevor Sie buchen." },
      { h: "Ehrlicher Rat", p: "Wir sagen Ihnen, was Ihre Zeit nicht wert ist und welche Reise nicht zu Ihnen passt. Rat, kein Verkaufsgespräch." },
    ],
    quote: "Den meisten Menschen zeigt man das Tal der Könige in einer Stunde und reist dann weiter. Gönnen Sie ihm einen Morgen, mit jemandem, der die Wände wirklich lesen kann, und ein Grab hört auf, ein Gang voller Bilder zu sein — es wird zum Ehrgeizigsten, was eine Zivilisation je unternommen hat.",
    quoteCite: "Dr. Khaled Amin — Leitender Ägyptologe",
    nameWord: "Sillage", namePron: "ßi-JASCH · Französisch",
    nameBody: "Die Spur, die ein Boot auf stillem Wasser hinterlässt — und der Hauch von etwas Feinem, der zurückbleibt, nachdem es vorübergezogen ist. Der Name, unter dem wir reisen, und der Eindruck, den eine Reise, wie wir hoffen, hinterlässt.",
    ctaEyebrow: "Beginnen Sie das Gespräch", ctaH2a: "Sehen Sie Ägypten, ", ctaH2em: "wie es sein soll", ctaP: "Nennen Sie uns Ihre Daten und was Ihnen am meisten am Herzen liegt. Ein Reisegestalter formt einen privaten Vorschlag, ganz um Sie herum gebaut — völlig unverbindlich.",
    ctaBtn: "Stellen Sie Ihre Reise zusammen", ctaNote: "Wir antworten innerhalb von 24 Stunden",
  },
};

const DICTS: Record<Locale, Dict> = { en, es, fr, nl, de };
export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}
