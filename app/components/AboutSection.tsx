"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import React, { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Luxury developer stats echoing DLF / Oberoi Realty / Godrej Properties
const STATS = [
  {
    value: "15+",
    unit: "Years",
    label: "Legacy of Trust in Purvanchal",
    desc: "Unbroken record of integrity and deep-rooted local expertise.",
  },
  {
    value: "100%",
    unit: "Clear",
    label: "Verified & Vetted Documents",
    desc: "Zero compromise on title scrutiny, legal clearance and paperwork.",
  },
  {
    value: "3,500+",
    unit: "Clients",
    label: "Families & Investors Guided",
    desc: "Delivering lifetime sanctuaries and high-appreciation land parcels.",
  },
  {
    value: "₹750+",
    unit: "Cr",
    label: "Property Value Facilitated",
    desc: "Encompassing prime Varanasi belts, highways and riverfront enclaves.",
  },
];

// The 4 Core Pillars of RHC World
const PILLARS = [
  {
    no: "01",
    title: "Verified Properties",
    summary: "Rigorous Due Diligence",
    text: "Every property in our portfolio undergoes exhaustive legal scrutiny, title verification, and local registry cross-checks before being presented.",
    badge: "100% Legal Scrutiny",
    paths: [
      "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z",
      "M9 12l2 2 4-4",
    ],
  },
  {
    no: "02",
    title: "Local Expertise",
    summary: "Heritage Mastery",
    text: "Deep, generational understanding of Kashi, Gangetic corridors, and the surging Purvanchal infrastructure belt ensures astute decision-making.",
    badge: "Varanasi & Purvanchal",
    paths: [
      "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z",
      "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    ],
  },
  {
    no: "03",
    title: "Transparent Process",
    summary: "Uncompromising Honesty",
    text: "Crystal-clear documentation, zero hidden clauses, transparent pricing benchmarks, and complete visibility from first inquiry to registry handover.",
    badge: "Zero Ambiguity",
    paths: [
      "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z",
      "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    ],
  },
  {
    no: "04",
    title: "Personal Assistance",
    summary: "End-to-End Concierge",
    text: "Dedicated personal advisory team walking with you through private site visits, financial structuring, drone surveys, and post-purchase support.",
    badge: "Bespoke Guidance",
    paths: [
      "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
      "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6",
      "M16 4.5a3.5 3.5 0 0 1 0 6.5",
      "M18 14.5c2 .8 3 2.8 3 5.5",
    ],
  },
];

// Strategic Growth Corridors (DLF / Godrej style showcase)
const CORRIDORS = [
  {
    tag: "Heritage & Riverside",
    title: "Timeless Ganges Enclaves",
    description:
      "Exclusive waterfront and city-centre parcels in Varanasi, blending cultural prestige with lasting generational value.",
    accent: "from-[#0b6fb8] to-[#1f4e8c]",
  },
  {
    tag: "High-Growth Expansion",
    title: "Ring Road & Airport Belts",
    description:
      "Rapidly developing transit-oriented corridors connecting Babatpur International Airport to arterial Purvanchal expressways.",
    accent: "from-[#2c5fa8] to-[#0b6fb8]",
  },
  {
    tag: "Commercial & Mixed-Use",
    title: "Industrial & Retail Corridors",
    description:
      "High-yield development land, logistics spaces, and premium retail plots primed for substantial long-term returns.",
    accent: "from-[#0d3b73] to-[#2c5fa8]",
  },
];

function fadeUp(delay = 0, y = 32) {
  return {
    initial: { opacity: 0, y, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, ease: EASE, delay },
  };
}

export default function AboutSection({
  isStandalone = false,
}: {
  isStandalone?: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const [activePillar, setActivePillar] = useState<number | null>(null);

  // Spotlight mouse effect for cards without extra re-renders
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#f7f9fd] via-white to-[#eaf0fa] text-[#0a1f3d] scroll-mt-20"
    >
      {/* ── Background Architectural Ambiance (Blueprint & Glows) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Soft atmospheric radial gradients */}
        <div className="absolute -left-48 top-20 h-[560px] w-[560px] rounded-full bg-[#0b6fb8]/10 blur-[130px]" />
        <div className="absolute -right-48 top-[35%] h-[600px] w-[600px] rounded-full bg-[#7cc4ff]/15 blur-[140px]" />
        <div className="absolute left-1/3 bottom-20 h-[500px] w-[500px] rounded-full bg-[#0d3b73]/5 blur-[120px]" />

        {/* Delicate Blueprint Architectural Grid */}
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(11,111,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(11,111,184,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

        {/* Faint watermark building silhouette */}
        <div className="absolute right-0 top-1/4 h-[700px] w-[550px] bg-gradient-to-t from-[#0b6fb8] to-transparent opacity-[0.035] [mask-image:url(/whyChooseBackground.png)] [mask-position:right_center] [mask-repeat:no-repeat] [mask-size:contain]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ── Section 1: Hero Editorial Header ── */}
        <div
          className={`mx-auto max-w-4xl text-center ${
            isStandalone ? "pt-36 sm:pt-44 pb-16" : "pt-24 sm:pt-32 pb-16"
          }`}
        >
          {/* Eyebrow badge */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#0b6fb8]/20 bg-white/80 px-4 py-1.5 shadow-[0_4px_16px_-4px_rgba(11,111,184,0.15)] backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0b6fb8] motion-safe:animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0b6fb8]">
              About RHC World • The Purvanchal Benchmark
            </span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            {...fadeUp(0.12)}
            className="mt-6 font-serif text-4xl leading-[1.12] text-[#06142b] sm:text-6xl lg:text-7xl"
          >
            Where landmarks{" "}
            <em className="italic bg-gradient-to-r from-[#0b6fb8] via-[#2c5fa8] to-[#0d3b73] bg-clip-text pr-1 font-serif text-transparent">
              begin.
            </em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.22)}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5b6b8a] sm:text-lg"
          >
            Rooted in Varanasi’s timeless heritage, RHC World redefines property
            acquisition across Kashi and Purvanchal with institutional rigor,
            meticulously verified listings, and generational wealth creation.
          </motion.p>

          {/* Hairline decorative motif */}
          <motion.div
            {...fadeUp(0.3)}
            className="mx-auto mt-8 flex items-center justify-center gap-3"
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#0b6fb8]/40" />
            <span className="h-2 w-2 rotate-45 border border-[#0b6fb8]/50" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#0b6fb8]/40" />
          </motion.div>
        </div>

        {/* ── Section 2: Developer Milestones / Signature Stats (DLF / Oberoi Style) ── */}
        <motion.div
          {...fadeUp(0.15)}
          className="relative mb-24 overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-8 shadow-[0_20px_50px_-20px_rgba(11,111,184,0.15)] backdrop-blur-xl sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative flex flex-col ${
                  i !== 0 ? "lg:border-l lg:border-[#0b6fb8]/15 lg:pl-10" : ""
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-semibold tracking-tight text-[#06142b] sm:text-5xl lg:text-6xl">
                    {stat.value}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#0b6fb8]">
                    {stat.unit}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold tracking-wide text-[#0d3b73] sm:text-base">
                  {stat.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5b6b8a]">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Section 3: The Narrative & Architectural Showcase ── */}
        <div className="mb-28 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Image with Double Frame & Floating Credential Badge */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative lg:col-span-6"
          >
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_60px_-18px_rgba(13,59,115,0.28)]">
              <Image
                src="/hero_image.png"
                alt="Modern luxury residence along Varanasi riverfront"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/60 via-transparent to-transparent opacity-60" />

              {/* Floating Architectural Ribbon Tag */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-[0_12px_30px_-8px_rgba(13,59,115,0.25)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0d3b73] to-[#0b6fb8] text-white shadow-md">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M3 21h18M5 21V7l8-4v18M13 10h3M13 14h3M13 18h3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b6fb8]">
                      Masterpiece Advisory
                    </p>
                    <p className="text-sm font-medium text-[#0a1f3d]">
                      Curated waterfront & arterial land holdings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent backdrop shadow ring */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[36px] border border-[#0b6fb8]/20 bg-[#0b6fb8]/5" />
          </motion.div>

          {/* Right: Editorial Narrative */}
          <motion.div
            {...fadeUp(0.25)}
            className="lg:col-span-6"
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0b6fb8]">
              <span className="h-px w-6 bg-[#0b6fb8]" />
              Our Story
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-[1.2] text-[#06142b] sm:text-4xl lg:text-5xl">
              Elevating Purvanchal’s property landscape with{" "}
              <em className="italic text-[#0b6fb8]">unyielding trust.</em>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#5b6b8a] sm:text-lg">
              RHC World was founded on a singular conviction: buying and investing
              in land in sacred Varanasi and the burgeoning Purvanchal corridor
              should be as clear, refined, and reassuring as world-class private
              banking.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#5b6b8a]">
              We unite deep ground-level heritage knowledge with progressive legal
              verification. Whether acquiring an ancestral estate near the Ganges,
              a commercial plot along the new Ring Road, or a private sanctuary
              residence, our advisory stays beside you through every boundary survey,
              clearance, and handover.
            </p>

            {/* Pull Quote Box */}
            <div className="mt-8 rounded-2xl border-l-4 border-[#0b6fb8] bg-white/70 p-5 shadow-sm backdrop-blur-sm">
              <p className="font-serif italic text-[#0d3b73] text-base sm:text-lg leading-snug">
                “A property is never merely concrete and boundaries — it is your
                family’s security, your legacy, and your enduring peace of mind.”
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#5b6b8a]">
                — The RHC World Advisory Council
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Section 4: Vision & Mission (Dual Architectural Glass Panes) ── */}
        <div className="mb-28 grid gap-8 lg:grid-cols-2">
          {/* Vision Card */}
          <motion.article
            {...fadeUp(0.1)}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/75 p-8 shadow-[0_20px_50px_-20px_rgba(13,59,115,0.2)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(11,111,184,0.3)] sm:p-10"
          >
            {/* Cursor spotlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(11,111,184,0.12), transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0b6fb8]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b6fb8]">
                  Vision
                </span>
                <span className="font-serif text-sm text-[#0a1f3d]/30">01</span>
              </div>

              <h3 className="mt-5 font-serif text-2xl text-[#06142b] sm:text-3xl">
                Shaping the skyline,{" "}
                <em className="italic text-[#0b6fb8]">preserving the soul.</em>
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#5b6b8a]">
                To establish Purvanchal as India’s most trusted and culturally
                harmonious luxury living and high-growth investment destination,
                where every landmark built honors the timeless spirit of Kashi.
              </p>

              <div className="mt-6 flex items-center gap-3 text-xs font-medium text-[#0d3b73]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0b6fb8]" />
                Institutional Standards • Generational Wealth
              </div>
            </div>
          </motion.article>

          {/* Mission Card */}
          <motion.article
            {...fadeUp(0.22)}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/75 p-8 shadow-[0_20px_50px_-20px_rgba(13,59,115,0.2)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(11,111,184,0.3)] sm:p-10"
          >
            {/* Cursor spotlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(11,111,184,0.12), transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d3b73]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0d3b73]">
                  Mission
                </span>
                <span className="font-serif text-sm text-[#0a1f3d]/30">02</span>
              </div>

              <h3 className="mt-5 font-serif text-2xl text-[#06142b] sm:text-3xl">
                Absolute clarity,{" "}
                <em className="italic text-[#0d3b73]">unquestioned legitimacy.</em>
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#5b6b8a]">
                To make property in Kashi and Purvanchal effortless to discover,
                absolute in authenticity, and seamless to acquire through 100%
                verified listings and uncompromising client advocacy.
              </p>

              <div className="mt-6 flex items-center gap-3 text-xs font-medium text-[#0d3b73]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d3b73]" />
                Zero Ambiguity • End-to-End Handholding
              </div>
            </div>
          </motion.article>
        </div>

        {/* ── Section 5: The Four Pillars of Excellence ── */}
        <div className="mb-28">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              {...fadeUp(0)}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b6fb8]"
            >
              The RHC Standard
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="mt-3 font-serif text-3xl text-[#06142b] sm:text-4xl lg:text-5xl"
            >
              Pillars of <em className="italic text-[#0b6fb8]">distinction.</em>
            </motion.h2>
            <motion.p
              {...fadeUp(0.2)}
              className="mt-4 text-sm leading-relaxed text-[#5b6b8a] sm:text-base"
            >
              Four uncompromised benchmarks that govern every listing, consultation,
              and transaction.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <motion.article
                key={pillar.no}
                {...fadeUp(0.1 + i * 0.1)}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setActivePillar(i)}
                onMouseLeave={() => setActivePillar(null)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-white/85 bg-white/70 p-7 shadow-[0_12px_36px_-16px_rgba(13,59,115,0.18)] backdrop-blur-xl transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(11,111,184,0.35)]"
              >
                {/* Spotlight hover effect */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(11,111,184,0.14), transparent 70%)",
                  }}
                />

                <div>
                  {/* Top row: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-light text-[#0b6fb8]/40 transition-colors duration-500 group-hover:text-[#0b6fb8]">
                      {pillar.no}
                    </span>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#eaf3fc] to-white ring-1 ring-[#0b6fb8]/15 transition-transform duration-500 group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-[#0d3b73] transition-colors duration-500 group-hover:text-[#0b6fb8]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {pillar.paths.map((p, idx) => (
                          <motion.path
                            key={idx}
                            d={p}
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              ease: "easeInOut",
                              delay: 0.2 + idx * 0.2,
                            }}
                          />
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Title & badge */}
                  <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#0b6fb8]">
                    {pillar.badge}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-[#06142b]">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5b6b8a]">
                    {pillar.text}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-[#0b6fb8]/10 flex items-center justify-between text-xs font-medium text-[#0d3b73]">
                  <span>{pillar.summary}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 text-[#0b6fb8] transition-transform duration-300 group-hover:translate-x-1"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Section 6: Growth Corridors (Godrej / Oberoi Style Territory Focus) ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-28 rounded-3xl border border-white/80 bg-gradient-to-br from-[#06142b] via-[#0a1f3d] to-[#0d3b73] p-8 text-white shadow-[0_24px_60px_-15px_rgba(6,20,43,0.5)] sm:p-12 lg:p-14"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7cc4ff]">
              Strategic Vision
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">
              Purvanchal’s premier{" "}
              <em className="italic bg-gradient-to-r from-[#7cc4ff] to-[#0b6fb8] bg-clip-text text-transparent">
                growth corridors.
              </em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Capitalizing on major infrastructure investments across Varanasi,
              including expressways, the international airport corridor, and the
              heritage riverfront.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {CORRIDORS.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp(0.15 + i * 0.12)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/25 hover:bg-white/[0.1]"
              >
                <div
                  className={`inline-block rounded-full bg-gradient-to-r ${c.accent} px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm`}
                >
                  {c.tag}
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium text-white group-hover:text-[#7cc4ff] transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
                  {c.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Section 7: Ultra-Refined Call to Action ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="mx-auto max-w-4xl pb-24 text-center"
        >
          <div className="rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_20px_50px_-20px_rgba(11,111,184,0.22)] backdrop-blur-xl sm:p-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#0b6fb8]">
              Your Next Landmark
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#06142b] sm:text-5xl">
              Let&apos;s find the place you&apos;ll call{" "}
              <em className="italic bg-gradient-to-r from-[#0b6fb8] to-[#0d3b73] bg-clip-text text-transparent">
                home.
              </em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#5b6b8a]">
              Connect with our private advisory team for exclusive site visits,
              custom land allocations, and verified portfolio consultations.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#0d3b73] via-[#0b6fb8] to-[#1f4e8c] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_26px_-8px_rgba(11,111,184,0.7)] transition-all duration-300 hover:shadow-[0_16px_34px_-8px_rgba(11,111,184,0.85)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative">Schedule Private Consultation</span>
                <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] transition-transform duration-700 group-hover:translate-x-full" />
                <svg viewBox="0 0 20 20" className="h-4 w-4 relative" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link
                href="/#featured"
                className="inline-flex items-center gap-2 rounded-full border border-[#0d3b73]/30 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#0d3b73] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#0d3b73] hover:bg-[#0d3b73] hover:text-white"
              >
                <span>Explore Curated Listings</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
