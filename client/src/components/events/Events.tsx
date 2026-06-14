"use client";

import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

import { events } from "../../static_events";

type Lang = "en" | "mn";

type EventsProps = {
  lang: Lang;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const itemMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

const EVENTS_COPY = {
  en: {
    timelineTitle: "Event Timeline",
    timelineNote: "See upcoming and past events",
    upcoming: "Upcoming",
    pastEvent: "Past Event",
    viewEvent: "View Event",
    viewGallery: "View Gallery",
    eventDetails: "Event Details",
    time: "Time",
    location: "Location",
    actions: "Actions",
  },
  mn: {
    timelineTitle: "Арга хэмжээний цаг хугацаа",
    timelineNote: "Удахгүй болох болон өнгөрсөн арга хэмжээнүүдийг үзэх",
    upcoming: "Удахгүй болох",
    pastEvent: "Өмнөх арга хэмжээ",
    viewEvent: "Арга хэмжээг үзэх",
    viewGallery: "Зургийн цомог үзэх",
    eventDetails: "Арга хэмжээний мэдээлэл",
    time: "Цаг",
    location: "Байршил",
    actions: "Үйлдлүүд",
  },
} as const;

function getYearFromDate(date: string) {
  return date.match(/\b(20\d{2}|19\d{2})\b/)?.[0] ?? date;
}

function Events({ lang }: EventsProps) {
  const copy = EVENTS_COPY[lang];

  const timelineItems = useMemo(
    () =>
      events.map((event) => {
        const isUpcoming = event.status === "upcoming";

        return {
          event,
          isUpcoming,
          title: event.title[lang],
          description: event.description[lang],
          imageSrc: event.coverImage.lowRes || event.coverImage.highRes,
          imageAlt: event.coverImage.alt[lang],
          year: getYearFromDate(event.date),
          href: isUpcoming ? `/events/${event.id}` : `/gallery/${event.id}`,
          enabledActions:
            event.upcoming?.actions.filter((action) => action.enabled) ?? [],
        };
      }),
    [lang]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f3320] text-[#27301d]">
      <div className="fixed inset-0 z-0">
        <img
          src="/landingpage.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/48" />
        <div className="absolute inset-0 bg-linear-to-b from-black/36 via-black/28 to-black/68" />
        <div className="absolute inset-0 bg-linear-to-r from-black/54 via-transparent to-black/36" />
      </div>

      <div className="relative z-10 px-6 pb-24 pt-28 md:px-12 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={itemMotion}
            initial="hidden"
            animate="show"
            className="mb-8 inline-flex flex-wrap items-center gap-3 bg-[#fffaf0]/10 px-4 py-2 text-[#fffaf0] backdrop-blur-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e1d2a6]">
              {copy.timelineTitle}
            </p>

            <span className="h-1 w-1 bg-[#d6b04c]" />

            <p className="text-xs font-medium text-[#f3ead2]/90">
              {copy.timelineNote}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-[#e1d2a6]/55 md:left-1/2" />

            <div className="space-y-16 md:space-y-20 lg:space-y-24">
              {timelineItems.map(
                (
                  {
                    event,
                    isUpcoming,
                    title,
                    description,
                    imageSrc,
                    imageAlt,
                    year,
                    href,
                    enabledActions,
                  },
                  index
                ) => {
                  const isLeftSide = index % 2 === 0;

                  return (
                    <motion.article
                      key={`${event.id}-${index}`}
                      variants={itemMotion}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.16 }}
                      className="relative grid gap-8 pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
                    >
                      <div className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2">
                        <div className="h-3 w-3 bg-[#d6b04c] shadow-[0_0_0_6px_rgba(47,51,32,0.9)]" />
                      </div>

                      <div
                        className={
                          isLeftSide ? "md:col-start-1" : "md:col-start-2"
                        }
                      >
                        <div
                          className={
                            isLeftSide
                              ? "mb-4 md:text-right"
                              : "mb-4 md:text-left"
                          }
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d6b04c]">
                            {isUpcoming ? copy.upcoming : copy.pastEvent}
                          </p>

                          <p className="mt-1 text-2xl font-semibold tracking-tight text-[#fffaf0]">
                            {isUpcoming ? event.date : year}
                          </p>
                        </div>

                        <Link
                          to={href}
                          className="group block overflow-hidden bg-[#fffaf0]/96 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b04c]"
                        >
                          <div className="relative aspect-[16/9] overflow-hidden bg-[#efe2bf]">
                            <img
                              src={imageSrc}
                              alt={imageAlt}
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
                              fetchPriority={index === 0 ? "high" : "auto"}
                              className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/28 via-transparent to-transparent" />
                          </div>

                          <div className="p-6 md:p-7">
                            <span className="inline-flex bg-[#f4ecd9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
                              {isUpcoming ? copy.upcoming : year}
                            </span>

                            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#27301d]">
                              {title}
                            </h2>

                            <p className="mt-3 line-clamp-4 text-sm leading-7 text-[#4e593c]/88">
                              {description}
                            </p>

                            <span className="mt-6 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b26] transition-colors group-hover:text-[#27301d]">
                              {isUpcoming ? copy.viewEvent : copy.viewGallery} →
                            </span>
                          </div>
                        </Link>
                      </div>

                      <div
                        className={[
                          "hidden md:flex md:items-center",
                          isLeftSide
                            ? "md:col-start-2"
                            : "md:col-start-1 md:row-start-1",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "max-w-md text-[#fffaf0]",
                            isLeftSide ? "text-left" : "ml-auto text-right",
                          ].join(" ")}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d6b04c]">
                            {isUpcoming ? copy.upcoming : copy.pastEvent}
                          </p>

                          <h3 className="mt-3 text-3xl font-semibold leading-tight">
                            {title}
                          </h3>

                          <p className="mt-4 text-[15px] leading-8 text-[#f3ead2]">
                            {description}
                          </p>

                          {isUpcoming && (
                            <div className="mt-6 border-l-2 border-[#d6b04c] bg-[#fffaf0]/10 px-5 py-4 backdrop-blur-sm">
                              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6b04c]">
                                {copy.eventDetails}
                              </p>

                              <div className="mt-4 grid gap-3 text-sm text-[#f3ead2]">
                                {event.upcoming?.time && (
                                  <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d6b04c]/85">
                                      {copy.time}
                                    </p>
                                    <p className="mt-1 font-medium">
                                      {event.upcoming.time}
                                    </p>
                                  </div>
                                )}

                                {event.location && (
                                  <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d6b04c]/85">
                                      {copy.location}
                                    </p>
                                    <p className="mt-1 font-medium">
                                      {event.location}
                                    </p>
                                  </div>
                                )}

                                {enabledActions.length > 0 && (
                                  <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d6b04c]/85">
                                      {copy.actions}
                                    </p>

                                    <div
                                      className={[
                                        "mt-2 flex flex-wrap gap-2",
                                        isLeftSide
                                          ? "justify-start"
                                          : "justify-end",
                                      ].join(" ")}
                                    >
                                      {enabledActions.map((action) => (
                                        <Link
                                          key={action.type}
                                          to={`/events/${event.id}`}
                                          className="bg-[#d6b04c] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#27301d] transition-colors hover:bg-[#fffaf0]"
                                        >
                                          {action.label[lang]}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Events);