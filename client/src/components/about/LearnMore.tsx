"use client";

import { memo } from "react";
import { Link } from "react-router-dom";

type Lang = "en" | "mn";

type LearnMoreProps = {
  lang: Lang;
};

const LEARN_MORE_COPY = {
  en: {
    back: "Back to About",
    eyebrow: "Our Strategy",
    title: "What Guides Our Work",
    intro:
      "Our work is centered around culture, connection, and long-term community growth.",
    cards: [
      {
        title: "Culture",
        body:
          "We create events that celebrate Mongolian traditions, food, music, language, and heritage.",
      },
      {
        title: "Connection",
        body:
          "We bring families, youth, volunteers, and community members together in welcoming spaces.",
      },
      {
        title: "Growth",
        body:
          "We continue building programs and opportunities that help Mongolian culture thrive in Calgary.",
      },
    ],
  },
  mn: {
    back: "Буцах",
    eyebrow: "Бидний чиглэл",
    title: "Бидний үйл ажиллагааг чиглүүлдэг зүйлс",
    intro:
      "Бидний ажил соёл, холбоо, урт хугацааны нийгэмлэгийн хөгжил дээр төвлөрдөг.",
    cards: [
      {
        title: "Соёл",
        body:
          "Бид Монгол уламжлал, хоол, хөгжим, хэл, өв соёлыг тэмдэглэх арга хэмжээнүүдийг бий болгодог.",
      },
      {
        title: "Холбоо",
        body:
          "Бид гэр бүл, залуус, сайн дурынхан, нийгэмлэгийн гишүүдийг нэгтгэх нээлттэй орчныг бүрдүүлдэг.",
      },
      {
        title: "Хөгжил",
        body:
          "Бид Калгари дахь Монгол соёлыг хөгжүүлэх хөтөлбөр, боломжуудыг үргэлжлүүлэн бий болгодог.",
      },
    ],
  },
} as const;

function LearnMore({ lang }: LearnMoreProps) {
  const copy = LEARN_MORE_COPY[lang];

  return (
    <section className="min-h-screen border-y border-[#d8caa5]/55 bg-linear-to-br from-[#ede1c7] via-[#f6eedc] to-[#d8caa5] pt-20 text-[#27301d]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <Link
          to="/about"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b26]/90 transition-colors hover:text-[#27301d]"
        >
          ← {copy.back}
        </Link>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7b26]/90">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {copy.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#4e593c]/78 md:text-base md:leading-8">
            {copy.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {copy.cards.map((card, index) => (
            <article
              key={card.title}
              className="
                border border-[#d8caa5]/70
                bg-[#fffaf0]/72
                p-7
                shadow-[0_18px_46px_rgba(88,72,38,0.10)]
                transition-colors
                hover:border-[#b39135]/55
              "
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]/80">
                0{index + 1}
              </p>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#27301d]">
                {card.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#4e593c]/76">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(LearnMore);