"use client";

import { useLanguage } from "../context/LanguageContext";
import GalleryShowcase from "../sections/gallery/GalleryShowcase.tsx";
import Header from "../sections/home/Header.tsx";
import Footer from "../sections/home/Footer.tsx";


export default function GalleryPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <GalleryShowcase lang={lang} />
      <Footer />
    </>

);
}