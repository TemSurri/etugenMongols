"use client";

import Footer from "../../../components/navigation/SiteFooter.tsx";
import Header from "../../../components/navigation/SiteHeader.tsx";
import { useLanguage } from "../../../context/LanguageContext";
import GalleryShowcase from "../GalleryShowcase.tsx";


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
