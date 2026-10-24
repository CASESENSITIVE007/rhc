import { PROPERTIES } from "../data/properties";
import PropertyCard from "./properties/PropertyCard";
import PropertyRail, { RAIL_CARD } from "./properties/PropertyRail";

export default function FeaturedProperties() {
  return (
    <section
      id="featured"
      className="relative isolate overflow-x-clip bg-[#f6f8fc] py-24 sm:py-32"
    >
      {/* Ambient brand glow + faint blueprint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#0b6fb8]/15 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#7cc4ff]/20 blur-[110px]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(10,31,61,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(10,31,61,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <PropertyRail
          title={
            <>
              Featured{" "}
              <em className="bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent">
                Properties
              </em>
            </>
          }
          subtitle="A curated selection of homes, chosen for location, craft and value."
        >
          {PROPERTIES.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} className={RAIL_CARD} />
          ))}
        </PropertyRail>
      </div>
    </section>
  );
}
