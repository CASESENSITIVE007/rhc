"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { INTRO_DONE_EVENT, INTRO_SEEN_KEY } from "./intro";


const BRAND = "RHC";
const TAGLINE = "Where landmarks begin";

// When the build-up finishes and the exit (zoom + doors) starts, in ms.
const EXIT_AT = 3900;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

// Deterministic "skyline" of light beams (no Math.random → no hydration mismatch).
const BEAMS = Array.from({ length: 28 }, (_, i) => {
  const wave = Math.sin(i * 1.7) * 0.5 + Math.sin(i * 0.45) * 0.5;
  const center = 1 - Math.abs(i - 13.5) / 14; // taller towards the middle
  return {
    height: 18 + center * 42 + wave * 10, // vh
    width: i % 3 === 0 ? 3 : i % 3 === 1 ? 1.5 : 2,
    delay: 0.25 + ((i * 7) % 28) * 0.03,
    bright: i % 4 === 0,
  };
});

// Stylised blueprint of the logo (crescent + towers), drawn as strokes.
const SKETCH_PATHS = [
  // Outer crescent
  "M150 22 C70 40 20 110 55 160 C80 192 140 190 172 163 C130 178 86 170 66 140 C45 105 80 52 150 22 Z",
  // Main tower
  "M68 52 L86 44 L86 162 L68 162 Z",
  // Floors sweeping off the tower
  "M86 66 L126 88 L126 96 L86 74",
  "M86 88 L126 110 L126 118 L86 96",
  "M86 110 L126 132 L126 140 L86 118",
  "M86 132 L118 150 L118 158 L86 140",
  // Second tower + floors
  "M124 116 L134 110 L134 164 L124 164 Z",
  "M134 122 L152 133 L152 139 L134 128",
  "M134 138 L152 149 L152 155 L134 144",
];

export default function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"build" | "exit" | "done">("build");

  // Play once per session; lock scrolling while the intro runs.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {}
    if (seen) {
      // Hide via `html[data-intro-seen]` in globals.css (the inline script in
      // the layout normally does this before paint) and release the navbar.
      document.documentElement.dataset.introSeen = "";
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(
      () => setPhase("exit"),
      reduceMotion ? 1200 : EXIT_AT,
    );
    return () => clearTimeout(t);
  }, [reduceMotion]);

  const finish = () => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
    document.documentElement.style.overflow = "";
    document.documentElement.dataset.introSeen = "";
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    setPhase("done");
  };

  if (phase === "done") return null;

  const exiting = phase === "exit";

  return (
    <div
      id="rhc-intro"
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* ── Doors: two navy panels that slide apart to reveal the site ── */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          className={`absolute inset-y-0 w-1/2 bg-[#06142b] ${
            side === "left" ? "left-0" : "right-0"
          }`}
          initial={{ x: 0 }}
          animate={
            exiting ? { x: side === "left" ? "-101%" : "101%" } : { x: 0 }
          }
          transition={{
            duration: reduceMotion ? 0.4 : 1.1,
            ease: EASE_IN_OUT,
            delay: reduceMotion ? 0 : 0.55,
          }}
          onAnimationComplete={() => {
            if (exiting && side === "left") finish();
          }}
        >
          {/* Glowing seam on the inner edge */}
          <motion.span
            className={`absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#7cc4ff] to-transparent ${
              side === "left" ? "right-0" : "left-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 1 : 0 }}
            transition={{ duration: 0.3, delay: exiting ? 0.45 : 0 }}
            style={{ boxShadow: "0 0 18px 2px rgba(124,196,255,0.7)" }}
          />
        </motion.div>
      ))}

      {/* ── Stage: everything that zooms / fades during the exit ── */}
      <motion.div
        className="absolute inset-0"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
      >
        {/* Atmosphere: radial glow + vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(11,111,184,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,8,20,0.85))]" />

        {/* Blueprint grid */}
        <motion.div
          className="absolute inset-0 opacity-0 [background-image:linear-gradient(rgba(124,196,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(124,196,255,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          animate={{ opacity: 1, scale: exiting ? 1.4 : 1 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.2, ease: EASE_IN_OUT },
          }}
        />

        {/* Scanning line */}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7cc4ff]/70 to-transparent"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.1 }}
          />
        )}

        {/* Skyline of light beams */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-[1.6vw] px-[6vw]"
          animate={exiting ? { scaleY: 2.2, opacity: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
          style={{ transformOrigin: "bottom" }}
        >
          {BEAMS.map((b, i) => (
            <motion.span
              key={i}
              className="block rounded-t-full"
              style={{
                width: b.width,
                height: `${b.height}vh`,
                transformOrigin: "bottom",
                background: b.bright
                  ? "linear-gradient(to top, rgba(124,196,255,0.9), rgba(11,111,184,0.15) 70%, transparent)"
                  : "linear-gradient(to top, rgba(11,111,184,0.55), rgba(11,111,184,0.05) 75%, transparent)",
                boxShadow: b.bright ? "0 0 14px rgba(124,196,255,0.45)" : undefined,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.3, ease: EASE_OUT, delay: b.delay }}
            />
          ))}
        </motion.div>

        {/* Horizon line */}
        <motion.div
          className="absolute inset-x-0 bottom-[14vh] mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[#7cc4ff]/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
        />
      </motion.div>

      {/* ── Logo + wordmark ── */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center">
          <motion.div
            className="relative h-44 w-44 sm:h-56 sm:w-56"
            animate={
              exiting
                ? { scale: [1, 0.9, 22], opacity: [1, 1, 0] }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 1.1,
              times: [0, 0.25, 1],
              ease: [0.7, 0, 0.84, 0],
            }}
          >
            {/* Blueprint sketch drawing itself */}
            <motion.svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full overflow-visible"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 2.15 }}
              style={{ filter: "drop-shadow(0 0 6px rgba(124,196,255,0.8))" }}
            >
              {SKETCH_PATHS.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#9fd4ff"
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: {
                      duration: i === 0 ? 1.3 : 0.7,
                      ease: "easeInOut",
                      delay: i === 0 ? 0.45 : 0.9 + i * 0.09,
                    },
                    opacity: { duration: 0.2, delay: i === 0 ? 0.45 : 0.9 + i * 0.09 },
                  }}
                />
              ))}
            </motion.svg>

            {/* Shockwave rings when the logo materialises */}
            {[0, 1].map((r) => (
              <motion.span
                key={r}
                className="absolute inset-0 rounded-full border border-[#7cc4ff]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.9], opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                  delay: 2.1 + r * 0.25,
                }}
              />
            ))}

            {/* Real logo badge — "blueprint becomes reality" */}
            <motion.div
              className="absolute inset-0 grid place-items-center overflow-hidden rounded-full bg-white shadow-[0_0_80px_10px_rgba(11,111,184,0.45),0_0_0_6px_rgba(255,255,255,0.06)]"
              initial={{ clipPath: "circle(0% at 50% 55%)", scale: 0.92 }}
              animate={{ clipPath: "circle(75% at 50% 55%)", scale: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 2.05 }}
            >
              <Image
                src="/rhc_logo.jpeg"
                alt=""
                width={320}
                height={320}
                loading="eager"
                fetchPriority="high"
                className="h-[80%] w-[80%] object-contain"
              />
              {/* Light sweep across the badge */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.9)_50%,transparent_65%)] mix-blend-overlay"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 2.8 }}
              />
            </motion.div>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            className="mt-10 flex flex-col items-center"
            animate={exiting ? { opacity: 0, y: -10, filter: "blur(6px)" } : {}}
            transition={{ duration: 0.35, ease: "easeIn" }}
          >
            <div className="flex overflow-hidden">
              {BRAND.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block bg-gradient-to-b from-white to-[#9fd4ff] bg-clip-text text-5xl font-semibold tracking-[0.35em] text-transparent sm:text-6xl"
                  initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 2.45 + i * 0.1 }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <motion.span
              className="mt-4 h-px w-40 bg-gradient-to-r from-transparent via-[#7cc4ff] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 2.8 }}
            />

            <motion.p
              className="mt-4 text-xs font-medium uppercase tracking-[0.5em] text-[#9fd4ff]/80 sm:text-sm"
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: 2.95 }}
            >
              {TAGLINE}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
