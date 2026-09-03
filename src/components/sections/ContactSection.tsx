"use client";

import { useMemo, useState } from "react";
import { company, primaryPhone } from "@/data/company";
import { contactSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { EmailInput, PhoneInput } from "@/components/ui/ConstrainedInputs";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const startedAt = useMemo(() => String(Date.now()), []);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-ink text-white pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="site-grid grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="label text-white/45">Contact</p>
          <h2 className="display text-[clamp(2.55rem,6vw,5.2rem)] mt-4">
            Ready
            <br />
            to move?
          </h2>
          <p className="mt-6 text-xl text-white/70">Let’s talk about your next load.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="/quote">Request a Quote</Button>
            <Button href={primaryPhone.href} variant="secondary" external>
              {primaryPhone.display}
            </Button>
          </div>
          <div className="mt-12 space-y-3 text-white/70 leading-relaxed">
            <p>
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.city}, {company.address.country}
            </p>
            <a href={`mailto:${company.email}`} className="block text-white hover:underline">
              {company.email}
            </a>
            {company.phones.slice(1).map((phone) => (
              <a key={phone.href} href={phone.href} className="block hover:text-white">
                {phone.display}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-8">
          <div className="aspect-[16/11] bg-white/5 overflow-hidden">
            <iframe
              title="Office location, Dubai Investment Park"
              src={company.address.mapsEmbed}
              className="w-full h-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {status === "success" ? (
            <p className="font-heading font-bold text-xl">Message received. We will be in touch.</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <input type="hidden" name="startedAt" value={startedAt} />
              <label className="block">
                <span className="label text-white/45">Name</span>
                <input name="name" className="field text-white border-white/25" required />
                {errors.name ? <span className="text-ochre text-sm">{errors.name}</span> : null}
              </label>
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="label text-white/45">Phone</span>
                  <PhoneInput className="field text-white border-white/25" required />
                  {errors.phone ? <span className="text-ochre text-sm">{errors.phone}</span> : null}
                </label>
                <label className="block">
                  <span className="label text-white/45">Email</span>
                  <EmailInput
                    className="field text-white border-white/25"
                    required
                    onMessage={(message) =>
                      setErrors((current) => {
                        if (current.email === message) return current;
                        return { ...current, email: message };
                      })
                    }
                  />
                  {errors.email ? <span className="text-ochre text-sm">{errors.email}</span> : null}
                </label>
              </div>
              <label className="block">
                <span className="label text-white/45">Message</span>
                <textarea name="message" rows={4} className="field text-white border-white/25 resize-y" required />
                {errors.message ? <span className="text-ochre text-sm">{errors.message}</span> : null}
              </label>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="text-[0.72rem] tracking-[0.16em] uppercase font-semibold border-b border-white pb-1 hover:text-ochre hover:border-ochre transition-colors"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
              {status === "error" ? (
                <p className="text-sm text-white/80" role="alert">
                  We couldn’t send that. Call {primaryPhone.display}.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
