"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { SPLASH_COOKIE, SPLASH_HIDE_SECONDS } from "@/data/splash";

type Slide = {
  src: string;
  /** Where the important subject sits in the photo, as "x% y%". */
  focus: string;
  /**
   * Zoom relative to "just covers the screen" (1 = none). Above 1 allows
   * reframing; below 1 shrinks the photo over a blurred copy of itself.
   */
  zoom?: number;
  /**
   * "width": never crop the sides; on screens narrower than the photo, show it
   * full-width over a blurred copy of itself instead of zooming in.
   */
  fit?: "width";
  /** Skip this photo on phones (viewport under 768px wide). */
  desktopOnly?: boolean;
};

type Size = { w: number; h: number };

/**
 * Size and place the photo so it covers the screen (times `zoom`) with the
 * focal point as close to the middle as the crop allows. Plain
 * `object-position: x% y%` only aligns, so on a wide screen a face near the
 * top of a tall photo could still be cut.
 */
function placeOn(focus: string, zoom: number, img: Size | undefined, view: Size): CSSProperties {
  if (!img || !view.w || !view.h) {
    return { inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: focus };
  }
  const [fx, fy] = focus.split(" ").map((v) => parseFloat(v) / 100);
  // Zooming out never goes below full height, so it only ever opens side space.
  const scale = Math.max(Math.max(view.w / img.w, view.h / img.h) * zoom, view.h / img.h);
  const w = img.w * scale;
  const h = img.h * scale;
  // Keep the photo covering its axis; if it's smaller than the screen (zoom < 1), center it.
  const clamp = (v: number, min: number) => (min > 0 ? min / 2 : Math.min(0, Math.max(min, v)));
  return {
    width: w,
    height: h,
    maxWidth: "none",
    left: clamp(view.w / 2 - fx * w, view.w - w),
    top: clamp(view.h / 2 - fy * h, view.h - h),
  };
}

type Props = {
  slides: Slide[];
  /** Milliseconds between image swaps. */
  interval?: number;
};

export default function HomeSlideshow({ slides, interval = 312 }: Props) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [view, setView] = useState({ w: 0, h: 0 });
  const [sizes, setSizes] = useState<Record<string, { w: number; h: number }>>({});

  const isPhone = view.w > 0 && view.w < 768;
  const visible = isPhone ? slides.filter((s) => !s.desktopOnly) : slides;
  const count = visible.length;

  // Lock page scroll behind the intro while it's showing.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  const enter = () => {
    document.cookie = `${SPLASH_COOKIE}=1; max-age=${SPLASH_HIDE_SECONDS}; path=/; samesite=lax`;
    setOpen(false);
  };

  // Preload every image so the fast swap never flashes blank frames.
  // Slides play in the order given.
  useEffect(() => {
    let loaded = 0;
    const found: Record<string, { w: number; h: number }> = {};
    slides.forEach(({ src }) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (img.naturalWidth) found[src] = { w: img.naturalWidth, h: img.naturalHeight };
        loaded += 1;
        if (loaded < slides.length) return;
        setSizes(found);
        setReady(true);
      };
      img.src = src;
    });
  }, [slides]);

  useEffect(() => {
    if (!open || !ready || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [open, ready, count, interval]);

  // Track the viewport so the focal point stays centered on resize/rotation.
  useEffect(() => {
    const update = () => setView({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!open) return null;
  const slide = visible[index % count];
  const size = sizes[slide.src];
  const fitWidth = slide.fit === "width" && !!size && view.w / view.h < size.w / size.h;
  // Photo may not fill the screen: show a blurred copy behind it.
  const backdrop = fitWidth || (slide.zoom ?? 1) < 1;

  return (
    <section className="fixed inset-0 z-50 overflow-hidden bg-black">
      {backdrop && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slide.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.src}
        alt=""
        aria-hidden="true"
        style={fitWidth ? undefined : placeOn(slide.focus, slide.zoom ?? 1, size, view)}
        className={`absolute ${fitWidth ? "inset-0 h-full w-full object-contain" : ""}`}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex h-full flex-col items-center justify-center gap-10 px-4 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-4xl tracking-[0.25em] uppercase md:text-6xl">
            Azul Gogna
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-90 md:text-xs">
            Fashion stylist &amp; producer
          </p>
        </div>
        <button
          type="button"
          onClick={enter}
          className="border border-white px-10 py-3 text-xs tracking-[0.3em] uppercase transition-colors hover:bg-white hover:text-black"
        >
          Enter
        </button>
      </div>
    </section>
  );
}
