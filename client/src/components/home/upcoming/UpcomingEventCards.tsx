"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { getCardInfos } from "../../../static_events";

type UpcomingEventCardsProps = {
  hasEvents: boolean;
  displayItems: ReturnType<typeof getCardInfos>;
  containerVariants: Variants;
  cardVariants: Variants;
  noEventsVariants: Variants;
  scrollToGallery: () => void;
};

export default function UpcomingEventCards({
  hasEvents,
  displayItems,
  containerVariants,
  cardVariants,
  noEventsVariants,
  scrollToGallery,
}: UpcomingEventCardsProps) {
  return (
    <motion.div
      variants={containerVariants}
      className="
        flex flex-col gap-12
        md:flex-row md:gap-14
        md:px-10 lg:px-20 xl:px-32
        md:pt-10 md:pb-24
        md:overflow-x-auto md:overflow-y-visible
        md:snap-x md:snap-proximity
        md:[scroll-padding-left:2.5rem] md:[scroll-padding-right:2.5rem]
        lg:[scroll-padding-left:5rem] lg:[scroll-padding-right:5rem]
        md:scrollbar-none
      "
    >
      {hasEvents ? (
        displayItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            variants={cardVariants}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-full md:w-auto md:shrink-0 md:snap-start"
          >
            <div className="group w-full max-w-[400px] md:min-w-[400px] lg:min-w-[340px] bg-black/40 border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`/upcoming_event_assets/${item.img}`}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-4">
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm text-white/65">{item.desc}</p>
              </div>
            </div>
          </motion.a>
        ))
      ) : (
        <motion.div
          variants={noEventsVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="min-h-[100px] md:min-h-[100px] flex items-center"
        >
          <div className="max-w-md w-full">
            <p className="text-white/80 text-sm">
              No upcoming events are planned at the moment.
            </p>

            <p className="mt-3 text-white/60 text-sm">
              We regularly host cultural celebrations and community gatherings.
              In the meantime, take a look at highlights from our most recent event.
            </p>

            <div className="mt-4 h-px w-12 bg-white/30" />

            <p className="mt-4 text-white/80 text-sm">Look at our latest event</p>

            <div className="mt-4 aspect-video w-full overflow-hidden border border-white/25">
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
                inline-flex mt-5
                px-6 py-3
                text-xs font-semibold uppercase tracking-widest
                text-white
                border border-white/40
                hover:border-white
                transition
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