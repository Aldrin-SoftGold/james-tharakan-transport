"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryPhone, primaryWhatsApp } from "@/data/company";

export function MobileCta() {
  const pathname = usePathname();
  const hide = pathname === "/quote";

  useEffect(() => {
    document.body.dataset.cta = hide ? "off" : "on";
    return () => {
      delete document.body.dataset.cta;
    };
  }, [hide]);

  if (hide) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ink/95 backdrop-blur-sm border-t border-white/10 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="grid grid-cols-3">
        <a
          href={primaryPhone.href}
          className="py-3.5 text-center text-[0.68rem] tracking-[0.14em] uppercase font-semibold text-white"
        >
          Call
        </a>
        <a
          href={primaryWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 text-center text-[0.68rem] tracking-[0.14em] uppercase font-semibold text-white border-x border-white/10"
        >
          WhatsApp
        </a>
        <Link
          href="/quote"
          className="py-3.5 text-center text-[0.68rem] tracking-[0.14em] uppercase font-semibold bg-royal text-white"
        >
          Quote
        </Link>
      </div>
    </div>
  );
}
