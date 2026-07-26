"use client";

import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  cubicBezier,
  motion,
  type Variants,
} from "framer-motion";

import { events } from "../../static_events";

/* =========================================================
   TYPES
========================================================= */

type Lang = "en" | "mn";

type EventsMainProps = {
  lang: Lang;
};

type UpcomingEventItem = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  time?: string;
  location?: string;
  href: string;
};

type EventsCopy = {
  title: string;

  upcoming: string;
  viewEvent: string;

  noEventsTitle: string;
  noEventsBody: string;
  noEventsLink: string;

  yearlyTitle: string;
  yearlyBody: string;

  naadamTitle: string;
  naadamBody: string;

  winterTitle: string;
  winterBody: string;

  galleryButton: string;
  volunteerButton: string;
  donateButton: string;
};

/* =========================================================
   COPY
========================================================= */

const COPY = {
  en: {
    title: "Upcoming Events",

    upcoming: "Upcoming",
    viewEvent: "View Event",

    noEventsTitle: "No upcoming events right now",
    noEventsBody:
      "Nothing is currently scheduled, but we hold community events throughout the year. Read more below about the celebrations we usually organize.",
    noEventsLink: "See what we usually do",

    yearlyTitle: "Events throughout the year",

    yearlyBody:
      "Etugen Mongols brings the community together throughout the year through a small number of recurring celebrations and gatherings. These events are opportunities to reconnect, celebrate Mongolian culture, and spend time together as a community.",

    naadamTitle: "Summer Naadam",
    naadamBody:
      "Each summer, usually around early to mid-July, we organize a Naadam celebration for the community. It is a chance for families and friends to gather, celebrate Mongolian culture, and take part in a tradition that remains an important part of Mongolian identity.",

    winterTitle: "Winter & Christmas gatherings",
    winterBody:
      "During the winter, we also organize community parties and occasional Christmas celebrations. These gatherings are more relaxed and social, giving families and community members another chance to meet, celebrate together, and stay connected through the colder months.",

    galleryButton: "Browse Past Events",
    volunteerButton: "Volunteer With Us",
    donateButton: "Support Our Events",
  },

  mn: {
    title: "Удахгүй болох арга хэмжээ",

    upcoming: "Удахгүй",
    viewEvent: "Арга хэмжээг үзэх",

    noEventsTitle: "Одоогоор удахгүй болох арга хэмжээ алга",
    noEventsBody:
      "Одоогоор товлогдсон арга хэмжээ байхгүй байна. Гэхдээ бид жилийн турш олон нийтийн арга хэмжээ зохион байгуулдаг. Доорх хэсгээс бидний тогтмол зохион байгуулдаг баяр, уулзалтуудын талаар уншина уу.",
    noEventsLink: "Бидний тогтмол арга хэмжээг үзэх",

    yearlyTitle: "Жилийн турш зохион байгуулдаг арга хэмжээнүүд",

    yearlyBody:
      "Etugen Mongols нь жилийн турш цөөн хэдэн тогтмол баяр, уулзалтаар дамжуулан олон нийтийг нэгтгэдэг. Эдгээр арга хэмжээ нь хүмүүс дахин уулзах, Монголын соёлоо тэмдэглэх, хамтдаа цагийг өнгөрөөх боломж болдог.",

    naadamTitle: "Зуны Наадам",
    naadamBody:
      "Жил бүрийн зун, ихэвчлэн долдугаар сарын эхэн болон дунд үеэр бид олон нийтэд зориулсан Наадмын баяр зохион байгуулдаг. Энэ нь гэр бүл, найз нөхөдтэйгээ уулзаж, Монголын соёлоо тэмдэглэн, Монголын үнэт уламжлалыг хамтдаа хуваалцах боломж юм.",

    winterTitle: "Өвлийн болон Зул сарын уулзалтууд",
    winterBody:
      "Өвлийн улиралд бид олон нийтийн үдэшлэг болон зарим Зул сарын баярын уулзалтуудыг зохион байгуулдаг. Эдгээр нь илүү тайван, нийгмийн шинжтэй арга хэмжээ бөгөөд гэр бүл, олон нийтийн гишүүд дахин уулзаж, хамтдаа баярлах боломж болдог.",

    galleryButton: "Өмнөх арга хэмжээнүүд",
    volunteerButton: "Сайн дурын ажилтан болох",
    donateButton: "Арга хэмжээг дэмжих",
  },
} as const satisfies Record<Lang, EventsCopy>;

/* =========================================================
   MOTION
========================================================= */

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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

/* =========================================================
   HELPERS
========================================================= */

function getEventImage(event: (typeof events)[number]) {
  return event.coverImage.lowRes || event.coverImage.highRes;
}

/* =========================================================
   MAIN
========================================================= */

function EventsMain({ lang }: EventsMainProps) {
  const safeLang: Lang =
    lang === "en" || lang === "mn" ? lang : "en";

  const copy = COPY[safeLang];

  const upcomingEvents = useMemo<UpcomingEventItem[]>(
    () =>
      events
        .filter((event) => event.status === "upcoming")
        .map((event) => ({
          id: event.id,
          title: event.title[safeLang],
          imageSrc: getEventImage(event),
          imageAlt: event.coverImage.alt[safeLang],
          date: event.date,
          time: event.upcoming?.time,
          location: event.location,
          href: `/events/${event.id}`,
        })),
    [safeLang],
  );

  return (
    <main className="min-h-screen bg-[#f6f0df] text-[#27301d]">
      {/* =====================================================
          UPCOMING EVENTS
      ===================================================== */}

      <section className="relative min-h-[76vh] overflow-hidden px-6 pb-12 pt-28 md:px-10 md:pb-14 md:pt-32 lg:px-12">
        <img
          src="/landingpage.webp"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Neutral darkening only */}
        <div className="absolute inset-0 bg-black/44" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/38" />

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-7xl"
        >
          <h1 className="text-3xl font-normal tracking-tight text-[#fffaf0] sm:text-4xl md:text-5xl">
            {copy.title}
          </h1>

          <div className="mt-8">
            {upcomingEvents.length > 0 ? (
              <div
                className="
                  flex gap-6
                  overflow-x-auto
                  pb-3
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {upcomingEvents.map((event, index) => (
                  <UpcomingEventCard
                    key={event.id}
                    event={event}
                    copy={copy}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <EmptyUpcoming copy={copy} />
            )}
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          YEARLY EVENTS / ABOUT
      ===================================================== */}

      <section
        id="yearly-events"
        className="border-t border-[#27301d]/8 bg-[#f6f0df]"
      >
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20 lg:px-12"
        >
          {/* Intro */}

          <div className="max-w-3xl">
            <h2 className="text-2xl font-normal leading-tight tracking-tight md:text-3xl">
              {copy.yearlyTitle}
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-[#4e593c] md:text-base">
              {copy.yearlyBody}
            </p>
          </div>

          {/* Actual recurring events */}

          <div className="mt-12 max-w-3xl space-y-10">
            <YearlyEvent
              title={copy.naadamTitle}
              body={copy.naadamBody}
            />

            <YearlyEvent
              title={copy.winterTitle}
              body={copy.winterBody}
            />
          </div>

          {/* Simple actions */}

          <div className="mt-14 flex flex-wrap gap-x-7 gap-y-4 border-t border-[#27301d]/12 pt-8">
            <SimpleAction
              to="/gallery"
              label={copy.galleryButton}
            />

            <SimpleAction
              to="/volunteer"
              label={copy.volunteerButton}
            />

            <SimpleAction
              to="/donate"
              label={copy.donateButton}
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* =========================================================
   EVENT CARD
========================================================= */

const UpcomingEventCard = memo(
  function UpcomingEventCard({
    event,
    copy,
    index,
  }: {
    event: UpcomingEventItem;
    copy: EventsCopy;
    index: number;
  }) {
    return (
      <Link
        to={event.href}
        aria-label={`${copy.viewEvent}: ${event.title}`}
        className="
          group
          relative
          block

          aspect-[1.1/1]
          w-[min(84vw,27rem)]
          shrink-0

          overflow-hidden

          bg-[#27301d]

          shadow-[0_16px_42px_rgba(0,0,0,0.23)]

          transition
          duration-300

          hover:-translate-y-1
          hover:shadow-[0_22px_52px_rgba(0,0,0,0.29)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#fffaf0]
          focus-visible:ring-offset-4
          focus-visible:ring-offset-transparent

          sm:w-[28rem]
          md:w-[29rem]
        "
      >
        <img
          src={event.imageSrc}
          alt={event.imageAlt}
          width={900}
          height={820}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={
            index === 0 ? "high" : "auto"
          }
          className="
            absolute inset-0
            h-full w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.025]
          "
        />

        <div className="absolute inset-0 bg-black/16" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/18 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 text-[#fffaf0] sm:p-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#eee0b7]">
            {copy.upcoming}
          </p>

          <h2 className="mt-2 max-w-[23rem] text-2xl font-normal leading-tight tracking-tight">
            {event.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] leading-5 text-[#fffaf0]/84">
            <span className="font-medium">
              {event.date}
            </span>

            {event.time && (
              <span>{event.time}</span>
            )}

            {event.location && (
              <span>{event.location}</span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#fffaf0]">
            {copy.viewEvent}

            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    );
  },
);

/* =========================================================
   NO UPCOMING EVENTS
========================================================= */

function EmptyUpcoming({
  copy,
}: {
  copy: EventsCopy;
}) {
  return (
    <div
      className="
        max-w-lg
        bg-[#fffaf0]/94
        px-6 py-6
        text-[#27301d]
        shadow-[0_14px_36px_rgba(0,0,0,0.18)]
        backdrop-blur-sm
      "
    >
      <h2 className="text-xl font-normal leading-tight">
        {copy.noEventsTitle}
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#4e593c]">
        {copy.noEventsBody}
      </p>

      <a
        href="#yearly-events"
        className="
          group
          mt-5
          inline-flex
          items-center
          gap-2
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-[#596645]
          transition-colors
          hover:text-[#27301d]
        "
      >
        {copy.noEventsLink}

        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-y-0.5"
        >
          ↓
        </span>
      </a>
    </div>
  );
}

/* =========================================================
   YEARLY EVENT TEXT
========================================================= */

function YearlyEvent({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article>
      <h3 className="text-xl font-normal leading-tight md:text-2xl">
        {title}
      </h3>

      <p className="mt-3 text-[15px] leading-8 text-[#4e593c] md:text-base">
        {body}
      </p>
    </article>
  );
}

/* =========================================================
   SIMPLE ACTION LINKS
========================================================= */

function SimpleAction({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="
        group
        inline-flex
        items-center
        gap-2
        text-xs
        font-semibold
        uppercase
        tracking-[0.12em]
        text-[#596645]
        transition-colors
        hover:text-[#27301d]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#596645]/30
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[#f6f0df]
      "
    >
      {label}

      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

export default memo(EventsMain);