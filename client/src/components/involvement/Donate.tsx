"use client";

import { memo } from "react";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type DonateProps = {
  lang: Lang;
};

const DONATION_EMAIL = "donations@etugenmongols.org";

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
    eyebrow: "Support Our Work",
    title: "Help Us Build More for the Community",
    body:
      "Your donation helps us create better cultural events, youth activities, performances, gatherings, and community programs more often for Mongolian families and supporters in Calgary.",
    note:
      "We do not currently have a direct online donation portal. Donations can be sent by bank e-transfer to the email below.",
    label: "E-transfer donation email",
  },
  mn: {
    eyebrow: "Биднийг дэмжих",
    title: "Хамт олондоо илүү ихийг бүтээхэд туслаарай",
    body:
      "Таны хандив нь соёлын арга хэмжээ, хүүхэд залуусын үйл ажиллагаа, тоглолт, уулзалт болон олон нийтийн хөтөлбөрүүдийг илүү чанартай, илүү олон удаа зохион байгуулахад дэмжлэг болно.",
    note:
      "Одоогоор шууд онлайн хандивын систем байхгүй байна. Хандивыг доорх имэйл рүү банкны e-transfer хэлбэрээр илгээх боломжтой.",
    label: "E-transfer хандивын имэйл",
  },
} as const;

function Donate({ lang }: DonateProps) {
  const copy = COPY[lang];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f3320] text-[#27301d]">
      <img
        src="/about/founding-group.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/48" />
      <div className="absolute inset-0 bg-linear-to-r from-black/78 via-black/44 to-black/14" />
      <div className="absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/66" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-20 pt-28 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:pt-32">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-[#fffaf0]"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#f3ead2] md:text-base md:leading-8">
            {copy.body}
          </p>
        </motion.div>

        <motion.aside
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="w-full bg-[#fffaf0]/96 p-6 text-[#27301d] shadow-[0_22px_65px_rgba(0,0,0,0.32)] md:p-8 lg:justify-self-end lg:p-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9a7b26]">
            {copy.label}
          </p>

          <a
            href={`mailto:${DONATION_EMAIL}`}
            className="mt-4 block break-all text-2xl font-semibold leading-tight tracking-tight text-[#27301d] no-underline transition-colors duration-200 hover:text-[#9a7b26] sm:text-3xl"
          >
            {DONATION_EMAIL}
          </a>

          <p className="mt-6 text-sm leading-7 text-[#4e593c] md:text-[15px]">
            {copy.note}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}

export default memo(Donate);