import { useReveal } from "../hooks/useReveal";

const POINTS = [
  "Kids in Sorsogon show real promise in the water, but without a structured club, that talent has nowhere to go.",
  "This coastline could be a reason people visit Sorsogon. Right now, most of the world does not know it is here.",
  "The reefs and waters our kids swim in need people who understand them, not just visit them once.",
  "Families want their kids in the water, safely and for real, but there has been nowhere structured to start.",
  "Sorsogon has the coastline, the talent, and the community. It has been missing the platform to connect them.",
];

function RevealItem({ index, text, isLast }: { index: number; text: string; isLast: boolean }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`reveal flex gap-5 py-6 ${isLast ? "" : "border-b border-deep-950/10"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-foam font-mono text-[12px] font-semibold flex items-center justify-center">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-[16.5px] leading-relaxed text-deep-950 font-medium pt-0.5">{text}</span>
    </li>
  );
}

export default function Reality() {
  return (
    <section id="reality" className="relative overflow-hidden py-28">
      {/* bridges the seam between Hero's dark bottom and this section's
          lighter background — starts matching Hero's real tone, fades to
          transparent so OceanBackdrop's natural color takes over below it */}
      <div
        className="absolute top-0 left-0 right-0 h-[160px] pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(3,30,49,0.9) 0%, rgba(3,30,49,0) 100%)" }}
      />

      <div className="max-w-[1160px] mx-auto px-7">
        <div
          className="rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_30px_70px_rgba(2,13,22,0.35)]"
          style={{ backgroundColor: "rgba(247, 251, 253, 0.97)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-16 items-start">
            <div className="md:sticky md:top-28">
              <div className="font-mono text-[12px] tracking-widest uppercase text-brand-700 font-semibold mb-5 flex items-center gap-2.5">
                <span className="w-5 h-px bg-brand-600 inline-block" />
                The Reality
              </div>
              <h2 className="font-display font-semibold text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.15] text-deep-950">
                Sorsogon has world-class water.
                <br />
                It has been missing a reason to protect it.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-deep-900 font-medium max-w-[420px]">
                An archipelago province with this much coastline should mean
                homegrown athletes, thriving marine life, and visitors who come
                to see it. Too often, all three get left on the table.
              </p>
            </div>

            <ul className="flex flex-col">
              {POINTS.map((text, i) => (
                <RevealItem key={i} index={i} text={text} isLast={i === POINTS.length - 1} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
