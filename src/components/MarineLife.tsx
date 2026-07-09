import { useId } from "react";

// Decorative, non-interactive marine life. Corals use a soft, single-tone
// silhouette style (flat translucent color, minimal internal detail) to
// match the site's understated "seen through deep water" aesthetic —
// no multi-stop gradients, just quiet, low-opacity shapes.

// A real turtle photo/illustration, placed as a soft, low-opacity
// background element — matching the site's "seen through deep water"
// aesthetic, just using a real image instead of hand-drawn SVG shapes.
//
// TO REPLACE THE IMAGE: drop a file into `public/images/` named exactly
// "turtle.png" (transparent background works best). No code changes
// needed — if the file is missing, this quietly renders nothing rather
// than showing a broken image icon.
export function Turtle({
  top = "40%",
  left = "45%",
  size = 1,
  opacity = 0.1,
  facing = "right",
}: {
  top?: string;
  left?: string;
  size?: number;
  opacity?: number;
  facing?: "left" | "right";
}) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/turtle.png`}
      alt=""
      aria-hidden="true"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      className="absolute"
      style={{
        top,
        left,
        width: 220 * size,
        height: "auto",
        opacity,
        objectFit: "contain",
        transform: facing === "left" ? "scaleX(-1)" : "none",
      }}
    />
  );
}

// A "hero" fish with real fin structure (dorsal, anal, pectoral, forked
// tail), a gill line, a shaded eye, and species-specific markings —
// for prominent placement near the fold.
function HeroFish({
  top,
  left,
  size = 1,
  facing = "right",
  duration = 30,
  variant = "butterfly",
}: {
  top: string;
  left?: string;
  size?: number;
  facing?: "left" | "right";
  duration?: number;
  variant?: "butterfly" | "angel";
}) {
  const id = useId();
  const flip = facing === "left" ? "scaleX(-1)" : "none";
  const palette =
    variant === "butterfly"
      ? { back: "#046B98", belly: "#7CCBEA", fin: "#F4A261", accent: "#031E31" }
      : { back: "#0082BA", belly: "#EAF7FC", fin: "#0099D9", accent: "#031E31" };

  return (
    <div
      className="absolute"
      style={{ top, left, animation: `swimAcross ${duration}s linear infinite`, transform: flip }}
    >
      <svg width={78 * size} height={46 * size} viewBox="0 0 100 72" fill="none">
        <defs>
          <linearGradient id={`body-${id}`} x1="30" y1="18" x2="72" y2="62">
            <stop offset="0%" stopColor={palette.back} />
            <stop offset="100%" stopColor={palette.belly} />
          </linearGradient>
        </defs>

        {/* forked tail fin */}
        <path d="M18 40 L2 22 L10 40 L2 58 Z" fill={palette.back} opacity="0.9" />

        {/* dorsal fin */}
        <path d="M40 22 C 46 8, 62 8, 70 20 C 60 22, 48 22, 40 22 Z" fill={palette.fin} opacity="0.85" />

        {/* anal fin */}
        <path d="M42 58 C 48 70, 62 70, 68 59 C 58 58, 48 58, 42 58 Z" fill={palette.fin} opacity="0.7" />

        {/* body */}
        <path
          d="M92 40 C 90 27, 76 20, 54 20 C 36 20, 22 27, 16 36 C 12 39, 12 41, 16 44 C 22 53, 36 60, 54 60 C 76 60, 90 53, 92 40 Z"
          fill={`url(#body-${id})`}
        />

        {/* pectoral fin */}
        <path d="M62 42 C 72 48, 74 56, 66 60 C 58 54, 56 46, 62 42 Z" fill={palette.belly} opacity="0.55" />

        {/* butterflyfish eye-stripe camouflage bar */}
        {variant === "butterfly" && (
          <path d="M78 24 L78 56" stroke={palette.accent} strokeWidth="5" opacity="0.7" />
        )}

        {/* reef-fish vertical bands */}
        {variant === "angel" && (
          <g stroke={palette.accent} strokeWidth="3.2" opacity="0.4">
            <path d="M40 22 L38 58" />
            <path d="M58 21 L58 59" />
          </g>
        )}

        {/* gill line */}
        <path d="M84 26 C 80 34, 80 46, 84 54" stroke={palette.accent} strokeWidth="1.4" opacity="0.35" fill="none" />

        {/* eye */}
        <circle cx="86" cy="34" r="3.4" fill="#F7FBFD" />
        <circle cx="87" cy="34" r="1.9" fill="#031E31" />
        <circle cx="87.7" cy="33.2" r="0.7" fill="#F7FBFD" />
      </svg>
    </div>
  );
}

// A single small schooling fish: teardrop body, tail flick, and a hint
// of a dorsal ridge — light enough to repeat in numbers.
function SchoolFish({ dx = 0, opacity = 1, color }: { dx?: number; opacity?: number; color: string }) {
  return (
    <g transform={`translate(${dx} 0)`} opacity={opacity}>
      <path d="M3 11 L-5 4 L-1 11 L-5 18 Z" fill={color} />
      <path
        d="M17 11 C 16 6, 9 4, 3 8 C 1 9.5, 1 12.5, 3 14 C 9 18, 16 16, 17 11 Z"
        fill={color}
      />
      <path d="M9 6 L12 2.4" stroke={color} strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <circle cx="14" cy="9.5" r="0.7" fill="#031E31" opacity="0.5" />
    </g>
  );
}

function FishSchool({
  top,
  size = 1,
  duration = 28,
  reverse = false,
  opacity = 0.35,
  color = "#7CCBEA",
}: {
  top: string;
  size?: number;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
  color?: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left: reverse ? "auto" : "-10%",
        right: reverse ? "-10%" : "auto",
        animation: `swimAcross ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
        opacity,
      }}
    >
      <svg width={80 * size} height={24 * size} viewBox="0 0 78 22" fill="none">
        <SchoolFish dx={0} opacity={1} color={color} />
        <SchoolFish dx={24} opacity={0.85} color={color} />
        <SchoolFish dx={48} opacity={0.65} color={color} />
      </svg>
    </div>
  );
}

function MantaShadow({ top = "18%", opacity = 0.18 }: { top?: string; opacity?: number }) {
  const id = useId();
  return (
    <svg
      className="absolute"
      style={{ top, animation: "mantaGlide 46s ease-in-out infinite", opacity }}
      width="190"
      height="80"
      viewBox="0 0 190 80"
      fill="none"
    >
      <defs>
        <linearGradient id={`manta-${id}`} x1="0" y1="0" x2="190" y2="80">
          <stop offset="0%" stopColor="#031E31" />
          <stop offset="100%" stopColor="#0C86BE" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        d="M95 40 C 42 0, 0 26, 0 40 C 0 54, 42 80, 95 40 C 148 80, 190 54, 190 40 C 190 26, 148 0, 95 40 Z"
        fill={`url(#manta-${id})`}
      />
      <path d="M95 40 L95 64" stroke="#031E31" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function DeepParticles({ count = 14 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: "#7CCBEA",
            opacity: 0.25 + (i % 4) * 0.08,
            boxShadow: "0 0 6px 1px rgba(124,203,234,0.35)",
            animation: `glow ${5 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </>
  );
}

export function ShallowsLife() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <FishSchool top="20%" duration={30} size={0.85} opacity={0.3} />
      <HeroFish top="62%" left="8%" size={0.85} variant="butterfly" duration={38} />
      <FishSchool top="72%" duration={24} reverse size={0.6} opacity={0.2} color="#F7FBFD" />
    </div>
  );
}

export function ReefLife() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <Turtle top="83%" left="20%" size={1.5} opacity={0.1} />
      <HeroFish top="14%" left="55%" size={1.1} variant="angel" duration={34} facing="left" />
      <FishSchool top="10%" duration={26} size={0.8} opacity={0.4} color="#0099D9" />
      <FishSchool top="85%" duration={34} reverse size={0.6} opacity={0.3} color="#046B98" />
    </div>
  );
}

export function OpenWaterLife() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <MantaShadow top="14%" opacity={0.16} />
      <FishSchool top="58%" duration={32} size={1} opacity={0.16} color="#7CCBEA" />
      <DeepParticles count={10} />
    </div>
  );
}

export function DeepLife() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <DeepParticles count={22} />
    </div>
  );
}
