import Link from "next/link";
import { site } from "@/data/site";

/** Top bar for inner pages: the mark and a way home. */
export default function SubHeader() {
  return (
    <header className="shell flex h-20 items-center gap-6">
      <Link href="/" className="text-text" aria-label={`${site.name}, home`}>
        <svg viewBox="0 0 32 32" className="size-9" aria-hidden="true">
          <path d="M4 27V5h5l7 9 7-9h5v22h-5V13.5l-7 8.5-7-8.5V27Z" fill="currentColor" />
          <path d="M23 27h5v-5Z" fill="var(--bg)" />
        </svg>
      </Link>
      <Link href="/#work" className="label link-line">
        ← Back to portfolio
      </Link>
    </header>
  );
}
