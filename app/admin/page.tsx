import Link from "next/link";
import { requireAdmin } from "@/lib/admin/session";
import { CONTENT_TYPES, LOCALE_SUFFIXES, listFiles, parseFile, storageMode } from "@/lib/admin/store";
import { guides } from "@/data/guides";
import { logout } from "./actions";

const LABELS: Record<(typeof CONTENT_TYPES)[number], string> = {
  tours: "Journeys",
  destinations: "Destinations",
  experiences: "Experiences",
  journal: "Journal",
  guides: "Guides (translations)",
  legal: "Legal pages",
};

export default async function AdminHome() {
  await requireAdmin();
  const files = await listFiles();
  const storage = storageMode();
  const published = new Set(guides.map((g) => g.slug));

  return (
    <main className="adm">
      <header className="adm-bar">
        <strong>Sillage Égypte admin</strong>
        <span className="adm-mode">
          {storage.mode === "github"
            ? `Saves commit to ${storage.repo} (${storage.branch}); the site redeploys automatically.`
            : "Local mode: saves write to this server's disk only. Commit them to keep them."}
        </span>
        <form action={logout}>
          <button className="adm-btn adm-btn--ghost">Sign out</button>
        </form>
      </header>

      {CONTENT_TYPES.map((type) => {
        // Group "cairo.json", "cairo.es.json", … under one row per page.
        const bySlug = new Map<string, Map<string, string>>();
        for (const f of files[type]) {
          const { slug, locale } = parseFile(f);
          if (!bySlug.has(slug)) bySlug.set(slug, new Map());
          bySlug.get(slug)!.set(locale, f);
        }
        return (
          <section key={type} className="adm-card">
            <h2>{LABELS[type]}</h2>
            {type === "guides" && (
              <p className="adm-note">English guide profiles live in data/guides.ts and are not editable here.</p>
            )}
            <table className="adm-table">
              <tbody>
                {[...bySlug.entries()].map(([slug, locales]) => (
                  <tr key={slug}>
                    <th scope="row">
                      {slug}
                      {type === "guides" && !published.has(slug) && <span className="adm-tag">hidden</span>}
                    </th>
                    {LOCALE_SUFFIXES.map((l) => {
                      const locale = l || "en";
                      const file = locales.get(locale);
                      return (
                        <td key={locale}>
                          {file ? (
                            <Link href={`/admin/edit/${type}/${file}`}>{locale.toUpperCase()}</Link>
                          ) : (
                            <span className="adm-muted">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </main>
  );
}
