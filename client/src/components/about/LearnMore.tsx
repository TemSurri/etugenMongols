"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/landingpage.webp";

type Lang = "en" | "mn";

type LearnMoreProps = {
  lang: Lang;
};

const NAADAM_URL =
  "https://ich.unesco.org/en/RL/naadam-mongolian-traditional-festival-00395";

const LEARN_MORE_COPY = {
  en: {
    title: "Our Strategy",

    eventsTitle: "Events",
    eventsBodyStart:
      "Events are how we preserve and share Mongolian heritage in Calgary. Through cultural nights, holiday celebrations, community gatherings, and traditions like",
    eventsBodyEnd:
      "we create spaces where people can experience Mongolian food, music, dance, language, and culture together.",

    programsTitle: "Programs",
    programsBody:
      "Our long-term goal is to build consistent cultural programs connected to the traditions and activities already practiced within our events.",

    learnMore: "Learn More",
    viewEvents: "View Upcoming Events",
    viewPastEvents: "See Past Events",

    eventsLabel: "Community Events",
    programsLabel: "Future Programs",
  },

  mn: {
    title: "Бидний чиглэл",

    eventsTitle: "Арга хэмжээ",
    eventsBodyStart:
      "Арга хэмжээ нь Калгари дахь Монгол өв соёлоо хадгалах, түгээх гол арга зам юм. Соёлын үдэш, баяр ёслол, нийгэмлэгийн уулзалт болон",
    eventsBodyEnd:
      "зэрэг уламжлалаар дамжуулан хүмүүс Монгол хоол, хөгжим, бүжиг, хэл, соёлыг хамтдаа мэдэрдэг.",

    programsTitle: "Хөтөлбөрүүд",
    programsBody:
      "Бидний урт хугацааны зорилго бол арга хэмжээнүүд дээрээ хэрэгжүүлдэг уламжлал, үйл ажиллагаануудыг илүү тогтмол хөтөлбөр болгон хөгжүүлэх юм.",

    learnMore: "Дэлгэрэнгүй",
    viewEvents: "Удахгүй болох арга хэмжээ",
    viewPastEvents: "Өмнөх арга хэмжээнүүд",

    eventsLabel: "Нийгэмлэгийн арга хэмжээ",
    programsLabel: "Ирээдүйн хөтөлбөрүүд",
  },
} as const;

function LearnMore({ lang }: LearnMoreProps) {
  const copy = LEARN_MORE_COPY[lang];

  return (
    <section className="min-h-screen border-y border-[#d8caa5]/55 bg-linear-to-br from-[#ede1c7] via-[#f6eedc] to-[#d8caa5] pt-20 text-[#27301d]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-[3fr_2fr] md:px-10 lg:px-12">
        {/* LEFT */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#27301d] md:text-5xl">
            {copy.title}
          </h1>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#27301d] md:text-3xl">
              {copy.eventsTitle}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4e593c]/78 md:text-base md:leading-8">
              {copy.eventsBodyStart}{" "}
              <a
                href={NAADAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#9a7b26] underline decoration-[#b39135]/40 underline-offset-4 transition-colors hover:text-[#27301d]"
              >
                Naadam
              </a>
              , {copy.eventsBodyEnd}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col items-start gap-3">
              <Link
                to="/about/events"
                className="
                  inline-flex items-center
                  border border-[#b39135]/40
                  bg-[#fffaf0]/75
                  px-5 py-3
                  text-xs font-semibold uppercase tracking-[0.2em]
                  text-[#27301d]/88
                  transition-colors
                  hover:border-[#27301d]
                  hover:bg-[#27301d]
                  hover:text-[#fffaf0]
                "
              >
                {copy.learnMore}
                <span className="ml-3 text-base leading-none">→</span>
              </Link>

              <div className="flex flex-col gap-2 pl-1">
                <Link
                  to="/events"
                  className="
                    inline-flex items-center
                    text-xs font-semibold uppercase tracking-[0.18em]
                    text-[#6f571a]
                    transition-colors
                    hover:text-[#27301d]
                  "
                >
                  {copy.viewEvents}
                  <span className="ml-3">→</span>
                </Link>

                <Link
                  to="/gallery"
                  className="
                    inline-flex items-center
                    text-xs font-semibold uppercase tracking-[0.18em]
                    text-[#6f571a]
                    transition-colors
                    hover:text-[#27301d]
                  "
                >
                  {copy.viewPastEvents}
                  <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#27301d] md:text-3xl">
              {copy.programsTitle}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4e593c]/78 md:text-base md:leading-8">
              {copy.programsBody}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden gap-5 md:grid">
          {/* EVENTS GRID */}
          <div className="overflow-hidden border border-[#d8caa5]/65 bg-[#fffaf0]/65 shadow-[0_18px_48px_rgba(88,72,38,0.10)]">
            <div className="grid grid-cols-2 gap-[1px] bg-[#d8caa5]/60">
              <img
                src={landingImage}
                alt=""
                loading="eager"
                decoding="async"
                className="h-[18vh] w-full object-cover"
              />

              <img
                src={landingImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[18vh] w-full object-cover"
              />

              <img
                src={landingImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[18vh] w-full object-cover"
              />

              <img
                src={landingImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[18vh] w-full object-cover"
              />
            </div>

            <div className="border-t border-[#d8caa5]/60 bg-[#fffaf0]/88 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
                {copy.eventsLabel}
              </p>
            </div>
          </div>

          {/* PROGRAMS */}
          <div className="overflow-hidden border border-[#d8caa5]/65 bg-[#fffaf0]/65 shadow-[0_18px_48px_rgba(88,72,38,0.10)]">
            <img
              src={landingImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-[24vh] w-full object-cover grayscale-[10%]"
            />

            <div className="border-t border-[#d8caa5]/60 bg-[#fffaf0]/88 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
                {copy.programsLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(LearnMore);