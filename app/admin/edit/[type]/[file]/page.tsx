import Link from "next/link";
import { notFound } from "next/navigation";
import ContentEditor from "@/components/admin/ContentEditor";
import { requireAdmin } from "@/lib/admin/session";
import { isValidFile, parseFile, publicUrl, readContent } from "@/lib/admin/store";
import { saveContent } from "../../actions";

export default async function EditContentPage({ params }: { params: Promise<{ type: string; file: string }> }) {
  await requireAdmin();
  const { type, file } = await params;
  if (!isValidFile(type, file)) notFound();
  const loaded = await readContent(type, file);
  if (!loaded) notFound();

  let data;
  try {
    data = JSON.parse(loaded.text);
  } catch {
    return (
      <main className="adm">
        <p className="adm-error">content/{type}/{file} is not valid JSON. Fix it in the repository first.</p>
      </main>
    );
  }

  const { slug, locale } = parseFile(file);
  const save = saveContent.bind(null, type, file);

  return (
    <main className="adm">
      <header className="adm-bar">
        <Link href="/admin">← All content</Link>
        <strong>
          {type} / {slug} · {locale.toUpperCase()}
        </strong>
        <a href={publicUrl(type, file)} target="_blank" rel="noreferrer">
          View page ↗
        </a>
      </header>
      <section className="adm-card">
        <ContentEditor initial={data} sha={loaded.sha} save={save} />
      </section>
    </main>
  );
}
