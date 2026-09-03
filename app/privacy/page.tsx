export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { localeAlternates, localizedUrl } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";

interface Legal { title: string; description: string; bodyHtml: string }

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const doc = await loadContent<Legal>("legal", "privacy", locale);
  const title = doc?.title ?? "Privacy & Cookie Policy";
  const description = doc?.description;
  return {
    title,
    description,
    alternates: localeAlternates(locale, "/privacy"),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, "/privacy"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage() {
  const doc = await loadContent<Legal>("legal", "privacy", await getLocale());
  if (!doc) return null;
  return <div className="legal" dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />;
}
