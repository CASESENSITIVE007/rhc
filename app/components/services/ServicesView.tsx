"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIntroDone } from "../useIntroDone";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    title: "Property Buying",
    body: "Find a house or flat in Varanasi that fits your location and budget.",
    icon: ["M3 11 12 4l9 7", "M5 10v10h14V10", "M10 20v-5h4v5"],
  },
  {
    title: "Investment Opportunities",
    body: "Explore properties and projects across Kashi and Purvanchal for investment.",
    icon: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  },
  {
    title: "Property Verification",
    body: "Every listing is verified, with clear information and documents shared upfront.",
    icon: [
      "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z",
      "M9 12l2 2 4-4",
    ],
  },
  {
    title: "Site Visits",
    body: "Visit shortlisted properties in person, with our team alongside you.",
    icon: [
      "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z",
      "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    ],
  },
  {
    title: "Personal Assistance",
    body: "Dedicated support from your first enquiry to the site visit and beyond.",
    icon: [
      "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
      "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6",
      "M16 4.5a3.5 3.5 0 0 1 0 6.5",
      "M18 14.5c2 .8 3 2.8 3 5.5",
    ],
  },
];

function ServiceRow({
  service,
  index,
  ready,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  ready: boolean;
}) {
  const delay = 0.55 + index * 0.1;

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.8, ease: EASE, delay: ready ? delay : 0 }}
      className="group relative"
    >
      {/* Divider that draws in from the left */}
      {index > 0 && (
        <motion.span
          aria-hidden
          className="absolute inset-x-5 top-0 h-px origin-left bg-[#0a1f3d]/[0.08] sm:inset-x-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ready ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE, delay: ready ? delay : 0 }}
        />
      )}

      <div className="relative flex items-start gap-5 rounded-2xl px-5 py-6 sm:px-6">
        {/* Hover wash + accent bar */}
        <span
          aria-hidden
          className="absolute inset-1 rounded-2xl bg-gradient-to-r from-[#0b6fb8]/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="absolute left-1 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#0d3b73] to-[#0b6fb8] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-10"
        />

        {/* Icon */}
        <span className="relative mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#0d3b73] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#0d3b73] group-hover:to-[#0b6fb8] group-hover:text-white group-hover:shadow-[0_8px_20px_-8px_rgba(11,111,184,0.8)]">
          <svg
            viewBox="0 0 24 24"
            className="h-[22px] w-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {service.icon.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: ready ? 1 : 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: ready ? delay + 0.25 + i * 0.2 : 0,
                }}
              />
            ))}
          </svg>
        </span>

        {/* Text */}
        <div className="relative min-w-0 flex-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          <h3 className="font-serif text-xl text-[#0a1f3d] sm:text-[22px]">
            {service.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {service.body}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export default function ServicesView() {
  const ready = useIntroDone();

  // Gentle mouse parallax on the line-art background.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const artX = useSpring(mx, { stiffness: 50, damping: 20 });
  const artY = useSpring(my, { stiffness: 50, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * -24);
    my.set((e.clientY / window.innerHeight - 0.5) * -14);
  };

  // Cursor spotlight inside the card, via CSS variables.
  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <main
      onMouseMove={onMouseMove}
      className="relative isolate flex flex-1 items-center overflow-hidden bg-[#f7f5f2]"
    >
      {/* Line-art building in brand blue, rising in from the bottom */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10"
        style={{ x: artX, y: artY }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0b6fb8] to-[#0d3b73] opacity-[0.12] [mask-image:url(/whyChooseBackground.png)] [mask-position:left_bottom] [mask-repeat:no-repeat] [mask-size:auto_78%]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{
            clipPath: ready ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
          }}
          transition={{ duration: 2.4, ease: EASE, delay: ready ? 0.2 : 0 }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-[#7cc4ff]/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-[#f7f5f2] to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-24 pt-36 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pt-40">
        {/* ── Left: intro ── */}
        <div className="lg:sticky lg:top-40 lg:self-center">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#0a1f3d] sm:text-6xl">
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: ready ? "0%" : "110%" }}
                transition={{
                  duration: 1.1,
                  ease: EASE,
                  delay: ready ? 0.1 : 0,
                }}
              >
                Our
              </motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className="inline-block bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent"
                initial={{ y: "110%" }}
                animate={{ y: ready ? "0%" : "110%" }}
                transition={{
                  duration: 1.1,
                  ease: EASE,
                  delay: ready ? 0.22 : 0,
                }}
              >
                Services.
              </motion.span>
            </span>
          </h1>

          <motion.span
            aria-hidden
            className="mt-6 block h-px w-20 origin-left bg-gradient-to-r from-[#0b6fb8] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE, delay: ready ? 0.45 : 0 }}
          />

          <motion.p
            className="mt-6 max-w-sm text-lg leading-relaxed text-slate-600"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, ease: EASE, delay: ready ? 0.4 : 0 }}
          >
            RHC World makes buying or investing in property easy, from start to
            finish.
          </motion.p>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, ease: EASE, delay: ready ? 0.55 : 0 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full border border-[#0d3b73] bg-white/40 px-7 text-sm font-medium text-[#0d3b73] backdrop-blur-md"
            >
              <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                Get in touch
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

        {/* ── Right: services card ── */}
        <motion.section
          aria-label="Services"
          onMouseMove={onCardMove}
          className="group/card relative overflow-hidden rounded-[28px] border border-white/80 bg-white/85 p-2 shadow-[0_1px_2px_rgba(10,31,61,0.04),0_40px_80px_-40px_rgba(10,31,61,0.4)] backdrop-blur-xl sm:p-3"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.97 }
          }
          transition={{ duration: 1.1, ease: EASE, delay: ready ? 0.3 : 0 }}
        >
          {/* Cursor spotlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(124,196,255,0.14), transparent 70%)",
            }}
          />
          <ul className="relative">
            {SERVICES.map((s, i) => (
              <ServiceRow key={s.title} service={s} index={i} ready={ready} />
            ))}
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
