"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { pageMotion } from "./animations";
import CommunityImage from "./components/CommunityImage";
import EventInformation from "./components/EventInformation";
import PastEventsSlideshow from "./components/PastEventsSlideshow";
import UpcomingEventsSection from "./components/UpcomingEventsSection";
import { useEvents } from "./hooks/useEvents";
import type { EventsMainProps } from "./types";

function EventsMain({ lang }: EventsMainProps) {
  const { copy, upcomingEvents, slideshowImages } = useEvents(lang);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#303824] pt-15 lg:pt-20">
      <motion.div variants={pageMotion} initial="hidden" animate="show" className="grid min-h-screen lg:grid-cols-2 lg:grid-rows-[clamp(640px,76vh,760px)_auto]">
        <UpcomingEventsSection events={upcomingEvents} copy={copy} />
        <PastEventsSlideshow images={slideshowImages} copy={copy} />
        <CommunityImage />
        <EventInformation copy={copy} />
      </motion.div>
    </main>
  );
}

export default memo(EventsMain);
