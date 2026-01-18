"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { EventItem } from "../static_events";
import landingImage from "../assets/landingpage.webp";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export default function Event({
  title,
  date,
  location,
  description,
  description_en,
  image,
  contactEmail,
  contactPhone,
}: EventItem) {
  const [lang, setLang] = useState<"mn" | "en">("mn");

  const googleMapsUrl = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`
    : null;

  return (
    <article
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${landingImage})` }}
    >

      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/90" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col min-h-0"
      >

        <motion.div variants={fadeUp} className="mb-2 shrink-0">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition"
          >
            ← Back
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="
            bg-white
            flex-1
            min-h-0
            overflow-y-auto
            px-6 sm:px-8
            py-6
            relative
          "
        >
          <button
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            className="absolute right-4 top-4 text-xs uppercase tracking-widest text-black/50 hover:text-black"
          >
            {lang === "mn" ? "English" : "Монгол"}
          </button>
          <header className="mb-5 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-black">
              {title}
            </h1>

            <div className="mt-2 h-px w-14 bg-black" />

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-black/70">
              {date && <span>{date}</span>}
              {location && <span>{location}</span>}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
            <div>
              <div className="border border-black/10 p-2">
                <img
                  src={`/upcoming_event_assets/${image}`}
                  alt={title}
                  className="w-full max-h-[36vh] object-contain"
                />
              </div>

              {googleMapsUrl && (
                <div className="mt-4 border-l-2 border-black/20 pl-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block
                      text-sm font-medium
                      text-black
                      hover:underline
                    "
                  >
                    View location on Google Maps
                  </a>
                </div>
              )}
            </div>

            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-widest text-black/50">
                About this event
              </p>

              <div className="mt-2 h-px w-10 bg-black/30" />

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/80 whitespace-pre-line">
                {lang === "mn" ? description : description_en}
              </p>
            </div>
          </div>

          {(contactEmail || contactPhone) && (
            <footer className="mt-6 pt-4 border-t border-black/10 max-w-xl">
              <p className="text-xs uppercase tracking-widest text-black/50">
                Contact
              </p>
              <div className="mt-2 text-sm text-black/75 space-y-1">
                {contactEmail && (
                  <a href={`mailto:${contactEmail}`} className="block">
                    {contactEmail}
                  </a>
                )}
                {contactPhone && <p>{contactPhone}</p>}
              </div>
            </footer>
          )}
        </motion.div>
      </motion.div>
    </article>
  );
}
