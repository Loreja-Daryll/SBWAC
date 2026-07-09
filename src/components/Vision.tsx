import { DeepLife } from "./MarineLife";

export default function Vision() {
  return (
    <section id="vision" data-stage="The Depths" className="relative overflow-hidden py-32 text-foam text-center">
      <DeepLife />
      <div className="max-w-[760px] mx-auto px-7 relative z-10">
        <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center justify-center gap-2.5">
          <span className="w-5 h-px bg-brand inline-block" />
          Why Now
        </div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px] mt-2">
          Dreamers cannot wait for perfect conditions.
        </h2>
        <p className="mt-4 max-w-[560px] mx-auto text-[18px] text-brand-100">
          Talent does not pause while facilities catch up. What a young
          swimmer in Sorsogon needs right now is coaching, a place to train,
          and a community behind them. That is the whole reason Blue Waves
          exists, to make sure that support is not something dreamers have
          to wait for.
        </p>
      </div>
    </section>
  );
}
