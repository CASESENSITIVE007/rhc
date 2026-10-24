"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { coverPhoto, rentalYield, type Property } from "../../data/properties";
import Icon from "./Icon";
import PhotoImage from "./PhotoImage";
import { SaveButton } from "./PropertyCard";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function InvestmentCard({
  property,
  index = 0,
  className = "",
}: {
  property: Property;
  index?: number;
  className?: string;
}) {
  const href = `/properties/${property.id}`;
  const yieldPct = rentalYield(property);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay: Math.min(index, 4) * 0.12 }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/50 via-transparent to-transparent" />
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] transition-transform duration-[1.2s] group-hover:translate-x-full" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {property.status}
          </span>
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

          {/* Returns */}
          <div className="mt-5 flex items-end justify-between rounded-2xl bg-gradient-to-br from-[#f4f7fc] to-[#e9f2fb] px-4 py-3.5 ring-1 ring-[#0b6fb8]/10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Rental yield
              </p>
              <p className="mt-1 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                {yieldPct.toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Est. rent
              </p>
              <p className="mt-1 text-[15px] font-semibold text-[#0a1f3d]">
                ₹{property.rent.toLocaleString("en-IN")}
                <span className="text-xs font-medium text-slate-400">/mo</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-baseline justify-between">
            <p className="text-2xl font-semibold tracking-tight text-[#0a1f3d]">
              {property.price}
            </p>
            <p className="flex items-center gap-1.5 text-[13px] text-slate-500">
              <Icon name="area" className="h-3.5 w-3.5 text-[#0b6fb8]" />
              {property.area.toLocaleString("en-IN")} sq.ft
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-5">
            <Link
              href="/contact"
              className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] py-3 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(10,31,61,0.9)] transition-shadow duration-500 hover:shadow-[0_14px_30px_-12px_rgba(11,111,184,0.9)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
              <span className="relative">Enquire to invest</span>
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
              View investment details
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
