import { operatedRoutes, routeNarrative } from "@/data/routes";

export function RouteMap() {
  return (
    <section id="routes" className="bg-offwhite py-20 md:py-28">
      <div className="site-grid">
        <p className="label text-ochre">{routeNarrative.eyebrow}</p>
        <h2 className="display text-[clamp(2.2rem,5.2vw,4.4rem)] mt-4 max-w-4xl">
          {routeNarrative.heading}
          <br />
          {routeNarrative.headingLine2}
        </h2>
        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {operatedRoutes.map((route) => (
            <li key={route.id} className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight">
              {route.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
