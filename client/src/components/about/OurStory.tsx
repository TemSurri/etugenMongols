"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type AboutUsProps = {
  lang: Lang;
};

const ABOUT_COPY = {
  en: {
    title: "Our Story",
    brand: "Etugen Mongols",
    story:
      "Since 2022, Etugen Mongols has brought families, youth, volunteers, and community members together through cultural celebrations, performances, gatherings, and shared traditions.",
    storyTwo:
      "What began as a volunteer-led effort in Calgary has grown into a community space where Mongolian identity can be practiced, seen, and passed forward.",
    photoCaption: "Founding members of Etugen Mongols",
    team: "Meet the Bigger Team",
  },
  mn: {
    title: "Бидний түүх",
    brand: "Этүгэн Монголчууд",
    story:
      "2022 оноос хойш Этүгэн Монголчууд нь соёлын баяр, тоглолт, гэр бүлийн уулзалт, олон нийтийн арга хэмжээгээр дамжуулан гэр бүлүүд, хүүхэд залуус, сайн дурынхан болон хамт олныг нэгтгэсээр ирсэн.",
    storyTwo:
      "Бидний үйл ажиллагаа зохион байгуулагчид, эцэг эхчүүд, уран бүтээлчид, ахмадууд, зурагчид, дэмжигчид болон сайн дурынхны сэтгэлээр бүтээгддэг.",
    photoCaption: "Этүгэн Монголчуудын үүсгэн байгуулагч гишүүд",
    team: "Багтай танилцах",
  },
} as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const textCardMotion: Variants = {
  hidden: { opacity: 0, x: -44 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const imageMotion: Variants = {
  hidden: { opacity: 0, x: 44, scale: 0.985 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, delay: 0.08, ease: easeOut },
  },
};

function AboutUs({ lang }: AboutUsProps) {
  const copy = ABOUT_COPY[lang];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f3320] text-[#27301d]">
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

        <div className="pointer-events-none absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/56 via-black/24 to-black/44" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 pb-8 pt-28 sm:px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-10">
        <motion.div
          variants={textCardMotion}
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
            {copy.brand}
          </p>

          <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-4xl lg:text-[2.7rem]">
            {copy.title}
          </h1>

          <div className="my-6 h-px w-full bg-[#d8caa5]/90" />

          <div className="max-w-lg space-y-4 text-sm leading-7 text-[#4e593c] md:text-[15px] md:leading-8">
            <p>{copy.story}</p>
            <p>{copy.storyTwo}</p>
          </div>

          <Link
            to="/about/team"
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
            {copy.team}
            <span className="ml-3 text-base leading-none">→</span>
          </Link>
        </motion.div>

        <motion.figure
          variants={imageMotion}
          initial="hidden"
          animate="show"
          className="transform-gpu rounded-md bg-[#e8dcc2] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-4"
        >
          <div className="overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-2 md:p-3">
            <img
              src="/about/founding-group.webp"
              alt={copy.photoCaption}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-[18rem] w-full object-cover object-[center_38%] sm:h-[24rem] lg:h-[29rem] xl:h-[31rem]"
            />
          </div>

          <figcaption className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
            {copy.photoCaption}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default memo(AboutUs);