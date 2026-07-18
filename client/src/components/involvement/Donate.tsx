
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

    moneyTitle: "Financial donations",
    moneyBody:
      "Financial support helps cover event spaces, equipment, materials, food, transportation, and other program costs.",
    moneyNote:
      "We do not currently have an online donation portal. Financial donations can be sent by bank e-transfer.",

    itemsTitle: "Items and materials",
    itemsBody:
      "We may also accept useful items, supplies, equipment, decorations, food, or other materials that can support upcoming events and community activities.",
    itemsNote:
      "Please contact us before donating items so we can confirm what is currently needed and arrange delivery or pickup.",

    emailLabel: "Donation contact",
  },

  mn: {
    eyebrow: "Биднийг дэмжих",
    title: "Олон нийтийг дэмжихэд бидэнд туслаарай",
    body:
      "Хандив нь Этүгэн Монголчуудын соёлын арга хэмжээ, хүүхэд залуусын үйл ажиллагаа, тоглолт, уулзалт болон ирээдүйн олон нийтийн хөтөлбөрүүдийг зохион байгуулахад дэмжлэг болдог.",

    panelTitle: "Дэмжлэг үзүүлэх хэлбэрүүд",

    moneyTitle: "Мөнгөн хандив",
    moneyBody:
      "Мөнгөн хандив нь арга хэмжээний байр, тоног төхөөрөмж, материал, хоол хүнс, тээвэр болон бусад зардлыг санхүүжүүлэхэд тусална.",
    moneyNote:
      "Одоогоор онлайн хандивын систем байхгүй байна. Мөнгөн хандивыг банкны e-transfer хэлбэрээр илгээж болно.",

    itemsTitle: "Эд зүйл болон материал",
    itemsBody:
      "Бид удахгүй болох арга хэмжээ болон олон нийтийн үйл ажиллагаанд ашиглах боломжтой хэрэгсэл, материал, тоног төхөөрөмж, чимэглэл, хүнс болон бусад эд зүйлсийг хүлээн авч болно.",
    itemsNote:
      "Эд зүйл хандивлахаас өмнө бидэнтэй холбогдож, одоогоор юу хэрэгтэй байгааг болон хүргэлт, хүлээн авах нөхцөлийг баталгаажуулна уу.",

    emailLabel: "Хандивын холбоо барих хаяг",
  },
} as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.48,
      ease: easeOut,
    },
  },
};

function Donate({ lang }: DonateProps) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "en";
  const copy = COPY[safeLang];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2f3320] text-[#27301d]">
      <img
        src="/about/founding-group.webp"
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/52" />
      <div className="absolute inset-0 bg-linear-to-r from-black/82 via-black/52 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/64" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-20 pt-28 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pt-32">
        <motion.section
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-[#fffaf0]"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#e1d2a6]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#f3ead2] md:text-base">
            {copy.body}
          </p>
        </motion.section>

        <motion.aside
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="w-full bg-[#fffaf0]/97 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.30)] md:p-8 lg:justify-self-end lg:p-10"
        >
          <h2 className="text-2xl font-normal leading-tight text-[#27301d] md:text-3xl">
            {copy.panelTitle}
          </h2>

          <div className="mt-8 border-t border-[#d8cba8]">
            <section className="border-b border-[#d8cba8] py-7">
              <h3 className="text-lg font-normal text-[#27301d]">
                {copy.moneyTitle}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-[#4e593c]">
                {copy.moneyBody}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#667056]">
                {copy.moneyNote}
              </p>
            </section>

            <section className="border-b border-[#d8cba8] py-7">
              <h3 className="text-lg font-normal text-[#27301d]">
                {copy.itemsTitle}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-[#4e593c]">
                {copy.itemsBody}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#667056]">
                {copy.itemsNote}
              </p>
            </section>
          </div>

          <div className="pt-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#9a7b26]">
              {copy.emailLabel}
            </p>

            <a
              href={`mailto:${DONATION_EMAIL}`}
              className="mt-3 block break-all text-xl font-normal leading-tight text-[#27301d] no-underline transition-colors hover:text-[#9a7b26] sm:text-2xl"
            >
              {DONATION_EMAIL}
            </a>
          </div>
        </motion.aside>
      </div>
    </main>
  );
}

export default memo(Donate);
