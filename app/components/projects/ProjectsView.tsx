"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIntroDone } from "../useIntroDone";

const EASE = [0.22, 1, 0.36, 1] as const;

// Placeholder page — replace with the real projects listing when it's ready.
export default function ProjectsView() {
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

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  return (
    <main
      onMouseMove={onMouseMove}
      className="relative isolate flex min-h-[100svh] flex-1 items-center overflow-hidden bg-[#f7f5f2]"
    >
      {/* Line-art building in brand blue, rising in from the bottom */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10"
        style={{ x: artX, y: artY }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0b6fb8] to-[#0d3b73] opacity-[0.12] [mask-image:url(/whyChooseBackground.png)] [mask-position:center_bottom] [mask-repeat:no-repeat] [mask-size:auto_80%]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{
            clipPath: ready ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
          }}
          transition={{ duration: 2.4, ease: EASE, delay: ready ? 0.2 : 0 }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[480px] w-[480px] rounded-full bg-[#0b6fb8]/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[440px] w-[440px] rounded-full bg-[#7cc4ff]/20 blur-[120px]"
      />

      <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-36 text-center sm:px-10">
        <div className="relative">
          {/* Soft wash of the page colour so the drawing never fights the text */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 rounded-full bg-[#f7f5f2]/85 blur-2xl"
          />

          <motion.span
            {...enter(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[#0b6fb8]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#0b6fb8] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0b6fb8] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0b6fb8]" />
            </span>
            Coming soon
          </motion.span>

          <h1 className="mt-7 font-serif text-5xl leading-[1.05] tracking-tight text-[#0a1f3d] sm:text-7xl">
            {["Our", "Projects."].map((word, i) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-2 align-bottom"
              >
                <motion.span
                  className={`inline-block ${
                    i === 1
                      ? "bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent"
                      : "pr-4"
                  }`}
                  initial={{ y: "110%" }}
                  animate={{ y: ready ? "0%" : "110%" }}
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: ready ? 0.1 + i * 0.12 : 0,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.span
            aria-hidden
            className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-[#0b6fb8] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE, delay: ready ? 0.4 : 0 }}
          />

          <motion.p
            {...enter(0.45)}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
          >
            We’re putting together a showcase of our projects across Kashi and
            Purvanchal. Check back soon — or tell us what you’re looking for.
          </motion.p>

          <motion.div
            {...enter(0.6)}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/#featured"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] px-7 text-sm font-medium text-white shadow-[0_14px_30px_-12px_rgba(10,31,61,0.7)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative">See featured properties</span>
              <svg
                viewBox="0 0 24 24"
                className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
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
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center overflow-hidden rounded-full border border-[#0d3b73] bg-white/50 px-7 text-sm font-medium text-[#0d3b73] backdrop-blur-md"
            >
              <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                Get in touch
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
