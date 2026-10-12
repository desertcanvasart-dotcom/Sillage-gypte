"use client";

import { useEffect, useState, useTransition } from "react";
import type { SaveResult } from "@/lib/admin/store";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type Path = (string | number)[];

interface Props {
  initial: Json;
  sha: string | null;
  save: (json: string, sha: string | null) => Promise<SaveResult>;
}

function setAt(root: Json, path: Path, value: Json): Json {
  if (!path.length) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = root.slice();
    copy[head as number] = setAt(copy[head as number], rest, value);
    return copy;
  }
  const obj = root as Record<string, Json>;
  return { ...obj, [head]: setAt(obj[head as string], rest, value) };
}

/** An empty value of the same shape, for a new list item. */
function blank(v: Json): Json {
  if (typeof v === "string") return "";
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return v;
}

/** Where a top-level field appears, so an edit lands where it is expected. */
const HINTS: Record<string, string> = {
  seoTitle: "Browser tab and Google result title",
  description: "Google result snippet and social previews",
  title: "Page or card heading",
  tagline: "Text on the journey cards (journeys list, homepage)",
  excerpt: "Text on the journal cards",
  shortBio: "Text on the guides list",
  fullBio: "Profile biography; separate paragraphs with a blank line",
  imgVars: "Page images: CSS url(\"/images/…\") values",
  bodyHtml: "The page itself",
  faq: "Questions also published as FAQ data for Google and AI answers",
};

const label = (key: string) =>
  key === "seoTitle"
    ? "SEO title"
    : key
    .replace(/^--/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

function Field({
  name,
  value,
  path,
  onChange,
}: {
  name: string;
  value: Json;
  path: Path;
  onChange: (path: Path, value: Json) => void;
}) {
  const id = `f-${path.join("-")}`;

  if (typeof value === "string") {
    const html = name === "bodyHtml";
    const long = html || value.length > 90 || value.includes("\n");
    const readOnly = name === "slug" && path.length === 1;
    return (
      <div className="adm-field">
        <label htmlFor={id}>
          {label(name)}
          {readOnly && <span className="adm-muted"> (fixed: part of the page address)</span>}
          {html && <span className="adm-muted"> (page HTML: keep the tags and class names intact)</span>}
          {name === "seoTitle" && <Counter n={value.length} max={60} />}
          {name === "description" && path.length === 1 && <Counter n={value.length} max={160} />}
        </label>
        {path.length === 1 && HINTS[name] && <span className="adm-hint">{HINTS[name]}</span>}
        {long ? (
          <textarea
            id={id}
            className={html ? "adm-code" : undefined}
            rows={html ? 28 : Math.min(12, Math.max(3, Math.ceil(value.length / 90)))}
            value={value}
            spellCheck={!html}
            onChange={(e) => onChange(path, e.target.value)}
          />
        ) : (
          <input id={id} value={value} readOnly={readOnly} onChange={(e) => onChange(path, e.target.value)} />
        )}
      </div>
    );
  }

  if (Array.isArray(value)) {
    const template = value[0];
    return (
      <fieldset className="adm-fieldset">
        <legend>{label(name)}</legend>
        {path.length === 1 && HINTS[name] && <span className="adm-hint">{HINTS[name]}</span>}
        {value.map((item, i) => (
          <div className="adm-item" key={i}>
            <Field name={`${label(name)} ${i + 1}`} value={item} path={[...path, i]} onChange={onChange} />
            {/* The last structured item stays: it is the template for adding new ones. */}
            {(typeof item === "string" || value.length > 1) && (
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--small"
                onClick={() => onChange(path, value.filter((_, j) => j !== i))}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="adm-btn adm-btn--ghost adm-btn--small"
          onClick={() => onChange(path, [...value, template === undefined ? "" : blank(template)])}
        >
          Add item
        </button>
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    return (
      <fieldset className="adm-fieldset">
        <legend>{label(name)}</legend>
        {path.length === 1 && HINTS[name] && <span className="adm-hint">{HINTS[name]}</span>}
        {Object.entries(value).map(([k, v]) => (
          <Field key={k} name={k} value={v} path={[...path, k]} onChange={onChange} />
        ))}
      </fieldset>
    );
  }

  return (
    <p className="adm-muted">
      {label(name)}: {String(value)} (not editable here)
    </p>
  );
}

function Counter({ n, max }: { n: number; max: number }) {
  return <span className={n > max ? "adm-count adm-count--over" : "adm-count"}> {n}/{max}</span>;
}

export default function ContentEditor({ initial, sha: initialSha, save }: Props) {
  const [data, setData] = useState<Json>(initial);
  const [sha, setSha] = useState(initialSha);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const onChange = (path: Path, value: Json) => {
    setData((d) => setAt(d, path, value));
    setDirty(true);
    setStatus(null);
  };

  const onSave = () =>
    startTransition(async () => {
      const res = await save(JSON.stringify(data), sha);
      if (res.ok) {
        setSha(res.sha);
        setDirty(false);
        setStatus({ ok: true, text: "Saved." });
      } else {
        setStatus({ ok: false, text: res.error });
      }
    });

  const fields = data as Record<string, Json>;
  return (
    <form
      className="adm-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <Field key={k} name={k} value={v} path={[k]} onChange={onChange} />
      ))}
      <div className="adm-savebar">
        <button type="submit" className="adm-btn" disabled={pending || !dirty}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {dirty && !pending && <span className="adm-muted">Unsaved changes</span>}
        {status && (
          <span className={status.ok ? "adm-ok" : "adm-error"} role="status">
            {status.text}
          </span>
        )}
      </div>
    </form>
  );
}
