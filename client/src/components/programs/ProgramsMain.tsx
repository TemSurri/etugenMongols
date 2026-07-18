
"use client";

import { memo } from "react";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type ProgramsMainProps = {
  lang: Lang;
};

const COPY = {
  en: {
    eyebrow: "Programs",
    title: "Coming Soon",
    sectionTitle: "Why we are creating these programs",
    body:
      "We hope to create regular opportunities for community members to learn and practice Mongolian dance, singing, wrestling, archery, shagai, and other cultural traditions. The goal is to help preserve these traditions, make them easier to learn, and give people the confidence and preparation needed to perform or participate at community gatherings, celebrations, and cultural events. These programs are still being planned, and more information will be shared as they develop.",
  },

  mn: {
    eyebrow: "Хөтөлбөрүүд",
    title: "Удахгүй",
    sectionTitle: "Эдгээр хөтөлбөрийг хэрэгжүүлэх зорилго",
    body:
      "Бид олон нийтийн гишүүдэд монгол бүжиг, дуу, бөх, сур харваа, шагай болон бусад соёлын уламжлалыг суралцах, тогтмол давтах боломжийг бий болгохоор зорьж байна. Эдгээр уламжлалыг хадгалж үлдэх, сурахад илүү хялбар болгох, мөн хүмүүсийг олон нийтийн цугларалт, баяр ёслол болон соёлын арга хэмжээнд оролцох, үзүүлбэр үзүүлэхэд бэлтгэх нь хөтөлбөрүүдийн гол зорилго юм. Хөтөлбөрүүд одоогоор төлөвлөгөөний шатанд байгаа бөгөөд хөгжихийн хэрээр дэлгэрэнгүй мэдээллийг нийтлэх болно.",
  },
} as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: easeOut,
    },
  },
};

function ProgramsMain({ lang }: ProgramsMainProps) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "en";
  const copy = COPY[safeLang];

  return (
    <main className="bg-[#f6f0df] text-[#27301d]">
      <section className="relative min-h-[58vh] overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pt-36">
        <img
          src="/landingpage.webp"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/58" />

        <motion.div
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex min-h-[36vh] max-w-6xl items-end"
        >
          <div className="text-[#fffaf0]">
            <p className="text-xs uppercase tracking-[0.28em] text-[#e4d4a4]">
              {copy.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-normal sm:text-5xl md:text-6xl">
              {copy.title}
            </h1>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-24">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="text-2xl font-normal leading-tight md:text-3xl">
            {copy.sectionTitle}
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-[#4e593c] md:text-base">
            {copy.body}
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default memo(ProgramsMain);

