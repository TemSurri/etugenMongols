"use client";

import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type {
  Event,
  EventImage,
  GallerySection,
  PerformanceItem,
} from "../../static_events";

import GalleryHeader from "./GalleryHeader";
import GalleryInfoCard from "./GalleryInfoCard";
import GalleryGrid from "./GalleryGrid";
import GalleryLightbox from "./GalleryLightbox";

type Lang = "en" | "mn";
type SectionKey = "general" | "performances" | "behindTheScenes";

type GalleryViewProps = {
  event: Event;
  lang: Lang;
};

const IMAGES_PER_PAGE = 9;

const COPY = {
  en: {
    back: "Back",
    overview: "Event Overview",
    general: "General",
    performances: "Performances",
    behindTheScenes: "Behind the Scenes",
    noMedia: "No media has been added for this section yet.",
    galleryUnavailable: "Gallery not available.",
  },
  mn: {
    back: "Буцах",
    overview: "Арга хэмжээний тойм",
    general: "Ерөнхий",
    performances: "Тоглолтууд",
    behindTheScenes: "Ар тал",
    noMedia: "Энэ хэсэгт одоогоор зураг, бичлэг нэмэгдээгүй байна.",
    galleryUnavailable: "Цомог одоогоор байхгүй байна.",
  },
} as const;

const pageFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
};

function getSectionImages(
  key: SectionKey,
  gallery: NonNullable<Event["gallery"]>,
  activePerformance?: PerformanceItem
): EventImage[] {
  if (key === "performances") {
    return activePerformance?.images ?? [];
  }

  if (key === "behindTheScenes") {
    return gallery.sections.behindTheScenes?.images ?? [];
  }

  return gallery.sections.general.images;
}

function useSmartBack(fallbackPath = "/gallery") {
  const navigate = useNavigate();

  return useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath);
  }, [navigate, fallbackPath]);
}

export default function GalleryView({ event, lang }: GalleryViewProps) {
  const copy = COPY[lang];
  const goBack = useSmartBack("/gallery");

  if (!event.gallery) {
    return (
      <main className="min-h-screen bg-[#f4ecd9] pt-28 text-[#27301d]">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <button
            type="button"
            onClick={goBack}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7b26]"
          >
            ← {copy.back}
          </button>

          <h1 className="mt-6 text-3xl font-semibold">
            {copy.galleryUnavailable}
          </h1>
        </div>
      </main>
    );
  }

  const gallery = event.gallery;
  const performances = gallery.sections.performances;
  const firstPerformance = performances?.items[0];

  const availableSections = useMemo<SectionKey[]>(() => {
    const sections: SectionKey[] = ["general"];

    if (performances && performances.items.length > 0) {
      sections.push("performances");
    }

    if (gallery.sections.behindTheScenes) {
      sections.push("behindTheScenes");
    }

    return sections;
  }, [gallery.sections.behindTheScenes, performances]);

  const [activeSectionKey, setActiveSectionKey] =
    useState<SectionKey>("general");

  const [activePerformanceId, setActivePerformanceId] = useState<string | null>(
    firstPerformance?.id ?? null
  );

  useEffect(() => {
    if (!availableSections.includes(activeSectionKey)) {
      setActiveSectionKey("general");
    }
  }, [activeSectionKey, availableSections]);

  useEffect(() => {
    setActivePerformanceId(firstPerformance?.id ?? null);
  }, [firstPerformance]);

  const activePerformance = useMemo(() => {
    if (!performances) return undefined;

    return (
      performances.items.find((item) => item.id === activePerformanceId) ??
      firstPerformance
    );
  }, [activePerformanceId, firstPerformance, performances]);

  const activeStaticSection: GallerySection | undefined =
    activeSectionKey === "performances"
      ? undefined
      : activeSectionKey === "behindTheScenes"
        ? gallery.sections.behindTheScenes
        : gallery.sections.general;

  const images = useMemo(
    () => getSectionImages(activeSectionKey, gallery, activePerformance),
    [activeSectionKey, gallery, activePerformance]
  );

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
    if (images.length === 0) return;
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length === 0) return;
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    setPage(0);
    setActiveIndex(null);
  }, [activeSectionKey, activePerformanceId]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, next, prev, closeLightbox]);

  const bgImage = event.coverImage.lowRes || event.coverImage.highRes;

  return (
    <motion.article
      variants={pageFade}
      initial="hidden"
      animate="show"
      className="relative min-h-screen bg-[#f4ecd9] pt-20 text-[#27301d]"
    >
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-x-0 top-0 h-[38rem] w-full object-cover opacity-70"
      />

      <div className="absolute inset-x-0 top-0 h-[38rem] bg-gradient-to-b from-[#f4ecd9]/10 via-[#f4ecd9]/55 to-[#f4ecd9]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12">
        <button
          type="button"
          onClick={goBack}
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#27301d] transition-colors hover:text-[#9a7b26]"
        >
          ← {copy.back}
        </button>

        <section className="mt-8 border border-[#d8caa5]/70 bg-[#fffaf0]/92 p-6 shadow-[0_18px_50px_rgba(88,72,38,0.10)] sm:p-8">
          <GalleryHeader
            title={event.title[lang]}
            date={event.date}
            location={event.location}
          />

          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
            {copy.overview}
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4e593c]/85 md:text-[15px] md:leading-8">
            {event.description[lang]}
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-2">
          {availableSections.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSectionKey(key)}
              className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                activeSectionKey === key
                  ? "border-[#27301d] bg-[#27301d] text-[#fffaf0]"
                  : "border-[#d8caa5] bg-[#fffaf0]/95 text-[#9a7b26] hover:border-[#9a7b26]"
              }`}
            >
              {copy[key]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <GalleryInfoCard
              lang={lang}
              sectionKey={activeSectionKey}
              sectionTitle={
                activeSectionKey === "performances"
                  ? performances?.title[lang]
                  : activeStaticSection?.title[lang]
              }
              description={
                activeSectionKey === "performances"
                  ? performances?.description[lang]
                  : activeStaticSection?.description[lang]
              }
              montageVideo={
                activeSectionKey === "general" && gallery.montageVideo?.url
                  ? gallery.montageVideo
                  : undefined
              }
              performances={performances?.items ?? []}
              activePerformance={activePerformance}
              onSelectPerformance={setActivePerformanceId}
              performanceVideos={
                activeSectionKey === "performances"
                  ? activePerformance?.videos?.filter((video) => video.url)
                  : undefined
              }
              thankYouVideo={
                activeSectionKey === "behindTheScenes" &&
                gallery.thankYouVideo?.url
                  ? gallery.thankYouVideo
                  : undefined
              }
            />
          </aside>

          <section className="min-w-0 space-y-8">
            {activeSectionKey === "performances" && activePerformance && (
              <div className="border border-[#d8caa5]/70 bg-[#fffaf0]/92 p-5 shadow-[0_14px_38px_rgba(88,72,38,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
                  {copy.performances}
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {activePerformance.title[lang]}
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4e593c]/85">
                  {activePerformance.description[lang]}
                </p>
              </div>
            )}

            {images.length > 0 ? (
              <GalleryGrid
                title={event.title[lang]}
                images={images}
                pagedImages={pagedImages}
                page={page}
                pageCount={pageCount}
                imagesPerPage={IMAGES_PER_PAGE}
                lang={lang}
                onOpenImage={setActiveIndex}
                onPrevPage={() => setPage((p) => Math.max(0, p - 1))}
                onNextPage={() =>
                  setPage((p) => Math.min(pageCount - 1, p + 1))
                }
              />
            ) : (
              <p className="border border-[#d8caa5]/70 bg-[#fffaf0]/92 p-6 text-sm text-[#4e593c]/85">
                {copy.noMedia}
              </p>
            )}
          </section>
        </div>
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