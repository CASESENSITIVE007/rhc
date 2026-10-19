"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROPERTIES } from "../data/properties";
import Icon from "./properties/Icon";
import PropertyCard from "./properties/PropertyCard";

const EASE = [0.22, 1, 0.36, 1] as const;
const CARD_GAP = 24;

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

        {/* Carousel — aligned with the content on the left, bleeds to the
            screen edge on the right */}
        <div
          ref={trackRef}
          className="-ml-5 mr-[calc(50%-50vw)] mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-6 overflow-x-auto pb-10 pl-5 pt-3 [scrollbar-width:none] sm:-ml-3 sm:scroll-pl-3 sm:pl-3 [&::-webkit-scrollbar]:hidden"
        >
          {PROPERTIES.map((p, i) => (
            <PropertyCard
              key={p.id}
              property={p}
              index={i}
              className="w-[84vw] max-w-[330px] shrink-0 snap-start sm:w-[330px]"
            />
          ))}
          <div aria-hidden className="w-px shrink-0 sm:w-10" />
        </div>
      </div>
    </section>
  );
}
