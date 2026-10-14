import type { Metadata } from "next";
import ContactView from "../components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact | RHC",
  description:
    "Make an enquiry with RHC — tell us what you are looking for and we will call you back soon.",
};

export default function ContactPage() {
  return <ContactView />;
}
