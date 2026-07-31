import { memo } from "react";
import { motion } from "framer-motion";
import { sectionMotion } from "../animations";
import { getEventGridClass } from "../helpers";
import type { EventsCopy, UpcomingEventItem } from "../types";
import UpcomingEventCard from "./UpcomingEventCard";

type Props = { events: UpcomingEventItem[]; copy: EventsCopy };

function UpcomingEventsSection({ events, copy }: Props) {
  return (
    <motion.section
      variants={sectionMotion}
      aria-labelledby="upcoming-events-title"
      className="order-1 flex min-h-[560px] bg-[#fffaf0] px-6 pb-14 pt-38 text-[#303824] sm:px-8 sm:pb-16 sm:pt-36 md:px-10 lg:h-full lg:min-h-0 lg:items-center lg:px-14 lg:pb-12 lg:pt-24 xl:px-20"
    >
      <div className="mx-auto w-full max-w-[680px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a7a45]">{copy.eyebrow}</p>
        <h1 id="upcoming-events-title" className="mt-3 text-3xl font-normal leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">{copy.title}</h1>
        {events.length > 0 ? (
          <div className={`mt-8 ${getEventGridClass(events.length)}`}>
            {events.map((event, index) => <UpcomingEventCard key={event.id} event={event} copy={copy} index={index} />)}
          </div>
        ) : (
          <p aria-live="polite" className="mt-8 max-w-lg text-[15px] leading-7 text-[#59604d]">{copy.noEvents}</p>
        )}
      </div>
    </motion.section>
  );
}

export default memo(UpcomingEventsSection);
