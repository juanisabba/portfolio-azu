"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3">
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 120}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-foreground/5"
              aria-label={`Enlarge photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — photo ${i + 1}`}
                fill
                priority={i < 3}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
            </button>
          </Reveal>
        ))}
      </div>
      {index !== null && (
        <Lightbox images={images} title={title} index={index} onChange={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
