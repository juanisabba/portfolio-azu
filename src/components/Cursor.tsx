"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small white dot with `mix-blend-mode: difference`,
 * so it inverts whatever is underneath. Only on fine pointers (mouse).
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = ref.current;
    if (!dot) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      dot.style.opacity = "1";
    };
    const hide = () => {
      dot.style.opacity = "0";
    };
    const over = (e: MouseEvent) => {
      if (e.target instanceof HTMLIFrameElement) hide();
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    root.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      root.removeEventListener("mouseleave", hide);
      root.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
