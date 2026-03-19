"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, cubicBezier } from "framer-motion";
import type { Variants } from "framer-motion";
import heroBg from "../../../assets/landingpage.webp";
import logo from "../../../assets/logo.webp";
import { getCardInfos } from "../../../static_events";
import type { OrganizedListing } from "../../../static_events";
import About from "../About";

import UpcomingDesktopPanel from "./UpcomingDesktopPanel";
import UpcomingSectionHeader from "./UpcomingSectionHeader";
import UpcomingEventCards from "./UpcomingEventCards";
import UpcomingVolunteerBlock from "./UpcomingVolunteerBlock";
import UpcomingMobileVolunteer from "./UpcomingMobileVolunteer";

// data
type UpcomingProps = {
  eventItems: ReturnType<typeof getCardInfos>;
  Listings: OrganizedListing[];
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

export default function Upcoming({ eventItems, Listings }: UpcomingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<"en" | "mn">("mn");
  const [eventsLang, setEventsLang] = useState<"en" | "mn">("mn");
  const [isDesktop, setIsDesktop] = useState(false);

  const navigate = useNavigate();
  const hasEvents = eventItems.length > 0;

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

  const displayItems =
    isDesktop && eventItems.length > 1 ? [...eventItems] : eventItems;

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
        viewport={{ once: false, amount: 0.3 }}
        className="relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/65 to-black/90" />

        <UpcomingDesktopPanel
          panelMotion={panelMotion}
          lang={lang}
          setLang={setLang}
          ABOUT_TEXT={ABOUT_TEXT}
          scrollToGallery={scrollToGallery}
          heroBg={heroBg}
          logo={logo}
        />

        <div
          className="
            relative z-10
            max-w-7xl mx-auto
            px-6 py-28
            md:pr-[40%]
          "
        >
          <UpcomingSectionHeader
            hasEvents={hasEvents}
            containerVariants={containerVariants}
            textVariants={textVariants}
          />

          <UpcomingEventCards
            hasEvents={hasEvents}
            displayItems={displayItems}
            containerVariants={containerVariants}
            cardVariants={cardVariants}
            noEventsVariants={noEventsVariants}
            scrollToGallery={scrollToGallery}
          />

          <UpcomingVolunteerBlock
            Listings={Listings}
            eventsLang={eventsLang}
            setEventsLang={setEventsLang}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            navigate={navigate}
            containerVariants={containerVariants}
            textVariants={textVariants}
            logo={logo}
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