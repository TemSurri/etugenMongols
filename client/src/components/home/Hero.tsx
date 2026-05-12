"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier } from "framer-motion";
import type { Variants } from "framer-motion";

import canadaFlag from "../../assets/canada-flag.webp";
import mongoliaFlag from "../../assets/mongolia-flag.webp";

type Lang = "en" | "mn";

type HeroProps = {
  lang: Lang;
};

/*
  Main card animation.
  Only the mission rectangle animates, so the hero stays smooth without extra state,
  scroll listeners, refs, or in-view checks.
*/
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

/*
  Hero text is outside the component so it is not recreated on every render.
*/
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

/*
  Shared classes.
  Flags intentionally have sharp edges, so there is no rounded class here.
*/
const flagClassName = "h-9 object-contain shadow-lg lg:h-10";

function Hero({ lang }: HeroProps) {
  const copy = HERO_COPY[lang];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#2f3320]">
      {/*
        Main hero background.
        Keep this eager because it is the first major visual on the page.
      */}
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/*
        Static overlays.
        These keep the text readable without needing JS.
      */}
      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/72 via-black/38 to-black/62" />

      {/*
        Main hero layout.
        The top padding keeps the content below the fixed header.
      */}
      <div
        className="
          relative z-10
          mx-auto
          flex min-h-screen w-full max-w-7xl
          items-start
          justify-end
          px-6
          pt-32
          pb-20
          md:px-10
          md:pt-36
          lg:px-12
          lg:pt-40
        "
      >
        <div className="flex w-full flex-col items-end gap-5">
          {/*
            Flags are inside the hero instead of pinned to the top of the viewport.
            This prevents the fixed header from covering them.
          */}
          <div className="hidden items-center gap-4 md:flex lg:pr-2 xl:pr-0">
            <img
              src={canadaFlag}
              alt="Canada flag"
              loading="eager"
              decoding="async"
              className={flagClassName}
            />

            <img
              src={mongoliaFlag}
              alt="Mongolia flag"
              loading="eager"
              decoding="async"
              className={flagClassName}
            />
          </div>

          {/*
            Main mission rectangle.
            This keeps the rounded rectangle from your last version.
          */}
          <motion.div
            variants={mainCardMotion}
            initial="hidden"
            animate="show"
            className="
              w-full
              max-w-[38rem]
              transform-gpu
              rounded-md
              border border-[#d6c77a]/12
              bg-[#2f3320]/94
              p-9
              text-white
              shadow-[0_24px_70px_rgba(0,0,0,0.42)]
              backdrop-blur-sm
              md:p-10
              lg:p-12
            "
          >
            <h1 className="max-w-[32rem] text-2xl font-semibold leading-snug tracking-tight text-[#f3efd9] md:text-[1.7rem] lg:text-[2rem]">
              {copy.heroSlogan}
            </h1>

            <div className="my-7 h-px w-full bg-[#d6c77a]/18" />

            <p className="max-w-[32rem] text-sm leading-7 text-[#f3efd9]/72 md:text-base md:leading-8">
              {copy.aboutText}
            </p>

            {/*
              Navigation to the About page.
              No scroll logic here because the refactor is moving toward real pages.
            */}
            <Link
              to="/about"
              className="
                mt-9 inline-flex items-center
                rounded-sm
                border border-[#d6c77a]/30
                px-5 py-3
                text-xs font-semibold uppercase tracking-[0.22em]
                text-[#f3efd9]/90
                transition-colors
                duration-200
                hover:border-[#f3efd9]
                hover:bg-[#f3efd9]
                hover:text-[#252817]
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