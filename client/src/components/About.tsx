"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import landingImage from "../assets/landingpage.webp";
import logo from "../assets/logo.webp";

// motion and animation variants

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function About() {
  const [lang, setLang] = useState<"en" | "mn">("mn");

  const TEXT =
    lang === "en"
      ? "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that bring people together and keep our culture alive."
      : "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид Монголын нийгэмлэгийг нэгтгэх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.";

  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/90" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-28"
      >
        <div className="relative bg-white px-6 sm:px-10 py-14 overflow-hidden">

          <div className="absolute left-0 top-0 h-full w-px bg-black/10" />
          <div className="absolute right-0 bottom-0 w-6 h-6 border-r border-b border-black/20" />

          <motion.button
            variants={fadeUp}
            onClick={() => setLang(lang === "en" ? "mn" : "en")}
            className="absolute right-4 top-4 text-xs uppercase tracking-wide text-black/50 hover:text-black transition"
          >
            {lang === "en" ? "Монгол" : "English"}
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-10 items-start">

            {/* Logo */}
            <motion.img
              variants={fadeUp}
              src={logo}
              alt="Etugen Mongols Logo"
              className="w-24 sm:w-28 md:w-32 opacity-95"
            />

            <motion.div variants={fadeUp}>
              <h2 className="text-sm uppercase tracking-widest text-black/50">
                About Us
              </h2>

              <div className="mt-4 h-0.5 w-14 bg-black" />

              <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-black/75">
                {TEXT}
              </p>
            </motion.div>

            {/* IMAGES */}
            <motion.div
              variants={fadeUp}
              className="relative hidden md:block w-64 h-44"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${landingImage})` }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-36 h-24 bg-cover bg-center border border-white"
                style={{ backgroundImage: `url(${landingImage})` }}
              />
            </motion.div>
          </div>

          {/* IMAGES on mobile */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-1 gap-4 md:hidden"
          >
            <div
              className="h-44 bg-cover bg-center"
              style={{ backgroundImage: `url(${landingImage})` }}
            />
            <div
              className="h-44 bg-cover bg-center"
              style={{ backgroundImage: `url(${landingImage})` }}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-10 md:hidden"
          >
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={scrollToContact}
                className="w-fit px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black border border-black/30 hover:border-black transition"
              >
                Contact Us
              </button>

              <button
                onClick={scrollToGallery}
                className="w-fit px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black border border-black/30 hover:border-black transition"
              >
                View Event Gallery
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
