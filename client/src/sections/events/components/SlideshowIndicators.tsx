import { memo } from "react";
import type { EventsCopy, SlideshowImage } from "../types";

type Props = {
  images: SlideshowImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  copy: EventsCopy;
};

function SlideshowIndicators({ images, activeIndex, onSelect, copy }: Props) {
  if (images.length <= 1) return null;

  return (
    <div className="mt-7 flex flex-wrap items-center gap-2" role="group" aria-label={copy.slideshowLabel}>
      {images.map((image, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={image.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`${copy.showPhoto} ${index + 1}`}
            aria-pressed={active}
            className={`h-1 border-0 p-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${active ? "w-9 bg-[#fffaf0]" : "w-5 bg-[#fffaf0]/40 hover:bg-[#fffaf0]/75"}`}
          />
        );
      })}
    </div>
  );
}

export default memo(SlideshowIndicators);
