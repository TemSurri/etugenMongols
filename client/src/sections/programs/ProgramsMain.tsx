import { COPY, type Lang } from "./content/ProgramsMainContent";

import { memo } from "react";
import StableImageReveal from "../../components/media/StableImageReveal";
import { programsMedia } from "./media";

type ProgramsMainProps = {
  lang: Lang;
};

/* =========================================================
   COPY
========================================================= */

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

        <div
          className="
            relative
            min-h-[380px]
            overflow-hidden

            sm:min-h-[460px]

            lg:h-full
            lg:min-h-0
          "
        >
          <StableImageReveal
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

          <div className="absolute inset-0 z-20 bg-black/8" />
        </div>

        {/* =================================================
            INTRO
        ================================================= */}

        <div
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
              role="status"
              className="mt-7 border-l-2 border-[#9a7b26] bg-white/55 px-5 py-4"
            >
              <p className="text-base font-semibold text-[#303824]">
                {copy.statusTitle}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#59604d]">
                {copy.statusBody}
              </p>
            </div>

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
        </div>
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
        <div
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
        </div>
      </section>

      {/* =====================================================
          IMAGE BELT
      ===================================================== */}

      <section
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
            <StableImageReveal
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

                "
            />

            <div className="absolute inset-0 z-20 bg-black/[0.04]" />
          </div>
        ))}
      </section>
    </main>
  );
}

export default memo(ProgramsMain);
