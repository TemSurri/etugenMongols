import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { EventImage } from "../../static_events";

type Lang = "en" | "mn";

type GalleryLightboxProps = {
  isOpen: boolean;
  activeIndex: number | null;
  images: EventImage[];
  lang: Lang;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const overlayFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
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
  const activeImage =
    activeIndex !== null ? images[activeIndex] : undefined;

  return (
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4"
          onClick={onClose}
        >
          <div
            className="grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="rounded-full bg-white/10 px-3 py-2 text-4xl leading-none text-white transition hover:bg-white/20"
            >
              ‹
            </button>

            <div className="flex min-h-[70vh] items-center justify-center">
              <img
                src={activeImage.highRes || activeImage.lowRes}
                alt={activeImage.alt[lang]}
                className="max-h-[86vh] max-w-full object-contain"
                draggable={false}
              />
            </div>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="rounded-full bg-white/10 px-3 py-2 text-4xl leading-none text-white transition hover:bg-white/20"
            >
              ›
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}