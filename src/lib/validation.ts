import { z } from "zod";

const phoneLike = z
  .string()
  .trim()
  .min(1, "Enter a phone number")
  .refine((value) => !/[A-Za-z]/.test(value), "Phone number cannot contain letters")
  .refine((value) => (value.match(/\d/g) ?? []).length >= 7, "Enter a valid phone number")
  .max(24, "Enter a valid phone number")
  .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone number");

const emailLike = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .refine((value) => value.includes("@"), "Email must include @")
  .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Enter a valid email");

export const quoteSchema = z.object({
  cargoType: z.string().trim().min(2, "Tell us what needs moving"),
  weightVolume: z.string().trim().min(1, "Add an approximate weight or volume"),
  pickup: z.string().trim().min(2, "Add a pickup location"),
  delivery: z.string().trim().min(2, "Add a delivery location"),
  date: z.string().trim().min(1, "Add a required date"),
  name: z.string().trim().min(2, "Enter your name"),
  phone: phoneLike,
  email: emailLike,
  website: z.string().optional(),
  startedAt: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: phoneLike,
  email: emailLike,
  message: z.string().trim().min(10, "Tell us briefly what you need"),
  website: z.string().optional(),
  startedAt: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export function isHoneypotTripped(website?: string, startedAt?: string) {
  if (website && website.trim().length > 0) return true;
  if (startedAt) {
    const started = Number(startedAt);
    if (!Number.isNaN(started) && Date.now() - started < 1800) return true;
  }
  return false;
}
