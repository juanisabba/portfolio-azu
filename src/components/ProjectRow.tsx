import Image from "next/image";
import Link from "next/link";
import { focusOf, type Project } from "@/data/projects";

type Props = {
  project: Project;
  index?: number;
  priority?: boolean;
};

/** First two photos of a project side by side, title and role overlaid on top. */
export default function ProjectRow({ project, index = 0, priority = false }: Props) {
  return (
    <Link href={`/projects/${project.slug}`} className="relative block">
      <div className="grid grid-cols-2 gap-1">
        {project.images.slice(0, 2).map((src, i) => (
          <div key={src} className="relative aspect-[3/4] overflow-hidden bg-foreground/5">
            <Image
              src={src}
              alt={`${project.title} — photo ${i + 1}`}
              fill
              priority={priority}
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: focusOf(src) }}
            />
            {/* Dark-to-transparent fade keeps white text readable on light photos. */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 via-black/25 to-transparent md:h-28" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-baseline justify-between gap-4 px-4 pt-3 text-white md:px-10 md:pt-5">
        <h2 className="text-xs font-medium tracking-[0.2em] uppercase [text-shadow:0_1px_3px_rgb(0_0_0/0.35)] md:text-sm">
          <span className="mr-3 opacity-70">{String(index + 1).padStart(2, "0")}</span>
          {project.title}
        </h2>
        <span className="text-right text-[10px] tracking-[0.15em] uppercase opacity-80 [text-shadow:0_1px_3px_rgb(0_0_0/0.35)] md:text-xs">
          {project.role}
        </span>
      </div>
    </Link>
  );
}
