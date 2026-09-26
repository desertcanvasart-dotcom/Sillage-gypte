# Trust fixes: discovery

This was written before any code changed. It describes the repo at commit `f60ad19`.

## 1. Where content lives

| Kind | Location | Notes |
| --- | --- | --- |
| Structured data per entity (slug, name, prices, guide languages…) | `data/*.ts` (`site`, `tours`, `guides`, `experiences`, `destinations`, `journal`, `faq`, `reviews`) | This is English-only source data. |
| Long-form localised pages | `content/<type>/<slug>.json` (EN) and `content/<type>/<slug>.<locale>.json` | `lib/content.ts#loadContent` tries `<slug>.<locale>.json` first and falls back to the EN file. Tours, destinations, experiences, journal and legal pages each store a pre-rendered `bodyHtml` blob, built from the HTML mockups by `scripts/build-*.mjs`. Guides store only translated fields (`title`, `shortBio`, `fullBio`, `credentials`, `specialisms`). |
| UI and page copy | `lib/dictionaries.ts` (chrome, footer, homepage), `lib/guides-about-dict.ts` (about, guides index, guide profile), `lib/pages-dict.ts` (index pages, contact, plan), `lib/meta-dict.ts` (titles and descriptions for the static pages) | Every file holds one object per locale (`en`, `es`, `fr`, `nl`, `de`). |
| Locale routing | `middleware.ts` | `/es`, `/fr`, `/nl` and `/de` are rewritten to the unprefixed route with an `x-locale` header. `lib/i18n.ts#getLocale()` reads that header. The root layout is `force-dynamic`. |

There is no CMS. `content/luxor.md` and the HTML files at the repo root (and under `Destinations/`, `experiences/`, `blogs/`, `reference/`) are mockups and sources. The site does not serve them.

## 2. How metadata is generated

* `app/layout.tsx#generateMetadata` sets the site-wide defaults: title template `%s · Sillage Égypte`, the root description, **`keywords`**, canonical and alternates for `/`, and a full `openGraph` and `twitter` block. That block hard-codes `url: SITE_URL`, the homepage title and description, `/og-image.jpg`, and `og:locale` (`en_US` for EN).
* Each page's `generateMetadata` returns only `title`, `description` and `alternates` (from `lib/meta-dict.ts#localeAlternates`). A few pages also return a partial `openGraph`.
* **Why inner pages show the homepage's `og:url`, `og:title` and `og:description`:** Next.js merges metadata shallowly per top-level key. A page that doesn't return `openGraph` or `twitter` inherits the layout's objects unchanged, and those objects point at the homepage. That applies to about, contact, plan, guides, destinations, experiences, journal, tours, terms and guide profiles. Pages that do return a partial `openGraph` (tour, destination, experience and journal detail pages, and privacy) *replace* the layout object, so they lose `og:image`, `og:locale`, `og:site_name` and `og:type`. They also keep the homepage's `twitter:*`. Experience and journal pages build `og:url` without the locale prefix. Guide profile titles and descriptions are always in English.
* **Why `/about` appears to render no metadata:** Next 15.5 *streams* metadata for dynamic routes. The `<title>`, `<meta name="description">`, canonical and OG tags are emitted inside `<body>`, after the page shell, unless the user agent matches `htmlLimitedBots`. On a local build, `curl /about` has `</head>` at byte ~3.5k and `<title>` at ~11.8k. A crawler or auditor that reads only the `<head>` therefore sees no title, description or canonical on `/about`, and the same holds for **every** page, because the root layout is `force-dynamic`. This is an HTML-placement problem, not missing code: `/about` does export `generateMetadata`. There is a second, minor issue. The About and Contact titles already contain the brand, so the template doubles it ("About Sillage Égypte · Sillage Égypte").
* **hreflang:** it is output on every page today through `alternates.languages` from `localeAlternates()`, covering five locales plus `x-default` (pointing to EN). Canonicals are self-referencing per locale. Like the rest of the metadata, it is streamed into `<body>`.
* **Sitemap:** `app/sitemap.ts` lists every route × 5 locales with `xhtml:link` hreflang alternates, including `x-default`.
* `og:locale` is set per locale (EN = `en_US`). There is no `og:locale:alternate`.

## 3. Footer, contact, guides and experiences

* Footer: `components/warm/WarmFooter.tsx`, rendered once from `app/layout.tsx`. Contact values come from `data/site.ts` (`site.email`, `site.phoneDisplay`, `site.phoneHref`, `site.whatsappHref`).
* The contact page is `app/contact/page.tsx`, with copy in `lib/pages-dict.ts`. The plan page (`app/plan/page.tsx`) also lists email, phone and WhatsApp.
* Site-wide JSON-LD is `lib/structured-data.ts#organizationSchema` (a `TravelAgency`), injected in the root layout. Brand facts come from `data/site.ts#brand`.
* Guides: `data/guides.ts` (EN and shared fields such as languages), `content/guides/<slug>.<locale>.json` (translated fields), and the pages `app/guides/page.tsx` and `app/guides/[slug]/page.tsx`. The homepage quote is attributed through `lib/dictionaries.ts` → `home.quoteCite`.
* Experiences: `data/experiences.ts` (listing card data), `content/experiences/<slug>[.<locale>].json` (a full `bodyHtml` page), and the pages `app/experiences/page.tsx` and `app/experiences/[slug]/page.tsx`. Journeys reference experiences only inside their `bodyHtml`.

## 4. Search results for the requested strings (excluding `node_modules`)

| String | Occurrences |
| --- | --- |
| `luxuriousegypt` | Only in `reference/luxurious_egypt.original.html` (lines 18, 19 and 1397: the original mockup, not served). **No occurrence in anything the site renders.** Related remnants: `package.json` / `package-lock.json` `"name": "luxurious-egypt"`, and `README.md`. |
| `+20 109 847 1928` | `data/site.ts:13` (`phoneDisplay`) |
| `201098471928` | `data/site.ts:14,16` (`phoneHref`, `whatsappHref`), plus a hard-coded `wa.me/201098471928` link in all 10 legal JSON files (`content/legal/{terms,privacy}[.locale].json`) |
| "Founded by guides" / "booking desk" | `lib/guides-about-dict.ts` → `about.block1Title*` (EN line 91–93; ES, FR, NL and DE translate it as "central de reservas", "comptoir de réservation", "boekingsbalie" and "Buchungsschalter") |
| "call centre" | `lib/guides-about-dict.ts` → `about.block1Body` in all 5 locales ("centro de llamadas", "centre d'appels", "callcenter", "Callcenter") |
| "Japanese" | `data/guides.ts:45,53` (Sara Hassan's bio and languages), `content/guides/sara-hassan.{es,fr,nl,de}.json` (shortBio), `lib/structured-data.ts:55` (`contactPoint.availableLanguage`) and `knowsLanguage: "ja"`, `public/llms.txt:54`, `public/llms-full.txt:7,68`, `reference/luxurious_egypt.original.html` |

## 5. Other facts found

* `data/site.ts#brand.legalName` is `"Capital Travel Services"` (plural). The Inputs and the Terms and Privacy pages both say `Capital Travel Service`.
* `data/site.ts#brand` already asserts `foundingDate: "2010"` and founder `Islam Hussein` in JSON-LD (commit 57e947e says the owner confirmed them). Neither is in the Inputs block.
* Terms and Privacy (all 5 locales) already name **Capital Travel Service, trading as Sillage Égypte, ETAA member no. 2179** as the contracting party and data controller. They give the registered office as **Flat 6, Floor 1, Block 1, Panorama Pyramids Building, El-Ahramat St., Giza, Egypt**, which differs from the `ADDRESS` input.
