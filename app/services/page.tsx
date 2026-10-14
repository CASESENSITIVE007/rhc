import type { Metadata } from "next";
import ServicesSection from "../components/ServicesSection";

export const metadata: Metadata = {
  title: "Services | RHC World",
  description:
    "Comprehensive luxury real estate services across Varanasi and Purvanchal: Residential, Commercial & Industrial, Property Management, Valuation, Investment Advisory, and 100% Legal Due Diligence.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesSection isStandalone />
    </main>
  );
}

