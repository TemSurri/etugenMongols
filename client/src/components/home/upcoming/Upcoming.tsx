"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { cubicBezier, motion } from "framer-motion";
import type { Variants } from "framer-motion";

import heroBg from "../../../assets/landingpage.webp";
import logo from "../../../assets/logo.webp";

import type { EventItem, OrganizedListing } from "../../../static_events";
import type { GalleryItem } from "../../../static_gallery";

import About from "../About";
import UpcomingDesktopPanel from "./UpcomingDesktopPanel";
import UpcomingSectionHeader from "./UpcomingSectionHeader";
import UpcomingEventCards from "./UpcomingEventCards";
import UpcomingMobileVolunteer from "./UpcomingMobileVolunteer";
import UpcomingPastEventsBar from "./UpcomingPastEventsBar";

type Lang = "en" | "mn";
type PanelMode = "upcoming" | "past";

type UpcomingProps = {
  eventItems: EventItem[];
  Listings: OrganizedListing[];
  pastEvents: GalleryItem[];
  lang: Lang;
};

const noEventsVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
  hidden: { y: 18, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const panelMotion: Variants = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: {
      duration: 0.9,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export default function Upcoming({
  eventItems,
  Listings,
  pastEvents,
  lang,
}: UpcomingProps) {
  const navigate = useNavigate();

  const [eventsLang, setEventsLang] = useState<Lang>(lang);
  const [isDesktop, setIsDesktop] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedPastEvent, setSelectedPastEvent] =
    useState<GalleryItem | null>(null);
  const [panelMode, setPanelMode] = useState<PanelMode>("upcoming");

  const hasEvents = eventItems.length > 0;
  const hasPanelContent = hasEvents || pastEvents.length > 0;

  const ABOUT_TEXT = useMemo(() => {
    return lang === "en"
      ? "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that bring people together and keep our culture alive."
      : "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид Монголын нийгэмлэгийг нэгтгэх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.";
  }, [lang]);

  useEffect(() => {
    setEventsLang(lang);
  }, [lang]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const firstUpcoming = eventItems[0] ?? null;
    const firstPast = pastEvents[0] ?? null;

    if (firstUpcoming) {
      setSelectedEvent(firstUpcoming);
      setSelectedPastEvent(null);
      setPanelMode("upcoming");
      return;
    }

    if (firstPast) {
      setSelectedEvent(null);
      setSelectedPastEvent(firstPast);
      setPanelMode("past");
      return;
    }

    setSelectedEvent(null);
    setSelectedPastEvent(null);
    setPanelMode("upcoming");
  }, [eventItems, pastEvents]);

  const scrollToUpcomingTop = useCallback(() => {
    const el = document.getElementById("upcoming");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const scrollToGallery = useCallback(() => {
    const el = document.getElementById("gallery");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleSelectUpcomingEvent: Dispatch<
    SetStateAction<EventItem | null>
  > = useCallback((value) => {
    setSelectedEvent((currentEvent) => {
      const nextEvent =
        typeof value === "function" ? value(currentEvent) : value;

      setSelectedPastEvent(null);
      setPanelMode("upcoming");

      return nextEvent;
    });
  }, []);

  const handleSelectPastEvent = useCallback(
    (event: GalleryItem) => {
      setSelectedPastEvent(event);
      setSelectedEvent(null);
      setPanelMode("past");
      scrollToUpcomingTop();
    },
    [scrollToUpcomingTop]
  );

  return (
    <>
      <motion.section
        id="upcoming"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="relative min-h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/65 to-black/90" />

        <UpcomingDesktopPanel
          panelMotion={panelMotion}
          lang={lang}
          ABOUT_TEXT={ABOUT_TEXT}
          selectedEvent={selectedEvent}
          selectedPastEvent={selectedPastEvent}
          panelMode={panelMode}
          hasEvents={hasPanelContent}
          scrollToGallery={scrollToGallery}
          heroBg={heroBg}
          logo={logo}
        />

        <div
          className="
            relative z-10
            mx-auto min-h-screen max-w-7xl
            px-6 pt-20 pb-16
            md:pr-[340px]
            lg:pr-[400px]
            xl:pr-[460px]
          "
        >
          <UpcomingSectionHeader
            hasEvents={hasEvents}
            containerVariants={containerVariants}
            textVariants={textVariants}
          />

          <UpcomingEventCards
            hasEvents={hasEvents}
            eventItems={eventItems}
            selectedEvent={panelMode === "upcoming" ? selectedEvent : null}
            isDesktop={isDesktop}
            onSelectEvent={handleSelectUpcomingEvent}
            containerVariants={containerVariants}
            cardVariants={cardVariants}
            noEventsVariants={noEventsVariants}
            scrollToGallery={scrollToGallery}
          />

          <UpcomingPastEventsBar
            pastEvents={pastEvents}
            selectedPastEvent={selectedPastEvent}
            onSelectPastEvent={handleSelectPastEvent}
            lang={lang}
            containerVariants={containerVariants}
            cardVariants={cardVariants}
          />
        </div>
      </motion.section>

      <UpcomingMobileVolunteer
        Listings={Listings}
        eventsLang={eventsLang}
        setEventsLang={setEventsLang}
        navigate={navigate}
        containerVariants={containerVariants}
        textVariants={textVariants}
      />

      <div className="md:hidden">
        <About />
      </div>
    </>
  );
}