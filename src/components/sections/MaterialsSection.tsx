"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { materials } from "@/data/materials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/utils";
import { pinnedStartOffset, refreshScrollTriggers, registerScrollTrigger } from "@/lib/gsap-runtime";

export function MaterialsSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (prefersReducedMotion() || window.innerWidth < 768) return;

    const paintSpacer = () => {
      const spacer = wrap.parentElement;
      if (spacer?.classList.contains("pin-spacer")) {
        spacer.style.background = "#111318";
      }
    };
    const lockHeight = () => {
      const height = Math.max(360, window.innerHeight - pinnedStartOffset() + 2);
      wrap.style.height = `${height}px`;
      wrap.style.minHeight = `${height}px`;
      paintSpacer();
    };
    lockHeight();

    let killed = false;
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);
      registerScrollTrigger(ScrollTrigger);
      const distance = track.scrollWidth - window.innerWidth + 80;
      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: () => `top ${pinnedStartOffset()}px`,
            end: () => `+=${distance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: lockHeight,
            onToggle: paintSpacer,
          },
        });
      }, wrap);
      if (killed) ctx.revert();
      else refreshScrollTriggers();
    };
    void run();
    window.addEventListener("resize", lockHeight);
    return () => {
      killed = true;
      window.removeEventListener("resize", lockHeight);
      wrap.style.height = "";
      wrap.style.minHeight = "";
      ctx?.revert();
    };
  }, []);

  return (
    <section id="materials" className="bg-ink text-white">
      <div
        ref={wrapRef}
        className="overflow-hidden bg-ink md:min-h-dvh md:flex md:flex-col [box-shadow:0_16px_0_#111318]"
      >
        <div className="site-grid pt-8 md:pt-10 materials-head shrink-0">
          <SectionHeading
            light
            eyebrow="What we move"
            title="Building"
            titleLine2="materials."
          />
        </div>
        <div
          ref={trackRef}
          className="flex md:flex-nowrap flex-col md:flex-row gap-4 md:gap-5 px-[5vw] pt-8 pb-0 md:w-max md:flex-1 md:min-h-0 md:items-stretch"
        >
          {materials.map((item) => (
            <article
              key={item.id}
              className="relative w-full aspect-[4/5] md:aspect-auto md:h-full md:w-auto md:min-w-[240px] overflow-hidden bg-ink group"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover max-w-none scale-[1.04] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                sizes="(max-width: 768px) 100vw, 28vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <h3 className="absolute bottom-6 left-6 right-6 font-heading font-extrabold text-2xl tracking-tight">
                {item.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
