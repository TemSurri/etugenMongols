"use client";

import { Link,useParams } from "react-router-dom";

import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import GalleryView from "../detail/GalleryView";

import { useLanguage } from "../../../context/LanguageContext";
import { galleryEvents } from "../data/galleryCatalog";

export default function GalleryDetailPage() {
  const { id } = useParams();
  const { lang, setLang } = useLanguage();

  const event = galleryEvents.find(
    (event) => event.id === id && event.status === "past" && event.gallery
  );

  if (!event) {
    return (
      <>
        <Header lang={lang} setLang={setLang} />

        <main className="min-h-screen bg-[#f4ecd9] pt-28 text-[#27301d]">
          <div className="mx-auto max-w-4xl px-5 py-12">
            <Link
              to="/gallery"
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7b26]"
            >
              ← Back to Gallery
            </Link>

            <h1 className="mt-6 text-3xl font-semibold">
              Gallery not found
            </h1>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <GalleryView event={event} lang={lang} />
      </main>

      <Footer />
    </>
  );
}
