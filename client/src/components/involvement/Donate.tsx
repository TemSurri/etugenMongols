"use client";

import { memo } from "react";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type DonateProps = {
  lang: Lang;
};

const DONATION_EMAIL = "calgarymongolian@gmail.com";

const COPY = {
  en: {
    imageTitle: "Donate",

    heading: "Help Support Us",

    body:
      "Donations help Etugen Mongols organize cultural events, youth activities, performances, gatherings, and future community programs in Calgary. Every contribution helps us create welcoming and meaningful experiences for the community.",

    moneyTitle: "Financial donations",
    moneyBody:
      "Financial support helps cover event spaces, equipment, materials, food, transportation, and other costs connected to our programs and community events.",
    moneyNote:
      "We do not currently have an online donation portal. Financial donations can be sent by bank e-transfer to",

    itemsTitle: "Items and materials",
    itemsBody:
      "We may also accept useful supplies, equipment, decorations, food, and other materials that can support upcoming events and community activities.",
    itemsNote:
      "Please contact us before donating items so we can confirm what is currently needed and arrange delivery or pickup at",
  },

  mn: {
    imageTitle: "Хандив",


    heading: "Олон нийтийг дэмжихэд туслаарай",

    body:
      "Хандив нь Этүгэн Монголчуудын соёлын арга хэмжээ, хүүхэд залуусын үйл ажиллагаа, тоглолт, уулзалт болон ирээдүйн олон нийтийн хөтөлбөрүүдийг зохион байгуулахад дэмжлэг болдог. Таны оруулсан хувь нэмэр олон нийтэд зориулсан тав тухтай, утга учиртай үйл ажиллагааг бий болгоход тусална.",

    moneyTitle: "Мөнгөн хандив",
    moneyBody:
      "Мөнгөн хандив нь арга хэмжээний байр, тоног төхөөрөмж, материал, хоол хүнс, тээвэр болон олон нийтийн хөтөлбөртэй холбоотой бусад зардлыг санхүүжүүлэхэд тусална.",
    moneyNote:
      "Одоогоор онлайн хандивын систем байхгүй байна. Мөнгөн хандивыг банкны e-transfer хэлбэрээр дараах хаяг руу илгээж болно:",

    itemsTitle: "Эд зүйл болон материал",
    itemsBody:
      "Бид удахгүй болох арга хэмжээ болон олон нийтийн үйл ажиллагаанд ашиглах боломжтой хэрэгсэл, тоног төхөөрөмж, чимэглэл, хүнс болон бусад материалыг хүлээн авч болно.",
    itemsNote:
      "Эд зүйл хандивлахаас өмнө одоогоор юу хэрэгтэй байгааг болон хүргэлт, хүлээн авах нөхцөлийг баталгаажуулахын тулд дараах хаягаар бидэнтэй холбогдоно уу:",
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
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const imageMotion: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.65,
      ease: easeOut,
    },
  },
};

function Donate({ lang }: DonateProps) {
  const safeLang: Lang = lang === "mn" ? "mn" : "en";
  const copy = COPY[safeLang];

  return (
    <main className="min-h-screen overflow-visible bg-[#fffaf0] text-[#27301d]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 pt-36 md:px-10 md:pb-28 md:pt-40 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16 lg:px-12 lg:pb-32 lg:pt-40">
        <motion.aside
          variants={imageMotion}
          initial="hidden"
          animate="show"
          className="w-full max-w-[500px] self-start lg:sticky lg:top-32"
        >
          <div className="bg-[#27301d] p-4 text-[#fffaf0] shadow-[0_20px_55px_rgba(39,48,29,0.18)] sm:p-5">
            <h1 className="px-1 pb-4 text-4xl font-normal leading-none tracking-tight sm:text-5xl lg:text-6xl">
              {copy.imageTitle}
            </h1>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#39422c]">
              <img
                src="/about/founding-group.webp"
                alt={copy.imageTitle}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 via-black/15 to-transparent px-5 pb-5 pt-16">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#fffaf0]">
                  Etugen Mongols
                </p>
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.section
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <header className="max-w-2xl">
            <h2 className="mt-4 text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {copy.heading}
            </h2>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#566044] md:text-base">
              {copy.body}
            </p>
          </header>

          <section className="mt-12 border-t border-[#27301d]/20">
            <article className="border-b border-[#27301d]/20 py-8">
              <h3 className="text-xl font-normal leading-tight text-[#27301d] md:text-2xl">
                {copy.moneyTitle}
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#566044]">
                {copy.moneyBody}
              </p>

              <div className="mt-5 border-l-2 border-[#b8953b] pl-4">
                <p className="text-sm leading-7 text-[#697259]">
                  {copy.moneyNote}
                </p>

                <a
                  href={`mailto:${DONATION_EMAIL}`}
                  className="mt-2 block w-fit break-all text-sm font-medium text-[#27301d] underline decoration-[#b8953b] underline-offset-4 transition-colors duration-200 hover:text-[#927322]"
                >
                  {DONATION_EMAIL}
                </a>
              </div>
            </article>

            <article className="border-b border-[#27301d]/20 py-8">
              <h3 className="text-xl font-normal leading-tight text-[#27301d] md:text-2xl">
                {copy.itemsTitle}
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#566044]">
                {copy.itemsBody}
              </p>

              <div className="mt-5 border-l-2 border-[#b8953b] pl-4">
                <p className="text-sm leading-7 text-[#697259]">
                  {copy.itemsNote}
                </p>

                <a
                  href={`mailto:${DONATION_EMAIL}`}
                  className="mt-2 block w-fit break-all text-sm font-medium text-[#27301d] underline decoration-[#b8953b] underline-offset-4 transition-colors duration-200 hover:text-[#927322]"
                >
                  {DONATION_EMAIL}
                </a>
              </div>
            </article>
          </section>
        </motion.section>
      </div>
    </main>
  );
}

export default memo(Donate);