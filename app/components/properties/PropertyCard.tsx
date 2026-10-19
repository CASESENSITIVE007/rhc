"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { coverPhoto, type Property } from "../../data/properties";
import Icon, { type IconName } from "./Icon";
import PhotoImage from "./PhotoImage";

const EASE = [0.22, 1, 0.36, 1] as const;

function Stat({
  icon,
  value,
  label,
}: {
  icon: IconName;
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

export function SaveButton({
  name,
  className = "absolute right-3 top-3 border-white/30 bg-white/20 text-white backdrop-blur-md hover:bg-white/35",
}: {
  name: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setSaved((s) => !s)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      whileTap={{ scale: 0.85 }}
      className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${className}`}
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

export default function PropertyCard({
  property,
  index = 0,
  badge,
  className = "",
}: {
  property: Property;
  index?: number;
  /** Small label over the photo, e.g. "Similar price". */
  badge?: string;
  className?: string;
}) {
  const href = `/properties/${property.id}`;
  return (
    <motion.div
      className={className}
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
        <Link
          href={href}
          aria-label={`View ${property.name}`}
          className="relative block aspect-[4/3.5] overflow-hidden rounded-[22px]"
        >
          <PhotoImage
            photo={coverPhoto(property)}
            alt={property.name}
            sizes="(min-width: 640px) 400px, 84vw"
            className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/85 via-[#06142b]/10 to-transparent" />
          {/* Light sweep */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] transition-transform duration-[1.2s] group-hover:translate-x-full" />

          {badge && (
            <span className="absolute left-3 top-3 rounded-full bg-[#0a1f3d]/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
              {badge}
            </span>
          )}

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
        </Link>
        <SaveButton name={property.name} />

        {/* Details */}
        <div className="flex flex-1 flex-col px-2.5 pb-1.5 pt-5">
          <h3 className="font-serif text-[22px] leading-tight text-[#0a1f3d]">
            <Link href={href}>{property.name}</Link>
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

          <div className="mt-auto flex flex-col gap-2 pt-5">
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
              href={href}
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
