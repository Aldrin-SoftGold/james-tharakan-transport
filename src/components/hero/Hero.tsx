"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { prefersReducedMotion, shouldLoadHeroVideo } from "@/lib/utils";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    setUseVideo(shouldLoadHeroVideo());
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    const support = root.querySelector<HTMLElement>("[data-hero-support]");
    const ctas = root.querySelector<HTMLElement>("[data-hero-ctas]");
    const road = root.querySelector<SVGPathElement>(".road-path");
    const marks = root.querySelector<SVGPathElement>(".road-marks-path");
    const video = root.querySelector<HTMLElement>("[data-hero-media]");

    if (prefersReducedMotion()) {
      lines.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      if (support) support.style.opacity = "1";
      if (ctas) ctas.style.opacity = "1";
      if (video) video.style.opacity = "1";
      return;
    }

    let ctx: { revert: () => void } | undefined;

    const run = async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0);
        tl.fromTo(
          lines,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.15, stagger: 0.18 },
          0.45,
        );
        tl.fromTo(support, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.85);
        tl.fromTo(ctas, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.05);

        if (road) {
          const length = road.getTotalLength();
          gsap.set(road, { strokeDasharray: length, strokeDashoffset: length });
          if (marks) {
            const markLen = marks.getTotalLength();
            gsap.set(marks, { strokeDasharray: markLen, strokeDashoffset: markLen });
          }
          tl.to(road, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 1.15);
          if (marks) {
            tl.to(marks, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 1.25);
          }
        }
      }, root);
    };

    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-[100svh] max-md:min-h-[100dvh] bg-ink text-white overflow-x-clip">
      <div data-hero-media className="absolute inset-0">
        <Image
          src="/hero/hero-poster.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {useVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero/hero-poster.jpg"
            preload="metadata"
          >
            <source src="/hero/hero-truck.mp4" type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      </div>

      <div className="relative site-grid min-h-[100svh] max-md:min-h-[100dvh] flex flex-col justify-end gap-6 md:gap-8 pb-24 pt-[7.5rem] max-[380px]:pt-24 max-[380px]:pb-20">
        <div className="w-full max-w-[min(100%,42rem)] md:max-w-5xl min-w-0">
          <h1 className="display text-[clamp(1.95rem,7.6vw,2.9rem)] md:text-[clamp(3rem,5.6vw,5.5rem)] !leading-[1.08]">
            <span data-hero-line className="block">
              Moving
            </span>
            <span data-hero-line className="block">
              materials.
            </span>
            <span data-hero-line className="block mt-2 md:mt-4">
              Moving
            </span>
            <span data-hero-line className="block">
              business.
            </span>
          </h1>
          <p
            data-hero-support
            className="mt-5 md:mt-8 text-[1.02rem] md:text-xl text-white/75 max-w-md leading-relaxed"
          >
            Heavy transport across
            <br />
            UAE, Oman, Saudi Arabia and the GCC.
          </p>
          <div data-hero-ctas className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="/quote">Request a Quote</Button>
            <Button href="/services" variant="secondary">
              Explore our services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
