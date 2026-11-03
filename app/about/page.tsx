import type { Metadata } from "next";
import AboutView from "../components/about/AboutView";

export const metadata: Metadata = {
  title: "About | RHC",
  description:
    "Meet Nisar Khan, founder and owner of RHC World Private Limited — helping people buy homes and invest in property across Uttar Pradesh and Bihar since 2015.",
};

export default function AboutPage() {
  return <AboutView />;
}
