"use client";

import { Link } from "react-router-dom";
import type { EventItem } from "../static_events";
import landingImage from "../assets/landingpage.webp";

export default function Event({
  title,
  date,
  location,
  description,
  image,
  whatWeNeed,
  whoWeWant,
  contactEmail,
  contactPhone,
  applyLink,
}: EventItem) {
  const eventImage = image;

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
   
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-[#D4AF37] transition"
        >
          <span className="text-lg">←</span> Back to Home
        </Link>
      </div>

  
      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-sm border border-[#D4AF37]/30 shadow-xl rounded-2xl px-6 sm:px-10 py-10 space-y-10">


        <header className="space-y-4 border-b border-gray-200 pb-6">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-wide font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            Community Event
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-gray-900">
            {title}
          </h1>

          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-700">
            {date && (
              <span className="inline-flex gap-1 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">
                <span className="font-semibold">Date:</span> {date}
              </span>
            )}
            {location && (
              <span className="inline-flex gap-1 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full">
                <span className="font-semibold">Location:</span> {location}
              </span>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-10">

         
          <div className="space-y-10">

           
            {eventImage ? (
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold uppercase text-gray-900">
                  Event Photo
                </h2>

                <div className="aspect-3/2 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={eventImage}
                    alt={`${title} main event`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </section>
            ) : (
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold uppercase text-gray-900">
                  Event Photo
                </h2>
                <div className="h-48 rounded-xl bg-gray-200 flex items-center justify-center">
                  <span className="text-xs uppercase text-gray-600">
                    Photo coming soon
                  </span>
                </div>
              </section>
            )}

         
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold uppercase text-gray-900">
                About This Event
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-800">
                {description}
              </p>
            </section>

           
            {(whatWeNeed || whoWeWant || applyLink) && (
              <section className="rounded-xl border border-[#D4AF37]/40 bg-white shadow-sm px-5 py-6 space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold uppercase text-[#D4AF37]">
                  Get Involved
                </h2>

                {whatWeNeed && (
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">What we need:</span> {whatWeNeed}
                  </p>
                )}

                {whoWeWant && (
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">Who we're looking for:</span> {whoWeWant}
                  </p>
                )}

                {applyLink && (
                  <a
                    href={applyLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase bg-gray-900 text-white hover:bg-[#D4AF37] hover:text-black transition"
                  >
                    Apply / Join Us
                  </a>
                )}
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white/95 shadow px-5 py-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase text-gray-700">
                Quick Info
              </h3>

              <dl className="space-y-3 text-xs sm:text-sm text-gray-700">
                {date && (
                  <div className="flex justify-between">
                    <dt className="font-semibold">Date</dt>
                    <dd>{date}</dd>
                  </div>
                )}
                {location && (
                  <div className="flex justify-between">
                    <dt className="font-semibold">Location</dt>
                    <dd>{location}</dd>
                  </div>
                )}
                {contactEmail && (
                  <div className="flex justify-between">
                    <dt className="font-semibold">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="underline decoration-[#D4AF37]/60 hover:text-[#D4AF37] transition"
                      >
                        {contactEmail}
                      </a>
                    </dd>
                  </div>
                )}
                {contactPhone && (
                  <div className="flex justify-between">
                    <dt className="font-semibold">Phone</dt>
                    <dd>
                      <a href={`tel:${contactPhone}`} className="hover:text-[#D4AF37] transition">
                        {contactPhone}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}
