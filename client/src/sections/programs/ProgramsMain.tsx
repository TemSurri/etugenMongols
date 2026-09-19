import { COPY, type Lang } from "./content/ProgramsMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { programsMedia } from "./media";

type ProgramsMainProps = {
  lang: Lang;
};

/* =========================================================
   COPY
========================================================= */

/* =========================================================
   MOTION
========================================================= */

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

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

function ProgramsMain({ lang }: ProgramsMainProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";

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
            src={programsMedia.feature}
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
            {copy.areas.map((area, index) => (
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
                  {String(index + 1).padStart(2, "0")}
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
            ))}
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
        {programsMedia.belt.map((src) => (
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
        ))}
      </motion.section>
    </main>
  );
}

export default memo(ProgramsMain);
