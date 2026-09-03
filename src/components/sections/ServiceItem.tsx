"use client";

import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

type Props = {
  service: Service;
  active: boolean;
  onEnter: () => void;
};

export function ServiceItem({ service, active, onEnter }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      data-service-item
      className="group block border-t border-black/10 py-8 md:py-10 last:border-b"
    >
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
        <p
          className={cn(
            "md:col-span-2 font-heading font-extrabold text-xl md:text-2xl transition-colors duration-500",
            active ? "text-ochre" : "text-black/20",
          )}
        >
          {service.number}
        </p>
        <div className="md:col-span-5">
          <h3 className="font-heading font-extrabold text-[clamp(1.5rem,3vw,2.65rem)] tracking-tight leading-[1.05]">
            {service.title}
          </h3>
          <p className="mt-3 max-w-xl text-muted leading-relaxed">{service.summary}</p>
          <p
            className={cn(
              "mt-5 text-2xl transition-transform duration-300",
              active ? "translate-x-1.5 text-royal" : "text-ink/40",
            )}
            aria-hidden
          >
            →
          </p>
        </div>
        <div className="relative md:col-span-5 aspect-[16/10] overflow-hidden bg-ink/10">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover max-w-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 36vw"
          />
        </div>
      </div>
      <span
        className={cn(
          "mt-6 block h-px bg-royal origin-left transition-transform duration-500",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}
