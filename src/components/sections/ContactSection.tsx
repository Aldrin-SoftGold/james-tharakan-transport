import { primaryPhone, primaryWhatsApp, quoteMailto } from "@/data/company";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  return (
    <section id="contact" className="bg-paper text-ink pt-16 md:pt-24 pb-10 md:pb-12">
      <div className="site-grid">
        <p className="label">Contact</p>
        <h2 className="display text-[clamp(2.2rem,8vw,5.2rem)] mt-4 text-ink">
          Ready to move?
        </h2>
        <p className="mt-5 text-base md:text-xl text-muted">Let’s talk about your next load.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button href={quoteMailto} external>Request a Quote</Button>
          <Button href={primaryWhatsApp} variant="ghost" external>
            WhatsApp
          </Button>
          <Button href={primaryPhone.href} variant="ghost" external>
            {primaryPhone.display}
          </Button>
        </div>
      </div>
    </section>
  );
}
