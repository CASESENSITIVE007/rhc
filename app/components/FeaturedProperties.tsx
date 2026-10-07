"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FEATURED_PROPERTIES, type Property } from "../data/properties";

const EASE = [0.22, 1, 0.36, 1] as const;
const CARD_GAP = 24;

// Until real photos are added, cards show crops of the hero building.
const PLACEHOLDER_IMAGE = "/hero_image.png";
const PLACEHOLDER_CROPS = [
  "86% 45%",
  "100% 30%",
  "78% 70%",
  "94% 60%",
  "82% 35%",
  "100% 75%",
];

const icons = {
  pin: (
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  ),
  bed: (
    <path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 15h18M6 9V6.5h4.5V9m3 0V6.5H18V9M3 18v1.5M21 18v1.5" />
  ),
  bath: (
    <path d="M4 12h16v2.5A4.5 4.5 0 0 1 15.5 19h-7A4.5 4.5 0 0 1 4 14.5V12Zm2 0V6a2 2 0 0 1 3.7-1M8 19l-1 2m10-2 1 2" />
  ),
  car: (
    <path d="M5 16.5V11l2-4.5h10l2 4.5v5.5M5 16.5h14M5 16.5v2m14-2v2M5 11h14m-11 2.8h.01m7.99 0h.01" />
  ),
  area: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
};

function Icon({
  name,
  className = "h-4 w-4",
  strokeWidth = 1.7,
}: {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icons[name]}
    </svg>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: keyof typeof icons;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 py-1">
      <span className="flex items-center gap-1.5 text-[15px] font-semibold text-[#0a1f3d]">
        <Icon name={icon} className="h-4 w-4 text-[#0b6fb8]" />
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

function SaveButton({ name }: { name: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setSaved((s) => !s)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      whileTap={{ scale: 0.85 }}
      className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/35"
    >
      <motion.span
        key={String(saved)}
        initial={{ scale: saved ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
          <path
            d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z"
            fill={saved ? "#ff5a6e" : "none"}
            stroke={saved ? "#ff5a6e" : "currentColor"}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.button>
  );
}

function PropertyCard({
  property,
  index,
}: {
  property: Property;
  index: number;
}) {
  return (
    <motion.div
      className="w-[84vw] max-w-[330px] shrink-0 snap-start sm:w-[330px]"
      initial={{ opacity: 0, y: 50, scale: 0.96, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        ease: EASE,
        delay: Math.min(index, 4) * 0.12,
      }}
    >
      <article className="group relative flex h-full flex-col rounded-[28px] bg-white p-2.5 shadow-[0_1px_2px_rgba(10,31,61,0.04),0_18px_40px_-22px_rgba(10,31,61,0.35)] ring-1 ring-[#0a1f3d]/[0.06] transition-[transform,box-shadow,--tw-ring-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:ring-[#0b6fb8]/30 hover:shadow-[0_1px_2px_rgba(10,31,61,0.04),0_40px_70px_-30px_rgba(11,111,184,0.55)]">
        {/* Image */}
        <div className="relative aspect-[4/3.5] overflow-hidden rounded-[22px]">
          <Image
            src={property.image ?? PLACEHOLDER_IMAGE}
            alt={property.name}
            fill
            sizes="330px"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={
              property.image
                ? undefined
                : {
                    objectPosition:
                      PLACEHOLDER_CROPS[index % PLACEHOLDER_CROPS.length],
                  }
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/85 via-[#06142b]/10 to-transparent" />
          {/* Light sweep */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] transition-transform duration-[1.2s] group-hover:translate-x-full" />

          <SaveButton name={property.name} />

          {/* Price + area over the photo */}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <p className="text-2xl font-semibold tracking-tight text-white">
              {property.price}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <Icon name="area" className="h-3.5 w-3.5" />
              {property.area.toLocaleString("en-IN")} sq.ft
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col px-2.5 pb-1.5 pt-5">
          <h3 className="font-serif text-[22px] leading-tight text-[#0a1f3d]">
            {property.name}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-slate-500">
            <Icon name="pin" className="h-3.5 w-3.5 text-[#0b6fb8]" />
            {property.location}
          </p>

          <div className="mt-5 flex items-stretch divide-x divide-[#0a1f3d]/[0.07] rounded-2xl bg-[#f4f7fc] py-2.5">
            <Stat
              icon="bed"
              value={property.bedrooms}
              label={property.bedrooms === 1 ? "Bed" : "Beds"}
            />
            <Stat
              icon="bath"
              value={property.bathrooms}
              label={property.bathrooms === 1 ? "Bath" : "Baths"}
            />
            <Stat icon="car" value={property.parking} label="Parking" />
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Link
              href="/contact"
              className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] py-3 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(10,31,61,0.9)] transition-shadow duration-500 hover:shadow-[0_14px_30px_-12px_rgba(11,111,184,0.9)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative">Contact seller</span>
              <Icon
                name="arrow"
                strokeWidth={2}
                className="relative h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1"
              />
            </Link>
            <Link
              href={`#property-${property.id}`}
              className="rounded-full border border-[#0a1f3d]/15 py-3 text-center text-sm font-medium text-[#0a1f3d] transition-colors duration-300 hover:border-[#0a1f3d] hover:bg-[#0a1f3d]/[0.03]"
            >
              View details
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

function ArrowButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "next" ? "Next properties" : "Previous properties"}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      className="grid h-12 w-12 place-items-center rounded-full border border-[#0a1f3d]/15 bg-white text-[#0a1f3d] shadow-[0_6px_18px_-10px_rgba(10,31,61,0.5)] transition-all duration-300 hover:border-[#0a1f3d] hover:bg-[#0a1f3d] hover:text-white disabled:pointer-events-none disabled:opacity-35"
    >
      <Icon
        name="arrow"
        strokeWidth={2}
        className={`h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`}
      />
    </motion.button>
  );
}

export default function FeaturedProperties() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({
      left: dir * (card.offsetWidth + CARD_GAP),
      behavior: "smooth",
    });
  };

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
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="overflow-hidden pb-1 font-serif text-4xl leading-[1.1] text-[#0a1f3d] sm:text-5xl">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
                Featured{" "}
                <em className="bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent">
                  Properties
                </em>
              </motion.span>
            </h2>
            <motion.p
              className="mt-4 text-base text-slate-500 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
              A curated selection of homes, chosen for location, craft and
              value.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          >
            <div className="hidden items-center gap-3 sm:flex">
              <ArrowButton
                dir="prev"
                disabled={!canPrev}
                onClick={() => scrollByCard(-1)}
              />
              <ArrowButton
                dir="next"
                disabled={!canNext}
                onClick={() => scrollByCard(1)}
              />
            </div>
            <Link
              href="#projects"
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

        {/* Carousel — aligned with the content on the left, bleeds to the
            screen edge on the right */}
        <div
          ref={trackRef}
          className="-ml-5 mr-[calc(50%-50vw)] mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-6 overflow-x-auto pb-10 pl-5 pt-3 [scrollbar-width:none] sm:-ml-3 sm:scroll-pl-3 sm:pl-3 [&::-webkit-scrollbar]:hidden"
        >
          {FEATURED_PROPERTIES.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
          <div aria-hidden className="w-px shrink-0 sm:w-10" />
        </div>
      </div>
    </section>
  );
}
