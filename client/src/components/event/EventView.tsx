"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import type { EventAction, EventItem, Listing } from "../../static_events";

type Lang = "mn" | "en";

type EventViewProps = {
  event: EventItem;
  lang: Lang;
};

const COPY = {
  en: {
    back: "Back to Events",
    about: "About",
    details: "Details",
    ticket: "Ticket Information",
    volunteerRoles: "Volunteer Roles",
    maps: "Open in Google Maps",
  },
  mn: {
    back: "Арга хэмжээ рүү буцах",
    about: "Тухай",
    details: "Мэдээлэл",
    ticket: "Тасалбарын мэдээлэл",
    volunteerRoles: "Сайн дурын үүрэг",
    maps: "Google Maps дээр нээх",
  },
} as const;

function EventView({ event, lang }: EventViewProps) {
  const copy = COPY[lang];

  const description =
    lang === "mn" ? event.details.description : event.details.description_en;

  const ticketInfo =
    lang === "mn"
      ? event.details.ticketInfo || ""
      : event.details.ticketInfo_en || "";

  const enabledActions = event.actions.filter((action) => action.enabled);

  const googleMapsUrl = event.details.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.details.location
      )}`
    : null;

  return (
    <main className="min-h-screen bg-[#f6efdf] pt-20 text-[#27301d]">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 lg:px-8">
        <Link
          to="/events"
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8d7020] transition-colors hover:text-[#27301d]"
        >
          ← {copy.back}
        </Link>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <img
              src={`/upcoming_event_assets/${event.image}`}
              alt={event.title}
              loading="eager"
              decoding="async"
              className="w-full rounded-xl border border-[#d8caa5]/70 bg-white object-contain"
            />
          </div>

          <div className="pt-1">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {event.title}
            </h1>

            <div className="mt-4 space-y-3 border-l-2 border-[#d8caa5] pl-4">
              <Info label="Date" value={event.details.date} />
              <Info label="Time" value={event.details.time} />

              {event.details.location && (
                <Info
                  label="Location"
                  value={
                    <>
                      {event.details.location}

                      {googleMapsUrl && (
                        <>
                          <br />

                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-[#8d7020] underline underline-offset-4 hover:text-[#27301d]"
                          >
                            {copy.maps} →
                          </a>
                        </>
                      )}
                    </>
                  }
                />
              )}
            </div>

            {enabledActions.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {enabledActions.map((action) => (
                  <ActionButton
                    key={action.type}
                    action={action}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="mt-10 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionTitle>{copy.about}</SectionTitle>

            <p className="mt-4 whitespace-pre-line text-[14px] leading-7 text-black/72">
              {description}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            {ticketInfo && (
              <div>
                <SectionTitle>{copy.ticket}</SectionTitle>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-black/72">
                  {ticketInfo}
                </p>
              </div>
            )}

            {(event.contact?.email ||
              event.contact?.phone?.length ||
              googleMapsUrl) && (
              <div>
                <SectionTitle>{copy.details}</SectionTitle>

                <div className="mt-3 space-y-2 text-sm leading-7 text-black/72">
                  {event.contact?.email && (
                    <p>{event.contact.email}</p>
                  )}

                  {event.contact?.phone?.map((phone, index) => (
                    <p key={`${phone}-${index}`}>{phone}</p>
                  ))}

                  {googleMapsUrl && (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#8d7020] underline underline-offset-4 hover:text-[#27301d]"
                    >
                      {copy.maps} →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {event.whoWeWant.length > 0 && (
            <section className="mt-12 border-t border-black/10 pt-6">
              <SectionTitle>{copy.volunteerRoles}</SectionTitle>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {event.whoWeWant.map((item, index) => (
                  <VolunteerRole
                    key={`${item.title}-${index}`}
                    item={item}
                    lang={lang}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
      {children}
    </h2>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a7b26]">
        {label}
      </p>

      <div className="mt-0.5 text-sm leading-6 text-[#4e593c]">
        {value}
      </div>
    </div>
  );
}

function ActionButton({
  action,
  lang,
}: {
  action: EventAction;
  lang: Lang;
}) {
  const label = lang === "mn" ? action.label_mn : action.label;

  return (
    <button
      type="button"
      className="rounded-full border border-[#d8caa5] bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8d7020] transition-colors hover:border-[#8d7020]"
    >
      {label}

      {action.type === "payment" &&
        action.price !== undefined && (
          <span className="ml-1.5">${action.price}</span>
        )}
    </button>
  );
}

function VolunteerRole({
  item,
  lang,
}: {
  item: Listing;
  lang: Lang;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-black/[0.02] p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#27301d]">
        {lang === "mn" ? item.title_mn : item.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-black/72">
        {item.description}
      </p>

      {item.contact && (
        <p className="mt-2 text-xs text-black/55">
          {item.contact}
        </p>
      )}
    </div>
  );
}

export default memo(EventView);