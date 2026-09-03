"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const items = [
  "Dubai based",
  "Licensed LLC",
  "UAE · Oman · KSA",
  "GCC deliveries",
  "Heavy cargo",
];

export function TrustStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-trust]");
    if (prefersReducedMotion()) {
      els.forEach((el) => ((el as HTMLElement).style.opacity = "1"));
      return;
    }
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          els,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 82%", once: true },
          },
        );
      }, root);
    };
    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="bg-offwhite border-y border-black/5">
      <div className="site-grid py-8 md:py-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
        {items.map((item) => (
          <p
            key={item}
            data-trust
            className="opacity-0 font-heading font-bold text-[0.95rem] md:text-[1.08rem] tracking-tight text-ink"
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
