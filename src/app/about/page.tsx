import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About" };

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center">
      <h2 className="mb-8 text-xs tracking-[0.2em] text-muted uppercase">{label}</h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 text-center md:px-10 md:pt-28">
      <Reveal>
        <h1 className="font-serif text-4xl leading-none font-light md:text-6xl">
          Hi!! I&rsquo;m <em className="italic">Azul.</em>
        </h1>
      </Reveal>
      <div className="mt-10 max-w-2xl space-y-6 font-serif text-xl leading-snug font-light md:text-2xl">
        <Reveal>
          <p>
            Based in Buenos Aires, I&rsquo;m a fashion stylist and producer with a strong interest in visual
            storytelling, aesthetics and creative direction.
          </p>
        </Reveal>
        <Reveal>
          <p>
            My work explores the relationship between fashion, image and visual identity. I love combining a refined
            aesthetic sensibility with attention to detail, approaching each project with a conceptual mindset and a
            focus on composition, balance, textures and visual narratives.
          </p>
        </Reveal>
        <Reveal>
          <p>
            With experience in fashion styling, production and visual merchandising, I enjoy turning ideas into cohesive
            visual experiences, from the initial concept to the final execution.
          </p>
        </Reveal>
        <Reveal>
          <p>
            I hold a Bachelor&rsquo;s Degree in Performing Arts from UADE, complemented by specialized studies in
            Fashion Production, Styling and Visual Merchandising at Escuela Argentina de Moda and Vogue College of
            Fashion.
          </p>
        </Reveal>
        <Reveal>
          <p>
            I believe in the power of thoughtful details, timeless aesthetics and images that communicate beyond the
            clothes themselves.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 flex w-full flex-col pb-16 md:mt-28 md:pb-24">
        <Reveal>
          <Section label="Contact">
            <Link
              href="/contact"
              className="font-serif text-2xl font-light underline decoration-1 underline-offset-8 transition-opacity hover:opacity-50 md:text-4xl"
            >
              Let&rsquo;s talk about your next project →
            </Link>
          </Section>
        </Reveal>
      </div>
    </div>
  );
}
