"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  CATEGORIES,
  PROPERTIES,
  rentalYield,
  type PropertyCategory,
} from "../../data/properties";
import { useIntroDone } from "../useIntroDone";
import Icon from "./Icon";
import InvestmentCard from "./InvestmentCard";
import PropertyCard from "./PropertyCard";
import PropertyRail, { RAIL_CARD } from "./PropertyRail";

const EASE = [0.22, 1, 0.36, 1] as const;

const ACCENT =
  "bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent";

const INVESTMENTS = [...PROPERTIES].sort((a, b) => rentalYield(b) - rentalYield(a));

function Chip({
  active,
  onClick,
  children,
  group,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  group: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative h-10 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
        active ? "text-white" : "text-[#0a1f3d] hover:bg-[#0a1f3d]/[0.05]"
      }`}
    >
      {active && (
        <motion.span
          layoutId={`chip-${group}`}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] shadow-[0_8px_20px_-10px_rgba(10,31,61,0.8)]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

export default function PropertiesView() {
  const ready = useIntroDone();
  const [category, setCategory] = useState<PropertyCategory | null>(null);

  const results = category
    ? PROPERTIES.filter((p) => p.category === category)
    : PROPERTIES;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  return (
    <main className="relative isolate flex-1 overflow-x-clip bg-[#f7f5f2] pb-28 pt-32 sm:pt-40">
      {/* Ambient glow + faint blueprint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-[#0b6fb8]/10 blur-[130px]" />
        <div className="absolute -right-32 top-80 h-[420px] w-[420px] rounded-full bg-[#7cc4ff]/20 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-[640px] opacity-70 [background-image:linear-gradient(rgba(10,31,61,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,31,61,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* Breadcrumb */}
        <motion.nav
          {...enter(0)}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500"
        >
          <Link href="/" className="transition-colors hover:text-[#0a1f3d]">
            Home
          </Link>
          <Icon name="chevron" className="h-3 w-3" />
          <span className="font-medium text-[#0a1f3d]">Properties</span>
        </motion.nav>

        {/* Header */}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#0a1f3d] sm:text-6xl">
              {["Homes", "in", "Kashi."].map((word, i) => (
                <span
                  key={word}
                  className="inline-block overflow-hidden pb-2 align-bottom"
                >
                  <motion.span
                    className={`inline-block ${
                      i === 2
                        ? "bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 italic text-transparent"
                        : "pr-3 sm:pr-4"
                    }`}
                    initial={{ y: "110%" }}
                    animate={{ y: ready ? "0%" : "110%" }}
                    transition={{
                      duration: 1.1,
                      ease: EASE,
                      delay: ready ? 0.1 + i * 0.1 : 0,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              {...enter(0.35)}
              className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600"
            >
              Verified homes across Varanasi — each one visited, checked and
              priced honestly by our team.
            </motion.p>
          </div>

        </div>

        {/* All properties */}
        <section id="all" className="mt-24 scroll-mt-28">
          <h2 className="overflow-hidden pb-1 font-serif text-4xl leading-[1.1] text-[#0a1f3d] sm:text-5xl">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              All <em className={ACCENT}>properties</em>
            </motion.span>
          </h2>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="sticky top-24 z-20 mt-8 flex rounded-[26px] bg-white/80 p-2 shadow-[0_18px_40px_-28px_rgba(10,31,61,0.45)] ring-1 ring-[#0a1f3d]/[0.06] backdrop-blur-xl sm:top-28"
        >
          <div
            role="group"
            aria-label="Property type"
            className="flex max-w-full gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Chip group="category" active={category === null} onClick={() => setCategory(null)}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c} group="category" active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </motion.div>

        <p aria-live="polite" className="mt-8 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-[#0a1f3d]">{results.length}</span>{" "}
          {results.length === 1 ? "property" : "properties"}
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {results.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <PropertyCard property={p} index={i % 3} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-4 rounded-[28px] border border-dashed border-[#0a1f3d]/20 bg-white/60 px-6 py-16 text-center"
            >
              <p className="font-serif text-2xl text-[#0a1f3d]">
                No {category?.toLowerCase()} listed right now
              </p>
              <p className="mt-2 text-slate-500">
                New listings come in every week — tell us what you need and
                we’ll find it.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="h-11 rounded-full border border-[#0a1f3d]/15 px-6 text-sm font-medium text-[#0a1f3d] transition-colors hover:border-[#0a1f3d]"
                >
                  Show all properties
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-full bg-[#0a1f3d] px-6 text-sm font-medium text-white transition-colors hover:bg-[#0d3b73]"
                >
                  Tell us what you need
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </section>

        {/* Featured */}
        <section className="mt-28">
          <PropertyRail
            title={
              <>
                Featured{" "}
                <em className={ACCENT}>Properties</em>
              </>
            }
            subtitle="Hand-picked homes our team would buy themselves."
            href="#all"
          >
            {PROPERTIES.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} className={RAIL_CARD} />
            ))}
          </PropertyRail>
        </section>

        {/* Investment */}
        <section className="mt-20">
          <PropertyRail
            title={
              <>
                Investment <em className={ACCENT}>opportunities</em>
              </>
            }
            subtitle="Homes with the strongest rental returns in Varanasi."
            href="#all"
            note="Rental figures are estimates based on current rents and are not guaranteed."
          >
            {INVESTMENTS.map((p, i) => (
              <InvestmentCard key={p.id} property={p} index={i} className={RAIL_CARD} />
            ))}
          </PropertyRail>
        </section>

      </div>
    </main>
  );
}
