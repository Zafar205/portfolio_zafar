interface Props {
  id: string;
  title: string;
  urdu: string;
  /** Optional right-aligned label, e.g. "02 / Selected work". */
  no?: string;
  label?: string;
}

/** Light display title, its Urdu subtitle in Alexandria Bold, an optional numbered label and a rule. */
export default function SectionHeading({ id, title, urdu, no, label }: Props) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line-strong pb-9" data-reveal>
      <h2 id={id} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-title text-[clamp(44px,6vw,72px)] leading-none font-light">
        <span>{title}</span>
        <span className="urdu text-[0.92em] leading-none" lang="ur" dir="rtl">
          {urdu}
        </span>
      </h2>
      {no && label ? (
        <p className="label pb-2">
          <b>{no}</b> / {label}
        </p>
      ) : null}
    </header>
  );
}
