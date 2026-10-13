import type { Metadata } from "next";
import AboutSection from "../components/AboutSection";

export const metadata: Metadata = {
  title: "About | RHC",
  description:
    "Local expertise, verified properties, and personal guidance for a simpler property journey across Kashi and Purvanchal.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutSection isStandalone />
    </main>
  );
}