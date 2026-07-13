import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const LINKS = [
  { href: "#method", id: "method", label: "The Path" },
  { href: "#programs", id: "programs", label: "Training" },
  { href: "#videos", id: "videos", label: "Videos" },
  { href: "#involved", id: "involved", label: "Get Involved" },
  { href: "#faq", id: "faq", label: "FAQ" },
];

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.4" fill="currentColor" />
      <rect x="10" y="2" width="6" height="6" rx="1.4" fill="currentColor" />
      <rect x="2" y="10" width="6" height="6" rx="1.4" fill="currentColor" />
      <rect x="10" y="10" width="6" height="6" rx="1.4" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // close the drawer automatically if the viewport grows back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // tracks which section is currently in view, so the matching nav
  // link can show a "you are here" marker
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-35% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-deep-950/95 backdrop-blur-md py-3 shadow-lg">
      <div className="max-w-[1160px] mx-auto px-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sorsogon Blue Waves" className="w-9 h-9 object-contain" />
          <span className="font-display font-semibold text-[15px] text-foam">
            Blue Waves <span className="font-mono font-normal text-[12px] text-brand-300 uppercase tracking-wide">   </span>
          </span>
        </div>

        {/* everything else (nav links + button + mobile toggle) is
            grouped together here, so justify-between on the parent
            guarantees maximum separation from the logo — this whole
            group sits flush at the right edge */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8 text-[14px] text-brand-100">
            {LINKS.map((l) => {
              const isActive = l.id === activeId;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setActiveId(l.id)}
                  className="relative pb-1 transition-colors hover:text-brand-300"
                  style={{ color: isActive ? "#F7FBFD" : undefined }}
                >
                  {l.label}
                  <span
                    className="absolute left-0 right-0 bottom-0 rounded-full transition-all duration-300"
                    style={{
                      height: 2,
                      backgroundColor: "#FF7A52",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scaleX(1)" : "scaleX(0.4)",
                    }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/SorsogonBlueWaves"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block font-mono text-[12.5px] uppercase tracking-wide text-deep-950 px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all"
              style={{ backgroundColor: "#FF7A52", boxShadow: "0 0 0 rgba(255,122,82,0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 25px rgba(255,122,82,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 rgba(255,122,82,0)")}
            >
              Join the Mission
            </a>

            {/* mobile toggle — a box button with a dashboard-grid icon,
                morphing into an X when open. relative z ensures it stays
                above the drawer regardless of stacking quirks. */}
            <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative z-[110] w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "rgba(255, 122, 82, 0.16)",
              border: "1px solid rgba(255, 122, 82, 0.4)",
              color: "#FF7A52",
            }}
          >
            {menuOpen ? <CloseIcon /> : <GridIcon />}
          </button>
          </div>
        </div>
      </div>

      {/* mobile drawer — compact, right-anchored, sized to its content,
          not a full-screen overlay. pointer-events-none on the outer
          wrapper so its invisible top padding never blocks clicks to the
          toggle button above it; re-enabled on the visible panel only. */}
      <div
        className="md:hidden fixed top-0 right-0 z-[99] overflow-hidden pointer-events-none"
        style={{
          paddingTop: "58px",
          width: menuOpen ? "min(260px, 78vw)" : "0px",
          transition: "width 0.32s cubic-bezier(.22,.68,.36,1)",
        }}
      >
        <div
          className="rounded-bl-2xl p-6 flex flex-col gap-1 pointer-events-auto"
          style={{
            backgroundColor: "rgba(3, 30, 49, 0.97)",
            border: "1px solid rgba(247,251,253,0.1)",
            borderRight: "none",
            width: "min(260px, 78vw)",
          }}
        >
          {LINKS.map((l) => {
            const isActive = l.id === activeId;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => {
                  setActiveId(l.id);
                  setMenuOpen(false);
                }}
                className="py-3 text-[15px] border-b border-foam/10 last:border-b-0 transition-colors flex items-center gap-2"
                style={{ color: isActive ? "#F7FBFD" : undefined }}
              >
                {isActive && (
                  <span
                    className="inline-block rounded-full flex-shrink-0"
                    style={{ width: 6, height: 6, backgroundColor: "#FF7A52" }}
                  />
                )}
                <span className={isActive ? "" : "text-brand-100"}>{l.label}</span>
              </a>
            );
          })}
          <a
            href="https://facebook.com/SorsogonBlueWaves"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center font-mono text-[12.5px] uppercase tracking-wide text-deep-950 px-5 py-3 rounded-full"
            style={{ backgroundColor: "#FF7A52" }}
          >
            Join the Mission
          </a>
        </div>
      </div>
    </header>
  );
}
