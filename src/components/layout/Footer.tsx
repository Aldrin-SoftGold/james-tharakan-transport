import Image from "next/image";
import Link from "next/link";
import { company, primaryPhone } from "@/data/company";
import { nav } from "@/data/contact";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="site-grid py-16 md:py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/brand/logo-mark.png"
            alt={company.legalName}
            width={160}
            height={70}
            className="h-12 w-auto"
          />
          <p className="mt-6 font-heading font-bold text-lg tracking-tight">
            {company.legalName}
          </p>
          <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-xs">
            Cargo Transport
            <br />
            Raw Materials Transport
            <br />
            {company.deliveryLine}
          </p>
        </div>

        <nav className="md:col-span-3 flex flex-col gap-3" aria-label="Footer">
          {nav.footer.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.78rem] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:col-span-4 text-sm text-white/70 leading-relaxed">
          <a href={primaryPhone.href} className="block text-white text-lg mb-4">
            {primaryPhone.display}
          </a>
          <p>
            {company.address.line2}
            <br />
            {company.address.city}, {company.address.country}
          </p>
          <a href={`mailto:${company.email}`} className="mt-4 inline-block hover:text-white">
            {company.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-grid py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.72rem] tracking-[0.08em] uppercase text-white/40">
          <p>
            Trade Licence / Register No. {company.licenceDisplay}
          </p>
          <p>© {company.copyrightYear} {company.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
