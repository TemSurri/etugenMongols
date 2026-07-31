import { memo } from "react";
import type { GalleryCopy } from "../types";

export const GalleryHeader = memo(function GalleryHeader({ copy }: { copy: GalleryCopy }) {
  return (
    <header className="mb-8 max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight text-[#fffaf0] md:text-6xl">
        {copy.galleryTitle}
      </h1>
    </header>
  );
});
