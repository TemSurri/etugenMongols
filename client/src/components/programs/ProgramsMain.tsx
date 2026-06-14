"use client";

import { memo } from "react";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type ProgramsMainProps = {
  lang: Lang;
};

type ProgramItem = {
  title: Record<Lang, string>;
  body: Record<Lang, string>;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
};

const COPY = {
  en: {
    eyebrow: "Programs",
    title: "Community Programs Coming Soon",
    intro:
      "Etugen Mongols is preparing regular cultural programs where community members can practice, learn, and prepare for future performances and gatherings.",
    mainTitle: "Practice, Learn, and Perform",
    mainBody:
      "The goal is to create consistent spaces for dance, singing, wrestling, archery, shagai, and other cultural activities so people can build skills over time and showcase them at community events.",
    noteTitle: "Soon to be available",
    noteBody:
      "Program details, schedules, registration, and age groups will be shared once they are finalized.",
  },
  mn: {
    eyebrow: "Хөтөлбөрүүд",
    title: "Удахгүй эхлэх олон нийтийн хөтөлбөрүүд",
    intro:
      "Этүгэн Монголчууд тогтмол соёлын хөтөлбөрүүдийг бэлтгэж байна. Эдгээр нь хамт олны гишүүдэд суралцах, давтах, ирээдүйн тоглолт болон арга хэмжээнд бэлдэх боломж олгоно.",
    mainTitle: "Давтах, суралцах, үзүүлэх",
    mainBody:
      "Бүжиг, дуу, бөх, сур харваа, шагай болон бусад соёлын үйл ажиллагааг тогтмол хэрэгжүүлж, ур чадвараа хөгжүүлэн арга хэмжээн дээр үзүүлэх боломжийг бий болгох зорилготой.",
    noteTitle: "Удахгүй дэлгэрэнгүй мэдээлэл нэмэгдэнэ",
    noteBody:
      "Хөтөлбөрийн дэлгэрэнгүй мэдээлэл, цагийн хуваарь, бүртгэл болон насны ангиллыг бэлэн болмогц нийтлэх болно.",
  },
} as const;

const PROGRAMS: ProgramItem[] = [
  {
    title: { en: "Dance Practice", mn: "Бүжгийн давтлага" },
    body: {
      en: "Regular practice for dances that can be performed at cultural events.",
      mn: "Соёлын арга хэмжээнд үзүүлэх бүжгийн тогтмол давтлага.",
    },
  },
  {
    title: { en: "Singing", mn: "Дуу" },
    body: {
      en: "Group singing and performance preparation for community showcases.",
      mn: "Хамтын дуу болон тоглолтод бэлдэх үйл ажиллагаа.",
    },
  },
  {
    title: { en: "Wrestling", mn: "Бөх" },
    body: {
      en: "Introductory wrestling activities connected to Mongolian tradition.",
      mn: "Монгол уламжлалтай холбоотой бөхийн анхан шатны үйл ажиллагаа.",
    },
  },
  {
    title: { en: "Archery", mn: "Сур харваа" },
    body: {
      en: "Cultural archery activities planned for future programs and events.",
      mn: "Ирээдүйн хөтөлбөр, арга хэмжээнд зориулсан сур харвааны үйл ажиллагаа.",
    },
  },
  {
    title: { en: "Shagai", mn: "Шагай" },
    body: {
      en: "Traditional games that help children and families connect through play.",
      mn: "Хүүхэд, гэр бүлүүдийг тоглоомоор дамжуулан холбох уламжлалт наадгай.",
    },
  },
  {
    title: { en: "More Cultural Activities", mn: "Бусад соёлын үйл ажиллагаа" },
    body: {
      en: "More activities may be added as the programs grow with the community.",
      mn: "Хөтөлбөрүүд хамт олонтойгоо хамт хөгжихийн хэрээр нэмэлт үйл ажиллагаа нэмэгдэнэ.",
    },
  },
];

function ProgramsMain({ lang }: ProgramsMainProps) {
  const copy = COPY[lang];

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:pt-32">
          <img
            src="/landingpage.webp"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/48" />
          <div className="absolute inset-0 bg-linear-to-r from-black/76 via-black/42 to-black/16" />
          <div className="absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/58" />

          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto max-w-6xl text-[#fffaf0]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#f3ead2] md:text-base">
              {copy.intro}
            </p>
          </motion.div>
        </section>

        <section className="bg-[#fffaf0] px-6 py-20 md:px-10">
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                {copy.mainTitle}
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
                {copy.mainBody}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PROGRAMS.map((program) => (
                <motion.article
                  key={program.title.en}
                  variants={sectionMotion}
                  className="bg-[#efefec] p-6 shadow-[0_14px_34px_rgba(39,48,29,0.08)]"
                >
                  <h3 className="text-2xl font-semibold leading-tight text-[#27301d]">
                    {program.title[lang]}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#4e593c]">
                    {program.body[lang]}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="relative overflow-hidden px-6 py-24 text-center md:px-10">
          <img
            src="/landingpage.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/46" />
          <div className="absolute inset-0 bg-linear-to-b from-black/36 via-black/28 to-black/54" />

          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
            className="relative z-10 mx-auto max-w-3xl text-[#fffaf0]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
              {copy.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              {copy.noteTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#f3ead2]">
              {copy.noteBody}
            </p>
          </motion.div>
        </section>
      </main>
    </section>
  );
}

export default memo(ProgramsMain);