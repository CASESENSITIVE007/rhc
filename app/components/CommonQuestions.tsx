"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Q1's answer is from the design; the rest are drafts — review before launch.
const QUESTIONS = [
  {
    q: "How do I buy a property with RHC World?",
    a: "Tell us what kind of home you want and your budget. We show you properties that fit, arrange a visit, and stay with you until the deal is done.",
  },
  {
    q: "Are the properties genuine?",
    a: "Yes. Every listing is checked before it goes live, and we share the property’s information and documents with you upfront so you can see everything clearly.",
  },
  {
    q: "Can I see a property before I decide?",
    a: "Of course. We arrange site visits for the properties you shortlist, and someone from our team comes along to answer your questions on the spot.",
  },
  {
    q: "Which papers should I ask for?",
    a: "Usually the sale or title deed, the encumbrance certificate, the approved building plan, recent property tax receipts and, for new projects, the RERA registration. We help you go through each one.",
  },
  {
    q: "Can I buy a property to invest?",
    a: "Yes. We can show you properties and projects across Kashi and Purvanchal that suit investment, and explain what to look for so you can decide with confidence.",
  },
  {
    q: "Who can I talk to if I have a doubt?",
    a: "Just reach out to our team by phone or through the contact form. You’ll have a dedicated person to help you from your first enquiry to the site visit and beyond.",
  },
];

function QuestionRow({
  index,
  item,
  open,
  onToggle,
}: {
  index: number;
  item: (typeof QUESTIONS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${index}`;

  return (
    <motion.li
      className="group relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.07 }}
    >
      {index > 0 && (
        <span
          aria-hidden
          className="absolute inset-x-5 top-0 h-px bg-[#0a1f3d]/[0.07] sm:inset-x-6"
        />
      )}

      {/* Open-state wash + accent bar */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-1 rounded-2xl bg-gradient-to-r from-[#0b6fb8]/[0.06] to-transparent transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1 top-6 w-[3px] rounded-full bg-gradient-to-b from-[#0d3b73] to-[#0b6fb8] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "h-8 opacity-100" : "h-0 opacity-0"
        }`}
      />

      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="relative flex w-full items-center gap-5 px-5 py-5 text-left sm:gap-7 sm:px-6 sm:py-6"
        >
          <span
            className={`w-6 shrink-0 font-serif text-sm italic transition-colors duration-500 ${
              open ? "text-[#0b6fb8]" : "text-[#0b6fb8]/60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 font-serif text-lg text-[#0a1f3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 sm:text-xl">
            {item.q}
          </span>
          <motion.span
            aria-hidden
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
              open
                ? "bg-gradient-to-br from-[#0d3b73] to-[#0b6fb8] text-white shadow-[0_6px_16px_-6px_rgba(11,111,184,0.8)]"
                : "bg-[#eaf2fb] text-[#0d3b73] group-hover:bg-[#dbe9f8]"
            }`}
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            className="relative overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.p
              className="max-w-2xl pb-6 pl-[4.25rem] pr-6 text-[15px] leading-relaxed text-slate-500 sm:pl-[5.25rem] sm:pr-16"
              initial={{ y: -8, filter: "blur(4px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function CommonQuestions() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[#f8f8f6] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[480px] w-[480px] rounded-full bg-[#0b6fb8]/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#7cc4ff]/15 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* Header */}
        <div className="max-w-xl">
          <h2 className="overflow-hidden pb-1 font-serif text-4xl leading-[1.1] text-[#0a1f3d] sm:text-5xl">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              Common{" "}
              <em className="bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] bg-clip-text pr-1 not-italic text-transparent">
                Questions.
              </em>
            </motion.span>
          </h2>
          <motion.p
            className="mt-4 text-base text-slate-500 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Simple answers to what people ask us most before buying or investing
            in property.
          </motion.p>
        </div>

        {/* Accordion card */}
        <motion.div
          className="mt-14 rounded-[28px] border border-white bg-white/90 p-2 shadow-[0_1px_2px_rgba(10,31,61,0.04),0_40px_80px_-44px_rgba(10,31,61,0.4)] backdrop-blur-xl sm:mt-20 sm:p-3"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <ul>
            {QUESTIONS.map((item, i) => (
              <QuestionRow
                key={item.q}
                index={i}
                item={item}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full border border-[#0d3b73] bg-white/50 px-7 text-sm font-medium text-[#0d3b73] backdrop-blur-md"
          >
            <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            <span className="relative transition-colors duration-500 group-hover:text-white">
              Add a question
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
    </section>
  );
}
