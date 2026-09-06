"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { company } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/utils";

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
      }, root);
    };
    void run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="bg-paper pt-12 md:pt-20 pb-10 md:pb-12">
      <div className="site-grid grid gap-8 lg:grid-cols-12 lg:gap-16 items-stretch">
        <div className="lg:col-span-6">
          <div className="relative overflow-hidden h-full min-h-[16rem] sm:min-h-[22rem]">
            <div data-founder-image className="relative aspect-[4/5] lg:aspect-auto lg:absolute lg:inset-0 bg-offwhite">
              <Image
                src="/images/founder/atmosphere.jpg"
                alt="A driver on the road at dusk"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <SectionHeading eyebrow="About" title="Built from" titleLine2="the Road" />
          <p className="mt-8 text-[0.78rem] tracking-[0.18em] uppercase text-ochre font-medium">
            From the Driver’s Seat to the Road Ahead
          </p>
          <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.75] text-muted">
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
              {company.operateLine}:{" "}
              <strong className="font-semibold text-ink">
                {company.deliveryLine}
              </strong>
              . {company.specialityLine} We transport cargo while maintaining the
              reliability, careful handling, and on-time delivery that every shipment
              requires.
            </p>
            <p>
              We bring practical road experience, dependable execution, and a
              commitment to getting every load where it needs to be — safely,
              efficiently, and on schedule.
            </p>
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
              <p className="label">Operates in</p>
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
      </div>
    </section>
  );
}
