import { fleet, fleetIntro } from "@/data/fleet";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FleetItem } from "@/components/sections/FleetItem";

export function FleetSection() {
  return (
    <section id="fleet" className="bg-offwhite py-24 md:py-32">
      <div className="site-grid">
        <SectionHeading eyebrow="Fleet" title={fleetIntro.heading} />
        <p className="lede mt-8">{fleetIntro.body}</p>
        <div className="mt-16 space-y-20">
          {fleet.map((item) => (
            <FleetItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
