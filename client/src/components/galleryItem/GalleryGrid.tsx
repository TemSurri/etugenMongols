import type { EventImage } from "../../static_events";

type Lang = "en" | "mn";

type GalleryGridProps = {
  title: string;
  images: EventImage[];
  pagedImages: EventImage[];
  page: number;
  pageCount: number;
  imagesPerPage: number;
  lang: Lang;
  onOpenImage: (index: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const GRID_PATTERNS = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
] as const;

export default function GalleryGrid({
  title,
  images,
  pagedImages,
  page,
  pageCount,
  imagesPerPage,
  lang,
  onOpenImage,
  onPrevPage,
  onNextPage,
}: GalleryGridProps) {
  return (
    <div className="space-y-8">
      <div className="grid auto-rows-[150px] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[170px] xl:grid-cols-3 xl:auto-rows-[190px]">
        {pagedImages.map((img, i) => {
          const realIndex = page * imagesPerPage + i;
          const pattern = GRID_PATTERNS[(i + page * 3) % GRID_PATTERNS.length];

          return (
            <button
              key={`${img.lowRes}-${realIndex}`}
              type="button"
              onClick={() => onOpenImage(realIndex)}
              aria-label={`Open image ${realIndex + 1} of ${images.length}`}
              className={`group relative overflow-hidden border border-[#d8caa5]/70 bg-[#fffaf0] p-1 shadow-[0_12px_30px_rgba(88,72,38,0.12)] transition-transform duration-200 hover:-translate-y-0.5 ${pattern}`}
            >
              <img
                src={img.lowRes || img.highRes}
                alt={img.alt[lang] || `${title} gallery image ${realIndex + 1}`}
                loading={realIndex < 6 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
              />
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[11px] font-semibold uppercase tracking-widest text-[#9a7b26]">
        {page > 0 && (
          <button type="button" onClick={onPrevPage}>
            ← Previous Page
          </button>
        )}

        {page < pageCount - 1 && (
          <button type="button" className="ml-auto" onClick={onNextPage}>
            Next Page →
          </button>
        )}
      </div>
    </div>
  );
}