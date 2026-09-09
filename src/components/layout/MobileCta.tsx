"use client";

import { useEffect } from "react";
import { primaryPhone, primaryWhatsApp, quoteMailto } from "@/data/company";

export function MobileCta() {
  useEffect(() => {
    document.body.dataset.cta = "on";
    return () => {
      delete document.body.dataset.cta;
    };
  }, []);

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
        <a
          href={quoteMailto}
          className="py-3.5 text-center text-[0.68rem] tracking-[0.14em] uppercase font-semibold bg-royal text-white"
        >
          Quote
        </a>
      </div>
    </div>
  );
}
