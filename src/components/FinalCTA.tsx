export default function FinalCTA() {
  return (
    <section
      id="final"
      className="py-32 text-center text-foam relative"
    >
      <div className="max-w-[680px] mx-auto px-7">
        <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-6 flex items-center justify-center gap-2.5">
          <span className="w-5 h-px bg-brand inline-block" />
          This Is Bigger Than a Club
        </div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px]">
          Every dreamer we train is a reason to protect this coastline,
          and a reason for the world to visit it.
        </h2>
        <a
          href="https://facebook.com/SorsogonBlueWaves"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 font-mono text-[13px] uppercase tracking-wide bg-brand text-deep-950 px-7 py-4 rounded-full inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/40 transition-all"
        >
          Join the Mission on Facebook
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="#031E31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="mt-5 font-mono text-[12px] text-brand-300/80">
          No experience required to start. Just message us.
        </div>
      </div>
    </section>
  );
}
