import { ReefLife } from "./MarineLife";

const CheckIcon = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <path d="M3 8l3.5 3.5L13 4" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VALUES = ["Champion Local Dreamers", "Protect the Ocean", "Promote Sorsogon", "Support Local"];

function ProgramCard({
  tag,
  title,
  status,
  items,
  accent,
}: {
  tag: string;
  title: string;
  status: string;
  items: string[];
  accent: string;
}) {
  const isActive = status === "Active Now";
  return (
    <div
      className="relative rounded-2xl p-8 pt-9 hover:-translate-y-1.5 transition-transform duration-300"
      style={{
        backgroundColor: "rgba(4, 42, 68, 0.78)",
        border: "1px solid rgba(247, 251, 253, 0.12)",
        borderTop: `4px solid ${accent}`,
      }}
    >
      <div
        className="absolute -top-3 right-6 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5"
        style={{
          transform: "rotate(3deg)",
          backgroundColor: isActive ? "#0099D9" : "#F7FBFD",
          color: "#031E31",
          border: `1px solid ${isActive ? "#0099D9" : "#F7FBFD"}`,
        }}
      >
        {status}
      </div>

      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: `${accent}20`, border: `1px solid ${accent}55` }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M2 12c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0M2 6c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="font-mono text-[12px] uppercase tracking-widest text-brand-300">{tag}</div>
      <h3 className="font-display font-semibold text-[24px] mt-1.5 text-foam leading-snug">{title}</h3>

      <ul className="mt-6 flex flex-col gap-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15.5px] text-brand-100 font-medium leading-snug">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: `${accent}25` }}
            >
              <CheckIcon color={accent} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="programs" data-stage="The Reef" className="relative overflow-hidden py-28 text-foam">
      <ReefLife />
      <div className="max-w-[1160px] mx-auto px-7 relative z-10">
        <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center gap-2.5">
          <span className="w-5 h-px bg-brand inline-block" />
          How Dreamers Train
        </div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px] text-foam">
          Two paths in the water. One mission.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <ProgramCard
            tag="The Swimming Path"
            title="Where every dreamer starts"
            status="Opening Soon"
            items={["Learn-to-Swim, starting from zero experience", "Competitive training, for swimmers ready to represent Sorsogon"]}
            accent="#0099D9"
          />
          <ProgramCard
            tag="The Freediving Path"
            title="Where respect for the ocean is built"
            status="Active Now"
            items={["Intro to Free Diving, no experience required", "Fun Dive sessions, coach-led", "Free Diving Certification, a real pathway"]}
            accent="#7CCBEA"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-12">
          {VALUES.map((v) => (
            <span
              key={v}
              className="font-mono text-[12.5px] uppercase tracking-wide text-brand-100 px-4.5 py-2.5 rounded-full"
              style={{ backgroundColor: "rgba(247, 251, 253, 0.06)", border: "1px solid rgba(247, 251, 253, 0.16)" }}
            >
              {v}
            </span>
          ))}
        </div>

        <div
          className="mt-14 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
          style={{ backgroundColor: "rgba(2, 13, 22, 0.35)", border: "1px solid rgba(247, 251, 253, 0.1)" }}
        >
          <div>
            <div className="font-mono text-[11.5px] uppercase tracking-widest text-brand-300 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              In the Works
            </div>
            <h3 className="font-display font-semibold text-[22px] sm:text-[26px] text-foam mt-2.5">
              Dive Exploration, Gubat, Sorsogon
            </h3>
            <p className="mt-3 text-[15px] text-brand-100 font-medium max-w-[520px] leading-relaxed">
              We are planning guided dive exploration trips in Gubat to
              build community here at home, while Sorsogon's tourism keeps
              growing. Done right, this means local divers leading the way,
              not being left out of it.
            </p>
          </div>
          <a
            href="https://facebook.com/SorsogonBlueWaves"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12.5px] uppercase tracking-wide text-brand-300 inline-flex items-center gap-1.5 border-b border-brand-300/40 pb-1 hover:border-brand-300 hover:text-foam transition-colors flex-shrink-0 self-start md:self-center"
          >
            Follow this
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
