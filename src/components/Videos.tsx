import { useLayoutEffect, useRef, useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  facebookUrl: string;
  thumbnail: string;
}

// EDIT THIS: palitan ng totoong Facebook video post links + thumbnail
// images ninyo. Ang facebookUrl ay yung buong link ng post mismo
// (hal. https://www.facebook.com/SorsogonBlueWaves/videos/1234567890),
// hindi yung link ng page. Dapat PUBLIC ang post para gumana ang embed.
// Ang thumbnail ay path papunta sa isang image (ilagay sa src/assets/
// tapos i-import, o sa public/ folder tapos "/pangalan.jpg").
//
// Pwede kang magdagdag dito ng kahit ilang video (5, 10, 20+) — hindi na
// sila lahat lalabas sa screen nang sabay. Laging 5 lang ang makikita
// (2 kaliwa, gitna, 2 kanan), at umiikot papasok/palabas yung iba habang
// nag-cli-click o gumagamit ng prev/next.
const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Training Day Highlights",
    facebookUrl: "https://web.facebook.com/reel/1518646319955705",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v2",
    title: "Meet the Coaches",
    facebookUrl: "https://web.facebook.com/reel/2192208284861537",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v3",
    title: "First Open Water Swim",
    facebookUrl: "https://web.facebook.com/reel/1034013555830579",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v4",
    title: "Community Clean-up Day",
    facebookUrl: "https://web.facebook.com/reel/3297716713734404",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v5",
    title: "A Message From Our Swimmers",
    facebookUrl: "https://web.facebook.com/reel/1011772761377138",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v6",
    title: "Fun Swim Saturday",
    facebookUrl: "https://web.facebook.com/reel/1684639269440002",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v7",
    title: "Coastal Clean Dive",
    facebookUrl: "https://web.facebook.com/reel/1673778157264807",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v8",
    title: "Coastal Clean Dive",
    facebookUrl: "https://web.facebook.com/reel/1532134888553376",
    thumbnail: "/videos/pic.png",
  },
  {
    id: "v9",
    title: "Coastal Clean Dive",
    facebookUrl: "https://web.facebook.com/reel/2166959150813290",
    thumbnail: "/videos/pic.png",
  },
];

// Ilang thumbnail ang makikita sa magkabilang gilid ng center. Kahit
// dumami pa ang VIDEOS sa taas, 2*WINDOW_SIDE+1 (5) lang ang lalabas
// sabay-sabay — WINDOW_SIDE lang ang babaguhin kung gusto ng mas marami
// o mas kaunting makikita. VIDEOS.length dapat hindi bababa sa 5.
const WINDOW_SIDE = 2;
const SWAP_MS = 550;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Facebook Reels ay palaging portrait (9:16), kaya hinihiling natin dito
// yung plugin sa portrait dimensions din para hindi siya lumutang sa
// gitna ng isang landscape frame na may blangkong gilid.
function fbEmbedUrl(videoUrl: string) {
  const encoded = encodeURIComponent(videoUrl);
  return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=480&height=854&autoplay=true`;
}

function PlayGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#F7FBFD" opacity="0.92" />
      <path d="M11.5 9 L20 14 L11.5 19 Z" fill="#031E31" />
    </svg>
  );
}

function ChevronButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous video" : "Next video"}
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-foam/15 flex items-center justify-center text-brand-300 hover:text-deep-950 hover:bg-brand-300 hover:border-brand-300 transition-all shrink-0"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4">
        <path
          d={direction === "left" ? "M10 3 L5 8 L10 13" : "M6 3 L11 8 L6 13"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Videos() {
  const total = VIDEOS.length;
  const [centerIndex, setCenterIndex] = useState(Math.floor(total / 2));

  const visible = Array.from({ length: WINDOW_SIDE * 2 + 1 }, (_, i) => {
    const offset = i - WINDOW_SIDE;
    const realIndex = mod(centerIndex + offset, total);
    return { realIndex, offset, isCenter: offset === 0, video: VIDEOS[realIndex] };
  });
  const centerVideo = visible.find((v) => v.isCenter)!.video;

  // FLIP animation bookkeeping: measure each visible card's rect before
  // the rotation (First), let React re-render into the new window
  // (Last), then play a transform from old -> new. Cards that persist
  // across the rotation slide/resize smoothly; cards newly entering the
  // window just appear (no "from" position to animate out of).
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevRects = useRef<Map<string, DOMRect>>(new Map());
  const busyRef = useRef(false);

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  };

  const captureRects = () => {
    const map = new Map<string, DOMRect>();
    itemRefs.current.forEach((el, id) => map.set(id, el.getBoundingClientRect()));
    prevRects.current = map;
  };

  useLayoutEffect(() => {
    let stillAnimating = false;
    itemRefs.current.forEach((el, id) => {
      const prev = prevRects.current.get(id);
      if (!prev) return; // newly entered this rotation, nothing to animate from
      // skip elements that are hidden (mobile: side thumbnails are
      // display:none) — they measure as a zero-size rect at (0,0), which
      // would otherwise make the animation look like it flies in from
      // the top-left corner instead of sliding naturally.
      if (prev.width === 0 && prev.height === 0) return;
      const next = el.getBoundingClientRect();
      if (next.width === 0 && next.height === 0) return;
      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      const scaleX = prev.width / next.width;
      const scaleY = prev.height / next.height;

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || Math.abs(scaleX - 1) > 0.01) {
        stillAnimating = true;
        const content = el.firstElementChild as HTMLElement | null;

        el.style.transition = "none";
        el.style.transformOrigin = "top left";
        el.style.zIndex = "5";
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
        if (content) {
          content.style.transition = "none";
          content.style.opacity = "0";
        }
        void el.getBoundingClientRect(); // force reflow before animating

        requestAnimationFrame(() => {
          el.style.transition = `transform ${SWAP_MS}ms cubic-bezier(.22,.68,.36,1)`;
          el.style.transform = "translate(0px, 0px) scale(1, 1)";
          if (content) {
            content.style.transition = `opacity ${SWAP_MS * 0.7}ms ease ${SWAP_MS * 0.15}ms`;
            content.style.opacity = "1";
          }
          window.setTimeout(() => {
            el.style.zIndex = "";
          }, SWAP_MS);
        });
      }
    });
    if (stillAnimating) {
      const t = window.setTimeout(() => {
        busyRef.current = false;
      }, SWAP_MS);
      return () => window.clearTimeout(t);
    }
    busyRef.current = false;
  }, [centerIndex]);

  const goTo = (realIndex: number) => {
    if (realIndex === centerIndex || busyRef.current) return;
    captureRects();
    busyRef.current = true;
    setCenterIndex(realIndex);
  };

  const rotate = (dir: 1 | -1) => {
    if (busyRef.current) return;
    captureRects();
    busyRef.current = true;
    setCenterIndex((c) => mod(c + dir, total));
  };

  return (
    <section id="videos" data-stage="Open Water" className="relative overflow-hidden py-28 text-foam">
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-12">
          <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center justify-center gap-2.5">
            <span className="w-5 h-px bg-brand inline-block" />
            In the Water
          </div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px]">
            See the mission in motion.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
          <ChevronButton direction="left" onClick={() => rotate(-1)} />

          <div className="flex items-end justify-center gap-3 lg:gap-4 flex-1 max-w-[820px] overflow-hidden">
            {visible.map(({ realIndex, isCenter, video }) => (
              <div
                key={video.id}
                ref={setRef(video.id)}
                onClick={() => goTo(realIndex)}
                role={isCenter ? undefined : "button"}
                tabIndex={isCenter ? undefined : 0}
                aria-label={isCenter ? undefined : `Play: ${video.title}`}
                onKeyDown={(e) => {
                  if (!isCenter && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    goTo(realIndex);
                  }
                }}
                className={
                  isCenter
                    ? "relative shrink-0 w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-deep-900"
                    : "hidden sm:block relative shrink-0 w-[78px] sm:w-[100px] aspect-[9/16] rounded-xl overflow-hidden border border-foam/10 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                }
              >
                {isCenter ? (
                  <div className="absolute inset-0">
                    <iframe
                      key={video.id}
                      src={fbEmbedUrl(video.facebookUrl)}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: "none" }}
                      scrolling="no"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-deep-950/45 flex items-center justify-center">
                      <PlayGlyph />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1.5 bg-gradient-to-t from-deep-950/95 to-transparent text-[9.5px] font-mono text-foam text-left leading-tight">
                      {video.title}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <ChevronButton direction="right" onClick={() => rotate(1)} />
        </div>

        <div className="text-center mt-6 font-mono text-[12.5px] text-brand-300/70 uppercase tracking-wide">
          {centerVideo.title}
          <span className="text-brand-700 ml-2">
            {centerIndex + 1}/{total}
          </span>
        </div>
      </div>
    </section>
  );
}
