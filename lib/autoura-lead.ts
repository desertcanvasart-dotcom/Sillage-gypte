/**
 * Send a website enquiry into Autoura as a lead (2026-11-13).
 *
 * The enquiry form emails hello@sillage-egypte.com (app/api/enquiry); that
 * mailbox is synced into Autoura, but only as an email. Each enquiry is now
 * also POSTed, signed, to Autoura's /api/webhooks/website-lead, which files it
 * as a lead in the Sillage company (brand "sillage") — once per `reference`,
 * so a retry never files it twice.
 *
 * Signing mirrors Autoura's verifier (lib/concierge-webhook-auth.ts):
 * HMAC-SHA256 over `${t}.${rawBody}`, header `X-Autoura-Signature:
 * t=<unix>,v1=<hex>`. Sign the EXACT bytes sent.
 *
 * Contract: NEVER throws. Missing URL or secret → 'skipped', no POST. Up to 3
 * sends (1s, 3s apart) on a network error or 5xx; a 4xx is final.
 */
import { createHmac, randomBytes, randomUUID } from "node:crypto";

export type LeadStatus = "sent" | "failed" | "skipped";
export interface LeadResult {
  status: LeadStatus;
  attempts: number;
  httpStatus: number | null;
  response: unknown;
}

/** A reference Autoura files the enquiry under: SIL- + 6 unambiguous characters. */
export function enquiryReference(bytes: Uint8Array = randomBytes(6)): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (const b of Array.from(bytes.slice(0, 6))) out += alphabet[b % 32];
  return `SIL-${out}`;
}

const s = (v: unknown) => String(v ?? "").trim();
const firstInt = (v: unknown): number | null => {
  const m = s(v).match(/\d+/);
  const n = m ? Number(m[0]) : NaN;
  return Number.isInteger(n) && n > 0 && n < 100 ? n : null;
};

/** The form body (both forms) → the body Autoura's validateExternalEnquiry reads. */
export function toAutouraLead(reference: string, body: Record<string, unknown>, pageUrl: string | null) {
  const exactDate = s(body.exactDate);
  const interests = Array.isArray(body.interests) ? (body.interests as unknown[]).map(s).filter(Boolean) : [];
  // Answers Autoura has no field for go into the note, one per line.
  const extra: Array<[string, string]> = [
    ["Planned date", s(body.when)],
    ["Dates", s(body.dates)],
    ["Travelling", s(body.party)],
    ["Group size", s(body.groupSize)],
    ["Based in", s(body.country)],
  ];
  const lines = extra.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  const message = s(body.message);
  return {
    brand: "sillage",
    reference,
    kind: "trip",
    name: s(body.name) || null,
    email: s(body.email),
    whatsapp: s(body.phone) || null,
    locale: s(body.locale) || null,
    start_date: /^\d{4}-\d{2}-\d{2}$/.test(exactDate) ? exactDate : null,
    days: s(body.length) || null,
    adults: firstInt(body.groupSize) ?? firstInt(body.party),
    budget: s(body.budget) || null,
    journey: s(body.journey) || null,
    style_answer: interests.length ? interests : null,
    notes: [message, lines.join("\n")].filter(Boolean).join("\n\n") || null,
    page_url: pageUrl,
  };
}

export interface SendDeps {
  url: string | null;
  secret: string | null;
  post: (url: string, headers: Record<string, string>, body: string) => Promise<{ httpStatus: number | null; response: unknown }>;
  sleep: (ms: number) => Promise<void>;
  nowSeconds: () => number;
  requestId: () => string;
}

export function signedHeaders(secret: string, rawBody: string, nowSeconds: number, requestId: string): Record<string, string> {
  const v1 = createHmac("sha256", secret).update(`${nowSeconds}.${rawBody}`).digest("hex");
  return {
    "Content-Type": "application/json",
    "X-Autoura-Signature": `t=${nowSeconds},v1=${v1}`,
    "X-Autoura-Timestamp": String(nowSeconds),
    "X-Request-Id": requestId,
  };
}

async function defaultPost(url: string, headers: Record<string, string>, body: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, { method: "POST", headers, body, signal: controller.signal });
    let response: unknown = null;
    try {
      response = await res.json();
    } catch {
      response = null;
    }
    return { httpStatus: res.status, response };
  } catch (err) {
    return { httpStatus: null, response: { error: (err as Error).message } };
  } finally {
    clearTimeout(timer);
  }
}

export function defaultSendDeps(): SendDeps {
  return {
    url: process.env.AUTOURA_LEAD_WEBHOOK_URL?.trim() || null,
    secret: process.env.AUTOURA_WEBHOOK_SECRET?.trim() || null,
    post: defaultPost,
    sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
    nowSeconds: () => Math.floor(Date.now() / 1000),
    requestId: () => randomUUID(),
  };
}

const BACKOFF_MS = [1000, 3000];

/** POST one enquiry to Autoura. Never throws. */
export async function sendLeadToAutoura(payload: object, deps: SendDeps = defaultSendDeps()): Promise<LeadResult> {
  if (!deps.url || !deps.secret) return { status: "skipped", attempts: 0, httpStatus: null, response: null };
  const rawBody = JSON.stringify(payload);
  let last: { httpStatus: number | null; response: unknown } = { httpStatus: null, response: null };
  for (let attempt = 1; attempt <= BACKOFF_MS.length + 1; attempt++) {
    try {
      last = await deps.post(deps.url, signedHeaders(deps.secret, rawBody, deps.nowSeconds(), deps.requestId()), rawBody);
    } catch (err) {
      last = { httpStatus: null, response: { error: (err as Error).message } };
    }
    if (last.httpStatus !== null && last.httpStatus >= 200 && last.httpStatus < 300) return { status: "sent", attempts: attempt, ...last };
    if (last.httpStatus !== null && last.httpStatus >= 400 && last.httpStatus < 500) return { status: "failed", attempts: attempt, ...last };
    if (attempt <= BACKOFF_MS.length) await deps.sleep(BACKOFF_MS[attempt - 1]);
  }
  return { status: "failed", attempts: BACKOFF_MS.length + 1, ...last };
}
