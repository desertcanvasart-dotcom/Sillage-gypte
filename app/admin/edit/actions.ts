"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";
import { isValidFile, readContent, writeContent, type SaveResult } from "@/lib/admin/store";
import { validateEdit } from "@/lib/admin/validate";

export async function saveContent(type: string, file: string, json: string, sha: string | null): Promise<SaveResult> {
  if (!(await verifySession((await cookies()).get(SESSION_COOKIE)?.value))) {
    return { ok: false, error: "Your session has expired. Sign in again in another tab, then save." };
  }
  if (!isValidFile(type, file)) return { ok: false, error: "Unknown content file." };

  const current = await readContent(type, file);
  if (!current) return { ok: false, error: "This file no longer exists." };
  // Local mode has no sha; GitHub rejects a stale sha itself, but say so before writing.
  if (current.sha && sha && current.sha !== sha) {
    return { ok: false, conflict: true, error: "This file was changed elsewhere since you opened it. Reload to get the latest version, then redo your edit." };
  }

  const checked = validateEdit(current.text, json);
  if ("error" in checked) return { ok: false, error: checked.error };
  if (checked.text === current.text) return { ok: true, sha: current.sha };

  try {
    return await writeContent(type, file, checked.text, current.sha);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed." };
  }
}
