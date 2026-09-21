import {
  COPY,
  VOLUNTEER_LISTINGS,
  type Lang,
} from "./content/VolunteerMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import StableImageReveal from "../../components/media/StableImageReveal";
import { involvementMedia } from "./media";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type VolunteerProps = {
  lang: Lang;
};

/* -------------------------------------------------------------------------- */
/*                                   Theme                                    */
/* -------------------------------------------------------------------------- */

const COLORS = {
  green: "#303824",
  cream: "#fffaf0",

  darkText: "#303824",
  bodyText: "#59604d",
  mutedText: "#747b68",

  lightText: "#fffaf0",
  lightMuted: "#e9e2d1",

  gold: "#d6ba72",
} as const;

/* -------------------------------------------------------------------------- */
/*                           Volunteer Opportunities                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    Copy                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Animation                                   */
/* -------------------------------------------------------------------------- */

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const pageMotion: Variants = {
  hidden: {},
  show: {},
};

const sectionMotion: Variants = {
  hidden: {},
  show: {},
};

const imageMotion: Variants = {
  hidden: {},
  show: {},
};

const listingMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                              Volunteer Page                                */
/* -------------------------------------------------------------------------- */

function Volunteer({ lang }: VolunteerProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = COPY[safeLang];

  const scrollToOpportunities = () => {
    document.getElementById("volunteer-opportunities")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
        "
      >
        {/* ================================================================== */}
        {/* Top Left — Photo                                                   */}
        {/* ================================================================== */}

        <motion.section
          variants={imageMotion}
          className="
            order-2
            relative
            min-h-[340px]
            overflow-hidden
            sm:min-h-[440px]
            lg:order-1
            lg:min-h-[95vh]
          "
        >
          <StableImageReveal
            src={involvementMedia.volunteer.topLeft}
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
        {/* Top Right — Introduction                                           */}
        {/* ================================================================== */}

        <motion.section
          variants={sectionMotion}
          className="
            order-1
            flex
            bg-[#303824]
            px-6
            pb-16
            pt-36
            text-[#fffaf0]
            sm:px-8
            sm:pt-40
            md:px-10
            lg:order-2
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
                text-[#e9e2d1]
                md:text-base
              "
            >
              {copy.body}
            </p>

            <button
              type="button"
              onClick={scrollToOpportunities}
              className="
                mt-8
                border
                border-[#fffaf0]
                bg-[#fffaf0]
                px-5
                py-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-[#303824]
                transition-colors
                duration-200
                hover:bg-transparent
                hover:text-[#fffaf0]
              "
            >
              {copy.opportunitiesButton}
            </button>

            <div
              className="
                mt-8
                max-w-lg
                border-t
                border-[#fffaf0]/15
                pt-6
              "
            >
              <p
                className="
                  max-w-md
                  text-sm
                  leading-7
                  text-[#cfc8b5]
                "
              >
                {copy.galleryText}
              </p>

              <Link
                to="/gallery"
                className="
                  mt-4
                  inline-block
                  border
                  border-[#fffaf0]/40
                  px-5
                  py-3
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-[#fffaf0]
                  no-underline
                  transition-colors
                  duration-200
                  hover:border-[#fffaf0]
                  hover:bg-[#fffaf0]
                  hover:text-[#303824]
                "
              >
                {copy.galleryButton}
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ================================================================== */}
        {/* Bottom Left — Opportunities                                        */}
        {/* ================================================================== */}

        <motion.section
          id="volunteer-opportunities"
          variants={sectionMotion}
          className="
            order-3
            flex
            scroll-mt-24
            bg-[#fffaf0]
            px-6
            py-14
            text-[#303824]
            sm:px-8
            md:px-10
            lg:h-[75vh]
            lg:px-14
            lg:py-12
            xl:px-20
          "
        >
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[660px]
              flex-col
              lg:min-h-0
            "
          >
            <header
              className="
                shrink-0
                border-b
                border-[#303824]/15
                pb-5
              "
            >
              <h2
                className="
                  text-2xl
                  font-normal
                  leading-tight
                  tracking-tight
                  md:text-3xl
                "
              >
                {copy.listingsTitle}
              </h2>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#9a7b30]
                "
              >
                {copy.listingsHint}
              </p>
            </header>

            {VOLUNTEER_LISTINGS.length > 0 ? (
              <div
                className="
                  mt-1
                  lg:min-h-0
                  lg:flex-1
                  lg:overflow-y-auto
                  lg:pr-3

                  [&::-webkit-scrollbar]:w-[3px]
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-[#303824]/25
                  hover:[&::-webkit-scrollbar-thumb]:bg-[#303824]/40
                "
              >
                {VOLUNTEER_LISTINGS.map((listing) => (
                  <motion.article
                    key={listing.id}
                    variants={listingMotion}
                    className="
                      border-b
                      border-[#303824]/15
                      py-6
                    "
                  >
                    <div
                      className="
                        grid
                        gap-4
                        sm:grid-cols-[110px_1fr_auto]
                        sm:items-start
                        sm:gap-6
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-[#9a7b30]
                          "
                        >
                          {listing.date[safeLang]}
                        </p>

                        <p
                          className="
                            mt-2
                            text-xs
                            leading-5
                            text-[#747b68]
                          "
                        >
                          {listing.eventTitle[safeLang]}
                        </p>
                      </div>

                      <div>
                        <h3
                          className="
                            text-base
                            font-normal
                            leading-6
                            text-[#303824]
                          "
                        >
                          {listing.role[safeLang]}
                        </h3>

                        <p
                          className="
                            mt-2
                            max-w-md
                            text-[13px]
                            leading-6
                            text-[#59604d]
                          "
                        >
                          {listing.description[safeLang]}
                        </p>
                      </div>

                      <Link
                        to={listing.href}
                        className="
                          w-fit
                          whitespace-nowrap
                          border
                          border-[#303824]/30
                          px-3
                          py-2
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.14em]
                          text-[#303824]
                          no-underline
                          transition-colors
                          duration-200
                          hover:border-[#303824]
                          hover:bg-[#303824]
                          hover:text-[#fffaf0]
                        "
                      >
                        {copy.viewEvent}
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <p className="py-7 text-sm leading-7 text-[#59604d]">
                {copy.noListings}
              </p>
            )}
          </div>
        </motion.section>

        {/* ================================================================== */}
        {/* Bottom Right — Photo                                               */}
        {/* ================================================================== */}

        <motion.section
          variants={imageMotion}
          className="
            order-4
            relative
            min-h-[340px]
            overflow-hidden
            sm:min-h-[440px]
            lg:min-h-[75vh]
          "
        >
          <StableImageReveal
            src={involvementMedia.volunteer.bottomRight}
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
      </motion.div>
    </main>
  );
}

export default Volunteer;
