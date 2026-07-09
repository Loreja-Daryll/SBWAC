import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const LINKS = [
  { href: "#method", label: "The Path" },
  { href: "#programs", label: "Training" },
  { href: "#videos", label: "Videos" },
  { href: "#involved", label: "Get Involved" },
  { href: "#faq", label: "FAQ" },
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the drawer automatically if the viewport grows back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-deep-950/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sorsogon Blue Waves Aquatics Club" className="w-9 h-9 object-contain" />
          <span className="font-display font-semibold text-[15px] text-foam">
            Blue Waves <span className="font-mono font-normal text-[12px] text-brand-300 uppercase tracking-wide">Nonprofit Mission</span>
          </span>
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex gap-8 text-[14px] text-brand-100">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-300 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com/SorsogonBlueWaves"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block font-mono text-[12.5px] uppercase tracking-wide text-deep-950 bg-brand px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40 transition-all"
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
            className="md:hidden relative z-[110] w-10 h-10 rounded-xl flex items-center justify-center text-brand-300 transition-colors"
            style={{
              backgroundColor: "rgba(124, 203, 234, 0.14)",
              border: "1px solid rgba(247,251,253,0.15)",
            }}
          >
            {menuOpen ? <CloseIcon /> : <GridIcon />}
          </button>
        </div>
      </div>

      {/* mobile drawer — compact, right-anchored, sized to its content,
          not a full-screen overlay. pointer-events-none on the outer
          wrapper so its invisible top padding never blocks clicks to the
          toggle button above it; re-enabled on the visible panel only. */}
      <div
        className="md:hidden fixed top-0 right-0 z-[99] overflow-hidden pointer-events-none"
        style={{
          paddingTop: scrolled ? "58px" : "76px",
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
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[15px] text-brand-100 border-b border-foam/10 last:border-b-0 hover:text-brand-300 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://facebook.com/SorsogonBlueWaves"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center font-mono text-[12.5px] uppercase tracking-wide text-deep-950 bg-brand px-5 py-3 rounded-full"
          >
            Join the Mission
          </a>
        </div>
      </div>
    </header>
  );
}
