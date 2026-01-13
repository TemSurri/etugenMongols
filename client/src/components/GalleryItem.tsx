"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type { GalleryItem as GalleryItemType } from "../static_gallery";
import landingImage from "../assets/landingpage.webp";

/* ---------- Motion ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function GalleryItem({
  id,
  title,
  date,
  location,
  description,
  albumImageCount,
}: GalleryItemType) {
  const albumBasePath = `/gallery/${id}/albumphotos`;

  const images =
    albumImageCount > 0
      ? Array.from(
          { length: albumImageCount },
          (_, i) => `${albumBasePath}/${i + 1}.png`
        )
      : [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-6">
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
          className="bg-white shadow-2xl overflow-hidden"
        >
          {/* VIDEO HERO */}
          <div className="relative aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Event video"
              allowFullScreen
            />
          </div>

          {/* CONTENT */}
          <div className="px-6 sm:px-10 py-10">
            {/* HEADER */}
            <header className="max-w-3xl mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-wider text-black">
                {title}
              </h1>

              <div className="mt-4 h-px w-16 bg-black" />

              <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-widest text-black/60">
                {date && <span>{date}</span>}
                {location && <span>• {location}</span>}
              </div>
            </header>

            {/* DESCRIPTION */}
            {description && (
              <div className="max-w-3xl mb-12">
                <div className="flex gap-6">
                  <div className="w-px bg-black/20" />
                  <p className="text-sm sm:text-base leading-relaxed text-black/70">
                    {description}
                  </p>
                </div>
              </div>
            )}

            {/* PHOTO ALBUM */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => {
                  const layout =
                    i === 0
                      ? "col-span-2 row-span-2"
                      : i === 3
                      ? "col-span-2"
                      : "col-span-1";

                  return (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`relative overflow-hidden group ${layout}`}
                    >
                      <img
                        src={img}
                        alt={`${title} photo ${i + 1}`}
                        className="
                          w-full h-full object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* FOCUS / SLIDESHOW */}
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
              initial={{ scale: 0.97, opacity: 0 }}
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
