"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type UpcomingSectionHeaderProps = {
  hasEvents: boolean;
  containerVariants: Variants;
  textVariants: Variants;
};

export default function UpcomingSectionHeader({
  hasEvents,
  containerVariants,
  textVariants,
}: UpcomingSectionHeaderProps) {
  return (
    <>
      <motion.div variants={containerVariants} className="mb-16 md:mb-12">
        <motion.h3
          variants={textVariants}
          className="text-white text-3xl md:text-4xl font-semibold tracking-wide"
        >
          Upcoming Events
        </motion.h3>

        {hasEvents && (
          <>
            <motion.p
              variants={textVariants}
              className="mt-3 text-white/80 max-w-lg"
            >
              Click on the events to see more details
            </motion.p>
            <motion.p
              variants={textVariants}
              className="mt-1 text-white/60 text-sm"
            >
              Арга хэмжээн дээр дарж дэлгэрэнгүй мэдээлэл үзнэ үү
            </motion.p>
          </>
        )}
      </motion.div>

      <motion.div variants={textVariants} className="mb-6">
        {hasEvents ? (
          <h4 className="text-white text-sm tracking-[0.3em] uppercase">
            Events
          </h4>
        ) : (
          <h4 className="hidden md:block text-white text-sm tracking-[0.3em] uppercase">
            No events planned
          </h4>
        )}
      </motion.div>
    </>
  );
}