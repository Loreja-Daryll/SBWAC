const PEOPLE = [
  { initial: "S", name: "Sheena May Laguerta", role: "Founder", body: "Building the club's structure, partnerships, and long-term vision for Sorsogon." },
  { initial: "R", name: "Coach Randell Galan", role: "Freediving Coach", body: "Leads the freediving programs, from intro sessions through certification." },
  { initial: "A", name: "Aldwin John de Jesus", role: "Partner", body: "Helped build the club's partnership and program model from the ground up." },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-28 text-foam">
      <div className="max-w-[1160px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center gap-2.5">
            <span className="w-5 h-px bg-brand inline-block" />
            Why This Exists
          </div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px] text-foam leading-tight">
            A Promise to Sorsogon.
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-brand-100 font-medium max-w-[440px]">
            Blue Waves is being built as a mission-first club, rooted in
            the community it serves and shaped by the people who show
            up for it every day. The goal is simple: give Sorsogon's
            young dreamers a real path to becoming athletes, while
            raising a generation that protects this coastline and helps
            the world discover it, the right way.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {PEOPLE.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl p-7 flex gap-4 items-start"
              style={{
                backgroundColor: "rgba(4, 42, 68, 0.75)",
                border: "1px solid rgba(247, 251, 253, 0.1)",
                boxShadow: "0 10px 30px rgba(2, 13, 22, 0.4)",
              }}
            >
              <div className="w-11 h-11 rounded-full bg-brand-500 text-deep-950 flex items-center justify-center font-display font-semibold text-[17px] flex-shrink-0">
                {p.initial}
              </div>
              <div>
                <h4 className="font-semibold text-[15.5px] text-foam">{p.name}</h4>
                <div className="font-mono text-[11.5px] uppercase tracking-wide text-brand-300 mt-0.5">{p.role}</div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-brand-100 font-medium">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
