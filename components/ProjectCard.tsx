import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/site";

const pad = (n: number) => String(n).padStart(2, "0");

/** Project card: a printed "spec sheet" preview on top, details below. */
export default function ProjectCard({ project, index, headingLevel = 3 }: { project: Project; index: number; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="frame frame-hover h-full" data-reveal style={{ "--i": index % 2 } as React.CSSProperties}>
      <div className="box flex flex-col">
        {project.image ? (
          <div className="preview p-4 sm:p-5" aria-hidden="true">
            <div className="relative aspect-[16/9] overflow-hidden border border-[#c9c9c5] bg-white">
              <Image src={project.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
            </div>
          </div>
        ) : null}
        <div className="flex flex-1 flex-col px-5 pt-6 pb-6 sm:px-6">
          <p className="label tnum">
            <b>{pad(index + 1)}</b> / Project
          </p>
          <Heading className="mt-3 text-[16px] leading-snug font-bold tracking-[.12em] uppercase sm:text-[18px]">
            <span translate="no">{project.title}</span> — {project.category}
          </Heading>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech">
            {project.stack.map((tag) => (
              <li key={tag} translate="no" className="border border-line px-2.5 py-1 text-[10px] tracking-[.12em] text-muted uppercase">
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link href={`/projects/${project.slug}`} className="btn btn-solid min-h-11 px-5 text-[12px]" aria-label={`View project: ${project.title}`}>
              View project <span className="arrow" aria-hidden="true">→</span>
            </Link>
            {project.url ? (
              <a href={project.url} className="btn btn-line min-h-11 px-5 text-[12px]" target="_blank" rel="noopener noreferrer">
                Visit project <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
