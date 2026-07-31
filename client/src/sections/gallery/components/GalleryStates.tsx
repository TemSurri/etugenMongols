import { memo } from "react";
import type { GalleryCopy } from "../types";

export const EmptyGallery = memo(function EmptyGallery({ copy }: { copy: GalleryCopy }) {
  return <div className="mx-auto max-w-xl border border-[#fffaf0]/15 bg-black/20 p-7 text-center backdrop-blur-md"><h2 className="text-2xl font-semibold text-[#fffaf0]">{copy.emptyTitle}</h2><p className="mt-3 text-sm leading-7 text-[#f3ead2]/70">{copy.emptyBody}</p></div>;
});

export const NoResults = memo(function NoResults({ copy }: { copy: GalleryCopy }) {
  return <p role="status" aria-live="polite" className="border border-[#fffaf0]/15 bg-black/20 p-6 text-sm text-[#f3ead2]/75 backdrop-blur-md">{copy.noResults}</p>;
});
