import { experience, sections } from "@/data/site";
import SectionHeading from "./SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Experience() {
  const s = sections.experience;
  return (
    <section id="experience" aria-labelledby="experience-title" className="shell py-24 md:py-32">
      <SectionHeading id="experience-title" title={s.title} urdu={s.urdu} />

      <div className="relative mt-16">
        {/* spine */}
        <span className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong lg:left-1/2" aria-hidden="true" />
        <ol>
          {experience.map((role, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={`${role.org}-${role.title}`}
                className={`relative pb-12 pl-9 last:pb-0 lg:w-1/2 lg:pl-0 ${left ? "lg:pr-[7%]" : "lg:ml-auto lg:pl-[7%]"} ${i > 0 ? "lg:-mt-10" : ""}`}
                data-reveal
                style={{ "--i": i % 2 } as React.CSSProperties}
              >
                {/* node on the spine */}
                <span
                  className={`absolute top-[3px] left-0 grid size-[11px] place-items-center border border-line-strong bg-bg ${left ? "lg:right-[-6px] lg:left-auto" : "lg:left-[-5px]"}`}
                  aria-hidden="true"
                >
                  <span className={`size-[5px] ${i === 0 ? "bg-text" : "bg-line-strong"}`} />
                </span>
                <p className={`label tnum ${left ? "lg:text-right" : ""}`}>
                  <b>{pad(i + 1)}</b> / {role.period}
                </p>
                <div className="frame frame-hover mt-3">
                  <details className="box group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="grid size-12 shrink-0 place-items-center bg-[var(--tile)] text-[13px] font-bold tracking-[.06em] text-[var(--tile-ink)]" aria-hidden="true">
                        {role.mark}
                      </span>
                      <span className="min-w-0 flex-1">
                        <h3 className="text-[15px] leading-snug font-bold tracking-[.1em] uppercase sm:text-[17px]">{role.title}</h3>
                        <span className="mt-1 block text-[13px] tracking-[.1em] text-muted uppercase" translate="no">
                          {role.org}
                        </span>
                      </span>
                      <span className="label hidden shrink-0 text-[10px] sm:block">
                        <span className="group-open:hidden">Details →</span>
                        <span className="hidden group-open:inline">Close ×</span>
                      </span>
                    </summary>
                    <div className="border-t border-line px-5 py-5 text-[14px] leading-relaxed">
                      <p className="text-text">{role.impact}</p>
                      <ul className="mt-3 space-y-1.5 text-muted">
                        {role.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span aria-hidden="true">—</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      {role.stack ? (
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
                          {role.stack.map((tag) => (
                            <li key={tag} translate="no" className="border border-line px-2 py-1 text-[10px] tracking-[.12em] text-muted uppercase">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </details>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
