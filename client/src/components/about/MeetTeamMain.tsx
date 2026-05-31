"use client";

import { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  type Variants,
} from "framer-motion";
import { events } from "../../static_events";

type Lang = "en" | "mn";

type MeetTeamMainProps = {
  lang: Lang;
};

type PastEvent = (typeof events)[number];

type PreviewImage = {
  src: string;
  alt: string;
};

const COPY = {
  en: {
    eyebrow: "Our Community",
    title: "Meet the Bigger Team",
    body:
      "Etugen Mongols is organized by our board members and organizers, but strengthened by the wider community around us. Volunteers, performers, families, elders, photographers, sponsors, and supporters share their time, skills, and care to help turn plans into real gatherings. Together, this support helps preserve culture and create spaces for the next generation.",

    impactButton: "See Our Impact",
    appreciationButton: "Explore Appreciation",

    appreciationTitle: "Appreciation From Past Events",
    appreciationIntro:
      "A few moments recognizing the people who helped make past events possible.",

    watchVideo: "Watch video",
    lookAtEvent: "View event",

    photoOne: "Community members supporting Etugen Mongols",
    photoTwo: "Volunteers and families preparing events",
    photoThree: "Performers and supporters celebrating culture",
    close: "Close",
  },

  mn: {
    eyebrow: "Манай хамт олон",
    title: "Манай том багтай танилцах",
    body:
      "Этүгэн Монголчуудын арга хэмжээ, хөтөлбөрийг удирдах зөвлөл болон зохион байгуулагчид зохион байгуулдаг ч өргөн хамт олны дэмжлэг бидний ажлыг улам хүчтэй болгодог. Сайн дурынхан, уран бүтээлчид, гэр бүлүүд, ахмадууд, зурагчид, ивээн тэтгэгчид болон дэмжигчид цаг зав, ур чадвар, сэтгэлээ зориулдаг.",

    impactButton: "Бидний нөлөөг үзэх",
    appreciationButton: "Талархлын хэсгийг үзэх",

    appreciationTitle: "Өнгөрсөн арга хэмжээнүүдийн талархал",
    appreciationIntro:
      "Арга хэмжээ бүрийг боломжтой болгосон хүмүүсийг талархан харуулсан мөчүүд.",

    watchVideo: "Бичлэг үзэх",
    lookAtEvent: "Арга хэмжээг үзэх",

    photoOne: "Этүгэн Монголчуудыг дэмжиж буй хамт олон",
    photoTwo: "Арга хэмжээнд бэлтгэж буй сайн дурынхан, гэр бүлүүд",
    photoThree: "Соёлоо тэмдэглэж буй уран бүтээлчид, дэмжигчид",
    close: "Хаах",
  },
} as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const textMotion: Variants = {
  hidden: { opacity: 0, x: 34 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const collageMotion: Variants = {
  hidden: { opacity: 0, x: -34 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const photoMotion: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: easeOut },
  },
};

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

function scrollToAppreciation() {
  document
    .getElementById("appreciation")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AppreciationCard({
  event,
  lang,
  watchVideo,
  lookAtEvent,
}: {
  event: PastEvent;
  lang: Lang;
  watchVideo: string;
  lookAtEvent: string;
}) {
  const videoUrl =
    event.gallery?.thankYouVideo?.url ?? event.gallery?.montageVideo?.url;

  return (
    <motion.article
      variants={cardMotion}
      className="group bg-[#fffaf0] p-2 shadow-[0_10px_28px_rgba(39,48,29,0.08)]"
    >
      <div className="border border-[#d8caa5]/80 bg-[#f4ecd9] p-1">
        <div className="aspect-[4/3] overflow-hidden bg-[#e5d8b8]">
          <img
            src={event.coverImage.lowRes}
            alt={event.coverImage.alt[lang]}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>
      </div>

      <div className="px-1.5 pb-1.5 pt-3">
        <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
          {event.date}
        </p>

        <h3 className="mt-1.5 text-sm font-semibold leading-tight text-[#27301d]">
          {event.title[lang]}
        </h3>

        <div className="mt-3 grid gap-1.5">
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center border border-[#27301d] bg-[#27301d] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#fffaf0] transition-colors hover:bg-transparent hover:text-[#27301d]"
            >
              {watchVideo}
            </a>
          )}

          <Link
            to={`/gallery/${event.id}`}
            className="inline-flex justify-center border border-[#b39135]/60 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#7a6221] transition-colors hover:bg-[#f4ecd9]"
          >
            {lookAtEvent}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  const photos: PreviewImage[] = [
    { src: "/about/community-1.webp", alt: copy.photoOne },
    { src: "/about/community-2.webp", alt: copy.photoTwo },
    { src: "/about/community-3.webp", alt: copy.photoThree },
  ];

  const pastEvents = events
    .filter((event) => event.status === "past")
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#f4ecd9] text-[#27301d]">
      <div className="relative min-h-screen overflow-hidden bg-[#2f3320]">
        <div className="absolute inset-0">
          <img
            src="/about/bg.webp"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 bg-linear-to-r from-black/58 via-black/22 to-black/46" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-7 px-5 pb-10 pt-28 sm:px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <motion.div
            variants={collageMotion}
            initial="hidden"
            animate="show"
            className="relative order-2 mx-auto h-[30rem] w-full max-w-[40rem] lg:order-1 lg:h-[34rem]"
          >
            {photos.map((photo, index) => {
              const styles = [
                "left-0 top-5 z-20 w-[76%]",
                "right-0 top-[10.25rem] z-30 w-[52%] rotate-[2deg]",
                "bottom-4 left-[16%] z-10 w-[56%] -rotate-[1.5deg]",
              ];

              const heights = [
                "h-[17rem] sm:h-[19rem] lg:h-[21rem]",
                "h-[11.5rem] sm:h-[13rem] lg:h-[14rem]",
                "h-[10.5rem] sm:h-[12rem] lg:h-[13rem]",
              ];

              return (
                <motion.button
                  key={photo.src}
                  type="button"
                  variants={photoMotion}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setPreviewImage(photo)}
                  className={`absolute ${styles[index]} bg-[#e8dcc2] p-2.5 text-left shadow-[0_22px_58px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_26px_70px_rgba(0,0,0,0.26)]`}
                  aria-label={photo.alt}
                >
                  <span className="block overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-2">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className={`${heights[index]} w-full object-cover object-center`}
                    />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="order-1 flex flex-col items-start lg:order-2">
            <motion.div
              variants={textMotion}
              initial="hidden"
              animate="show"
              className="
                w-full max-w-xl transform-gpu
                rounded-md border border-[#e1d2a6]/55
                bg-[#fffaf0]/94
                p-8 text-[#27301d]
                shadow-[0_24px_70px_rgba(0,0,0,0.34)]
                backdrop-blur-sm
                md:p-9
                lg:p-10
              "
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-4xl lg:text-[2.7rem]">
                {copy.title}
              </h1>

              <div className="my-6 h-px w-full bg-[#d8caa5]/90" />

              <p className="max-w-lg text-sm leading-7 text-[#4e593c] md:text-[15px] md:leading-8">
                {copy.body}
              </p>

              <Link
                to="/about/impact"
                className="
                  mt-8 inline-flex items-center
                  rounded-sm border border-[#b39135]/45
                  px-5 py-3
                  text-xs font-semibold uppercase tracking-[0.2em]
                  text-[#27301d]
                  transition-colors duration-200
                  hover:border-[#27301d]
                  hover:bg-[#27301d]
                  hover:text-[#fffaf0]
                "
              >
                {copy.impactButton}
                <span className="ml-3 text-base leading-none">→</span>
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={scrollToAppreciation}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: easeOut }}
              className="
                mt-4 inline-flex items-center
                rounded-sm border border-[#fffaf0]/45
                bg-[#fffaf0]/12
                px-5 py-3
                text-[10px] font-semibold uppercase tracking-[0.18em]
                text-[#fffaf0]
                backdrop-blur-sm
                transition-colors duration-200
                hover:bg-[#fffaf0]
                hover:text-[#27301d]
              "
            >
              {copy.appreciationButton}
              <span className="ml-3 text-sm leading-none">↓</span>
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        id="appreciation"
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="scroll-mt-24 mx-auto max-w-4xl px-5 py-10 sm:px-6 md:px-10"
      >
        <div className="max-w-xl border-l-4 border-[#b39135] pl-4">
          <h2 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            {copy.appreciationTitle}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#4e593c]/90">
            {copy.appreciationIntro}
          </p>
        </div>

        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pastEvents.map((event) => (
            <AppreciationCard
              key={event.id}
              event={event}
              lang={lang}
              watchVideo={copy.watchVideo}
              lookAtEvent={copy.lookAtEvent}
            />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/78 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.22, ease: easeOut }}
              className="relative w-full max-w-5xl bg-[#fffaf0] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={previewImage.src}
                alt={previewImage.alt}
                className="max-h-[78vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute right-3 top-3 bg-[#27301d] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#fffaf0]"
              >
                {copy.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(MeetTeamMain);