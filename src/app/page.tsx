import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-4 pt-16 pb-20 md:px-10 md:pt-28 md:pb-32">
        <Reveal>
          <h1 className="max-w-5xl font-serif text-5xl leading-[1.05] font-light md:text-8xl">
            Fashion stylist <em className="italic">&amp;</em> producer
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
            Editorials, campaigns and content for fashion brands.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 md:gap-24">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} priority={i === 0} />
        ))}
      </div>
    </>
  );
}
