"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./properties/Icon";
import { useIntroDone } from "./useIntroDone";

const EASE = [0.22, 1, 0.36, 1] as const;

// Rotating word in the headline: "that feels ___."
const FEEL_WORDS = ["right", "perfect", "ideal", "natural"];
const WORD_HOLD_MS = 1000; // how long each word stays on screen
const WORD_SWAP_MS = 550; // slide transition between words

// What RHC offers, shown under the headline.
const OFFERS: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "home", title: "Buy", text: "Homes, flats and villas", href: "/properties" },
  { icon: "area", title: "Invest", text: "Residential and commercial plots", href: "/properties" },
  { icon: "shield", title: "Verify", text: "Every document checked", href: "/services" },
  { icon: "calendar", title: "Visit", text: "Guided site visits", href: "/contact" },
];

export default function Hero() {
  const ready = useIntroDone();
  const sectionRef = useRef<HTMLElement>(null);

  const [word, setWord] = useState(0);

  // Rotate the headline word forever, once the headline has animated in.
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(
      () => setWord((w) => (w + 1) % FEEL_WORDS.length),
      WORD_HOLD_MS + WORD_SWAP_MS,
    );
    return () => clearInterval(t);
  }, [ready]);

  // Scroll parallax: image drifts slower than the page, content fades away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Subtle mouse parallax on the background.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    mx.set((e.clientX / w - 0.5) * -18);
    my.set((e.clientY / h - 0.5) * -12);
  };

  // Entrance helper — everything waits for the splash intro to finish.
  const enter = (delay: number, y = 24) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={onMouseMove}
      className="relative isolate z-10 flex min-h-[640px] h-[100svh] items-center"
    >
      {/* Background image with Ken Burns + parallax */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <motion.div
            className="absolute -inset-6"
            style={{ x: px, y: py }}
            initial={{ scale: 1.18 }}
            animate={{ scale: ready ? 1.04 : 1.18 }}
            transition={{ duration: 2.8, ease: EASE }}
          >
            <Image
              src="/hero_image.png"
              alt="Modern riverside residence at sunrise"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[62%_center]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Readability + brand-tinted overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#fff8ef]/80 via-[#fff8ef]/35 to-transparent sm:via-[#fff8ef]/20" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#06142b]/35 to-transparent" />

      {/* Content */}
      <motion.div
        className="mx-auto w-full max-w-7xl px-5 pt-20 sm:px-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-2xl">
          <h1
            aria-label="Find a property that feels right."
            className="font-serif text-[2.6rem] leading-[1.05] font-medium tracking-tight text-[#0a1f3d] sm:text-6xl lg:text-7xl">
            {["Find a property", "that feels right."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: ready ? "0%" : "110%" }}
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: ready ? 0.15 + i * 0.14 : 0,
                  }}
                >
                  {i === 1 ? (
                    <>
                      that feels{" "}
                      <span className="relative inline-block" aria-hidden>
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.em
                            key={FEEL_WORDS[word]}
                            className="inline-block bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-2 text-transparent"
                            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
                            transition={{ duration: WORD_SWAP_MS / 1000, ease: EASE }}
                          >
                            {FEEL_WORDS[word]}.
                          </motion.em>
                        </AnimatePresence>
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...enter(0.45)}
            className="mt-5 max-w-md text-base text-slate-600 sm:text-lg"
          >
            Explore verified properties, projects and opportunities with RHC.
          </motion.p>

          {/* What we offer */}
          <motion.ul
            className="mt-9 grid max-w-xl grid-cols-2 gap-3"
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
          >
            {OFFERS.map((o) => (
              <motion.li
                key={o.title}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
              >
                <Link
                  href={o.href}
                  className="group flex h-full items-center gap-3 rounded-2xl border border-white/70 bg-white/75 p-3 shadow-[0_14px_34px_-20px_rgba(13,59,115,0.45)] backdrop-blur-md transition-[transform,background-color,box-shadow] duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_44px_-20px_rgba(11,111,184,0.55)] sm:p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0d3b73] to-[#0b6fb8] text-white shadow-[0_8px_18px_-8px_rgba(11,111,184,0.8)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                    <Icon name={o.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-lg leading-tight text-[#0a1f3d]">
                      {o.title}
                    </span>
                    <span className="block text-xs leading-snug text-slate-500 sm:text-[13px]">
                      {o.text}
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div {...enter(1)} className="mt-7">
            <Link
              href="/properties"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] px-7 text-sm font-medium text-white shadow-[0_14px_30px_-12px_rgba(10,31,61,0.7)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative">Explore properties</span>
              <Icon
                name="arrow"
                strokeWidth={2}
                className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#featured"
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/90 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: ready ? 1.3 : 0 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/30">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
