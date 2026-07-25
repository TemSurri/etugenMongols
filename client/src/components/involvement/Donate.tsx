"use client";

import { memo } from "react";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type DonateProps = {
  lang: Lang;
};

/* -------------------------------------------------------------------------- */
/*                                  Config                                    */
/* -------------------------------------------------------------------------- */

const DONATION_EMAIL = "calgarymongolian@gmail.com";

const DONATE_IMAGES = {
  topRight: "/impact/culture/1.webp",
  bottomLeft: "/impact/youth/1.webp",
} as const;

const COLORS = {
  green: "#303824",
  cream: "#fffaf0",
  warmCream: "#e9e2d1",
  muted: "#cfc8b5",
  gold: "#d6ba72",
  darkText: "#303824",
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Copy                                     */
/* -------------------------------------------------------------------------- */

const COPY = {
  en: {
    heading: "Donate with us",

    body:
      "Your support helps Etugen Mongols continue creating cultural events, youth activities, performances, gatherings, and future community programs in Calgary. Every contribution helps us build welcoming spaces where culture and community can grow.",

    waysTitle: "Two ways to support",

    moneyShortTitle: "Financial donations",
    moneyShortBody:
      "Support event costs, materials, equipment, food, transportation, and future programming.",

    itemShortTitle: "Items and materials",
    itemShortBody:
      "Contribute useful supplies, equipment, food, decorations, or other materials needed for upcoming activities.",

    actionHeading: "How to donate",

    moneyTitle: "Financial donations",
    moneyBody:
      "Financial support helps cover event spaces, equipment, materials, food, transportation, and other costs connected to our programs and community events.",

    moneyNote:
      "We do not currently have an online donation portal. Financial donations can be sent by bank e-transfer to:",

    itemsTitle: "Items and materials",
    itemsBody:
      "We may also accept useful supplies, equipment, decorations, food, and other materials that can support upcoming events and community activities.",

    itemsNote:
      "Please contact us before donating items so we can confirm what is currently needed and arrange delivery or pickup:",

    emailLabel: "Donation email",
  },

  mn: {
    heading: "Биднийг хандиваар дэмжээрэй",

    body:
      "Таны дэмжлэг Этүгэн Монголчуудын соёлын арга хэмжээ, хүүхэд залуусын үйл ажиллагаа, тоглолт, уулзалт болон Калгари хот дахь ирээдүйн олон нийтийн хөтөлбөрүүдийг үргэлжлүүлэн хөгжүүлэхэд тусалдаг. Таны оруулсан хувь нэмэр соёл, олон нийт хамтдаа хөгжих тав тухтай орчныг бүрдүүлэхэд дэмжлэг болно.",

    waysTitle: "Дэмжих хоёр арга",

    moneyShortTitle: "Мөнгөн хандив",
    moneyShortBody:
      "Арга хэмжээ, материал, тоног төхөөрөмж, хоол хүнс, тээвэр болон ирээдүйн хөтөлбөрүүдийн зардлыг дэмжинэ.",

    itemShortTitle: "Эд зүйл болон материал",
    itemShortBody:
      "Удахгүй болох үйл ажиллагаанд шаардлагатай хэрэгсэл, тоног төхөөрөмж, хоол хүнс, чимэглэл болон бусад материалыг хандивлах боломжтой.",

    actionHeading: "Хэрхэн хандивлах вэ",

    moneyTitle: "Мөнгөн хандив",
    moneyBody:
      "Мөнгөн хандив нь арга хэмжээний байр, тоног төхөөрөмж, материал, хоол хүнс, тээвэр болон олон нийтийн хөтөлбөртэй холбоотой бусад зардлыг санхүүжүүлэхэд тусална.",

    moneyNote:
      "Одоогоор онлайн хандивын систем байхгүй байна. Мөнгөн хандивыг банкны e-transfer хэлбэрээр дараах хаяг руу илгээж болно:",

    itemsTitle: "Эд зүйл болон материал",
    itemsBody:
      "Бид удахгүй болох арга хэмжээ болон олон нийтийн үйл ажиллагаанд ашиглах боломжтой хэрэгсэл, тоног төхөөрөмж, чимэглэл, хүнс болон бусад материалыг хүлээн авч болно.",

    itemsNote:
      "Эд зүйл хандивлахаас өмнө одоогоор юу хэрэгтэй байгааг болон хүргэлт, хүлээн авах нөхцөлийг баталгаажуулахын тулд бидэнтэй холбогдоно уу:",

    emailLabel: "Хандивын имэйл",
  },
} as const;

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

const imageMotion: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.015,
  },

  show: {
    opacity: 1,
    scale: 1,

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
      className="min-h-screen"
      style={{ backgroundColor: COLORS.green }}
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
        {/* ---------------------------------------------------------------- */}
        {/* Top Left — Intro                                                 */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={sectionMotion}
          className="
            order-1
            flex
            bg-[#fffaf0]
            px-6
            pb-16
            pt-32
            text-[#303824]
            sm:px-8
            md:px-10
            md:pt-36
            lg:min-h-[50vh]
            lg:items-center
            lg:px-14
            lg:py-16
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

            <div className="mt-10 border-t border-[#303824]/15 pt-6">
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#9a7b30]
                "
              >
                {copy.waysTitle}
              </p>

              <div className="mt-6 grid gap-7 sm:grid-cols-2">
                <div>
                  <h2 className="text-lg font-normal">
                    {copy.moneyShortTitle}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#69705c]">
                    {copy.moneyShortBody}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-normal">
                    {copy.itemShortTitle}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#69705c]">
                    {copy.itemShortBody}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Top Right — Photo                                                */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={imageMotion}
          className="
            order-2
            relative
            min-h-[340px]
            overflow-hidden
            sm:min-h-[440px]
            lg:min-h-[50vh]
          "
        >
          <img
            src={DONATE_IMAGES.topRight}
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

        {/* ---------------------------------------------------------------- */}
        {/* Bottom Left — Photo                                              */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={imageMotion}
          className="
            order-4
            relative
            min-h-[340px]
            overflow-hidden
            sm:min-h-[440px]
            lg:order-3
            lg:min-h-[50vh]
          "
        >
          <img
            src={DONATE_IMAGES.bottomLeft}
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

        {/* ---------------------------------------------------------------- */}
        {/* Bottom Right — Donation Actions                                  */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          variants={sectionMotion}
          className="
            order-3
            bg-[#303824]
            px-6
            py-16
            text-[#fffaf0]
            sm:px-8
            md:px-10
            lg:order-4
            lg:min-h-[50vh]
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
              {copy.actionHeading}
            </h2>

            {/* Financial Donation */}
            <article className="mt-8 border-t border-[#fffaf0]/15 pt-7">
              <h3 className="text-xl font-normal">
                {copy.moneyTitle}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#d8d1bf]">
                {copy.moneyBody}
              </p>

              <div className="mt-5 border-l-2 border-[#d6ba72] pl-4">
                <p className="text-sm leading-7 text-[#cfc8b5]">
                  {copy.moneyNote}
                </p>

                <a
                  href={`mailto:${DONATION_EMAIL}`}
                  className="
                    mt-2
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
            </article>

            {/* Item Donation */}
            <article className="mt-8 border-t border-[#fffaf0]/15 pt-7">
              <h3 className="text-xl font-normal">
                {copy.itemsTitle}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#d8d1bf]">
                {copy.itemsBody}
              </p>

              <div className="mt-5 border-l-2 border-[#d6ba72] pl-4">
                <p className="text-sm leading-7 text-[#cfc8b5]">
                  {copy.itemsNote}
                </p>

                <a
                  href={`mailto:${DONATION_EMAIL}`}
                  className="
                    mt-2
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
            </article>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

export default memo(Donate);