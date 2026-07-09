import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import MagneticButton from "./MagneticButton";

// TO ADD YOUR TWO IMAGES:
// Drop both files into `public/images/` named exactly "pic1.png" (the
// front/base image) and "pic2.png" (the image that only shows inside the
// cursor spotlight). No code changes needed.
const HERO_BASE_SRC = "/images/pic1.png";
const HERO_REVEAL_SRC = "/images/pic2.png";
const REVEAL_RADIUS = 220;

function HeroRevealScene({
  position,
  active,
}: {
  position: { x: number; y: number };
  active: boolean;
}) {
  const [baseFailed, setBaseFailed] = useState(false);
  const [revealFailed, setRevealFailed] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #1C93B9 0%, #158DB2 45%, #106C9E 100%)" }}
      />

      {!baseFailed && (
        <img
          src={HERO_BASE_SRC}
          alt=""
          onError={() => setBaseFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!revealFailed && (
        <img
          src={HERO_REVEAL_SRC}
          alt=""
          onError={() => setRevealFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            clipPath: `circle(${active ? REVEAL_RADIUS : 0}px at ${position.x}px ${position.y}px)`,
            transition: "clip-path 0.18s ease-out",
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(3,30,49,0) 40%, rgba(3,30,49,0.75) 100%)" }}
      />
    </div>
  );
}

export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(pointer: fine)");
    const update = () => setIsPointerFine(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!isPointerFine) {
      setActive(false);
    }
  }, [isPointerFine]);

  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setActive(true);
  };

  return (
    <section
      id="hero"
      data-stage="Surface"
      className="relative min-h-screen overflow-hidden pt-[42vh] pb-20 text-foam"
      onMouseMove={isPointerFine ? handleMove : undefined}
      onMouseEnter={() => isPointerFine && setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <HeroRevealScene position={position} active={isPointerFine && active} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1160px] px-7 pointer-events-none">
        <div className="pointer-events-auto max-w-[680px]">
          <div className="mb-4 font-display text-[17px] italic text-brand-100/90 sm:text-[19px]">
            This is not a postcard. This is Sorsogon.
          </div>

          <div className="mb-5 flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-widest text-brand-300">
            <span className="inline-block h-px w-5 bg-brand" />
            A Nonprofit Aquatics Mission &middot; Sorsogon, Philippines
          </div>
          <h1 className="font-display text-[42px] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-[64px] lg:text-[78px]">
            Raising
            <br />
            swimmers.
            <br />
            <span className="text-brand-300">Protecting the sea.</span>
          </h1>
          <p className="mt-7 max-w-[480px] text-[18px] text-brand-100">
            A community-led, nonprofit aquatics mission giving young
            dreamers in Sorsogon a real path to becoming athletes, while
            building a generation that protects our coast and welcomes the
            world back to it, responsibly.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#involved"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-mono text-[13px] uppercase tracking-wide text-deep-950 hover:shadow-lg hover:shadow-brand/40"
            >
              Support the mission
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="#031E31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <a
              href="#programs"
              className="inline-flex items-center gap-1.5 border-b border-foam/30 pb-1 font-mono text-[13px] uppercase tracking-wide text-foam/85 transition-colors hover:border-foam hover:text-foam"
            >
              See how it works
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="mt-7 font-mono text-[12px] text-brand-300/80">
            Nonprofit &middot; community-run &middot; built for Sorsogon
          </div>
        </div>
      </div>
    </section>
  );
}
