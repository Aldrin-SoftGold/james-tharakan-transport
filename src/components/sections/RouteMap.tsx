"use client";

import { useEffect, useRef } from "react";
import { operatedRoutes, routeNarrative } from "@/data/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/utils";

export function RouteMap() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const path = root.querySelector<SVGPathElement>("#corridor");
    const marker = root.querySelector<SVGCircleElement>("#marker");
    const nodes = root.querySelectorAll("[data-node]");
    if (!path) return;

    if (prefersReducedMotion()) {
      nodes.forEach((n) => ((n as HTMLElement).style.opacity = "1"));
      return;
    }

    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { MotionPathPlugin } = await import("gsap/MotionPathPlugin");
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 45%",
            scrub: 1,
          },
        });
        tl.fromTo(nodes, { opacity: 0 }, { opacity: 1, stagger: 0.12, duration: 0.4 }, 0);
        tl.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "none" }, 0.1);
        if (marker) {
          tl.fromTo(marker, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15);
          tl.to(
            marker,
            {
              duration: 1.2,
              ease: "none",
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
              },
            },
            0.15,
          );
        }
      }, root);
    };
    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="routes" ref={ref} className="bg-paper py-24 md:py-32">
      <div className="site-grid grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Routes & coverage"
            title={routeNarrative.heading}
            titleLine2={routeNarrative.headingLine2}
          />
          <p className="lede mt-8">{routeNarrative.intro}</p>
          <ul className="mt-12 space-y-8">
            {operatedRoutes.map((route) => (
              <li key={route.id}>
                <p className="font-heading font-extrabold text-xl tracking-tight">{route.title}</p>
                <p className="mt-2 text-muted leading-relaxed max-w-md">{route.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <figure className="bg-offwhite p-4 md:p-8">
            <svg
              viewBox="0 0 640 520"
              className="w-full h-auto"
              role="img"
              aria-labelledby="mapTitle mapDesc"
            >
              <title id="mapTitle">Editorial map of delivery locations</title>
              <desc id="mapDesc">
                Simplified geography of the Arabian Peninsula showing Dubai in the UAE,
                Oman, Saudi Arabia, and the wider GCC.
              </desc>
              <path
                d="M70 40 L210 28 L250 70 L310 90 L360 60 L430 95 L470 160 L500 210 L520 280 L500 360 L430 430 L340 470 L240 490 L150 450 L90 380 L60 280 L55 180 Z"
                fill="#e4e5e9"
                stroke="#c9cbd1"
                strokeWidth="1"
              />
              <path
                d="M360 210 C 390 230, 410 250, 430 290 C 450 330, 455 370, 420 410 C 390 440, 340 455, 300 430 C 270 410, 280 360, 300 320 C 318 286, 340 250, 360 210 Z"
                fill="#d7dce8"
                stroke="#3355A6"
                strokeWidth="1.2"
                opacity="0.95"
              />
              <path
                d="M300 175 C 330 168, 355 175, 368 200 C 348 215, 325 220, 305 210 C 292 200, 290 185, 300 175 Z"
                fill="#c5d0ea"
                stroke="#3355A6"
                strokeWidth="1.4"
              />
              <path
                id="corridor"
                d="M210 250 C 250 210, 288 190, 318 186 C 340 210, 355 235, 372 270 C 388 304, 402 338, 418 368"
                fill="none"
                stroke="#3355A6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle id="marker" r="6" fill="#A77928" opacity="0" />
              <g data-node className="opacity-0">
                <circle cx="210" cy="250" r="5" fill="#A77928" />
                <text x="80" y="246" fontSize="13" fontFamily="Manrope, sans-serif" fontWeight="700" fill="#111318">
                  Saudi Arabia
                </text>
              </g>
              <g data-node className="opacity-0">
                <circle cx="318" cy="186" r="5" fill="#3355A6" />
                <text x="328" y="176" fontSize="13" fontFamily="Manrope, sans-serif" fontWeight="700" fill="#111318">
                  Dubai / UAE
                </text>
              </g>
              <g data-node className="opacity-0">
                <circle cx="372" cy="270" r="4.5" fill="#3355A6" />
                <text x="382" y="266" fontSize="13" fontFamily="Manrope, sans-serif" fontWeight="700" fill="#111318">
                  Oman
                </text>
              </g>
              <g data-node className="opacity-0">
                <text x="88" y="310" fontSize="12" letterSpacing="2" fontFamily="Inter, sans-serif" fill="#5E626B">
                  GCC
                </text>
              </g>
            </svg>
            <figcaption className="mt-4 text-xs tracking-[0.14em] uppercase text-muted">
              Delivery locations — UAE. Oman. Saudi Arabia and GCC.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
