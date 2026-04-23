import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

function isEmail(s: string): boolean {
  const x = s.trim();
  return x.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim().slice(0, 120) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 320) : "";
  const phone = typeof b.phone === "string" ? b.phone.trim().slice(0, 64) : "";

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  /**
   * For now, we just log server-side (safe for MVP).
   * Hook this up to your CRM/email provider later (HubSpot, Slack webhook, Resend, SES, etc).
   */
  console.info("[contact]", {
    name: name || null,
    email,
    phone: phone || null,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

