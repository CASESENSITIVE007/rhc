import type { Metadata } from "next";
import PropertiesView from "../components/properties/PropertiesView";

export const metadata: Metadata = {
  title: "Properties | RHC",
  description:
    "Verified homes, villas and apartments for sale across Varanasi — browse RHC's current listings.",
};

export default function PropertiesPage() {
  return <PropertiesView />;
}
