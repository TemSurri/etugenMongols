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
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
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
    <section className="overflow-hidden bg-[#f6f0df] text-[#25301f]">
      <main>
        <section className="relative min-h-[72vh] overflow-hidden px-6 pb-24 pt-32 md:px-10 lg:pt-36">
          <img
            src="/landingpage.webp"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-linear-to-r from-black/82 via-black/48 to-black/18" />
          <div className="absolute inset-0 bg-linear-to-b from-black/12 via-transparent to-black/64" />

          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto flex min-h-[48vh] max-w-6xl items-end text-[#fffaf0]"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-[#e4d4a4]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                {copy.title}
              </h1>

              <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#f4ecd7] md:text-base">
                {copy.intro}
              </p>
            </div>
          </motion.div>
        </section>

        <section className="bg-[#f6f0df] px-6 py-20 md:px-10">
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start"
          >
            <div className="border-l border-[#b59a54] pl-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#927322]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                {copy.mainTitle}
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#4f5a40]">
                {copy.mainBody}
              </p>
            </div>

            <div className="border-y border-[#d8cba8]">
  {PROGRAMS.map((program) => (
    <article
      key={program.title.en}
      className="grid gap-3 border-b border-[#d8cba8] py-6 last:border-b-0 sm:grid-cols-[220px_1fr]"
    >
      <h3 className="text-xl font-semibold text-[#27301d]">
        {program.title[lang]}
      </h3>

      <p className="text-[15px] leading-7 text-[#4e593c]">
        {program.body[lang]}
      </p>
    </article>
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

          <div className="absolute inset-0 bg-black/52" />
          <div className="absolute inset-0 bg-linear-to-b from-black/42 via-black/30 to-black/62" />

          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
            className="relative z-10 mx-auto max-w-3xl border border-white/18 bg-black/18 px-6 py-10 text-[#fffaf0] backdrop-blur-[2px] md:px-10"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e4d4a4]">
              {copy.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              {copy.noteTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#f4ecd7]">
              {copy.noteBody}
            </p>
          </motion.div>
        </section>
      </main>
    </section>
  );
}

export default memo(ProgramsMain);