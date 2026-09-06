import { company } from "@/data/company";

export function TrustStrip() {
  return (
    <section className="bg-offwhite border-y border-black/5">
      <div className="site-grid py-8 md:py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
        {company.corridors.map((item) => (
          <p
            key={item}
            className="font-heading font-bold text-[0.9rem] md:text-[1.08rem] tracking-tight text-ink break-words"
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
