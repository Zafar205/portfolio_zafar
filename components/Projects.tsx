import { projects, sections } from "@/data/site";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const s = sections.work;
  return (
    <section id="work" aria-labelledby="work-title" className="shell py-24 md:py-32">
      <SectionHeading id="work-title" title={s.title} urdu={s.urdu} no={s.no} label={s.label} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
