import { useMemo } from "react";
import { events } from "../../../static_events";
import { EVENT_IMAGES } from "../constants";
import { EVENTS_COPY } from "../copy";
import { getEventImage } from "../helpers";
import type { Lang, SlideshowImage, UpcomingEventItem } from "../types";

export function useEvents(lang: Lang) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = EVENTS_COPY[safeLang];

  const upcomingEvents = useMemo<UpcomingEventItem[]>(
    () =>
      events
        .filter((event) => event.status === "upcoming")
        .map((event) => ({
          id: event.id,
          title: event.title[safeLang],
          imageSrc: getEventImage(event),
          imageAlt: event.coverImage.alt[safeLang],
          date: event.date,
          time: event.upcoming?.time,
          location: event.location,
          href: `/events/${event.id}`,
        })),
    [safeLang],
  );

  const slideshowImages = useMemo<SlideshowImage[]>(() => {
    const images = events
      .filter((event) => event.status === "past")
      .map((event) => ({
        id: event.id,
        src: getEventImage(event),
        alt: event.coverImage.alt[safeLang],
      }));

    return images.length
      ? images
      : [{ id: "fallback", src: EVENT_IMAGES.fallback, alt: "" }];
  }, [safeLang]);

  return { copy, upcomingEvents, slideshowImages };
}
