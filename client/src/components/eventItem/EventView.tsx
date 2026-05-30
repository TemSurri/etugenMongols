"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import type { Event, EventAction } from "../../static_events";

type Lang = "mn" | "en";

type EventViewProps = {
  event: Event;
  lang: Lang;
};

const COPY = {
  en: {
    back: "Back to Events",
    about: "About",
    details: "Details",
    ticket: "Ticket Information",
    maps: "Open in Google Maps",
    unavailable: "This event is not currently available for registration.",
  },
  mn: {
    back: "Арга хэмжээ рүү буцах",
    about: "Тухай",
    details: "Мэдээлэл",
    ticket: "Тасалбарын мэдээлэл",
    maps: "Google Maps дээр нээх",
    unavailable: "Энэ арга хэмжээнд одоогоор бүртгүүлэх боломжгүй байна.",
  },
} as const;

function EventView({ event, lang }: EventViewProps) {
  const copy = COPY[lang];

  const title = event.title[lang];
  const description = event.description[lang];
  const imageSrc = event.coverImage.highRes || event.coverImage.lowRes;
  const imageAlt = event.coverImage.alt[lang];

  const upcoming = event.upcoming;
  const enabledActions = upcoming?.actions.filter((action) => action.enabled) ?? [];

  const googleMapsUrl = event.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        event.location
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
              src={imageSrc}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              className="w-full rounded-xl border border-[#d8caa5]/70 bg-white object-contain"
            />
          </div>

          <div className="pt-1">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h1>

            <div className="mt-4 space-y-3 border-l-2 border-[#d8caa5] pl-4">
              <Info label="Date" value={event.date} />

              {upcoming?.time && <Info label="Time" value={upcoming.time} />}

              {event.location && (
                <Info
                  label="Location"
                  value={
                    <>
                      {event.location}

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

            {enabledActions.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {enabledActions.map((action) => (
                  <ActionButton
                    key={action.type}
                    action={action}
                    lang={lang}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-[#4e593c]/80">
                {copy.unavailable}
              </p>
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

          {(upcoming?.contact?.email ||
            upcoming?.contact?.phone?.length ||
            googleMapsUrl) && (
            <div className="mt-10">
              <SectionTitle>{copy.details}</SectionTitle>

              <div className="mt-3 space-y-2 text-sm leading-7 text-black/72">
                {upcoming?.contact?.email && <p>{upcoming.contact.email}</p>}

                {upcoming?.contact?.phone?.map((phone, index) => (
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
      </section>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
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

      <div className="mt-0.5 text-sm leading-6 text-[#4e593c]">{value}</div>
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
  const label = action.label[lang];

  return (
    <button
      type="button"
      className="rounded-full border border-[#d8caa5] bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8d7020] transition-colors hover:border-[#8d7020]"
    >
      {label}

      {action.type === "payment" && action.price !== undefined && (
        <span className="ml-1.5">${action.price}</span>
      )}
    </button>
  );
}

export default memo(EventView);