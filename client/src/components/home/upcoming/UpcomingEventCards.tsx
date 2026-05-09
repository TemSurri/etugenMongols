"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { EventItem } from "../../../static_events";
import { getEventCardDescription, getEventLink } from "../../../static_events";

type UpcomingEventCardsProps = {
  hasEvents: boolean;
  eventItems: EventItem[];
  selectedEvent: EventItem | null;
  isDesktop: boolean;
  onSelectEvent: (event: EventItem) => void;
  containerVariants: Variants;
  cardVariants: Variants;
  noEventsVariants: Variants;
  scrollToGallery: () => void;
};

export default function UpcomingEventCards({
  hasEvents,
  eventItems,
  selectedEvent,
  isDesktop,
  onSelectEvent,
  containerVariants,
  cardVariants,
  noEventsVariants,
  scrollToGallery,
}: UpcomingEventCardsProps) {
  const eventCount = eventItems.length;
  const shouldShowSelectionState = isDesktop && eventCount > 1;

  const gridClass =
    eventCount === 1
      ? "grid-cols-1 max-w-md sm:max-w-lg md:max-w-[420px] mx-auto"
      : eventCount === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-4xl"
        : eventCount <= 4
          ? "grid-cols-1 sm:grid-cols-2 max-w-4xl"
          : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 max-w-5xl";

  const cardPaddingClass =
    eventCount <= 2 ? "px-4 py-4 sm:px-5 sm:py-5" : "px-4 py-3.5";

  return (
    <motion.div
      variants={containerVariants}
      className={`
        grid
        ${gridClass}
        gap-4
        sm:gap-5
        lg:gap-6
        md:pt-8
        md:pb-8
      `}
    >
      {hasEvents ? (
        eventItems.map((item) => {
          const isSelected =
            shouldShowSelectionState && selectedEvent?.id === item.id;

          return (
            <motion.a
              key={item.id}
              href={getEventLink(item)}
              variants={cardVariants}
              onClick={(e) => {
                if (!isDesktop) return;

                e.preventDefault();
                onSelectEvent(item);
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="
                group
                block
                h-full
                w-full
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/70
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
              "
            >
              <article
                className={`
                  flex
                  h-full
                  w-full
                  flex-col
                  overflow-hidden
                  border
                  bg-black/40
                  shadow-[0_18px_46px_rgba(0,0,0,0.4)]
                  transition-colors
                  duration-200
                  ${
                    isSelected
                      ? "border-white/90 ring-1 ring-white/70 bg-black/55"
                      : "border-white/20 md:group-hover:border-white/45"
                  }
                `}
              >
                <div
                  className="
                    relative
                    w-full
                    aspect-[16/9]
                    overflow-hidden
                    bg-black/20
                  "
                >
                  <img
                    src={`/upcoming_event_assets/${item.image}`}
                    alt={item.title}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </div>

                <div
                  className={`
                    flex
                    flex-1
                    flex-col
                    ${cardPaddingClass}
                  `}
                >
                  <h4
                    className="
                      text-sm
                      font-semibold
                      leading-snug
                      text-white
                      sm:text-base
                    "
                  >
                    {item.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      line-clamp-2
                      text-sm
                      leading-relaxed
                      text-white/65
                    "
                  >
                    {getEventCardDescription(item)}
                  </p>

                  {shouldShowSelectionState && (
                    <p
                      className={`
                        mt-3
                        text-[11px]
                        uppercase
                        tracking-widest
                        transition-colors
                        duration-200
                        ${isSelected ? "text-white/75" : "text-white/40"}
                      `}
                    >
                      {isSelected ? "Showing details" : "Show details"}
                    </p>
                  )}
                </div>
              </article>
            </motion.a>
          );
        })
      ) : (
        <motion.div
          variants={noEventsVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="
            flex
            min-h-[100px]
            items-center
            sm:col-span-2
          "
        >
          <div className="w-full max-w-md">
            <p className="text-sm text-white/80">
              No upcoming events are planned at the moment.
            </p>

            <p className="mt-3 text-sm text-white/60">
              We regularly host cultural celebrations and community gatherings.
              In the meantime, take a look at highlights from our most recent
              event.
            </p>

            <div className="mt-4 h-px w-12 bg-white/30" />

            <p className="mt-4 text-sm text-white/80">
              Look at our latest event
            </p>

            <div
              className="
                mt-4
                aspect-video
                w-full
                overflow-hidden
                border
                border-white/25
                bg-black/30
              "
            >
              <iframe
                loading="lazy"
                className="h-full w-full"
                src="https://www.youtube.com/embed/9bZkp7q19f0"
                title="Latest Event Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <button
              onClick={scrollToGallery}
              className="
                mt-5
                inline-flex
                border
                border-white/40
                px-6
                py-3
                text-xs
                font-semibold
                uppercase
                tracking-widest
                text-white
                transition
                hover:border-white
              "
            >
              View Event Gallery
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}