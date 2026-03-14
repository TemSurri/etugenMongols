"use client";

import { Link } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type { GalleryItem as GalleryItemType } from "../static_gallery";

/* ---------- Motion ---------- */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const IMAGES_PER_PAGE = 6;

export default function GalleryItem({
  id,
  title,
  date,
  location,
  albumImageCount,
  description,
  activities = [],
}: GalleryItemType) {
  const albumBasePath = `/gallery/${id}/albumphotos`;

  /* ---------- Data ---------- */

  const images = useMemo(
    () =>
      Array.from({ length: albumImageCount }, (_, i) =>
        `${albumBasePath}/${i + 1}.png`
      ),
    [albumImageCount, albumBasePath]
  );

  const backgroundImage = images[0];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(images.length / IMAGES_PER_PAGE);

  const pagedImages = useMemo(
    () =>
      images.slice(
        page * IMAGES_PER_PAGE,
        page * IMAGES_PER_PAGE + IMAGES_PER_PAGE
      ),
    [images, page]
  );

  /* ---------- Slideshow navigation ---------- */

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, next, prev]);

  /* ---------- Shared Info Card ---------- */
  const InfoCard = (
    <div
      className="
        backdrop-blur-lg bg-white/65
        border border-white/40
        rounded-md
        shadow-lg
        ring-1 ring-white/30
        p-6 space-y-8
      "
    >
      {/* Video */}
      <div className="relative aspect-video bg-black rounded-sm overflow-hidden shadow-md">
        <iframe
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
        />
      </div>

      {/* Event Summary */}
      {description && (
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-black/55">
            Event Summary
          </div>
          <div className="text-sm text-black/75 leading-relaxed">
            {description}
          </div>
        </div>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-black/55">
            Activities & Amenities
          </div>
          <div className="max-h-36 overflow-y-auto pr-2 text-sm text-black/70 space-y-2">
            {activities.map((a, i) => (
              <p key={i}>{a}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <motion.article
      variants={pageFade}
      initial="hidden"
      animate="show"
      className="relative min-h-screen"
    >
      {/* Background */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Main panel */}
        <motion.div
          variants={fadeUp}
          className="bg-white/70 border border-white/30 shadow-xl"
        >
          <div className="px-6 sm:px-10 py-10">
            {/* Back */}
            <Link
              to="/"
              className="block mb-6 text-xs uppercase tracking-widest text-black/60 hover:text-black"
            >
              ← Back to home
            </Link>

            {/* Header */}
            <header className="max-w-3xl mb-10">
              <h1 className="text-3xl sm:text-4xl font-semibold uppercase tracking-wider text-black">
                {title}
              </h1>
              <div className="mt-3 flex gap-3 text-[11px] uppercase tracking-widest text-black/60">
                {date && <span>{date}</span>}
                {location && <span>• {location}</span>}
              </div>
            </header>

            {/* MOBILE INFO CARD */}
            <div className="md:hidden mb-12">
              {InfoCard}
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-14">

                            {/* DESKTOP STICKY CARD */}
              <aside className="hidden md:block relative">
                <div className="md:sticky md:top-10">
                  {InfoCard}
                </div>
              </aside>


              {/* ALBUM */}
              <div className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-[260px] gap-1.5">
                  {pagedImages.map((img, i) => {
                    const realIndex = page * IMAGES_PER_PAGE + i;
                    const pattern = i % 6;

                    const variety =
                      pattern === 0
                        ? "lg:col-span-2 lg:row-span-2"
                        : pattern === 2
                        ? "lg:row-span-2"
                        : pattern === 4
                        ? "lg:col-span-2"
                        : "";

                    return (
                      <button
                        key={img}
                        onClick={() => setActiveIndex(realIndex)}
                        className={`relative overflow-hidden bg-white rounded-sm shadow-md ${variety}`}
                      >
                        <div className="absolute inset-0 p-1.5 bg-white">
                          <img
                            src={img}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex justify-between text-[11px] uppercase tracking-widest text-black/60">
                  {page > 0 && (
                    <button onClick={() => setPage(page - 1)}>
                      ← Previous Page
                    </button>
                  )}
                  {page < pageCount - 1 && (
                    <button
                      className="ml-auto"
                      onClick={() => setPage(page + 1)}
                    >
                      Next Page →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slideshow */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            variants={overlayFade}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="flex items-center gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={prev} className="text-white text-5xl">‹</button>
              <img
                src={images[activeIndex]}
                className="max-w-[88vw] max-h-[82vh] object-contain"
                draggable={false}
              />
              <button onClick={next} className="text-white text-5xl">›</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
