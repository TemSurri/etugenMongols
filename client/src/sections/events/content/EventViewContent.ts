import type { Lang } from "../types";
export type EventViewCopy = {
  back: string;

  about: string;

  date: string;
  time: string;
  location: string;

  maps: string;

  registration: string;
  register: string;
  free: string;
  unavailable: string;
};

export const COPY = {
  en: {
    back: "Back to Events",

    about: "About",

    date: "Date",
    time: "Time",
    location: "Location",

    maps: "Open in Google Maps",

    registration: "Registration",
    register: "Register",
    free: "Free",

    unavailable: "This event is not currently available for registration.",
  },

  mn: {
    back: "Арга хэмжээнүүд рүү буцах",

    about: "Тухай",

    date: "Огноо",
    time: "Цаг",
    location: "Байршил",

    maps: "Google Maps дээр нээх",

    registration: "Бүртгэл",
    register: "Бүртгүүлэх",
    free: "Үнэгүй",

    unavailable: "Энэ арга хэмжээнд одоогоор бүртгүүлэх боломжгүй байна.",
  },
} as const satisfies Record<Lang, EventViewCopy>;
