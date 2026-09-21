import type { GalleryEvent } from "./galleryCatalogTypes";

/** The catalog is maintained newest-first, which is also the gallery page order. */
export function getRecentGalleries(
  events: readonly GalleryEvent[],
  limit = 4,
) {
  return events
    .filter((event) => event.status === "past" && Boolean(event.gallery))
    .slice(0, Math.max(0, limit));
}

