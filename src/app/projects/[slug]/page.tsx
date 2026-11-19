import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { getAdjacent, getProject, projects } from "@/data/projects";

// Fully static pages (generateStaticParams). Avoids dev warning on unknown slugs.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacent(slug);

  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-10">
      <header className="grid gap-8 pt-12 pb-12 md:grid-cols-12 md:pt-20 md:pb-16">
        <h1 className="font-serif text-5xl leading-none font-light md:col-span-7 md:text-8xl">{project.title}</h1>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-end text-xs tracking-[0.15em] uppercase md:col-span-5">
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          {project.client && (
            <div>
              <dt className="text-muted">Client</dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
          )}
          <p className="col-span-2 mt-2 text-sm leading-relaxed tracking-normal normal-case">
            {project.description}
          </p>
        </dl>
      </header>

      <Gallery images={project.images} title={project.title} />

      <nav className="mt-20 flex justify-between border-t border-foreground/10 pt-8 text-xs tracking-[0.2em] uppercase">
        <Link href={`/projects/${prev.slug}`} className="hover:opacity-50">
          ← {prev.title}
        </Link>
        <Link href={`/projects/${next.slug}`} className="text-right hover:opacity-50">
          {next.title} →
        </Link>
      </nav>
    </div>
  );
}
