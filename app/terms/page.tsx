export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { loadContent } from "@/lib/content";

interface Legal { title: string; description: string; bodyHtml: string }

export async function generateMetadata(): Promise<Metadata> {
  const doc = await loadContent<Legal>("legal", "terms", await getLocale());
  return {
    title: doc?.title ?? "Terms & Conditions",
    description: doc?.description,
    alternates: { canonical: "/terms" },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage() {
  const doc = await loadContent<Legal>("legal", "terms", await getLocale());
  if (!doc) return null;
  return <div className="legal" dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />;
}
