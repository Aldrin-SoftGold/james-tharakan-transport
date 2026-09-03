import { NextResponse } from "next/server";
import { contactSchema, isHoneypotTripped } from "@/lib/validation";
import { deliverEmail, rateLimit } from "@/lib/email";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`contact:${ip}`)) {
    return NextResponse.json({ error: "Please wait before sending again." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }

  if (isHoneypotTripped(parsed.data.website, parsed.data.startedAt)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await deliverEmail({
      subject: `Website enquiry from ${parsed.data.name}`,
      lines: [
        ["Name", parsed.data.name],
        ["Phone", parsed.data.phone],
        ["Email", parsed.data.email],
        ["Message", parsed.data.message],
      ],
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
