"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PHONE_ALLOWED = /[^\d+\s()-]/g;

export function PhoneInput({
  className,
  name = "phone",
  required,
}: {
  className?: string;
  name?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState("");

  return (
    <input
      name={name}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      aria-label="Phone"
      className={className}
      required={required}
      value={value}
      placeholder="e.g. +971 56 916 1225"
      pattern="[+\d][\d\s()-]{6,}"
      title="Use numbers only"
      onBeforeInput={(event) => {
        const data = event.data;
        if (data && /[A-Za-z]/.test(data)) event.preventDefault();
      }}
      onPaste={(event) => {
        const text = event.clipboardData.getData("text");
        if (/[A-Za-z]/.test(text)) {
          event.preventDefault();
          setValue(text.replace(PHONE_ALLOWED, "").slice(0, 24));
        }
      }}
      onChange={(event) => {
        setValue(event.target.value.replace(PHONE_ALLOWED, "").slice(0, 24));
      }}
    />
  );
}

export function EmailInput({
  className,
  name = "email",
  required,
  onMessage,
}: {
  className?: string;
  name?: string;
  required?: boolean;
  onMessage?: (message: string) => void;
}) {
  const [value, setValue] = useState("");

  function check(next: string) {
    if (!next) {
      onMessage?.("");
      return;
    }
    if (!next.includes("@")) {
      onMessage?.("Email must include @");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      onMessage?.("Enter a valid email");
      return;
    }
    onMessage?.("");
  }

  return (
    <input
      name={name}
      type="email"
      inputMode="email"
      autoComplete="email"
      aria-label="Email"
      className={cn(className)}
      required={required}
      value={value}
      placeholder="name@company.com"
      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
      title="Email must include @"
      onChange={(event) => {
        const next = event.target.value;
        setValue(next);
        check(next);
      }}
      onBlur={() => check(value)}
    />
  );
}
