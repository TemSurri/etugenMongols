"use client";

import { memo } from "react";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type DonateProps = {
  lang: Lang;
};

const DONATION_EMAIL = "donations@etugenmongols.org";

const COPY = {
  en: {
    eyebrow: "Support Our Work",
    title: "Help us support the community",
    body:
      "Donations help Etugen Mongols organize cultural events, youth activities, performances, gatherings, and future community programs in Calgary.",

    panelTitle: "Ways to contribute",

    moneyNumber: "01",
    moneyTitle: "Financial donations",
    moneyBody:
      "Financial support helps cover event spaces, equipment, materials, food, transportation, and other program costs.",
    moneyNote:
      "We do not currently have an online donation portal. Financial donations can be sent by bank e-transfer.",

    itemsNumber: "02",
    itemsTitle: "Items and materials",
    itemsBody:
      "We may also accept useful items, supplies, equipment, decorations, food, or other materials that can support upcoming events and community activities.",
    itemsNote:
      "Please contact us before donating items so we can confirm what is currently needed and arrange delivery or pickup.",

    emailLabel: "Donation contact",
    emailAction: "Send an email",
  },

  mn: {
    eyebrow: "Биднийг дэмжих",
    title: "Олон нийтийг дэмжихэд бидэнд туслаарай",
    body:
      "Хандив нь Этүгэн Монголчуудын соёлын арга хэмжээ, хүүхэд залуусын үйл ажиллагаа, тоглолт, уулзалт болон ирээдүйн олон нийтийн хөтөлбөрүүдийг зохион байгуулахад дэмжлэг болдог.",

    panelTitle: "Дэмжлэг үзүүлэх хэлбэрүүд",

    moneyNumber: "01",
    moneyTitle: "Мөнгөн хандив",
    moneyBody:
      "Мөнгөн хандив нь арга хэмжээний байр, тоног төхөөрөмж, материал, хоол хүнс, тээвэр болон бусад зардлыг санхүүжүүлэхэд тусална.",
    moneyNote:
      "Одоогоор онлайн хандивын систем байхгүй байна. Мөнгөн хандивыг банкны e-transfer хэлбэрээр илгээж болно.",

    itemsNumber: "02",
    itemsTitle: "Эд зүйл болон материал",
    itemsBody:
      "Бид удахгүй болох арга хэмжээ болон олон нийтийн үйл ажиллагаанд ашиглах боломжтой хэрэгсэл, материал, тоног төхөөрөмж, чимэглэл, хүнс болон бусад эд зүйлсийг хүлээн авч болно.",
    itemsNote:
      "Эд зүйл хандивлахаас өмнө бидэнтэй холбогдож, одоогоор юу хэрэгтэй байгааг болон хүргэлт, хүлээн авах нөхцөлийг баталгаажуулна уу.",

    emailLabel: "Хандивын холбоо барих хаяг",
    emailAction: "Имэйл илгээх",
  },
} as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.52,
      ease: easeOut,
    },
  },
};

const imageMotion: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.02,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.75,
      ease: easeOut,
    },
  },
};

function Donate({ lang }: DonateProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = COPY[safeLang];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e7] text-[#27301d]">
      <section className="relative overflow-hidden bg-[#27301d]">
        <motion.div
          variants={imageMotion}
          initial="hidden"
          animate="show"
          className="relative h-[25rem] sm:h-[29rem] lg:h-[34rem]"
        >
          <img
            src="/about/founding-group.webp"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-linear-to-r from-black/78 via-black/42 to-black/15" />

          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/60" />
        </motion.div>

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-end px-6 pb-16 pt-28 md:px-10 md:pb-20 lg:px-12">
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              animate="show"
              className="max-w-3xl text-[#fffaf0]"
            >
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#d5bd79]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 max-w-2xl text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {copy.title}
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#eee5cf] md:text-base">
                {copy.body}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-20 md:px-10 lg:px-12">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="mx-auto -mt-10 max-w-6xl bg-[#fffaf0] shadow-[0_24px_70px_rgba(39,48,29,0.16)] md:-mt-14"
        >
          <div className="border-b border-[#d8cba8] px-6 py-7 md:px-10 md:py-8">
            <h2 className="text-2xl font-normal leading-tight md:text-3xl">
              {copy.panelTitle}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2">
            <section className="border-b border-[#d8cba8] p-6 md:p-10 lg:border-b-0 lg:border-r">
              <p className="text-sm text-[#b39135]">
                {copy.moneyNumber}
              </p>

              <h3 className="mt-5 text-2xl font-normal leading-tight">
                {copy.moneyTitle}
              </h3>

              <p className="mt-5 text-[15px] leading-8 text-[#4e593c]">
                {copy.moneyBody}
              </p>

              <p className="mt-4 text-sm leading-7 text-[#667056]">
                {copy.moneyNote}
              </p>
            </section>

            <section className="p-6 md:p-10">
              <p className="text-sm text-[#b39135]">
                {copy.itemsNumber}
              </p>

              <h3 className="mt-5 text-2xl font-normal leading-tight">
                {copy.itemsTitle}
              </h3>

              <p className="mt-5 text-[15px] leading-8 text-[#4e593c]">
                {copy.itemsBody}
              </p>

              <p className="mt-4 text-sm leading-7 text-[#667056]">
                {copy.itemsNote}
              </p>
            </section>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#d8cba8] bg-[#ede5d2] px-6 py-7 md:flex-row md:items-center md:justify-between md:px-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#927322]">
                {copy.emailLabel}
              </p>

              <a
                href={`mailto:${DONATION_EMAIL}`}
                className="mt-2 block break-all text-lg font-normal text-[#27301d] no-underline transition-colors hover:text-[#927322] md:text-xl"
              >
                {DONATION_EMAIL}
              </a>
            </div>

            <a
              href={`mailto:${DONATION_EMAIL}`}
              className="inline-flex w-fit items-center border border-[#27301d] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#27301d] hover:text-[#fffaf0]"
            >
              {copy.emailAction}

              <span className="ml-3" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default memo(Donate);