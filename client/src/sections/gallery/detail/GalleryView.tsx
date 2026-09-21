import type { Lang } from "../../../context/language";
import { COPY } from "../content/GalleryViewContent";

import { IMAGES_PER_PAGE, useGalleryDetail } from "../hooks/useGalleryDetail";
import { getGalleryCover } from "../model/galleryMedia";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { GalleryEvent } from "../model/galleryCatalogTypes";

import GalleryGrid from "./GalleryGrid";
import GalleryHeader from "./GalleryHeader";
import GalleryInfoCard from "./GalleryInfoCard";
import GalleryLightbox from "./GalleryLightbox";

type GalleryViewProps = {
  event: GalleryEvent;
  lang: Lang;
};

const pageFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
};

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

  return (
    <GalleryContent
      event={event}
      gallery={event.gallery}
      lang={lang}
      goBack={goBack}
    />
  );
}

function GalleryContent({
  event,
  gallery,
  lang,
  goBack,
}: GalleryViewProps & {
  gallery: NonNullable<GalleryEvent["gallery"]>;
  goBack: () => void;
}) {
  const copy = COPY[lang];
  const {
    availableSections,
    activeSectionKey,
    setActiveSectionKey,
    activePerformance,
    activeStaticSection,
    images,
    activeIndex,
    setActiveIndex,
    page,
    setPage,
    pageCount,
    pagedImages,
    next,
    prev,
    closeLightbox,
    performances,
    setActivePerformanceId,
  } = useGalleryDetail(gallery);

  const bgImage = getGalleryCover(event.coverImage);

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

          <p className="max-w-3xl text-sm leading-7 text-[#4e593c]/85 md:text-[15px] md:leading-8">
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
                <h2 className="text-2xl font-semibold tracking-tight">
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
