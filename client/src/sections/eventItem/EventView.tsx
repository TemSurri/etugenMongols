"use client";

import {
  memo,
  type ReactNode
} from "react";

import {
  Link
} from "react-router-dom";

import {
  cubicBezier,
  motion,
  type Variants
} from "framer-motion";

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

  date: string;
  time: string;
  location: string;

  maps: string;

  registration: string;
  register: string;
  free: string;
  unavailable: string;
};


const COPY = {

  en: {
    back: "Back to Events",

    about: "About",

    date: "Date",
    time: "Time",
    location: "Location",

    maps: "Open in Google Maps",

    registration: "Registration",
    register: "Register",
    free: "Free",

    unavailable:
      "This event is not currently available for registration.",
  },

  mn: {
    back:
      "Арга хэмжээнүүд рүү буцах",

    about: "Тухай",

    date: "Огноо",
    time: "Цаг",
    location: "Байршил",

    maps:
      "Google Maps дээр нээх",

    registration: "Бүртгэл",
    register: "Бүртгүүлэх",
    free: "Үнэгүй",

    unavailable:
      "Энэ арга хэмжээнд одоогоор бүртгүүлэх боломжгүй байна.",
  },

} as const satisfies Record<
  Lang,
  EventViewCopy
>;


const easeOut =
  cubicBezier(
    0.22,
    1,
    0.36,
    1
  );


const containerMotion: Variants = {

  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};


const itemMotion: Variants = {

  hidden: {
    opacity: 0,
    y: 16,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: easeOut,
    },
  },
};


const softItemMotion: Variants = {

  hidden: {
    opacity: 0,
    y: 10,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
};


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


  const backgroundImage =
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
    <main
      className="
        min-h-screen
        bg-white
        text-[#27301d]
      "
    >

      <section
        className="
          relative
          min-h-[620px]
          overflow-hidden
          bg-[#182010]
        "
      >

        <motion.img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}

          initial={{
            opacity: 0,
            scale: 1.025,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.9,
            ease: easeOut,
          }}

          className="
            absolute
            inset-0
            h-full
            w-full
            select-none
            object-cover
            object-center
            saturate-[1.03]
            contrast-[1.03]
          "
        />


        <motion.div
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.7,
            ease: easeOut,
          }}

          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#11180c]/68
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-linear-to-b
            from-black/20
            via-black/5
            to-black/45
          "
        />


        <motion.div
          variants={
            containerMotion
          }

          initial="hidden"

          animate="show"

          className="
            relative
            z-10
            mx-auto
            max-w-5xl
            px-5
            pb-20
            pt-36
            sm:px-6
            md:pt-40
            lg:px-8
          "
        >

          <motion.div
            variants={
              itemMotion
            }
          >

            <Link
              to="/events"
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/70
                transition-colors
                hover:text-white
              "
            >
              ← {copy.back}
            </Link>

          </motion.div>


          <div
            className="
              mt-10
              max-w-3xl
            "
          >

            <motion.h1
              variants={
                itemMotion
              }

              className="
                text-4xl
                font-semibold
                leading-tight
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              {title}
            </motion.h1>


            <motion.div
              variants={
                itemMotion
              }

              className="
                mt-8
                max-w-2xl
                border-l-2
                border-white/30
                pl-5
                sm:pl-6
              "
            >

              <motion.div
                variants={
                  containerMotion
                }

                className="
                  grid
                  gap-x-10
                  gap-y-5
                  sm:grid-cols-2
                "
              >

                <motion.div
                  variants={
                    softItemMotion
                  }
                >

                  <Info
                    label={copy.date}
                    value={date}
                  />

                </motion.div>


                <motion.div
                  variants={
                    softItemMotion
                  }
                >

                  <Info
                    label={copy.time}
                    value={time}
                  />

                </motion.div>

              </motion.div>


              {event.location && (

                <motion.div
                  variants={
                    softItemMotion
                  }

                  className="
                    mt-5
                  "
                >

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
                              className="
                                mt-1
                                inline-block
                                text-[#e0c56f]
                                underline
                                underline-offset-4
                                transition-colors
                                hover:text-white
                              "
                            >
                              {copy.maps} →
                            </a>
                          </>
                        )}

                      </>
                    }
                  />

                </motion.div>

              )}


              {event.registerable &&
              registrationText ? (

                <motion.div
                  variants={
                    softItemMotion
                  }

                  className="
                    mt-7
                    flex
                    items-end
                    justify-between
                    gap-6
                    border-t
                    border-white/15
                    pt-5
                  "
                >

                  <div>

                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#d8bd63]
                      "
                    >
                      {copy.registration}
                    </p>


                    <p
                      className="
                        mt-1
                        text-xl
                        font-semibold
                        text-white
                      "
                    >
                      {registrationText}
                    </p>

                  </div>


                  <motion.div
                    whileHover={{
                      y: -2,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    transition={{
                      duration: 0.16,
                    }}
                  >

                    <Link
                      to={
                        `/events/${event.slug}/register`
                      }

                      className="
                        inline-flex
                        shrink-0
                        items-center
                        justify-center
                        bg-[#f7f7f4]
                        px-7
                        py-3.5
                        text-sm
                        font-medium
                        text-[#27301d]
                        transition-colors
                        duration-150
                        hover:bg-white
                      "
                    >
                      {copy.register}
                    </Link>

                  </motion.div>

                </motion.div>

              ) : (

                <motion.div
                  variants={
                    softItemMotion
                  }

                  className="
                    mt-7
                    border-t
                    border-white/15
                    pt-5
                  "
                >

                  <p
                    className="
                      text-sm
                      leading-6
                      text-white/70
                    "
                  >
                    {copy.unavailable}
                  </p>

                </motion.div>

              )}

            </motion.div>

          </div>

        </motion.div>

      </section>


      <motion.section
        initial={{
          opacity: 0,
          y: 18,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
          amount: 0.2,
        }}

        transition={{
          duration: 0.55,
          ease: easeOut,
        }}

        className="
          bg-white
        "
      >

        <div
          className="
            mx-auto
            max-w-5xl
            px-5
            py-14
            sm:px-6
            lg:px-8
            lg:py-16
          "
        >

          <div
            className="
              max-w-3xl
            "
          >

            <SectionTitle>
              {copy.about}
            </SectionTitle>


            <p
              className="
                mt-4
                whitespace-pre-line
                text-[14px]
                leading-7
                text-black/72
              "
            >
              {description}
            </p>

          </div>

        </div>

      </motion.section>

    </main>
  );
}


function SectionTitle({
  children
}: {
  children: ReactNode;
}) {

  return (
    <h2
      className="
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.22em]
        text-[#9a7b26]
      "
    >
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

      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.16em]
          text-[#d8bd63]
        "
      >
        {label}
      </p>


      <div
        className="
          mt-1
          text-[15px]
          font-medium
          leading-6
          text-white
        "
      >
        {value}
      </div>

    </div>
  );
}


export default memo(
  EventView
);