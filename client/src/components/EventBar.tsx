"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import heroBg from "../assets/landingpage.webp";
import { events, getCardInfos } from "../static_events";

const eventItems = getCardInfos(events);
const hasEvents = eventItems.length > 0;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const textVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Upcoming() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      id="upcoming"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/65 to-black/90" />
      <div className="absolute top-0 left-0 w-full h-0.5 bg-white" />
      <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">

        <motion.div variants={containerVariants} className="mb-12">
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
          <h4 className="text-white text-sm tracking-[0.3em] uppercase">
            {hasEvents ? "Events" : "No events planned"}
          </h4>
        </motion.div>

        {hasEvents && (
          <motion.div
            variants={containerVariants}
            className="
              flex flex-col gap-12
              md:flex-row md:gap-14
              md:px-10 lg:px-20 xl:px-32
              md:pt-10 md:pb-24
              md:overflow-x-auto md:overflow-y-visible
              md:snap-x md:snap-mandatory
              md:scrollbar-none
            "
          >
            {eventItems.map((item, i) => {
              const isDimmed =
                hoveredIndex !== null && hoveredIndex !== i;

              return (
                <motion.a
                  key={i}
                  href={item.link}
                  variants={cardVariants}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="w-full md:w-auto md:shrink-0 md:snap-start"
                >
                  <div
                    className={`
                      group w-full
                      md:min-w-[300px] lg:min-w-[340px]
                      bg-black/40 border transition-all duration-500
                      ${
                        isDimmed
                          ? "opacity-60 border-white/10"
                          : "opacity-100 border-white/25"
                      }
                      hover:border-white/40
                      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                    `}
                  >
                    <div className="relative h-56 sm:h-64 md:h-52 overflow-hidden">
                      <img
                        src={`/event_assets/${item.img}`}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <div className="px-5 py-4">
                      <h4 className="text-sm font-semibold tracking-wide text-white">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm text-white/65">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}
