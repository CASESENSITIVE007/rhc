// Shared by the contact form (client) and /api/contact (server).

export const INTERESTS = ["Buy", "Invest", "Sell", "Site visit"] as const;

export const BUDGETS = [
  "Not sure yet",
  "Under ₹50 L",
  "₹50 L – ₹1 Cr",
  "₹1 Cr – ₹3 Cr",
  "₹3 Cr +",
] as const;

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  interest: (typeof INTERESTS)[number];
  budget: (typeof BUDGETS)[number];
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(e: Partial<Enquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = e.name?.trim() ?? "";
  const phoneDigits = (e.phone ?? "").replace(/\D/g, "");
  const email = e.email?.trim() ?? "";

  if (name.length < 2) errors.name = "Please enter your name";
  if (phoneDigits.length < 10 || phoneDigits.length > 13)
    errors.phone = "Please enter a valid phone number";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email";
  if (!INTERESTS.includes(e.interest as Enquiry["interest"]))
    errors.interest = "Please choose an option";
  if (!BUDGETS.includes(e.budget as Enquiry["budget"]))
    errors.budget = "Please choose a budget";
  if ((e.message ?? "").length > 1000)
    errors.message = "Please keep your message under 1000 characters";

  return errors;
}
