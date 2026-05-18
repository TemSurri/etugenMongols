"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/landingpage.webp";

type Lang = "en" | "mn";

type AboutEventsProps = {
  lang: Lang;
};

const EVENTS_VIDEO_URL = "https://www.youtube.com/embed/9bZkp7q19f0";

const ABOUT_EVENTS_COPY = {
  en: {
    eyebrow: "Cultural Events",
    title: "Events",
    intro:
      "We host gatherings that bring people together through Mongolian food, music, performance, language, and tradition.",
    upcoming: "View Upcoming Events",
    galleries: "View Past Events",
    getInvolved: "See How to Get Involved",
    videoTitle: "See What Our Events Look Like",
    whyTitle: "Why Events Matter",
    whyBody:
      "Events help keep culture active. They give families, youth, volunteers, and guests a place to connect and experience Mongolian heritage together.",
    howTitle: "How We Organize",
    howBody:
      "Our events are built through community effort — from planning and setup to performances, food, guest support, and cleanup.",
    accessTitle: "Open to Everyone",
    accessBody:
      "Our events are open to Mongolians and anyone interested in learning about our culture.",
    volunteerTitle: "How to Get Involved",
    volunteerBody:
      "Upcoming events may include volunteer roles for setup, food preparation, guest support, performance coordination, cleanup, and general help.",
    volunteerNote:
      "Open an upcoming event to see available roles and the contact information for each role.",
  },
  mn: {
    eyebrow: "Соёлын арга хэмжээ",
    title: "Арга хэмжээ",
    intro:
      "Бид Монгол хоол, хөгжим, тоглолт, хэл, уламжлалаар дамжуулан хүмүүсийг нэгтгэдэг арга хэмжээнүүд зохион байгуулдаг.",
    upcoming: "Удахгүй болох арга хэмжээ",
    galleries: "Өмнөх арга хэмжээнүүд",
    getInvolved: "Хэрхэн оролцох вэ",
    videoTitle: "Манай арга хэмжээнүүд хэрхэн болдгийг үзэх",
    whyTitle: "Арга хэмжээний ач холбогдол",
    whyBody:
      "Арга хэмжээ нь соёлыг амьд байлгаж, гэр бүл, залуус, сайн дурынхан, зочдод Монгол өв соёлыг хамтдаа мэдрэх орон зай өгдөг.",
    howTitle: "Бид хэрхэн зохион байгуулдаг вэ",
    howBody:
      "Манай арга хэмжээнүүд төлөвлөлт, бэлтгэл, тоглолт, хоол, зочин угтах, цэвэрлэгээ зэрэг хамтын оролцоогоор бүтдэг.",
    accessTitle: "Хүн бүрт нээлттэй",
    accessBody:
      "Манай арга хэмжээнүүд Монголчууд болон Монгол соёлыг сонирхож буй хүн бүрт нээлттэй.",
    volunteerTitle: "Хэрхэн оролцох вэ",
    volunteerBody:
      "Удахгүй болох арга хэмжээнүүдэд тайз засалт, хоол бэлтгэл, зочин угтах, тоглолтын зохицуулалт, цэвэрлэгээ болон ерөнхий туслалцааны сайн дурын үүргүүд байж болно.",
    volunteerNote:
      "Удахгүй болох арга хэмжээг нээх үед боломжтой үүргүүд болон холбогдох хүний мэдээлэл харагдана.",
  },
} as const;

function TextBlock({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-t border-[#b39135]/25 pt-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
        {number}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#27301d] md:text-3xl">
        {title}
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4e593c] md:text-base md:leading-8">
        {body}
      </p>
    </section>
  );
}

function AboutEvents({ lang }: AboutEventsProps) {
  const copy = ABOUT_EVENTS_COPY[lang];

  const scrollToVolunteer = () => {
    document.getElementById("event-volunteer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#efe4cc] pt-20 text-[#27301d]">
      <img
        src={landingImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.11]"
      />

      <div className="absolute inset-0 bg-[#fff7e7]/88" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-10 md:px-10 lg:px-12">
        <header className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#9a7b26]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#27301d] md:text-7xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#4e593c] md:text-lg md:leading-9">
            {copy.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/events"
              className="w-fit text-sm font-semibold text-[#6f571a] underline decoration-[#b39135]/35 underline-offset-4 transition-colors hover:text-[#27301d]"
            >
              {copy.upcoming} →
            </Link>

            <Link
              to="/gallery"
              className="w-fit text-sm font-semibold text-[#6f571a] underline decoration-[#b39135]/35 underline-offset-4 transition-colors hover:text-[#27301d]"
            >
              {copy.galleries} →
            </Link>

            <button
              type="button"
              onClick={scrollToVolunteer}
              className="w-fit text-left text-sm font-semibold text-[#6f571a] underline decoration-[#b39135]/35 underline-offset-4 transition-colors hover:text-[#27301d]"
            >
              {copy.getInvolved} →
            </button>
          </div>
        </header>

        <div className="my-12 h-px w-full bg-[#b39135]/25" />

        <main className="space-y-10">
          <section className="border-y border-[#b39135]/25 py-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
                  Video
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#27301d] md:text-3xl">
                  {copy.videoTitle}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#4e593c] md:text-base md:leading-8">
                  {lang === "en"
                    ? "Watch a short highlight to get a better sense of the atmosphere, performances, and community moments."
                    : "Манай арга хэмжээний уур амьсгал, тоглолт, хамтын мөчүүдийг богино бичлэгээр үзээрэй."}
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#d8caa5]/70 bg-black shadow-[0_16px_44px_rgba(88,72,38,0.14)]">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={EVENTS_VIDEO_URL}
                    title={copy.videoTitle}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>

          <TextBlock number="01" title={copy.whyTitle} body={copy.whyBody} />

          <TextBlock number="02" title={copy.howTitle} body={copy.howBody} />

          <TextBlock
            number="03"
            title={copy.accessTitle}
            body={copy.accessBody}
          />

          <section
            id="event-volunteer"
            className="scroll-mt-28 border-t border-[#b39135]/25 pt-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
              04
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#27301d] md:text-3xl">
              {copy.volunteerTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4e593c] md:text-base md:leading-8">
              {copy.volunteerBody}
            </p>

            <p className="mt-5 max-w-3xl border-l border-[#b39135]/40 pl-5 text-sm leading-7 text-[#4e593c]/90">
              {copy.volunteerNote}
            </p>

            <Link
              to="/events"
              className="mt-7 inline-flex w-fit items-center justify-center border border-[#b39135]/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
            >
              {copy.upcoming}
              <span className="ml-3">→</span>
            </Link>
          </section>
        </main>
      </div>
    </section>
  );
}

export default memo(AboutEvents);