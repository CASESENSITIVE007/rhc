"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useIntroDone } from "../useIntroDone";
import ContactForm from "./ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

// ── Blueprint line drawing (viewBox 1440 × 900, ground at y = 800) ──
const GROUND = 800;

function tower(x: number, top: number, w: number, gap: number, cols: number) {
  const paths = [`M${x} ${GROUND}V${top}H${x + w}V${GROUND}`];
  for (let y = top + gap; y < GROUND - 10; y += gap)
    paths.push(`M${x} ${y}H${x + w}`);
  for (let c = 1; c < cols; c++) {
    const cx = x + (w / cols) * c;
    paths.push(`M${cx} ${top}V${GROUND}`);
  }
  return paths;
}

// A slab tower whose floors project out to the right, like the design.
function slabTower(
  x: number,
  top: number,
  w: number,
  gap: number,
  reach: number,
) {
  const paths = [`M${x} ${GROUND}V${top}H${x + w}V${GROUND}`];
  for (let y = top + gap; y < GROUND - 20; y += gap) {
    paths.push(`M${x - 8} ${y}H${x + w}L${x + w + reach} ${y + reach * 0.45}`);
  }
  return paths;
}

function temple(x: number, w: number, h: number) {
  const top = GROUND - h;
  return [
    `M${x} ${GROUND}V${top}H${x + w}V${GROUND}`,
    `M${x} ${top}Q${x + w / 2} ${top - w * 0.9} ${x + w} ${top}`,
    `M${x + w / 2} ${top - w * 0.45}V${top - w * 0.75}`,
    `M${x + w * 0.35} ${GROUND}V${GROUND - h * 0.45}Q${x + w / 2} ${GROUND - h * 0.6} ${x + w * 0.65} ${GROUND - h * 0.45}V${GROUND}`,
  ];
}

function house(x: number, w: number, h: number) {
  const top = GROUND - h;
  return [
    `M${x} ${GROUND}V${top}L${x + w / 2} ${top - w * 0.35}L${x + w} ${top}V${GROUND}`,
    `M${x + w * 0.3} ${GROUND}V${GROUND - h * 0.5}H${x + w * 0.7}V${GROUND}`,
  ];
}

const tree = (cx: number, r: number) => [
  `M${cx - r} ${GROUND - r - 10}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`,
  `M${cx} ${GROUND}V${GROUND - 10}`,
];

const STRUCTURES: string[][] = [
  slabTower(50, 20, 160, 72, 60),
  tower(250, 420, 90, 46, 2),
  temple(380, 70, 120),
  house(480, 80, 70),
  tree(600, 26),
  tree(645, 18),
  temple(690, 56, 95),
  tower(780, 560, 140, 40, 4),
  house(950, 70, 60),
  tree(1060, 30),
  tower(1120, 300, 120, 50, 3),
  tree(1290, 34),
  tree(1350, 22),
  tower(1380, 470, 90, 44, 2),
];

// Dashed construction guides
const GUIDES = [
  { x1: 0, y1: 120, x2: 1440, y2: 120 },
  { x1: 0, y1: 640, x2: 1440, y2: 640 },
  { x1: 470, y1: 0, x2: 470, y2: 900 },
  { x1: 1250, y1: 0, x2: 1250, y2: 900 },
];

function Blueprint({ ready }: { ready: boolean }) {
  let n = 0;
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      fill="none"
      stroke="#0d3b73"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {GUIDES.map((g, i) => (
        <motion.line
          key={`g${i}`}
          {...g}
          strokeWidth={1}
          strokeDasharray="6 8"
          strokeOpacity={0.12}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.2, delay: ready ? 0.2 + i * 0.15 : 0 }}
        />
      ))}

      {/* Ground lines */}
      {[GROUND, GROUND + 22].map((y, i) => (
        <motion.path
          key={`ground${i}`}
          d={`M0 ${y}H1440`}
          strokeWidth={1}
          strokeOpacity={0.14}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: ready ? 1 : 0 }}
          transition={{
            duration: 1.8,
            ease: EASE,
            delay: ready ? 0.1 + i * 0.15 : 0,
          }}
        />
      ))}

      {STRUCTURES.map((paths, s) =>
        paths.map((d, p) => {
          const i = n++;
          return (
            <motion.path
              key={`${s}-${p}`}
              d={d}
              strokeWidth={p === 0 ? 1.4 : 1}
              strokeOpacity={p === 0 ? 0.17 : 0.11}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: ready ? 1 : 0 }}
              transition={{
                duration: p === 0 ? 1.8 : 1.1,
                ease: "easeInOut",
                delay: ready ? 0.3 + s * 0.08 + p * 0.03 + (i % 3) * 0.02 : 0,
              }}
            />
          );
        }),
      )}
    </svg>
  );
}

export default function ContactView() {
  const ready = useIntroDone();

  // Gentle mouse parallax on the drawing.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const artX = useSpring(mx, { stiffness: 50, damping: 20 });
  const artY = useSpring(my, { stiffness: 50, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * -20);
    my.set((e.clientY / window.innerHeight - 0.5) * -10);
  };

  return (
    <main
      onMouseMove={onMouseMove}
      className="relative isolate flex flex-1 items-center overflow-hidden bg-[#f6f4f1]"
    >
      {/* Background drawing + atmosphere */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10"
        style={{ x: artX, y: artY }}
      >
        <Blueprint ready={ready} />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-[#7cc4ff]/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#0b6fb8]/10 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-24 pt-36 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:pt-40">
        {/* ── Left: heading ── */}
        <div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#0a1f3d] sm:text-6xl">
            {["Make an", "Enquiry."].map((word, i) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-4 -mb-2 align-bottom"
              >
                <motion.span
                  className={`inline-block ${
                    i === 1
                      ? "bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent"
                      : "pr-3"
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
            className="mt-6 block h-px w-20 origin-left bg-gradient-to-r from-[#0b6fb8] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE, delay: ready ? 0.4 : 0 }}
          />

          <motion.p
            className="mt-6 max-w-sm text-lg leading-relaxed text-slate-600"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, ease: EASE, delay: ready ? 0.35 : 0 }}
          >
            Tell us what you are looking for. We will call you back soon.
          </motion.p>
        </div>

        {/* ── Right: form card ── */}
        <motion.section
          aria-label="Enquiry form"
          className="relative w-full rounded-[24px] border border-white bg-white/95 p-6 shadow-[0_1px_2px_rgba(10,31,61,0.04),0_40px_80px_-40px_rgba(10,31,61,0.45)] backdrop-blur-xl sm:p-8 lg:justify-self-end lg:max-w-[440px]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.97 }
          }
          transition={{ duration: 1.1, ease: EASE, delay: ready ? 0.25 : 0 }}
        >
          {ready && <ContactForm />}
        </motion.section>
      </div>
    </main>
  );
}
