"use client";

import { useLanguage } from "../context/LanguageContext";
import GalleryShowcase from "../components/gallery/GalleryShowcase.tsx";
import Header from "../components/home/Header.tsx";
import Footer from "../components/home/Footer.tsx";


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