import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

// TO ADD YOUR TWO IMAGES:
// Drop both files into `public/images/` named exactly "pic1.png" (the
// front/base image, drawn onto the canvas and permanently erased as the
// user scratches over it) and "pic2.png" (the image underneath, with
// the corals — this is what stays revealed). No code changes needed.
const HERO_BASE_SRC = `${import.meta.env.BASE_URL}images/pic1.png`;
const HERO_REVEAL_SRC = `${import.meta.env.BASE_URL}images/pic2.png`;
const ERASE_RADIUS = 70;

// Draws an image onto a canvas using the same crop-to-fill behavior as
// CSS's object-fit: cover, so it matches how the reveal image
// underneath is displayed.
function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvasW: number, canvasH: number) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasW / canvasH;
  let drawW: number, drawH: number, offsetX: number, offsetY: number;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = img.width * (canvasH / img.height);
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = img.height * (canvasW / img.width);
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

function HeroRevealScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [baseFailed, setBaseFailed] = useState(false);
  const [revealFailed, setRevealFailed] = useState(false);

  // draws (or redraws, e.g. after a resize) the base image fresh onto
  // the canvas — this is what makes the erased scratches reset back to
  // whole on every page load/refresh.
  const redraw = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !img || !ctx || !img.complete) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.globalCompositeOperation = "source-over";
    drawImageCover(ctx, img, canvas.width, canvas.height);
  };

  useEffect(() => {
    const img = new Image();
    imgRef.current = img;
    img.onload = redraw;
    img.onerror = () => setBaseFailed(true);
    img.src = HERO_BASE_SRC;

    const onResize = () => redraw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const eraseAt = (clientX: number, clientY: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      // skip if outside the canvas bounds — no-op, nothing to erase there
      if (x < -ERASE_RADIUS || x > rect.width + ERASE_RADIUS || y < -ERASE_RADIUS || y > rect.height + ERASE_RADIUS) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, ERASE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const onMouseMove = (e: MouseEvent) => eraseAt(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) eraseAt(t.clientX, t.clientY);
    };

    // listening on window (not just the canvas) is what makes this work
    // even when the cursor/finger is over the text content — that area
    // needs pointer-events: auto for its links/buttons to stay
    // clickable, which would otherwise stop canvas-level listeners from
    // ever seeing the pointer there.
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* fallback color, always underneath everything */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #1C93B9 0%, #158DB2 45%, #106C9E 100%)" }}
      />

      {/* reveal image (corals) — sits underneath the canvas, shows
          through wherever the canvas has been scratched away */}
      {!revealFailed && (
        <img
          src={HERO_REVEAL_SRC}
          alt=""
          onError={() => setRevealFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* canvas: pic1 is drawn onto this and permanently erased in a
          circle wherever the mouse/finger passes over it */}
      {!baseFailed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: "pan-y" }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(3,30,49,0) 40%, rgba(3,30,49,0.75) 100%)" }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      data-stage="Surface"
      className="relative min-h-screen overflow-hidden pt-[42vh] pb-20 text-foam"
    >
      <HeroRevealScene />

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
