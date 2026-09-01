"use client";

import {
  useState
} from "react";

import axios from "axios";

import type {
  ApiEvent,
  EventUpdateType
} from "../../types";


type Props = {
  event: ApiEvent;

  updateEvent:
    (
      eventId: string,
      type: EventUpdateType,
      value: string | null
    ) => Promise<ApiEvent>;

  onClose: () => void;
};


function getUpdateErrorMessage(
  error: unknown
): string {

  if (
    axios.isAxiosError(error)
  ) {

    const status =
      error.response?.status;


    if (status === 400) {
      return "This value is invalid.";
    }


    if (status === 401) {
      return "Your session has expired. Please log in again.";
    }


    if (status === 403) {
      return "You do not have permission to update this event.";
    }


    if (status === 404) {
      return "This event could not be found.";
    }


    if (status === 409) {
      return "This value conflicts with the current event.";
    }


    if (status && status >= 500) {
      return "The server could not save this change.";
    }
  }


  return "Could not save this change.";
}


export default function EditEventModal({
  event,
  updateEvent,
  onClose
}: Props) {

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/55 px-4 py-8">

      <div className="mx-auto max-w-3xl border border-[#cfc19f] bg-[#f6efdf] shadow-2xl">

        <div className="flex items-start justify-between border-b border-[#d7caa8] px-6 py-5">

          <div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#92752b]">
              Event Management
            </p>

            <h2 className="mt-1 text-2xl font-normal">
              Edit Event
            </h2>

            <p className="mt-2 text-sm text-[#59604d]">
              {event.titleEn}
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            className="text-xl text-[#59604d] transition hover:text-[#303824]"
            aria-label="Close"
          >
            ×
          </button>

        </div>


        <div className="space-y-5 p-6">

          <EditField
            eventId={event.id}
            type="TITLE_EN"
            label="English Title"
            initialValue={
              event.titleEn
            }
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="TITLE_MN"
            label="Mongolian Title"
            initialValue={
              event.titleMn
            }
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="DESCRIPTION_EN"
            label="English Description"
            initialValue={
              event.descriptionEn
            }
            multiline
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="DESCRIPTION_MN"
            label="Mongolian Description"
            initialValue={
              event.descriptionMn
            }
            multiline
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="LOCATION"
            label="Location"
            initialValue={
              event.location
            }
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="COVER_IMAGE"
            label="Cover Image"
            initialValue={
              event.coverImage ?? ""
            }
            nullable
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="COVER_IMAGE_ALT_EN"
            label="English Image Alt"
            initialValue={
              event.coverImageAltEn ??
              ""
            }
            nullable
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="COVER_IMAGE_ALT_MN"
            label="Mongolian Image Alt"
            initialValue={
              event.coverImageAltMn ??
              ""
            }
            nullable
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="CONTACT_EMAIL"
            label="Contact Email"
            initialValue={
              event.contactEmail ??
              ""
            }
            nullable
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="CONTACT_PHONE"
            label="Contact Phone"
            initialValue={
              event.contactPhone ??
              ""
            }
            nullable
            updateEvent={
              updateEvent
            }
          />


          <EditField
            eventId={event.id}
            type="REGISTRATION_COST"
            label="Registration Cost (cents)"
            initialValue={
              event.registrationCost !==
              null
                ? String(
                    event.registrationCost
                  )
                : ""
            }
            nullable
            updateEvent={
              updateEvent
            }
          />

        </div>


        <div className="border-t border-[#d7caa8] px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="bg-[#303824] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#fffaf0]"
          >
            Done
          </button>

        </div>

      </div>

    </div>
  );
}


function EditField({
  eventId,
  type,
  label,
  initialValue,
  multiline = false,
  nullable = false,
  updateEvent
}: {
  eventId: string;
  type: EventUpdateType;
  label: string;

  initialValue: string;

  multiline?: boolean;
  nullable?: boolean;

  updateEvent:
    (
      eventId: string,
      type: EventUpdateType,
      value: string | null
    ) => Promise<ApiEvent>;
}) {

  const [
    value,
    setValue
  ] =
    useState(
      initialValue
    );


  const [
    saving,
    setSaving
  ] =
    useState(false);


  const [
    saved,
    setSaved
  ] =
    useState(false);


  const [
    error,
    setError
  ] =
    useState<string | null>(
      null
    );


  async function save() {

    if (
      saving
    ) {
      return;
    }


    try {

      setSaving(
        true
      );

      setSaved(
        false
      );

      setError(
        null
      );


      await updateEvent(
        eventId,
        type,
        nullable &&
        value.trim() === ""
          ? null
          : value.trim()
      );


      setSaved(
        true
      );


      window.setTimeout(
        () =>
          setSaved(
            false
          ),
        1200
      );

    } catch (error) {

      console.error(
        `Failed to update ${type}:`,
        error
      );


      setError(
        getUpdateErrorMessage(
          error
        )
      );

    } finally {

      setSaving(
        false
      );
    }
  }


  return (
    <div>

      <label className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#92752b]">
        {label}
      </label>


      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start">

        {multiline ? (

          <textarea
            value={value}
            disabled={saving}
            onChange={
              event => {

                setValue(
                  event.target.value
                );

                setSaved(
                  false
                );

                setError(
                  null
                );
              }
            }
            rows={4}
            className="min-w-0 flex-1 resize-y border border-[#cfc19f] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#8d7020] disabled:opacity-60"
          />

        ) : (

          <input
            value={value}
            disabled={saving}
            onChange={
              event => {

                setValue(
                  event.target.value
                );

                setSaved(
                  false
                );

                setError(
                  null
                );
              }
            }
            className="min-w-0 flex-1 border border-[#cfc19f] bg-white px-4 py-3 text-sm outline-none focus:border-[#8d7020] disabled:opacity-60"
          />

        )}


        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="min-w-[90px] bg-[#303824] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#fffaf0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : saved
              ? "Saved"
              : "Save"}
        </button>

      </div>


      {error && (

        <div
          role="alert"
          className="mt-2 border border-[#a76558]/30 bg-[#fff4f1] px-3 py-2"
        >

          <p className="text-xs font-medium text-[#8a4d42]">
            {error}
          </p>

        </div>

      )}


      {saved && (

        <p className="mt-2 text-xs font-medium text-[#667056]">
          Change saved successfully.
        </p>

      )}

    </div>
  );
}