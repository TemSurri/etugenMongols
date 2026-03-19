"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { EventItem } from "../../static_events";
import landingImage from "../../assets/landingpage.webp";

import EventHeader from "./EventHeader";
import EventDescription from "./EventDescription";
import EventQuickInfo from "./EventQuickInfo";
import EventTicketInfo from "./EventTicketInfo";
import EventVolunteerRoles from "./EventVolunteerRoles";

type EventViewProps = {
  event: EventItem;
};

export default function EventView({ event }: EventViewProps) {
  const [lang, setLang] = useState<"mn" | "en">("mn");

  return (
    <article className="relative min-h-screen">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${landingImage})` }}
      />

      <div className="absolute inset-0 bg-black/78" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10),rgba(0,0,0,0.38))]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-4"
      >
        <div className="mb-3">
          <Link
            to="/"
            className="inline-block text-[10px] uppercase tracking-[0.22em] text-white/68 transition hover:text-white"
          >
            ← Back to home
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-12 lg:gap-4">
          <EventHeader
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            onlinePay={event.onlinePay}
            donate={event.donate}
          />

          <EventDescription
            lang={lang}
            description={event.description}
            descriptionEn={event.description_en}
            onToggleLang={() =>
              setLang((prev) => (prev === "mn" ? "en" : "mn"))
            }
          />

          <EventQuickInfo
            date={event.date}
            time={event.time}
            location={event.location}
            contactEmail={event.contactEmail}
            contactPhone={event.contactPhone}
          />

          <EventTicketInfo
            lang={lang}
            descriptionTicket={event.description_ticket}
            descriptionTicketEn={event.description_ticket_en}
          />

          <EventVolunteerRoles whoWeWant={event.whoWeWant} />
        </div>
      </motion.div>
    </article>
  );
}