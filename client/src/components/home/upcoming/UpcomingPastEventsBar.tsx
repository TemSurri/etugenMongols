"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { GalleryItem } from "../../../static_gallery";

type Lang = "en" | "mn";

type UpcomingPastEventsBarProps = {
  pastEvents: GalleryItem[];
  selectedPastEvent: GalleryItem | null;
  onSelectPastEvent: (event: GalleryItem) => void;
  lang: Lang;
  containerVariants: Variants;
  cardVariants: Variants;
};

export default function UpcomingPastEventsBar({
  pastEvents,
  selectedPastEvent,
  onSelectPastEvent,
  lang,
  containerVariants,
  cardVariants,
}: UpcomingPastEventsBarProps) {
  if (pastEvents.length === 0) return null;

  return (
    <motion.section variants={containerVariants} className="mt-32 max-w-5xl">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
            {lang === "en" ? "Recent Events" : "Сүүлийн арга хэмжээнүүд"}
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
            {lang === "en" ? "Community Moments" : "Нийгэмлэгийн дурсамжууд"}
          </h3>
        </div>

        <p className="hidden max-w-xs text-right text-xs leading-5 text-white/45 lg:block">
          {lang === "en"
            ? "Select a recent event to preview its gallery."
            : "Сүүлийн арга хэмжээг сонгож зургуудыг үзнэ үү."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pastEvents.slice(0, 3).map((event) => {
          const isSelected = selectedPastEvent?.id === event.id;

          return (
            <motion.button
              key={event.id}
              type="button"
              variants={cardVariants}
              onClick={() => onSelectPastEvent(event)}
              className={`
                group
                grid grid-cols-[82px_1fr]
                overflow-hidden
                border
                bg-white/[0.07]
                text-left
                backdrop-blur-sm
                transition
                ${
                  isSelected
                    ? "border-white/70 bg-white/[0.14]"
                    : "border-white/15 hover:border-white/35 hover:bg-white/[0.11]"
                }
              `}
            >
              <div className="h-24 overflow-hidden bg-white/10">
                <img
                  src={`/gallery/${event.id}/albumphotos/1.png`}
                  alt={event.title}
                  className="
                    h-full w-full object-cover
                    transition duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="flex min-w-0 flex-col justify-center px-4 py-3">
                <p className="truncate text-sm font-medium text-white">
                  {event.title}
                </p>

                <p className="mt-1 truncate text-xs text-white/45">
                  {event.date}
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {lang === "en" ? "Preview" : "Урьдчилж харах"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}