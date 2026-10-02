"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const REASONS = [
  {
    title: "Verified Properties",
    body: "Every listing is verified with clear information and documents",
    icon: ["M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z", "M9 12l2 2 4-4"],
  },
  {
    title: "Local Expertise",
    body: "Deep understanding of Kashi, Purvanchal and the local market",
    icon: [
      "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z",
      "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    ],
  },
  {
    title: "Transparent Process",
    body: "Clear information, documentation and communication at every step",
    icon: [
      "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z",
      "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    ],
  },
  {
    title: "Personal Assistance",
    body: "Dedicated support from enquiry to site visit and beyond",
    icon: [
      "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
      "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6",
      "M16 4.5a3.5 3.5 0 0 1 0 6.5",
      "M18 14.5c2 .8 3 2.8 3 5.5",
    ],
  },
];

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof REASONS)[number];
  index: number;
}) {
  // Cursor-following spotlight, driven by CSS variables (no re-renders).
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const delay = 0.15 + index * 0.12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <article
        onMouseMove={onMove}
        className="group relative h-full overflow-hidden rounded-[26px] border border-white/80 bg-white/70 px-7 pb-8 pt-9 text-center shadow-[0_1px_2px_rgba(10,31,61,0.04),0_24px_50px_-28px_rgba(10,31,61,0.35)] backdrop-blur-xl transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_1px_2px_rgba(10,31,61,0.04),0_40px_70px_-30px_rgba(11,111,184,0.5)]"
      >
        {/* Spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(11,111,184,0.12), transparent 70%)",
          }}
        />

        {/* Index */}
        <span className="absolute right-6 top-5 font-serif text-sm text-[#0a1f3d]/25 transition-colors duration-500 group-hover:text-[#0b6fb8]/60">
          0{index + 1}
        </span>

        {/* Icon */}
        <div className="relative mx-auto grid h-16 w-16 place-items-center">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#eaf3fc] to-white ring-1 ring-[#0b6fb8]/15 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
          <span className="absolute inset-0 rounded-full border border-dashed border-[#0b6fb8]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-safe:group-hover:animate-[nav-spin_8s_linear_infinite]" />
          <svg
            viewBox="0 0 24 24"
            className="relative h-8 w-8 text-[#0d3b73]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {reason.icon.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  ease: "easeInOut",
                  delay: delay + 0.35 + i * 0.25,
                }}
              />
            ))}
          </svg>
        </div>

        <h3 className="relative mt-6 font-serif text-xl text-[#0a1f3d]">
          {reason.title}
        </h3>
        <span className="relative mx-auto mt-3 block h-px w-8 bg-gradient-to-r from-transparent via-[#0b6fb8]/60 to-transparent transition-all duration-700 group-hover:w-20" />
        <p className="relative mx-auto mt-3 max-w-[230px] text-sm leading-relaxed text-slate-500">
          {reason.body}
        </p>
      </article>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  // Observe the section, not the art: the art starts fully clipped, so it
  // would never register as "in view" itself.
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative isolate overflow-hidden bg-[#f7f5f2] py-24 sm:py-32"
    >
      {/* Line-art building, recoloured to the brand blue via a mask. It
          "draws" upward when the section enters, then drifts on scroll. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-10 top-10 -z-10"
        style={{ y: artY }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0b6fb8] to-[#0d3b73] opacity-[0.16] [mask-image:url(/whyChooseBackground.png)] [mask-position:center_bottom] [mask-repeat:no-repeat] [mask-size:auto_96%]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
          transition={{ duration: 2.4, ease: EASE }}
        />
      </motion.div>
      {/* Soft fades so the art melts into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#f7f5f2] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7cc4ff]/15 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="overflow-hidden pb-1 font-serif text-4xl leading-[1.1] text-[#0a1f3d] sm:text-5xl">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              Why Choose{" "}
              <em className="bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent">
                RHC World
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
            Local expertise, verified properties, and personal guidance for a
            simpler property journey.
          </motion.p>
        </div>

        {/* Cards — 2×2 with the building showing through the centre */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-x-20 sm:gap-y-14 lg:gap-x-40 lg:gap-y-20">
          {REASONS.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex justify-center sm:mt-20"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <Link
            href="#trust-centre"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-[#0a1f3d] bg-white/50 px-7 text-sm font-medium text-[#0a1f3d] backdrop-blur-md"
          >
            <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#0a1f3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            <span className="relative transition-colors duration-500 group-hover:text-white">
              Go to Trust Centre
            </span>
            <svg
              viewBox="0 0 24 24"
              className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
