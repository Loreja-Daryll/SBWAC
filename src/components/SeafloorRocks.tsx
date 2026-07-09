import { useId } from "react";

// Ocean-floor rocks: sits at the very bottom of the page, marking the
// transition from open water into the seabed right where the footer
// begins. Layered as a distant ridge, then boulders with radial-gradient
// shading for a sense of volume, then loose pebbles, plus a couple of
// swaying kelp blades for life.

function BackRidge() {
  const id = useId();
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "72px" }}
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`ridge-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C3A57" />
          <stop offset="100%" stopColor="#031E31" />
        </linearGradient>
      </defs>
      <path
        d="M0 72 L0 40 C 80 22, 160 46, 240 32 C 340 16, 420 42, 520 28 C 620 14, 700 40, 800 30 C 900 20, 980 44, 1080 32 C 1180 20, 1280 42, 1360 28 C 1400 22, 1420 32, 1440 36 L1440 72 Z"
        fill={`url(#ridge-${id})`}
        opacity="0.6"
      />
    </svg>
  );
}

function Boulder({
  x,
  size = 1,
  flip = false,
  tone = "dark",
}: {
  x: string;
  size?: number;
  flip?: boolean;
  tone?: "dark" | "mid";
}) {
  const id = useId();
  const colors = tone === "dark" ? { hi: "#0F4C6E", lo: "#031E31" } : { hi: "#155E80", lo: "#042A44" };
  return (
    <svg
      className="absolute bottom-0"
      style={{ left: x, transform: flip ? "scaleX(-1)" : "none" }}
      width={150 * size}
      height={95 * size}
      viewBox="0 0 150 95"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`rock-${id}`} cx="35%" cy="25%" r="80%">
          <stop offset="0%" stopColor={colors.hi} />
          <stop offset="100%" stopColor={colors.lo} />
        </radialGradient>
      </defs>
      <path
        d="M2 95 C -4 62, 14 40, 38 32 C 48 12, 76 4, 98 16 C 122 10, 148 30, 144 52 C 152 70, 138 90, 118 95 C 90 88, 60 95, 2 95 Z"
        fill={`url(#rock-${id})`}
      />
      {/* subtle facet lines for stone texture */}
      <path
        d="M40 33 C 52 46, 58 62, 50 78 M88 20 C 96 38, 92 58, 104 74"
        stroke="#031E31"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
        fill="none"
      />
      {/* barnacle flecks */}
      <circle cx="34" cy="52" r="1.6" fill="#7CCBEA" opacity="0.35" />
      <circle cx="100" cy="60" r="1.3" fill="#7CCBEA" opacity="0.3" />
      <circle cx="70" cy="40" r="1.1" fill="#7CCBEA" opacity="0.3" />
    </svg>
  );
}

function Pebbles() {
  const rocks = Array.from({ length: 18 }).map((_, i) => ({
    left: `${(i * 5.7) % 100}%`,
    size: 4 + (i % 5) * 2,
    opacity: 0.5 + (i % 4) * 0.1,
  }));
  return (
    <>
      {rocks.map((r, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: r.left,
            width: r.size,
            height: r.size * 0.6,
            background: "linear-gradient(180deg, #155E80, #031E31)",
            opacity: r.opacity,
          }}
        />
      ))}
    </>
  );
}

function Kelp({ x, height = 80, duration = 8, delay = "0s" }: { x: string; height?: number; duration?: number; delay?: string }) {
  const id = useId();
  return (
    <svg
      className="absolute bottom-0"
      style={{
        left: x,
        transformOrigin: "bottom center",
        animation: `sway ${duration}s ease-in-out infinite`,
        animationDelay: delay,
      }}
      width="26"
      height={height}
      viewBox={`0 0 26 ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`kelp-${id}`} x1="0" y1={height} x2="0" y2="0">
          <stop offset="0%" stopColor="#046B98" />
          <stop offset="100%" stopColor="#0C86BE" />
        </linearGradient>
      </defs>
      <path
        d={`M13 ${height} C 6 ${height * 0.75}, 20 ${height * 0.55}, 10 ${height * 0.32} C 4 ${height * 0.18}, 16 ${height * 0.08}, 13 0`}
        stroke={`url(#kelp-${id})`}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export default function SeafloorRocks() {
  return (
    <div className="hidden sm:block absolute inset-x-0 top-0 h-[88px] lg:h-[110px] overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-x-0 bottom-0 h-[110px] scale-[0.8] lg:scale-100 origin-bottom"
      >
        <BackRidge />
        <Kelp x="12%" height={68} duration={7} />
        <Kelp x="78%" height={54} duration={9} delay="-3s" />
        <Boulder x="-2%" size={0.9} tone="mid" />
        <Boulder x="16%" size={1.1} tone="dark" />
        <Boulder x="42%" size={0.75} tone="mid" flip />
        <Boulder x="60%" size={1.25} tone="dark" flip />
        <Boulder x="84%" size={0.95} tone="mid" />
        <Pebbles />
      </div>
    </div>
  );
}
