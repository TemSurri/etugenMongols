import type { EventImage,LangText } from "./galleryCatalogTypes";
export const text = (en: string, mn: string): LangText => ({ en, mn });

export const img = (
  highRes: string,
  lowRes: string,
  alt: LangText
): EventImage => ({
  highRes,
  lowRes,
  alt,
});

export const imageRange = (
  folder: string,
  count: number,
  alt: LangText
): EventImage[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;

    return img(
      `/gallery/${folder}/${n}.webp`,
      `/gallery/${folder}/${n}-low.webp`,
      alt
    );
  });

export function getGalleryCover(cover: EventImage): string {
  return cover.lowRes || cover.highRes;
}
