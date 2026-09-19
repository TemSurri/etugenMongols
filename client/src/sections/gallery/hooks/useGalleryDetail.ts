import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  EventImage,
  GalleryEvent,
  GallerySection,
  PerformanceItem,
} from "../model/galleryCatalogTypes";
type SectionKey = "general" | "performances" | "behindTheScenes";
export const IMAGES_PER_PAGE = 9;
function getSectionImages(
  key: SectionKey,
  gallery: NonNullable<GalleryEvent["gallery"]>,
  activePerformance?: PerformanceItem,
): EventImage[] {
  if (key === "performances") {
    return activePerformance?.images ?? [];
  }

  if (key === "behindTheScenes") {
    return gallery.sections.behindTheScenes?.images ?? [];
  }

  return gallery.sections.general.images;
}
export function useGalleryDetail(
  gallery: NonNullable<GalleryEvent["gallery"]>,
) {
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
    firstPerformance?.id ?? null,
  );
  if (!availableSections.includes(activeSectionKey)) {
    setActiveSectionKey("general");
  }
  const [previousFirstPerformance, setPreviousFirstPerformance] =
    useState(firstPerformance);
  if (previousFirstPerformance !== firstPerformance) {
    setPreviousFirstPerformance(firstPerformance);
    setActivePerformanceId(firstPerformance?.id ?? null);
  }
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
    [activeSectionKey, gallery, activePerformance],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(images.length / IMAGES_PER_PAGE);
  const pagedImages = useMemo(
    () =>
      images.slice(
        page * IMAGES_PER_PAGE,
        page * IMAGES_PER_PAGE + IMAGES_PER_PAGE,
      ),
    [images, page],
  );
  const next = useCallback(() => {
    if (images.length === 0) return;
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    if (images.length === 0) return;
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const [previousSelection, setPreviousSelection] = useState({
    activeSectionKey,
    activePerformanceId,
  });
  if (
    previousSelection.activeSectionKey !== activeSectionKey ||
    previousSelection.activePerformanceId !== activePerformanceId
  ) {
    setPreviousSelection({ activeSectionKey, activePerformanceId });
    setPage(0);
    setActiveIndex(null);
  }
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
  return {
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
  };
}
