import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAlbumFrame, getLayoutClass } from "../helpers";
import type { GalleryCardItem, GalleryCopy } from "../types";

export const GalleryGrid = memo(function GalleryGrid({ items, copy }: { items: GalleryCardItem[]; copy: GalleryCopy }) {
  const isLargeSet = items.length > 5;
  return (
    <motion.div
      key="gallery-grid"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={getLayoutClass(items.length)}
    >
      {items.map((item, index) => (
        <div key={item.id} className={isLargeSet ? "mb-12 break-inside-avoid" : ""}>
          <GalleryCard item={item} viewAlbum={copy.viewAlbum} index={index} isLargeSet={isLargeSet} />
        </div>
      ))}
    </motion.div>
  );
});

const GalleryCard = memo(function GalleryCard({ item, viewAlbum, index, isLargeSet }: { item: GalleryCardItem; viewAlbum: string; index: number; isLargeSet: boolean }) {
  const frame = getAlbumFrame(index, isLargeSet);
  return (
    <Link to={item.link} aria-label={`${viewAlbum}: ${item.title}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e1d2a6]">
      <article>
        <div className={`${frame} relative overflow-hidden bg-[#27301d]/25 shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_68px_rgba(0,0,0,0.34)]`}>
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            width={960}
            height={720}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/44 via-transparent to-transparent" />
          <span className="absolute bottom-3 right-3 bg-[#fffaf0]/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#27301d] shadow-sm backdrop-blur-sm">
            {viewAlbum} →
          </span>
        </div>
        <div className="mt-4 px-1">
          <h2 className="text-lg font-semibold leading-tight tracking-tight text-[#fffaf0]">{item.title}</h2>
        </div>
      </article>
    </Link>
  );
});
