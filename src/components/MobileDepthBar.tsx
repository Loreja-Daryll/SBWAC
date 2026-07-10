import { useScrollDepth } from "../hooks/useScrollDepth";

const MAX_DEPTH_M = 42;

// Simplified version of the desktop DepthGauge for mobile + tablet:
// just a vertical line with a moving pin and a small depth number
// underneath — no stage name labels, so it doesn't clutter a small
// screen. Desktop keeps the full DepthGauge (see DepthGauge.tsx),
// completely untouched.
export default function MobileDepthBar() {
  const depth = useScrollDepth();
  const depthMeters = (depth * MAX_DEPTH_M).toFixed(1);

  return (
    <div
      className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
      aria-hidden="true"
    >
      <div className="relative w-px h-20 rounded-full bg-gradient-to-b from-brand-300/40 via-brand/40 to-deep-950/40">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full flex-shrink-0"
          style={{
            top: `${depth * 100}%`,
            width: 8,
            height: 8,
            marginTop: -4,
            background: "#0099D9",
            border: "1.5px solid rgba(247,251,253,0.85)",
            boxShadow: "0 1px 3px rgba(2,13,22,0.5)",
            transition: "top 0.05s linear",
          }}
        />
      </div>
      <div className="mt-2 font-mono text-[10px] font-semibold text-foam/75">{depthMeters}m</div>
    </div>
  );
}
