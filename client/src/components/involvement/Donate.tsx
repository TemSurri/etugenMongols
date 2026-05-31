"use client";

import { memo } from "react";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type DonateProps = {
  lang: Lang;
};

const DONATION_EMAIL = "donations@etugenmongols.org";

const mainCardMotion: Variants = {
  hidden: {
    opacity: 0,
    x: 52,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const COPY = {
  en: {
    title: "Support Etugen Mongols",
    body:
      "Your donation helps support cultural events, youth activities, performances, gatherings, and community programs that keep Mongolian heritage active in Calgary.",
    note:
      "We do not currently have a direct online donation portal. For now, donations can be sent by bank e-transfer to the email below.",
    label: "E-transfer donation email",
    cta: "Send Donation",
  },
  mn: {
    title: "Этүгэн Монголчуудыг дэмжих",
    body:
      "Таны хандив нь соёлын арга хэмжээ, хүүхэд залуусын үйл ажиллагаа, тоглолт, уулзалт болон Монгол өв соёлыг Калгари хотод амьд байлгах ажилд дэмжлэг болно.",
    note:
      "Одоогоор шууд онлайн хандивын систем байхгүй байна. Хандивыг доорх имэйл рүү банкны e-transfer хэлбэрээр илгээх боломжтой.",
    label: "E-transfer хандивын имэйл",
    cta: "Хандив илгээх",
  },
} as const;

function Donate({ lang }: DonateProps) {
  const copy = COPY[lang];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#2f3320]">
      <img
        src="/about/founding-group.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/42" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/62 via-black/28 to-black/46" />

      <div
        className="
          relative z-10
          mx-auto flex min-h-screen w-full max-w-7xl
          items-start justify-end
          px-6 pt-32 pb-20
          md:px-10 md:pt-36
          lg:px-12 lg:pt-40
        "
      >
        <motion.div
          variants={mainCardMotion}
          initial="hidden"
          animate="show"
          className="
            w-full max-w-152 transform-gpu
            rounded-md border border-[#e1d2a6]/55
            bg-[#fffaf0]/94
            p-9 text-[#27301d]
            shadow-[0_24px_70px_rgba(0,0,0,0.42)]
            backdrop-blur-sm
            md:p-10
            lg:p-12
          "
        >
          <h1 className="max-w-lg text-2xl font-semibold leading-snug tracking-tight text-[#27301d] md:text-[1.7rem] lg:text-[2rem]">
            {copy.title}
          </h1>

          <div className="my-7 h-px w-full bg-[#d8caa5]/90" />

          <p className="max-w-lg text-sm leading-7 text-[#4e593c] md:text-base md:leading-8">
            {copy.body}
          </p>

          <div className="mt-7 rounded-sm border border-[#d8caa5]/80 bg-[#f4ecd9]/70 p-4">
            <p className="text-sm leading-7 text-[#4e593c]">{copy.note}</p>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
              {copy.label}
            </p>

            <a
              href={`mailto:${DONATION_EMAIL}`}
              className="mt-2 block break-all text-sm font-semibold text-[#27301d] underline decoration-[#b39135]/50 underline-offset-4 md:text-base"
            >
              {DONATION_EMAIL}
            </a>
          </div>

          <a
            href={`mailto:${DONATION_EMAIL}`}
            className="
              mt-8 inline-flex items-center
              rounded-sm border border-[#b39135]/45
              px-5 py-3
              text-xs font-semibold uppercase tracking-[0.22em]
              text-[#27301d]
              transition-colors duration-200
              hover:border-[#27301d]
              hover:bg-[#27301d]
              hover:text-[#fffaf0]
            "
          >
            {copy.cta}
            <span className="ml-3 text-base leading-none">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Donate);