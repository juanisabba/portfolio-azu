"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/projects")
      : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:h-20 md:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-serif text-xl tracking-[0.25em] uppercase md:text-2xl"
          >
            Azul Gogna
          </Link>

          <nav className="hidden gap-10 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-100 ${
                  isActive(l.href) ? "opacity-100" : "opacity-50"
                }`}
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
            className="relative h-6 w-7 md:hidden"
          >
            <span
              className={`absolute left-0 h-px w-full bg-foreground transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : "top-1.5"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-foreground transition-all duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-background transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-8 px-4 pt-12">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
