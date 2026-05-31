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

const heroTextMotion: Variants = {
  hidden: { opacity: 0, x: -44 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const contentMotion: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const COPY = {
  en: {
    eyebrow: "Get Involved",
    title: "Volunteer With Us",
    body:
      "Support Etugen Mongols by helping with events, cultural programs, setup, coordination, media, and community outreach.",
    secondary: "View Events",
    listingsTitle: "Current Volunteer Openings",
    noListings: "No help is needed right now. Please check back later.",
    viewEvent: "View Event",
  },
  mn: {
    eyebrow: "Оролцох",
    title: "Сайн дурын ажилтан болох",
    body:
      "Арга хэмжээ, соёлын хөтөлбөр, зохион байгуулалт, зураг бичлэг, олон нийттэй харилцах ажилд бидэнтэй хамтран оролцоорой.",
    secondary: "Арга хэмжээнүүд",
    listingsTitle: "Одоогийн сайн дурын боломжууд",
    noListings: "Одоогоор тусламж шаардлагатай арга хэмжээ байхгүй байна.",
    viewEvent: "Арга хэмжээг үзэх",
  },
} as const;

export default function Volunteer({ lang }: VolunteerProps) {
  const copy = COPY[lang];
  const listings = EXAMPLE_LISTINGS;

  return (
    <section className="bg-[#f4ecd9] text-[#27301d]">
      <div className="relative min-h-[76vh] overflow-hidden bg-[#2f3320] pt-[7rem]">
        <img
          src="/about/founding-group.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/42" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/64 via-black/30 to-black/46" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f4ecd9] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(76vh-7rem)] max-w-7xl items-center px-5 pb-20 sm:px-6 md:px-10 lg:px-12">
          <motion.div
            variants={heroTextMotion}
            initial="hidden"
            animate="show"
            className="max-w-3xl transform-gpu"
          >
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d6b04c]">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/84 md:text-lg">
              {copy.body}
            </p>

            <Link
              to="/events"
              className="mt-8 inline-flex rounded-full border border-[#fffaf0]/45 px-6 py-3 text-sm font-semibold text-[#fffaf0] transition-colors hover:bg-[#fffaf0] hover:text-[#27301d]"
            >
              {copy.secondary}
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={contentMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-6 md:px-10"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b26]">
          {copy.eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {copy.listingsTitle}
        </h2>

        {listings.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {listings.map((listing) => (
              <article
                key={listing.id}
                className="rounded-md border border-[#d8caa5]/70 bg-[#fffaf0] p-5 shadow-[0_14px_38px_rgba(39,48,29,0.08)]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
                  {listing.date}
                </p>

                <h3 className="mt-3 text-xl font-semibold leading-tight">
                  {listing.role[lang]}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#4e593c]/80">
                  {listing.eventTitle[lang]}
                </p>

                <p className="mt-3 text-sm leading-7 text-[#4e593c]">
                  {listing.description[lang]}
                </p>

                <Link
                  to={listing.href}
                  className="mt-5 inline-flex rounded-sm border border-[#b39135]/55 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
                >
                  {copy.viewEvent} →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-[#d8caa5]/70 bg-[#fffaf0] p-6 shadow-[0_14px_38px_rgba(39,48,29,0.08)]">
            <p className="text-base leading-8 text-[#4e593c]">
              {copy.noListings}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}