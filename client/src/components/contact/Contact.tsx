"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaFacebook } from "react-icons/fa";
import heroBg from "../../assets/landingpage.webp";

type Lang = "en" | "mn";

type ContactProps = {
  lang?: Lang;
};

const COPY = {
  en: {
    albumTitle: "Contact",
    title: "Have questions or ideas?",
    body:
      "Whether you want to collaborate, volunteer, suggest an event, or simply learn more about Etugen Mongols, we would be glad to hear from you. Reach out by email or connect with us on Facebook, and our team will respond when possible.",
    emailLabel: "Send us an email",
    facebookLabel: "Visit our Facebook page",
    email: "info@etugen-mongols.ca",
    facebook: "Etugen Mongols",
    facebookUrl:
      "https://www.facebook.com/profile.php?id=61584273744310",
    
  },

  mn: {
    albumTitle: "Холбоо барих",
    title: "Асуух зүйл эсвэл санал байна уу?",
    body:
      "Хамтран ажиллах, сайн дурын ажилд оролцох, арга хэмжээ санал болгох эсвэл Этүгэн Монголчуудын талаар дэлгэрэнгүй мэдэхийг хүсвэл бидэнтэй холбогдоорой. Та бидэнд имэйл илгээх эсвэл Фэйсбүүк хуудсаар дамжуулан холбогдох боломжтой.",
    emailLabel: "Бидэнд имэйл илгээх",
    facebookLabel: "Фэйсбүүк хуудсыг үзэх",
    email: "info@etugen-mongols.ca",
    facebook: "Этүгэн Монголчууд",
    facebookUrl:
      "https://www.facebook.com/profile.php?id=61584273744310",
    
  },
} as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Contact({ lang = "mn" }: ContactProps) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "mn";
  const copy = COPY[safeLang];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          mx-auto grid max-w-[1400px] gap-10
          px-6 pb-16 pt-36
          md:px-10 md:pb-20 md:pt-40
          lg:min-h-screen
          lg:grid-cols-[0.88fr_1.12fr]
          lg:items-center
          lg:gap-16
          lg:px-12
          lg:pb-28 lg:pt-40
        "
      >
        <motion.figure
          variants={imageVariants}
          className="
            group relative isolate
            h-[340px] overflow-hidden
            border border-[#27301d]/15
            bg-[#e9e1d2]
            shadow-[0_24px_60px_rgba(39,48,29,0.16)]
            sm:h-[440px]
            lg:h-[min(650px,70vh)]
          "
        >
          <img
            src={heroBg}
            className="
              h-full w-full object-cover object-center
              transition-transform duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.025]
            "
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17200f]/75 via-transparent to-[#fffaf0]/10" />

          <div className="pointer-events-none absolute inset-3 border border-white/25 sm:inset-4" />
        </motion.figure>

        <motion.section variants={fadeUpVariants} className="w-full">
          <header className="max-w-3xl">
            <span className="mb-5 block text-xs font-medium uppercase tracking-[0.24em] text-[#927322]">
              {copy.albumTitle}
            </span>

            <h1 className="text-3xl font-normal leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              {copy.title}
            </h1>

            <p className="mt-7 max-w-2xl text-[15px] leading-8 text-[#566044] md:text-base">
              {copy.body}
            </p>
          </header>

          <section className="mt-10 border-t border-[#27301d]/20">
            <a
              href={`mailto:${copy.email}`}
              className="
                group grid gap-5 border-b border-[#27301d]/20 py-7
                text-[#27301d] no-underline
                transition-colors duration-200
                hover:text-[#927322]
                sm:grid-cols-[56px_1fr_auto]
                sm:items-center sm:gap-6
              "
            >
              <span className="flex size-12 items-center justify-center border border-[#27301d]/25 bg-[#eee7d8] transition-colors duration-200 group-hover:border-[#b8953b] group-hover:bg-[#e4d8bd]">
                <FaEnvelope size={17} />
              </span>

              <span className="min-w-0">
                <span className="block text-xl font-normal leading-tight sm:text-2xl">
                  {copy.emailLabel}
                </span>

                <span className="mt-2 block break-all text-sm leading-6 text-[#697259] sm:text-base">
                  {copy.email}
                </span>
              </span>

              <span className="hidden size-10 items-center justify-center border border-[#27301d]/20 transition-all duration-200 group-hover:translate-x-1 group-hover:border-[#b8953b] sm:flex">
                <FaArrowRight size={12} />
              </span>
            </a>

            <a
              href={copy.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group grid gap-5 border-b border-[#27301d]/20 py-7
                text-[#27301d] no-underline
                transition-colors duration-200
                hover:text-[#927322]
                sm:grid-cols-[56px_1fr_auto]
                sm:items-center sm:gap-6
              "
            >
              <span className="flex size-12 items-center justify-center border border-[#27301d]/25 bg-[#eee7d8] transition-colors duration-200 group-hover:border-[#b8953b] group-hover:bg-[#e4d8bd]">
                <FaFacebook size={18} />
              </span>

              <span className="min-w-0">
                <span className="block text-xl font-normal leading-tight sm:text-2xl">
                  {copy.facebookLabel}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#697259] sm:text-base">
                  {copy.facebook}
                </span>
              </span>

              <span className="hidden size-10 items-center justify-center border border-[#27301d]/20 transition-all duration-200 group-hover:translate-x-1 group-hover:border-[#b8953b] sm:flex">
                <FaArrowRight size={12} />
              </span>
            </a>
          </section>
        </motion.section>
      </motion.div>
    </main>
  );
}

export default memo(Contact);