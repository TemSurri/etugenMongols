import {
  useMemo
} from "react";

import {
  useEventsContext
} from "../../../context/EventsContext";

import {
  EVENT_IMAGES
} from "../constants";

import type {
  ApiEvent,
  Lang,
  UpcomingEventItem
} from "../types";


function formatDate(
  value: string,
  lang: Lang
): string {

  return new Intl.DateTimeFormat(
    lang === "mn"
      ? "mn-MN"
      : "en-CA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(
    new Date(value)
  );
}


function formatTime(
  startsAt: string,
  endsAt: string | null,
  lang: Lang
): string {

  const formatter =
    new Intl.DateTimeFormat(
      lang === "mn"
        ? "mn-MN"
        : "en-CA",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );


  const start =
    formatter.format(
      new Date(startsAt)
    );


  if (!endsAt) {
    return start;
  }


  const end =
    formatter.format(
      new Date(endsAt)
    );


  return `${start} – ${end}`;
}


function mapEvent(
  event: ApiEvent,
  lang: Lang
): UpcomingEventItem {

  const title =
    lang === "mn"
      ? event.titleMn
      : event.titleEn;


  const imageAlt =
    lang === "mn"
      ? event.coverImageAltMn
      : event.coverImageAltEn;


  return {
    id: event.id,

    slug:
      event.slug,

    title,

    imageSrc:
      event.coverImage ??
      EVENT_IMAGES.fallback,

    imageAlt:
      imageAlt ??
      title,

    date:
      formatDate(
        event.startsAt,
        lang
      ),

    time:
      formatTime(
        event.startsAt,
        event.endsAt,
        lang
      ),

    location:
      event.location,

    registerable:
      event.registerable,

    registrationCost:
      event.registrationCost,

    href:
      `/events/${event.slug}`,
  };
}


export function usePublishedEvents(
  lang: Lang
) {

  const {
    events,
    loading,
    error
  } =
    useEventsContext();


  const publishedEvents =
    useMemo(
      () =>
        events
          .filter(
            event =>
              event.published
          )
          .sort(
            (a, b) =>
              new Date(
                a.startsAt
              ).getTime() -
              new Date(
                b.startsAt
              ).getTime()
          )
          .map(
            event =>
              mapEvent(
                event,
                lang
              )
          ),
      [
        events,
        lang
      ]
    );


  return {
    events:
      publishedEvents,

    loading,

    error
  };
}