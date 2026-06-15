export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { loadContent } from "@/lib/content";

interface Legal { title: string; description: string; bodyHtml: string }

export async function generateMetadata(): Promise<Metadata> {
  const doc = await loadContent<Legal>("legal", "privacy", await getLocale());
  return {
    title: doc?.title ?? "Privacy & Cookie Policy",
    description: doc?.description,
    alternates: { canonical: "/privacy" },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage() {
  const doc = await loadContent<Legal>("legal", "privacy", await getLocale());
  if (!doc) return null;
  return <div className="legal" dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />;
}
