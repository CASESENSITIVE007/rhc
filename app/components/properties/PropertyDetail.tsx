"use client";

import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  AMENITY_LABELS,
  PROPERTIES,
  galleryPhotos,
  priceInRupees,
  pricePerSqft,
  type Property,
} from "../../data/properties";
import { useIntroDone } from "../useIntroDone";
import Gallery from "./Gallery";
import Icon, { AMENITY_ICONS, type IconName } from "./Icon";
import LocationMap from "./LocationMap";
import PropertyCard, { SaveButton } from "./PropertyCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: EASE },
} as const;

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = Math.round(v).toLocaleString("en-IN");
      },
    });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref}>{value.toLocaleString("en-IN")}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="overflow-hidden pb-1 font-serif text-[28px] leading-tight text-[#0a1f3d] sm:text-[32px]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        {children}
      </motion.span>
    </h2>
  );
}

function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard blocked — nothing to do.
    }
  };
  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={share}
        whileTap={{ scale: 0.88 }}
        aria-label={`Share ${name}`}
        className="grid h-10 w-10 place-items-center rounded-full border border-[#0a1f3d]/15 bg-white text-[#0a1f3d] transition-colors hover:border-[#0a1f3d]"
      >
        <Icon name="share" className="h-[18px] w-[18px]" />
      </motion.button>
      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute right-0 top-12 whitespace-nowrap rounded-full bg-[#0a1f3d] px-3 py-1.5 text-xs font-medium text-white"
          >
            Link copied
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function priceBadge(base: Property, other: Property) {
  const ratio = priceInRupees(other.price) / priceInRupees(base.price);
  if (ratio < 0.8) return "Lower budget";
  if (ratio > 1.25) return "Premium pick";
  return "Similar price";
}

export default function PropertyDetail({ property }: { property: Property }) {
  const ready = useIntroDone();
  const photos = galleryPhotos(property);
  const locality = property.location.split(",")[0];

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const similar = PROPERTIES.filter((p) => p.id !== property.id)
    .sort(
      (a, b) =>
        Math.abs(priceInRupees(a.price) - priceInRupees(property.price)) -
        Math.abs(priceInRupees(b.price) - priceInRupees(property.price)),
    )
    .slice(0, 3);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  const highlights: { icon: IconName; value: number; label: string }[] = [
    { icon: "bed", value: property.bedrooms, label: "Bedrooms" },
    { icon: "bath", value: property.bathrooms, label: "Bathrooms" },
    { icon: "area", value: property.area, label: "Sq. ft" },
    { icon: "car", value: property.parking, label: "Parking" },
  ];

  const details: [string, string][] = [
    ["Type", property.type],
    ["Area", `${property.area.toLocaleString("en-IN")} sq.ft`],
    ["Bedrooms", String(property.bedrooms)],
    ["Bathrooms", String(property.bathrooms)],
    ["Parking", `${property.parking} car${property.parking === 1 ? "" : "s"}`],
    ["Facing", property.facing],
    ["Furnishing", property.furnishing],
    ["Location", property.location],
  ];

  return (
    <main className="relative isolate flex-1 overflow-x-clip bg-[#f7f5f2] pb-36 pt-28 sm:pt-36 lg:pb-28">
      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-[#0b6fb8] to-[#7cc4ff]"
        style={{ scaleX: progress }}
      />

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#0b6fb8]/10 blur-[140px]" />
        <div className="absolute -right-40 top-[60%] h-[460px] w-[460px] rounded-full bg-[#7cc4ff]/15 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* Breadcrumb */}
        <motion.nav
          {...enter(0)}
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs text-slate-500"
        >
          <Link href="/" className="transition-colors hover:text-[#0a1f3d]">
            Home
          </Link>
          <Icon name="chevron" className="h-3 w-3 shrink-0" />
          <Link
            href="/properties"
            className="transition-colors hover:text-[#0a1f3d]"
          >
            Featured properties
          </Link>
          <Icon name="chevron" className="h-3 w-3 shrink-0" />
          <span className="truncate font-medium text-[#0a1f3d]">
            {property.name}
          </span>
        </motion.nav>

        <Gallery photos={photos} name={property.name} ready={ready} />

        {/* Title + price */}
        <div className="mt-8 flex flex-col gap-6 sm:mt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div {...enter(0.35)} className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#0b6fb8]/10 px-3 py-1 text-xs font-semibold text-[#0b6fb8]">
                {property.type}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {property.status}
              </span>
            </motion.div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-[#0a1f3d] sm:text-5xl">
              {property.name.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pb-1 align-bottom"
                >
                  <motion.span
                    className="inline-block pr-[0.25em]"
                    initial={{ y: "110%" }}
                    animate={{ y: ready ? "0%" : "110%" }}
                    transition={{
                      duration: 1.05,
                      ease: EASE,
                      delay: ready ? 0.4 + i * 0.07 : 0,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              {...enter(0.55)}
              className="mt-3 flex items-center gap-1.5 text-[15px] text-slate-500"
            >
              <Icon name="pin" className="h-4 w-4 text-[#0b6fb8]" />
              {property.location}
            </motion.p>
          </div>

          <motion.div
            {...enter(0.6)}
            className="flex items-end justify-between gap-6 md:flex-col md:items-end md:gap-4"
          >
            <div className="md:text-right">
              <p className="bg-gradient-to-r from-[#0a1f3d] to-[#0b6fb8] bg-clip-text font-serif text-4xl text-transparent sm:text-5xl">
                {property.price}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Est. ₹{pricePerSqft(property).toLocaleString("en-IN")}/sq.ft
              </p>
            </div>
            <div className="flex gap-2">
              <SaveButton
                name={property.name}
                className="border-[#0a1f3d]/15 bg-white text-[#0a1f3d] hover:border-[#0a1f3d]"
              />
              <ShareButton name={property.name} />
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-[0_14px_34px_-26px_rgba(10,31,61,0.5)] ring-1 ring-[#0a1f3d]/[0.06] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_44px_-26px_rgba(11,111,184,0.55)] sm:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6fb8]/12 to-[#7cc4ff]/20 text-[#0b6fb8] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                <Icon name={h.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xl font-semibold text-[#0a1f3d]">
                  <CountUp value={h.value} />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                  {h.label}
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Body + sticky details */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div className="flex flex-col gap-14">
            <section>
              <SectionTitle>About this home</SectionTitle>
              <motion.p
                {...reveal}
                className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-slate-600"
              >
                {property.description}
              </motion.p>
            </section>

            <section>
              <SectionTitle>Amenities</SectionTitle>
              <motion.ul
                className="mt-6 grid gap-x-6 gap-y-1 rounded-[28px] bg-white p-4 shadow-[0_18px_40px_-30px_rgba(10,31,61,0.45)] ring-1 ring-[#0a1f3d]/[0.06] sm:grid-cols-2 sm:p-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              >
                {property.amenities.map((a) => (
                  <motion.li
                    key={a}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: EASE },
                      },
                    }}
                    className="group flex items-center gap-3 rounded-2xl px-2 py-3 text-[15px] text-[#0a1f3d] transition-colors duration-300 hover:bg-[#f4f7fc]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f4f7fc] text-[#0b6fb8] transition-colors duration-300 group-hover:bg-[#0b6fb8] group-hover:text-white">
                      <Icon name={AMENITY_ICONS[a]} className="h-[18px] w-[18px]" />
                    </span>
                    {AMENITY_LABELS[a]}
                  </motion.li>
                ))}
              </motion.ul>
            </section>
          </div>

          <aside>
            <motion.div
              {...reveal}
              className="rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-34px_rgba(10,31,61,0.5)] ring-1 ring-[#0a1f3d]/[0.06] lg:sticky lg:top-28"
            >
              <h2 className="font-serif text-2xl text-[#0a1f3d]">
                Property details
              </h2>
              <dl className="mt-4 divide-y divide-[#0a1f3d]/[0.07]">
                {details.map(([label, value], i) => (
                  <motion.div
                    key={label}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="text-right font-semibold text-[#0a1f3d]">
                      {value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] py-3.5 text-sm font-medium text-white shadow-[0_14px_30px_-14px_rgba(10,31,61,0.9)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                  <Icon name="calendar" className="relative h-4 w-4" />
                  <span className="relative">Schedule a site visit</span>
                  <Icon
                    name="arrow"
                    strokeWidth={2}
                    className="relative h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-[#0b6fb8] transition-colors hover:bg-[#0b6fb8]/[0.06]"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Contact seller
                </Link>
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Icon name="shield" className="h-3.5 w-3.5 text-emerald-600" />
                Verified listing · documents checked by RHC
              </p>
            </motion.div>
          </aside>
        </div>

        {/* Location */}
        <section className="mt-20">
          <SectionTitle>Location</SectionTitle>
          <motion.p {...reveal} className="mt-2 text-slate-500">
            What’s close to {locality}.
          </motion.p>
          <motion.div {...reveal} className="mt-6">
            <LocationMap property={property} />
          </motion.div>
        </section>

        {/* More like this */}
        <section className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle>More properties like this</SectionTitle>
            <motion.div {...reveal}>
              <Link
                href="/properties"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-[#0a1f3d] px-6 text-sm font-medium text-[#0a1f3d]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#0a1f3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="relative transition-colors duration-500 group-hover:text-white">
                  View more
                </span>
                <Icon
                  name="arrow"
                  strokeWidth={2}
                  className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            </motion.div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => (
              <PropertyCard
                key={p.id}
                property={p}
                index={i}
                badge={priceBadge(property, p)}
                className={i === 2 ? "sm:hidden lg:block" : ""}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Mobile booking bar */}
      <motion.div
        className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-4 rounded-full bg-white/90 py-2 pl-6 pr-2 shadow-[0_20px_50px_-20px_rgba(10,31,61,0.6)] ring-1 ring-[#0a1f3d]/[0.08] backdrop-blur-xl lg:hidden"
        initial={{ y: 120 }}
        animate={{ y: ready ? 0 : 120 }}
        transition={{ duration: 0.9, ease: EASE, delay: ready ? 1 : 0 }}
      >
        <div>
          <p className="font-serif text-xl leading-none text-[#0a1f3d]">
            {property.price}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            {property.bedrooms} BHK · {property.area.toLocaleString("en-IN")} sq.ft
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] px-5 text-sm font-medium text-white"
        >
          <Icon name="calendar" className="h-4 w-4" />
          Book a visit
        </Link>
      </motion.div>
    </main>
  );
}
