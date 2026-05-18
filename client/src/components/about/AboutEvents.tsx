"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/landingpage.webp";

type Lang = "en" | "mn";

type AboutEventsProps = {
  lang: Lang;
};

const NAADAM_URL =
  "https://ich.unesco.org/en/RL/naadam-mongolian-traditional-festival-00395";

const ABOUT_EVENTS_COPY = {
  en: {
    back: "Back to Strategy",
    eyebrow: "Cultural Events",
    title: "Events",
    naadam: "Naadam",
    snapshotBefore:
      "From stage performances to shared meals and celebrations like",
    snapshotAfter:
      ", our events turn culture into something people can see, hear, taste, and take part in.",
    highlights: [
      { value: "All Ages", label: "Welcome" },
      { value: "Culture", label: "Shared" },
      { value: "Calgary", label: "Community" },
    ],
    upcoming: "View Upcoming Events",
    galleries: "View Past Event Galleries",
    supportTitle: "How Events Support the Community",
    volunteerLink: "Learn more about how to volunteer",
    support: [
      {
        title: "Community Participation",
        body:
          "People of all ages help bring each event to life through volunteering, performing, organizing, preparing food, and welcoming guests.",
      },
      {
        title: "Celebrating Heritage",
        body:
          "Events help us celebrate Mongolian heritage, stay connected to tradition, and pass culture forward to younger generations.",
      },
      {
        title: "Accessible Culture",
        body:
          "We make Mongolian culture easier for everyone to experience, whether they are part of the community or learning about it for the first time.",
      },
    ],
  },
  mn: {
    back: "Чиглэл рүү буцах",
    eyebrow: "Соёлын арга хэмжээ",
    title: "Арга хэмжээ",
    naadam: "Наадам",
    snapshotBefore: "Тайзны үзүүлбэр, хамтын хоол,",
    snapshotAfter:
      "зэрэг баяр ёслолоор дамжуулан бид соёлыг харж, сонсож, амталж, хамтдаа оролцох боломж болгодог.",
    highlights: [
      { value: "Бүх нас", label: "Нээлттэй" },
      { value: "Соёл", label: "Хуваалцах" },
      { value: "Калгари", label: "Нийгэмлэг" },
    ],
    upcoming: "Удахгүй болох арга хэмжээ",
    galleries: "Өмнөх арга хэмжээний зургууд",
    supportTitle: "Арга хэмжээнүүд нийгэмлэгийг хэрхэн дэмждэг вэ",
    volunteerLink: "Сайн дурын оролцооны талаар дэлгэрэнгүй",
    support: [
      {
        title: "Нийгэмлэгийн оролцоо",
        body:
          "Бүх насны хүмүүс сайн дурын ажил, тоглолт, зохион байгуулалт, хоол бэлтгэл, зочин угтах зэргээр арга хэмжээнд хувь нэмэр оруулдаг.",
      },
      {
        title: "Өв соёлоо тэмдэглэх",
        body:
          "Арга хэмжээнүүд Монгол өв соёлоо тэмдэглэх, уламжлалтайгаа холбоотой байх, дараагийн үедээ өвлүүлэхэд тусалдаг.",
      },
      {
        title: "Хүн бүрт нээлттэй соёл",
        body:
          "Бид Монгол соёлыг нийгэмлэгийн гишүүд болон анх удаа сонирхож буй хүн бүрт илүү хүртээмжтэй болгохыг зорьдог.",
      },
    ],
  },
} as const;

function PhotoPlaceholder() {
  return (
    <div className="h-20 w-24 shrink-0 overflow-hidden border border-[#d8caa5]/65 bg-[#efe2bf]">
      <div className="relative h-full w-full">
        <div className="absolute inset-2 border border-[#b39135]/25" />
      </div>
    </div>
  );
}

function AboutEvents({ lang }: AboutEventsProps) {
  const copy = ABOUT_EVENTS_COPY[lang];

  return (
    <section className="relative min-h-screen overflow-hidden border-y border-[#d8caa5]/55 bg-[#2f3320] pt-20 text-[#27301d]">
      <img
        src={landingImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[#efe4cc]/45" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-6 md:px-10 lg:px-12">
        <Link
          to="/about/learnmore"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f571a] transition-colors hover:text-[#27301d]"
        >
          ← {copy.back}
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          <div className="flex min-h-[28rem] flex-col justify-between overflow-hidden border border-[#d8caa5] bg-[#fffaf0]/92 shadow-sm">
            <div className="relative h-44 shrink-0 border-b border-[#d8caa5]/65 bg-[#efe2bf]">
              <div className="absolute inset-5 border border-[#b39135]/25" />

              <div className="absolute bottom-5 left-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7b26]">
                  {copy.eyebrow}
                </p>

                <h1 className="mt-2 min-h-[3.5rem] text-4xl font-semibold leading-tight tracking-tight text-[#27301d] md:text-5xl">
                  {copy.title}
                </h1>
              </div>
            </div>

            <div className="grid min-h-[5.5rem] grid-cols-3 border-b border-[#d8caa5]/60 text-center">
              {copy.highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col justify-center border-r border-[#d8caa5]/60 px-3 py-3 last:border-r-0"
                >
                  <p className="text-base font-semibold text-[#27301d] md:text-lg">
                    {item.value}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4e593c]/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex min-h-[13.5rem] flex-col justify-between p-6">
              <p className="min-h-[5.75rem] text-sm leading-7 text-[#4e593c]">
                {copy.snapshotBefore}{" "}
                <a
                  href={NAADAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#9a7b26] underline decoration-[#b39135]/40 underline-offset-4 transition-colors hover:text-[#27301d]"
                >
                  {copy.naadam}
                </a>
                {copy.snapshotAfter}
              </p>

              <div className="mt-5 flex min-h-[3rem] flex-col gap-3 sm:flex-row">
                <Link
                  to="/events"
                  className="inline-flex w-fit items-center justify-center border border-[#b39135]/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
                >
                  {copy.upcoming}
                  <span className="ml-3">→</span>
                </Link>

                <Link
                  to="/gallery"
                  className="inline-flex w-fit items-center justify-center px-1 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f571a] transition-colors hover:text-[#27301d]"
                >
                  {copy.galleries}
                  <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="min-h-[28rem] border border-[#d8caa5] bg-[#fffaf0]/88 p-5 shadow-sm md:p-6">
            <h2 className="min-h-[4.5rem] text-2xl font-semibold tracking-tight text-[#27301d] md:text-3xl">
              {copy.supportTitle}
            </h2>

            <div className="mt-4 grid gap-3">
              {copy.support.map((item, index) => (
                <article
                  key={item.title}
                  className="flex min-h-[7.25rem] gap-4 border border-[#d8caa5]/65 bg-[#fffaf0]/92 p-3"
                >
                  <PhotoPlaceholder />

                  <div className="flex min-w-0 flex-col justify-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7b26]">
                      0{index + 1}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#27301d]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#4e593c]">
                      {item.body}
                    </p>

                    {index === 0 && (
                      <Link
                        to="/volunteer"
                        className="mt-1 w-fit text-sm font-medium text-[#9a7b26] underline decoration-[#b39135]/40 underline-offset-4 transition-colors hover:text-[#27301d]"
                      >
                        {copy.volunteerLink}
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutEvents);