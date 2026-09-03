"use client";

import { useEffect, useRef } from "react";
import { whyUs } from "@/data/whyUs";
import { prefersReducedMotion } from "@/lib/utils";

export function WhyUsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-why]");
    if (prefersReducedMotion()) {
      items.forEach((el) => el.classList.add("text-royal"));
      return;
    }
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        items.forEach((el) => {
          gsap.fromTo(
            el,
            { color: "#5E626B" },
            {
              color: "#3355A6",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 72%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }, root);
    };
    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="why-us" ref={ref} className="bg-paper pt-6 md:pt-8 pb-16 md:pb-20">
      <div className="site-grid">
        <h2 className="display text-[clamp(2.4rem,5.4vw,4.6rem)]">Why us?</h2>
        <div className="mt-4">
          {whyUs.map((item) => (
            <article
              key={item.id}
              className="grid md:grid-cols-[minmax(11rem,16.5rem)_minmax(0,1fr)] gap-x-6 gap-y-1 items-end border-b border-black/8 py-2.5 md:py-3"
            >
              <h3
                data-why
                className="display text-[clamp(1.35rem,2.4vw,2.1rem)] text-muted leading-[1.1]"
              >
                {item.line1}
                <br />
                {item.line2}
              </h3>
              <p className="text-[1.05rem] md:text-[1.2rem] text-muted leading-snug">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
