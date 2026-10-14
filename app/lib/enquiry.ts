// Shared by the contact form (client) and /api/contact (server).

export const PROPERTY_TYPES = ["House", "Flat", "Plot", "Commercial"] as const;

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  propertyType: (typeof PROPERTY_TYPES)[number];
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
    errors.email = "Please enter a valid email address";
  if (!PROPERTY_TYPES.includes(e.propertyType as Enquiry["propertyType"]))
    errors.propertyType = "Please choose a property type";
  if ((e.message ?? "").length > 1000)
    errors.message = "Please keep your enquiry under 1000 characters";

  return errors;
}
