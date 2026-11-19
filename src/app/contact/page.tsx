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
    <div className="mx-auto max-w-[1600px] px-4 pt-12 md:px-10 md:pt-20">
      <Reveal>
        <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] font-light md:text-8xl">Contact Me</h1>
      </Reveal>
      <ul className="mt-16 border-t border-foreground/10 md:mt-24">
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
