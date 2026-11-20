import HomeSlideshow from "@/components/HomeSlideshow";
import { focusOf } from "@/data/projects";

// Photos shown edge to edge horizontally instead of zoomed in to fill the screen.
const FIT_WIDTH = new Set(["/projects/pinko/06.jpg"]);

// Photos skipped on phones.
const DESKTOP_ONLY = new Set(["/projects/pinko/06.jpg"]);

// Zoom relative to "just covers the screen": above 1 to reframe, below 1 to
// shrink (opens side space filled with a blurred copy; never on phones).
const ZOOM: Record<string, number> = {
  "/projects/pedro-del-hierro/01.jpg": 1.15,
};

// Fixed play order, mixed by hand so photos from the same project don't sit
// next to each other (except Pedro 01 → 03, on purpose). Focal points come
// from `focus` in data/projects.ts.
const slides = [
  "/projects/pedro-del-hierro/01.jpg",
  "/projects/pedro-del-hierro/03.jpg",
  "/projects/aquazzura/home-01.jpg",
  "/projects/the-new-west/01.jpg",
  "/projects/pinko/02.jpg",
  "/projects/carolina-herrera/01.jpg",
  "/projects/back-in-70s/01.jpg",
  "/projects/aquazzura/home-02.jpg",
  "/projects/pinko/06.jpg",
  "/projects/the-new-west/02.jpg",
  "/projects/purificacion-garcia/01.jpg",
  "/projects/pedro-del-hierro/02.jpg",
  "/projects/aura-botanica/02.jpg",
  "/projects/pinko/05.jpg",
].map((src) => ({
  src,
  focus: focusOf(src),
  zoom: ZOOM[src],
  fit: FIT_WIDTH.has(src) ? ("width" as const) : undefined,
  desktopOnly: DESKTOP_ONLY.has(src),
}));

/**
 * Full-screen intro over the home page. Always in the static HTML so it covers
 * the page from the first paint; hidden pre-paint while the "entered" cookie lives.
 */
export default function Splash() {
  return <HomeSlideshow slides={slides} interval={450} />;
}
