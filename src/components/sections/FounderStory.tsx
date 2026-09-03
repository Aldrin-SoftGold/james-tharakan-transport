"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { company } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/utils";

const stages = ["Driver", "Operator", "Business owner", "Licensed LLC"] as const;

export function FounderStory() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to("[data-founder-image]", {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
        gsap.fromTo(
          "[data-stage]",
          { opacity: 0.28 },
          {
            opacity: 1,
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline]",
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.8,
            },
          },
        );
      }, root);
    };
    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="bg-paper pt-16 md:pt-20 pb-10 md:pb-12">
      <div className="site-grid grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-6">
          <div className="overflow-hidden">
            <div data-founder-image className="relative aspect-[4/5] bg-offwhite">
              <Image
                src="/images/founder/atmosphere.jpg"
                alt="A driver on the road at dusk"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 border-t border-black/10 pt-10">
            <div>
              <p className="label">Licensed for</p>
              <ul className="mt-3 space-y-2 font-heading font-bold text-base leading-snug">
                {company.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">Corridors</p>
              <p className="mt-3 font-heading font-bold text-base leading-snug">
                {company.deliveryLine}
              </p>
            </div>
            <div>
              <p className="label">Office</p>
              <p className="mt-3 font-heading font-bold text-base leading-snug">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.city}, {company.address.country}
              </p>
            </div>
            <div>
              <p className="label">Call</p>
              <ul className="mt-3 space-y-2 font-heading font-bold text-base leading-snug">
                {company.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className="hover:text-royal transition-colors">
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-10">
          <SectionHeading eyebrow="About" title="Built from" titleLine2="the Road" />
          <p className="mt-8 text-[0.78rem] tracking-[0.18em] uppercase text-ochre font-medium">
            From the Driver’s Seat to the Road Ahead
          </p>
          <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.75] text-muted max-w-xl">
            <p>
              James Tharakan Transport L.L.C was built through experience,
              determination, and a deep understanding of the road. Founded by James
              Tharakan, the company grew from his beginnings as a professional driver
              into a fully licensed transport business in Dubai.
            </p>
            <p>
              That experience continues to shape how we operate today. From border
              formalities and load securing to driver coordination and on-site
              delivery, we understand transportation from the ground up — because we
              have lived it.
            </p>
            <p>
              Our licensed operations focus on{" "}
              <strong className="font-semibold text-ink">
                cargo transport by heavy trucks and raw materials transport by road
              </strong>
              , with particular expertise across the{" "}
              <strong className="font-semibold text-ink">
                UAE, Oman, Saudi Arabia and the GCC
              </strong>
              . We transport a wide range of cargo while maintaining the reliability,
              careful handling, and on-time delivery that every shipment requires.
            </p>
            <p>
              We bring practical road experience, dependable execution, and a
              commitment to getting every load where it needs to be — safely,
              efficiently, and on schedule.
            </p>
          </div>

          <ol data-timeline className="mt-12 space-y-0 border-l border-black/10 pl-6">
            {stages.map((stage, i) => (
              <li key={stage} data-stage className="relative py-3">
                <span className="absolute -left-[31px] top-5 h-3 w-3 rounded-full bg-royal" />
                <p className="font-heading font-extrabold text-xl md:text-2xl tracking-tight">
                  {stage}
                </p>
                {i < stages.length - 1 ? (
                  <span className="sr-only">then</span>
                ) : null}
              </li>
            ))}
          </ol>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="label">Legal form</dt>
              <dd className="mt-2 font-heading font-bold text-base">{company.legalName}</dd>
            </div>
            <div>
              <dt className="label">Location</dt>
              <dd className="mt-2 font-heading font-bold text-base">
                Dubai Investment Park, Dubai
              </dd>
            </div>
            <div>
              <dt className="label">Trade licence / Register</dt>
              <dd className="mt-2 font-heading font-bold text-base">{company.licenceDisplay}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
