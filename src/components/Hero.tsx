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
  let drawW: number, drawH: number;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = img.width * (canvasH / img.height);
  } else {
    drawW = canvasW;
    drawH = img.height * (canvasW / img.width);
  }
  const offsetX = (canvasW - drawW) / 2;
  const offsetY = (canvasH - drawH) / 2;
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

function HeroRevealScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [baseFailed, setBaseFailed] = useState(false);
  const [revealFailed, setRevealFailed] = useState(false);
  // tracks whether the canvas has actually finished drawing pic1 at
  // least once. Until this is true, a plain <img> of pic1 is shown as a
  // guaranteed-reliable fallback — this is what prevents any chance of
  // pic2 flashing/showing through on load before the canvas is ready.
  const [canvasReady, setCanvasReady] = useState(false);
  // remembers the canvas's last drawn pixel size, so we can tell a
  // genuine resize/orientation change apart from the mobile browser's
  // address bar collapsing/expanding during scroll (which only changes
  // window height, not width, but still fires a "resize" event).
  const lastSizeRef = useRef({ width: 0, height: 0 });

  // draws (or redraws) the base image fresh onto the canvas — this is
  // what makes the erased scratches reset back to whole. Only called on
  // first load and on genuine resizes, NOT on every scroll.
  const redraw = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !img || !ctx || !img.complete || img.naturalWidth === 0) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    lastSizeRef.current = { width: rect.width, height: rect.height };
    ctx.globalCompositeOperation = "source-over";
    drawImageCover(ctx, img, canvas.width, canvas.height);
    setCanvasReady(true);
  };

  useEffect(() => {
    const img = new Image();
    imgRef.current = img;
    img.onload = redraw;
    img.onerror = () => setBaseFailed(true);
    img.src = HERO_BASE_SRC;

    // FIX 1: on mobile, scrolling can collapse/expand the browser's
    // address bar, which changes window.innerHeight and fires a
    // "resize" event even though nothing actually resized in a way
    // that matters. Redrawing on that event was wiping out the user's
    // scratches every time they scrolled. Only redraw when the WIDTH
    // actually changes (a real resize/orientation change) or when the
    // height changes by a large amount (a real rotation), not the
    // small height jitter from the address bar.
    const onResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const widthChanged = Math.abs(rect.width - lastSizeRef.current.width) > 2;
      const heightChanged = Math.abs(rect.height - lastSizeRef.current.height) > 150;
      if (widthChanged || heightChanged) redraw();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const eraseAt = (clientX: number, clientY: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x < -ERASE_RADIUS || x > rect.width + ERASE_RADIUS || y < -ERASE_RADIUS || y > rect.height + ERASE_RADIUS) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, ERASE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const onMouseMove = (e: MouseEvent) => eraseAt(e.clientX, e.clientY);

    // FIX 2 (revised): only block the page from moving during
    // HORIZONTAL-dominant drags. Vertical drags (normal scrolling) are
    // left completely alone so the page always scrolls normally, even
    // when the gesture starts on the Hero.
    let heroTouchActive = false;
    let touchStart = { x: 0, y: 0 };
    let lockedDirection: "vertical" | "horizontal" | null = null;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const heroRect = container.getBoundingClientRect();
      heroTouchActive =
        t.clientY >= heroRect.top &&
        t.clientY <= heroRect.bottom &&
        t.clientX >= heroRect.left &&
        t.clientX <= heroRect.right;
      touchStart = { x: t.clientX, y: t.clientY };
      lockedDirection = null;
      if (heroTouchActive) eraseAt(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t || !heroTouchActive) return;

      // figure out (once per gesture) whether this drag is mostly
      // vertical or mostly horizontal, based on its first ~8px of
      // movement, then keep that decision for the rest of the gesture
      // so behavior doesn't flip mid-drag.
      if (lockedDirection === null) {
        const dx = t.clientX - touchStart.x;
        const dy = t.clientY - touchStart.y;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
          lockedDirection = Math.abs(dy) > Math.abs(dx) ? "vertical" : "horizontal";
        }
      }

      // only horizontal drags block the page from moving — vertical
      // drags are left untouched so normal scrolling always works.
      if (lockedDirection === "horizontal") {
        e.preventDefault();
      }
      eraseAt(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      heroTouchActive = false;
      lockedDirection = null;
    };

    // listening on window (not just the canvas) is what makes erasing
    // work even when the cursor/finger is over the text content — that
    // area needs pointer-events: auto for its links/buttons to stay
    // clickable, which would otherwise stop canvas-level listeners from
    // ever seeing the pointer there.
    window.addEventListener("mousemove", onMouseMove);
    // passive: false is required here so preventDefault() actually
    // works for the horizontal case — vertical drags never call
    // preventDefault, so scrolling elsewhere (and vertical scrolling
    // through the Hero itself) is never affected.
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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

      {/* GUARANTEED fallback: a plain, always-reliable <img> of pic1.
          Shown until the canvas below has confirmed it finished
          drawing. */}
      {!baseFailed && !canvasReady && (
        <img
          src={HERO_BASE_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* canvas: pic1 is drawn onto this and permanently erased in a
          circle wherever the mouse/finger passes over it. Only
          interactive/visible once it has actually finished its first
          draw (see canvasReady above). touchAction: pan-y lets the
          browser handle vertical scrolling natively; horizontal
          movement is governed by the JS logic above instead. */}
      {!baseFailed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ touchAction: "pan-y", opacity: canvasReady ? 1 : 0 }}
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
            A Community Aquatics Mission &middot; Sorsogon, Philippines
          </div>
          <h1 className="font-display text-[42px] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-[64px] lg:text-[78px]">
            Raising
            <br />
            <span style={{ color: "#FF7A52" }}>swimmers.</span>
            <br />
            <span> Protecting the</span> <span style={{ color: "#FF7A52" }}> sea</span>
          </h1>
          <p className="mt-7 max-w-[480px] text-[18px] text-brand-100">
            A community-led aquatics mission giving young
            dreamers in Sorsogon a real path to becoming athletes, while
            building a generation that protects our coast and welcomes the
            world back to it, responsibly.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#involved"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-mono text-[13px] uppercase tracking-wide text-deep-950 bg-[#FF7A52] hover:shadow-lg"
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
            Community-led &middot; Coach-guided &middot; Built for Sorsogon
          </div>
        </div>
      </div>
    </section>
  );
}
