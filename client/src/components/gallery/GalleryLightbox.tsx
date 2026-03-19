import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";

const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

type GalleryLightboxProps = {
  isOpen: boolean;
  activeIndex: number | null;
  images: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  isOpen,
  activeIndex,
  images,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && activeIndex !== null && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="flex items-center gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="text-white text-5xl"
            >
              ‹
            </button>

            <img
              src={images[activeIndex]}
              alt={`Gallery image ${activeIndex + 1}`}
              className="max-w-[88vw] max-h-[82vh] object-contain"
              draggable={false}
            />

            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="text-white text-5xl"
            >
              ›
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}