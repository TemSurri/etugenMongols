"use client";

import {
  memo,
  type ReactNode
} from "react";

import {
  Link
} from "react-router-dom";

import type {
  ApiEvent,
  Lang
} from "../events/types";


type EventViewProps = {
  event: ApiEvent;
  lang: Lang;
};


type EventViewCopy = {
  back: string;

  about: string;
  details: string;

  date: string;
  time: string;
  location: string;

  maps: string;

  registration: string;
  free: string;
  unavailable: string;

  email: string;
  phone: string;
};


const COPY = {

  en: {
    back: "Back to Events",

    about: "About",
    details: "Details",

    date: "Date",
    time: "Time",
    location: "Location",

    maps: "Open in Google Maps",

    registration: "Registration",
    free: "Free",
    unavailable:
      "This event is not currently available for registration.",

    email: "Email",
    phone: "Phone",
  },

  mn: {
    back:
      "Арга хэмжээнүүд рүү буцах",

    about: "Тухай",
    details: "Мэдээлэл",

    date: "Огноо",
    time: "Цаг",
    location: "Байршил",

    maps:
      "Google Maps дээр нээх",

    registration: "Бүртгэл",
    free: "Үнэгүй",
    unavailable:
      "Энэ арга хэмжээнд одоогоор бүртгүүлэх боломжгүй байна.",

    email: "Имэйл",
    phone: "Утас",
  },

} as const satisfies Record<
  Lang,
  EventViewCopy
>;


function getGoogleMapsUrl(
  location?: string | null
) {

  if (!location) {
    return null;
  }

  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(location)
  );
}


function formatDate(
  value: string,
  lang: Lang
) {

  return new Intl.DateTimeFormat(
    lang === "mn"
      ? "mn-MN"
      : "en-CA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(
    new Date(value)
  );
}


function formatTime(
  startsAt: string,
  endsAt: string | null,
  lang: Lang
) {

  const formatter =
    new Intl.DateTimeFormat(
      lang === "mn"
        ? "mn-MN"
        : "en-CA",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );


  const start =
    formatter.format(
      new Date(startsAt)
    );


  if (!endsAt) {
    return start;
  }


  const end =
    formatter.format(
      new Date(endsAt)
    );


  return `${start} – ${end}`;
}


function EventView({
  event,
  lang
}: EventViewProps) {

  const copy =
    COPY[lang];


  const title =
    lang === "mn"
      ? event.titleMn
      : event.titleEn;


  const description =
    lang === "mn"
      ? event.descriptionMn
      : event.descriptionEn;


  const imageAlt =
    lang === "mn"
      ? event.coverImageAltMn
      : event.coverImageAltEn;


  const imageSrc =
    event.coverImage ??
    "/landingpage.webp";


  const date =
    formatDate(
      event.startsAt,
      lang
    );


  const time =
    formatTime(
      event.startsAt,
      event.endsAt,
      lang
    );


  const googleMapsUrl =
    getGoogleMapsUrl(
      event.location
    );


  const registrationText =
    event.registerable
      ? event.registrationCost === 0
        ? copy.free
        : event.registrationCost !== null
          ? `$${(
              event.registrationCost /
              100
            ).toFixed(2)}`
          : null
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
              alt={
                imageAlt ??
                title
              }
              width={1280}
              height={720}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full border border-[#d8caa5]/70 bg-white object-contain"
            />

          </div>


          <div className="pt-1">

            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h1>


            <div className="mt-4 space-y-3 border-l-2 border-[#d8caa5] pl-4">

              <Info
                label={copy.date}
                value={date}
              />


              <Info
                label={copy.time}
                value={time}
              />


              {event.location && (

                <Info
                  label={copy.location}
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


            {event.registerable &&
            registrationText ? (

              <div className="mt-5">

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a7b26]">
                  {copy.registration}
                </p>

                <p className="mt-1 text-sm leading-6 text-[#4e593c]">
                  {registrationText}
                </p>

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

            <SectionTitle>
              {copy.about}
            </SectionTitle>

            <p className="mt-4 whitespace-pre-line text-[14px] leading-7 text-black/72">
              {description}
            </p>

          </div>


          {(
            event.contactEmail ||
            event.contactPhone ||
            googleMapsUrl
          ) && (

            <div className="mt-10">

              <SectionTitle>
                {copy.details}
              </SectionTitle>


              <div className="mt-3 space-y-3 text-sm leading-7 text-black/72">

                {event.contactEmail && (

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a7b26]">
                      {copy.email}
                    </p>

                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="text-[#8d7020] underline underline-offset-4 hover:text-[#27301d]"
                    >
                      {event.contactEmail}
                    </a>

                  </div>

                )}


                {event.contactPhone && (

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a7b26]">
                      {copy.phone}
                    </p>

                    <a
                      href={`tel:${event.contactPhone.replace(
                        /\s+/g,
                        ""
                      )}`}
                      className="text-[#8d7020] underline underline-offset-4 hover:text-[#27301d]"
                    >
                      {event.contactPhone}
                    </a>

                  </div>

                )}


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


function SectionTitle({
  children
}: {
  children: ReactNode;
}) {

  return (
    <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
      {children}
    </h2>
  );
}


function Info({
  label,
  value
}: {
  label: string;
  value: ReactNode;
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


export default memo(
  EventView
);