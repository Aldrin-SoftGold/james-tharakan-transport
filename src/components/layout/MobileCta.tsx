"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryPhone } from "@/data/company";

export function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/quote") return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ink/95 backdrop-blur-sm border-t border-white/10 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="grid grid-cols-2">
        <a
          href={primaryPhone.href}
          className="py-3.5 text-center text-[0.68rem] tracking-[0.16em] uppercase font-semibold text-white"
        >
          Call
        </a>
        <Link
          href="/quote"
          className="py-3.5 text-center text-[0.68rem] tracking-[0.16em] uppercase font-semibold bg-royal text-white"
        >
          Quote
        </Link>
      </div>
    </div>
  );
}
