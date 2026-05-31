"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

import canadaFlag from "../../assets/canada-flag.webp";
import mongoliaFlag from "../../assets/mongolia-flag.webp";

type Lang = "en" | "mn";

type HeroProps = {
  lang: Lang;
};

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

const HERO_COPY = {
  en: {
    heroSlogan:
      "Preserving heritage through culture, language, and tradition.",
    aboutText:
      "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that empower women to thrive and keep our culture alive.",
    learnMore: "Learn More",
  },
  mn: {
    heroSlogan: "Соёл, хэл, уламжлалаараа дамжуулан өв соёлоо хадгална.",
    aboutText:
      "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид эмэгтэйчүүдийг хөгжихөд дэмжиж, соёлоо хадгалан үлдээх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.",
    learnMore: "Дэлгэрэнгүй",
  },
} as const;

const flagClassName = "h-6 object-contain shadow-lg md:h-9 lg:h-10";

function Hero({ lang }: HeroProps) {
  const copy = HERO_COPY[lang];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#2f3320]">
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/56 via-black/24 to-black/44" />

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
        <div className="flex w-full flex-col items-end gap-5">
          <div className="flex items-center gap-3 md:gap-4 lg:pr-2 xl:pr-0">
            <img
              src={mongoliaFlag}
              alt="Mongolia flag"
              loading="eager"
              decoding="async"
              className={flagClassName}
            />

            <img
              src={canadaFlag}
              alt="Canada flag"
              loading="eager"
              decoding="async"
              className={flagClassName}
            />
          </div>

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
              {copy.heroSlogan}
            </h1>

            <div className="my-7 h-px w-full bg-[#d8caa5]/90" />

            <p className="max-w-lg text-sm leading-7 text-[#4e593c] md:text-base md:leading-8">
              {copy.aboutText}
            </p>

            <Link
              to="/about/our-story"
              className="
                mt-9 inline-flex items-center
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
              {copy.learnMore}
              <span className="ml-3 text-base leading-none">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);