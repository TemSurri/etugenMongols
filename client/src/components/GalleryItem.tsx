"use client";

import { Link } from "react-router-dom";
import type { GalleryItem } from "../static_gallery";
import landingImage from "../assets/landingpage.webp";

export default function GalleryItem({
  title,
  date,
  location,
  description,
  image,
}: GalleryItem) {
  const eventImage = image;
  const galleryImages = [
    eventImage,
    eventImage,
    eventImage,
  ];
  const videoLinks: string[] = [];
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

      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-sm border border-[#D4AF37]/30 shadow-xl rounded-2xl px-6 sm:px-10 py-10 space-y-12">

        {/* HEADER */}
        <header className="space-y-3 border-b border-gray-200 pb-6">
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

        <section className="space-y-3">
          <h2 className="text-xl font-semibold uppercase text-gray-900">About This Event</h2>
          <p className="text-sm sm:text-base leading-relaxed text-gray-800">
            {description}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold uppercase text-gray-900">Photo Gallery</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden shadow group"
              >
                <img
                  src={img}
                  alt={`${title} photo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {videoLinks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold uppercase text-gray-900">Videos</h2>

            <div className="flex flex-col gap-3">
              {videoLinks.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline hover:text-[#D4AF37]"
                >
                  Watch Video {i + 1}
                </a>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}
