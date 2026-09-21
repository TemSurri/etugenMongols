import { motion } from "framer-motion";
import { memo } from "react";
import { mediaReveal } from "../animations";

export type CollageLayout =
  | "featured-left"
  | "featured-right"
  | "staggered";

const VIEWPORT = { once: true, amount: 0.1 } as const;

export const ImpactVideo = memo(function ImpactVideo({
  youtubeUrl,
  title,
}: {
  youtubeUrl?: string;
  title: string;
}) {
  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;
  if (!videoId) return null;

  return (
    <motion.div
      variants={mediaReveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="h-[24rem] overflow-hidden bg-[#27301d] p-2 sm:h-[30rem] lg:h-[34rem]"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`${title} video`}
        loading="lazy"
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </motion.div>
  );
});

export const ImageVideoBlock = memo(function ImageVideoBlock({
  image,
  youtubeUrl,
  alt,
}: {
  image: string;
  youtubeUrl?: string;
  alt: string;
}) {
  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;

  return (
    <motion.div
      variants={mediaReveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid h-[34rem] grid-rows-2 gap-2 overflow-hidden bg-[#27301d] p-2 md:h-[26rem] md:grid-cols-2 md:grid-rows-1 lg:h-[36rem]"
    >
      <div className="relative min-h-0 overflow-hidden bg-[#1d2416]">
        <img
          src={image}
          alt={alt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {videoId && (
        <div className="min-h-0 overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${alt} video`}
            loading="lazy"
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </motion.div>
  );
});

export const YouthImage = memo(function YouthImage({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <motion.div
      variants={mediaReveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="h-[26rem] overflow-hidden bg-[#27301d] p-2 lg:h-[36rem]"
    >
      <img
        src={image}
        alt={alt}
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
});

export const CultureImageBlock = memo(function CultureImageBlock({
  images,
  alt,
  tall = false,
  reverse = false,
  layout = "featured-left",
}: {
  images: readonly string[];
  alt: string;
  tall?: boolean;
  reverse?: boolean;
  layout?: CollageLayout;
}) {
  const visibleImages =
    layout === "staggered" ? images.slice(0, 3) : images.slice(0, 4);

  return (
    <motion.div
      variants={mediaReveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={[
        "grid overflow-hidden bg-[#27301d] p-2",
        tall ? "h-[26rem] lg:h-[36rem]" : "h-[22rem] lg:h-[30rem]",
        reverse ? "lg:order-1" : "lg:order-2",
        getCollageGrid(layout),
      ].join(" ")}
    >
      {visibleImages.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={[
            "relative min-h-0 overflow-hidden bg-[#1d2416]",
            getCollageItemClass(layout, index),
          ].join(" ")}
        >
          <img
            src={src}
            alt={`${alt} ${index + 1}`}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>
      ))}
    </motion.div>
  );
});

function getCollageGrid(layout: CollageLayout) {
  return layout === "staggered"
    ? "grid-cols-3 grid-rows-2 gap-2"
    : "grid-cols-3 grid-rows-3 gap-2";
}

function getCollageItemClass(layout: CollageLayout, index: number) {
  if (layout === "featured-left") {
    return index === 0 ? "col-span-2 row-span-3" : "col-span-1 row-span-1";
  }

  if (layout === "featured-right") {
    if (index === 0) return "col-span-2 row-span-3 col-start-2 row-start-1";
    if (index === 1) return "col-span-1 row-span-1 col-start-1 row-start-1";
    if (index === 2) return "col-span-1 row-span-1 col-start-1 row-start-2";
    return "col-span-1 row-span-1 col-start-1 row-start-3";
  }

  if (index === 0) return "col-span-2 row-span-2 col-start-1 row-start-1";
  if (index === 1) return "col-span-1 row-span-1 col-start-3 row-start-1";
  return "col-span-1 row-span-1 col-start-3 row-start-2";
}

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be" || parsed.hostname === "www.youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] ?? "";
    }

    if (parsed.hostname === "youtube.com" || parsed.hostname === "www.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1]?.split("/")[0] ?? "";
      }
      return parsed.searchParams.get("v") ?? "";
    }

    return "";
  } catch {
    return "";
  }
}
