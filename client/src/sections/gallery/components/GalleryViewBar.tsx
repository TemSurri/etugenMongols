import { memo, type ReactNode } from "react";
import { GridIcon, TimelineIcon } from "./GalleryIcons";
import type { GalleryCopy, ViewMode } from "../types";

type Props = {
  copy: GalleryCopy;
  viewMode: ViewMode;
  showGrid: () => void;
  showTimeline: () => void;
};

export const GalleryViewBar = memo(function GalleryViewBar({ copy, viewMode, showGrid, showTimeline }: Props) {
  return (
    <div className="flex items-center justify-between border-y border-[#fffaf0]/20 bg-[#fffaf0]/10 px-5 py-4 backdrop-blur-md">
      <h2 className="text-2xl font-semibold tracking-tight text-[#fffaf0] md:text-3xl">
        {copy.pastEventsTitle}
      </h2>
      <div className="inline-flex border border-[#fffaf0]/20 bg-black/10 p-1" role="group" aria-label={copy.view}>
        <ViewButton active={viewMode === "grid"} onClick={showGrid} controls="gallery-results">
          <GridIcon />{copy.grid}
        </ViewButton>
        <ViewButton active={viewMode === "timeline"} onClick={showTimeline} controls="gallery-results">
          <TimelineIcon />{copy.timeline}
        </ViewButton>
      </div>
    </div>
  );
});

function ViewButton({ active, onClick, controls, children }: { active: boolean; onClick: () => void; controls: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-controls={controls}
      className={[
        "flex items-center justify-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.17em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0]/60",
        active ? "bg-[#fffaf0] text-[#27301d] shadow-sm" : "text-[#f3ead2]/75 hover:bg-[#fffaf0]/10 hover:text-[#fffaf0]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
