"use client";

import { memo } from "react";
import { Link } from "react-router-dom";

type Lang = "en" | "mn";

type LearnMoreProps = {
  lang: Lang;
};

const NAADAM_URL =
  "https://ich.unesco.org/en/RL/naadam-mongolian-traditional-festival-00395";

const LEARN_MORE_COPY = {
  en: {
    back: "Back to About",
    title: "Our Strategy",
    events: {
      label: "Main Focus",
      title: "Events",
      bodyStart:
        "Events are how we preserve and share Mongolian heritage in Calgary. Through cultural nights, holiday celebrations, community gatherings, and traditions like",
      bodyEnd:
        "we create spaces where people can experience Mongolian food, music, dance, language, and culture together. Many of our events are supported by youth volunteers and an active community that continues to participate, contribute, and help organize future events.",
      learnMore: "Learn More",
      viewEvents: "View Upcoming Events",
    },
    programs: {
      label: "Coming Soon",
      title: "Programs",
      body:
        "Our long-term goal is to build consistent cultural programs connected to the traditions and activities already practiced within our events, including language, heritage education, youth involvement, and community-led activities throughout the year.",
    },
  },
  mn: {
    back: "Буцах",
    title: "Бидний чиглэл",
    events: {
      label: "Гол чиглэл",
      title: "Арга хэмжээ",
      bodyStart:
        "Арга хэмжээ нь Калгари дахь Монгол өв соёлоо хадгалах, түгээх гол арга зам юм. Соёлын үдэш, баяр ёслол, нийгэмлэгийн уулзалт болон",
      bodyEnd:
        "зэрэг уламжлалаар дамжуулан хүмүүс Монгол хоол, хөгжим, бүжиг, хэл, соёлыг хамтдаа мэдэрдэг. Манай арга хэмжээнүүдэд залуу сайн дурынхан болон идэвхтэй нийгэмлэгийн гишүүд тогтмол оролцож, хувь нэмрээ оруулдаг.",
      learnMore: "Дэлгэрэнгүй",
      viewEvents: "Удахгүй болох арга хэмжээ",
    },
    programs: {
      label: "Удахгүй",
      title: "Хөтөлбөрүүд",
      body:
        "Бидний урт хугацааны зорилго бол арга хэмжээнүүд дээрээ хэрэгжүүлдэг уламжлал, үйл ажиллагаануудыг илүү тогтмол хөтөлбөр болгон хөгжүүлэх юм. Үүнд хэл, өв соёлын боловсрол, залуусын оролцоо, нийгэмлэгийн үйл ажиллагаа багтана.",
    },
  },
} as const;

function ImagePlaceholder() {
  return (
    <div className="relative h-28 overflow-hidden border-b border-[#d8caa5]/65 bg-[#efe2bf]/70 md:h-32">
      <div className="absolute inset-0 bg-linear-to-br from-white/50 via-transparent to-[#b39135]/20" />
      <div className="absolute inset-4 border border-[#b39135]/25" />

      <div className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]/70">
        Image
      </div>
    </div>
  );
}

function LearnMore({ lang }: LearnMoreProps) {
  const copy = LEARN_MORE_COPY[lang];

  return (
    <section className="min-h-screen border-y border-[#d8caa5]/55 bg-linear-to-br from-[#ede1c7] via-[#f6eedc] to-[#d8caa5] pt-20 text-[#27301d]">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-6 md:px-10 lg:px-12">
        <Link
          to="/about"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b26]/90 transition-colors hover:text-[#27301d]"
        >
          ← {copy.back}
        </Link>

        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {copy.title}
        </h1>

        <div className="mt-6 grid gap-5 lg:grid-cols-[3fr_2fr]">
          <article className="overflow-hidden border border-[#d8caa5]/70 bg-[#fffaf0]/78 shadow-[0_18px_46px_rgba(88,72,38,0.10)]">
            <ImagePlaceholder />

            <div className="p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]/80">
                {copy.events.label}
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#27301d] md:text-4xl">
                {copy.events.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#4e593c]/78">
                {copy.events.bodyStart}{" "}
                <a
                  href={NAADAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#9a7b26] underline decoration-[#b39135]/40 underline-offset-4 transition-colors hover:text-[#27301d]"
                >
                  Naadam
                </a>
                , {copy.events.bodyEnd}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/about/events"
                  className="
                    inline-flex w-fit items-center justify-center
                    border border-[#b39135]/45
                    px-5 py-3
                    text-xs font-semibold uppercase tracking-[0.18em]
                    text-[#27301d]/88
                    transition-colors
                    hover:border-[#27301d]
                    hover:bg-[#27301d]
                    hover:text-[#fffaf0]
                  "
                >
                  {copy.events.learnMore}
                  <span className="ml-3">→</span>
                </Link>

                <Link
                  to="/events"
                  className="
                    inline-flex w-fit items-center justify-center
                    px-1 py-3
                    text-xs font-semibold uppercase tracking-[0.18em]
                    text-[#9a7b26]/95
                    transition-colors
                    hover:text-[#27301d]
                  "
                >
                  {copy.events.viewEvents}
                  <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </article>

          <article className="overflow-hidden border border-[#d8caa5]/70 bg-[#fffaf0]/60 shadow-[0_14px_34px_rgba(88,72,38,0.08)]">
            <ImagePlaceholder />

            <div className="p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]/75">
                {copy.programs.label}
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#27301d]">
                {copy.programs.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#4e593c]/76">
                {copy.programs.body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default memo(LearnMore);