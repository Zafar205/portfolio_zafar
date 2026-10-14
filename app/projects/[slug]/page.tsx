import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import SubHeader from "@/components/SubHeader";
import { projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${slug}` } };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <>
      <SubHeader />
      <main id="main" className="shell pt-10 pb-24 md:pt-16">
        <Suspense fallback={<p className="label">Loading project…</p>}>
          <ProjectDetail params={params} />
        </Suspense>
      </main>
      <Footer top="#main" />
    </>
  );
}

/** Everything that depends on the slug; prerendered for every project in data/site.ts. */
async function ProjectDetail({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <nav aria-label="Breadcrumb" className="label">
        <Link href="/" className="link-line">Home</Link> / <Link href="/projects" className="link-line">Projects</Link> /{" "}
        <span aria-current="page" className="text-text">{project.title}</span>
      </nav>

      <div className="frame mt-10">
        <div className="box">
          <div className="preview h-full p-5 sm:p-8">
          <div className="border border-[#c9c9c5] px-6 py-10 sm:px-12 sm:py-14">
            <p className="text-[12px] tracking-[.22em] uppercase opacity-75">{project.category}</p>
            <hr className="mt-5 border-[#c9c9c5]" />
            <h1 className="preview-title mt-7 text-[clamp(36px,6vw,88px)] text-balance" translate="no">{project.title}</h1>
            <p className="mt-4 text-[12px] tracking-[.16em] uppercase opacity-80">{project.tagline.join(" · ")}</p>
            <hr className="mt-7 border-[#c9c9c5]" />
            <p className="mt-4 text-[14px] opacity-80">{project.footnote}</p>
          </div>
          </div>
        </div>
      </div>

      <div className="grid gap-12 py-14 md:grid-cols-[18rem_minmax(0,1fr)]">
        <dl className="space-y-6">
          <div>
            <dt className="label">Year</dt>
            <dd className="mt-1 tracking-[.08em]">{project.year}</dd>
          </div>
          <div>
            <dt className="label">Role</dt>
            <dd className="mt-1 tracking-[.04em]">{project.role}</dd>
          </div>
          <div>
            <dt className="label">Stack</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <li key={tag} translate="no" className="border border-line px-2.5 py-1 text-[10px] tracking-[.12em] text-muted uppercase">{tag}</li>
                ))}
              </ul>
            </dd>
          </div>
          {project.url ? (
            <div>
              <dt className="label">Live</dt>
              <dd className="mt-1">
                <a href={project.url} className="link-line" target="_blank" rel="noopener noreferrer">Visit website ↗</a>
              </dd>
            </div>
          ) : null}
        </dl>

        <section aria-labelledby="overview">
          <h2 id="overview" className="label"><b>{pad(index + 1)}</b> / Overview</h2>
          <p className="mt-4 max-w-[44rem] text-[17px] leading-relaxed">{project.summary}</p>
          <h3 className="label mt-10">What I built</h3>
          <ol className="mt-4 border-t border-line">
            {project.highlights.map((item, i) => (
              <li key={item} className="flex gap-6 border-b border-line py-5 text-[16px]">
                <span className="label tnum pt-0.5">{pad(i + 1)}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <Link href="/projects" className="label link-line">← All projects</Link>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="label block">Next project</span>
          <span className="mt-2 block text-[clamp(18px,2.4vw,26px)] font-bold tracking-[.1em] uppercase">{next.title} →</span>
        </Link>
      </div>
    </>
  );
}
