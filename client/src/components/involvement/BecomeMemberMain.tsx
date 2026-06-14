"use client";

import { memo } from "react";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type BecomeMemberProps = {
  lang: Lang;
};

const CONTACT_EMAIL = "contact@etugenmongols.org";

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
    eyebrow: "Get Involved",
    title: "Bring Your Ideas to the Community",
    body:
      "Have an event idea, want to help organize, or simply want to support the next gathering? Reach out and help shape what comes next.",
    cta: "Contact Us",
  },
  mn: {
    eyebrow: "Оролцох",
    title: "Санаагаа хамт олондоо авчраарай",
    body:
      "Арга хэмжээний санаа байна уу, зохион байгуулахад туслах уу, эсвэл дараагийн уулзалтыг дэмжих үү? Бидэнтэй холбогдоорой.",
    cta: "Холбогдох",
  },
} as const;

function BecomeMember({ lang }: BecomeMemberProps) {
  const copy = COPY[lang];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f3320] text-[#fffaf0]">
      <img
        src="/landingpage.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/46" />
      <div className="absolute inset-0 bg-linear-to-r from-black/76 via-black/42 to-black/16" />
      <div className="absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/62" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-28 md:px-10 lg:px-12 lg:pt-32">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#fffaf0] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#f3ead2] md:text-base md:leading-8">
            {copy.body}
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
          >
            {copy.cta}
            <span className="ml-3">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(BecomeMember);