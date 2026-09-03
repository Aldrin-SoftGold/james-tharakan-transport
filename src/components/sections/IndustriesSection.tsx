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
            scrub: 0.85,
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
    <section id="industries" className="bg-ink text-white">
      <div
        ref={wrapRef}
        className="overflow-hidden bg-ink md:min-h-dvh md:flex md:flex-col [box-shadow:0_16px_0_#111318]"
      >
        <div className="site-grid pt-8 md:pt-10 shrink-0">
          <SectionHeading light eyebrow="Industries" title="Who we" titleLine2="move for" />
        </div>
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap gap-4 md:gap-5 px-[5vw] pt-8 pb-0 md:w-max md:flex-1 md:min-h-0 md:items-stretch"
        >
          {industries.map((item) => (
            <article
              key={item.id}
              className="relative w-full aspect-[16/11] md:aspect-auto md:h-full md:w-auto md:min-w-[280px] overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-0 p-7 md:p-9">
                <h3 className="font-heading font-extrabold text-[clamp(1.55rem,2.6vw,2.4rem)] tracking-tight leading-none">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-white/75">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
