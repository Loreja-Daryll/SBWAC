import { useEffect, useId, useRef, useState } from "react";

/**
 * Replaces the OS cursor with a small swimming fish that glides toward
 * the pointer with a bit of lag, rotating to face the direction of travel,
 * with a couple of trailing bubbles. Desktop only (pointer: fine); does
 * nothing on touch devices.
 */
export default function SwimmerCursor() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const bubble1Ref = useRef<HTMLDivElement | null>(null);
  const bubble2Ref = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const gradId = useId();

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(pointerFine.matches && !reducedMotion.matches);
    const update = () => setEnabled(pointerFine.matches && !reducedMotion.matches);
    pointerFine.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      pointerFine.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("swimmer-cursor-active");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let angle = 0;
    let rafId: number;
    const bubbleHistory: { x: number; y: number }[] = [];

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button, [role='button']");
      setHovering(!!el);
    };
    window.addEventListener("mouseover", onOver);

    const tick = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * 0.16;
      y += dy * 0.16;

      const speed = Math.hypot(dx, dy);
      if (speed > 1.2) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        let diff = targetAngle - angle;
        diff = ((diff + 180) % 360) - 180;
        angle += diff * 0.18;
      }

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
      }

      bubbleHistory.push({ x, y });
      if (bubbleHistory.length > 14) bubbleHistory.shift();
      const b1 = bubbleHistory[Math.max(0, bubbleHistory.length - 7)];
      const b2 = bubbleHistory[0];
      if (bubble1Ref.current && b1) {
        bubble1Ref.current.style.transform = `translate(${b1.x}px, ${b1.y}px)`;
      }
      if (bubble2Ref.current && b2) {
        bubble2Ref.current.style.transform = `translate(${b2.x}px, ${b2.y}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("swimmer-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  const finTone = hovering ? "#FF7A52" : "#F7FBFD";
  const bellyTone = hovering ? "#FFB199" : "#CDEBF7";
  const bodyTopTone = hovering ? "#FF9770" : "#0099D9";

  return (
    <>
      <div
        ref={bubble2Ref}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{ width: 4, height: 4, marginLeft: -2, marginTop: -2, background: "#7CCBEA", opacity: 0.35 }}
      />
      <div
        ref={bubble1Ref}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3, background: "#7CCBEA", opacity: 0.5 }}
      />
      <div
        ref={wrapRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ marginLeft: -23, marginTop: -12, transition: "opacity 0.2s" }}
      >
        <svg
          width={hovering ? 50 : 44}
          height={hovering ? 26 : 23}
          viewBox="0 0 50 26"
          fill="none"
          style={{ transition: "width 0.25s ease, height 0.25s ease" }}
        >
          <defs>
            <linearGradient id={`swimmer-${gradId}`} x1="10" y1="4" x2="42" y2="22">
              <stop offset="0%" stopColor={bodyTopTone} />
              <stop offset="100%" stopColor={bellyTone} />
            </linearGradient>
          </defs>

          {/* forked tail fin */}
          <path d="M12 13 L-2 3 L5 13 L-2 23 Z" fill={finTone} opacity="0.85" />

          {/* dorsal fin */}
          <path d="M20 5 C 24 -3, 33 -3, 37 4 C 31 6, 25 6, 20 5 Z" fill={bellyTone} opacity="0.9" />

          {/* body */}
          <path
            d="M46 13 C 45 6, 36 2, 24 2 C 15 2, 8 6, 6 11 C 4 12.3, 4 13.7, 6 15 C 8 20, 15 24, 24 24 C 36 24, 45 20, 46 13 Z"
            fill={`url(#swimmer-${gradId})`}
          />

          {/* gill mark */}
          <path d="M40 6 C 37 9, 37 17, 40 20" stroke="#031E31" strokeWidth="0.9" opacity="0.3" fill="none" />

          {/* eye */}
          <circle cx="41" cy="10.5" r="1.7" fill="#031E31" opacity="0.65" />
          <circle cx="41.6" cy="9.9" r="0.6" fill="#F7FBFD" opacity="0.85" />
        </svg>
      </div>
    </>
  );
}
