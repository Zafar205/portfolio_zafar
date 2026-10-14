import { sections, site } from "@/data/site";
import ContactForm from "./ContactForm";
import { Icon } from "./icons";
import KarachiMap from "./KarachiMap";
import SectionHeading from "./SectionHeading";

function Card({ no, label, value, href, icon, external, plain }: { no: string; label: string; value: string; href: string; icon: React.ReactNode; external?: boolean; plain?: boolean }) {
  return (
    <div className="frame frame-hover">
      <a href={href} className="box flex min-w-0 items-center gap-4 px-5 py-5" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <span className="grid size-11 shrink-0 place-items-center border border-line">{icon}</span>
        <span className="min-w-0">
          <span className="label block text-[10px]">
            <b>{no}</b> / {label}
          </span>
          <span className={`mt-1 block text-[14px] tracking-[.06em] [overflow-wrap:anywhere] sm:text-[15px] ${plain ? "" : "uppercase"}`}>{value}</span>
        </span>
        {external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </a>
    </div>
  );
}

export default function Contact() {
  const s = sections.contact;
  const { contact } = site;
  return (
    <section id="contact" aria-labelledby="contact-title" className="shell pt-24 pb-40 md:pt-32">
      <SectionHeading id="contact-title" title={s.title} urdu={s.urdu} />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="frame" data-reveal>
          <div className="box px-6 py-7 sm:px-8">
            <p className="label">
              <b>{s.no}</b> / {s.label}
            </p>
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-4" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <Card
            no="04"
            label="Email"
            value={contact.email}
            href={`mailto:${contact.email}`}
            plain
            icon={
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M3.5 6h17v1.2L12 13 3.5 7.2V6Zm0 3.5 8.5 5.8 8.5-5.8V18h-17V9.5Z" />
              </svg>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Card no="05" label="Social" value="GitHub" href={contact.github.href} external icon={<Icon name="github" className="size-[18px]" />} />
            <Card no="06" label="Social" value="LinkedIn" href={contact.linkedin.href} external icon={<Icon name="linkedin" className="size-[18px]" />} />
          </div>
          <div className="frame flex-1">
            <div className="box h-full">
              <KarachiMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
