import axios from "axios";

import type { EventUpdateType } from "../types";

export type EventChange = {
  type: EventUpdateType;
  value: string | null;
};

export function addEventChange(
  changes: EventChange[],
  type: EventUpdateType,
  oldValue: string | number | null,
  newValue: string | null
) {
  const normalizedOld = oldValue === null ? null : String(oldValue);

  if (normalizedOld !== newValue) {
    changes.push({ type, value: newValue });
  }
}

export function emptyToNull(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeInstant(value: string) {
  return new Date(value).toISOString();
}

export function toDateTimeLocal(value: string) {
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function getEventUpdateErrorMessage(
  error: unknown,
  lang: "en" | "mn"
) {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return lang === "mn"
          ? "Зарим мэдээлэл буруу байна."
          : "Some of the event information is invalid.";
      case 401:
        return lang === "mn"
          ? "Таны нэвтрэх хугацаа дууссан байна."
          : "Your session has expired.";
      case 403:
        return lang === "mn"
          ? "Энэ арга хэмжээг засах эрхгүй байна."
          : "You do not have permission to edit this event.";
      case 404:
        return lang === "mn"
          ? "Арга хэмжээ олдсонгүй."
          : "This event no longer exists.";
      case 409:
        return lang === "mn"
          ? "Өөрчлөлт одоогийн мэдээлэлтэй зөрчилдөж байна."
          : "The update conflicts with existing event information.";
    }
  }

  return lang === "mn"
    ? "Өөрчлөлтийг хадгалж чадсангүй."
    : "Could not save the event.";
}

export const inputClasses =
    `
        w-full
        rounded-lg
        border
        border-[#27301d]/15
        bg-white
        px-3.5
        py-2.5
        text-sm
        text-[#27301d]
        outline-none
        transition-colors
        duration-150

        hover:border-[#9a7b26]/40

        focus:border-[#9a7b26]/65
        focus:ring-2
        focus:ring-[#9a7b26]/10
    `;
