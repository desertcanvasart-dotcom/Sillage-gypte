import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Marcellus, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";
import "./interior.css";
import "./warm.css";
import "./warm-home.css";
import "./warm-plan.css";
import "./warm-experience.css";
import "./destination-guides.css";
import "./legal.css";
import "./journal-post.css";
import "./journeys.css";
import "./experiences-detail.css";
import { organizationSchema, websiteSchema, SITE_URL } from "@/lib/structured-data";
import ScrollReveal from "@/components/ScrollReveal";
import WarmMasthead from "@/components/warm/WarmMasthead";
import WarmFooter from "@/components/warm/WarmFooter";
import { getLocale } from "@/lib/i18n";

/* Locale is resolved per request (middleware → x-locale header), so the whole
   tree renders dynamically. Output stays server-rendered HTML — fully crawlable. */
export const dynamic = "force-dynamic";

/* ─── FONTS (self-hosted via next/font — no render-blocking request) ──── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
});

/* Warm design (destination + journey detail pages) */
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-marcellus",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-jost",
});

/* ─── METADATA (SEO + social/GEO) ─────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sillage Égypte — Private Journeys Across Egypt",
    template: "%s · Sillage Égypte",
  },
  description:
    "Sillage Égypte designs private journeys for discerning international travellers who want to experience Egypt on their own terms — guided by experts, built around their interests.",
  keywords: [
    "luxury Egypt tours",
    "private Egypt travel",
    "Nile journey",
    "Egyptologist guided tours",
    "bespoke Egypt itinerary",
    "Cairo Luxor private tour",
    "White Desert expedition",
  ],
  authors: [{ name: "Sillage Égypte" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sillage Égypte",
    title: "Sillage Égypte — Private Journeys Across Egypt",
    description:
      "Private journeys designed around you, guided by experts who know every layer of this country.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sillage Égypte — private journeys across Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sillage Égypte — Private Journeys Across Egypt",
    description:
      "Private journeys designed around you, guided by experts who know every layer of this country.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${dmSans.variable} ${marcellus.variable} ${ebGaramond.variable} ${jost.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* If JavaScript is disabled, never leave reveal content hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
      </head>
      <body>
        <WarmMasthead />
        {children}
        <WarmFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
