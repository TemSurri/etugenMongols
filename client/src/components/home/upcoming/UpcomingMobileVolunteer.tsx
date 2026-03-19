"use client";

import type { NavigateFunction } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { OrganizedListing } from "../../../static_events";

type UpcomingMobileVolunteerProps = {
  Listings: OrganizedListing[];
  eventsLang: "en" | "mn";
  setEventsLang: React.Dispatch<React.SetStateAction<"en" | "mn">>;
  navigate: NavigateFunction;
  containerVariants: Variants;
  textVariants: Variants;
};

export default function UpcomingMobileVolunteer({
  Listings,
  eventsLang,
  setEventsLang,
  navigate,
  containerVariants,
  textVariants,
}: UpcomingMobileVolunteerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="md:hidden px-6 pb-20"
    >
      <div className="relative mb-6">
        <button
          onClick={() => setEventsLang(eventsLang === "en" ? "mn" : "en")}
          className="absolute right-0 -top-6 text-xs uppercase tracking-wide text-white/60 hover:text-white transition"
        >
          {eventsLang === "en" ? "Монгол" : "English"}
        </button>
      </div>

      <div className="mt-10 h-[120px] overflow-hidden">
        <motion.p variants={textVariants} className="text-white/75 text-sm">
          {eventsLang === "en"
            ? "We host two primary community events each year — a Christmas & New Year celebration in the winter time, followed by Naadam in the summer time."
            : "Этүгэн Монголчууд жил бүр үндсэн хоёр арга хэмжээ зохион байгуулдаг. Өвлийн улиралд Зул сар, Шинэ жилийн баяр, зуны улиралд Наадам болдог."}
        </motion.p>

        <motion.p variants={textVariants} className="mt-4 text-white/75 text-sm">
          {eventsLang === "en"
            ? "We often require help from the community for our events. See current volunteer opportunities below."
            : "Бид арга хэмжээнүүддээ олон нийтийн дэмжлэгийг тогтмол шаарддаг. Одоогийн сайн дурын ажлын боломжуудыг доороос үзнэ үү."}
        </motion.p>
      </div>

      <p className="mt-15 text-white/60 text-sm uppercase tracking-widest">
        Event volunteer listings
      </p>

      {Listings.length > 0 ? (
        <div className="mt-3 space-y-2">
          {Listings.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(`/events/${item.id}`)}
              className="
                w-full
                text-left
                text-sm
                text-white/70
                border border-white/25
                px-4 py-3
                hover:border-white
                hover:text-white
                transition
              "
            >
              {item.listing.title}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-white/60 text-sm">No help needed as of now.</p>
      )}
    </motion.div>
  );
}