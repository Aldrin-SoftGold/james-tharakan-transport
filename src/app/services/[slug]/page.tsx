import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services } from "@/data/services";

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
      <header className="bg-paper text-ink min-h-[100svh] flex items-center pt-[calc(4.5rem+1.5rem)] md:pt-[calc(5.25rem+2rem)] pb-12 md:pb-16">
        <div className="site-grid w-full grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
          <div className="lg:col-span-7 min-w-0">
            <p className="label">{service.number} / Services</p>
            <h1 className="display text-[clamp(2rem,8vw,4.7rem)] mt-5 text-ink">{service.title}</h1>
            <p className="lede mt-6 md:mt-8 text-muted max-w-2xl">{service.description}</p>
          </div>
          <div className="lg:col-span-5 relative w-full overflow-hidden h-[min(40svh,18rem)] sm:h-[min(42svh,22rem)] lg:h-[min(calc(100svh-14rem),30rem)]">
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
    </>
  );
}
