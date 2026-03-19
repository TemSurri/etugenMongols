type GalleryGridProps = {
  title: string;
  images: string[];
  pagedImages: string[];
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
      <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-[260px] gap-1.5">
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
              key={img}
              type="button"
              onClick={() => onOpenImage(realIndex)}
              aria-label={`Open image ${realIndex + 1} of ${images.length}`}
              className={`relative overflow-hidden bg-white rounded-sm shadow-md ${variety}`}
            >
              <div className="absolute inset-0 p-1.5 bg-white">
                <img
                  src={img}
                  alt={`${title} gallery image ${realIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[11px] uppercase tracking-widest text-black/60">
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