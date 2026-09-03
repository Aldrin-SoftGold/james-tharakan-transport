import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { QuoteForm } from "@/components/sections/QuoteForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <header className="bg-ink text-white pt-32 md:pt-40 pb-16">
        <div className="site-grid grid gap-10 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <p className="label text-white/45">{service.number} / Services</p>
            <h1 className="display text-[clamp(2.4rem,5.2vw,4.7rem)] mt-5">{service.title}</h1>
            <p className="lede mt-8 text-white/70">{service.description}</p>
            <div className="mt-10">
              <Button href="/quote">Request a Quote</Button>
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </header>
      <QuoteForm />
    </>
  );
}
