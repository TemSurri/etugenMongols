"use client";

import { useEffect, useState } from "react";
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
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
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
  const [eventsLang, setEventsLang] = useState<Lang>(lang);
  const [isDesktop, setIsDesktop] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedPastEvent, setSelectedPastEvent] =
    useState<GalleryItem | null>(null);
  const [panelMode, setPanelMode] = useState<PanelMode>("upcoming");

  const navigate = useNavigate();
  const hasEvents = eventItems.length > 0;

  useEffect(() => {
    setEventsLang(lang);
  }, [lang]);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 768);
      }
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const firstUpcoming = eventItems[0] ?? null;
    const firstPast = pastEvents[0] ?? null;

    setSelectedEvent(firstUpcoming);
    setSelectedPastEvent(null);

    if (firstUpcoming) {
      setPanelMode("upcoming");
    } else if (firstPast) {
      setSelectedPastEvent(firstPast);
      setPanelMode("past");
    }
  }, [eventItems, pastEvents]);

  const handleSelectUpcomingEvent: Dispatch<
    SetStateAction<EventItem | null>
  > = (value) => {
    const nextEvent = typeof value === "function" ? value(selectedEvent) : value;

    setSelectedEvent(nextEvent);
    setSelectedPastEvent(null);
    setPanelMode("upcoming");
  };

  const handleSelectPastEvent = (event: GalleryItem) => {
    setSelectedPastEvent(event);
    setSelectedEvent(null);
    setPanelMode("past");

    const el = document.getElementById("upcoming");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const ABOUT_TEXT =
    lang === "en"
      ? "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that bring people together and keep our culture alive."
      : "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид Монголын нийгэмлэгийг нэгтгэх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.";

  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <motion.section
        id="upcoming"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="relative overflow-hidden bg-cover bg-center"
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
          hasEvents={hasEvents || pastEvents.length > 0}
          scrollToGallery={scrollToGallery}
          heroBg={heroBg}
          logo={logo}
        />

        <div
          className="
            relative z-10
            max-w-7xl mx-auto
            px-6 py-28
            md:pr-[360px]
            lg:pr-[420px]
            xl:pr-[480px]
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