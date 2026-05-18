"use client";

import { memo, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  events,
  getEventCardDescription,
  getEventLink,
} from "../../static_events";

type Lang = "en" | "mn";

type EventsProps = {
  lang: Lang;
};

const EVENTS_COPY = {
  en: {
    learnMore: "Learn More About Events",
    eyebrow: "Upcoming Events",
    title: "Events",
    intro:
      "Explore upcoming cultural events, celebrations, and community gatherings hosted by Etugen Mongols.",
    emptyTitle: "No upcoming events right now",
    emptyBody:
      "New events will be posted here when they are announced. You can still explore past event galleries.",
    viewGallery: "View Past Galleries",
    viewEvent: "View Event",
  },
  mn: {
    learnMore: "Арга хэмжээний талаар дэлгэрэнгүй",
    eyebrow: "Удахгүй болох арга хэмжээ",
    title: "Арга хэмжээ",
    intro:
      "Этүгэн Монголчуудын зохион байгуулж буй удахгүй болох соёлын арга хэмжээ, баяр, нийгэмлэгийн уулзалтуудтай танилцаарай.",
    emptyTitle: "Одоогоор удахгүй болох арга хэмжээ алга",
    emptyBody:
      "Шинэ арга хэмжээ зарлагдмагц энд нийтлэгдэх болно. Та өмнөх арга хэмжээний зургуудыг үзэх боломжтой.",
    viewGallery: "Өмнөх зургууд үзэх",
    viewEvent: "Арга хэмжээг үзэх",
  },
} as const;

function Events({ lang }: EventsProps) {
  const copy = EVENTS_COPY[lang];

  const eventCards = useMemo(
    () =>
      events.map((event) => ({
        event,
        href: getEventLink(event),
        description: getEventCardDescription(event),
      })),
    []
  );

  const hasEvents = eventCards.length > 0;

  return (
    <section className="min-h-screen bg-[#f4ecd9] pt-20 text-[#27301d]">
      <div className="relative overflow-hidden border-y border-[#d8caa5]/60 bg-[radial-gradient(circle_at_top_left,rgba(179,145,53,0.20),transparent_34%),linear-gradient(135deg,#efe2c5_0%,#fff8ea_48%,#dcc891_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12 lg:py-14">
          <Link
            to="/about/events"
            className="inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8d7020] transition-colors hover:text-[#27301d]"
          >
            {copy.learnMore} →
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#27301d] sm:text-5xl md:text-6xl">
                {copy.title}
              </h1>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#4e593c]/85 md:text-base md:leading-8 lg:ml-auto">
              {copy.intro}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12">
        {hasEvents ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {eventCards.map(({ event, href, description }) => (
              <Link
                key={event.id}
                to={href}
                className="group flex overflow-hidden rounded-2xl border border-[#d8caa5]/70 bg-[#fffaf0]/85 shadow-[0_16px_40px_rgba(88,72,38,0.10)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#b39135]/60 hover:shadow-[0_22px_55px_rgba(88,72,38,0.16)]"
              >
                <article className="flex w-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#d8caa5]/60 bg-[#efe2bf]">
                    <img
                      src={`/upcoming_event_assets/${event.image}`}
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
                      {event.details.date}
                    </p>

                    <h2 className="mt-3 line-clamp-2 text-2xl font-semibold leading-tight tracking-tight text-[#27301d]">
                      {event.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4e593c]/80">
                      {description}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between gap-4 border-t border-[#d8caa5]/60 pt-4">
                        <p className="truncate text-xs font-medium text-[#4e593c]/70">
                          {event.details.time}
                        </p>

                        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a7b26] transition-colors group-hover:text-[#27301d]">
                          {copy.viewEvent} →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#d8caa5]/70 bg-[#fffaf0]/85 p-7 text-center shadow-[0_16px_40px_rgba(88,72,38,0.10)] sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7b26]">
              {copy.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#27301d]">
              {copy.emptyTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#4e593c]/80">
              {copy.emptyBody}
            </p>

            <Link
              to="/gallery"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#b39135]/35 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d7020] transition-colors hover:border-[#27301d]/30 hover:text-[#27301d]"
            >
              {copy.viewGallery}
              <span className="ml-3">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(Events);