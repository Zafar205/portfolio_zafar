import Image from "next/image";
import { site } from "@/data/site";
import HeroWire from "./HeroWire";
import RigLoader from "./rig/RigLoader";
import { SoundToggle } from "./sound";
import TypedName from "./TypedName";

/** Geometric "M" mark. */
function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-9" aria-hidden="true">
      <path d="M4 27V5h5l7 9 7-9h5v22h-5V13.5l-7 8.5-7-8.5V27Z" fill="currentColor" />
      <path d="M23 27h5v-5Z" fill="var(--bg)" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <a href="#top" className="absolute top-5 left-[max(16px,env(safe-area-inset-left))] z-10 text-text sm:left-6" aria-label={`${site.name}, home`}>
        <Mark />
      </a>

      <div className="grid min-h-[100svh] grid-cols-1 items-center gap-12 pt-24 pb-16 pl-[max(20px,env(safe-area-inset-left))] pr-[max(20px,env(safe-area-inset-right))] sm:pl-[max(clamp(24px,10vw,260px),env(safe-area-inset-left))] sm:pr-[max(clamp(24px,8vw,200px),env(safe-area-inset-right))] lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-0 lg:py-20 lg:pr-[max(clamp(24px,6vw,200px),env(safe-area-inset-right))]">
        <div className="relative z-[1] flex min-w-0 flex-col items-center text-center lg:block lg:text-left">
          <div className="frame w-[min(15rem,62vw)] lg:w-[13.5rem]" data-hero-photo>
            <div className="box relative aspect-square overflow-hidden bg-panel p-2">
              <div className="relative h-[calc(100%-1.75rem)] overflow-hidden">
                <Image src={site.photo} alt={`Portrait of ${site.name}`} fill sizes="(max-width: 1023px) 240px, 216px" className="photo object-cover" priority />
              </div>
              <p className="label absolute right-2 bottom-1.5 left-2 px-2 py-1 text-center lg:text-left">
                <b>00</b> / Operator
              </p>
            </div>
          </div>

          <div className="frame mt-8 inline-block max-w-full">
            <p className="box flex items-center gap-3 px-4 py-2.5 text-left text-[12px] tracking-[.14em] uppercase sm:text-[13px]">
              <span className="live-dot" aria-hidden="true" />
              {site.available}
            </p>
          </div>

          <h1 id="hero-title" className="mt-7">
            <span className="label block text-[13px]">Hi there! I’m</span>
            <span className="sr-only">{`${site.name}, ${site.role}`}</span>
            <span className="mt-3 block text-[clamp(24px,3vw,36px)] leading-tight font-bold tracking-[.06em] uppercase">
              <TypedName phrases={site.typed} still={site.role} />
            </span>
          </h1>

          <div className="mt-6 max-w-[36rem] text-[15px] leading-[1.75] text-muted sm:text-base">
            <p>{site.intro[0]}</p>
            <p>{site.intro[1]}</p>
          </div>

          <div className="mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <a href="#contact" className="btn btn-solid min-h-[56px] w-full px-8 sm:w-auto">
              Hire me
            </a>
            <div className="frame w-full sm:w-auto">
              <a href={site.resume} className="btn btn-line min-h-[52px] w-full px-6" download>
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />
                </svg>
                Download resume
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-w-0 lg:ml-[-3%]">
          <RigLoader />
        </div>
      </div>

      <HeroWire />

      <div className="absolute right-10 bottom-6 z-10 hidden lg:block">
        <SoundToggle />
      </div>
    </section>
  );
}
