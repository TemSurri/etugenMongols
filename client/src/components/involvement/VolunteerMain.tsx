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

const COPY = {
  en: {
    imageTitle: "Volunteer",

    heading: "Get involved",

    body:
      "Volunteers play an important role in helping Etugen Mongols bring community events and cultural activities to life. Opportunities may include preparing event spaces, welcoming guests, supporting performers, helping with activities, documenting important moments, and assisting with general coordination. Whether you can offer a few hours or contribute a particular skill, your support helps make each gathering more organized, welcoming, and meaningful for the community.",

    listingsTitle: "Current opportunities",

    noListings:
      "There are no volunteer opportunities available right now. New roles will be posted here when support is needed.",

    viewEvent: "View event",
  },

  mn: {
    imageTitle: "Сайн дурын ажил",

    heading: "Бидэнтэй нэгдээрэй",

    body:
      "Сайн дурын ажилтнууд Этүгэн Монголчуудын олон нийтийн арга хэмжээ болон соёлын үйл ажиллагааг зохион байгуулахад чухал үүрэг гүйцэтгэдэг. Арга хэмжээний орчныг бэлтгэх, зочдыг угтах, оролцогчдыг дэмжих, үйл ажиллагаанд туслах, чухал мөчүүдийг баримтжуулах болон ерөнхий зохицуулалтад оролцох зэрэг боломжууд байж болно. Та хэдхэн цагийн турш туслах эсвэл өөрийн тодорхой ур чадвараар хувь нэмэр оруулах боломжтой бөгөөд таны дэмжлэг арга хэмжээ бүрийг илүү зохион байгуулалттай, тав тухтай, утга учиртай болгоход тусална.",

    listingsTitle: "Одоогийн боломжууд",

    noListings:
      "Одоогоор сайн дурын ажлын боломж байхгүй байна. Тусламж хэрэгтэй үед шинэ боломжуудыг энд нийтэлнэ.",

    viewEvent: "Арга хэмжээг үзэх",
  },
} as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const imageMotion: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.65,
      ease: easeOut,
    },
  },
};

function Volunteer({ lang }: VolunteerProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = COPY[safeLang];
  const listings = VOLUNTEER_LISTINGS;

  return (
    <main className="min-h-screen overflow-visible bg-[#27301d] text-[#fffaf0]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16 lg:px-12 lg:py-32">
        <motion.aside
          variants={imageMotion}
          initial="hidden"
          animate="show"
          className="w-full max-w-[500px] self-start lg:sticky lg:top-32"
        >
          <div className="bg-[#fffaf0] p-4 text-[#27301d] shadow-[0_20px_55px_rgba(0,0,0,0.18)] sm:p-5">
            <h1 className="px-1 pb-4 text-4xl font-normal leading-none tracking-tight sm:text-5xl lg:text-6xl">
              {copy.imageTitle}
            </h1>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#39422c]">
              <img
                src="/about/founding-group.webp"
                alt={copy.imageTitle}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 via-black/15 to-transparent px-5 pb-5 pt-16">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#fffaf0]">
                  Etugen Mongols
                </p>
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.section
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <header className="max-w-2xl">
            <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {copy.heading}
            </h2>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#e7dfc8] md:text-base">
              {copy.body}
            </p>
          </header>

          <section className="mt-12">
            <h2 className="pb-5 text-xl font-normal md:text-2xl">
              {copy.listingsTitle}
            </h2>

            {listings.length > 0 ? (
              <div>
                {listings.map((listing) => (
                  <article
                    key={listing.id}
                    className="grid gap-5 border-b border-[#fffaf0]/20 py-7 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-7"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d5bd79]">
                        {listing.date[safeLang]}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#cfc7b2]">
                        {listing.eventTitle[safeLang]}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-normal leading-6 text-[#fffaf0]">
                        {listing.role[safeLang]}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#cfc7b2]">
                        {listing.description[safeLang]}
                      </p>
                    </div>

                    <Link
                      to={listing.href}
                      className="w-fit whitespace-nowrap border border-[#fffaf0]/50 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#fffaf0] no-underline transition-colors duration-200 hover:border-[#d5bd79] hover:bg-[#d5bd79] hover:text-[#27301d]"
                    >
                      {copy.viewEvent}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="border-b border-[#fffaf0]/20 py-7 text-sm leading-7 text-[#cfc7b2]">
                {copy.noListings}
              </p>
            )}
          </section>
        </motion.section>
      </div>
    </main>
  );
}

export default Volunteer;