import { useReveal } from "../hooks/useReveal";
import { OpenWaterLife } from "./MarineLife";

const CARDS = [
  {
    title: "Dreamers & Families",
    body: "Bring your child, or yourself, into the water. Every athlete this club produces started with Learn-to-Swim.",
    cta: "Start the journey",
    icon: (
      <svg viewBox="0 0 44 40" fill="none">
        <path d="M4 26c6-10 12-10 18 0s12 10 18 0" stroke="#7CCBEA" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 33c6-10 12-10 18 0s12 10 18 0" stroke="#0099D9" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="22" cy="10" r="6" stroke="#F7FBFD" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Divers & Ocean Lovers",
    body: "Learn to freedive under real coaching, and see firsthand why Sorsogon's water is worth protecting.",
    cta: "Get in the water",
    icon: (
      <svg viewBox="0 0 44 40" fill="none">
        <path d="M4 20 C 14 8, 30 8, 40 20 C 30 32, 14 32, 4 20 Z" stroke="#7CCBEA" strokeWidth="1.4" opacity="0.6" />
        <circle cx="22" cy="20" r="4.5" fill="#0099D9" opacity="0.7" />
        <path d="M2 20 h4M38 20 h4" stroke="#F7FBFD" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Sorsogon & Supporters",
    body: "Coaching, gear, and everyday training support all matter right now, not someday. Every bit of it stays local, and goes straight to the dreamers who need it.",
    cta: "Support the mission",
    icon: (
      <svg viewBox="0 0 44 40" fill="none">
        <path d="M22 4 L22 30" stroke="#F7FBFD" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M22 8 C 30 8, 34 12, 34 16 C 28 18, 22 16, 22 12 Z" fill="#0099D9" opacity="0.75" />
        <path d="M10 34 C 16 30, 28 30, 34 34" stroke="#7CCBEA" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function InvolvedCard({ card, index }: { card: (typeof CARDS)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal group bg-foam/5 border border-foam/15 rounded-2xl p-8 flex flex-col hover:-translate-y-1.5 hover:border-brand-300 transition-all duration-300"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="w-11 h-11 mb-5">{card.icon}</div>
      <h3 className="font-display font-semibold text-[21px] text-foam mb-2.5">{card.title}</h3>
      <p className="text-[14.5px] text-brand-100 flex-grow">{card.body}</p>
      <a
        href="https://facebook.com/SorsogonBlueWaves"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 font-mono text-[12.5px] uppercase tracking-wide text-brand-300 inline-flex items-center gap-2"
      >
        {card.cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="#0099D9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function Involved() {
  return (
    <section id="involved" data-stage="Open Water" className="relative overflow-hidden py-28 text-foam">
      <OpenWaterLife />
      <div className="max-w-[1160px] mx-auto px-7 relative z-10">
        <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center gap-2.5">
          <span className="w-5 h-px bg-brand inline-block" />
          Join the Mission
        </div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px]">
          There is a way in, <span style={{ color: "#FF7A52" }}>whoever</span> you are.
        </h2>
        <p className="mt-4 max-w-[560px] text-brand-100">
          Message the club on Facebook and we will point you to the right
          way to get involved, whether that is in the water or beside it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {CARDS.map((card, i) => (
            <InvolvedCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
