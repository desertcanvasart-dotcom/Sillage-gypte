import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Where the admin reads and saves content/<type>/<file>.json.
 *
 * - GitHub mode (ADMIN_GITHUB_TOKEN + ADMIN_GITHUB_REPO set): every save is a
 *   commit to the branch the site deploys from, so edits survive redeploys
 *   (the host's disk is rebuilt from git on each deploy). The file is also
 *   written to local disk so the change shows at once, until the redeploy.
 * - Local mode (no token): saves write straight to disk. For `npm run dev`;
 *   commit the result yourself.
 */

export const CONTENT_TYPES = ["tours", "destinations", "experiences", "journal", "guides", "legal"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const LOCALE_SUFFIXES = ["", "es", "fr", "nl", "de"] as const;

const FILE_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.(?:es|fr|nl|de))?\.json$/;

export function isContentType(t: string): t is ContentType {
  return (CONTENT_TYPES as readonly string[]).includes(t);
}

/** Only plain content files in a known folder: no paths, no traversal. */
export function isValidFile(type: string, file: string): type is ContentType {
  return isContentType(type) && FILE_RE.test(file);
}

/** "cairo.es.json" → { slug: "cairo", locale: "es" }; base files are "en". */
export function parseFile(file: string): { slug: string; locale: string } {
  const m = file.match(/^(.+?)(?:\.(es|fr|nl|de))?\.json$/);
  return { slug: m?.[1] ?? file, locale: m?.[2] ?? "en" };
}

function github() {
  const token = process.env.ADMIN_GITHUB_TOKEN;
  const repo = process.env.ADMIN_GITHUB_REPO;
  if (!token || !repo) return null;
  return {
    token,
    repo,
    branch: process.env.ADMIN_GITHUB_BRANCH || "main",
    api: (process.env.ADMIN_GITHUB_API_URL || "https://api.github.com").replace(/\/$/, ""),
  };
}

export function storageMode(): { mode: "github"; repo: string; branch: string } | { mode: "local" } {
  const gh = github();
  return gh ? { mode: "github", repo: gh.repo, branch: gh.branch } : { mode: "local" };
}

const localPath = (type: ContentType, file: string) => path.join(process.cwd(), "content", type, file);

/** Content files per type, from the deployed copy (the list changes only with code). */
export async function listFiles(): Promise<Record<ContentType, string[]>> {
  const out = {} as Record<ContentType, string[]>;
  for (const type of CONTENT_TYPES) {
    try {
      out[type] = (await readdir(path.join(process.cwd(), "content", type))).filter((f) => FILE_RE.test(f)).sort();
    } catch {
      out[type] = [];
    }
  }
  return out;
}

export interface LoadedFile {
  text: string;
  /** GitHub blob sha the edit is based on; detects someone else's save in between. */
  sha: string | null;
}

async function ghFetch(url: string, init: RequestInit = {}) {
  const gh = github()!;
  return fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${gh.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
  });
}

const ghUrl = (type: ContentType, file: string) => {
  const gh = github()!;
  return `${gh.api}/repos/${gh.repo}/contents/content/${type}/${file}`;
};

export async function readContent(type: ContentType, file: string): Promise<LoadedFile | null> {
  const gh = github();
  if (gh) {
    const res = await ghFetch(`${ghUrl(type, file)}?ref=${encodeURIComponent(gh.branch)}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
    const body = (await res.json()) as { content: string; sha: string };
    return { text: Buffer.from(body.content, "base64").toString("utf8"), sha: body.sha };
  }
  try {
    return { text: await readFile(localPath(type, file), "utf8"), sha: null };
  } catch {
    return null;
  }
}

export type SaveResult = { ok: true; sha: string | null } | { ok: false; error: string; conflict?: boolean };

export async function writeContent(
  type: ContentType,
  file: string,
  text: string,
  baseSha: string | null
): Promise<SaveResult> {
  const gh = github();
  if (gh) {
    const res = await ghFetch(ghUrl(type, file), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Admin: update content/${type}/${file}`,
        content: Buffer.from(text, "utf8").toString("base64"),
        branch: gh.branch,
        ...(baseSha ? { sha: baseSha } : {}),
      }),
    });
    if (res.status === 409 || res.status === 422) {
      return { ok: false, conflict: true, error: "This file was changed elsewhere since you opened it. Reload to get the latest version, then redo your edit." };
    }
    if (!res.ok) return { ok: false, error: `GitHub save failed (${res.status}). Check ADMIN_GITHUB_TOKEN has contents write access.` };
    const body = (await res.json()) as { content?: { sha?: string } };
    // Show the edit straight away; the redeploy will bring the same file from git.
    await writeFile(localPath(type, file), text, "utf8").catch(() => {});
    return { ok: true, sha: body.content?.sha ?? null };
  }
  await writeFile(localPath(type, file), text, "utf8");
  return { ok: true, sha: null };
}

/** The public page a content file renders on. */
export function publicUrl(type: ContentType, file: string): string {
  const { slug, locale } = parseFile(file);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const route = type === "legal" ? `/${slug}` : `/${type}/${slug}`;
  return `${prefix}${route}`;
}
