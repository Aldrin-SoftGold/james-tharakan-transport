"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SelectField({
  name,
  options,
  placeholder = "Select an option",
  required,
  className,
}: {
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: string) {
    setValue(next);
    setOpen(false);
  }

  function onTriggerKey(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      setActive(Math.max(0, options.indexOf(value)));
    }
  }

  function onListKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const next = options[active];
      if (next) choose(next);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", open && "z-40", className)}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        className="field select-field-trigger text-left w-full flex items-center justify-between gap-4"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
      >
        <span className={value ? "text-ink" : "text-[#8b8e96]"}>{value || placeholder}</span>
        <span className={cn("select-field-chevron", open && "is-open")} aria-hidden />
      </button>
      {open ? (
        <div
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label="Cargo type"
          className="select-field-menu"
          onKeyDown={onListKey}
        >
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              className={cn(
                "select-field-option",
                option === value && "is-selected",
                index === active && "is-active",
              )}
              onMouseEnter={() => setActive(index)}
              onClick={() => choose(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
