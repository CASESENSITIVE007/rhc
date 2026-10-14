import type { Metadata } from "next";
import ProjectsView from "../components/projects/ProjectsView";

export const metadata: Metadata = {
  title: "Projects | RHC",
  description: "RHC World projects across Kashi and Purvanchal — coming soon.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
