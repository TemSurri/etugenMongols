import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { timelineItemVariants } from "../animations";
import type { GalleryCardItem, GalleryCopy } from "../types";

export const GalleryTimeline = memo(function GalleryTimeline({ items, copy }: { items: GalleryCardItem[]; copy: GalleryCopy }) {
  return (
    <motion.div key="gallery-timeline" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="relative pb-8 md:pb-12">
      <div aria-hidden="true" className="absolute left-4 top-0 h-full w-px bg-[#e1d2a6]/45 md:left-1/2" />
      <div className="space-y-16 md:space-y-20 lg:space-y-24">
        {items.map((item, index) => <GalleryTimelineItem key={item.id} item={item} index={index} copy={copy} />)}
      </div>
    </motion.div>
  );
});

const GalleryTimelineItem = memo(function GalleryTimelineItem({ item, index, copy }: { item: GalleryCardItem; index: number; copy: GalleryCopy }) {
  const isLeftSide = index % 2 === 0;
  return (
    <motion.article variants={timelineItemVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="relative grid gap-7 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
      <TimelineDot />
      <div className={isLeftSide ? "md:col-start-1" : "md:col-start-2"}>
        <TimelineDate item={item} copy={copy} isLeftSide={isLeftSide} />
        <TimelineGalleryCard item={item} copy={copy} index={index} />
      </div>
      <TimelineGalleryDetails item={item} copy={copy} isLeftSide={isLeftSide} />
    </motion.article>
  );
});

function TimelineDot() {
  return <div aria-hidden="true" className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2"><div className="h-3 w-3 bg-[#d7c896] shadow-[0_0_0_6px_rgba(30,32,24,0.9)]" /></div>;
}

function TimelineDate({ item, copy, isLeftSide }: { item: GalleryCardItem; copy: GalleryCopy; isLeftSide: boolean }) {
  return <div className={isLeftSide ? "mb-4 md:text-right" : "mb-4 md:text-left"}><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7c896]">{copy.pastEvent}</p><p className="mt-1 text-2xl font-semibold tracking-tight text-[#fffaf0]">{item.year || item.date}</p></div>;
}

const TimelineGalleryCard = memo(function TimelineGalleryCard({ item, copy, index }: { item: GalleryCardItem; copy: GalleryCopy; index: number }) {
  return (
    <Link to={item.link} aria-label={`${copy.viewAlbum}: ${item.title}`} className="group block overflow-hidden bg-[#fffaf0] text-[#27301d] shadow-[0_18px_50px_rgba(0,0,0,0.3)] transition-transform duration-300 motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1d2a6]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#efe2bf]">
        <img src={item.imageSrc} alt={item.imageAlt} width={960} height={600} loading={index < 2 ? "eager" : "lazy"} decoding="async" fetchPriority={index < 2 ? "high" : "auto"} className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
      </div>
      <div className="p-5 md:p-6">
        <span className="inline-flex bg-[#eee7d4] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#6f7449]">{item.year || item.date}</span>
        <h2 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-[#27301d]">{item.title}</h2>
        <span className="mt-5 inline-flex text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f7449]">{copy.viewAlbum} →</span>
      </div>
    </Link>
  );
});

function TimelineGalleryDetails({ item, copy, isLeftSide }: { item: GalleryCardItem; copy: GalleryCopy; isLeftSide: boolean }) {
  return (
    <div className={["flex items-center", isLeftSide ? "md:col-start-2" : "md:col-start-1 md:row-start-1"].join(" ")}>
      <div className={["max-w-md text-[#fffaf0]", isLeftSide ? "text-left" : "md:ml-auto md:text-right"].join(" ")}>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7c896]">{copy.pastEvent}</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">{item.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[#f3ead2]/88 md:text-[15px] md:leading-8">{item.desc}</p>
        <Link to={item.link} className="mt-6 inline-flex border-b border-[#e1d2a6]/50 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1d2a6] transition-colors hover:border-[#fffaf0] hover:text-[#fffaf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1d2a6]">{copy.viewAlbum} →</Link>
      </div>
    </div>
  );
}
