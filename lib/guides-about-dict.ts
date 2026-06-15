import type { Locale } from "./i18n";

/** UI copy for the About, Guides index, and Guide detail pages. */
export interface GuidesAboutDict {
  crumbHome: string;
  about: {
    eyebrow: string;
    crumb: string;
    titlePre: string;
    titleEm: string;
    titlePost: string;
    subtitle: string;
    leadPre: string;
    leadEm: string;
    leadPost: string;
    block1Eyebrow: string;
    block1TitlePre: string;
    block1TitleEm: string;
    block1TitlePost: string;
    block1Body: string;
    block1Btn: string;
    block2Eyebrow: string;
    block2TitlePre: string;
    block2TitleEm: string;
    block2TitlePost: string;
    block2Body: string;
    block2Btn: string;
    promiseEyebrow: string;
    promiseTitlePre: string;
    promiseTitleEm: string;
    promiseTitlePost: string;
    promiseBody: string;
    ctaPre: string;
    ctaEm: string;
    ctaBody: string;
  };
  guides: {
    eyebrow: string;
    crumb: string;
    titlePre: string;
    titleEm: string;
    titlePost: string;
    subtitle: string;
    introLeadPre: string;
    introLeadEm: string;
    introLeadPost: string;
    introBody: string;
    readProfile: string;
    ctaPre: string;
    ctaEm: string;
    ctaPost: string;
    ctaBody: string;
  };
  detail: {
    eyebrow: string;
    crumb: string;
    /** "About {name}" — {name} is interpolated. */
    about: (name: string) => string;
    credentials: string;
    specialisms: string;
    travelWith: (name: string) => string;
    role: string;
    languages: string;
    bookNote: (name: string) => string;
    request: (name: string) => string;
    journeysPre: string;
    journeysEm: string;
    allJourneys: string;
    ctaPre: (name: string) => string;
    ctaEm: string;
    ctaPost: string;
    ctaBody: string;
  };
}

const en: GuidesAboutDict = {
  crumbHome: "Home",
  about: {
    eyebrow: "About us",
    crumb: "About",
    titlePre: "A small team, a ",
    titleEm: "whole",
    titlePost: " country.",
    subtitle:
      "We are Egyptologists, historians, and designers who believe Egypt is best understood slowly, privately, and in good company.",
    leadPre:
      "Most of the world sees Egypt through a window — a coach, a queue, a fixed route. We started Sillage Égypte because the country deserves ",
    leadEm: "better attention than that",
    leadPost: ", and so do the people who travel to see it.",
    block1Eyebrow: "How we began",
    block1TitlePre: "Founded by ",
    block1TitleEm: "guides,",
    block1TitlePost: " not by a booking desk",
    block1Body:
      "We came to this work from the field — from years inside the tombs and temples, leading the kind of private journeys we wished existed more widely. Sillage Égypte is the result: a company run by the people who stand beside you at the monument, not by a call centre an ocean away.",
    block1Btn: "Meet our guides",
    block2Eyebrow: "How we work",
    block2TitlePre: "One journey at a ",
    block2TitleEm: "time",
    block2TitlePost: "",
    block2Body:
      "We keep the company deliberately small. We would rather design a handful of journeys properly than process hundreds. That means real conversations, real expertise, and the time to get the details right — because in Egypt, the details are the whole point.",
    block2Btn: "See our journeys",
    promiseEyebrow: "Our promise",
    promiseTitlePre: "Private, expert, and built ",
    promiseTitleEm: "entirely",
    promiseTitlePost: " around you.",
    promiseBody:
      "No shared groups. No off-the-shelf itineraries. No guide who learned the script last week. Just a journey designed for you, by people who know this country as home.",
    ctaPre: "Let’s design ",
    ctaEm: "yours.",
    ctaBody:
      "Tell us what draws you to Egypt and we'll begin. A journey designer will reply within 24 hours.",
  },
  guides: {
    eyebrow: "The team",
    crumb: "Guides",
    titlePre: "The people who ",
    titleEm: "change",
    titlePost: " what you see.",
    subtitle:
      "A guide is the difference between a guided visit and an unlocked experience. Ours are scholars and specialists who have spent careers here.",
    introLeadPre: "We do not employ tour leaders with a script. We work with ",
    introLeadEm: "Egyptologists, historians, and desert specialists",
    introLeadPost: " — and we let you read about them before you ever travel.",
    introBody:
      "Each of our journeys is led by one of the people below. When you plan with us, you can ask for a particular guide by name.",
    readProfile: "Read profile",
    ctaPre: "Travel with the ",
    ctaEm: "right",
    ctaPost: " guide.",
    ctaBody:
      "Tell us what you're curious about and we'll match you with the specialist who fits — and design the journey around them.",
  },
  detail: {
    eyebrow: "Our team",
    crumb: "Guides",
    about: (name) => `About ${name}`,
    credentials: "Credentials",
    specialisms: "Specialisms",
    travelWith: (name) => `Travel with ${name}`,
    role: "Role",
    languages: "Languages",
    bookNote: (name) =>
      `You can request ${name} by name when you plan your journey, subject to availability for your dates.`,
    request: (name) => `Request ${name}`,
    journeysPre: "Journeys ",
    journeysEm: "leads",
    allJourneys: "All journeys",
    ctaPre: (name) => `Let ${name} `,
    ctaEm: "guide",
    ctaPost: " you.",
    ctaBody:
      "Tell us your dates and interests, and we'll design a private journey led by the right specialist for you.",
  },
};

const es: GuidesAboutDict = {
  crumbHome: "Inicio",
  about: {
    eyebrow: "Quiénes somos",
    crumb: "Nosotros",
    titlePre: "Un equipo pequeño, un país ",
    titleEm: "entero",
    titlePost: ".",
    subtitle:
      "Somos egiptólogos, historiadores y diseñadores que creen que Egipto se comprende mejor despacio, en privado y en buena compañía.",
    leadPre:
      "Casi todo el mundo ve Egipto a través de una ventanilla — un autocar, una cola, una ruta fija. Fundamos Sillage Égypte porque el país merece ",
    leadEm: "una atención mejor que esa",
    leadPost: ", y también quienes viajan para conocerlo.",
    block1Eyebrow: "Cómo empezamos",
    block1TitlePre: "Fundada por ",
    block1TitleEm: "guías,",
    block1TitlePost: " no por una central de reservas",
    block1Body:
      "Llegamos a este oficio desde el terreno — desde años dentro de las tumbas y los templos, guiando la clase de viajes privados que deseábamos que existieran más a menudo. Sillage Égypte es el resultado: una empresa dirigida por las personas que están a su lado ante el monumento, no por un centro de llamadas al otro lado del océano.",
    block1Btn: "Conozca a nuestros guías",
    block2Eyebrow: "Cómo trabajamos",
    block2TitlePre: "Un viaje a la ",
    block2TitleEm: "vez",
    block2TitlePost: "",
    block2Body:
      "Mantenemos la empresa deliberadamente pequeña. Preferimos diseñar un puñado de viajes con esmero que procesar cientos. Eso significa conversaciones reales, experiencia real y el tiempo para acertar con los detalles — porque en Egipto, los detalles lo son todo.",
    block2Btn: "Vea nuestros viajes",
    promiseEyebrow: "Nuestra promesa",
    promiseTitlePre: "Privado, experto y diseñado ",
    promiseTitleEm: "enteramente",
    promiseTitlePost: " en torno a usted.",
    promiseBody:
      "Sin grupos compartidos. Sin itinerarios prefabricados. Sin guías que aprendieron el guion la semana pasada. Solo un viaje diseñado para usted, por quienes conocen este país como su hogar.",
    ctaPre: "Diseñemos ",
    ctaEm: "el suyo.",
    ctaBody:
      "Cuéntenos qué le atrae de Egipto y comenzaremos. Un diseñador de viajes le responderá en 24 horas.",
  },
  guides: {
    eyebrow: "El equipo",
    crumb: "Guías",
    titlePre: "Las personas que ",
    titleEm: "cambian",
    titlePost: " lo que usted ve.",
    subtitle:
      "Un guía es la diferencia entre una visita guiada y una experiencia revelada. Los nuestros son académicos y especialistas que han dedicado aquí toda una carrera.",
    introLeadPre: "No empleamos jefes de grupo con un guion. Trabajamos con ",
    introLeadEm: "egiptólogos, historiadores y especialistas del desierto",
    introLeadPost: " — y dejamos que lea sobre ellos antes incluso de viajar.",
    introBody:
      "Cada uno de nuestros viajes está dirigido por una de las personas de abajo. Cuando planifique con nosotros, puede pedir a un guía concreto por su nombre.",
    readProfile: "Ver perfil",
    ctaPre: "Viaje con el ",
    ctaEm: "guía adecuado",
    ctaPost: ".",
    ctaBody:
      "Cuéntenos qué le despierta curiosidad y lo emparejaremos con el especialista que encaje — y diseñaremos el viaje en torno a él.",
  },
  detail: {
    eyebrow: "Nuestro equipo",
    crumb: "Guías",
    about: (name) => `Sobre ${name}`,
    credentials: "Credenciales",
    specialisms: "Especialidades",
    travelWith: (name) => `Viaje con ${name}`,
    role: "Función",
    languages: "Idiomas",
    bookNote: (name) =>
      `Puede solicitar a ${name} por su nombre al planificar su viaje, según disponibilidad para sus fechas.`,
    request: (name) => `Solicitar a ${name}`,
    journeysPre: "Viajes que ",
    journeysEm: "dirige",
    allJourneys: "Todos los viajes",
    ctaPre: (name) => `Deje que ${name} le `,
    ctaEm: "guíe",
    ctaPost: ".",
    ctaBody:
      "Cuéntenos sus fechas e intereses y diseñaremos un viaje privado dirigido por el especialista adecuado para usted.",
  },
};

const fr: GuidesAboutDict = {
  crumbHome: "Accueil",
  about: {
    eyebrow: "À propos",
    crumb: "À propos",
    titlePre: "Une petite équipe, un pays ",
    titleEm: "tout entier",
    titlePost: ".",
    subtitle:
      "Nous sommes des égyptologues, des historiens et des concepteurs convaincus que l'Égypte se découvre le mieux lentement, en privé et en bonne compagnie.",
    leadPre:
      "Le monde voit le plus souvent l'Égypte par une vitre — un autocar, une file d'attente, un parcours figé. Nous avons fondé Sillage Égypte parce que le pays mérite ",
    leadEm: "une attention meilleure que cela",
    leadPost: ", tout comme ceux qui voyagent pour le découvrir.",
    block1Eyebrow: "Nos débuts",
    block1TitlePre: "Fondée par des ",
    block1TitleEm: "guides,",
    block1TitlePost: " non par un comptoir de réservation",
    block1Body:
      "Nous venons à ce métier depuis le terrain — depuis des années passées dans les tombeaux et les temples, à mener le type de voyages privés que nous aurions voulu voir exister plus largement. Sillage Égypte en est le fruit : une maison animée par ceux qui se tiennent à vos côtés devant le monument, et non par un centre d'appels à l'autre bout de l'océan.",
    block1Btn: "Rencontrez nos guides",
    block2Eyebrow: "Notre façon de travailler",
    block2TitlePre: "Un voyage à la ",
    block2TitleEm: "fois",
    block2TitlePost: "",
    block2Body:
      "Nous gardons la maison délibérément petite. Nous préférons concevoir une poignée de voyages avec soin plutôt qu'en traiter des centaines. Cela suppose de vraies conversations, une véritable expertise et le temps de soigner les détails — car en Égypte, les détails sont l'essentiel.",
    block2Btn: "Découvrez nos voyages",
    promiseEyebrow: "Notre promesse",
    promiseTitlePre: "Privé, expert et conçu ",
    promiseTitleEm: "entièrement",
    promiseTitlePost: " autour de vous.",
    promiseBody:
      "Aucun groupe partagé. Aucun itinéraire tout fait. Aucun guide qui a appris son texte la semaine dernière. Seulement un voyage conçu pour vous, par ceux qui connaissent ce pays comme leur foyer.",
    ctaPre: "Concevons ",
    ctaEm: "le vôtre.",
    ctaBody:
      "Dites-nous ce qui vous attire en Égypte et nous commencerons. Un concepteur de voyages vous répondra sous 24 heures.",
  },
  guides: {
    eyebrow: "L'équipe",
    crumb: "Guides",
    titlePre: "Ceux qui ",
    titleEm: "changent",
    titlePost: " ce que vous voyez.",
    subtitle:
      "Un guide, c'est toute la différence entre une visite guidée et une expérience révélée. Les nôtres sont des érudits et des spécialistes qui ont consacré ici toute une carrière.",
    introLeadPre: "Nous n'employons pas de chefs de groupe récitant un texte. Nous travaillons avec des ",
    introLeadEm: "égyptologues, des historiens et des spécialistes du désert",
    introLeadPost: " — et nous vous laissons les découvrir avant même de partir.",
    introBody:
      "Chacun de nos voyages est mené par l'une des personnes ci-dessous. Lorsque vous planifiez avec nous, vous pouvez demander un guide en particulier par son nom.",
    readProfile: "Voir le profil",
    ctaPre: "Voyagez avec le ",
    ctaEm: "bon guide",
    ctaPost: ".",
    ctaBody:
      "Dites-nous ce qui éveille votre curiosité et nous vous associerons au spécialiste qui convient — et concevrons le voyage autour de lui.",
  },
  detail: {
    eyebrow: "Notre équipe",
    crumb: "Guides",
    about: (name) => `À propos de ${name}`,
    credentials: "Références",
    specialisms: "Spécialités",
    travelWith: (name) => `Voyagez avec ${name}`,
    role: "Rôle",
    languages: "Langues",
    bookNote: (name) =>
      `Vous pouvez demander ${name} par son nom lors de la conception de votre voyage, sous réserve de disponibilité pour vos dates.`,
    request: (name) => `Demander ${name}`,
    journeysPre: "Les voyages que ",
    journeysEm: "mène",
    allJourneys: "Tous les voyages",
    ctaPre: (name) => `Laissez ${name} vous `,
    ctaEm: "guider",
    ctaPost: ".",
    ctaBody:
      "Dites-nous vos dates et vos centres d'intérêt, et nous concevrons un voyage privé mené par le spécialiste qui vous convient.",
  },
};

const nl: GuidesAboutDict = {
  crumbHome: "Home",
  about: {
    eyebrow: "Over ons",
    crumb: "Over ons",
    titlePre: "Een klein team, een ",
    titleEm: "heel",
    titlePost: " land.",
    subtitle:
      "Wij zijn egyptologen, historici en ontwerpers die ervan overtuigd zijn dat Egypte zich het best laat begrijpen: langzaam, in alle beslotenheid en in goed gezelschap.",
    leadPre:
      "Het grootste deel van de wereld ziet Egypte door een raam — een touringcar, een wachtrij, een vaste route. Wij richtten Sillage Égypte op omdat het land ",
    leadEm: "betere aandacht verdient dan dat",
    leadPost: ", en de mensen die reizen om het te zien evenzeer.",
    block1Eyebrow: "Hoe wij begonnen",
    block1TitlePre: "Opgericht door ",
    block1TitleEm: "gidsen,",
    block1TitlePost: " niet door een boekingsbalie",
    block1Body:
      "Wij kwamen tot dit vak vanuit het veld — uit jaren binnen de graven en tempels, met het soort privéreizen dat wij vaker hadden willen zien bestaan. Sillage Égypte is het resultaat: een huis gedreven door de mensen die naast u staan bij het monument, niet door een callcenter aan de andere kant van de oceaan.",
    block1Btn: "Maak kennis met onze gidsen",
    block2Eyebrow: "Hoe wij werken",
    block2TitlePre: "Eén reis ",
    block2TitleEm: "tegelijk",
    block2TitlePost: "",
    block2Body:
      "Wij houden het huis bewust klein. Wij ontwerpen liever een handvol reizen met zorg dan er honderden te verwerken. Dat betekent echte gesprekken, echte expertise, en de tijd om de details juist te krijgen — want in Egypte zijn de details waar het om draait.",
    block2Btn: "Bekijk onze reizen",
    promiseEyebrow: "Onze belofte",
    promiseTitlePre: "Privé, deskundig en geheel ",
    promiseTitleEm: "rond",
    promiseTitlePost: " u gebouwd.",
    promiseBody:
      "Geen gedeelde groepen. Geen kant-en-klare routes. Geen gids die vorige week het script leerde. Enkel een reis ontworpen voor u, door mensen die dit land als hun thuis kennen.",
    ctaPre: "Laten wij ",
    ctaEm: "de uwe ontwerpen.",
    ctaBody:
      "Vertel ons wat u naar Egypte trekt en wij beginnen. Een reisontwerper antwoordt binnen 24 uur.",
  },
  guides: {
    eyebrow: "Het team",
    crumb: "Gidsen",
    titlePre: "De mensen die ",
    titleEm: "veranderen",
    titlePost: " wat u ziet.",
    subtitle:
      "Een gids is het verschil tussen een geleid bezoek en een ontsloten ervaring. De onze zijn geleerden en specialisten die hier een hele loopbaan hebben doorgebracht.",
    introLeadPre: "Wij werken niet met reisleiders met een script. Wij werken met ",
    introLeadEm: "egyptologen, historici en woestijnspecialisten",
    introLeadPost: " — en wij laten u over hen lezen nog voor u op reis gaat.",
    introBody:
      "Elk van onze reizen wordt geleid door een van de mensen hieronder. Wanneer u met ons plant, kunt u een bepaalde gids bij naam aanvragen.",
    readProfile: "Lees profiel",
    ctaPre: "Reis met de ",
    ctaEm: "juiste gids",
    ctaPost: ".",
    ctaBody:
      "Vertel ons waar u nieuwsgierig naar bent en wij koppelen u aan de specialist die past — en ontwerpen de reis rond hem.",
  },
  detail: {
    eyebrow: "Ons team",
    crumb: "Gidsen",
    about: (name) => `Over ${name}`,
    credentials: "Kwalificaties",
    specialisms: "Specialismen",
    travelWith: (name) => `Reis met ${name}`,
    role: "Rol",
    languages: "Talen",
    bookNote: (name) =>
      `U kunt ${name} bij naam aanvragen wanneer u uw reis samenstelt, afhankelijk van beschikbaarheid voor uw data.`,
    request: (name) => `${name} aanvragen`,
    journeysPre: "Reizen die ",
    journeysEm: "leidt",
    allJourneys: "Alle reizen",
    ctaPre: (name) => `Laat ${name} u `,
    ctaEm: "gidsen",
    ctaPost: ".",
    ctaBody:
      "Vertel ons uw data en interesses, en wij ontwerpen een privéreis geleid door de juiste specialist voor u.",
  },
};

const de: GuidesAboutDict = {
  crumbHome: "Start",
  about: {
    eyebrow: "Über uns",
    crumb: "Über uns",
    titlePre: "Ein kleines Team, ein ",
    titleEm: "ganzes",
    titlePost: " Land.",
    subtitle:
      "Wir sind Ägyptologen, Historiker und Gestalter, die überzeugt sind, dass sich Ägypten am besten langsam, in aller Abgeschiedenheit und in guter Gesellschaft begreifen lässt.",
    leadPre:
      "Der größte Teil der Welt sieht Ägypten durch ein Fenster — einen Reisebus, eine Warteschlange, eine feste Route. Wir gründeten Sillage Égypte, weil das Land ",
    leadEm: "eine bessere Aufmerksamkeit verdient als diese",
    leadPost: ", und die Menschen, die reisen, um es zu sehen, ebenso.",
    block1Eyebrow: "Wie wir begannen",
    block1TitlePre: "Gegründet von ",
    block1TitleEm: "Reiseführern,",
    block1TitlePost: " nicht von einem Buchungsschalter",
    block1Body:
      "Wir kamen aus dem Feld zu dieser Arbeit — aus Jahren in den Gräbern und Tempeln, in denen wir genau die privaten Reisen führten, die wir uns weiter verbreitet gewünscht hätten. Sillage Égypte ist das Ergebnis: ein Haus, geführt von den Menschen, die am Denkmal an Ihrer Seite stehen, nicht von einem Callcenter jenseits des Ozeans.",
    block1Btn: "Lernen Sie unsere Reiseführer kennen",
    block2Eyebrow: "Wie wir arbeiten",
    block2TitlePre: "Eine Reise nach der ",
    block2TitleEm: "anderen",
    block2TitlePost: "",
    block2Body:
      "Wir halten das Haus bewusst klein. Wir gestalten lieber eine Handvoll Reisen mit Sorgfalt, als Hunderte abzuwickeln. Das bedeutet echte Gespräche, echte Sachkenntnis und die Zeit, die Details richtig zu treffen — denn in Ägypten sind die Details das Entscheidende.",
    block2Btn: "Sehen Sie unsere Reisen",
    promiseEyebrow: "Unser Versprechen",
    promiseTitlePre: "Privat, fachkundig und ganz ",
    promiseTitleEm: "um Sie herum",
    promiseTitlePost: " gebaut.",
    promiseBody:
      "Keine geteilten Gruppen. Keine Reisen von der Stange. Kein Reiseführer, der das Skript letzte Woche gelernt hat. Nur eine Reise, für Sie gestaltet, von Menschen, die dieses Land als ihre Heimat kennen.",
    ctaPre: "Lassen Sie uns ",
    ctaEm: "die Ihre gestalten.",
    ctaBody:
      "Sagen Sie uns, was Sie an Ägypten reizt, und wir beginnen. Ein Reisegestalter antwortet innerhalb von 24 Stunden.",
  },
  guides: {
    eyebrow: "Das Team",
    crumb: "Reiseführer",
    titlePre: "Die Menschen, die ",
    titleEm: "verändern,",
    titlePost: " was Sie sehen.",
    subtitle:
      "Ein Reiseführer ist der Unterschied zwischen einem geführten Besuch und einem erschlossenen Erlebnis. Die unseren sind Gelehrte und Spezialisten, die hier eine ganze Laufbahn verbracht haben.",
    introLeadPre: "Wir beschäftigen keine Reiseleiter mit einem Skript. Wir arbeiten mit ",
    introLeadEm: "Ägyptologen, Historikern und Wüstenspezialisten",
    introLeadPost: " — und wir lassen Sie über sie lesen, noch bevor Sie überhaupt reisen.",
    introBody:
      "Jede unserer Reisen wird von einer der Personen unten geführt. Wenn Sie mit uns planen, können Sie einen bestimmten Reiseführer namentlich anfragen.",
    readProfile: "Profil lesen",
    ctaPre: "Reisen Sie mit dem ",
    ctaEm: "richtigen",
    ctaPost: " Reiseführer.",
    ctaBody:
      "Sagen Sie uns, was Sie neugierig macht, und wir bringen Sie mit dem passenden Spezialisten zusammen — und gestalten die Reise um ihn herum.",
  },
  detail: {
    eyebrow: "Unser Team",
    crumb: "Reiseführer",
    about: (name) => `Über ${name}`,
    credentials: "Qualifikationen",
    specialisms: "Fachgebiete",
    travelWith: (name) => `Reisen Sie mit ${name}`,
    role: "Rolle",
    languages: "Sprachen",
    bookNote: (name) =>
      `Sie können ${name} namentlich anfragen, wenn Sie Ihre Reise zusammenstellen, vorbehaltlich der Verfügbarkeit für Ihre Daten.`,
    request: (name) => `${name} anfragen`,
    journeysPre: "Reisen, die ",
    journeysEm: "leitet",
    allJourneys: "Alle Reisen",
    ctaPre: (name) => `Lassen Sie ${name} Sie `,
    ctaEm: "führen",
    ctaPost: ".",
    ctaBody:
      "Sagen Sie uns Ihre Daten und Interessen, und wir gestalten eine private Reise, geleitet von dem richtigen Spezialisten für Sie.",
  },
};

const DICTS: Record<Locale, GuidesAboutDict> = { en, es, fr, nl, de };
export function getGuidesAboutDict(locale: Locale): GuidesAboutDict {
  return DICTS[locale];
}
