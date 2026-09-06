"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/utils";
import { pinnedStartOffset, refreshScrollTriggers, registerScrollTrigger } from "@/lib/gsap-runtime";

export function IndustriesSection() {
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
            scrub: 0.85,
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
      id="industries"
      className="bg-ink text-white overflow-x-clip [box-shadow:0_64px_0_#111318]"
    >
      <div
        ref={wrapRef}
        className="w-full min-w-0 max-w-full overflow-hidden bg-ink flex flex-col h-auto md:h-[calc(100dvh-5.25rem)]"
      >
        <div className="site-grid pt-5 md:pt-6 shrink-0">
          <SectionHeading
            light
            className="[&_.label]:mb-3 [&_.display]:text-[clamp(1.7rem,3.8vw,3.1rem)]"
            eyebrow="Industries"
            title="Who we"
            titleLine2="move for"
          />
        </div>
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap gap-3 md:gap-4 px-[max(var(--page-gutter,1.15rem),env(safe-area-inset-left,0px))] pt-4 pb-5 md:w-max md:flex-1 md:min-h-0 md:items-stretch"
        >
          {industries.map((item) => (
            <article
              key={item.id}
              className="relative w-full aspect-[16/11] md:aspect-auto md:h-full md:w-[min(34vw,22rem)] md:min-w-[16.5rem] overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 34vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-0 p-5 md:p-7">
                <h3 className="font-heading font-extrabold text-[clamp(1.35rem,2.2vw,2rem)] tracking-tight leading-none">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm md:text-base text-white/75">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
