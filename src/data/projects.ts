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
  },
  {
    slug: "the-new-west",
    title: "The New West",
    role: "Styling",
    description: "Menswear styling. Studio with industrial backdrop.",
    images: photos("the-new-west", 2),
  },
  {
    slug: "aquazzura",
    title: "Bodegón Aquazzura",
    role: "Styling",
    client: "Aquazzura",
    description: "Accessories still life. Photography: Alexander Gross & Jennifer Bauser.",
    images: photos("aquazzura", 2),
  },
  {
    slug: "pinko",
    title: "Pinko",
    role: "E-commerce",
    client: "Pinko",
    description: "Studio e-commerce. Blue croc leather, washed denim and red accents.",
    images: photos("pinko", 6),
  },
  {
    slug: "carolina-herrera",
    title: "Carolina Herrera",
    role: "Visual Merchandising",
    client: "Carolina Herrera",
    description: "In-store display: rails, leather goods and an equestrian window.",
    images: photos("carolina-herrera", 5),
  },
  {
    slug: "purificacion-garcia",
    title: "Purificación García",
    role: "Visual Merchandising",
    client: "Purificación García",
    description: "Rail styling and in-store display. Seasonal collections.",
    images: photos("purificacion-garcia", 12),
  },
  {
    slug: "back-in-70s",
    title: "Back in 70s",
    role: "Production & Styling",
    description: "Editorial in a classic Buenos Aires apartment. Natural light, two looks.",
    images: photos("back-in-70s", 6),
  },
  {
    slug: "avant-garde-in-the-city",
    title: "Avant-Garde in the City",
    role: "Production & Styling",
    description: "Shot on the streets of Buenos Aires. Black, sheer layers and tartan.",
    images: photos("avant-garde-in-the-city", 5),
  },
  {
    slug: "aura-botanica",
    title: "Aura Botánica",
    role: "Production & Styling",
    description: "Romantic editorial among iron and glass. White and flowers.",
    images: photos("aura-botanica", 3),
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
