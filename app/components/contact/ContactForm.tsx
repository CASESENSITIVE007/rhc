"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  BUDGETS,
  INTERESTS,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "../../lib/enquiry";

const EASE = [0.22, 1, 0.36, 1] as const;

const EMPTY: Enquiry = {
  name: "",
  phone: "",
  email: "",
  interest: "Buy",
  budget: "Not sure yet",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "failed";

/** Text input / textarea with a floating label and animated underline. */
function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  multiline = false,
  optional = false,
  autoComplete,
  inputMode,
}: {
  id: keyof Enquiry;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const common = {
    id,
    name: id,
    value,
    placeholder: " ",
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className:
      "peer w-full resize-none border-0 border-b bg-transparent pb-3 pt-6 text-[15px] text-[#0a1f3d] outline-none transition-colors duration-300 placeholder:text-transparent " +
      (error ? "border-rose-400" : "border-[#0a1f3d]/15"),
  };

  return (
    <div className="relative">
      {multiline ? (
        <textarea rows={4} maxLength={1000} {...common} />
      ) : (
        <input
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          {...common}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-[15px] text-slate-400 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-[0.12em] peer-focus:text-[#0b6fb8] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-[0.12em] peer-[:not(:placeholder-shown)]:uppercase peer-focus:uppercase"
      >
        {label}
        {optional && (
          <span className="ml-1 normal-case tracking-normal text-slate-300">
            (optional)
          </span>
        )}
      </label>
      {/* Focus underline grows from the left */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#0d3b73] to-[#0b6fb8] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:scale-x-100" />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-2 text-xs font-medium text-rose-500"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pills<T extends string>({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </legend>
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                active
                  ? "border-transparent text-white"
                  : "border-[#0a1f3d]/12 text-[#0a1f3d]/70 hover:border-[#0b6fb8]/50 hover:text-[#0a1f3d]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`${name}-pill`}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0d3b73] to-[#0b6fb8] shadow-[0_6px_16px_-6px_rgba(11,111,184,0.8)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{opt}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set =
    <K extends keyof Enquiry>(key: K) =>
    (v: Enquiry[K]) => {
      setForm((f) => ({ ...f, [key]: v }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };

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
    <div className="relative min-h-[560px]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            className="flex min-h-[560px] flex-col items-center justify-center text-center"
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
            <p className="mt-3 max-w-sm text-slate-500">
              We’ve received your enquiry and will get back to you on{" "}
              <span className="font-medium text-[#0a1f3d]">{form.phone}</span>.
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
            className="flex flex-col gap-8"
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.4 }}
          >
            <Pills
              name="interest"
              label="I’m looking to"
              options={INTERESTS}
              value={form.interest}
              onChange={set("interest")}
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <Field
                id="name"
                label="Full name"
                value={form.name}
                error={errors.name}
                onChange={set("name")}
                autoComplete="name"
              />
              <Field
                id="phone"
                label="Phone number"
                type="tel"
                inputMode="tel"
                value={form.phone}
                error={errors.phone}
                onChange={set("phone")}
                autoComplete="tel"
              />
            </div>

            <Field
              id="email"
              label="Email"
              type="email"
              optional
              value={form.email}
              error={errors.email}
              onChange={set("email")}
              autoComplete="email"
            />

            <Pills
              name="budget"
              label="Budget"
              options={BUDGETS}
              value={form.budget}
              onChange={set("budget")}
            />

            <Field
              id="message"
              label="Tell us what you’re looking for"
              multiline
              optional
              value={form.message}
              error={errors.message}
              onChange={set("message")}
            />

            <AnimatePresence>
              {status === "failed" && (
                <motion.p
                  role="alert"
                  className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Something went wrong while sending. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-relaxed text-slate-400">
                We only use your details to respond to this enquiry.
              </p>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] pl-7 pr-2 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(10,31,61,0.8)] transition-shadow duration-500 hover:shadow-[0_20px_44px_-14px_rgba(11,111,184,0.9)] disabled:cursor-wait"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </span>
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a1f3d]">
                  {status === "sending" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a1f3d]/20 border-t-[#0a1f3d]" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45"
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
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
