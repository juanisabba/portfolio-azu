/**
 * Project data.
 *
 * Photos live in `public/projects/<slug>/NN.jpg` (01 is the cover).
 * Unprocessed originals in `src/assets/<slug>/`.
 * To add photos: export JPG (~2400px long edge) into the project folder
 * and append them to the `images` array.
 */

export type Project = {
  slug: string;
  title: string;
  role: string;
  client?: string;
  description: string;
  images: string[];
  /**
   * Where the important subject (face, bag, display) sits in each photo, keyed by
   * file name, as "x% y%". Photos not listed are centered.
   */
  focus?: Record<string, string>;
};

const photos = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/projects/${slug}/${String(i + 1).padStart(2, "0")}.jpg`);

export const projects: Project[] = [
  {
    slug: "pedro-del-hierro",
    title: "Pedro de Hierro",
    role: "E-commerce",
    client: "Pedro de Hierro",
    description: "Menswear e-commerce production. Studio with industrial backdrop.",
    images: photos("pedro-del-hierro", 4),
    // 03: upper hand gripping the sweater.
    focus: { "01.jpg": "43% 8%", "02.jpg": "47% 26%", "03.jpg": "60% 28%" },
  },
  {
    slug: "the-new-west",
    title: "The New West",
    role: "Styling",
    description: "Menswear styling. Studio with industrial backdrop.",
    images: photos("the-new-west", 2),
    // 01: upper body. 02: raised boot + his hands.
    focus: { "01.jpg": "55% 30%", "02.jpg": "42% 55%" },
  },
  {
    slug: "aquazzura",
    title: "Bodegón Aquazzura",
    role: "Styling",
    client: "Aquazzura",
    description: "Accessories still life. Photography: Alexander Gross & Jennifer Bauser.",
    images: photos("aquazzura", 2),
    focus: { "01.jpg": "56% 42%", "02.jpg": "50% 39%", "home-01.jpg": "50% 45%", "home-02.jpg": "54% 46%" },
  },
  {
    slug: "pinko",
    title: "Pinko",
    role: "E-commerce",
    client: "Pinko",
    description: "Studio e-commerce. Blue croc leather, washed denim and red accents.",
    images: photos("pinko", 6),
    focus: { "01.jpg": "46% 30%", "02.jpg": "50% 25%", "05.jpg": "50% 40%", "06.jpg": "50% 55%" },
  },
  {
    slug: "carolina-herrera",
    title: "Carolina Herrera",
    role: "Visual Merchandising",
    client: "Carolina Herrera",
    description: "In-store display: rails, leather goods and an equestrian window.",
    images: photos("carolina-herrera", 5),
    focus: { "01.jpg": "45% 60%", "02.jpg": "45% 62%" },
  },
  {
    slug: "purificacion-garcia",
    title: "Purificación García",
    role: "Visual Merchandising",
    client: "Purificación García",
    description: "Rail styling and in-store display. Seasonal collections.",
    images: photos("purificacion-garcia", 12),
    focus: { "01.jpg": "53% 50%", "02.jpg": "55% 45%" },
  },
  {
    slug: "back-in-70s",
    title: "Back in 70s",
    role: "Production & Styling",
    description: "Editorial in a classic Buenos Aires apartment. Natural light, two looks.",
    images: photos("back-in-70s", 6),
    focus: { "01.jpg": "54% 42%", "02.jpg": "56% 39%" },
  },
  {
    slug: "avant-garde-in-the-city",
    title: "Avant-Garde in the City",
    role: "Production & Styling",
    description: "Shot on the streets of Buenos Aires. Black, sheer layers and tartan.",
    images: photos("avant-garde-in-the-city", 5),
    focus: { "01.jpg": "56% 35%", "02.jpg": "58% 33%" },
  },
  {
    slug: "aura-botanica",
    title: "Aura Botánica",
    role: "Production & Styling",
    description: "Romantic editorial among iron and glass. White and flowers.",
    images: photos("aura-botanica", 3),
    focus: { "01.jpg": "50% 43%", "02.jpg": "50% 40%" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    prev: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}

/** Focal point ("x% y%") of a photo under /projects/<slug>/, or centered. */
export function focusOf(src: string) {
  const [, slug, file] = src.match(/\/projects\/([^/]+)\/([^/]+)$/) ?? [];
  return projects.find((p) => p.slug === slug)?.focus?.[file] ?? "50% 50%";
}
