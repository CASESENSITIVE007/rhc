import type { Metadata } from "next";
import ContactView from "../components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact | RHC",
  description:
    "Talk to RHC about buying, investing or visiting verified properties in Varanasi.",
};

export default function ContactPage() {
  return <ContactView />;
}
