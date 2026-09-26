# Trust and technical fixes: report (Prompt A, sillage-egypte.com)

The work is on branch **`claude/funny-pascal-by8x43`**. The brief asked for `fix/trust-and-metadata`, but this session is required to develop and push on the branch it was given. Rename or cherry-pick as you prefer. There is one commit per fix. Nothing was merged or deployed.

## Status

| Fix | Status | Summary |
| --- | --- | --- |
| 0 Discovery | **done** | `docs/trust-fixes/discovery.md` |
| 1 Legal identity | **partial** (waiting on `PHONE_DECISION` and `MOT_LICENCE`) | The operator line is in the footer on every page and locale. The operator block is on the contact page. JSON-LD has `legalName: Capital Travel Service` and ETAA `identifier: 2179`. The phone is unchanged, and so are Terms and Privacy. |
| 2 About story | **partial, not deploy-ready as the final story** (waiting on `RELATIONSHIP_LINE`) | "Founded by guides, not by a booking desk" and "a call centre an ocean away" are removed in all 5 locales. The new "Who stands behind Sillage" section states the operator fact (ETAA 2179) and, per `OPERATING_SINCE = 2003`, the paragraph on what that history means for the traveller. The relationship sentence and the "why a separate house" paragraph wait on `RELATIONSHIP_LINE`; a TODO marks them and is visible in development builds only. |
| 3 Guides | **blocked** (all 5 guide inputs are `{{…}}`) | No changes. As the brief directs, a guide whose input is empty is left alone. This covers Sara Hassan's Japanese line and the Dr. Khaled Amin homepage quote. |
| 4 Experiences | **partial** (all 6 experience inputs are `{{…}}`) | The neutral caveat is on all 6 experience pages in 5 locales. The homepage "Access beyond the route" pillar is softened. Nothing is unpublished. |
| 5 Technical metadata | **done** | Metadata now renders in `<head>` (root cause below). Every page in every locale has its own title, description, self-referencing canonical, hreflang ×5 plus x-default, and `og:url` equal to the canonical. OG and Twitter tags match the page and use its hero image. `og:locale` and `og:locale:alternate` are set. `meta keywords` is removed. The sitemap was already complete. |
| Verification | **done** | `scripts/verify-trust-fixes.mjs`. The run against a local production build is saved in `docs/trust-fixes/verify.txt`: **190/190 routes pass**. |

Build: `npm run build` passes. Type-check: `tsc --noEmit` passes. Lint: `npm run lint` **could not run**. The repo has no ESLint config, and `next lint` stops at an interactive setup prompt. No lint config was added, because that's outside this brief.

### Root causes (Fix 5)

* **"/about renders no metadata"**: this affected every page, not just `/about`. Next 15.5 *streams* metadata into `<body>` on dynamic routes for any user agent not on its HTML-limited bot list, and the root layout is `force-dynamic`. A crawler or auditor that reads `<head>` saw no title, description, canonical or hreflang. The fix is `htmlLimitedBots: /.*/` in `next.config.mjs`. The verify script now checks `<head>` only.
* **Inner pages inheriting the homepage's `og:url`, title and description**: the root layout defined a full `openGraph` and `twitter` block pointing at `/`. Next merges those keys shallowly. Pages either inherited the block whole or replaced it with a partial one that lost the image and locale, and some used unlocalised URLs. Every route now builds its metadata through one helper, `pageMetadata()` in `lib/meta-dict.ts`. The layout keeps only site-wide defaults.
* **Old brand email**: `hello@luxuriousegypt.com` appears **nowhere in what the site renders**. It exists only in `reference/luxurious_egypt.original.html`, a mockup that isn't served. If the live About page still shows it, production is running an older build than this repo. Redeploying from this branch removes it, and the verify script checks every route for `luxuriousegypt`.

## Pages changed (EN, ES, FR, NL and DE for every item)

| Page(s) | Change |
| --- | --- |
| Every page (footer) | Operator line: `Operated by Capital Travel Service · ETAA 2179 · 1 Farouk Mahmoud St, Giza, Cairo` (localised lead-in). |
| Every page (head) | Metadata moved into `<head>`; per-page OG and Twitter tags; `og:locale:alternate`; keywords removed. |
| `/` | Metadata now set by the page itself, with `home-hero` as the OG image. "Access beyond the route" pillar softened. |
| `/about` | "Who stands behind Sillage" section replaces "Founded by guides…". In "One journey at a time", "the company" now reads "Sillage". The title no longer repeats the brand. |
| `/contact` | Operator block with full address. The title no longer repeats the brand. |
| `/experiences/*` (all 6) | Neutral access caveat under the ledger. Localised `og:url`. The hero is the OG image. |
| `/guides/*` (all 5) | Title and description now localised (they were English in every locale). |
| `/tours/*`, `/destinations/*`, `/journal/*`, and the index pages `/tours`, `/destinations`, `/experiences`, `/guides`, `/journal`, `/plan`, `/privacy`, `/terms` | Full per-page OG and Twitter tags with a hero image. `og:url` is localised on journal pages. |
| Site-wide JSON-LD | `legalName` changed from "Capital Travel Services" to "Capital Travel Service". `memberOf` ETAA now carries `identifier: "2179"`. `foundingDate` corrected from 2010 to **2003** (owner-confirmed). |

## Translated strings, for native review

**Footer operator line** (`lib/dictionaries.ts` → `footer.operatedBy`, and `footer.motLicence`, which isn't shown until a licence is supplied)

| | operatedBy | motLicence |
| --- | --- | --- |
| EN | Operated by | Ministry of Tourism licence |
| ES | Operado por | Licencia del Ministerio de Turismo |
| FR | Exploité par | Licence du ministère du Tourisme |
| NL | Beheerd door | Vergunning van het Ministerie van Toerisme |
| DE | Betrieben von | Lizenz des Tourismusministeriums |

**Contact page operator block** (`app/contact/page.tsx` → `operatorLabel` / `operatorBody` / `operatorAddressLabel` / `operatorCountry`)

* EN: The operator / "Sillage Égypte is operated by Capital Travel Service, a member of the Egyptian Travel Agents Association (ETAA 2179)." / Address / Egypt
* ES: El operador / "Sillage Égypte está operada por Capital Travel Service, miembro de la Asociación Egipcia de Agentes de Viajes (ETAA 2179)." / Dirección / Egipto
* FR: L’opérateur / "Sillage Égypte est exploitée par Capital Travel Service, membre de l’Association égyptienne des agents de voyages (ETAA 2179)." / Adresse / Égypte
* NL: De exploitant / "Sillage Égypte wordt beheerd door Capital Travel Service, lid van de Egyptische Vereniging van Reisagenten (ETAA 2179)." / Adres / Egypte
* DE: Der Betreiber / "Sillage Égypte wird von Capital Travel Service betrieben, Mitglied des Ägyptischen Reisebüroverbands (ETAA 2179)." / Adresse / Ägypten

**About: "Who stands behind Sillage"** (`lib/guides-about-dict.ts` → `about.block1*`). The body is the same sentence as the contact block above.

| | Eyebrow | Title (em = *Sillage*) |
| --- | --- | --- |
| EN | The company | Who stands behind *Sillage* |
| ES | La empresa | Quién está detrás de *Sillage* |
| FR | L’entreprise | Qui est derrière *Sillage* |
| NL | Het bedrijf | Wie er achter *Sillage* staat |
| DE | Das Unternehmen | Wer hinter *Sillage* steht |

**About: "Who stands behind Sillage", paragraph 2** (`about.block1Since`, from `OPERATING_SINCE = 2003`)

* EN: Capital Travel Service has worked on the ground in Egypt since 2003. That means local contracts, and people here who are accountable when something needs putting right.
* ES: Capital Travel Service trabaja sobre el terreno en Egipto desde 2003. Eso significa contratos locales, y personas aquí que responden cuando algo necesita arreglarse.
* FR: Capital Travel Service travaille sur le terrain en Égypte depuis 2003. Cela signifie des contrats locaux, et des personnes sur place qui répondent de ce qui doit être rectifié.
* NL: Capital Travel Service werkt sinds 2003 ter plaatse in Egypte. Dat betekent lokale contracten, en mensen hier die aanspreekbaar zijn als er iets moet worden rechtgezet.
* DE: Capital Travel Service arbeitet seit 2003 vor Ort in Ägypten. Das bedeutet lokale Verträge — und Menschen hier, die dafür einstehen, wenn etwas in Ordnung gebracht werden muss.

This paragraph deliberately does not say "licensed" (`MOT_LICENCE` is still blank) or "its own guides and drivers" (the guide inputs are still blank). Add either once confirmed.

**About: "One journey at a time", first sentence**

* EN: We keep Sillage deliberately small.
* ES: Mantenemos Sillage deliberadamente pequeña.
* FR: Nous gardons Sillage délibérément petite.
* NL: Wij houden Sillage bewust klein.
* DE: Wir halten Sillage bewusst klein.

**Experience caveat** (`app/experiences/[slug]/page.tsx` → `ACCESS_NOTE`)

* EN: Subject to special permission and availability; we confirm the conditions and cost before you book.
* ES: Sujeto a permiso especial y a disponibilidad; confirmamos las condiciones y el coste antes de que reserve.
* FR: Sous réserve d’une autorisation spéciale et de disponibilité ; nous confirmons les conditions et le coût avant votre réservation.
* NL: Onder voorbehoud van speciale toestemming en beschikbaarheid; wij bevestigen de voorwaarden en de kosten voordat u boekt.
* DE: Vorbehaltlich einer Sondergenehmigung und der Verfügbarkeit; wir bestätigen die Bedingungen und die Kosten, bevor Sie buchen.

**Homepage "Access beyond the route" pillar** (`lib/dictionaries.ts` → `home.pillars[2].p`)

* EN: Tombs past the standard ticket, sites at the hour they open, moorings away from the usual stops. Where special permission is needed, we confirm it before you book.
* ES: Tumbas más allá de la entrada estándar, lugares a la hora en que abren, amarres lejos de las paradas habituales. Cuando hace falta un permiso especial, lo confirmamos antes de que reserve.
* FR: Des tombes au-delà du billet standard, des sites dès leur ouverture, des mouillages à l'écart des escales habituelles. Lorsqu'une autorisation spéciale est nécessaire, nous la confirmons avant votre réservation.
* NL: Graven voorbij het standaardticket, plekken op het uur dat ze opengaan, aanlegplaatsen buiten de gebruikelijke stops. Waar speciale toestemming nodig is, bevestigen wij die voordat u boekt.
* DE: Gräber jenseits des Standardtickets, Stätten zur Stunde ihrer Öffnung, Liegeplätze abseits der üblichen Halte. Wo eine Sondergenehmigung nötig ist, bestätigen wir sie, bevor Sie buchen.

**Page titles de-duplicated** (`lib/meta-dict.ts`; the template appends " · Sillage Égypte")

* About: About us / Quiénes somos / À propos / Over ons / Über uns
* Contact: Contact us / Contacto / Contact / Contact / Kontakt

## Inputs still `{{…}}` and what each blocked

| Input | Blocked |
| --- | --- |
| `PHONE_DECISION` | Every phone change: footer, contact, plan page, `tel:` and `wa.me` links, and JSON-LD `telephone`. `+20 109 847 1928` is still live everywhere. Note that `wa.me/201098471928` is also hard-coded in all 10 legal JSON files, so REPLACE means editing the legal pages too (a contact detail, not a legal term). |
| `MOT_LICENCE` | The licence suffix on the footer line. Set `data/site.ts#operator.motLicence` and it appears in the footer and on the contact page in every locale, using the translated label above. |
| `RELATIONSHIP_LINE` | The About section's relationship sentence (what Sillage is to Capital Travel Service) and the "why a separate house" paragraph. A dev-only TODO marks the gap. (`OPERATING_SINCE` has since been supplied: 2003.) |
| `TERMS_CONTRACTING_PARTY_IS_OPERATOR` | Any edit to Terms and Privacy. None was needed to *add* the operator, since both already name it (see below). |
| Guides × 5 | All of Fix 3: photos, credential pruning, the "Guides in" line, removals and 301s, the homepage quote attribution, Sara Hassan's "discerning Japanese travellers" line, and the `/guides` intro check. |
| Experiences × 6 | The "How this works" notes, unpublishing and 301s, and any listing-card adjustment. Every page carries the neutral caveat instead. Flagged pages: the-empty-plateau, the-empty-museum, the-temple-by-river, the-salt-lakes, tea-on-the-terrace, lunch-under-sail. |

## Unexpected findings

1. **The Terms and Privacy registered office differs from `ADDRESS`.** All 10 legal files give "Flat 6, Floor 1, Block 1, Panorama Pyramids Building, El-Ahramat St., Giza, Egypt". The footer, contact page and JSON-LD now say "1 Farouk Mahmoud St, Giza, Cairo". Both pages already name *Capital Travel Service, trading as Sillage Égypte, ETAA member no. 2179* as the contracting party and data controller. Terms and Privacy weren't changed. The owner should confirm which address is the registered office.
2. **Privacy is unfinished.** The effective date is still the placeholder `[EFFECTIVE DATE]` in all 5 locales. It names a data-protection contact, "Mostafa Salah", who appears nowhere else.
3. **Facts in JSON-LD that aren't in the Inputs** come from an earlier commit (57e947e): founder "Islam Hussein" and "IATA accredited". They were left as they were. That commit's `foundingDate: 2010` was wrong; the owner has confirmed **2003**, now used for both `foundingDate` and `OPERATING_SINCE`.
4. **"Japanese" outside the guides pages.** It appears in JSON-LD `contactPoint.availableLanguage` and `knowsLanguage: "ja"`, in `public/llms.txt` ("guides in English, Arabic, French, and Japanese"), and in `public/llms-full.txt`. All of these depend on Sara Hassan's input and weren't changed.
5. **Exclusivity claims beyond the experience pages** stay until the experience inputs arrive, per the rule for a `{{…}}` input. The `/experiences` meta description in all 5 locales says "the Giza plateau to yourselves, the Grand Egyptian Museum out of hours". The homepage lede says "with access the convoys never reach", and the homepage contrast list says "Kom Ombo at dusk, emptied". The "Certified Egyptologists" pillar and the About hero ("We are Egyptologists, historians…") depend on the guide inputs.
6. **Brand remnants:** `package.json` / `package-lock.json` `"name": "luxurious-egypt"`, the README title history, and `reference/luxurious_egypt.original.html`. None of them is served.
7. **Page-level JSON-LD** (tour, experience, guide and journal schemas) still uses the unprefixed EN URL in every locale. This is harmless, but it could be localised later.
8. **Duplicate titles:** the only one is "Contact · Sillage Égypte" on FR and NL. It's correct, since both languages use the same word.
9. **The sitemap was already complete:** 38 pages × 5 locales, with hreflang and x-default. It needed no change. Nothing was unpublished, so nothing had to be excluded. The verify script checks it against removed URLs if you pass `REMOVED_URLS`.

## Re-running the checks

```bash
npm run build && npx next start -p 3100 &
node scripts/verify-trust-fixes.mjs http://localhost:3100 > docs/trust-fixes/verify.txt
# once the inputs arrive:
PHONE_DECISION=REPLACE REMOVED_URLS="/guides/<slug>,/experiences/<slug>" node scripts/verify-trust-fixes.mjs …
```
