"use client";

import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type VolunteerProps = {
  lang: Lang;
};

type VolunteerListing = {
  id: string;
  eventTitle: Record<Lang, string>;
  role: Record<Lang, string>;
  description: Record<Lang, string>;
  date: string;
  href: string;
};

const EXAMPLE_LISTINGS: VolunteerListing[] = [
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
      en: "Help with tables, decorations, guest flow, and general event setup before the celebration begins.",
      mn: "Арга хэмжээ эхлэхээс өмнө ширээ, чимэглэл, зочдын чиглүүлэлт болон ерөнхий бэлтгэлд туслах.",
    },
    date: "Summer 2026",
    href: "/events",
  },
  {
    id: "media-support",
    eventTitle: {
      en: "Cultural Performance Day",
      mn: "Соёлын тоглолтын өдөр",
    },
    role: {
      en: "Photo and Media Helper",
      mn: "Зураг, медиа туслах",
    },
    description: {
      en: "Support the media team by capturing moments, helping organize photos, or assisting with short video clips.",
      mn: "Зураг авах, зураг зохион байгуулах, богино бичлэг хийхэд медиа багт туслах.",
    },
    date: "Upcoming",
    href: "/events",
  },
];

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

const COPY = {
  en: {
    eyebrow: "Get Involved",
    title: "Volunteer With Us",
    body:
      "Support Etugen Mongols by helping with events, cultural programs, setup, coordination, media, and community outreach.",
    secondary: "View Openings",
    listingsTitle: "Current Volunteer Openings",
    listingsIntro:
      "These are current or upcoming ways to support community events through volunteering.",
    noListings: "No help is needed right now. Please check back later.",
    viewEvent: "View Event",
  },
  mn: {
    eyebrow: "Оролцох",
    title: "Сайн дурын ажилтан болох",
    body:
      "Арга хэмжээ, соёлын хөтөлбөр, зохион байгуулалт, зураг бичлэг, олон нийттэй харилцах ажилд бидэнтэй хамтран оролцоорой.",
    secondary: "Боломжуудыг үзэх",
    listingsTitle: "Одоогийн сайн дурын боломжууд",
    listingsIntro:
      "Одоогийн болон удахгүй болох арга хэмжээнд сайн дураар туслах боломжууд.",
    noListings: "Одоогоор тусламж шаардлагатай арга хэмжээ байхгүй байна.",
    viewEvent: "Арга хэмжээг үзэх",
  },
} as const;

function Volunteer({ lang }: VolunteerProps) {
  const copy = COPY[lang];
  const listings = EXAMPLE_LISTINGS;

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <section className="relative min-h-screen overflow-hidden bg-[#2f3320]">
        <img
          src="/about/founding-group.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/46" />
        <div className="absolute inset-0 bg-linear-to-r from-black/78 via-black/44 to-black/16" />
        <div className="absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/66" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-28 md:px-10 lg:px-12 lg:pt-32">
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="show"
            className="max-w-3xl text-[#fffaf0]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#f3ead2] md:text-base md:leading-8">
              {copy.body}
            </p>

            <a
              href="#volunteer-listings"
              className="mt-8 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
            >
              {copy.secondary}
              <span className="ml-3">↓</span>
            </a>
          </motion.div>
        </div>
      </section>

      <section
        id="volunteer-listings"
        className="relative scroll-mt-0 overflow-hidden bg-[#fffaf0] px-6 py-20 md:px-10"
      >
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {copy.listingsTitle}
              </h2>
            </div>

            <p className="max-w-2xl text-[15px] leading-8 text-[#4e593c] lg:justify-self-end">
              {listings.length > 0 ? copy.listingsIntro : copy.noListings}
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mt-12 grid gap-5">
              {listings.map((listing) => (
                <article
                  key={listing.id}
                  className="grid gap-6 bg-[#fffaf0] p-6 shadow-[0_16px_44px_rgba(39,48,29,0.10)] md:grid-cols-[0.28fr_1fr_auto] md:items-center md:p-7"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
                      {listing.date}
                    </p>

                    <p className="mt-3 text-sm font-semibold leading-6 text-[#4e593c]">
                      {listing.eventTitle[lang]}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold leading-tight text-[#27301d]">
                      {listing.role[lang]}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4e593c]">
                      {listing.description[lang]}
                    </p>
                  </div>

                  <Link
                    to={listing.href}
                    className="inline-flex justify-center bg-[#27301d] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
                  >
                    {copy.viewEvent}
                    <span className="ml-3">→</span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 bg-[#fffaf0] p-6 shadow-[0_16px_44px_rgba(39,48,29,0.10)]">
              <p className="text-base leading-8 text-[#4e593c]">
                {copy.noListings}
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </section>
  );
}

export default Volunteer;