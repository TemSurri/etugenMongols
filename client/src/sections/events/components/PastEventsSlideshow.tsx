import { memo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { eventsEaseOut, imageMotion } from "../animations";
import { useSlideshow } from "../hooks/useSlideshow";
import type { EventsCopy, SlideshowImage } from "../types";
import SlideshowIndicators from "./SlideshowIndicators";

type Props = { images: SlideshowImage[]; copy: EventsCopy };

function PastEventsSlideshow({ images, copy }: Props) {
  const reduceMotion = useReducedMotion();
  const { activeIndex, activeImage, selectImage } = useSlideshow(images);
  if (!activeImage) return null;

  return (
    <motion.section variants={imageMotion} aria-labelledby="past-events-title" className="order-2 relative min-h-[420px] overflow-hidden sm:min-h-[500px] lg:h-full lg:min-h-0">
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={activeImage.id}
          src={activeImage.src}
          alt={activeImage.alt}
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduceMotion ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: eventsEaseOut }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/14" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/8" />
      <div className="absolute inset-x-0 bottom-0 p-8 text-[#fffaf0] sm:p-10 lg:p-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#eee0b7]">{copy.slideshowEyebrow}</p>
        <h2 id="past-events-title" className="mt-3 max-w-lg text-2xl font-normal leading-tight tracking-tight md:text-3xl">{copy.slideshowTitle}</h2>
        <Link to="/gallery" className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fffaf0] transition-colors hover:text-[#eee0b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0]/60">
          {copy.slideshowButton}<span aria-hidden="true" className="transition-transform duration-200 motion-safe:group-hover:translate-x-1">→</span>
        </Link>
        <SlideshowIndicators images={images} activeIndex={activeIndex} onSelect={selectImage} copy={copy} />
      </div>
    </motion.section>
  );
}

export default memo(PastEventsSlideshow);
