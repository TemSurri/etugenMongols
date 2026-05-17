"use client";

import { memo } from "react";
import { Link } from "react-router-dom";

type Lang = "en" | "mn";

type AboutUsProps = {
  lang: Lang;
};

const ABOUT_COPY = {
  en: {
    title: "About Us",
    aboutBody:
      "Since 2022, Etugen Mongols has organized cultural events through personal contribution, volunteer effort, and community support. Our goal is to make Mongolian culture easier to celebrate, experience, and preserve — not only for Mongolians, but for anyone interested in learning about our traditions, language, food, music, and heritage.",
    strategyTitle: "Our Strategy",
    strategyBody:
      "We create events, programs, and community spaces that strengthen cultural connection, bring people together, and help pass Mongolian heritage forward to future generations while growing within the wider Calgary community.",
    learnMore: "Learn More",
  },
  mn: {
    title: "Бидний тухай",
    aboutBody:
      "2022 оноос хойш Этүгэн Монголчууд нь хувь хүмүүсийн сэтгэл, сайн дурын хөдөлмөр, нийгэмлэгийн дэмжлэгээр соёлын арга хэмжээнүүдийг зохион байгуулсаар ирсэн. Бидний зорилго бол Монгол соёлыг тэмдэглэх, мэдрэх, хадгалах боломжийг илүү хүртээмжтэй болгох бөгөөд энэ нь зөвхөн Монголчуудад бус, Монгол уламжлал, хэл, хоол, хөгжим, өв соёлыг сонирхож буй хүн бүрт нээлттэй.",
    strategyTitle: "Бидний чиглэл",
    strategyBody:
      "Бид соёлын холбоог бэхжүүлэх, хүмүүсийг нэгтгэх, Монгол өв соёлоо дараагийн үедээ өвлүүлэхэд чиглэсэн арга хэмжээ, хөтөлбөр, орчныг бий болгодог.",
    learnMore: "Дэлгэрэнгүй",
  },
} as const;

function AboutUs({ lang }: AboutUsProps) {
  const copy = ABOUT_COPY[lang];

  return (
    <section className="min-h-screen border-y border-[#d8caa5]/55 bg-linear-to-br from-[#ede1c7] via-[#f6eedc] to-[#d8caa5] pt-20 text-[#27301d]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-[3fr_2fr] md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#27301d] md:text-5xl">
            {copy.title}
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-[#4e593c]/78 md:text-base md:leading-8">
            {copy.aboutBody}
          </p>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-[#27301d] md:text-3xl">
              {copy.strategyTitle}
            </h3>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4e593c]/78 md:text-base md:leading-8">
              {copy.strategyBody}
            </p>

            <Link
                to="/about/learnmore"
                className="
                    mt-7 inline-flex w-fit items-center
                    border border-[#b39135]/40
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
          </div>
        </div>

        <div className="hidden min-h-[70vh] border border-[#d8caa5]/65 bg-[#fffaf0]/65 shadow-[0_18px_48px_rgba(88,72,38,0.12)] md:block" />
      </div>
    </section>
  );
}

export default memo(AboutUs);