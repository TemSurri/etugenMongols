import { getGalleryCover } from "../gallery/model/galleryMedia";
import { galleryEvents } from "../gallery/data/galleryCatalog";
import { EVENT_IMAGES } from "./constants";

export function getEventImage(event: (typeof galleryEvents)[number]): string {
  return getGalleryCover(event.coverImage) || EVENT_IMAGES.fallback;
}

export function getEventGridClass(count: number): string {
  if (count === 1) return "grid max-w-[22rem] grid-cols-1";
  return "grid grid-cols-1 gap-4 sm:grid-cols-2";
}
