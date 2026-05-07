"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { EventAction, EventItem } from "../../../static_events";
import type { GalleryItem } from "../../../static_gallery";

type Lang = "en" | "mn";
type PanelMode = "upcoming" | "past";

type UpcomingDesktopPanelProps = {
  panelMotion: Variants;
  lang: Lang;
  ABOUT_TEXT: string;
  selectedEvent: EventItem | null;
  selectedPastEvent: GalleryItem | null;
  panelMode: PanelMode;
  hasEvents: boolean;
  scrollToGallery: () => void;
  heroBg: string;
  logo: string;
};

export default function UpcomingDesktopPanel({
  panelMotion,
  lang,
  ABOUT_TEXT,
  selectedEvent,
  selectedPastEvent,
  panelMode,
  hasEvents,
  heroBg,
  logo,
}: UpcomingDesktopPanelProps) {
  const eventDescription = useMemo(() => {
    if (!selectedEvent) return "";

    return lang === "en"
      ? selectedEvent.details.description_en
      : selectedEvent.details.description;
  }, [lang, selectedEvent]);

  const shortDescription = useMemo(
    () => getFirstParagraph(eventDescription),
    [eventDescription]
  );

  const ticketInfo = useMemo(() => {
    if (!selectedEvent) return "";

    return lang === "en"
      ? selectedEvent.details.ticketInfo_en ?? ""
      : selectedEvent.details.ticketInfo ?? "";
  }, [lang, selectedEvent]);

  const enabledActions = useMemo(() => {
    return selectedEvent?.actions.filter((action) => action.enabled) ?? [];
  }, [selectedEvent]);

  const mapsHref = useMemo(() => {
    if (!selectedEvent?.details.location) return "";

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      selectedEvent.details.location
    )}`;
  }, [selectedEvent]);

  return (
    <motion.aside
      variants={panelMotion}
      initial="hidden"
      animate="show"
      className="
        hidden md:block
        absolute inset-y-0 right-0
        w-[35%]
        bg-neutral-100
        pointer-events-none
        z-20
      "
    >
      <div
        className="
          h-full
          pointer-events-auto
          overflow-y-auto
          px-6 lg:px-8 xl:px-10
          py-8 lg:py-10 xl:py-12
        "
      >
        <div className="relative mx-auto max-w-[410px]">
          <img src={logo} alt="" className="mb-7 w-20 opacity-90" />

          <AnimatePresence mode="wait">
            {panelMode === "past" && selectedPastEvent ? (
              <PastEventPanel
                key={selectedPastEvent.id}
                event={selectedPastEvent}
                lang={lang}
              />
            ) : hasEvents && selectedEvent ? (
              <UpcomingEventPanel
                key={selectedEvent.id}
                event={selectedEvent}
                lang={lang}
                shortDescription={shortDescription}
                ticketInfo={ticketInfo}
                enabledActions={enabledActions}
                mapsHref={mapsHref}
              />
            ) : (
              <AboutPanel
                key="about"
                lang={lang}
                ABOUT_TEXT={ABOUT_TEXT}
                heroBg={heroBg}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}

type UpcomingEventPanelProps = {
  event: EventItem;
  lang: Lang;
  shortDescription: string;
  ticketInfo: string;
  enabledActions: EventAction[];
  mapsHref: string;
};

function UpcomingEventPanel({
  event,
  lang,
  shortDescription,
  ticketInfo,
  enabledActions,
  mapsHref,
}: UpcomingEventPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-5 pb-8"
    >
      <header className="min-h-[96px]">
        <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">
          {lang === "en" ? "Event Details" : "Арга хэмжээний мэдээлэл"}
        </p>

        <DiamondDivider />

        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-black">
          {event.title}
        </h3>
      </header>

      {shortDescription && (
        <div className="min-h-[58px] border-l-2 border-black/25 pl-4">
          <p className="text-sm leading-6 text-black/70">{shortDescription}</p>
        </div>
      )}

      <section className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <InfoCard
            label={lang === "en" ? "Date" : "Огноо"}
            value={event.details.date}
          />

          <InfoCard
            label={lang === "en" ? "Time" : "Цаг"}
            value={event.details.time}
          />
        </div>

        {event.details.location && (
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="
              block
              min-h-[88px]
              border border-black/10
              bg-white/45
              px-4 py-3
              transition
              hover:border-black/25
              hover:bg-white/70
            "
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-black/40">
              {lang === "en" ? "Location" : "Байршил"}
            </p>

            <p className="mt-1 text-sm font-medium leading-snug text-black/75">
              {event.details.location}
            </p>

            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-black/45">
              {lang === "en" ? "View on Google Maps" : "Google Maps дээр харах"}
            </p>
          </a>
        )}
      </section>

      {enabledActions.length > 0 && (
        <section>
          <div className="grid gap-2">
            {enabledActions.map((action) => (
              <ActionButton key={action.type} action={action} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {ticketInfo && (
        <section
          className="
            min-h-[155px]
            border border-black/10
            bg-white/45
            px-4 py-3.5
          "
        >
          <SectionHeading>
            {lang === "en" ? "Extra Info" : "Нэмэлт мэдээлэл"}
          </SectionHeading>

          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-black/70">
            {ticketInfo}
          </p>
        </section>
      )}
    </motion.div>
  );
}

type PastEventPanelProps = {
  event: GalleryItem;
  lang: Lang;
};

function PastEventPanel({ event, lang }: PastEventPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-5 pb-8"
    >
      <header>
        <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">
          {lang === "en" ? "Past Event" : "Өнгөрсөн арга хэмжээ"}
        </p>

        <DiamondDivider />

        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-black">
          {event.title}
        </h3>
      </header>

      <div className="overflow-hidden border border-black/10 bg-white/45">
        <img
          src={`/gallery/${event.id}/albumphotos/1.png`}
          alt={event.title}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      {event.videoUrl && (
        <div className="relative aspect-video overflow-hidden border border-black/10 bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            src={event.videoUrl}
            title={`${event.title} event video`}
            allowFullScreen
          />
        </div>
      )}

      <div className="border-l-2 border-black/25 pl-4">
        <p className="text-sm leading-6 text-black/70">{event.description}</p>
      </div>

      {event.activities.length > 0 && (
        <section
          className="
            max-h-32
            overflow-y-auto
            border border-black/10
            bg-white/45
            px-4 py-3
          "
        >
          <SectionHeading>
            {lang === "en" ? "Activities" : "Үйл ажиллагаа"}
          </SectionHeading>

          <div className="mt-3 space-y-1.5">
            {event.activities.map((activity, index) => (
              <p
                key={`${activity}-${index}`}
                className="text-sm leading-5 text-black/65"
              >
                {activity}
              </p>
            ))}
          </div>
        </section>
      )}

      <a
        href={`/gallery/${event.id}`}
        className="
          block
          w-full
          border border-black/15
          bg-black
          px-4 py-3
          text-left
          text-xs font-medium
          uppercase tracking-[0.18em]
          text-white
          transition
          hover:bg-black/80
        "
      >
        {lang === "en" ? "View Gallery" : "Зургийн цомог үзэх"}
      </a>
    </motion.div>
  );
}

type AboutPanelProps = {
  lang: Lang;
  ABOUT_TEXT: string;
  heroBg: string;
};

function AboutPanel({ lang, ABOUT_TEXT, heroBg }: AboutPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="pb-8"
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">
        {lang === "en" ? "About Us" : "Бидний тухай"}
      </p>

      <DiamondDivider />

      <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-black">
        Etugen Mongols
      </h3>

      <div className="mt-5 min-h-[104px] border-l-2 border-black/25 pl-4">
        <p className="text-sm leading-6 text-black/70">{ABOUT_TEXT}</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="h-28 overflow-hidden bg-black/10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="h-28 overflow-hidden bg-black/10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="col-span-2 h-36 overflow-hidden bg-black/10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}

function DiamondDivider() {
  return (
    <div className="mt-3 flex items-center gap-3">
      <div className="h-px flex-1 bg-black/12" />
      <div className="h-1.5 w-1.5 rotate-45 bg-black/35" />
      <div className="h-px flex-1 bg-black/12" />
    </div>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
};

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="min-h-[68px] border border-black/10 bg-white/45 px-4 py-2.5">
      <p className="text-[10px] uppercase tracking-[0.22em] text-black/40">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium leading-snug text-black/75">
        {value}
      </p>
    </div>
  );
}

type ActionButtonProps = {
  action: EventAction;
  lang: Lang;
};

function ActionButton({ action, lang }: ActionButtonProps) {
  const label = lang === "en" ? action.label : action.label_mn;

  const priceText =
    action.type === "payment" && action.price ? ` · $${action.price}` : "";

  return (
    <button
      type="button"
      className="
        w-full
        min-h-[44px]
        border border-black/15
        bg-black
        px-4 py-2.5
        text-left
        text-xs font-medium
        uppercase tracking-[0.18em]
        text-white
        transition
        hover:bg-black/80
      "
    >
      {label}
      {priceText}
    </button>
  );
}

type SectionHeadingProps = {
  children: React.ReactNode;
};

function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h4 className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">
      {children}
    </h4>
  );
}

function getFirstParagraph(text?: string) {
  if (!text) return "";

  return (
    text
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0) ?? ""
  );
}