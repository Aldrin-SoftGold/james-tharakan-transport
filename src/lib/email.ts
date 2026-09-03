import { company } from "@/data/company";

type Payload = {
  subject: string;
  lines: Array<[string, string]>;
};

function formatBody(payload: Payload) {
  return payload.lines.map(([k, v]) => `${k}: ${v}`).join("\n");
}

export async function deliverEmail(payload: Payload) {
  const to = process.env.QUOTE_TO_EMAIL || company.email;
  const text = formatBody(payload);

  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || to,
      to,
      subject: payload.subject,
      text,
    });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.SMTP_FROM || "James Tharakan Transport <noreply@resend.dev>",
        to: [to],
        subject: payload.subject,
        text,
      }),
    });
    if (!res.ok) throw new Error("Resend failed");
    return;
  }

  try {
    const formRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: payload.subject,
        ...Object.fromEntries(payload.lines),
      }),
    });
    if (formRes.ok) return;
  } catch {
    // fall through to local archive
  }

  await archiveEnquiry(payload);
}

async function archiveEnquiry(payload: Payload) {
  const { mkdir, appendFile } = await import("fs/promises");
  const { join } = await import("path");
  const dir = join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const record = {
    receivedAt: new Date().toISOString(),
    subject: payload.subject,
    fields: Object.fromEntries(payload.lines),
  };
  await appendFile(join(dir, "enquiries.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
}

const hits = new Map<string, number[]>();

export function rateLimit(ip: string, limit = 6, windowMs = 60_000) {
  const now = Date.now();
  const prev = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (prev.length >= limit) return false;
  prev.push(now);
  hits.set(ip, prev);
  return true;
}
