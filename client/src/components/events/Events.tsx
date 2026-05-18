"use client";

import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/landingpage.webp";

import {
  events,
  getEventCardDescription,
  getEventLink,
} from "../../static_events";

type Lang = "en" | "mn";

type EventsProps = {
  lang: Lang;
};

const LATEST_EVENT_VIDEO_URL = "https://www.youtube.com/embed/9bZkp7q19f0";

const EVENTS_COPY = {
  en: {
    learnMore: "Learn More About Events",
    eyebrow: "Upcoming Events",
    title: "Events",
    intro:
      "Explore upcoming cultural events, celebrations, and community gatherings hosted by Etugen Mongols.",
    emptyTitle: "No events are planned right now",
    emptyBody:
      "While there are no upcoming events posted, you can still watch highlights from our latest event.",
    latestHighlights: "Highlights From Our Latest Event",
    moreEventsTitle: "Look at More of Our Events",
    moreEventsBody:
      "Explore photos and memories from past gatherings, celebrations, and community events.",
    viewGallery: "View Gallery",
    viewEvent: "View Event",
  },
  mn: {
    learnMore: "Арга хэмжээний талаар дэлгэрэнгүй",
    eyebrow: "Удахгүй болох арга хэмжээ",
    title: "Арга хэмжээ",
    intro:
      "Этүгэн Монголчуудын зохион байгуулж буй удахгүй болох соёлын арга хэмжээ, баяр, нийгэмлэгийн уулзалтуудтай танилцаарай.",
    emptyTitle: "Одоогоор төлөвлөсөн арга хэмжээ алга",
    emptyBody:
      "Одоогоор удахгүй болох арга хэмжээ нийтлэгдээгүй байгаа ч та манай сүүлийн арга хэмжээний онцлох бичлэгийг үзэж болно.",
    latestHighlights: "Сүүлийн арга хэмжээний онцлох бичлэг",
    moreEventsTitle: "Өмнөх арга хэмжээнүүдийг үзэх",
    moreEventsBody:
      "Өмнөх уулзалт, баяр, нийгэмлэгийн арга хэмжээнүүдийн зураг, дурсамжтай танилцаарай.",
    viewGallery: "Зургийн цомог үзэх",
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
      {hasEvents && (
        <div className="relative overflow-hidden border-y border-[#d8caa5]/60 bg-[radial-gradient(circle_at_top_left,rgba(179,145,53,0.16),transparent_32%),linear-gradient(135deg,#efe2c5_0%,#fff8ea_50%,#dcc891_100%)]">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 md:px-10 lg:px-12 lg:py-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9a7b26]">
                  {copy.eyebrow}
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#27301d] sm:text-4xl md:text-5xl">
                  {copy.title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4e593c]/85 md:text-[15px] md:leading-7">
                  {copy.intro}
                </p>
              </div>

              <Link
                to="/about/events"
                className="inline-flex w-fit items-center justify-center border border-[#b39135]/45 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0] lg:justify-self-end"
              >
                {copy.learnMore}
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {hasEvents ? (
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 md:px-10 lg:px-12">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {eventCards.map(({ event, href, description }) => (
              <Link
                key={event.id}
                to={href}
                className="group flex overflow-hidden rounded-xl border border-[#d8caa5]/70 bg-[#fffaf0]/85 shadow-[0_12px_32px_rgba(88,72,38,0.10)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#b39135]/60 hover:shadow-[0_18px_46px_rgba(88,72,38,0.14)]"
              >
                <article className="flex w-full flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-[#d8caa5]/60 bg-[#efe2bf]">
                    <img
                      src={`/upcoming_event_assets/${event.image}`}
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7b26]">
                      {event.details.date}
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-2xl">
                      {event.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#4e593c]/80">
                      {description}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between gap-4 border-t border-[#d8caa5]/60 pt-3">
                        <p className="truncate text-xs font-medium text-[#4e593c]/70">
                          {event.details.time}
                        </p>

                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#9a7b26] transition-colors group-hover:text-[#27301d]">
                          {copy.viewEvent} →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
          <img
            src={landingImage}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/72" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(179,145,53,0.2),transparent_40%)]" />

          <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-6 md:px-10 lg:px-12">
            <div className="mx-auto max-w-xl text-center text-[#fffaf0]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8caa5]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {copy.emptyTitle}
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/75 md:text-[15px] md:leading-7">
                {copy.emptyBody}
              </p>
            </div>

            <div className="mx-auto mt-5 max-w-2xl overflow-hidden rounded-xl border border-white/15 bg-black/35 shadow-[0_18px_52px_rgba(0,0,0,0.35)]">
              <div className="border-b border-white/10 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8caa5]">
                  {copy.latestHighlights}
                </p>
              </div>

              <div className="aspect-video bg-black">
                <iframe
                  className="h-full w-full"
                  src={LATEST_EVENT_VIDEO_URL}
                  title={copy.latestHighlights}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mx-auto mt-5 max-w-2xl border-t border-white/15 pt-5 text-center text-[#fffaf0]">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {copy.moreEventsTitle}
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/70">
                {copy.moreEventsBody}
              </p>

              <Link
                to="/gallery"
                className="mt-4 inline-flex items-center justify-center border border-[#d8caa5]/45 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#fffaf0] transition-colors hover:border-[#fffaf0] hover:bg-[#fffaf0] hover:text-[#27301d]"
              >
                {copy.viewGallery}
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(Events);