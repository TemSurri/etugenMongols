"use client";

import {
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
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

type SlideshowImage = {
  id: string;
  src: string;
  alt: string;
};

type EventsCopy = {
  eyebrow: string;
  title: string;

  viewEvent: string;
  noEvents: string;

  slideshowEyebrow: string;
  slideshowTitle: string;
  slideshowButton: string;

  yearlyEyebrow: string;
  yearlyTitle: string;
  yearlyBody: string;

  naadamTitle: string;
  naadamBefore: string;
  naadamLink: string;
  naadamAfter: string;

  winterTitle: string;
  winterBody: string;

  performancesTitle: string;
  performancesBody: string;

  involvedTitle: string;
  involvedBody: string;

  volunteerButton: string;
  donateButton: string;
};

/* =========================================================
   CONFIG
========================================================= */

const IMAGES = {
  fallback: "/landingpage.webp",
  community: "/impact/culture/1.webp",
} as const;

const SLIDESHOW_INTERVAL = 5000;

/* =========================================================
   COPY
========================================================= */

const COPY = {
  en: {
    eyebrow: "Events",
    title: "Upcoming Events",

    viewEvent: "View Event",

    noEvents:
      "There are currently no upcoming events planned.",

    slideshowEyebrow: "Past Events",
    slideshowTitle: "See what our events are like",
    slideshowButton: "Browse Past Events",

    yearlyEyebrow: "Throughout the Year",
    yearlyTitle: "What we regularly plan",

    yearlyBody:
      "Our events bring people together to celebrate Mongolian culture through traditions, performances, and shared community gatherings.",

    naadamTitle: "Summer Naadam",

    naadamBefore:
      "Around early to mid-July, we usually organize a community celebration of ",

    naadamLink: "Naadam",

    naadamAfter:
      ". Families and friends come together to celebrate Mongolian culture, tradition, community, and performance.",

    winterTitle: "Winter & Christmas gatherings",

    winterBody:
      "During the winter, we organize community parties and occasional Christmas celebrations where families can reconnect, celebrate together, and enjoy activities and performances prepared by members of the community.",

    performancesTitle: "Culture takes preparation",

    performancesBody:
      "Many of our events include cultural performances that take substantial preparation. Volunteers and performers spend time rehearsing dances, songs, presentations, decorations, and activities so each celebration can represent our culture with care.",

    involvedTitle: "Help make these events possible",

    involvedBody:
      "Volunteers help with rehearsals, preparation, setup, activities, welcoming guests, and event-day work. Donations help cover venues, food, supplies, cultural materials, and other event costs.",

    volunteerButton: "Volunteer With Us",
    donateButton: "Support Our Events",
  },

  mn: {
    eyebrow: "Арга хэмжээ",
    title: "Удахгүй болох арга хэмжээ",

    viewEvent: "Арга хэмжээг үзэх",

    noEvents:
      "Одоогоор удахгүй болох арга хэмжээ төлөвлөгдөөгүй байна.",

    slideshowEyebrow: "Өмнөх арга хэмжээнүүд",
    slideshowTitle: "Манай арга хэмжээнүүдтэй танилцаарай",
    slideshowButton: "Өмнөх арга хэмжээнүүд",

    yearlyEyebrow: "Жилийн турш",
    yearlyTitle: "Бидний тогтмол төлөвлөдөг арга хэмжээнүүд",

    yearlyBody:
      "Манай арга хэмжээнүүд хүмүүсийг нэгтгэж, Монголын соёл уламжлалыг баяр ёслол, тоглолт болон олон нийтийн уулзалтаар дамжуулан тэмдэглэхэд чиглэдэг.",

    naadamTitle: "Зуны Наадам",

    naadamBefore:
      "Ихэвчлэн долдугаар сарын эхэн болон дунд үеэр бид олон нийтэд зориулсан ",

    naadamLink: "Наадам",

    naadamAfter:
      " зохион байгуулдаг. Гэр бүл, найз нөхөд цуглан Монголын соёл, уламжлал, олон нийт болон тоглолтыг хамтдаа тэмдэглэдэг.",

    winterTitle: "Өвлийн болон Зул сарын уулзалтууд",

    winterBody:
      "Өвлийн улиралд бид олон нийтийн үдэшлэг болон зарим Зул сарын баярын уулзалтуудыг зохион байгуулдаг. Эдгээр нь гэр бүл, олон нийтийн гишүүд дахин уулзаж, хамтдаа баярлан, бэлтгэсэн тоглолт болон үйл ажиллагаанд оролцох боломж болдог.",

    performancesTitle: "Соёлын тоглолт бэлтгэл шаарддаг",

    performancesBody:
      "Манай олон арга хэмжээнд ихээхэн бэлтгэл шаарддаг соёлын тоглолт, үзүүлбэрүүд багтдаг. Сайн дурынхан болон оролцогчид бүжиг, дуу, үзүүлбэр, чимэглэл болон бусад үйл ажиллагааг урьдчилан давтаж, бэлтгэдэг.",

    involvedTitle: "Арга хэмжээг хамтдаа бүтээх",

    involvedBody:
      "Сайн дурынхан давтлага, бэлтгэл, тохижилт, үйл ажиллагаа, зочдыг угтах болон арга хэмжээний өдрийн ажилд тусалдаг. Хандив нь байр, хоол хүнс, хэрэгсэл, соёлын материал болон бусад зардлыг дэмждэг.",

    volunteerButton: "Сайн дурын ажилтан болох",
    donateButton: "Арга хэмжээг дэмжих",
  },
} as const satisfies Record<Lang, EventsCopy>;

/* =========================================================
   MOTION
========================================================= */

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const pageMotion: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const sectionMotion: Variants = {
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

const imageMotion: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      duration: 0.65,
      ease: easeOut,
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getEventImage(
  event: (typeof events)[number],
) {
  return (
    event.coverImage.lowRes ||
    event.coverImage.highRes ||
    IMAGES.fallback
  );
}

function getEventGridClass(count: number) {
  if (count === 1) {
    return "grid max-w-[22rem] grid-cols-1";
  }

  return "grid grid-cols-1 gap-4 sm:grid-cols-2";
}

/* =========================================================
   MAIN
========================================================= */

function EventsMain({ lang }: EventsMainProps) {
  const safeLang: Lang =
    lang === "mn" ? "mn" : "en";

  const copy = COPY[safeLang];

  const upcomingEvents =
    useMemo<UpcomingEventItem[]>(
      () =>
        events
          .filter(
            (event) =>
              event.status === "upcoming",
          )
          .map((event) => ({
            id: event.id,
            title: event.title[safeLang],
            imageSrc:
              getEventImage(event),
            imageAlt:
              event.coverImage.alt[
                safeLang
              ],
            date: event.date,
            time:
              event.upcoming?.time,
            location:
              event.location,
            href: `/events/${event.id}`,
          })),
      [safeLang],
    );

  const slideshowImages =
    useMemo<SlideshowImage[]>(
      () => {
        const images = events
          .filter(
            (event) =>
              event.status === "past",
          )
          .map((event) => ({
            id: event.id,
            src:
              getEventImage(event),
            alt:
              event.coverImage.alt[
                safeLang
              ],
          }));

        return images.length > 0
          ? images
          : [
              {
                id: "fallback",
                src: IMAGES.fallback,
                alt: "",
              },
            ];
      },
      [safeLang],
    );

  return (
    <main className="min-h-screen overflow-x-clip bg-[#303824] pt-15 lg:pt-20">
      <motion.div
        variants={pageMotion}
        initial="hidden"
        animate="show"
        className="
          grid
          min-h-screen

          lg:grid-cols-2
          lg:grid-rows-[clamp(640px,76vh,760px)_auto]
        "
      >
        {/* =================================================
            TOP LEFT — UPCOMING EVENTS
        ================================================= */}

        <motion.section
          variants={sectionMotion}
          className="
            order-1
            flex
            min-h-[560px]

            bg-[#fffaf0]

            px-6
            pb-14
            pt-38

            text-[#303824]

            sm:px-8
            sm:pb-16
            sm:pt-36

            md:px-10

            lg:h-full
            lg:min-h-0
            lg:items-center
            lg:px-14
            lg:pb-12
            lg:pt-24

            xl:px-20
          "
        >
          <div className="mx-auto w-full max-w-[680px]">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#8a7a45]
              "
            >
              {copy.eyebrow}
            </p>

            <h1
              className="
                mt-3

                text-3xl
                font-normal
                leading-[1.08]
                tracking-tight

                sm:text-4xl
                md:text-5xl
              "
            >
              {copy.title}
            </h1>

            {upcomingEvents.length > 0 ? (
              <div
                className={`
                  mt-8
                  ${getEventGridClass(
                    upcomingEvents.length,
                  )}
                `}
              >
                {upcomingEvents.map(
                  (event, index) => (
                    <UpcomingEventCard
                      key={event.id}
                      event={event}
                      copy={copy}
                      index={index}
                    />
                  ),
                )}
              </div>
            ) : (
              <EmptyUpcoming
                copy={copy}
              />
            )}
          </div>
        </motion.section>

        {/* =================================================
            TOP RIGHT — PAST EVENTS SLIDESHOW
        ================================================= */}

        <PastEventsSlideshow
          images={slideshowImages}
          copy={copy}
        />

        {/* =================================================
            BOTTOM LEFT — COMMUNITY IMAGE
        ================================================= */}

        <motion.section
          variants={imageMotion}
          className="
            order-4
            relative

            min-h-[380px]
            overflow-hidden

            sm:min-h-[460px]

            lg:order-3
            lg:min-h-full
          "
        >
          <img
            src={IMAGES.community}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="
              absolute
              inset-0

              h-full
              w-full

              object-cover
              object-center
            "
          />

          <div className="absolute inset-0 bg-black/8" />
        </motion.section>

        {/* =================================================
            BOTTOM RIGHT — EVENT INFORMATION
        ================================================= */}

        <motion.section
          variants={sectionMotion}
          className="
            order-3
            flex

            bg-[#303824]

            px-6
            py-16

            text-[#fffaf0]

            sm:px-8
            sm:py-20

            md:px-10

            lg:order-4
            lg:px-14
            lg:py-20

            xl:px-20
          "
        >
          <div className="mx-auto w-full max-w-[660px]">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#d6ba72]
              "
            >
              {copy.yearlyEyebrow}
            </p>

            <h2
              className="
                mt-3

                text-2xl
                font-normal
                leading-tight
                tracking-tight

                md:text-3xl
              "
            >
              {copy.yearlyTitle}
            </h2>

            <p
              className="
                mt-4
                max-w-xl

                text-sm
                leading-7
                text-[#d8d1bf]
              "
            >
              {copy.yearlyBody}
            </p>

            {/* =============================================
                REGULAR EVENTS
            ============================================= */}

            <div
              className="
                mt-7
                space-y-7

                border-t
                border-[#fffaf0]/15

                pt-7
              "
            >
              <article>
                <h3 className="text-lg font-normal leading-tight md:text-xl">
                  {copy.naadamTitle}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-xl

                    text-sm
                    leading-7
                    text-[#cfc8b5]
                  "
                >
                  {copy.naadamBefore}

                  <a
                    href="https://en.wikipedia.org/wiki/Naadam"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      font-medium
                      text-[#fffaf0]

                      underline
                      decoration-[#d6ba72]/60
                      underline-offset-4

                      transition-colors
                      hover:text-[#d6ba72]
                    "
                  >
                    {copy.naadamLink}
                  </a>

                  {copy.naadamAfter}
                </p>
              </article>

              <YearlyEvent
                title={
                  copy.winterTitle
                }
                body={
                  copy.winterBody
                }
              />

              <YearlyEvent
                title={
                  copy.performancesTitle
                }
                body={
                  copy.performancesBody
                }
              />
            </div>

            {/* =============================================
                GET INVOLVED
            ============================================= */}

            <div
              className="
                mt-7

                border-t
                border-[#fffaf0]/15

                pt-7
              "
            >
              <h3 className="text-lg font-normal leading-tight md:text-xl">
                {copy.involvedTitle}
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl

                  text-sm
                  leading-7
                  text-[#cfc8b5]
                "
              >
                {copy.involvedBody}
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-x-7
                  gap-y-4
                "
              >
                <DarkAction
                  to="/volunteer"
                  label={
                    copy.volunteerButton
                  }
                />

                <DarkAction
                  to="/donate"
                  label={
                    copy.donateButton
                  }
                />
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

/* =========================================================
   UPCOMING EVENT CARD
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

          aspect-square
          w-full

          overflow-hidden
          bg-[#303824]

          transition
          duration-300

          hover:-translate-y-1
          hover:shadow-[0_16px_38px_rgba(48,56,36,0.16)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#687255]/40
        "
      >
        <img
          src={event.imageSrc}
          alt={event.imageAlt}
          width={760}
          height={760}
          loading={
            index === 0
              ? "eager"
              : "lazy"
          }
          decoding="async"
          fetchPriority={
            index === 0
              ? "high"
              : "auto"
          }
          className="
            absolute
            inset-0

            h-full
            w-full
            object-cover

            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.025]
          "
        />

        <div className="absolute inset-0 bg-black/12" />

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/88
            via-black/15
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0

            p-5
            text-[#fffaf0]

            sm:p-6
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              leading-5
              text-[#eee0b7]
            "
          >
            {event.date}

            {event.time && (
              <>
                <span className="mx-2 text-[#eee0b7]/45">
                  ·
                </span>

                {event.time}
              </>
            )}
          </p>

          <h2
            className="
              mt-2
              line-clamp-2

              text-xl
              font-normal
              leading-tight
              tracking-tight

              sm:text-2xl
            "
          >
            {event.title}
          </h2>

          {event.location && (
            <p
              className="
                mt-2
                line-clamp-1

                text-[11px]
                leading-5
                text-[#fffaf0]/72
              "
            >
              {event.location}
            </p>
          )}

          <p
            className="
              mt-4
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
            "
          >
            {copy.viewEvent}

            <span
              aria-hidden="true"
              className="
                ml-2
                inline-block

                transition-transform
                duration-200

                group-hover:translate-x-1
              "
            >
              →
            </span>
          </p>
        </div>
      </Link>
    );
  },
);

/* =========================================================
   PAST EVENT SLIDESHOW
========================================================= */

const PastEventsSlideshow = memo(
  function PastEventsSlideshow({
    images,
    copy,
  }: {
    images: SlideshowImage[];
    copy: EventsCopy;
  }) {
    const [
      activeIndex,
      setActiveIndex,
    ] = useState(0);

    useEffect(() => {
      if (images.length <= 1) {
        return;
      }

      const timer =
        window.setInterval(() => {
          setActiveIndex(
            (current) =>
              (current + 1) %
              images.length,
          );
        }, SLIDESHOW_INTERVAL);

      return () => {
        window.clearInterval(timer);
      };
    }, [images.length]);

    useEffect(() => {
      if (
        activeIndex >= images.length
      ) {
        setActiveIndex(0);
      }
    }, [
      activeIndex,
      images.length,
    ]);

    const activeImage =
      images[activeIndex];

    if (!activeImage) {
      return null;
    }

    return (
      <motion.section
        variants={imageMotion}
        className="
          order-2
          relative

          min-h-[420px]
          overflow-hidden

          sm:min-h-[500px]

          lg:h-full
          lg:min-h-0
        "
      >
        <AnimatePresence
          mode="sync"
          initial={false}
        >
          <motion.img
            key={activeImage.id}
            src={activeImage.src}
            alt={activeImage.alt}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.65,
              ease: easeOut,
            }}
            className="
              absolute
              inset-0

              h-full
              w-full

              object-cover
              object-center
            "
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/14" />

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/70
            via-transparent
            to-black/8
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0

            p-8
            text-[#fffaf0]

            sm:p-10
            lg:p-12
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#eee0b7]
            "
          >
            {copy.slideshowEyebrow}
          </p>

          <h2
            className="
              mt-3
              max-w-lg

              text-2xl
              font-normal
              leading-tight
              tracking-tight

              md:text-3xl
            "
          >
            {copy.slideshowTitle}
          </h2>

          <Link
            to="/gallery"
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

              text-[#fffaf0]

              transition-colors
              hover:text-[#eee0b7]
            "
          >
            {copy.slideshowButton}

            <span
              aria-hidden="true"
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>

          {images.length > 1 && (
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-2
              "
              aria-label="Past event photos"
            >
              {images.map(
                (image, index) => {
                  const active =
                    index ===
                    activeIndex;

                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() =>
                        setActiveIndex(
                          index,
                        )
                      }
                      aria-label={`Show photo ${
                        index + 1
                      }`}
                      aria-pressed={
                        active
                      }
                      className={[
                        `
                          h-1
                          border-0
                          p-0

                          transition-all
                          duration-300

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#fffaf0]
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-transparent
                        `,

                        active
                          ? "w-9 bg-[#fffaf0]"
                          : `
                            w-5
                            bg-[#fffaf0]/40
                            hover:bg-[#fffaf0]/75
                          `,
                      ].join(" ")}
                    />
                  );
                },
              )}
            </div>
          )}
        </div>
      </motion.section>
    );
  },
);

/* =========================================================
   EMPTY UPCOMING
========================================================= */

function EmptyUpcoming({
  copy,
}: {
  copy: EventsCopy;
}) {
  return (
    <p
      className="
        mt-8
        max-w-lg

        text-[15px]
        leading-7
        text-[#59604d]
      "
    >
      {copy.noEvents}
    </p>
  );
}

/* =========================================================
   YEARLY EVENT
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
      <h3 className="text-lg font-normal leading-tight md:text-xl">
        {title}
      </h3>

      <p
        className="
          mt-3
          max-w-xl

          text-sm
          leading-7
          text-[#cfc8b5]
        "
      >
        {body}
      </p>
    </article>
  );
}

/* =========================================================
   ACTION
========================================================= */

function DarkAction({
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

        text-[10px]
        font-semibold
        uppercase
        tracking-[0.14em]

        text-[#fffaf0]

        transition-colors
        hover:text-[#d6ba72]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#fffaf0]/50
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[#303824]
      "
    >
      {label}

      <span
        aria-hidden="true"
        className="
          transition-transform
          duration-200
          group-hover:translate-x-1
        "
      >
        →
      </span>
    </Link>
  );
}

export default memo(EventsMain);