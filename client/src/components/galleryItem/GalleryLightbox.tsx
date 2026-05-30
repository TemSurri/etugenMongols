import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { EventImage } from "../../static_events";

type Lang = "en" | "mn";

const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

type GalleryLightboxProps = {
  isOpen: boolean;
  activeIndex: number | null;
  images: EventImage[];
  lang: Lang;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  isOpen,
  activeIndex,
  images,
  lang,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && activeIndex !== null && images[activeIndex] && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          <div
            className="flex items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="text-5xl text-white"
            >
              ‹
            </button>

            <img
              src={images[activeIndex].highRes}
              alt={images[activeIndex].alt[lang]}
              className="max-h-[82vh] max-w-[88vw] object-contain"
              draggable={false}
            />

            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="text-5xl text-white"
            >
              ›
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}