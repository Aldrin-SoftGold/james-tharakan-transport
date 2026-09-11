import Image from "next/image";
import Link from "next/link";
import { company, primaryPhone, primaryWhatsApp } from "@/data/company";
import { nav } from "@/data/contact";

export function Footer() {
  return (
    <footer className="bg-paper text-ink">
      <div className="site-grid border-t border-line pt-10 md:pt-12 pb-10 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/brand/logo-mark.png"
            alt={company.legalName}
            width={160}
            height={70}
            className="h-12 w-auto"
          />
          <p className="mt-6 font-heading font-bold text-lg tracking-tight text-ink">
            {company.legalName}
          </p>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-sm">
            Operates across the GCC
            <br />
            {company.deliveryLine}
            <br />
            Any cargo. Specialised in building raw materials.
          </p>
        </div>

        <nav className="md:col-span-3 flex flex-col gap-3" aria-label="Footer">
          {nav.footer.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.78rem] tracking-[0.14em] uppercase text-muted hover:text-royal transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:col-span-4 text-sm text-muted leading-relaxed">
          <a href={primaryPhone.href} className="block text-ink text-lg mb-3 hover:text-royal transition-colors">
            {primaryPhone.display}
          </a>
          <a
            href={primaryWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-ink text-lg mb-4 hover:text-royal transition-colors"
          >
            WhatsApp
          </a>
          <p>
            {company.address.line2}
            <br />
            {company.address.city}, {company.address.country}
          </p>
          <a
            href={`mailto:${company.email}`}
            className="mt-4 inline-block break-all hover:text-royal transition-colors"
          >
            {company.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="site-grid py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.72rem] tracking-[0.08em] uppercase text-muted">
          <p>
            Trade Licence / Register No. {company.licenceDisplay}
          </p>
          <p>© {company.copyrightYear} {company.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
