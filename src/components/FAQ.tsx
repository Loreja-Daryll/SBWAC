import { useState } from "react";

const ITEMS = [
  { q: "Is Blue Waves a business?", a: "No. Blue Waves is a mission-led club built for Sorsogon, focused on developing local athletes and protecting the coastline together with the community." },
  { q: "Do I need experience to join?", a: "No. Learn-to-Swim starts from zero, and Intro to Free Diving requires no prior experience either." },
  { q: "Who can join?", a: "Both kids and adults. Message us with your age and goal and we will point you to the right path and schedule." },
  { q: "Is freediving safe for beginners?", a: "Every freediving session is coach-led, and the certification pathway is built around proper training, not shortcuts. Depth comes after fundamentals, not before them." },
  { q: "Do you have your own pool yet?", a: "Training happens with what is available right now. That is exactly why community support matters at this stage, it is what lets dreamers keep training while better facilities are still being worked toward." },
  { q: "How do I actually get involved?", a: "Message the page on Facebook. The team will reply and walk you through the best way in, whether that is training, diving, or supporting the mission." },
];

function FAQItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid rgba(247, 251, 253, 0.12)" }} className="py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center gap-5 text-left font-display font-semibold text-[19px] text-foam"
      >
        {q}
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            backgroundColor: "rgba(124, 203, 234, 0.14)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="text-brand-300">
            <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "240px" : "0px", paddingTop: open ? "14px" : "0px" }}
      >
        <p className="text-[15.5px] leading-relaxed text-brand-100 font-medium max-w-[680px]">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-28">
      <div className="max-w-[1160px] mx-auto px-7">
        <div
          className="rounded-3xl p-8 sm:p-10 md:p-14"
          style={{
            backgroundColor: "rgba(3, 30, 49, 0.9)",
            border: "1px solid rgba(247, 251, 253, 0.1)",
            boxShadow: "0 30px 70px rgba(2, 13, 22, 0.5)",
          }}
        >
          <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center gap-2.5">
            <span className="w-5 h-px bg-brand inline-block" />
            Questions
          </div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px] text-foam">
            Before you message us
          </h2>
          <div className="mt-10">
            {ITEMS.map((item, i) => (
              <FAQItem key={item.q} {...item} isLast={i === ITEMS.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
