import { site } from "@/data/site";

export default function Footer() {
  return (
    // Pages that end edge-to-edge (data-flush-footer) get no gap above the footer.
    <footer className="mt-32 border-t border-foreground/10 [main:has([data-flush-footer])+&]:mt-0">

      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-10 text-xs tracking-[0.15em] uppercase md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-muted">{site.tagline}</p>
        <div className="flex gap-6">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:opacity-50">
            Instagram
          </a>
          <a href={`mailto:${site.email}`} className="hover:opacity-50">
            Email
          </a>
        </div>
        <p className="text-muted">© {site.year} Azul Gogna</p>
      </div>
    </footer>
  );
}
