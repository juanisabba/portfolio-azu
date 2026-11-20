import ProjectRow from "@/components/ProjectRow";
import Splash from "@/components/Splash";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Azul Gogna — Fashion stylist &amp; producer</h1>

      <Splash />

      <div data-flush-footer className="flex flex-col gap-1">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} priority={i === 0} />
        ))}
      </div>
    </>
  );
}
