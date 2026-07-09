import { useMemo } from "react";
import { useScrollDepth } from "../hooks/useScrollDepth";

// Depth-to-color stops, tuned to stay dark/saturated enough that foam-white
// text stays readable everywhere on the page, while still reading as a
// visible surface-to-abyss gradient.
const STOPS: { pos: number; color: [number, number, number] }[] = [
  { pos: 0.0, color: [16, 108, 158] },
  { pos: 0.2, color: [12, 134, 190] },
  { pos: 0.4, color: [10, 94, 142] },
  { pos: 0.6, color: [6, 58, 92] },
  { pos: 0.8, color: [4, 42, 68] },
  { pos: 1.0, color: [2, 13, 22] },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAt(f: number): string {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (f >= a.pos && f <= b.pos) {
      const t = (f - a.pos) / (b.pos - a.pos || 1);
      const r = lerp(a.color[0], b.color[0], t);
      const g = lerp(a.color[1], b.color[1], t);
      const bl = lerp(a.color[2], b.color[2], t);
      return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(bl)})`;
    }
  }
  const last = STOPS[STOPS.length - 1].color;
  return `rgb(${last[0]},${last[1]},${last[2]})`;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

const PARTICLE_COUNT = 46;

export default function OceanBackdrop() {
  const depth = useScrollDepth();
  const bg = colorAt(depth);
  const raysOpacity = 1 - smoothstep(0.05, 0.28, depth);
  const particleBaseOpacity = 0.25 + depth * 0.5;

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 4),
        duration: 9 + (i % 7),
        delay: (i % 10) * 0.6,
        variance: 0.5 + (i % 5) * 0.1,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: bg, transition: "background 0.05s linear" }}
      aria-hidden="true"
    >
      <div
        className="absolute top-[-15%] left-0 w-full h-[70%]"
        style={{
          opacity: raysOpacity,
          transition: "opacity 0.3s linear",
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(247,251,253,0.09), rgba(247,251,253,0) 70%)",
        }}
      />

      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, rgba(247,251,253,0.9) 0%, rgba(247,251,253,0) 70%)",
            opacity: particleBaseOpacity * p.variance,
            animation: `drift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            mixBlendMode: "screen",
          }}
        />
      ))}
    </div>
  );
}
