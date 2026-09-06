import { primaryPhone, primaryWhatsApp } from "@/data/company";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink text-white pt-16 md:pt-24 pb-10 md:pb-12">
      <div className="site-grid">
        <p className="label text-white/45">Contact</p>
        <h2 className="display text-[clamp(2.2rem,8vw,5.2rem)] mt-4">
          Ready to move?
        </h2>
        <p className="mt-5 text-base md:text-xl text-white/70">Let’s talk about your next load.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button href="/quote">Request a Quote</Button>
          <Button href={primaryWhatsApp} variant="secondary" external>
            WhatsApp
          </Button>
          <Button href={primaryPhone.href} variant="secondary" external>
            {primaryPhone.display}
          </Button>
        </div>
      </div>
    </section>
  );
}
