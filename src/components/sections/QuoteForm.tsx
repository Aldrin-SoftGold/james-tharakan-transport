"use client";

import { useMemo, useState } from "react";
import { primaryPhone } from "@/data/company";
import { materials } from "@/data/materials";
import { quoteSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { DateField } from "@/components/ui/DateField";
import { SelectField } from "@/components/ui/SelectField";
import { EmailInput, PhoneInput } from "@/components/ui/ConstrainedInputs";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cargoOptions = [
  ...materials.map((m) => m.name),
  "Mixed building materials",
  "Heavy cargo — other",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const startedAt = useMemo(() => String(Date.now()), []);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
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

  if (status === "success") {
    return (
      <section id="quote" className={compact ? "" : "bg-offwhite py-24 md:py-32"}>
        <div className={compact ? "" : "site-grid max-w-3xl"}>
          <p className="label text-ochre">Quote request received</p>
          <h2 className="display text-[clamp(2.1rem,4.4vw,3.7rem)] mt-4">
            Thank you.
          </h2>
          <p className="lede mt-6">
            Your transport requirement has been received. The team will review the
            details and contact you.
          </p>
          <div className="mt-10">
            <Button href="/" variant="ghost">
              Back to home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className={compact ? "" : "bg-offwhite py-24 md:py-32"}>
      <div className={compact ? "" : "site-grid grid gap-14 lg:grid-cols-12"}>
        {!compact ? (
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Request a quote"
              title="Tell us what"
              titleLine2="needs moving."
            />
            <p className="lede mt-8">
              Share the details of your cargo and route and our team can review your
              requirement.
            </p>
          </div>
        ) : null}
        <form
          onSubmit={onSubmit}
          className={compact ? "mt-10 space-y-7" : "lg:col-span-7 space-y-7"}
          noValidate
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <input type="hidden" name="startedAt" value={startedAt} />

          <Field label="Cargo type" error={errors.cargoType}>
            <SelectField
              name="cargoType"
              options={cargoOptions}
              placeholder="Select cargo"
              required
            />
          </Field>
          <Field label="Weight / volume" error={errors.weightVolume}>
            <input name="weightVolume" className="field" placeholder="e.g. 20 tonnes or 2 trailers" required />
          </Field>
          <div className="grid md:grid-cols-2 gap-7">
            <Field label="Pickup location" error={errors.pickup}>
              <input name="pickup" className="field" placeholder="City or site" required />
            </Field>
            <Field label="Delivery location" error={errors.delivery}>
              <input name="delivery" className="field" placeholder="City or site" required />
            </Field>
          </div>
          <Field label="Required date" error={errors.date}>
            <DateField name="date" required />
          </Field>
          <div className="grid md:grid-cols-2 gap-7">
            <Field label="Name" error={errors.name}>
              <input name="name" className="field" autoComplete="name" required />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <PhoneInput className="field" required />
            </Field>
          </div>
          <Field label="Email" error={errors.email}>
            <EmailInput
              className="field"
              required
              onMessage={(message) =>
                setErrors((current) => {
                  if (current.email === message) return current;
                  return { ...current, email: message };
                })
              }
            />
          </Field>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-3 bg-royal text-white text-[0.72rem] tracking-[0.16em] uppercase font-semibold px-7 py-4 rounded-[4px] hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Request a Quote"}
            <span aria-hidden>→</span>
          </button>

          {status === "error" ? (
            <div className="border-l-2 border-ochre pl-4" role="alert">
              <p className="font-heading font-bold text-lg">
                We couldn’t submit your request.
              </p>
              <p className="mt-2 text-muted">
                Please try again or call us directly.
              </p>
              <a href={primaryPhone.href} className="mt-3 inline-block text-royal font-medium">
                {primaryPhone.display}
              </a>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="label">{label}</span>
      <div className="mt-1">{children}</div>
      {error ? <span className="mt-2 block text-sm text-ochre-deep">{error}</span> : null}
    </div>
  );
}
