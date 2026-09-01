"use client";

import {
  useState
} from "react";

import AdminEventCard
  from "./AdminEventCard";

import CreateEventForm
  from "./CreateEventForm";

import EditEventModal
  from "./EditEventModal";

import type {
  ApiEvent,
  EventCreateRequest,
  EventUpdateType
} from "../../types";


type Props = {
  events: ApiEvent[];

  loading: boolean;
  error: boolean;

  createEvent:
    (
      request:
        EventCreateRequest
    ) => Promise<ApiEvent>;

  updateEvent:
    (
      eventId: string,
      type: EventUpdateType,
      value: string | null
    ) => Promise<ApiEvent>;
};


export default function AdminEvents({
  events,
  loading,
  error,
  createEvent,
  updateEvent
}: Props) {

  const [
    creating,
    setCreating
  ] =
    useState(false);


  const [
    editing,
    setEditing
  ] =
    useState<ApiEvent | null>(
      null
    );


  return (
    <div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#92752b]">
            Content Management
          </p>

          <h2 className="mt-2 text-2xl font-normal tracking-tight">
            Events
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#59604d]">
            Manage published and upcoming organization events.
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            setCreating(true)
          }
          className="w-fit bg-[#303824] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#fffaf0] transition hover:bg-[#414c31]"
        >
          + Create Event
        </button>

      </div>


      {creating && (

        <div className="mt-6">

          <CreateEventForm
            onCreate={
              createEvent
            }
            onCancel={() =>
              setCreating(
                false
              )
            }
          />

        </div>

      )}


      {loading && (

        <div className="mt-8 border border-[#d7caa8] bg-[#fffaf0] p-8">

          <p className="text-sm text-[#59604d]">
            Loading events...
          </p>

        </div>

      )}


      {!loading &&
      error && (

        <div className="mt-8 border border-[#c8a986] bg-[#fffaf0] p-8">

          <p className="text-sm text-[#76533f]">
            Could not load events.
          </p>

        </div>

      )}


      {!loading &&
      !error &&
      events.length === 0 && (

        <div className="mt-8 border border-[#d7caa8] bg-[#fffaf0] p-8">

          <p className="text-sm text-[#59604d]">
            No events have been created yet.
          </p>

        </div>

      )}


      {!loading &&
      !error &&
      events.length > 0 && (

        <div className="mt-6 grid gap-4 xl:grid-cols-2">

          {events.map(
            event => (

              <AdminEventCard
                key={event.id}
                event={event}
                onEdit={() =>
                  setEditing(
                    event
                  )
                }
                updateEvent={
                  updateEvent
                }
              />

            )
          )}

        </div>

      )}


      {editing && (

        <EditEventModal
          event={editing}
          updateEvent={
            updateEvent
          }
          onClose={() =>
            setEditing(null)
          }
        />

      )}

    </div>
  );
}