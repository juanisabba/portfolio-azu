"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

type Props = {
  images: string[];
  title: string;
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
};

export default function Lightbox({ images, title, index, onChange, onClose }: Props) {
  const n = images.length;
  const prev = useCallback(() => onChange((index - 1 + n) % n), [index, n, onChange]);
  const next = useCallback(() => onChange((index + 1) % n), [index, n, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — gallery`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      onClick={onClose}
    >
      <div className="relative h-[85vh] w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${title} — photo ${index + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-xs tracking-[0.2em] uppercase hover:opacity-50 md:top-8 md:right-10"
      >
        Cerrar
      </button>
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute bottom-6 left-5 text-xs tracking-[0.2em] uppercase hover:opacity-50 md:top-1/2 md:bottom-auto md:left-10"
      >
        ← Prev
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-5 bottom-6 text-xs tracking-[0.2em] uppercase hover:opacity-50 md:top-1/2 md:right-10 md:bottom-auto"
      >
        Next →
      </button>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-muted">
        {index + 1} / {n}
      </p>
    </div>
  );
}
