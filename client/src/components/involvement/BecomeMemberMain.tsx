"use client";

import { memo } from "react";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type BecomeMemberProps = {
  lang: Lang;
};

const CONTACT_EMAIL = "contact@etugenmongols.org";

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const heroTextMotion: Variants = {
  hidden: { opacity: 0, x: -44 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
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
        src="/about/founding-group.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/42" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/64 via-black/30 to-black/46" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2f3320] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-16 pt-32 sm:px-6 md:px-10 lg:px-12">
        <motion.div
          variants={heroTextMotion}
          initial="hidden"
          animate="show"
          className="max-w-3xl transform-gpu"
        >
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d6b04c]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/84 md:text-lg">
            {copy.body}
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex rounded-full bg-[#fffaf0] px-6 py-3 text-sm font-semibold text-[#27301d] transition-colors hover:bg-[#d6b04c]"
          >
            {copy.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(BecomeMember);