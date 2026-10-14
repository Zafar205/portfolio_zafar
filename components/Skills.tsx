import { sections, skills } from "@/data/site";
import { Icon } from "./icons";
import SectionHeading from "./SectionHeading";
import SkillTabs from "./SkillTabs";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Skills() {
  const s = sections.skills;
  return (
    <section id="skills" aria-labelledby="skills-title" className="shell py-24 md:py-32">
      <SectionHeading id="skills-title" title={s.title} urdu={s.urdu} />
      <div className="mt-10" data-reveal>
        <SkillTabs
          tabs={skills.map((g) => ({ id: g.id, label: g.label }))}
          panels={skills.map((group) => (
            <div key={group.id}>
              <p className="label">
                <b>{s.no}</b> / {s.label}
              </p>
              <h3 className="mt-2 text-[clamp(26px,3vw,36px)] font-bold tracking-[.08em] uppercase">{group.label}</h3>
              <ol className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {group.items.map((item, i) => (
                  <li key={item.name} className="frame frame-hover">
                    <div className="box flex items-center gap-4 px-5 py-5">
                      <span className="grid size-12 shrink-0 place-items-center bg-[var(--tile)] text-[var(--tile-ink)]">
                        <Icon name={item.icon} className="size-6" />
                      </span>
                      <span className="min-w-0">
                        <span className="label tnum block text-[10px]">{pad(i + 1)}</span>
                        <span className="mt-1 block text-[15px] tracking-[.1em] break-words uppercase" translate="no">
                          {item.name}
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        />
      </div>
    </section>
  );
}
