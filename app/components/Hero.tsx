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
import { useEffect, useRef, useState } from "react";
import { useIntroDone } from "./useIntroDone";

const EASE = [0.22, 1, 0.36, 1] as const;

const MODES = ["Buy", "Invest"] as const;
type Mode = (typeof MODES)[number];

const TYPES: Record<Mode, string[]> = {
  Buy: ["House", "Flat"],
  Invest: ["Plot", "Commercial"],
};

const BUDGETS = [
  "Any budget",
  "Under ₹50 L",
  "₹50 L – ₹1 Cr",
  "₹1 Cr – ₹3 Cr",
  "₹3 Cr +",
];

// Rotating word in the headline: "that feels ___."
const FEEL_WORDS = ["right", "perfect", "ideal", "natural"];
const WORD_HOLD_MS = 1000; // how long each word stays on screen
const WORD_SWAP_MS = 550; // slide transition between words

const PLACEHOLDERS = [
  "Search by location, property or project",
  "Try “3 BHK near the riverfront”",
  "Try “Villas in Varanasi”",
  "Try “Ready-to-move flats”",
];

/** Navy pill toggle with a sliding active indicator. */
function Segmented({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      className="inline-flex rounded-full border border-white/70 bg-white/70 p-1 shadow-[0_4px_16px_-6px_rgba(13,59,115,0.25)] backdrop-blur-md"
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
              active ? "text-white" : "text-[#0d3b73] hover:text-[#0b6fb8]"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0d3b73] to-[#0b6fb8] shadow-[0_4px_14px_-4px_rgba(11,111,184,0.7)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function BudgetMenu({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-[#0d3b73] shadow-[0_4px_16px_-6px_rgba(13,59,115,0.25)] backdrop-blur-md transition-colors hover:bg-white"
      >
        {value === BUDGETS[0] ? "Budget" : value}
        <motion.svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <path
            d="M5 7.5l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className="absolute left-0 top-full z-20 mt-2 w-52 origin-top-left overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-[0_20px_40px_-12px_rgba(13,59,115,0.35)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {BUDGETS.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i, duration: 0.25 }}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={b === value}
                  onClick={() => {
                    onChange(b);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    b === value
                      ? "bg-[#0b6fb8]/10 font-semibold text-[#0d3b73]"
                      : "text-slate-600 hover:bg-[#0b6fb8]/5 hover:text-[#0d3b73]"
                  }`}
                >
                  {b}
                  {b === value && (
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#0b6fb8]">
                      <path
                        d="M5 10.5l3 3 7-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const ready = useIntroDone();
  const sectionRef = useRef<HTMLElement>(null);

  const [mode, setMode] = useState<Mode>("Buy");
  const [type, setType] = useState(TYPES.Buy[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [hint, setHint] = useState(0);
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

  // Cycle the search hint while the field is empty and idle.
  useEffect(() => {
    if (focused || query) return;
    const t = setInterval(
      () => setHint((h) => (h + 1) % PLACEHOLDERS.length),
      3200,
    );
    return () => clearInterval(t);
  }, [focused, query]);

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

  const changeMode = (m: string) => {
    setMode(m as Mode);
    setType(TYPES[m as Mode][0]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: route to the listings page once it exists.
    console.log({ mode, type, budget, query });
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
              quality={90}
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

          <motion.div {...enter(0.6)} className="mt-8">
            <Segmented
              id="mode"
              options={MODES}
              value={mode}
              onChange={changeMode}
            />
          </motion.div>

          {/* Search */}
          <motion.form
            {...enter(0.72)}
            onSubmit={onSubmit}
            role="search"
            className={`group mt-4 flex items-center gap-3 rounded-full border bg-white/90 py-2 pl-5 pr-2 backdrop-blur-xl transition-all duration-500 ${
              focused
                ? "border-[#0b6fb8]/40 shadow-[0_0_0_6px_rgba(11,111,184,0.12),0_20px_50px_-15px_rgba(13,59,115,0.45)]"
                : "border-white/80 shadow-[0_18px_45px_-18px_rgba(13,59,115,0.4)]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 shrink-0 transition-colors ${
                focused ? "text-[#0b6fb8]" : "text-slate-500"
              }`}
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </svg>

            <div className="relative h-10 flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-label="Search by location, property or project"
                className="peer absolute inset-0 w-full bg-transparent text-[15px] text-[#0a1f3d] outline-none"
              />
              {!query && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={hint}
                      className="absolute inset-0 truncate text-[15px] leading-10 text-slate-400"
                      initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      {PLACEHOLDERS[hint]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              aria-label="Search"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#0d3b73] to-[#0b6fb8] text-white shadow-[0_8px_20px_-6px_rgba(11,111,184,0.8)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] transition-transform duration-700 group-hover:translate-x-full" />
              <svg viewBox="0 0 24 24" className="relative h-5 w-5">
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                />
                <path
                  d="M20 20l-4-4"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </motion.form>

          <motion.div
            {...enter(0.84)}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            <Segmented
              id="type"
              options={TYPES[mode]}
              value={type}
              onChange={setType}
            />
            <BudgetMenu value={budget} onChange={setBudget} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
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
