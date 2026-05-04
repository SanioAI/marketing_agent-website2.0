import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isEmail(s: string): boolean {
  const x = s.trim();
  return x.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

const TO = "social@paladio.ai";

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
  const name    = typeof b.name    === "string" ? b.name.trim().slice(0, 120)    : "";
  const email   = typeof b.email   === "string" ? b.email.trim().slice(0, 320)   : "";
  const phone   = typeof b.phone   === "string" ? b.phone.trim().slice(0, 64)    : "";
  const company = typeof b.company === "string" ? b.company.trim().slice(0, 120) : "";

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const rows = [
    ["Name",    name    || "—"],
    ["Email",   email],
    ["Phone",   phone   || "—"],
    ["Company", company || "—"],
  ];

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const htmlBody = `
    <div style="font-family:sans-serif;font-size:14px;color:#0f172a;max-width:480px;">
      <h2 style="font-size:16px;font-weight:600;margin:0 0 16px;">New contact form submission</h2>
      <table style="border-collapse:collapse;width:100%;">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;color:#64748b;font-weight:600;white-space:nowrap;vertical-align:top;">${k}</td>
            <td style="padding:8px 0;color:#0f172a;">${v}</td>
          </tr>`).join("")}
      </table>
    </div>
  `;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from:     `"Paladio.ai Contact" <${user}>`,
        to:       TO,
        replyTo:  email,
        subject:  `New contact: ${name || email}${company ? ` · ${company}` : ""}`,
        text:     textBody,
        html:     htmlBody,
      });

      console.info("[contact] sent to", TO, { name, email, company });
    } catch (err) {
      console.error("[contact] smtp error", err);
      return NextResponse.json({ error: "Could not send. Please email us directly." }, { status: 500 });
    }
  } else {
    console.info("[contact]", { name, email, phone, company, ts: new Date().toISOString() });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
