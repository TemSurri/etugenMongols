"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import landingImage from "../assets/landingpage.webp";
import logo from "../assets/logo.webp";

/* motion and animation variants */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
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
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/90" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:py-24 md:py-28"
      >
        <div
          className="
            relative
            bg-white
            px-6 sm:px-10
            py-12 sm:py-14
            overflow-hidden
            shadow-[0_30px_80px_rgba(0,0,0,0.25)]
          "
        >
          <div className="absolute inset-y-6 left-0 w-px bg-black/10" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-black/20" />

          <motion.button
            variants={fadeUp}
            onClick={() => setLang(lang === "en" ? "mn" : "en")}
            className="
              absolute right-4 top-4
              w-[72px] text-right
              text-xs uppercase tracking-wide
              text-black/50 hover:text-black transition
            "
          >
            {lang === "en" ? "Монгол" : "English"}
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-10 items-start">
            <motion.img
              variants={fadeUp}
              src={logo}
              alt="Etugen Mongols Logo"
              className="w-24 sm:w-28 md:w-32 opacity-95 shrink-0"
            />

            <motion.div variants={fadeUp}>
              <h2 className="text-sm uppercase tracking-widest text-black/50">
                About Us
              </h2>

              <div className="mt-4 h-0.5 w-14 bg-black" />

              <div className="mt-6 max-w-xl min-h-[130px] sm:min-h-40">
                <p className="text-sm sm:text-base leading-[1.75] text-black/70">
                  {TEXT}
                </p>
              </div>
            </motion.div>

            {/* Desktop images */}
            <motion.div
              variants={fadeUp}
              className="relative hidden lg:block w-full max-w-[280px] self-center"
            >
              <div className="relative aspect-4/3 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <img
                  src={landingImage}
                  alt="Etugen Mongols community"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-[58%] aspect-3/2 overflow-hidden border border-white shadow-lg bg-white">
                <img
                  src={landingImage}
                  alt="Etugen Mongols event"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </motion.div>
          </div>

          {/* Mobile / tablet images */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden"
          >
            <div className="relative aspect-4/3 overflow-hidden shadow-md">
              <img
                src={landingImage}
                alt="Etugen Mongols community"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative aspect-4/3 overflow-hidden shadow-md">
              <img
                src={landingImage}
                alt="Etugen Mongols event"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 md:hidden">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-black/50">
                  See Our Work
                </p>
                <button
                  onClick={scrollToGallery}
                  className="
                    px-6 py-3
                    text-xs font-semibold uppercase tracking-widest
                    text-black
                    border border-black/30
                    hover:border-black
                    transition
                  "
                >
                  View Event Gallery
                </button>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-black/50">
                  Inquiries?
                </p>
                <button
                  onClick={scrollToContact}
                  className="
                    px-6 py-3
                    text-xs font-semibold uppercase tracking-widest
                    text-black
                    border border-black/30
                    hover:border-black
                    transition
                  "
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}