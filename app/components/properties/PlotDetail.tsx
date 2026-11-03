"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import {
  galleryPhotos,
  plotRate,
  roadWidth,
  similarPlots,
  type Plot,
} from "../../data/properties";
import { useIntroDone } from "../useIntroDone";
import Gallery from "./Gallery";
import Icon, { type IconName } from "./Icon";
import LocationMap from "./LocationMap";
import PlotCard from "./PlotCard";
import { CountUp, SectionTitle, ShareButton, reveal } from "./PropertyDetail";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PlotDetail({ plot }: { plot: Plot }) {
  const ready = useIntroDone();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const similar = similarPlots(plot).slice(0, 3);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  const amenities: { icon: IconName; label: string; available: boolean }[] = [
    { icon: "bolt", label: "Power backup", available: plot.powerBackup },
    { icon: "shield", label: "24/7 security", available: plot.security },
    { icon: "drop", label: "Water supply", available: plot.waterSupply },
    { icon: "leaf", label: "Park", available: plot.park },
  ];

  // Only rows the sheet has a value for.
  const details = (
    [
      ["Branch", plot.branch],
      ["Type", plot.type],
      ["Area", `${plot.area.toLocaleString("en-IN")} sq ft`],
      ["Rate", plotRate(plot)],
      ["Road", plot.road],
      ["Facing", plot.facing],
      ["Address", plot.address],
    ] as [string, string][]
  ).filter(([, value]) => value);

  return (
    <main className="relative isolate flex-1 overflow-x-clip bg-[#f7f5f2] pb-36 pt-28 sm:pt-36 lg:pb-28">
      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-[#0b6fb8] to-[#7cc4ff]"
        style={{ scaleX: progress }}
      />

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
          <Link href="/properties" className="transition-colors hover:text-[#0a1f3d]">
            Plots
          </Link>
          <Icon name="chevron" className="h-3 w-3 shrink-0" />
          <span className="truncate font-medium text-[#0a1f3d]">{plot.name}</span>
        </motion.nav>

        <Gallery photos={galleryPhotos(plot)} name={plot.name} ready={ready} />

        {/* Title + rate */}
        <div className="mt-8 flex flex-col gap-6 sm:mt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div {...enter(0.35)} className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#0b6fb8]/10 px-3 py-1 text-xs font-semibold text-[#0b6fb8]">
                {plot.type}
              </span>
              <span className="rounded-full bg-[#0a1f3d]/[0.06] px-3 py-1 text-xs font-semibold text-[#0a1f3d]">
                {plot.branch} branch
              </span>
            </motion.div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-[#0a1f3d] sm:text-5xl">
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: ready ? "0%" : "110%" }}
                  transition={{ duration: 1.05, ease: EASE, delay: ready ? 0.4 : 0 }}
                >
                  {plot.name}
                </motion.span>
              </span>
            </h1>
            <motion.p
              {...enter(0.55)}
              className="mt-3 flex items-start gap-1.5 text-[15px] text-slate-500"
            >
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6fb8]" />
              {plot.address}
            </motion.p>
          </div>

          <motion.div
            {...enter(0.6)}
            className="flex items-end justify-between gap-6 md:flex-col md:items-end md:gap-4"
          >
            <div className="md:text-right">
              <p className="bg-gradient-to-r from-[#0a1f3d] to-[#0b6fb8] bg-clip-text font-serif text-4xl text-transparent sm:text-5xl">
                {plotRate(plot)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Site area {plot.area.toLocaleString("en-IN")} sq ft
              </p>
            </div>
            <div className="flex gap-2">
              <ShareButton name={plot.name} />
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              { icon: "area", value: <CountUp value={Math.round(plot.area)} />, label: "Sq ft" },
              { icon: "car", value: roadWidth(plot) || "—", label: "Road" },
              { icon: "compass", value: plot.facing || "—", label: "Facing" },
              { icon: "home", value: plot.branch, label: "Branch" },
            ] as { icon: IconName; value: React.ReactNode; label: string }[]
          ).map((h, i) => (
            <motion.div
              key={h.label}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-[0_14px_34px_-26px_rgba(10,31,61,0.5)] ring-1 ring-[#0a1f3d]/[0.06] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_44px_-26px_rgba(11,111,184,0.55)] sm:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0b6fb8]/12 to-[#7cc4ff]/20 text-[#0b6fb8] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                <Icon name={h.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xl font-semibold text-[#0a1f3d]">{h.value}</span>
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
              <SectionTitle>About this site</SectionTitle>
              <motion.p
                {...reveal}
                className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-slate-600"
              >
                {plot.type} at {plot.address}
                {plot.road && <>, on a {plot.road.toLowerCase()}</>}
                {plot.facing && <>, {plot.facing.toLowerCase()} facing</>}. The site covers{" "}
                {plot.area.toLocaleString("en-IN")} sq ft and is offered at {plotRate(plot)}. Our{" "}
                {plot.branch} branch handles this site — book a visit and we’ll walk you through
                the site and its papers.
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
                {amenities.map((a) => (
                  <motion.li
                    key={a.label}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className={`flex items-center gap-3 rounded-2xl px-2 py-3 text-[15px] ${
                      a.available ? "text-[#0a1f3d]" : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                        a.available ? "bg-[#f4f7fc] text-[#0b6fb8]" : "bg-slate-100 text-slate-300"
                      }`}
                    >
                      <Icon name={a.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex-1">{a.label}</span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full ${
                        a.available ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 text-slate-400"
                      }`}
                      aria-label={a.available ? "Available" : "Not available"}
                    >
                      <Icon name={a.available ? "check" : "close"} strokeWidth={2.2} className="h-3.5 w-3.5" />
                    </span>
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
              <h2 className="font-serif text-2xl text-[#0a1f3d]">Site details</h2>
              <dl className="mt-4 divide-y divide-[#0a1f3d]/[0.07]">
                {details.map(([label, value], i) => (
                  <motion.div
                    key={label}
                    className="flex items-start justify-between gap-4 py-3 text-sm"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="text-right font-semibold text-[#0a1f3d]">{value}</dd>
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
            </motion.div>
          </aside>
        </div>

        {/* Location */}
        <section className="mt-20">
          <SectionTitle>Location</SectionTitle>
          <motion.div {...reveal} className="mt-6">
            <LocationMap
              property={{
                name: plot.name,
                location: plot.address,
                coordinates: plot.coordinates,
                mapEmbedUrl: plot.mapEmbedUrl,
              }}
            />
          </motion.div>
        </section>

        {/* More plots */}
        {similar.length > 0 && (
          <section className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionTitle>More plots like this</SectionTitle>
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
                <PlotCard
                  key={p.id}
                  plot={p}
                  index={i}
                  className={i === 2 ? "sm:hidden lg:block" : ""}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile booking bar */}
      <motion.div
        className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-4 rounded-full bg-white/90 py-2 pl-6 pr-2 shadow-[0_20px_50px_-20px_rgba(10,31,61,0.6)] ring-1 ring-[#0a1f3d]/[0.08] backdrop-blur-xl lg:hidden"
        initial={{ y: 120 }}
        animate={{ y: ready ? 0 : 120 }}
        transition={{ duration: 0.9, ease: EASE, delay: ready ? 1 : 0 }}
      >
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-none text-[#0a1f3d]">{plotRate(plot)}</p>
          <p className="mt-1 truncate text-[11px] text-slate-500">
            {plot.area.toLocaleString("en-IN")} sq ft · {plot.branch}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] px-5 text-sm font-medium text-white"
        >
          <Icon name="calendar" className="h-4 w-4" />
          Book a visit
        </Link>
      </motion.div>
    </main>
  );
}
