import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Enquiry endpoint. Validates the submission and delivers it by email via
 * Resend. Configure RESEND_API_KEY, ENQUIRY_FROM and ENQUIRY_TO in .env.local.
 * The "from" address must be on a Resend-verified domain.
 */

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: unknown): string {
  const v = String(value ?? "").trim();
  if (!v) return "";
  return `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${esc(
    label
  )}</td><td style="padding:6px 0;color:#111827">${esc(v)}</td></tr>`;
}

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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO;
  if (!apiKey || !from || !to) {
    console.error("[enquiry] missing RESEND_API_KEY / ENQUIRY_FROM / ENQUIRY_TO");
    return NextResponse.json(
      { ok: false, error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const phone = String(body.phone ?? "").trim();
  const country = String(body.country ?? "").trim();
  const when = String(body.when ?? "").trim();
  const length = String(body.length ?? "").trim();
  const party = String(body.party ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const interests = Array.isArray(body.interests)
    ? (body.interests as unknown[]).map(String).filter(Boolean)
    : [];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#111827">
      <h2 style="margin:0 0 4px;font-size:18px">New enquiry — Sillage Égypte</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px">From the Plan Your Trip form</p>
      <table style="border-collapse:collapse;font-size:14px;width:100%">
        ${row("Name", name)}
        ${row("Email", email)}
        ${row("Phone / WhatsApp", phone)}
        ${row("Based in", country)}
        ${row("Planned date", when)}
        ${row("Length", length)}
        ${row("Travelling", party)}
        ${row("Interests", interests.join(", "))}
        ${row("Budget", budget)}
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px">In their own words</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;background:#f9fafb;padding:14px 16px;border-radius:8px;margin:0">${esc(
        message
      )}</p>
    </div>`;

  const text = [
    `New enquiry — Sillage Égypte`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone / WhatsApp: ${phone}`,
    country && `Based in: ${country}`,
    when && `Planned date: ${when}`,
    length && `Length: ${length}`,
    party && `Travelling: ${party}`,
    interests.length && `Interests: ${interests.join(", ")}`,
    budget && `Budget: ${budget}`,
    ``,
    `In their own words:`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      replyTo: email,
      subject: `New enquiry — ${name}`,
      html,
      text,
    });
    if (error) {
      console.error("[enquiry] resend error", error);
      return NextResponse.json({ ok: false, error: "Could not send your enquiry." }, { status: 502 });
    }
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return NextResponse.json({ ok: false, error: "Could not send your enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
