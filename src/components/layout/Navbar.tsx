"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { company, primaryPhone } from "@/data/company";
import { nav } from "@/data/contact";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overDarkHero = pathname === "/" && !scrolled && !open;
  const inverted = !overDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 pt-[env(safe-area-inset-top,0px)]",
        inverted ? "bg-offwhite/95 backdrop-blur-sm border-b border-black/5" : "bg-transparent",
      )}
    >
      <div className="site-grid flex items-center justify-between h-[4.5rem] md:h-[5.25rem]">
        <Link href="/" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-mark.png"
            alt={company.legalName}
            width={168}
            height={74}
            priority
            className="h-10 w-auto md:h-12"
          />
          <span
            className={cn(
              "hidden lg:block text-[0.68rem] font-semibold tracking-[0.14em] uppercase leading-tight max-w-[11rem]",
              inverted ? "text-ink" : "text-white",
            )}
          >
            {company.legalName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {nav.desktop.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.72rem] font-medium tracking-[0.16em] uppercase relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
                inverted ? "text-ink" : "text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={nav.quote.href}
            className="inline-flex items-center gap-2 bg-royal text-white text-[0.68rem] font-semibold tracking-[0.16em] uppercase px-4 py-2.5 rounded-[4px] hover:-translate-y-0.5 transition-transform duration-200"
          >
            {nav.quote.label}
          </Link>
        </nav>

        <button
          type="button"
          className={cn(
            "md:hidden text-[0.72rem] tracking-[0.18em] uppercase font-medium",
            inverted ? "text-ink" : "text-white",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 top-[4.5rem] bg-offwhite overflow-y-auto"
          >
            <div className="site-grid py-10 flex flex-col gap-6">
              {nav.mobile.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display text-[1.85rem] text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={nav.quote.href}
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center bg-royal text-white text-[0.72rem] tracking-[0.16em] uppercase font-semibold py-4 rounded-[4px]"
              >
                {nav.quote.label}
              </Link>
              <a href={primaryPhone.href} className="text-royal text-lg font-medium tracking-tight">
                {primaryPhone.display}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
