import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import Reveal from "./Reveal";

export default function ProjectRow({ project, priority = false }: { project: Project; priority?: boolean }) {
  const href = `/projects/${project.slug}`;
  return (
    <Reveal>
      <article className="group">
        <Link href={href} className="mb-4 flex items-baseline justify-between gap-4 px-4 md:px-10">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase">{project.title}</h2>
          <span className="text-right text-xs tracking-[0.15em] text-muted uppercase">{project.role}</span>
        </Link>
        <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto scroll-px-4 px-4 md:gap-3 md:scroll-px-10 md:px-10">
          {project.images.map((src, i) => (
            <Link
              key={src}
              href={href}
              className="relative aspect-[3/4] w-[62vw] shrink-0 snap-start overflow-hidden bg-foreground/5 sm:w-[38vw] md:w-[24vw] lg:w-[19vw]"
            >
              <Image
                src={src}
                alt={`${project.title} — photo ${i + 1}`}
                fill
                priority={priority && i < 3}
                sizes="(min-width:1024px) 19vw, (min-width:768px) 24vw, (min-width:640px) 38vw, 62vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>
      </article>
    </Reveal>
  );
}
