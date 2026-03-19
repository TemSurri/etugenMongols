"use client";

import type { NavigateFunction } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { OrganizedListing } from "../../../static_events";

type UpcomingVolunteerBlockProps = {
  Listings: OrganizedListing[];
  eventsLang: "en" | "mn";
  setEventsLang: React.Dispatch<React.SetStateAction<"en" | "mn">>;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  navigate: NavigateFunction;
  containerVariants: Variants;
  textVariants: Variants;
  logo: string;
};

export default function UpcomingVolunteerBlock({
  Listings,
  eventsLang,
  setEventsLang,
  hoveredIndex,
  setHoveredIndex,
  navigate,
  containerVariants,
  textVariants,
  logo,
}: UpcomingVolunteerBlockProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="hidden md:block mt-6 max-w-lg"
    >
      <div className="relative max-w-lg">
        <button
          onClick={() => setEventsLang(eventsLang === "en" ? "mn" : "en")}
          className="absolute right-0 -top-6 text-xs uppercase tracking-wide text-white/60 hover:text-white transition"
        >
          {eventsLang === "en" ? "Монгол" : "English"}
        </button>

        <div className="h-[120px]">
          <motion.p variants={textVariants} className="text-white/75 text-sm">
            {eventsLang === "en"
              ? "We host two primary community events each year — a Christmas & New Year celebration in the winter time, followed by Naadam in the summer time. Be sure to stay tuned with our socials."
              : "Этүгэн Монголчууд жил бүр үндсэн хоёр арга хэмжээ зохион байгуулдаг. Өвлийн улиралд Зул сар, Шинэ жилийн баяр, зуны улиралд Наадам болдог."}
          </motion.p>

          <motion.p variants={textVariants} className="mt-4 text-white/75 text-sm">
            {eventsLang === "en"
              ? "We often require help from the community for our events. See current volunteer opportunities below."
              : "Бид арга хэмжээнүүддээ олон нийтийн дэмжлэгийг тогтмол шаарддаг. Одоогийн сайн дурын ажлын боломжуудыг доороос үзнэ үү."}
          </motion.p>
        </div>
      </div>

      <p className="mt-15 text-white/60 text-sm uppercase tracking-widest">
        Event volunteer listings
      </p>

      {Listings.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            mt-3
            max-h-50
            overflow-y-auto
            pr-2
            space-y-2
            scrollbar-thin
            scrollbar-thumb-white/30
            scrollbar-track-transparent
          "
        >
          {Listings.map((item, i) => (
            <button
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(`/events/${item.id}`)}
              className="
                relative
                w-full
                text-left
                text-sm
                text-white/70
                border border-white/25
                px-3 py-2
                hover:border-white
                hover:text-white
                transition
              "
            >
              <span className="block truncate">{item.listing.title}</span>
              <span
                className={`
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  max-w-[55%]
                  text-xs
                  text-white/60
                  text-right
                  truncate
                  transition-opacity
                  duration-200
                  ${hoveredIndex === i ? "opacity-100" : "opacity-0"}
                `}
              >
                {item.listing.title_mn}
              </span>
            </button>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            mt-3
            max-h-50
            h-50
            flex
            flex-col
            items-center
            justify-center
            gap-3
            text-center
          "
        >
          <img src={logo} alt="" className="w-12 opacity-20" />

          <p className="text-white/60 text-sm">No help needed as of now.</p>
        </motion.div>
      )}
    </motion.div>
  );
}