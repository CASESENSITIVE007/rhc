"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CONTACT } from "../../data/contact";
import { useIntroDone } from "../useIntroDone";
import ContactForm from "./ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const INFO = [
  {
    label: "Visit us",
    value: CONTACT.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`,
    icon: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  },
  {
    label: "Call us",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    icon: "M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z",
  },
  {
    label: "Email us",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: "M4 6h16v12H4V6Zm0 0 8 6.5L20 6",
  },
  {
    label: "Office hours",
    value: CONTACT.hours,
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2",
  },
];

const STEPS = [
  {
    title: "Share your requirements",
    body: "Tell us what you’re looking for, your preferred locations and budget.",
  },
  {
    title: "We shortlist for you",
    body: "Our local team handpicks verified properties that match your brief.",
  },
  {
    title: "Visit with confidence",
    body: "We arrange site visits and guide you through every document and step.",
  },
];

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function ContactView() {
  const ready = useIntroDone();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 },
  });

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#f6f8fc]">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]"
      >
        <div className="absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-[#0b6fb8]/15 blur-[130px]" />
        <div className="absolute -right-32 top-40 h-[440px] w-[440px] rounded-full bg-[#7cc4ff]/25 blur-[120px]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(10,31,61,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,31,61,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      {/* ── Header ── */}
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-36 sm:px-10 sm:pt-44">
        <motion.nav
          {...enter(0)}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-slate-400"
        >
          <Link href="/" className="transition-colors hover:text-[#0b6fb8]">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#0a1f3d]">Contact</span>
        </motion.nav>

        <h1 className="mt-6 max-w-4xl font-serif text-[2.75rem] leading-[1.05] tracking-tight text-[#0a1f3d] sm:text-7xl">
          {["Let’s talk about", "your next address."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: ready ? "0%" : "110%" }}
                transition={{
                  duration: 1.1,
                  ease: EASE,
                  delay: ready ? 0.1 + i * 0.14 : 0,
                }}
              >
                {i === 1 ? (
                  <>
                    your next{" "}
                    <em className="bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-2 text-transparent">
                      address.
                    </em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          {...enter(0.4)}
          className="mt-6 max-w-xl text-base text-slate-500 sm:text-lg"
        >
          Whether you’re buying, investing or simply exploring, our team will
          guide you with honest advice and verified options.
        </motion.p>
      </section>

      {/* ── Info panel + form ── */}
      <section className="mx-auto max-w-7xl px-5 sm:px-10">
        <motion.div
          {...enter(0.55)}
          className="grid overflow-hidden rounded-[32px] bg-white shadow-[0_1px_2px_rgba(10,31,61,0.04),0_40px_80px_-40px_rgba(10,31,61,0.45)] ring-1 ring-[#0a1f3d]/[0.06] lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* Info panel */}
          <aside className="relative isolate overflow-hidden bg-[#06142b] p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#0b6fb8]/35 blur-[100px]" />
              <div className="absolute -bottom-10 -right-20 h-[85%] w-[110%] bg-gradient-to-t from-[#7cc4ff] to-[#0b6fb8] opacity-[0.1] [mask-image:url(/whyChooseBackground.png)] [mask-position:right_bottom] [mask-repeat:no-repeat] [mask-size:contain]" />
            </div>

            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7cc4ff]">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#7cc4ff]" />
              Get in touch
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              We’d love to hear from you.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Reach out directly, or fill in the form and we’ll call you back.
            </p>

            <ul className="mt-10 space-y-3">
              {INFO.map((item, i) => {
                const content = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-[#7cc4ff] transition-colors duration-500 group-hover:border-transparent group-hover:bg-[#0b6fb8] group-hover:text-white">
                      <Icon d={item.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[15px] leading-snug text-white/90 sm:truncate">
                        {item.value}
                      </span>
                    </span>
                    {item.href && (
                      <Icon
                        d="M7 17 17 7M9 7h8v8"
                        className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    )}
                  </>
                );
                const cls =
                  "group flex items-center gap-4 rounded-2xl p-2 pr-3 transition-colors duration-500";
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={
                      ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }
                    }
                    transition={{
                      duration: 0.8,
                      ease: EASE,
                      delay: ready ? 0.8 + i * 0.08 : 0,
                    }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`${cls} hover:bg-white/[0.05]`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </aside>

          {/* Form */}
          <div className="p-8 sm:p-12">
            <h2 className="font-serif text-2xl text-[#0a1f3d] sm:text-3xl">
              Send us an enquiry
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Share a few details and we’ll get back to you shortly.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── What happens next ── */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <h2 className="overflow-hidden pb-1 font-serif text-4xl text-[#0a1f3d] sm:text-5xl">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            What happens{" "}
            <em className="bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 text-transparent">
              next
            </em>
          </motion.span>
        </h2>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <motion.span
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-px origin-left bg-gradient-to-r from-[#0d3b73]/40 via-[#0b6fb8]/40 to-[#7cc4ff]/40 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              {...inView(0.15 + i * 0.15)}
              className="group relative text-center"
            >
              <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-white font-serif text-xl text-[#0d3b73] shadow-[0_10px_30px_-12px_rgba(10,31,61,0.35)] ring-1 ring-[#0b6fb8]/15 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#0d3b73] group-hover:to-[#0b6fb8] group-hover:text-white">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-serif text-xl text-[#0a1f3d]">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[260px] text-sm leading-relaxed text-slate-500">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Map ── */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-10 sm:pb-32">
        <motion.div
          className="relative overflow-hidden rounded-[32px] ring-1 ring-[#0a1f3d]/[0.06] shadow-[0_40px_80px_-40px_rgba(10,31,61,0.45)]"
          initial={{
            clipPath: "inset(12% 6% 12% 6% round 32px)",
            opacity: 0.4,
          }}
          whileInView={{
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            opacity: 1,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <iframe
            title={`Map of ${CONTACT.mapQuery}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&z=12&output=embed`}
            className="block h-[420px] w-full border-0 [filter:grayscale(0.85)_contrast(1.05)_brightness(1.02)] sm:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Brand tint */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#0b6fb8]/10 mix-blend-multiply"
          />

          {/* Floating address card */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-3xl border border-white/70 bg-white/85 p-4 pr-5 shadow-[0_20px_40px_-20px_rgba(10,31,61,0.5)] backdrop-blur-xl sm:right-auto">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0d3b73] to-[#0b6fb8] text-white">
              <Icon d={INFO[0].icon} />
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-lg text-[#0a1f3d]">
                RHC World
              </span>
              <span className="block truncate text-sm text-slate-500">
                {CONTACT.address}
              </span>
            </span>
            <a
              href={INFO[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 rounded-full border border-[#0a1f3d]/15 px-4 py-2 text-xs font-semibold text-[#0a1f3d] transition-colors hover:bg-[#0a1f3d] hover:text-white sm:ml-6"
            >
              Directions
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
