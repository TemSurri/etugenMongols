"use client";

import {
  useState
} from "react";

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

    try {

      setChangingPublished(
        true
      );


      await updateEvent(
        event.id,
        "PUBLISHED",
        String(
          !event.published
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