import type { ApiEvent } from "../types";
import {
  addEventChange,
  emptyToNull,
  normalizeInstant,
  type EventChange,
} from "./eventEditorUtils";
export type EventEditValues = {
  titleEn: string;
  titleMn: string;
  descriptionEn: string;
  descriptionMn: string;
  location: string;
  startsAt: string;
  endsAt: string;
  coverImage: string;
  coverImageAltEn: string;
  coverImageAltMn: string;
  contactEmail: string;
  contactPhone: string;
};
export function buildEventChanges(
  event: ApiEvent,
  {
    titleEn,
    titleMn,
    descriptionEn,
    descriptionMn,
    location,
    startsAt,
    endsAt,
    coverImage,
    coverImageAltEn,
    coverImageAltMn,
    contactEmail,
    contactPhone,
  }: EventEditValues,
): EventChange[] {
  const changes: EventChange[] = [];

  addEventChange(changes, "TITLE_EN", event.titleEn, titleEn.trim());

  addEventChange(changes, "TITLE_MN", event.titleMn, titleMn.trim());

  addEventChange(
    changes,
    "DESCRIPTION_EN",
    event.descriptionEn,
    descriptionEn.trim(),
  );

  addEventChange(
    changes,
    "DESCRIPTION_MN",
    event.descriptionMn,
    descriptionMn.trim(),
  );

  addEventChange(changes, "LOCATION", event.location, location.trim());

  addEventChange(
    changes,
    "STARTS_AT",
    normalizeInstant(event.startsAt),
    new Date(startsAt).toISOString(),
  );

  addEventChange(
    changes,
    "ENDS_AT",
    event.endsAt ? normalizeInstant(event.endsAt) : null,
    endsAt ? new Date(endsAt).toISOString() : null,
  );

  addEventChange(
    changes,
    "COVER_IMAGE",
    event.coverImage,
    emptyToNull(coverImage),
  );

  addEventChange(
    changes,
    "COVER_IMAGE_ALT_EN",
    event.coverImageAltEn,
    emptyToNull(coverImageAltEn),
  );

  addEventChange(
    changes,
    "COVER_IMAGE_ALT_MN",
    event.coverImageAltMn,
    emptyToNull(coverImageAltMn),
  );

  addEventChange(
    changes,
    "CONTACT_EMAIL",
    event.contactEmail,
    emptyToNull(contactEmail),
  );

  addEventChange(
    changes,
    "CONTACT_PHONE",
    event.contactPhone,
    emptyToNull(contactPhone),
  );

  return changes;
}
