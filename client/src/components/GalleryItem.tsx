"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type { GalleryItem as GalleryItemType } from "../static_gallery";
import landingImage from "../assets/landingpage.webp";

/* ---------- Motion ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};



/* ---------- Gallery Pagination ---------- */

const IMAGES_PER_PAGE = 6;

export default function GalleryItem({
  id,
  title,
  date,
  location,
  albumImageCount,
  activities,
}: GalleryItemType) {
  const albumBasePath = `/gallery/${id}/albumphotos`;

  const TIMELINE_ITEMS = activities
  const images =
    albumImageCount > 0
      ? Array.from(
          { length: albumImageCount },
          (_, i) => `${albumBasePath}/${i + 1}.png`
        )
      : [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(images.length / IMAGES_PER_PAGE);
  const pagedImages = images.slice(
    page * IMAGES_PER_PAGE,
    page * IMAGES_PER_PAGE + IMAGES_PER_PAGE
  );

  const next = () =>
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  const prev = () =>
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + images.length) % images.length
    );

  return (
    <article
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6"
        >
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition"
          >
            ← Back to events
          </Link>
        </motion.div>

        {/* WHITE PANEL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white shadow-2xl"
        >
          <div className="px-6 sm:px-10 py-8">
            {/* HEADER */}
            <header className="max-w-3xl mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-wider text-black">
                {title}
              </h1>

              <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-widest text-black/50">
                {date && <span>{date}</span>}
                {location && <span>• {location}</span>}
              </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12">
              {/* LEFT: VIDEO + TIMELINE */}
              <div>
                {/* VIDEO */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Event video"
                    allowFullScreen
                  />
                </div>

                {/* TIMELINE (clean, no bullets) */}
                <div className="mt-10 space-y-4">
                  {TIMELINE_ITEMS.map((item, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base text-black/70 leading-relaxed"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* RIGHT: GALLERY */}
              {images.length > 0 && (
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    {pagedImages.map((img, i) => {
                      const realIndex = page * IMAGES_PER_PAGE + i;
                      return (
                        <button
                          key={img}
                          onClick={() => setActiveIndex(realIndex)}
                          className="relative aspect-square overflow-hidden group"
                        >
                          <img
                            src={img}
                            alt={`${title} photo ${realIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
                        </button>
                      );
                    })}
                  </div>

                  {/* PAGINATION (larger cap, calmer) */}
                  {pageCount > 1 && (
                    <div className="mt-10 pt-6 border-t border-black/10 flex items-center justify-between text-xs uppercase tracking-widest text-black/50">
                      <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="hover:text-black transition disabled:opacity-30"
                      >
                        ← Previous
                      </button>

                      <span className="text-[11px]">
                        Page {page + 1} of {pageCount}
                      </span>

                      <button
                        onClick={() =>
                          setPage((p) => Math.min(pageCount - 1, p + 1))
                        }
                        disabled={page === pageCount - 1}
                        className="hover:text-black transition disabled:opacity-30"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* SLIDESHOW OVERLAY (unchanged) */}
      <AnimatePresence>
        {activeIndex !== null && images.length > 0 && (
          <motion.div
            variants={overlayFade}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeIndex]}
                alt="Focused view"
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/70">
                {activeIndex + 1} / {images.length}
              </div>

              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
