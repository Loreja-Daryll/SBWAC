import { useEffect, useState } from "react";
import { useScrollDepth } from "../hooks/useScrollDepth";

const STAGES = [
  { id: "hero", label: "Surface" },
  { id: "method", label: "Shallows" },
  { id: "programs", label: "The Reef" },
  { id: "involved", label: "Open Water" },
  { id: "vision", label: "The Depths" },
];

const MAX_DEPTH_M = 42;

export default function DepthGauge() {
  const depth = useScrollDepth();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = STAGES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const depthMeters = (depth * MAX_DEPTH_M).toFixed(1);

  return (
    <div
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-0"
      aria-hidden="true"
    >
      {STAGES.map((stage, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={stage.id}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: isActive ? 1 : 0.32 }}
          >
            <div
              className="font-mono text-right leading-tight transition-all duration-500"
              style={{
                fontSize: isActive ? "13px" : "10.5px",
                color: isActive ? "#F7FBFD" : "#7CCBEA",
              }}
            >
              <div className="font-bold">{stage.label}</div>
              {isActive && <div className="opacity-70">{depthMeters}m</div>}
            </div>
            <div
              className="rounded-full transition-all duration-500 flex-shrink-0"
              style={{
                width: isActive ? "10px" : "5px",
                height: isActive ? "10px" : "5px",
                background: isActive ? "#0099D9" : "#7CCBEA",
                boxShadow: isActive ? "0 0 0 5px rgba(0,153,217,0.18)" : "none",
              }}
            />
          </div>
        );
      })}
      <div className="absolute right-[4px] top-[8px] bottom-[8px] w-px bg-gradient-to-b from-brand-300/40 via-brand/40 to-deep-950/40 -z-10" />
    </div>
  );
}
