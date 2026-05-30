import type { EventImage } from "../../static_events";

type GalleryGridProps = {
  title: string;
  images: EventImage[];
  pagedImages: EventImage[];
  page: number;
  pageCount: number;
  imagesPerPage: number;
  onOpenImage: (index: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export default function GalleryGrid({
  title,
  images,
  pagedImages,
  page,
  pageCount,
  imagesPerPage,
  onOpenImage,
  onPrevPage,
  onNextPage,
}: GalleryGridProps) {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:auto-rows-[260px]">
        {pagedImages.map((img, i) => {
          const realIndex = page * imagesPerPage + i;
          const pattern = i % 6;

          const variety =
            pattern === 0
              ? "lg:col-span-2 lg:row-span-2"
              : pattern === 2
                ? "lg:row-span-2"
                : pattern === 4
                  ? "lg:col-span-2"
                  : "";

          return (
            <button
              key={`${img.lowRes}-${realIndex}`}
              type="button"
              onClick={() => onOpenImage(realIndex)}
              aria-label={`Open image ${realIndex + 1} of ${images.length}`}
              className={`relative overflow-hidden rounded-xl bg-white shadow-md ${variety}`}
            >
              <div className="absolute inset-0 p-1.5">
                <img
                  src={img.lowRes || img.highRes}
                  alt={img.alt.en || `${title} gallery image ${realIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
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