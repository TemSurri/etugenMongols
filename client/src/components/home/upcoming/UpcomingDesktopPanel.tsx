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

  const enabledActions = useMemo(() => {
    return selectedEvent?.actions.filter((action) => action.enabled) ?? [];
  }, [selectedEvent]);

  const mapsHref = useMemo(() => {
    const location = selectedEvent?.details.location;
    if (!location) return "";

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
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
          px-6 lg:px-7 xl:px-8
          pt-14 pb-6
          lg:pt-16 lg:pb-8
          xl:pt-20 xl:pb-10
        "
      >
        <div className="relative mx-auto max-w-[390px]">
          <PanelShellHeader
            logo={logo}
            title={
              lang === "en"
                ? "Event Information"
                : "Арга хэмжээний мэдээлэл"
            }
          />

          <div
            className="
              border border-black/10
              bg-white/35
              px-3.5 py-3.5
              shadow-[0_10px_26px_rgba(0,0,0,0.03)]
            "
          >
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
                  enabledActions={enabledActions}
                  mapsHref={mapsHref}
                />
              ) : (
                <AboutPanel
                  key="about"
                  ABOUT_TEXT={ABOUT_TEXT}
                  heroBg={heroBg}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

type PanelShellHeaderProps = {
  logo: string;
  title: string;
};

function PanelShellHeader({ logo, title }: PanelShellHeaderProps) {
  return (
    <div className="mb-5">
      <img src={logo} alt="" className="w-16 opacity-90" />

      <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-black/45">
        {title}
      </p>

      <div className="mt-3 h-px w-full bg-black/12" />
    </div>
  );
}

type UpcomingEventPanelProps = {
  event: EventItem;
  lang: Lang;
  shortDescription: string;
  enabledActions: EventAction[];
  mapsHref: string;
};

function UpcomingEventPanel({
  event,
  lang,
  shortDescription,
  enabledActions,
  mapsHref,
}: UpcomingEventPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-3.5"
    >
      <PanelTitle title={event.title} />

      {shortDescription && <BodyText>{shortDescription}</BodyText>}

      <EventMetaGrid event={event} lang={lang} mapsHref={mapsHref} />

      {enabledActions.length > 0 && (
        <section className="grid gap-2">
          {enabledActions.map((action) => (
            <ActionButton key={action.type} action={action} lang={lang} />
          ))}
        </section>
      )}

      <FullPageLink eventId={event.id} lang={lang} />
    </motion.div>
  );
}

type EventMetaGridProps = {
  event: EventItem;
  lang: Lang;
  mapsHref: string;
};

function EventMetaGrid({ event, lang, mapsHref }: EventMetaGridProps) {
  return (
    <section className="grid gap-2">
      <div className="grid grid-cols-2 gap-2">
        <InfoTile
          label={lang === "en" ? "Date" : "Огноо"}
          value={event.details.date}
        />

        <InfoTile
          label={lang === "en" ? "Time" : "Цаг"}
          value={event.details.time}
        />
      </div>

      {event.details.location && (
        <a
          href={mapsHref}
          target="_blank"
          rel="noreferrer"
          className="group block"
        >
          <InfoTile
            label={lang === "en" ? "Location" : "Байршил"}
            value={event.details.location}
            hint={
              lang === "en" ? "View on Google Maps" : "Google Maps дээр харах"
            }
            isLink
          />
        </a>
      )}
    </section>
  );
}

type FullPageLinkProps = {
  eventId: string;
  lang: Lang;
};

function FullPageLink({ eventId, lang }: FullPageLinkProps) {
  return (
    <a
      href={`/events/${eventId}`}
      className="
        inline-flex
        w-fit
        text-[11px]
        font-medium
        uppercase
        tracking-[0.16em]
        text-black/50
        underline-offset-4
        transition
        hover:text-blue-600
        hover:underline
      "
    >
      {lang === "en" ? "Open full event page" : "Арга хэмжээний хуудсыг нээх"}
    </a>
  );
}

type PastEventPanelProps = {
  event: GalleryItem;
  lang: Lang;
};

function PastEventPanel({ event, lang }: PastEventPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-3.5"
    >
      <PanelTitle title={event.title} />

      <section className="grid gap-2">
        <div className="grid grid-cols-2 gap-2">
          <InfoTile
            label={lang === "en" ? "Date" : "Огноо"}
            value={event.date}
          />

          {event.location && (
            <InfoTile
              label={lang === "en" ? "Location" : "Байршил"}
              value={event.location}
            />
          )}
        </div>
      </section>

      {event.videoUrl && (
        <section>
          <SectionHeading>
            {lang === "en" ? "Event Video" : "Арга хэмжээний бичлэг"}
          </SectionHeading>

          <div className="relative mt-2 aspect-video overflow-hidden border border-black/10 bg-black shadow-sm">
            <iframe
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              src={event.videoUrl}
              title={`${event.title} event video`}
              allowFullScreen
            />
          </div>
        </section>
      )}

      {event.description && (
        <section>
          <SectionHeading>
            {lang === "en" ? "Summary" : "Товч мэдээлэл"}
          </SectionHeading>

          <div className="mt-2">
            <BodyText>{event.description}</BodyText>
          </div>
        </section>
      )}

      {event.activities.length > 0 && (
        <section>
          <SectionHeading>
            {lang === "en" ? "Highlights" : "Онцлох зүйлс"}
          </SectionHeading>

          <div className="mt-2 grid gap-1.5">
            {event.activities.slice(0, 5).map((activity, index) => (
              <div
                key={`${activity}-${index}`}
                className="flex gap-2 text-sm leading-5 text-black/65"
              >
                <span className="mt-[8px] h-1 w-1 shrink-0 bg-black/35" />
                <p>{activity}</p>
              </div>
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
          px-4 py-2.5
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
  ABOUT_TEXT: string;
  heroBg: string;
};

function AboutPanel({ ABOUT_TEXT, heroBg }: AboutPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <PanelTitle title="Etugen Mongols" />

      <div className="mt-4">
        <BodyText>{ABOUT_TEXT}</BodyText>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <div className="h-24 overflow-hidden bg-black/10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="h-24 overflow-hidden bg-black/10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="col-span-2 h-32 overflow-hidden bg-black/10">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}

type PanelTitleProps = {
  title: string;
};

function PanelTitle({ title }: PanelTitleProps) {
  return (
    <h3 className="text-[1.45rem] font-semibold leading-tight tracking-[-0.025em] text-black">
      {title}
    </h3>
  );
}

type BodyTextProps = {
  children: React.ReactNode;
};

function BodyText({ children }: BodyTextProps) {
  return <p className="text-[13px] leading-5 text-black/70">{children}</p>;
}

type InfoTileProps = {
  label: string;
  value: string;
  hint?: string;
  isLink?: boolean;
};

function InfoTile({ label, value, hint, isLink = false }: InfoTileProps) {
  return (
    <div
      className="
        min-h-[58px]
        border border-black/10
        bg-white/45
        px-3 py-2
        shadow-[0_8px_20px_rgba(0,0,0,0.02)]
        transition
        group-hover:border-black/20
        group-hover:bg-white/65
      "
    >
      <p className="text-[8.5px] uppercase tracking-[0.2em] text-black/40">
        {label}
      </p>

      <p className="mt-1 text-[13px] font-medium leading-snug text-black/75">
        {value}
      </p>

      {hint && (
        <p
          className={`
            mt-1.5
            text-[8.5px]
            uppercase
            tracking-[0.15em]
            transition
            ${
              isLink
                ? "text-black/40 group-hover:text-blue-600"
                : "text-black/40"
            }
          `}
        >
          {hint}
        </p>
      )}
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
        min-h-[38px]
        border border-black/15
        bg-black
        px-4 py-2
        text-left
        text-[11px] font-medium
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
    <h4 className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-black/42">
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