import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const items = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Instagram", value: site.instagramHandle, href: site.instagram },
    { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-4 pt-8 md:px-10 md:pt-14">
      <Reveal>
        <h1 className="font-sans text-sm font-medium tracking-[0.25em] uppercase md:text-base">Contact Me</h1>
      </Reveal>
      <ul className="mt-8 border-t border-foreground/10 md:mt-12">
        {items.map((it, i) => (
          <li key={it.label} className="border-b border-foreground/10">
            <Reveal delay={i * 120}>
              <a
                href={it.href}
                target={it.label === "Instagram" ? "_blank" : undefined}
                rel="noreferrer"
                className="flex flex-col gap-1 py-6 transition-opacity hover:opacity-50 md:flex-row md:items-baseline md:justify-between"
              >
                <span className="text-xs tracking-[0.2em] text-muted uppercase">{it.label}</span>
                <span className="font-serif text-2xl font-light break-all md:text-4xl">{it.value}</span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
