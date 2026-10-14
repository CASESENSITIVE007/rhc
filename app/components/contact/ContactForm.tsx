"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  PROPERTY_TYPES,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "../../lib/enquiry";

const EASE = [0.22, 1, 0.36, 1] as const;

const EMPTY: Enquiry = {
  name: "",
  phone: "",
  email: "",
  propertyType: "House",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "failed";

const CONTROL =
  "w-full rounded-xl border bg-[#f3f6fb] px-4 text-[15px] text-[#0a1f3d] outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-[#0b6fb8]/30 focus:border-[#0b6fb8]/60 focus:bg-white focus:shadow-[0_0_0_4px_rgba(11,111,184,0.12)]";

function FieldShell({
  id,
  label,
  error,
  index,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.07 }}
    >
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-medium text-[#0a1f3d]/80"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-1.5 text-xs font-medium text-rose-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set =
    <K extends keyof Enquiry>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const aria = (key: keyof Enquiry) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  const border = (key: keyof Enquiry) =>
    errors[key] ? "border-rose-300" : "border-[#0a1f3d]/[0.07]";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          className="flex min-h-[520px] flex-col items-center justify-center px-4 text-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="relative grid h-24 w-24 place-items-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-[#0b6fb8]/10"
              initial={{ scale: 0.4 }}
              animate={{ scale: [0.4, 1.25, 1] }}
              transition={{ duration: 0.9, ease: EASE }}
            />
            <svg
              viewBox="0 0 52 52"
              className="relative h-14 w-14"
              fill="none"
              aria-hidden
            >
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                stroke="#0b6fb8"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M15 27l7 7 15-16"
                stroke="#0d3b73"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
              />
            </svg>
          </div>
          <h3 className="mt-8 font-serif text-3xl text-[#0a1f3d]">
            Thank you, {form.name.trim().split(" ")[0]}.
          </h3>
          <p className="mt-3 max-w-xs text-slate-500">
            We’ve received your enquiry and will call you back on{" "}
            <span className="font-medium text-[#0a1f3d]">{form.phone}</span>{" "}
            soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setStatus("idle");
            }}
            className="mt-8 text-sm font-semibold text-[#0b6fb8] underline-offset-4 hover:underline"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-5"
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.4 }}
        >
          <FieldShell id="name" label="Your name" error={errors.name} index={0}>
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Full name"
              value={form.name}
              onChange={set("name")}
              className={`${CONTROL} ${border("name")} h-12`}
              {...aria("name")}
            />
          </FieldShell>

          <FieldShell
            id="phone"
            label="Phone number"
            error={errors.phone}
            index={1}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={set("phone")}
              className={`${CONTROL} ${border("phone")} h-12`}
              {...aria("phone")}
            />
          </FieldShell>

          <FieldShell
            id="email"
            label="Email address"
            error={errors.email}
            index={2}
          >
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              value={form.email}
              onChange={set("email")}
              className={`${CONTROL} ${border("email")} h-12`}
              {...aria("email")}
            />
          </FieldShell>

          <FieldShell
            id="propertyType"
            label="Property type"
            error={errors.propertyType}
            index={3}
          >
            <div className="group relative">
              <select
                id="propertyType"
                name="propertyType"
                value={form.propertyType}
                onChange={set("propertyType")}
                className={`${CONTROL} ${border("propertyType")} h-12 cursor-pointer appearance-none pr-11`}
                {...aria("propertyType")}
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0a1f3d] transition-transform duration-300 group-focus-within:rotate-180 group-focus-within:text-[#0b6fb8]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </div>
          </FieldShell>

          <FieldShell
            id="message"
            label="Your enquiry"
            error={errors.message}
            index={4}
          >
            <textarea
              id="message"
              name="message"
              rows={3}
              maxLength={1000}
              placeholder="Tell us what you are looking for"
              value={form.message}
              onChange={set("message")}
              className={`${CONTROL} ${border("message")} resize-none py-3`}
              {...aria("message")}
            />
          </FieldShell>

          <AnimatePresence>
            {status === "failed" && (
              <motion.p
                role="alert"
                className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Something went wrong while sending. Please try again.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              className="group relative mt-1 inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full border border-[#0d3b73] px-6 text-[15px] font-medium text-[#0d3b73] disabled:cursor-wait"
            >
              <span
                className={`absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
                  status === "sending" ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <span
                className={`relative transition-colors duration-500 group-hover:text-white ${
                  status === "sending" ? "text-white" : ""
                }`}
              >
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </span>
              {status === "sending" ? (
                <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
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
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
