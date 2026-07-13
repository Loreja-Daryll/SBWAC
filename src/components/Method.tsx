import { ShallowsLife } from "./MarineLife";

const STEPS = [
  {
    tag: "Stage One",
    title: "Swim",
    depth: "0–3m",
    body: "Every dreamer starts here. Water safety, confidence, and the pure joy of the water, for every age, starting from zero.",
  },
  {
    tag: "Stage Two",
    title: "Dive",
    depth: "3–20m",
    body: "Real freediving coaching builds skill and something else just as important: a felt sense of what the ocean actually holds, and why it is worth protecting.",
  },
  {
    tag: "Stage Three",
    title: "Excel",
    depth: "Open water",
    body: "Structured training for swimmers and divers ready to compete, represent Sorsogon, and become the athletes this province can point to with pride.",
  },
];

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div
      className="relative rounded-2xl p-8 hover:-translate-y-1.5 transition-transform duration-300"
      style={{
        backgroundColor: "rgba(4, 42, 68, 0.55)",
        border: "1px solid rgba(247, 251, 253, 0.16)",
        boxShadow: "0 20px 45px rgba(2, 13, 22, 0.5)",
      }}
    >
      <span className="absolute top-7 right-7 font-mono text-[12px] text-foam/50">
        {step.depth}
      </span>
      <div className="font-mono text-[12px] text-brand-300 uppercase tracking-widest">
        {step.tag}
      </div>
      <h3 className="font-display font-semibold text-[26px] mt-3 mb-3 text-foam">
        {step.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-brand-100 font-medium">{step.body}</p>
    </div>
  );
}

export default function Method() {
  return (
    <section
      id="method"
      data-stage="Shallows"
      className="relative overflow-hidden py-28 text-foam"
    >
      <ShallowsLife />
      <div className="max-w-[1160px] mx-auto px-7 relative z-10">
        <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center gap-2.5">
          <span className="w-5 h-px bg-brand inline-block" />
          The Path
        </div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px]">
          Swim. <span style={{ color: "#FF7A52" }}>Dive.</span> Excel.
        </h2>
        <p className="mt-4 max-w-[560px] text-brand-100 font-medium">
          The same path, every time, because it is the path that actually
          builds an athlete. Confidence first. Respect for the water second.
          Achievement after both are real.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {STEPS.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
