"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { entranceVariants } from "./animations";
import { EmptyGallery, NoResults } from "./components/GalleryStates";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryHeader } from "./components/GalleryHeader";
import { GalleryLegend } from "./components/GalleryLegend";
import { GalleryTimeline } from "./components/GalleryTimeline";
import { GalleryViewBar } from "./components/GalleryViewBar";
import { PageBackground } from "./components/PageBackground";
import { useGallery } from "./hooks/useGallery";
import type { GalleryShowcaseProps } from "./types";

function GalleryShowcase({ lang = "mn" }: GalleryShowcaseProps) {
  const { copy, query, setQuery, viewMode, showGrid, showTimeline, filteredItems, hasItems, hasResults } = useGallery(lang);

  return (
    <section className="relative min-h-screen bg-[#27301d] pt-20 text-[#fffaf0]">
      <PageBackground />
      <motion.div variants={entranceVariants} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-18 sm:px-6 md:px-10 lg:px-12">
        <GalleryHeader copy={copy} />
        {!hasItems ? <EmptyGallery copy={copy} /> : <>
          <div className="hidden md:block"><GalleryViewBar copy={copy} viewMode={viewMode} showGrid={showGrid} showTimeline={showTimeline} /></div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-10">
            <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
              <GalleryLegend copy={copy} query={query} setQuery={setQuery} items={filteredItems} />
            </div>
            <main id="gallery-results" aria-label={copy.resultsLabel} className="order-2 min-w-0 lg:order-1">
              {hasResults ? <>
                <div className="md:hidden"><GalleryTimeline items={filteredItems} copy={copy} /></div>
                <div className="hidden md:block">{viewMode === "grid" ? <GalleryGrid items={filteredItems} copy={copy} /> : <GalleryTimeline items={filteredItems} copy={copy} />}</div>
              </> : <NoResults copy={copy} />}
            </main>
          </div>
        </>}
      </motion.div>
    </section>
  );
}

export default memo(GalleryShowcase);
