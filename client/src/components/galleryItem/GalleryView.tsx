"use client";

import { Link } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Event, EventImage, GallerySection } from "../../static_events";

import GalleryHeader from "./GalleryHeader";
import GalleryInfoCard from "./GalleryInfoCard";
import GalleryGrid from "./GalleryGrid";
import GalleryLightbox from "./GalleryLightbox";

type Lang = "en" | "mn";

type GalleryViewProps = {
  event: Event;
  lang: Lang;
};

type SectionKey = "general" | "performances" | "behindTheScenes";

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

const COPY = {
  en: {
    back: "Back to Gallery Page",
    general: "General",
    performances: "Performances",
    behindTheScenes: "Behind the Scenes",
    appreciation: "Appreciation Video",
  },
  mn: {
    back: "Цомог руу буцах",
    general: "Ерөнхий",
    performances: "Тоглолтууд",
    behindTheScenes: "Ар тал",
    appreciation: "Талархлын бичлэг",
  },
} as const;

function getAvailableSections(gallery: NonNullable<Event["gallery"]>) {
  return Object.entries(gallery.sections).filter(
    ([, section]) => section && section.images.length > 0
  ) as [SectionKey, GallerySection][];
}

export default function GalleryView({ event, lang }: GalleryViewProps) {
  const copy = COPY[lang];

  if (!event.gallery) {
    return (
      <main className="min-h-screen bg-[#f4ecd9] pt-28 text-[#27301d]">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <Link
            to="/gallery"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7b26]"
          >
            ← {copy.back}
          </Link>

          <h1 className="mt-6 text-3xl font-semibold">
            Gallery not available.
          </h1>
        </div>
      </main>
    );
  }

  const availableSections = useMemo(
    () => getAvailableSections(event.gallery!),
    [event.gallery]
  );

  const [activeSectionKey, setActiveSectionKey] = useState<SectionKey>(
    availableSections[0]?.[0] ?? "general"
  );

  const activeSection =
    event.gallery.sections[activeSectionKey] ?? availableSections[0]?.[1];

  const images = useMemo<EventImage[]>(
    () => activeSection?.images ?? [],
    [activeSection]
  );

  const backgroundImage =
    event.coverImage.lowRes || event.coverImage.highRes || images[0]?.lowRes;

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
    setPage(0);
    setActiveIndex(null);
  }, [activeSectionKey]);

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
      className="relative min-h-screen overflow-hidden bg-[#f4ecd9] pt-20 text-[#27301d]"
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25 blur-sm"
        />
      )}

      <div className="absolute inset-0 bg-[#f4ecd9]/88" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-[#d8caa5]/70 bg-[#fffaf0]/85 shadow-xl backdrop-blur"
        >
          <div className="px-6 py-10 sm:px-10">
            <Link
              to="/gallery"
              className="mb-6 block text-xs font-semibold uppercase tracking-widest text-[#9a7b26] hover:text-[#27301d]"
            >
              ← {copy.back}
            </Link>

            <GalleryHeader
              title={event.title[lang]}
              date={event.date}
              location={event.location}
            />

            {event.gallery.thankYouVideo && (
              <div className="mb-10">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
                  {copy.appreciation}
                </p>

                <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
                  <iframe
                    className="h-full w-full"
                    loading="lazy"
                    src={event.gallery.thankYouVideo.url}
                    title={event.gallery.thankYouVideo.title[lang]}
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="mb-8 flex flex-wrap gap-2">
              {availableSections.map(([key, section]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSectionKey(key)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                    activeSectionKey === key
                      ? "border-[#27301d] bg-[#27301d] text-[#fffaf0]"
                      : "border-[#d8caa5] bg-white/70 text-[#9a7b26] hover:border-[#9a7b26]"
                  }`}
                >
                  {section.title[lang]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-14 md:grid-cols-[360px_1fr]">
              <aside className="relative">
                <div className="md:sticky md:top-28">
                  <GalleryInfoCard
                    title={event.title[lang]}
                    description={activeSection?.description[lang]}
                    sectionTitle={activeSection?.title[lang]}
                    eventDescription={event.description[lang]}
                  />
                </div>
              </aside>

              <GalleryGrid
                title={event.title[lang]}
                images={images}
                pagedImages={pagedImages}
                page={page}
                pageCount={pageCount}
                imagesPerPage={IMAGES_PER_PAGE}
                onOpenImage={setActiveIndex}
                onPrevPage={() => setPage((p) => Math.max(0, p - 1))}
                onNextPage={() =>
                  setPage((p) => Math.min(pageCount - 1, p + 1))
                }
              />
            </div>
          </div>
        </motion.div>
      </div>

      <GalleryLightbox
        isOpen={activeIndex !== null}
        activeIndex={activeIndex}
        images={images}
        lang={lang}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </motion.article>
  );
}