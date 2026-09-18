import {
  useMemo
} from "react";

import {
  galleryEvents
} from "../../gallery/data/galleryCatalog";

import {
  EVENT_IMAGES
} from "../constants";

import {
  EVENTS_COPY
} from "../copy";

import {
  getEventImage
} from "../helpers";

import type {
  Lang,
  SlideshowImage
} from "../types";


export function useEvents(
  lang: Lang
) {

  const safeLang: Lang =
    lang === "mn"
      ? "mn"
      : "en";


  const copy =
    EVENTS_COPY[safeLang];


  const slideshowImages =
    useMemo<SlideshowImage[]>(
      () => {

        const images =
          galleryEvents
            .filter(
              event =>
                event.status === "past"
            )
            .map(
              event => ({
                id: event.id,

                src:
                  getEventImage(
                    event
                  ),

                alt:
                  event.coverImage
                    .alt[safeLang],
              })
            );


        return images.length
          ? images
          : [
              {
                id: "fallback",
                src:
                  EVENT_IMAGES.fallback,
                alt: "",
              },
            ];

      },
      [safeLang]
    );


  return {
    copy,
    slideshowImages,
  };
}
