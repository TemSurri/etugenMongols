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

const headerMotion: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const itemMotion: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easeOut },
  },
};

const dotMotion: Variants = {
  hidden: { scale: 0.72, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.42, ease: easeOut },
  },
};

const EVENTS_COPY = {
  en: {
    eyebrow: "Our Events",
    title: "Event Timeline",
    intro:
      "Explore upcoming gatherings and past cultural events that have brought our community together through celebration, volunteering, and shared tradition.",
    upcoming: "Upcoming",
    pastEvent: "Past Event",
    viewEvent: "View Event",
    viewGallery: "View Gallery",
  },
  mn: {
    eyebrow: "Манай арга хэмжээнүүд",
    title: "Арга хэмжээний цаг хугацаа",
    intro:
      "Ирэх арга хэмжээ болон өнгөрсөн соёлын баяр, олон нийтийн уулзалтуудаар дамжуулан хамт олон хэрхэн нэгдэж ирснийг үзээрэй.",
    upcoming: "Удахгүй болох",
    pastEvent: "Өмнөх арга хэмжээ",
    viewEvent: "Арга хэмжээг үзэх",
    viewGallery: "Зургийн цомог үзэх",
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
        };
      }),
    [lang]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f3320] pt-24 text-[#27301d]">
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
        <div className="absolute inset-0 bg-linear-to-b from-black/42 via-black/28 to-black/64" />
        <div className="absolute inset-0 bg-linear-to-r from-black/54 via-transparent to-black/42" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-6 md:px-10 lg:px-12">
        <motion.header
          variants={headerMotion}
          initial="hidden"
          animate="show"
          className="
            rounded-lg border border-[#e1d2a6]/55
            bg-[#fffaf0]/95 px-6 py-7
            shadow-[0_24px_70px_rgba(0,0,0,0.34)]
            backdrop-blur-sm
            md:px-8 md:py-8
          "
        >
          <div className="grid gap-6 md:grid-cols-[0.9fr_1fr] md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-5xl lg:text-[3.35rem]">
                {copy.title}
              </h1>
            </div>

            <p className="max-w-xl border-t border-[#d8caa5] pt-5 text-sm leading-7 text-[#4e593c] md:justify-self-end md:border-l md:border-t-0 md:pl-7 md:pt-0 md:text-[15px]">
              {copy.intro}
            </p>
          </div>
        </motion.header>

        <div className="relative mt-16 md:mt-20">
          <div className="absolute left-5 top-0 h-full border-l-2 border-dashed border-[#d6b04c]/80 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-14 md:space-y-20">
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
                },
                index
              ) => {
                const isLeftSide = index % 2 === 0;

                return (
                  <motion.article
                    key={event.id}
                    variants={itemMotion}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.18 }}
                    className="relative grid gap-8 md:grid-cols-2 md:gap-16"
                  >
                    <motion.div
                      variants={dotMotion}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.5 }}
                      className="absolute left-5 top-8 z-10 -translate-x-1/2 md:left-1/2"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#d6b04c] bg-[#27301d] shadow-[0_0_0_7px_rgba(47,51,32,0.92)]">
                        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#fffaf0]">
                          {isUpcoming ? "Soon" : year}
                        </span>
                      </div>
                    </motion.div>

                    <div
                      className={[
                        "ml-12 md:ml-0",
                        isLeftSide ? "md:col-start-1" : "md:col-start-2",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "mb-4",
                          isLeftSide ? "md:text-right" : "md:text-left",
                        ].join(" ")}
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
                        className="
                          group block overflow-hidden rounded-lg border border-[#e1d2a6]/45
                          bg-[#fffaf0]/96
                          shadow-[0_22px_60px_rgba(0,0,0,0.28)]
                          transition duration-300
                          hover:-translate-y-0.5
                          hover:border-[#d6b04c]/80
                          hover:shadow-[0_28px_80px_rgba(0,0,0,0.36)]
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#d6b04c]
                        "
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-[#efe2bf]">
                          <img
                            src={imageSrc}
                            alt={imageAlt}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-transparent to-transparent" />
                        </div>

                        <div className="p-6 md:p-7">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-sm bg-[#f4ecd9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
                              {isUpcoming ? copy.upcoming : year}
                            </span>
                          </div>

                          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#27301d]">
                            {title}
                          </h2>

                          <p className="mt-3 line-clamp-4 text-sm leading-7 text-[#4e593c]/88">
                            {description}
                          </p>

                          <div className="mt-6 border-t border-[#d8caa5]/75 pt-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b26] transition-colors group-hover:text-[#27301d]">
                              {isUpcoming ? copy.viewEvent : copy.viewGallery} →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Events);