import { ALBUM_STYLES } from "./constants";

export function getYearFromDate(date: string): string {
  return date.match(/\b(20\d{2}|19\d{2})\b/)?.[0] ?? "";
}

export function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function getLayoutClass(count: number): string {
  if (count <= 1) return "mx-auto max-w-3xl";
  if (count === 2) return "grid gap-10 md:grid-cols-2";
  if (count <= 5) return "grid gap-8 sm:grid-cols-2 xl:grid-cols-3";
  return "columns-1 gap-7 sm:columns-2 xl:columns-3";
}

export function getAlbumFrame(index: number, isLargeSet: boolean): string {
  if (isLargeSet) return ALBUM_STYLES[index % ALBUM_STYLES.length];
  return index % 2 === 0 ? "aspect-[4/3]" : "aspect-[5/4]";
}
