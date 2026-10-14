import type { Metadata } from "next";
import ServicesView from "../components/services/ServicesView";

export const metadata: Metadata = {
  title: "Services | RHC",
  description:
    "Property buying, investment opportunities, verification, site visits and personal assistance across Varanasi, Kashi and Purvanchal.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
