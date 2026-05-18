"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaEnvelope, FaFacebook } from "react-icons/fa";
import heroBg from "../../assets/landingpage.webp";

type Lang = "en" | "mn";

type ContactProps = {
  lang?: Lang;
};

const COPY = {
  en: {
    eyebrow: "Contact",
    title: "Have Questions or Ideas?",
    body:
      "Whether you want to collaborate, volunteer, suggest an event, or simply learn more, we’d love to hear from you.",
    emailLabel: "Email",
    facebookLabel: "Facebook",
    email: "calgarymongolians@gmail.com",
    facebook: "Etugen Mongols",
    facebookUrl: "https://www.facebook.com/profile.php?id=61584273744310",
  },
  mn: {
    eyebrow: "Холбоо барих",
    title: "Асуух зүйл эсвэл санал байна уу?",
    body:
      "Хамтран ажиллах, сайн дурын ажилд оролцох, арга хэмжээ санал болгох эсвэл дэлгэрэнгүй мэдэхийг хүсвэл бидэнтэй холбогдоорой.",
    emailLabel: "Имэйл",
    facebookLabel: "Фэйсбүүк",
    email: "calgarymongolians@gmail.com",
    facebook: "Этүгэн Монголчууд",
    facebookUrl: "https://www.facebook.com/profile.php?id=61584273744310",
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
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Contact({ lang = "mn" }: ContactProps) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "mn";
  const copy = COPY[safeLang];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-black pt-20 text-white">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/74" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,145,53,0.28),transparent_36%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.94))]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1fr_0.85fr] md:px-10 lg:px-12"
      >
        <motion.div variants={fadeUpVariants} className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8caa5]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {copy.title}
          </h1>

          <div className="mt-6 h-px w-40 bg-[#d8caa5]/55" />

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/76 md:text-base md:leading-8">
            {copy.body}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="border border-white/14 bg-white/[0.08] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-md md:p-6"
        >
          <div className="grid gap-4">
            <a
              href={`mailto:${copy.email}`}
              className="group flex items-center gap-4 border border-white/14 bg-black/28 px-5 py-5 text-white transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#d8caa5]/70 hover:bg-black/42"
            >
              <span className="flex size-11 shrink-0 items-center justify-center border border-[#d8caa5]/35 bg-[#d8caa5]/10 text-[#d8caa5]">
                <FaEnvelope size={17} />
              </span>

              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {copy.emailLabel}
                </span>

                <span className="mt-1 block truncate text-sm font-semibold tracking-wide md:text-base">
                  {copy.email}
                </span>
              </span>
            </a>

            <a
              href={copy.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border border-white/14 bg-black/28 px-5 py-5 text-white transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#d8caa5]/70 hover:bg-black/42"
            >
              <span className="flex size-11 shrink-0 items-center justify-center border border-[#d8caa5]/35 bg-[#d8caa5]/10 text-[#d8caa5]">
                <FaFacebook size={18} />
              </span>

              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {copy.facebookLabel}
                </span>

                <span className="mt-1 block truncate text-sm font-semibold tracking-wide md:text-base">
                  {copy.facebook}
                </span>
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Contact);