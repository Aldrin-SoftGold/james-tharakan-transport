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
      const height = Math.max(360, window.innerHeight - pinnedStartOffset());
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
      const distance = Math.max(0, track.scrollWidth - wrap.clientWidth);
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
            anticipatePin: 0,
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
    <section
      id="materials"
      className="bg-ink text-white overflow-x-clip [box-shadow:0_64px_0_#111318]"
    >
      <div
        ref={wrapRef}
        className="w-full min-w-0 max-w-full overflow-hidden bg-ink flex flex-col h-auto md:h-[calc(100dvh-5.25rem)]"
      >
        <div className="site-grid pt-5 md:pt-6 materials-head shrink-0">
          <SectionHeading
            light
            className="[&_.label]:mb-3 [&_.display]:text-[clamp(1.7rem,3.8vw,3.1rem)]"
            eyebrow="What we move"
            title="Building"
            titleLine2="materials."
          />
        </div>
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap gap-3 md:gap-4 px-[max(var(--page-gutter,1.15rem),env(safe-area-inset-left,0px))] pt-4 pb-5 md:w-max md:flex-1 md:min-h-0 md:items-stretch"
        >
          {materials.map((item) => (
            <article
              key={item.id}
              className="relative w-full aspect-[4/5] md:aspect-auto md:h-full md:w-[min(22vw,15rem)] md:min-w-[12.5rem] overflow-hidden bg-ink group"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover max-w-none scale-[1.04] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                sizes="(max-width: 768px) 100vw, 22vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <h3 className="absolute bottom-5 left-5 right-5 font-heading font-extrabold text-xl tracking-tight">
                {item.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
