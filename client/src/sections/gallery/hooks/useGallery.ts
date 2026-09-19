import { useCallback, useMemo, useState } from "react";
import { getGalleryCover } from "../model/galleryMedia";

import { GALLERY_COPY } from "../content/galleryCopy";
import { galleryEvents } from "../data/galleryCatalog";
import { getYearFromDate, normalizeSearchValue } from "../helpers";
import type { GalleryCardItem, Lang, ViewMode } from "../types";

function getEventImage(event: (typeof galleryEvents)[number]): string {
  return getGalleryCover(event.coverImage);
}

export function useGallery(lang: Lang | undefined) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "mn";
  const copy = GALLERY_COPY[safeLang];

  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const galleryItems = useMemo<GalleryCardItem[]>(
    () =>
      galleryEvents
        .filter((event) => event.status === "past" && Boolean(event.gallery))
        .map((event) => {
          const year = getYearFromDate(event.date);
          const title = event.title[safeLang];
          const desc = event.description[safeLang];

          return {
            id: event.id,
            title,
            desc,
            date: event.date,
            year,
            link: `/gallery/${event.id}`,
            imageSrc: getEventImage(event),
            imageAlt: event.coverImage.alt[safeLang],
            searchText: [title, desc, event.date, year, event.id]
              .join(" ")
              .toLocaleLowerCase(),
          };
        }),
    [safeLang],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query);
    if (!normalizedQuery) return galleryItems;
    return galleryItems.filter((item) =>
      item.searchText.includes(normalizedQuery),
    );
  }, [galleryItems, query]);

  const showGrid = useCallback(() => setViewMode("grid"), []);
  const showTimeline = useCallback(() => setViewMode("timeline"), []);

  return {
    copy,
    query,
    setQuery,
    viewMode,
    showGrid,
    showTimeline,
    filteredItems,
    hasItems: galleryItems.length > 0,
    hasResults: filteredItems.length > 0,
  };
}
