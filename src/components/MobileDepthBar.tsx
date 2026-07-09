import { useScrollDepth } from "../hooks/useScrollDepth";

export default function MobileDepthBar() {
  const depth = useScrollDepth();

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-[3px] bg-foam/10 z-[95]">
      <div
        className="h-full bg-gradient-to-r from-brand-300 to-brand"
        style={{ width: `${depth * 100}%`, transition: "width 0.05s linear" }}
      />
    </div>
  );
}
