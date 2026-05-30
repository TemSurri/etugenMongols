"use client";

import { memo, useMemo } from "react";
import { Link } from "react-router-dom";

import { events } from "../../static_events";

type Lang = "en" | "mn";

type EventsProps = {
  lang: Lang;
};

const EVENTS_COPY = {
  en: {
    eyebrow: "Our Events",
    title: "What We Do",
    intro:
      "From cultural celebrations to community gatherings, every event we organize helps preserve tradition, connect generations, and strengthen our community.",
    upcoming: "Upcoming",
    pastEvent: "Past Event",
    viewEvent: "View Event",
    viewGallery: "View Gallery",
  },
  mn: {
    eyebrow: "Манай арга хэмжээнүүд",
    title: "Бид юу хийдэг вэ",
    intro:
      "Соёлын баяр, уулзалт, олон нийтийн арга хэмжээгээр дамжуулан бид уламжлалаа хадгалж, үе үеийг холбож, хамт олноо бэхжүүлдэг.",
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
    <section className="min-h-screen bg-[#f4ecd9] pt-20 text-[#27301d]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-[#9a7b26]">
              {copy.eyebrow}
            </p>

            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-none tracking-tight text-[#27301d] sm:text-5xl md:text-6xl">
              {copy.title}
            </h1>
          </div>

          <p className="max-w-xl text-base font-medium leading-8 text-[#4e593c]/85 md:justify-self-end">
            {copy.intro}
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-5 top-0 h-full border-l-2 border-dashed border-[#b39135] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">
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
                  <article
                    key={event.id}
                    className="relative grid gap-8 md:grid-cols-2 md:gap-16"
                  >
                    <div className="absolute left-5 top-7 z-10 -translate-x-1/2 md:left-1/2">
                      <div className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#b39135] bg-[#27301d] shadow-[0_0_0_6px_rgba(244,236,217,1)]">
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#fffaf0]">
                          {isUpcoming ? "Soon" : year}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`ml-12 md:ml-0 ${
                        isLeftSide ? "md:col-start-1" : "md:col-start-2"
                      }`}
                    >
                      <div
                        className={`mb-4 ${
                          isLeftSide ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a7b26]">
                          {isUpcoming ? copy.upcoming : copy.pastEvent}
                        </p>

                        <p className="mt-1 text-2xl font-semibold tracking-tight text-[#27301d]">
                          {isUpcoming ? event.date : year}
                        </p>
                      </div>

                      <div className="group overflow-hidden rounded-xl border border-[#d8caa5]/75 bg-[#fffaf0]/92 shadow-[0_18px_50px_rgba(88,72,38,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-[#b39135]/70 hover:shadow-[0_24px_70px_rgba(88,72,38,0.18)]">
                        <div className="relative aspect-[16/9] overflow-hidden bg-[#efe2bf]">
                          <img
                            src={imageSrc}
                            alt={imageAlt}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                        </div>

                        <div className="p-6">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#f4ecd9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
                              {isUpcoming ? copy.upcoming : year}
                            </span>

                            <span className="rounded-full bg-[#f4ecd9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
                              Cultural
                            </span>
                          </div>

                          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#27301d]">
                            {title}
                          </h2>

                          <p className="mt-3 line-clamp-4 text-sm leading-7 text-[#4e593c]/85">
                            {description}
                          </p>

                          <div className="mt-6 border-t border-[#d8caa5]/65 pt-4">
                            <Link
                              to={href}
                              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b26] transition-colors hover:text-[#27301d]"
                            >
                              {isUpcoming ? copy.viewEvent : copy.viewGallery} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
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