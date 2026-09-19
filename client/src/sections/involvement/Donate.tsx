import type { Lang } from "../../context/language";
import { COPY } from "./content/DonateContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import { involvementMedia } from "./media";

type DonateProps = {
  lang: Lang;
};

/* -------------------------------------------------------------------------- */
/*                                  Config                                    */
/* -------------------------------------------------------------------------- */

const DONATION_EMAIL = "info@etugen-mongols.ca";

const COLORS = {
  green: "#303824",
  cream: "#fffaf0",
  body: "#59604d",
  muted: "#cfc8b5",
  gold: "#d6ba72",
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Copy                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Animation                                   */
/* -------------------------------------------------------------------------- */

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const pageMotion: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const sectionMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: easeOut,
    },
  },
};

/*
 * Images only fade in.
 *
 * We intentionally don't scale the section anymore.
 * Scaling a full-width grid section can temporarily make
 * its painted area wider than the viewport and cause
 * scrollbar/layout-shift artifacts.
 */
const imageMotion: Variants = {
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

/* -------------------------------------------------------------------------- */
/*                                Donate Page                                 */
/* -------------------------------------------------------------------------- */

function Donate({ lang }: DonateProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = COPY[safeLang];

  return (
    <main
      className="min-h-screen overflow-x-clip"
      style={{
        backgroundColor: COLORS.green,
      }}
    >
      <motion.div
        variants={pageMotion}
        initial="hidden"
        animate="show"
        className="
          grid
          min-h-screen
          lg:grid-cols-2
          lg:grid-rows-2
        "
      >
        {/* ================================================================== */}
        {/* Top Left — Financial Donations                                     */}
        {/* ================================================================== */}

        <motion.section
          variants={sectionMotion}
          className="
            order-1
            flex
            bg-[#fffaf0]
            px-6
            pb-16
            pt-36
            text-[#303824]
            sm:px-8
            sm:pt-40
            md:px-10
            lg:min-h-[95vh]
            lg:items-center
            lg:px-14
            lg:pb-16
            lg:pt-40
            xl:px-20
          "
        >
          <div className="mx-auto w-full max-w-[620px]">
            <h1
              className="
                text-3xl
                font-normal
                leading-[1.08]
                tracking-tight
                sm:text-4xl
                md:text-5xl
              "
            >
              {copy.heading}
            </h1>

            <p
              className="
                mt-6
                max-w-xl
                text-[15px]
                leading-8
                text-[#59604d]
                md:text-base
              "
            >
              {copy.body}
            </p>

            <div className="mt-7">
              <Link
                to="/payments/donate-money"
                className="
                  inline-flex
                  items-center
                  justify-center
                  bg-[#303824]
                  px-7
                  py-3
                  text-sm
                  font-medium
                  text-[#fffaf0]
                  transition-all
                  duration-200
                  ease-out
                  hover:-translate-y-px
                  hover:bg-[#242a1b]
                "
              >
                {copy.donateButton}
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ================================================================== */}
        {/* Top Right — Photo                                                  */}
        {/* ================================================================== */}

        <motion.section
          variants={imageMotion}
          className="
            order-2
            relative
            min-h-[340px]
            overflow-hidden
            sm:min-h-[440px]
            lg:min-h-[65vh]
          "
        >
          <img
            src={involvementMedia.donate.topRight}
            alt=""
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
        </motion.section>

        {/* ================================================================== */}
        {/* Bottom Left — Photo                                                */}
        {/* ================================================================== */}

        <motion.section
          variants={imageMotion}
          className="
            order-4
            relative
            min-h-[340px]
            overflow-hidden
            sm:min-h-[440px]
            lg:order-3
            lg:min-h-[70vh]
          "
        >
          <img
            src={involvementMedia.donate.bottomLeft}
            alt=""
            loading="lazy"
            decoding="async"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />
        </motion.section>

        {/* ================================================================== */}
        {/* Bottom Right — Non-Monetary Donations                              */}
        {/* ================================================================== */}

        <motion.section
          variants={sectionMotion}
          className="
            order-3
            flex
            bg-[#303824]
            px-6
            py-16
            text-[#fffaf0]
            sm:px-8
            md:px-10
            lg:order-4
            lg:min-h-[70vh]
            lg:items-center
            lg:px-14
            lg:py-16
            xl:px-20
          "
        >
          <div className="mx-auto w-full max-w-[660px]">
            <h2
              className="
                text-2xl
                font-normal
                leading-tight
                tracking-tight
                md:text-3xl
              "
            >
              {copy.itemsTitle}
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#d8d1bf]
              "
            >
              {copy.itemsBody}
            </p>

            <div className="mt-7 border-t border-[#fffaf0]/15 pt-7">
              <p
                className="
                  max-w-xl
                  text-sm
                  leading-7
                  text-[#cfc8b5]
                "
              >
                {copy.itemsNote}
              </p>

              <a
                href={`mailto:${DONATION_EMAIL}`}
                className="
                  mt-4
                  block
                  w-fit
                  break-all
                  text-sm
                  font-medium
                  text-[#fffaf0]
                  underline
                  decoration-[#d6ba72]
                  underline-offset-4
                  transition-colors
                  duration-200
                  hover:text-[#d6ba72]
                "
              >
                {DONATION_EMAIL}
              </a>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

export default memo(Donate);
