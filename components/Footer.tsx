import { site } from "@/data/site";

export default function Footer({ top = "#top" }: { top?: string }) {
  return (
    <footer className="border-t border-line pb-28">
      <figure className="shell pt-14 pb-6">
        <blockquote className="max-w-[60rem] font-title text-[clamp(22px,2.6vw,32px)] leading-snug font-light">“{site.quote.text}”</blockquote>
        <figcaption className="label mt-4">— {site.quote.author}</figcaption>
      </figure>
      <div className="shell label flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.name}</p>
        <p>
          {site.city} · {site.country}
        </p>
        <a href={top} className="link-line text-text">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
