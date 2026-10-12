"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_HOURS, adminConfigured, createSession, passwordMatches } from "@/lib/admin/auth";

// Failed sign-ins per client, kept in memory: 5 tries per 15 minutes.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;
const fails = new Map<string, { count: number; since: number }>();

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  if (!adminConfigured()) return "The admin is not configured: set ADMIN_PASSWORD on the server.";

  const key = await clientKey();
  const now = Date.now();
  const entry = fails.get(key);
  if (entry && now - entry.since > WINDOW_MS) fails.delete(key);
  const current = fails.get(key);
  if (current && current.count >= MAX_FAILS) return "Too many attempts. Try again in 15 minutes.";

  if (!(await passwordMatches(String(form.get("password") ?? "")))) {
    fails.set(key, { count: (current?.count ?? 0) + 1, since: current?.since ?? now });
    return "Incorrect password.";
  }
  fails.delete(key);

  (await cookies()).set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_HOURS * 3600,
  });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
