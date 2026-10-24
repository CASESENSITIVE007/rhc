import type { Metadata } from "next";
import AboutView from "../components/about/AboutView";

export const metadata: Metadata = {
  title: "About | RHC",
  description:
    "Meet the founder behind RHC World — helping families buy homes and invest in property across Varanasi, Kashi and Purvanchal since 2015.",
};

export default function AboutPage() {
  return <AboutView />;
}
