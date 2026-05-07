"use client";

import { useMemo, useState } from "react";
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

  const enabledActions = useMemo(
    () => event.actions.filter((action) => action.enabled),
    [event.actions]
  );

  return (
    <article className="relative min-h-screen overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${landingImage})` }}
      />

      <div aria-hidden="true" className="absolute inset-0 bg-black/80" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.20),rgba(0,0,0,0.62))]"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-4 sm:px-6 sm:py-6"
      >
        <div className="mb-4">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
          >
            ← Back to home
          </Link>
        </div>

        <main className="space-y-4 pb-8">
          <EventHeader
            title={event.title}
            date={event.details.date}
            time={event.details.time}
            location={event.details.location}
            actions={enabledActions}
            lang={lang}
          />

          <EventQuickInfo
            date={event.details.date}
            time={event.details.time}
            location={event.details.location}
            contactEmail={event.contact?.email}
            contactPhone={event.contact?.phone}
          />

          <EventDescription
            lang={lang}
            description={event.details.description}
            descriptionEn={event.details.description_en}
            onToggleLang={() =>
              setLang((prev) => (prev === "mn" ? "en" : "mn"))
            }
          />

          <EventTicketInfo
            lang={lang}
            descriptionTicket={event.details.ticketInfo}
            descriptionTicketEn={event.details.ticketInfo_en}
          />

          {event.whoWeWant.length > 0 && (
            <EventVolunteerRoles lang={lang} whoWeWant={event.whoWeWant} />
          )}
        </main>
      </motion.div>
    </article>
  );
}