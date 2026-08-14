import { useState } from "react";
import { Turtle } from "./MarineLife";

interface VideoItem {
  id: string;
  title: string;
  facebookUrl: string;
  thumbnail: string;
}

// Ang thumbnail path na ito ay gumagamit ng import.meta.env.BASE_URL
// (imbes na plain "/videos/pic.png") para tama ito kahit locally ("/")
// o naka-deploy sa GitHub Pages ("/SBWAC/").
const THUMBNAIL_SRC = `${import.meta.env.BASE_URL}videos/pic.png`;

// EDIT THIS: palitan ng totoong Facebook video post links + thumbnail
// images ninyo. Ang facebookUrl ay yung buong link ng post/reel mismo,
// dapat PUBLIC. Gumagana ‘to kahit 2 lang na video, o dumami pa sa
// hinaharap — awtomatiko namang nagre-resize/nagsa-scroll ang listahan
// ng thumbnails.
//
// IMPORTANTE: dapat UNIKO ang "id" ng bawat video, walang dalawang
// magkapareho.
const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Take a peak of the underwater world",
    facebookUrl: "https://www.facebook.com/reel/27826408463634474",
    thumbnail: THUMBNAIL_SRC,
  },
  {
    id: "v2",
    title: "Take a peak of the underwater world",
    facebookUrl: "https://www.facebook.com/reel/1049418724618854",
    thumbnail: THUMBNAIL_SRC,
  },
];

// Facebook Reels ay palaging portrait (9:16), kaya hinihiling natin dito
// yung plugin sa portrait dimensions din para hindi siya lumutang sa
// gitna ng isang landscape frame na may blangkong gilid.
function fbEmbedUrl(videoUrl: string) {
  const encoded = encodeURIComponent(videoUrl);
  return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=480&height=854&autoplay=true`;
}

function PlayGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#F7FBFD" opacity="0.92" />
      <path d="M11.5 9 L20 14 L11.5 19 Z" fill="#031E31" />
    </svg>
  );
}

function Thumbnail({
  video,
  onClick,
  size = "w-[100px] lg:w-[120px]",
}: {
  video: VideoItem;
  onClick: () => void;
  size?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Play: ${video.title}`}
      className={`relative shrink-0 ${size} aspect-[9/16] rounded-xl overflow-hidden border border-foam/10 opacity-75 hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
    >
      <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-deep-950/45 flex items-center justify-center">
        <PlayGlyph />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1.5 bg-gradient-to-t from-deep-950/95 to-transparent text-[9.5px] font-mono text-foam text-left leading-tight">
        {video.title}
      </div>
    </button>
  );
}

export default function Videos() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = VIDEOS[selectedIndex];
  const others = VIDEOS.map((v, i) => ({ video: v, i })).filter(({ i }) => i !== selectedIndex);

  return (
    <section id="videos" data-stage="Open Water" className="relative overflow-hidden py-28 text-foam">
      <Turtle top="55%" left="2%" size={1.1} opacity={0.12} facing="left" />
      <div className="max-w-[1160px] mx-auto px-7">
        <div className="text-center mb-12">
          <div className="font-mono text-[12.5px] tracking-widest uppercase text-brand-300 mb-4 flex items-center justify-center gap-2.5">
            <span className="w-5 h-px bg-brand inline-block" />
            In the Water
          </div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[42px]">
            See the <span style={{ color: "#FF7A52" }}>mission</span> in motion.
          </h2>
        </div>

        {/* DESKTOP + TABLET: large player left, thumbnails column right
            (items-stretch so the thumbnail column matches the video
            player's height, then scrolls internally if there are more
            thumbnails than fit — never grows taller than the player) */}
        <div className="hidden sm:flex gap-6 items-stretch justify-center">
          <div className="relative shrink-0 w-full max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-deep-900">
            <iframe
              key={selected.id}
              src={fbEmbedUrl(selected.facebookUrl)}
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
              scrolling="no"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>

          {others.length > 0 && (
            <div
              className="no-scrollbar flex flex-col gap-3 overflow-y-auto pr-1"
              style={{ maxHeight: "530px" }}
            >
              {others.map(({ video, i }) => (
                <Thumbnail key={video.id} video={video} onClick={() => setSelectedIndex(i)} />
              ))}
            </div>
          )}
        </div>

        {/* MOBILE: large player on top, thumbnails scroll horizontally below */}
        <div className="sm:hidden">
          <div className="relative mx-auto w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-deep-900">
            <iframe
              key={selected.id}
              src={fbEmbedUrl(selected.facebookUrl)}
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
              scrolling="no"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>

          {others.length > 0 && (
            <div className="no-scrollbar flex gap-3 overflow-x-auto mt-4 px-1 pb-1">
              {others.map(({ video, i }) => (
                <Thumbnail key={video.id} video={video} onClick={() => setSelectedIndex(i)} size="w-[84px]" />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-6 font-mono text-[12.5px] text-brand-300/70 uppercase tracking-wide">
          {selected.title}
          <span className="text-brand-700 ml-2">
            {selectedIndex + 1}/{VIDEOS.length}
          </span>
        </div>
      </div>
    </section>
  );
}
