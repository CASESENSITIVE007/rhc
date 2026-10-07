"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const WORDMARK = "RHC WORLD";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/#home" },
      { label: "About", href: "/#about" },
      { label: "Projects", href: "/#projects" },
      { label: "Services", href: "/#services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "Buy a home", href: "/#home" },
      { label: "Invest", href: "/#home" },
      { label: "Featured properties", href: "/#featured" },
      { label: "Why choose us", href: "/#why-choose-us" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Trust Centre", href: "/#trust-centre" },
      { label: "Schedule a site visit", href: "/contact" },
      { label: "Get in touch", href: "/contact" },
    ],
  },
];

// TODO: replace "#" with the real profile URLs.
const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.25-1.5h.01",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6.5H14V14h2.5l.5-3.5h-3V8.5A.5.5 0 0 1 14 8Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.5 9.5h3v10h-3v-10ZM6 4a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4Zm4 5.5h2.9v1.4c.5-.9 1.7-1.7 3.4-1.7 3 0 3.7 1.9 3.7 4.6v5.7h-3v-5c0-1.2-.1-2.7-1.7-2.7s-2.3 1.2-2.3 2.6v5.1H10v-10Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21 8.2a2.6 2.6 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.6 12c0 1.3.1 2.6.4 3.8a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.2.4 7.2.4s5.6 0 7.2-.4a2.6 2.6 0 0 0 1.8-1.8c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10.2 14.6V9.4l4.6 2.6-4.6 2.6Z",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: EASE, delay },
});

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative isolate overflow-hidden bg-[#06142b] text-white">
      {/* ── Atmosphere ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0b6fb8]/25 blur-[140px]" />
        <div className="absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[#1f4e8c]/30 blur-[130px]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(124,196,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(124,196,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
        {/* Blueprint building, echoing the Why Choose Us section */}
        <div className="absolute -right-24 bottom-0 h-[90%] w-[70%] bg-gradient-to-t from-[#7cc4ff] to-[#0b6fb8] opacity-[0.07] [mask-image:url(/whyChooseBackground.png)] [mask-position:right_bottom] [mask-repeat:no-repeat] [mask-size:contain]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* ── CTA band ── */}
        <div className="flex flex-col gap-10 border-b border-white/10 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.p
              {...fadeUp()}
              className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7cc4ff]"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#7cc4ff]" />
              Begin your journey
            </motion.p>
            <h2 className="font-serif text-4xl leading-[1.08] sm:text-6xl">
              {["Let’s find the place", "you’ll call home."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: EASE,
                      delay: 0.1 + i * 0.12,
                    }}
                  >
                    {i === 1 ? (
                      <>
                        you’ll call{" "}
                        <em className="bg-gradient-to-r from-[#7cc4ff] to-[#0b6fb8] bg-clip-text pr-1 text-transparent">
                          home.
                        </em>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] pl-7 pr-2 text-sm font-semibold shadow-[0_18px_40px_-14px_rgba(11,111,184,0.9)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.3)_50%,transparent_70%)] transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative">Get in touch</span>
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a1f3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-45deg]">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/#featured"
              className="inline-flex h-14 items-center rounded-full border border-white/20 px-7 text-sm font-medium text-white/90 backdrop-blur-md transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Browse properties
            </Link>
          </motion.div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:gap-x-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:gap-10 lg:gap-x-10">
          {/* Brand */}
          <motion.div {...fadeUp()} className="col-span-2 lg:col-span-1">
            <Link href="/#home" className="group inline-flex items-center gap-3">
              <span className="relative grid h-14 w-14 place-items-center">
                <span className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,#0b6fb8,#7cc4ff,#1f4e8c,#0b6fb8)] opacity-70 transition-opacity duration-500 group-hover:opacity-100 motion-safe:animate-[nav-spin_8s_linear_infinite]" />
                <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-white">
                  <Image
                    src="/rhc_logo.jpeg"
                    alt="RHC logo"
                    width={112}
                    height={112}
                    className="h-12 w-12 object-contain"
                  />
                </span>
              </span>
              <span className="font-serif text-2xl tracking-wide">
                RHC World
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Local expertise, verified properties, and personal guidance for a
              simpler property journey across Kashi and Purvanchal.
            </p>

            <div className="mt-7 flex gap-3">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                    delay: 0.3 + i * 0.07,
                  }}
                  whileHover={{ y: -3 }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 transition-colors duration-300 hover:border-[#7cc4ff]/60 hover:bg-[#0b6fb8] hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {COLUMNS.map((col, ci) => (
            <motion.nav
              key={col.title}
              {...fadeUp(0.08 * (ci + 1))}
              aria-label={col.title}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7cc4ff]">
                {col.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[15px] text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      <span className="h-px w-0 bg-[#7cc4ff] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-2 group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          {/* Contact */}
          <motion.div {...fadeUp(0.32)} className="col-span-2 sm:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7cc4ff]">
              Visit us
            </h3>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
              <p className="flex items-start gap-3 text-[15px] leading-relaxed text-white/75">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#7cc4ff]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                </svg>
                Varanasi, Uttar Pradesh, India
              </p>
              <Link
                href="/contact"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Schedule a site visit
                <ArrowIcon className="h-4 w-4 text-[#7cc4ff] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Giant wordmark ── */}
      <div aria-hidden className="relative select-none overflow-hidden px-3">
        {/* One in-view trigger staggers every letter; the fade comes from a
            mask on the whole word (gradient-clipped text can vanish while
            letters are being transformed). */}
        <motion.div
          className="flex justify-center font-serif text-[14.5vw] leading-[0.82] tracking-tight text-white/[0.13] [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.06 }}
        >
          {WORDMARK.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { y: "60%", opacity: 0, filter: "blur(10px)" },
                shown: { y: "0%", opacity: 1, filter: "blur(0px)" },
              }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-6 text-sm text-white/45 sm:flex-row sm:justify-between sm:px-10">
          <p>© {year} RHC World. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="#privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link href="#terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <motion.button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="group grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-transparent hover:bg-white hover:text-[#0a1f3d]"
            >
              <ArrowIcon className="h-4 w-4 -rotate-90" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
