"use client";

import { Link } from "react-router-dom";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type VolunteerProps = {
  lang: Lang;
};

type VolunteerListing = {
  id: string;
  eventTitle: Record<Lang, string>;
  role: Record<Lang, string>;
  description: Record<Lang, string>;
  date: Record<Lang, string>;
  href: string;
};

/* -------------------------------------------------------------------------- */
/*                                  Images                                    */
/* -------------------------------------------------------------------------- */

const VOLUNTEER_IMAGES = {
  top: "/impact/culture/1.webp",
  bottom: "/impact/youth/1.webp",
} as const;

/* -------------------------------------------------------------------------- */
/*                                  Colors                                    */
/* -------------------------------------------------------------------------- */

const COLORS = {
  background: "#303824",
  heading: "#fffaf0",
  body: "#e9e2d1",
  muted: "#cfc8b5",
  accent: "#d6ba72",
} as const;

/* -------------------------------------------------------------------------- */
/*                         Volunteer Opportunities                            */
/* -------------------------------------------------------------------------- */

const VOLUNTEER_LISTINGS: VolunteerListing[] = [
  {
    id: "naadam-setup",
    eventTitle: {
      en: "Naadam Community Celebration",
      mn: "Наадмын олон нийтийн баяр",
    },
    role: {
      en: "Setup and Event Support",
      mn: "Бэлтгэл болон арга хэмжээний тусламж",
    },
    description: {
      en: "Help prepare tables, decorations, guest areas, and event spaces before the celebration.",
      mn: "Баяр эхлэхээс өмнө ширээ, чимэглэл, зочдын хэсэг болон арга хэмжээний орчныг бэлтгэхэд тусална.",
    },
    date: {
      en: "Summer 2026",
      mn: "2026 оны зун",
    },
    href: "/events",
  },

  {
    id: "media-support",
    eventTitle: {
      en: "Cultural Performance Day",
      mn: "Соёлын тоглолтын өдөр",
    },
    role: {
      en: "Photo and Media Support",
      mn: "Зураг болон медиа тусламж",
    },
    description: {
      en: "Help document the event through photography, short videos, and basic media organization.",
      mn: "Арга хэмжээг зураг, богино бичлэг болон медиа материалын зохион байгуулалтаар баримтжуулахад тусална.",
    },
    date: {
      en: "Upcoming",
      mn: "Удахгүй",
    },
    href: "/events",
  },

  {
    id: "guest-support",
    eventTitle: {
      en: "Community Gathering",
      mn: "Олон нийтийн уулзалт",
    },
    role: {
      en: "Guest Welcome and Coordination",
      mn: "Зочин угтах болон зохицуулалт",
    },
    description: {
      en: "Welcome guests, provide directions, and help activities remain organized.",
      mn: "Зочдыг угтах, чиглэл өгөх болон үйл ажиллагааг зохион байгуулалттай явуулахад тусална.",
    },
    date: {
      en: "Date to be confirmed",
      mn: "Тов батлагдана",
    },
    href: "/events",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Copy                                     */
/* -------------------------------------------------------------------------- */

const COPY = {
  en: {
    heading: "Get involved",

    body:
      "Volunteers play an important role in helping Etugen Mongols bring community events and cultural activities to life. Opportunities may include preparing event spaces, welcoming guests, supporting performers, helping with activities, documenting important moments, and assisting with general coordination. Whether you can offer a few hours or contribute a particular skill, your support helps make each gathering more organized, welcoming, and meaningful for the community.",

    listingsTitle: "Current opportunities",

    noListings:
      "There are no volunteer opportunities available right now. New roles will be posted here when support is needed.",

    viewEvent: "View event",
  },

  mn: {
    heading: "Бидэнтэй нэгдээрэй",

    body:
      "Сайн дурын ажилтнууд Этүгэн Монголчуудын олон нийтийн арга хэмжээ болон соёлын үйл ажиллагааг зохион байгуулахад чухал үүрэг гүйцэтгэдэг. Арга хэмжээний орчныг бэлтгэх, зочдыг угтах, оролцогчдыг дэмжих, үйл ажиллагаанд туслах, чухал мөчүүдийг баримтжуулах болон ерөнхий зохицуулалтад оролцох зэрэг боломжууд байж болно. Та хэдхэн цагийн турш туслах эсвэл өөрийн тодорхой ур чадвараар хувь нэмэр оруулах боломжтой бөгөөд таны дэмжлэг арга хэмжээ бүрийг илүү зохион байгуулалттай, тав тухтай, утга учиртай болгоход тусална.",

    listingsTitle: "Одоогийн боломжууд",

    noListings:
      "Одоогоор сайн дурын ажлын боломж байхгүй байна. Тусламж хэрэгтэй үед шинэ боломжуудыг энд нийтэлнэ.",

    viewEvent: "Арга хэмжээг үзэх",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                                Animation                                   */
/* -------------------------------------------------------------------------- */

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const pageMotion: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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

const listMotion: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const listingMotion: Variants = {
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

const imageColumnMotion: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const imageMotion: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.015,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: easeOut,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                              Volunteer Page                                */
/* -------------------------------------------------------------------------- */

function Volunteer({ lang }: VolunteerProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = COPY[safeLang];

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.heading,
      }}
    >
      <motion.div
        variants={pageMotion}
        initial="hidden"
        animate="show"
        className="grid min-h-screen lg:grid-cols-[0.88fr_1.12fr]"
      >
        {/* ---------------------------------------------------------------- */}
        {/* Right Content                                                    */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={fadeUpMotion}
          className="
            order-1
            px-6
            pb-16
            pt-32
            sm:px-8
            sm:pb-20
            md:px-10
            md:pt-36
            lg:order-2
            lg:px-14
            lg:pb-28
            lg:pt-40
            xl:px-16
          "
          style={{
            backgroundColor: COLORS.background,
          }}
        >
          <div className="mx-auto w-full max-w-[760px]">
            {/* Intro */}
            <motion.header
              variants={fadeUpMotion}
              className="max-w-2xl"
            >
              <h1
                className="
                  text-3xl
                  font-normal
                  leading-[1.08]
                  tracking-tight
                  sm:text-4xl
                  md:text-5xl
                "
                style={{
                  color: COLORS.heading,
                }}
              >
                {copy.heading}
              </h1>

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-[15px]
                  leading-8
                  md:text-base
                "
                style={{
                  color: COLORS.body,
                }}
              >
                {copy.body}
              </p>
            </motion.header>

            {/* Opportunities */}
            <motion.section
              variants={fadeUpMotion}
              className="mt-11 md:mt-12"
            >
              <div className="border-b border-[#fffaf0]/12 pb-5">
                <h2
                  className="
                    text-xl
                    font-normal
                    tracking-tight
                    md:text-2xl
                  "
                  style={{
                    color: COLORS.heading,
                  }}
                >
                  {copy.listingsTitle}
                </h2>
              </div>

              {VOLUNTEER_LISTINGS.length > 0 ? (
                <motion.div
                  variants={listMotion}
                  initial="hidden"
                  animate="show"
                >
                  {VOLUNTEER_LISTINGS.map((listing) => (
                    <motion.article
                      key={listing.id}
                      variants={listingMotion}
                      className="
                        grid
                        gap-5
                        border-b
                        border-[#fffaf0]/12
                        py-7
                        md:grid-cols-[120px_1fr_auto]
                        md:items-start
                        md:gap-7
                      "
                    >
                      {/* Date / Event */}
                      <div>
                        <p
                          className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.2em]
                          "
                          style={{
                            color: COLORS.accent,
                          }}
                        >
                          {listing.date[safeLang]}
                        </p>

                        <p
                          className="
                            mt-2
                            text-xs
                            leading-5
                          "
                          style={{
                            color: COLORS.muted,
                          }}
                        >
                          {listing.eventTitle[safeLang]}
                        </p>
                      </div>

                      {/* Role */}
                      <div>
                        <h3
                          className="
                            text-lg
                            font-normal
                            leading-6
                            tracking-[-0.01em]
                          "
                          style={{
                            color: COLORS.heading,
                          }}
                        >
                          {listing.role[safeLang]}
                        </h3>

                        <p
                          className="
                            mt-2
                            max-w-xl
                            text-sm
                            leading-6
                          "
                          style={{
                            color: COLORS.muted,
                          }}
                        >
                          {listing.description[safeLang]}
                        </p>
                      </div>

                      {/* Link */}
                      <Link
                        to={listing.href}
                        className="
                          w-fit
                          whitespace-nowrap
                          border
                          border-[#fffaf0]/30
                          px-4
                          py-2
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.16em]
                          text-[#fffaf0]
                          no-underline
                          transition-colors
                          duration-200
                          hover:border-[#d6ba72]
                          hover:bg-[#d6ba72]
                          hover:text-[#303824]
                        "
                      >
                        {copy.viewEvent}
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  variants={listingMotion}
                  className="
                    border-b
                    border-[#fffaf0]/12
                    py-7
                    text-sm
                    leading-7
                  "
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  {copy.noListings}
                </motion.p>
              )}
            </motion.section>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Left Photos                                                      */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={imageColumnMotion}
          initial="hidden"
          animate="show"
          className="
            relative
            order-2
            overflow-hidden
            lg:order-1
          "
        >
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[760px]
              lg:h-full
              lg:max-w-none
            "
          >
            {/* Top Photo */}
            <motion.div
              variants={imageMotion}
              className="
                relative
                aspect-[16/10]
                w-full
                overflow-hidden
                lg:aspect-auto
                lg:h-1/2
              "
            >
              <img
                src={VOLUNTEER_IMAGES.top}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            </motion.div>

            {/* Bottom Photo */}
            <motion.div
              variants={imageMotion}
              className="
                relative
                aspect-[16/10]
                w-full
                overflow-hidden
                lg:aspect-auto
                lg:h-1/2
              "
            >
              <img
                src={VOLUNTEER_IMAGES.bottom}
                alt=""
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
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

export default Volunteer;