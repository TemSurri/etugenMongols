"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import type { EventItem } from "../static_events";
import landingImage from "../assets/landingpage.webp";

export default function Event({
  title,
  date,
  location,
  description,
  description_en,
  image,
  whoWeWant,
  contactEmail,
  contactPhone,
}: EventItem) {
  const [lang, setLang] = useState<"mn" | "en">("mn");

  return (
    <article
      className="min-h-screen w-full pt-10 pb-16 px-4 sm:px-6 lg:px-0"
      style={{
        backgroundImage: `url(${landingImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto mb-6 flex justify-center">
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-white/80 text-gray-900 border border-gray-300 shadow hover:bg-white transition font-medium text-sm flex items-center gap-2"
        >
          <span className="text-lg">←</span> Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm border border-[#D4AF37]/30 shadow-xl rounded-2xl px-6 sm:px-10 py-10 space-y-12">

        <header className="space-y-5 text-center border-b border-gray-200 pb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-gray-900">
            {title}
          </h1>

          <div className="flex flex-wrap gap-3 justify-center text-xs sm:text-sm text-gray-700">
            {date && (
              <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">
                <span className="font-semibold">Date:</span> {date}
              </span>
            )}

            {location && (
              <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">
                <span className="font-semibold">Location:</span> {location}
              </span>
            )}
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold uppercase text-gray-900">Event Photo</h2>

          <div className="aspect-3/2 rounded-xl overflow-hidden shadow-md">
            <img src={`/event_assets/${image}`} alt={title} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold uppercase text-gray-900">Description</h2>

            <button
              onClick={() => setLang(lang === "mn" ? "en" : "mn")}
              className="px-4 py-1 rounded-full text-sm font-semibold bg-[#0033A0] text-white hover:bg-[#002670] transition"
            >
              {lang === "mn" ? "English" : "Монгол"}
            </button>
          </div>

          <p className="text-sm whitespace-pre-line sm:text-base leading-relaxed text-gray-800">
            {lang === "mn" ? description : description_en}
          </p>
        </section>

        <div className="w-full h-1 bg-linear-to-r from-[#0033A0] via-[#D4AF37] to-[#0033A0] rounded-full opacity-70" />

        {whoWeWant && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold uppercase text-[#0033A0]">Help Needed</h2>
            <p className="text-sm sm:text-base text-gray-800">{whoWeWant}</p>
          </section>
        )}

        {(contactEmail || contactPhone) && (
          <aside className="rounded-xl border border-gray-200 bg-white/95 shadow px-5 py-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase text-gray-700">Contact Info</h3>

            <p className="text-xs sm:text-sm text-gray-700">
              <a
                href={`mailto:${contactEmail}`}
                className="underline decoration-[#D4AF37]/60 hover:text-[#D4AF37] transition"
              >
                {contactEmail}
              </a>
            </p>

            {contactPhone && (
              <p className="text-xs sm:text-sm text-gray-700">{contactPhone}</p>
            )}
          </aside>
        )}
      </div>
    </article>
  );
}
