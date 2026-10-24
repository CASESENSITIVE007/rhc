"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import Icon from "../properties/Icon";
import { useIntroDone } from "../useIntroDone";

const EASE = [0.22, 1, 0.36, 1] as const;

const ACCENT =
  "bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 italic text-transparent";

// Swap for a real photo, e.g. "/founder.jpg".
const FOUNDER_IMAGE = "/founder.svg";

const JOURNEY = [
  {
    year: "2015",
    title: "We started in Varanasi",
    text: "One small office. A few homes in Lanka and Assi.",
    label: "Problem",
    note: "People did not know who to trust.",
  },
  {
    year: "2017",
    title: "People began to trust us",
    text: "We checked papers before showing any home.",
    label: "Problem",
    note: "Many sellers had no clear papers.",
  },
  {
    year: "2020",
    title: "The lockdown",
    text: "We showed homes by phone and video.",
    label: "Problem",
    note: "No one could visit the sites.",
  },
  {
    year: "2022",
    title: "We grew beyond Varanasi",
    text: "We began work in Sarnath, Cantonment and nearby towns.",
    label: "Problem",
    note: "Every place had different prices.",
  },
  {
    year: "2025",
    title: "Today",
    text: "Homes, projects and investments, all in one place.",
    label: "Our goal",
    note: "Keep buying property simple for everyone.",
  },
];

/** Section heading that slides up into view. */
function Heading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`overflow-hidden pb-1 font-serif text-4xl leading-[1.1] text-[#0a1f3d] sm:text-5xl ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      >
        {children}
      </motion.span>
    </h2>
  );
}

/**
 * The founder's portrait in an arched frame. It plays like an architect's
 * drawing: the blueprint sketch draws itself, then the frame rises floor by
 * floor out of it, and finally the name plate is set in place.
 */
function Portrait({ ready }: { ready: boolean }) {
  // Gentle 3D tilt that follows the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: ready ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 1.6, ease: EASE, delay: ready ? delay : 0 },
  });

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[420px] [perspective:1200px]"
    >
      {/* Blueprint sketch: the outline of a house, with dimension lines */}
      <svg
        aria-hidden
        viewBox="0 0 420 520"
        preserveAspectRatio="none"
        className="absolute -left-8 -top-6 h-[calc(100%+48px)] w-[calc(100%+64px)] text-[#0b6fb8]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        <motion.path {...draw(0.1)} d="M30 500V170L210 40l180 130v330" strokeWidth="1.2" opacity="0.35" />
        <motion.path {...draw(0.3)} d="M70 500V200M350 500V200M30 340h360" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
        {/* Width dimension */}
        <motion.path {...draw(0.6)} d="M50 512h320M50 504v16M370 504v16" strokeWidth="1.2" opacity="0.5" />
        {/* Height dimension */}
        <motion.path {...draw(0.7)} d="M8 90v400M0 90h16M0 490h16" strokeWidth="1.2" opacity="0.5" />
      </svg>
      <motion.span
        aria-hidden
        className="absolute -bottom-12 right-4 text-[10px] font-semibold tracking-[0.3em] text-[#0b6fb8]/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: ready ? 1.4 : 0 }}
      >
        SINCE 2015
      </motion.span>

      <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
        {/* Arched frame rising like a building going up */}
        <motion.div
          className="relative aspect-[5/6] overflow-hidden rounded-b-[32px] rounded-t-[999px] bg-[#dbe8f6] shadow-[0_40px_80px_-40px_rgba(10,31,61,0.6)] ring-1 ring-[#0a1f3d]/10"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 1.6, ease: EASE, delay: ready ? 0.5 : 0 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: ready ? 1 : 1.2 }}
            transition={{ duration: 2.2, ease: EASE, delay: ready ? 0.5 : 0 }}
          >
            <Image
              src={FOUNDER_IMAGE}
              alt="Founder of RHC World"
              fill
              preload
              sizes="(min-width: 1024px) 420px, 90vw"
              unoptimized={FOUNDER_IMAGE.endsWith(".svg")}
              className="object-cover"
            />
          </motion.div>

          {/* Floor lines sweeping up as the frame rises */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute inset-x-0 h-px bg-white/70"
              style={{ bottom: `${(i + 1) * 20}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={ready ? { scaleX: [0, 1, 1], opacity: [0, 1, 0] } : {}}
              transition={{ duration: 1.1, ease: EASE, delay: ready ? 0.6 + i * 0.22 : 0 }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/25 via-transparent to-transparent" />
        </motion.div>

        {/* Name plate */}
        <motion.div
          className="absolute -bottom-6 -left-4 rounded-2xl bg-white/90 px-5 py-3.5 shadow-[0_20px_40px_-20px_rgba(10,31,61,0.55)] ring-1 ring-[#0a1f3d]/[0.06] backdrop-blur-md [transform:translateZ(40px)] sm:-left-10"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: EASE, delay: ready ? 1.5 : 0 }}
        >
          <p className="font-serif text-lg leading-tight text-[#0a1f3d]">Founder and owner</p>
          <p className="mt-0.5 text-xs text-slate-500">RHC World, Varanasi</p>
        </motion.div>

        {/* Floating key tag */}
        <motion.div
          className="absolute -right-3 top-[18%] [transform:translateZ(60px)] sm:-right-8"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: ready ? 1.7 : 0 }}
        >
          <motion.div
            className="flex items-center gap-2.5 rounded-full bg-[#0a1f3d] py-2 pl-2 pr-4 text-white shadow-[0_18px_36px_-16px_rgba(10,31,61,0.8)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
              <Icon name="key" className="h-4 w-4" />
            </span>
            <span className="text-xs font-medium">Every home verified</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className="relative mx-auto mt-16 max-w-5xl">
      {/* Spine, filling in as you scroll */}
      <span aria-hidden className="absolute left-4 top-0 h-full w-px bg-[#0a1f3d]/10 md:left-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-[#0b6fb8] to-[#1f4e8c] md:left-1/2"
      />

      {JOURNEY.map((step, i) => {
        const right = i % 2 === 1;
        return (
          <li
            key={step.year}
            className={`relative pb-10 pl-12 md:w-1/2 md:pb-0 md:pl-0 ${
              right ? "md:ml-auto md:pl-14" : "md:pr-14"
            } ${i > 0 ? "md:-mt-14" : ""}`}
          >
            {/* Marker */}
            <motion.span
              aria-hidden
              className={`absolute left-4 top-9 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 border-[#0b6fb8] bg-[#f7f5f2] ${
                right ? "md:left-0" : "md:left-full"
              }`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 16 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6fb8]" />
            </motion.span>

            <motion.article
              className="group rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(10,31,61,0.45)] ring-1 ring-[#0a1f3d]/[0.06] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-28px_rgba(11,111,184,0.5)]"
              initial={{ opacity: 0, x: right ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className={`font-serif text-3xl ${ACCENT}`}>{step.year}</p>
              <h3 className="mt-2 font-serif text-xl text-[#0a1f3d]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
              <p className="mt-4 border-t border-[#0a1f3d]/[0.07] pt-4 text-sm text-slate-600">
                <span className="font-semibold text-[#0a1f3d]">{step.label}:</span> {step.note}
              </p>
            </motion.article>
          </li>
        );
      })}
    </ol>
  );
}

export default function AboutView() {
  const ready = useIntroDone();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.9, ease: EASE },
  };

  return (
    <main className="relative isolate flex-1 overflow-x-clip bg-[#f7f5f2]">
      {/* Hero */}
      <section className="relative pb-28 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(10,31,61,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,31,61,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-[#0b6fb8]/10 blur-[130px]" />
          <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#7cc4ff]/20 blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-20 px-5 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <motion.span
              {...enter(0)}
              className="inline-flex items-center gap-2 rounded-full border border-[#0b6fb8]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#0b6fb8] backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6fb8]" />
              About RHC World
            </motion.span>

            <h1 className="mt-7 font-serif text-5xl leading-[1.08] tracking-tight text-[#0a1f3d] sm:text-6xl lg:text-7xl">
              {[["Meet", "the", "founder"], ["behind", "RHC", "World."]].map((line, l) => (
                <span key={l} className="block">
                  {line.map((word, w) => (
                    <span key={word} className="inline-block overflow-hidden pb-2 align-bottom">
                      <motion.span
                        className={`inline-block ${l === 1 && w > 0 ? ACCENT : ""} pr-[0.22em]`}
                        initial={{ y: "110%" }}
                        animate={{ y: ready ? "0%" : "110%" }}
                        transition={{ duration: 1.1, ease: EASE, delay: ready ? 0.1 + (l * 3 + w) * 0.07 : 0 }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p {...enter(0.55)} className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
              We help you buy a home or invest in property in Varanasi and nearby areas. Simple and
              honest.
            </motion.p>

            <motion.div {...enter(0.7)} className="mt-10">
              <Link
                href="/properties"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full border border-[#0a1f3d] px-7 text-sm font-medium text-[#0a1f3d]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-[#0a1f3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="relative transition-colors duration-500 group-hover:text-white">
                  See our properties
                </span>
                <Icon
                  name="arrow"
                  strokeWidth={2}
                  className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
                />
              </Link>
            </motion.div>
          </div>

          <Portrait ready={ready} />
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-[#0a1f3d]/[0.06] bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading>
              Our <em className={ACCENT}>story</em>
            </Heading>
            <motion.span
              aria-hidden
              className="mt-6 block h-px w-16 origin-left bg-[#0b6fb8]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            />
            <motion.blockquote {...reveal} className="mt-8">
              <p className="max-w-md font-serif text-2xl italic leading-snug text-[#0b6fb8] sm:text-[28px]">
                “A home is a big decision. It should never feel like a guess.”
              </p>
              <footer className="mt-4 text-sm text-slate-500">— The founder, RHC World</footer>
            </motion.blockquote>
          </div>

          <div className="flex flex-col justify-center gap-6 text-[17px] leading-[1.8] text-slate-600">
            <motion.p {...reveal}>
              Buying a home in Varanasi was hard. Many brokers, many prices, and no one to trust.
            </motion.p>
            <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
              So we started small, with one rule: we show only what we have seen ourselves. Today we
              help families across Kashi and Purvanchal. The rule is the same.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="text-center">
            <Heading>
              Our <em className={ACCENT}>journey</em>
            </Heading>
            <motion.p {...reveal} className="mt-4 text-slate-500">
              How we started, and what we learnt.
            </motion.p>
          </div>
          <Journey />
        </div>
      </section>

      {/* Closing call to action */}
      <section className="px-5 pb-24 sm:px-10">
        <motion.div
          {...reveal}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0a1f3d] to-[#0d3b73] px-6 py-16 text-center text-white sm:px-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
          />
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#7cc4ff]/25 blur-[90px]" />
          <h2 className="relative font-serif text-4xl leading-tight sm:text-5xl">
            Let’s find the place you’ll call <em className="italic text-[#7cc4ff]">home.</em>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/70">
            Tell us what you’re looking for. We’ll show you only what we’ve checked ourselves.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-[#0a1f3d] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Talk to us
              <Icon name="arrow" strokeWidth={2} className="h-4 w-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex h-12 items-center rounded-full border border-white/30 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Browse properties
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
