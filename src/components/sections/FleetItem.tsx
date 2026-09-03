import Image from "next/image";
import type { FleetItem as FleetItemType } from "@/data/fleet";

export function FleetItem({ item }: { item: FleetItemType }) {
  return (
    <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-offwhite">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {item.photoStatus === "placeholder" ? (
          <p className="absolute bottom-4 left-4 label bg-ink/70 text-white px-3 py-2">
            [ADD TRUCK PHOTOS]
          </p>
        ) : null}
      </div>
      <dl className="lg:col-span-4 space-y-6">
        <div>
          <dt className="label">Vehicle type</dt>
          <dd className="mt-2 font-heading font-extrabold text-2xl tracking-tight">{item.type}</dd>
        </div>
        <div>
          <dt className="label">Trailer</dt>
          <dd className="mt-2 text-muted">{item.trailer}</dd>
        </div>
        <div>
          <dt className="label">Load capacity</dt>
          <dd className="mt-2 text-muted">{item.capacity}</dd>
        </div>
        <div>
          <dt className="label">Use</dt>
          <dd className="mt-2 text-muted">{item.use}</dd>
        </div>
      </dl>
    </article>
  );
}
