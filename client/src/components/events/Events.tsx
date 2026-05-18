"use client";

import { memo } from "react";
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
    back: "Back to Strategy",
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
    back: "Чиглэл рүү буцах",
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
  const hasEvents = events.length > 0;

  return (
    <section className="min-h-screen border-y border-[#d8caa5]/55 bg-linear-to-br from-[#ede1c7] via-[#f6eedc] to-[#d8caa5] pt-20 text-[#27301d]">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-6 md:px-10 lg:px-12">
        <Link
          to="/about/learnmore"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b26]/90 transition-colors hover:text-[#27301d]"
        >
          ← {copy.back}
        </Link>

        <div className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7b26]/80">
            {copy.eyebrow}
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {copy.title}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#4e593c]/78 md:text-base md:leading-8">
            {copy.intro}
          </p>
        </div>

        {hasEvents ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                to={getEventLink(event)}
                className="group overflow-hidden border border-[#d8caa5]/70 bg-[#fffaf0]/72 shadow-[0_18px_46px_rgba(88,72,38,0.10)] transition-colors hover:border-[#b39135]/55"
              >
                <div className="relative h-44 overflow-hidden border-b border-[#d8caa5]/65 bg-[#efe2bf]/70">
                  <img
                    src={`/upcoming_event_assets/${event.image}`}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b26]/75">
                    {event.details.date}
                  </p>

                  <h2 className="mt-3 line-clamp-2 min-h-[3.5rem] text-2xl font-semibold leading-tight tracking-tight text-[#27301d]">
                    {event.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#4e593c]/76">
                    {getEventCardDescription(event)}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#d8caa5]/55 pt-4">
                    <p className="text-xs text-[#4e593c]/65">
                      {event.details.time}
                    </p>

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b26]/95 transition-colors group-hover:text-[#27301d]">
                      {copy.viewEvent} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 max-w-xl border border-[#d8caa5]/70 bg-[#fffaf0]/72 p-6 shadow-[0_18px_46px_rgba(88,72,38,0.10)]">
            <h2 className="text-2xl font-semibold tracking-tight">
              {copy.emptyTitle}
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#4e593c]/76">
              {copy.emptyBody}
            </p>

            <Link
              to="/gallery"
              className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7b26]/95 transition-colors hover:text-[#27301d]"
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