"use client";

import { memo } from "react";
import {
  cubicBezier,
  motion,
  type Variants,
} from "framer-motion";

type Lang = "en" | "mn";

type ProgramsMainProps = {
  lang: Lang;
};

type ProgramsCopy = {
  title: string;
  introTitle: string;
  introBody: string;

  plansTitle: string;
  plansBody: string;

  areas: readonly {
    title: string;
    body: string;
  }[];
};

/* =========================================================
   COPY
========================================================= */

const COPY = {
  en: {
    title: "Programs",

    introTitle:
      "Learning, practicing, and passing on our culture",

    introBody:
      "Our community already spends weeks and sometimes months meeting regularly to practice songs, dances, performances, games, and other traditions before cultural events. We want to build on that work by creating more consistent opportunities to learn throughout the year — making our culture easier to practice, understand, perform, and pass on to younger generations.",

    plansTitle:
      "What we hope to develop",

    plansBody:
      "Over time, we hope to turn these informal practices into more regular cultural programs for children, youth, families, and other community members.",

    areas: [
      {
        title: "Language & Culture",
        body:
          "Opportunities to learn and practice the Mongolian language while building a stronger understanding of our history, customs, and traditions.",
      },
      {
        title: "Music, Singing & Dance",
        body:
          "Regular practice for Mongolian songs, dance, music, and cultural performances used at celebrations and community events.",
      },
      {
        title: "Wrestling, Archery & Traditional Games",
        body:
          "Learning traditional activities such as Mongolian wrestling, archery, shagai, and other games through guided practice.",
      },
      {
        title: "Horsemanship & Outdoor Traditions",
        body:
          "Future opportunities to introduce horsemanship, outdoor cultural activities, and other traditions connected to Mongolian life.",
      },
      {
        title: "Traditional Summer Camps",
        body:
          "We hope to develop yearly summer camps where younger community members can spend time learning language, games, performances, traditions, and cultural skills together.",
      },
    ],
  },

  mn: {
    title: "Хөтөлбөрүүд",

    introTitle:
      "Соёлоо сурч, давтаж, дараагийн үедээ өвлүүлэх нь",

    introBody:
      "Манай олон нийтийн гишүүд соёлын арга хэмжээний өмнө дуу, бүжиг, тоглолт, тоглоом болон бусад уламжлалаа давтахын тулд хэдэн долоо хоног, заримдаа хэдэн сарын турш тогтмол уулзан бэлтгэдэг. Бид энэ ажлыг илүү тогтвортой болгож, жилийн турш соёлоо сурах, давтах, ойлгох, тоглолтод бэлтгэх болон залуу үедээ өвлүүлэх боломжийг нэмэгдүүлэхийг зорьж байна.",

    plansTitle:
      "Цаашид хөгжүүлэхээр төлөвлөж буй зүйлс",

    plansBody:
      "Цаг хугацааны явцад эдгээр бэлтгэл, уулзалтуудыг хүүхэд, залуус, гэр бүл болон олон нийтийн бусад гишүүдэд зориулсан тогтмол соёлын хөтөлбөр болгон хөгжүүлэхийг хүсэж байна.",

    areas: [
      {
        title: "Хэл ба соёл",
        body:
          "Монгол хэлээ сурах, давтахын зэрэгцээ түүх, зан заншил болон уламжлалаа илүү гүнзгий ойлгох боломж.",
      },
      {
        title: "Дуу, хөгжим ба бүжиг",
        body:
          "Баяр ёслол болон олон нийтийн арга хэмжээнд зориулсан монгол дуу, бүжиг, хөгжим, соёлын тоглолтын тогтмол бэлтгэл.",
      },
      {
        title: "Бөх, сур харваа ба уламжлалт тоглоом",
        body:
          "Монгол бөх, сур харваа, шагай болон бусад уламжлалт тоглоомыг зааж, тогтмол дадлага хийх боломж.",
      },
      {
        title: "Морь унах ба гадаах уламжлал",
        body:
          "Цаашид морь унах, гадаах соёлын үйл ажиллагаа болон Монгол ахуйтай холбоотой бусад уламжлалыг танилцуулах боломжууд.",
      },
      {
        title: "Монгол уламжлалт зуны зуслан",
        body:
          "Хүүхэд, залуус хэл, тоглоом, тоглолт, уламжлал болон соёлын ур чадвараа хамтдаа суралцах боломжтой жил бүрийн зуны зусланг хөгжүүлэхийг зорьж байна.",
      },
    ],
  },
} as const satisfies Record<Lang, ProgramsCopy>;

/* =========================================================
   IMAGES
========================================================= */

const IMAGES = {
  feature: "/landingpage.webp",

  belt: [
    "/impact/culture/1.webp",
    "/impact/culture/2.webp",
    "/impact/culture/3.webp",
    "/impact/culture/4.webp",
  ],
} as const;

/* =========================================================
   MOTION
========================================================= */

const easeOut = cubicBezier(
  0.22,
  1,
  0.36,
  1,
);

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

/* =========================================================
   MAIN
========================================================= */

function ProgramsMain({
  lang,
}: ProgramsMainProps) {
  const safeLang: Lang =
    lang === "mn" ? "mn" : "en";

  const copy = COPY[safeLang];

  return (
    <main
      className="
        min-h-screen
        overflow-x-clip
        bg-[#fffaf0]
        pt-20
        text-[#303824]

        lg:pt-24
      "
    >
      {/* =====================================================
          PRIMARY SPLIT
      ===================================================== */}

      <section
        className="
          grid
          lg:grid-cols-2
          lg:grid-rows-[clamp(620px,74vh,760px)]
        "
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        <motion.div
          variants={imageReveal}
          initial="hidden"
          animate="show"
          className="
            relative
            min-h-[380px]
            overflow-hidden

            sm:min-h-[460px]

            lg:h-full
            lg:min-h-0
          "
        >
          <img
            src={IMAGES.feature}
            alt=""
            aria-hidden="true"
            width={1400}
            height={1200}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          <div className="absolute inset-0 bg-black/8" />
        </motion.div>

        {/* =================================================
            INTRO
        ================================================= */}

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          className="
            flex
            bg-[#fffaf0]
            px-6
            py-14

            sm:px-8
            sm:py-16

            md:px-10

            lg:h-full
            lg:items-center
            lg:px-14
            lg:py-16

            xl:px-20
          "
        >
          <div className="mx-auto w-full max-w-[620px]">
            <h1
              className="
                text-4xl
                font-normal
                leading-[1.04]
                tracking-tight

                sm:text-5xl
                md:text-6xl
              "
            >
              {copy.title}
            </h1>

            <div
              className="
                mt-9
                border-t
                border-[#303824]/12
                pt-8
              "
            >
              <h2
                className="
                  max-w-xl
                  text-2xl
                  font-normal
                  leading-tight
                  tracking-tight

                  md:text-3xl
                "
              >
                {copy.introTitle}
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-[15px]
                  leading-8
                  text-[#59604d]

                  md:text-base
                "
              >
                {copy.introBody}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          FUTURE PROGRAMS
      ===================================================== */}

      <section
        className="
          bg-[#303824]
          px-6
          py-16
          text-[#fffaf0]

          sm:px-8
          sm:py-20

          md:px-10

          lg:px-14
          lg:py-24

          xl:px-20
        "
      >
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            mx-auto
            max-w-6xl
          "
        >
          {/* Heading */}

          <div className="max-w-2xl">
            <h2
              className="
                text-2xl
                font-normal
                leading-tight
                tracking-tight

                md:text-3xl
              "
            >
              {copy.plansTitle}
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-[#d4cebd]

                md:text-[15px]
              "
            >
              {copy.plansBody}
            </p>
          </div>

          {/* Program areas */}

          <div
            className="
              mt-10
              grid
              border-t
              border-[#fffaf0]/15

              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {copy.areas.map(
              (area, index) => (
                <article
                  key={area.title}
                  className="
                    border-b
                    border-[#fffaf0]/15
                    py-7

                    md:px-7
                    md:first:pl-0

                    lg:min-h-[13rem]

                    lg:[&:nth-child(3n+1)]:pl-0
                    lg:[&:nth-child(3n)]:pr-0
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-medium
                      tracking-[0.18em]
                      text-[#d6ba72]
                    "
                  >
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </p>

                  <h3
                    className="
                      mt-4
                      text-lg
                      font-normal
                      leading-tight

                      md:text-xl
                    "
                  >
                    {area.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-sm
                      text-sm
                      leading-7
                      text-[#cfc8b5]
                    "
                  >
                    {area.body}
                  </p>
                </article>
              ),
            )}
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          IMAGE BELT
      ===================================================== */}

      <motion.section
        variants={imageReveal}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="
          grid
          grid-cols-2

          md:grid-cols-4
        "
      >
        {IMAGES.belt.map(
          (src) => (
            <div
              key={src}
              className="
                relative
                aspect-[4/3]
                overflow-hidden

                md:aspect-[5/4]
              "
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                width={800}
                height={640}
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center

                  transition-transform
                  duration-700
                  ease-out

                  hover:scale-[1.025]
                "
              />

              <div className="absolute inset-0 bg-black/[0.04]" />
            </div>
          ),
        )}
      </motion.section>
    </main>
  );
}

export default memo(ProgramsMain);