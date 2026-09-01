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

  onEdit: () => void;

  updateEvent:
    (
      eventId: string,
      type: EventUpdateType,
      value: string | null
    ) => Promise<ApiEvent>;
};


function getErrorMessage(
  error: unknown
): string {

  if (
    axios.isAxiosError(error)
  ) {

    const status =
      error.response?.status;


    if (status === 400) {
      return "The event update was invalid.";
    }


    if (status === 401) {
      return "Your session has expired. Please log in again.";
    }


    if (status === 403) {
      return "You do not have permission to update this event.";
    }


    if (status === 404) {
      return "This event no longer exists.";
    }


    if (status === 409) {
      return "This update conflicts with existing event data.";
    }


    if (status && status >= 500) {
      return "The server could not update the event.";
    }
  }


  return "Could not update the event.";
}


export default function AdminEventCard({
  event,
  onEdit,
  updateEvent
}: Props) {

  const [
    changingPublished,
    setChangingPublished
  ] =
    useState(false);


  const [
    error,
    setError
  ] =
    useState<string | null>(
      null
    );


  const date =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    ).format(
      new Date(
        event.startsAt
      )
    );


  async function togglePublished() {

    if (
      changingPublished
    ) {
      return;
    }


    try {

      setChangingPublished(
        true
      );

      setError(
        null
      );


      await updateEvent(
        event.id,
        "PUBLISHED",
        String(
          !event.published
        )
      );

    } catch (error) {

      console.error(
        "Failed to update published status:",
        error
      );


      setError(
        getErrorMessage(
          error
        )
      );

    } finally {

      setChangingPublished(
        false
      );
    }
  }


  return (
    <article className="overflow-hidden border border-[#d7caa8] bg-[#fffaf0]">

      <div className="relative aspect-[16/7] bg-[#303824]">

        {event.coverImage ? (

          <img
            src={
              event.coverImage
            }
            alt={
              event.coverImageAltEn ??
              event.titleEn
            }
            className="h-full w-full object-cover"
          />

        ) : (

          <div className="flex h-full items-center justify-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fffaf0]/60">
              No Cover Image
            </p>

          </div>

        )}


        <div className="absolute right-3 top-3">

          <span
            className={`inline-block px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
              event.published
                ? "bg-[#303824] text-[#fffaf0]"
                : "bg-[#fffaf0] text-[#8d7020]"
            }`}
          >
            {event.published
              ? "Published"
              : "Draft"}
          </span>

        </div>

      </div>


      <div className="p-5 sm:p-6">

        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#92752b]">
          {date}
        </p>


        <h3 className="mt-2 text-xl font-normal tracking-tight">
          {event.titleEn}
        </h3>


        <p className="mt-1 text-sm text-[#59604d]">
          {event.titleMn}
        </p>


        <div className="mt-4 space-y-1 text-[12px] leading-6 text-[#59604d]">

          <p>
            {event.location}
          </p>

          <p>
            {event.registerable
              ? event.registrationCost === 0
                ? "Free registration"
                : event.registrationCost !== null
                  ? `$${(
                      event.registrationCost /
                      100
                    ).toFixed(2)} registration`
                  : "Registration enabled"
              : "Registration disabled"}
          </p>

        </div>


        {error && (

          <div className="mt-4 border border-[#a76558]/30 bg-[#fff4f1] px-4 py-3">

            <p className="text-sm text-[#8a4d42]">
              {error}
            </p>

          </div>

        )}


        <div className="mt-5 flex flex-wrap gap-2">

          <button
            type="button"
            onClick={onEdit}
            className="border border-[#b8aa84] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6f591f] transition hover:border-[#6f591f]"
          >
            Edit
          </button>


          <button
            type="button"
            disabled={
              changingPublished
            }
            onClick={
              togglePublished
            }
            className="bg-[#303824] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#fffaf0] transition hover:bg-[#414c31] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {changingPublished
              ? "Saving..."
              : event.published
                ? "Unpublish"
                : "Publish"}
          </button>

        </div>

      </div>

    </article>
  );
}