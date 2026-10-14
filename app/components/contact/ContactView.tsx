"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { useIntroDone } from "../useIntroDone";
import ContactForm from "./ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactView() {
  const ready = useIntroDone();
  // The sketch reveal waits for its image, so it never pops in afterwards.
  const [artLoaded, setArtLoaded] = useState(false);
  const reveal = ready && artLoaded;

  // Gentle mouse parallax on the sketch.
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
      {/* Ghat sketch, "drawn" upward by a scanning light. The multiply blend
          sits on this outer layer so the sketch's grey paper melts into the
          page colour and only the blue lines remain. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 mix-blend-multiply"
        style={{ x: artX, y: artY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{
            clipPath: reveal ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
          }}
          transition={{ duration: 2.6, ease: EASE, delay: reveal ? 0.2 : 0 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: reveal ? 1 : 1.08 }}
            transition={{ duration: 3.2, ease: EASE, delay: reveal ? 0.2 : 0 }}
          >
            <Image
              src="/ContactBg2.jpeg"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              onLoad={() => setArtLoaded(true)}
              className="object-cover object-bottom opacity-[0.36]"
            />
          </motion.div>
        </motion.div>

        {/* Scanning light riding the reveal edge */}
        <motion.span
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0b6fb8] to-transparent shadow-[0_0_28px_6px_rgba(124,196,255,0.55)]"
          initial={{ top: "100%", opacity: 0 }}
          animate={
            reveal
              ? { top: "0%", opacity: [0, 1, 1, 0] }
              : { top: "100%", opacity: 0 }
          }
          transition={{ duration: 2.6, ease: EASE, delay: reveal ? 0.2 : 0 }}
        />
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
        <div className="relative">
          {/* Soft wash of the page colour so the sketch never fights the text */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 rounded-full bg-[#f6f4f1]/85 blur-2xl"
          />
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
