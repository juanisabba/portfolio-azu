"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock page scroll while the mobile menu is open; close it with Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Hide on scroll down, show again on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 80);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/projects")
      : pathname.startsWith(href);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-[transform,border-color] duration-300 ease-out motion-reduce:transition-none ${
          scrolled && !open ? "border-foreground/10" : "border-transparent"
        } ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-10">
          <span aria-hidden="true" />

          <Link
            href="/"
            onClick={close}
            className="font-serif text-xl font-bold tracking-[0.25em] whitespace-nowrap uppercase transition-opacity hover:opacity-70 md:text-2xl"
          >
            {site.name}
          </Link>

          <nav className="hidden gap-10 justify-self-end lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="nav-link text-[11px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100 aria-[current=page]:opacity-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative -mr-2 h-10 w-10 justify-self-end lg:hidden"
          >
            <span
              className={`absolute left-2 h-px w-6 bg-foreground transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : "top-[15px]"
              }`}
            />
            <span
              className={`absolute left-2 h-px w-6 bg-foreground transition-all duration-300 ${
                open ? "top-1/2 -rotate-45" : "top-[24px]"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-background px-4 pt-12 pb-10 transition-opacity duration-300 md:top-20 md:px-10 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              aria-current={isActive(l.href) ? "page" : undefined}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              className={`font-serif text-5xl font-light transition-all duration-500 ease-out aria-[current=page]:italic ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-xs tracking-[0.15em] uppercase">
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </>
  );
}
