"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import React, { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ServiceItem {
  id: string;
  no: string;
  category: "acquisition" | "management" | "intelligence" | "legal";
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  offerings: string[];
  icon: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "residential",
    no: "01",
    category: "acquisition",
    title: "Residential Services",
    subtitle: "Private sanctuaries & prime living enclaves",
    badge: "Villas, Apartments & Land",
    description:
      "From riverfront luxury villas along the sacred Ganges to master-planned gated communities and high-appreciation residential land parcels across Varanasi, we curate bespoke living spaces that embody privacy, prestige, and generational pride.",
    offerings: [
      "Luxury waterfront villas, independent floors & penthouses",
      "Gated township plots & residential land parcels",
      "Personalized architectural advisory & private site viewings",
    ],
    icon: [
      "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10",
      "M9 21V12h6v9",
    ],
  },
  {
    id: "commercial",
    no: "02",
    category: "acquisition",
    title: "Commercial & Industrial Services",
    subtitle: "High-yield commercial hubs & industrial corridors",
    badge: "Retail, Corporate & Logistics",
    description:
      "Strategic land assembly and commercial asset acquisition along arterial growth corridors, including the Purvanchal Expressway, Ring Road Phase II, and Babatpur Airport Road, engineered for maximum footfall, logistical velocity, and capital compounding.",
    offerings: [
      "High-street retail spaces, showrooms & commercial towers",
      "Industrial land assembly, logistics parks & warehousing hubs",
      "Hospitality enclaves, boutique resort & hotel development sites",
    ],
    icon: [
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    ],
  },
  {
    id: "management",
    no: "03",
    category: "management",
    title: "Property Management",
    subtitle: "End-to-end stewardship for remote & resident owners",
    badge: "Asset Concierge & NRI Care",
    description:
      "Comprehensive, turnkey asset management specifically designed for NRIs, institutional investors, and multi-property landowners. We safeguard boundary integrity, streamline tenancy lifecycles, and handle all local revenue compliances.",
    offerings: [
      "Comprehensive tenant vetting, lease documentation & rent collection",
      "Boundary security, satellite verification & periodic physical site audits",
      "Preventive maintenance, municipal property tax filing & utility oversight",
    ],
    icon: [
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    ],
  },
  {
    id: "valuation",
    no: "04",
    category: "intelligence",
    title: "Real Estate Valuation & Appraisals",
    subtitle: "Empirical appraisals backed by historical data",
    badge: "Institutional Market Intelligence",
    description:
      "Certified valuation reports reflecting genuine on-ground market values, government circle rates, and micro-market appreciation trends. Essential for informed acquisitions, strategic divestments, banking collateral, and estate planning.",
    offerings: [
      "Comparative Market Analysis (CMA) & government circle rate audits",
      "Future capital appreciation & rental yield projection models",
      "Institutional appraisal reports for family offices & financial audits",
    ],
    icon: [
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    ],
  },
  {
    id: "investment",
    no: "05",
    category: "intelligence",
    title: "Investment & Advisory Services",
    subtitle: "Strategic land banking & portfolio compounding",
    badge: "Generational Wealth Creation",
    description:
      "Unlocking asymmetrical upside across Purvanchal's fastest-expanding infrastructure belts. We identify high-potential land pockets ahead of mainstream development, structuring safe and high-yielding acquisitions for discerning capital.",
    offerings: [
      "Early-stage strategic land banking in high-growth infrastructure corridors",
      "Risk-adjusted real estate portfolio structuring & diversification",
      "Transit-oriented development advisory (Airport, Expressways & Ring Roads)",
    ],
    icon: [
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    ],
  },
  {
    id: "legal",
    no: "06",
    category: "legal",
    title: "Legal & Regulatory Assistance",
    subtitle: "Watertight title scrutiny & revenue compliance",
    badge: "100% Verified Due Diligence",
    description:
      "Zero compromise on legal sanctity. Our dedicated revenue and legal counsel conducts exhaustive 30-year chain searches, revenue record verifications (Khatauni & Khasra), RERA compliance vetting, and seamless deed registry with local sub-registrars.",
    offerings: [
      "30-year title chain search & non-encumbrance certificate (EC) issuance",
      "Revenue record audits (Khatauni, Khasra, Nazul & Land Ceiling scrutiny)",
      "Stamp duty optimization, registry execution & municipal mutation (Dakhil Kharij)",
    ],
    icon: [
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Mandate",
    desc: "Confidential briefing to map your exact investment horizon, geographic preference, and capital allocation.",
  },
  {
    step: "02",
    title: "Rigorous Due Diligence",
    desc: "Exhaustive 30-year legal search, revenue record verification, circle-rate audit, and on-ground satellite surveys.",
  },
  {
    step: "03",
    title: "Seamless Acquisition",
    desc: "Flawless contract drafting, price negotiation, stamp duty advisory, and sub-registrar deed execution.",
  },
  {
    step: "04",
    title: "Lifecycle Stewardship",
    desc: "Continuous mutation tracking, boundary fencing, tenant placement, and capital appreciation monitoring.",
  },
];

function fadeUp(delay = 0, y = 30) {
  return {
    initial: { opacity: 0, y, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, ease: EASE, delay },
  };
}

export default function ServicesSection({
  isStandalone = false,
}: {
  isStandalone?: boolean;
}) {
  const [filter, setFilter] = useState<"all" | "acquisition" | "management" | "intelligence" | "legal">("all");

  const filteredServices = filter === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.category === filter);

  // Spotlight mouse effect for cards without extra re-renders
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#f7f9fd] via-white to-[#eaf0fa] text-[#0a1f3d] scroll-mt-20"
    >
      {/* ── Background Architectural Grids & Ambient Glows ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute -left-48 top-28 h-[580px] w-[580px] rounded-full bg-[#0b6fb8]/10 blur-[140px]" />
        <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] rounded-full bg-[#7cc4ff]/15 blur-[140px]" />
        <div className="absolute left-1/3 bottom-10 h-[480px] w-[480px] rounded-full bg-[#0d3b73]/5 blur-[120px]" />

        {/* Blueprint Geometric Grid */}
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(11,111,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(11,111,184,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

        {/* Watermark Blueprint Building Silhouette */}
        <div className="absolute left-0 bottom-1/4 h-[750px] w-[550px] bg-gradient-to-t from-[#0b6fb8] to-transparent opacity-[0.03] [mask-image:url(/whyChooseBackground.png)] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain]" />
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
              Comprehensive Real Estate Advisory • Purvanchal
            </span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            {...fadeUp(0.12)}
            className="mt-6 font-serif text-4xl leading-[1.12] text-[#06142b] sm:text-6xl lg:text-7xl"
          >
            Bespoke services, crafted for{" "}
            <em className="italic bg-gradient-to-r from-[#0b6fb8] via-[#2c5fa8] to-[#0d3b73] bg-clip-text pr-1 font-serif text-transparent">
              discerning clients.
            </em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.22)}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5b6b8a] sm:text-lg"
          >
            From prestigious Gangetic residential estates and arterial commercial land
            assembly to institutional-grade valuation and 30-year legal due diligence —
            our services provide absolute transparency and generational security.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              { id: "all", label: "All Services" },
              { id: "acquisition", label: "Residential & Commercial" },
              { id: "management", label: "Property Management" },
              { id: "intelligence", label: "Valuation & Advisory" },
              { id: "legal", label: "Legal & Regulatory" },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-[#0d3b73] to-[#0b6fb8] text-white shadow-[0_6px_20px_-6px_rgba(11,111,184,0.6)] scale-105"
                      : "border border-white/80 bg-white/70 text-slate-600 hover:text-[#0d3b73] hover:bg-white backdrop-blur-md"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Section 2: Six Core Services Grid ── */}
        <div className="mb-28 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, i) => (
            <motion.article
              key={service.id}
              {...fadeUp(0.08 * i)}
              onMouseMove={handleMouseMove}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/85 bg-white/75 p-8 shadow-[0_12px_36px_-16px_rgba(13,59,115,0.18)] backdrop-blur-xl transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_24px_50px_-18px_rgba(11,111,184,0.32)]"
            >
              {/* Cursor-following spotlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(11,111,184,0.14), transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Header: Index & Animated SVG Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-light text-[#0b6fb8]/40 transition-colors duration-500 group-hover:text-[#0b6fb8]">
                    {service.no}
                  </span>
                  <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-[#eaf3fc] to-white ring-1 ring-[#0b6fb8]/15 shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-[#0d3b73] transition-colors duration-500 group-hover:text-[#0b6fb8]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {service.icon.map((pathStr, pIdx) => (
                        <motion.path
                          key={pIdx}
                          d={pathStr}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.1,
                            ease: "easeInOut",
                            delay: 0.15 + pIdx * 0.2,
                          }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Badge & Title */}
                <span className="mt-6 inline-block rounded-full bg-[#0b6fb8]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0b6fb8]">
                  {service.badge}
                </span>

                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#06142b]">
                  {service.title}
                </h2>

                <p className="mt-1 text-xs font-medium text-[#2c5fa8]">
                  {service.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#5b6b8a]">
                  {service.description}
                </p>

                {/* Offerings list */}
                <ul className="mt-6 space-y-2.5 border-t border-[#0b6fb8]/10 pt-5">
                  {service.offerings.map((offering) => (
                    <li key={offering} className="flex items-start gap-2.5 text-xs text-[#0a1f3d]/85">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b6fb8]" />
                      <span className="leading-snug">{offering}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link Footer */}
              <div className="relative mt-8 pt-4 border-t border-[#0b6fb8]/10 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0d3b73] transition-colors hover:text-[#0b6fb8]"
                >
                  <span>Enquire for this service</span>
                  <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Section 3: The 4-Step Engagement Process (DLF / Oberoi Style) ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-28 rounded-3xl border border-white/80 bg-gradient-to-br from-[#06142b] via-[#0a1f3d] to-[#0d3b73] p-8 text-white shadow-[0_24px_60px_-15px_rgba(6,20,43,0.5)] sm:p-12 lg:p-14"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7cc4ff]">
              Methodology of Excellence
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">
              How we guide your{" "}
              <em className="italic bg-gradient-to-r from-[#7cc4ff] to-[#0b6fb8] bg-clip-text text-transparent">
                property mandate.
              </em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              A structured, multi-tier protocol that safeguards capital, verifies every
              sq. ft., and delivers complete peace of mind.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/25 hover:bg-white/[0.1]"
              >
                <span className="font-serif text-3xl font-light text-[#7cc4ff]/50 transition-colors group-hover:text-[#7cc4ff]">
                  {s.step}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Section 4: Institutional Guarantees (Trust Badges) ── */}
        <motion.div
          {...fadeUp(0.15)}
          className="mb-28 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {[
            {
              title: "100% Verified Titles",
              text: "Exhaustive legal scrutiny before any transaction.",
            },
            {
              title: "30-Year Chain Search",
              text: "Complete revenue record and Khatauni audit.",
            },
            {
              title: "Private Advisory",
              text: "Strict confidentiality and bespoke representation.",
            },
            {
              title: "End-to-End Handholding",
              text: "From discovery to registry and municipal mutation.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/80 bg-white/70 p-5 text-center shadow-sm backdrop-blur-md"
            >
              <div className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full bg-[#0b6fb8]/10 text-[#0b6fb8]">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-[#06142b]">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-[#5b6b8a]">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Section 5: Ultra-Refined Call to Action ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="mx-auto max-w-4xl pb-24 text-center"
        >
          <div className="rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_20px_50px_-20px_rgba(11,111,184,0.22)] backdrop-blur-xl sm:p-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#0b6fb8]">
              Personalized Representation
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#06142b] sm:text-5xl">
              Have a bespoke property requirement in{" "}
              <em className="italic bg-gradient-to-r from-[#0b6fb8] to-[#0d3b73] bg-clip-text text-transparent">
                Purvanchal?
              </em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#5b6b8a]">
              Connect with our dedicated advisors for confidential asset valuation,
              private site appointments, or institutional land mandate discussions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#0d3b73] via-[#0b6fb8] to-[#1f4e8c] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_26px_-8px_rgba(11,111,184,0.7)] transition-all duration-300 hover:shadow-[0_16px_34px_-8px_rgba(11,111,184,0.85)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative">Speak with a Private Advisor</span>
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
                <span>Browse Verified Properties</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

