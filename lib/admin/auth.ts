/**
 * Admin session tokens. Runs in both the edge middleware and Node, so it uses
 * Web Crypto only.
 *
 * A session is "<expiry>.<hmac(expiry)>" in an httpOnly cookie. The signing key
 * is ADMIN_SESSION_SECRET, or — if that is unset — derived from ADMIN_PASSWORD,
 * so changing the password also signs everyone out.
 */

export const SESSION_COOKIE = "sillage_admin";
export const SESSION_HOURS = 12;

const enc = new TextEncoder();

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function signingSecret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return process.env.ADMIN_SESSION_SECRET || `session:${password}`;
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Length-independent comparison of two hex strings. */
function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

/** Check a submitted password without leaking its length or content through timing. */
export async function passwordMatches(candidate: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const [a, b] = await Promise.all([hmac("pw", candidate), hmac("pw", password)]);
  return safeEqual(a, b);
}

export async function createSession(): Promise<string> {
  const secret = signingSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD is not set");
  const expiry = String(Date.now() + SESSION_HOURS * 3600 * 1000);
  return `${expiry}.${await hmac(secret, expiry)}`;
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  const secret = signingSecret();
  if (!secret || !token) return false;
  const [expiry, sig] = token.split(".");
  if (!expiry || !sig || !/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false;
  return safeEqual(sig, await hmac(secret, expiry));
}
