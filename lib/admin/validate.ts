/**
 * The admin edits text, not structure: an edited file must keep the original's
 * keys and value types (lists may grow or shrink), and the slug is fixed. Pages
 * read these fields by name, so a renamed or retyped key would break a page.
 */

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

const kind = (v: unknown) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);

function sameShape(original: Json, edited: unknown, at: string): string | null {
  const k = kind(original);
  if (kind(edited) !== k) return `"${at}" must stay a ${k}.`;
  if (k === "array") {
    const items = original as Json[];
    if (!items.length) return null;
    for (const [i, item] of (edited as unknown[]).entries()) {
      const err = sameShape(items[0], item, `${at}[${i}]`);
      if (err) return err;
    }
    return null;
  }
  if (k === "object") {
    const a = original as Record<string, Json>;
    const b = edited as Record<string, unknown>;
    const keysA = Object.keys(a).sort().join("|");
    if (keysA !== Object.keys(b).sort().join("|")) return `Fields of ${at ? `"${at}"` : "the file"} cannot be added, removed or renamed.`;
    for (const key of Object.keys(a)) {
      const err = sameShape(a[key], b[key], at ? `${at}.${key}` : key);
      if (err) return err;
    }
  }
  return null;
}

/** Returns the formatted file text, or an error message. */
export function validateEdit(originalText: string, editedText: string): { text: string } | { error: string } {
  let original: Json;
  let edited: unknown;
  try {
    original = JSON.parse(originalText);
  } catch {
    return { error: "The stored file is not valid JSON; fix it in the repository first." };
  }
  try {
    edited = JSON.parse(editedText);
  } catch {
    return { error: "The edited content is not valid JSON." };
  }
  const err = sameShape(original, edited, "");
  if (err) return { error: err };
  const o = original as Record<string, Json>;
  if ("slug" in o && (edited as Record<string, unknown>).slug !== o.slug) {
    return { error: "The slug is part of the page address and cannot be changed here." };
  }
  // Keep the repository's formatting: 2-space indent, and the original's trailing newline.
  const trailing = originalText.endsWith("\n") ? "\n" : "";
  return { text: JSON.stringify(edited, null, 2) + trailing };
}
