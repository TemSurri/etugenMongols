import { siteMedia } from "../../media/siteMedia";

export const EVENT_IMAGES = {
  fallback: siteMedia.landing,
  community: siteMedia.communityCulture[0],
} as const;

export const SLIDESHOW_INTERVAL_MS = 5_000;
