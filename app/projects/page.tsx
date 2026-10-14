import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SubHeader from "@/components/SubHeader";
import { projects, sections } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Dealership platforms, school systems and fintech tools built by Muhammad Zafar.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <SubHeader />
      <main id="main" className="shell pt-10 pb-24 md:pt-16">
        <SectionHeading id="all-projects" title={sections.work.title} urdu={sections.work.urdu} no={String(projects.length).padStart(2, "0")} label="All work" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} headingLevel={2} />
          ))}
        </div>
      </main>
      <Footer top="#main" />
      <Reveal />
    </>
  );
}
