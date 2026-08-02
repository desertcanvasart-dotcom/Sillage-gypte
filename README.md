# Sillage Égypte

Premium private-travel website. The homepage from the original HTML mockup,
converted **1:1** into a Next.js (App Router) + React + TypeScript application
so it can be hosted, expanded, and ranked.

## Why Next.js (and the SEO/crawlability fix)

The original was a single static HTML file. Crawlers usually fail on sites where
the content is painted by client-side JavaScript — they receive an empty shell.
This project avoids that:

- **All page content is rendered on the server** (React Server Components). The
  raw HTML response already contains every headline, tour, guide bio, and review
  — verified. Google and AI answer engines (AI Overviews, Perplexity, ChatGPT
  search) see real text, not an empty `<div>`.
- **Structured data** (`TravelAgency` + `FAQPage` JSON-LD) is embedded
  server-side for rich results and GEO citation — see `lib/structured-data.ts`.
- **`robots.txt` and `sitemap.xml`** are generated automatically
  (`app/robots.ts`, `app/sitemap.ts`).
- **Per-page metadata** (title, description, Open Graph, Twitter card, canonical)
  via the Next.js Metadata API — see `app/layout.tsx`.
- **Self-hosted fonts** via `next/font` (no render-blocking Google Fonts request,
  no layout shift).

Only the interactive bits are client-side (`"use client"`): the navigation
scroll state, the scroll-reveal animations, and the design-token panel. They do
not affect the crawlable content.

## Getting started

```bash
npm install      # already done
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Pages (all built)

| Route | Type | Notes |
| --- | --- | --- |
| `/` | Static | Homepage (unchanged design) |
| `/tours` · `/tours/[slug]` | Static · SSG | Journey index + detail template (itinerary, gallery, guide, related) |
| `/destinations` · `/destinations/[slug]` | Static · SSG | SEO-critical place pages |
| `/experiences` · `/experiences/[slug]` | Static · SSG | Single signature moments |
| `/guides` · `/guides/[slug]` | Static · SSG | Expert profiles |
| `/journal` · `/journal/[slug]` | Static · SSG | Editorial / GEO engine |
| `/about` · `/contact` | Static | Brand + contact |
| `/plan` | Dynamic | Enquiry form; reads `?journey=<slug>` to preselect |
| `/privacy` · `/terms` | Static | Legal templates — review with counsel |
| `/api/enquiry` | Dynamic | POST endpoint; validates only (no email wired yet) |

All content is **data-driven** from `data/*.ts` (`site`, `tours`, `guides`,
`experiences`, `destinations`, `journal`). The future dashboard edits these files.
Place gradients are class-based: `.media-grad--{nile,desert,ancient,oasis,sunset,night}`.

## Project structure

```
app/
  layout.tsx          Fonts, global metadata, JSON-LD structured data
  page.tsx            Homepage — assembles the section components
  globals.css         All styles (verbatim port; fonts wired to next/font)
  robots.ts           robots.txt
  sitemap.ts          sitemap.xml  (add new routes here as pages are built)
components/
  Navigation.tsx      Client — scroll state + mobile toggle
  Hero.tsx            Server
  TrustStrip.tsx      Server
  ToursSection.tsx    Server — tour data lives in the TOURS array
  WhySection.tsx      Server
  GuidesSection.tsx   Server — guide data in the GUIDES array
  ReviewsSection.tsx  Server — review data in the REVIEWS array
  FinalCta.tsx        Server
  Footer.tsx          Server
  ScrollReveal.tsx    Client — IntersectionObserver for .reveal elements
  SpecPanel.tsx       Client — design-token reference (REMOVE before launch)
  icons.tsx           Shared inline SVG icons
lib/
  structured-data.ts  JSON-LD + SITE_URL constant
reference/
  luxurious_egypt.original.html   The original mockup, untouched
```

## Notes & next steps

- **`SpecPanel`** is a design-reference overlay carried over from the mockup.
  Delete `components/SpecPanel.tsx` and its two lines in `app/page.tsx` before
  going live.
- Update **`SITE_URL`** in `lib/structured-data.ts` once the real domain is set.
- The hero "video" and tour/why images are CSS gradient placeholders, matching
  the original. Swap in real photography/video when ready (use `next/image` and
  a `<video>` element for best performance + SEO).
- Future pages (`/tours`, `/about`, `/guides`, `/journal`, `/plan`) are linked
  and listed in the sitemap — add `app/tours/page.tsx` etc. to build them.

## AI readability (structured data, llms.txt, crawlers)

Implemented against the AI-Readable Website brief:

- **Structured data graph** (`lib/structured-data.ts`): `TravelAgency` + `WebSite`
  in the root layout, linked by `@id`. Every page type adds its schema and
  references the org by `@id` (`provider`/`publisher`/`worksFor`/`isPartOf`):
  `TouristTrip` (+offers, itinerary attractions), `TouristDestination`,
  `TouristAttraction` (experiences), `Person` (guides), `Article` (journal),
  `FAQPage`, `AggregateRating` + `Review`, and `BreadcrumbList` on every
  interior page (via `PageHero`).
- **Schema matches visible content**: the FAQ (`data/faq.ts`) drives both the
  visible homepage FAQ section and the `FAQPage` schema; reviews
  (`data/reviews.ts`) drive both the reviews section and the `Review` schema.
- **`/llms.txt` + `/llms-full.txt`** (`public/`): curated, editorial summaries
  for AI systems — not auto-generated. Update them when the offering changes.
- **`robots.txt`** (`app/robots.ts`): explicitly allows major AI crawlers
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot…), blocks bulk
  scrapers, and keeps `/api` private.
- **Semantics & a11y**: `<time datetime>`, `<address>`, `<figure>/<figcaption>`,
  one `<h1>` per page, and a `prefers-reduced-motion` block that disables
  animation and never leaves reveal content hidden.

### Brand information to gather (replace placeholders)

`data/site.ts` → `brand` and `data/reviews.ts` contain **PLACEHOLDER** values.
Replace these with verified facts before launch — schema must match reality:

1. Social URLs (currently `@luxuriousegypt` handles) → confirm the real
   handles and update `site.social`. Domain and email are done
   (`sillage-egypte.com` / `hello@sillage-egypte.com`).
2. Founding date and founder name(s)/titles.
3. Registered office postal address.
4. Industry accreditations / memberships.
5. Real aggregate rating + review count (and ideally real reviews).
6. Awards / press mentions to surface (add to About + org schema `award`).
7. Phone number (currently a placeholder).

### Manual verification before launch (can't be run headless here)

- Google **Rich Results Test** + **Schema Markup Validator** on one URL per page type.
- **PageSpeed Insights** / Lighthouse — target 90+ in all four categories (Core Web Vitals).
- **Axe DevTools** accessibility audit (WCAG AA); screen-reader pass (VoiceOver/NVDA).
- **Facebook Sharing Debugger** + **Twitter Card Validator** for OG previews
  (replace `public/og-image.jpg` — referenced but not yet added).
- Paste a few URLs into ChatGPT/Claude and confirm accurate summaries.

**Layer 9 (multilingual)** is not implemented — the site is English-only. If you
add languages later: hreflang alternates, localized URLs, translated schema
values, and per-language sitemap entries.

## Hosting

Deploys cleanly to **Vercel** (zero config), Netlify, Cloudflare Pages, or any
Node host. For Vercel: push to a Git repo and import — it detects Next.js
automatically.
