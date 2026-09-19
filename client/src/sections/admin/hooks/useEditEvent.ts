import { editEventModalCopy } from "../content/EditEventModalCopy";
import { buildEventChanges } from "../model/buildEventChanges";

import { useState } from "react";

import type { ApiEvent, EventUpdateType } from "../types";

import {
  getEventUpdateErrorMessage,
  toDateTimeLocal,
} from "../model/eventEditorUtils";
export type EditEventOptions = {
  event: ApiEvent;

  updateEvent: (
    eventId: string,
    type: EventUpdateType,
    value: string | null,
  ) => Promise<ApiEvent>;

  updateRegistration: (
    eventId: string,
    registerable: boolean,
    registrationCost: number | null,
  ) => Promise<ApiEvent>;

  onClose: () => void;

  lang: "en" | "mn";
};
export function useEditEvent({
  event,
  updateEvent,
  updateRegistration,
  onClose,
  lang,
}: EditEventOptions) {
  const [titleEn, setTitleEn] = useState(event.titleEn);

  const [titleMn, setTitleMn] = useState(event.titleMn);

  const [descriptionEn, setDescriptionEn] = useState(event.descriptionEn);

  const [descriptionMn, setDescriptionMn] = useState(event.descriptionMn);

  const [startsAt, setStartsAt] = useState(toDateTimeLocal(event.startsAt));

  const [endsAt, setEndsAt] = useState(
    event.endsAt ? toDateTimeLocal(event.endsAt) : "",
  );

  const [location, setLocation] = useState(event.location);

  const [registerable, setRegisterable] = useState(event.registerable);

  const [registrationDollars, setRegistrationDollars] = useState(
    event.registrationCost !== null
      ? (event.registrationCost / 100).toFixed(2)
      : "",
  );

  const [coverImage, setCoverImage] = useState(event.coverImage ?? "");

  const [coverImageAltEn, setCoverImageAltEn] = useState(
    event.coverImageAltEn ?? "",
  );

  const [coverImageAltMn, setCoverImageAltMn] = useState(
    event.coverImageAltMn ?? "",
  );

  const [contactEmail, setContactEmail] = useState(event.contactEmail ?? "");

  const [contactPhone, setContactPhone] = useState(event.contactPhone ?? "");

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function saveChanges() {
    if (saving) {
      return;
    }

    if (
      !titleEn.trim() ||
      !titleMn.trim() ||
      !descriptionEn.trim() ||
      !descriptionMn.trim() ||
      !location.trim() ||
      !startsAt
    ) {
      setError(editEventModalCopy[lang].pleaseCompleteAllRequiredFields);

      return;
    }

    let newRegistrationCost: number | null = null;

    if (registerable) {
      const dollars = Number(registrationDollars);

      if (!Number.isFinite(dollars) || dollars < 0) {
        setError(editEventModalCopy[lang].registrationCostMustBeAValidAmount);

        return;
      }

      newRegistrationCost = Math.round(dollars * 100);
    }

    try {
      setSaving(true);

      setError(null);

      const changes = buildEventChanges(event, {
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
      });
      for (const change of changes) {
        await updateEvent(event.id, change.type, change.value);
      }

      const registrationChanged =
        event.registerable !== registerable ||
        event.registrationCost !== newRegistrationCost;

      if (registrationChanged) {
        await updateRegistration(event.id, registerable, newRegistrationCost);
      }

      onClose();
    } catch (error) {
      console.error("Failed to edit event:", error);

      setError(getEventUpdateErrorMessage(error, lang));
    } finally {
      setSaving(false);
    }
  }
  return {
    titleEn,
    setTitleEn,
    titleMn,
    setTitleMn,
    descriptionEn,
    setDescriptionEn,
    descriptionMn,
    setDescriptionMn,
    startsAt,
    setStartsAt,
    endsAt,
    setEndsAt,
    location,
    setLocation,
    registerable,
    setRegisterable,
    registrationDollars,
    setRegistrationDollars,
    coverImage,
    setCoverImage,
    coverImageAltEn,
    setCoverImageAltEn,
    coverImageAltMn,
    setCoverImageAltMn,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    saving,
    setSaving,
    error,
    setError,
    saveChanges,
  };
}
