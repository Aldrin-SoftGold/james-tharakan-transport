"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ImageReveal({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.clipPath = "inset(0 0 0 0)";
      return;
    }

    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    };
    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ clipPath: "inset(0 0 100% 0)" }}>
      {children}
    </div>
  );
}
