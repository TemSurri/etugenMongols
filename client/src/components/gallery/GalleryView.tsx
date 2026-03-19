"use client";

import { Link } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { GalleryItem as GalleryItemType } from "../../static_gallery";

import GalleryHeader from "./GalleryHeader";
import GalleryInfoCard from "./GalleryInfoCard";
import GalleryGrid from "./GalleryGrid";
import GalleryLightbox from "./GalleryLightbox";

// motion


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

const IMAGES_PER_PAGE = 6;

export default function GalleryView({
  id,
  title,
  date,
  location,
  albumImageCount,
  description,
  activities = [],
}: GalleryItemType) {
  const albumBasePath = `/gallery/${id}/albumphotos`;

  const images = useMemo(
    () =>
      Array.from(
        { length: albumImageCount },
        (_, i) => `${albumBasePath}/${i + 1}.png`
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

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, next, prev, closeLightbox]);

  return (
    <motion.article
      variants={pageFade}
      initial="hidden"
      animate="show"
      className="relative min-h-screen"
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          variants={fadeUp}
          className="bg-white/70 border border-white/30 shadow-xl"
        >
          <div className="px-6 sm:px-10 py-10">
            <Link
              to="/"
              className="block mb-6 text-xs uppercase tracking-widest text-black/60 hover:text-black"
            >
              ← Back to home
            </Link>

            <GalleryHeader title={title} date={date} location={location} />

            <div className="md:hidden mb-12">
              <GalleryInfoCard
                title={title}
                description={description}
                activities={activities}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-14">
              <aside className="hidden md:block relative">
                <div className="md:sticky md:top-10">
                  <GalleryInfoCard
                    title={title}
                    description={description}
                    activities={activities}
                  />
                </div>
              </aside>

              <GalleryGrid
                title={title}
                images={images}
                pagedImages={pagedImages}
                page={page}
                pageCount={pageCount}
                imagesPerPage={IMAGES_PER_PAGE}
                onOpenImage={setActiveIndex}
                onPrevPage={() => setPage(page - 1)}
                onNextPage={() => setPage(page + 1)}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <GalleryLightbox
        isOpen={activeIndex !== null}
        activeIndex={activeIndex}
        images={images}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </motion.article>
  );
}