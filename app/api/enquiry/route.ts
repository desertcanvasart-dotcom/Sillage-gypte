import { NextResponse } from "next/server";

/**
 * Enquiry endpoint. Currently validates and acknowledges the submission.
 * TODO (post-dashboard): persist to the database and/or send via an email
 * service (Resend, Postmark) and a CRM webhook. No secrets are wired yet.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  const valid = name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message;
  if (!valid) {
    return NextResponse.json(
      { ok: false, error: "Please provide a name, a valid email, and a message." },
      { status: 422 }
    );
  }

  // Placeholder for delivery. Visible in the server logs during development.
  console.info("[enquiry] received", { name, email });

  return NextResponse.json({ ok: true });
}
