export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta-dict";
import { loadContent } from "@/lib/content";

interface Legal { title: string; description: string; bodyHtml: string }

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const doc = await loadContent<Legal>("legal", "terms", locale);
  return {
    ...pageMetadata({
      locale,
      path: "/terms",
      title: doc?.title ?? "Terms & Conditions",
      description: doc?.description,
    }),
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage() {
  const doc = await loadContent<Legal>("legal", "terms", await getLocale());
  if (!doc) return null;
  return <div className="legal" dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />;
}
