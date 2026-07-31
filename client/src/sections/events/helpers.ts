import { events } from "../../static_events";
import { EVENT_IMAGES } from "./constants";

export function getEventImage(event: (typeof events)[number]): string {
  return event.coverImage.lowRes || event.coverImage.highRes || EVENT_IMAGES.fallback;
}

export function getEventGridClass(count: number): string {
  if (count === 1) return "grid max-w-[22rem] grid-cols-1";
  return "grid grid-cols-1 gap-4 sm:grid-cols-2";
}
