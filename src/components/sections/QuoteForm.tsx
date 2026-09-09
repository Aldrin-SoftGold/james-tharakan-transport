import { quoteMailto } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="quote"
      className={compact ? "" : "bg-offwhite py-10 md:py-14"}
    >
      <div
        className={
          compact
            ? ""
            : "site-grid flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center md:gap-8"
        }
      >
        {!compact ? (
          <div className="min-w-0 md:col-span-7">
            <SectionHeading
              eyebrow="Request a quote"
              title="Tell us what"
              titleLine2="needs moving."
            />
            <p className="lede mt-4">
              Share the details of your cargo and route and our team can review your
              requirement.
            </p>
          </div>
        ) : null}
        <div className={compact ? "mt-6 md:mt-8" : "md:col-span-5 md:flex md:items-center md:justify-start"}>
          <Button href={quoteMailto} external size="lg">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
