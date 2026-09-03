"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceItem } from "@/components/sections/ServiceItem";
import { cn } from "@/lib/utils";

export function ServicesSection({ showHeading = true }: { showHeading?: boolean }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-service-item]")];
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const index = items.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-22% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="services"
      className={cn("bg-offwhite", showHeading ? "py-20 md:py-24" : "pb-16 md:pb-20")}
    >
      <div className="site-grid">
        {showHeading ? (
          <SectionHeading eyebrow="Services" title="What we" titleLine2="move on the road" />
        ) : null}
        <div ref={listRef} className={cn(showHeading && "mt-10")}>
          {services.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              active={active === i}
              onEnter={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
