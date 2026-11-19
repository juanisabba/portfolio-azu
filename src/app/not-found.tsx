import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pt-24 md:px-10">
      <h1 className="font-serif text-6xl font-light md:text-8xl">Not found</h1>
      <Link href="/" className="mt-8 inline-block text-xs tracking-[0.2em] uppercase hover:opacity-50">
        ← Back to projects
      </Link>
    </div>
  );
}
