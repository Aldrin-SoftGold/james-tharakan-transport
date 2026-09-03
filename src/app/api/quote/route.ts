import { NextResponse } from "next/server";
import { quoteSchema, isHoneypotTripped } from "@/lib/validation";
import { deliverEmail, rateLimit } from "@/lib/email";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`quote:${ip}`)) {
    return NextResponse.json({ error: "Please wait before sending again." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }

  if (isHoneypotTripped(parsed.data.website, parsed.data.startedAt)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await deliverEmail({
      subject: `Quote request — ${parsed.data.cargoType} — ${parsed.data.pickup} to ${parsed.data.delivery}`,
      lines: [
        ["Cargo type", parsed.data.cargoType],
        ["Weight / volume", parsed.data.weightVolume],
        ["Pickup", parsed.data.pickup],
        ["Delivery", parsed.data.delivery],
        ["Required date", parsed.data.date],
        ["Name", parsed.data.name],
        ["Phone", parsed.data.phone],
        ["Email", parsed.data.email],
      ],
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
